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
 * Script d'enrichissement pour 3 produits HIFUTURE: Sonic Air, Sonify, OlymBuds 3
 */
async function enrichOnly3Products() {
  console.log('🚀 Enrichissement de 3 produits HIFUTURE\n');
  console.log('================================================\n');

  const targetProducts = ['SONIC AIR', 'SONIFY', 'OLYMBUDS 3'];

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
  console.log('📊 RÉSULTATS\n');
  console.log(`   ✅ Succès: ${successCount}`);
  console.log(`   ❌ Erreurs: ${errorCount}`);
  console.log(`   📋 Total traité: ${successCount + errorCount}`);
  console.log('\n================================================\n');
}

// ============================================================
// CONTENT GENERATORS
// ============================================================

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

function generateHifutureOlymbuds3Content() {
  return {
    description: `<p>Les <strong>HIFUTURE OlymBuds 3</strong> sont des écouteurs true wireless ultra-compacts équipés de la puce Bluetooth 5.4 pour connexion instantanée et stable. Leur design ergonomique léger garantit confort optimal pour port prolongé au quotidien.</p>
<p>Avec 25 heures d'autonomie totale (4,5h + 20,5h boîtier), ENC pour appels clairs, driver 6mm optimisé, certification IPX4 et contrôles tactiles intuitifs, les OlymBuds 3 offrent l'essentiel dans un format ultra-compact. Parfaits pour usage quotidien, sport et déplacements à La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'TWS Compact', details: 'True Wireless' },
      { icon: '🔋', label: 'AUTONOMIE', value: '25 heures', details: '4,5h + 20,5h boîtier' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.4', details: 'Puce JL6973D' },
      { icon: '🎤', label: 'ENC', value: 'Anti-bruit', details: 'Appels clairs' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX4', details: 'Résistant eau' },
      { icon: '🔊', label: 'DRIVER', value: '6mm', details: 'Son équilibré' },
      { icon: '⚡', label: 'CHARGE', value: 'USB-C rapide', details: '1h complète' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Bluetooth 5.4 - Connexion instantanée et ultra-stable' },
      { icon: '✓', text: '25h d\'autonomie - Semaine complète sans recharge' },
      { icon: '✓', text: 'Ultra-compact - Format poche discret et portable' },
      { icon: '✓', text: 'Contrôles tactiles - Gestion intuitive musique et appels' },
      { icon: '✓', text: 'IPX4 waterproof - Résiste transpiration et pluie légère' },
    ],
    engagement: `<p>Les <strong>HIFUTURE OlymBuds 3</strong> combinent compacité, autonomie 25h et Bluetooth 5.4 dans un design ultra-léger. L'accessoire essentiel pour quotidien, sport et déplacements sans compromis.</p>
<p><strong>Livraison express La Réunion</strong> - Reçus en 24-48h.</p>
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

  // Détection HIFUTURE Sonic Air
  if (productName.includes('sonic air') || productName.includes('sonicair')) {
    const content = generateHifutureSonicAirContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Sonify
  if (productName.includes('sonify')) {
    const content = generateHifutureSonifyContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE OlymBuds 3
  if (productName.includes('olymbuds 3') || productName.includes('olymbuds3')) {
    const content = generateHifutureOlymbuds3Content();
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

enrichOnly3Products();
