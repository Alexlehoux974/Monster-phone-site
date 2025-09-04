const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = 'https://knhzeguwymytscykujbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaHplZ3V3eW15dHNjeWt1amJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzOTgzNzIsImV4cCI6MjA1MDk3NDM3Mn0.SPHCFwXVLHKuxSCQALoP21eVN1nKfPJL-8yKCFRBw0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLEDProducts() {
  try {
    // Récupérer tous les produits LED
    const { data: products, error } = await supabase
      .from('product_full_view')
      .select('*')
      .eq('category_name', 'LED')
      .order('subcategory_name');

    if (error) {
      console.error('Erreur:', error);
      return;
    }

    console.log(`\n📦 Total produits LED: ${products.length}`);
    
    // Grouper par sous-catégorie consolidée
    const grouped = {};
    
    products.forEach(product => {
      const subcatLower = (product.subcategory_name || '').toLowerCase();
      let groupName;
      
      // Appliquer les mêmes règles de regroupement que dans l'adapter
      if (subcatLower === 'ampoules' || subcatLower === 'ampoules smart') {
        groupName = 'Ampoules';
      } else if (subcatLower === 'bandeaux led' || subcatLower === 'bandes led' || subcatLower === 'barres led') {
        groupName = 'Bandes & Barres LED';
      } else if (subcatLower === 'kits éclairage' || subcatLower === 'lampes led' || 
                 subcatLower === 'lampes écran' || subcatLower === 'light bars' || 
                 subcatLower === 'néon led' || subcatLower === 'projecteurs' ||
                 subcatLower === 'éclairage studio') {
        groupName = 'Éclairage Studio';
      } else {
        groupName = product.subcategory_name || 'Sans sous-catégorie';
      }
      
      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      grouped[groupName].push({
        name: product.name,
        brand: product.brand_name,
        original_subcategory: product.subcategory_name
      });
    });
    
    // Afficher les résultats
    console.log('\n🗂️ Produits LED par groupe consolidé:\n');
    Object.keys(grouped).sort().forEach(group => {
      console.log(`📂 ${group} (${grouped[group].length} produits):`);
      grouped[group].forEach(p => {
        console.log(`   - ${p.name} [${p.brand}] (origine: ${p.original_subcategory})`);
      });
      console.log('');
    });

  } catch (err) {
    console.error('Erreur:', err);
  }
}

testLEDProducts();