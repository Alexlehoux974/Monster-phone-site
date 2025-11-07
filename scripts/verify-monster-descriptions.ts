import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyMonsterDescriptions() {
  console.log('🔍 VÉRIFICATION DÉTAILLÉE DES DESCRIPTIONS MONSTER\n');
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

  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      url_slug,
      sku,
      category:categories!products_category_id_fkey(name),
      short_description,
      description
    `)
    .eq('brand_id', brand.id)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit MONSTER trouvé');
    return;
  }

  let missingShort = 0;
  let missingLong = 0;
  let emptyShort = 0;
  let emptyLong = 0;

  console.log(`📦 VÉRIFICATION DE ${products.length} PRODUITS MONSTER:\n`);

  for (const p of products) {
    const hasShort = p.short_description !== null && p.short_description !== undefined;
    const hasLong = p.description !== null && p.description !== undefined;
    const shortEmpty = hasShort && p.short_description.trim() === '';
    const longEmpty = hasLong && p.description.trim() === '';

    if (!hasShort || shortEmpty) {
      console.log(`❌ ${p.name}`);
      console.log(`   Slug: ${p.url_slug}`);
      console.log(`   Catégorie: ${(p as any).category?.name || 'N/A'}`);
      console.log(`   Short description: ${!hasShort ? 'MANQUANTE' : 'VIDE'}`);
      if (!hasLong || longEmpty) {
        console.log(`   Description longue: ${!hasLong ? 'MANQUANTE' : 'VIDE'}`);
      }
      console.log('');

      if (!hasShort) missingShort++;
      if (shortEmpty) emptyShort++;
      if (!hasLong) missingLong++;
      if (longEmpty) emptyLong++;
    } else {
      console.log(`✅ ${p.name}`);
      console.log(`   Slug: ${p.url_slug}`);
      console.log(`   Catégorie: ${(p as any).category?.name || 'N/A'}`);
      console.log(`   Short (${p.short_description.length} car): ${p.short_description.substring(0, 100)}${p.short_description.length > 100 ? '...' : ''}`);
      if (hasLong && !longEmpty) {
        console.log(`   Long (${p.description.length} car): ${p.description.substring(0, 100)}${p.description.length > 100 ? '...' : ''}`);
      } else {
        console.log(`   Long: ${!hasLong ? '❌ MANQUANTE' : '❌ VIDE'}`);
        if (!hasLong) missingLong++;
        if (longEmpty) emptyLong++;
      }
      console.log('');
    }
  }

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSULTATS DÉTAILLÉS:`);
  console.log(`   Total produits: ${products.length}`);
  console.log(`   Short descriptions manquantes: ${missingShort}`);
  console.log(`   Short descriptions vides: ${emptyShort}`);
  console.log(`   Descriptions longues manquantes: ${missingLong}`);
  console.log(`   Descriptions longues vides: ${emptyLong}`);
  console.log(`   ✅ Produits avec short description: ${products.length - missingShort - emptyShort}`);
  console.log(`   ✅ Produits avec description longue: ${products.length - missingLong - emptyLong}\n`);
}

verifyMonsterDescriptions();
