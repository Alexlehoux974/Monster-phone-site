import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes sourcées pour les 10 produits restants (MY WAY + ABYX)
const shortDescriptions: Record<string, string> = {
  // ABYX (1 produit)
  'powerbank-abyx-10k-mah': 'Batterie externe 10000mAh Li-Polymer 37Wh, 2 USB-A + USB-C 2.4A, écran digital, 217g, recharge 4x smartphone.',

  // MY WAY (9 produits)
  'cable-lumineux-my-way-usb-a-lightning': 'Câble USB-A vers Lightning lumineux LED, charge rapide, synchronisation, 1m, éclairage effet flow.',
  'cable-lumineux-my-way-usb-a-usb-c': 'Câble USB-A vers USB-C lumineux LED, charge rapide, synchronisation, 1m, éclairage effet flow.',
  'cable-lumineux-my-way-usb-c-lightning': 'Câble USB-C vers Lightning lumineux LED, charge rapide Power Delivery, synchronisation, 1m, effet flow.',
  'cable-lumineux-my-way-usb-c-usb-c': 'Câble USB-C vers USB-C lumineux LED, charge rapide 100W, synchronisation, 1m, éclairage effet flow.',
  'cable-retractable-my-way-usb-c-3-en-1-100-w': 'Câble rétractable 3-en-1 USB-C 100W, Lightning/Micro-USB 5V/2A, 1.2m extensible, charge & sync.',
  'chargeur-sans-fils-my-way-15w-magsafe-donuts': 'Chargeur MagSafe 15W pour iPhone 12/13/14/15, magnétique alignement parfait, charge sans fil rapide.',
  'powerbank-my-way-5k-mah-magsafe': 'Batterie externe MagSafe 5000mAh, charge sans fil 15W iPhone 12+, magnétique, ultra-compact format poche.',
  'powerbank-myway-10k-mah': 'Batterie externe 10000mAh, sortie 10.5W, USB-C in/out + 2 USB-A, 3 recharges smartphone complètes.',
  'powerbank-myway-20k-mah': 'Batterie externe 20000mAh, sortie 10.5W, USB-C in/out + 2 USB-A, 6 recharges smartphone complètes.'
};

async function enrichRemainingShortDesc() {
  console.log('📝 ENRICHISSEMENT DESCRIPTIONS COURTES - 10 PRODUITS (ABYX + MY WAY)\n');
  console.log('='.repeat(80));

  let updated = 0;
  let failed = 0;

  for (const [slug, shortDesc] of Object.entries(shortDescriptions)) {
    // Récupérer le produit par son slug
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

    // Mettre à jour la description courte
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
  console.log(`   ✅ Mis à jour: ${updated}/10`);
  console.log(`   ❌ Échecs: ${failed}/10\n`);
}

enrichRemainingShortDesc();
