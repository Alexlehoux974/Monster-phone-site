import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listCategories() {
  console.log('📂 TOUTES LES CATÉGORIES\n');

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');

  if (!categories) {
    console.log('❌ Erreur');
    return;
  }

  categories.forEach((cat) => {
    console.log(`- ${cat.name}`);
    console.log(`  Slug: ${cat.slug}`);
    console.log(`  ID: ${cat.id}\n`);
  });

  console.log(`Total: ${categories.length} catégories`);
}

listCategories();
