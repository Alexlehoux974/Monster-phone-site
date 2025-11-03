const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.yFxtIT62b0gx5lGgkXHHBhP37aD_HWKjOmRPKgR61ws';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testProductAPI() {
  console.log('🔍 Testing product API response...\n');

  const { data: rawProducts, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug, logo_url),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*),
      product_images(*)
    `)
    .eq('status', 'active')
    .ilike('name', '%HONOR PAD%');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('📦 Found ' + rawProducts.length + ' HONOR PAD products\n');

  rawProducts.forEach(product => {
    console.log('Product: ' + product.name);
    console.log('  Price: ' + product.price + '€');
    console.log('  admin_discount_percent: ' + product.admin_discount_percent);
    console.log('  discount_percentage: ' + product.discount_percentage);
    console.log('');
    
    const keys = Object.keys(product).filter(k => k.includes('discount') || k.includes('admin'));
    console.log('  Discount-related keys:', keys);
    console.log('');
  });

  console.log('🔄 Testing adapter transformation...\n');
  
  rawProducts.forEach(product => {
    const transformed = {
      adminDiscountPercent: product.admin_discount_percent || 0,
      discount: product.discount_percentage || 0,
    };
    console.log('Transformed for: ' + product.name);
    console.log('  adminDiscountPercent: ' + transformed.adminDiscountPercent);
    console.log('  discount: ' + transformed.discount);
    console.log('');
  });
}

testProductAPI();
