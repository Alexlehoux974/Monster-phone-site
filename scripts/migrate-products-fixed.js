#!/usr/bin/env node

/**
 * Script de migration corrigé pour enrichir Supabase avec les données statiques
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration Supabase avec la bonne clé
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateProducts() {
  console.log('🚀 Début de la migration corrigée des produits vers Supabase...\n');
  
  try {
    // 1. Charger les produits statiques
    console.log('📖 Chargement des produits statiques...');
    const staticProductsPath = path.join(__dirname, 'static-products.json');
    const staticProducts = JSON.parse(fs.readFileSync(staticProductsPath, 'utf-8'));
    console.log(`✅ ${staticProducts.length} produits trouvés dans static-products.json\n`);
    
    // 2. Récupérer les produits existants dans Supabase
    console.log('🔍 Récupération des produits existants dans Supabase...');
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('*');
    
    if (fetchError) {
      console.error('❌ Erreur lors de la récupération:', fetchError);
      return;
    }
    
    console.log(`✅ ${existingProducts?.length || 0} produits trouvés dans Supabase\n`);
    
    // 3. Créer des maps pour faciliter la comparaison
    const existingBySku = new Map();
    const existingByName = new Map();
    
    for (const product of existingProducts || []) {
      if (product.sku) {
        existingBySku.set(product.sku.toLowerCase(), product);
      }
      if (product.name) {
        existingByName.set(product.name.toLowerCase(), product);
      }
    }
    
    // 4. Analyser et préparer les mises à jour
    const updates = [];
    const stats = {
      matched: 0,
      enriched: 0,
      skipped: 0,
      errors: 0
    };
    
    for (const staticProduct of staticProducts) {
      // Chercher une correspondance
      let existing = null;
      
      if (staticProduct.sku) {
        existing = existingBySku.get(staticProduct.sku.toLowerCase());
      }
      
      if (!existing && staticProduct.name) {
        existing = existingByName.get(staticProduct.name.toLowerCase());
      }
      
      if (existing) {
        stats.matched++;
        
        // Préparer les données à mettre à jour
        const updateData = {};
        let needsUpdate = false;
        
        // Description
        if (staticProduct.description && (!existing.description || existing.description.length < 50)) {
          updateData.description = staticProduct.description;
          needsUpdate = true;
        }
        
        // Short description
        if (staticProduct.shortDescription && !existing.short_description) {
          updateData.short_description = staticProduct.shortDescription;
          needsUpdate = true;
        }
        
        // Images - Format JSON array
        if (staticProduct.images && staticProduct.images.length > 0) {
          if (!existing.images || (Array.isArray(existing.images) && existing.images.length === 0)) {
            updateData.images = staticProduct.images;
            needsUpdate = true;
          }
        }
        
        // Specifications - Convertir en objet JSON
        if (staticProduct.specifications && staticProduct.specifications.length > 0) {
          if (!existing.specifications || Object.keys(existing.specifications || {}).length === 0) {
            // Convertir le tableau de spécifications en objet
            const specsObj = {};
            staticProduct.specifications.forEach(spec => {
              if (spec.label && spec.value) {
                specsObj[spec.label] = spec.value;
              }
            });
            updateData.specifications = specsObj;
            needsUpdate = true;
          }
        }
        
        // Highlights - Format JSON array
        if (staticProduct.highlights && staticProduct.highlights.length > 0) {
          // Nettoyer les highlights (certains ont des caractères bizarres)
          const cleanHighlights = staticProduct.highlights
            .filter(h => h && h.length > 5 && !h.includes('\\'))
            .map(h => h.trim());
          
          if (cleanHighlights.length > 0 && (!existing.highlights || existing.highlights.length === 0)) {
            updateData.highlights = cleanHighlights;
            needsUpdate = true;
          }
        }
        
        // Garantie
        if (staticProduct.warranty && !existing.warranty) {
          updateData.warranty = staticProduct.warranty;
          needsUpdate = true;
        }
        
        // Délai de livraison
        if (staticProduct.deliveryTime && !existing.delivery_time) {
          updateData.delivery_time = staticProduct.deliveryTime;
          needsUpdate = true;
        }
        
        // Indice de réparabilité
        if (staticProduct.repairabilityIndex && !existing.repairability_index) {
          updateData.repairability_index = staticProduct.repairabilityIndex;
          needsUpdate = true;
        }
        
        // DAS
        if (staticProduct.dasHead && !existing.das_head) {
          updateData.das_head = staticProduct.dasHead;
          needsUpdate = true;
        }
        
        if (staticProduct.dasBody && !existing.das_body) {
          updateData.das_body = staticProduct.dasBody;
          needsUpdate = true;
        }
        
        // Rating
        if (staticProduct.rating) {
          if (!existing.average_rating || existing.average_rating === 0) {
            updateData.average_rating = staticProduct.rating.average;
            needsUpdate = true;
          }
          if (!existing.total_reviews || existing.total_reviews === 0) {
            updateData.total_reviews = staticProduct.rating.count;
            needsUpdate = true;
          }
        }
        
        if (needsUpdate) {
          updates.push({
            id: existing.id,
            name: existing.name,
            data: updateData
          });
          stats.enriched++;
        } else {
          stats.skipped++;
        }
      }
    }
    
    // 5. Afficher le résumé
    console.log('\n📊 Résumé de l\'analyse:');
    console.log(`  ✅ Produits correspondants: ${stats.matched}`);
    console.log(`  📝 Produits à enrichir: ${stats.enriched}`);
    console.log(`  ⏭️  Produits déjà complets: ${stats.skipped}\n`);
    
    // 6. Appliquer les mises à jour une par une avec détails
    if (updates.length > 0) {
      console.log(`🔄 Mise à jour de ${updates.length} produits...\n`);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const update of updates) {
        console.log(`  🔄 Mise à jour de ${update.name}...`);
        console.log(`     Données:`, JSON.stringify(update.data, null, 2));
        
        const { data, error } = await supabase
          .from('products')
          .update(update.data)
          .eq('id', update.id)
          .select();
        
        if (error) {
          console.error(`  ❌ Erreur pour ${update.name}:`, error);
          errorCount++;
        } else {
          console.log(`  ✅ ${update.name} enrichi avec succès`);
          if (data && data[0]) {
            // Vérifier que les données ont bien été sauvegardées
            console.log(`     Vérification - Images: ${data[0].images ? data[0].images.length : 0}`);
            console.log(`     Vérification - Specs: ${data[0].specifications ? Object.keys(data[0].specifications).length : 0}`);
          }
          successCount++;
        }
        
        // Pause entre les updates pour éviter de surcharger
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log(`\n✅ ${successCount} produits mis à jour avec succès`);
      if (errorCount > 0) {
        console.log(`❌ ${errorCount} erreurs rencontrées`);
      }
    }
    
    // 7. Vérification finale
    console.log('\n🔍 Vérification finale...');
    const { data: verifyProducts } = await supabase
      .from('products')
      .select('id, name, images, specifications, highlights, average_rating')
      .limit(5);
    
    console.log('Échantillon de produits après migration:');
    verifyProducts?.forEach(p => {
      console.log(`\n${p.name}:`);
      console.log(`  - Images: ${p.images ? p.images.length : 0}`);
      console.log(`  - Spécifications: ${p.specifications ? Object.keys(p.specifications).length : 0}`);
      console.log(`  - Highlights: ${p.highlights ? p.highlights.length : 0}`);
      console.log(`  - Note moyenne: ${p.average_rating || 0}`);
    });
    
    console.log('\n✨ Migration terminée!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  }
}

// Lancer la migration
migrateProducts();