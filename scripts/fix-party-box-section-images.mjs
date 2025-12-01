// Script pour ajouter les images dans le champ `images` des sections CMS
// (le composant lit section.images, pas metadata.image_id)

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

// IDs Cloudinary des images
const IMAGES = {
  HT_1: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_1',
  HT_3: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_3',
  HT_4: 'MONSTER_ENCEINTE_PARTY_MUSIC_BOX_GO_2_MICRO_HT_4'
};

// IDs des sections
const SECTIONS = {
  description_card: {
    id: '20c281cf-68ee-404c-bd07-28b455da1d7e',
    image: IMAGES.HT_3
  },
  features_list: {
    id: '2b28a440-d311-4cce-a912-ef3c31e6e945',
    image: IMAGES.HT_1
  },
  engagement_card: {
    id: '92563559-0af3-412a-972d-27b6413f1bba',
    image: IMAGES.HT_4
  }
};

// Fonction pour mettre à jour le champ images d'une section
async function updateSectionImages(sectionId, imageId) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/product_content_sections?id=eq.${sectionId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ images: [imageId] })
  });
  return response.ok;
}

async function main() {
  console.log('🖼️  Mise à jour des images dans le champ `images` des sections CMS...\n');

  // Description → HT_3
  console.log('📝 Section Description → HT_3...');
  const descOk = await updateSectionImages(SECTIONS.description_card.id, SECTIONS.description_card.image);
  console.log(descOk ? '   ✅ OK' : '   ❌ Erreur');

  // Points Forts → HT_1
  console.log('⭐ Section Points Forts → HT_1...');
  const featuresOk = await updateSectionImages(SECTIONS.features_list.id, SECTIONS.features_list.image);
  console.log(featuresOk ? '   ✅ OK' : '   ❌ Erreur');

  // Pourquoi Choisir → HT_4
  console.log('💡 Section Pourquoi Choisir → HT_4...');
  const engagementOk = await updateSectionImages(SECTIONS.engagement_card.id, SECTIONS.engagement_card.image);
  console.log(engagementOk ? '   ✅ OK' : '   ❌ Erreur');

  console.log('\n✅ Terminé ! Rafraîchissez la page produit.');
}

main().catch(console.error);
