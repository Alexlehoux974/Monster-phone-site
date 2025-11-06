#!/usr/bin/env tsx
/**
 * Script de migration Supabase - Import des 96 nouveaux produits
 * Novembre 2025
 */

import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Liste des EAN existants (à skip)
const EXISTING_EANS = new Set([
  // Cette liste sera remplie dynamiquement
]);

async function getExistingEANs() {
  console.log('📋 Récupération des EAN existants...');
  const { data, error } = await supabase
    .from('product_variants')
    .select('ean');

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  data?.forEach(v => {
    if (v.ean) EXISTING_EANS.add(v.ean);
  });

  console.log(`✅ ${EXISTING_EANS.size} EAN existants trouvés`);
}

async function getBrandId(brandName: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('brands')
    .select('id')
    .eq('name', brandName)
    .single();

  if (error || !data) {
    console.log(`⚠️  Marque "${brandName}" non trouvée, création...`);
    const { data: newBrand, error: createError } = await supabase
      .from('brands')
      .insert({ name: brandName, slug: brandName.toLowerCase().replace(/\s+/g, '-') })
      .select('id')
      .single();

    if (createError || !newBrand) {
      console.error(`❌ Erreur création marque "${brandName}":`, createError);
      return null;
    }
    return newBrand.id;
  }

  return data.id;
}

async function getCategoryId(categoryName: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .single();

  if (error || !data) {
    console.log(`⚠️  Catégorie "${categoryName}" non trouvée, création...`);
    const { data: newCategory, error: createError } = await supabase
      .from('categories')
      .insert({
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        description: `Catégorie ${categoryName}`
      })
      .select('id')
      .single();

    if (createError || !newCategory) {
      console.error(`❌ Erreur création catégorie "${categoryName}":`, createError);
      return null;
    }
    return newCategory.id;
  }

  return data.id;
}

async function importProducts() {
  console.log('=' .repeat(80));
  console.log('🚀 IMPORT DES NOUVEAUX PRODUITS DANS SUPABASE');
  console.log('=' .repeat(80));

  await getExistingEANs();

  // Filtrer les nouveaux produits (ceux qui ont des EAN non existants)
  const newProducts = products.filter(product => {
    return product.variants.some(v => !EXISTING_EANS.has(v.ean));
  });

  console.log(`\n📦 ${newProducts.length} nouveaux produits à importer`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of newProducts) {
    try {
      console.log(`\n⏳ Import: ${product.name}...`);

      // 1. Obtenir brand_id et category_id
      const brandId = await getBrandId(product.brand);
      const categoryId = await getCategoryId(product.category);

      if (!brandId || !categoryId) {
        console.error(`❌ Impossible d'obtenir brand_id ou category_id pour ${product.name}`);
        errorCount++;
        continue;
      }

      // 2. Créer le produit principal
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          sku: product.sku,
          name: product.name,
          url_slug: product.urlSlug,
          brand_id: brandId,
          category_id: categoryId,
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

      const productId = productData.id;

      // 3. Créer les variants
      for (const variant of product.variants) {
        // Skip si EAN existe déjà
        if (EXISTING_EANS.has(variant.ean)) {
          console.log(`   ⏭️  Variant ${variant.ean} existe déjà, skip`);
          continue;
        }

        const { error: variantError } = await supabase
          .from('product_variants')
          .insert({
            product_id: productId,
            color: variant.color,
            color_code: variant.colorCode,
            ean: variant.ean,
            stock_quantity: variant.stock,
            is_default: variant.is_default || false,
            images: variant.images || [],
          });

        if (variantError) {
          console.error(`   ❌ Erreur variant ${variant.color}:`, variantError);
        } else {
          console.log(`   ✅ Variant ${variant.color} créé`);
        }
      }

      console.log(`✅ ${product.name} importé avec succès!`);
      successCount++;

    } catch (error) {
      console.error(`❌ Erreur lors de l'import de ${product.name}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '=' .repeat(80));
  console.log('📊 RÉSUMÉ DE L\'IMPORT');
  console.log('=' .repeat(80));
  console.log(`✅ Succès: ${successCount}`);
  console.log(`❌ Erreurs: ${errorCount}`);
  console.log(`📦 Total: ${newProducts.length}`);
}

// Exécuter l'import
importProducts().catch(console.error);
