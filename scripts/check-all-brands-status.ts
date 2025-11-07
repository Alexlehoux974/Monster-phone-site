import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAllBrandsStatus() {
  console.log('🔍 VÉRIFICATION ÉTAT CMS - TOUTES LES MARQUES\n');
  console.log('='.repeat(80));

  // Récupérer toutes les marques
  const { data: brands } = await supabase
    .from('brands')
    .select('id, name')
    .order('name');

  if (!brands || brands.length === 0) {
    console.log('❌ Aucune marque trouvée');
    return;
  }

  console.log(`\n📊 ${brands.length} marques trouvées\n`);

  for (const brand of brands) {
    // Récupérer tous les produits actifs de cette marque
    const { data: products } = await supabase
      .from('products')
      .select('id, name, url_slug, short_description')
      .eq('brand_id', brand.id)
      .eq('status', 'active');

    if (!products || products.length === 0) {
      continue;
    }

    let withCMS = 0;
    let withoutCMS = 0;
    let withShortDesc = 0;
    let withoutShortDesc = 0;

    for (const product of products) {
      // Vérifier les sections CMS
      const { data: sections } = await supabase
        .from('product_content_sections')
        .select('section_type')
        .eq('product_id', product.id);

      const sectionCount = sections?.length || 0;
      if (sectionCount === 4) {
        withCMS++;
      } else {
        withoutCMS++;
      }

      // Vérifier la short description
      if (product.short_description) {
        withShortDesc++;
      } else {
        withoutShortDesc++;
      }
    }

    const totalProducts = products.length;
    const cmsPercent = ((withCMS / totalProducts) * 100).toFixed(0);
    const shortDescPercent = ((withShortDesc / totalProducts) * 100).toFixed(0);

    console.log(`📦 ${brand.name}`);
    console.log(`   Total produits: ${totalProducts}`);
    console.log(`   CMS complet (4/4): ${withCMS}/${totalProducts} (${cmsPercent}%)`);
    console.log(`   Short desc: ${withShortDesc}/${totalProducts} (${shortDescPercent}%)`);

    if (withoutCMS > 0 || withoutShortDesc > 0) {
      console.log(`   ⚠️  À compléter: ${withoutCMS} CMS + ${withoutShortDesc} descriptions`);
    }
    console.log('');
  }

  console.log('='.repeat(80));
}

checkAllBrandsStatus();
