import { createClient } from '@/lib/supabase/client';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';

async function testFrontendDisplay() {
  const supabase = createClient();

  console.log('🔍 Testing frontend price display with admin discount...\n');

  // Récupérer le produit avec réduction de la base de données
  const { data: dbProduct, error } = await supabase
    .from('products')
    .select(`
      *,
      brands:brand_id (name),
      categories:category_id (name),
      subcategories:subcategory_id (name),
      product_variants (
        id,
        color,
        color_code,
        stock,
        is_default
      )
    `)
    .eq('admin_discount_percent', 20)
    .single();

  if (error) {
    console.error('❌ Error fetching product:', error);
    return;
  }

  console.log('✅ Product from database:');
  console.log('   Name:', dbProduct.name);
  console.log('   Price (DB):', dbProduct.price, '€');
  console.log('   Admin Discount (DB):', dbProduct.admin_discount_percent, '%');
  console.log('   Is Visible (DB):', dbProduct.is_visible);

  // Convertir en format legacy Product
  const legacyProduct = supabaseProductToLegacy(dbProduct);

  console.log('\n✅ Product after adapter conversion:');
  console.log('   Name:', legacyProduct.name);
  console.log('   Price:', legacyProduct.basePrice, '€');
  console.log('   Admin Discount Percent:', legacyProduct.variants[0]?.adminDiscountPercent, '%');
  console.log('   Is Visible:', legacyProduct.status === "active");

  // Simuler le calcul dans ProductCard
  const hasAdminDiscount = legacyProduct.variants[0]?.adminDiscountPercent && legacyProduct.variants[0]?.adminDiscountPercent > 0;
  const finalPrice = hasAdminDiscount
    ? legacyProduct.basePrice * (1 - legacyProduct.variants[0]?.adminDiscountPercent! / 100)
    : legacyProduct.basePrice;

  console.log('\n✅ Price calculation (as in ProductCard):');
  console.log('   Has Admin Discount:', hasAdminDiscount);
  console.log('   Original Price:', legacyProduct.basePrice.toFixed(2), '€');
  console.log('   💰 Final Price:', finalPrice.toFixed(2), '€');
  console.log('   💵 Discount Amount:', (legacyProduct.basePrice - finalPrice).toFixed(2), '€');
  console.log('   📊 Badge Display: -' + legacyProduct.variants[0]?.adminDiscountPercent + '%');

  // Vérifier les prix affichés
  console.log('\n✅ What will be displayed on ProductCard:');
  console.log('   🏷️ Badge: -' + legacyProduct.variants[0]?.adminDiscountPercent + '%');
  console.log('   💰 Main Price (blue, large): ' + finalPrice.toFixed(2) + '€');
  console.log('   💸 Crossed Price (gray, small): ' + legacyProduct.basePrice.toFixed(2) + '€');

  // Test avec d'autres pourcentages
  console.log('\n🔍 Testing different discount scenarios:');
  const scenarios = [
    { discount: 0, description: 'No discount' },
    { discount: 10, description: '10% off' },
    { discount: 25, description: '25% off (Black Friday)' },
    { discount: 50, description: '50% off (Clearance)' }
  ];

  scenarios.forEach(scenario => {
    const price = legacyProduct.basePrice;
    const finalPrice = price * (1 - scenario.discount / 100);
    const savings = price - finalPrice;
    console.log(`   ${scenario.description}:`);
    console.log(`      Original: ${price.toFixed(2)}€ → Final: ${finalPrice.toFixed(2)}€ (save ${savings.toFixed(2)}€)`);
  });

  console.log('\n✅ All frontend display tests completed!');
}

testFrontendDisplay().catch(console.error);
