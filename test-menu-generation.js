const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knhzeguwymytscykujbe.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaHplZ3V3eW15dHNjeWt1amJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzOTgzNzIsImV4cCI6MjA1MDk3NDM3Mn0.SPHCFwXVLHKuxSCQALoP21eVN1nKfPJL-8yKCFRBw0o';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testMenuGeneration() {
  try {
    // Récupérer tous les produits
    const { data: products, error } = await supabase
      .from('product_full_view')
      .select('*')
      .order('category_name', { ascending: true })
      .order('subcategory_name', { ascending: true });

    if (error) {
      console.error('Erreur Supabase:', error);
      return;
    }

    console.log(`\n📦 Total produits récupérés: ${products.length}`);

    // Analyser par catégorie
    const categoryMap = new Map();

    products.forEach(product => {
      const catKey = product.category_name || 'Sans catégorie';
      
      if (!categoryMap.has(catKey)) {
        categoryMap.set(catKey, {
          products: [],
          subcategories: new Map(),
          brands: new Set()
        });
      }

      const catData = categoryMap.get(catKey);
      catData.products.push(product);
      
      if (product.brand_name) {
        catData.brands.add(product.brand_name);
      }

      const subcatKey = product.subcategory_name || 'Tous les produits';
      if (!catData.subcategories.has(subcatKey)) {
        catData.subcategories.set(subcatKey, {
          products: [],
          brands: new Set()
        });
      }

      const subcatData = catData.subcategories.get(subcatKey);
      subcatData.products.push(product);
      if (product.brand_name) {
        subcatData.brands.add(product.brand_name);
      }
    });

    // Afficher la structure du menu
    console.log('\n🗂️ STRUCTURE DU MENU GÉNÉRÉE:\n');
    console.log('=' .repeat(50));

    categoryMap.forEach((catData, catName) => {
      console.log(`\n📂 ${catName} (${catData.products.length} produits, ${catData.brands.size} marques)`);
      console.log(`   Marques: ${Array.from(catData.brands).join(', ')}`);
      
      catData.subcategories.forEach((subcatData, subcatName) => {
        console.log(`   └─ ${subcatName} (${subcatData.products.length} produits)`);
        console.log(`      Marques: ${Array.from(subcatData.brands).join(', ')}`);
      });
    });

    console.log('\n' + '=' .repeat(50));
    console.log('✅ Test de génération du menu terminé');

  } catch (err) {
    console.error('Erreur:', err);
  }
}

testMenuGeneration();