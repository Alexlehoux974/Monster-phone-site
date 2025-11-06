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
 * Script d'enrichissement pour 4 montres HIFUTURE Part 2: Vela, Zone 2, Aix, Mixx 3
 */
async function enrich4WatchesPart2() {
  console.log('🚀 Enrichissement de 4 montres HIFUTURE (Part 2)\n');
  console.log('================================================\n');

  const targetProducts = ['VELA', 'ZONE 2', 'AIX', 'MIXX 3'];

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
  console.log('📊 RÉSULTATS PART 2\n');
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📋 Total traité: ${successCount + errorCount}`);
  console.log('\n================================================\n');
}

// ============================================================
// CONTENT GENERATORS
// ============================================================

function generateHifutureVelaContent() {
  return {
    description: `<p>La <strong>HIFUTURE Vela</strong> est une montre connectée premium avec écran 1.43" AMOLED Always-On Display offrant affichage permanent ultra-clair même en mode veille. Son design élégant et son interface intuitive garantissent élégance et facilité d'usage.</p>
<p>Avec 7 jours d'autonomie, Syntra™ AI pour assistance personnalisée, 100+ modes sportifs, 2GB de stockage musique intégré, assistant vocal intelligent et résistance IP68, la Vela combine technologie, intelligence artificielle et divertissement. Écoutez votre musique sans téléphone lors de vos activités sportives à La Réunion.</p>`,
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

function generateHifutureZone2Content() {
  return {
    description: `<p>La <strong>HIFUTURE Zone 2</strong> est une montre connectée format bracelet avec écran rectangulaire 1.96" IPS (240×286 pixels) offrant large surface d'affichage et lisibilité optimale. Son design bracelet élégant combine style moderne et confort quotidien.</p>
<p>Avec 7 jours d'autonomie, Bluetooth 5.2 stable, 100+ modes sportifs, suivi santé complet (Fréquence Cardiaque, SpO2, Sommeil), appels Bluetooth intelligents et certification IP68, la Zone 2 combine grand écran, performance et polyvalence. Format bracelet idéal pour usage quotidien à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.96" IPS', details: '240×286 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Usage standard' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.2', details: 'Connexion stable' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC/SpO2/Sommeil', details: 'Suivi 24/7' },
      { icon: '📞', label: 'APPELS', value: 'Smart calling', details: 'Notifications' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Grand écran 1.96" - Surface affichage maximale' },
      { icon: '✓', text: 'Format bracelet - Design moderne et élégant' },
      { icon: '✓', text: 'Bluetooth 5.2 - Connexion ultra-stable' },
      { icon: '✓', text: '100+ modes sportifs - Suivi complet activités' },
      { icon: '✓', text: 'IP68 waterproof - Résistance quotidienne' },
    ],
    engagement: `<p>La <strong>HIFUTURE Zone 2</strong> combine grand écran 1.96" rectangulaire, Bluetooth 5.2 et autonomie 7 jours dans un format bracelet élégant. La montre idéale pour quotidien à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureAixContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aix</strong> est une montre connectée premium avec écran 1.43" AMOLED haute résolution (466×466 pixels) offrant définition exceptionnelle et couleurs vibrantes. Protégée par Gorilla Glass résistant aux rayures, elle garantit durabilité et élégance longue durée.</p>
<p>Avec 10 jours d'autonomie record, Syntra™ AI pour coaching personnalisé avancé, 100+ modes sportifs, suivi santé pro (Fréquence Cardiaque, SpO2, Sommeil) et certification 1ATM, l'Aix combine technologie premium, intelligence artificielle et robustesse. Disponible en 5 coloris premium pour usage intensif à La Réunion.</p>`,
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
      { icon: '✓', text: '5 coloris premium - Design élégant et robuste' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aix</strong> combine autonomie record 10 jours, Gorilla Glass et Syntra AI dans un design premium. La montre haut de gamme pour usage intensif à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

function generateHifutureMixx3Content() {
  return {
    description: `<p>La <strong>HIFUTURE Mixx 3</strong> est une montre connectée ultra-endurance avec écran 1.43" AMOLED haute résolution (466×466 pixels) offrant affichage premium vibrant. Dotée d'une batterie massive 400mAh, elle établit le record d'autonomie absolu de la gamme.</p>
<p>Avec 12 jours d'autonomie exceptionnelle, Bluetooth 5.3 dernière génération, 100+ modes sportifs, suivi santé complet (Fréquence Cardiaque, SpO2, Sommeil), appels intelligents et certification 3ATM (30m natation), la Mixx 3 combine endurance, technologie et polyvalence. Livrée avec bracelet interchangeable bonus pour voyages et aventures prolongées à La Réunion.</p>`,
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

function getProductContent(product: Product): {
  description: string;
  specs: any[];
  features: any[];
  engagement: string;
} {
  const productName = product.name.toLowerCase();

  // Détection HIFUTURE Vela
  if (productName.includes('vela')) {
    const content = generateHifutureVelaContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Zone 2
  if (productName.includes('zone 2') || productName.includes('zone2')) {
    const content = generateHifutureZone2Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Aix
  if (productName.includes('aix') && !productName.includes('aix lite')) {
    const content = generateHifutureAixContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Mixx 3
  if (productName.includes('mixx 3') || productName.includes('mixx3') || productName.includes('mix 3')) {
    const content = generateHifutureMixx3Content();
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

enrich4WatchesPart2();
