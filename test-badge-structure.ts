import { createClient } from '@supabase/supabase-js';
import { supabaseProductToLegacy } from './src/lib/supabase/adapters';
import { isCompletelyOutOfStock } from './src/lib/utils';

const supabase = createClient(
  "https://nswlznqoadjffpxkagoz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg"
);

async function test() {
  // Récupérer UN produit en rupture
  const { data } = await supabase
    .from('products_full')
    .select('*')
    .eq('stock_quantity', 0)
    .limit(1)
    .single();

  if (data) {
    console.log('\n🔍 PRODUIT SUPABASE:');
    console.log('name:', data.name);
    console.log('stock_quantity:', data.stock_quantity);
    console.log('has_variants:', data.has_variants);
    console.log('variants:', JSON.stringify(data.variants));

    const converted = supabaseProductToLegacy(data);
    console.log('\n🔄 PRODUIT CONVERTI:');
    console.log('variants:', converted.variants);
    console.log('variant stocks:', converted.variants.map(v => ({ color: v.color, stock: v.stock })));

    console.log('\n🎯 TEST isCompletelyOutOfStock:');
    const result = isCompletelyOutOfStock(converted);
    console.log('Résultat:', result);
    console.log(result ? '✅ BADGE DOIT APPARAÎTRE' : '❌ BADGE NE DOIT PAS APPARAÎTRE');
  }
}

test().catch(console.error);
