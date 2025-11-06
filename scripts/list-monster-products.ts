import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listMonsterProducts() {
  console.log('🔍 PRODUITS MONSTER DANS SUPABASE\n');
  console.log('='.repeat(80));

  // Get MONSTER brand ID first
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%monster%')
    .single();

  if (!brand) {
    console.log('❌ Marque MONSTER introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Get all MONSTER products
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      url_slug,
      sku,
      status,
      category:categories!products_category_id_fkey(name),
      short_description,
      description
    `)
    .eq('brand_id', brand.id)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit MONSTER actif trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits MONSTER actifs:\n`);

  products.forEach((p: any, idx: number) => {
    console.log(`${idx + 1}. ${p.name}`);
    console.log(`   Slug: ${p.url_slug}`);
    console.log(`   SKU: ${p.sku}`);
    console.log(`   Catégorie: ${p.category?.name || 'N/A'}`);
    console.log(`   Short desc: ${p.short_description ? '✅' : '❌'}`);
    console.log(`   Description: ${p.description ? '✅' : '❌'}`);
    console.log('');
  });

  console.log('='.repeat(80));
  console.log(`\n📊 Total: ${products.length} produits MONSTER\n`);
}

listMonsterProducts();
