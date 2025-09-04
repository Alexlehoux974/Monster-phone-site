#!/usr/bin/env node

/**
 * Script de migration par batch utilisant des requêtes SQL
 */

const fs = require('fs');
const path = require('path');

// Charger les produits statiques
const staticProductsPath = path.join(__dirname, 'static-products.json');
const staticProducts = JSON.parse(fs.readFileSync(staticProductsPath, 'utf-8'));

console.log(`🚀 Génération des requêtes SQL pour ${staticProducts.length} produits...\n`);

// Créer un fichier SQL avec toutes les updates
const sqlQueries = [];

staticProducts.forEach((product, index) => {
  // Échapper les apostrophes dans les textes
  const escape = (str) => str ? str.replace(/'/g, "''") : '';
  
  // Préparer les tableaux
  const images = product.images && product.images.length > 0 
    ? `ARRAY[${product.images.filter(img => img && img.length > 5).map(img => `'${escape(img)}'`).join(',')}]::text[]`
    : 'NULL';
  
  const highlights = product.highlights && product.highlights.length > 0
    ? `ARRAY[${product.highlights
        .filter(h => h && h.length > 5 && !h.includes('\\'))
        .map(h => `'${escape(h.trim())}'`)
        .join(',')}]::text[]`
    : 'NULL';
  
  // Préparer les spécifications
  let specifications = 'NULL';
  if (product.specifications && product.specifications.length > 0) {
    const specsObj = {};
    product.specifications.forEach(spec => {
      if (spec.label && spec.value) {
        specsObj[spec.label] = spec.value;
      }
    });
    if (Object.keys(specsObj).length > 0) {
      specifications = `'${escape(JSON.stringify(specsObj))}'::jsonb`;
    }
  }
  
  // Construire la requête UPDATE
  const query = `
-- Produit ${index + 1}/${staticProducts.length}: ${product.name || product.sku || 'Unknown'}
UPDATE products 
SET 
  ${product.description && product.description.length > 50 ? `description = '${escape(product.description)}',` : ''}
  ${product.shortDescription ? `short_description = '${escape(product.shortDescription)}',` : ''}
  ${images !== 'NULL' ? `images = ${images},` : ''}
  ${specifications !== 'NULL' ? `specifications = ${specifications},` : ''}
  ${highlights !== 'NULL' ? `highlights = ${highlights},` : ''}
  ${product.warranty ? `warranty = '${escape(product.warranty)}',` : ''}
  ${product.deliveryTime ? `delivery_time = '${escape(product.deliveryTime)}',` : ''}
  ${product.repairabilityIndex ? `repairability_index = ${product.repairabilityIndex},` : ''}
  ${product.dasHead ? `das_head = '${escape(product.dasHead)}',` : ''}
  ${product.dasBody ? `das_body = '${escape(product.dasBody)}',` : ''}
  ${product.rating?.average ? `average_rating = ${product.rating.average},` : ''}
  ${product.rating?.count ? `total_reviews = ${product.rating.count},` : ''}
  updated_at = NOW()
WHERE 
  ${product.sku ? `sku = '${escape(product.sku)}'` : `name = '${escape(product.name)}'`};
`;
  
  // Nettoyer les virgules en trop
  const cleanedQuery = query.replace(/,(\s*)updated_at/, '$1updated_at');
  sqlQueries.push(cleanedQuery);
});

// Sauvegarder dans un fichier SQL
const sqlFilePath = path.join(__dirname, 'migration-batch.sql');
fs.writeFileSync(sqlFilePath, sqlQueries.join('\n'));

console.log(`✅ Fichier SQL généré: ${sqlFilePath}`);
console.log(`   ${sqlQueries.length} requêtes UPDATE créées`);
console.log('\n📝 Pour exécuter la migration:');
console.log('   1. Copier le contenu de migration-batch.sql');
console.log('   2. L\'exécuter dans Supabase SQL Editor');
console.log('   3. Ou utiliser le script execute-migration.js');