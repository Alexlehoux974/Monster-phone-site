import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

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
 * Enrichit les 16 produits HIFUTURE manquants avec du contenu réel
 */
async function enrich16Missing() {
  console.log('🚀 Enrichissement des 16 produits HIFUTURE manquants\n');
  console.log('================================================\n');

  const targetProducts = [
    'CASQUE ANC HIFUTURE TOUR',
    'ECOUTEUR FILLAIRE HIFUTURE HI5 CHAMPAGNE',
    'ECOUTEUR HIFUTURE SONIC AIR CHAMPAGNE',
    'ECOUTEUR HIFUTURE SONIFY CHAMPAGNE',
    'ECOUTEUR HIFUTURE YACHT GOLD',
    'ENCEINTE HIFUTURE ALTUS CAMO',
    'HIFUTURE MONTRE ACTIVE',
    'HIFUTURE MONTRE EVO 2 BEIGE',
    'HIFUTURE MONTRE EVO 2 GOLD',
    'MONTRE HIFUTURE AIX E ACIER',
    'MONTRE HIFUTURE AURA 2 GOLD',
    'MONTRE HIFUTURE AURA BROWN',
    'MONTRE HIFUTURE AURA SILVER',
    'MONTRE HIFUTURE LUME CHAMPAGNE',
    'MONTRE HIFUTURE MIXX 3 FLUO',
    'MONTRE HIFUTURE VELA BEIGE',
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const productName of targetProducts) {
    console.log(`\n📦 Traitement: ${productName}`);

    // Trouver le produit
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, url_slug')
      .eq('name', productName)
      .single();

    if (productError || !product) {
      console.log(`   ⚠️  Produit non trouvé`);
      errorCount++;
      continue;
    }

    try {
      // Supprimer les anciennes sections génériques
      await supabase
        .from('product_content_sections')
        .delete()
        .eq('product_id', product.id);

      // Récupérer le contenu intelligent
      const content = getProductContent(product as Product);

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

function getProductContent(product: Product): {
  description: string;
  specs: any[];
  features: any[];
  engagement: string;
} {
  const productName = product.name.toLowerCase();

  // Les détections vont utiliser le contenu des modèles de base
  // et adapter pour les variantes de couleur

  // CASQUE TOUR (base pour TOUR X)
  if (productName.includes('tour') && !productName.includes('tour x')) {
    return {
      description: `<p>Le <strong>HIFUTURE Tour</strong> est un casque ANC (Active Noise Cancellation) premium offrant réduction active du bruit jusqu'à -45dB pour immersion totale. Ses drivers 40mm délivrent son Hi-Fi équilibré avec basses profondes et aigus cristallins.</p>
<p>Avec 65 heures d'autonomie record, Bluetooth 5.3 stable, ANC ultra-performant, appels HD avec ENC, certification Hi-Res Audio et design confortable pliable, le Tour combine performance, autonomie et polyvalence. Parfait pour voyages, travail et musique au quotidien à La Réunion.</p>`,
      specs: [
        { icon: '🎧', label: 'TYPE', value: 'Over-Ear ANC', details: 'Circum-aural' },
        { icon: '🔇', label: 'ANC', value: '-45dB', details: 'Réduction active' },
        { icon: '🔋', label: 'AUTONOMIE', value: '65 heures', details: 'Record absolu' },
        { icon: '🔊', label: 'DRIVER', value: '40mm', details: 'Son Hi-Fi' },
        { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
        { icon: '🎵', label: 'HI-RES', value: 'Certifié', details: 'Qualité studio' },
        { icon: '🎤', label: 'APPELS', value: 'HD ENC', details: 'Clarté ultime' },
        { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
      ],
      features: [
        { icon: '✓', text: 'ANC -45dB - Réduction active de bruit ultime' },
        { icon: '✓', text: '65h autonomie - Record absolu de la gamme' },
        { icon: '✓', text: 'Hi-Res Audio - Qualité son studio certifiée' },
        { icon: '✓', text: 'Design pliable - Transport facile et compact' },
        { icon: '✓', text: 'Appels HD ENC - Communications cristallines' },
      ],
      engagement: `<p>Le <strong>HIFUTURE Tour</strong> combine ANC -45dB, autonomie 65h et Hi-Res Audio dans un design premium. Le casque ultime pour audiophiles et voyageurs à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçu en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
    };
  }

  // HI5 (écouteur filaire)
  if (productName.includes('hi5')) {
    return {
      description: `<p>Les <strong>HIFUTURE Hi5</strong> sont des écouteurs filaires Hi-Res avec jack 3.5mm universel compatible tous appareils (smartphones, tablettes, PC, consoles). Leurs drivers dynamiques 10mm délivrent son équilibré avec basses puissantes et aigus précis.</p>
<p>Avec certification Hi-Res Audio, microphone intégré pour appels, télécommande 3 boutons pratique, design ergonomique intra-auriculaire et câble renforcé anti-emmêlement, les Hi5 combinent qualité audio, fiabilité et prix accessible. Parfaits pour usage quotidien sans batterie à recharger à La Réunion.</p>`,
      specs: [
        { icon: '🎧', label: 'TYPE', value: 'Filaire 3.5mm', details: 'Jack universel' },
        { icon: '🎵', label: 'HI-RES', value: 'Certifié', details: 'Qualité studio' },
        { icon: '🔊', label: 'DRIVER', value: '10mm dynamique', details: 'Son équilibré' },
        { icon: '🎤', label: 'MICROPHONE', value: 'Intégré', details: 'Appels clairs' },
        { icon: '🎛️', label: 'TÉLÉCOMMANDE', value: '3 boutons', details: 'Contrôle facile' },
        { icon: '💪', label: 'CÂBLE', value: 'Renforcé', details: 'Anti-emmêlement' },
        { icon: '⚡', label: 'AUTONOMIE', value: 'Illimitée', details: 'Sans batterie' },
        { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
      ],
      features: [
        { icon: '✓', text: 'Hi-Res Audio - Qualité son studio certifiée' },
        { icon: '✓', text: 'Jack 3.5mm - Compatible tous appareils' },
        { icon: '✓', text: 'Autonomie illimitée - Aucune recharge nécessaire' },
        { icon: '✓', text: 'Télécommande 3 boutons - Contrôle pratique' },
        { icon: '✓', text: 'Prix accessible - Qualité audio sans compromis' },
      ],
      engagement: `<p>Les <strong>HIFUTURE Hi5</strong> combinent Hi-Res Audio, jack universel et autonomie illimitée. Les écouteurs filaires parfaits pour usage quotidien à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçus en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
    };
  }

  // Variantes de couleur - réutiliser le contenu du modèle de base
  // SONIC AIR CHAMPAGNE (même contenu que Sonic Air)
  if (productName.includes('sonic air')) {
    const content = generateHifutureSonicAirContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // SONIFY CHAMPAGNE (même contenu que Sonify)
  if (productName.includes('sonify')) {
    const content = generateHifutureSonifyContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // YACHT GOLD (même contenu que Yacht)
  if (productName.includes('yacht')) {
    const content = generateHifutureYachtContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // ALTUS CAMO (même contenu que Altus)
  if (productName.includes('altus')) {
    const content = generateHifutureAltusContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // ACTIVE (sans +) (même contenu que Active +)
  if (productName.includes('active')) {
    const content = generateHifutureActiveContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // EVO 2 BEIGE / GOLD (même contenu que Evo 2)
  if (productName.includes('evo 2') || productName.includes('evo2')) {
    const content = generateHifutureEvo2Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // AIX E (même contenu que Aix)
  if (productName.includes('aix')) {
    const content = generateHifutureAixContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // AURA (toutes variantes - Brown, Silver, 2, 2 Gold)
  if (productName.includes('aura')) {
    const content = generateHifutureAuraContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // LUME CHAMPAGNE (même contenu que Lume)
  if (productName.includes('lume') && !productName.includes('lume pro')) {
    const content = generateHifutureLumeContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // MIXX 3 FLUO (même contenu que Mixx 3)
  if (productName.includes('mixx 3') || productName.includes('mixx3') || productName.includes('mix 3')) {
    const content = generateHifutureMixx3Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // VELA BEIGE (même contenu que Vela)
  if (productName.includes('vela')) {
    const content = generateHifutureVelaContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Fallback (ne devrait pas arriver)
  return {
    description: `<p>Le <strong>${product.name}</strong> est un produit de qualité conçu pour répondre à vos besoins.</p>`,
    specs: [],
    features: [],
    engagement: `<p>Livraison rapide à La Réunion.</p>`,
  };
}

// Import des fonctions de génération depuis enrich-product-cms.ts
// (Ces fonctions sont déjà dans le fichier principal)

function generateHifutureSonicAirContent() {
  return {
    description: `<p>Les <strong>HIFUTURE Sonic Air</strong> sont des écouteurs true wireless équipés de la technologie ENC (Environmental Noise Cancellation) avec 4 microphones pour des appels ultra-clairs même en environnement bruyant. Leur driver 10mm délivre un son équilibré avec des basses puissantes et des aigus cristallins.</p>
<p>Avec 35 heures d'autonomie totale (5h + 30h boîtier), Bluetooth 5.3 ultra-stable, certification IPX5 waterproof et design Comfort Fit, ces écouteurs combinent performance audio, confort et résistance. Disponibles en plusieurs coloris élégants pour accompagner votre style à La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'TWS ENC', details: 'True Wireless Stereo' },
      { icon: '🎤', label: 'ENC', value: '4 microphones', details: 'Appels ultra-clairs' },
      { icon: '🔋', label: 'AUTONOMIE', value: '35 heures', details: '5h + 30h boîtier' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX5', details: 'Résistant eau' },
      { icon: '🔊', label: 'DRIVER', value: '10mm', details: 'Son équilibré' },
      { icon: '🎨', label: 'COLORIS', value: 'Multi-couleurs', details: 'Noir, Blanc, Champagne' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'ENC 4 micros - Appels cristallins même dans le bruit' },
      { icon: '✓', text: '35h d\'autonomie - Plus d\'une semaine sans recharge' },
      { icon: '✓', text: 'Driver 10mm - Son équilibré avec basses puissantes' },
      { icon: '✓', text: 'IPX5 waterproof - Résiste transpiration et pluie' },
      { icon: '✓', text: 'Comfort Fit - Design ergonomique pour port prolongé' },
    ],
    engagement: `<p>Les <strong>HIFUTURE Sonic Air</strong> offrent technologie ENC avancée, autonomie exceptionnelle de 35h et qualité audio premium avec driver 10mm. L'accessoire idéal pour appels professionnels, sport et musique au quotidien.</p>
<p><strong>Livraison express La Réunion</strong> - Reçus en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureSonifyContent() {
  return {
    description: `<p>Les <strong>HIFUTURE Sonify</strong> sont des écouteurs sans fil à conception ouverte (open-ear) qui vous permettent de profiter de votre musique tout en restant conscient de votre environnement. Leur design innovant assure confort maximal sans pression sur les oreilles, idéal pour longues sessions.</p>
<p>Équipés d'un driver 15mm pour basses puissantes, Bluetooth 5.4, 20 heures d'autonomie et AI ENC pour appels clairs, les Sonify combinent sécurité, confort et performance. Parfaits pour jogging, vélo et activités outdoor à La Réunion où la conscience environnementale est essentielle.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'Open-Ear', details: 'Design ouvert' },
      { icon: '🔊', label: 'DRIVER', value: '15mm', details: 'Basses puissantes' },
      { icon: '🔋', label: 'AUTONOMIE', value: '20 heures', details: 'Charge unique' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.4', details: 'Connexion stable' },
      { icon: '🎤', label: 'APPELS', value: 'AI ENC', details: 'Intelligence artificielle' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX4', details: 'Résistant eau' },
      { icon: '⚡', label: 'POIDS', value: 'Ultra-léger', details: 'Confort prolongé' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Design open-ear - Restez conscient de votre environnement' },
      { icon: '✓', text: 'Driver 15mm - Basses profondes et aigus précis' },
      { icon: '✓', text: '20h d\'autonomie - Journées complètes sans recharge' },
      { icon: '✓', text: 'AI ENC - Appels clairs avec suppression intelligente du bruit' },
      { icon: '✓', text: 'Ultra-léger - Confort maximal sans pression sur les oreilles' },
    ],
    engagement: `<p>Les <strong>HIFUTURE Sonify</strong> révolutionnent l'écoute avec leur design open-ear unique, driver 15mm puissant et autonomie 20h. Parfaits pour sportifs et actifs qui veulent musique ET sécurité environnementale.</p>
<p><strong>Livraison rapide La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV local disponible.</p>`,
  };
}

function generateHifutureYachtContent() {
  return {
    description: `<p>Les <strong>HIFUTURE Yacht</strong> sont des écouteurs true wireless premium avec ANC (Active Noise Cancellation) adaptative jusqu'à -50dB pour isolation maximale. Leurs drivers 13mm délivrent son Hi-Fi immersif avec basses profondes et scène sonore large.</p>
<p>Avec 50 heures d'autonomie totale record (7h + 43h boîtier), Bluetooth 5.3, LDAC haute résolution, ANC adaptatif intelligent, mode Transparence, appels AI ENC et certification IPX5, les Yacht combinent technologie premium, autonomie exceptionnelle et polyvalence. Le flagship des écouteurs HIFUTURE à La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'TWS ANC', details: 'True Wireless' },
      { icon: '🔇', label: 'ANC', value: '-50dB adaptatif', details: 'Isolation max' },
      { icon: '🔋', label: 'AUTONOMIE', value: '50 heures', details: '7h + 43h boîtier' },
      { icon: '🎵', label: 'LDAC', value: 'Hi-Res', details: 'Qualité studio' },
      { icon: '🔊', label: 'DRIVER', value: '13mm', details: 'Son immersif' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX5', details: 'Résistant eau' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'ANC -50dB - Isolation maximale adaptative' },
      { icon: '✓', text: '50h autonomie - Record absolu de la gamme' },
      { icon: '✓', text: 'LDAC Hi-Res - Qualité audio studio sans fil' },
      { icon: '✓', text: 'Mode Transparence - Conscience environnementale' },
      { icon: '✓', text: 'Driver 13mm - Son immersif avec scène large' },
    ],
    engagement: `<p>Les <strong>HIFUTURE Yacht</strong> combinent ANC -50dB, autonomie 50h et LDAC Hi-Res. Les écouteurs flagship premium pour audiophiles exigeants à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçus en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureAltusContent() {
  return {
    description: `<p>L'<strong>HIFUTURE Altus</strong> est une enceinte Bluetooth portable ultra-compacte avec son 360° omnidirectionnel offrant diffusion homogène dans toutes les directions. Sa technologie Enhanced Bass délivre basses profondes impressionnantes malgré sa petite taille.</p>
<p>Avec 12 heures d'autonomie, Bluetooth 5.3 stable, certification IPX7 waterproof (immersion 1m), mousqueton intégré pour transport facile et mode TWS pour stéréo avec 2 enceintes, l'Altus combine compacité, puissance et robustesse. Disponible en plusieurs coloris dont Camo pour aventures outdoor à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'SON', value: '360°', details: 'Omnidirectionnel' },
      { icon: '🎵', label: 'BASS', value: 'Enhanced Bass', details: 'Basses puissantes' },
      { icon: '🔋', label: 'AUTONOMIE', value: '12 heures', details: 'Usage intensif' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX7', details: 'Immersion 1m' },
      { icon: '🔗', label: 'TWS', value: 'Mode stéréo', details: 'Paire 2 enceintes' },
      { icon: '🎒', label: 'DESIGN', value: 'Mousqueton', details: 'Transport facile' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Son 360° - Diffusion omnidirectionnelle homogène' },
      { icon: '✓', text: 'Enhanced Bass - Basses puissantes ultra-compactes' },
      { icon: '✓', text: 'IPX7 waterproof - Immersion jusqu\'à 1 mètre' },
      { icon: '✓', text: 'Mode TWS - Stéréo avec 2 enceintes' },
      { icon: '✓', text: 'Ultra-compact - Mousqueton pour transport' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Altus</strong> combine son 360°, Enhanced Bass et IPX7 dans un format ultra-compact. L'enceinte portable parfaite pour aventures outdoor à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureActiveContent() {
  return {
    description: `<p>La <strong>HIFUTURE Active</strong> est une montre GPS avancée avec double bande et 6 systèmes satellites (GPS, GLONASS, Galileo, BeiDou, IRNSS, QZSS) pour localisation ultra-précise outdoor. Son écran 1.43" AMOLED offre visibilité parfaite même en plein soleil.</p>
<p>Avec 7-10 jours d'autonomie, Syntra™ AI pour insights personnalisés, 100+ modes sportifs, altimètre barométrique, boussole intégrée et résistance 5ATM, l'Active combine technologie GPS professionnelle, intelligence artificielle et robustesse. Livrée avec bracelet interchangeable bonus pour aventures à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: 'Visibilité soleil' },
      { icon: '🛰️', label: 'GPS', value: 'Double bande', details: '6 satellites' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7-10 jours', details: 'Longue durée' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'IA avancée', details: 'Insights perso' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Suivi pro' },
      { icon: '🧭', label: 'NAVIGATION', value: 'Boussole + Alti', details: 'Orientation précise' },
      { icon: '💧', label: 'WATERPROOF', value: '5ATM', details: '50m natation' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'GPS double bande - Localisation ultra-précise outdoor' },
      { icon: '✓', text: 'Syntra AI - Insights et recommandations personnalisés' },
      { icon: '✓', text: 'Boussole + Altimètre - Navigation et altitude temps réel' },
      { icon: '✓', text: '5ATM waterproof - Natation et sports nautiques' },
      { icon: '✓', text: 'Bracelet bonus - Interchangeable pour tous styles' },
    ],
    engagement: `<p>La <strong>HIFUTURE Active</strong> combine GPS double bande professionnel, Syntra AI et autonomie 10 jours. La montre outdoor ultime pour aventuriers et sportifs exigeants à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureEvo2Content() {
  return {
    description: `<p>Le <strong>HIFUTURE Evo 2</strong> est un bracelet fitness intelligent avec écran 1.47" IPS vibrant offrant excellent ratio taille/prix. Son design ultra-léger garantit confort optimal pour port 24/7 sans gêne.</p>
<p>Avec 7 jours d'autonomie, suivi santé complet 24/7 (Fréquence Cardiaque, SpO2, Sommeil), 100+ modes sportifs, appels Bluetooth intelligents et certification IP68 waterproof, l'Evo 2 combine fonctionnalités essentielles et prix accessible. Disponible en Noir, Rose, Beige et Gold pour usage quotidien à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.47" IPS', details: 'Couleurs vibrantes' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Usage standard' },
      { icon: '❤️', label: 'SANTÉ 24/7', value: 'FC/SpO2/Sommeil', details: 'Suivi continu' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '📞', label: 'APPELS', value: 'Smart calling', details: 'Notifications' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '⚡', label: 'POIDS', value: 'Ultra-léger', details: 'Confort 24/7' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Suivi santé 24/7 - Fréquence cardiaque, SpO2 et sommeil' },
      { icon: '✓', text: '100+ modes sportifs - Toutes vos activités suivies' },
      { icon: '✓', text: 'Design ultra-léger - Port confortable toute la journée' },
      { icon: '✓', text: 'IP68 waterproof - Résiste transpiration et pluie' },
      { icon: '✓', text: 'Prix accessible - Fonctionnalités essentielles optimales' },
    ],
    engagement: `<p>Le <strong>HIFUTURE Evo 2</strong> combine suivi santé 24/7, 100+ modes sportifs et autonomie 7 jours dans un design ultra-léger. Le bracelet fitness intelligent idéal pour quotidien à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçu en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureAixContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aix</strong> est une montre connectée premium avec écran 1.43" AMOLED haute résolution (466×466 pixels) offrant définition exceptionnelle et couleurs vibrantes. Protégée par Gorilla Glass résistant aux rayures, elle garantit durabilité et élégance longue durée.</p>
<p>Avec 10 jours d'autonomie record, Syntra™ AI pour coaching personnalisé avancé, 100+ modes sportifs, suivi santé pro (Fréquence Cardiaque, SpO2, Sommeil) et certification 1ATM, l'Aix combine technologie premium, intelligence artificielle et robustesse. Disponible en Acier et variante E pour usage intensif à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: '466×466 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '10 jours', details: 'Record gamme' },
      { icon: '🛡️', label: 'GORILLA GLASS', value: 'Protection', details: 'Anti-rayures' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'Coaching IA', details: 'Avancé perso' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Suivi pro' },
      { icon: '❤️', label: 'SANTÉ PRO', value: 'FC/SpO2/Sommeil', details: 'Suivi complet' },
      { icon: '💧', label: 'WATERPROOF', value: '1ATM', details: '10m étanche' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '10 jours autonomie - Record absolu de la gamme' },
      { icon: '✓', text: 'Gorilla Glass - Protection anti-rayures premium' },
      { icon: '✓', text: 'Syntra AI avancé - Coaching personnalisé intelligent' },
      { icon: '✓', text: 'Écran AMOLED 466×466 - Définition exceptionnelle' },
      { icon: '✓', text: 'Design premium acier - Élégant et robuste' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aix</strong> combine autonomie record 10 jours, Gorilla Glass et Syntra AI dans un design premium. La montre haut de gamme pour usage intensif à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureAuraContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aura</strong> est une montre connectée élégante spécialement conçue pour femmes avec écran 1.04" AMOLED carré (340×340 pixels) offrant affichage vibrant et lisibilité parfaite. Son design compact et féminin garantit élégance et confort optimal.</p>
<p>Avec 7 jours d'autonomie (batterie 160mAh), suivi santé féminin complet (cycle menstruel, grossesse, Fréquence Cardiaque, SpO2, Sommeil), 100+ modes sportifs, appels Bluetooth et certification IP68, l'Aura combine technologie, style et fonctionnalités dédiées. Disponible en plusieurs coloris raffinés (Brown, Silver, variantes 2 et 2 Gold) pour femmes actives à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.04" AMOLED', details: '340×340 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Batterie 160mAh' },
      { icon: '👩', label: 'SANTÉ FÉMININE', value: 'Cycle + Grossesse', details: 'Suivi dédié' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC/SpO2/Sommeil', details: 'Suivi 24/7' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '📞', label: 'APPELS', value: 'Bluetooth', details: 'Smart calling' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Design féminin - Élégance et confort optimal' },
      { icon: '✓', text: 'Suivi santé féminin - Cycle menstruel et grossesse' },
      { icon: '✓', text: 'Écran AMOLED compact - 1.04" ultra-lisible' },
      { icon: '✓', text: '100+ modes sportifs - Activités fitness et bien-être' },
      { icon: '✓', text: 'IP68 waterproof - Résistance quotidienne' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aura</strong> combine design féminin élégant, suivi santé dédié femmes et autonomie 7 jours. La montre connectée parfaite pour femmes actives à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureLumeContent() {
  return {
    description: `<p>La <strong>HIFUTURE Lume</strong> est une montre connectée élégante avec écran 1.43" Full Touch AMOLED Always-On offrant couleurs vibrantes et clarté exceptionnelle. Son boîtier en aluminium aerospace ultra-léger combine élégance et robustesse pour usage quotidien.</p>
<p>Avec 7 jours d'autonomie, appels Bluetooth avec AI ENC, 100+ modes sportifs, suivi santé complet (Fréquence Cardiaque, SpO2, Sommeil) et résistance 1ATM/IP68, la Lume combine style, performance et polyvalence. Disponible en 4 coloris premium : Sonic Silver, Night Black, Champagne Gold, Emerald Green pour accompagner votre style à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: 'Full Touch Always-On' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Usage intensif' },
      { icon: '📞', label: 'APPELS', value: 'Bluetooth AI ENC', details: 'Appels clairs' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC/SpO2/Sommeil', details: 'Suivi 24/7' },
      { icon: '💧', label: 'WATERPROOF', value: '1ATM/IP68', details: '10m étanche' },
      { icon: '🎨', label: 'DESIGN', value: 'Aluminium aero', details: 'Ultra-léger' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Écran AMOLED Always-On - Affichage permanent ultra-clair' },
      { icon: '✓', text: '7 jours d\'autonomie - Semaine complète sans recharge' },
      { icon: '✓', text: 'Appels Bluetooth AI ENC - Communications cristallines' },
      { icon: '✓', text: '100+ modes sportifs - Suivi précis toutes activités' },
      { icon: '✓', text: 'Aluminium aerospace - Design premium ultra-léger' },
    ],
    engagement: `<p>La <strong>HIFUTURE Lume</strong> combine écran AMOLED Always-On, autonomie 7 jours et appels Bluetooth dans un design premium aluminium. La montre connectée élégante parfaite pour quotidien et sport à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureMixx3Content() {
  return {
    description: `<p>La <strong>HIFUTURE Mixx 3</strong> est une montre connectée ultra-endurance avec écran 1.43" AMOLED haute résolution (466×466 pixels) offrant affichage premium vibrant. Dotée d'une batterie massive 400mAh, elle établit le record d'autonomie absolu de la gamme.</p>
<p>Avec 12 jours d'autonomie exceptionnelle, Bluetooth 5.3 dernière génération, 100+ modes sportifs, suivi santé complet (Fréquence Cardiaque, SpO2, Sommeil), appels intelligents et certification 3ATM (30m natation), la Mixx 3 combine endurance, technologie et polyvalence. Disponible en noir et Fluo avec bracelet interchangeable bonus pour voyages et aventures prolongées à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: '466×466 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '12 jours', details: 'Batterie 400mAh' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Dernière gen' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC/SpO2/Sommeil', details: 'Suivi 24/7' },
      { icon: '📞', label: 'APPELS', value: 'Smart calling', details: 'Notifications' },
      { icon: '💧', label: 'WATERPROOF', value: '3ATM', details: '30m natation' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '12 jours autonomie - Record absolu ultra-endurance' },
      { icon: '✓', text: 'Batterie 400mAh - Capacité maximale de la gamme' },
      { icon: '✓', text: 'Bluetooth 5.3 - Technologie dernière génération' },
      { icon: '✓', text: '3ATM waterproof - Natation et sports nautiques' },
      { icon: '✓', text: 'Bracelet bonus - Interchangeable pour tous styles' },
    ],
    engagement: `<p>La <strong>HIFUTURE Mixx 3</strong> combine autonomie record 12 jours, Bluetooth 5.3 et étanchéité 3ATM. La montre ultra-endurance parfaite pour voyageurs et aventuriers à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureVelaContent() {
  return {
    description: `<p>La <strong>HIFUTURE Vela</strong> est une montre connectée premium avec écran 1.43" AMOLED Always-On Display offrant affichage permanent ultra-clair même en mode veille. Son design élégant et son interface intuitive garantissent élégance et facilité d'usage.</p>
<p>Avec 7 jours d'autonomie, Syntra™ AI pour assistance personnalisée, 100+ modes sportifs, 2GB de stockage musique intégré, assistant vocal intelligent et résistance IP68, la Vela combine technologie, intelligence artificielle et divertissement. Disponible en noir et Beige. Écoutez votre musique sans téléphone lors de vos activités sportives à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED AOD', details: 'Always-On Display' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Usage intensif' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'Assistant IA', details: 'Aide perso' },
      { icon: '🎵', label: 'MUSIQUE', value: '2GB stockage', details: 'Sans téléphone' },
      { icon: '🎤', label: 'VOICE', value: 'Assistant vocal', details: 'Commandes vocales' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'AMOLED Always-On - Affichage permanent ultra-lisible' },
      { icon: '✓', text: '2GB musique - Écoutez sans téléphone pendant le sport' },
      { icon: '✓', text: 'Syntra AI - Assistant intelligent personnalisé' },
      { icon: '✓', text: 'Assistant vocal - Contrôle par commandes vocales' },
      { icon: '✓', text: '7 jours autonomie - Semaine complète sans recharge' },
    ],
    engagement: `<p>La <strong>HIFUTURE Vela</strong> combine AMOLED Always-On, stockage musique 2GB et Syntra AI dans un design premium. La montre intelligente parfaite pour sport et divertissement à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

enrich16Missing();
