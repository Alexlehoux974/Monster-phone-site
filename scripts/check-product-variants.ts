import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProduct() {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      url_slug,
      status,
      product_variants(*)
    `)
    .eq('url_slug', 'casque-monster-n-lite-206')
    .single();

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('\n✅ Product found:');
  console.log('  ID:', product.id);
  console.log('  Name:', product.name);
  console.log('  Slug:', product.url_slug);
  console.log('  Status:', product.status);
  console.log('  Variants:', product.product_variants?.length || 0);
  
  if (product.product_variants && product.product_variants.length > 0) {
    console.log('\n📦 Variants:');
    product.product_variants.forEach((v: any) => {
      console.log(`  - ${v.color} (${v.color_code}) - Stock: ${v.stock} - Default: ${v.is_default}`);
    });
  }
}

checkProduct();
