import { createClient } from '@supabase/supabase-js';
import { supabaseProductToLegacy } from './src/lib/supabase/adapters';
import { isCompletelyOutOfStock } from './src/lib/utils';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function verifyOutOfStockBadges() {
  console.log('🔍 VÉRIFICATION DES BADGES "RUPTURE DE STOCK"\n');

  // Produits qui DEVRAIENT avoir le badge selon le CSV
  const expectedOutOfStock = [
    'POWERBANK MY WAY 10000 mAh',
    'POWERBANK MY WAY 20000 mAh',
    'HONOR X6B 6+6/128GB', // Variante VERT à 0
    'HONOR X8B 8+8/512GB', // Toutes variantes à 0
    'HONOR X9B 12+8/256GB', // Variante VERT à 0
    'HONOR 200 PRO 12+12/512GB', // Variante NOIR à 0
    'HONOR CHOICE WATCH', // Toutes variantes à 0
  ];

  console.log('📋 Produits qui devraient avoir le badge selon CSV:');
  expectedOutOfStock.forEach(name => console.log(`   - ${name}`));
  console.log('');

  const { data: products, error } = await supabase
    .from('products_full')
    .select('*')
    .eq('status', 'active');

  if (error) {
    console.error('❌ Erreur:', error);
    return;
  }

  console.log('🔍 ANALYSE DES STOCKS SUPABASE:\n');

  const outOfStockInSupabase: string[] = [];
  const inStockButShouldBeOut: string[] = [];

  for (const product of products) {
    const legacyProduct = supabaseProductToLegacy(product);
    const isOutOfStock = isCompletelyOutOfStock(legacyProduct);

    // Vérifier si ce produit devrait être en rupture selon le CSV
    const shouldBeOutOfStock = expectedOutOfStock.some(name =>
      product.name.includes(name.split(' ')[0]) &&
      product.name.includes(name.split(' ')[1] || '')
    );

    if (isOutOfStock) {
      outOfStockInSupabase.push(product.name);
      console.log(`✅ ${product.name}`);
      console.log(`   → En rupture dans Supabase: OUI`);
      console.log(`   → Badge sera affiché: OUI`);

      if (product.has_variants) {
        console.log(`   → Variantes: ${product.variants?.map((v: any) =>
          `${v.color} (${v.stock})`
        ).join(', ')}`);
      } else {
        console.log(`   → Stock: ${product.stock_quantity || 0}`);
      }
      console.log('');
    } else if (shouldBeOutOfStock) {
      inStockButShouldBeOut.push(product.name);
      console.log(`⚠️  ${product.name}`);
      console.log(`   → Devrait être en rupture selon CSV mais ne l'est pas`);

      if (product.has_variants) {
        console.log(`   → Variantes: ${product.variants?.map((v: any) =>
          `${v.color} (${v.stock})`
        ).join(', ')}`);
      } else {
        console.log(`   → Stock: ${product.stock_quantity || 0}`);
      }
      console.log('');
    }
  }

  console.log('\n📊 RÉSUMÉ:');
  console.log(`   ✅ Produits en rupture dans Supabase: ${outOfStockInSupabase.length}`);
  console.log(`   ⚠️  Produits avec stock incohérent: ${inStockButShouldBeOut.length}`);

  if (inStockButShouldBeOut.length > 0) {
    console.log('\n⚠️  INCOHÉRENCES DÉTECTÉES:');
    inStockButShouldBeOut.forEach(name => console.log(`   - ${name}`));
    console.log('\n💡 Ces produits nécessitent une synchronisation CSV → Supabase');
  }

  console.log('\n🎯 CONCLUSION:');
  console.log(`   Les badges "Rupture de stock" s'afficheront sur ${outOfStockInSupabase.length} produits`);
}

verifyOutOfStockBadges().catch(console.error);
