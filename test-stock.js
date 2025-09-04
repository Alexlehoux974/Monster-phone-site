// Test stock pour HONOR X6B
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ndgxzfwqyqbzmyhvbcmj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZ3h6ZndxeXFiem15aHZiY21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MDk2NjIsImV4cCI6MjA1MTQ4NTY2Mn0.kX_qbwpoUZeBgMVqQI1cJZKQT00-QyKC5x-X1wWJqQ8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStock() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(*),
      category:categories!products_category_id_fkey(*),
      product_variants(*)
    `)
    .eq('url_slug', 'honor-x6b-4-4-128gb')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== HONOR X6B Stock Test ===');
  console.log('Product name:', data.name);
  console.log('Has variants:', data.has_variants);
  console.log('Product stock_quantity:', data.stock_quantity);
  
  console.log('\n=== Variants ===');
  data.product_variants?.forEach(v => {
    console.log(`- ${v.color}: stock=${v.stock}, is_default=${v.is_default}`);
  });

  // Simulate the component logic
  const defaultVariant = data.product_variants?.find(v => v.is_default) || 
                        data.product_variants?.find(v => v.stock > 0) || 
                        data.product_variants?.[0];
  
  console.log('\n=== Selected Default Variant ===');
  if (defaultVariant) {
    console.log(`Color: ${defaultVariant.color}`);
    console.log(`Stock: ${defaultVariant.stock}`);
    console.log(`Is Default: ${defaultVariant.is_default}`);
  }

  const currentStock = data.has_variants 
    ? (defaultVariant?.stock || 0) 
    : (data.stock_quantity || 0);
  
  console.log('\n=== Final Stock Calculation ===');
  console.log(`Current Stock: ${currentStock}`);
  console.log(`Is Out of Stock: ${currentStock === 0}`);
}

testStock();