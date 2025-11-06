import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findHonorX5() {
  console.log('\n🔍 Recherche HONOR X5:\n');

  // Chercher HONOR X5 dans les produits
  const { data } = await supabase
    .from('products')
    .select('id, name, url_slug, brand, category')
    .or('name.ilike.%honor x5%,name.ilike.%hon x5%');

  if (!data || data.length === 0) {
    console.log('❌ Aucun produit HONOR X5 trouvé\n');

    // Chercher tous les produits HONOR
    const { data: honorProducts } = await supabase
      .from('products')
      .select('id, name, url_slug, brand, category')
      .ilike('brand', '%honor%');

    console.log('📋 Produits HONOR dans la base:', honorProducts?.length || 0, '\n');
    honorProducts?.forEach((p) => {
      console.log('-', p.name);
      console.log('  slug:', p.url_slug);
      console.log('  catégorie:', p.category, '\n');
    });
  } else {
    data.forEach((p) => {
      console.log('✅ Produit trouvé:');
      console.log('   ID:', p.id);
      console.log('   Nom:', p.name);
      console.log('   Slug:', p.url_slug);
      console.log('   Marque:', p.brand);
      console.log('   Catégorie:', p.category, '\n');
    });
  }
}

findHonorX5();
