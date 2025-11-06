#!/usr/bin/env tsx
/**
 * Export all products from Supabase to products.ts
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('='.repeat(80));
  console.log('🚀 EXPORT PRODUCTS TO TYPESCRIPT');
  console.log('='.repeat(80));

  // 1. Récupérer tous les produits avec leurs relations
  console.log('\n📋 1. Fetching products from Supabase...');
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      *,
      brands (id, name, slug),
      categories!products_category_id_fkey (id, name, slug)
    `)
    .order('name');

  if (productsError) {
    console.error('❌ Error fetching products:', productsError);
    return;
  }

  console.log(`✅ ${products.length} products fetched`);

  // 2. Récupérer tous les variants
  console.log('\n📋 2. Fetching variants...');
  const { data: variants, error: variantsError } = await supabase
    .from('product_variants')
    .select('*')
    .order('is_default', { ascending: false });

  if (variantsError) {
    console.error('❌ Error fetching variants:', variantsError);
    return;
  }

  console.log(`✅ ${variants.length} variants fetched`);

  // 3. Organiser les données
  console.log('\n📊 3. Organizing data...');
  const productMap = new Map();

  products.forEach(product => {
    const productVariants = variants.filter(v => v.product_id === product.id);

    productMap.set(product.id, {
      id: product.id,
      airtableId: product.id, // Using Supabase ID as airtableId
      sku: product.sku,
      name: product.name,
      urlSlug: product.url_slug,
      shortDescription: product.short_description || '',
      fullDescription: product.description || '',

      // Pricing
      basePrice: product.base_price,
      originalPrice: product.original_price,
      discountPercent: product.discount_percent || 0,

      // Brand & Category
      brandId: product.brands?.id || '',
      brandName: product.brands?.name || '',
      brandSlug: product.brands?.slug || '',
      categoryId: product.categories?.id || '',
      categoryName: product.categories?.name || '',
      categorySlug: product.categories?.slug || '',

      // Features
      features: product.features || [],
      specifications: product.specifications || [],

      // Compliance
      repairabilityIndex: product.repairability_index,
      d3e: product.d3e,
      dasHead: product.das_head,
      dasBody: product.das_body,
      dasLimb: product.das_limb,
      energyClass: product.energy_class || '',

      // Meta
      tags: product.tags || [],
      isFeatured: product.is_featured || false,
      isNewArrival: product.is_new_arrival || false,
      showOnHomepage: product.show_on_homepage || false,
      status: product.status || 'active',

      // Variants
      variants: productVariants.map(v => ({
        id: v.id,
        color: v.color,
        colorCode: v.color_code,
        ean: v.ean,
        stock: v.stock,
        is_default: v.is_default,
        adminDiscountPercent: v.admin_discount_percent || 0,
        capacity: v.capacity,
        size: v.size,
      })),

      // Rating (default values)
      rating: {
        average: 0,
        count: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        reviews: []
      }
    });
  });

  // 4. Générer le fichier TypeScript
  console.log('\n💻 4. Generating TypeScript file...');

  const tsContent = `// Structure de données enrichie pour Monster Phone Boutique
// Données importées depuis Supabase
// Last updated: ${new Date().toISOString()}

export interface ProductVariant {
  id?: string;
  color: string;
  colorCode: string;
  ean: string;
  stock: number;
  images?: string[];
  is_default?: boolean;
  adminDiscountPercent?: number;
  capacity?: string | null;
  size?: string | null;
}

export interface ProductSpecification {
  label: string;
  value: string;
  icon?: string;
}

export interface ProductRating {
  average: number;
  count: number;
  distribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews?: Review[];
}

export interface Review {
  id?: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  title?: string;
  helpful?: number;
}

export interface Product {
  // Identifiers
  id: string;
  airtableId: string;
  sku: string;

  // Basic info
  name: string;
  urlSlug: string;
  shortDescription: string;
  fullDescription: string;

  // Pricing
  basePrice: number;
  originalPrice?: number;
  discountPercent: number;

  // Brand & Category
  brandId: string;
  brandName: string;
  brandSlug: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;

  // Features
  features: string[];
  specifications: ProductSpecification[];

  // Compliance
  repairabilityIndex?: number;
  d3e?: number;
  dasHead?: string;
  dasBody?: string;
  dasLimb?: string;
  energyClass?: string;

  // Meta
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  showOnHomepage: boolean;
  status: string;

  // Variants
  variants: ProductVariant[];

  // Rating
  rating: ProductRating;
}

export const PRODUCTS: Product[] = ${JSON.stringify(Array.from(productMap.values()), null, 2)};

export default PRODUCTS;
`;

  // 5. Écrire le fichier
  const outputPath = 'src/data/products.ts';
  writeFileSync(outputPath, tsContent, 'utf-8');

  console.log(`✅ File written: ${outputPath}`);
  console.log(`📊 Total products: ${productMap.size}`);
  console.log(`📊 Total variants: ${variants.length}`);

  console.log('\n' + '='.repeat(80));
  console.log('✅ EXPORT COMPLETE!');
  console.log('='.repeat(80));
}

main().catch(console.error);
