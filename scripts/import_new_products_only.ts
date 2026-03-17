#!/usr/bin/env tsx
/**
 * Script d'import SÉCURISÉ - Import UNIQUEMENT des nouveaux produits (SKU-0120+)
 * NE TOUCHE PAS aux produits existants - utilise INSERT (pas upsert)
 * Mars 2026
 */

import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, type Product, type ProductVariant, type ProductSpecification } from '../src/data/products';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY manquante dans .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// SÉCURITÉ: Ne prendre QUE les nouveaux produits (SKU >= 120)
const NEW_PRODUCTS = PRODUCTS.filter(p => {
  const skuNum = parseInt(p.sku.replace('SKU-', '').replace('NOKIA-', '999'), 10);
  return skuNum >= 120;
});

console.log('════════════════════════════════════════════════════');
console.log('   IMPORT SÉCURISÉ - NOUVEAUX PRODUITS UNIQUEMENT  ');
console.log('════════════════════════════════════════════════════');
console.log(`📦 ${NEW_PRODUCTS.length} nouveaux produits à importer`);
console.log(`⚠️  Les ${PRODUCTS.length - NEW_PRODUCTS.length} produits existants ne seront PAS touchés\n`);

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function importNewProduct(product: Product) {
  try {
    // 1. Récupérer brand_id
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('name', product.brandName)
      .single();

    if (!brand) {
      // Créer la marque si elle n'existe pas
      const { data: newBrand, error } = await supabase
        .from('brands')
        .insert({ name: product.brandName, slug: createSlug(product.brandName) })
        .select('id')
        .single();
      if (error || !newBrand) {
        console.error(`❌ Impossible de créer la marque ${product.brandName}:`, error);
        return false;
      }
      brand!.id = newBrand.id;
    }

    // 2. Récupérer category_id
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('name', product.categoryName)
      .is('parent_id', null)
      .single();

    if (!category) {
      console.error(`❌ Catégorie "${product.categoryName}" introuvable pour ${product.name}`);
      return false;
    }

    // 3. Vérifier que le produit n'existe PAS déjà (sécurité)
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('sku', product.sku)
      .single();

    if (existing) {
      console.log(`⏭️  ${product.sku} existe déjà, skip`);
      return true;
    }

    // 4. INSERT le produit (PAS upsert)
    const { data: insertedProduct, error: productError } = await supabase
      .from('products')
      .insert({
        sku: product.sku,
        name: product.name,
        url_slug: product.urlSlug,
        brand_id: brand!.id,
        category_id: category.id,
        description: product.fullDescription,
        short_description: product.shortDescription,
        price: product.basePrice,
        original_price: product.originalPrice || null,
        discount: product.discountPercent || 0,
        status: product.status || 'active',
        repairability_index: product.repairabilityIndex || null,
        das_head: product.dasHead || null,
        das_body: product.dasBody || null,
        das_limb: product.dasLimb || null,
        airtable_id: product.airtableId || null,
      })
      .select('id')
      .single();

    if (productError || !insertedProduct) {
      console.error(`❌ Erreur INSERT produit ${product.sku}:`, productError);
      return false;
    }

    // 5. INSERT les variants
    for (const variant of product.variants) {
      // Vérifier que le variant n'existe pas déjà (par EAN)
      const { data: existingVariant } = await supabase
        .from('product_variants')
        .select('id')
        .eq('ean', variant.ean)
        .single();

      if (existingVariant) {
        console.log(`   ⏭️  Variant EAN ${variant.ean} existe déjà, skip`);
        continue;
      }

      const { error: variantError } = await supabase
        .from('product_variants')
        .insert({
          product_id: insertedProduct.id,
          color: variant.color,
          color_code: variant.colorCode,
          ean: variant.ean,
          stock: variant.stock || 0,
          is_default: variant.is_default || false,
        });

      if (variantError) {
        console.error(`   ❌ Erreur variant ${variant.color}:`, variantError);
      } else {
        console.log(`   ✅ Variant ${variant.color} (${variant.ean})`);
      }
    }

    // 6. INSERT les spécifications
    if (product.specifications && product.specifications.length > 0) {
      const specs = product.specifications.map((spec, index) => ({
        product_id: insertedProduct.id,
        label: spec.label,
        value: spec.value,
        icon: spec.icon || null,
        display_order: index + 1,
      }));

      const { error: specError } = await supabase
        .from('product_specifications')
        .insert(specs);

      if (specError) {
        console.error(`   ⚠️  Erreur specs:`, specError);
      }
    }

    console.log(`✅ ${product.name} (${product.sku}) importé avec succès`);
    return true;

  } catch (error) {
    console.error(`❌ Erreur ${product.sku}:`, error);
    return false;
  }
}

async function main() {
  let success = 0;
  let errors = 0;
  let skipped = 0;

  for (const product of NEW_PRODUCTS) {
    const result = await importNewProduct(product);
    if (result) success++;
    else errors++;
  }

  console.log('\n════════════════════════════════════════════════════');
  console.log('📊 RÉSUMÉ');
  console.log('════════════════════════════════════════════════════');
  console.log(`✅ Succès: ${success}`);
  console.log(`❌ Erreurs: ${errors}`);
  console.log(`⏭️  Ignorés: ${skipped}`);
  console.log(`📦 Total traité: ${NEW_PRODUCTS.length}`);
}

main().catch(console.error);
