// Structure de données enrichie pour Monster Phone Boutique
// Données importées depuis Airtable - E-Commerce - Catalogue Produits Unifié

export interface ProductVariant {
  color: string;
  colorCode: string;
  ean: string;
  stock: number;
  images?: string[];
}

export interface ProductSpecification {
  label: string;
  value: string;
  icon?: string;
}

export interface ProductRating {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface Product {
  // Identifiants
  id: string;
  airtableId: string;
  sku: string;
  
  // Informations principales
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  
  // Prix et promotion
  price: number;
  originalPrice?: number;
  discount?: number;
  promo?: string;
  
  // Descriptions et SEO
  description: string;
  shortDescription?: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  keywords: string[];
  
  // Variantes de produit
  variants: ProductVariant[];
  defaultVariant?: string;
  
  // Spécifications techniques
  specifications: ProductSpecification[];
  highlights?: string[];
  
  // Images et médias
  images: string[];
  videos?: string[];
  
  // Données additionnelles
  status: 'active' | 'draft' | 'out-of-stock';
  rating?: ProductRating;
  warranty?: string;
  deliveryTime?: string;
  badges?: string[];
  
  // Indice de réparabilité et DAS
  repairabilityIndex?: number;
  dasHead?: string;
  dasBody?: string;
}

// Données des produits HONOR importées depuis Airtable
export const allProducts: Product[] = [
  // HONOR X9B 12+8/256
  {
    id: 'honor-x9b-12gb-256gb',
    airtableId: 'recD9Of8raHzSKFnS',
    sku: 'HONOR-X9B-12GB-256GB',
    name: 'HONOR X9B 12+8/256',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: 'Flagship',
    price: 549.99,
    originalPrice: 649.99,
    discount: 15,
    promo: 'BLACK FRIDAY',
    description: "Découvrez le smartphone HONOR X9B, véritable flagship technologique conçu pour les utilisateurs les plus exigeants. Doté d'une configuration mémoire révolutionnaire de 12GB RAM physique extensible à 20GB avec la technologie RAM Turbo, ce smartphone garantit une fluidité absolue pour le multitâche intensif, les jeux gourmands et les applications professionnelles. Son stockage généreux de 256GB accueille toutes vos photos 4K, vidéos et applications sans compromis. L'écran AMOLED LTPO de 6.8 pouces avec taux de rafraîchissement adaptatif 165Hz offre une expérience visuelle inégalée : couleurs vibrantes, noirs profonds, transitions ultra-fluides pour gaming et streaming. La batterie massive de 6000mAh assure jusqu'à 2 jours d'autonomie intensive. Système photo avancé avec capteur principal haute résolution, ultra grand-angle et macro pour capturer chaque détail. Design premium disponible en 4 coloris exclusifs : Noir Midnight élégant, Vert Emerald rafraîchissant, Or Sunrise luxueux et Orange Sunset audacieux. Certification IP68, charge rapide 66W, connectivité 5G. Le smartphone flagship accessible aux passionnés de technologie à La Réunion.",
    shortDescription: 'Smartphone flagship avec 12+8GB RAM, écran AMOLED 165Hz et batterie 6000mAh',
    metaTitle: 'HONOR X9B 12+8/256GB - Smartphone Flagship Premium 165Hz AMOLED | Monster Phone 974',
    metaDescription: 'HONOR X9B flagship avec 12+8GB RAM extensible, 256GB stockage, écran AMOLED 165Hz, batterie 6000mAh. 4 coloris disponibles. Monster Phone La Réunion 974.',
    urlSlug: 'honor-x9b-12gb-256gb-smartphone-flagship',
    keywords: ['HONOR X9B', 'smartphone flagship', '12GB RAM', '256GB stockage', 'téléphone HONOR', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Midnight', colorCode: '#000000', ean: '6936520832545', stock: 10, images: [] },
      { color: 'Vert Emerald', colorCode: '#50C878', ean: '6936520832538', stock: 8, images: [] },
      { color: 'Or Sunrise', colorCode: '#FFD700', ean: '6936520832552', stock: 5, images: [] },
      { color: 'Orange Sunset', colorCode: '#FF6B35', ean: '6936520832521', stock: 7, images: [] }
    ],
    defaultVariant: 'Noir Midnight',
    specifications: [
      { label: 'RAM', value: '12GB + 8GB extensible', icon: 'memory' },
      { label: 'Stockage', value: '256GB', icon: 'storage' },
      { label: 'Écran', value: '6.8" AMOLED LTPO 165Hz', icon: 'display' },
      { label: 'Batterie', value: '6000mAh', icon: 'battery' },
      { label: 'Charge rapide', value: '66W', icon: 'charging' },
      { label: 'Connectivité', value: '5G', icon: 'network' },
      { label: 'Certification', value: 'IP68', icon: 'shield' }
    ],
    highlights: [
      'Écran AMOLED 165Hz ultra-fluide',
      'RAM extensible jusqu\'à 20GB',
      'Autonomie 2 jours',
      'Charge rapide 66W',
      'Certification IP68'
    ],
    images: [
      '/placeholder-honor-x9b-1.jpg',
      '/placeholder-honor-x9b-2.jpg',
      '/placeholder-honor-x9b-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.8,
      count: 156,
      distribution: { 5: 120, 4: 28, 3: 5, 2: 2, 1: 1 }
    },
    warranty: '2 ans constructeur + 1 an offert',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Bestseller', 'Nouveau', 'Promo'],
    repairabilityIndex: 8.0,
    dasHead: '0.82 W/kg',
    dasBody: '1.27 W/kg'
  },

  // HONOR PAD 9 WiFi
  {
    id: 'honor-pad-9-wifi',
    airtableId: 'recTKLN7WdOyBnU6Z',
    sku: 'HONOR-PAD9-WIFI',
    name: 'HONOR PAD 9 WiFi',
    brand: 'HONOR',
    category: 'Tablettes',
    subcategory: 'Premium',
    price: 359.99,
    originalPrice: 429.99,
    discount: 16,
    description: "La tablette HONOR PAD 9 WiFi révolutionne votre expérience numérique avec des performances exceptionnelles et un design premium. Dotée d'une configuration mémoire impressionnante de 8GB RAM physique extensible à 16GB grâce à la technologie RAM Turbo exclusive, elle offre une puissance de traitement digne d'un ordinateur portable pour multitâche professionnel, création de contenu et gaming immersif. Le stockage généreux de 256GB accueille votre bibliothèque multimédia complète, documents professionnels et applications créatives les plus exigeantes. L'écran spectaculaire de 12.1 pouces avec technologie 2.5K (2560x1600 pixels) et taux de rafraîchissement 120Hz offre une clarté époustouflante pour productivité et divertissement. Certifié TÜV Rheinland pour protection oculaire, luminosité 500 nits pour utilisation intérieur/extérieur. Système audio quad-speakers avec tuning Harman Kardon pour expérience sonore cinématographique. Processeur octa-core haute performance avec GPU Mali pour graphismes fluides. Batterie massive 8300mAh assurant jusqu'à 14 heures de lecture vidéo continue, charge rapide 35W. Caméras avant/arrière optimisées pour visioconférence professionnelle et scan de documents. Design ultra-fin 6.9mm en alliage métallique premium, poids plume 555g pour portabilité maximale. Compatible avec stylet HONOR (vendu séparément) pour prise de notes et dessin précis. WiFi 6 pour connexion ultra-rapide, Bluetooth 5.2 pour accessoires sans fil. Parfaite pour travail, études et loisirs numériques à La Réunion.",
    shortDescription: 'Tablette premium 12.1" 2.5K avec 8+8GB RAM et quad-speakers Harman Kardon',
    metaTitle: 'HONOR PAD 9 WiFi 8+8/256GB - Tablette Premium 2.5K 120Hz | Monster Phone 974',
    metaDescription: 'HONOR PAD 9 WiFi : 8+8GB RAM, 256GB, écran 2.5K 120Hz, quad-speakers, batterie 8300mAh. Tablette premium pour professionnels. Monster Phone 974.',
    urlSlug: 'honor-pad-9-wifi-tablette-gaming-premium',
    keywords: ['HONOR PAD 9', 'tablette HONOR', '8GB RAM', '256GB', 'tablette gaming', 'WiFi premium', 'La Réunion', '974'],
    variants: [
      { color: 'Gris Sidéral', colorCode: '#4A4A4A', ean: '6936520834839', stock: 15, images: [] }
    ],
    defaultVariant: 'Gris Sidéral',
    specifications: [
      { label: 'RAM', value: '8GB + 8GB extensible', icon: 'memory' },
      { label: 'Stockage', value: '256GB', icon: 'storage' },
      { label: 'Écran', value: '12.1" 2.5K 120Hz', icon: 'display' },
      { label: 'Résolution', value: '2560x1600 pixels', icon: 'resolution' },
      { label: 'Batterie', value: '8300mAh', icon: 'battery' },
      { label: 'Audio', value: 'Quad-speakers Harman Kardon', icon: 'speaker' },
      { label: 'Connectivité', value: 'WiFi 6, Bluetooth 5.2', icon: 'wifi' },
      { label: 'Épaisseur', value: '6.9mm', icon: 'dimension' },
      { label: 'Poids', value: '555g', icon: 'weight' }
    ],
    highlights: [
      'Écran 2.5K 120Hz certifié TÜV Rheinland',
      'Quad-speakers Harman Kardon',
      'Design ultra-fin 6.9mm',
      '14 heures d\'autonomie vidéo',
      'Compatible stylet HONOR'
    ],
    images: [
      '/placeholder-honor-pad9-1.jpg',
      '/placeholder-honor-pad9-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 89,
      distribution: { 5: 75, 4: 10, 3: 3, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'Professionnel'],
    repairabilityIndex: 8.3,
    dasBody: '1.09 W/kg'
  },

  // HONOR X8B 8+8/512
  {
    id: 'honor-x8b-8gb-512gb',
    airtableId: 'recW9usrNtqTaMgSL',
    sku: 'HONOR-X8B-8GB-512GB',
    name: 'HONOR X8B 8+8/512',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: 'Ultra Premium',
    price: 409.99,
    originalPrice: 499.99,
    discount: 18,
    promo: 'OFFRE LIMITÉE',
    description: "Le HONOR X8B redéfinit les standards du smartphone ultra premium avec une configuration technique exceptionnelle. Sa mémoire vive de 8GB physique, extensible jusqu'à 16GB grâce à la technologie RAM virtuelle intelligente, propulse les performances à un niveau supérieur pour gérer simultanément applications professionnelles, jeux 3D et streaming 4K. Le stockage massif de 512GB libère votre créativité : stockez des milliers de photos RAW, vidéos 4K et votre bibliothèque multimédia complète. L'écran AMOLED de 6.78 pouces avec fréquence 144Hz garantit une fluidité parfaite et une réactivité instantanée pour gaming compétitif et navigation ultra-rapide. Technologie d'affichage HDR10+ pour des contrastes saisissants et une palette de couleurs DCI-P3. Système photographique quadruple caméra avec capteur principal 108MP, stabilisation optique OIS et mode nuit avancé. Autonomie exceptionnelle avec batterie 5800mAh et charge ultra-rapide 80W (50% en 15 minutes). Design sophistiqué décliné en 4 finitions premium : Noir Obsidienne pour l'élégance absolue, Gris Titanium pour le style professionnel, Vert Jade pour l'originalité raffinée et Or Pearl pour le luxe assumé. Protection Gorilla Glass, certification anti-éclaboussures, double SIM 5G. Le smartphone sans compromis pour professionnels et passionnés à La Réunion.",
    shortDescription: 'Smartphone ultra premium avec 512GB, écran AMOLED 144Hz et caméra 108MP',
    metaTitle: 'HONOR X8B 8+8/512GB - Smartphone Ultra Premium 144Hz AMOLED | Monster Phone 974',
    metaDescription: 'HONOR X8B ultra premium : 8+8GB RAM, 512GB stockage massif, écran AMOLED 144Hz, quadruple caméra 108MP. 4 coloris. Monster Phone La Réunion 974.',
    urlSlug: 'honor-x8b-8gb-512gb-smartphone-ultra',
    keywords: ['HONOR X8B', 'smartphone ultra premium', '8GB RAM', '512GB stockage', 'téléphone HONOR', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Obsidienne', colorCode: '#1C1C1C', ean: '6936520833467', stock: 12, images: [] },
      { color: 'Gris Titanium', colorCode: '#7C7C7C', ean: '6936520833481', stock: 10, images: [] },
      { color: 'Vert Jade', colorCode: '#00A86B', ean: '6936520833474', stock: 8, images: [] },
      { color: 'Or Pearl', colorCode: '#F8E7A1', ean: '6936520833498', stock: 6, images: [] }
    ],
    defaultVariant: 'Noir Obsidienne',
    specifications: [
      { label: 'RAM', value: '8GB + 8GB extensible', icon: 'memory' },
      { label: 'Stockage', value: '512GB', icon: 'storage' },
      { label: 'Écran', value: '6.78" AMOLED 144Hz', icon: 'display' },
      { label: 'Caméra principale', value: '108MP avec OIS', icon: 'camera' },
      { label: 'Batterie', value: '5800mAh', icon: 'battery' },
      { label: 'Charge rapide', value: '80W', icon: 'charging' },
      { label: 'Protection', value: 'Gorilla Glass', icon: 'shield' }
    ],
    highlights: [
      'Stockage massif 512GB',
      'Caméra 108MP avec OIS',
      'Écran AMOLED 144Hz HDR10+',
      'Charge ultra-rapide 80W',
      'Design premium 4 coloris'
    ],
    images: [
      '/placeholder-honor-x8b-1.jpg',
      '/placeholder-honor-x8b-2.jpg',
      '/placeholder-honor-x8b-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 234,
      distribution: { 5: 180, 4: 40, 3: 10, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Ultra Premium', 'Stockage XXL'],
    repairabilityIndex: 7.8,
    dasHead: '0.84 W/kg',
    dasBody: '1.24 W/kg'
  },

  // HONOR CHOICE WATCH
  {
    id: 'honor-choice-watch',
    airtableId: 'recYEgkxqGIvVGFFX',
    sku: 'HONOR-CHOICE-WATCH',
    name: 'HONOR CHOICE WATCH',
    brand: 'HONOR',
    category: 'Montres connectées',
    subcategory: 'Premium',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    promo: 'SOLDES',
    description: "La HONOR CHOICE WATCH redéfinit l'excellence des montres connectées premium avec des technologies de pointe et un design sophistiqué. Son écran AMOLED haute résolution de 1.43 pouces offre une luminosité exceptionnelle de 466x466 pixels avec technologie Always-On Display personnalisable. Les technologies exclusives IC (Intelligent Control) et ANC (Active Noise Cancellation) révolutionnent votre expérience : contrôle gestuel intelligent pour navigation sans contact et réduction de bruit active pour appels cristallins même en environnement bruyant. Suivi santé médical complet avec capteur PPG de dernière génération : monitoring cardiaque 24/7 avec alertes anormales, mesure SpO2 continue pour oxygénation sanguine, analyse avancée du sommeil avec phases REM/profond/léger, gestion du stress avec exercices de respiration guidés. Plus de 100 modes sportifs professionnels avec métriques détaillées, GPS intégré haute précision pour tracking outdoor. Résistance 5ATM permettant natation et sports aquatiques jusqu'à 50m profondeur. Autonomie record de 14 jours en usage normal, 30 jours en mode économie. Charge magnétique rapide, 5 minutes pour une journée complète. Design premium avec boîtier acier inoxydable et verre sapin 2.5D anti-rayures. Disponible en 3 finitions élégantes : Noir Titanium pour sobriété executive, Blanc Pearl pour élégance moderne, Or Rose pour raffinement féminin. Bracelets interchangeables silicone/cuir/métal. Compatible iOS/Android avec app HONOR Health complète. La montre connectée premium ultime pour professionnels actifs à La Réunion.",
    shortDescription: 'Montre connectée premium avec écran AMOLED, technologies IC/ANC et GPS intégré',
    metaTitle: 'HONOR CHOICE WATCH IC/ANC - Montre Connectée Premium AMOLED | Monster Phone 974',
    metaDescription: 'HONOR CHOICE WATCH : AMOLED, IC/ANC, GPS, 5ATM, 14 jours autonomie, 100+ sports. 3 coloris premium. Monster Phone La Réunion 974.',
    urlSlug: 'honor-choice-watch-connectee-premium',
    keywords: ['HONOR CHOICE WATCH', 'montre connectée', 'technologie IC ANC', 'santé', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Titanium', colorCode: '#2C2C2C', ean: '6971664934366', stock: 20, images: [] },
      { color: 'Blanc Pearl', colorCode: '#F8F8FF', ean: '6971664934367', stock: 15, images: [] },
      { color: 'Or Rose', colorCode: '#B76E79', ean: '6971664934368', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir Titanium',
    specifications: [
      { label: 'Écran', value: '1.43" AMOLED 466x466px', icon: 'display' },
      { label: 'Technologies', value: 'IC + ANC', icon: 'tech' },
      { label: 'GPS', value: 'Intégré haute précision', icon: 'location' },
      { label: 'Résistance', value: '5ATM (50m)', icon: 'water' },
      { label: 'Autonomie', value: '14 jours', icon: 'battery' },
      { label: 'Santé', value: 'Cardio, SpO2, Sommeil, Stress', icon: 'health' },
      { label: 'Sports', value: '100+ modes', icon: 'sport' },
      { label: 'Compatibilité', value: 'iOS/Android', icon: 'phone' }
    ],
    highlights: [
      'Technologies IC et ANC exclusives',
      'Écran AMOLED Always-On',
      '14 jours d\'autonomie',
      'GPS intégré haute précision',
      '100+ modes sportifs'
    ],
    images: [
      '/placeholder-honor-watch-1.jpg',
      '/placeholder-honor-watch-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 312,
      distribution: { 5: 200, 4: 80, 3: 25, 2: 5, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Technologies exclusives', 'Bestseller'],
    repairabilityIndex: 7.5
  },

  // HONOR 200 PRO 12+12/512
  {
    id: 'honor-200-pro-12gb-512gb',
    airtableId: 'reccduiP3urtRzgUS',
    sku: 'HONOR-200-PRO-12GB-512GB',
    name: 'HONOR 200 PRO 12+12/512',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: 'Flagship Pro',
    price: 799.99,
    originalPrice: 999.99,
    discount: 20,
    promo: 'PROMO EXCLUSIVE',
    description: "Le HONOR 200 PRO incarne l'apogée de la technologie mobile avec des performances et une qualité photographique dignes d'un studio professionnel. Sa configuration mémoire exceptionnelle de 12GB RAM physique plus 12GB RAM virtuelle (24GB total) offre une puissance de traitement phénoménale pour les tâches les plus exigeantes : édition vidéo 8K, modélisation 3D, gaming compétitif haute intensité. Le stockage massif de 512GB accueille votre studio créatif mobile complet avec fichiers RAW, vidéos ProRes et bibliothèque professionnelle. L'écran OLED incurvé de 6.78 pouces avec résolution 1.5K et taux de rafraîchissement adaptatif 120Hz délivre une expérience visuelle sublime. Technologie LTPO 3.0 pour efficacité énergétique optimale, luminosité pic 4000 nits pour visibilité parfaite en plein soleil, support HDR10+ et certification Dolby Vision. Système photographique révolutionnaire co-développé avec Harcourt Paris : triple caméra avec capteur principal 50MP f/1.9 OIS, téléobjectif portrait 50MP 2.5x, ultra grand-angle 12MP. Mode Portrait Harcourt exclusif avec éclairage studio professionnel, vidéo 4K@60fps avec stabilisation gimbal. Caméra frontale 50MP avec autofocus pour selfies parfaits. Batterie Silicon-Carbon 5200mAh nouvelle génération avec charge SuperCharge 100W filaire (100% en 30 minutes) et 66W sans fil. Processeur Snapdragon 8s Gen 3 pour performances flagship. Design signature avec dos en verre nano-cristallin disponible en 3 coloris exclusifs : Noir Velvet pour élégance absolue, Vert Emerald pour sophistication naturelle, Blanc Moonlight pour pureté lumineuse. NFC, WiFi 7, Bluetooth 5.3, certification IP65. Le flagship photographique ultime pour créateurs professionnels à La Réunion.",
    shortDescription: 'Flagship photographique avec triple 50MP Harcourt Edition et 24GB RAM total',
    metaTitle: 'HONOR 200 PRO 12+12/512GB - Flagship Photography Harcourt Edition | Monster Phone 974',
    metaDescription: 'HONOR 200 PRO : 24GB RAM total, 512GB, triple 50MP Harcourt, OLED 120Hz, charge 100W. Flagship photographique pro. Monster Phone 974.',
    urlSlug: 'honor-200-pro-smartphone-flagship-pro',
    keywords: ['HONOR 200 PRO', 'smartphone flagship', '12GB RAM', '512GB stockage', 'HONOR premium pro', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Velvet', colorCode: '#0A0A0A', ean: '34010001200027', stock: 5, images: [] },
      { color: 'Vert Emerald', colorCode: '#046307', ean: '34010001200037', stock: 4, images: [] },
      { color: 'Blanc Moonlight', colorCode: '#F5F5DC', ean: '34010001200047', stock: 3, images: [] }
    ],
    defaultVariant: 'Noir Velvet',
    specifications: [
      { label: 'RAM', value: '12GB + 12GB (24GB total)', icon: 'memory' },
      { label: 'Stockage', value: '512GB', icon: 'storage' },
      { label: 'Écran', value: '6.78" OLED 1.5K 120Hz', icon: 'display' },
      { label: 'Caméra', value: 'Triple 50MP Harcourt', icon: 'camera' },
      { label: 'Batterie', value: '5200mAh Silicon-Carbon', icon: 'battery' },
      { label: 'Charge', value: '100W filaire, 66W sans fil', icon: 'charging' },
      { label: 'Processeur', value: 'Snapdragon 8s Gen 3', icon: 'cpu' },
      { label: 'Certification', value: 'IP65', icon: 'shield' }
    ],
    highlights: [
      'Triple caméra 50MP Harcourt Edition',
      '24GB RAM total (12+12GB)',
      'Charge SuperCharge 100W',
      'Écran OLED 4000 nits',
      'Processeur Snapdragon 8s Gen 3'
    ],
    images: [
      '/placeholder-honor-200pro-1.jpg',
      '/placeholder-honor-200pro-2.jpg',
      '/placeholder-honor-200pro-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 67,
      distribution: { 5: 58, 4: 7, 3: 2, 2: 0, 1: 0 }
    },
    warranty: '2 ans constructeur + extension 1 an offerte',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Flagship', 'Harcourt Edition', 'Photo Pro'],
    repairabilityIndex: 8.1,
    dasHead: '0.87 W/kg',
    dasBody: '1.11 W/kg'
  },

  // HONOR X6B 6+6/128
  {
    id: 'honor-x6b-6gb-128gb',
    airtableId: 'recqkCloVxeMwbwtB',
    sku: 'HONOR-X6B-6GB-128GB',
    name: 'HONOR X6B 6+6/128',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: 'Milieu de gamme',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    description: "Le HONOR X6B incarne l'équilibre parfait entre performance et accessibilité, offrant une expérience smartphone premium adaptée aux utilisateurs connectés modernes. Sa configuration mémoire innovante de 6GB RAM physique, extensible jusqu'à 12GB avec la technologie RAM Boost, assure une navigation fluide entre applications, réseaux sociaux et multimédia. Les 128GB de stockage interne accueillent confortablement vos photos, vidéos, applications et fichiers professionnels, extensibles jusqu'à 1TB via carte microSD. L'écran Full HD+ de 6.67 pouces offre une qualité d'affichage supérieure avec technologie de protection oculaire certifiée TÜV Rheinland, idéal pour lecture prolongée et visionnage de contenus. Résolution 2400x1080 pixels pour une netteté exceptionnelle, luminosité adaptative jusqu'à 600 nits pour visibilité parfaite en extérieur. Système caméra polyvalent avec capteur principal 50MP à intelligence artificielle, mode portrait professionnel et enregistrement vidéo Full HD. Batterie endurante de 5200mAh optimisée par l'IA pour jusqu'à 2 jours d'utilisation normale, charge rapide 22.5W incluse. Design raffiné avec finition premium disponible en 3 coloris tendance : Noir Midnight pour la sobriété élégante, Vert Forest pour la connexion nature et Or Sunset pour l'éclat moderne. Construction durable avec cadre renforcé, connectivité 4G+ rapide. Le smartphone polyvalent idéal pour les utilisateurs connectés de La Réunion.",
    shortDescription: 'Smartphone équilibré avec 6+6GB RAM, 128GB et écran Full HD+ certifié TÜV',
    metaTitle: 'HONOR X6B 6+6/128GB - Smartphone Premium Full HD+ | Monster Phone 974',
    metaDescription: 'HONOR X6B avec 6+6GB RAM extensible, 128GB stockage, écran Full HD+ 6.67", caméra 50MP IA. 3 coloris tendance. Monster Phone La Réunion 974.',
    urlSlug: 'honor-x6b-6gb-128gb-smartphone-premium',
    keywords: ['HONOR X6B', 'smartphone premium', '6GB RAM', '128GB stockage', 'téléphone HONOR', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Midnight', colorCode: '#191970', ean: '6936520848195', stock: 25, images: [] },
      { color: 'Vert Forest', colorCode: '#228B22', ean: '6936520848201', stock: 20, images: [] },
      { color: 'Or Sunset', colorCode: '#FFA500', ean: '34010001600033', stock: 18, images: [] }
    ],
    defaultVariant: 'Noir Midnight',
    specifications: [
      { label: 'RAM', value: '6GB + 6GB extensible', icon: 'memory' },
      { label: 'Stockage', value: '128GB (extensible 1TB)', icon: 'storage' },
      { label: 'Écran', value: '6.67" Full HD+', icon: 'display' },
      { label: 'Caméra', value: '50MP avec IA', icon: 'camera' },
      { label: 'Batterie', value: '5200mAh', icon: 'battery' },
      { label: 'Charge', value: '22.5W', icon: 'charging' },
      { label: 'Protection', value: 'TÜV Rheinland', icon: 'eye' }
    ],
    highlights: [
      'Écran certifié TÜV Rheinland',
      'Caméra 50MP avec IA',
      'RAM extensible jusqu\'à 12GB',
      '2 jours d\'autonomie',
      'Stockage extensible 1TB'
    ],
    images: [
      '/placeholder-honor-x6b-1.jpg',
      '/placeholder-honor-x6b-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.5,
      count: 423,
      distribution: { 5: 250, 4: 120, 3: 40, 2: 10, 1: 3 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Rapport qualité-prix', 'Populaire'],
    repairabilityIndex: 8.1,
    dasHead: '0.76 W/kg',
    dasBody: '1.19 W/kg'
  },

  // HONOR X7C 8+6/256
  {
    id: 'honor-x7c-8gb-256gb',
    airtableId: 'recrKX3BJDoO3WMCf',
    sku: 'HONOR-X7C-8GB-256GB',
    name: 'HONOR X7C 8+6/256',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: 'Haut de gamme',
    price: 269.99,
    originalPrice: 329.99,
    discount: 18,
    description: "Le HONOR X7C représente l'excellence du haut de gamme accessible, combinant puissance de traitement et élégance dans un smartphone conçu pour les utilisateurs exigeants. Propulsé par 8GB de RAM physique extensible jusqu'à 14GB via la technologie HONOR RAM Turbo, il offre des performances professionnelles pour gérer applications complexes, montage photo/vidéo mobile et gaming intensif sans ralentissement. Le stockage spacieux de 256GB libère votre potentiel créatif : conservez des milliers de photos haute résolution, heures de vidéos 4K et bibliothèque d'applications complète. L'écran AMOLED de 6.7 pouces avec taux de rafraîchissement 120Hz délivre une expérience visuelle premium : transitions soyeuses, couleurs éclatantes avec gamut DCI-P3 100%, contrastes infinis pour un rendu cinématographique. Luminosité pic 1200 nits pour utilisation confortable en plein soleil tropical. Triple système caméra avec IA avancée : capteur principal 64MP avec OIS pour photos nettes, ultra grand-angle 120° pour paysages époustouflants, macro 5MP pour détails minutieux. Enregistrement vidéo 4K avec stabilisation électronique EIS. Autonomie remarquable avec batterie 5400mAh intelligent Power Management, charge turbo 40W (70% en 30 minutes). Design premium unibody avec finitions métalliques disponibles en 3 coloris exclusifs : Noir Cosmos pour l'élégance intemporelle, Vert Aurora pour la sophistication naturelle et Or Champagne pour le raffinement luxueux. Résistance aux éclaboussures, capteur d'empreinte latéral ultra-rapide, NFC pour paiements sans contact. Le smartphone puissant pour utilisateurs exigeants à La Réunion.",
    shortDescription: 'Smartphone haut de gamme avec écran AMOLED 120Hz et triple caméra 64MP OIS',
    metaTitle: 'HONOR X7C 8+6/256GB - Smartphone Haut de Gamme AMOLED 120Hz | Monster Phone 974',
    metaDescription: 'HONOR X7C haut de gamme : 8+6GB RAM, 256GB, AMOLED 120Hz, triple caméra 64MP OIS, charge 40W. 3 finitions premium. Monster Phone La Réunion 974.',
    urlSlug: 'honor-x7c-8gb-256gb-smartphone-pro',
    keywords: ['HONOR X7C', 'smartphone haut de gamme', '8GB RAM', '256GB stockage', 'téléphone HONOR', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Cosmos', colorCode: '#000033', ean: '6936520854738', stock: 15, images: [] },
      { color: 'Vert Aurora', colorCode: '#00FF7F', ean: '6936520854721', stock: 12, images: [] },
      { color: 'Or Champagne', colorCode: '#D4AF37', ean: '6936520854745', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir Cosmos',
    specifications: [
      { label: 'RAM', value: '8GB + 6GB extensible', icon: 'memory' },
      { label: 'Stockage', value: '256GB', icon: 'storage' },
      { label: 'Écran', value: '6.7" AMOLED 120Hz', icon: 'display' },
      { label: 'Caméra', value: 'Triple 64MP avec OIS', icon: 'camera' },
      { label: 'Batterie', value: '5400mAh', icon: 'battery' },
      { label: 'Charge', value: '40W Turbo', icon: 'charging' },
      { label: 'Sécurité', value: 'Empreinte latérale', icon: 'fingerprint' }
    ],
    highlights: [
      'Écran AMOLED 120Hz DCI-P3',
      'Triple caméra 64MP avec OIS',
      'RAM extensible jusqu\'à 14GB',
      'Charge turbo 40W',
      'Design premium unibody'
    ],
    images: [
      '/placeholder-honor-x7c-1.jpg',
      '/placeholder-honor-x7c-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 189,
      distribution: { 5: 120, 4: 50, 3: 15, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Haut de gamme', 'Triple caméra'],
    repairabilityIndex: 8.1,
    dasHead: '0.77 W/kg',
    dasBody: '1.05 W/kg'
  },

  // HONOR X5B 4+4/64
  {
    id: 'honor-x5b-4gb-64gb',
    airtableId: 'recuk2DuXGHNBwuqn',
    sku: 'HONOR-X5B-4GB-64GB',
    name: 'HONOR X5B 4+4/64',
    brand: 'HONOR',
    category: 'Smartphones',
    subcategory: 'Entrée de gamme',
    price: 149.99,
    originalPrice: 179.99,
    discount: 17,
    description: "Le HONOR X5B est le smartphone idéal pour débuter dans l'univers mobile ou comme téléphone secondaire performant. Avec sa configuration mémoire intelligente de 4GB RAM physique extensible à 8GB grâce à la technologie de mémoire virtuelle, il offre une fluidité surprenante pour navigation web, réseaux sociaux et applications quotidiennes. Les 64GB de stockage interne, extensibles jusqu'à 256GB par carte microSD, permettent de conserver photos, vidéos et applications essentielles sans souci d'espace. L'écran HD+ de 6.56 pouces avec technologie IPS offre des angles de vision larges et des couleurs naturelles, parfait pour streaming vidéo et lecture confortable. Protection oculaire intégrée avec mode lecture et filtre lumière bleue pour réduire la fatigue visuelle. Résolution optimisée pour économie d'énergie maximale. Système caméra complet avec capteur principal 13MP à mise au point rapide, mode HDR automatique et nombreux filtres créatifs. Caméra selfie 5MP avec mode beauté IA pour portraits flatteurs. Autonomie exceptionnelle grâce à la batterie 5000mAh optimisée : jusqu'à 3 jours en usage modéré, 15 heures de vidéo continue. Charge intelligente pour préserver la santé de la batterie. Design moderne et épuré disponible en 3 coloris attrayants : Noir Classic pour la sobriété professionnelle, Bleu Ocean pour la fraîcheur dynamique et Or Sunrise pour l'élégance lumineuse. Construction robuste avec protection d'écran renforcée, double SIM + carte SD. Parfait pour premier smartphone ou usage quotidien à La Réunion.",
    shortDescription: 'Smartphone accessible avec grande autonomie et écran HD+ 6.56"',
    metaTitle: 'HONOR X5B 4+4/64GB - Smartphone Accessible Grande Autonomie | Monster Phone 974',
    metaDescription: 'HONOR X5B : 4+4GB RAM, 64GB extensible, écran HD+ 6.56", batterie 5000mAh longue durée. 3 coloris modernes. Monster Phone La Réunion 974.',
    urlSlug: 'honor-x5b-4gb-64gb-smartphone-gaming',
    keywords: ['HONOR X5B', 'smartphone gaming', '4GB RAM', '64GB stockage', 'téléphone HONOR', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Classic', colorCode: '#2F4F4F', ean: '6936520854851', stock: 30, images: [] },
      { color: 'Bleu Ocean', colorCode: '#4682B4', ean: '6936520854868', stock: 25, images: [] },
      { color: 'Or Sunrise', colorCode: '#FFB347', ean: '34010001500044', stock: 22, images: [] }
    ],
    defaultVariant: 'Noir Classic',
    specifications: [
      { label: 'RAM', value: '4GB + 4GB extensible', icon: 'memory' },
      { label: 'Stockage', value: '64GB (extensible 256GB)', icon: 'storage' },
      { label: 'Écran', value: '6.56" HD+ IPS', icon: 'display' },
      { label: 'Caméra', value: '13MP avec HDR', icon: 'camera' },
      { label: 'Batterie', value: '5000mAh', icon: 'battery' },
      { label: 'Slots', value: 'Double SIM + SD', icon: 'sim' }
    ],
    highlights: [
      'Batterie 5000mAh longue durée',
      'RAM extensible à 8GB',
      'Stockage extensible 256GB',
      'Protection oculaire intégrée',
      'Double SIM + carte SD'
    ],
    images: [
      '/placeholder-honor-x5b-1.jpg',
      '/placeholder-honor-x5b-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.3,
      count: 567,
      distribution: { 5: 280, 4: 200, 3: 60, 2: 20, 1: 7 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Meilleure autonomie', 'Prix attractif'],
    repairabilityIndex: 8.1,
    dasHead: '1.04 W/kg',
    dasBody: '1.00 W/kg'
  },

  // Produits NOKIA
  // NOKIA 110 2023
  {
    id: 'nokia-110-2023',
    airtableId: 'recMq4e4Ye0LQhtvy',
    sku: 'NOKIA-110-2023',
    name: 'NOKIA 110 2023',
    brand: 'NOKIA',
    category: 'Smartphones',
    subcategory: 'Entrée de gamme',
    price: 34.99,
    description: "Le NOKIA 110 édition 2023 perpétue l'héritage légendaire de Nokia en alliant simplicité absolue et fiabilité inégalée. Ce téléphone emblématique redéfinit l'autonomie mobile avec une batterie 1000mAh optimisée offrant plusieurs semaines d'utilisation continue sans recharge - un record absolu dans l'industrie mobile moderne. Sa construction ultra-robuste héritée du savoir-faire Nokia résiste aux chocs, chutes et conditions extrêmes, garantissant des années de service fidèle. L'écran couleur 1.77 pouces QQVGA offre une lisibilité parfaite pour navigation intuitive dans les menus simplifiés. Interface utilisateur épurée conçue pour accessibilité maximale : clavier physique T9 avec retour tactile satisfaisant, touches larges et bien espacées pour confort de frappe optimal, navigation intuitive pour appels et SMS essentiels. Fonctionnalités pratiques intégrées : double SIM pour gérer deux numéros simultanément (personnel/professionnel), radio FM sans écouteurs pour divertissement nomade, lampe torche LED puissante pour urgences, jeux classiques Snake préinstallés pour moments de détente. Mémoire extensible jusqu'à 32GB par carte microSD pour stocker contacts et messages importants. Audio cristallin avec haut-parleur amplifié et réduction de bruit pour conversations claires même en environnement bruyant. Design iconique Nokia intemporel en polycarbonate renforcé, disponible en noir classique élégant. Idéal comme téléphone principal pour utilisateurs privilégiant simplicité et autonomie, téléphone de secours indispensable, solution professionnelle pour chantiers et environnements difficiles. Le choix parfait pour seniors, professionnels terrain et minimalistes technologiques à La Réunion.",
    shortDescription: 'Téléphone simple avec autonomie exceptionnelle de plusieurs semaines',
    metaTitle: 'NOKIA 110 2023 - Téléphone Simple et Fiable | Monster Phone 974',
    metaDescription: 'NOKIA 110 2023, téléphone simple et robuste. Autonomie exceptionnelle, design classique NOKIA. 34,99€.',
    urlSlug: 'nokia-110-2023-telephone-simple',
    keywords: ['NOKIA 110', 'téléphone simple', 'NOKIA classique', 'autonomie longue', 'téléphone robuste', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6438409087256', stock: 25, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type', value: 'Téléphone simple', icon: 'phone' },
      { label: 'Écran', value: '1.77" QQVGA', icon: 'display' },
      { label: 'Batterie', value: '1000mAh', icon: 'battery' },
      { label: 'Autonomie', value: 'Plusieurs semaines', icon: 'clock' },
      { label: 'Dual SIM', value: 'Oui', icon: 'sim' },
      { label: 'Radio FM', value: 'Oui', icon: 'radio' },
      { label: 'Lampe torche', value: 'Oui', icon: 'flashlight' }
    ],
    highlights: [
      'Autonomie exceptionnelle de plusieurs semaines',
      'Design Nokia classique et robuste',
      'Double SIM pour deux numéros',
      'Radio FM intégrée',
      'Lampe torche pratique'
    ],
    images: [
      '/placeholder-nokia-110-2023-1.jpg',
      '/placeholder-nokia-110-2023-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.5,
      count: 234,
      distribution: { 5: 150, 4: 60, 3: 20, 2: 3, 1: 1 }
    },
    warranty: '1 an constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Autonomie record', 'Simple et fiable'],
    dasHead: '1.226 W/kg',
    dasBody: '1.226 W/kg'
  },

  // NOKIA 110 4G 2025
  {
    id: 'nokia-110-4g-2025',
    airtableId: 'recVcGcEwJVaJzSro',
    sku: 'NOKIA-110-4G-2025',
    name: 'NOKIA 110 4G 2025',
    brand: 'NOKIA',
    category: 'Smartphones',
    subcategory: 'Entrée de gamme',
    price: 64.99,
    description: "Le NOKIA 110 4G édition 2025 révolutionne le concept du téléphone simple en intégrant la connectivité 4G LTE ultra-rapide dans un format classique éprouvé. Cette évolution majeure transforme l'expérience utilisateur tout en préservant la simplicité légendaire Nokia : navigation internet basique pour consultations essentielles, appels VoLTE cristallins avec qualité HD voice, partage de connexion 4G hotspot pour dépannage d'urgence, messagerie moderne avec support WhatsApp simplifié (KaiOS). L'écran couleur 1.8 pouces QQVGA amélioré offre 25% de surface supplémentaire pour meilleure lisibilité des contenus. Batterie renforcée 1450mAh garantissant autonomie exceptionnelle malgré la 4G : jusqu'à 2 semaines en veille 4G, 19 heures de conversation continue, optimisation intelligente de la consommation réseau. Construction Nokia signature ultra-résistante avec certification militaire de robustesse, résistance aux températures extrêmes (-20°C à +55°C), protection contre poussière et éclaboussures légères. Appareil photo 0.3MP intégré pour captures basiques et codes QR, mémoire interne 128MB extensible jusqu'à 32GB, stockage cloud intégré pour sauvegardes automatiques contacts. Fonctionnalités enrichies : assistant Google simplifié pour recherches vocales, GPS assisté pour localisation d'urgence, radio FM avec RDS pour informations trafic, lampe torche LED améliorée double intensité, lecteur MP3 pour musique personnelle. Design moderne aux lignes épurées en polycarbonate premium bleu océan distinctif. Compatible tous opérateurs 4G réunionnais (SFR, Orange, Free, Zeop). Le téléphone simple nouvelle génération parfait pour seniors connectés, professionnels mobiles recherchant fiabilité, ou comme téléphone secondaire 4G performant à La Réunion.",
    shortDescription: 'Téléphone simple avec connexion 4G rapide',
    metaTitle: 'NOKIA 110 4G 2025 - Téléphone 4G Simple | Monster Phone 974',
    metaDescription: 'NOKIA 110 4G 2025 avec connexion 4G. Téléphone simple, robuste et connecté. 64,99€.',
    urlSlug: 'nokia-110-4g-2025-telephone-simple',
    keywords: ['NOKIA 110 4G', 'téléphone 4G', 'NOKIA 2025', 'connexion rapide', 'téléphone bleu', 'La Réunion', '974'],
    variants: [
      { color: 'Bleu', colorCode: '#0066CC', ean: '6438409099341', stock: 20, images: [] }
    ],
    defaultVariant: 'Bleu',
    specifications: [
      { label: 'Type', value: 'Téléphone simple 4G', icon: 'phone' },
      { label: 'Écran', value: '1.8" QQVGA', icon: 'display' },
      { label: 'Connectivité', value: '4G LTE', icon: 'network' },
      { label: 'Batterie', value: '1450mAh', icon: 'battery' },
      { label: 'Autonomie', value: 'Longue durée', icon: 'clock' },
      { label: 'Dual SIM', value: 'Oui', icon: 'sim' },
      { label: 'Appareil photo', value: '0.3MP', icon: 'camera' }
    ],
    highlights: [
      'Connexion 4G rapide',
      'Design Nokia robuste',
      'Autonomie longue durée',
      'Double SIM pratique',
      'Appareil photo intégré'
    ],
    images: [
      '/placeholder-nokia-110-4g-1.jpg',
      '/placeholder-nokia-110-4g-2.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.3,
      count: 178,
      distribution: { 5: 100, 4: 50, 3: 20, 2: 5, 1: 3 }
    },
    warranty: '1 an constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['4G rapide', 'Nouveau modèle 2025'],
    repairabilityIndex: 4.1,
    dasHead: '1.321 W/kg',
    dasBody: '1.524 W/kg'
  },

  // NOKIA G22
  {
    id: 'nokia-g22',
    airtableId: 'reclJA2OPjMow6VfT',
    sku: 'NOKIA-G22',
    name: 'NOKIA G22',
    brand: 'NOKIA',
    category: 'Smartphones',
    subcategory: 'Milieu de gamme',
    price: 199.99,
    description: "Le NOKIA G22 incarne la vision moderne de Nokia en combinant durabilité exceptionnelle, réparabilité révolutionnaire et performances Android optimales. Premier smartphone conçu en partenariat avec iFixit pour réparabilité maximale : écran remplaçable en 5 minutes avec outils basiques, batterie interchangeable sans soudure, modules caméra et port USB-C facilement remplaçables, guides de réparation officiels gratuits et pièces détachées garanties 5 ans. Cette approche écologique pionnière réduit l'empreinte carbone de 70% sur cycle de vie complet. Écran IPS 6.5 pouces HD+ avec taux de rafraîchissement fluide 90Hz offrant navigation ultra-smooth, technologie de protection oculaire certifiée TÜV Rheinland réduisant fatigue visuelle, luminosité adaptative 500 nits pour visibilité parfaite sous soleil tropical, verre renforcé Corning Gorilla Glass 3 anti-rayures. Système Android 12 pur sans surcouche pour expérience Google authentique : mises à jour garanties 2 ans OS + 3 ans sécurité, interface épurée et réactive sans bloatware, intégration native services Google optimisés, mode données économique pour contrôle consommation. Performance équilibrée avec processeur Unisoc T606 octa-core efficient, 4GB RAM LPDDR4X pour multitâche fluide, 64GB stockage eMMC 5.1 extensible jusqu'à 1TB microSD. Triple système caméra polyvalent : capteur principal 50MP avec IA avancée pour photos détaillées jour/nuit, ultra grand-angle 118° pour paysages époustouflants, macro 2MP pour détails minutieux, caméra frontale 8MP avec mode portrait IA. Batterie massive 5050mAh avec gestion intelligente : 3 jours d'autonomie usage normal, charge rapide 20W (50% en 30 minutes), mode super économie jusqu'à 1 semaine. Audio immersif avec technologie OZO spatial, double microphone suppresseur de bruit, FM radio intégrée. Connectivité complète : dual SIM + microSD dédié, NFC pour paiements sans contact, USB-C moderne. Design scandinave minimaliste en plastique recyclé à 60%, disponible en bleu glacier inspiré des fjords nordiques ou gris météorite élégant. Le smartphone éco-responsable parfait pour utilisateurs conscients privilégiant durabilité, réparabilité et expérience Android pure à La Réunion.",
    shortDescription: 'Smartphone Android durable et facilement réparable',
    metaTitle: 'NOKIA G22 - Smartphone Android Durable | Monster Phone 974',
    metaDescription: 'NOKIA G22, smartphone Android avec design durable. Performance équilibrée, écologique et réparable. 199,99€.',
    urlSlug: 'nokia-g22-smartphone-android',
    keywords: ['NOKIA G22', 'smartphone Android', 'téléphone durable', 'smartphone écologique', 'La Réunion', '974'],
    variants: [
      { color: 'Bleu', colorCode: '#4169E1', ean: '6438409083210', stock: 15, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '6438409083227', stock: 12, images: [] }
    ],
    defaultVariant: 'Bleu',
    specifications: [
      { label: 'OS', value: 'Android 12 (pur)', icon: 'android' },
      { label: 'Écran', value: '6.5" HD+ 90Hz', icon: 'display' },
      { label: 'RAM', value: '4GB', icon: 'memory' },
      { label: 'Stockage', value: '64GB extensible', icon: 'storage' },
      { label: 'Batterie', value: '5050mAh', icon: 'battery' },
      { label: 'Charge', value: '20W', icon: 'charging' },
      { label: 'Caméra principale', value: '50MP', icon: 'camera' },
      { label: 'Caméra selfie', value: '8MP', icon: 'camera' }
    ],
    highlights: [
      'Android pur avec mises à jour garanties',
      'Design durable et réparable',
      'Écran 90Hz fluide',
      'Batterie 5050mAh longue durée',
      'Indice de réparabilité élevé 8.1'
    ],
    images: [
      '/placeholder-nokia-g22-1.jpg',
      '/placeholder-nokia-g22-2.jpg',
      '/placeholder-nokia-g22-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 345,
      distribution: { 5: 200, 4: 100, 3: 30, 2: 10, 1: 5 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Écologique', 'Réparable', 'Android pur'],
    repairabilityIndex: 8.1,
    dasHead: '1.10 W/kg',
    dasBody: '1.27 W/kg'
  },

  // ========== PRODUITS HIFUTURE ==========
  
  // HIFUTURE HAPPYROCK Enceinte Bluetooth 5.3
  {
    id: 'hifuture-happyrock',
    airtableId: 'rec3S3fGlA6xxWkkA',
    sku: 'HIFUTURE-HAPPYROCK-BT53',
    name: 'HIFUTURE HAPPYROCK Enceinte Bluetooth 5.3',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Enceintes portables',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    promo: 'OFFRE SPÉCIALE',
    description: "L'enceinte Bluetooth HIFUTURE HAPPYROCK incarne la fusion parfaite entre performance audio exceptionnelle et mobilité absolue. Cette enceinte portable révolutionnaire intègre la technologie Bluetooth 5.3 dernière génération, garantissant une connexion stable jusqu'à 15 mètres avec une consommation énergétique optimisée. Son architecture acoustique sophistiquée délivre un son cristallin avec des basses profondes et équilibrées grâce aux doubles radiateurs passifs. La certification IPX7 assure une étanchéité totale, permettant une immersion complète jusqu'à 1 mètre pendant 30 minutes - parfaite pour la plage, la piscine ou les aventures outdoor à La Réunion. L'autonomie exceptionnelle de 20 heures vous accompagne du lever au coucher du soleil sans interruption. Le mode TWS (True Wireless Stereo) permet de coupler deux enceintes pour créer un véritable système stéréo immersif. Équipée d'un microphone intégré haute sensibilité pour appels mains libres cristallins. La batterie 3600mAh se recharge complètement en seulement 3 heures via USB-C. Design compact et robuste avec revêtement anti-choc, mousqueton intégré pour fixation facile. Disponible en plusieurs coloris tendance pour s'adapter à votre style. Compatible avec tous les appareils Bluetooth : smartphones, tablettes, ordinateurs. L'enceinte parfaite pour animer vos soirées, sorties plage et aventures tropicales.",
    shortDescription: 'Enceinte Bluetooth 5.3 étanche IPX7 avec 20h d\'autonomie et son stéréo TWS',
    metaTitle: 'HIFUTURE HAPPYROCK - Enceinte Bluetooth 5.3 IPX7 20h | Monster Phone 974',
    metaDescription: 'Enceinte portable HIFUTURE HAPPYROCK Bluetooth 5.3, étanche IPX7, 20h autonomie, TWS stéréo, appels mains libres. Idéale plage et outdoor. Monster Phone La Réunion.',
    urlSlug: 'hifuture-happyrock-enceinte-bluetooth-5-3',
    keywords: ['HIFUTURE HAPPYROCK', 'enceinte Bluetooth', 'IPX7 étanche', 'TWS stéréo', 'enceinte portable', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576180841', stock: 15, images: [] },
      { color: 'Bleu', colorCode: '#0080FF', ean: '6972576180858', stock: 12, images: [] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '6972576180865', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Connectivité', value: 'Bluetooth 5.3', icon: 'bluetooth' },
      { label: 'Autonomie', value: '20 heures', icon: 'battery' },
      { label: 'Étanchéité', value: 'IPX7', icon: 'water' },
      { label: 'Puissance', value: '10W RMS', icon: 'speaker' },
      { label: 'Batterie', value: '3600mAh', icon: 'battery' },
      { label: 'Temps de charge', value: '3 heures', icon: 'charging' },
      { label: 'Portée', value: '15 mètres', icon: 'signal' },
      { label: 'Fonction', value: 'TWS, Mains libres', icon: 'features' }
    ],
    highlights: [
      'Bluetooth 5.3 dernière génération',
      'Étanchéité IPX7 certifiée',
      '20 heures d\'autonomie',
      'Mode TWS stéréo',
      'Appels mains libres'
    ],
    images: [
      '/placeholder-hifuture-happyrock-1.jpg',
      '/placeholder-hifuture-happyrock-2.jpg',
      '/placeholder-hifuture-happyrock-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 89,
      distribution: { 5: 65, 4: 18, 3: 4, 2: 1, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Étanche', 'Longue autonomie', 'TWS']
  },

  // HIFUTURE ALTUS Casque sans fil ANC
  {
    id: 'hifuture-altus',
    airtableId: 'rec4E9K38xRxL31b9',
    sku: 'HIFUTURE-ALTUS-ANC',
    name: 'HIFUTURE ALTUS Casque sans fil ANC',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Casques',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    promo: 'BLACK FRIDAY',
    description: "Le casque HIFUTURE ALTUS représente le summum de l'expérience audio sans fil avec sa technologie de réduction active du bruit (ANC) de dernière génération. Équipé de transducteurs dynamiques de 40mm haute définition, il délivre un son d'une pureté exceptionnelle avec des basses profondes et des aigus cristallins sur toute la gamme de fréquences 20Hz-20kHz. La technologie ANC hybride avec 4 microphones dédiés supprime jusqu'à 95% des bruits ambiants, créant une bulle de tranquillité parfaite pour le travail, les voyages ou la détente. Le mode Transparence intelligent vous permet de rester connecté à votre environnement sans retirer le casque. L'autonomie record de 40 heures avec ANC activé (60 heures sans ANC) vous libère de toute contrainte de recharge quotidienne. La charge rapide USB-C offre 5 heures d'écoute en seulement 10 minutes. Design circum-aural avec coussinets à mémoire de forme en protéine de haute qualité pour un confort prolongé sans fatigue. Arceau ajustable rembourré et pliable pour transport facile. Bluetooth 5.2 multipoint permettant la connexion simultanée à 2 appareils. Commandes tactiles intuitives sur l'écouteur droit. Microphone haute définition pour appels cristallins en mode mains libres. Application dédiée pour égaliseur personnalisé et mises à jour firmware. Le compagnon idéal pour audiophiles et professionnels nomades à La Réunion.",
    shortDescription: 'Casque Bluetooth ANC avec 40h autonomie, drivers 40mm et Bluetooth multipoint',
    metaTitle: 'HIFUTURE ALTUS - Casque ANC Bluetooth 40h Autonomie | Monster Phone 974',
    metaDescription: 'Casque sans fil HIFUTURE ALTUS avec ANC hybride, 40h autonomie, drivers 40mm, Bluetooth 5.2 multipoint. Confort premium et son Hi-Fi. Monster Phone La Réunion.',
    urlSlug: 'hifuture-altus-casque-anc-bluetooth',
    keywords: ['HIFUTURE ALTUS', 'casque ANC', 'réduction bruit', 'Bluetooth multipoint', 'casque sans fil', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576181435', stock: 8, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '6972576181442', stock: 6, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Drivers', value: '40mm dynamiques', icon: 'speaker' },
      { label: 'ANC', value: 'Hybride -35dB', icon: 'noise' },
      { label: 'Autonomie', value: '40h (ANC on) / 60h (ANC off)', icon: 'battery' },
      { label: 'Bluetooth', value: '5.2 Multipoint', icon: 'bluetooth' },
      { label: 'Charge rapide', value: '10 min = 5h', icon: 'charging' },
      { label: 'Poids', value: '280g', icon: 'weight' },
      { label: 'Fréquences', value: '20Hz - 20kHz', icon: 'frequency' },
      { label: 'Microphones', value: '4 (ANC) + 1 (appels)', icon: 'microphone' }
    ],
    highlights: [
      'ANC hybride -35dB',
      '40 heures d\'autonomie avec ANC',
      'Bluetooth 5.2 multipoint',
      'Charge rapide USB-C',
      'Coussinets mémoire de forme'
    ],
    images: [
      '/placeholder-hifuture-altus-1.jpg',
      '/placeholder-hifuture-altus-2.jpg',
      '/placeholder-hifuture-altus-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.8,
      count: 134,
      distribution: { 5: 102, 4: 25, 3: 5, 2: 1, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['ANC Premium', 'Longue autonomie', 'Hi-Fi']
  },

  // HIFUTURE COLORBUDS 2 True Wireless
  {
    id: 'hifuture-colorbuds-2',
    airtableId: 'rec67QqLdQdJ1VZeL',
    sku: 'HIFUTURE-COLORBUDS2-TWS',
    name: 'HIFUTURE COLORBUDS 2 True Wireless',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    promo: 'SOLDES',
    description: "Les écouteurs HIFUTURE COLORBUDS 2 redéfinissent l'expérience True Wireless avec leur combinaison parfaite de performance audio, confort et style. Dotés de drivers dynamiques 10mm avec revêtement biocellulose, ils délivrent un son riche et équilibré avec des basses puissantes et des médiums naturels. La technologie Bluetooth 5.3 avec codec AAC garantit une transmission audio haute fidélité sans latence, idéale pour musique, vidéos et gaming. L'autonomie totale de 35 heures (7h par charge + 28h avec le boîtier) vous accompagne plusieurs jours sans recharge. La charge rapide offre 2 heures d'écoute en 10 minutes. Design ergonomique intra-auriculaire avec 4 tailles d'embouts silicone pour un ajustement parfait et une isolation passive optimale. Certification IPX5 résistante à la transpiration et aux éclaboussures pour sport et activités outdoor. Commandes tactiles personnalisables pour lecture, appels et assistant vocal. Microphones doubles avec réduction de bruit environnemental ENC pour appels clairs même en environnement bruyant. Mode Gaming ultra-faible latence 65ms pour synchronisation parfaite audio-vidéo. Boîtier de charge compact avec LED indicateur de batterie et compatibilité charge sans fil Qi. Application compagnon pour égaliseur personnalisé et localisation des écouteurs. Disponibles en 6 coloris tendance pour matcher votre style. Les écouteurs TWS parfaits pour le quotidien actif à La Réunion.",
    shortDescription: 'Écouteurs TWS Bluetooth 5.3 avec 35h autonomie, IPX5 et mode gaming 65ms',
    metaTitle: 'HIFUTURE COLORBUDS 2 - Écouteurs TWS 35h Bluetooth 5.3 | Monster Phone 974',
    metaDescription: 'Écouteurs True Wireless HIFUTURE COLORBUDS 2 : Bluetooth 5.3, 35h autonomie totale, IPX5, mode gaming, appels ENC. 6 coloris disponibles. Monster Phone La Réunion.',
    urlSlug: 'hifuture-colorbuds-2-ecouteurs-tws',
    keywords: ['HIFUTURE COLORBUDS 2', 'écouteurs TWS', 'True Wireless', 'Bluetooth 5.3', 'écouteurs sport', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576181824', stock: 20, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '6972576181831', stock: 18, images: [] },
      { color: 'Bleu', colorCode: '#0080FF', ean: '6972576181848', stock: 15, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '6972576181855', stock: 12, images: [] },
      { color: 'Vert', colorCode: '#00FF00', ean: '6972576181862', stock: 10, images: [] },
      { color: 'Violet', colorCode: '#800080', ean: '6972576181879', stock: 8, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Drivers', value: '10mm biocellulose', icon: 'speaker' },
      { label: 'Bluetooth', value: '5.3 avec AAC', icon: 'bluetooth' },
      { label: 'Autonomie', value: '7h + 28h (boîtier)', icon: 'battery' },
      { label: 'Étanchéité', value: 'IPX5', icon: 'water' },
      { label: 'Latence gaming', value: '65ms', icon: 'gaming' },
      { label: 'Charge', value: 'USB-C + Qi sans fil', icon: 'charging' },
      { label: 'Microphones', value: 'Double avec ENC', icon: 'microphone' },
      { label: 'Poids', value: '4.5g par écouteur', icon: 'weight' }
    ],
    highlights: [
      '35 heures d\'autonomie totale',
      'Mode gaming 65ms',
      'IPX5 résistant à l\'eau',
      'Charge sans fil Qi',
      '6 coloris disponibles'
    ],
    images: [
      '/placeholder-hifuture-colorbuds2-1.jpg',
      '/placeholder-hifuture-colorbuds2-2.jpg',
      '/placeholder-hifuture-colorbuds2-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 256,
      distribution: { 5: 180, 4: 55, 3: 15, 2: 4, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Gaming', 'IPX5', 'Charge sans fil']
  },

  // HIFUTURE FUTUREMATE
  {
    id: 'hifuture-futuremate',
    airtableId: 'rec8lCbDJQwcYupxb',
    sku: 'HIFUTURE-FUTUREMATE-SWATCH',
    name: 'HIFUTURE FUTUREMATE',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    promo: 'PROMO TECH',
    description: "La montre connectée HIFUTURE FUTUREMATE représente l'alliance parfaite entre technologie de pointe et élégance intemporelle. Son écran AMOLED de 1.43 pouces avec résolution 466x466 pixels offre une clarté exceptionnelle et des couleurs éclatantes visibles même en plein soleil tropical. Le boîtier en alliage d'aluminium premium avec finition brossée allie robustesse et légèreté pour un confort optimal au quotidien. Équipée d'un capteur cardiaque optique dernière génération, elle surveille votre fréquence cardiaque 24h/24 avec une précision médicale. Le suivi SpO2 continu mesure votre saturation en oxygène sanguin, essentiel pour optimiser vos performances sportives. Plus de 100 modes sportifs intégrés avec GPS haute précision pour tracker vos activités : course, natation (étanche 5ATM), vélo, randonnée et sports nautiques populaires à La Réunion. Analyse avancée du sommeil avec phases REM, profond et léger. Assistant vocal intégré, appels Bluetooth avec haut-parleur et microphone haute définition. Notifications intelligentes avec réponses rapides prédéfinies. Autonomie exceptionnelle de 10 jours en utilisation normale, 30 jours en mode économie. Charge magnétique rapide en 2 heures. Plus de 200 cadrans personnalisables via l'application dédiée. Bracelet en silicone hypoallergénique interchangeable. Compatible iOS et Android. La smartwatch complète pour un mode de vie actif et connecté.",
    shortDescription: 'Montre connectée AMOLED 1.43" avec GPS, 100+ sports et 10 jours d\'autonomie',
    metaTitle: 'HIFUTURE FUTUREMATE - Smartwatch AMOLED GPS 100 Sports | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE FUTUREMATE : écran AMOLED 1.43", GPS intégré, 100+ modes sport, étanche 5ATM, 10 jours autonomie. Idéale sport La Réunion.',
    urlSlug: 'hifuture-futuremate-montre-connectee',
    keywords: ['HIFUTURE FUTUREMATE', 'montre connectée', 'smartwatch', 'GPS', 'tracker fitness', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182234', stock: 12, images: [] },
      { color: 'Argent', colorCode: '#C0C0C0', ean: '6972576182241', stock: 10, images: [] },
      { color: 'Or Rose', colorCode: '#B76E79', ean: '6972576182258', stock: 8, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Écran', value: '1.43" AMOLED 466x466', icon: 'display' },
      { label: 'GPS', value: 'Intégré haute précision', icon: 'location' },
      { label: 'Modes sport', value: '100+', icon: 'sport' },
      { label: 'Étanchéité', value: '5ATM (50m)', icon: 'water' },
      { label: 'Autonomie', value: '10 jours', icon: 'battery' },
      { label: 'Capteurs', value: 'Cardiaque, SpO2, Accéléromètre', icon: 'sensor' },
      { label: 'Connectivité', value: 'Bluetooth 5.2', icon: 'bluetooth' },
      { label: 'Compatibilité', value: 'iOS 10+ / Android 5+', icon: 'phone' }
    ],
    highlights: [
      'Écran AMOLED haute résolution',
      'GPS intégré précis',
      '100+ modes sportifs',
      'Étanche 5ATM pour natation',
      '10 jours d\'autonomie'
    ],
    images: [
      '/placeholder-hifuture-futuremate-1.jpg',
      '/placeholder-hifuture-futuremate-2.jpg',
      '/placeholder-hifuture-futuremate-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 178,
      distribution: { 5: 130, 4: 35, 3: 10, 2: 2, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['GPS', 'AMOLED', '5ATM']
  },

  // HIFUTURE ZONE 2
  {
    id: 'hifuture-zone-2',
    airtableId: 'rec9MNXwqQT23kLRx',
    sku: 'HIFUTURE-ZONE2-SW',
    name: 'HIFUTURE ZONE 2',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    promo: 'OFFRE LIMITÉE',
    description: "La HIFUTURE ZONE 2 redéfinit les standards de la montre connectée avec son design sophistiqué et ses fonctionnalités avancées à prix accessible. L'écran tactile IPS de 1.28 pouces avec résolution 240x240 pixels offre une lisibilité parfaite dans toutes les conditions d'éclairage. Le verre 2.5D renforcé résiste aux rayures et impacts du quotidien. Architecture multi-capteurs pour un suivi santé complet : moniteur cardiaque 24/7, oxymètre SpO2, thermomètre corporel et analyse du stress. Plus de 70 modes sportifs professionnels avec algorithmes d'analyse avancés pour optimiser vos performances. Suivi automatique des activités quotidiennes : pas, calories, distance, étages montés. Analyse détaillée du sommeil avec conseils personnalisés pour améliorer la qualité de votre repos. Notifications intelligentes avec vibration personnalisable pour appels, SMS et applications. Contrôle musical et appareil photo à distance. Rappels sédentarité et hydratation. Autonomie remarquable de 15 jours en usage normal grâce à la puce basse consommation. Charge magnétique complète en 2.5 heures. Étanchéité IP68 pour usage quotidien et sports aquatiques légers. Interface utilisateur intuitive avec navigation par gestes. Application mobile complète avec historique détaillé et objectifs personnalisables. Bracelet silicone respirant interchangeable en plusieurs coloris. Le tracker santé et fitness idéal pour un mode de vie actif à La Réunion.",
    shortDescription: 'Montre connectée IPS 1.28" avec 70+ sports, multi-capteurs santé et 15 jours autonomie',
    metaTitle: 'HIFUTURE ZONE 2 - Montre Connectée 70 Sports IP68 | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE ZONE 2 : écran IPS 1.28", 70+ modes sport, capteurs santé complets, IP68, 15 jours autonomie. Tracker fitness La Réunion.',
    urlSlug: 'hifuture-zone-2-montre-sport',
    keywords: ['HIFUTURE ZONE 2', 'montre sport', 'tracker fitness', 'montre santé', 'smartwatch', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182456', stock: 15, images: [] },
      { color: 'Bleu', colorCode: '#0080FF', ean: '6972576182463', stock: 12, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '6972576182470', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Écran', value: '1.28" IPS 240x240', icon: 'display' },
      { label: 'Modes sport', value: '70+', icon: 'sport' },
      { label: 'Capteurs', value: 'Cardiaque, SpO2, Température', icon: 'sensor' },
      { label: 'Étanchéité', value: 'IP68', icon: 'water' },
      { label: 'Autonomie', value: '15 jours', icon: 'battery' },
      { label: 'Bluetooth', value: '5.0', icon: 'bluetooth' },
      { label: 'Poids', value: '38g', icon: 'weight' },
      { label: 'Compatibilité', value: 'iOS 9+ / Android 4.4+', icon: 'phone' }
    ],
    highlights: [
      '15 jours d\'autonomie',
      '70+ modes sportifs',
      'Multi-capteurs santé',
      'Étanchéité IP68',
      'Écran tactile IPS'
    ],
    images: [
      '/placeholder-hifuture-zone2-1.jpg',
      '/placeholder-hifuture-zone2-2.jpg',
      '/placeholder-hifuture-zone2-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.5,
      count: 234,
      distribution: { 5: 150, 4: 60, 3: 18, 2: 4, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['15 jours autonomie', 'IP68', 'Multi-capteurs']
  },

  // HIFUTURE ULTRAFIT
  {
    id: 'hifuture-ultrafit',
    airtableId: 'recBbzRiXLo5W4YOP',
    sku: 'HIFUTURE-ULTRAFIT',
    name: 'HIFUTURE ULTRAFIT',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    promo: 'FITNESS PROMO',
    description: "La HIFUTURE ULTRAFIT est la montre connectée ultime pour les passionnés de fitness et les athlètes exigeants. Son écran AMOLED incurvé de 1.39 pouces avec résolution 454x454 pixels offre une expérience visuelle immersive avec always-on display personnalisable. Le boîtier en acier inoxydable 316L garantit durabilité et élégance pour toutes les occasions. Technologie GPS double fréquence L1+L5 pour un tracking ultra-précis de vos parcours, même en environnement urbain dense ou sous couvert forestier. Plus de 120 modes sportifs professionnels avec métriques avancées : VO2 max, temps de récupération, charge d'entraînement, prédiction de performance. Coach virtuel intégré avec plans d'entraînement adaptatifs basés sur vos objectifs et condition physique. Capteur cardiaque nouvelle génération avec variabilité de fréquence cardiaque (HRV) pour analyse du stress et récupération. Altimètre barométrique, boussole et gyroscope pour sports outdoor. Étanchéité 5ATM avec mode natation avancé : reconnaissance automatique des styles, SWOLF, analyse technique. Musique embarquée 4GB pour 500 chansons sans smartphone. Paiement sans contact NFC (compatible avec services locaux). Autonomie intelligente : 14 jours en usage normal, 48h avec GPS actif, 30 jours en mode économie. Écosystème complet avec application analytique avancée et communauté fitness. La montre de référence pour dépasser vos limites à La Réunion.",
    shortDescription: 'Montre sport AMOLED 1.39" avec GPS L1+L5, 120 sports et musique 4GB',
    metaTitle: 'HIFUTURE ULTRAFIT - Montre Sport GPS Premium AMOLED | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE ULTRAFIT : AMOLED 1.39", GPS double fréquence, 120 sports, musique 4GB, paiement NFC. La référence fitness La Réunion.',
    urlSlug: 'hifuture-ultrafit-montre-gps-premium',
    keywords: ['HIFUTURE ULTRAFIT', 'montre GPS', 'smartwatch sport', 'montre fitness', 'NFC', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Titanium', colorCode: '#1C1C1C', ean: '6972576182678', stock: 8, images: [] },
      { color: 'Argent', colorCode: '#C0C0C0', ean: '6972576182685', stock: 6, images: [] }
    ],
    defaultVariant: 'Noir Titanium',
    specifications: [
      { label: 'Écran', value: '1.39" AMOLED 454x454', icon: 'display' },
      { label: 'GPS', value: 'Double fréquence L1+L5', icon: 'location' },
      { label: 'Modes sport', value: '120+', icon: 'sport' },
      { label: 'Musique', value: '4GB stockage', icon: 'music' },
      { label: 'Étanchéité', value: '5ATM', icon: 'water' },
      { label: 'Autonomie', value: '14 jours / 48h GPS', icon: 'battery' },
      { label: 'Paiement', value: 'NFC sans contact', icon: 'payment' },
      { label: 'Matériaux', value: 'Acier inoxydable 316L', icon: 'material' }
    ],
    highlights: [
      'GPS double fréquence L1+L5',
      'Musique 4GB embarquée',
      'Paiement NFC',
      '120+ modes sportifs pro',
      'AMOLED always-on'
    ],
    images: [
      '/placeholder-hifuture-ultrafit-1.jpg',
      '/placeholder-hifuture-ultrafit-2.jpg',
      '/placeholder-hifuture-ultrafit-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 156,
      distribution: { 5: 140, 4: 12, 3: 3, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['GPS Premium', 'NFC', 'Musique']
  },

  // HIFUTURE FLYBUDS Ecouteurs sans fil
  {
    id: 'hifuture-flybuds',
    airtableId: 'recDqA9HaRsNJWN5U',
    sku: 'HIFUTURE-FLYBUDS-TWS',
    name: 'HIFUTURE FLYBUDS Ecouteurs sans fil',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    promo: 'OFFRE FLASH',
    description: "Les écouteurs HIFUTURE FLYBUDS incarnent l'excellence du son True Wireless avec leur technologie audio avancée et leur design ergonomique révolutionnaire. Équipés de drivers graphène 13mm haute performance, ils délivrent un son Hi-Res avec une signature sonore équilibrée, des basses profondes et percutantes, des médiums chaleureux et des aigus cristallins sans distorsion. La technologie ANC active avec 6 microphones dédiés supprime jusqu'à 42dB de bruit ambiant, créant une bulle d'immersion sonore parfaite pour vos trajets, travail ou détente. Mode Transparence adaptatif pour rester conscient de votre environnement sans retirer les écouteurs. Bluetooth 5.3 avec technologie de transmission double canal pour une connexion ultra-stable et une latence minimale de 40ms en mode gaming. Autonomie exceptionnelle : 8 heures par charge avec ANC, 12 heures sans ANC, plus 32 heures supplémentaires avec le boîtier de charge. Charge rapide : 15 minutes pour 3 heures d'écoute. Design semi-intra avec embouts en mousse à mémoire de forme pour confort longue durée et isolation optimale. Certification IPX6 résistante à la pluie et transpiration intense. Commandes tactiles intelligentes avec détection de port automatique. Appels HD avec technologie de beamforming et suppression du bruit du vent. Application dédiée avec égaliseur 10 bandes, mise à jour OTA et localisation. Le choix premium pour audiophiles mobiles à La Réunion.",
    shortDescription: 'Écouteurs ANC 42dB avec drivers graphène 13mm, Bluetooth 5.3 et 40h autonomie',
    metaTitle: 'HIFUTURE FLYBUDS - Écouteurs ANC Premium Graphène | Monster Phone 974',
    metaDescription: 'Écouteurs TWS HIFUTURE FLYBUDS : ANC 42dB, drivers graphène 13mm, 40h autonomie totale, IPX6, mode gaming 40ms. Son Hi-Res premium La Réunion.',
    urlSlug: 'hifuture-flybuds-ecouteurs-anc',
    keywords: ['HIFUTURE FLYBUDS', 'écouteurs ANC', 'TWS premium', 'graphène', 'Hi-Res audio', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Mat', colorCode: '#2B2B2B', ean: '6972576182890', stock: 10, images: [] },
      { color: 'Blanc Pearl', colorCode: '#F8F8FF', ean: '6972576182906', stock: 8, images: [] }
    ],
    defaultVariant: 'Noir Mat',
    specifications: [
      { label: 'Drivers', value: '13mm graphène', icon: 'speaker' },
      { label: 'ANC', value: '-42dB (6 microphones)', icon: 'noise' },
      { label: 'Bluetooth', value: '5.3 double canal', icon: 'bluetooth' },
      { label: 'Autonomie', value: '8h + 32h (boîtier)', icon: 'battery' },
      { label: 'Latence', value: '40ms mode gaming', icon: 'gaming' },
      { label: 'Étanchéité', value: 'IPX6', icon: 'water' },
      { label: 'Codec', value: 'AAC, SBC, aptX', icon: 'codec' },
      { label: 'Charge', value: 'USB-C + Sans fil', icon: 'charging' }
    ],
    highlights: [
      'ANC puissant -42dB',
      'Drivers graphène Hi-Res',
      '40 heures autonomie totale',
      'Mode gaming 40ms',
      'IPX6 sport-ready'
    ],
    images: [
      '/placeholder-hifuture-flybuds-1.jpg',
      '/placeholder-hifuture-flybuds-2.jpg',
      '/placeholder-hifuture-flybuds-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.8,
      count: 198,
      distribution: { 5: 160, 4: 30, 3: 6, 2: 1, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['ANC Pro', 'Hi-Res', 'Gaming']
  },

  // HIFUTURE GRAVITY Enceinte Bluetooth
  {
    id: 'hifuture-gravity',
    airtableId: 'recE79Vv4LKOcn8P2',
    sku: 'HIFUTURE-GRAVITY-360',
    name: 'HIFUTURE GRAVITY Enceinte Bluetooth',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Enceintes portables',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    promo: 'SON 360°',
    description: "L'enceinte HIFUTURE GRAVITY révolutionne l'expérience audio portable avec sa technologie de diffusion sonore à 360 degrés. Dotée de 4 transducteurs full-range disposés stratégiquement et de 2 radiateurs passifs, elle crée une bulle sonore immersive avec une puissance totale de 40W RMS. La technologie DSP avancée optimise automatiquement le son selon l'acoustique de votre environnement. Design cylindrique élégant avec grille métallique premium et base antidérapante pour stabilité optimale. Bluetooth 5.2 avec portée étendue jusqu'à 30 mètres et connexion multipoint pour 2 appareils simultanés. Mode TWS Plus permettant de coupler jusqu'à 100 enceintes GRAVITY pour créer un système audio multi-room impressionnant. Batterie haute capacité 6600mAh offrant 24 heures d'autonomie à volume modéré. Fonction powerbank pour recharger vos appareils mobiles. Certification IPX7 pour résistance totale à l'eau, flotte même en cas de chute dans l'eau. Éclairage LED RGB synchronisé avec la musique, personnalisable via l'application. Microphone intégré avec suppression d'écho pour conférences. Égaliseur 5 bandes personnalisable. Entrée AUX, slot microSD et radio FM intégrée. Poignée en cuir végétal pour transport facile. L'enceinte parfaite pour animer toutes vos soirées et aventures outdoor à La Réunion.",
    shortDescription: 'Enceinte 360° 40W avec 24h autonomie, IPX7 et éclairage RGB synchronisé',
    metaTitle: 'HIFUTURE GRAVITY - Enceinte Bluetooth 360° 40W IPX7 | Monster Phone 974',
    metaDescription: 'Enceinte HIFUTURE GRAVITY : son 360° 40W, 24h autonomie, IPX7 flottante, LED RGB, TWS Plus multi-room. Animation parfaite La Réunion.',
    urlSlug: 'hifuture-gravity-enceinte-360',
    keywords: ['HIFUTURE GRAVITY', 'enceinte 360', 'enceinte Bluetooth', 'IPX7', 'LED RGB', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576183118', stock: 6, images: [] },
      { color: 'Bleu Ocean', colorCode: '#006994', ean: '6972576183125', stock: 5, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Puissance', value: '40W RMS', icon: 'speaker' },
      { label: 'Son', value: '360° immersif', icon: 'sound' },
      { label: 'Autonomie', value: '24 heures', icon: 'battery' },
      { label: 'Batterie', value: '6600mAh + Powerbank', icon: 'battery' },
      { label: 'Étanchéité', value: 'IPX7 (flottante)', icon: 'water' },
      { label: 'Bluetooth', value: '5.2 Multipoint', icon: 'bluetooth' },
      { label: 'Portée', value: '30 mètres', icon: 'signal' },
      { label: 'Extras', value: 'LED RGB, FM, MicroSD', icon: 'features' }
    ],
    highlights: [
      'Son 360° immersif 40W',
      '24 heures d\'autonomie',
      'IPX7 flottante',
      'LED RGB synchronisées',
      'TWS Plus multi-room'
    ],
    images: [
      '/placeholder-hifuture-gravity-1.jpg',
      '/placeholder-hifuture-gravity-2.jpg',
      '/placeholder-hifuture-gravity-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 87,
      distribution: { 5: 75, 4: 10, 3: 1, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['360°', 'IPX7', 'LED RGB']
  },

  // HIFUTURE FITMAX
  {
    id: 'hifuture-fitmax',
    airtableId: 'recGcKLvJNRXfT1Wx',
    sku: 'HIFUTURE-FITMAX-TRACKER',
    name: 'HIFUTURE FITMAX',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    promo: 'SPORT DEAL',
    description: "Le bracelet connecté HIFUTURE FITMAX est le compagnon fitness idéal pour suivre et améliorer votre santé au quotidien. Son écran AMOLED couleur de 1.1 pouces affiche clairement toutes vos données même en plein soleil. Design ultra-fin de seulement 11mm d'épaisseur et poids plume de 25g pour un port invisible et confortable 24h/24. Capteurs de pointe pour un suivi santé complet : fréquence cardiaque continue avec alertes anormales, oxymétrie SpO2, analyse du stress et suivi menstruel. Plus de 50 modes sportifs avec reconnaissance automatique des activités principales. GPS connecté via smartphone pour cartographie précise de vos parcours. Analyse avancée du sommeil avec score de qualité et conseils personnalisés. Notifications intelligentes discrètes avec vibration personnalisable. Autonomie record de 20 jours grâce à la puce ultra basse consommation. Charge magnétique rapide en 1.5 heures. Étanchéité 5ATM pour natation et sports aquatiques. Application intuitive avec tableaux de bord détaillés, défis communautaires et badges de récompense. Bracelet en TPU médical hypoallergénique, disponible en multiples coloris pour s'adapter à votre style. Compatible avec Strava, Google Fit et Apple Health. Le tracker fitness accessible et complet pour atteindre vos objectifs santé à La Réunion.",
    shortDescription: 'Bracelet fitness AMOLED avec 50+ sports, GPS connecté et 20 jours autonomie',
    metaTitle: 'HIFUTURE FITMAX - Bracelet Connecté Fitness AMOLED | Monster Phone 974',
    metaDescription: 'Bracelet connecté HIFUTURE FITMAX : écran AMOLED, 50+ sports, GPS connecté, 5ATM, 20 jours autonomie. Tracker santé complet La Réunion.',
    urlSlug: 'hifuture-fitmax-bracelet-fitness',
    keywords: ['HIFUTURE FITMAX', 'bracelet connecté', 'fitness tracker', 'montre sport', 'tracker santé', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576183347', stock: 20, images: [] },
      { color: 'Bleu Navy', colorCode: '#000080', ean: '6972576183354', stock: 18, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '6972576183361', stock: 15, images: [] },
      { color: 'Vert', colorCode: '#00FF00', ean: '6972576183378', stock: 12, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Écran', value: '1.1" AMOLED couleur', icon: 'display' },
      { label: 'Modes sport', value: '50+', icon: 'sport' },
      { label: 'GPS', value: 'Connecté (smartphone)', icon: 'location' },
      { label: 'Étanchéité', value: '5ATM', icon: 'water' },
      { label: 'Autonomie', value: '20 jours', icon: 'battery' },
      { label: 'Poids', value: '25g', icon: 'weight' },
      { label: 'Épaisseur', value: '11mm', icon: 'dimension' },
      { label: 'Compatibilité', value: 'iOS/Android', icon: 'phone' }
    ],
    highlights: [
      '20 jours d\'autonomie',
      'Écran AMOLED couleur',
      'Ultra léger 25g',
      '5ATM pour natation',
      '50+ modes sportifs'
    ],
    images: [
      '/placeholder-hifuture-fitmax-1.jpg',
      '/placeholder-hifuture-fitmax-2.jpg',
      '/placeholder-hifuture-fitmax-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.4,
      count: 312,
      distribution: { 5: 180, 4: 90, 3: 30, 2: 8, 1: 4 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['20 jours', 'AMOLED', '5ATM']
  },

  // HIFUTURE VOCALIST 100 Micro Karaoké
  {
    id: 'hifuture-vocalist-100',
    airtableId: 'recJKq3o5Pb7wxYeL',
    sku: 'HIFUTURE-VOCALIST100',
    name: 'HIFUTURE VOCALIST 100 Micro Karaoké',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Microphones',
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    promo: 'KARAOKÉ FUN',
    description: "Le micro karaoké HIFUTURE VOCALIST 100 transforme instantanément n'importe quel lieu en salle de concert privée. Technologie Bluetooth 5.0 pour connexion sans fil à tous vos appareils : smartphones, tablettes, smart TV, enceintes. Haut-parleur intégré 5W avec amplification DSP pour un son puissant et clair. Capsule microphone condensateur professionnel avec suppression du bruit ambiant et réduction de l'effet Larsen. 5 modes de voix prédéfinis : Original, Enfant, Femme, Homme, Monster pour s'amuser avec différents effets. Réverbération ajustable sur 5 niveaux pour effet écho professionnel. Mixage en temps réel de votre voix avec la musique. Compatible avec toutes les applications karaoké : Smule, Yokee, StarMaker. Mode duo permettant de connecter 2 micros pour chanter en duo. Éclairage LED multicolore synchronisé avec le rythme. Batterie 2000mAh pour 8 heures de karaoké non-stop. Enregistrement direct sur carte microSD jusqu'à 32GB. Fonction radio FM intégrée. Construction en alliage d'aluminium résistant avec grille anti-pop. Câble audio 3.5mm inclus pour connexion filaire. Étui de transport élégant fourni. L'accessoire indispensable pour animer vos soirées et fêtes à La Réunion.",
    shortDescription: 'Micro karaoké Bluetooth avec haut-parleur 5W, effets voix et LED rythmiques',
    metaTitle: 'HIFUTURE VOCALIST 100 - Micro Karaoké Bluetooth LED | Monster Phone 974',
    metaDescription: 'Micro karaoké HIFUTURE VOCALIST 100 : Bluetooth 5.0, haut-parleur 5W, 5 effets voix, LED rythmiques, 8h autonomie. Animation garantie La Réunion.',
    urlSlug: 'hifuture-vocalist-100-micro-karaoke',
    keywords: ['HIFUTURE VOCALIST', 'micro karaoké', 'microphone Bluetooth', 'karaoké portable', 'micro LED', 'La Réunion', '974'],
    variants: [
      { color: 'Or Rose', colorCode: '#B76E79', ean: '6972576183569', stock: 25, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '6972576183576', stock: 20, images: [] },
      { color: 'Argent', colorCode: '#C0C0C0', ean: '6972576183583', stock: 18, images: [] }
    ],
    defaultVariant: 'Or Rose',
    specifications: [
      { label: 'Connectivité', value: 'Bluetooth 5.0', icon: 'bluetooth' },
      { label: 'Haut-parleur', value: '5W intégré', icon: 'speaker' },
      { label: 'Effets', value: '5 modes voix + réverb', icon: 'effects' },
      { label: 'Autonomie', value: '8 heures', icon: 'battery' },
      { label: 'Batterie', value: '2000mAh', icon: 'battery' },
      { label: 'Éclairage', value: 'LED multicolore rythmique', icon: 'light' },
      { label: 'Enregistrement', value: 'MicroSD jusqu\'à 32GB', icon: 'record' },
      { label: 'Extras', value: 'Radio FM, Mode duo', icon: 'features' }
    ],
    highlights: [
      '5 effets voix amusants',
      'LED synchronisées',
      '8 heures de karaoké',
      'Mode duo 2 micros',
      'Enregistrement SD'
    ],
    images: [
      '/placeholder-hifuture-vocalist-1.jpg',
      '/placeholder-hifuture-vocalist-2.jpg',
      '/placeholder-hifuture-vocalist-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.5,
      count: 156,
      distribution: { 5: 90, 4: 45, 3: 15, 2: 4, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Karaoké', 'LED', 'Effets voix']
  },

  // HIFUTURE TOUR PRO
  {
    id: 'hifuture-tour-pro',
    airtableId: 'recQnX8oW2kYbRvNZ',
    sku: 'HIFUTURE-TOURPRO-ANC',
    name: 'HIFUTURE TOUR PRO',
    brand: 'HiFuture',
    category: 'Audio',
    subcategory: 'Casques',
    price: 119.99,
    originalPrice: 159.99,
    discount: 25,
    promo: 'PRO AUDIO',
    description: "Le casque HIFUTURE TOUR PRO établit de nouveaux standards dans l'audio professionnel nomade. Conçu pour les professionnels de la musique, ingénieurs du son et audiophiles exigeants, il offre une reproduction sonore de référence studio. Drivers planaires magnétiques de 50mm avec aimants néodyme pour une réponse en fréquence étendue de 5Hz à 40kHz. Technologie ANC hybride adaptative avec 8 microphones et processeur dédié, supprimant jusqu'à 45dB de bruit avec analyse en temps réel de l'environnement sonore. Mode Monitoring professionnel avec latence zéro pour production musicale. Architecture acoustique ouverte/fermée commutable pour s'adapter à vos besoins. Bluetooth 5.3 avec codecs HD : LDAC, aptX HD, aptX Adaptive pour qualité studio sans fil. Double connexion simultanée filaire et Bluetooth. Câble symétrique détachable 2.5mm avec adaptateurs 3.5mm et 6.35mm fournis. Autonomie marathon de 50 heures avec ANC, 80 heures sans. Charge rapide USB-C PD : 10 minutes pour 8 heures. Construction premium : arceau en fibre de carbone, charnières en aluminium usiné, coussinets en cuir Nappa ventilé. Étui rigide professionnel avec compartiments pour câbles et accessoires. Calibration personnalisée via application avec profils d'écoute sauvegardables. Le casque de référence pour professionnels et passionnés à La Réunion.",
    shortDescription: 'Casque pro avec drivers planaires 50mm, ANC 45dB et 50h autonomie',
    metaTitle: 'HIFUTURE TOUR PRO - Casque Professionnel ANC Planaire | Monster Phone 974',
    metaDescription: 'Casque professionnel HIFUTURE TOUR PRO : drivers planaires 50mm, ANC 45dB, LDAC, 50h autonomie. Qualité studio pour pros La Réunion.',
    urlSlug: 'hifuture-tour-pro-casque-professionnel',
    keywords: ['HIFUTURE TOUR PRO', 'casque professionnel', 'drivers planaires', 'ANC 45dB', 'LDAC', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Pro', colorCode: '#0A0A0A', ean: '6972576183781', stock: 5, images: [] }
    ],
    defaultVariant: 'Noir Pro',
    specifications: [
      { label: 'Drivers', value: '50mm planaires magnétiques', icon: 'speaker' },
      { label: 'ANC', value: '45dB hybride adaptatif', icon: 'noise' },
      { label: 'Fréquences', value: '5Hz - 40kHz', icon: 'frequency' },
      { label: 'Autonomie', value: '50h (ANC) / 80h', icon: 'battery' },
      { label: 'Codecs', value: 'LDAC, aptX HD, AAC', icon: 'codec' },
      { label: 'Bluetooth', value: '5.3 Multipoint', icon: 'bluetooth' },
      { label: 'Charge', value: 'USB-C PD rapide', icon: 'charging' },
      { label: 'Poids', value: '320g', icon: 'weight' }
    ],
    highlights: [
      'Drivers planaires 50mm',
      'ANC pro 45dB',
      '50-80h autonomie',
      'Qualité studio LDAC',
      'Construction premium'
    ],
    images: [
      '/placeholder-hifuture-tourpro-1.jpg',
      '/placeholder-hifuture-tourpro-2.jpg',
      '/placeholder-hifuture-tourpro-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 78,
      distribution: { 5: 70, 4: 6, 3: 1, 2: 1, 1: 0 }
    },
    warranty: '3 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Pro Audio', 'Planaire', 'Studio']
  },

  // HIFUTURE PULSE X
  {
    id: 'hifuture-pulse-x',
    airtableId: 'recRhQM7ksbT5FV3P',
    sku: 'HIFUTURE-PULSEX-SMART',
    name: 'HIFUTURE PULSE X',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    promo: 'SMART TECH',
    description: "La HIFUTURE PULSE X représente l'avant-garde des montres connectées avec son écosystème complet de santé et fitness. Écran AMOLED LTPO de 1.43 pouces avec résolution 466x466 pixels et luminosité 1000 nits pour visibilité parfaite même sous le soleil tropical de La Réunion. Technologie always-on display avec consommation optimisée. Processeur dual-core avec co-processeur dédié pour efficacité énergétique maximale. Suite complète de capteurs biomédicaux : ECG médical pour électrocardiogramme, capteur PPG de 3ème génération pour fréquence cardiaque et variabilité (HRV), oxymètre de pouls clinique, capteur de température cutanée, capteur de stress électrodermique. Analyse avancée du sommeil avec détection des apnées. Plus de 150 modes sportifs avec coaching vocal IA personnalisé. GPS/GLONASS/Galileo/BeiDou pour localisation mondiale précise. Altimètre, baromètre, boussole pour activités outdoor. eSIM intégrée pour appels 4G autonomes sans smartphone. Mémoire 16GB pour musique et apps. Assistant vocal avec IA conversationnelle. Paiement NFC universel. Batterie 500mAh avec autonomie intelligente : 7 jours usage intensif, 14 jours normal, 45 jours économie. Charge sans fil Qi magnétique. Boîtier titane grade 2 avec verre saphir. Étanchéité 10ATM pour plongée. La montre santé ultime pour mode de vie actif.",
    shortDescription: 'Smartwatch médicale AMOLED avec ECG, eSIM 4G et 150+ sports',
    metaTitle: 'HIFUTURE PULSE X - Montre Connectée ECG eSIM 4G | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE PULSE X : ECG médical, eSIM 4G, AMOLED LTPO, 150+ sports, GPS 4 systèmes, NFC. Santé complète La Réunion.',
    urlSlug: 'hifuture-pulse-x-montre-medicale',
    keywords: ['HIFUTURE PULSE X', 'montre ECG', 'smartwatch eSIM', 'montre 4G', 'montre médicale', 'La Réunion', '974'],
    variants: [
      { color: 'Titane', colorCode: '#878681', ean: '6972576184006', stock: 4, images: [] },
      { color: 'Noir Titane', colorCode: '#1C1B1A', ean: '6972576184013', stock: 3, images: [] }
    ],
    defaultVariant: 'Titane',
    specifications: [
      { label: 'Écran', value: '1.43" AMOLED LTPO 466x466', icon: 'display' },
      { label: 'Santé', value: 'ECG, PPG, SpO2, Temp', icon: 'health' },
      { label: 'GPS', value: '4 systèmes (GPS/GLONASS/Galileo/BeiDou)', icon: 'location' },
      { label: 'Connectivité', value: 'eSIM 4G, NFC, WiFi', icon: 'network' },
      { label: 'Modes sport', value: '150+', icon: 'sport' },
      { label: 'Autonomie', value: '7-45 jours', icon: 'battery' },
      { label: 'Étanchéité', value: '10ATM (100m)', icon: 'water' },
      { label: 'Matériaux', value: 'Titane + Saphir', icon: 'material' }
    ],
    highlights: [
      'ECG médical intégré',
      'eSIM 4G autonome',
      'Boîtier titane/saphir',
      '10ATM pour plongée',
      '150+ modes sportifs'
    ],
    images: [
      '/placeholder-hifuture-pulsex-1.jpg',
      '/placeholder-hifuture-pulsex-2.jpg',
      '/placeholder-hifuture-pulsex-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 45,
      distribution: { 5: 41, 4: 3, 3: 1, 2: 0, 1: 0 }
    },
    warranty: '3 ans constructeur',
    deliveryTime: '48-72h à La Réunion',
    badges: ['ECG Medical', 'eSIM 4G', 'Premium']
  },

  // HIFUTURE KIDDO
  {
    id: 'hifuture-kiddo',
    airtableId: 'recTu9Z2QKLxY7oNX',
    sku: 'HIFUTURE-KIDDO-KIDS',
    name: 'HIFUTURE KIDDO',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    promo: 'KIDS SAFE',
    description: "La montre connectée HIFUTURE KIDDO est spécialement conçue pour la sécurité et le bien-être des enfants tout en restant fun et moderne. Écran tactile IPS de 1.4 pouces avec verre renforcé anti-chocs et résolution adaptée pour jeunes yeux. Interface colorée et intuitive avec navigation simplifiée par icônes. Fonction SOS d'urgence : appui 3 secondes pour alerter automatiquement les parents avec localisation GPS. Géolocalisation temps réel GPS + LBS + WiFi pour tracking précis intérieur/extérieur. Zones de sécurité géofence avec alertes immédiates si l'enfant sort du périmètre défini. Appels bidirectionnels avec liste de contacts autorisés par les parents (jusqu'à 10 numéros). Chat vocal avec messages vocaux de 15 secondes. Caméra frontale 0.3MP pour photos et appels vidéo avec famille. Podomètre et encouragements pour activité physique quotidienne. Jeux éducatifs intégrés : maths, mémoire, puzzle. Mode classe silencieux programmable pour heures d'école. Lampe torche LED intégrée pour sécurité. Batterie 750mAh pour 3 jours d'autonomie. Étanchéité IP67 résistante aux éclaboussures et jeux d'eau. Application parentale complète pour contrôle à distance et historique de localisation 30 jours. Bracelet silicone alimentaire hypoallergénique en couleurs vives. La tranquillité d'esprit pour parents et liberté sécurisée pour enfants à La Réunion.",
    shortDescription: 'Montre enfant GPS avec SOS, appels et zones de sécurité géofence',
    metaTitle: 'HIFUTURE KIDDO - Montre Connectée Enfant GPS SOS | Monster Phone 974',
    metaDescription: 'Montre enfant HIFUTURE KIDDO : GPS temps réel, bouton SOS, appels sécurisés, géofence, IP67. Sécurité et fun pour enfants La Réunion.',
    urlSlug: 'hifuture-kiddo-montre-enfant-gps',
    keywords: ['HIFUTURE KIDDO', 'montre enfant', 'montre GPS enfant', 'SOS', 'géofence', 'La Réunion', '974'],
    variants: [
      { color: 'Bleu', colorCode: '#00BFFF', ean: '6972576184228', stock: 12, images: [] },
      { color: 'Rose', colorCode: '#FF69B4', ean: '6972576184235', stock: 10, images: [] },
      { color: 'Vert', colorCode: '#32CD32', ean: '6972576184242', stock: 8, images: [] }
    ],
    defaultVariant: 'Bleu',
    specifications: [
      { label: 'Écran', value: '1.4" IPS tactile', icon: 'display' },
      { label: 'Localisation', value: 'GPS + LBS + WiFi', icon: 'location' },
      { label: 'Communication', value: 'Appels + Chat vocal', icon: 'phone' },
      { label: 'Sécurité', value: 'SOS + Géofence', icon: 'security' },
      { label: 'Caméra', value: '0.3MP frontale', icon: 'camera' },
      { label: 'Étanchéité', value: 'IP67', icon: 'water' },
      { label: 'Autonomie', value: '3 jours', icon: 'battery' },
      { label: 'Âge', value: '4-12 ans', icon: 'age' }
    ],
    highlights: [
      'Bouton SOS urgence',
      'GPS temps réel',
      'Zones sécurité géofence',
      'Appels bidirectionnels',
      'Mode classe silencieux'
    ],
    images: [
      '/placeholder-hifuture-kiddo-1.jpg',
      '/placeholder-hifuture-kiddo-2.jpg',
      '/placeholder-hifuture-kiddo-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 89,
      distribution: { 5: 68, 4: 15, 3: 4, 2: 1, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Enfants', 'GPS Sécurité', 'SOS']
  },

  // HIFUTURE FOCUS
  {
    id: 'hifuture-focus',
    airtableId: 'recXOdBNKL9GfWxRZ',
    sku: 'HIFUTURE-FOCUS-PRO',
    name: 'HIFUTURE FOCUS',
    brand: 'HiFuture',
    category: 'Montres connectées',
    subcategory: 'Sport',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    promo: 'BUSINESS',
    description: "La montre HIFUTURE FOCUS est conçue pour les professionnels actifs recherchant élégance et fonctionnalités business avancées. Écran AMOLED rectangulaire de 1.57 pouces rappelant l'esthétique des montres premium, avec résolution 400x502 pixels pour affichage net des notifications détaillées. Design sophistiqué avec boîtier en acier inoxydable brossé et couronne rotative fonctionnelle pour navigation intuitive. Assistant productivité intégré : gestion calendrier avec rappels intelligents, minuteur Pomodoro pour concentration optimale, dictaphone pour notes vocales instantanées. Notifications enrichies avec réponses rapides prédéfinies et clavier T9. Traduction instantanée 12 langues pour voyageurs d'affaires. Mode présentation désactivant toutes notifications pendant réunions. Analyse du stress professionnel avec exercices de respiration guidée. Suivi d'activité discret adapté au bureau : rappels de mouvement, compteur d'étages, calories. Plus de 80 modes sportifs pour équilibre vie pro/perso. Moniteur de santé 24/7 : cardiaque, SpO2, sommeil avec sieste power nap. Autonomie 7 jours pour semaine de travail complète sans recharge. Charge rapide magnétique 80% en 45 minutes. Étanchéité 3ATM pour usage quotidien. Bracelets interchangeables : cuir, métal, silicone pour adapter au dress code. Application business avec rapports hebdomadaires de productivité et bien-être. La montre connectée élégante pour professionnels modernes à La Réunion.",
    shortDescription: 'Montre business AMOLED avec assistant productivité et design premium',
    metaTitle: 'HIFUTURE FOCUS - Montre Connectée Business Premium | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE FOCUS : AMOLED 1.57", assistant productivité, design acier premium, 80+ sports. Pour professionnels La Réunion.',
    urlSlug: 'hifuture-focus-montre-business',
    keywords: ['HIFUTURE FOCUS', 'montre business', 'smartwatch professionnelle', 'montre élégante', 'productivité', 'La Réunion', '974'],
    variants: [
      { color: 'Noir Business', colorCode: '#1A1A1A', ean: '6972576184457', stock: 10, images: [] },
      { color: 'Argent', colorCode: '#C0C0C0', ean: '6972576184464', stock: 8, images: [] }
    ],
    defaultVariant: 'Noir Business',
    specifications: [
      { label: 'Écran', value: '1.57" AMOLED 400x502', icon: 'display' },
      { label: 'Design', value: 'Acier inoxydable + couronne', icon: 'design' },
      { label: 'Productivité', value: 'Calendrier, Pomodoro, Dictaphone', icon: 'productivity' },
      { label: 'Modes sport', value: '80+', icon: 'sport' },
      { label: 'Autonomie', value: '7 jours', icon: 'battery' },
      { label: 'Charge rapide', value: '80% en 45 min', icon: 'charging' },
      { label: 'Étanchéité', value: '3ATM', icon: 'water' },
      { label: 'Bracelets', value: 'Interchangeables', icon: 'strap' }
    ],
    highlights: [
      'Design business premium',
      'Assistant productivité',
      'AMOLED rectangulaire',
      'Couronne rotative',
      '7 jours autonomie'
    ],
    images: [
      '/placeholder-hifuture-focus-1.jpg',
      '/placeholder-hifuture-focus-2.jpg',
      '/placeholder-hifuture-focus-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 124,
      distribution: { 5: 85, 4: 30, 3: 7, 2: 1, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Business', 'Premium', 'Productivité']
  },

  // ========== PRODUITS MONSTER ==========

  // MONSTER S150 Enceinte Haute Qualité
  {
    id: 'monster-s150',
    airtableId: 'rec6DrhKBYleFXg00',
    sku: 'MONSTER-S150',
    name: 'MONSTER S150 Enceinte Haute Qualité',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Enceintes haut de gamme',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    promo: 'PROMO EXCLUSIVE',
    description: "L'enceinte MONSTER S150 révolutionne votre expérience audio avec une qualité sonore exceptionnelle qui transcende sa catégorie. Cette merveille acoustique intègre des technologies de pointe pour délivrer un son haute fidélité cristallin, transformant chaque écoute en moment d'exception. Les transducteurs haute performance reproduisent fidèlement l'ensemble du spectre audio avec une précision chirurgicale. Les basses profondes et contrôlées créent une base solide sans jamais saturer, même à volume élevé. Les médiums chaleureux restituent parfaitement les voix et instruments acoustiques avec une présence naturelle. Les aigus cristallins révèlent les détails les plus subtils de vos enregistrements favoris. Le système bass-reflex optimisé génère des fréquences graves puissantes et équilibrées. La construction robuste en matériaux premium élimine toute vibration parasite pour une restitution pure. Le design noir élégant s'intègre harmonieusement dans tous les intérieurs modernes. La connectivité universelle assure compatibilité totale avec smartphones, tablettes et ordinateurs. L'amplification de classe D délivre une puissance impressionnante avec efficacité énergétique maximale. Les composants audiophiles sélectionnés garantissent une durabilité exceptionnelle. Le volume puissant remplit facilement grandes pièces et espaces ouverts. Parfaite pour mélomanes exigeants de La Réunion recherchant excellence audio accessible.",
    shortDescription: 'Enceinte haute fidélité avec basses profondes et volume puissant pour audiophiles',
    metaTitle: 'MONSTER S150 - Enceinte Haute Fidélité Premium | Monster Phone 974',
    metaDescription: 'Enceinte MONSTER S150 haute qualité avec son cristallin, basses profondes, volume puissant. Design noir élégant, connectivité universelle. Excellence audio accessible La Réunion 974.',
    urlSlug: 'monster-s150-enceinte-haute-qualite',
    keywords: ['MONSTER S150', 'enceinte haute qualité', 'audio premium', 'basses profondes', 'design noir', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '34020002410016', stock: 20, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Puissance', value: '50W RMS', icon: 'speaker' },
      { label: 'Réponse', value: '40Hz-20kHz', icon: 'wave' },
      { label: 'Connectivité', value: 'Bluetooth 5.0 + AUX', icon: 'bluetooth' },
      { label: 'Batterie', value: '5000mAh', icon: 'battery' },
      { label: 'Autonomie', value: '12 heures', icon: 'clock' },
      { label: 'Drivers', value: '2x Woofer + 2x Tweeter', icon: 'speaker' },
      { label: 'Dimensions', value: '220 x 120 x 150mm', icon: 'size' },
      { label: 'Poids', value: '1.8 kg', icon: 'weight' }
    ],
    highlights: [
      'Qualité audio haute fidélité',
      'Basses profondes sans distorsion',
      'Volume puissant 50W',
      'Design premium élégant',
      'Connectivité universelle'
    ],
    images: [
      '/placeholder-monster-s150-1.jpg',
      '/placeholder-monster-s150-2.jpg',
      '/placeholder-monster-s150-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.8,
      count: 245,
      distribution: { 5: 180, 4: 50, 3: 10, 2: 3, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'Haute Fidélité', 'Best-Seller']
  },

  // MONSTER Champion Airlinks Casque Gaming Sans Fil
  {
    id: 'monster-champion-airlinks',
    airtableId: 'rec1HvuCL9MKEo6Wo',
    sku: 'MONSTER-CHAMPION-AIRLINKS',
    name: 'MONSTER Champion Airlinks Casque Gaming Sans Fil',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques gaming',
    price: 139.99,
    originalPrice: 179.99,
    discount: 22,
    promo: 'OFFRE GAMING',
    description: "Le casque gaming MONSTER Champion Airlinks établit de nouveaux standards pour l'audio gaming professionnel. Cette référence absolue combine technologie Airlinks exclusive et architecture acoustique révolutionnaire pour une expérience gaming immersive incomparable. La connexion Bluetooth ultra-stable élimine totalement latence et interruptions grâce à la technologie propriétaire Airlinks. Les transducteurs haute définition 50mm délivrent un son spatial 3D précis pour localisation parfaite des ennemis. Les basses percutantes amplifient l'impact des explosions et effets sonores. Les médiums équilibrés préservent clarté des dialogues et communications. Les aigus détaillés révèlent indices sonores cruciaux pour avantage compétitif. Le microphone antibruit détachable capture votre voix avec clarté cristalline. La suppression active du bruit environnant garantit communications parfaites en équipe. Les coussinets mousse mémoire offrent confort exceptionnel pendant sessions marathon. L'arceau ajustable rembourré répartit parfaitement le poids. L'autonomie 30 heures accompagne vos sessions gaming les plus intenses. La charge rapide USB-C restaure 5 heures en 15 minutes. Les commandes intuitives permettent ajustements instantanés sans quitter le jeu. La construction robuste résiste aux utilisations intensives. Compatible PC, consoles et mobiles pour polyvalence totale. Le choix des gamers professionnels de La Réunion.",
    shortDescription: 'Casque gaming sans fil pro avec technologie Airlinks et son spatial 3D immersif',
    metaTitle: 'MONSTER Champion Airlinks - Casque Gaming Pro Sans Fil | Monster Phone 974',
    metaDescription: 'Casque gaming MONSTER Champion Airlinks avec technologie exclusive, son 3D spatial, micro antibruit. Autonomie 30h, confort premium. Pour gamers exigeants La Réunion 974.',
    urlSlug: 'monster-champion-airlinks-casque-gaming',
    keywords: ['MONSTER Champion', 'Airlinks', 'casque gaming', 'sans fil', 'audio 3D', 'gaming pro', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '0810079000000', stock: 15, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Drivers', value: '50mm Néodyme', icon: 'speaker' },
      { label: 'Réponse', value: '20Hz-40kHz', icon: 'wave' },
      { label: 'Connectivité', value: 'Bluetooth 5.2 Airlinks', icon: 'bluetooth' },
      { label: 'Autonomie', value: '30 heures', icon: 'battery' },
      { label: 'Charge rapide', value: '15min = 5h', icon: 'charging' },
      { label: 'Microphone', value: 'Détachable antibruit', icon: 'mic' },
      { label: 'Portée', value: '15 mètres', icon: 'signal' },
      { label: 'Poids', value: '280g', icon: 'weight' }
    ],
    highlights: [
      'Technologie Airlinks exclusive',
      'Son spatial 3D immersif',
      'Microphone gaming antibruit',
      '30 heures d\'autonomie',
      'Confort mousse mémoire'
    ],
    images: [
      '/placeholder-monster-champion-1.jpg',
      '/placeholder-monster-champion-2.jpg',
      '/placeholder-monster-champion-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 412,
      distribution: { 5: 350, 4: 50, 3: 8, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Gaming Pro', 'Technologie Exclusive', 'Champion']
  },

  // MONSTER TH300 Tactile Casque Gaming Haptique
  {
    id: 'monster-th300-tactile',
    airtableId: 'rec7hJaDKr7rryd9i',
    sku: 'MONSTER-TH300',
    name: 'MONSTER TH300 Tactile Casque Gaming Haptique',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques gaming',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    promo: 'INNOVATION',
    description: "Le casque MONSTER TH300 Tactile révolutionne l'expérience gaming avec technologie haptique révolutionnaire qui transforme le son en sensations physiques. Cette innovation unique vous permet de ressentir littéralement chaque explosion, impact et vibration pour immersion totale inédite. Les transducteurs haptiques brevetés convertissent basses fréquences en vibrations tactiles calibrées. Chaque coup de feu, explosion ou effet sonore devient sensation physique synchronisée. L'intensité haptique ajustable s'adapte à vos préférences personnelles. Le son premium avec spatialisation 3D crée environnement sonore tridimensionnel précis. Les drivers 40mm haute définition délivrent audio gaming cristallin. Les basses profondes amplifiées enrichissent l'expérience tactile. Les médiums clairs préservent dialogues et communications d'équipe. Les aigus détaillés révèlent indices sonores stratégiques. Les coussinets ergonomiques en mousse mémoire garantissent confort longue durée. L'arceau ajustable auto-adaptatif épouse parfaitement morphologie crânienne. Le design moderne disponible en noir discret ou blanc futuriste. La connexion jack 3.5mm universelle assure compatibilité totale. Compatible PC, PlayStation, Xbox, Switch et smartphones. Le poids plume 250g permet port prolongé sans fatigue. Innovation gaming accessible aux passionnés de La Réunion.",
    shortDescription: 'Casque gaming avec technologie haptique révolutionnaire et retour tactile immersif',
    metaTitle: 'MONSTER TH300 Tactile - Casque Gaming Haptique | Monster Phone 974',
    metaDescription: 'Casque gaming MONSTER TH300 avec technologie haptique unique, vibrations synchronisées, son 3D. Confort ergonomique, compatible toutes plateformes. Innovation La Réunion 974.',
    urlSlug: 'monster-th300-tactile-casque-gaming',
    keywords: ['MONSTER TH300', 'casque tactile', 'gaming haptique', 'retour tactile', 'vibrations', 'immersion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '0810079710546', stock: 25, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '0810079710553', stock: 20, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Drivers', value: '40mm + Haptique', icon: 'speaker' },
      { label: 'Technologie', value: 'Retour haptique', icon: 'vibration' },
      { label: 'Réponse', value: '20Hz-20kHz', icon: 'wave' },
      { label: 'Connectivité', value: 'Jack 3.5mm', icon: 'cable' },
      { label: 'Impédance', value: '32 Ohms', icon: 'resistance' },
      { label: 'Sensibilité', value: '110dB', icon: 'volume' },
      { label: 'Câble', value: '1.5m tressé', icon: 'cable' },
      { label: 'Poids', value: '250g', icon: 'weight' }
    ],
    highlights: [
      'Technologie haptique exclusive',
      'Vibrations tactiles synchronisées',
      'Son spatial 3D immersif',
      'Compatible toutes plateformes',
      'Ultra léger 250g'
    ],
    images: [
      '/placeholder-monster-th300-1.jpg',
      '/placeholder-monster-th300-2.jpg',
      '/placeholder-monster-th300-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 189,
      distribution: { 5: 130, 4: 40, 3: 15, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Innovation', 'Haptique', 'Immersion Totale']
  },

  // MONSTER DNA FIT Casque Sport Premium
  {
    id: 'monster-dna-fit',
    airtableId: 'rec8OTzIaj5Se2xDK',
    sku: 'MONSTER-DNA-FIT',
    name: 'MONSTER DNA FIT Casque Sport Premium',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques sport',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    promo: 'FITNESS PRO',
    description: "Le casque sport MONSTER DNA FIT représente l'excellence absolue pour athlètes exigeants. Conçu spécifiquement pour résister aux entraînements les plus intenses tout en délivrant performance audio exceptionnelle qui booste vos performances. La certification IPX7 garantit résistance totale à transpiration et pluie. Construction militaire résiste chocs, vibrations et conditions extrêmes. Les coussinets antibactériens éliminent 99% des bactéries et odeurs. Le traitement antimicrobien maintient hygiène parfaite même après usage intensif. Le système de maintien breveté assure stabilité parfaite pendant mouvements dynamiques. Les crochets d'oreille flexibles s'adaptent morphologie individuelle. L'audio haute définition avec signature DNA délivre basses puissantes motivantes. L'égalisation sport optimisée amplifie rythmes énergisants. Les médiums clairs préservent voix coach et instructions. Les aigus cristallins maintiennent clarté même à volume élevé. L'autonomie 15 heures accompagne marathons d'entraînement. La charge rapide restaure 3 heures en 10 minutes. Le microphone intégré permet appels mains libres pendant exercice. Les commandes tactiles permettent contrôle sans interrompre effort. Le design noir/rouge dynamique reflète esprit sportif. Parfait pour sportifs passionnés de La Réunion cherchant excellence.",
    shortDescription: 'Casque sport IPX7 avec coussinets antibactériens et audio HD motivant pour athlètes',
    metaTitle: 'MONSTER DNA FIT - Casque Sport Premium IPX7 | Monster Phone 974',
    metaDescription: 'Casque sport MONSTER DNA FIT résistant IPX7, coussinets antibactériens, audio HD énergisant. Maintien parfait, 15h autonomie. Pour athlètes exigeants La Réunion 974.',
    urlSlug: 'monster-dna-fit-casque-sport',
    keywords: ['MONSTER DNA FIT', 'casque sport', 'IPX7', 'antibactérien', 'fitness', 'audio HD', 'La Réunion'],
    variants: [
      { color: 'Noir/Rouge', colorCode: '#FF0000', ean: '0810079000001', stock: 18, images: [] }
    ],
    defaultVariant: 'Noir/Rouge',
    specifications: [
      { label: 'Résistance', value: 'IPX7', icon: 'water' },
      { label: 'Drivers', value: '45mm HD', icon: 'speaker' },
      { label: 'Autonomie', value: '15 heures', icon: 'battery' },
      { label: 'Charge rapide', value: '10min = 3h', icon: 'charging' },
      { label: 'Bluetooth', value: '5.1 aptX', icon: 'bluetooth' },
      { label: 'Coussinets', value: 'Antibactériens', icon: 'shield' },
      { label: 'Portée', value: '20 mètres', icon: 'signal' },
      { label: 'Poids', value: '220g', icon: 'weight' }
    ],
    highlights: [
      'Certification IPX7 totale',
      'Coussinets antibactériens 99%',
      'Maintien sport breveté',
      'Audio HD signature DNA',
      '15 heures d\'autonomie'
    ],
    images: [
      '/placeholder-monster-dna-1.jpg',
      '/placeholder-monster-dna-2.jpg',
      '/placeholder-monster-dna-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.8,
      count: 567,
      distribution: { 5: 420, 4: 100, 3: 35, 2: 10, 1: 2 }
    },
    warranty: '3 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Sport Pro', 'IPX7', 'Antibactérien']
  },

  // MONSTER N-Lite 203 Batterie Portable Premium
  {
    id: 'monster-n-lite-203',
    airtableId: 'recGd8KAwQRBrNx9G',
    sku: 'MONSTER-N-LITE-203',
    name: 'MONSTER N-Lite 203 Batterie Portable Premium 20000mAh',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Batteries externes',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    promo: 'MEGA PROMO',
    description: "La batterie portable MONSTER N-Lite 203 incarne l'excellence en matière d'autonomie mobile avec capacité monumentale 20000mAh. Cette centrale énergétique ultra-compacte élimine définitivement l'anxiété de batterie faible pour utilisateurs intensifs. La capacité 20000mAh permet recharger smartphone 4-6 fois, tablette 2-3 fois ou console portable plusieurs fois. Technologie charge rapide bidirectionnelle 22.5W révolutionne gestion énergie mobile. Vos appareils se rechargent vitesse maximale grâce protocoles QC3.0 et PD compatibles. La batterie elle-même se recharge complètement en seulement 4 heures. Le design compact défie conventions en intégrant capacité massive format poche. Construction aluminium premium dissipe chaleur et garantit durabilité. Deux finitions luxueuses disponibles : noir professionnel ou gold exclusif. Triple sortie permet charger 3 appareils simultanément sans compromis vitesse. Ports USB-A et USB-C supportent tous standards charge moderne. L'écran LED intelligent affiche précisément niveau batterie restant. Protections multiples garantissent sécurité totale : surcharge, surchauffe, court-circuit. Certification aérienne permet transport avion sans restriction. Compatible universellement avec tous smartphones, tablettes et accessoires USB. Solution idéale pour professionnels mobiles et voyageurs de La Réunion.",
    shortDescription: 'Batterie 20000mAh ultra-compacte avec charge rapide 22.5W et triple sortie simultanée',
    metaTitle: 'MONSTER N-Lite 203 - Batterie Portable 20000mAh Premium | Monster Phone 974',
    metaDescription: 'Batterie portable MONSTER N-Lite 203 20000mAh, charge rapide 22.5W bidirectionnelle, triple sortie. Design compact premium noir ou gold. Autonomie ultime La Réunion 974.',
    urlSlug: 'monster-n-lite-203-batterie-portable',
    keywords: ['MONSTER N-Lite 203', 'batterie portable', '20000mAh', 'charge rapide', 'powerbank', 'gold', 'noir'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '0810079707034', stock: 30, images: [] },
      { color: 'Gold', colorCode: '#FFD700', ean: '0810079707041', stock: 25, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Capacité', value: '20000mAh', icon: 'battery' },
      { label: 'Charge rapide', value: '22.5W PD/QC3.0', icon: 'charging' },
      { label: 'Sorties', value: '2x USB-A + 1x USB-C', icon: 'ports' },
      { label: 'Entrée', value: 'USB-C 18W', icon: 'input' },
      { label: 'Temps charge', value: '4 heures', icon: 'clock' },
      { label: 'Affichage', value: 'LED intelligent', icon: 'display' },
      { label: 'Dimensions', value: '145x68x28mm', icon: 'size' },
      { label: 'Poids', value: '380g', icon: 'weight' }
    ],
    highlights: [
      'Capacité massive 20000mAh',
      'Charge rapide 22.5W',
      'Triple sortie simultanée',
      'Design ultra-compact',
      'Certifié transport aérien'
    ],
    images: [
      '/placeholder-monster-nlite-1.jpg',
      '/placeholder-monster-nlite-2.jpg',
      '/placeholder-monster-nlite-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 892,
      distribution: { 5: 750, 4: 100, 3: 30, 2: 10, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Best-Seller', 'Charge Rapide', '20000mAh']
  },

  // MONSTER Illuminescence Basic Multicouleur LED Strip
  {
    id: 'monster-illuminescence-basic-multi',
    airtableId: 'rec7wbSuicbXDNlQd',
    sku: 'MON-ILL-BASIC-MULTI',
    name: 'MONSTER Illuminescence Basic Lightstrip Multicouleur',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 13.99,
    originalPrice: 19.99,
    discount: 30,
    promo: 'PROMO LED',
    description: "Le bandeau LED MONSTER Illuminescence Basic transforme instantanément votre espace avec éclairage RGB personnalisable infini. Cette solution versatile crée ambiances uniques adaptées chaque moment vie. Technologie RGB déploie millions couleurs pour atmosphères sur-mesure. Des teintes chaudes relaxantes aux couleurs vives festives, palette illimitée. Disponible 3 longueurs : 2m espaces compacts, 4m installations moyennes, 5m grandes surfaces. Installation révolutionnaire avec adhésif 3M industriel fixation durable toutes surfaces. Aucun perçage, câblage complexe ou compétence technique requise. Alimentation USB universelle compatible tous ports standards. Parfait éclairage bureau gaming, rétro-éclairage TV, décoration chambre. Crée ambiances cinéma immersives ou atmosphères festives soirées. LED haute efficacité consomment minimum énergie durée vie exceptionnelle. Luminosité constante sans dégradation après années utilisation. Résistance variations température garantit performance stable. Flexible épouse contours, contourne obstacles, suit formes complexes. Coupable tous 5cm pour ajustement parfait dimensions. Contrôleur inclus permet sélection couleurs et modes dynamiques. Solution idéale moderniser intérieur avec créativité accessible La Réunion.",
    shortDescription: 'Bandeau LED RGB multicouleur avec installation adhésive facile et alimentation USB',
    metaTitle: 'MONSTER Illuminescence Basic - Bandeau LED Gaming RGB | Monster Phone 974',
    metaDescription: 'Bandeau LED MONSTER Illuminescence RGB multicouleur. 3 longueurs disponibles, installation adhésive 3M, alimentation USB. Éclairage gaming créatif La Réunion 974.',
    urlSlug: 'monster-illuminescence-basic-multicouleur',
    keywords: ['MONSTER Illuminescence', 'bandeau LED', 'RGB', 'gaming', 'éclairage', 'multicouleur', '974'],
    variants: [
      { color: '2m', colorCode: '#FF00FF', ean: 'MONSTER-ILLUMIN-2M-MULTI', stock: 50, images: [] },
      { color: '4m', colorCode: '#FF00FF', ean: 'MLB7-2083-WW', stock: 40, images: [] },
      { color: '5m', colorCode: '#FF00FF', ean: 'MLB7-1037-WW', stock: 35, images: [] }
    ],
    defaultVariant: '2m',
    specifications: [
      { label: 'Type', value: 'LED RGB', icon: 'led' },
      { label: 'Longueurs', value: '2m/4m/5m', icon: 'ruler' },
      { label: 'Alimentation', value: 'USB 5V', icon: 'power' },
      { label: 'LED/mètre', value: '30 LED', icon: 'density' },
      { label: 'Adhésif', value: '3M industriel', icon: 'adhesive' },
      { label: 'Coupable', value: 'Tous les 5cm', icon: 'cut' },
      { label: 'Angle', value: '120°', icon: 'angle' },
      { label: 'Durée vie', value: '50000 heures', icon: 'time' }
    ],
    highlights: [
      'RGB millions de couleurs',
      'Installation adhésive facile',
      'Alimentation USB universelle',
      '3 longueurs disponibles',
      'Coupable et flexible'
    ],
    images: [
      '/placeholder-monster-led-basic-1.jpg',
      '/placeholder-monster-led-basic-2.jpg',
      '/placeholder-monster-led-basic-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 456,
      distribution: { 5: 300, 4: 100, 3: 40, 2: 10, 1: 6 }
    },
    warranty: '1 an constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['RGB', 'Gaming', 'Facile']
  },

  // MONSTER Illuminescence Color/Blanc LED Strip
  {
    id: 'monster-illuminescence-color-blanc',
    airtableId: 'rec0VY3SGruynYI6V',
    sku: 'MON-ILL-COLOR-BLANC',
    name: 'MONSTER Illuminescence Light Strip Color/Blanc',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 17.99,
    originalPrice: 24.99,
    discount: 28,
    promo: 'DOUBLE MODE',
    description: "Le bandeau LED MONSTER Illuminescence Color/Blanc révolutionne éclairage avec double technologie RGB multicouleur et blanc chaud. Cette polyvalence unique permet créer ambiances festives colorées ou éclairage fonctionnel optimal selon besoins. Mode RGB transforme espace avec palette infinie teintes vibrantes. Créez atmosphères personnalisées pour gaming, soirées, relaxation. Mode blanc chaud apporte lumière douce naturelle idéale travail lecture. Température couleur 3000K réduit fatigue oculaire sessions prolongées. Basculez instantanément entre modes selon activité moment. Installation 2 mètres parfaite bureau, étagères, contour écran. Adhésif 3M haute qualité garantit fixation permanente propre. Alimentation USB compatible chargeurs, PC, batteries portables. Flexibilité permet suivre contours, angles, formes complexes. LED haute efficacité 5050 offrent luminosité exceptionnelle. Consommation optimisée pour impact minimal facture électrique. Durée vie 50000 heures garantit investissement durable. Contrôleur intelligent mémorise derniers réglages utilisés. Idéal espaces polyvalents nécessitant éclairage adaptatif. Solution parfaite habitants La Réunion cherchant versatilité maximale.",
    shortDescription: 'Bandeau LED double mode RGB multicouleur + blanc chaud pour polyvalence totale',
    metaTitle: 'MONSTER Illuminescence Color/Blanc - LED Gaming Polyvalent | Monster Phone 974',
    metaDescription: 'Bandeau LED MONSTER 2m double technologie RGB + blanc chaud. Installation USB facile, éclairage gaming et travail. Polyvalence maximale La Réunion 974.',
    urlSlug: 'monster-illuminescence-color-blanc',
    keywords: ['MONSTER LED', 'double mode', 'RGB blanc', 'éclairage polyvalent', 'gaming travail', 'La Réunion'],
    variants: [
      { color: '2m', colorCode: '#FFFF00', ean: 'MONSTER-ILLUMIN-2M-COLOR-BLANC', stock: 45, images: [] }
    ],
    defaultVariant: '2m',
    specifications: [
      { label: 'Modes', value: 'RGB + Blanc chaud', icon: 'modes' },
      { label: 'Longueur', value: '2 mètres', icon: 'ruler' },
      { label: 'Température', value: '3000K blanc', icon: 'temperature' },
      { label: 'LED type', value: '5050 SMD', icon: 'led' },
      { label: 'Alimentation', value: 'USB 5V 2A', icon: 'power' },
      { label: 'Luminosité', value: '800 lumens', icon: 'brightness' },
      { label: 'Angle', value: '120°', icon: 'angle' },
      { label: 'Durée vie', value: '50000h', icon: 'time' }
    ],
    highlights: [
      'Double mode RGB + Blanc',
      'Polyvalence gaming/travail',
      'Blanc chaud 3000K',
      'Installation USB simple',
      'Mémoire derniers réglages'
    ],
    images: [
      '/placeholder-monster-color-blanc-1.jpg',
      '/placeholder-monster-color-blanc-2.jpg',
      '/placeholder-monster-color-blanc-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 234,
      distribution: { 5: 170, 4: 45, 3: 15, 2: 3, 1: 1 }
    },
    warranty: '1 an constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Double Mode', 'Polyvalent', 'Gaming/Travail']
  },

  // MONSTER Illuminescence Neon Light Strip
  {
    id: 'monster-illuminescence-neon',
    airtableId: 'recEcGwHOWKkD144U',
    sku: 'MON-ILL-NEON',
    name: 'MONSTER Illuminescence Neon Light Strip',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 26.99,
    originalPrice: 39.99,
    discount: 33,
    promo: 'EFFET NÉON',
    description: "Le bandeau MONSTER Illuminescence Neon reproduit effet néon emblématique avec technologie LED moderne révolutionnaire. Cette innovation fusionne charme rétro-futuriste néon traditionnel avec efficacité LED contemporaine. Effet néon continu élimine points lumineux individuels créant ligne lumière homogène. Technologie diffusion avancée produit halo doux enveloppant signature néon authentique. Design cyberpunk transforme intérieur en espace branché métropole nocturne. Esthétique futuriste évoque univers science-fiction et gaming moderne. Polyvalence intérieur/extérieur avec construction étanche résistante. Illuminez terrasses, jardins, façades ou espaces intérieurs même efficacité. Version Basic 2m réactivité sonore transforme musique spectacle pulsant. Version Smart 5m contrôle WiFi complet personnalisation smartphone. Version Smart Flow 5m effets flux programmables animations hypnotiques. Réactivité sonore analyse fréquences temps réel synchronisation parfaite. Basses déclenchent pulsations intenses, aigus génèrent scintillements. Contrôle WiFi permet programmation horaires, scènes personnalisées. Compatible assistants vocaux pour contrôle mains libres. Installation flexible suit contours architecturaux complexes. Solution créative habitants La Réunion passionnés design futuriste.",
    shortDescription: 'Bandeau LED effet néon continu avec versions sonore et WiFi pour ambiance futuriste',
    metaTitle: 'MONSTER Illuminescence Neon - LED Néon Gaming Cyberpunk | Monster Phone 974',
    metaDescription: 'Bandeau LED Néon MONSTER effet continu futuriste. Versions Basic sonore et Smart WiFi. Design cyberpunk intérieur/extérieur La Réunion 974.',
    urlSlug: 'monster-illuminescence-neon-strip',
    keywords: ['MONSTER Neon', 'LED néon', 'cyberpunk', 'gaming futuriste', 'effet continu', 'WiFi', '974'],
    variants: [
      { color: '2m Basic Sound', colorCode: '#00FFFF', ean: 'MLB7-2044-WW', stock: 30, images: [] },
      { color: '5m Smart', colorCode: '#00FFFF', ean: 'MONSTER-ILLUMIN-NEON-5M', stock: 25, images: [] },
      { color: '5m Smart Flow', colorCode: '#00FFFF', ean: 'MLB7-1063-WW', stock: 20, images: [] }
    ],
    defaultVariant: '2m Basic Sound',
    specifications: [
      { label: 'Effet', value: 'Néon continu', icon: 'neon' },
      { label: 'Versions', value: '2m/5m/5m Flow', icon: 'versions' },
      { label: 'Usage', value: 'Int/Ext IP65', icon: 'environment' },
      { label: 'Contrôle', value: 'Son/WiFi/Flow', icon: 'control' },
      { label: 'Diffusion', value: '360° uniforme', icon: 'light' },
      { label: 'Matière', value: 'Silicone flexible', icon: 'material' },
      { label: 'Température', value: '-20°C à 50°C', icon: 'temperature' },
      { label: 'Durée vie', value: '50000h', icon: 'time' }
    ],
    highlights: [
      'Effet néon authentique',
      'Design cyberpunk futuriste',
      'Intérieur/Extérieur IP65',
      'Versions sonore et WiFi',
      'Diffusion lumière uniforme'
    ],
    images: [
      '/placeholder-monster-neon-1.jpg',
      '/placeholder-monster-neon-2.jpg',
      '/placeholder-monster-neon-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.8,
      count: 167,
      distribution: { 5: 125, 4: 30, 3: 8, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Néon', 'Cyberpunk', 'Smart']
  },

  // MONSTER Illuminescence Smart Chroma 2X Bars
  {
    id: 'monster-chroma-2x-bars',
    airtableId: 'recAut9IIFOAJocjm',
    sku: 'MON-ILL-CHROMA-2X',
    name: 'MONSTER Illuminescence Smart Chroma Light 2X Bars',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    promo: 'PACK PRO',
    description: "Le pack MONSTER Chroma Light 2X Bars révolutionne éclairage intelligent avec système double barres LED technologie RGB IC avancée. Cette solution connectée transforme environnement en spectacle lumineux époustouflant possibilités créatives illimitées. Technologie RGB IC permet contrôle individuel chaque LED créant effets complexes. Motifs fluides, dégradés parfaits, animations synchronisées transforment murs œuvres vivantes. Contrôle WiFi smartphone via application intuitive personnalisation totale. Ajustez couleurs, intensité, vitesse, programmation, scènes personnalisées instantanément. Synchronisation musicale transforme espace salle spectacle privée. Barres réagissent temps réel rythmes fréquences show chorégraphié. Installation modulaire flexible s'adapte toutes configurations spatiales. Positionnez verticalement encadrer écran, horizontalement illuminer mur. Compatible assistants vocaux Alexa Google contrôle vocal futuriste. Changez couleurs, activez scènes, éteignez lumières commande vocale. LED haute efficacité milliers heures fonctionnement constant. Dissipation thermique optimisée préserve longévité composants. Consommation énergétique remarquable effets spectaculaires minimal impact. Idéal passionnés technologie design habitants La Réunion cherchant innovation.",
    shortDescription: 'Pack 2 barres LED RGB IC WiFi avec synchronisation musicale et contrôle vocal',
    metaTitle: 'MONSTER Chroma 2X Bars - Pack LED Gaming Pro WiFi | Monster Phone 974',
    metaDescription: 'Pack 2 barres LED MONSTER Chroma RGB IC intelligent. Contrôle WiFi, sync musicale, Alexa/Google. Éclairage connecté pro La Réunion 974.',
    urlSlug: 'monster-chroma-2x-bars-smart',
    keywords: ['MONSTER Chroma', '2X bars', 'RGB IC', 'WiFi', 'gaming pro', 'sync musicale', '974'],
    variants: [
      { color: 'Pack 2X RGB IC', colorCode: '#FF00FF', ean: 'MLB7-2024-WW', stock: 15, images: [] }
    ],
    defaultVariant: 'Pack 2X RGB IC',
    specifications: [
      { label: 'Technologie', value: 'RGB IC intelligent', icon: 'chip' },
      { label: 'Contenu', value: '2 barres LED', icon: 'package' },
      { label: 'Contrôle', value: 'WiFi + App', icon: 'wifi' },
      { label: 'Sync', value: 'Musicale temps réel', icon: 'music' },
      { label: 'Assistants', value: 'Alexa/Google', icon: 'voice' },
      { label: 'Effets', value: '50+ prédéfinis', icon: 'effects' },
      { label: 'Dimensions', value: '30cm/barre', icon: 'size' },
      { label: 'Installation', value: 'Modulaire', icon: 'modular' }
    ],
    highlights: [
      'RGB IC contrôle pixel',
      'WiFi + App smartphone',
      'Synchronisation musicale',
      'Compatible Alexa/Google',
      'Installation modulaire'
    ],
    images: [
      '/placeholder-monster-chroma-1.jpg',
      '/placeholder-monster-chroma-2.jpg',
      '/placeholder-monster-chroma-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 89,
      distribution: { 5: 75, 4: 10, 3: 3, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Smart Home', 'RGB IC', 'Pro Gaming']
  },

  // MONSTER Illuminescence Basic 30M RGB Mega Strip
  {
    id: 'monster-basic-30m-rgb',
    airtableId: 'recHLpyKOr0VqccwD',
    sku: 'MON-ILL-BASIC-30M',
    name: 'MONSTER Illuminescence Basic Light Strip 30M RGB',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 74.99,
    originalPrice: 119.99,
    discount: 38,
    promo: 'MÉGA PACK',
    description: "Le méga bandeau MONSTER Illuminescence 30M RGB représente solution ultime installations envergure nécessitant couverture lumineuse complète spectaculaire. Cette longueur monumentale 30 mètres offre possibilités véritablement illimitées projets ambitieux. Illuminez intégralité grande pièce, créez chemins lumineux continus plusieurs espaces. Encadrez structures architecturales complètes, réalisez installations artistiques envergure. Technologie RGB déploie spectre infini couleurs vibrantes transformant atmosphère. Ambiances chaleureuses accueillantes aux effets dynamiques énergisants parfaits. Éclairage grands espaces calibré pour surfaces importantes uniformité totale. Salons spacieux, lofts, espaces commerciaux, salles réception parfaitement illuminés. Couleurs RGB immersives enveloppent environnement atmosphère lumineuse totale. Immersion chromatique transforme perception espace effets profondeur spectaculaires. Installation professionnelle avec planification minutieuse reste accessible adhésif continu. Flexibilité permet suivre contours architecturaux, contourner obstacles créer motifs. LED haute efficacité maintiennent luminosité fidélité chromatique années. Consommation optimisée reste raisonnable malgré longueur technologie dernière génération. Solution idéale projets envergure La Réunion nécessitant transformation radicale espaces.",
    shortDescription: 'Méga bandeau LED 30 mètres RGB pour installations complètes grands espaces',
    metaTitle: 'MONSTER LED 30M RGB - Méga Installation Gaming Complète | Monster Phone 974',
    metaDescription: 'Méga bandeau LED MONSTER 30m RGB installations complètes. Éclairage grands espaces, couverture totale. Solution pro projets envergure La Réunion 974.',
    urlSlug: 'monster-basic-30m-rgb-mega',
    keywords: ['MONSTER 30M', 'méga LED', 'RGB', 'grands espaces', 'installation complète', 'pro', '974'],
    variants: [
      { color: '30m', colorCode: '#FF00FF', ean: 'MLB7-2100-WW', stock: 10, images: [] }
    ],
    defaultVariant: '30m',
    specifications: [
      { label: 'Longueur', value: '30 mètres', icon: 'ruler' },
      { label: 'LED totales', value: '900 LED', icon: 'led' },
      { label: 'Puissance', value: '150W max', icon: 'power' },
      { label: 'Sections', value: '6x5m reliées', icon: 'sections' },
      { label: 'Alimentation', value: '220V adaptateur', icon: 'plug' },
      { label: 'Luminosité', value: '12000 lumens', icon: 'brightness' },
      { label: 'Coupable', value: 'Tous les 10cm', icon: 'cut' },
      { label: 'Durée vie', value: '50000h', icon: 'time' }
    ],
    highlights: [
      'Longueur monumentale 30m',
      'RGB millions couleurs',
      'Grands espaces complets',
      'Installation professionnelle',
      'Luminosité 12000 lumens'
    ],
    images: [
      '/placeholder-monster-30m-1.jpg',
      '/placeholder-monster-30m-2.jpg',
      '/placeholder-monster-30m-3.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 78,
      distribution: { 5: 55, 4: 15, 3: 5, 2: 2, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Méga Pack', '30 Mètres', 'Pro Installation']
  },

  // ========== 24 PRODUITS MONSTER MANQUANTS ==========

  // ===== CÂBLES ET CONNECTEURS (6 produits) =====
  
  // Monster Câble HDMI Ultra HD 4K
  {
    id: 'monster-cable-hdmi-ultra',
    airtableId: 'recMONSTERHDMI001',
    sku: 'MONSTER-HDMI-ULTRA',
    name: 'MONSTER Câble HDMI Ultra HD 4K 2M',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    promo: 'QUALITÉ PRO',
    description: "Le câble HDMI Monster Ultra HD 4K représente l'excellence en matière de transmission vidéo et audio numérique. Conçu pour les professionnels et les passionnés de home cinéma, ce câble haute performance garantit une transmission sans perte du signal 4K Ultra HD à 60Hz. La construction premium avec conducteurs en cuivre pur et triple blindage élimine toute interférence électromagnétique. Support complet HDR10, Dolby Vision et HLG pour des images aux couleurs éclatantes et contrastes saisissants. Compatible HDMI 2.1 avec bande passante 48Gbps pour gaming 4K@120Hz ou 8K@60Hz. Transmission audio multicanal Dolby Atmos et DTS:X sans compression. Connecteurs plaqués or 24K résistants à la corrosion pour connexion durable. Gaine tressée en nylon ultra-résistante protège contre l'usure quotidienne. Support eARC pour retour audio amélioré vers barres de son et amplis. Certification Premium High Speed HDMI garantit performances optimales. Longueur 2 mètres idéale pour installations home cinéma. Compatible avec toutes consoles gaming PS5, Xbox Series X, PC gaming.",
    shortDescription: 'Câble HDMI 2.1 premium 4K@120Hz HDR avec connecteurs plaqués or',
    metaTitle: 'MONSTER Câble HDMI Ultra HD 4K 2M - Gaming & Home Cinéma | Monster Phone 974',
    metaDescription: 'Câble HDMI Monster Ultra HD 4K 2M premium. Support 4K@120Hz, 8K@60Hz, HDR, Dolby Vision. Connecteurs plaqués or, triple blindage. Idéal gaming PS5 Xbox La Réunion.',
    urlSlug: 'monster-cable-hdmi-ultra-4k-2m',
    keywords: ['câble HDMI 4K', 'Monster HDMI', 'HDMI 2.1', 'gaming', 'PS5', 'Xbox', '8K', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000HDMI001', stock: 45, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Version HDMI', value: '2.1', icon: 'version' },
      { label: 'Résolution Max', value: '8K@60Hz / 4K@120Hz', icon: 'display' },
      { label: 'Bande passante', value: '48 Gbps', icon: 'speed' },
      { label: 'Longueur', value: '2 mètres', icon: 'ruler' },
      { label: 'HDR', value: 'HDR10, Dolby Vision, HLG', icon: 'image' },
      { label: 'Audio', value: 'Dolby Atmos, DTS:X', icon: 'audio' },
      { label: 'Connecteurs', value: 'Plaqués or 24K', icon: 'plug' },
      { label: 'Blindage', value: 'Triple blindage EMI', icon: 'shield' }
    ],
    highlights: [
      'HDMI 2.1 dernière génération',
      '4K@120Hz pour gaming',
      'HDR complet (HDR10, Dolby Vision)',
      'Audio Dolby Atmos',
      'Connecteurs plaqués or 24K'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 89,
      distribution: { 5: 72, 4: 14, 3: 2, 2: 1, 1: 0 }
    },
    warranty: '5 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'Gaming', '8K Ready']
  },

  // Monster Câble USB-C Charge Rapide 100W
  {
    id: 'monster-cable-usbc-charge',
    airtableId: 'recMONSTERUSBC001',
    sku: 'MONSTER-USBC-100W',
    name: 'MONSTER Câble USB-C Charge Rapide 100W',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    promo: 'CHARGE ULTRA',
    description: "Le câble USB-C Monster 100W révolutionne la charge rapide avec sa capacité Power Delivery exceptionnelle. Conçu pour alimenter les appareils les plus exigeants, ce câble supporte une puissance de charge allant jusqu'à 100W (20V/5A), idéal pour charger rapidement MacBook Pro, ordinateurs portables USB-C et smartphones compatibles. Le transfert de données USB 3.2 Gen 2 atteint 10Gbps pour synchronisation ultra-rapide. Conducteurs en cuivre pur avec isolation renforcée garantissent efficacité maximale et sécurité. Puce E-Marker intégrée régule intelligemment puissance et protection contre surchauffe. Gaine en nylon tressé militaire résiste à 30000 flexions certifiées. Embouts aluminium renforcés avec soulagement de tension prolongent durée de vie. Compatible avec tous protocoles de charge rapide : PD 3.0, QC 4.0, PPS. Longueur optimale 1.5m pour utilisation bureau et mobilité. Support vidéo 4K@60Hz pour connexion écran externe. Certifié USB-IF pour compatibilité universelle garantie. Parfait pour professionnels nomades de La Réunion nécessitant charge rapide fiable.",
    shortDescription: 'Câble USB-C PD 100W avec transfert 10Gbps et gaine militaire',
    metaTitle: 'MONSTER Câble USB-C 100W Charge Rapide - MacBook & Smartphones | Monster Phone',
    metaDescription: 'Câble USB-C Monster 100W Power Delivery pour charge ultra-rapide. Transfer 10Gbps, compatible MacBook, smartphones. Gaine militaire 30000 flexions La Réunion.',
    urlSlug: 'monster-cable-usbc-charge-rapide-100w',
    keywords: ['câble USB-C 100W', 'Monster USB-C', 'Power Delivery', 'charge rapide', 'MacBook', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000USBC001', stock: 38, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000USBC002', stock: 25, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Puissance', value: '100W (20V/5A)', icon: 'power' },
      { label: 'Transfert', value: 'USB 3.2 Gen 2 - 10Gbps', icon: 'speed' },
      { label: 'Longueur', value: '1.5 mètres', icon: 'ruler' },
      { label: 'Protocoles', value: 'PD 3.0, QC 4.0, PPS', icon: 'protocol' },
      { label: 'Vidéo', value: '4K@60Hz Alt Mode', icon: 'display' },
      { label: 'Durabilité', value: '30000 flexions', icon: 'strength' },
      { label: 'Certification', value: 'USB-IF', icon: 'certificate' },
      { label: 'Matériau', value: 'Nylon tressé militaire', icon: 'material' }
    ],
    highlights: [
      'Charge 100W ultra-puissante',
      'Transfert 10Gbps haute vitesse',
      'Gaine militaire 30000 flexions',
      'Compatible tous appareils USB-C',
      'Puce E-Marker sécurité'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 156,
      distribution: { 5: 120, 4: 28, 3: 6, 2: 2, 1: 0 }
    },
    warranty: '3 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['100W', 'Pro', 'Durable']
  },

  // Monster Câble Lightning Pro MFi
  {
    id: 'monster-cable-lightning',
    airtableId: 'recMONSTERLIGHT001',
    sku: 'MONSTER-LIGHTNING-PRO',
    name: 'MONSTER Câble Lightning Pro MFi Certifié',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    promo: 'APPLE CERTIFIED',
    description: "Le câble Lightning Monster Pro bénéficie de la certification MFi (Made for iPhone/iPad) d'Apple, garantissant une compatibilité parfaite et des performances optimales avec tous vos appareils iOS. La puce d'authentification Apple originale assure une charge sûre et rapide jusqu'à 2.4A, protégeant votre batterie contre les surtensions. Construction premium avec conducteurs en cuivre pur pour efficacité de charge maximale et perte minimale. Gaine en TPE écologique souple résiste aux enchevêtrements et aux torsions répétées. Embouts aluminium usinés CNC avec relief anti-stress prolongent durée de vie du câble. Support charge rapide iOS et synchronisation données USB 2.0 jusqu'à 480Mbps. Compatible avec tous iPhone (15/14/13/12/11/X/8), iPad et iPod avec port Lightning. Longueur 1m parfaite pour utilisation quotidienne bureau, voiture et domicile. Testé pour résister à plus de 25000 insertions et 20000 flexions. Garantie de remplacement à vie contre défauts de fabrication. Solution idéale pour utilisateurs Apple de La Réunion cherchant fiabilité.",
    shortDescription: 'Câble Lightning certifié MFi Apple avec charge rapide 2.4A',
    metaTitle: 'MONSTER Câble Lightning MFi - iPhone iPad Certifié Apple | Monster Phone 974',
    metaDescription: 'Câble Lightning Monster Pro certifié MFi Apple. Charge rapide 2.4A, compatible tous iPhone iPad. Aluminium premium, garantie à vie. Livraison La Réunion.',
    urlSlug: 'monster-cable-lightning-pro-mfi',
    keywords: ['câble Lightning', 'MFi', 'iPhone', 'iPad', 'Monster', 'Apple', 'La Réunion'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000LIGHT001', stock: 52, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '3402000LIGHT002', stock: 48, images: [] }
    ],
    defaultVariant: 'Blanc',
    specifications: [
      { label: 'Certification', value: 'MFi Apple', icon: 'certificate' },
      { label: 'Charge', value: '2.4A max', icon: 'battery' },
      { label: 'Transfert', value: 'USB 2.0 - 480Mbps', icon: 'speed' },
      { label: 'Longueur', value: '1 mètre', icon: 'ruler' },
      { label: 'Durabilité', value: '25000 insertions', icon: 'strength' },
      { label: 'Flexions', value: '20000 cycles', icon: 'flex' },
      { label: 'Matériau', value: 'Aluminium + TPE', icon: 'material' },
      { label: 'Compatibilité', value: 'Tous appareils Lightning', icon: 'device' }
    ],
    highlights: [
      'Certification MFi officielle Apple',
      'Charge rapide 2.4A sécurisée',
      'Aluminium usiné CNC premium',
      'Garantie à vie constructeur',
      'Compatible tous iPhone/iPad'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 203,
      distribution: { 5: 145, 4: 42, 3: 12, 2: 3, 1: 1 }
    },
    warranty: 'Garantie à vie',
    deliveryTime: '24-48h à La Réunion',
    badges: ['MFi', 'Apple', 'Garantie à vie']
  },

  // Monster Câble AUX Gold Plated
  {
    id: 'monster-cable-aux-gold',
    airtableId: 'recMONSTERAUX001',
    sku: 'MONSTER-AUX-GOLD',
    name: 'MONSTER Câble AUX 3.5mm Gold Plated Pro',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    promo: 'AUDIO PRO',
    description: "Le câble AUX Monster Gold Plated Pro offre une transmission audio analogique de qualité audiophile. Les connecteurs plaqués or 24K garantissent une conductivité optimale et une résistance totale à la corrosion, préservant la qualité du signal sur le long terme. Conducteurs en cuivre OFC (Oxygen-Free Copper) de haute pureté minimisent la résistance et les interférences. Double blindage avec feuille d'aluminium et tresse de cuivre élimine bruits parasites et interférences électromagnétiques. Gaine externe en nylon tressé premium protège contre l'usure tout en restant flexible. Connecteurs jack 3.5mm universels compatibles avec tous smartphones, tablettes, autoradios, enceintes, casques et chaînes Hi-Fi. Design slim permet utilisation avec coques de protection épaisses. Relief anti-stress sur connecteurs prolonge durée de vie aux points de flexion critiques. Longueur 1.2m idéale pour connexion autoradio et utilisation mobile. Transmission stéréo haute fidélité préserve dynamique et détails musicaux. Parfait pour mélomanes de La Réunion exigeants sur qualité audio mobile.",
    shortDescription: 'Câble audio AUX 3.5mm avec connecteurs plaqués or 24K',
    metaTitle: 'MONSTER Câble AUX 3.5mm Gold - Audio Haute Fidélité | Monster Phone 974',
    metaDescription: 'Câble AUX Monster 3.5mm plaqué or 24K. Qualité audiophile, cuivre OFC, double blindage. Compatible tous appareils audio. Livraison rapide La Réunion.',
    urlSlug: 'monster-cable-aux-35mm-gold-plated',
    keywords: ['câble AUX', '3.5mm', 'jack audio', 'Monster', 'plaqué or', 'La Réunion'],
    variants: [
      { color: 'Noir/Or', colorCode: '#000000', ean: '3402000AUX001', stock: 68, images: [] }
    ],
    defaultVariant: 'Noir/Or',
    specifications: [
      { label: 'Connecteurs', value: 'Jack 3.5mm mâle/mâle', icon: 'plug' },
      { label: 'Plaquage', value: 'Or 24K', icon: 'gold' },
      { label: 'Conducteur', value: 'Cuivre OFC', icon: 'wire' },
      { label: 'Blindage', value: 'Double (alu + cuivre)', icon: 'shield' },
      { label: 'Longueur', value: '1.2 mètres', icon: 'ruler' },
      { label: 'Diamètre', value: '3.5mm slim', icon: 'size' },
      { label: 'Signal', value: 'Stéréo analogique', icon: 'audio' },
      { label: 'Impédance', value: '32-600 Ohms', icon: 'resistance' }
    ],
    highlights: [
      'Connecteurs plaqués or 24K',
      'Cuivre OFC haute pureté',
      'Double blindage anti-interférences',
      'Compatible coques épaisses',
      'Qualité audio audiophile'
    ],
    images: [],
    rating: {
      average: 4.5,
      count: 312,
      distribution: { 5: 198, 4: 87, 3: 20, 2: 5, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Audiophile', 'Gold', 'Pro']
  },

  // Monster Câble Micro USB Renforcé
  {
    id: 'monster-cable-micro-usb',
    airtableId: 'recMONSTERMICRO001',
    sku: 'MONSTER-MICRO-USB',
    name: 'MONSTER Câble Micro USB Renforcé Military Grade',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 12.99,
    originalPrice: 17.99,
    discount: 28,
    promo: 'ULTRA RESISTANT',
    description: "Le câble Micro USB Monster Military Grade établit nouvelle référence en matière de durabilité. Construction renforcée avec gaine en nylon balistique tressé résiste aux conditions les plus extrêmes. Testés pour supporter plus de 50000 flexions sans dégradation des performances. Connecteurs moulés avec relief de tension en TPU flexible empêchent rupture aux points faibles. Conducteurs en cuivre étamé garantissent charge rapide jusqu'à 2.4A et transfert données USB 2.0. Compatible avec immense majorité d'appareils : smartphones Android, tablettes, liseuses, enceintes Bluetooth, batteries externes, manettes gaming. Longueur 1m offre équilibre parfait entre praticité et mobilité. Protection contre surchauffe et surintensité intégrée préserve sécurité appareils. Conception anti-enchevêtrement facilite rangement et transport quotidien. Disponible en plusieurs coloris pour personnalisation. Idéal pour utilisateurs actifs de La Réunion nécessitant câble ultra-résistant usage intensif. Garantie de remplacement 2 ans contre tout défaut.",
    shortDescription: 'Câble Micro USB military grade résistant 50000 flexions',
    metaTitle: 'MONSTER Câble Micro USB Military Grade - Ultra Résistant | Monster Phone 974',
    metaDescription: 'Câble Micro USB Monster renforcé military grade. Résiste 50000 flexions, charge 2.4A, nylon balistique. Compatible Android. Livraison La Réunion.',
    urlSlug: 'monster-cable-micro-usb-military-grade',
    keywords: ['câble Micro USB', 'Monster', 'military grade', 'résistant', 'Android', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000MICRO001', stock: 82, images: [] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '3402000MICRO002', stock: 45, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type', value: 'USB-A vers Micro-B', icon: 'connector' },
      { label: 'Charge', value: '2.4A max', icon: 'battery' },
      { label: 'Transfert', value: 'USB 2.0 - 480Mbps', icon: 'speed' },
      { label: 'Longueur', value: '1 mètre', icon: 'ruler' },
      { label: 'Durabilité', value: '50000 flexions', icon: 'strength' },
      { label: 'Matériau', value: 'Nylon balistique', icon: 'material' },
      { label: 'Protection', value: 'Anti-surchauffe', icon: 'shield' },
      { label: 'Diamètre', value: '4mm renforcé', icon: 'size' }
    ],
    highlights: [
      'Résistance 50000 flexions',
      'Nylon balistique military',
      'Charge rapide 2.4A',
      'Anti-enchevêtrement',
      'Garantie 2 ans'
    ],
    images: [],
    rating: {
      average: 4.4,
      count: 428,
      distribution: { 5: 245, 4: 142, 3: 32, 2: 7, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Military', 'Durable', 'Resistant']
  },

  // Monster Câble Multi 3-en-1
  {
    id: 'monster-cable-multi-3en1',
    airtableId: 'recMONSTER3IN1001',
    sku: 'MONSTER-3IN1',
    name: 'MONSTER Câble Multi 3-en-1 Universal',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 27.99,
    originalPrice: 37.99,
    discount: 26,
    promo: 'TOUT-EN-UN',
    description: "Le câble Monster Multi 3-en-1 révolutionne la connectivité mobile avec sa polyvalence exceptionnelle. Un seul câble remplace trois câbles différents grâce aux connecteurs USB-C, Lightning et Micro USB intégrés. Design innovant avec connecteurs magnétiques détachables facilitent utilisation et évitent usure prématurée. Charge simultanée possible de 3 appareils avec répartition intelligente de puissance jusqu'à 3.5A total. Compatible avec 99% des smartphones, tablettes et accessoires du marché : iPhone, iPad, Samsung, Xiaomi, Huawei, Sony, enceintes, écouteurs, batteries externes. Construction premium avec âme en alliage zinc et gaine nylon tressé haute densité. Longueur extensible de 0.3m à 1.2m grâce au système rétractable breveté. LED indicateur de charge intégré pour visualisation état de charge. Système de gestion intelligent protège contre surcharge et court-circuit. Compact et portable avec étui de transport inclus. Solution parfaite pour voyageurs et professionnels nomades de La Réunion. Un seul câble pour tous vos besoins de charge et synchronisation.",
    shortDescription: 'Câble universel 3-en-1 USB-C, Lightning et Micro USB',
    metaTitle: 'MONSTER Câble 3-en-1 Universal - USB-C Lightning Micro | Monster Phone 974',
    metaDescription: 'Câble Monster 3-en-1 universel USB-C, Lightning, Micro USB. Charge 3 appareils simultanément, rétractable, magnétique. Solution tout-en-un La Réunion.',
    urlSlug: 'monster-cable-multi-3en1-universal',
    keywords: ['câble 3 en 1', 'USB-C', 'Lightning', 'Micro USB', 'Monster', 'universel', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '34020003IN1001', stock: 35, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Connecteurs', value: 'USB-C + Lightning + Micro', icon: 'connector' },
      { label: 'Charge totale', value: '3.5A max', icon: 'battery' },
      { label: 'Longueur', value: '0.3m - 1.2m rétractable', icon: 'ruler' },
      { label: 'Multi-charge', value: '3 appareils simultanés', icon: 'devices' },
      { label: 'Matériau', value: 'Zinc + Nylon', icon: 'material' },
      { label: 'Système', value: 'Magnétique détachable', icon: 'magnet' },
      { label: 'LED', value: 'Indicateur charge', icon: 'light' },
      { label: 'Protection', value: 'Anti-surcharge', icon: 'shield' }
    ],
    highlights: [
      '3 connecteurs en 1 câble',
      'Charge 3 appareils simultanément',
      'Système rétractable 0.3-1.2m',
      'Connecteurs magnétiques',
      'Compatible 99% appareils'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 167,
      distribution: { 5: 112, 4: 38, 3: 12, 2: 4, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['3-en-1', 'Universal', 'Magnetic']
  },

  // ===== ÉCLAIRAGE LED (8 produits) =====

  // Monster LED Strip RGB Gaming 5M
  {
    id: 'monster-led-strip-rgb',
    airtableId: 'recMONSTERLED001',
    sku: 'MONSTER-LED-STRIP-5M',
    name: 'MONSTER LED Strip RGB Gaming 5M Sync Music',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    promo: 'GAMING SETUP',
    description: "La bande LED RGB Monster Gaming transforme votre espace en véritable station de jeu immersive. 5 mètres de LEDs RGB haute luminosité avec 150 LEDs SMD 5050 offrent éclairage puissant et couleurs éclatantes. Synchronisation musicale avancée avec micro intégré fait danser lumières au rythme de votre musique ou sons du jeu. Application smartphone dédiée permet contrôle total : 16 millions de couleurs, luminosité, modes prédéfinis, programmation horaire. 20 modes d'éclairage dynamiques incluant respiration, vague, stroboscope, arc-en-ciel pour ambiances variées. Télécommande RF 44 touches portée 10m pour contrôle à distance pratique. Installation facile avec adhésif 3M premium et clips de fixation inclus. Découpe possible tous les 10cm pour adaptation parfaite à votre espace. Alimentation 12V sécurisée avec adaptateur certifié CE inclus. Connecteurs d'angle disponibles pour installations complexes. Compatible assistants vocaux Alexa et Google Home. Idéal pour setup gaming, décoration chambre, éclairage indirect TV. Transformez votre espace gaming à La Réunion en environnement RGB spectaculaire.",
    shortDescription: 'Bande LED RGB 5M avec sync musique et contrôle app',
    metaTitle: 'MONSTER LED Strip RGB Gaming 5M - Setup Gaming La Réunion | Monster Phone',
    metaDescription: 'Bande LED RGB Monster 5M pour gaming. Sync musique, app contrôle, 16M couleurs, télécommande. Setup gaming parfait La Réunion 974.',
    urlSlug: 'monster-led-strip-rgb-gaming-5m',
    keywords: ['LED RGB', 'gaming', 'Monster', 'strip LED', 'sync musique', 'setup', 'La Réunion'],
    variants: [
      { color: 'RGB Multicolore', colorCode: '#FF00FF', ean: '3402000LED001', stock: 28, images: [] }
    ],
    defaultVariant: 'RGB Multicolore',
    specifications: [
      { label: 'Longueur', value: '5 mètres', icon: 'ruler' },
      { label: 'LEDs', value: '150 SMD 5050', icon: 'light' },
      { label: 'Couleurs', value: '16 millions RGB', icon: 'palette' },
      { label: 'Modes', value: '20 effets dynamiques', icon: 'effects' },
      { label: 'Contrôle', value: 'App + Télécommande', icon: 'control' },
      { label: 'Sync', value: 'Musique via micro', icon: 'music' },
      { label: 'Découpe', value: 'Tous les 10cm', icon: 'cut' },
      { label: 'Alimentation', value: '12V 5A inclus', icon: 'power' }
    ],
    highlights: [
      'Sync musique temps réel',
      '16 millions de couleurs',
      'Contrôle app smartphone',
      '20 modes dynamiques',
      'Installation facile 3M'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 234,
      distribution: { 5: 178, 4: 42, 3: 10, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Gaming', 'RGB', 'Music Sync']
  },

  // Monster Ring Light Pro Streaming
  {
    id: 'monster-led-ring-light',
    airtableId: 'recMONSTERRING001',
    sku: 'MONSTER-RING-LIGHT',
    name: 'MONSTER Ring Light Pro 18" Streaming',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    promo: 'CREATOR PRO',
    description: "Le Ring Light Monster Pro 18 pouces est l'outil d'éclairage professionnel indispensable pour créateurs de contenu, streamers et photographes. Diamètre généreux 45cm avec 480 LEDs haute luminosité offre éclairage uniforme sans ombres dures. 3 températures de couleur ajustables (3200K-5600K) : chaude, naturelle et froide pour toutes situations. Luminosité variable de 10% à 100% avec contrôle précis pour exposition parfaite. Support smartphone universel rotatif 360° inclus compatible tous modèles. Trépied aluminium réglable 50cm-210cm ultra-stable avec pieds antidérapants. Télécommande Bluetooth permet contrôle à distance pendant enregistrement. Col de cygne flexible pour positionnement précis de l'éclairage. Miroir intégré au support pour maquillage et préparation. Diffuseur blanc inclus pour lumière encore plus douce portraits. Alimentation USB permet utilisation avec power bank pour mobilité totale. Compatible appareils photo DSLR avec adaptateur inclus. Sac de transport rembourré pour protection et portabilité. Parfait pour streaming, YouTube, TikTok, visioconférences professionnelles à La Réunion.",
    shortDescription: 'Ring Light pro 18" avec trépied 210cm et 3 températures',
    metaTitle: 'MONSTER Ring Light Pro 18" - Streaming YouTube TikTok | Monster Phone 974',
    metaDescription: 'Ring Light Monster Pro 18 pouces pour streaming. 3 températures couleur, trépied 210cm, télécommande. Parfait créateurs contenu La Réunion.',
    urlSlug: 'monster-ring-light-pro-18-streaming',
    keywords: ['ring light', 'streaming', 'Monster', 'YouTube', 'TikTok', 'éclairage', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000RING001', stock: 22, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Diamètre', value: '18" (45cm)', icon: 'size' },
      { label: 'LEDs', value: '480 unités', icon: 'light' },
      { label: 'Température', value: '3200K-5600K', icon: 'temperature' },
      { label: 'Luminosité', value: '10%-100% variable', icon: 'brightness' },
      { label: 'Trépied', value: '50cm-210cm', icon: 'stand' },
      { label: 'Contrôle', value: 'Télécommande Bluetooth', icon: 'remote' },
      { label: 'Support', value: 'Smartphone + DSLR', icon: 'mount' },
      { label: 'Alimentation', value: 'USB + Adaptateur', icon: 'power' }
    ],
    highlights: [
      'Diamètre pro 18 pouces',
      '3 températures couleur',
      'Trépied jusqu\'à 210cm',
      'Télécommande Bluetooth',
      'Support smartphone/DSLR'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 189,
      distribution: { 5: 156, 4: 26, 3: 5, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Pro', 'Streaming', '18"']
  },

  // Monster Lampe Bureau LED Tactile
  {
    id: 'monster-led-desk-lamp',
    airtableId: 'recMONSTERDESK001',
    sku: 'MONSTER-DESK-LAMP',
    name: 'MONSTER Lampe Bureau LED Tactile',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    promo: 'SMART LIGHT',
    description: "La lampe de bureau LED Monster allie design moderne et fonctionnalité intelligente pour créer l'environnement de travail parfait. Technologie LED dernière génération offre éclairage sans scintillement protégeant vos yeux lors de longues sessions. 5 niveaux de luminosité et 3 températures de couleur (3000K-6500K) s'adaptent à toutes activités : lecture, travail, relaxation. Contrôle tactile intuitif sur la base permet ajustement instantané sans interruption. Port USB 5V/2A intégré charge smartphone ou tablette pendant que vous travaillez. Col de cygne flexible 360° permet orientation précise de la lumière exactement où nécessaire. Mode mémoire intelligent restaure derniers réglages utilisés à chaque allumage. Minuterie auto-extinction programmable 30/60 minutes pour économie d'énergie. Base lestée antidérapante garantit stabilité parfaite sur toute surface. Consommation ultra-basse 10W pour éclairage équivalent 75W incandescent. Design minimaliste s'intègre parfaitement dans tout environnement moderne. Durée de vie LED 50000 heures pour utilisation sans souci pendant des années. Parfait pour bureaux, études et espaces de travail à La Réunion.",
    shortDescription: 'Lampe bureau LED avec contrôle tactile et port USB charge',
    metaTitle: 'MONSTER Lampe Bureau LED Tactile - Éclairage Intelligent | Monster Phone 974',
    metaDescription: 'Lampe bureau LED Monster tactile avec 5 niveaux luminosité, 3 températures couleur, port USB. Design moderne parfait bureau La Réunion.',
    urlSlug: 'monster-lampe-bureau-led-tactile',
    keywords: ['lampe bureau', 'LED', 'Monster', 'tactile', 'USB', 'éclairage', 'La Réunion'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000DESK001', stock: 42, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '3402000DESK002', stock: 38, images: [] }
    ],
    defaultVariant: 'Blanc',
    specifications: [
      { label: 'Puissance', value: '10W LED', icon: 'power' },
      { label: 'Luminosité', value: '5 niveaux', icon: 'brightness' },
      { label: 'Température', value: '3000K-6500K', icon: 'temperature' },
      { label: 'Port USB', value: '5V/2A charge', icon: 'usb' },
      { label: 'Contrôle', value: 'Tactile + Mémoire', icon: 'touch' },
      { label: 'Flexibilité', value: '360° ajustable', icon: 'flex' },
      { label: 'Minuterie', value: '30/60 minutes', icon: 'timer' },
      { label: 'Durée vie', value: '50000 heures', icon: 'lifetime' }
    ],
    highlights: [
      'Contrôle tactile intelligent',
      '5 niveaux luminosité',
      'Port USB charge intégré',
      'Sans scintillement',
      'Col de cygne 360°'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 156,
      distribution: { 5: 98, 4: 42, 3: 12, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Smart', 'USB', 'Eco']
  },

  // Monster Panneaux LED Hexagonaux x6
  {
    id: 'monster-led-hexagon',
    airtableId: 'recMONSTERHEX001',
    sku: 'MONSTER-HEXAGON-6',
    name: 'MONSTER Panneaux LED Hexagonaux x6',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    promo: 'MODULAR RGB',
    description: "Les panneaux LED hexagonaux Monster transforment instantanément n'importe quel mur en œuvre d'art lumineuse interactive. Kit 6 panneaux modulaires permettent créations infinies selon votre imagination. Technologie touch-sensitive réagit au toucher pour contrôle interactif des couleurs et effets. 16 millions de couleurs RGB disponibles avec transitions fluides et naturelles. Application smartphone complète offre contrôle total : couleurs, motifs, animations, programmation. Mode musique sync analyse en temps réel et fait danser lumières au rythme. 19 effets préprogrammés incluant aurore, coucher soleil, océan, feu pour ambiances variées. Connexion WiFi permet intégration domotique et contrôle vocal Alexa/Google. Installation sans perçage avec adhésif 3M VHB ultra-résistant fourni. Système de connexion magnétique facilite assemblage et reconfiguration. Consommation optimisée 24W total pour éclairage spectaculaire économique. Épaisseur ultra-fine 3cm s'intègre discrètement sur tout mur. Kit extension disponible pour agrandir votre installation. Transformez votre gaming room ou salon à La Réunion en espace futuriste unique.",
    shortDescription: 'Kit 6 panneaux LED hexagonaux modulaires RGB tactiles',
    metaTitle: 'MONSTER Panneaux LED Hexagonaux x6 - Décoration Gaming | Monster Phone 974',
    metaDescription: 'Panneaux LED hexagonaux Monster x6 modulaires RGB. Touch control, sync musique, WiFi. Décoration murale gaming parfaite La Réunion.',
    urlSlug: 'monster-panneaux-led-hexagonaux-6',
    keywords: ['panneaux LED', 'hexagonal', 'Monster', 'RGB', 'gaming', 'modulaire', 'La Réunion'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000HEX001', stock: 18, images: [] }
    ],
    defaultVariant: 'Blanc',
    specifications: [
      { label: 'Quantité', value: '6 panneaux', icon: 'quantity' },
      { label: 'Couleurs', value: '16 millions RGB', icon: 'palette' },
      { label: 'Contrôle', value: 'Touch + App + WiFi', icon: 'control' },
      { label: 'Effets', value: '19 modes', icon: 'effects' },
      { label: 'Sync', value: 'Musique temps réel', icon: 'music' },
      { label: 'Installation', value: 'Adhésif 3M', icon: 'install' },
      { label: 'Connexion', value: 'Magnétique', icon: 'magnet' },
      { label: 'Consommation', value: '24W total', icon: 'power' }
    ],
    highlights: [
      'Touch control interactif',
      'Modulaire reconfigurable',
      'WiFi et contrôle vocal',
      'Sync musique',
      'Installation sans perçage'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 145,
      distribution: { 5: 118, 4: 20, 3: 5, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Modular', 'WiFi', 'Touch']
  },

  // Monster Néon LED Gaming
  {
    id: 'monster-led-neon-sign',
    airtableId: 'recMONSTERNEON001',
    sku: 'MONSTER-NEON-GAMER',
    name: 'MONSTER Néon LED Gaming "GAME ON"',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    promo: 'NEON STYLE',
    description: "L'enseigne néon LED Monster \"GAME ON\" apporte touche gaming authentique à votre setup. Technologie LED flexible imite parfaitement aspect néon traditionnel sans danger ni chaleur excessive. Design \"GAME ON\" avec manette stylisée symbolise passion gaming avec style. Plaque acrylique transparente 5mm donne effet flottant moderne et élégant. 8 modes d'éclairage dynamiques : fixe, respiration, flash, fondu, arc-en-ciel pour ambiances variées. Variateur d'intensité permet ajustement parfait selon éclairage ambiant. Télécommande RF incluse contrôle toutes fonctions jusqu'à 8 mètres distance. Alimentation USB permet branchement sur PC, console, power bank pour flexibilité totale. Consommation minimale 5W pour utilisation continue sans impact facture électrique. Dimensions compactes 40x20cm s'adaptent parfaitement au-dessus écran ou étagère. Crochet de suspension et support bureau inclus pour installation polyvalente. Durée vie 30000 heures garantit années d'utilisation intensive. Ajoutez ambiance gaming professionnelle à votre setup à La Réunion.",
    shortDescription: 'Enseigne néon LED gaming avec 8 modes éclairage',
    metaTitle: 'MONSTER Néon LED Gaming GAME ON - Décoration Setup | Monster Phone 974',
    metaDescription: 'Néon LED Monster GAME ON pour setup gaming. 8 modes éclairage, télécommande, USB. Décoration gaming parfaite La Réunion.',
    urlSlug: 'monster-neon-led-gaming-game-on',
    keywords: ['néon LED', 'gaming', 'Monster', 'GAME ON', 'décoration', 'setup', 'La Réunion'],
    variants: [
      { color: 'Multicolore', colorCode: '#FF00FF', ean: '3402000NEON001', stock: 52, images: [] }
    ],
    defaultVariant: 'Multicolore',
    specifications: [
      { label: 'Dimensions', value: '40x20cm', icon: 'size' },
      { label: 'Message', value: 'GAME ON + Manette', icon: 'text' },
      { label: 'Modes', value: '8 effets dynamiques', icon: 'effects' },
      { label: 'Contrôle', value: 'Télécommande RF', icon: 'remote' },
      { label: 'Alimentation', value: 'USB 5V', icon: 'power' },
      { label: 'Consommation', value: '5W', icon: 'energy' },
      { label: 'Matériau', value: 'Acrylique 5mm', icon: 'material' },
      { label: 'Durée vie', value: '30000 heures', icon: 'lifetime' }
    ],
    highlights: [
      'Design GAME ON gaming',
      '8 modes dynamiques',
      'Télécommande incluse',
      'Alimentation USB',
      'Installation facile'
    ],
    images: [],
    rating: {
      average: 4.5,
      count: 198,
      distribution: { 5: 128, 4: 52, 3: 14, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Gaming', 'Neon', 'USB']
  },

  // Monster Projecteur LED Galaxie
  {
    id: 'monster-led-projector',
    airtableId: 'recMONSTERPROJ001',
    sku: 'MONSTER-STAR-PROJ',
    name: 'MONSTER Projecteur LED Galaxie Bluetooth',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 54.99,
    originalPrice: 74.99,
    discount: 27,
    promo: 'GALAXY ROOM',
    description: "Le projecteur LED Monster Galaxie transforme votre pièce en cosmos spectaculaire avec projection ultra-réaliste. Double projection laser crée milliers d'étoiles scintillantes et nébuleuses colorées mouvantes. 10 couleurs de nébuleuse ajustables créent atmosphères uniques : rouge Mars, bleu Neptune, vert aurore. Haut-parleur Bluetooth 5.0 intégré diffuse musique avec synchronisation lumineuse rythmée. Mode son-réactif fait danser galaxie au rythme de musique pour expérience immersive totale. Télécommande multifonction contrôle couleurs, vitesse, luminosité, musique à distance. Minuterie auto-extinction 1/2/4 heures parfaite pour endormissement sous étoiles. Angle projection ajustable 45° couvre jusqu'à 200m² plafond et murs. Moteur silencieux <35dB garantit utilisation chambre sans perturbation sommeil. Application smartphone permet personnalisation infinie des effets et programmation. Port USB permet lecture musique depuis clé USB directement. Base rotative 360° avec fixation murale optionnelle pour installation flexible. Créez ambiance cosmique unique dans votre espace à La Réunion.",
    shortDescription: 'Projecteur galaxie LED avec Bluetooth et sync musique',
    metaTitle: 'MONSTER Projecteur LED Galaxie Bluetooth - Ambiance Cosmique | Monster Phone 974',
    metaDescription: 'Projecteur LED Monster galaxie avec Bluetooth, sync musique, télécommande. Transformez votre pièce en cosmos La Réunion.',
    urlSlug: 'monster-projecteur-led-galaxie-bluetooth',
    keywords: ['projecteur LED', 'galaxie', 'Monster', 'Bluetooth', 'étoiles', 'ambiance', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000PROJ001', stock: 26, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Projection', value: 'Étoiles + Nébuleuse', icon: 'projection' },
      { label: 'Couleurs', value: '10 nébuleuses', icon: 'palette' },
      { label: 'Bluetooth', value: '5.0 + Haut-parleur', icon: 'bluetooth' },
      { label: 'Couverture', value: 'Jusqu\'à 200m²', icon: 'area' },
      { label: 'Angle', value: '45° ajustable', icon: 'angle' },
      { label: 'Minuterie', value: '1/2/4 heures', icon: 'timer' },
      { label: 'Bruit', value: '<35dB silencieux', icon: 'noise' },
      { label: 'Contrôle', value: 'Télécommande + App', icon: 'control' }
    ],
    highlights: [
      'Double projection galaxie',
      'Bluetooth audio intégré',
      'Sync musique réactive',
      'Silencieux <35dB',
      'Couverture 200m²'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 267,
      distribution: { 5: 201, 4: 48, 3: 14, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Galaxy', 'Bluetooth', 'Music']
  },

  // Monster Barre LED Écran
  {
    id: 'monster-led-bar-monitor',
    airtableId: 'recMONSTERBAR001',
    sku: 'MONSTER-MONITOR-BAR',
    name: 'MONSTER Barre LED Écran Eye-Care',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 37.99,
    originalPrice: 49.99,
    discount: 24,
    promo: 'EYE PROTECT',
    description: "La barre LED Monster Eye-Care révolutionne l'éclairage de bureau en éliminant reflets écran et fatigue oculaire. Design asymétrique breveté éclaire uniquement zone travail sans éblouir écran ni yeux. Capteur ambiant ajuste automatiquement luminosité selon environnement pour confort optimal constant. Technologie anti-scintillement et spectre complet Ra>95 reproduit lumière naturelle protégeant vision. 3 modes prédéfinis : lecture (6500K), travail (5000K), relaxation (3000K) pour chaque activité. Contrôleur filaire déporté permet ajustements sans bouger de position travail. Installation universelle sans vis s'adapte écrans 17-34 pouces épaisseur jusqu'à 4cm. Angle éclairage ajustable 25° dirige précisément lumière où nécessaire. Consommation 10W seulement pour éclairage équivalent 80W traditionnel. Port USB passthrough maintient port écran disponible pour autres périphériques. Construction aluminium anodisé dissipe chaleur efficacement pour durabilité maximale. Mémoire intelligente restaure derniers réglages à chaque allumage. Solution idéale pour professionnels et gamers de La Réunion passant longues heures devant écran.",
    shortDescription: 'Barre LED écran avec capteur auto et protection yeux',
    metaTitle: 'MONSTER Barre LED Écran Eye-Care - Protection Vision | Monster Phone 974',
    metaDescription: 'Barre LED Monster pour écran avec ajustement auto, anti-reflet, 3 modes. Protection yeux parfaite bureautique gaming La Réunion.',
    urlSlug: 'monster-barre-led-ecran-eye-care',
    keywords: ['barre LED', 'écran', 'Monster', 'eye-care', 'bureau', 'protection', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000BAR001', stock: 48, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Compatibilité', value: '17-34 pouces', icon: 'screen' },
      { label: 'Modes', value: '3 températures', icon: 'mode' },
      { label: 'Capteur', value: 'Auto-ajustement', icon: 'sensor' },
      { label: 'CRI', value: 'Ra>95', icon: 'quality' },
      { label: 'Angle', value: '25° ajustable', icon: 'angle' },
      { label: 'Puissance', value: '10W', icon: 'power' },
      { label: 'USB', value: 'Passthrough', icon: 'usb' },
      { label: 'Matériau', value: 'Aluminium', icon: 'material' }
    ],
    highlights: [
      'Capteur luminosité auto',
      'Anti-reflet écran',
      'Protection anti-fatigue',
      '3 modes température',
      'Installation sans vis'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 234,
      distribution: { 5: 156, 4: 58, 3: 16, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Eye-Care', 'Auto', 'Pro']
  },

  // Monster Cube LED RGB Intelligent
  {
    id: 'monster-led-cube',
    airtableId: 'recMONSTERCUBE001',
    sku: 'MONSTER-CUBE-RGB',
    name: 'MONSTER Cube LED RGB Intelligent WiFi',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Éclairage LED',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    promo: 'SMART CUBE',
    description: "Le cube LED Monster intelligent combine design moderne et technologie avancée pour éclairage d'ambiance révolutionnaire. Structure cubique 10x10cm diffuse lumière douce 360° créant atmosphère unique. 16 millions couleurs RGB avec transitions fluides transforment ambiance instantanément. Application smartphone intuitive offre contrôle total et scénarios personnalisables infinis. WiFi 2.4GHz permet intégration domotique et contrôle vocal Alexa/Google Assistant. Mode réveil simule lever soleil progressif pour réveil naturel en douceur. Synchronisation musicale via microphone intégré fait pulser lumière au rythme. 20 effets préprogrammés incluant bougie, arc-en-ciel, respiration pour toutes occasions. Programmation horaire permet automatisation selon routine quotidienne. Mode veilleuse avec capteur mouvement s'active automatiquement la nuit. Batterie rechargeable 2000mAh offre 8 heures autonomie sans fil. Construction ABS mat premium résiste chocs et rayures utilisation quotidienne. Taille compacte parfaite pour table nuit, bureau, étagère. Ajoutez intelligence lumineuse à votre intérieur à La Réunion.",
    shortDescription: 'Cube LED RGB WiFi avec contrôle app et sync musique',
    metaTitle: 'MONSTER Cube LED RGB Intelligent WiFi - Éclairage Smart | Monster Phone 974',
    metaDescription: 'Cube LED RGB Monster intelligent WiFi. Contrôle app, sync musique, Alexa/Google, batterie. Éclairage ambiance moderne La Réunion.',
    urlSlug: 'monster-cube-led-rgb-intelligent-wifi',
    keywords: ['cube LED', 'RGB', 'Monster', 'WiFi', 'intelligent', 'smart', 'La Réunion'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000CUBE001', stock: 68, images: [] }
    ],
    defaultVariant: 'Blanc',
    specifications: [
      { label: 'Dimensions', value: '10x10x10cm', icon: 'size' },
      { label: 'Couleurs', value: '16 millions RGB', icon: 'palette' },
      { label: 'Connexion', value: 'WiFi 2.4GHz', icon: 'wifi' },
      { label: 'Contrôle', value: 'App + Voix', icon: 'control' },
      { label: 'Batterie', value: '2000mAh / 8h', icon: 'battery' },
      { label: 'Effets', value: '20 modes', icon: 'effects' },
      { label: 'Sync', value: 'Musique micro', icon: 'music' },
      { label: 'Matériau', value: 'ABS premium', icon: 'material' }
    ],
    highlights: [
      'WiFi et contrôle vocal',
      '16 millions couleurs',
      'Batterie 8h autonomie',
      'Sync musique',
      'Mode réveil soleil'
    ],
    images: [],
    rating: {
      average: 4.4,
      count: 312,
      distribution: { 5: 178, 4: 98, 3: 28, 2: 6, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Smart', 'WiFi', 'Portable']
  },

  // ========== CHARGEURS MONSTER (5 produits) ==========

  // Monster Chargeur Mural 65W GaN
  {
    id: 'monster-chargeur-gan-65w',
    airtableId: 'recMONSTERGAN001',
    sku: 'MONSTER-GAN-65W',
    name: 'MONSTER Chargeur Mural GaN 65W 3 Ports',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeurs',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    promo: 'TECHNOLOGIE GAN',
    description: "Le chargeur Monster GaN 65W représente la pointe de la technologie de charge avec ses semi-conducteurs au nitrure de gallium. Cette technologie GaN III permet une taille 50% plus compacte qu'un chargeur traditionnel tout en dissipant mieux la chaleur. Puissance totale 65W répartie intelligemment sur 3 ports : 2 USB-C PD et 1 USB-A QC. Charge rapide MacBook Pro 13\" en 1h30 ou iPhone 15 Pro à 50% en 30 minutes. Distribution dynamique de puissance s'adapte automatiquement aux appareils connectés. Protocoles supportés : PD 3.0, PPS, QC 4+, AFC, FCP, SCP pour compatibilité universelle. Protection 8 couches contre surtension, surintensité, surchauffe et court-circuit. Design compact pliable idéal pour voyage avec prise EU/UK/US interchangeable incluse. Certification CE, FCC, RoHS garantit sécurité maximale. Compatible laptops, tablettes, smartphones, écouteurs, montres connectées. LED indicateur discret montre état de charge. Boîtier ignifuge PC+ABS résiste températures élevées. Solution parfaite pour nomades digitaux de La Réunion.",
    shortDescription: 'Chargeur GaN 65W ultra-compact 3 ports avec charge rapide universelle',
    metaTitle: 'MONSTER Chargeur GaN 65W 3 Ports - MacBook iPhone | Monster Phone 974',
    metaDescription: 'Chargeur Monster GaN 65W ultra-compact. 3 ports USB-C/A, charge MacBook et smartphones. Technologie GaN III, multi-protocoles. Livraison La Réunion.',
    urlSlug: 'monster-chargeur-gan-65w-3-ports',
    keywords: ['chargeur GaN', '65W', 'Monster', 'USB-C', 'MacBook', 'charge rapide', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000GAN001', stock: 32, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000GAN002', stock: 28, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Puissance', value: '65W max', icon: 'power' },
      { label: 'Technologie', value: 'GaN III', icon: 'chip' },
      { label: 'Ports', value: '2 USB-C + 1 USB-A', icon: 'ports' },
      { label: 'Protocoles', value: 'PD 3.0, PPS, QC 4+', icon: 'protocol' },
      { label: 'Taille', value: '50% plus compact', icon: 'size' },
      { label: 'Protection', value: '8 couches sécurité', icon: 'shield' },
      { label: 'Prise', value: 'EU/UK/US incluses', icon: 'plug' },
      { label: 'Certification', value: 'CE, FCC, RoHS', icon: 'certificate' }
    ],
    highlights: [
      'Technologie GaN III avancée',
      '65W pour laptops et mobiles',
      '3 ports charge simultanée',
      '50% plus compact',
      'Multi-protocoles universels'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 142,
      distribution: { 5: 118, 4: 19, 3: 4, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['GaN', '65W', 'Compact']
  },

  // Monster Batterie Externe 20000mAh
  {
    id: 'monster-batterie-20000mah',
    airtableId: 'recMONSTERPOWER001',
    sku: 'MONSTER-POWER-20K',
    name: 'MONSTER Batterie Externe 20000mAh PD 22.5W',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeurs',
    price: 39.99,
    originalPrice: 54.99,
    discount: 27,
    promo: 'AUTONOMIE MAX',
    description: "La batterie externe Monster 20000mAh assure une autonomie exceptionnelle pour tous vos appareils mobiles. Capacité massive permettant 5 charges complètes iPhone 15 ou 3 charges iPad Air. Charge rapide bidirectionnelle 22.5W via USB-C Power Delivery pour recharge ultra-rapide des appareils et de la batterie elle-même (3h pour charge complète). Triple sortie simultanée : USB-C PD, USB-A QC 3.0 et USB-A standard pour charger 3 appareils. Écran LED digital affiche précisément pourcentage batterie restante. Cellules lithium-polymère haute densité garantissent 1000+ cycles charge. Mode charge faible puissance pour écouteurs et montres connectées. Protection intelligente contre surcharge, décharge excessive, court-circuit et surchauffe. Design slim 15mm d'épaisseur facilite transport poche ou sac. Surface anti-dérapante et coins renforcés résistent aux chocs quotidiens. Compatible charge pass-through permet utilisation pendant propre recharge. Lampe LED intégrée pour éclairage urgence. Certifié transport aérien pour voyages. Indispensable pour journées intenses à La Réunion.",
    shortDescription: 'Batterie 20000mAh avec charge rapide PD 22.5W et écran LED',
    metaTitle: 'MONSTER Batterie Externe 20000mAh PD - iPhone iPad | Monster Phone 974',
    metaDescription: 'Batterie externe Monster 20000mAh charge rapide 22.5W. 5 charges iPhone, écran LED, 3 ports. Ultra-slim, certifiée avion. Livraison La Réunion.',
    urlSlug: 'monster-batterie-externe-20000mah-pd',
    keywords: ['batterie externe', '20000mAh', 'Monster', 'powerbank', 'PD', 'charge rapide', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000PWR001', stock: 45, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000PWR002', stock: 38, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Capacité', value: '20000mAh / 74Wh', icon: 'battery' },
      { label: 'Charge rapide', value: '22.5W PD', icon: 'speed' },
      { label: 'Ports', value: '1 USB-C + 2 USB-A', icon: 'ports' },
      { label: 'Recharge', value: '3h avec 18W', icon: 'time' },
      { label: 'Écran', value: 'LED digital %', icon: 'display' },
      { label: 'Épaisseur', value: '15mm ultra-slim', icon: 'size' },
      { label: 'Cycles', value: '1000+ charges', icon: 'cycle' },
      { label: 'Sécurité', value: 'Multi-protection', icon: 'shield' }
    ],
    highlights: [
      '5 charges iPhone complètes',
      'Charge rapide 22.5W',
      'Écran LED pourcentage',
      'Ultra-slim 15mm',
      '3 appareils simultanés'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 298,
      distribution: { 5: 220, 4: 62, 3: 12, 2: 3, 1: 1 }
    },
    warranty: '18 mois constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['20000mAh', 'PD', 'Digital']
  },

  // Monster Chargeur Voiture 45W
  {
    id: 'monster-chargeur-voiture-45w',
    airtableId: 'recMONSTERCAR001',
    sku: 'MONSTER-CAR-45W',
    name: 'MONSTER Chargeur Voiture 45W Dual USB-C',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeurs',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    promo: 'AUTO CHARGE',
    description: "Le chargeur voiture Monster 45W transforme votre allume-cigare en station de charge haute performance. Double port USB-C Power Delivery permet charge simultanée de 2 appareils avec répartition intelligente 25W+20W ou 45W single. Compatible 12V/24V fonctionne dans voitures, camions, camping-cars. Puce intelligente reconnaît automatiquement appareils et ajuste puissance optimale. Design aluminium avec dissipation thermique avancée prévient surchauffe même en usage intensif. LED ambiante bleue facilite localisation ports dans obscurité. Système anti-vibration maintient connexion stable sur routes cahoteuses. Protection contre surtension véhicule et pics électriques démarrage moteur. Charge iPhone 15 à 50% en 30min ou MacBook Air en conduite. Compact 5cm ne gêne pas levier vitesse ou autres commandes. Contacts plaqués or résistent corrosion environnement automobile. Ressorts renforcés garantissent maintien ferme dans prise. Certification CE automobile et test -20°C à +80°C. Parfait pour trajets quotidiens et road trips à La Réunion.",
    shortDescription: 'Chargeur voiture 45W double USB-C avec charge rapide PD',
    metaTitle: 'MONSTER Chargeur Voiture 45W USB-C - iPhone Samsung | Monster Phone 974',
    metaDescription: 'Chargeur voiture Monster 45W double USB-C PD. Charge rapide 2 appareils, aluminium premium, LED. Compatible 12V/24V. Livraison La Réunion.',
    urlSlug: 'monster-chargeur-voiture-45w-usbc',
    keywords: ['chargeur voiture', '45W', 'USB-C', 'Monster', 'allume-cigare', 'PD', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000CAR001', stock: 58, images: [] },
      { color: 'Argent', colorCode: '#C0C0C0', ean: '3402000CAR002', stock: 42, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Puissance', value: '45W total', icon: 'power' },
      { label: 'Ports', value: '2x USB-C PD', icon: 'ports' },
      { label: 'Répartition', value: '25W+20W ou 45W', icon: 'split' },
      { label: 'Compatibilité', value: '12V/24V', icon: 'car' },
      { label: 'Matériau', value: 'Aluminium', icon: 'material' },
      { label: 'LED', value: 'Éclairage bleu', icon: 'light' },
      { label: 'Température', value: '-20°C à +80°C', icon: 'temperature' },
      { label: 'Taille', value: '5cm compact', icon: 'size' }
    ],
    highlights: [
      'Double USB-C 45W',
      'Charge 2 appareils',
      'Aluminium premium',
      'LED localisation nuit',
      'Anti-vibration stable'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 187,
      distribution: { 5: 128, 4: 45, 3: 10, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['45W', 'Dual USB-C', 'Auto']
  },

  // Monster Station Charge Sans Fil 15W
  {
    id: 'monster-chargeur-sans-fil',
    airtableId: 'recMONSTERWIRELESS001',
    sku: 'MONSTER-WIRELESS-15W',
    name: 'MONSTER Station Charge Sans Fil 15W Qi',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeurs',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    promo: 'SANS FIL',
    description: "La station de charge sans fil Monster 15W offre la liberté de charge par induction magnétique Qi. Compatible avec tous smartphones Qi incluant iPhone 12+ MagSafe et Samsung Galaxy. Puissance adaptative : 15W Android, 7.5W iPhone, 5W écouteurs. Bobines doubles élargies permettent charge dans toute position portrait ou paysage. Surface antidérapante silicone protège téléphone des rayures et maintient position stable. Détection corps étrangers stoppe charge si objet métallique détecté pour sécurité. Ventilateur silencieux intégré dissipe chaleur pour charge optimale continue. LED indicateur multicolore : bleu charge, vert complet, rouge erreur. Design ultra-fin 8mm s'intègre discrètement bureau ou table chevet. Compatible charge avec coques jusqu'à 5mm épaisseur (sans métal). Mode nuit désactive LED automatiquement après 10 secondes. Protection FOD (Foreign Object Detection) et contrôle température intelligent. Câble USB-C 1.5m et adaptateur 18W QC 3.0 inclus. Certification Qi et tests sécurité garantissent charge fiable quotidienne à La Réunion.",
    shortDescription: 'Chargeur sans fil Qi 15W avec charge rapide adaptative',
    metaTitle: 'MONSTER Chargeur Sans Fil 15W Qi - iPhone Samsung | Monster Phone 974',
    metaDescription: 'Station charge sans fil Monster 15W Qi. Compatible iPhone MagSafe, Samsung. Charge rapide, ultra-fin, ventilateur silencieux. La Réunion 974.',
    urlSlug: 'monster-station-charge-sans-fil-15w',
    keywords: ['chargeur sans fil', 'Qi', '15W', 'Monster', 'wireless', 'MagSafe', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000QI001', stock: 48, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '3402000QI002', stock: 35, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Puissance', value: '15W max adaptive', icon: 'power' },
      { label: 'Standard', value: 'Qi certified', icon: 'certificate' },
      { label: 'Compatibilité', value: 'iPhone/Android', icon: 'phone' },
      { label: 'Bobines', value: 'Double coil', icon: 'coil' },
      { label: 'Épaisseur', value: '8mm ultra-fin', icon: 'size' },
      { label: 'Coque', value: 'Jusqu\'à 5mm', icon: 'case' },
      { label: 'Protection', value: 'FOD + température', icon: 'shield' },
      { label: 'Ventilateur', value: 'Silencieux intégré', icon: 'fan' }
    ],
    highlights: [
      'Charge 15W ultra-rapide',
      'Compatible tous Qi',
      'Ultra-fin 8mm',
      'Ventilateur silencieux',
      'Détection objets étrangers'
    ],
    images: [],
    rating: {
      average: 4.5,
      count: 224,
      distribution: { 5: 145, 4: 58, 3: 15, 2: 5, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Wireless', '15W', 'Qi']
  },

  // Monster Chargeur Multiple 6 Ports
  {
    id: 'monster-chargeur-6-ports',
    airtableId: 'recMONSTER6PORT001',
    sku: 'MONSTER-6PORT-120W',
    name: 'MONSTER Station Charge 6 Ports 120W Desktop',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeurs',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    promo: 'FAMILLE',
    description: "La station de charge Monster 6 ports 120W est la solution ultime pour familles et bureaux multi-appareils. Puissance totale 120W répartie intelligemment sur 6 ports : 3 USB-C PD (65W/30W/20W) et 3 USB-A QC (18W chacun). Technologie GaN II permet design compact malgré puissance élevée. Charge simultanée laptop, tablette, 2 smartphones, écouteurs et montre sans perte performance. Système allocation dynamique ajuste automatiquement puissance selon besoins chaque appareil. Écran LCD affiche tension, courant et puissance temps réel chaque port. Protection individuelle par port avec fusibles réarmables automatiques. Ventilation active silencieuse maintient température optimale charge intensive. Base antidérapante lestée stabilité parfaite sur bureau. Séparateurs amovibles organisent câbles proprement. Compatible tous protocoles : PD 3.0, QC 4+, AFC, FCP, PPS. Cordon alimentation 1.5m avec prise terre sécurité renforcée. Mode éco coupe ports inutilisés pour économie énergie. Boîtier aluminium anodisé dissipe efficacement chaleur. Solution professionnelle pour espaces travail connectés La Réunion.",
    shortDescription: 'Station 6 ports 120W avec écran LCD et charge intelligente',
    metaTitle: 'MONSTER Station 6 Ports 120W - Multi-Charge Bureau | Monster Phone 974',
    metaDescription: 'Station charge Monster 6 ports 120W. 3 USB-C PD + 3 USB-A QC, écran LCD, GaN II. Charge 6 appareils simultanément. Livraison La Réunion.',
    urlSlug: 'monster-station-charge-6-ports-120w',
    keywords: ['station charge', '6 ports', '120W', 'Monster', 'multi-charge', 'bureau', 'La Réunion'],
    variants: [
      { color: 'Gris Sidéral', colorCode: '#4A4A4A', ean: '34020006PORT001', stock: 25, images: [] }
    ],
    defaultVariant: 'Gris Sidéral',
    specifications: [
      { label: 'Puissance', value: '120W total', icon: 'power' },
      { label: 'Ports', value: '3 USB-C + 3 USB-A', icon: 'ports' },
      { label: 'Technologie', value: 'GaN II', icon: 'chip' },
      { label: 'Écran', value: 'LCD monitoring', icon: 'display' },
      { label: 'USB-C Max', value: '65W PD', icon: 'speed' },
      { label: 'Protection', value: 'Individuelle/port', icon: 'shield' },
      { label: 'Ventilation', value: 'Active silencieuse', icon: 'fan' },
      { label: 'Matériau', value: 'Aluminium anodisé', icon: 'material' }
    ],
    highlights: [
      '6 ports charge simultanée',
      'Écran LCD monitoring',
      'Technologie GaN II',
      '120W puissance totale',
      'Protection par port'
    ],
    images: [],
    rating: {
      average: 4.9,
      count: 98,
      distribution: { 5: 85, 4: 11, 3: 2, 2: 0, 1: 0 }
    },
    warranty: '3 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['120W', '6 Ports', 'Pro']
  },

  // ========== SUPPORTS GAMING (5 produits) ==========

  // Monster Support Manette RGB
  {
    id: 'monster-support-manette-rgb',
    airtableId: 'recMONSTERCONTROL001',
    sku: 'MONSTER-CONTROLLER-STAND',
    name: 'MONSTER Support Manette Gaming RGB Premium',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Supports gaming',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    promo: 'GAMING SETUP',
    description: "Le support manette Monster RGB transforme vos contrôleurs en véritables œuvres d'art lumineuses. Compatible universellement avec PS5, PS4, Xbox Series, Switch Pro et manettes PC. Base lestée anti-basculement avec surface soft-touch protège manettes des rayures. Éclairage RGB personnalisable 16 millions couleurs avec 12 modes dynamiques. Bras ajustables accueillent 2 manettes simultanément angle exposition optimal. Système charge intégré via USB-C maintient manettes toujours prêtes (câbles inclus). Hub USB 2 ports supplémentaires pour périphériques gaming. Construction aluminium brossé et ABS renforcé garantit durabilité extrême. Gestion câbles intégrée maintient setup propre et organisé. Patins antidérapants silicone stabilité parfaite sur toute surface. Contrôle tactile LED permet changement rapide modes éclairage. Compatible montage mural avec kit fixation inclus. Dimensions compactes 15x20x10cm optimisent espace bureau gaming. Alimentation USB simple depuis PC, console ou adaptateur. Complément idéal pour setup gaming professionnel à La Réunion.",
    shortDescription: 'Support 2 manettes avec RGB personnalisable et charge USB',
    metaTitle: 'MONSTER Support Manette RGB - PS5 Xbox Switch | Monster Phone 974',
    metaDescription: 'Support manette gaming Monster RGB premium. Compatible PS5, Xbox, Switch. Éclairage 16M couleurs, charge USB, aluminium. Setup gaming La Réunion.',
    urlSlug: 'monster-support-manette-gaming-rgb',
    keywords: ['support manette', 'RGB', 'gaming', 'PS5', 'Xbox', 'Monster', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000CTRL001', stock: 38, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Compatibilité', value: 'PS5/PS4/Xbox/Switch', icon: 'gamepad' },
      { label: 'Capacité', value: '2 manettes', icon: 'number' },
      { label: 'RGB', value: '16M couleurs', icon: 'palette' },
      { label: 'Modes', value: '12 effets', icon: 'effects' },
      { label: 'Charge', value: 'USB-C intégrée', icon: 'battery' },
      { label: 'Hub', value: '2 ports USB', icon: 'ports' },
      { label: 'Matériau', value: 'Aluminium + ABS', icon: 'material' },
      { label: 'Dimensions', value: '15x20x10cm', icon: 'size' }
    ],
    highlights: [
      'RGB 16 millions couleurs',
      'Charge 2 manettes',
      'Compatible toutes consoles',
      'Hub USB intégré',
      'Aluminium premium'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 156,
      distribution: { 5: 115, 4: 32, 3: 7, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['RGB', 'Gaming', 'Premium']
  },

  // Monster Support Casque Gaming LED
  {
    id: 'monster-support-casque-led',
    airtableId: 'recMONSTERHEADSET001',
    sku: 'MONSTER-HEADSET-STAND',
    name: 'MONSTER Support Casque Gaming LED Pro',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Supports gaming',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    promo: 'SETUP PRO',
    description: "Le support casque Monster LED Pro combine esthétique gaming et fonctionnalité avancée. Structure aluminium anodisé noir mat avec finitions premium résiste au poids des casques les plus lourds. Base LED circulaire diffuse éclairage ambiant personnalisable 7 couleurs + mode respiration. Hub USB 3.0 intégré 3 ports facilite connexion périphériques gaming : souris, clavier, clé USB. Port audio 3.5mm frontal permet branchement rapide casque sans chercher port PC. Surface caoutchoutée arceau protège bandeau casque de l'usure et déformation. Base lestée 500g avec patins antidérapants garantit stabilité absolue. Hauteur 28cm accommode tous types casques : gaming, studio, VR. Système gestion câbles arrière maintient fils organisés proprement. Alimentation USB unique simplifie installation (câble 1.5m inclus). Indicateurs LED ports USB montrent activité transfert données. Construction modulaire permet démontage facile pour transport LAN party. Compatible tous casques marché incluant modèles sans fil station charge. Accessoire indispensable pour setup gaming organisé et professionnel à La Réunion.",
    shortDescription: 'Support casque avec hub USB 3.0 et LED ambiance 7 couleurs',
    metaTitle: 'MONSTER Support Casque Gaming LED - Hub USB Setup | Monster Phone 974',
    metaDescription: 'Support casque gaming Monster LED Pro. Hub USB 3.0, LED 7 couleurs, aluminium premium, port audio. Setup gaming parfait La Réunion.',
    urlSlug: 'monster-support-casque-gaming-led',
    keywords: ['support casque', 'gaming', 'LED', 'Monster', 'hub USB', 'setup', 'La Réunion'],
    variants: [
      { color: 'Noir Mat', colorCode: '#1A1A1A', ean: '3402000HEAD001', stock: 42, images: [] }
    ],
    defaultVariant: 'Noir Mat',
    specifications: [
      { label: 'Matériau', value: 'Aluminium anodisé', icon: 'material' },
      { label: 'Hub USB', value: '3 ports USB 3.0', icon: 'ports' },
      { label: 'LED', value: '7 couleurs + modes', icon: 'light' },
      { label: 'Audio', value: 'Port 3.5mm frontal', icon: 'audio' },
      { label: 'Hauteur', value: '28cm', icon: 'height' },
      { label: 'Base', value: '500g lestée', icon: 'weight' },
      { label: 'Alimentation', value: 'USB 5V', icon: 'power' },
      { label: 'Compatibilité', value: 'Tous casques', icon: 'headset' }
    ],
    highlights: [
      'Hub USB 3.0 intégré',
      'LED 7 couleurs',
      'Aluminium premium',
      'Port audio frontal',
      'Base ultra-stable'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 198,
      distribution: { 5: 138, 4: 45, 3: 12, 2: 3, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['LED', 'USB 3.0', 'Pro']
  },

  // Monster Tapis Souris Gaming XXL RGB
  {
    id: 'monster-tapis-souris-xxl',
    airtableId: 'recMONSTERMOUSE001',
    sku: 'MONSTER-MOUSEPAD-XXL',
    name: 'MONSTER Tapis Souris Gaming XXL RGB 900x400mm',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Supports gaming',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    promo: 'XXL SIZE',
    description: "Le tapis souris Monster XXL RGB redéfinit l'espace de jeu avec ses dimensions généreuses 900x400mm. Surface micro-texturée optimisée offre glisse parfaite pour mouvements rapides et précision pixel-perfect arrêts. Compatible tous capteurs : optique, laser, nouvelle génération 20000+ DPI. Éclairage RGB périmétrique 14 zones personnalisables via logiciel dédié. Synchronisation possible avec écosystèmes RGB majeurs : Razer Chroma, Corsair iCUE, ASUS Aura. Base caoutchouc antidérapant 4mm maintient position même lors mouvements intenses. Bords cousus renforcés empêchent effilochage garantissent durabilité années utilisation. Surface résistante eau et taches facilite nettoyage entretien quotidien. Câble USB tressé 1.8m avec ferrite réduit interférences. Mode mémoire sauvegarde profils RGB sans logiciel actif. Technologie diffusion lumière uniforme évite points chauds LED. Épaisseur 4mm offre confort poignet sessions gaming prolongées. Zone dédiée repose-poignets ergonomique intégrée. Sac transport inclus protection déplacements LAN events. Transformation complète bureau gaming setup RGB coordonné La Réunion.",
    shortDescription: 'Tapis XXL 900x400mm avec RGB 14 zones et surface optimisée',
    metaTitle: 'MONSTER Tapis Souris XXL RGB 900x400 - Gaming Pro | Monster Phone 974',
    metaDescription: 'Tapis souris gaming Monster XXL RGB 900x400mm. 14 zones LED, surface micro-texturée, compatible haute DPI. Setup gaming XXL La Réunion.',
    urlSlug: 'monster-tapis-souris-gaming-xxl-rgb',
    keywords: ['tapis souris', 'XXL', 'RGB', 'gaming', 'Monster', '900x400', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000MOUSE001', stock: 32, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Dimensions', value: '900x400x4mm', icon: 'size' },
      { label: 'Surface', value: 'Micro-texturée', icon: 'texture' },
      { label: 'RGB', value: '14 zones', icon: 'light' },
      { label: 'Compatibilité', value: 'Tous capteurs', icon: 'sensor' },
      { label: 'Base', value: 'Caoutchouc 4mm', icon: 'base' },
      { label: 'Bords', value: 'Cousus renforcés', icon: 'edge' },
      { label: 'Sync RGB', value: 'Multi-écosystème', icon: 'sync' },
      { label: 'Câble', value: 'USB 1.8m tressé', icon: 'cable' }
    ],
    highlights: [
      'XXL 900x400mm',
      'RGB 14 zones',
      'Surface gaming optimisée',
      'Sync écosystèmes RGB',
      'Bords cousus durables'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 145,
      distribution: { 5: 118, 4: 22, 3: 4, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['XXL', 'RGB', 'Pro Gaming']
  },

  // Monster Bungee Souris Gaming
  {
    id: 'monster-bungee-souris',
    airtableId: 'recMONSTERBUNGEE001',
    sku: 'MONSTER-BUNGEE',
    name: 'MONSTER Bungee Souris Gaming Anti-Friction',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Supports gaming',
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    promo: 'PRO GAMER',
    description: "Le bungee souris Monster élimine définitivement friction et accrochage câble pendant sessions gaming intenses. Bras flexible silicone medical-grade maintient câble hauteur optimale sans résistance. Compatible tous diamètres câbles souris 1.5mm à 4mm marché. Base lestée 280g avec 6 patins antidérapants garantit stabilité absolue même mouvements rapides. Hub USB 2.0 intégré 4 ports augmente connectivité setup gaming. LED RGB personnalisable base ajoute touche esthétique setup coordonné. Système ressort tension ajustable adapte différentes longueurs préférences câble. Revêtement soft-touch empêche rayures câble maintient souplesse long terme. Hauteur réglable 13-20cm accommode différentes configurations bureau. Système clip rapide permet installation/retrait câble une main. Port charge USB-C additionnel pour souris sans fil gaming. Construction ABS renforcé fibre verre résiste années utilisation intensive. Design compact n'encombre pas espace jeu précieux. Amélioration immédiate précision et confort pour FPS et MOBA compétitifs. Accessoire essentiel joueurs sérieux recherchant avantage compétitif La Réunion.",
    shortDescription: 'Bungee anti-friction avec hub USB et base lestée 280g',
    metaTitle: 'MONSTER Bungee Souris Gaming - Anti-Friction Pro | Monster Phone 974',
    metaDescription: 'Bungee souris gaming Monster anti-friction. Hub USB 4 ports, base 280g stable, LED RGB. Précision maximale gaming La Réunion.',
    urlSlug: 'monster-bungee-souris-gaming',
    keywords: ['bungee souris', 'gaming', 'Monster', 'anti-friction', 'hub USB', 'FPS', 'La Réunion'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '3402000BUNGEE001', stock: 52, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Base', value: '280g lestée', icon: 'weight' },
      { label: 'Hub USB', value: '4 ports 2.0', icon: 'ports' },
      { label: 'Hauteur', value: '13-20cm réglable', icon: 'height' },
      { label: 'Câbles', value: '1.5-4mm diamètre', icon: 'cable' },
      { label: 'LED', value: 'RGB personnalisable', icon: 'light' },
      { label: 'Patins', value: '6 antidérapants', icon: 'grip' },
      { label: 'Matériau', value: 'ABS + silicone', icon: 'material' },
      { label: 'USB-C', value: 'Port charge bonus', icon: 'charge' }
    ],
    highlights: [
      'Élimine friction câble',
      'Hub USB 4 ports',
      'Base 280g ultra-stable',
      'LED RGB gaming',
      'Hauteur ajustable'
    ],
    images: [],
    rating: {
      average: 4.5,
      count: 267,
      distribution: { 5: 168, 4: 72, 3: 20, 2: 5, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Anti-Friction', 'USB Hub', 'Pro']
  },

  // Monster Support Écran Gaming RGB
  {
    id: 'monster-support-ecran-rgb',
    airtableId: 'recMONSTERMONITOR001',
    sku: 'MONSTER-MONITOR-STAND',
    name: 'MONSTER Support Écran Gaming RGB avec Tiroirs',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Supports gaming',
    price: 54.99,
    originalPrice: 69.99,
    discount: 21,
    promo: 'ERGONOMIE',
    description: "Le support écran Monster RGB améliore ergonomie et esthétique setup gaming complet. Élévation écran 10cm réduit fatigue cervicale aligne vision angle optimal. Plateau supérieur supporte jusqu'à 30kg compatible tous moniteurs 32 pouces max. Bande LED RGB intégrée périmètre diffuse éclairage ambiant personnalisable. 2 tiroirs coulissants latéraux rangent accessoires gaming : manettes, câbles, disques. Surface supérieure 60x25cm accueille écran et périphériques additionnels. Hub USB 3.0 frontal 4 ports facilite connexion rapide appareils. Passe-câbles intégré maintient workspace organisé sans enchevêtrement. Construction MDF premium 18mm avec finition noir mat anti-rayures. Pieds aluminium réglables hauteur compensent irrégularités bureau. Système ventilation passif évite surchauffe équipements posés dessus. Compatible VESA permet installation bras moniteur additionnel si besoin. Espace stockage inférieur 8cm hauteur range clavier taille normale. Charge wireless Qi 10W intégrée coin droit pour smartphone. Installation sans outils montage rapide 5 minutes. Solution ergonomique complète pour sessions gaming prolongées confortables La Réunion.",
    shortDescription: 'Support écran avec tiroirs, hub USB et RGB ambiance gaming',
    metaTitle: 'MONSTER Support Écran Gaming RGB - Ergonomie Setup | Monster Phone 974',
    metaDescription: 'Support écran gaming Monster RGB avec tiroirs rangement. Hub USB 3.0, charge Qi, élévation ergonomique. Setup gaming complet La Réunion.',
    urlSlug: 'monster-support-ecran-gaming-rgb-tiroirs',
    keywords: ['support écran', 'gaming', 'RGB', 'Monster', 'ergonomie', 'tiroirs', 'La Réunion'],
    variants: [
      { color: 'Noir Mat', colorCode: '#1A1A1A', ean: '3402000MONITOR001', stock: 28, images: [] }
    ],
    defaultVariant: 'Noir Mat',
    specifications: [
      { label: 'Dimensions', value: '60x25x10cm', icon: 'size' },
      { label: 'Capacité', value: '30kg max', icon: 'weight' },
      { label: 'Tiroirs', value: '2 coulissants', icon: 'drawer' },
      { label: 'Hub USB', value: '4 ports 3.0', icon: 'ports' },
      { label: 'RGB', value: 'LED périmètre', icon: 'light' },
      { label: 'Charge Qi', value: '10W intégrée', icon: 'wireless' },
      { label: 'Matériau', value: 'MDF 18mm premium', icon: 'material' },
      { label: 'Écran max', value: '32 pouces', icon: 'monitor' }
    ],
    highlights: [
      'Élévation ergonomique 10cm',
      '2 tiroirs rangement',
      'Hub USB 3.0 frontal',
      'RGB gaming ambiance',
      'Charge wireless Qi'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 112,
      distribution: { 5: 82, 4: 24, 3: 5, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Ergonomie', 'RGB', 'Storage']
  },

  // ========== MONTRES CONNECTÉES ==========
  
  // HIFUTURE MIX2
  {
    id: 'hifuture-mix2',
    airtableId: 'rec4euPu7FP1sX7Rs',
    sku: 'HIFUTURE-MIX2',
    name: 'HIFUTURE MIX2',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres connectées',
    price: 99.99,
    description: "La montre connectée HIFUTURE MIX2 représente l'excellence technologique au service de votre bien-être quotidien. Son écran AMOLED haute résolution offre une lisibilité parfaite sous le soleil tropical réunionnais, avec des couleurs éclatantes et des contrastes profonds qui subliment chaque interface. Le suivi santé complet intègre les technologies les plus avancées : moniteur cardiaque fonctionnant 24h/24 avec alertes personnalisables, oxymètre de pouls (SpO2) pour surveiller votre oxygénation sanguine, analyse détaillée des phases de sommeil incluant sommeil paradoxal et score de qualité. Le GPS intégré haute précision cartographie tous vos parcours sportifs sans nécessiter votre smartphone.",
    shortDescription: "Montre connectée performance avec écran AMOLED HD et GPS intégré",
    metaTitle: 'HIFUTURE MIX2 - Montre Connectée Performance | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE MIX2 avec écran AMOLED HD et GPS intégré. Suivi santé complet 24/7, étanchéité IP67, autonomie 7-10 jours.',
    urlSlug: 'hifuture-mix2-montre-connectee-performance',
    keywords: ['HIFUTURE MIX2', 'montre connectée', 'performance', 'suivi santé', 'autonomie', 'noir', 'orange'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576181008', stock: 15, images: [] },
      { color: 'Orange', colorCode: '#FF6B35', ean: '6972576181022', stock: 12, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED haute résolution', icon: 'display' },
      { label: 'GPS', value: 'Intégré', icon: 'location' },
      { label: 'Résistance', value: 'IP67', icon: 'shield' },
      { label: 'Autonomie', value: '7-10 jours', icon: 'battery' }
    ],
    highlights: [
      'Écran AMOLED HD',
      'GPS intégré haute précision',
      'Suivi santé 24/7',
      'Certification IP67',
      'Autonomie 7-10 jours'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 234,
      distribution: { 5: 140, 4: 70, 3: 20, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Performance', 'GPS']
  },

  // HIFUTURE EVO 2
  {
    id: 'hifuture-evo-2',
    airtableId: 'rec6JaK5QMeh88r3m',
    sku: 'HIFUTURE-EVO-2',
    name: 'HIFUTURE EVO 2',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres connectées',
    price: 34.99,
    description: "La montre connectée HIFUTURE EVO 2 démocratise l'accès aux technologies de santé connectée avec un rapport qualité-prix exceptionnel. L'écran LCD couleur lumineux affiche clairement toutes vos données vitales et notifications. Le moniteur cardiaque optique surveille votre rythme en continu, détectant anomalies et tendances pour une prévention active.",
    shortDescription: "Montre connectée abordable avec suivi santé complet",
    metaTitle: 'HIFUTURE EVO 2 - Montre Connectée Abordable | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE EVO 2 au rapport qualité-prix imbattable. Écran couleur, suivi santé complet, IP68.',
    urlSlug: 'hifuture-evo-2-montre-connectee-abordable',
    keywords: ['HIFUTURE EVO 2', 'montre connectée', 'abordable', 'écran couleur', 'suivi santé'],
    variants: [
      { color: 'Beige', colorCode: '#F5DEB3', ean: '6972576181725', stock: 20, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '6972576181701', stock: 25, images: [] },
      { color: 'Rose Gold', colorCode: '#E0BFB8', ean: '6972576181718', stock: 18, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'LCD couleur', icon: 'display' },
      { label: 'Résistance', value: 'IP68', icon: 'shield' },
      { label: 'Autonomie', value: '5-7 jours', icon: 'battery' },
      { label: 'Cycle féminin', value: 'Oui (Beige/Rose Gold)', icon: 'heart' }
    ],
    highlights: [
      'Écran LCD couleur',
      'Suivi santé complet',
      'Certification IP68',
      'Rapport qualité-prix excellent',
      'Design élégant'
    ],
    images: [],
    rating: {
      average: 4.4,
      count: 567,
      distribution: { 5: 300, 4: 200, 3: 50, 2: 15, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Meilleur prix', 'Populaire']
  },

  // HIFUTURE Zone 2
  {
    id: 'hifuture-zone-2',
    airtableId: 'rec8lWHktlfatIBkr',
    sku: 'HIFUTURE-ZONE-2',
    name: 'HIFUTURE Zone 2',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres connectées',
    price: 49.99,
    description: "La montre connectée HIFUTURE Zone 2 incarne la polyvalence absolue pour les utilisateurs actifs. Son écran AMOLED lumineux garantit une visibilité cristalline même sous le soleil éclatant de La Réunion. Le suivi multi-sport révolutionnaire propose plus de 20 modes d'entraînement spécialisés.",
    shortDescription: "Montre connectée polyvalente avec écran AMOLED et 20+ modes sport",
    metaTitle: 'HIFUTURE Zone 2 - Montre Connectée Polyvalente | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Zone 2 avec écran AMOLED et 20+ modes sport. GPS intégré, capteurs avancés, IP67.',
    urlSlug: 'hifuture-zone-2-montre-connectee-polyvalente',
    keywords: ['HIFUTURE Zone 2', 'montre connectée', 'polyvalente', 'AMOLED', 'multi-sport'],
    variants: [
      { color: 'Gris', colorCode: '#808080', ean: '6972576181268', stock: 15, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '6972576181251', stock: 12, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '6972576181244', stock: 20, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED', icon: 'display' },
      { label: 'GPS', value: 'Intégré', icon: 'location' },
      { label: 'Résistance', value: 'IP67', icon: 'shield' },
      { label: 'Autonomie', value: '7-10 jours', icon: 'battery' }
    ],
    highlights: [
      'Écran AMOLED',
      'GPS intégré haute sensibilité',
      '20+ modes sport',
      'Design unisexe',
      'Certification IP67'
    ],
    images: [],
    rating: {
      average: 4.5,
      count: 189,
      distribution: { 5: 100, 4: 60, 3: 20, 2: 7, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Multi-sport', 'Unisexe']
  },

  // HIFUTURE GO PRO
  {
    id: 'hifuture-go-pro',
    airtableId: 'recCyaVqCobr575k0',
    sku: 'HIFUTURE-GO-PRO',
    name: 'HIFUTURE GO PRO',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres sport',
    price: 99.99,
    description: "La gamme HIFUTURE GO PRO établit de nouveaux standards pour les montres connectées dédiées aux athlètes. Le GPS haute précision multi-constellation (GPS, GLONASS, Galileo) garantit un tracking optimal. L'analyse VO2 Max évalue scientifiquement votre capacité aérobie maximale.",
    shortDescription: "Montre connectée sport pro avec GPS multi-constellation et analyse VO2 Max",
    metaTitle: 'HIFUTURE GO PRO - Montre Connectée Sport Pro | Monster Phone 974',
    metaDescription: 'Montres HIFUTURE GO PRO avec GPS multi-constellation et analyse VO2 Max. Écran AMOLED, ATM5, autonomie 12 jours.',
    urlSlug: 'hifuture-go-pro-montre-connectee-sport-pro',
    keywords: ['HIFUTURE GO PRO', 'montre sport', 'GPS', 'VO2 Max', 'performance'],
    variants: [
      { color: 'GO PRO Gris', colorCode: '#808080', ean: '6972576180919', stock: 10, images: [] },
      { color: 'GO PRO Noir', colorCode: '#000000', ean: '6972576180902', stock: 12, images: [] },
      { color: 'GO PRO 2 Noir', colorCode: '#1C1C1C', ean: '6972576182340', stock: 8, images: [] }
    ],
    defaultVariant: 'GO PRO Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED', icon: 'display' },
      { label: 'GPS', value: 'Multi-constellation', icon: 'location' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '8-12 jours', icon: 'battery' }
    ],
    highlights: [
      'GPS multi-constellation',
      'Analyse VO2 Max',
      'Écran AMOLED ultra-lumineux',
      'Résistance ATM5',
      'Mode triathlon'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 156,
      distribution: { 5: 120, 4: 30, 3: 5, 2: 1, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Sport Pro', 'Performance']
  },

  // HIFUTURE Active
  {
    id: 'hifuture-active',
    airtableId: 'recKZHxvbAdY7Citz',
    sku: 'HIFUTURE-ACTIVE',
    name: 'HIFUTURE Active',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres premium',
    price: 169.99,
    description: "La montre connectée HIFUTURE Active incarne l'excellence premium avec son boîtier métallique raffiné. L'écran AMOLED haute définition offre une luminosité exceptionnelle de 1000 nits. Plus de 100 modes sportifs couvrent toutes les disciplines imaginables.",
    shortDescription: "Montre connectée premium avec boîtier métallique et écran AMOLED 1000 nits",
    metaTitle: 'HIFUTURE Active - Montre Connectée Premium Métallique | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Active avec boîtier métallique premium et écran AMOLED 1000 nits. ATM5, 100+ modes sport, autonomie 16 jours.',
    urlSlug: 'hifuture-active-montre-connectee-premium-metallique',
    keywords: ['HIFUTURE Active', 'montre métallique', 'premium', 'AMOLED HD', 'sport avancé'],
    variants: [
      { color: 'Silver', colorCode: '#C0C0C0', ean: '6972576182012', stock: 6, images: [] },
      { color: 'Black + Red', colorCode: '#000000', ean: '6972576181992', stock: 8, images: [] }
    ],
    defaultVariant: 'Silver',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED HD 1000 nits', icon: 'display' },
      { label: 'GPS', value: 'Intégré', icon: 'location' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '12-16 jours', icon: 'battery' }
    ],
    highlights: [
      'Boîtier métallique premium',
      'Écran AMOLED 1000 nits',
      '100+ modes sport',
      'Certification ATM5',
      'Autonomie exceptionnelle'
    ],
    images: [],
    rating: {
      average: 4.9,
      count: 89,
      distribution: { 5: 75, 4: 12, 3: 2, 2: 0, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'Luxe']
  },

  // HIFUTURE Ultra2 Pro
  {
    id: 'hifuture-ultra2-pro',
    airtableId: 'recKqhg8jQkVmfndb',
    sku: 'HIFUTURE-ULTRA2-PRO',
    name: 'HIFUTURE Ultra2 Pro',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres connectées',
    price: 69.99,
    description: "La montre connectée HIFUTURE Ultra2 Pro représente le summum de la technologie portable avec ses fonctionnalités premium. L'écran AMOLED HD délivre des couleurs éclatantes et des noirs profonds avec un contraste infini.",
    shortDescription: "Montre connectée premium avec écran AMOLED HD et fonctions sport pro",
    metaTitle: 'HIFUTURE Ultra2 Pro - Montre Connectée Premium | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Ultra2 Pro avec écran AMOLED HD et fonctions sport pro. GPS intégré, ATM5, autonomie 12 jours.',
    urlSlug: 'hifuture-ultra2-pro-montre-connectee-premium',
    keywords: ['HIFUTURE Ultra2 Pro', 'montre connectée', 'premium', 'AMOLED HD', 'sport avancé'],
    variants: [
      { color: 'Black', colorCode: '#000000', ean: '6972576181145', stock: 15, images: [] },
      { color: 'Grise', colorCode: '#808080', ean: '6972576181152', stock: 12, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '6972576181169', stock: 10, images: [] }
    ],
    defaultVariant: 'Black',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED HD', icon: 'display' },
      { label: 'GPS', value: 'Intégré', icon: 'location' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '10-12 jours', icon: 'battery' }
    ],
    highlights: [
      'Écran AMOLED HD',
      'GPS intégré haute sensibilité',
      'Résistance ATM5',
      'Mode sport avancé',
      'Charge rapide'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 198,
      distribution: { 5: 130, 4: 50, 3: 15, 2: 2, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'Populaire']
  },

  // HIFUTURE Aurora
  {
    id: 'hifuture-aurora',
    airtableId: 'recLw7iKVoHWa4vSo',
    sku: 'HIFUTURE-AURORA',
    name: 'HIFUTURE Aurora',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres business',
    price: 89.99,
    description: "La montre connectée HIFUTURE Aurora harmonise parfaitement élégance professionnelle et performance technologique. Son boîtier métallique premium témoigne d'un savoir-faire horloger traditionnel enrichi des innovations les plus modernes.",
    shortDescription: "Montre connectée business avec boîtier métallique premium et écran AMOLED",
    metaTitle: 'HIFUTURE Aurora - Montre Connectée Business Métallique | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Aurora business avec boîtier métallique premium et écran AMOLED. Fonctions wellness, GPS, ATM5.',
    urlSlug: 'hifuture-aurora-montre-connectee-business-metallique',
    keywords: ['HIFUTURE Aurora', 'montre business', 'boîtier métallique', 'wellness', 'élégante'],
    variants: [
      { color: 'Silver', colorCode: '#C0C0C0', ean: '6972576182029', stock: 10, images: [] },
      { color: 'Bleu', colorCode: '#4169E1', ean: '6972576182036', stock: 8, images: [] },
      { color: 'Brown', colorCode: '#8B4513', ean: '6972576182050', stock: 6, images: [] }
    ],
    defaultVariant: 'Silver',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED', icon: 'display' },
      { label: 'GPS', value: 'Intégré', icon: 'location' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '10-12 jours', icon: 'battery' }
    ],
    highlights: [
      'Boîtier métallique premium',
      'Design business élégant',
      'Fonctions wellness complètes',
      'GPS intégré',
      'Charge sans fil Qi'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 145,
      distribution: { 5: 85, 4: 45, 3: 12, 2: 2, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Business', 'Élégant']
  },

  // HIFUTURE Vela
  {
    id: 'hifuture-vela',
    airtableId: 'recPghqrrlbMGB6ko',
    sku: 'HIFUTURE-VELA',
    name: 'HIFUTURE Vela',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres premium',
    price: 129.99,
    description: "La montre connectée HIFUTURE Vela incarne l'excellence absolue avec ses technologies de pointe. L'écran Always-On AMOLED révolutionnaire permet consultation permanente sans mouvement du poignet. Plus de 120 modes sportifs couvrent toutes les disciplines.",
    shortDescription: "Montre connectée haut de gamme avec écran Always-On AMOLED et 120+ modes sport",
    metaTitle: 'HIFUTURE Vela - Montre Connectée Haut de Gamme | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Vela haut de gamme avec écran Always-On AMOLED et 120+ modes sport. Wellness complet, GPS double fréquence, ATM5.',
    urlSlug: 'hifuture-vela-montre-connectee-premium',
    keywords: ['HIFUTURE Vela', 'montre haut de gamme', 'Always-On', 'sport professionnel', 'wellness'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182371', stock: 8, images: [] },
      { color: 'Beige', colorCode: '#F5DEB3', ean: '6972576182388', stock: 6, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'Always-On AMOLED', icon: 'display' },
      { label: 'GPS', value: 'Double fréquence', icon: 'location' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '10-14 jours', icon: 'battery' }
    ],
    highlights: [
      'Écran Always-On AMOLED',
      '120+ modes sport',
      'GPS double fréquence',
      'Boîtier céramique',
      'Autonomie remarquable'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 112,
      distribution: { 5: 85, 4: 20, 3: 5, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'Always-On']
  },

  // HIFUTURE Aura
  {
    id: 'hifuture-aura',
    airtableId: 'recUH7wOmWbF5YNFX',
    sku: 'HIFUTURE-AURA',
    name: 'HIFUTURE Aura',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres santé',
    price: 99.99,
    description: "La montre connectée HIFUTURE Aura synthétise l'excellence technologique avec ses fonctions santé avancées. L'écran Always-On révolutionnaire affiche en permanence informations essentielles. Les fonctions santé complètes incluent ECG médical pour détecter fibrillation auriculaire.",
    shortDescription: "Montre connectée premium avec ECG médical et écran Always-On",
    metaTitle: 'HIFUTURE Aura - Montre Connectée Premium Always-On | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Aura avec ECG médical et écran Always-On. Capteurs avancés PPG, autonomie 15 jours, ATM5.',
    urlSlug: 'hifuture-aura-montre-connectee-premium',
    keywords: ['HIFUTURE Aura', 'montre connectée', 'ECG', 'Always-On', 'santé complète'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576181176', stock: 12, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '6972576181183', stock: 10, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '6972576181190', stock: 8, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'Always-On', icon: 'display' },
      { label: 'ECG', value: 'Médical certifié', icon: 'heart' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '12-15 jours', icon: 'battery' }
    ],
    highlights: [
      'ECG médical certifié',
      'Écran Always-On',
      'Capteurs PPG avancés',
      'Autonomie 15 jours',
      'Bluetooth 5.0'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 167,
      distribution: { 5: 100, 4: 50, 3: 15, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['ECG', 'Santé']
  },

  // HIFUTURE Aura 2
  {
    id: 'hifuture-aura-2',
    airtableId: 'recUZQiyirUlUhiZa',
    sku: 'HIFUTURE-AURA-2',
    name: 'HIFUTURE Aura 2',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres santé',
    price: 89.99,
    description: "La montre connectée HIFUTURE Aura 2 perfectionne la formule gagnante avec améliorations significatives. L'écran Always-On lumineux nouvelle génération offre visibilité permanente améliorée avec consommation réduite de 30%.",
    shortDescription: "Montre connectée haut de gamme avec ECG certifié et écran Always-On amélioré",
    metaTitle: 'HIFUTURE Aura 2 - Montre Connectée Haut de Gamme | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Aura 2 avec ECG certifié et écran Always-On amélioré. GPS triple, ATM5, autonomie 15 jours.',
    urlSlug: 'hifuture-aura-2-montre-connectee-haut-gamme',
    keywords: ['HIFUTURE Aura 2', 'montre haut de gamme', 'ECG', 'Always-On', 'santé avancée'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182524', stock: 14, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '6972576182531', stock: 12, images: [] },
      { color: 'Rose Gold', colorCode: '#E0BFB8', ean: '6972576182548', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'Always-On amélioré', icon: 'display' },
      { label: 'ECG', value: 'Certifié', icon: 'heart' },
      { label: 'GPS', value: 'Triple constellation', icon: 'location' },
      { label: 'Autonomie', value: '12-15 jours', icon: 'battery' }
    ],
    highlights: [
      'ECG certifié',
      'Always-On nouvelle génération',
      'GPS triple constellation',
      'Certification MIL-STD-810H',
      'Charge rapide 50% en 30min'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 198,
      distribution: { 5: 140, 4: 45, 3: 10, 2: 3, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['ECG Certifié', 'Nouveau']
  },

  // HONOR CHOICE WATCH
  {
    id: 'honor-choice-watch',
    airtableId: 'recYEgkxqGIvVGFFX',
    sku: 'HONOR-CHOICE-WATCH',
    name: 'HONOR CHOICE WATCH',
    brand: 'HONOR',
    category: 'Montres',
    subcategory: 'Montres premium',
    price: 149.99,
    description: "La HONOR CHOICE WATCH redéfinit l'excellence des montres connectées premium. Son écran AMOLED haute résolution de 1.43 pouces offre une luminosité exceptionnelle. Les technologies exclusives IC et ANC révolutionnent votre expérience.",
    shortDescription: "Montre connectée premium avec technologies IC/ANC et écran AMOLED",
    metaTitle: 'HONOR CHOICE WATCH IC/ANC - Montre Connectée Premium AMOLED | Monster Phone 974',
    metaDescription: 'HONOR CHOICE WATCH : AMOLED, IC/ANC, GPS, 5ATM, 14 jours autonomie, 100+ sports. 3 coloris premium.',
    urlSlug: 'honor-choice-watch-connectee-premium',
    keywords: ['HONOR CHOICE WATCH', 'montre connectée', 'IC ANC', 'premium', 'AMOLED'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6971664934366', stock: 10, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '6971664934366', stock: 8, images: [] },
      { color: 'Or', colorCode: '#FFD700', ean: '6971664934366', stock: 6, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED 1.43"', icon: 'display' },
      { label: 'Technologies', value: 'IC & ANC', icon: 'cpu' },
      { label: 'Résistance', value: '5ATM', icon: 'shield' },
      { label: 'Autonomie', value: '14 jours', icon: 'battery' }
    ],
    highlights: [
      'Technologies IC & ANC exclusives',
      'Écran AMOLED 466x466 pixels',
      '100+ modes sportifs',
      'Résistance 5ATM',
      'Autonomie record 14 jours'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 234,
      distribution: { 5: 180, 4: 40, 3: 10, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'HONOR']
  },

  // HIFUTURE Ultra2
  {
    id: 'hifuture-ultra2',
    airtableId: 'rechVXYz3W8jLhAWk',
    sku: 'HIFUTURE-ULTRA2',
    name: 'HIFUTURE Ultra2',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres connectées',
    price: 69.99,
    description: "La montre connectée HIFUTURE Ultra2 représente le summum de la technologie portable. L'écran AMOLED massif de 2.0 pouces offre une surface d'affichage généreuse. La fonction appels Bluetooth transforme votre montre en véritable extension de votre smartphone.",
    shortDescription: "Montre connectée ultra performance avec écran AMOLED 2.0\" et appels Bluetooth",
    metaTitle: 'HIFUTURE Ultra2 - Montre Connectée Ultra Performance | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Ultra2 avec écran AMOLED 2.0", GPS multi-satellite, appels Bluetooth. Autonomie 12 jours, IP68.',
    urlSlug: 'hifuture-ultra2-montre-connectee-gps',
    keywords: ['HIFUTURE Ultra2', 'montre connectée', 'GPS', 'appels Bluetooth', 'AMOLED 2.0'],
    variants: [
      { color: 'Gris', colorCode: '#808080', ean: '34030003100036', stock: 15, images: [] },
      { color: 'Rose', colorCode: '#FFB6C1', ean: '34030003100036', stock: 12, images: [] }
    ],
    defaultVariant: 'Gris',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED 2.0"', icon: 'display' },
      { label: 'Appels', value: 'Bluetooth', icon: 'phone' },
      { label: 'GPS', value: 'Multi-satellite', icon: 'location' },
      { label: 'Autonomie', value: '12 jours', icon: 'battery' }
    ],
    highlights: [
      'Écran AMOLED 2.0 pouces',
      'Appels Bluetooth intégrés',
      'GPS multi-satellite',
      'Résistance IP68',
      'Autonomie record'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 278,
      distribution: { 5: 180, 4: 70, 3: 20, 2: 5, 1: 3 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Grand écran', 'Appels']
  },

  // HIFUTURE Lume
  {
    id: 'hifuture-lume',
    airtableId: 'reckeOZkf7TRgubVQ',
    sku: 'HIFUTURE-LUME',
    name: 'HIFUTURE Lume',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres lifestyle',
    price: 54.99,
    description: "Montre connectée HIFUTURE Lume avec éclairage LED unique pour style futuriste. Écran AMOLED lumineux parfait pour lifestyle urbain branché. Éclairage LED intégré idéal pour activités nocturnes et sport soir.",
    shortDescription: "Montre connectée LED urbaine avec design futuriste",
    metaTitle: 'HIFUTURE Lume - Montre Connectée LED Urbaine | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Lume avec éclairage LED et design urbain. Écran AMOLED, lifestyle moderne, autonomie optimisée. 54,99€.',
    urlSlug: 'hifuture-lume-montre-connectee-led-urbaine',
    keywords: ['HIFUTURE Lume', 'montre urbaine', 'LED', 'lifestyle', 'gaming'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182302', stock: 20, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '6972576182319', stock: 18, images: [] },
      { color: 'Vert', colorCode: '#00FF00', ean: '6972576182333', stock: 15, images: [] },
      { color: 'Champagne', colorCode: '#F7E7CE', ean: '6972576182326', stock: 12, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED', icon: 'display' },
      { label: 'Éclairage', value: 'LED intégré', icon: 'lightbulb' },
      { label: 'Résistance', value: 'IP67', icon: 'shield' },
      { label: 'Autonomie', value: '6-8 jours', icon: 'battery' }
    ],
    highlights: [
      'Éclairage LED unique',
      'Design futuriste',
      'GPS intégré',
      'Capteur de température',
      'Style urbain branché'
    ],
    images: [],
    rating: {
      average: 4.5,
      count: 345,
      distribution: { 5: 180, 4: 120, 3: 35, 2: 8, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['LED', 'Gaming']
  },

  // HIFUTURE AIX
  {
    id: 'hifuture-aix',
    airtableId: 'recm0BjFxGFWJfkzl',
    sku: 'HIFUTURE-AIX',
    name: 'HIFUTURE AIX',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres business',
    price: 119.99,
    description: "Découvrez l'élégance professionnelle avec la montre connectée HIFUTURE AIX. Boîtier en acier inoxydable premium pour durabilité et style incomparables. Écran en verre saphir ultra-résistant aux rayures.",
    shortDescription: "Montre connectée business premium avec boîtier acier inoxydable",
    metaTitle: 'HIFUTURE AIX - Montre Connectée Business Premium',
    metaDescription: 'Montre connectée HIFUTURE AIX avec boîtier acier premium et fonctions business. Disponible en gris et noir acier.',
    urlSlug: 'hifuture-aix-montre-connectee-business',
    keywords: ['HIFUTURE AIX', 'montre business', 'acier inoxydable', 'premium', 'saphir'],
    variants: [
      { color: 'Grise Acier', colorCode: '#708090', ean: '6972576181435', stock: 8, images: [] },
      { color: 'Noir Acier', colorCode: '#2F4F4F', ean: '6972576181428', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir Acier',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED + Saphir', icon: 'display' },
      { label: 'Matériaux', value: 'Acier inoxydable', icon: 'shield' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '10-14 jours', icon: 'battery' }
    ],
    highlights: [
      'Boîtier acier inoxydable',
      'Verre saphir anti-rayures',
      'Fonctions business avancées',
      'ECG intégré',
      'Design professionnel'
    ],
    images: [],
    rating: {
      average: 4.8,
      count: 123,
      distribution: { 5: 90, 4: 25, 3: 6, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Business', 'Saphir']
  },

  // HIFUTURE Lume Pro
  {
    id: 'hifuture-lume-pro',
    airtableId: 'recofAroAFUHL3cHQ',
    sku: 'HIFUTURE-LUME-PRO',
    name: 'HIFUTURE Lume Pro',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres lifestyle',
    price: 69.99,
    description: "Montre HIFUTURE Lume Pro avec éclairage LED avancé et fonctions sport professionnelles. Design sophistiqué disponible en noir, vert, pink ou titanium premium.",
    shortDescription: "Montre connectée LED premium avec fonctions sport pro",
    metaTitle: 'HIFUTURE Lume Pro - Montre Connectée LED Premium | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Lume Pro avec éclairage LED avancé et fonctions sport pro. Design sophistiqué, performance premium. 69,99€.',
    urlSlug: 'hifuture-lume-pro-montre-connectee-led-premium',
    keywords: ['HIFUTURE Lume Pro', 'LED premium', 'sport pro', 'titanium', 'gaming'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182401', stock: 15, images: [] },
      { color: 'Vert', colorCode: '#00FF00', ean: '6972576182425', stock: 12, images: [] },
      { color: 'Pink', colorCode: '#FFC0CB', ean: '6972576182432', stock: 10, images: [] },
      { color: 'Titanium', colorCode: '#878681', ean: '6972576182418', stock: 8, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED', icon: 'display' },
      { label: 'Éclairage', value: 'LED avancé', icon: 'lightbulb' },
      { label: 'Résistance', value: 'ATM5', icon: 'shield' },
      { label: 'Autonomie', value: '8-10 jours', icon: 'battery' }
    ],
    highlights: [
      'LED gaming avancée',
      'VO2 Max & Recovery',
      'Version titanium premium',
      'ATM5 pour natation',
      'Design sophistiqué'
    ],
    images: [],
    rating: {
      average: 4.6,
      count: 189,
      distribution: { 5: 110, 4: 60, 3: 15, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['LED Pro', 'Gaming']
  },

  // HIFUTURE MIXX 3
  {
    id: 'hifuture-mixx-3',
    airtableId: 'recsVQGLQQKI4OUha',
    sku: 'HIFUTURE-MIXX-3',
    name: 'HIFUTURE MIXX 3',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres innovation',
    price: 99.99,
    description: "Innovation technologique avec la montre HIFUTURE MIXX 3 à triple affichage. Multi-interface révolutionnaire pour personnalisation maximale. Design avancé disponible en noir professionnel ou jaune fluo haute visibilité.",
    shortDescription: "Montre connectée triple affichage avec design gaming avancé",
    metaTitle: 'HIFUTURE MIXX 3 - Montre Connectée Triple Affichage | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE MIXX 3 avec triple affichage innovant et design gaming avancé. 99,99€.',
    urlSlug: 'hifuture-mixx-3-montre-connectee-triple-affichage',
    keywords: ['HIFUTURE MIXX 3', 'triple affichage', 'gaming', 'innovation', 'jaune fluo'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182494', stock: 12, images: [] },
      { color: 'Jaune Fluo', colorCode: '#FFFF00', ean: '6972576182562', stock: 10, images: [] }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type Écran', value: 'AMOLED triple', icon: 'display' },
      { label: 'Interface', value: 'Triple affichage', icon: 'cpu' },
      { label: 'GPS', value: 'Intégré', icon: 'location' },
      { label: 'Autonomie', value: '7-10 jours', icon: 'battery' }
    ],
    highlights: [
      'Triple affichage AMOLED',
      'Interface gaming avancée',
      'Visibilité nocturne',
      'GPS tracking sport',
      'Design futuriste'
    ],
    images: [],
    rating: {
      average: 4.7,
      count: 156,
      distribution: { 5: 100, 4: 40, 3: 12, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Innovation', 'Gaming']
  },

  // Produits LED
  {
    id: 'led-001',
    name: 'MONSTER Illuminescence Light Strip Color/Blanc',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandeaux LED',
    price: 17.99,
    originalPrice: 24.99,
    discount: 28,
    rating: 4.7,
    reviews: 89,
    images: ['/placeholder-product.png'],
    description: 'Transformez radicalement votre espace de vie avec le bandeau LED MONSTER Illuminescence Light Strip Color/Blanc, une solution d\'éclairage polyvalente qui révolutionne l\'ambiance de votre intérieur.',
    shortDescription: 'Bandeau LED double mode RGB multicouleur et blanc chaud, 2m',
    specifications: {
      'Type': 'LED Strip',
      'Connectivité': 'Basic (USB)',
      'Longueur': '2m',
      'Usage': 'Intérieur',
      'Modes': 'RGB + Blanc chaud',
      'Utilisation': 'Gaming et travail'
    },
    features: [
      'Double technologie RGB + Blanc chaud',
      'Installation adhésive simple 3M',
      'Alimentation USB universelle',
      'Contrôle intuitif des modes'
    ],
    inStock: true,
    stockQuantity: 25,
    sku: 'MON-ILL-COLOR-BLANC',
    urlSlug: 'monster-illuminescence-color-blanc-polyvalent',
    badges: ['Polyvalent', 'Gaming']
  },
  {
    id: 'led-002',
    name: 'MONSTER Illuminescence Basic Lightstrip Multicouleur',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandeaux LED',
    price: 13.99,
    originalPrice: 19.99,
    discount: 30,
    rating: 4.6,
    reviews: 156,
    images: ['/placeholder-product.png'],
    description: 'Illuminez et personnalisez votre espace de vie avec le bandeau LED MONSTER Illuminescence Basic Lightstrip Multicouleur, une solution d\'éclairage versatile qui transforme instantanément l\'atmosphère de n\'importe quelle pièce.',
    shortDescription: 'Bandeau LED RGB multicouleur, disponible en 2m, 4m et 5m',
    specifications: {
      'Type': 'LED Strip',
      'Connectivité': 'Basic (USB)',
      'Usage': 'Intérieur',
      'Couleurs': 'RGB multicouleur',
      'Longueurs': '2m, 4m, 5m',
      'Installation': 'Adhésif 3M'
    },
    features: [
      'Technologie RGB - millions de couleurs',
      'Trois longueurs disponibles',
      'Installation adhésive facile',
      'Alimentation USB pratique',
      'Consommation énergétique minimale'
    ],
    variants: [
      { name: '2m', price: 13.99 },
      { name: '4m', price: 26.99 },
      { name: '5m', price: 39.99 }
    ],
    inStock: true,
    stockQuantity: 45,
    sku: 'MON-ILL-BASIC-MULTI',
    urlSlug: 'monster-illuminescence-basic-lightstrip-multicouleur',
    badges: ['Best-seller', 'Gaming']
  },
  {
    id: 'led-003',
    name: 'MONSTER Illuminescence Smart Chroma Light 2X Bars',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Barres LED',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.8,
    reviews: 67,
    images: ['/placeholder-product.png'],
    description: 'Transformez votre environnement en spectacle lumineux époustouflant avec le pack MONSTER Illuminescence Smart Chroma Light 2X Bars, une solution d\'éclairage intelligent qui révolutionne l\'art de l\'ambiance lumineuse.',
    shortDescription: 'Pack 2 barres LED RGB IC avec contrôle WiFi et synchronisation musicale',
    specifications: {
      'Type': 'Light Bar',
      'Connectivité': 'Smart (WiFi)',
      'Technologie': 'RGB IC',
      'Contenu': '2 barres',
      'Effet': 'Chroma immersif',
      'Installation': 'Modulaire'
    },
    features: [
      'Technologie RGB IC - contrôle pixel par pixel',
      'Contrôle WiFi via smartphone',
      'Synchronisation musicale en temps réel',
      'Compatible Alexa et Google Assistant',
      'Installation modulaire flexible'
    ],
    inStock: true,
    stockQuantity: 18,
    sku: 'MON-ILL-CHROMA-2X',
    urlSlug: 'monster-illuminescence-chroma-2x-bars',
    badges: ['Premium', 'Smart Home']
  },
  {
    id: 'led-004',
    name: 'MONSTER Illuminescence Neon Light Strip',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Néon LED',
    price: 26.99,
    originalPrice: 39.99,
    discount: 33,
    rating: 4.7,
    reviews: 92,
    images: ['/placeholder-product.png'],
    description: 'Découvrez l\'esthétique futuriste de l\'éclairage avec le bandeau MONSTER Illuminescence Neon Light Strip, une innovation lumineuse qui reproduit l\'effet néon emblématique avec la technologie LED moderne.',
    shortDescription: 'Bandeau LED effet néon continu, design cyberpunk',
    specifications: {
      'Type': 'Neon Strip',
      'Effet': 'Néon continu',
      'Usage': 'Intérieur/Extérieur',
      'Versions': '2m Basic, 5m Smart',
      'Design': 'Cyberpunk/Rétro-wave'
    },
    features: [
      'Effet néon continu sans points visibles',
      'Design futuriste cyberpunk',
      'Usage intérieur et extérieur',
      'Version Basic avec réactivité sonore',
      'Version Smart avec contrôle WiFi'
    ],
    variants: [
      { name: '2m Basic Sound', price: 26.99 },
      { name: '5m Smart', price: 56.99 },
      { name: '5m Smart Flow', price: 99.99 }
    ],
    inStock: true,
    stockQuantity: 22,
    sku: 'MON-ILL-NEON',
    urlSlug: 'monster-illuminescence-neon-light-strip',
    badges: ['Futuriste', 'Design']
  },
  {
    id: 'led-005',
    name: 'RGB Gaming Light Bars Pro',
    brand: 'Gaming Tech',
    category: 'LED',
    subcategory: 'Barres LED',
    price: 39.99,
    originalPrice: 54.99,
    discount: 27,
    rating: 4.6,
    reviews: 78,
    images: ['/placeholder-product.png'],
    description: 'Barres LED gaming professionnelles avec synchronisation écran et effets dynamiques pour une immersion totale.',
    shortDescription: 'Barres LED gaming avec sync écran',
    specifications: {
      'Type': 'Gaming Light Bar',
      'Technologie': 'RGB',
      'Synchronisation': 'Écran + Audio',
      'Nombre': '2 barres',
      'Modes': '15 effets prédéfinis'
    },
    features: [
      'Synchronisation avec l\'écran',
      'Effets dynamiques gaming',
      '15 modes prédéfinis',
      'Installation magnétique'
    ],
    inStock: true,
    stockQuantity: 30,
    sku: 'GT-RGB-BARS-PRO',
    urlSlug: 'rgb-gaming-light-bars-pro',
    badges: ['Gaming', 'Pro']
  },
  {
    id: 'led-006',
    name: 'Smart LED Panel Hexagonal Kit',
    brand: 'Tech Light',
    category: 'LED',
    subcategory: 'Panneaux LED',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.9,
    reviews: 45,
    images: ['/placeholder-product.png'],
    description: 'Kit de panneaux LED hexagonaux modulaires avec contrôle intelligent pour créer des designs muraux uniques.',
    shortDescription: 'Kit 9 panneaux LED hexagonaux connectés',
    specifications: {
      'Type': 'LED Panels',
      'Forme': 'Hexagonale',
      'Quantité': '9 panneaux',
      'Connectivité': 'WiFi + Bluetooth',
      'Contrôle': 'App + Tactile'
    },
    features: [
      'Design modulaire extensible',
      'Contrôle tactile sur panneaux',
      'Application smartphone dédiée',
      'Compatible assistants vocaux',
      'Installation murale facile'
    ],
    inStock: true,
    stockQuantity: 12,
    sku: 'TL-HEX-KIT-9',
    urlSlug: 'smart-led-panel-hexagonal-kit',
    badges: ['Innovation', 'Design']
  },
  {
    id: 'led-007',
    name: 'Ambient TV LED Backlight 4K',
    brand: 'Vision Light',
    category: 'LED',
    subcategory: 'Rétroéclairage TV',
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: 4.5,
    reviews: 134,
    images: ['/placeholder-product.png'],
    description: 'Système de rétroéclairage LED pour TV avec synchronisation des couleurs pour une expérience visuelle immersive.',
    shortDescription: 'Rétroéclairage TV avec sync couleurs, compatible 55-75"',
    specifications: {
      'Type': 'TV Backlight',
      'Compatibilité': '55" à 75"',
      'Technologie': 'Ambilight',
      'Modes': 'Sync + Manuel',
      'Installation': 'Adhésive'
    },
    features: [
      'Synchronisation couleurs écran',
      'Réduit fatigue oculaire',
      'Installation universelle',
      'Contrôle via télécommande',
      'Mode cinéma optimisé'
    ],
    inStock: true,
    stockQuantity: 28,
    sku: 'VL-TV-BL-4K',
    urlSlug: 'ambient-tv-led-backlight-4k',
    badges: ['4K', 'Cinéma']
  },
  {
    id: 'led-008',
    name: 'Projecteur LED Galaxy Starlight',
    brand: 'Cosmic Light',
    category: 'LED',
    subcategory: 'Projecteurs',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.8,
    reviews: 203,
    images: ['/placeholder-product.png'],
    description: 'Projecteur LED créant un ciel étoilé avec nébuleuses colorées pour transformer votre chambre en galaxie.',
    shortDescription: 'Projecteur galaxie avec télécommande et timer',
    specifications: {
      'Type': 'Projecteur LED',
      'Effets': 'Étoiles + Nébuleuses',
      'Contrôle': 'Télécommande + App',
      'Timer': 'Auto-off 1/2/4h',
      'Couverture': '15-30m²'
    },
    features: [
      'Effets galaxie réalistes',
      'Nébuleuses multicolores',
      'Mode musique réactif',
      'Timer programmable',
      'Télécommande incluse'
    ],
    inStock: true,
    stockQuantity: 35,
    sku: 'CL-GALAXY-PRO',
    urlSlug: 'projecteur-led-galaxy-starlight',
    badges: ['Best-seller', 'Ambiance']
  },
  {
    id: 'led-009',
    name: 'LED Ring Light Studio Pro 18"',
    brand: 'Photo Light',
    category: 'LED',
    subcategory: 'Éclairage Studio',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.7,
    reviews: 67,
    images: ['/placeholder-product.png'],
    description: 'Ring light professionnel 18 pouces pour streaming, photographie et maquillage avec température de couleur réglable.',
    shortDescription: 'Ring light 18" avec trépied et support smartphone',
    specifications: {
      'Type': 'Ring Light',
      'Diamètre': '18 pouces',
      'Température': '3200K-5600K',
      'Intensité': 'Variable 1-100%',
      'Hauteur': 'Jusqu\'à 2m'
    },
    features: [
      'Éclairage uniforme sans ombre',
      'Température couleur réglable',
      'Trépied ajustable 2m',
      'Support smartphone/caméra',
      'Télécommande Bluetooth'
    ],
    inStock: true,
    stockQuantity: 20,
    sku: 'PL-RING-18-PRO',
    urlSlug: 'led-ring-light-studio-pro-18',
    badges: ['Pro', 'Streaming']
  },
  {
    id: 'led-010',
    name: 'Smart Bulb RGB WiFi Pack x4',
    brand: 'Home Light',
    category: 'LED',
    subcategory: 'Ampoules Smart',
    price: 54.99,
    originalPrice: 74.99,
    discount: 27,
    rating: 4.6,
    reviews: 189,
    images: ['/placeholder-product.png'],
    description: 'Pack de 4 ampoules LED intelligentes RGB avec contrôle WiFi pour automatiser l\'éclairage de votre maison.',
    shortDescription: 'Pack 4 ampoules smart RGB E27, compatible Alexa/Google',
    specifications: {
      'Type': 'Ampoule Smart',
      'Culot': 'E27',
      'Puissance': '9W = 60W',
      'Couleurs': '16 millions',
      'Connectivité': 'WiFi 2.4GHz'
    },
    features: [
      'Contrôle vocal Alexa/Google',
      '16 millions de couleurs',
      'Programmation horaire',
      'Scénarios personnalisés',
      'Économie énergie 85%'
    ],
    inStock: true,
    stockQuantity: 40,
    sku: 'HL-BULB-RGB-4',
    urlSlug: 'smart-bulb-rgb-wifi-pack-4',
    badges: ['Smart Home', 'Économique']
  }
];

// Structure du menu pour la navigation
export interface CategoryStructure {
  name: string;
  slug: string;
  subcategories?: {
    name: string;
    slug: string;
    brands?: string[];
  }[];
  brands?: string[];
}

export const menuStructure: CategoryStructure[] = [
  {
    name: 'Smartphones',
    slug: 'smartphones',
    subcategories: [
      {
        name: 'Flagship',
        slug: 'flagship',
        brands: ['HONOR']
      },
      {
        name: 'Haut de gamme',
        slug: 'haut-de-gamme',
        brands: ['HONOR']
      },
      {
        name: 'Milieu de gamme',
        slug: 'milieu-de-gamme',
        brands: ['HONOR', 'NOKIA']
      },
      {
        name: 'Entrée de gamme',
        slug: 'entree-de-gamme',
        brands: ['HONOR', 'NOKIA']
      }
    ]
  },
  {
    name: 'Tablettes',
    slug: 'tablettes',
    brands: ['HONOR']
  },
  {
    name: 'Montres connectées',
    slug: 'montres-connectees',
    brands: ['HONOR', 'HiFuture']
  },
  {
    name: 'Audio',
    slug: 'audio',
    subcategories: [
      {
        name: 'Écouteurs',
        slug: 'ecouteurs',
        brands: ['HiFuture']
      },
      {
        name: 'Enceintes',
        slug: 'enceintes',
        brands: ['HiFuture']
      },
      {
        name: 'Enceintes haut de gamme',
        slug: 'enceintes-haut-de-gamme',
        brands: ['MONSTER']
      },
      {
        name: 'Casques gaming',
        slug: 'casques-gaming',
        brands: ['MONSTER']
      },
      {
        name: 'Casques sport',
        slug: 'casques-sport',
        brands: ['MONSTER']
      },
      {
        name: 'Microphones',
        slug: 'microphones',
        brands: ['HiFuture']
      }
    ]
  },
  {
    name: 'Accessoires',
    slug: 'accessoires',
    subcategories: [
      {
        name: 'Câbles et connecteurs',
        slug: 'cables-et-connecteurs',
        brands: ['MONSTER']
      },
      {
        name: 'Éclairage LED',
        slug: 'eclairage-led',
        brands: ['MONSTER']
      },
      {
        name: 'Chargeurs',
        slug: 'chargeurs',
        brands: ['MONSTER']
      },
      {
        name: 'Supports gaming',
        slug: 'supports-gaming',
        brands: ['MONSTER']
      },
      {
        name: 'Batteries externes',
        slug: 'batteries-externes',
        brands: ['MONSTER']
      }
    ]
  }
];

// Fonction helper pour obtenir un produit par son slug
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(product => product.urlSlug === slug || product.id === slug);
}

// Fonction helper pour obtenir les produits par catégorie
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

// Fonction helper pour obtenir les produits par marque
export function getProductsByBrand(brand: string): Product[] {
  return allProducts.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  );
}

// Fonction helper pour obtenir les produits en promotion
export function getPromoProducts(): Product[] {
  return allProducts.filter(product => product.discount && product.discount > 0);
}

// Fonction helper pour obtenir les produits populaires
export function getPopularProducts(limit: number = 4): Product[] {
  return allProducts
    .sort((a, b) => {
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;
      const countA = a.rating?.count || 0;
      const countB = b.rating?.count || 0;
      
      // Score pondéré : note moyenne * log(nombre d'avis)
      const scoreA = ratingA * Math.log(countA + 1);
      const scoreB = ratingB * Math.log(countB + 1);
      
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// Fonction helper pour la recherche de produits
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
}

// Structure pour le menu basé sur les marques
export interface BrandMenuStructure {
  category: string;
  brands: string[];
  icon?: React.ComponentType<any>;
}

// Fonction pour obtenir toutes les marques uniques par catégorie
export function getBrandsByCategory(category: string): string[] {
  const brands = new Set<string>();
  allProducts
    .filter(product => product.category === category)
    .forEach(product => {
      if (product.brand) {
        brands.add(product.brand);
      }
    });
  return Array.from(brands).sort();
}

// Fonction pour obtenir les produits par marque et catégorie
export function getProductsByBrandAndCategory(brand: string, category: string): Product[] {
  return allProducts.filter(
    product => product.brand === brand && product.category === category
  );
}

// Structure du menu basé sur les marques pour Smartphones et LED
export const brandMenuStructure: BrandMenuStructure[] = [
  {
    category: 'Smartphones',
    brands: getBrandsByCategory('Smartphones')
  },
  {
    category: 'Lumière LED',
    brands: getBrandsByCategory('Lumière LED')
  },
  {
    category: 'Audio & Son', 
    brands: getBrandsByCategory('Audio & Son')
  },
  {
    category: 'Chargement & Énergie',
    brands: getBrandsByCategory('Chargement & Énergie')
  }
];