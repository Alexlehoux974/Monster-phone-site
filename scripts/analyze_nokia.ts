import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function analyzeNokia() {
  console.log('\n🔍 ANALYSE DU PRODUIT NOKIA 110 4G 2025 (RÉFÉRENCE)');
  console.log('=' .repeat(80));

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      brand:brands(id, name, slug),
      category:categories!products_category_id_fkey(id, name, slug),
      subcategory:categories!products_subcategory_id_fkey(id, name, slug),
      product_variants(*)
    `)
    .eq('url_slug', 'nokia-110-4g-2025')
    .single();

  if (error || !product) {
    console.error('❌ Produit non trouvé:', error);
    return;
  }

  console.log('\n✅ PRODUIT NOKIA (à conserver):');
  console.log('  ID:', product.id);
  console.log('  SKU:', product.sku);
  console.log('  Nom:', product.name);
  console.log('  Brand:', product.brand);
  console.log('  Category:', product.category);
  console.log('  Subcategory:', product.subcategory);
  console.log('  Prix:', product.price);
  console.log('  Variants:', product.product_variants?.length || 0);

  console.log('\n📋 CHAMPS IMPORTANTS:');
  console.log('  - specifications:', typeof product.specifications, product.specifications ? 'JSONB object' : 'null');
  console.log('  - highlights:', typeof product.highlights, product.highlights ? 'Array' : 'null');
  console.log('  - images:', typeof product.images, product.images ? 'Array' : 'null');
  console.log('  - description: Length =', product.description?.length || 0);

  console.log('\n📋 STRUCTURE COMPLÈTE SAUVEGARDÉE dans /tmp/nokia_reference.json');
  fs.writeFileSync('/tmp/nokia_reference.json', JSON.stringify(product, null, 2));

  return product;
}

analyzeNokia();
