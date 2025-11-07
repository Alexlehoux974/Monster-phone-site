import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs officielles HONOR
const honorDescriptions: Record<string, string> = {
  // Tablette HONOR Pad 9
  'hon-pad-9-wifi-8': 'Tablette 12.1" 2.5K 120Hz, Snapdragon 6 Gen 1, 8Go RAM, batterie 8300mAh, charge 35W, 8 haut-parleurs.',

  // Smartphones HONOR série X
  'honor-x5b-4': 'Smartphone 6.56" HD+, 4Go RAM, batterie 5200mAh, caméra 50MP, double SIM, design robuste.',
  'honor-x6c-6': 'Smartphone 6.56" HD+, 6Go RAM, batterie 5300mAh, charge 35W, caméra 50MP, résistant.',
  'honor-x7c-8': 'Smartphone 6.77" FHD+, Snapdragon 685, 8Go RAM, batterie 6000mAh, caméra 108MP, IP64, résistant chocs.',
  'honor-x9c-12': 'Smartphone 6.78" AMOLED, 12Go RAM, batterie 6600mAh, charge 66W, caméra 108MP, écran Eye Comfort.',

  // Smartphone HONOR 200 Pro
  'telephone-honor-200-pro-12': 'Smartphone 6.78" AMOLED 120Hz, Snapdragon 8s Gen 3, 12Go RAM, triple caméra 50MP Portrait, batterie 5200mAh, charge 100W.'
};

async function enrichHonor() {
  console.log('🎨 ENRICHISSEMENT PRODUITS HONOR\n');
  console.log('='.repeat(80));

  // Récupérer la marque HONOR
  const { data: brand } = await supabase
    .from('brands')
    .select('id, name')
    .ilike('name', '%honor%')
    .single();

  if (!brand) {
    console.log('❌ Marque HONOR introuvable');
    return;
  }

  console.log(`\n✅ Marque: ${brand.name} (ID: ${brand.id})\n`);

  // Récupérer tous les produits HONOR actifs
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit HONOR trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits HONOR à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = honorDescriptions[product.url_slug];

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

enrichHonor();
