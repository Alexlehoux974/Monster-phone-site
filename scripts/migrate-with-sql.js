#!/usr/bin/env node

/**
 * Script de migration utilisant des requêtes SQL directes
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration Supabase
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateProducts() {
  console.log('🚀 Début de la migration SQL des produits vers Supabase...\n');
  
  try {
    // 1. Charger les produits statiques
    console.log('📖 Chargement des produits statiques...');
    const staticProductsPath = path.join(__dirname, 'static-products.json');
    const staticProducts = JSON.parse(fs.readFileSync(staticProductsPath, 'utf-8'));
    console.log(`✅ ${staticProducts.length} produits trouvés dans static-products.json\n`);
    
    // 2. Récupérer les produits existants
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id, sku, name');
    
    console.log(`✅ ${existingProducts?.length || 0} produits trouvés dans Supabase\n`);
    
    // Créer des maps pour la correspondance
    const existingBySku = new Map();
    const existingByName = new Map();
    
    for (const product of existingProducts || []) {
      if (product.sku) existingBySku.set(product.sku.toLowerCase(), product);
      if (product.name) existingByName.set(product.name.toLowerCase(), product);
    }
    
    // 3. Préparer et exécuter les mises à jour
    let successCount = 0;
    let errorCount = 0;
    let skipCount = 0;
    
    for (const staticProduct of staticProducts) {
      // Chercher une correspondance
      let existing = null;
      
      if (staticProduct.sku) {
        existing = existingBySku.get(staticProduct.sku.toLowerCase());
      }
      
      if (!existing && staticProduct.name) {
        existing = existingByName.get(staticProduct.name.toLowerCase());
      }
      
      if (!existing) {
        skipCount++;
        continue;
      }
      
      // Préparer les données pour SQL
      const updates = [];
      const values = [];
      
      // Images
      if (staticProduct.images && staticProduct.images.length > 0) {
        const cleanImages = staticProduct.images.filter(img => img && img.length > 5);
        if (cleanImages.length > 0) {
          updates.push(`images = ARRAY[${cleanImages.map(img => `'${img.replace(/'/g, "''")}'`).join(',')}]::text[]`);
        }
      }
      
      // Specifications
      if (staticProduct.specifications && staticProduct.specifications.length > 0) {
        const specsObj = {};
        staticProduct.specifications.forEach(spec => {
          if (spec.label && spec.value) {
            specsObj[spec.label] = spec.value;
          }
        });
        if (Object.keys(specsObj).length > 0) {
          updates.push(`specifications = '${JSON.stringify(specsObj).replace(/'/g, "''")}'::jsonb`);
        }
      }
      
      // Highlights
      if (staticProduct.highlights && staticProduct.highlights.length > 0) {
        const cleanHighlights = staticProduct.highlights
          .filter(h => h && h.length > 5 && !h.includes('\\'))
          .map(h => h.trim());
        if (cleanHighlights.length > 0) {
          updates.push(`highlights = ARRAY[${cleanHighlights.map(h => `'${h.replace(/'/g, "''")}'`).join(',')}]::text[]`);
        }
      }
      
      // Description
      if (staticProduct.description && staticProduct.description.length > 50) {
        updates.push(`description = '${staticProduct.description.replace(/'/g, "''")}'`);
      }
      
      // Short description
      if (staticProduct.shortDescription) {
        updates.push(`short_description = '${staticProduct.shortDescription.replace(/'/g, "''")}'`);
      }
      
      // Warranty
      if (staticProduct.warranty) {
        updates.push(`warranty = '${staticProduct.warranty.replace(/'/g, "''")}'`);
      }
      
      // Delivery time
      if (staticProduct.deliveryTime) {
        updates.push(`delivery_time = '${staticProduct.deliveryTime.replace(/'/g, "''")}'`);
      }
      
      // Repairability index
      if (staticProduct.repairabilityIndex) {
        updates.push(`repairability_index = ${staticProduct.repairabilityIndex}`);
      }
      
      // DAS
      if (staticProduct.dasHead) {
        updates.push(`das_head = '${staticProduct.dasHead.replace(/'/g, "''")}'`);
      }
      if (staticProduct.dasBody) {
        updates.push(`das_body = '${staticProduct.dasBody.replace(/'/g, "''")}'`);
      }
      
      // Rating
      if (staticProduct.rating) {
        if (staticProduct.rating.average) {
          updates.push(`average_rating = ${staticProduct.rating.average}`);
        }
        if (staticProduct.rating.count) {
          updates.push(`total_reviews = ${staticProduct.rating.count}`);
        }
      }
      
      if (updates.length === 0) {
        skipCount++;
        continue;
      }
      
      // Exécuter la mise à jour SQL
      const sqlQuery = `
        UPDATE products 
        SET ${updates.join(', ')}
        WHERE id = '${existing.id}'
        RETURNING id, name
      `;
      
      try {
        const { data, error } = await supabase.rpc('execute_sql', {
          query: sqlQuery
        });
        
        // Si RPC n'existe pas, utiliser une approche alternative
        if (error && error.message.includes('execute_sql')) {
          // Essayer avec la méthode from().update()
          const updateObj = {};
          
          if (staticProduct.images && staticProduct.images.length > 0) {
            updateObj.images = staticProduct.images.filter(img => img && img.length > 5);
          }
          
          if (staticProduct.specifications && staticProduct.specifications.length > 0) {
            const specsObj = {};
            staticProduct.specifications.forEach(spec => {
              if (spec.label && spec.value) {
                specsObj[spec.label] = spec.value;
              }
            });
            updateObj.specifications = specsObj;
          }
          
          if (staticProduct.highlights && staticProduct.highlights.length > 0) {
            updateObj.highlights = staticProduct.highlights
              .filter(h => h && h.length > 5 && !h.includes('\\'))
              .map(h => h.trim());
          }
          
          if (staticProduct.description && staticProduct.description.length > 50) {
            updateObj.description = staticProduct.description;
          }
          
          if (staticProduct.shortDescription) {
            updateObj.short_description = staticProduct.shortDescription;
          }
          
          if (staticProduct.warranty) updateObj.warranty = staticProduct.warranty;
          if (staticProduct.deliveryTime) updateObj.delivery_time = staticProduct.deliveryTime;
          if (staticProduct.repairabilityIndex) updateObj.repairability_index = staticProduct.repairabilityIndex;
          if (staticProduct.dasHead) updateObj.das_head = staticProduct.dasHead;
          if (staticProduct.dasBody) updateObj.das_body = staticProduct.dasBody;
          
          if (staticProduct.rating) {
            if (staticProduct.rating.average) updateObj.average_rating = staticProduct.rating.average;
            if (staticProduct.rating.count) updateObj.total_reviews = staticProduct.rating.count;
          }
          
          const { data: updateData, error: updateError } = await supabase
            .from('products')
            .update(updateObj)
            .eq('id', existing.id)
            .select();
          
          if (updateError) {
            console.error(`❌ Erreur pour ${existing.name}:`, updateError.message);
            errorCount++;
          } else {
            console.log(`✅ ${existing.name} enrichi`);
            successCount++;
          }
        } else if (error) {
          console.error(`❌ Erreur SQL pour ${existing.name}:`, error.message);
          errorCount++;
        } else {
          console.log(`✅ ${existing.name} enrichi via SQL`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Erreur pour ${existing.name}:`, err.message);
        errorCount++;
      }
      
      // Pause pour éviter la surcharge
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // 4. Résumé final
    console.log('\n📊 Résumé de la migration:');
    console.log(`  ✅ Produits enrichis: ${successCount}`);
    console.log(`  ⏭️ Produits ignorés: ${skipCount}`);
    if (errorCount > 0) {
      console.log(`  ❌ Erreurs: ${errorCount}`);
    }
    
    // 5. Vérification
    console.log('\n🔍 Vérification des données enrichies...');
    const { data: verifyData } = await supabase
      .from('products')
      .select('name, images, specifications, highlights, average_rating')
      .not('images', 'is', null)
      .limit(5);
    
    if (verifyData && verifyData.length > 0) {
      console.log('\n✅ Échantillon de produits enrichis:');
      verifyData.forEach(p => {
        console.log(`  - ${p.name}`);
        console.log(`    Images: ${p.images?.length || 0}`);
        console.log(`    Specs: ${Object.keys(p.specifications || {}).length}`);
        console.log(`    Highlights: ${p.highlights?.length || 0}`);
        console.log(`    Note: ${p.average_rating || 0}`);
      });
    }
    
    console.log('\n✨ Migration terminée!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  }
}

// Lancer la migration
migrateProducts();