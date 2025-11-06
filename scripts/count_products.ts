import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function countProducts() {
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  const { count: variantCount } = await supabase
    .from('product_variants')
    .select('*', { count: 'exact', head: true });

  const { data: variants } = await supabase
    .from('product_variants')
    .select('ean');

  const eanSet = new Set();
  variants?.forEach(v => {
    if (v.ean) eanSet.add(v.ean);
  });

  console.log('\n📊 ÉTAT ACTUEL SUPABASE:');
  console.log('=' .repeat(80));
  console.log(`✅ Nombre de fiches produits: ${productCount}`);
  console.log(`✅ Nombre de variants: ${variantCount}`);
  console.log(`✅ Nombre de codes EAN uniques: ${eanSet.size}`);
}

countProducts();
