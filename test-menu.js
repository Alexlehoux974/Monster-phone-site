// Test pour vérifier la génération du menu LED
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLEDMenu() {
  try {
    // Récupérer les produits LED
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(id, name, slug),
        subcategory:categories!products_subcategory_id_fkey(id, name, slug)
      `)
      .eq('category_id', 'f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f')
      .limit(10);

    if (error) {
      console.error('Erreur Supabase:', error);
      return;
    }

    console.log('Produits LED trouvés:', products?.length || 0);
    
    products?.forEach(p => {
      console.log(`- ${p.name}`);
      console.log(`  Catégorie: ${p.category?.name} (${p.category?.slug})`);
      console.log(`  Sous-catégorie: ${p.subcategory?.name} (${p.subcategory?.slug})`);
    });

    // Récupérer les sous-catégories LED
    const { data: subcategories, error: subError } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', 'f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f')
      .order('name');

    if (subError) {
      console.error('Erreur récupération sous-catégories:', subError);
      return;
    }

    console.log('\nSous-catégories LED dans la base:');
    subcategories?.forEach(s => {
      console.log(`- ${s.name} (${s.slug})`);
    });

  } catch (err) {
    console.error('Erreur:', err);
  }
}

testLEDMenu();