#!/usr/bin/env node

/**
 * Script de migration des produits statiques vers Supabase
 * Enrichit les produits existants et conserve les données déjà présentes
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration Supabase
const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateProducts() {
  console.log('🚀 Début de la migration des produits vers Supabase...\n');
  
  try {
    // 1. Charger les produits statiques extraits
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
    
    // 3. Récupérer les marques et catégories
    const { data: brands } = await supabase.from('brands').select('*');
    const { data: categories } = await supabase.from('categories').select('*');
    
    const brandMap = new Map();
    const categoryMap = new Map();
    
    brands?.forEach(b => brandMap.set(b.name.toLowerCase(), b.id));
    categories?.forEach(c => categoryMap.set(c.name.toLowerCase(), c.id));
    
    // 4. Créer des maps pour faciliter la comparaison
    const existingBySku = new Map();
    const existingByName = new Map();
    
    for (const product of existingProducts || []) {
      if (product.sku) existingBySku.set(product.sku.toLowerCase(), product);
      if (product.name) existingByName.set(product.name.toLowerCase(), product);
    }
    
    // 5. Analyser et préparer les mises à jour
    const stats = {
      matched: 0,
      enriched: 0,
      new: 0,
      skipped: 0,
      errors: 0
    };
    
    const updates = [];
    const newProducts = [];
    
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
        
        // Préparer les mises à jour (seulement pour les champs vides)
        const updateData = {};
        let needsUpdate = false;
        
        // Description (enrichir si vide ou trop courte)
        if (staticProduct.description && (!existing.description || existing.description.length < 50)) {
          updateData.description = staticProduct.description;
          needsUpdate = true;
        }
        
        // Short description
        if (staticProduct.shortDescription && !existing.short_description) {
          updateData.short_description = staticProduct.shortDescription;
          needsUpdate = true;
        }
        
        // Images (ajouter si manquantes)
        if (staticProduct.images && staticProduct.images.length > 0) {
          if (!existing.images || existing.images.length === 0) {
            updateData.images = staticProduct.images;
            needsUpdate = true;
          }
        }
        
        // Spécifications (ajouter si manquantes)
        if (staticProduct.specifications && staticProduct.specifications.length > 0) {
          if (!existing.specifications || (typeof existing.specifications === 'object' && Object.keys(existing.specifications).length === 0)) {
            updateData.specifications = staticProduct.specifications;
            needsUpdate = true;
          }
        }
        
        // Highlights (ajouter si manquants)
        if (staticProduct.highlights && staticProduct.highlights.length > 0) {
          if (!existing.highlights || existing.highlights.length === 0) {
            updateData.highlights = staticProduct.highlights;
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
        if (staticProduct.rating && (!existing.average_rating || existing.average_rating === 0)) {
          updateData.average_rating = staticProduct.rating.average;
          updateData.total_reviews = staticProduct.rating.count;
          needsUpdate = true;
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
      } else {
        // Nouveau produit (on peut le créer si nécessaire)
        stats.new++;
        console.log(`  🆕 Nouveau produit non trouvé dans Supabase: ${staticProduct.name || staticProduct.id}`);
        
        // Préparer le nouveau produit pour insertion future si nécessaire
        const brandId = brandMap.get(staticProduct.brand?.toLowerCase());
        const categoryId = categoryMap.get(staticProduct.category?.toLowerCase());
        
        if (staticProduct.name && staticProduct.price) {
          newProducts.push({
            sku: staticProduct.sku || staticProduct.id,
            name: staticProduct.name,
            brand_id: brandId,
            category_id: categoryId,
            price: staticProduct.price,
            original_price: staticProduct.originalPrice,
            discount: staticProduct.discount,
            description: staticProduct.description || '',
            short_description: staticProduct.shortDescription,
            url_slug: staticProduct.urlSlug || staticProduct.id,
            status: staticProduct.status || 'active',
            warranty: staticProduct.warranty,
            delivery_time: staticProduct.deliveryTime,
            repairability_index: staticProduct.repairabilityIndex,
            das_head: staticProduct.dasHead,
            das_body: staticProduct.dasBody,
            images: staticProduct.images || [],
            specifications: staticProduct.specifications || {},
            highlights: staticProduct.highlights || [],
            average_rating: staticProduct.rating?.average || 0,
            total_reviews: staticProduct.rating?.count || 0
          });
        }
      }
    }
    
    // 6. Afficher le résumé
    console.log('\n📊 Résumé de l\'analyse:');
    console.log(`  ✅ Produits correspondants trouvés: ${stats.matched}`);
    console.log(`  📝 Produits à enrichir: ${stats.enriched}`);
    console.log(`  ⏭️  Produits déjà complets: ${stats.skipped}`);
    console.log(`  🆕 Nouveaux produits non trouvés: ${stats.new}`);
    
    // 7. Appliquer les mises à jour
    if (updates.length > 0) {
      console.log(`\n🔄 Mise à jour de ${updates.length} produits...`);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const update of updates) {
        const { error } = await supabase
          .from('products')
          .update(update.data)
          .eq('id', update.id);
        
        if (error) {
          console.error(`  ❌ Erreur pour ${update.name}:`, error.message);
          errorCount++;
        } else {
          console.log(`  ✅ ${update.name} enrichi avec:`, Object.keys(update.data).join(', '));
          successCount++;
        }
      }
      
      console.log(`\n✅ ${successCount} produits mis à jour avec succès`);
      if (errorCount > 0) {
        console.log(`❌ ${errorCount} erreurs rencontrées`);
      }
    }
    
    // 8. Proposer la création des nouveaux produits
    if (newProducts.length > 0) {
      console.log(`\n📦 ${newProducts.length} nouveaux produits peuvent être ajoutés à Supabase`);
      console.log('Pour les ajouter, décommentez la section ci-dessous dans le script');
      
      // Décommentez pour créer les nouveaux produits :
      /*
      console.log('\n➕ Création des nouveaux produits...');
      for (const newProduct of newProducts) {
        const { data, error } = await supabase
          .from('products')
          .insert(newProduct)
          .select()
          .single();
        
        if (error) {
          console.error(`  ❌ Erreur lors de la création de ${newProduct.name}:`, error.message);
        } else {
          console.log(`  ✅ ${newProduct.name} créé avec succès`);
        }
      }
      */
    }
    
    console.log('\n✨ Migration terminée!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  }
}

// Lancer la migration
migrateProducts();