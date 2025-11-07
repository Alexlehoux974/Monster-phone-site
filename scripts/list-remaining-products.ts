import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listRemainingProducts() {
  console.log('🔍 PRODUITS RESTANTS À ENRICHIR\n');
  console.log('='.repeat(80));

  const brandsToCheck = ['ABYX', 'Autre', 'MY WAY', 'NOKIA', 'TIGER POWER'];

  for (const brandName of brandsToCheck) {
    const { data: brand } = await supabase
      .from('brands')
      .select('id, name')
      .ilike('name', brandName)
      .single();

    if (!brand) continue;

    const { data: products } = await supabase
      .from('products')
      .select('id, name, url_slug, short_description, price, category:categories!products_category_id_fkey(name)')
      .eq('brand_id', brand.id)
      .eq('status', 'active')
      .order('name');

    if (!products || products.length === 0) continue;

    console.log(`\n📦 ${brand.name} (${products.length} produits):\n`);

    for (const product of products) {
      console.log(`${product.name}`);
      console.log(`   Slug: ${product.url_slug}`);
      console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);
      console.log(`   Prix: ${product.price}€`);
      console.log(`   Short desc actuelle: ${product.short_description || '(vide)'}`);

      const { data: sections } = await supabase
        .from('product_content_sections')
        .select('section_type')
        .eq('product_id', product.id);

      const sectionCount = sections?.length || 0;
      const cmsStatus = sectionCount === 4 ? '✅' : sectionCount > 0 ? '⚠️' : '❌';
      console.log(`   Sections CMS: ${cmsStatus} ${sectionCount}/4`);
      console.log('');
    }
  }

  console.log('='.repeat(80));
}

listRemainingProducts();
