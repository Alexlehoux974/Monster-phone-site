import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Vérifie le contenu des 3 produits HIFUTURE enrichis
 */
async function verify3Products() {
  console.log('🔍 Vérification du contenu des 3 produits HIFUTURE\n');
  console.log('================================================\n');

  const keyProducts = ['SONIC AIR', 'SONIFY', 'OLYMBUDS 3'];

  for (const productName of keyProducts) {
    console.log(`\n📦 ${productName}`);
    console.log('─'.repeat(60));

    // Trouver le produit
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, url_slug')
      .ilike('name', `%${productName}%`)
      .limit(1)
      .single();

    if (productError || !product) {
      console.log(`   ❌ Produit non trouvé`);
      continue;
    }

    // Récupérer les sections
    const { data: sections, error: sectionsError } = await supabase
      .from('product_content_sections')
      .select('section_type, content, metadata')
      .eq('product_id', product.id)
      .order('display_order');

    if (sectionsError || !sections || sections.length === 0) {
      console.log(`   ⚠️  Aucune section trouvée`);
      continue;
    }

    console.log(`   ✅ ${sections.length} sections trouvées`);

    for (const section of sections) {
      console.log(`\n   📄 ${section.section_type}`);

      if (section.content) {
        // Afficher un aperçu du contenu HTML
        const preview = section.content
          .replace(/<[^>]+>/g, '') // Retirer les tags HTML
          .substring(0, 120);
        console.log(`      Contenu: ${preview}...`);
      }

      if (section.metadata) {
        // Afficher les specs ou features
        if (section.metadata.specs) {
          const specValues = section.metadata.specs
            .map((s: any) => `${s.label}: ${s.value}`)
            .slice(0, 3);
          console.log(`      Specs: ${specValues.join(' | ')}`);
        }
        if (section.metadata.features) {
          const featureTexts = section.metadata.features
            .map((f: any) => f.text.substring(0, 50))
            .slice(0, 2);
          console.log(`      Features: ${featureTexts.join(' | ')}...`);
        }
      }
    }
  }

  console.log('\n\n================================================');
  console.log('✅ Vérification terminée!\n');
}

verify3Products();
