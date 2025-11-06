import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs officielles MONSTER
const accessoiresDescriptions: Record<string, string> = {
  'monster-cable-essential-fibre-optique-1m5': 'Câble audio numérique fibre optique Toslink 1.5m, Essential Series, transmission sans perte pour son Dolby/DTS, connecteurs plaqués or.',
  'monster-cable-essential-fibre-optique-3m': 'Câble audio numérique fibre optique Toslink 3m, Essential Series, transmission sans perte pour son Dolby/DTS, connecteurs plaqués or.',
  'monster-cable-hdmi-essential-4k-1m8': 'Câble HDMI 2.0 Essential 1.8m, 4K@60Hz, HDR, ARC, Ethernet, 18Gbps, triple blindage, connecteurs plaqués or.',
  'monster-cable-hdmi-essential-4k-3m6': 'Câble HDMI 2.0 Essential 3.6m, 4K@60Hz, HDR, ARC, Ethernet, 18Gbps, triple blindage, connecteurs plaqués or.',
  'monster-cable-hdmi-essential-8k-1m8': 'Câble HDMI 2.1 Essential 1.8m, 8K@60Hz / 4K@120Hz, HDR10+, eARC, 48Gbps, VRR, ALLM, triple blindage.',
  'monster-cable-type-c-vers-hdmi-4k-2m': 'Câble adaptateur USB-C vers HDMI 2m, 4K@60Hz, HDR, compatible Thunderbolt 3/4, plug and play, aluminium.',
  'monster-multiprise-4-prises': 'Multiprise MONSTER 4 prises avec protection surtension, cordon 1.5m, voyant LED, design compact pour home cinema.',
  'monster-nettoyant-et-lingette-200ml': 'Kit nettoyant écrans 200ml avec lingette microfibre, formule sans alcool pour TV/smartphones/tablettes, anti-traces.',
};

async function enrichMonsterAccessoires() {
  console.log('🔌 ENRICHISSEMENT PRODUITS ACCESSOIRES MONSTER\n');
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

  // Récupérer toutes les catégories liées aux accessoires
  const { data: accessoiresCategories } = await supabase
    .from('categories')
    .select('id, name')
    .or('name.ilike.%accessoire%,name.ilike.%câble%,name.ilike.%cable%,name.ilike.%chargeur%,name.ilike.%adaptateur%');

  if (!accessoiresCategories || accessoiresCategories.length === 0) {
    console.log('❌ Catégories Accessoires introuvables');
    return;
  }

  console.log(`✅ Catégories trouvées: ${accessoiresCategories.map(c => c.name).join(', ')}\n`);

  const categoryIds = accessoiresCategories.map(c => c.id);

  // Récupérer tous les produits Accessoires MONSTER
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .in('category_id', categoryIds)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit Accessoire MONSTER trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits Accessoires MONSTER à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = accessoiresDescriptions[product.url_slug];

    if (!shortDesc) {
      console.log(`⚠️  ${product.name}`);
      console.log(`   Slug: ${product.url_slug}`);
      console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);
      console.log(`   ⏭️  Description non trouvée - produit ignoré\n`);
      skippedCount++;
      continue;
    }

    console.log(`🔄 ${product.name}`);
    console.log(`   Slug: ${product.url_slug}`);
    console.log(`   Catégorie: ${(product.category as any)?.name || 'N/A'}`);

    // Mise à jour de la short_description
    const { error } = await supabase
      .from('products')
      .update({ short_description: shortDesc })
      .eq('id', product.id);

    if (error) {
      console.log(`   ❌ Erreur: ${error.message}\n`);
      errorCount++;
    } else {
      console.log(`   ✅ Short description ajoutée\n`);
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

enrichMonsterAccessoires();
