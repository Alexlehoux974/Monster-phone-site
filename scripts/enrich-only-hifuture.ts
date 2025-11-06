import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Product {
  id: string;
  name: string;
  url_slug: string;
}

interface ContentSection {
  product_id: string;
  section_type: 'description_card' | 'specs_grid' | 'features_list' | 'engagement_card';
  title: string | null;
  content: string | null;
  metadata: any | null;
  images: string[] | null;
  is_enabled: boolean;
  display_order: number;
  layout_variant: string;
}

/**
 * Script d'enrichissement UNIQUEMENT pour produits HIFUTURE
 */
async function enrichOnlyHifuture() {
  console.log('🚀 Enrichissement HIFUTURE uniquement\n');
  console.log('================================================\n');

  // 1. Récupérer tous les produits HIFUTURE sans sections
  const { data: allProducts, error: allError } = await supabase
    .from('products')
    .select('id, name, url_slug')
    .ilike('name', '%hifuture%');

  if (allError || !allProducts) {
    console.error('❌ Erreur:', allError);
    return;
  }

  // 2. Filtrer ceux qui n'ont pas de sections
  const productsNeedingEnrichment: Product[] = [];

  for (const product of allProducts) {
    const { data: sections } = await supabase
      .from('product_content_sections')
      .select('id')
      .eq('product_id', product.id)
      .limit(1);

    if (!sections || sections.length === 0) {
      productsNeedingEnrichment.push(product as Product);
    }
  }

  console.log(`📊 ${productsNeedingEnrichment.length} produit(s) HIFUTURE à enrichir\n`);

  // 3. Enrichir chaque produit
  let successCount = 0;
  let errorCount = 0;

  for (const product of productsNeedingEnrichment) {
    try {
      console.log(`\n📝 Création des sections pour: ${product.name}`);

      // Récupérer le contenu intelligent
      const content = getProductContent(product);

      const sections: ContentSection[] = [
        {
          product_id: product.id,
          section_type: 'description_card',
          title: 'Description',
          content: content.description,
          metadata: null,
          images: null,
          is_enabled: true,
          display_order: 2,
          layout_variant: 'text-left-image-right',
        },
        {
          product_id: product.id,
          section_type: 'specs_grid',
          title: 'Spécifications',
          content: null,
          metadata: { specs: content.specs },
          images: null,
          is_enabled: true,
          display_order: 3,
          layout_variant: 'grid-4-cols',
        },
        {
          product_id: product.id,
          section_type: 'features_list',
          title: 'Points forts',
          content: null,
          metadata: { features: content.features },
          images: null,
          is_enabled: true,
          display_order: 4,
          layout_variant: 'image-left-text-right',
        },
        {
          product_id: product.id,
          section_type: 'engagement_card',
          title: 'Pourquoi choisir ce produit',
          content: content.engagement,
          metadata: null,
          images: null,
          is_enabled: true,
          display_order: 5,
          layout_variant: 'image-left-text-right',
        },
      ];

      const { error: insertError } = await supabase
        .from('product_content_sections')
        .insert(sections);

      if (insertError) {
        console.log(`   ❌ Erreur: ${insertError.message}`);
        errorCount++;
      } else {
        console.log(`   ✅ 4 sections créées avec succès`);
        successCount++;
      }
    } catch (error: any) {
      console.log(`   ❌ Erreur: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n================================================');
  console.log('📊 RÉSULTATS\n');
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📋 Total traité: ${successCount + errorCount}`);
  console.log('\n================================================\n');
}

// ============================================================
// CONTENT GENERATORS (copie des générateurs de enrich-product-cms.ts)
// ============================================================

function generateHifutureFlyBuds4Content() {
  return {
    description: `<p>Les <strong>HIFUTURE FlyBuds 4 ANC</strong> sont des écouteurs sans fil true wireless équipés de la réduction de bruit active (ANC) pour une immersion sonore complète. Leur technologie Graphite Sound délivre des basses puissantes, des voix cristallines et des médiums équilibrés.</p>
<p>Avec 30 heures d'autonomie totale (5h + 25h boîtier), Bluetooth 5.4 ultra-stable et système 4 microphones pour appels clairs, ces écouteurs combinent confort, performance et style. Quatre couleurs disponibles pour accompagner votre quotidien à La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'TWS ANC', details: 'True Wireless Stereo' },
      { icon: '🔇', label: 'ANC', value: 'Réduction de bruit', details: 'Active Noise Cancellation' },
      { icon: '🔋', label: 'AUTONOMIE', value: '30 heures', details: '5h + 25h boîtier' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.4', details: 'Connexion stable' },
      { icon: '🎤', label: 'MICROPHONES', value: '4 micros', details: 'Appels ultra-clairs' },
      { icon: '🎨', label: 'COULEURS', value: '4 coloris', details: 'Vert, Noir, Blanc, Rouge' },
      { icon: '⚡', label: 'CHARGE', value: 'Boîtier inclus', details: 'Recharge rapide' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'ANC active - Réduction de bruit pour immersion totale' },
      { icon: '✓', text: '30h d\'autonomie - Musique non-stop toute la journée' },
      { icon: '✓', text: 'Bluetooth 5.4 - Connexion ultra-stable sans coupure' },
      { icon: '✓', text: 'Système 4 micros - Appels clairs même en environnement bruyant' },
      { icon: '✓', text: 'Graphite Sound - Audio premium avec basses profondes' },
    ],
    engagement: `<p>Les <strong>HIFUTURE FlyBuds 4 ANC</strong> offrent qualité audio premium, réduction de bruit efficace et autonomie exceptionnelle. L'accessoire idéal pour musique, sport et appels au quotidien.</p>
<p><strong>Livraison express La Réunion</strong> - Reçus en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureTourXContent() {
  return {
    description: `<p>Le <strong>HIFUTURE Tour X</strong> est un casque over-ear premium avec réduction de bruit active hybride ANC pour isoler complètement du monde extérieur. Son design circum-aural pliable offre confort et portabilité optimale.</p>
<p>Avec 35 heures d'autonomie (ANC activé), Bluetooth 5.3 stable, AI Clear Call pour appels professionnels et qualité sonore hifi, ce casque est parfait pour musique, voyage et télétravail à La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'Over-ear ANC', details: 'Casque circum-aural' },
      { icon: '🔇', label: 'ANC', value: 'ANC hybride', details: 'Réduction bruit active' },
      { icon: '🔋', label: 'AUTONOMIE', value: '35 heures', details: 'ANC activé' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '🎤', label: 'APPELS', value: 'AI Clear Call', details: 'Clarté professionnelle' },
      { icon: '📦', label: 'DESIGN', value: 'Pliable', details: 'Transport facile' },
      { icon: '🎵', label: 'AUDIO', value: 'Hi-Fi', details: 'Qualité studio' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'ANC hybride - Isolation sonore totale pour concentration maximale' },
      { icon: '✓', text: '35h d\'autonomie - Semaine complète sans recharge' },
      { icon: '✓', text: 'AI Clear Call - Appels ultra-clairs pour télétravail professionnel' },
      { icon: '✓', text: 'Design pliable - Compact et pratique pour voyage et transport' },
      { icon: '✓', text: 'Qualité Hi-Fi - Son premium pour profiter pleinement de sa musique' },
    ],
    engagement: `<p>Le <strong>HIFUTURE Tour X</strong> combine réduction de bruit hybride, autonomie exceptionnelle et qualité audio Hi-Fi dans un design confortable pliable. Le compagnon idéal pour concentration, musique et télétravail.</p>
<p><strong>Livraison express La Réunion</strong> - Reçu en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV local disponible.</p>`,
  };
}

function generateHifutureGravityContent() {
  return {
    description: `<p>L'<strong>HIFUTURE Gravity</strong> est une enceinte Bluetooth puissante de 45W (30W woofer + 15W tweeter) avec double driver pour son stéréo immersif et basses profondes. Sa certification IPX7 waterproof permet usage plage, piscine et douche sans souci.</p>
<p>Avec 8 heures d'autonomie, LED RGB personnalisables, mode TWS pour coupler 2 enceintes et qualité audio exceptionnelle, cette enceinte transforme chaque moment en expérience sonore inoubliable à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '45W', details: '30W woofer + 15W tweeter' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX7', details: 'Submersible 1m' },
      { icon: '🔋', label: 'AUTONOMIE', value: '8 heures', details: 'Usage intensif' },
      { icon: '🎨', label: 'LED', value: 'RGB', details: 'Effets lumineux' },
      { icon: '🎵', label: 'DRIVERS', value: 'Double driver', details: 'Son stéréo premium' },
      { icon: '🔗', label: 'TWS', value: 'Mode TWS', details: 'Couplage 2 enceintes' },
      { icon: '📡', label: 'BLUETOOTH', value: 'Connexion stable', details: 'Sans coupure' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '45W puissants - Son massif et basses profondes pour ambiance festive' },
      { icon: '✓', text: 'IPX7 waterproof - Plage, piscine, douche sans aucune crainte' },
      { icon: '✓', text: 'Double driver - Stéréo premium avec woofer et tweeter séparés' },
      { icon: '✓', text: 'LED RGB - Ambiance lumineuse personnalisable pour vos soirées' },
      { icon: '✓', text: 'Mode TWS - Coupler 2 Gravity pour son surround immersif' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Gravity</strong> combine puissance 45W, double driver, waterproof IPX7 et LED RGB pour des expériences sonores intenses. L'enceinte ultime pour fêtes, plage et moments conviviaux.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function getProductContent(product: Product): {
  description: string;
  specs: any[];
  features: any[];
  engagement: string;
} {
  const productName = product.name.toLowerCase();

  // Détection HIFUTURE FlyBuds 4 ANC
  if (productName.includes('flybuds 4') || productName.includes('flybuds4')) {
    const content = generateHifutureFlyBuds4Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Tour X
  if (productName.includes('tour x') || productName.includes('tourx')) {
    const content = generateHifutureTourXContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Gravity
  if (productName.includes('gravity')) {
    const content = generateHifutureGravityContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Fallback générique
  return {
    description: `<p>Le <strong>${product.name}</strong> est un produit de qualité conçu pour répondre à vos besoins.</p>`,
    specs: [],
    features: [],
    engagement: `<p>Livraison rapide à La Réunion.</p>`,
  };
}

enrichOnlyHifuture();
