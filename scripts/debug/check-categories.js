const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkCategories() {
  console.log('🔍 Checking categories...\n');

  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`📊 Found ${categories.length} categories:\n`);
  categories.forEach(cat => {
    console.log(`  - ${cat.name} (${cat.slug})`);
    console.log(`    Parent ID: ${cat.parent_id || 'none'}`);
    console.log(`    Order: ${cat.display_order}`);
    console.log('');
  });

  // Check products count
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('id, name')
    .eq('status', 'active')
    .limit(5);

  if (!prodError) {
    console.log(`📦 Found ${products.length} active products (showing first 5):\n`);
    products.forEach(p => {
      console.log(`  - ${p.name}`);
    });
  }
}

checkCategories();
