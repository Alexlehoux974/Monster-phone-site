import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listHifutureProducts() {
  console.log('🔍 PRODUITS HIFUTURE DANS SUPABASE\n');
  console.log('='.repeat(80));

  // Récupérer la marque HIFUTURE
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%hifuture%')
    .single();

  if (!brand) {
    console.log('❌ Marque HIFUTURE introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer tous les produits HIFUTURE
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
    console.log('❌ Aucun produit HIFUTURE actif trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits HIFUTURE actifs:\n`);

  // Grouper par catégorie
  const byCategory: Record<string, any[]> = {};
  products.forEach((p: any) => {
    const catName = p.category?.name || 'Sans catégorie';
    if (!byCategory[catName]) {
      byCategory[catName] = [];
    }
    byCategory[catName].push(p);
  });

  // Afficher par catégorie
  Object.keys(byCategory).sort().forEach((catName) => {
    console.log(`\n📂 ${catName} (${byCategory[catName].length} produits):`);
    console.log('-'.repeat(80));

    byCategory[catName].forEach((p: any, idx: number) => {
      console.log(`${idx + 1}. ${p.name}`);
      console.log(`   Slug: ${p.url_slug}`);
      console.log(`   SKU: ${p.sku}`);
      console.log(`   Short desc: ${p.short_description ? '✅' : '❌'}`);
      console.log(`   Description: ${p.description ? '✅' : '❌'}`);
      if (p.description) {
        console.log(`   Long (${p.description.length} car): ${p.description.substring(0, 150)}${p.description.length > 150 ? '...' : ''}`);
      }
      console.log('');
    });
  });

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSUMÉ PAR CATÉGORIE:`);
  Object.keys(byCategory).sort().forEach((catName) => {
    const count = byCategory[catName].length;
    const withShort = byCategory[catName].filter((p: any) => p.short_description).length;
    const withLong = byCategory[catName].filter((p: any) => p.description).length;
    console.log(`   ${catName}: ${count} produits (Short: ${withShort}/${count}, Long: ${withLong}/${count})`);
  });
  console.log(`\n   📦 Total: ${products.length} produits HIFUTURE\n`);
}

listHifutureProducts();
