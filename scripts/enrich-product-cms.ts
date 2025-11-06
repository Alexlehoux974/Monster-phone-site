import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Product {
  id: string;
  name: string;
  url_slug: string;
  brand_name: string;
  category_name: string;
}

interface ContentSection {
  product_id: string;
  section_type: string;
  title: string | null;
  content: string | null;
  images: string[];
  is_enabled: boolean;
  display_order: number;
  layout_variant: string;
  metadata: any;
}

// Template basé sur Nokia 110 4G
const TEMPLATE_SECTIONS = {
  description_card: {
    section_type: 'description_card',
    title: 'Description',
    layout_variant: 'text-left-image-right',
    display_order: 2,
    images: [],
    is_enabled: true,
  },
  specs_grid: {
    section_type: 'specs_grid',
    title: 'Caractéristiques Techniques',
    layout_variant: 'grid-4-cols',
    display_order: 3,
    images: [],
    is_enabled: true,
  },
  features_list: {
    section_type: 'features_list',
    title: 'Points Forts',
    layout_variant: 'image-left-text-right',
    display_order: 4,
    images: [],
    is_enabled: true,
  },
  engagement_card: {
    section_type: 'engagement_card',
    title: 'Pourquoi Choisir ce Produit ?',
    layout_variant: 'image-left-text-right',
    display_order: 5,
    images: [],
    is_enabled: true,
  },
};

// ============================================================
// HONOR PRODUCT SPECIFIC CONTENT GENERATORS
// ============================================================

/**
 * HONOR PAD 9 - Tablette haut de gamme
 */
function generateHonorPad9Content() {
  return {
    description: `<p>La <strong>HONOR PAD 9</strong> est une tablette premium conçue pour le divertissement et la productivité. Avec son écran 2.5K de 12,1 pouces et ses 8 haut-parleurs, profitez d'une expérience immersive exceptionnelle.</p>
<p>Équipée du Snapdragon 6 Gen 1 et de 8 Go de RAM extensibles à 16 Go, cette tablette Android offre puissance et fluidité. Sa batterie 8300 mAh garantit 11 heures d'autonomie vidéo. Idéale pour le streaming, le gaming et le travail nomade à La Réunion.</p>`,
    specs: [
      { icon: '🖥️', label: 'ÉCRAN', value: '12,1" 2.5K', details: '2560x1600, 120Hz' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Snapdragon 6 Gen 1', details: '4nm, 8 cœurs' },
      { icon: '💾', label: 'MÉMOIRE', value: '8 Go RAM', details: 'Extensible à 16 Go' },
      { icon: '🔋', label: 'BATTERIE', value: '8300 mAh', details: 'Charge 35W, 11h vidéo' },
      { icon: '📸', label: 'CAMÉRA', value: '13 MP + 8 MP', details: 'Arrière et frontale' },
      { icon: '🔊', label: 'AUDIO', value: '8 Haut-parleurs', details: 'Son immersif' },
      { icon: '📐', label: 'DESIGN', value: '555g', details: '7mm épaisseur' },
      { icon: '🤖', label: 'SYSTÈME', value: 'Android 13', details: 'Magic OS 7.2' },
    ],
    features: [
      { icon: '✓', text: 'Écran 2.5K 120Hz - Fluidité exceptionnelle pour films et jeux' },
      { icon: '✓', text: 'Système audio 8 haut-parleurs - Expérience sonore immersive' },
      { icon: '✓', text: 'RAM Turbo 16 Go - Multitâche performant avec extension intelligente' },
      { icon: '✓', text: 'Batterie 8300 mAh - 11 heures d\'autonomie vidéo en continu' },
      { icon: '✓', text: 'Livraison rapide La Réunion - Reçue en 24-48h, garantie 2 ans' },
    ],
    engagement: `<p>La <strong>HONOR PAD 9</strong> combine puissance, autonomie et qualité audiovisuelle pour une expérience tablette premium. Parfaite pour le divertissement en famille ou la productivité en déplacement.</p>
<p><strong>Livraison express à La Réunion</strong> - Profitez de votre tablette en 24-48h.</p>
<p><strong>SAV local et garantie 2 ans</strong> - Support technique disponible sur l'île.</p>`,
  };
}

/**
 * HONOR X5 - Smartphone entrée de gamme
 */
function generateHonorX5Content() {
  return {
    description: `<p>Le <strong>HONOR X5</strong> est un smartphone accessible conçu pour un usage quotidien fluide. Avec son écran 6,5 pouces et Android 12 Go optimisé, profitez d'une expérience mobile efficace sans compromis.</p>
<p>Équipé du processeur MediaTek Helio G25 et d'une batterie 5000 mAh, ce smartphone offre autonomie et fiabilité. Stockage extensible jusqu'à 1 To pour toutes vos photos et applications. Parfait pour rester connecté à La Réunion.</p>`,
    specs: [
      { icon: '📱', label: 'ÉCRAN', value: '6,5 pouces IPS', details: '720x1600 pixels' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Helio G25', details: 'Octa-core MediaTek' },
      { icon: '💾', label: 'MÉMOIRE', value: '2 Go + 32 Go', details: 'Extensible 1 To' },
      { icon: '🔋', label: 'BATTERIE', value: '5000 mAh', details: 'Autonomie longue durée' },
      { icon: '⚖️', label: 'POIDS', value: '193g', details: 'Léger et maniable' },
      { icon: '🤖', label: 'SYSTÈME', value: 'Android 12 Go', details: 'Optimisé' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
      { icon: '🔒', label: 'GARANTIE', value: '2 ans', details: 'SAV local' },
    ],
    features: [
      { icon: '✓', text: 'Écran 6,5" grand format - Confort visuel optimal pour multimédia' },
      { icon: '✓', text: 'Batterie 5000 mAh - Autonomie journée complète sans recharge' },
      { icon: '✓', text: 'Stockage extensible 1 To - Espace illimité pour vos contenus' },
      { icon: '✓', text: 'Android 12 Go optimisé - Fluidité même avec RAM limitée' },
      { icon: '✓', text: 'Prix accessible - Smartphone HONOR fiable pour usage quotidien' },
    ],
    engagement: `<p>Le <strong>HONOR X5</strong> prouve qu'un smartphone accessible peut offrir qualité et fiabilité. Design soigné, autonomie solide et expérience Android optimisée pour tous.</p>
<p><strong>Livraison rapide à La Réunion</strong> - Reçu en 24-48h.</p>
<p><strong>Garantie 2 ans et SAV local</strong> - Assistance disponible sur l'île.</p>`,
  };
}

/**
 * HONOR X9C - Smartphone milieu de gamme performant
 */
function generateHonorX9CContent() {
  return {
    description: `<p>Le <strong>HONOR X9C</strong> est un smartphone 5G performant qui allie design élégant et performances exceptionnelles. Son écran AMOLED 6,78 pouces à 120Hz offre une fluidité remarquable pour le gaming et le streaming.</p>
<p>Propulsé par le Snapdragon 6 Gen 1 avec jusqu'à 12 Go de RAM, ce smartphone gère le multitâche avec aisance. L'appareil photo 108 MP avec OIS garantit des photos nettes, tandis que la batterie 6600 mAh avec charge rapide 66W assure une autonomie exceptionnelle. Résistant aux éclaboussures pour La Réunion.</p>`,
    specs: [
      { icon: '🖥️', label: 'ÉCRAN', value: '6,78" AMOLED', details: '1224x2700, 120Hz' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Snapdragon 6 Gen 1', details: '4nm + Adreno 710' },
      { icon: '💾', label: 'MÉMOIRE', value: '12 Go + 512 Go', details: 'Haute performance' },
      { icon: '🔋', label: 'BATTERIE', value: '6600 mAh', details: 'Charge rapide 66W' },
      { icon: '📸', label: 'PHOTO', value: '108 MP OIS', details: 'Triple caméra' },
      { icon: '🌐', label: 'RÉSEAU', value: '5G Dual SIM', details: 'Ultra rapide' },
      { icon: '💧', label: 'RÉSISTANCE', value: 'Anti-éclaboussures', details: 'Protection IP' },
      { icon: '📐', label: 'DESIGN', value: '188g', details: '7,98mm fin' },
    ],
    features: [
      { icon: '✓', text: 'AMOLED 120Hz - Fluidité exceptionnelle, luminosité 1200 cd/m²' },
      { icon: '✓', text: 'Photo 108 MP avec OIS - Stabilisation optique pour clichés nets' },
      { icon: '✓', text: 'Batterie 6600 mAh - Charge rapide 66W, autonomie 2 jours' },
      { icon: '✓', text: '5G ultra-rapide - Connectivité dernière génération' },
      { icon: '✓', text: 'Design résistant - Protection contre éclaboussures, idéal La Réunion' },
    ],
    engagement: `<p>Le <strong>HONOR X9C</strong> offre un excellent rapport qualité-prix avec des caractéristiques premium : écran AMOLED fluide, photo 108 MP stabilisée, batterie endurante et 5G. Le choix parfait pour utilisateurs exigeants.</p>
<p><strong>Livraison express La Réunion</strong> - Recevez votre X9C en 24-48h.</p>
<p><strong>Garantie constructeur 2 ans</strong> - SAV local disponible.</p>`,
  };
}

/**
 * HONOR 200 PRO - Flagship haut de gamme
 */
function generateHonor200ProContent() {
  return {
    description: `<p>Le <strong>HONOR 200 PRO</strong> est un smartphone flagship qui repousse les limites de la photographie mobile et des performances. Son écran OLED 6,78 pouces ultra-lumineux (4000 cd/m²) et son triple module photo 50 MP signent l'excellence.</p>
<p>Propulsé par le Snapdragon 8s Gen 3 avec jusqu'à 16 Go de RAM, ce concentré de technologie offre puissance maximale. Charge ultra-rapide 100W + charge sans fil 66W, caméra télé 2,5x avec stabilisation, et jusqu'à 1 To de stockage. Le flagship HONOR qui rivalise avec le haut de gamme, disponible à La Réunion.</p>`,
    specs: [
      { icon: '🖥️', label: 'ÉCRAN', value: '6,78" OLED', details: '4000 cd/m², 120Hz' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Snapdragon 8s Gen 3', details: 'Puissance flagship' },
      { icon: '💾', label: 'MÉMOIRE', value: '16 Go + 1 To', details: 'Configuration maximale' },
      { icon: '🔋', label: 'BATTERIE', value: '5200 mAh', details: '100W + 66W sans fil' },
      { icon: '📸', label: 'PHOTO', value: 'Triple 50 MP', details: 'Télé OIS 2,5x + Ultra-wide' },
      { icon: '🤳', label: 'SELFIE', value: '50 MP', details: 'Caméra frontale pro' },
      { icon: '🌐', label: 'CONNECTIVITÉ', value: '5G + WiFi 6', details: 'NFC, Bluetooth 5.3' },
      { icon: '📐', label: 'DESIGN', value: '199g', details: '8,2mm premium' },
    ],
    features: [
      { icon: '✓', text: 'Écran OLED ultra-lumineux - 4000 cd/m² visible en plein soleil' },
      { icon: '✓', text: 'Triple caméra 50 MP - Téléobjectif 2,5x OIS + ultra grand-angle 122°' },
      { icon: '✓', text: 'Charge ultra-rapide - 100W filaire + 66W sans fil' },
      { icon: '✓', text: 'Snapdragon 8s Gen 3 - Performances flagship pour gaming intense' },
      { icon: '✓', text: 'Stockage 1 To disponible - Espace quasi-illimité pour vos contenus' },
    ],
    engagement: `<p>Le <strong>HONOR 200 PRO</strong> incarne l'excellence technologique avec son écran ultra-lumineux, son système photo pro triple 50 MP, sa charge rapide 100W et son processeur flagship. L'alternative premium qui rivalise avec les leaders du marché.</p>
<p><strong>Livraison sécurisée La Réunion</strong> - Réception en 24-48h avec suivi.</p>
<p><strong>Garantie 2 ans + SAV local</strong> - Support premium disponible sur l'île.</p>`,
  };
}

/**
 * HONOR X5B - Smartphone entrée de gamme avec écran 90Hz
 */
function generateHonorX5BContent() {
  return {
    description: `<p>Le <strong>HONOR X5B</strong> est un smartphone accessible offrant des caractéristiques modernes pour un usage quotidien fluide. Son écran 6,56 pouces avec rafraîchissement 90Hz garantit une navigation agréable.</p>
<p>Équipé du processeur MediaTek Helio G36 et de 4 Go de RAM extensibles via RAM Turbo jusqu'à 8 Go, ce smartphone Android offre performances et autonomie grâce à sa batterie 5200 mAh. Stockage extensible et caméra IA 13 MP pour capturer vos moments. Idéal pour rester connecté à La Réunion.</p>`,
    specs: [
      { icon: '📱', label: 'ÉCRAN', value: '6,56" IPS 90Hz', details: '720x1612 pixels' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Helio G36', details: 'Octa-core MediaTek' },
      { icon: '💾', label: 'MÉMOIRE', value: '4 Go + 64/128 Go', details: 'RAM Turbo 8 Go' },
      { icon: '🔋', label: 'BATTERIE', value: '5200 mAh', details: 'Autonomie longue durée' },
      { icon: '📸', label: 'CAMÉRA', value: '13 MP IA', details: 'Double caméra' },
      { icon: '⚖️', label: 'POIDS', value: '194g', details: '163.85 x 75.75 x 8.7mm' },
      { icon: '🤖', label: 'SYSTÈME', value: 'Android', details: 'MagicOS' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Écran 90Hz fluide - Navigation et scrolling agréables' },
      { icon: '✓', text: 'RAM Turbo 8 Go - Extension intelligente pour multitâche' },
      { icon: '✓', text: 'Batterie 5200 mAh - Autonomie complète pour usage quotidien' },
      { icon: '✓', text: 'Caméra IA 13 MP - Photos optimisées automatiquement' },
      { icon: '✓', text: 'Stockage extensible - MicroSD pour plus d\'espace' },
    ],
    engagement: `<p>Le <strong>HONOR X5B</strong> combine accessibilité et fonctionnalités modernes avec son écran 90Hz, sa RAM extensible et son autonomie solide. Un excellent choix pour un premier smartphone ou usage quotidien.</p>
<p><strong>Livraison rapide à La Réunion</strong> - Reçu en 24-48h.</p>
<p><strong>Garantie 2 ans et SAV local</strong> - Support disponible sur l'île.</p>`,
  };
}

/**
 * HONOR X6C - Smartphone performant avec écran 120Hz
 */
function generateHonorX6CContent() {
  return {
    description: `<p>Le <strong>HONOR X6C</strong> est un smartphone moderne qui allie fluidité et performances. Son écran 6,61 pouces avec rafraîchissement 120Hz offre une expérience visuelle exceptionnellement fluide pour le gaming et la navigation.</p>
<p>Propulsé par le Helio G81 Ultra et jusqu'à 8 Go de RAM, ce smartphone Android 15 avec MagicOS 9.0 assure performances et réactivité. Sa batterie 5300 mAh avec charge rapide 35W garantit autonomie et recharge rapide. Protection IP64 contre éclaboussures et poussière, parfait pour La Réunion.</p>`,
    specs: [
      { icon: '🖥️', label: 'ÉCRAN', value: '6,61" HD+ 120Hz', details: '720x1604 pixels' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Helio G81 Ultra', details: '8 cœurs MediaTek' },
      { icon: '💾', label: 'MÉMOIRE', value: '6/8 Go + 128/256 Go', details: 'Haute performance' },
      { icon: '🔋', label: 'BATTERIE', value: '5300 mAh', details: 'Charge rapide 35W' },
      { icon: '📸', label: 'PHOTO', value: '50 MP + QVGA', details: 'Double caméra' },
      { icon: '💧', label: 'RÉSISTANCE', value: 'IP64', details: 'Éclaboussures + poussière' },
      { icon: '📐', label: 'DESIGN', value: '199g', details: '164 x 75.6 x 8.4mm' },
      { icon: '🤖', label: 'SYSTÈME', value: 'Android 15', details: 'MagicOS 9.0' },
    ],
    features: [
      { icon: '✓', text: 'Écran 120Hz ultra-fluide - Gaming et navigation sans saccade' },
      { icon: '✓', text: 'Photo 50 MP - Capteur principal haute résolution' },
      { icon: '✓', text: 'Charge rapide 35W - Recharge complète en moins d\'1h30' },
      { icon: '✓', text: 'Protection IP64 - Résiste aux éclaboussures et poussière' },
      { icon: '✓', text: 'Android 15 MagicOS 9.0 - Dernière version système optimisée' },
    ],
    engagement: `<p>Le <strong>HONOR X6C</strong> offre un excellent rapport qualité-prix avec son écran 120Hz fluide, sa photo 50 MP, sa charge rapide 35W et sa protection IP64. Performances et modernité accessibles.</p>
<p><strong>Livraison express La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie 2 ans + SAV local</strong> - Support technique disponible.</p>`,
  };
}

/**
 * HONOR X7C - Smartphone autonome avec batterie 6000 mAh
 */
function generateHonorX7CContent() {
  return {
    description: `<p>Le <strong>HONOR X7C</strong> est un smartphone conçu pour l'autonomie extrême avec sa batterie massive de 6000 mAh. Son grand écran 6,77 pouces et sa luminosité de 850 cd/m² garantissent une excellente lisibilité, même en plein soleil réunionnais.</p>
<p>Équipé du Snapdragon 685 et jusqu'à 8 Go de RAM avec 512 Go de stockage, ce smartphone 4G offre performances fluides et espace généreux. Protection verre trempé et design fin (8,09mm) pour un smartphone robuste et élégant. Android 14 pour une expérience moderne optimisée.</p>`,
    specs: [
      { icon: '🖥️', label: 'ÉCRAN', value: '6,77" IPS', details: '720x1610, 850 cd/m²' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Snapdragon 685', details: 'Octa-core Qualcomm' },
      { icon: '💾', label: 'MÉMOIRE', value: '8 Go + 512 Go', details: 'Configuration maximale' },
      { icon: '🔋', label: 'BATTERIE', value: '6000 mAh', details: 'Autonomie extrême' },
      { icon: '📸', label: 'CAMÉRA', value: 'Multi-capteurs', details: 'Système photo complet' },
      { icon: '📐', label: 'DESIGN', value: '194g', details: '166.9 x 76.8 x 8.09mm' },
      { icon: '🛡️', label: 'PROTECTION', value: 'Verre trempé', details: 'Écran renforcé' },
      { icon: '🤖', label: 'SYSTÈME', value: 'Android 14', details: 'Version récente' },
    ],
    features: [
      { icon: '✓', text: 'Batterie 6000 mAh - Autonomie de 2 à 3 jours en usage normal' },
      { icon: '✓', text: 'Grand écran 6,77" - Confort visuel maximal pour multimédia' },
      { icon: '✓', text: 'Luminosité 850 cd/m² - Lisibilité parfaite en plein soleil' },
      { icon: '✓', text: 'Stockage 512 Go - Espace quasi-illimité pour photos et apps' },
      { icon: '✓', text: 'Verre trempé - Protection écran intégrée contre rayures' },
    ],
    engagement: `<p>Le <strong>HONOR X7C</strong> est le smartphone idéal pour ceux qui recherchent autonomie maximale et grand écran. Sa batterie 6000 mAh, son stockage généreux 512 Go et sa luminosité excellente en font un compagnon fiable au quotidien.</p>
<p><strong>Livraison rapide La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie constructeur 2 ans</strong> - SAV local disponible.</p>`,
  };
}

// ============================================================
// HIFUTURE PRODUCT SPECIFIC CONTENT GENERATORS
// ============================================================

/**
 * HIFUTURE FlyBuds 4 ANC - Écouteurs TWS avec réduction de bruit
 */
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

/**
 * HIFUTURE Tour X - Casque ANC over-ear premium
 */
function generateHifutureTourXContent() {
  return {
    description: `<p>Le <strong>HIFUTURE Tour X</strong> est un casque over-ear premium équipé de la réduction de bruit active hybride (ANC) pour une expérience d'écoute immersive. Son design élégant et ses coussinets en mousse protéine garantissent un confort optimal pour des sessions prolongées.</p>
<p>Avec 35 heures d'autonomie, Bluetooth 5.3, technologie AI pour appels ultra-clairs et design pliable compact, ce casque allie performance et portabilité. Parfait pour le télétravail, les voyages et l'écoute intensive à La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'Over-Ear ANC', details: 'Casque supra-auriculaire' },
      { icon: '🔇', label: 'ANC', value: 'Hybride', details: 'Réduction bruit active' },
      { icon: '🔋', label: 'AUTONOMIE', value: '35 heures', details: 'Usage intensif' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '🎤', label: 'APPELS', value: 'AI Clear Call', details: 'Technologie IA' },
      { icon: '💼', label: 'DESIGN', value: 'Pliable', details: 'Compact et portable' },
      { icon: '🛋️', label: 'CONFORT', value: 'Mousse protéine', details: 'Coussinets premium' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'ANC hybride - Isolation sonore maximale pour concentration' },
      { icon: '✓', text: '35h d\'autonomie - Plusieurs jours sans recharge' },
      { icon: '✓', text: 'AI Clear Call - Appels professionnels ultra-clairs' },
      { icon: '✓', text: 'Coussinets mousse protéine - Confort longue durée' },
      { icon: '✓', text: 'Design pliable - Transport facile en déplacement' },
    ],
    engagement: `<p>Le <strong>HIFUTURE Tour X</strong> combine ANC hybride performant, autonomie exceptionnelle et confort premium. Le casque idéal pour travail, voyage et écoute intensive au quotidien.</p>
<p><strong>Livraison rapide La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie 2 ans</strong> - SAV local disponible.</p>`,
  };
}

/**
 * HIFUTURE Yacht - Écouteurs TWS Qualcomm avec AptX
 */
function generateHifutureYachtContent() {
  return {
    description: `<p>Les <strong>HIFUTURE Yacht</strong> sont des écouteurs true wireless haut de gamme équipés de la puce Qualcomm QCC3040 et du codec AptX Adaptive pour une qualité audio audiophile. La technologie CVC 8.0 élimine le bruit du vent pour des appels parfaits en extérieur.</p>
<p>Avec 20 heures d'autonomie totale, certification IPX5 waterproof, boîtier métallique premium et HiFuture Soft Base pour basses profondes, ces écouteurs offrent l'expérience audio la plus aboutie de la gamme. Disponibles en trois finitions élégantes pour La Réunion.</p>`,
    specs: [
      { icon: '🎧', label: 'TYPE', value: 'TWS Qualcomm', details: 'Puce QCC3040' },
      { icon: '🎵', label: 'CODEC', value: 'AptX Adaptive', details: 'Qualité audiophile' },
      { icon: '🔋', label: 'AUTONOMIE', value: '20 heures', details: '5h + 15h boîtier' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX5', details: 'Résistant eau' },
      { icon: '🎤', label: 'CVC 8.0', value: 'Anti-bruit vent', details: 'Appels extérieur' },
      { icon: '⚡', label: 'CHARGE', value: 'USB-C 10W', details: 'Charge rapide' },
      { icon: '🎨', label: 'FINITIONS', value: '3 coloris', details: 'Noir, Gold, Rose' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Qualcomm QCC3040 - Puce premium pour audio haute fidélité' },
      { icon: '✓', text: 'AptX Adaptive - Codec lossless pour qualité audiophile' },
      { icon: '✓', text: 'CVC 8.0 - Suppression bruit du vent pour appels extérieurs' },
      { icon: '✓', text: 'IPX5 waterproof - Résiste à la transpiration et pluie' },
      { icon: '✓', text: 'Boîtier métallique - Design premium et protection optimale' },
    ],
    engagement: `<p>Les <strong>HIFUTURE Yacht</strong> représentent le summum de la qualité audio avec puce Qualcomm, codec AptX et CVC 8.0. L'excellence pour audiophiles exigeants qui refusent les compromis.</p>
<p><strong>Livraison express La Réunion</strong> - Reçus en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV local disponible.</p>`,
  };
}

/**
 * HIFUTURE Altus - Enceinte portable 10W waterproof
 */
function generateHifutureAltusContent() {
  return {
    description: `<p>L'<strong>HIFUTURE Altus</strong> est une enceinte portable Bluetooth 10W compacte et robuste, certifiée IPX5 waterproof pour une utilisation en extérieur sans crainte. Ses effets lumineux colorés créent une ambiance festive où que vous soyez.</p>
<p>Avec 10 heures d'autonomie, mode TWS pour connecter deux enceintes, charge rapide USB-C et portée Bluetooth 10 mètres, l'Altus transforme chaque sortie en expérience musicale. Design compact avec sangle multiposition pour La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '10W', details: 'Son puissant' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX5', details: 'Résistant eau' },
      { icon: '🔋', label: 'AUTONOMIE', value: '10 heures', details: 'Musique non-stop' },
      { icon: '⚡', label: 'CHARGE', value: 'USB-C rapide', details: '1,5h recharge' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Portée 10m' },
      { icon: '🎨', label: 'LUMIÈRES', value: 'RGB colorées', details: 'Ambiance festive' },
      { icon: '🔗', label: 'TWS', value: 'Mode Stéréo', details: '2 enceintes simultanées' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'IPX5 waterproof - Plage, piscine, douche sans souci' },
      { icon: '✓', text: '10h d\'autonomie - Journée complète de musique' },
      { icon: '✓', text: 'Mode TWS - Double le son avec 2 enceintes appairées' },
      { icon: '✓', text: 'Lumières RGB - Ambiance colorée pour soirées' },
      { icon: '✓', text: 'Compact + sangle - Portable partout facilement' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Altus</strong> combine son puissant 10W, résistance IPX5 et autonomie solide dans un format ultra-portable. L'enceinte parfaite pour plage, piscine et sorties outdoor à La Réunion.</p>
<p><strong>Livraison rapide La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Gravity - Enceinte puissante 45W waterproof
 */
function generateHifutureGravityContent() {
  return {
    description: `<p>La <strong>HIFUTURE Gravity</strong> est une enceinte portable ultra-puissante de 45W (30W woofer + 15W tweeter) avec double driver et radiateur passif pour des basses profondes et médiums cristallins. Sa certification IPX7 permet une immersion totale sous l'eau.</p>
<p>Avec 8 heures d'autonomie, mode TWS pour son stéréo double, lumières RGB vibrantes et charge rapide USB-C 10W, la Gravity transforme chaque rassemblement en événement. Construction tissu premium pour parties et aventures à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '45W', details: '30W woofer + 15W tweeter' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX7', details: 'Immersion totale' },
      { icon: '🔋', label: 'AUTONOMIE', value: '8 heures', details: 'Parties prolongées' },
      { icon: '⚡', label: 'CHARGE', value: 'USB-C 10W', details: 'Recharge rapide' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '🎨', label: 'LUMIÈRES', value: 'RGB LED', details: 'Effets vibrants' },
      { icon: '🔗', label: 'TWS', value: 'Stéréo double', details: '2 enceintes simultanées' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Puissance 45W - Son massif pour grandes soirées' },
      { icon: '✓', text: 'IPX7 waterproof - Immersion complète sans risque' },
      { icon: '✓', text: 'Double driver + radiateur - Basses profondes exceptionnelles' },
      { icon: '✓', text: 'Mode TWS - Son stéréo avec 2 enceintes appairées' },
      { icon: '✓', text: 'RGB LED vibrantes - Ambiance visuelle spectaculaire' },
    ],
    engagement: `<p>La <strong>HIFUTURE Gravity</strong> délivre une puissance audio de 45W avec IPX7 waterproof et lumières RGB immersives. L'enceinte ultime pour parties, piscine et aventures outdoor à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie 2 ans</strong> - SAV local disponible.</p>`,
  };
}

/**
 * HIFUTURE Lume Pro - Montre connectée sportive AMOLED
 */
function generateHifutureLumeProContent() {
  return {
    description: `<p>La <strong>HIFUTURE Lume Pro</strong> est une montre connectée sportive premium avec écran AMOLED 1,85 pouces ultra-lumineux pour visibilité parfaite en extérieur. Son boîtier aluminium léger et son processeur double cœur garantissent fluidité et réactivité instantanée.</p>
<p>Avec 7 jours d'autonomie, appels Bluetooth depuis le poignet, suivi santé 24/7 (fréquence cardiaque, SpO2, sommeil), 100+ modes sportifs et interface 3D tactile, la Lume Pro allie style premium et performances complètes. Parfaite pour sportifs exigeants à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1,85" AMOLED', details: 'Always-On Display' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Usage intensif' },
      { icon: '📞', label: 'APPELS BT', value: 'Depuis poignet', details: 'Appels directs' },
      { icon: '❤️', label: 'SANTÉ 24/7', value: 'HR + SpO2', details: 'Suivi complet' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Tous les sports' },
      { icon: '💎', label: 'BOÎTIER', value: 'Aluminium', details: 'Léger et robuste' },
      { icon: '⚡', label: 'PROCESSEUR', value: 'Double cœur', details: 'Ultra-réactif' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'AMOLED ultra-lumineux - Lisibilité parfaite en plein soleil' },
      { icon: '✓', text: 'Appels Bluetooth - Répondez depuis votre poignet' },
      { icon: '✓', text: 'Suivi santé 24/7 - HR, SpO2, sommeil, stress' },
      { icon: '✓', text: '100+ modes sportifs - Tous vos entraînements trackés' },
      { icon: '✓', text: 'Interface 3D tactile - Navigation fluide et intuitive' },
    ],
    engagement: `<p>La <strong>HIFUTURE Lume Pro</strong> combine écran AMOLED premium, autonomie 7 jours, appels Bluetooth et suivi santé complet. La montre connectée idéale pour sportifs et actifs à La Réunion.</p>
<p><strong>Livraison rapide La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV local disponible.</p>`,
  };
}

/**
 * HIFUTURE GO PRO 2 - Montre connectée acier inoxydable premium
 */
function generateHifutureGoPro2Content() {
  return {
    description: `<p>La <strong>HIFUTURE GO PRO 2</strong> est une montre connectée premium en acier inoxydable au design suisse-inspiré. Son écran AMOLED 1,32 pouces (360x360 pixels) avec interface 3D et réveil au poignet offre une expérience visuelle exceptionnelle.</p>
<p>Propulsée par Syntra™ AI avec processeur double cœur, cette montre offre 20 jours d'autonomie, Bluetooth 5.2, 24 modes sportifs, suivi santé complet (HR, tension, SpO2, cycle menstruel) et certification 3ATM waterproof. Élégance et technologie pour La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1,32" AMOLED', details: '360x360 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '20 jours', details: 'Batterie 430mAh' },
      { icon: '💎', label: 'BOÎTIER', value: 'Acier inoxydable', details: 'Design suisse' },
      { icon: '🤖', label: 'PROCESSEUR', value: 'Syntra™ AI', details: 'Double cœur' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.2', details: 'Connexion stable' },
      { icon: '❤️', label: 'SANTÉ', value: 'HR + SpO2 + BP', details: 'Suivi complet' },
      { icon: '🏃', label: 'SPORTS', value: '24 modes', details: 'Multisport' },
      { icon: '💧', label: 'ÉTANCHÉITÉ', value: '3ATM', details: 'Résistant eau' },
    ],
    features: [
      { icon: '✓', text: 'Design acier inoxydable - Élégance suisse premium' },
      { icon: '✓', text: '20 jours d\'autonomie - Trois semaines sans recharge' },
      { icon: '✓', text: 'Syntra™ AI - Intelligence artificielle embarquée' },
      { icon: '✓', text: 'Suivi santé avancé - HR, tension, SpO2, cycle menstruel' },
      { icon: '✓', text: 'Interface 3D - Navigation fluide et moderne' },
    ],
    engagement: `<p>La <strong>HIFUTURE GO PRO 2</strong> allie design premium en acier inoxydable, autonomie exceptionnelle de 20 jours et intelligence artificielle Syntra™. L'excellence pour ceux qui ne transigent pas sur le style et les performances.</p>
<p><strong>Livraison express La Réunion</strong> - Réception en 24-48h.</p>
<p><strong>Garantie 2 ans</strong> - SAV local disponible.</p>`,
  };
}

/**
 * HIFUTURE Sonic Air - Écouteurs TWS avec ENC
 */
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

/**
 * HIFUTURE Sonify - Écouteurs open-ear design ouvert
 */
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

/**
 * HIFUTURE OlymBuds 3 - Écouteurs TWS compacts
 */
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

/**
 * HIFUTURE Ascendo - Enceinte portable 20W IPX7
 */
function generateHifutureAscendoContent() {
  return {
    description: `<p>L'<strong>HIFUTURE Ascendo</strong> est une enceinte Bluetooth ultra-portable de 20W avec certification IPX7 waterproof pour usage plage, piscine et outdoor. Son design compact ultra-fin (200g) se glisse facilement dans sac ou poche pour vous accompagner partout.</p>
<p>Avec 15 heures d'autonomie, Bluetooth 5.3 stable, mode TWS pour coupler 2 enceintes et basses puissantes, l'Ascendo combine portabilité, performance et résistance. Disponible en plusieurs coloris (Noir, Vert, Rose, Beige) pour accompagner votre style à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '20W', details: 'Son puissant' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX7', details: 'Submersible 1m' },
      { icon: '🔋', label: 'AUTONOMIE', value: '15 heures', details: 'Usage intensif' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '🔗', label: 'TWS', value: 'Mode TWS', details: 'Couplage 2 enceintes' },
      { icon: '⚡', label: 'POIDS', value: '200g', details: 'Ultra-léger' },
      { icon: '🎨', label: 'COLORIS', value: '4 couleurs', details: 'Noir, Vert, Rose, Beige' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'IPX7 waterproof - Submersible pour plage et piscine' },
      { icon: '✓', text: '15h d\'autonomie - Musique toute la journée sans recharge' },
      { icon: '✓', text: 'Ultra-compact 200g - Se glisse dans poche ou sac facilement' },
      { icon: '✓', text: 'Mode TWS - Coupler 2 Ascendo pour son stéréo immersif' },
      { icon: '✓', text: 'Bluetooth 5.3 - Connexion stable sans coupure' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Ascendo</strong> combine portabilité extrême, waterproof IPX7 et autonomie 15h dans un format poche de 200g. L'enceinte parfaite pour voyage, plage et outdoor à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Ripple - Enceinte portable 30W double driver
 */
function generateHifutureRippleContent() {
  return {
    description: `<p>L'<strong>HIFUTURE Ripple</strong> est une enceinte Bluetooth puissante de 30W avec double driver (20W woofer + 10W tweeter) pour son stéréo immersif et basses profondes. Sa plaque d'acier et radiateur de basses garantissent qualité audio exceptionnelle.</p>
<p>Avec 12 heures d'autonomie, batterie 4000mAh, Bluetooth 5.3, certification IPX7 waterproof et mode TWS pour coupler 2 enceintes, la Ripple combine puissance, durabilité et polyvalence. Parfaite pour outdoor, fêtes et usage quotidien à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '30W', details: '20W woofer + 10W tweeter' },
      { icon: '💧', label: 'WATERPROOF', value: 'IPX7', details: 'Résistant eau' },
      { icon: '🔋', label: 'AUTONOMIE', value: '12 heures', details: '4000mAh' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Connexion stable' },
      { icon: '🔗', label: 'TWS', value: 'Mode TWS', details: 'Couplage 2 enceintes' },
      { icon: '⚡', label: 'CHARGE', value: 'USB-C', details: 'Recharge 3,5h' },
      { icon: '🎵', label: 'DRIVERS', value: 'Double driver', details: 'Woofer + Tweeter' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '30W puissants - Double driver pour son stéréo immersif' },
      { icon: '✓', text: 'IPX7 waterproof - Résiste eau pour plage et piscine' },
      { icon: '✓', text: '12h d\'autonomie - Journée complète de musique non-stop' },
      { icon: '✓', text: 'Mode TWS - Coupler 2 Ripple pour son surround' },
      { icon: '✓', text: 'Design portable - Sangle intégrée pour transport facile' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Ripple</strong> combine puissance 30W, double driver, waterproof IPX7 et autonomie 12h. L'enceinte idéale pour outdoor, fêtes et aventures à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Event Horizon - Enceinte party 100W LED RGB
 */
function generateHifutureEventHorizonContent() {
  return {
    description: `<p>L'<strong>HIFUTURE Event Horizon</strong> est une enceinte party puissante de 100W avec technologie DynaBoost pour son massif et basses percutantes. Ses LED RGB dynamiques synchronisées à la musique créent une ambiance festive spectaculaire.</p>
<p>Avec batterie 8000mAh, DSP avancé, mode TWS pour coupler 2 enceintes, angle d'inclinaison 40° optimisé et entrées instruments (guitare/clavier), l'Event Horizon transforme chaque moment en fête mémorable. Optionnelle alimentation secteur DC pour usage prolongé à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '100W', details: 'DynaBoost' },
      { icon: '🔋', label: 'BATTERIE', value: '8000mAh', details: 'Ou alimentation DC' },
      { icon: '🎨', label: 'LED', value: 'RGB dynamique', details: 'Sync musique' },
      { icon: '🎵', label: 'DSP', value: 'DSP avancé', details: 'Traitement signal' },
      { icon: '🔗', label: 'TWS', value: 'Mode TWS', details: 'Couplage 2 enceintes' },
      { icon: '🎸', label: 'INSTRUMENTS', value: 'Entrées instrument', details: 'Guitare/Clavier' },
      { icon: '📐', label: 'ANGLE', value: '40° inclinaison', details: 'Son optimal' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '100W DynaBoost - Puissance massive pour soirées inoubliables' },
      { icon: '✓', text: 'LED RGB - Effets lumineux spectaculaires synchronisés' },
      { icon: '✓', text: 'Entrées instruments - Connectez guitare ou clavier directement' },
      { icon: '✓', text: '8000mAh - Autonomie étendue ou alimentation secteur DC' },
      { icon: '✓', text: 'Angle 40° - Projection sonore optimale pour toute la pièce' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Event Horizon</strong> combine puissance 100W, LED RGB spectaculaires et batterie 8000mAh. L'enceinte ultime pour fêtes, soirées et événements mémorables à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE MusicBox - Enceinte karaoke 100W avec 2 micros
 */
function generateHifutureMusicBoxContent() {
  return {
    description: `<p>L'<strong>HIFUTURE MusicBox</strong> est une enceinte karaoke puissante de 100W avec double driver (2 tweeters + 2 woofers) pour son équilibré et basses profondes. Livrée avec 2 microphones sans fil, elle transforme chaque moment en session karaoke mémorable.</p>
<p>Avec batterie 12000mAh power bank, Bluetooth 5.3, TWS, LED RGB synchronisées, DSP professionnel avec reverb/echo et multi-band EQ, la MusicBox combine performance audio, autonomie et effets professionnels. Parfaite pour fêtes et soirées à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '100W', details: '2 tweeters + 2 woofers' },
      { icon: '🔋', label: 'BATTERIE', value: '12000mAh', details: 'Power bank 5V/1A' },
      { icon: '🎤', label: 'MICROS', value: '2 sans fil', details: 'Karaoke duo' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'TWS compatible' },
      { icon: '🎨', label: 'LED', value: 'RGB sync', details: 'Effets lumineux' },
      { icon: '🎵', label: 'DSP', value: 'DSP professionnel', details: 'Reverb + EQ' },
      { icon: '🔌', label: 'CONNECTIVITÉ', value: 'BT/AUX/TF', details: 'Multi-sources' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '100W + double driver - Son puissant pour fêtes et karaoke' },
      { icon: '✓', text: '2 micros sans fil - Duos et chants en groupe sans câble' },
      { icon: '✓', text: '12000mAh power bank - Autonomie prolongée + charge devices' },
      { icon: '✓', text: 'Effets professionnels - Reverb, echo, DSP et EQ multi-bandes' },
      { icon: '✓', text: 'LED RGB sync - Ambiance lumineuse synchronisée à la musique' },
    ],
    engagement: `<p>L'<strong>HIFUTURE MusicBox</strong> combine puissance 100W, 2 microphones sans fil et batterie 12000mAh. L'enceinte karaoke ultime pour fêtes et soirées mémorables à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Vocalist 300 - Enceinte karaoke premium 150W
 */
function generateHifutureVocalist300Content() {
  return {
    description: `<p>L'<strong>HIFUTURE Vocalist 300</strong> est une enceinte karaoke premium de 150W avec technologie professionnelle pour performances vocales exceptionnelles. Équipée de 2 microphones sans fil et effets professionnels, elle offre expérience karaoke studio à domicile.</p>
<p>Avec batterie massive 18000mAh power bank, Bluetooth 5.3, TWS, LED RGB dynamiques, télécommande, DSP professionnel avec reverb/echo avancé et connectivité multi-sources (BT/AUX/TF), la Vocalist 300 combine puissance, autonomie et professionnalisme. L'enceinte ultime pour passionnés de karaoke à La Réunion.</p>`,
    specs: [
      { icon: '🔊', label: 'PUISSANCE', value: '150W', details: '45Hz-20kHz, SNR>80dBA' },
      { icon: '🔋', label: 'BATTERIE', value: '18000mAh', details: 'Power bank 5V/1A' },
      { icon: '🎤', label: 'MICROS', value: '2 sans fil', details: 'Karaoke duo pro' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'TWS compatible' },
      { icon: '🎨', label: 'LED', value: 'RGB beat-sync', details: 'Sync dynamique' },
      { icon: '🎛️', label: 'TÉLÉCOMMANDE', value: 'Incluse', details: 'Contrôle total' },
      { icon: '🎵', label: 'DSP PRO', value: 'Reverb + EQ', details: 'Effets studio' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '150W professionnels - Puissance studio pour performances vocales' },
      { icon: '✓', text: '18000mAh power bank - Autonomie exceptionnelle + charge devices' },
      { icon: '✓', text: '2 micros sans fil pro - Qualité studio pour duos et soirées' },
      { icon: '✓', text: 'Télécommande incluse - Contrôle volume, tracks et effets lumineux' },
      { icon: '✓', text: 'Effets professionnels - Reverb, echo, DSP et EQ multi-bandes' },
    ],
    engagement: `<p>L'<strong>HIFUTURE Vocalist 300</strong> combine puissance 150W, 2 microphones sans fil professionnels et batterie 18000mAh. L'enceinte karaoke premium ultime pour passionnés et fêtes à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Lume - Montre connectée premium 1.43" AMOLED
 */
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

/**
 * HIFUTURE Active - Montre GPS double bande avec Syntra AI
 */
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

/**
 * HIFUTURE Evo 2 - Bracelet fitness intelligent 1.47" IPS
 */
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

/**
 * HIFUTURE Aura - Montre femme compacte 1.04" AMOLED
 */
function generateHifutureAuraContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aura</strong> est la plus petite montre connectée au monde spécialement conçue pour poignets féminins. Son écran 1.04" AMOLED compact (340×340 pixels) offre affichage vibrant et élégant dans un format discret.</p>
<p>Avec 7 jours d'autonomie (batterie 160mAh), suivi santé continu (Fréquence Cardiaque 24h, SpO2, Sommeil), certification IP68 waterproof et design raffiné disponible en 3 coloris (Glisten Gold, Murk Black, Pristine Silver), l'Aura combine féminité, technologie et élégance. La montre connectée parfaite pour femmes actives à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.04" AMOLED', details: '340×340 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: '160mAh' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC 24h/SpO2', details: 'Suivi féminin' },
      { icon: '😴', label: 'SOMMEIL', value: 'Tracking avancé', details: 'Cycles détaillés' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '📱', label: 'COMPATIBILITÉ', value: 'iOS/Android', details: 'HiFutureFit app' },
      { icon: '🎨', label: 'DESIGN', value: 'Femme compacte', details: '3 coloris' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Plus petite montre au monde - Design féminin élégant' },
      { icon: '✓', text: 'AMOLED 340×340 - Affichage vibrant haute résolution' },
      { icon: '✓', text: 'Suivi santé féminin - FC 24h, SpO2 et sommeil détaillé' },
      { icon: '✓', text: '7 jours d\'autonomie - Semaine sans recharge' },
      { icon: '✓', text: '3 coloris premium - Gold, Black, Silver pour tous styles' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aura</strong> combine design féminin élégant, AMOLED haute résolution et suivi santé complet dans la plus petite montre au monde. L'accessoire connecté parfait pour femmes actives à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Aurora - Montre lifestyle 1.43" AMOLED avec 170+ sports
 */
function generateHifutureAuroraContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aurora</strong> est une montre lifestyle premium avec écran 1.43" AMOLED offrant affichage vibrant et détails éclatants. Propulsée par Syntra™ AI, elle optimise automatiquement vos entraînements et routines quotidiennes.</p>
<p>Avec 6-10 jours d'autonomie, 170+ modes sportifs (record HIFUTURE), appels Bluetooth intelligents et certification IP68 waterproof, l'Aurora combine polyvalence sportive exceptionnelle, intelligence artificielle et élégance. La montre ultime pour sportifs passionnés et lifestyle actif à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: 'Affichage vibrant' },
      { icon: '🔋', label: 'AUTONOMIE', value: '6-10 jours', details: 'Longue durée' },
      { icon: '🏃', label: 'SPORTS', value: '170+ modes', details: 'Record gamme' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'IA avancée', details: 'Auto-optimisation' },
      { icon: '📞', label: 'APPELS', value: 'Bluetooth calling', details: 'Mains libres' },
      { icon: '💧', label: 'WATERPROOF', value: 'IP68', details: 'Résistant eau' },
      { icon: '🎨', label: 'DESIGN', value: 'Lifestyle premium', details: 'Élégant' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '170+ modes sportifs - Plus grand choix activités HIFUTURE' },
      { icon: '✓', text: 'Syntra AI - Optimisation automatique entraînements' },
      { icon: '✓', text: 'AMOLED vibrant - Couleurs éclatantes et détails précis' },
      { icon: '✓', text: '10 jours d\'autonomie - Plus d\'une semaine sans recharge' },
      { icon: '✓', text: 'Design lifestyle - Élégance pour sport et quotidien' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aurora</strong> combine 170+ modes sportifs record, Syntra AI et autonomie 10 jours dans un design lifestyle élégant. La montre ultime pour sportifs passionnés à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Vela - Montre aventure IA avec 2GB stockage musique
 */
function generateHifutureVelaContent() {
  return {
    description: `<p>La <strong>HIFUTURE Vela</strong> est une montre aventure intelligente propulsée par Syntra™ AI et processeur next-gen pour performance fluide et réactivité optimale. Son écran 1.43" AMOLED Always-On Display conserve batterie tout en affichant infos essentielles.</p>
<p>Avec 7 jours d'autonomie (2 jours avec video dial), assistant vocal intégré, 2GB stockage pour playlists personnelles, 100+ modes sportifs, bracelet link 316 acier inox et 3 coloris premium (Warm Latte Crème, Deep Hunter Green, Classic Black), la Vela combine aventure, musique et élégance. La montre IA ultime pour aventuriers musicaux à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED AOD', details: 'Always-On Display' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: '2j avec video' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'IA next-gen', details: 'CPU avancé' },
      { icon: '🎵', label: 'STOCKAGE', value: '2GB musique', details: 'Sans téléphone' },
      { icon: '🎤', label: 'ASSISTANT', value: 'Vocal intégré', details: 'Commandes vocales' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Métriques temps réel' },
      { icon: '🔗', label: 'BRACELET', value: '316 acier inox', details: 'Quick-release' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '2GB stockage - Musique intégrée sans téléphone' },
      { icon: '✓', text: 'Syntra AI next-gen - Performance et réactivité optimales' },
      { icon: '✓', text: 'Assistant vocal - Commandes mains libres pour tout contrôler' },
      { icon: '✓', text: 'AOD video dial - Cadrans vidéo personnalisés uniques' },
      { icon: '✓', text: '316 acier inox - Bracelet premium quick-release élégant' },
    ],
    engagement: `<p>La <strong>HIFUTURE Vela</strong> combine Syntra AI, 2GB stockage musique et assistant vocal dans une montre aventure premium. L'accessoire ultime pour aventuriers musicaux à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Zone 2 - Montre quotidien 1.96" IPS avec appels sans fil
 */
function generateHifutureZone2Content() {
  return {
    description: `<p>La <strong>HIFUTURE Zone 2</strong> est une montre quotidienne avec grand écran 1.96" IPS (240×286) offrant affichage spacieux et lisibilité optimale. Équipée Bluetooth 5.2 pour connexion stable et appels sans fil sans effort.</p>
<p>Avec 7 jours d'autonomie, 100+ modes sportifs, suivi santé complet (Fréquence Cardiaque 24/7, SpO2, Sommeil), 100+ cadrans personnalisables, bracelet silicone 22mm confortable et certification IP68, la Zone 2 combine fonctionnalités essentielles et prix accessible. Disponible en Noir, Rose et Silver White pour usage quotidien à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.96" IPS', details: '240×286 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '7 jours', details: 'Usage standard' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.2', details: 'Connexion stable' },
      { icon: '📞', label: 'APPELS', value: 'Sans fil', details: 'Mains libres' },
      { icon: '🏃', label: 'SPORTS', value: '100+ modes', details: 'Multi-activités' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC/SpO2/Sommeil', details: 'Suivi 24/7' },
      { icon: '🎨', label: 'CADRANS', value: '100+', details: 'Personnalisables' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Grand écran 1.96" - Lisibilité optimale toutes conditions' },
      { icon: '✓', text: 'Appels sans fil - Communications Bluetooth mains libres' },
      { icon: '✓', text: '100+ cadrans - Personnalisation infinie pour tous styles' },
      { icon: '✓', text: 'Suivi santé 24/7 - FC, SpO2 et sommeil en continu' },
      { icon: '✓', text: 'IP68 waterproof - Résiste transpiration et pluie' },
    ],
    engagement: `<p>La <strong>HIFUTURE Zone 2</strong> combine grand écran 1.96", appels sans fil et autonomie 7 jours dans une montre quotidienne accessible. L'accessoire essentiel pour quotidien à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Aix - Montre premium acier inox avec Gorilla Glass
 */
function generateHifutureAixContent() {
  return {
    description: `<p>La <strong>HIFUTURE Aix</strong> est une montre premium au design Swiss-inspired avec boîtier acier inoxydable brillant et Gorilla Glass 3× plus résistant offrant protection maximale contre rayures et chocs quotidiens. Son écran 1.43" AMOLED haute résolution (466×466) affiche détails précis.</p>
<p>Avec 10 jours d'autonomie record, Syntra™ AI pour santé et fitness optimisés, détection automatique 100+ sports, appels sans fil intelligents et résistance 1ATM (10m), l'Aix combine élégance suisse, robustesse professionnelle et intelligence artificielle. La montre premium ultime pour professionnels exigeants à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: '466×466 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '10 jours', details: 'Record gamme' },
      { icon: '🛡️', label: 'GORILLA GLASS', value: 'Protection 3×', details: 'Anti-rayures' },
      { icon: '🤖', label: 'SYNTRA AI', value: 'IA santé', details: 'Auto-détection' },
      { icon: '🏃', label: 'SPORTS', value: '100+ auto', details: 'Détection auto' },
      { icon: '📞', label: 'APPELS', value: 'Sans fil smart', details: 'Mains libres' },
      { icon: '💧', label: 'WATERPROOF', value: '1ATM', details: '10m étanche' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: 'Acier inox premium - Design Swiss-inspired élégant et durable' },
      { icon: '✓', text: 'Gorilla Glass 3× - Protection maximale contre rayures' },
      { icon: '✓', text: '10 jours d\'autonomie - Record HIFUTURE sans recharge' },
      { icon: '✓', text: 'Syntra AI - Détection automatique sports et santé optimisée' },
      { icon: '✓', text: 'AMOLED 466×466 - Résolution ultra-haute pour détails précis' },
    ],
    engagement: `<p>La <strong>HIFUTURE Aix</strong> combine acier inox premium, Gorilla Glass, Syntra AI et autonomie 10 jours dans une montre Swiss-inspired. L'accessoire premium ultime pour professionnels à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

/**
 * HIFUTURE Mixx 3 - Montre élégante 1.43" AMOLED autonomie 12 jours
 */
function generateHifutureMixx3Content() {
  return {
    description: `<p>La <strong>HIFUTURE Mixx 3</strong> est une montre élégante avec écran 1.43" AMOLED haute résolution (466×466) offrant affichage vibrant et détails ultra-précis. Son cadre aluminium aerospace et dos 304 acier inox combinent légèreté et robustesse premium.</p>
<p>Avec 12 jours d'autonomie record (batterie 400mAh), Bluetooth 5.3 ultra-stable, suivi santé avancé (Fréquence Cardiaque, SpO2, Sommeil), résistance 3ATM waterproof et compatibilité iOS/Android complète, la Mixx 3 combine design élégant, autonomie exceptionnelle et technologie avancée. La montre lifestyle parfaite pour usage quotidien prolongé à La Réunion.</p>`,
    specs: [
      { icon: '⌚', label: 'ÉCRAN', value: '1.43" AMOLED', details: '466×466 pixels' },
      { icon: '🔋', label: 'AUTONOMIE', value: '12 jours', details: '400mAh record' },
      { icon: '📡', label: 'BLUETOOTH', value: '5.3', details: 'Ultra-stable' },
      { icon: '❤️', label: 'SANTÉ', value: 'FC/SpO2/Sommeil', details: 'Capteurs avancés' },
      { icon: '💧', label: 'WATERPROOF', value: '3ATM', details: 'Résistant eau' },
      { icon: '🎨', label: 'DESIGN', value: 'Aero + Inox', details: 'Premium léger' },
      { icon: '📱', label: 'COMPATIBILITÉ', value: 'iOS/Android', details: 'Universelle' },
      { icon: '🚚', label: 'LIVRAISON', value: '24-48h', details: 'Express La Réunion' },
    ],
    features: [
      { icon: '✓', text: '12 jours d\'autonomie - Record HIFUTURE sans recharge' },
      { icon: '✓', text: 'AMOLED 466×466 - Résolution ultra-haute détails précis' },
      { icon: '✓', text: 'Aluminium aerospace - Légèreté et résistance premium' },
      { icon: '✓', text: 'Bluetooth 5.3 - Connexion ultra-stable dernière génération' },
      { icon: '✓', text: '3ATM waterproof - Résiste transpiration, pluie et éclaboussures' },
    ],
    engagement: `<p>La <strong>HIFUTURE Mixx 3</strong> combine AMOLED haute résolution, autonomie 12 jours record et design aluminium aerospace dans une montre élégante. L'accessoire lifestyle parfait pour usage quotidien à La Réunion.</p>
<p><strong>Livraison express La Réunion</strong> - Reçue en 24-48h.</p>
<p><strong>Garantie constructeur</strong> - SAV disponible localement.</p>`,
  };
}

// ============================================================
// GENERIC FALLBACK FUNCTIONS
// ============================================================

/**
 * Génère le contenu de description pour un produit (fallback générique)
 */
function generateDescriptionContent(product: Product): string {
  const { name, brand_name, category_name } = product;

  return `<p>Le <strong>${name}</strong> de <strong>${brand_name}</strong> est un produit de qualité conçu pour répondre à vos besoins en ${category_name}.</p>
<p>Avec ses fonctionnalités avancées et sa fiabilité reconnue, ce produit offre une expérience utilisateur optimale. Idéal pour un usage quotidien à La Réunion.</p>`;
}

/**
 * Génère les spécifications techniques pour un produit (fallback générique)
 */
function generateSpecsMetadata(product: Product): any {
  const { brand_name, category_name } = product;

  return {
    specs: [
      {
        icon: '📱',
        label: 'CATÉGORIE',
        value: category_name,
        details: 'Type de produit',
      },
      {
        icon: '🌐',
        label: 'MARQUE',
        value: brand_name,
        details: 'Fabricant',
      },
      {
        icon: '✓',
        label: 'QUALITÉ',
        value: 'Premium',
        details: 'Produit certifié',
      },
      {
        icon: '🚚',
        label: 'LIVRAISON',
        value: 'Rapide',
        details: '24-48h à La Réunion',
      },
      {
        icon: '🔒',
        label: 'GARANTIE',
        value: '2 ans',
        details: 'Garantie constructeur',
      },
      {
        icon: '💳',
        label: 'PAIEMENT',
        value: 'Sécurisé',
        details: 'CB, PayPal',
      },
      {
        icon: '📞',
        label: 'SUPPORT',
        value: 'Local',
        details: 'SAV à La Réunion',
      },
      {
        icon: '⭐',
        label: 'QUALITÉ',
        value: 'Certifiée',
        details: 'Normes CE',
      },
    ],
  };
}

/**
 * Génère les points forts pour un produit (fallback générique)
 */
function generateFeaturesMetadata(product: Product): any {
  const { brand_name } = product;

  return {
    features: [
      {
        icon: '✓',
        text: `Qualité ${brand_name} - Fiabilité et performance reconnues`,
      },
      {
        icon: '✓',
        text: 'Livraison rapide - Expédition sous 24-48h à La Réunion',
      },
      {
        icon: '✓',
        text: 'Garantie 2 ans - Protection constructeur complète',
      },
      {
        icon: '✓',
        text: 'SAV local - Support technique disponible à La Réunion',
      },
      {
        icon: '✓',
        text: 'Paiement sécurisé - Transactions protégées et confidentielles',
      },
    ],
  };
}

/**
 * Génère le contenu d'engagement pour un produit (fallback générique)
 */
function generateEngagementContent(product: Product): string {
  const { name } = product;

  return `<p>Choisir le <strong>${name}</strong>, c'est opter pour la qualité et la fiabilité. Nous garantissons votre satisfaction avec nos produits soigneusement sélectionnés.</p>
<p><strong>Livraison rapide à La Réunion</strong> - Recevez votre commande en 24-48h.</p>
<p><strong>Service après-vente local</strong> - Une équipe à votre écoute pour vous accompagner.</p>`;
}

// ============================================================
// INTELLIGENT CONTENT SELECTOR
// ============================================================

/**
 * Sélectionne le générateur de contenu approprié selon le produit
 */
function getProductContent(product: Product): {
  description: string;
  specs: any[];
  features: any[];
  engagement: string;
} {
  const productName = product.name.toLowerCase();

  // Détection HONOR PAD 9
  if (productName.includes('honor pad 9') || productName.includes('honor pad9')) {
    const content = generateHonorPad9Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HONOR X5 (mais pas X5B)
  if ((productName.includes('honor x5') && !productName.includes('x5b'))) {
    const content = generateHonorX5Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HONOR X5B
  if (productName.includes('x5b') || productName.includes('honor x5b')) {
    const content = generateHonorX5BContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HONOR X6C
  if (productName.includes('x6c') || productName.includes('honor x6c')) {
    const content = generateHonorX6CContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HONOR X7C
  if (productName.includes('x7c') || productName.includes('honor x7c')) {
    const content = generateHonorX7CContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HONOR X9C
  if (productName.includes('honor x9c') || productName.includes('x9c')) {
    const content = generateHonorX9CContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HONOR 200 PRO
  if (productName.includes('honor 200 pro') || productName.includes('200 pro')) {
    const content = generateHonor200ProContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

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

  // Détection HIFUTURE Yacht
  if (productName.includes('yacht')) {
    const content = generateHifutureYachtContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Altus
  if (productName.includes('altus')) {
    const content = generateHifutureAltusContent();
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

  // Détection HIFUTURE Lume Pro
  if (productName.includes('lume pro')) {
    const content = generateHifutureLumeProContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE GO PRO 2
  if (productName.includes('go pro 2') || productName.includes('gopro2')) {
    const content = generateHifutureGoPro2Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

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

  // Détection HIFUTURE Ascendo
  if (productName.includes('ascendo')) {
    const content = generateHifutureAscendoContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Ripple
  if (productName.includes('ripple')) {
    const content = generateHifutureRippleContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Event Horizon
  if (productName.includes('event horizon') || productName.includes('eventhorizon')) {
    const content = generateHifutureEventHorizonContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE MusicBox
  if (productName.includes('musicbox') || productName.includes('music box')) {
    const content = generateHifutureMusicBoxContent();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

  // Détection HIFUTURE Vocalist 300
  if (productName.includes('vocalist 300') || productName.includes('vocalist300')) {
    const content = generateHifutureVocalist300Content();
    return {
      description: content.description,
      specs: content.specs,
      features: content.features,
      engagement: content.engagement,
    };
  }

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

  // Fallback générique pour produits non encore traités
  return {
    description: generateDescriptionContent(product),
    specs: generateSpecsMetadata(product).specs,
    features: generateFeaturesMetadata(product).features,
    engagement: generateEngagementContent(product),
  };
}

/**
 * Crée les 4 sections CMS pour un produit
 */
async function createProductSections(product: Product, dryRun: boolean = false): Promise<void> {
  console.log(`\n📝 Création des sections pour: ${product.name}`);

  // Récupérer le contenu intelligent selon le produit
  const content = getProductContent(product);

  const sections: ContentSection[] = [
    {
      ...TEMPLATE_SECTIONS.description_card,
      product_id: product.id,
      content: content.description,
      metadata: {},
    },
    {
      ...TEMPLATE_SECTIONS.specs_grid,
      product_id: product.id,
      content: null,
      metadata: { specs: content.specs },
    },
    {
      ...TEMPLATE_SECTIONS.features_list,
      product_id: product.id,
      content: null,
      metadata: { features: content.features },
    },
    {
      ...TEMPLATE_SECTIONS.engagement_card,
      product_id: product.id,
      content: content.engagement,
      metadata: {},
    },
  ];

  if (dryRun) {
    console.log('   🔍 [DRY RUN] Sections qui seraient créées:');
    sections.forEach((section) => {
      console.log(`      - ${section.section_type} (order: ${section.display_order})`);
    });
    return;
  }

  // Insertion dans Supabase
  const { error } = await supabase
    .from('product_content_sections')
    .insert(sections);

  if (error) {
    console.error(`   ❌ Erreur lors de l'insertion:`, error.message);
    throw error;
  }

  console.log(`   ✅ ${sections.length} sections créées avec succès`);
}

/**
 * Récupère tous les produits sans sections CMS
 */
async function getProductsWithoutSections(): Promise<Product[]> {
  console.log('🔍 Recherche des produits sans sections CMS...\n');

  // Récupérer tous les produits actifs
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      url_slug,
      brand:brands(name),
      category:categories!products_category_id_fkey(name)
    `)
    .eq('status', 'active');

  if (productsError) {
    console.error('❌ Erreur lors de la récupération des produits:', productsError);
    throw productsError;
  }

  if (!products || products.length === 0) {
    console.log('⚠️  Aucun produit trouvé');
    return [];
  }

  // Pour chaque produit, vérifier s'il a des sections CMS
  const productsWithoutSections: Product[] = [];

  for (const product of products) {
    const { data: sections, error: sectionsError } = await supabase
      .from('product_content_sections')
      .select('id')
      .eq('product_id', product.id)
      .in('section_type', ['description_card', 'specs_grid', 'features_list', 'engagement_card']);

    if (sectionsError) {
      console.error(`❌ Erreur pour ${product.name}:`, sectionsError);
      continue;
    }

    // Si moins de 4 sections, le produit nécessite un enrichissement
    if (!sections || sections.length < 4) {
      productsWithoutSections.push({
        id: product.id,
        name: product.name,
        url_slug: product.url_slug,
        brand_name: product.brand?.name || 'Marque',
        category_name: product.category?.name || 'Produit',
      });
    }
  }

  return productsWithoutSections;
}

/**
 * Fonction principale
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

  console.log('🚀 Script d\'enrichissement des produits Monster Phone\n');
  console.log('================================================\n');

  if (dryRun) {
    console.log('🔍 MODE DRY RUN - Aucune modification ne sera effectuée\n');
  }

  try {
    // Récupérer les produits sans sections
    const products = await getProductsWithoutSections();

    if (products.length === 0) {
      console.log('✅ Tous les produits ont déjà leurs sections CMS complètes!\n');
      return;
    }

    console.log(`📊 ${products.length} produit(s) nécessitent un enrichissement\n`);

    // Appliquer la limite si spécifiée
    const productsToProcess = limit ? products.slice(0, limit) : products;

    if (limit && products.length > limit) {
      console.log(`⚠️  Limitation à ${limit} produit(s) pour ce run\n`);
    }

    // Traiter chaque produit
    let successCount = 0;
    let errorCount = 0;

    for (const product of productsToProcess) {
      try {
        await createProductSections(product, dryRun);
        successCount++;
      } catch (error) {
        errorCount++;
        console.error(`❌ Erreur pour ${product.name}:`, error);
      }
    }

    console.log('\n================================================');
    console.log('📊 RÉSULTATS\n');
    console.log(`   ✅ Succès: ${successCount}`);
    console.log(`   ❌ Erreurs: ${errorCount}`);
    console.log(`   📋 Total traité: ${productsToProcess.length}`);

    if (products.length > productsToProcess.length) {
      console.log(`   ⏳ Restant: ${products.length - productsToProcess.length}`);
    }

    console.log('\n================================================\n');

    if (!dryRun && successCount > 0) {
      console.log('💡 Les sections ont été créées. Vérifiez sur https://monster-phone.re/\n');
    }

  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Exécution
main();
