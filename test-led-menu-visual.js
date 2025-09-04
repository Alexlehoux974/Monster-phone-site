const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = 'https://knhzeguwymytscykujbe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaHplZ3V3eW15dHNjeWt1amJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzOTgzNzIsImV4cCI6MjA1MDk3NDM3Mn0.SPHCFwXVLHKuxSCQALoP21eVN1nKfPJL-8yKCFRBw0o';

const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction helper pour vérifier si un produit appartient à une sous-catégorie consolidée LED
const matchesConsolidatedSubcategory = (productSubcat, targetSubcat) => {
  if (!productSubcat) return false;
  
  const productSubcatLower = productSubcat.toLowerCase();
  const targetSubcatLower = targetSubcat.toLowerCase();
  
  // Pour les catégories LED consolidées
  if (targetSubcatLower === 'ampoules') {
    return productSubcatLower === 'ampoules' || productSubcatLower === 'ampoules smart';
  } else if (targetSubcatLower === 'bandes & barres led') {
    return productSubcatLower === 'bandeaux led' || productSubcatLower === 'bandes led' || productSubcatLower === 'barres led';
  } else if (targetSubcatLower === 'éclairage studio') {
    return productSubcatLower === 'kits éclairage' || productSubcatLower === 'lampes led' || 
           productSubcatLower === 'lampes écran' || productSubcatLower === 'light bars' || 
           productSubcatLower === 'néon led' || productSubcatLower === 'projecteurs' ||
           productSubcatLower === 'éclairage studio';
  }
  
  // Pour les autres cas, comparaison exacte
  return productSubcat === targetSubcat;
};

async function testLEDMenuVisual() {
  try {
    // Récupérer tous les produits LED
    const { data: products, error } = await supabase
      .from('product_full_view')
      .select('*')
      .or('category_name.eq.LED,category_name.eq.Éclairage LED,category_name.eq.eclairage-led')
      .order('subcategory_name');

    if (error) {
      console.error('Erreur:', error);
      return;
    }

    console.log(`\n📦 Total produits LED trouvés: ${products.length}`);
    
    // Simuler ce qui devrait apparaître dans le menu avec la nouvelle logique
    const consolidatedSubcategories = [
      'Ampoules',
      'Bandes & Barres LED', 
      'Éclairage Studio'
    ];
    
    console.log('\n🔍 SIMULATION DU MENU LED AVEC LA NOUVELLE LOGIQUE:\n');
    console.log('=' .repeat(70));
    
    consolidatedSubcategories.forEach(subcategory => {
      // Filtrer les produits selon la logique consolidée
      const subcatProducts = products.filter(p => 
        matchesConsolidatedSubcategory(p.subcategory_name, subcategory)
      );
      
      if (subcatProducts.length > 0) {
        console.log(`\n📂 ${subcategory} (${subcatProducts.length} produits)`);
        console.log('   ' + '-'.repeat(60));
        
        // Grouper par marque
        const brandGroups = {};
        subcatProducts.forEach(p => {
          const brand = p.brand_name || 'Sans marque';
          if (!brandGroups[brand]) {
            brandGroups[brand] = [];
          }
          brandGroups[brand].push(p);
        });
        
        // Afficher par marque
        Object.keys(brandGroups).sort().forEach(brand => {
          console.log(`   🏷️  ${brand} (${brandGroups[brand].length} produits):`);
          brandGroups[brand].forEach(p => {
            console.log(`      • ${p.name}`);
            console.log(`        Catégorie originale: ${p.subcategory_name}`);
          });
        });
      }
    });
    
    // Afficher aussi les autres sous-catégories non consolidées
    const otherSubcategories = ['Déco LED', 'Panneaux LED', 'Rétroéclairage TV'];
    
    console.log('\n\n📂 AUTRES SOUS-CATÉGORIES (non consolidées):');
    console.log('   ' + '-'.repeat(60));
    
    otherSubcategories.forEach(subcat => {
      const subcatProducts = products.filter(p => p.subcategory_name === subcat);
      if (subcatProducts.length > 0) {
        console.log(`   • ${subcat}: ${subcatProducts.length} produit(s)`);
        subcatProducts.forEach(p => {
          console.log(`      - ${p.name} [${p.brand_name}]`);
        });
      }
    });
    
    console.log('\n' + '=' .repeat(70));
    
    // Résumé
    console.log('\n📊 RÉSUMÉ DE LA CONSOLIDATION:');
    console.log(`Total produits LED: ${products.length}`);
    
    const ampouleProducts = products.filter(p => 
      matchesConsolidatedSubcategory(p.subcategory_name, 'Ampoules')
    );
    const bandesProducts = products.filter(p => 
      matchesConsolidatedSubcategory(p.subcategory_name, 'Bandes & Barres LED')
    );
    const eclairageProducts = products.filter(p => 
      matchesConsolidatedSubcategory(p.subcategory_name, 'Éclairage Studio')
    );
    
    console.log(`• Ampoules: ${ampouleProducts.length} produits`);
    console.log(`• Bandes & Barres LED: ${bandesProducts.length} produits`);
    console.log(`• Éclairage Studio: ${eclairageProducts.length} produits`);
    
    const totalConsolidated = ampouleProducts.length + bandesProducts.length + eclairageProducts.length;
    console.log(`\nTotal dans les catégories consolidées: ${totalConsolidated}`);
    console.log(`Autres sous-catégories: ${products.length - totalConsolidated}`);
    
  } catch (err) {
    console.error('Erreur:', err);
  }
}

testLEDMenuVisual();