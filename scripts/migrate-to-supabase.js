#!/usr/bin/env node

/**
 * Script de migration des données statiques vers Supabase
 * Conserve les données existantes et enrichit avec les informations manquantes
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration Supabase
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODQ1NzUsImV4cCI6MjA1Mjk2MDU3NX0.YHapdaZrNVEMdlAIi5obgvvUfhToExiPqwfJIihrRGA';

const supabase = createClient(supabaseUrl, supabaseKey);

// Charger les données statiques
async function loadStaticProducts() {
  const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
  let content = fs.readFileSync(productsPath, 'utf-8');
  
  // Extraire le tableau allProducts
  const match = content.match(/export const allProducts.*?=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Impossible de trouver allProducts dans le fichier');
  }
  
  // Nettoyer et parser le contenu
  let productsStr = match[1];
  
  // Remplacer les imports TypeScript et les types
  productsStr = productsStr.replace(/:\s*Product\[\]/g, '');
  productsStr = productsStr.replace(/:\s*'[^']*'/g, (match) => match);
  productsStr = productsStr.replace(/:\s*ProductVariant\[\]/g, ': []');
  productsStr = productsStr.replace(/:\s*ProductSpecification\[\]/g, ': []');
  productsStr = productsStr.replace(/:\s*Review\[\]/g, ': []');
  
  // Évaluer de manière sécurisée
  try {
    const products = eval(productsStr);
    return products;
  } catch (e) {
    console.error('Erreur lors du parsing:', e);
    // Alternative: extraire manuellement les produits
    return extractProductsManually(content);
  }
}

// Extraction manuelle des produits
function extractProductsManually(content) {
  const products = [];
  const productMatches = content.matchAll(/\{[\s\S]*?id:\s*['"]([^'"]+)['"][\s\S]*?\}(?=,\s*\{|,?\s*\];)/g);
  
  for (const match of productMatches) {
    try {
      // Parser chaque produit individuellement
      let productStr = match[0];
      
      // Extraire les champs principaux
      const id = extractField(productStr, 'id');
      const sku = extractField(productStr, 'sku');
      const name = extractField(productStr, 'name');
      const brand = extractField(productStr, 'brand');
      const category = extractField(productStr, 'category');
      const price = extractNumber(productStr, 'price');
      const originalPrice = extractNumber(productStr, 'originalPrice');
      const discount = extractNumber(productStr, 'discount');
      const description = extractField(productStr, 'description');
      const shortDescription = extractField(productStr, 'shortDescription');
      const urlSlug = extractField(productStr, 'urlSlug');
      const warranty = extractField(productStr, 'warranty');
      const deliveryTime = extractField(productStr, 'deliveryTime');
      const repairabilityIndex = extractNumber(productStr, 'repairabilityIndex');
      const dasHead = extractField(productStr, 'dasHead');
      const dasBody = extractField(productStr, 'dasBody');
      
      // Extraire les tableaux
      const images = extractArray(productStr, 'images');
      const keywords = extractArray(productStr, 'keywords');
      const highlights = extractArray(productStr, 'highlights');
      const badges = extractArray(productStr, 'badges');
      
      // Extraire les spécifications
      const specifications = extractSpecifications(productStr);
      
      // Extraire les variantes
      const variants = extractVariants(productStr);
      
      // Extraire le rating
      const rating = extractRating(productStr);
      
      // Extraire les reviews
      const reviews = extractReviews(productStr);
      
      if (id && name) {
        products.push({
          id,
          sku: sku || id,
          name,
          brand,
          category,
          price,
          originalPrice,
          discount,
          description: description || '',
          shortDescription,
          urlSlug: urlSlug || id,
          warranty,
          deliveryTime,
          repairabilityIndex,
          dasHead,
          dasBody,
          images,
          keywords,
          highlights,
          badges,
          specifications,
          variants,
          rating,
          reviews
        });
      }
    } catch (e) {
      console.error('Erreur lors de l\'extraction du produit:', e);
    }
  }
  
  return products;
}

// Fonctions d'extraction
function extractField(str, field) {
  const regex = new RegExp(`${field}:\\s*['"]([^'"]*)['"']`, 'i');
  const match = str.match(regex);
  return match ? match[1] : null;
}

function extractNumber(str, field) {
  const regex = new RegExp(`${field}:\\s*([0-9.]+)`, 'i');
  const match = str.match(regex);
  return match ? parseFloat(match[1]) : null;
}

function extractArray(str, field) {
  const regex = new RegExp(`${field}:\\s*\\[([^\\]]*)]`, 'i');
  const match = str.match(regex);
  if (!match) return [];
  
  const items = match[1].match(/['"]([^'"]*)['"]/g);
  return items ? items.map(item => item.replace(/['"]/g, '')) : [];
}

function extractSpecifications(str) {
  const specs = [];
  const specMatch = str.match(/specifications:\s*\[([^\]]*)\]/);
  if (!specMatch) return specs;
  
  const specBlocks = specMatch[1].match(/\{[^}]*\}/g);
  if (!specBlocks) return specs;
  
  for (const block of specBlocks) {
    const label = extractField(block, 'label');
    const value = extractField(block, 'value');
    if (label && value) {
      specs.push({ label, value });
    }
  }
  
  return specs;
}

function extractVariants(str) {
  const variants = [];
  const variantMatch = str.match(/variants:\s*\[([^\]]*)\]/);
  if (!variantMatch) return variants;
  
  const variantBlocks = variantMatch[1].match(/\{[^}]*\}/g);
  if (!variantBlocks) return variantBlocks;
  
  for (const block of variantBlocks) {
    const color = extractField(block, 'color');
    const ean = extractField(block, 'ean');
    const stock = extractNumber(block, 'stock');
    if (color || ean) {
      variants.push({ color, ean, stock: stock || 0 });
    }
  }
  
  return variants;
}

function extractRating(str) {
  const ratingMatch = str.match(/rating:\s*\{([^}]*)\}/);
  if (!ratingMatch) return null;
  
  const ratingBlock = ratingMatch[1];
  const average = extractNumber(ratingBlock, 'average');
  const count = extractNumber(ratingBlock, 'count');
  
  if (average && count) {
    return { average, count };
  }
  
  return null;
}

function extractReviews(str) {
  const reviews = [];
  const reviewsMatch = str.match(/reviews:\s*\[([^\]]*)\]/);
  if (!reviewsMatch) return reviews;
  
  // Pour simplifier, on garde juste le nombre de reviews
  const reviewBlocks = reviewsMatch[1].match(/\{[^}]*\}/g);
  return reviewBlocks ? reviewBlocks.length : 0;
}

// Migration principale
async function migrateProducts() {
  console.log('🚀 Début de la migration des produits vers Supabase...\n');
  
  try {
    // 1. Charger les produits statiques
    console.log('📖 Chargement des produits statiques...');
    const staticProducts = await loadStaticProducts();
    console.log(`✅ ${staticProducts.length} produits trouvés dans les fichiers statiques\n`);
    
    // 2. Récupérer les produits existants dans Supabase
    console.log('🔍 Récupération des produits existants dans Supabase...');
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('id, sku, name, description, images, specifications, highlights, warranty, delivery_time, average_rating, total_reviews');
    
    if (fetchError) {
      console.error('❌ Erreur lors de la récupération:', fetchError);
      return;
    }
    
    console.log(`✅ ${existingProducts?.length || 0} produits trouvés dans Supabase\n`);
    
    // 3. Créer des maps pour faciliter la comparaison
    const existingBySku = new Map();
    const existingByName = new Map();
    
    for (const product of existingProducts || []) {
      existingBySku.set(product.sku, product);
      existingByName.set(product.name.toLowerCase(), product);
    }
    
    // 4. Analyser et préparer les mises à jour
    const toUpdate = [];
    const toCreate = [];
    const stats = {
      matched: 0,
      enriched: 0,
      new: 0,
      skipped: 0
    };
    
    for (const staticProduct of staticProducts) {
      // Chercher une correspondance
      let existing = existingBySku.get(staticProduct.sku);
      
      if (!existing && staticProduct.name) {
        existing = existingByName.get(staticProduct.name.toLowerCase());
      }
      
      if (existing) {
        stats.matched++;
        
        // Vérifier si on peut enrichir les données
        const updates = {};
        let needsUpdate = false;
        
        // Description
        if (staticProduct.description && (!existing.description || existing.description.length < 50)) {
          updates.description = staticProduct.description;
          needsUpdate = true;
        }
        
        // Images
        if (staticProduct.images && staticProduct.images.length > 0) {
          if (!existing.images || existing.images.length === 0) {
            updates.images = staticProduct.images;
            needsUpdate = true;
          }
        }
        
        // Spécifications
        if (staticProduct.specifications && staticProduct.specifications.length > 0) {
          if (!existing.specifications || Object.keys(existing.specifications || {}).length === 0) {
            updates.specifications = staticProduct.specifications;
            needsUpdate = true;
          }
        }
        
        // Highlights
        if (staticProduct.highlights && staticProduct.highlights.length > 0) {
          if (!existing.highlights || existing.highlights.length === 0) {
            updates.highlights = staticProduct.highlights;
            needsUpdate = true;
          }
        }
        
        // Garantie et délai de livraison
        if (staticProduct.warranty && !existing.warranty) {
          updates.warranty = staticProduct.warranty;
          needsUpdate = true;
        }
        
        if (staticProduct.deliveryTime && !existing.delivery_time) {
          updates.delivery_time = staticProduct.deliveryTime;
          needsUpdate = true;
        }
        
        // Rating et reviews
        if (staticProduct.rating && (!existing.average_rating || existing.average_rating === 0)) {
          updates.average_rating = staticProduct.rating.average;
          updates.total_reviews = staticProduct.rating.count;
          needsUpdate = true;
        }
        
        if (needsUpdate) {
          toUpdate.push({
            id: existing.id,
            sku: existing.sku,
            name: existing.name,
            updates
          });
          stats.enriched++;
        } else {
          stats.skipped++;
        }
      } else {
        // Nouveau produit à créer (on le marque mais on ne le crée pas pour l'instant)
        stats.new++;
        console.log(`  🆕 Nouveau produit détecté: ${staticProduct.name}`);
      }
    }
    
    // 5. Afficher le résumé
    console.log('\n📊 Résumé de l\'analyse:');
    console.log(`  ✅ Produits correspondants: ${stats.matched}`);
    console.log(`  📝 Produits à enrichir: ${stats.enriched}`);
    console.log(`  ⏭️  Produits déjà complets: ${stats.skipped}`);
    console.log(`  🆕 Nouveaux produits: ${stats.new}`);
    
    // 6. Appliquer les mises à jour
    if (toUpdate.length > 0) {
      console.log(`\n🔄 Mise à jour de ${toUpdate.length} produits...`);
      
      for (const update of toUpdate) {
        const { error } = await supabase
          .from('products')
          .update(update.updates)
          .eq('id', update.id);
        
        if (error) {
          console.error(`  ❌ Erreur pour ${update.name}:`, error.message);
        } else {
          console.log(`  ✅ ${update.name} enrichi avec:`, Object.keys(update.updates).join(', '));
        }
      }
    }
    
    console.log('\n✨ Migration terminée avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  }
}

// Lancer la migration
migrateProducts();