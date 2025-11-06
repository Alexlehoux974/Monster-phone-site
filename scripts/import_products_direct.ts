#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Liste des nouveaux EAN codes (des 96 nouveaux produits)
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

// Produits mappés à partir de la génération (96 produits)
interface NewProduct {
  sku: string;
  name: string;
  urlSlug: string;
  brand: string;
  category: string;
  subcategory: string | null;
  price: number;
  description: string;
  shortDescription: string;
  repairabilityIndex?: number;
  dasHead?: string;
  dasBody?: string;
  variants: Array<{
    color: string;
    colorCode: string;
    ean: string;
    stock: number;
    is_default: boolean;
  }>;
}

const NEW_PRODUCTS: NewProduct[] = [
  {
    sku: 'SKU-0001',
    name: 'HONOR X6C 6+6/128',
    urlSlug: 'honor-x6c-6-6-128',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: null,
    price: 199.99,
    description: '[PLACEHOLDER] Description détaillée pour HONOR X6C 6+6/128',
    shortDescription: '[PLACEHOLDER] Caractéristiques principales du produit',
    repairabilityIndex: 8.1,
    dasHead: '0.76 W/kg',
    dasBody: '1.19 W/kg',
    variants: [
      { color: 'Bleu', colorCode: '#0066CC', ean: '6936520869527', stock: 0, is_default: true },
      { color: 'Noir', colorCode: '#000000', ean: '6936520869510', stock: 0, is_default: false },
    ],
  },
  {
    sku: 'SKU-0002',
    name: 'HONOR 200 5G 12+12/512',
    urlSlug: 'honor-200-5g-12-12-512',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: null,
    price: 699.99,
    description: '[PLACEHOLDER] Description détaillée pour HONOR 200 5G 12+12/512',
    shortDescription: '[PLACEHOLDER] Caractéristiques principales du produit',
    repairabilityIndex: 8.8,
    dasHead: '0.73 W/kg',
    dasBody: '0.97 W/kg',
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6936520857951', stock: 0, is_default: true },
    ],
  },
  {
    sku: 'SKU-0003',
    name: 'TELEPHONE HONOR 200 PRO 12+12/512',
    urlSlug: 'telephone-honor-200-pro-12-12-512',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: null,
    price: 799.99,
    description: '[PLACEHOLDER] Description détaillée pour TELEPHONE HONOR 200 PRO 12+12/512',
    shortDescription: '[PLACEHOLDER] Caractéristiques principales du produit',
    repairabilityIndex: 9.2,
    dasHead: '0.71 W/kg',
    dasBody: '0.95 W/kg',
    variants: [
      { color: 'Vert', colorCode: '#008000', ean: '6936520845231', stock: 0, is_default: true },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '6936520845248', stock: 0, is_default: false },
    ],
  },
  // Continuez avec tous les 96 produits...
  // Pour l'instant, je vais juste importer ces 3 premiers pour tester
];

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
  console.log('🚀 IMPORT TEST - 3 PREMIERS PRODUITS');
  console.log('=' .repeat(80));

  let successCount = 0;
  let errorCount = 0;

  for (const product of NEW_PRODUCTS) {
    try {
      console.log(`\n⏳ Import: ${product.name}...`);

      // 1. Obtenir brand_id et category_id
      const brandId = await getBrandId(product.brand);
      const categoryId = await getCategoryId(product.category);

      if (!brandId || !categoryId) {
        console.error(`❌ Impossible d'obtenir brand_id ou category_id`);
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
          subcategory: product.subcategory,
          description: product.description,
          short_description: product.shortDescription,
          price: product.price,
          repairability_index: product.repairabilityIndex,
          das_head: product.dasHead,
          das_body: product.dasBody,
          status: 'active',
          warranty: '2 ans',
          delivery_time: '24-48h',
          images: [],
          specifications: [
            { label: '[PLACEHOLDER] Spécification 1', value: 'Valeur 1' },
            { label: '[PLACEHOLDER] Spécification 2', value: 'Valeur 2' },
          ],
          highlights: [
            '[PLACEHOLDER] Point fort 1',
            '[PLACEHOLDER] Point fort 2',
            '[PLACEHOLDER] Point fort 3',
          ],
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
        const { error: variantError } = await supabase
          .from('product_variants')
          .insert({
            product_id: productId,
            color: variant.color,
            color_code: variant.colorCode,
            ean: variant.ean,
            stock_quantity: variant.stock,
            is_default: variant.is_default,
            images: [],
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
  console.log('📊 RÉSUMÉ DE L\'IMPORT TEST');
  console.log('=' .repeat(80));
  console.log(`✅ Succès: ${successCount}`);
  console.log(`❌ Erreurs: ${errorCount}`);
  console.log(`📦 Total testé: ${NEW_PRODUCTS.length} produits`);
}

importProducts().catch(console.error);
