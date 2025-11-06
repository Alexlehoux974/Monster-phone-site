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
 * Script d'enrichissement pour 5 montres HIFUTURE Part 1: Lume, Active, Evo 2, Aura, Aurora
 */
async function enrich5WatchesPart1() {
  console.log('🚀 Enrichissement de 5 montres HIFUTURE (Part 1)\n');
  console.log('================================================\n');

  const targetProducts = ['LUME', 'ACTIVE', 'EVO 2', 'AURA', 'AURORA'];

  let successCount = 0;
  let errorCount = 0;

  for (const productName of targetProducts) {
    console.log(`\n📦 Traitement: ${productName}`);

    // Trouver le produit
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id, name, url_slug')
      .ilike('name', `%${productName}%`)
      .limit(1)
      .single();

    if (productError || !product) {
      console.log(`   ⚠️  Produit non trouvé`);
      errorCount++;
      continue;
    }

    try {
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
  console.log('📊 RÉSULTATS PART 1\n');
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📋 Total traité: ${successCount + errorCount}`);
  console.log('\n================================================\n');
}

// ============================================================
// CONTENT GENERATORS
// ============================================================

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
<p>Avec 7 jours d'autonomie, suivi santé complet 24/7 (Fréquence Cardiaque, SpO2, Sommeil), 100+ modes sportifs, appels Bluetooth intelligents et certification IP68 waterproof, l'Evo 2 combine fonctionnalités essentielles et prix accessible. Disponible en Noir, Rose et Beige pour usage quotidien à La Réunion.</p>`,
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

function generateHifutureAuraContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aura</strong> est une montre connectée élégante spécialement conçue pour femmes avec écran 1.04" AMOLED carré (340×340 pixels) offrant affichage vibrant et lisibilité parfaite. Son design compact et féminin garantit élégance et confort optimal.</p>
<p>Avec 7 jours d'autonomie (batterie 160mAh), suivi santé féminin complet (cycle menstruel, grossesse, Fréquence Cardiaque, SpO2, Sommeil), 100+ modes sportifs, appels Bluetooth et certification IP68, l'Aura combine technologie, style et fonctionnalités dédiées. Disponible en plusieurs coloris raffinés pour femmes actives à La Réunion.</p>`,
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

function generateHifutureAuroraContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aurora</strong> est une montre connectée ultra-complète avec écran 1.43" AMOLED offrant affichage premium et visibilité parfaite. Dotée de 170+ modes sportifs (record de la gamme), elle offre le suivi le plus complet pour sportifs et athlètes exigeants.</p>
<p>Avec 6-10 jours d'autonomie, Syntra™ AI pour coaching personnalisé, suivi santé avancé (Fréquence Cardiaque, SpO2, Sommeil, Stress), appels Bluetooth AI ENC et certification IP68, l'Aurora combine technologie, performance et intelligence artificielle. La montre la plus complète de la gamme HIFUTURE à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: 'Premium display' },
      { icon: '🔋', label: 'AUTONOMIE', value: '6-10 jours', details: 'Longue durée' },
      { icon: '🏃', label: 'SPORTS', value: '170+ modes', details: 'Record gamme' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'Coaching IA', details: 'Perso avancé' },
      { icon: '❤️', label: 'SANTÉ PRO', value: 'FC/SpO2/Stress', details: 'Suivi complet' },
      { icon: '📞', label: 'APPELS', value: 'AI ENC', details: 'Clarté ultime' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '170+ modes sportifs - Record absolu de la gamme' },
      { icon: '✓', text: 'Syntra AI - Coaching et insights personnalisés' },
      { icon: '✓', text: 'Suivi santé pro - FC, SpO2, Sommeil et Stress' },
      { icon: '✓', text: 'Appels AI ENC - Clarté cristalline en toutes conditions' },
      { icon: '✓', text: 'Modèle premium - La plus complète de la gamme' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aurora</strong> combine 170+ modes sportifs record, Syntra AI et suivi santé pro dans le modèle le plus complet de la gamme. La montre ultime pour sportifs exigeants à La Réunion.</p>
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

  // Détection HIFUTURE Lume
  if (productName.includes('lume') && !productName.includes('lume pro')) {
    const content = generateHifutureLumeContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Active
  if (productName.includes('active')) {
    const content = generateHifutureActiveContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Evo 2
  if (productName.includes('evo 2') || productName.includes('evo2')) {
    const content = generateHifutureEvo2Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Aura (et non Aurora)
  if (productName.includes('aura') && !productName.includes('aurora')) {
    const content = generateHifutureAuraContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Aurora
  if (productName.includes('aurora')) {
    const content = generateHifutureAuroraContent();
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

enrich5WatchesPart1();
