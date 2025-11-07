import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs officielles MUVIT
const muvitDescriptions: Record<string, string> = {
  // Casques audio enfants - Tous partagent les mêmes specs techniques
  'casque-sans-fils-enfants-muvit-chat': 'Casque Bluetooth enfant Chat, sans fil, limitation volume 85dB sécurité auditive, pliable, coussinets confort, batterie rechargeable USB-C.',
  'casque-sans-fils-enfants-muvit-dragon': 'Casque Bluetooth enfant Dragon, sans fil, limitation volume 85dB sécurité auditive, pliable, coussinets confort, batterie rechargeable USB-C.',
  'casque-sans-fils-enfants-muvit-lapin': 'Casque Bluetooth enfant Lapin, sans fil, limitation volume 85dB sécurité auditive, pliable, coussinets confort, batterie rechargeable USB-C.',
  'casque-sans-fils-enfants-muvit-licne': 'Casque Bluetooth enfant Licorne, sans fil, limitation volume 85dB sécurité auditive, pliable, coussinets confort, batterie rechargeable USB-C.',
  'casque-sans-fils-enfants-muvit-pika': 'Casque Bluetooth enfant Pika, sans fil, limitation volume 85dB sécurité auditive, pliable, coussinets confort, batterie rechargeable USB-C.',

  // Accessoires photo enfants
  'appareil-photo-enfant-muvit-kidpic': 'Appareil photo numérique enfant KIDPIC avec impression instantanée thermique, écran 2", 12MP, vidéo, filtres amusants, rechargeable USB.',
  'rouleaux-papier-photo-x5-kidpic-enfant': 'Lot de 5 rouleaux papier photo thermique compatibles appareil KIDPIC, impression instantanée sans encre, autocollants.'
};

async function enrichMuvit() {
  console.log('🎨 ENRICHISSEMENT PRODUITS MUVIT\n');
  console.log('='.repeat(80));

  // Récupérer la marque MUVIT
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%muvit%')
    .single();

  if (!brand) {
    console.log('❌ Marque MUVIT introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer tous les produits MUVIT actifs
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit MUVIT trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits MUVIT à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = muvitDescriptions[product.url_slug];

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

enrichMuvit();
