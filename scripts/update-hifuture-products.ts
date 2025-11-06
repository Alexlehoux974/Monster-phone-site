import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Script pour mettre à jour les produits HIFUTURE avec du contenu réel
 * 1. Supprime les anciennes sections génériques
 * 2. Permettra ensuite de recréer les sections avec le contenu spécifique sourcé
 */

async function updateHifutureProducts() {
  console.log('🔄 Mise à jour des produits HIFUTURE avec contenu réel\n');
  console.log('================================================\n');

  // 1. Trouver tous les produits HIFUTURE
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .ilike('name', '%hifuture%');

  if (productsError || !products) {
    console.log(`   ⚠️  Erreur lors de la récupération des produits HIFUTURE`);
    return;
  }

  console.log(`📦 ${products.length} produit(s) HIFUTURE trouvé(s)\n`);

  for (const product of products) {
    console.log(`\n📦 Traitement: ${product.name}`);

    // 2. Supprimer les anciennes sections
    const { error: deleteError } = await supabase
      .from('product_content_sections')
      .delete()
      .eq('product_id', product.id)
      .in('section_type', ['description_card', 'specs_grid', 'features_list', 'engagement_card']);

    if (deleteError) {
      console.log(`   ❌ Erreur suppression: ${deleteError.message}`);
      continue;
    }

    console.log(`   ✓ Anciennes sections supprimées`);
  }

  console.log('\n================================================');
  console.log(`✅ Suppression terminée pour ${products.length} produits!`);
  console.log('\n💡 Maintenant, lancez:');
  console.log('   npx tsx scripts/enrich-product-cms.ts --limit=44\n');
}

updateHifutureProducts();
