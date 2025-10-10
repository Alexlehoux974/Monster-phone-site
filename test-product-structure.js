const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testProductStructure() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(name, slug),
      category:categories!products_category_id_fkey(name, slug),
      product_variants (
        id,
        color,
        stock
      )
    `)
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    const product = data[0];
    console.log('Product structure:');
    console.log('id:', product.id, 'Type:', typeof product.id);
    console.log('id is object?', typeof product.id === 'object');
    console.log('Full product:', JSON.stringify(product, null, 2));
  }
}

testProductStructure();
