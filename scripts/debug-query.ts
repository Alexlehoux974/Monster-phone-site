import { supabase } from '../lib/supabase/client';

async function debugQuery() {
  const slug = 'casque-monster-n-lite-206-blanc';

  console.log(`🔍 Test de requête pour slug: "${slug}"\n`);

  // Test 1: eq
  console.log('Test 1: Avec .eq()');
  const { data: data1, error: error1 } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('url_slug', slug)
    .single();

  if (error1) {
    console.log(`   ❌ Erreur: ${error1.message}`);
    console.log(`   Code: ${error1.code}`);
    console.log(`   Details: ${JSON.stringify(error1.details)}`);
  } else {
    console.log(`   ✅ Trouvé: ${data1.name}`);
  }

  // Test 2: eq sans single
  console.log('\nTest 2: Avec .eq() sans single');
  const { data: data2, error: error2 } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .eq('url_slug', slug);

  if (error2) {
    console.log(`   ❌ Erreur: ${error2.message}`);
  } else {
    console.log(`   ✅ Trouvé: ${data2.length} résultat(s)`);
    data2.forEach(p => console.log(`      - ${p.name}`));
  }

  // Test 3: Liste de tous les slugs qui commencent par "casque-monster"
  console.log('\nTest 3: Liste des slugs "casque-monster"');
  const { data: data3, error: error3 } = await supabase
    .from('products')
    .select('url_slug, name, status')
    .ilike('url_slug', 'casque-monster%')
    .order('url_slug');

  if (error3) {
    console.log(`   ❌ Erreur: ${error3.message}`);
  } else {
    console.log(`   ✅ Trouvé: ${data3.length} résultat(s)`);
    data3.forEach(p => console.log(`      - ${p.url_slug} (${p.status}) - ${p.name}`));
  }
}

debugQuery().then(() => {
  console.log('\n✅ Terminé\n');
  process.exit(0);
}).catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
