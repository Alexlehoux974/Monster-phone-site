// Script pour corriger les sections CMS du MONSTER PARTY MUSIC BOX GO + 2 MICRO

const SUPABASE_URL = 'https://nswlznqoadjffpxkagoz.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

// IDs des sections - PARTY MUSIC BOX GO
const SECTION_IDS = {
  specs_grid: '4cee0ec5-04bc-4a57-b298-f6c3062df7cf',
  features_list: '2b28a440-d311-4cce-a912-ef3c31e6e945',
  engagement_card: '92563559-0af3-412a-972d-27b6413f1bba'
};

// Vraies caractéristiques techniques
const REAL_SPECS = {
  specs: [
    { icon: '🔊', label: 'PUISSANCE', value: '80W Peak', details: '2× Woofer 12cm + 1× Tweeter' },
    { icon: '🎤', label: 'MICROS', value: '2 sans fil', details: 'Inclus, prêt pour karaoké' },
    { icon: '🔋', label: 'AUTONOMIE', value: '7 heures', details: 'À 50% volume' },
    { icon: '💧', label: 'ÉTANCHÉITÉ', value: 'IPX4/IPX5', details: 'Résistant aux éclaboussures' },
    { icon: '📶', label: 'BLUETOOTH', value: '5.1/5.3', details: 'Connexion stable' },
    { icon: '💡', label: 'ÉCLAIRAGE', value: 'RGB 6 modes', details: 'Sync avec la musique' },
    { icon: '⚖️', label: 'POIDS', value: '3.9 kg', details: 'Portable avec poignée' },
    { icon: '🎸', label: 'ENTRÉES', value: 'Multi-sources', details: 'BT, USB, SD, AUX, Guitare' }
  ]
};

// Vrais points forts
const REAL_FEATURES = {
  features: [
    { icon: '✓', text: '2 microphones sans fil inclus - Karaoké prêt à l\'emploi, parfait pour les duos' },
    { icon: '✓', text: 'Puissance 80W Peak avec système 2.1 - Son puissant et basses profondes' },
    { icon: '✓', text: 'Autonomie 7h - Profitez de la musique toute la soirée' },
    { icon: '✓', text: 'IPX4/IPX5 - Résistant aux éclaboussures, idéal en extérieur' },
    { icon: '✓', text: 'Éclairage RGB dynamique - 6 modes synchronisés avec la musique' },
    { icon: '✓', text: 'Entrée guitare 6.3mm - Sessions musicales improvisées' },
    { icon: '✓', text: 'Multi-sources : Bluetooth, USB, SD, AUX - Toutes vos musiques' }
  ]
};

// Nouveau contenu "Pourquoi Choisir" - concis
const ENGAGEMENT_CONTENT = `<div class="product-why-choose">
  <h3>Pourquoi Choisir la Party Music Box Go ?</h3>

  <p><strong>Monster</strong>, référence mondiale en audio depuis 40 ans, a conçu cette enceinte comme la solution tout-en-un pour vos moments festifs.</p>

  <p>Les 2 micros sans fil inclus font de chaque soirée une session karaoké spontanée, sans accessoire supplémentaire à acheter.</p>

  <p>Légère, robuste et puissante, elle transforme n'importe quel espace en salle de concert privée.</p>
</div>`;

// Fonction pour mettre à jour une section
async function updateSection(sectionId, updates) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/product_content_sections?id=eq.${sectionId}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(updates)
  });
  return response.ok;
}

async function main() {
  console.log('🔧 Mise à jour MONSTER PARTY MUSIC BOX GO + 2 MICRO...\n');

  // 1. Caractéristiques
  console.log('📊 Caractéristiques Techniques...');
  const specsOk = await updateSection(SECTION_IDS.specs_grid, { metadata: REAL_SPECS });
  console.log(specsOk ? '   ✅ OK' : '   ❌ Erreur');

  // 2. Points Forts
  console.log('⭐ Points Forts...');
  const featuresOk = await updateSection(SECTION_IDS.features_list, { metadata: REAL_FEATURES });
  console.log(featuresOk ? '   ✅ OK' : '   ❌ Erreur');

  // 3. Pourquoi Choisir
  console.log('💡 Pourquoi Choisir...');
  const engagementOk = await updateSection(SECTION_IDS.engagement_card, { content: ENGAGEMENT_CONTENT });
  console.log(engagementOk ? '   ✅ OK' : '   ❌ Erreur');

  console.log('\n✅ Terminé ! Rafraîchissez la page.');
}

main().catch(console.error);
