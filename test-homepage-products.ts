import { createClient } from '@supabase/supabase-js';
import { supabaseProductToLegacy } from './src/lib/supabase/adapters';
import { sortProductsByPriority, isCompletelyOutOfStock } from './src/lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testHomepageProducts() {
  // Récupérer TOUS les produits actifs
  const { data: products, error } = await supabase
    .from('products_full')
    .select('*')
    .eq('status', 'active');

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  console.log(`\n📊 Total produits actifs: ${products?.length}\n`);

  // Convertir vers format legacy
  const convertedProducts = products?.map(supabaseProductToLegacy) || [];

  // Appliquer le tri intelligent
  const sortedProducts = sortProductsByPriority(convertedProducts);

  // Prendre les 12 premiers
  const featuredProducts = sortedProducts.slice(0, 12);

  console.log('=== 12 PRODUITS AFFICHÉS SUR LA PAGE D\'ACCUEIL ===\n');

  featuredProducts.forEach((product, index) => {
    const outOfStock = isCompletelyOutOfStock({
      stockQuantity: product.stockQuantity,
      variants: product.variants
    });

    const isFeatured = product.badges?.some(badge =>
      badge.includes('Bestseller') ||
      badge.includes('Best-seller') ||
      badge.includes('Nouveau') ||
      badge.includes('Premium')
    ) || product.price >= 500;

    console.log(`${index + 1}. ${product.name}`);
    console.log(`   💰 Prix: ${product.price}€`);
    console.log(`   📦 Stock: ${product.stockQuantity || 0} ${product.variants?.length ? `(+ ${product.variants.length} variants)` : ''}`);
    console.log(`   ${outOfStock ? '❌ RUPTURE DE STOCK' : '✅ EN STOCK'}`);
    console.log(`   ${isFeatured ? '⭐ PRODUIT PHARE' : '📌 Produit standard'}`);
    console.log(`   🏷️  Badges: ${product.badges?.join(', ') || 'aucun'}`);
    console.log('');
  });

  // Statistiques
  const inStock = featuredProducts.filter(p => !isCompletelyOutOfStock(p)).length;
  const featured = featuredProducts.filter(p =>
    p.badges?.some(badge =>
      badge.includes('Bestseller') ||
      badge.includes('Best-seller') ||
      badge.includes('Nouveau') ||
      badge.includes('Premium')
    ) || p.price >= 500
  ).length;

  console.log('=== STATISTIQUES ===');
  console.log(`✅ Produits en stock: ${inStock}/12`);
  console.log(`⭐ Produits phares: ${featured}/12`);
  console.log(`❌ Produits en rupture: ${12 - inStock}/12`);
}

testHomepageProducts();
