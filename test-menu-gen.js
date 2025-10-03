// Test direct menu generation
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMenuGeneration() {
  try {
    // Get all products with categories
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(id, name, slug),
        subcategory:categories!products_subcategory_id_fkey(id, name, slug)
      `)
      .not('category_id', 'is', null);

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    console.log(`Total products with categories: ${products?.length || 0}`);

    // Filter Audio products
    const audioProducts = products?.filter(p => p.category?.slug === 'audio') || [];
    console.log(`\nAudio products found: ${audioProducts.length}`);
    
    // Group Audio by subcategory
    const audioBySubcat = {};
    audioProducts.forEach(p => {
      const subcat = p.subcategory?.slug || 'no-subcategory';
      if (!audioBySubcat[subcat]) {
        audioBySubcat[subcat] = [];
      }
      audioBySubcat[subcat].push(p.name);
    });

    console.log('\nAudio products by subcategory:');
    Object.entries(audioBySubcat).forEach(([subcat, prods]) => {
      console.log(`- ${subcat}: ${prods.length} products`);
      prods.forEach(name => console.log(`  * ${name}`));
    });

    // Filter LED products
    const ledProducts = products?.filter(p => p.category?.slug === 'led') || [];
    console.log(`\nLED products found: ${ledProducts.length}`);
    
    // Group by subcategory
    const ledBySubcat = {};
    ledProducts.forEach(p => {
      const subcat = p.subcategory?.slug || 'no-subcategory';
      if (!ledBySubcat[subcat]) {
        ledBySubcat[subcat] = [];
      }
      ledBySubcat[subcat].push(p.name);
    });

    console.log('\nLED products by subcategory:');
    Object.entries(ledBySubcat).forEach(([subcat, prods]) => {
      console.log(`- ${subcat}: ${prods.length} products`);
      prods.forEach(name => console.log(`  * ${name}`));
    });

    // Check what menu structure would be generated
    console.log('\n--- Menu Structure Generation ---');
    
    // Simulate the logic from adapters.ts
    const categoryKey = 'led';
    if (categoryKey === 'led' || categoryKey === 'eclairage-led') {
      console.log('LED category detected - forcing all subcategories:');
      const ledSubcategories = [
        { name: 'Barre LED', slug: 'barre-led' },
        { name: 'Néon', slug: 'neon' },
        { name: 'Kits Éclairage', slug: 'kits-eclairage' },
        { name: 'Ampoules', slug: 'ampoules' },
        { name: 'RGB', slug: 'rgb' },
        { name: 'Cables Lumineux', slug: 'cables-lumineux' }
      ];
      
      ledSubcategories.forEach(subcat => {
        const productsInSubcat = ledProducts.filter(p => p.subcategory?.slug === subcat.slug);
        console.log(`- ${subcat.name} (${subcat.slug}): ${productsInSubcat.length} products`);
      });
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

testMenuGeneration();