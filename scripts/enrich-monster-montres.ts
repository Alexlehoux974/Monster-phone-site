import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Descriptions courtes basées sur les specs officielles MONSTER
const montresDescriptions: Record<string, string> = {
  'monster-n-lite-203': 'Montre connectée MONSTER N LITE 203 avec écran tactile couleur 1.4", suivi santé 24/7, multi-sports, notifications, étanche IP67, 7-10 jours autonomie.',
  'monster-n-lite-206': 'Montre connectée MONSTER N LITE 206 avec écran tactile HD 1.69", suivi santé avancé, oxymètre SpO2, 100+ modes sport, étanche IP68, 7-12 jours autonomie.',
  'monster-th300-tactile': 'Montre connectée MONSTER TH300 avec grand écran tactile AMOLED, appels Bluetooth, assistant vocal, GPS intégré, suivi santé complet, étanche 5ATM.',
};

async function enrichMonsterMontres() {
  console.log('⌚ ENRICHISSEMENT PRODUITS MONTRES MONSTER\n');
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

  // Récupérer toutes les catégories liées aux montres
  const { data: montresCategories } = await supabase
    .from('categories')
    .select('id, name')
    .or('name.ilike.%montre%,name.ilike.%watch%,name.ilike.%smartwatch%');

  if (!montresCategories || montresCategories.length === 0) {
    console.log('❌ Catégories Montres introuvables');
    return;
  }

  console.log(`✅ Catégories trouvées: ${montresCategories.map(c => c.name).join(', ')}\n`);

  const categoryIds = montresCategories.map(c => c.id);

  // Récupérer tous les produits Montres MONSTER
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, category:categories!products_category_id_fkey(name)')
    .eq('brand_id', brand.id)
    .in('category_id', categoryIds)
    .eq('status', 'active')
    .order('name');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit Montre MONSTER trouvé');
    return;
  }

  console.log(`📦 ${products.length} produits Montres MONSTER à enrichir:\n`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const product of products) {
    const shortDesc = montresDescriptions[product.url_slug];

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

enrichMonsterMontres();
