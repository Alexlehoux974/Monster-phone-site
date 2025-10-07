import { createClient } from '@/lib/supabase/client';

async function testAdminLoad() {
  const supabase = createClient();

  console.log('🔍 Testing admin stock page data loading...\n');

  // Test 1: Load products with variants
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('name')
    .limit(5);

  console.log('✅ Products query:');
  console.log('   Count:', productsData?.length || 0);
  console.log('   Error:', productsError || 'None');

  if (productsData && productsData.length > 0) {
    console.log('\n📦 Sample Product:');
    const product = productsData[0];
    console.log('   Name:', product.name);
    console.log('   SKU:', product.sku);
    console.log('   Price:', product.price);
    console.log('   Stock Quantity:', product.stock_quantity);
    console.log('   Is Visible:', product.is_visible);
    console.log('   Admin Discount:', product.admin_discount_percent, '%');
    console.log('   Has Variants:', product.product_variants?.length || 0);
  }

  // Test 2: Check if columns exist
  console.log('\n🔍 Checking new columns availability...');
  const sampleProduct = productsData?.[0];
  if (sampleProduct) {
    console.log('   ✅ is_visible field:', sampleProduct.is_visible !== undefined ? 'EXISTS' : 'MISSING');
    console.log('   ✅ admin_discount_percent field:', sampleProduct.admin_discount_percent !== undefined ? 'EXISTS' : 'MISSING');
    console.log('   ✅ stock_quantity field:', sampleProduct.stock_quantity !== undefined ? 'EXISTS' : 'MISSING');
  }

  console.log('\n✅ Admin load test completed!');
}

testAdminLoad().catch(console.error);
