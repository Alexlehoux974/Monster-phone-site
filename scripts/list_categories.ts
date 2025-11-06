import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listCategories() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n📋 CATÉGORIES DISPONIBLES:');
  console.log('=' .repeat(80));
  categories?.forEach(cat => {
    console.log(`• ${cat.name} (slug: ${cat.slug}, id: ${cat.id})`);
  });
  
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('id, name, slug, category_id')
    .order('name');
    
  if (subcategories && subcategories.length > 0) {
    console.log('\n📋 SOUS-CATÉGORIES DISPONIBLES:');
    console.log('=' .repeat(80));
    subcategories.forEach(sub => {
      console.log(`• ${sub.name} (slug: ${sub.slug}, category_id: ${sub.category_id})`);
    });
  }
}

listCategories();
