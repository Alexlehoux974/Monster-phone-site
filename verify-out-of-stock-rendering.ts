// Vérification finale du rendu des badges "Rupture de stock"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction identique à celle utilisée dans le frontend
function isCompletelyOutOfStock(product: {
  variants?: { stock: number }[];
  stockQuantity?: number;
  has_variants?: boolean;
}): boolean {
  if (product.variants && product.variants.length > 0) {
    return product.variants.every(variant => (variant.stock ?? 0) === 0);
  }
  return (product.stockQuantity ?? 0) === 0;
}

async function verifyOutOfStockBadges() {
  console.log('\n🔍 VÉRIFICATION FINALE DES BADGES "RUPTURE DE STOCK"\n');

  // Récupérer les produits exactement comme getProducts() le fait maintenant
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(name, slug),
      category:categories!products_category_id_fkey(name, slug),
      product_variants (
        id,
        color,
        color_code,
        size,
        ean,
        stock,
        price_adjustment,
        is_default
      )
    `)
    .neq('status', 'discontinued')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Erreur:', error);
    return;
  }

  if (!products) {
    console.log('❌ Aucun produit trouvé');
    return;
  }

  console.log(`📦 Total produits récupérés: ${products.length}\n`);

  // Analyser chaque produit pour déterminer s'il devrait afficher un badge
  let outOfStockCount = 0;
  const outOfStockProducts: any[] = [];

  products.forEach(p => {
    const productData = {
      name: p.name,
      stock_quantity: p.stock_quantity,
      has_variants: p.has_variants,
      variants: (p as any).product_variants || [],
      stockQuantity: p.stock_quantity
    };

    const isOutOfStock = isCompletelyOutOfStock(productData);

    if (isOutOfStock) {
      outOfStockCount++;
      outOfStockProducts.push({
        name: p.name,
        stock_quantity: p.stock_quantity,
        has_variants: p.has_variants,
        variant_count: productData.variants.length,
        variants_stock: productData.variants.map((v: any) => ({ color: v.color, stock: v.stock }))
      });
    }
  });

  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   ✅ Produits HORS STOCK détectés: ${outOfStockCount}`);
  console.log(`   📦 Total produits: ${products.length}`);
  console.log(`   📈 Pourcentage hors stock: ${((outOfStockCount / products.length) * 100).toFixed(1)}%\n`);

  if (outOfStockProducts.length > 0) {
    console.log(`\n🔴 PRODUITS QUI DEVRAIENT AFFICHER LE BADGE "RUPTURE DE STOCK":\n`);
    outOfStockProducts.slice(0, 10).forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   Stock produit: ${p.stock_quantity}`);
      console.log(`   Has variants: ${p.has_variants}`);
      console.log(`   Variants chargés: ${p.variant_count}`);
      if (p.variants_stock.length > 0) {
        p.variants_stock.forEach((v: any) => {
          console.log(`   └─ ${v.color}: stock = ${v.stock}`);
        });
      }
      console.log('');
    });

    if (outOfStockProducts.length > 10) {
      console.log(`   ... et ${outOfStockProducts.length - 10} autres produits\n`);
    }
  }

  console.log('\n✅ CONCLUSION:');
  console.log(`   Les variants sont maintenant chargés depuis Supabase`);
  console.log(`   ${outOfStockCount} produits devraient afficher le badge "Rupture de stock"`);
  console.log(`   Le badge devrait s'afficher sur la page /nos-produits\n`);
}

verifyOutOfStockBadges().catch(console.error);
