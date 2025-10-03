const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAudioMenu() {
  try {
    // Get audio products
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!products_category_id_fkey(id, name, slug),
        subcategory:categories!products_subcategory_id_fkey(id, name, slug),
        brand:brands(id, name, slug)
      `)
      .eq('category_id', '032b2296-f6e4-4529-a019-c5c74fbc64e1'); // Audio category ID

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    console.log(`Audio products found: ${products?.length || 0}\n`);

    // Group by subcategory
    const subcategoryMap = new Map();
    
    products?.forEach(product => {
      let subcatName = 'Unknown';
      
      // Map to correct subcategories
      const subcatSlug = product.subcategory?.slug?.toLowerCase() || '';
      if (subcatSlug.includes('ecouteur') || subcatSlug === 'earbuds' || subcatSlug === 'airpods') {
        subcatName = 'Écouteurs';
      } else if (subcatSlug.includes('casque') || subcatSlug === 'headphones') {
        subcatName = 'Casques';
      }
      
      if (!subcategoryMap.has(subcatName)) {
        subcategoryMap.set(subcatName, new Set());
      }
      
      if (product.brand?.name) {
        subcategoryMap.get(subcatName).add(product.brand.name);
      }
    });

    console.log('Audio Menu Structure:');
    console.log('===================');
    
    // Display the menu structure like it would appear
    const audioSubcategories = [
      { name: 'Écouteurs', slug: 'ecouteurs' },
      { name: 'Casques', slug: 'casques-audio' }
    ];
    
    audioSubcategories.forEach(subcat => {
      if (subcategoryMap.has(subcat.name)) {
        const brands = Array.from(subcategoryMap.get(subcat.name)).sort();
        console.log(`\n📁 ${subcat.name}`);
        brands.forEach(brand => {
          console.log(`   └─ ${brand}`);
        });
      }
    });
    
    // Check if there are any "sans marques" or unknown categories
    if (subcategoryMap.has('Unknown')) {
      console.log('\n⚠️  Products without proper subcategory:');
      const brands = Array.from(subcategoryMap.get('Unknown')).sort();
      brands.forEach(brand => {
        console.log(`   └─ ${brand}`);
      });
    }
    
  } catch (err) {
    console.error('Error:', err);
  }
}

testAudioMenu();