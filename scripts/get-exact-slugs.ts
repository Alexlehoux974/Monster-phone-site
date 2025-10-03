import { supabase } from '../lib/supabase/client';

async function getExactSlugs() {
  const patterns = [
    'Monster N-Lite 206',
    'Monster N-Lite 203',
    'NOKIA G22',
    'Nokia 110',
    'MONSTER TH300'
  ];

  console.log('🔍 Recherche des slugs exacts...\n');

  for (const pattern of patterns) {
    console.log(`\n📦 Recherche: "${pattern}"`);

    const { data, error } = await supabase
      .from('products')
      .select('id, name, url_slug, sku, status')
      .ilike('name', `%${pattern}%`)
      .eq('status', 'active');

    if (error || !data || data.length === 0) {
      console.log(`   ❌ Aucun produit trouvé`);
      continue;
    }

    data.forEach(product => {
      console.log(`\n   • ${product.name}`);
      console.log(`     Slug: ${product.url_slug}`);
      console.log(`     SKU: ${product.sku}`);
      console.log(`     Status: ${product.status}`);
    });
  }
}

getExactSlugs().then(() => {
  console.log('\n✅ Terminé\n');
  process.exit(0);
}).catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
