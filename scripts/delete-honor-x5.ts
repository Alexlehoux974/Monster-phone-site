import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteHonorX5() {
  console.log('\n🗑️  Suppression du produit HONOR X5\n');
  console.log('================================================\n');

  // Chercher le produit avec différentes variantes de slug
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, brand')
    .or('url_slug.eq.hon-x5,url_slug.eq.honor-x5,name.ilike.%honor x5%,name.ilike.%hon x5%');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit HONOR X5 trouvé dans la base\n');
    console.log('Le produit n\'existe pas ou a déjà été supprimé.\n');
    return;
  }

  for (const product of products) {
    console.log(`📦 Produit trouvé:`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Nom: ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);
    console.log(`   Marque: ${product.brand}\n`);

    // 1. Supprimer d'abord les sections CMS (clé étrangère)
    console.log('🗑️  Suppression des sections CMS...');
    const { error: sectionsError } = await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id);

    if (sectionsError) {
      console.log(`   ❌ Erreur: ${sectionsError.message}\n`);
    } else {
      console.log('   ✅ Sections CMS supprimées\n');
    }

    // 2. Supprimer le produit
    console.log('🗑️  Suppression du produit...');
    const { error: productError } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id);

    if (productError) {
      console.log(`   ❌ Erreur: ${productError.message}\n`);
    } else {
      console.log('   ✅ Produit supprimé définitivement\n');
    }
  }

  console.log('================================================');
  console.log('✅ Suppression terminée\n');
}

deleteHonorX5();
