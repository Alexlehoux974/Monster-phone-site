import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProduct() {
  console.log('🔍 Recherche du produit HON X5 / HONOR X5\n');

  // Chercher avec différentes variantes
  const { data: products } = await supabase
    .from('products')
    .select('id, name, url_slug, brand')
    .or('url_slug.eq.hon-x5,url_slug.eq.honor-x5,name.ilike.%honor x5%,name.ilike.%hon x5%');

  if (!products || products.length === 0) {
    console.log('❌ Aucun produit trouvé');
    return;
  }

  for (const product of products) {
    console.log('\n📦 Produit trouvé:');
    console.log('   ID:', product.id);
    console.log('   Nom:', product.name);
    console.log('   URL:', product.url_slug);
    console.log('   Marque:', product.brand);

    // Vérifier les sections
    const { data: sections } = await supabase
      .from('product_content_sections')
      .select('section_type, content, metadata')
      .eq('product_id', product.id)
      .order('display_order');

    console.log('\n   Sections:', sections?.length || 0);

    if (sections && sections.length > 0) {
      for (const section of sections) {
        console.log('\n   📄', section.section_type);
        if (section.content) {
          const preview = section.content.substring(0, 150).replace(/<[^>]+>/g, '');
          console.log('      Contenu:', preview + '...');
        }
        if (section.metadata?.specs) {
          console.log('      Specs:', section.metadata.specs.length);
          section.metadata.specs.slice(0, 3).forEach((spec: any) => {
            console.log('         -', spec.label, ':', spec.value);
          });
        }
      }
    }
  }
}

checkProduct();
