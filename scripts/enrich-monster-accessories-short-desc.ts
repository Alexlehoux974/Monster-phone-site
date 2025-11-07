import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs sourcées pour chaque produit MONSTER accessoire
const monsterAccessoriesShortDesc: Record<string, string> = {
  // Câbles HDMI - Chacun avec ses spécifications uniques
  'monster-cable-type-c-vers-hdmi-4k-2m': 'Câble USB-C vers HDMI 4K@60Hz, HDR, Alt DP mode, 2m. Compatible MacBook, iPad Pro, smartphones USB-C.',

  'monster-cable-hdmi-essential-8k-1m8': 'Câble HDMI 2.1, 48Gbps, 8K@60Hz/4K@144Hz, eARC, Dolby Vision. Gaming next-gen PS5/Xbox Series X.',

  'monster-cable-hdmi-essential-4k-3m6': 'Câble HDMI 2.0, 18Gbps, 4K@60Hz, triple blindage 1GHz, connecteurs V-Grip 4x plus fiables, 3.6m.',

  'monster-cable-hdmi-essential-4k-1m8': 'Câble HDMI 2.0, 18Gbps, 4K@60Hz, HDR, ARC, HDMI Ethernet, connecteurs or 24K, 1.8m.',

  // Multiprise avec protection avancée
  'monster-multiprise-4-prises': 'Multiprise 4 prises avec parasurtenseur 608J, filtrage EMI/RFI Clean Power, résistant 750°C, garantie 100,000€.',

  // Câbles fibre optique - Différenciés par longueur et série
  'monster-cable-essential-fibre-optique-3m': 'Câble fibre optique Toslink/S/PDIF, connecteurs or, gaine Duraflex, audio multicanal, 3m.',

  'monster-cable-essential-fibre-optique-1m5': 'Câble fibre optique M1000, Toslink, connecteurs or, gaine Duraflex, garantie à vie 100%, 1.5m.',

  // Nettoyant écran avec kit complet
  'monster-nettoyant-et-lingette-200ml': 'Nettoyant écran 200ml sans alcool + chiffon microfibre 30x30cm, revêtement anti-poussière, 100% recyclable.'
};

async function enrichMonsterAccessoriesShortDesc() {
  console.log('🎨 MISE À JOUR DESCRIPTIONS COURTES - ACCESSOIRES MONSTER\n');
  console.log('='.repeat(80));

  // Récupérer la marque MONSTER
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

  // Récupérer les 8 produits accessoires spécifiques
  const targetSlugs = Object.keys(monsterAccessoriesShortDesc);

  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, short_description, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .in('url_slug', targetSlugs)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit accessoire MONSTER trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits accessoires MONSTER à mettre à jour:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = monsterAccessoriesShortDesc[product.url_slug];

    if (!shortDesc) {
      console.log(`⚠️  ${product.name}`);
      console.log(`   Slug: ${product.url_slug}`);
      console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);
      console.log(`   ⏭️  Description courte non trouvée - produit ignoré\n`);
      skippedCount++;
      continue;
    }

    console.log(`🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);
    console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);
    console.log(`   📝 Ancienne: ${product.short_description || '(vide)'}`);
    console.log(`   📝 Nouvelle: ${shortDesc}`);

    // Mise à jour de la short_description
    const { error } = await supabase
      .from('products')
      .update({ short_description: shortDesc })
      .eq('id', product.id);

    if (error) {
      console.log(`   ❌ Erreur: ${error.message}\n`);
      errorCount++;
    } else {
      console.log(`   ✅ Description courte mise à jour\n`);
      successCount++;
    }
  }

  console.log('='.repeat(80));
  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ⏭️  Ignorés: ${skippedCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📦 Total: ${products.length}\n`);
}

enrichMonsterAccessoriesShortDesc();
