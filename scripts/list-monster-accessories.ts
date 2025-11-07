import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listMonsterAccessories() {
  console.log('🔍 PRODUITS MONSTER ACCESSOIRES - 8 PRODUITS SPÉCIFIQUES\n');
  console.log('='.repeat(80));

  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%monster%')
    .single();

  if (!brand) {
    console.log('❌ Marque MONSTER introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Les 8 produits spécifiques du menu header
  const targetSlugs = [
    'monster-cable-type-c-vers-hdmi-4k-2m',
    'monster-cable-hdmi-essential-8k-1m8',
    'monster-cable-hdmi-essential-4k-3m6',
    'monster-multiprise-4-prises',
    'monster-cable-essential-fibre-optique-3m',
    'monster-cable-hdmi-essential-4k-1m8',
    'monster-cable-essential-fibre-optique-1m5',
    'monster-nettoyant-et-lingette-200ml'
  ];

  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, short_description, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .in('url_slug', targetSlugs)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit trouvé pour les slugs spécifiés');
    return;
  }

  console.log(`📦 ${products.length}/8 produits trouvés:\n`);

  let withCMS = 0;
  let withoutCMS = 0;

  for (const product of products) {
    console.log(`${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);
    console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);
    const hasShort = product.short_description ? '✅' : '❌';
    console.log(`   Short desc: ${hasShort}`);

    const { data: sections } = await supabase
      .from('product_content_sections')
      .select('section_type')
      .eq('product_id', product.id);

    const sectionCount = sections?.length || 0;
    const cmsStatus = sectionCount === 4 ? '✅' : sectionCount > 0 ? '⚠️' : '❌';
    console.log(`   Sections CMS: ${cmsStatus} ${sectionCount}/4`);

    if (sectionCount === 4) {
      withCMS++;
    } else {
      withoutCMS++;
    }
    console.log('');
  }

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   📦 Total: ${products.length}/8 produits trouvés`);
  console.log(`   ✅ CMS complet (4/4): ${withCMS} produits`);
  console.log(`   ❌ CMS incomplet: ${withoutCMS} produits\n`);

  if (products.length < 8) {
    console.log('⚠️  ATTENTION: Certains produits n\'ont pas été trouvés dans la base.');
    console.log('   Vérifier les slugs ou le statut des produits.\n');
  }
}

listMonsterAccessories();
