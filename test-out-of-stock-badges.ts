import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testOutOfStockBadges() {
  console.log('🔍 TEST DES BADGES RUPTURE DE STOCK\n');

  // 1. Produits sans variants en rupture
  const { data: noVariants } = await supabase
    .from('products')
    .select('id, name, stock_quantity, price')
    .eq('status', 'active')
    .eq('stock_quantity', 0)
    .order('price', { ascending: false })
    .limit(5);

  console.log('📦 PRODUITS SANS VARIANTS EN RUPTURE:');
  noVariants?.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name} - ${p.price}€ - Stock: ${p.stock_quantity}`);
  });

  // 2. Produits avec variants tous en rupture
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      stock_quantity,
      variants:product_variants(id, color, stock)
    `)
    .eq('status', 'active')
    .order('price', { ascending: false });

  const withAllVariantsOutOfStock = products?.filter(p => {
    if (!p.variants || p.variants.length === 0) return false;
    return p.variants.every((v: any) => v.stock === 0);
  }).slice(0, 5);

  console.log('\n🎨 PRODUITS AVEC TOUS LES VARIANTS EN RUPTURE:');
  withAllVariantsOutOfStock?.forEach((p, i) => {
    const totalStock = p.variants.reduce((sum: number, v: any) => sum + v.stock, 0);
    console.log(`${i + 1}. ${p.name} - ${p.price}€`);
    console.log(`   Variants: ${p.variants.length}, Stock total: ${totalStock}`);
    p.variants.forEach((v: any) => {
      console.log(`   - ${v.color}: ${v.stock} unités`);
    });
  });

  // 3. Total des produits complètement en rupture
  const totalOutOfStock = (noVariants?.length || 0) + (withAllVariantsOutOfStock?.length || 0);
  console.log(`\n📊 TOTAL PRODUITS COMPLÈTEMENT EN RUPTURE: ${totalOutOfStock}`);
  console.log('\n✅ Ces produits DOIVENT afficher le badge "Rupture de stock" gris');
}

testOutOfStockBadges();
