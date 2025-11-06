import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteHonorX5() {
  const productId = '57a25bee-bb58-4248-95c8-4622e61e0227';
  
  console.log('🗑️  SUPPRESSION HONOR X5 de Supabase');
  console.log('    ID:', productId);
  
  // 1. Delete product_content_sections first (foreign key)
  console.log('\n1️⃣  Suppression sections CMS...');
  const { error: sectionsError } = await supabase
    .from('product_content_sections')
    .delete()
    .eq('product_id', productId);

  if (sectionsError) {
    console.log('   ⚠️  Erreur sections:', sectionsError.message);
  } else {
    console.log('   ✅ Sections supprimées');
  }

  // 2. Delete product_variants (foreign key)
  console.log('\n2️⃣  Suppression variants...');
  const { error: variantsError } = await supabase
    .from('product_variants')
    .delete()
    .eq('product_id', productId);

  if (variantsError) {
    console.log('   ⚠️  Erreur variants:', variantsError.message);
  } else {
    console.log('   ✅ Variants supprimés');
  }

  // 3. Delete the product
  console.log('\n3️⃣  Suppression PRODUIT...');
  const { error: productError } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (productError) {
    console.log('   ❌ ERREUR:', productError.message);
  } else {
    console.log('   ✅ PRODUIT SUPPRIMÉ!');
  }

  console.log('\n✅ TERMINÉ\n');
}

deleteHonorX5();
