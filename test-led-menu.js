const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = 'https://knhzeguwymytscykujbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaHplZ3V3eW15dHNjeWt1amJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzOTgzNzIsImV4cCI6MjA1MDk3NDM3Mn0.SPHCFwXVLHKuxSCQALoP21eVN1nKfPJL-8yKCFRBw0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLEDMenu() {
  try {
    // Récupérer les produits LED comme le fait l'adapter
    const { data: products, error } = await supabase
      .from('product_full_view')
      .select('*')
      .order('category_name')
      .order('subcategory_name');

    if (error) {
      console.error('Erreur:', error);
      return;
    }

    // Filtrer les produits LED
    const ledProducts = products.filter(p => 
      p.category_name === 'LED' || 
      p.category_name === 'Éclairage LED' ||
      p.category_name === 'eclairage-led'
    );

    console.log(`\n📦 Produits LED trouvés: ${ledProducts.length}`);

    // Simuler la génération du menu comme dans l'adapter
    const categoryKey = 'led';
    const subcategoryMap = new Map();
    const categoryBrands = new Set();

    ledProducts.forEach(product => {
      if (product.brand_name) {
        categoryBrands.add(product.brand_name);
      }

      if (product.subcategory_name) {
        let displaySubcategory = product.subcategory_name;
        const subcatLower = product.subcategory_name.toLowerCase();

        // Appliquer les règles de regroupement
        if (subcatLower === 'ampoules' || subcatLower === 'ampoules smart') {
          displaySubcategory = 'Ampoules';
        } else if (subcatLower === 'bandeaux led' || subcatLower === 'bandes led' || subcatLower === 'barres led') {
          displaySubcategory = 'Bandes & Barres LED';
        } else if (subcatLower === 'kits éclairage' || subcatLower === 'lampes led' || 
                   subcatLower === 'lampes écran' || subcatLower === 'light bars' || 
                   subcatLower === 'néon led' || subcatLower === 'projecteurs' ||
                   subcatLower === 'éclairage studio') {
          displaySubcategory = 'Éclairage Studio';
        }

        if (!subcategoryMap.has(displaySubcategory)) {
          subcategoryMap.set(displaySubcategory, {
            brands: new Set(),
            products: []
          });
        }

        const subcatData = subcategoryMap.get(displaySubcategory);
        if (product.brand_name) {
          subcatData.brands.add(product.brand_name);
        }
        subcatData.products.push({
          name: product.name,
          brand: product.brand_name,
          original_subcategory: product.subcategory_name
        });
      }
    });

    // Afficher la structure du menu LED
    console.log('\n🗂️ STRUCTURE DU MENU LED CONSOLIDÉ:\n');
    console.log('=' .repeat(60));
    console.log(`📂 LED (${ledProducts.length} produits total)`);
    console.log(`   Marques: ${Array.from(categoryBrands).join(', ')}\n`);

    // Afficher chaque sous-catégorie consolidée
    subcategoryMap.forEach((data, subcatName) => {
      console.log(`   📁 ${subcatName} (${data.products.length} produits)`);
      console.log(`      Marques: ${Array.from(data.brands).join(', ')}`);
      
      // Afficher les détails des produits
      console.log(`      Produits:`);
      data.products.forEach(p => {
        console.log(`        - ${p.name}`);
        console.log(`          Marque: ${p.brand || 'Sans marque'}`);
        console.log(`          Origine: ${p.original_subcategory}`);
      });
      console.log('');
    });

    console.log('=' .repeat(60));

    // Vérifier les totaux
    console.log('\n📊 RÉSUMÉ:');
    console.log(`Total produits LED: ${ledProducts.length}`);
    console.log(`Sous-catégories consolidées: ${subcategoryMap.size}`);
    console.log(`Marques présentes: ${categoryBrands.size}`);

  } catch (err) {
    console.error('Erreur:', err);
  }
}

testLEDMenu();