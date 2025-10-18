const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, serviceKey);

async function validateAllRules() {
  console.log('\n🔍 VALIDATION COMPLÈTE DE TOUTES LES RÈGLES\n');
  console.log('='.repeat(80));

  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, price, admin_discount_percent, is_visible, stock_quantity, product_variants(*)');

  const violations = [];
  const warnings = [];

  console.log(`\n📊 Analyse de ${products.length} produits...\n`);

  products.forEach((product, idx) => {
    const hasVariants = product.product_variants && product.product_variants.length > 0;

    // RÈGLE 1: Produits avec variants ne doivent PAS avoir de promo au niveau parent
    if (hasVariants && product.admin_discount_percent && product.admin_discount_percent > 0) {
      violations.push({
        rule: 'RÈGLE 1: Promo variant',
        product: `${product.name} (${product.sku})`,
        issue: `Produit avec variants a une promo parent de ${product.admin_discount_percent}% (devrait être 0)`,
        severity: 'ERROR'
      });
    }

    // RÈGLE 2: Tous les variants doivent avoir la colonne admin_discount_percent
    if (hasVariants) {
      product.product_variants.forEach(variant => {
        if (!('admin_discount_percent' in variant)) {
          violations.push({
            rule: 'RÈGLE 2: Structure variant',
            product: `${product.name} - ${variant.color}`,
            issue: 'Variant sans colonne admin_discount_percent',
            severity: 'CRITICAL'
          });
        }
      });
    }

    // RÈGLE 3: Prix doit être > 0
    if (!product.price || product.price <= 0) {
      violations.push({
        rule: 'RÈGLE 3: Prix valide',
        product: `${product.name} (${product.sku})`,
        issue: `Prix invalide: ${product.price}`,
        severity: 'ERROR'
      });
    }

    // RÈGLE 4: Produits sans variants doivent avoir stock_quantity défini
    if (!hasVariants && (product.stock_quantity === null || product.stock_quantity === undefined)) {
      warnings.push({
        rule: 'RÈGLE 4: Stock sans variants',
        product: `${product.name} (${product.sku})`,
        issue: 'Stock non défini (stock_quantity = null)',
        severity: 'WARNING'
      });
    }

    // RÈGLE 5: Variants doivent avoir un stock défini
    if (hasVariants) {
      product.product_variants.forEach(variant => {
        if (variant.stock === null || variant.stock === undefined) {
          warnings.push({
            rule: 'RÈGLE 5: Stock variant',
            product: `${product.name} - ${variant.color}`,
            issue: 'Stock variant non défini',
            severity: 'WARNING'
          });
        }
      });
    }

    // RÈGLE 6: Promo doit être entre 0 et 100
    if (product.admin_discount_percent && (product.admin_discount_percent < 0 || product.admin_discount_percent > 100)) {
      violations.push({
        rule: 'RÈGLE 6: Promo valide',
        product: `${product.name} (${product.sku})`,
        issue: `Promo invalide: ${product.admin_discount_percent}% (doit être entre 0-100)`,
        severity: 'ERROR'
      });
    }

    if (hasVariants) {
      product.product_variants.forEach(variant => {
        if (variant.admin_discount_percent && (variant.admin_discount_percent < 0 || variant.admin_discount_percent > 100)) {
          violations.push({
            rule: 'RÈGLE 6: Promo variant valide',
            product: `${product.name} - ${variant.color}`,
            issue: `Promo variant invalide: ${variant.admin_discount_percent}%`,
            severity: 'ERROR'
          });
        }
      });
    }
  });

  // Affichage des résultats
  console.log('='.repeat(80));
  console.log('\n📋 RÉSULTATS DE LA VALIDATION\n');

  if (violations.length === 0 && warnings.length === 0) {
    console.log('✅ PARFAIT ! Aucune violation détectée.');
    console.log('✅ Tous les produits respectent toutes les règles.');
    console.log('✅ Le système est prêt pour tous les produits actuels et futurs.');
  } else {
    if (violations.length > 0) {
      console.log(`❌ VIOLATIONS CRITIQUES: ${violations.length}\n`);
      violations.forEach((v, idx) => {
        console.log(`${idx + 1}. [${v.severity}] ${v.rule}`);
        console.log(`   Produit: ${v.product}`);
        console.log(`   Problème: ${v.issue}\n`);
      });
    }

    if (warnings.length > 0) {
      console.log(`⚠️ AVERTISSEMENTS: ${warnings.length}\n`);
      warnings.forEach((w, idx) => {
        console.log(`${idx + 1}. [${w.severity}] ${w.rule}`);
        console.log(`   Produit: ${w.product}`);
        console.log(`   Problème: ${w.issue}\n`);
      });
    }
  }

  console.log('='.repeat(80));
  console.log('\n📌 RÈGLES VALIDÉES:\n');
  console.log('1. ✅ Produits avec variants: promo au niveau variant uniquement');
  console.log('2. ✅ Tous les variants ont la colonne admin_discount_percent');
  console.log('3. ✅ Prix valides (> 0)');
  console.log('4. ✅ Stock défini pour produits sans variants');
  console.log('5. ✅ Stock défini pour chaque variant');
  console.log('6. ✅ Promotions entre 0-100%');
  console.log('\n');
}

validateAllRules();
