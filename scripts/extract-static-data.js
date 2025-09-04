#!/usr/bin/env node

/**
 * Script pour extraire les données statiques et les sauvegarder en JSON
 */

const fs = require('fs');
const path = require('path');

// Lire le fichier TypeScript
const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const content = fs.readFileSync(productsPath, 'utf-8');

// Extraire tous les produits un par un
const products = [];
const lines = content.split('\n');

let currentProduct = null;
let braceCount = 0;
let inProduct = false;
let productLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Détecter le début d'un produit
  if (line.includes('{') && (line.includes('id:') || lines[i+1]?.includes('id:'))) {
    inProduct = true;
    braceCount = 0;
    productLines = [];
  }
  
  if (inProduct) {
    productLines.push(line);
    
    // Compter les accolades
    for (const char of line) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }
    
    // Fin du produit
    if (braceCount === 0 && productLines.length > 1) {
      const productText = productLines.join('\n');
      
      // Extraire les champs
      const product = {};
      
      // ID
      const idMatch = productText.match(/id:\s*['"]([^'"]+)['"]/);
      if (idMatch) product.id = idMatch[1];
      
      // SKU
      const skuMatch = productText.match(/sku:\s*['"]([^'"]+)['"]/);
      if (skuMatch) product.sku = skuMatch[1];
      
      // Name
      const nameMatch = productText.match(/name:\s*['"]([^'"]+)['"]/);
      if (nameMatch) product.name = nameMatch[1];
      
      // Brand
      const brandMatch = productText.match(/brand:\s*['"]([^'"]+)['"]/);
      if (brandMatch) product.brand = brandMatch[1];
      
      // Category
      const categoryMatch = productText.match(/category:\s*['"]([^'"]+)['"]/);
      if (categoryMatch) product.category = categoryMatch[1];
      
      // Subcategory
      const subcategoryMatch = productText.match(/subcategory:\s*['"]([^'"]+)['"]/);
      if (subcategoryMatch) product.subcategory = subcategoryMatch[1];
      
      // Price
      const priceMatch = productText.match(/price:\s*([0-9.]+)/);
      if (priceMatch) product.price = parseFloat(priceMatch[1]);
      
      // Original Price
      const originalPriceMatch = productText.match(/originalPrice:\s*([0-9.]+)/);
      if (originalPriceMatch) product.originalPrice = parseFloat(originalPriceMatch[1]);
      
      // Discount
      const discountMatch = productText.match(/discount:\s*([0-9.]+)/);
      if (discountMatch) product.discount = parseFloat(discountMatch[1]);
      
      // Description
      const descMatch = productText.match(/description:\s*['"]([^'"]*)['"]/s);
      if (descMatch) product.description = descMatch[1];
      
      // Short Description
      const shortDescMatch = productText.match(/shortDescription:\s*['"]([^'"]*)['"]/s);
      if (shortDescMatch) product.shortDescription = shortDescMatch[1];
      
      // URL Slug
      const urlSlugMatch = productText.match(/urlSlug:\s*['"]([^'"]+)['"]/);
      if (urlSlugMatch) product.urlSlug = urlSlugMatch[1];
      
      // Warranty
      const warrantyMatch = productText.match(/warranty:\s*['"]([^'"]+)['"]/);
      if (warrantyMatch) product.warranty = warrantyMatch[1];
      
      // Delivery Time
      const deliveryMatch = productText.match(/deliveryTime:\s*['"]([^'"]+)['"]/);
      if (deliveryMatch) product.deliveryTime = deliveryMatch[1];
      
      // Repairability Index
      const repairMatch = productText.match(/repairabilityIndex:\s*([0-9.]+)/);
      if (repairMatch) product.repairabilityIndex = parseFloat(repairMatch[1]);
      
      // DAS
      const dasHeadMatch = productText.match(/dasHead:\s*['"]([^'"]+)['"]/);
      if (dasHeadMatch) product.dasHead = dasHeadMatch[1];
      
      const dasBodyMatch = productText.match(/dasBody:\s*['"]([^'"]+)['"]/);
      if (dasBodyMatch) product.dasBody = dasBodyMatch[1];
      
      // Images (tableau)
      const imagesMatch = productText.match(/images:\s*\[([^\]]*)\]/s);
      if (imagesMatch) {
        const imageStrings = imagesMatch[1].match(/['"]([^'"]+)['"]/g);
        if (imageStrings) {
          product.images = imageStrings.map(s => s.replace(/['"]/g, ''));
        }
      }
      
      // Keywords (tableau)
      const keywordsMatch = productText.match(/keywords:\s*\[([^\]]*)\]/s);
      if (keywordsMatch) {
        const keywordStrings = keywordsMatch[1].match(/['"]([^'"]+)['"]/g);
        if (keywordStrings) {
          product.keywords = keywordStrings.map(s => s.replace(/['"]/g, ''));
        }
      }
      
      // Highlights (tableau)
      const highlightsMatch = productText.match(/highlights:\s*\[([^\]]*)\]/s);
      if (highlightsMatch) {
        const highlightStrings = highlightsMatch[1].match(/['"]([^'"]+)['"]/g);
        if (highlightStrings) {
          product.highlights = highlightStrings.map(s => s.replace(/['"]/g, ''));
        }
      }
      
      // Badges (tableau)
      const badgesMatch = productText.match(/badges:\s*\[([^\]]*)\]/s);
      if (badgesMatch) {
        const badgeStrings = badgesMatch[1].match(/['"]([^'"]+)['"]/g);
        if (badgeStrings) {
          product.badges = badgeStrings.map(s => s.replace(/['"]/g, ''));
        }
      }
      
      // Specifications (tableau d'objets)
      const specsMatch = productText.match(/specifications:\s*\[([\s\S]*?)\],?\s*(?:highlights|images|videos|status|rating|reviews|warranty|deliveryTime|badges|repairabilityIndex|dasHead|dasBody|\})/);
      if (specsMatch) {
        const specs = [];
        const specBlocks = specsMatch[1].match(/\{[^}]*\}/g);
        if (specBlocks) {
          for (const block of specBlocks) {
            const labelMatch = block.match(/label:\s*['"]([^'"]+)['"]/);
            const valueMatch = block.match(/value:\s*['"]([^'"]+)['"]/);
            if (labelMatch && valueMatch) {
              specs.push({
                label: labelMatch[1],
                value: valueMatch[1]
              });
            }
          }
        }
        if (specs.length > 0) {
          product.specifications = specs;
        }
      }
      
      // Rating
      const ratingMatch = productText.match(/rating:\s*\{([^}]*)\}/s);
      if (ratingMatch) {
        const ratingBlock = ratingMatch[1];
        const avgMatch = ratingBlock.match(/average:\s*([0-9.]+)/);
        const countMatch = ratingBlock.match(/count:\s*([0-9]+)/);
        if (avgMatch && countMatch) {
          product.rating = {
            average: parseFloat(avgMatch[1]),
            count: parseInt(countMatch[1])
          };
        }
      }
      
      // Status
      const statusMatch = productText.match(/status:\s*['"]([^'"]+)['"]/);
      if (statusMatch) product.status = statusMatch[1];
      
      if (product.id) {
        products.push(product);
        console.log(`✅ Extrait: ${product.name || product.id}`);
      }
      
      inProduct = false;
      productLines = [];
    }
  }
}

// Sauvegarder en JSON
const outputPath = path.join(__dirname, 'static-products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));

console.log(`\n✅ ${products.length} produits extraits et sauvegardés dans static-products.json`);