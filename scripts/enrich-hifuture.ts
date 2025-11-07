import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs officielles HIFUTURE
const hifutureDescriptions: Record<string, string> = {
  // Enceintes PartyBox
  'partybox-hifuture-vocalist-300': 'Enceinte PartyBox Vocalist 300 W, Bluetooth, LED multicolore, karaoké 2 micros, batterie 6h.',
  'partybox-hifuture-event-horizon': 'Enceinte PartyBox Event Horizon, Bluetooth 5.0, éclairage LED, batterie longue durée, son puissant.',
  'partybox-hifuture-musicbox': 'Enceinte PartyBox MusicBox, Bluetooth, LED dynamique, autonomie étendue, basses profondes.',

  // Enceintes portables
  'enceinte-hifuture-gravity': 'Enceinte Bluetooth Gravity, son 360°, étanche IPX7, 20h autonomie, TWS.',
  'enceinte-hifuture-ripple': 'Enceinte Bluetooth Ripple, compacte, étanche IPX6, 12h autonomie, son clair.',
  'enceinte-hifuture-ascendo': 'Enceinte Bluetooth Ascendo, design premium, son stéréo, 15h autonomie, IPX5.',
  'enceinte-hifuture-altus-camo': 'Enceinte Bluetooth Altus Camo, étanche IP67, 24h autonomie, résistante chocs.',
  'enceinte-hifuture-altus': 'Enceinte Bluetooth Altus, haute fidélité, étanche IP67, 24h autonomie, USB-C.',

  // Casques ANC Tour
  'casque-anc-hifuture-tour-x': 'Casque ANC Bluetooth Tour X, 40h autonomie, 4 micros MEMS, Bluetooth 5.2, pliable.',
  'casque-anc-hifuture-tour-x-champagne': 'Casque ANC Bluetooth Tour X Champagne, 40h autonomie, 4 micros MEMS, design premium.',
  'casque-anc-hifuture-tour': 'Casque ANC Bluetooth Tour, réduction bruit active, 35h autonomie, Bluetooth 5.0, confort.',

  // Écouteurs premium
  'ecouteur-hifuture-yacht-gold': 'Écouteurs TWS Yacht Gold, ANC, charge sans fil, étanche IPX5, design luxe.',
  'ecouteur-hifuture-yacht': 'Écouteurs TWS Yacht, ANC, étanche IPX5, 30h autonomie totale, son HiFi.',

  // Écouteurs FlyBuds 4 ANC
  'ecouteur-hifuture-flybuds-4-anc-beige': 'Écouteurs TWS FlyBuds 4 ANC Beige, réduction bruit, 28h autonomie, Bluetooth 5.3.',
  'ecouteur-hifuture-flybuds-4-anc-chaud': 'Écouteurs TWS FlyBuds 4 ANC Chaud, ANC adaptatif, 28h autonomie, son immersif.',
  'ecouteur-hifuture-flybuds-4-anc': 'Écouteurs TWS FlyBuds 4 ANC, réduction bruit active, 28h autonomie, IPX4.',

  // Écouteurs Sonify
  'ecouteur-hifuture-sonify-champagne': 'Écouteurs TWS Sonify Champagne, son HD, 24h autonomie, étanche IPX5, tactile.',
  'ecouteur-hifuture-sonify': 'Écouteurs TWS Sonify, Bluetooth 5.0, 24h autonomie, IPX5, basses puissantes.',

  // Écouteurs Sonic Air
  'ecouteur-hifuture-sonic-air-champagne': 'Écouteurs TWS Sonic Air Champagne, ultra-légers, 20h autonomie, son cristallin.',
  'ecouteur-hifuture-sonic-air': 'Écouteurs TWS Sonic Air, confort optimal, 20h autonomie, Bluetooth 5.0, IPX4.',

  // Écouteurs OlymBuds 3
  'ecouteur-hifuture-olymbuds-3': 'Écouteurs TWS OlymBuds 3, sport, étanche IPX7, crochets oreille, 32h autonomie.',

  // Écouteurs filaires
  'ecouteur-fillaire-hifuture-hi5-champagne': 'Écouteurs filaires Hi5 Champagne, audio HD, micro intégré, jack 3.5mm, design premium.',

  // Montres Active
  'hifuture-montre-active': 'Montre connectée Active, AMOLED 1.43", GPS double bande, 100+ sports, 5ATM, Syntra AI.',
  'hifuture-montre-active-red': 'Montre connectée Active+ Red, AMOLED 1.43", GPS précis, autonomie 7j, santé complète.',

  // Montres EVO 2
  'hifuture-montre-evo-2': 'Montre connectée EVO 2, écran IPS 1.47", appels Bluetooth, 100+ sports, IP68.',
  'hifuture-montre-evo-2-beige': 'Montre connectée EVO 2 Beige, IPS 1.47", santé 24/7, autonomie 10j, élégante.',
  'hifuture-montre-evo-2-gold': 'Montre connectée EVO 2 Gold, IPS 1.47", design premium, santé avancée, IP68.',

  // Montres AIX
  'montre-hifuture-aix-acier': 'Montre connectée AIX Acier, AMOLED, appels Bluetooth, santé 24/7, bracelet métal premium.',
  'montre-hifuture-aix-e-acier': 'Montre connectée AIX E Acier, AMOLED, design élégant, santé complète, charge rapide.',

  // Montres Aura
  'montre-hifuture-aura-2': 'Montre connectée Aura 2, AMOLED 1.04", compacte femme, santé complète, 7j autonomie.',
  'montre-hifuture-aura-2-gold': 'Montre connectée Aura 2 Gold, AMOLED 1.04", design luxe, SpO2, sommeil, 7j.',
  'montre-hifuture-aura-brown': 'Montre connectée Aura Brown, AMOLED 1.04", élégante, santé 24/7, IP68, 7j.',
  'montre-hifuture-aura-silver': 'Montre connectée Aura Silver, AMOLED 1.04", féminine, cardio, sommeil, étanche.',
  'montre-hifuture-aurora': 'Montre connectée Aurora, grand écran, appels Bluetooth, 100+ sports, autonomie longue.',

  // Montre Go Pro 2
  'montre-hifuture-go-pro-2': 'Montre connectée Go Pro 2, robuste, GPS, 100+ sports, 5ATM, autonomie étendue.',

  // Montres Lume
  'montre-hifuture-lume': 'Montre connectée Lume, AMOLED vibrant, santé complète, appels Bluetooth, design moderne.',
  'montre-hifuture-lume-champagne': 'Montre connectée Lume Champagne, AMOLED, élégante, santé 24/7, autonomie optimale.',
  'montre-hifuture-lume-pro': 'Montre connectée Lume Pro, AMOLED HD, GPS précis, santé avancée, étanche 5ATM.',
  'montre-hifuture-lume-pro-titanium': 'Montre connectée Lume Pro Titanium, boîtier titane, AMOLED, GPS, ultra-résistante.',

  // Montres Mixx 3
  'montre-hifuture-mixx-3': 'Montre connectée Mixx 3, écran tactile, santé 24/7, 80+ sports, IP68, 10j autonomie.',
  'montre-hifuture-mixx-3-fluo': 'Montre connectée Mixx 3 Fluo, design sportif, santé complète, GPS, bracelet fluo.',

  // Montres Vela
  'montre-hifuture-vela': 'Montre connectée Vela, AMOLED rond, design classique, santé 24/7, appels, autonomie 7j.',
  'montre-hifuture-vela-beige': 'Montre connectée Vela Beige, AMOLED, élégante, cardio continu, sommeil, IP68.',

  // Montre Zone 2
  'montre-hifuture-zone-2': 'Montre connectée Zone 2, grand écran, 100+ sports, santé complète, autonomie 15j.'
};

async function enrichHifuture() {
  console.log('🎨 ENRICHISSEMENT PRODUITS HIFUTURE\n');
  console.log('='.repeat(80));

  // Récupérer la marque HIFUTURE
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%hifuture%')
    .single();

  if (!brand) {
    console.log('❌ Marque HIFUTURE introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer tous les produits HIFUTURE actifs
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit HIFUTURE trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits HIFUTURE à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = hifutureDescriptions[product.url_slug];

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

enrichHifuture();
