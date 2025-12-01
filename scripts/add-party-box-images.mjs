// Script pour ajouter les images au MONSTER PARTY MUSIC BOX GO + 2 MICRO

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

// IDs Cloudinary des images
const IMAGES = {
  HT_1: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_1',
  HT_2: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_2',
  HT_3: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_3',
  HT_4: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_4'
};

// IDs
const VARIANT_ID = 'cacadeff-cbe2-40b3-ba9f-8750627c16c1';
const SECTION_IDS = {
  description_card: '20c281cf-68ee-404c-bd07-28b455da1d7e',
  features_list: '2b28a440-d311-4cce-a912-ef3c31e6e945',
  engagement_card: '92563559-0af3-412a-972d-27b6413f1bba'
};

// Images pour le carrousel : HT_2 en premier, puis HT_3, HT_4, HT_1 (sans doublons)
const CAROUSEL_IMAGES = [
  IMAGES.HT_2,
  IMAGES.HT_3,
  IMAGES.HT_4,
  IMAGES.HT_1
];

// Fonction pour mettre à jour le variant (images carrousel)
async function updateVariantImages() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/product_variants?id=eq.${VARIANT_ID}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ images: CAROUSEL_IMAGES })
  });
  return response.ok;
}

// Fonction pour mettre à jour une section CMS avec image_id
async function updateSectionImage(sectionId, imageId) {
  // D'abord récupérer le metadata existant
  const getResponse = await fetch(`${SUPABASE_URL}/rest/v1/product_content_sections?id=eq.${sectionId}&select=metadata`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });

  const data = await getResponse.json();
  const existingMetadata = data[0]?.metadata || {};

  // Fusionner avec le nouveau image_id
  const updatedMetadata = {
    ...existingMetadata,
    image_id: imageId
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/product_content_sections?id=eq.${sectionId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ metadata: updatedMetadata })
  });
  return response.ok;
}

async function main() {
  console.log('🖼️  Ajout des images MONSTER PARTY MUSIC BOX GO + 2 MICRO...\n');

  // 1. Images du carrousel (variant)
  console.log('📸 Carrousel (4 images, HT_2 en premier)...');
  const variantOk = await updateVariantImages();
  console.log(variantOk ? '   ✅ Carrousel mis à jour' : '   ❌ Erreur carrousel');

  // 2. Section Description → HT_3
  console.log('📝 Section Description → HT_3...');
  const descOk = await updateSectionImage(SECTION_IDS.description_card, IMAGES.HT_3);
  console.log(descOk ? '   ✅ OK' : '   ❌ Erreur');

  // 3. Section Points Forts → HT_1
  console.log('⭐ Section Points Forts → HT_1...');
  const featuresOk = await updateSectionImage(SECTION_IDS.features_list, IMAGES.HT_1);
  console.log(featuresOk ? '   ✅ OK' : '   ❌ Erreur');

  // 4. Section Pourquoi Choisir → HT_4
  console.log('💡 Section Pourquoi Choisir → HT_4...');
  const engagementOk = await updateSectionImage(SECTION_IDS.engagement_card, IMAGES.HT_4);
  console.log(engagementOk ? '   ✅ OK' : '   ❌ Erreur');

  console.log('\n✅ Terminé ! Rafraîchissez la page produit.');
}

main().catch(console.error);
