const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hvxyvxokeprpqozfwnsh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHl2eG9rZXBycHFvemZ3bnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NTI4MjQsImV4cCI6MjA1MTIyODgyNH0.PojzcAexbxZCsFjf7DF9RQxf3C9WIfhbZ03uWW25KY8'
);

async function analyzeProducts() {
  console.log('🔍 Analyse des produits et leurs variantes...\n');

  // 1. Récupérer tous les produits avec leurs variantes
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      url_slug,
      sku,
      category:categories!products_category_id_fkey(name),
      product_variants(
        id,
        color,
        color_code,
        storage,
        stock
      )
    `)
    .order('name');

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  // Grouper les produits par nom de base (sans variantes dans le nom)
  const productGroups = new Map();

  products.forEach(product => {
    const categoryName = product.category?.name || 'Autre';
    const hasVariants = product.product_variants && product.product_variants.length > 0;

    console.log(`\n📦 ${product.name}`);
    console.log(`   Catégorie: ${categoryName}`);
    console.log(`   SKU: ${product.sku}`);
    console.log(`   Slug: ${product.url_slug}`);
    console.log(`   Variantes: ${hasVariants ? product.product_variants.length : 0}`);

    if (hasVariants) {
      product.product_variants.forEach(variant => {
        console.log(`      - ${variant.color || 'N/A'} ${variant.storage || ''} (Stock: ${variant.stock})`);
      });
    }

    // Analyser le pattern de nommage
    const baseName = product.name
      .replace(/\s*-\s*(Noir|Blanc|Bleu|Vert|Rouge|Rose|Gris|Or|Argent|Violet|Cyan|Pourpre|Doré).*$/i, '')
      .replace(/\s*\d+(GB|Mo|TB)\s*/gi, '')
      .trim();

    if (!productGroups.has(baseName)) {
      productGroups.set(baseName, []);
    }
    productGroups.get(baseName).push({
      ...product,
      categoryName
    });
  });

  console.log('\n\n📊 ANALYSE DES GROUPES DE PRODUITS:\n');
  console.log('=' .repeat(80));

  productGroups.forEach((group, baseName) => {
    if (group.length > 1) {
      console.log(`\n🔄 GROUPE: "${baseName}" (${group.length} produits)`);
      console.log(`   Catégorie: ${group[0].categoryName}`);
      console.log(`   Produits:`);

      group.forEach(p => {
        const hasVariants = p.product_variants && p.product_variants.length > 0;
        console.log(`      • ${p.name} ${hasVariants ? `(${p.product_variants.length} variantes)` : '(pas de variantes)'}`);
        console.log(`        → ${p.url_slug}`);
      });

      console.log(`   ⚠️  SUGGESTION: Ces produits devraient être regroupés en une seule fiche avec sélecteur de variantes`);
    }
  });

  console.log('\n\n📈 RÉSUMÉ:\n');
  console.log(`Total de produits: ${products.length}`);
  console.log(`Produits avec variantes: ${products.filter(p => p.product_variants?.length > 0).length}`);
  console.log(`Produits sans variantes: ${products.filter(p => !p.product_variants || p.product_variants.length === 0).length}`);
  console.log(`Groupes potentiels à fusionner: ${Array.from(productGroups.values()).filter(g => g.length > 1).length}`);
}

analyzeProducts().then(() => {
  console.log('\n✅ Analyse terminée');
  process.exit(0);
}).catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
