const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugPromotions() {
  console.log('🔍 Checking HONOR PAD promotions...\n');

  // 1. Check direct products table
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, admin_discount_percent')
    .ilike('name', '%HONOR%PAD%')
    .limit(5);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('📦 Products from database:');
  products.forEach(p => {
    console.log(`  - ${p.name}`);
    console.log(`    Price: ${p.price}€`);
    console.log(`    Admin Discount: ${p.admin_discount_percent}%`);
    console.log('');
  });

  // 2. Test what getActiveProducts would return
  const { data: activeProducts, error: activeError } = await supabase
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
    .ilike('name', '%HONOR%PAD%')
    .limit(1);

  if (activeError) {
    console.error('❌ Error in getActiveProducts:', activeError);
    return;
  }

  console.log('📊 What getActiveProducts() returns:');
  if (activeProducts[0]) {
    const product = activeProducts[0];
    console.log(`  Name: ${product.name}`);
    console.log(`  admin_discount_percent: ${product.admin_discount_percent}`);
    console.log(`  Has admin_discount_percent field: ${product.hasOwnProperty('admin_discount_percent')}`);
    console.log('');
    console.log('  Full product keys:', Object.keys(product).filter(k => k.includes('discount')));
  }
}

debugPromotions();
