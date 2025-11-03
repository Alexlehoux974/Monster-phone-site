const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, serviceKey);

async function analyzeAllProducts() {
  console.log('🔍 ANALYSE COMPLÈTE DE TOUS LES PRODUITS\n');
  console.log('='.repeat(80));

  // 1. Count total products
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, sku, price, admin_discount_percent, is_visible, product_variants(*)');

  if (productsError) {
    console.error('❌ Erreur chargement produits:', productsError);
    return;
  }

  console.log(`\n📊 STATISTIQUES GLOBALES`);
  console.log(`Total produits: ${products.length}`);

  const withVariants = products.filter(p => p.product_variants && p.product_variants.length > 0);
  const withoutVariants = products.filter(p => !p.product_variants || p.product_variants.length === 0);

  console.log(`  - Avec variants: ${withVariants.length}`);
  console.log(`  - Sans variants: ${withoutVariants.length}`);

  // 2. Check variant structure
  console.log(`\n📦 ANALYSE DES VARIANTS`);
  let totalVariants = 0;
  let variantsWithPromo = 0;
  let variantsWithoutAdminDiscountColumn = 0;

  withVariants.forEach(product => {
    product.product_variants.forEach(variant => {
      totalVariants++;
      if (variant.admin_discount_percent && variant.admin_discount_percent > 0) {
        variantsWithPromo++;
      }
      if (!('admin_discount_percent' in variant)) {
        variantsWithoutAdminDiscountColumn++;
      }
    });
  });

  console.log(`  Total variants: ${totalVariants}`);
  console.log(`  Variants avec promotion admin: ${variantsWithPromo}`);
  console.log(`  Variants SANS colonne admin_discount_percent: ${variantsWithoutAdminDiscountColumn}`);

  // 3. Check products without variants
  console.log(`\n🏷️ ANALYSE PRODUITS SANS VARIANTS`);
  let productsWithPromo = 0;
  withoutVariants.forEach(product => {
    if (product.admin_discount_percent && product.admin_discount_percent > 0) {
      productsWithPromo++;
    }
  });
  console.log(`  Produits avec promotion admin: ${productsWithPromo}/${withoutVariants.length}`);

  // 4. Detailed variant report
  console.log(`\n📋 DÉTAIL DES PRODUITS AVEC VARIANTS ET LEURS PROMOTIONS`);
  console.log('='.repeat(80));

  withVariants.forEach(product => {
    const variantsInfo = product.product_variants.map(v => {
      const promo = v.admin_discount_percent || 0;
      return `${v.color}: ${promo}%`;
    }).join(', ');

    console.log(`\n${product.name} (${product.sku})`);
    console.log(`  Variants: ${variantsInfo}`);
    console.log(`  Produit parent promo: ${product.admin_discount_percent || 0}%`);
  });

  // 5. Check for potential issues
  console.log(`\n\n⚠️ VÉRIFICATION DES PROBLÈMES POTENTIELS`);
  console.log('='.repeat(80));

  let issues = [];

  // Issue 1: Variants without admin_discount_percent column
  if (variantsWithoutAdminDiscountColumn > 0) {
    issues.push(`❌ ${variantsWithoutAdminDiscountColumn} variants n'ont PAS la colonne admin_discount_percent`);
  }

  // Issue 2: Products with variants that have product-level discount
  const productsWithVariantsAndPromo = withVariants.filter(p =>
    p.admin_discount_percent && p.admin_discount_percent > 0
  );
  if (productsWithVariantsAndPromo.length > 0) {
    issues.push(`⚠️ ${productsWithVariantsAndPromo.length} produits avec variants ont une promo au niveau parent (devrait être 0)`);
  }

  // Issue 3: Invisible products
  const invisibleProducts = products.filter(p => !p.is_visible);
  if (invisibleProducts.length > 0) {
    issues.push(`ℹ️ ${invisibleProducts.length} produits sont marqués invisibles (is_visible=false)`);
  }

  if (issues.length === 0) {
    console.log('✅ Aucun problème détecté ! Tous les produits sont correctement configurés.');
  } else {
    issues.forEach(issue => console.log(issue));
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ ANALYSE TERMINÉE\n');
}

analyzeAllProducts();
