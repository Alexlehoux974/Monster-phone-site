import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Colonnes disponibles dans products:');
  console.log(Object.keys(data).join(', '));
  console.log('\nExemple de produit:');
  console.log(JSON.stringify(data, null, 2));
}

checkSchema();
