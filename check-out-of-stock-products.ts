import { createClient } from '@supabase/supabase-js';
import { supabaseProductToLegacy } from './src/lib/supabase/adapters';
import { isCompletelyOutOfStock } from './src/lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkOutOfStockProducts() {
  console.log('🔍 RECHERCHE DES PRODUITS HORS STOCK...\n');

  // Récupérer tous les produits actifs
  const { data: products, error } = await supabase
    .from('products_full')
    .select('*')
    .eq('status', 'active');

  if (error) {
    console.error('❌ Erreur:', error);
    return;
  }

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit trouvé');
    return;
  }

  console.log(`✅ ${products.length} produits actifs trouvés\n`);

  // Analyser chaque produit
  const outOfStockProducts = [];

  for (const product of products) {
    const legacyProduct = supabaseProductToLegacy(product);
    const isOutOfStock = isCompletelyOutOfStock(legacyProduct);

    if (isOutOfStock) {
      outOfStockProducts.push({
        name: product.name,
        hasVariants: !!product.has_variants,
        stockQuantity: product.stock_quantity,
        variants: product.variants || []
      });
    }
  }

  console.log(`\n📊 RÉSULTAT: ${outOfStockProducts.length} produits HORS STOCK trouvés\n`);

  if (outOfStockProducts.length === 0) {
    console.log('✅ Aucun produit hors stock - tous les produits ont du stock disponible');
  } else {
    console.log('🔴 PRODUITS HORS STOCK (devraient avoir un badge gris):');
    console.log('='.repeat(60));

    outOfStockProducts.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   - Has variants: ${product.hasVariants}`);
      console.log(`   - Stock quantity: ${product.stockQuantity}`);

      if (product.hasVariants && product.variants.length > 0) {
        console.log(`   - Variants (${product.variants.length}):`);
        product.variants.forEach((v: any) => {
          console.log(`     * ${v.color}: stock = ${v.stock}`);
        });
      }
    });
  }
}

checkOutOfStockProducts().catch(console.error);
