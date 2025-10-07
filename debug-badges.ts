import { createClient } from '@supabase/supabase-js';
import { supabaseProductToLegacy } from './src/lib/supabase/adapters';
import { isCompletelyOutOfStock } from './src/lib/utils';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function debugBadges() {
  console.log('🔍 DEBUG - POURQUOI LES BADGES NE S\'AFFICHENT PAS?\n');

  // Récupérer un produit en rupture sans variants
  const { data: noVariantProduct } = await supabase
    .from('products_full')
    .select('*')
    .eq('status', 'active')
    .eq('stock_quantity', 0)
    .is('has_variants', false)
    .limit(1)
    .single();

  if (noVariantProduct) {
    console.log('📦 TEST PRODUIT SANS VARIANTS:');
    console.log('Nom:', noVariantProduct.name);
    console.log('Stock:', noVariantProduct.stock_quantity);
    console.log('Has variants:', noVariantProduct.has_variants);

    const legacyProduct = supabaseProductToLegacy(noVariantProduct);
    console.log('\n🔄 Après conversion legacy:');
    console.log('stockQuantity:', legacyProduct.stockQuantity);
    console.log('variants:', legacyProduct.variants);
    console.log('variants length:', legacyProduct.variants?.length);

    const shouldShowBadge = isCompletelyOutOfStock(legacyProduct);
    console.log('\n🎯 RÉSULTAT isCompletelyOutOfStock():', shouldShowBadge);
    console.log(shouldShowBadge ? '✅ BADGE DOIT APPARAÎTRE' : '❌ BADGE NE S\'AFFICHERA PAS');
  }

  // Récupérer un produit en rupture avec variants
  const { data: withVariantsProduct } = await supabase
    .from('products_full')
    .select('*')
    .eq('status', 'active')
    .eq('has_variants', true)
    .limit(50);

  const outOfStockWithVariants = withVariantsProduct?.find(p => {
    const variants = p.variants || [];
    return variants.length > 0 && variants.every((v: any) => v.stock === 0);
  });

  if (outOfStockWithVariants) {
    console.log('\n\n🎨 TEST PRODUIT AVEC VARIANTS:');
    console.log('Nom:', outOfStockWithVariants.name);
    console.log('Has variants:', outOfStockWithVariants.has_variants);
    console.log('Variants:', JSON.stringify(outOfStockWithVariants.variants, null, 2));

    const legacyProduct = supabaseProductToLegacy(outOfStockWithVariants);
    console.log('\n🔄 Après conversion legacy:');
    console.log('variants:', JSON.stringify(legacyProduct.variants, null, 2));

    const shouldShowBadge = isCompletelyOutOfStock(legacyProduct);
    console.log('\n🎯 RÉSULTAT isCompletelyOutOfStock():', shouldShowBadge);
    console.log(shouldShowBadge ? '✅ BADGE DOIT APPARAÎTRE' : '❌ BADGE NE S\'AFFICHERA PAS');
  }

  // Test avec un produit EN STOCK
  const { data: inStockProduct } = await supabase
    .from('products_full')
    .select('*')
    .eq('status', 'active')
    .gt('stock_quantity', 0)
    .limit(1)
    .single();

  if (inStockProduct) {
    console.log('\n\n✅ TEST PRODUIT EN STOCK (NE DOIT PAS AVOIR BADGE):');
    console.log('Nom:', inStockProduct.name);
    console.log('Stock:', inStockProduct.stock_quantity);

    const legacyProduct = supabaseProductToLegacy(inStockProduct);
    const shouldShowBadge = isCompletelyOutOfStock(legacyProduct);
    console.log('🎯 RÉSULTAT isCompletelyOutOfStock():', shouldShowBadge);
    console.log(shouldShowBadge ? '❌ ERREUR - BADGE S\'AFFICHERA À TORT' : '✅ CORRECT - PAS DE BADGE');
  }
}

debugBadges();
