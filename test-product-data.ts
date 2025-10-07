// Script pour vérifier les données produits avec variants
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testProductData() {
  console.log('\n🔍 VÉRIFICATION DES DONNÉES PRODUITS\n');
  
  // 1. Récupérer quelques produits avec stock = 0
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      stock_quantity,
      has_variants,
      product_variants (
        id,
        color,
        stock,
        ean
      )
    `)
    .eq('stock_quantity', 0)
    .limit(5);

  if (error) {
    console.error('❌ Erreur:', error);
    return;
  }

  console.log(`📦 ${products?.length || 0} produits avec stock_quantity = 0:\n`);
  
  products?.forEach(p => {
    console.log(`\n📱 ${p.name}`);
    console.log(`   Stock produit: ${p.stock_quantity}`);
    console.log(`   Has variants: ${p.has_variants}`);
    console.log(`   Variants trouvés: ${p.product_variants?.length || 0}`);
    
    if (p.product_variants && p.product_variants.length > 0) {
      p.product_variants.forEach((v: any) => {
        console.log(`   └─ ${v.color}: stock = ${v.stock} (EAN: ${v.ean || 'N/A'})`);
      });
    }
  });
  
  // 2. Vérifier combien de produits ont variants
  const { count: withVariants } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('has_variants', true);
    
  console.log(`\n📊 STATISTIQUES:`);
  console.log(`   Produits avec has_variants=true: ${withVariants || 0}`);
  
  // 3. Compter les variants total
  const { count: totalVariants } = await supabase
    .from('product_variants')
    .select('*', { count: 'exact', head: true });
    
  console.log(`   Total variants en BDD: ${totalVariants || 0}`);
}

testProductData().catch(console.error);
