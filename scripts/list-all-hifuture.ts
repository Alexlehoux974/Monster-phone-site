import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listAllHifuture() {
  console.log('📋 Liste de TOUS les produits HIFUTURE\n');
  console.log('================================================\n');

  // Récupérer tous les produits HIFUTURE
  const { data: allProducts, error: allError } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .ilike('name', '%hifuture%')
    .order('name');

  if (allError || !allProducts) {
    console.error('❌ Erreur:', allError);
    return;
  }

  console.log(`📦 Total produits HIFUTURE: ${allProducts.length}\n`);

  // Pour chaque produit, vérifier s'il a des sections
  let withContent = 0;
  let withoutContent = 0;

  for (const product of allProducts) {
    const { data: sections } = await supabase
      .from('product_content_sections')
      .select('id')
      .eq('product_id', product.id);

    const hasContent = sections && sections.length > 0;
    const status = hasContent ? '✅' : '❌';
    const count = sections ? sections.length : 0;

    console.log(`${status} ${product.name} (${count} sections)`);

    if (hasContent) {
      withContent++;
    } else {
      withoutContent++;
    }
  }

  console.log('\n================================================');
  console.log(`✅ Avec contenu: ${withContent}`);
  console.log(`❌ Sans contenu: ${withoutContent}`);
  console.log(`📋 Total: ${allProducts.length}\n`);
}

listAllHifuture();
