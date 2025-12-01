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
  // PARTIE 1: Corriger MONSTER ENCEINTE S150
  // (mettre les images S150_PLUS qui étaient mal placées)
  // ========================================
  console.log('=== 1. MONSTER ENCEINTE S150 ===\n');

  const S150_VARIANT = '87ef426b-10e1-47b1-acee-7762490a9477';
  const S150_DESC = 'db51e7ce-ae90-4045-ab4f-8875dcd68aad';
  const S150_POINTS = '03dc5aab-f767-4a36-a978-5aed70bdf7e0';
  const S150_POURQUOI = 'f21dee2f-1ecb-4815-be7b-3cc43d2491e9';

  // Images S150_PLUS pour S150 (les images de la session précédente)
  const S150_CAROUSEL = [
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_4',  // default
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT',
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_3',
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_1',
    'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_2'
  ];

  console.log('1.1 Variant Noir - carousel...');
  let ok = await patchData(`product_variants?id=eq.${S150_VARIANT}`, {
    images: S150_CAROUSEL,
    is_default: true
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('1.2 Section Description...');
  ok = await patchData(`product_content_sections?id=eq.${S150_DESC}`, {
    images: ['MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_2']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('1.3 Section Points Forts...');
  ok = await patchData(`product_content_sections?id=eq.${S150_POINTS}`, {
    images: ['MONSTER_ENCEINTE_S150_PLUS_NOIR_HT']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('1.4 Section Pourquoi Choisir...');
  ok = await patchData(`product_content_sections?id=eq.${S150_POURQUOI}`, {
    images: ['MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_1']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  // ========================================
  // PARTIE 2: Corriger PARTY BOX SPARKLE
  // (mettre les bonnes images PARTY_BOX_SPARKLE)
  // ========================================
  console.log('\n=== 2. MONSTER ENCEINTE PARTY BOX SPARKLE ===\n');

  const SPARKLE_VARIANT = 'c49875cf-0997-47e0-8076-39bcbfd98fd7';
  const SPARKLE_DESC = '5b629f7c-a710-4662-bc40-a167093b09da';
  const SPARKLE_POINTS = '64363d44-5c08-4b1c-9619-ff4c2a845a4e';
  const SPARKLE_POURQUOI = '7dedb8b3-7364-479d-b50d-411d3d9a17b3';

  // Images PARTY_BOX_SPARKLE - default en premier (HT_2)
  const SPARKLE_CAROUSEL = [
    'MONSTER_ENCEINTE_PARTY_BOX_SPARKLE_HT_2',  // default (première à voir)
    'MONSTER_ENCEINTE_PARTY_BOX_SPARKLE_HT',
    'MONSTER_ENCEINTE_PARTY_BOX_SPARKLE_HT_1'
  ];

  console.log('2.1 Variant Standard - carousel...');
  ok = await patchData(`product_variants?id=eq.${SPARKLE_VARIANT}`, {
    images: SPARKLE_CAROUSEL,
    is_default: true
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('2.2 Section Description...');
  ok = await patchData(`product_content_sections?id=eq.${SPARKLE_DESC}`, {
    images: ['MONSTER_ENCEINTE_PARTY_BOX_SPARKLE_HT_2']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('2.3 Section Points Forts...');
  ok = await patchData(`product_content_sections?id=eq.${SPARKLE_POINTS}`, {
    images: ['MONSTER_ENCEINTE_PARTY_BOX_SPARKLE_HT']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('2.4 Section Pourquoi Choisir...');
  ok = await patchData(`product_content_sections?id=eq.${SPARKLE_POURQUOI}`, {
    images: ['MONSTER_ENCEINTE_PARTY_BOX_SPARKLE_HT_1']
  });
  console.log(ok ? '   ✅ OK' : '   ❌ Erreur');

  console.log('\n=== Correction terminée ===');
}

main().catch(console.error);
