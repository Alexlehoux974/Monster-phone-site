import { createClient } from '@supabase/supabase-js';
import { isCompletelyOutOfStock } from './src/lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkProducts() {
  // Récupérer les 12 meilleurs produits
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (
        id,
        color,
        stock
      )
    `)
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) {
    console.error('Erreur:', error);
    return;
  }

  console.log('=== Produits affichés sur la page d\'accueil ===\n');

  products?.forEach((product, index) => {
    const outOfStock = isCompletelyOutOfStock({
      stockQuantity: product.stock_quantity,
      variants: product.product_variants
    });

    console.log(`${index + 1}. ${product.name}`);
    console.log(`   Stock principal: ${product.stock_quantity}`);
    console.log(`   Variants: ${product.product_variants?.length || 0}`);

    if (product.product_variants && product.product_variants.length > 0) {
      product.product_variants.forEach((v: any) => {
        console.log(`     - ${v.color}: ${v.stock} unités`);
      });
    }

    console.log(`   Rupture complète: ${outOfStock ? '✅ OUI' : '❌ NON'}`);
    console.log(`   Prix: ${product.price}€`);
    console.log(`   Badges: ${product.badges || 'aucun'}`);
    console.log('');
  });
}

checkProducts();
