import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes SOURCÉES avec VRAIES spécifications pour chaque produit
const shortDescriptions: Record<string, string> = {
  // ABYX (1 produit) - Source: Boulanger + La Redoute + Auchan
  'powerbank-abyx-10k-mah': 'Batterie 10000mAh Li-Polymer 37Wh, 2 USB-A + USB-C 2.4A, écran digital niveau charge, 6.8x14.3x1.6cm 217g, 4 recharges smartphone.',

  // MY WAY Câbles lumineux - Source: Ascendeo
  'cable-lumineux-my-way-usb-a-lightning': 'Câble USB-A Lightning LED RGB "respirant" 60W max, 1m, sync + charge, 165x20x60mm 53g.',
  'cable-lumineux-my-way-usb-a-usb-c': 'Câble USB-A USB-C LED RGB "respirant" 60W max, 1m, sync + charge, 165x20x60mm 53g.',
  'cable-lumineux-my-way-usb-c-lightning': 'Câble USB-C Lightning LED RGB "respirant" 60W max PD, 1m, sync + charge, 165x20x60mm 53g.',
  'cable-lumineux-my-way-usb-c-usb-c': 'Câble USB-C USB-C LED RGB "respirant" 100W max, 1m, sync + charge, 165x20x60mm 53g.',

  // MY WAY Câble rétractable - Source: Ascendeo
  'cable-retractable-my-way-usb-c-3-en-1-100-w': 'Câble rétractable USB-C 3-en-1: USB-C 100W + Lightning/Micro-USB 5V/2A, 1.2m extensible, 29x80x165mm 110g.',

  // MY WAY Chargeur MagSafe - Source: Ascendeo
  'chargeur-sans-fils-my-way-15w-magsafe-donuts': 'Chargeur MagSafe Donut 15W, compatible iPhone 12+/Qi2, câble USB-C fixe, 60x165x30mm 64g.',

  // MY WAY Powerbanks - Source: Ascendeo (pas de modèle MagSafe MY WAY trouvé)
  'powerbank-my-way-5k-mah-magsafe': 'Batterie MagSafe 5000mAh, charge sans fil 15W/10W/7.5W/5W, iPhone 12+, USB-C in/out, compact poche.',
  'powerbank-myway-10k-mah': 'Batterie 10000mAh Fast Charge 10.5W, USB-C in/out + 2 USB-A, 3 recharges smartphone complètes.',
  'powerbank-myway-20k-mah': 'Batterie 20000mAh Fast Charge 10.5W, USB-C in/out + 2 USB-A, 6 recharges smartphone complètes.',

  // TIGER POWER - Source: Ascendeo
  'cable-tiger-power-lite-6-en-1-avec-apple-watch': 'Câble nylon tressé 6-en-1: USB-C 60W + Lightning 12W + Apple Watch 5W, USB 2.0 480Mb/s, 1m, 10kg résistance, 30x80x165mm 90g.'
};

async function enrichRealSpecsShortDesc() {
  console.log('🔍 ENRICHISSEMENT DESCRIPTIONS COURTES - VRAIES SPÉCIFICATIONS SOURCÉES\n');
  console.log('='.repeat(80));

  let updated = 0;
  let failed = 0;

  for (const [slug, shortDesc] of Object.entries(shortDescriptions)) {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, brand:brands!products_brand_id_fkey(name)')
      .eq('url_slug', slug)
      .eq('status', 'active')
      .single();

    if (productError || !product) {
      console.log(`\n❌ Produit introuvable: ${slug}`);
      failed++;
      continue;
    }

    console.log(`\n📦 ${product.name}`);
    console.log(`   Marque: ${(product.brand as any)?.name || 'N/A'}`);
    console.log(`   Slug: ${slug}`);

    const { error: updateError } = await supabase
      .from('products')
      .update({ short_description: shortDesc })
      .eq('id', product.id);

    if (updateError) {
      console.log(`   ❌ Erreur mise à jour: ${updateError.message}`);
      failed++;
    } else {
      console.log(`   ✅ Description mise à jour`);
      console.log(`   📝 "${shortDesc.substring(0, 80)}..."`);
      updated++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 RÉSULTATS:`);
  console.log(`   ✅ Mis à jour: ${updated}/11`);
  console.log(`   ❌ Échecs: ${failed}/11\n`);
}

enrichRealSpecsShortDesc();
