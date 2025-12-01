#!/usr/bin/env node

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

async function patchData(endpoint, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data)
  });
  return response.ok;
}

async function main() {
  // ========================================
  // PARTIE 1: MONSTER ENCEINTE S150
  // Une seule image : MONSTER_ENCEINTE_S150_NOIR_HT
  // ========================================
  console.log('=== 1. MONSTER ENCEINTE S150 ===\n');

  const S150_VARIANT = '87ef426b-10e1-47b1-acee-7762490a9477';
  const S150_DESC = 'db51e7ce-ae90-4045-ab4f-8875dcd68aad';
  const S150_POINTS = '03dc5aab-f767-4a36-a978-5aed70bdf7e0';
  const S150_POURQUOI = 'f21dee2f-1ecb-4815-be7b-3cc43d2491e9';

  const S150_IMAGE = 'MONSTER_ENCEINTE_S150_NOIR_HT';

  console.log('1.1 Variant Noir - carousel...');
  let ok = await patchData(`product_variants?id=eq.${S150_VARIANT}`, {
    images: [S150_IMAGE],
    is_default: true
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('1.2 Section Description...');
  ok = await patchData(`product_content_sections?id=eq.${S150_DESC}`, {
    images: [S150_IMAGE]
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('1.3 Section Points Forts...');
  ok = await patchData(`product_content_sections?id=eq.${S150_POINTS}`, {
    images: [S150_IMAGE]
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('1.4 Section Pourquoi Choisir...');
  ok = await patchData(`product_content_sections?id=eq.${S150_POURQUOI}`, {
    images: [S150_IMAGE]
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  // ========================================
  // PARTIE 2: MONSTER ENCEINTE S150 PLUS
  // Images S150_PLUS_NOIR_HT* (5 images)
  // ========================================
  console.log('\n=== 2. MONSTER ENCEINTE S150 PLUS ===\n');

  const S150PLUS_VARIANT = 'f304e7d3-81c2-4b7e-981f-8540c052f466';
  const S150PLUS_DESC = '8e3ac1d7-44be-4780-a32b-be5bad7e1e0e';
  const S150PLUS_POINTS = 'b159a434-66ba-4980-8f28-beb163c603d6';
  const S150PLUS_POURQUOI = 'c20ab502-7c81-48e1-a794-c6eb6dc305b2';

  const S150PLUS_CAROUSEL = [
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_4',  // default
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT',
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_3',
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_1',
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_2'
  ];

  console.log('2.1 Variant Noir - carousel...');
  ok = await patchData(`product_variants?id=eq.${S150PLUS_VARIANT}`, {
    images: S150PLUS_CAROUSEL,
    is_default: true
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('2.2 Section Description...');
  ok = await patchData(`product_content_sections?id=eq.${S150PLUS_DESC}`, {
    images: ['MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_2']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('2.3 Section Points Forts...');
  ok = await patchData(`product_content_sections?id=eq.${S150PLUS_POINTS}`, {
    images: ['MONSTER_ENCEINTE_S150_PLUS_NOIR_HT']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('2.4 Section Pourquoi Choisir...');
  ok = await patchData(`product_content_sections?id=eq.${S150PLUS_POURQUOI}`, {
    images: ['MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_1']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('\n=== Correction terminée ===');
}

main().catch(console.error);
