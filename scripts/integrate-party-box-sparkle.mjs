#!/usr/bin/env node

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal'
};

// IDs
const VARIANT_ID = 'c49875cf-0997-47e0-8076-39bcbfd98fd7';
const SECTION_DESCRIPTION = '5b629f7c-a710-4662-bc40-a167093b09da';
const SECTION_POINTS_FORTS = '64363d44-5c08-4b1c-9619-ff4c2a845a4e';
const SECTION_POURQUOI_CHOISIR = '7dedb8b3-7364-479d-b50d-411d3d9a17b3';

// Images Cloudinary (IDs fournis par l'utilisateur)
const CAROUSEL_IMAGES = [
  'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_4',  // default
  'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT',
  'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_3',
  'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_1',
  'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_2'
];

const IMAGE_DESCRIPTION = 'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_2';
const IMAGE_POINTS_FORTS = 'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT';
const IMAGE_POURQUOI_CHOISIR = 'MONSTER_ENCEINTE_S150_PLUS_NOIR_HT_1';

async function patchData(endpoint, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data)
  });
  return response.ok;
}

async function main() {
  console.log('=== Intégration images MONSTER ENCEINTE PARTY BOX SPARKLE ===\n');

  // 1. Variant Standard - carousel images
  console.log('1. Mise à jour variant Standard avec images carousel...');
  const variantOk = await patchData(
    `product_variants?id=eq.${VARIANT_ID}`,
    { images: CAROUSEL_IMAGES, is_default: true }
  );
  console.log(variantOk ? '   ✅ Variant mis à jour' : '   ❌ Erreur variant');

  // 2. Section Description
  console.log('2. Mise à jour section Description...');
  const descOk = await patchData(
    `product_content_sections?id=eq.${SECTION_DESCRIPTION}`,
    { images: [IMAGE_DESCRIPTION] }
  );
  console.log(descOk ? '   ✅ Description mise à jour' : '   ❌ Erreur Description');

  // 3. Section Points Forts
  console.log('3. Mise à jour section Points Forts...');
  const pointsOk = await patchData(
    `product_content_sections?id=eq.${SECTION_POINTS_FORTS}`,
    { images: [IMAGE_POINTS_FORTS] }
  );
  console.log(pointsOk ? '   ✅ Points Forts mis à jour' : '   ❌ Erreur Points Forts');

  // 4. Section Pourquoi Choisir
  console.log('4. Mise à jour section Pourquoi Choisir...');
  const pourquoiOk = await patchData(
    `product_content_sections?id=eq.${SECTION_POURQUOI_CHOISIR}`,
    { images: [IMAGE_POURQUOI_CHOISIR] }
  );
  console.log(pourquoiOk ? '   ✅ Pourquoi Choisir mis à jour' : '   ❌ Erreur Pourquoi Choisir');

  console.log('\n=== Intégration terminée ===');
}

main().catch(console.error);
