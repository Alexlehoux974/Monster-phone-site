import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Script pour supprimer les anciennes sections de 5 enceintes HIFUTURE
 * Ascendo, Ripple, Event Horizon, MusicBox, Vocalist 300
 */

async function cleanup5Speakers() {
  console.log('🧹 Nettoyage des sections pour 5 enceintes HIFUTURE\n');
  console.log('================================================\n');

  const targetProducts = ['ASCENDO', 'RIPPLE', 'EVENT HORIZON', 'MUSICBOX', 'VOCALIST 300'];

  for (const productName of targetProducts) {
    console.log(`\n📦 Traitement: ${productName}`);

    // Trouver le produit
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, url_slug')
      .ilike('name', `%${productName}%`)
      .limit(1)
      .single();

    if (productError || !product) {
      console.log(`   ⚠️  Produit non trouvé`);
      continue;
    }

    // Supprimer les anciennes sections
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
  console.log(`✅ Nettoyage terminé pour 5 enceintes!`);
  console.log('\n💡 Maintenant, lancez:');
  console.log('   npx tsx scripts/enrich-5-speakers.ts\n');
}

cleanup5Speakers();
