import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Vérifie quels produits HIFUTURE ont encore du contenu générique
 */
async function checkGenericContent() {
  console.log('🔍 Vérification du contenu HIFUTURE\n');
  console.log('================================================\n');

  const { data: allProducts, error: allError } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .ilike('name', '%hifuture%')
    .order('name');

  if (allError || !allProducts) {
    console.error('❌ Erreur:', allError);
    return;
  }

  let genericCount = 0;
  let realContentCount = 0;
  const genericProducts: string[] = [];

  for (const product of allProducts) {
    const { data: sections } = await supabase
      .from('product_content_sections')
      .select('section_type, content, metadata')
      .eq('product_id', product.id)
      .eq('section_type', 'description_card')
      .single();

    if (!sections) {
      console.log(`⚠️  ${product.name} - AUCUNE SECTION`);
      continue;
    }

    // Vérifier si c'est du contenu générique
    const isGeneric =
      sections.content?.includes('est un produit de qualité conçu pour répondre à vos besoins') ||
      !sections.content ||
      sections.content.length < 100;

    if (isGeneric) {
      console.log(`❌ ${product.name} - CONTENU GÉNÉRIQUE`);
      genericProducts.push(product.name);
      genericCount++;
    } else {
      console.log(`✅ ${product.name} - Contenu réel`);
      realContentCount++;
    }
  }

  console.log('\n================================================');
  console.log(`✅ Avec contenu réel: ${realContentCount}`);
  console.log(`❌ Avec contenu générique: ${genericCount}`);
  console.log(`📋 Total: ${allProducts.length}\n`);

  if (genericProducts.length > 0) {
    console.log('📋 Produits à enrichir avec contenu réel:\n');
    genericProducts.forEach((name, index) => {
      console.log(`   ${index + 1}. ${name}`);
    });
    console.log();
  }
}

checkGenericContent();
