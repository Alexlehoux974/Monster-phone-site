import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkExactSlug() {
  console.log('🔍 Recherche EXACTE: hon-x5\n');
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, url_slug, sku, status, brand_id')
    .eq('url_slug', 'hon-x5')
    .maybeSingle();

  if (error) {
    console.log('❌ Erreur:', error.message);
  } else if (data) {
    console.log('🚨 PRODUIT TROUVÉ:');
    console.log('   ID:', data.id);
    console.log('   Name:', data.name);
    console.log('   Slug:', data.url_slug);
    console.log('   SKU:', data.sku);
    console.log('   Status:', data.status);
    console.log('   Brand ID:', data.brand_id);
    console.log('\n⚠️  CE PRODUIT EXISTE DANS SUPABASE!');
  } else {
    console.log('✅ Aucun produit "hon-x5"');
  }
}

checkExactSlug();
