import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listMonsterMontres() {
  console.log('⌚ PRODUITS MONTRES MONSTER DANS SUPABASE\n');
  console.log('='.repeat(80));

  // Récupérer la marque MONSTER
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

  // Récupérer les catégories Montres
  const { data: montresCategories } = await supabase
    .from('categories')
    .select('id, name')
    .or('name.ilike.%montre%,name.ilike.%watch%,name.ilike.%smartwatch%');

  if (!montresCategories || montresCategories.length === 0) {
    console.log('❌ Catégories Montres introuvables');
    return;
  }

  console.log(`✅ Catégories Montres: ${montresCategories.map(c => c.name).join(', ')}\n`);

  const categoryIds = montresCategories.map(c => c.id);

  // Récupérer tous les produits Montres MONSTER
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
    .in('category_id', categoryIds)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit Montre MONSTER actif trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits Montres MONSTER actifs:\n`);

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
  console.log(`\n📊 Total: ${products.length} produits Montres MONSTER\n`);
}

listMonsterMontres();
