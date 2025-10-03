import { supabase } from '../lib/supabase/client';

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
        stock
      )
    `)
    .eq('status', 'active')
    .order('name');

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  console.log(`\n📊 Total de ${products.length} produits trouvés\n`);

  // Grouper par catégorie
  const byCategory = new Map<string, typeof products>();

  products.forEach(product => {
    const categoryName = product.category?.name || 'Autre';
    if (!byCategory.has(categoryName)) {
      byCategory.set(categoryName, []);
    }
    byCategory.get(categoryName)!.push(product);
  });

  // Analyser chaque catégorie
  byCategory.forEach((categoryProducts, categoryName) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📂 Catégorie: ${categoryName} (${categoryProducts.length} produits)`);
    console.log('='.repeat(80));

    // Détecter les produits qui devraient être groupés
    const baseNames = new Map<string, typeof categoryProducts>();

    categoryProducts.forEach(product => {
      // Extraire le nom de base (sans couleur, stockage, etc.)
      let baseName = product.name
        .replace(/\s*-\s*(Noir|Blanc|Bleu|Vert|Rouge|Rose|Gris|Or|Argent|Violet|Cyan|Pourpre|Doré|Titanium|Graphite|Sierra|Midnight|Starlight|Purple|Yellow|Pink|Green|Blue|Black|White).*$/i, '')
        .replace(/\s*\(\d+(GB|Mo|TB|Go)\)$/gi, '')
        .replace(/\s+\d+(GB|Mo|TB|Go)\s*$/gi, '')
        .trim();

      if (!baseNames.has(baseName)) {
        baseNames.set(baseName, []);
      }
      baseNames.get(baseName)!.push(product);
    });

    // Afficher les résultats
    baseNames.forEach((group, baseName) => {
      const hasVariants = group.some(p => p.product_variants && p.product_variants.length > 0);

      if (group.length === 1) {
        const product = group[0];
        const variantCount = product.product_variants?.length || 0;

        console.log(`\n✅ ${product.name}`);
        if (variantCount > 0) {
          console.log(`   ✓ A déjà ${variantCount} variante(s):`);
          product.product_variants!.forEach(v => {
            console.log(`      • ${v.color || 'N/A'} (Stock: ${v.stock})`);
          });
        } else {
          console.log(`   ℹ️  Pas de variantes (produit unique)`);
        }
      } else {
        console.log(`\n⚠️  GROUPE À FUSIONNER: "${baseName}" (${group.length} produits séparés)`);

        group.forEach(product => {
          const variantCount = product.product_variants?.length || 0;
          console.log(`\n   📦 ${product.name}`);
          console.log(`      URL: ${product.url_slug}`);
          console.log(`      SKU: ${product.sku}`);

          if (variantCount > 0) {
            console.log(`      Variantes actuelles (${variantCount}):`);
            product.product_variants!.forEach(v => {
              console.log(`         • ${v.color || 'N/A'} (Stock: ${v.stock})`);
            });
          } else {
            console.log(`      ⚠️  Pas de variantes - devrait être fusionné avec les autres`);
          }
        });

        console.log(`\n   💡 SOLUTION:`);
        console.log(`      1. Garder le premier produit comme produit principal`);
        console.log(`      2. Créer/migrer des variantes pour les autres versions`);
        console.log(`      3. Supprimer les produits dupliqués`);
      }
    });
  });

  // Résumé global
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('📊 RÉSUMÉ GLOBAL');
  console.log('='.repeat(80));

  const withVariants = products.filter(p => p.product_variants && p.product_variants.length > 0);
  const withoutVariants = products.filter(p => !p.product_variants || p.product_variants.length === 0);

  console.log(`\nTotal produits: ${products.length}`);
  console.log(`✅ Avec variantes: ${withVariants.length}`);
  console.log(`⚠️  Sans variantes: ${withoutVariants.length}`);

  byCategory.forEach((categoryProducts, categoryName) => {
    console.log(`\n${categoryName}:`);
    const withV = categoryProducts.filter(p => p.product_variants && p.product_variants.length > 0);
    const withoutV = categoryProducts.filter(p => !p.product_variants || p.product_variants.length === 0);
    console.log(`   Avec variantes: ${withV.length}`);
    console.log(`   Sans variantes: ${withoutV.length}`);
  });
}

analyzeProducts().then(() => {
  console.log('\n✅ Analyse terminée\n');
  process.exit(0);
}).catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
