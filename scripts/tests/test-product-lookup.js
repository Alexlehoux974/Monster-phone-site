const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
  console.log('🔍 Recherche du produit HONOR 200 PRO dans Supabase\n');

  // 1. Chercher le produit par nom
  const { data: productsByName, error: nameError } = await supabase
    .from('products')
    .select('id, sku, name, stock_quantity')
    .ilike('name', '%HONOR 200 PRO%');

  console.log('📦 Produits trouvés par nom:');
  if (nameError) {
    console.error('❌ Erreur:', nameError);
  } else if (productsByName && productsByName.length > 0) {
    productsByName.forEach(p => {
      console.log(`  - ID: ${p.id}`);
      console.log(`    SKU: ${p.sku}`);
      console.log(`    Nom: ${p.name}`);
      console.log(`    Stock: ${p.stock_quantity}`);
      console.log('');
    });
  } else {
    console.log('  ⚠️  Aucun produit trouvé');
  }

  // 2. Chercher dans products_full pour voir la structure complète
  const { data: fullProducts, error: fullError } = await supabase
    .from('products_full')
    .select('id, name, stock_quantity, variants')
    .ilike('name', '%HONOR 200 PRO%');

  console.log('\n📦 Produits dans products_full:');
  if (fullError) {
    console.error('❌ Erreur:', fullError);
  } else if (fullProducts && fullProducts.length > 0) {
    fullProducts.forEach(p => {
      console.log(`  - ID: ${p.id}`);
      console.log(`    Nom: ${p.name}`);
      console.log(`    Stock direct: ${p.stock_quantity}`);

      if (p.variants && Array.isArray(p.variants)) {
        console.log(`    Variants (${p.variants.length}):`);
        p.variants.forEach(v => {
          console.log(`      - ${v.color}: stock=${v.stock}, ean=${v.ean || 'N/A'}`);
        });
      } else {
        console.log('    Variants: aucun ou format incorrect');
      }
      console.log('');
    });
  } else {
    console.log('  ⚠️  Aucun produit trouvé dans products_full');
  }

  // 3. Afficher la structure attendue pour le panier
  console.log('\n💡 Format attendu dans le panier:');
  console.log('  {');
  console.log('    id: "uuid-du-produit-supabase",');
  console.log('    name: "HONOR 200 PRO...",');
  console.log('    variant: "vert lagon",  // ← Doit correspondre EXACTEMENT à variant.color');
  console.log('    quantity: 2');
  console.log('  }');
})();
