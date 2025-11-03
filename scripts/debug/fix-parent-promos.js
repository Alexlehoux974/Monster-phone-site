const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, serviceKey);

async function fixParentPromos() {
  console.log('🔧 CORRECTION DES PROMOS AU NIVEAU PARENT\n');
  console.log('='.repeat(80));

  // Find products with variants that have parent-level discount
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, admin_discount_percent, product_variants(id)');

  const productsToFix = products.filter(p =>
    p.product_variants && p.product_variants.length > 0 &&
    p.admin_discount_percent && p.admin_discount_percent > 0
  );

  console.log(`\nProduits à corriger: ${productsToFix.length}\n`);

  for (const product of productsToFix) {
    console.log(`Correction de ${product.name} (${product.sku})`);
    console.log(`  Promo parent actuelle: ${product.admin_discount_percent}%`);
    console.log(`  Action: Mise à 0 (les variants gèrent leurs propres promos)`);

    const { error } = await supabase
      .from('products')
      .update({ admin_discount_percent: 0 })
      .eq('id', product.id);

    if (error) {
      console.error(`  ❌ Erreur:`, error);
    } else {
      console.log(`  ✅ Corrigé\n`);
    }
  }

  console.log('='.repeat(80));
  console.log('✅ Correction terminée!\n');
}

fixParentPromos();
