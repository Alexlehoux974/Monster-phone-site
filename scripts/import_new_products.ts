#!/usr/bin/env tsx
/**
 * Script de migration Supabase - Import des 96 nouveaux produits
 * Novembre 2025
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Nouveaux EAN à importer (générés par le script)
const NEW_EANS = new Set([
  '6936520869527', '6936520869510', '6936520857951', '6936520845231', '6936520845248',
  '6975840260126', '3663111191578', '3663111191585', '4897069737123', '4897069737130',
  '3663111190434', '3663111196221', '3663111196238', '3663111196245', '3663111196252',
  '3663111196269', '3663111183221', '3663111196283', '3663111187236', '3663111187243',
  '3663111187250', '3663111190502', '3663111190496', '0810079707041', '0810079707034',
  '0810079706433', '0810079706440', '0810079705924', '0810079705931', '0810079705863',
  '0810079705108', '0810079706082', '0810079705733', '6972576181244', '6972576181251',
  '6972576181268', '6972576182302', '6972576182319', '6972576182333', '6972576182401',
  '6972576182425', '6972576182524', '6972576182531', '6972576182340', '6972576182357',
  '6972576180933', '6972576180940', '6872576181688', '6972576181695', '6972576181657',
  '6972576181664', '6972576181381', '6972576181367', '6972576181312', '6972576181336',
  '6972576181329', '6972576181565', '6972576182128', '6972576181039', '6972576181046',
  '6972576181053', '6972576181121', '6972576181138', '3663111196276', '3663111196290',
  '3663111183238', '3663111196306', '3663111196313', '3663111196320', '3663111196337',
  '3663111196344', '3663111196351', '3663111196368', '3663111196375', '3663111196382',
  '3663111196399', '3663111196405', '3663111190458', '3663111190441', '3663111190465',
  '3663111183245', '3663111190519', '3663111190526', '3663111190533', '3663111190540',
  '3663111190557', '3663111196412', '3663111196429', '3663111196436', '3663111196443',
  '3663111196450', '3663111196467', '3663111196474', '3663111196481', '3663111196498',
  '3663111196504', '3663111196511', '3663111196528', '3663111196535', '3663111196542',
  '3663111196559', '3663111196566', '3663111196573', '3663111196580', '3663111190472',
  '3663111190489', '3663111183252', '3663111190564', '3663111190571', '3663111190588',
  '3663111190595', '3663111190601', '3663111190618', '3663111190625'
]);

async function importToSupabase() {
  console.log('=' .repeat(80));
  console.log('🚀 IMPORT DES NOUVEAUX PRODUITS DANS SUPABASE');
  console.log('=' .repeat(80));

  // Lire products.ts et parser pour extraire les nouveaux produits
  console.log('\n📦 Lecture des produits depuis products.ts...');

  const productsPath = path.join(__dirname, '../src/data/products.ts');
  const content = fs.readFileSync(productsPath, 'utf-8');

  // Dynamiquement importer
  const module = await import('../src/data/products.js');
  const allProducts = module.products;

  console.log(`✅ ${allProducts.length} produits chargés`);

  // Filtrer les nouveaux produits
  const newProducts = allProducts.filter((p: any) =>
    p.variants.some((v: any) => NEW_EANS.has(v.ean))
  );

  console.log(`📦 ${newProducts.length} nouveaux produits à importer`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of newProducts) {
    try {
      console.log(`\n⏳ Import: ${product.name}...`);

      // 1. Obtenir ou créer brand
      let { data: brand } = await supabase
        .from('brands')
        .select('id')
        .eq('name', product.brand)
        .single();

      if (!brand) {
        const { data: newBrand } = await supabase
          .from('brands')
          .insert({ name: product.brand, slug: product.brand.toLowerCase().replace(/\s+/g, '-') })
          .select('id')
          .single();
        brand = newBrand;
      }

      // 2. Obtenir ou créer category
      let { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('name', product.category)
        .single();

      if (!category) {
        const { data: newCategory } = await supabase
          .from('categories')
          .insert({
            name: product.category,
            slug: product.category.toLowerCase().replace(/\s+/g, '-'),
            description: `Catégorie ${product.category}`
          })
          .select('id')
          .single();
        category = newCategory;
      }

      if (!brand || !category) {
        console.error(`❌ Impossible d'obtenir brand ou category`);
        errorCount++;
        continue;
      }

      // 3. Créer le produit
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          sku: product.sku,
          name: product.name,
          url_slug: product.urlSlug,
          brand_id: brand.id,
          category_id: category.id,
          subcategory: product.subcategory || null,
          description: product.description,
          short_description: product.shortDescription || null,
          price: product.price,
          original_price: product.originalPrice || null,
          discount_percentage: product.discount || null,
          status: product.status,
          warranty: product.warranty || null,
          delivery_time: product.deliveryTime || null,
          repairability_index: product.repairabilityIndex || null,
          das_head: product.dasHead || null,
          das_body: product.dasBody || null,
          images: product.images || [],
          specifications: product.specifications || [],
          highlights: product.highlights || [],
          badges: product.badges || [],
        })
        .select('id')
        .single();

      if (productError || !productData) {
        console.error(`❌ Erreur création produit:`, productError);
        errorCount++;
        continue;
      }

      // 4. Créer les variants
      for (const variant of product.variants) {
        if (!NEW_EANS.has(variant.ean)) continue;

        const { error: variantError } = await supabase
          .from('product_variants')
          .insert({
            product_id: productData.id,
            color: variant.color,
            color_code: variant.colorCode,
            ean: variant.ean,
            stock_quantity: variant.stock,
            is_default: variant.is_default || false,
            images: variant.images || [],
          });

        if (variantError) {
          console.error(`   ❌ Variant ${variant.color}:`, variantError);
        } else {
          console.log(`   ✅ Variant ${variant.color} créé`);
        }
      }

      console.log(`✅ ${product.name} importé!`);
      successCount++;

    } catch (error) {
      console.error(`❌ Erreur ${product.name}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSUMÉ');
  console.log('='.repeat(80));
  console.log(`✅ Succès: ${successCount}`);
  console.log(`❌ Erreurs: ${errorCount}`);
}

importToSupabase().catch(console.error);
