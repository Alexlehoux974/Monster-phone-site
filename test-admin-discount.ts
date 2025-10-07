import { createClient } from '@/lib/supabase/client';

async function testAdminDiscount() {
  const supabase = createClient();

  console.log('🔍 Testing admin discount functionality...\n');

  // 1. Récupérer le produit avec réduction
  const { data: product, error } = await supabase
    .from('products')
    .select('id, name, sku, price, admin_discount_percent, is_visible')
    .eq('admin_discount_percent', 20)
    .single();

  if (error) {
    console.error('❌ Error fetching product:', error);
    return;
  }

  console.log('✅ Product found in database:');
  console.log('   Name:', product.name);
  console.log('   SKU:', product.sku);
  console.log('   Original Price:', product.price, '€');
  console.log('   Admin Discount:', product.admin_discount_percent, '%');
  console.log('   Is Visible:', product.is_visible);

  const finalPrice = product.price * (1 - product.admin_discount_percent / 100);
  console.log('   💰 Final Price (calculated):', finalPrice.toFixed(2), '€');
  console.log('   💵 Savings:', (product.price - finalPrice).toFixed(2), '€\n');

  // 2. Tester la visibilité
  console.log('🔍 Testing visibility toggle...\n');

  // Masquer le produit
  const { error: hideError } = await supabase
    .from('products')
    .update({ is_visible: false })
    .eq('id', product.id);

  if (hideError) {
    console.error('❌ Error hiding product:', hideError);
  } else {
    console.log('✅ Product hidden (is_visible = false)');
  }

  // Vérifier qu'il n'apparaît plus dans la requête publique
  const { data: hiddenCheck } = await supabase
    .from('products')
    .select('id')
    .eq('id', product.id)
    .eq('is_visible', true)
    .single();

  console.log('   Should not be visible:', hiddenCheck === null ? '✅ PASS' : '❌ FAIL');

  // Rendre le produit visible à nouveau
  const { error: showError } = await supabase
    .from('products')
    .update({ is_visible: true })
    .eq('id', product.id);

  if (showError) {
    console.error('❌ Error showing product:', showError);
  } else {
    console.log('✅ Product shown again (is_visible = true)\n');
  }

  // 3. Tester les variations de réduction
  console.log('🔍 Testing different discount percentages...\n');

  const testDiscounts = [0, 10, 25, 50];
  for (const discount of testDiscounts) {
    const finalPrice = product.price * (1 - discount / 100);
    console.log(`   ${discount}% off: ${product.price}€ → ${finalPrice.toFixed(2)}€ (save ${(product.price - finalPrice).toFixed(2)}€)`);
  }

  console.log('\n✅ All tests completed!');
}

testAdminDiscount().catch(console.error);
