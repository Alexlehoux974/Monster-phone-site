import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkCategories() {
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  console.log('📂 Toutes les catégories:\n');
  categories?.forEach(cat => {
    console.log(`- ${cat.name} (ID: ${cat.id})`);
  });
}

checkCategories();
