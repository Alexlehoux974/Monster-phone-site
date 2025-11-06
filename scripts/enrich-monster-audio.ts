import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs officielles
const audioDescriptions: Record<string, string> = {
  // Enceintes portables
  'monster-blaster-micro': 'Enceinte portable ultra-compacte 6W avec Bluetooth 5.4, IPX5, magnétique avec clip et autonomie 4-9h.',
  'monster-cube-1': 'Enceinte portable Bluetooth 6.0 12W, IPX7 étanche flottante, 20h autonomie, TWS et connexion 100+ enceintes.',
  'monster-enceinte-cube-1': 'Enceinte portable Bluetooth 6.0 12W, IPX7 étanche flottante, 20h autonomie, TWS et connexion 100+ enceintes.',
  'monster-sparkle': 'Party speaker 80W avec écrans LED full-panel 6 modes, IPX5, Bluetooth 5.3, micro 6.35mm et 24h autonomie.',
  'monster-enceinte-party-box-sparkle': 'Party speaker 80W avec écrans LED full-panel 6 modes, IPX5, Bluetooth 5.3, micro 6.35mm et 24h autonomie.',
  'monster-party-music-box-go-2-micro': 'Speaker karaoke 80W avec 2 micros sans fil, RGB 7 couleurs, IPX5, Bluetooth 5.3 et 32h autonomie.',
  'monster-enceinte-party-music-box-go-2-micro': 'Speaker karaoke 80W avec 2 micros sans fil, RGB 7 couleurs, IPX5, Bluetooth 5.3 et 32h autonomie.',
  'monster-s150': 'Mini enceinte compacte Bluetooth 5.4, IPX7 étanche, 20h autonomie, TWS, appels mains-libres HD et design portable.',
  'monster-enceinte-s150': 'Mini enceinte compacte Bluetooth 5.4, IPX7 étanche, 20h autonomie, TWS, appels mains-libres HD et design portable.',
  'monster-s150-plus': 'Enceinte portable Bluetooth avec RGB, connexion 100+ speakers broadcast, IPX7, USB-C et appels mains-libres.',
  'monster-enceinte-s150-plus': 'Enceinte portable Bluetooth avec RGB, connexion 100+ speakers broadcast, IPX7, USB-C et appels mains-libres.',
  'monster-traveler': 'Speaker sac à dos 160W avec 2 micros, woofer 6.5" + 2 tweeters 3", IPX5, Bluetooth 5.3 et 5h autonomie.',
  'monster-enceinte-traveler': 'Speaker sac à dos 160W avec 2 micros, woofer 6.5" + 2 tweeters 3", IPX5, Bluetooth 5.3 et 5h autonomie.',

  // Écouteurs et casques
  'monster-champion-airlinks': 'Écouteurs True Wireless Bluetooth 5.0 avec aptX, CVC 8.0, IPX8 étanche, 100h autonomie avec boîtier USB-C.',
  'monster-element-air': 'Casque Bluetooth léger avec driver dynamique 50mm, micro détachable Pro, étui protecteur et 60h autonomie.',
  'monster-casque-hdtv': 'Kit casque sans fil HDTV Bluetooth avec transmetteur audio, isolation phonique et portée 33 pieds (10m).',
  'monster-mission-100': 'Casque Bluetooth 5.4 on-ear avec basses immersives, IA réduction bruit appels, multipoint et 40h autonomie.',
  'monster-persona-se-anc': 'Casque ANC bloquant 98% bruits avec drivers 40mm, Bluetooth 5.4, coussinets mémoire et 60h autonomie.',
};

async function enrichMonsterAudio() {
  console.log('🔊 ENRICHISSEMENT PRODUITS AUDIO MONSTER\n');
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

  // Récupérer toutes les catégories liées à l'audio
  const { data: audioCategories } = await supabase
    .from('categories')
    .select('id, name')
    .or('name.ilike.%audio%,name.ilike.%casque%,name.ilike.%écouteur%,name.ilike.%enceinte%');

  if (!audioCategories || audioCategories.length === 0) {
    console.log('❌ Catégories Audio introuvables');
    return;
  }

  console.log(`✅ Catégories trouvées: ${audioCategories.map(c => c.name).join(', ')}\n`);

  const categoryIds = audioCategories.map(c => c.id);

  // Récupérer tous les produits Audio MONSTER
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .in('category_id', categoryIds)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit Audio MONSTER trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits Audio MONSTER à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = audioDescriptions[product.url_slug];

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

enrichMonsterAudio();
