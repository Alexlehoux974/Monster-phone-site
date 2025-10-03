const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testIntegration() {
  console.log('🧪 Test d\'intégration Supabase\n');

  try {
    // Test 1: Récupérer les catégories
    console.log('📋 Test 1: Récupération des catégories...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .order('display_order');

    if (catError) throw catError;

    console.log(`✅ ${categories.length} catégories principales trouvées:`);
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.slug})`);
    });

    // Test 2: Récupérer les sous-catégories
    console.log('\n📋 Test 2: Récupération des sous-catégories...');
    const { data: subcategories, error: subError } = await supabase
      .from('categories')
      .select('*, parent:parent_id(*)')
      .not('parent_id', 'is', null);

    if (subError) throw subError;

    console.log(`✅ ${subcategories.length} sous-catégories trouvées`);

    // Test 3: Compter les produits par catégorie
    console.log('\n📋 Test 3: Comptage des produits par catégorie...');

    for (const cat of categories) {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', cat.id)
        .neq('status', 'discontinued');

      if (!error) {
        console.log(`  - ${cat.name}: ${count} produits`);
      }
    }

    // Test 4: Vérifier les marques
    console.log('\n📋 Test 4: Récupération des marques...');
    const { data: brands, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .order('name');

    if (brandError) throw brandError;

    console.log(`✅ ${brands.length} marques trouvées`);
    console.log('  Top 5 marques:', brands.slice(0, 5).map(b => b.name).join(', '));

    // Test 5: Vérifier la structure complète
    console.log('\n📋 Test 5: Vérification de la structure complète...');
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories!products_category_id_fkey(*)
      `)
      .neq('status', 'discontinued')
      .limit(5);

    if (prodError) throw prodError;

    console.log(`✅ Échantillon de ${products.length} produits avec relations:`);
    products.forEach(p => {
      console.log(`  - ${p.name}`);
      console.log(`    Marque: ${p.brand?.name || 'N/A'}`);
      console.log(`    Catégorie: ${p.category?.name || 'N/A'}`);
    });

    console.log('\n✅ Tous les tests ont réussi !');
    console.log('\n📍 Pages à vérifier:');
    console.log('  - http://localhost:3000/smartphones');
    console.log('  - http://localhost:3000/tablettes');
    console.log('  - http://localhost:3000/montres');
    console.log('  - http://localhost:3000/audio');
    console.log('  - http://localhost:3000/accessoires');
    console.log('  - http://localhost:3000/test-categories');
    console.log('  - http://localhost:3000/nos-produits');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
}

testIntegration();