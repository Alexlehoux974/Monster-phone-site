#!/usr/bin/env node

/**
 * Script pour exécuter la migration en utilisant des requêtes UPDATE simples
 */

const fs = require('fs');
const path = require('path');

// Charger les produits statiques
const staticProductsPath = path.join(__dirname, 'static-products.json');
const staticProducts = JSON.parse(fs.readFileSync(staticProductsPath, 'utf-8'));

console.log(`🚀 Migration de ${staticProducts.length} produits...\n`);

// Fonction pour nettoyer et préparer les données
function prepareProductData(product) {
  const data = {};
  
  // Description
  if (product.description && product.description.length > 50) {
    data.description = product.description.substring(0, 500); // Limiter la taille
  }
  
  // Short description
  if (product.shortDescription) {
    data.short_description = product.shortDescription;
  }
  
  // Images
  if (product.images && product.images.length > 0) {
    const cleanImages = product.images.filter(img => img && img.length > 10);
    if (cleanImages.length > 0) {
      data.images = cleanImages;
    }
  }
  
  // Specifications
  if (product.specifications && product.specifications.length > 0) {
    const specs = {};
    product.specifications.forEach(spec => {
      if (spec.label && spec.value) {
        specs[spec.label] = spec.value;
      }
    });
    if (Object.keys(specs).length > 0) {
      data.specifications = specs;
    }
  }
  
  // Highlights
  if (product.highlights && product.highlights.length > 0) {
    const cleanHighlights = product.highlights
      .filter(h => h && h.length > 5 && !h.includes('\\') && h !== ',')
      .map(h => h.trim());
    if (cleanHighlights.length > 0) {
      data.highlights = cleanHighlights;
    }
  }
  
  // Autres champs
  if (product.warranty) data.warranty = product.warranty;
  if (product.deliveryTime) data.delivery_time = product.deliveryTime;
  if (product.repairabilityIndex) data.repairability_index = product.repairabilityIndex;
  if (product.dasHead) data.das_head = product.dasHead;
  if (product.dasBody) data.das_body = product.dasBody;
  
  // Rating
  if (product.rating) {
    if (product.rating.average) data.average_rating = product.rating.average;
    if (product.rating.count) data.total_reviews = product.rating.count;
  }
  
  return data;
}

// Générer les requêtes UPDATE pour les premiers produits
const updates = [];

staticProducts.slice(0, 10).forEach((product) => {
  const data = prepareProductData(product);
  
  if (Object.keys(data).length > 0) {
    updates.push({
      name: product.name,
      sku: product.sku,
      data: data
    });
  }
});

// Afficher les mises à jour qui seront effectuées
console.log('📋 Produits à mettre à jour:');
updates.forEach((update, index) => {
  console.log(`${index + 1}. ${update.name || update.sku}`);
  console.log(`   - ${Object.keys(update.data).join(', ')}`);
});

// Créer un fichier avec les commandes pour exécuter manuellement
const outputPath = path.join(__dirname, 'manual-updates.txt');
const commands = [];

updates.forEach((update) => {
  const whereClause = update.sku ? `sku = '${update.sku}'` : `name = '${update.name}'`;
  
  commands.push(`\n-- ${update.name || update.sku}`);
  commands.push(`UPDATE products SET`);
  
  const setters = [];
  
  if (update.data.images) {
    setters.push(`  images = ARRAY${JSON.stringify(update.data.images)}::text[]`);
  }
  
  if (update.data.specifications) {
    setters.push(`  specifications = '${JSON.stringify(update.data.specifications)}'::jsonb`);
  }
  
  if (update.data.highlights) {
    setters.push(`  highlights = ARRAY${JSON.stringify(update.data.highlights)}::text[]`);
  }
  
  if (update.data.average_rating) {
    setters.push(`  average_rating = ${update.data.average_rating}`);
  }
  
  if (update.data.total_reviews) {
    setters.push(`  total_reviews = ${update.data.total_reviews}`);
  }
  
  if (update.data.warranty) {
    setters.push(`  warranty = '${update.data.warranty.replace(/'/g, "''")}'`);
  }
  
  if (update.data.delivery_time) {
    setters.push(`  delivery_time = '${update.data.delivery_time.replace(/'/g, "''")}'`);
  }
  
  commands.push(setters.join(',\n'));
  commands.push(`WHERE ${whereClause};`);
});

fs.writeFileSync(outputPath, commands.join('\n'));

console.log(`\n✅ Fichier de commandes SQL créé: ${outputPath}`);
console.log('📝 Exécutez ces commandes dans Supabase SQL Editor pour appliquer les mises à jour.');