#!/usr/bin/env node

/**
 * Test script to verify product images are in database
 */

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzk5MzksImV4cCI6MjA3MDY1NTkzOX0.8hrzs5L0Q6Br0O1X9jG2AUHJmB2hsrLm3zuDfLIypdg';

async function testProductImages() {
  console.log('🧪 Test des images des produits...\n');

  // Test 1: Produits avec images
  console.log('Test 1: Récupération des produits avec images...');
  const url1 = `${SUPABASE_URL}/rest/v1/products?select=id,name,images&images=not.is.null&limit=5`;
  const response1 = await fetch(url1, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const withImages = await response1.json();
  console.log(`✅ ${withImages.length} produits avec images trouvés:`);
  withImages.forEach(p => {
    console.log(`   - ${p.name}: ${p.images ? p.images.length : 0} image(s)`);
    if (p.images && p.images.length > 0) {
      console.log(`     → ${p.images[0]}`);
    }
  });

  // Test 2: TELEPHONE HONOR 200 PRO 12+
  console.log('\nTest 2: Vérification de TELEPHONE HONOR 200 PRO 12+...');
  const url2 = `${SUPABASE_URL}/rest/v1/products?select=id,name,url_slug,images&name=eq.TELEPHONE HONOR 200 PRO 12%2B`;
  const response2 = await fetch(url2, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const honor = await response2.json();
  if (honor.length > 0) {
    console.log(`✅ Produit trouvé:`);
    console.log(`   - ID: ${honor[0].id}`);
    console.log(`   - Nom: ${honor[0].name}`);
    console.log(`   - URL slug: ${honor[0].url_slug}`);
    console.log(`   - Images: ${honor[0].images ? JSON.stringify(honor[0].images, null, 2) : 'null'}`);
  } else {
    console.log('❌ Produit non trouvé');
  }

  // Test 3: Comptage total
  console.log('\nTest 3: Comptage total...');
  const url3 = `${SUPABASE_URL}/rest/v1/products?select=id&images=not.is.null&status=eq.active`;
  const response3 = await fetch(url3, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const allWithImages = await response3.json();
  console.log(`✅ ${allWithImages.length} produits actifs avec images dans la base`);
}

testProductImages().catch(console.error);
