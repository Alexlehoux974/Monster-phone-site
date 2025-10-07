import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  console.log('Fetching sample product to check schema...\n');

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (products && products.length > 0) {
    const columns = Object.keys(products[0]);
    console.log('Available columns:', columns.length);
    console.log('\nColumns:', columns.join(', '));

    console.log('\n✓ Checking for new columns:');
    console.log('  is_visible:', columns.includes('is_visible') ? '✓ EXISTS' : '✗ MISSING');
    console.log('  stock_quantity:', columns.includes('stock_quantity') ? '✓ EXISTS' : '✗ MISSING');
    console.log('  admin_discount_percent:', columns.includes('admin_discount_percent') ? '✓ EXISTS' : '✗ MISSING');
  } else {
    console.log('No products found in database');
  }
}

checkSchema();
