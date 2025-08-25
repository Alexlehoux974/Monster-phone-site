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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
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
    brand: 'HIFUTURE',
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
    brand: 'HIFUTURE',
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
    brand: 'HIFUTURE',
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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
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
    brand: 'HIFUTURE',
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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
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
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
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
    brand: 'HIFUTURE',
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
    brand: 'HIFUTURE',
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
    brand: 'HIFUTURE',
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
    subcategory: 'Enceintes',
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
    subcategory: 'Casques & Écouteurs',
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
    subcategory: 'Casques & Écouteurs',
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

  // MONSTER N-Lite 203 Batterie Portable Premium
  {
    id: 'monster-n-lite-203',
    airtableId: 'recGd8KAwQRBrNx9G',
    sku: 'MONSTER-N-LITE-203',
    name: 'MONSTER N-Lite 203 Batterie Portable Premium 20000mAh',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeur & Batteries',
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
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
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
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
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
    category: 'Éclairage LED',
    subcategory: 'Néon LED',
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
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
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
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
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
    subcategory: 'Câbles & Connecteurs',
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
    subcategory: 'Câbles & Connecteurs',
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
    subcategory: 'Câbles & Connecteurs',
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
    subcategory: 'Câbles & Connecteurs',
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
    subcategory: 'Câbles & Connecteurs',
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
    subcategory: 'Câbles & Connecteurs',
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
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
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
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
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
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
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
    category: 'Éclairage LED',
    subcategory: 'Déco LED',
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
    category: 'Éclairage LED',
    subcategory: 'Néons LED',
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
    category: 'Éclairage LED',
    subcategory: 'Projecteurs LED',
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
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
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
    category: 'Éclairage LED',
    subcategory: 'Déco LED',
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
    subcategory: 'Chargeur & Batteries',
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
    subcategory: 'Chargeur & Batteries',
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
    subcategory: 'Chargeur & Batteries',
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


  // Monster Chargeur Multiple 6 Ports
  {
    id: 'monster-chargeur-6-ports',
    airtableId: 'recMONSTER6PORT001',
    sku: 'MONSTER-6PORT-120W',
    name: 'MONSTER Station Charge 6 Ports 120W Desktop',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Chargeur & Batteries',
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



  // Monster Tapis Souris Gaming XXL RGB
  {
    id: 'monster-tapis-souris-xxl',
    airtableId: 'recMONSTERMOUSE001',
    sku: 'MONSTER-MOUSEPAD-XXL',
    name: 'MONSTER Tapis Souris Gaming XXL RGB 900x400mm',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Support',
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
    description: "La montre connectée HIFUTURE EVO 2 démocratise l'accès aux technologies de santé connectée avec un rapport qualité-prix exceptionnel. Conçue pour s'adapter à tous les styles de vie, cette montre intelligente combine fonctionnalités essentielles et design raffiné dans un package accessible à tous. L'écran LCD couleur lumineux affiche clairement toutes vos données vitales et notifications. La technologie rétro-éclairage adaptée garantit une lisibilité optimale en toutes conditions, du bureau climatisé aux plages ensoleillées de La Réunion. L'interface intuitive permet une navigation fluide entre les différentes fonctions. Le moniteur cardiaque optique surveille votre rythme en continu, détectant anomalies et tendances pour une prévention active. Le podomètre précis compte chaque pas, encourageant l'atteinte de vos objectifs quotidiens de 10 000 pas. L'analyse du sommeil identifie vos phases de repos pour optimiser votre récupération. Trois finitions élégantes répondent à toutes les préférences : le Beige chic apporte une touche de douceur féminine, le Noir intemporel s'adapte à toutes les tenues, tandis que le Rose Gold tendance ajoute une note de luxe accessible. Les bracelets en silicone doux hypoallergénique garantissent confort toute la journée. La résistance IP68 permet immersion jusqu'à 1,5 mètre pendant 30 minutes, idéale pour natation légère et protection contre la pluie. Cette certification militaire assure également résistance aux chocs, vibrations et températures extrêmes du climat tropical. L'autonomie de 5 à 7 jours libère des contraintes de charge fréquente. La batterie optimisée maintient performances constantes même après des centaines de cycles. La charge magnétique sans effort se complète en moins de 2 heures. Les fonctions intelligentes incluent notifications d'appels et messages, contrôle caméra à distance, rappels de sédentarité et alarmes personnalisables. Le suivi du cycle féminin intégré (versions Beige et Rose Gold) offre prédictions et rappels discrets. Accessible à tous les budgets, l'EVO 2 démontre que la technologie de santé connectée peut être abordable sans compromis sur la qualité.",
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
    description: "La montre connectée HIFUTURE Zone 2 incarne la polyvalence absolue pour les utilisateurs actifs recherchant un compagnon technologique adapté à tous les défis sportifs et quotidiens. Cette montre intelligente révolutionne le suivi d'activité avec une précision remarquable et des fonctionnalités avancées accessibles à tous.\n\nL'écran AMOLED lumineux offre une visibilité cristalline exceptionnelle, même sous le soleil éclatant de La Réunion. La technologie d'affichage adaptatif ajuste automatiquement la luminosité selon l'environnement, garantissant une lisibilité parfaite en toutes circonstances. Les couleurs vibrantes et les contrastes profonds subliment chaque notification et donnée affichée.\n\nLe suivi multi-sport révolutionnaire propose plus de 20 modes d'entraînement spécialisés, du running au cyclisme en passant par la natation et les sports nautiques. Chaque mode intègre des métriques spécifiques optimisées pour maximiser vos performances. L'algorithme intelligent apprend de vos habitudes pour personnaliser les recommandations d'entraînement.\n\nLe GPS intégré haute sensibilité cartographie précisément vos parcours avec une consommation énergétique optimisée. La technologie de positionnement rapide acquiert le signal satellite en quelques secondes, idéal pour les départs spontanés. Les données de distance, vitesse et altitude s'enregistrent avec une précision professionnelle.\n\nLes capteurs de santé avancés surveillent en continu votre fréquence cardiaque, votre niveau d'oxygène sanguin et analysent la qualité de votre sommeil. Les alertes personnalisables vous informent des anomalies détectées. Le suivi du stress et les exercices de respiration guidée favorisent votre bien-être quotidien.\n\nLa certification IP67 garantit une résistance totale à la poussière et une étanchéité jusqu'à 1 mètre de profondeur. Cette protection robuste permet une utilisation sans crainte sous la pluie tropicale ou pendant vos séances de natation. La construction durable résiste aux chocs et vibrations des activités sportives intenses.\n\nL'autonomie de 7 à 10 jours en utilisation normale libère des contraintes de recharge quotidienne. Le mode économie d'énergie intelligent prolonge l'autonomie jusqu'à 15 jours. La charge rapide magnétique restaure 80% de la batterie en seulement 45 minutes.\n\nTrois coloris élégants s'adaptent à tous les styles : le Gris sophistiqué convient parfaitement au cadre professionnel, le Rose délicat apporte une touche de féminité moderne, tandis que le Noir classique offre une polyvalence intemporelle. Les bracelets interchangeables permettent de personnaliser votre look selon les occasions.\n\nLa connectivité Bluetooth 5.0 assure une synchronisation stable avec votre smartphone iOS ou Android. Les notifications intelligentes filtrent les alertes importantes sans vous submerger. Le contrôle de la musique et de l'appareil photo à distance simplifie votre quotidien connecté.\n\nMontre connectée polyvalente idéale pour les sportifs réunionnais recherchant performance et style au quotidien.",
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
    description: "La gamme HIFUTURE GO PRO établit de nouveaux standards pour les montres connectées dédiées aux athlètes exigeants et aux professionnels du sport. Cette montre représente l'aboutissement technologique pour ceux qui repoussent constamment leurs limites et recherchent la performance absolue.\n\nLe GPS haute précision multi-constellation (GPS, GLONASS, Galileo) garantit un tracking optimal avec une précision métrique même dans les environnements les plus difficiles. La technologie de positionnement avancée maintient le signal sous la canopée dense des forêts réunionnaises et dans les cirques montagneux. L'acquisition satellite ultra-rapide permet un démarrage immédiat de vos séances.\n\nL'analyse VO2 Max évalue scientifiquement votre capacité aérobie maximale, fournissant des données professionnelles sur votre condition physique. L'algorithme adaptatif calcule votre progression et prédit vos performances futures. Les recommandations d'entraînement personnalisées optimisent votre préparation physique selon vos objectifs.\n\nLe capteur de fréquence cardiaque optique de dernière génération mesure avec précision médicale votre rythme cardiaque même pendant les efforts intenses. Les zones de fréquence cardiaque personnalisables optimisent chaque séance d'entraînement. L'alerte de fréquence anormale protège votre santé pendant l'effort.\n\nLe baromètre altimétrique intégré mesure précisément les dénivelés et prévoit les changements météorologiques. Parfait pour les trails dans les hauteurs de l'île, il enregistre vos ascensions cumulées et analyse vos performances en montée. Les alertes météo anticipent les conditions dangereuses.\n\nL'écran transflectif haute définition reste parfaitement lisible en plein soleil sans consommer d'énergie supplémentaire. La technologie MIP (Memory In Pixel) offre un contraste exceptionnel et une visibilité optimale sous tous les angles. Le rétroéclairage adaptatif s'active automatiquement dans l'obscurité.\n\nLa certification 5ATM permet une immersion jusqu'à 50 mètres, idéale pour la natation en piscine et en eau libre. Les algorithmes spécialisés détectent automatiquement votre style de nage et comptent vos longueurs. L'analyse SWOLF évalue votre efficacité de nage pour améliorer votre technique.\n\nL'autonomie exceptionnelle de 14 jours en mode smartwatch et 35 heures en GPS continu accompagne vos ultra-trails les plus ambitieux. Le mode UltraTrac économise la batterie lors des sorties longues en maintenant un tracking précis. La gestion intelligente de l'énergie prolonge l'autonomie selon vos besoins.\n\nLes profils d'activité spécialisés couvrent plus de 100 sports différents, du trail running au kitesurf en passant par l'escalade. Chaque profil intègre des métriques spécifiques et des écrans de données personnalisables. Les entraînements structurés guident votre progression avec des objectifs précis.\n\nLa plateforme d'analyse avancée synchronise automatiquement vos données pour un suivi détaillé de vos performances. Les graphiques interactifs visualisent votre progression sur le long terme. Le partage social motive avec les défis communautaires et les segments Strava.\n\nDeux coloris sportifs subliment cette technologie de pointe : le Noir Carbon avec finition mate anti-reflets pour une discrétion absolue, et l'Orange Fluo haute visibilité pour la sécurité lors des entraînements nocturnes. Le bracelet en silicone premium résiste à la transpiration et aux UV tropicaux.\n\nMontre connectée professionnelle conçue pour les athlètes réunionnais visant l'excellence sportive et la performance mesurable.",
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
    description: "La montre connectée HIFUTURE Active incarne l'excellence premium avec son boîtier métallique raffiné qui allie robustesse et élégance. Cette montre haut de gamme fusionne matériaux nobles, technologies avancées et design sophistiqué pour répondre aux exigences des professionnels actifs les plus discriminants. Deux designs exclusifs expriment des personnalités distinctes : le Silver métallique classique apporte une touche d'intemporalité luxueuse parfaite pour l'environnement professionnel, tandis que le Black + Red racing sportif unique capture l'esprit de compétition avec ses accents rouges dynamiques sur fond noir profond. L'écran AMOLED haute définition offre une luminosité exceptionnelle de 1000 nits, garantissant une lisibilité parfaite même sous le soleil éclatant de La Réunion. La résolution supérieure affiche graphiques et données avec une netteté cristalline. Le verre saphir anti-rayures préserve l'intégrité de l'écran dans toutes les conditions. Les fonctions sport professionnelles avancées transforment chaque entraînement en session d'optimisation. Plus de 100 modes sportifs couvrent toutes les disciplines imaginables. L'analyse biométrique en temps réel évalue performance, fatigue et récupération. Les plans d'entraînement adaptatifs s'ajustent à votre progression. La certification ATM5 autorise plongée jusqu'à 50 mètres et natation en eau libre sans restriction. La construction ultra-robuste résiste aux chocs extrêmes, variations thermiques et conditions les plus hostiles. Le boîtier en acier inoxydable 316L de qualité marine garantit durabilité éternelle. L'autonomie exceptionnelle de 12 à 16 jours libère totalement des contraintes de charge. La gestion énergétique intelligente optimise consommation selon usage. Le mode ultra-économie prolonge l'autonomie jusqu'à 30 jours pour les situations critiques. Le GPS haute précision multi-constellation et les capteurs professionnels intégrés offrent mesures d'une précision inégalée. Accéléromètre, gyroscope, magnétomètre, baromètre et capteur de lumière ambiante créent un écosystème de données complet. La montre métallique premium définitive pour professionnels actifs exigeants de La Réunion.",
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
    description: "La montre connectée HIFUTURE Ultra2 Pro représente le summum de la technologie portable avec ses fonctionnalités premium destinées aux utilisateurs exigeants. Cette montre incarne l'excellence technologique avec un équilibre parfait entre sophistication et performance sportive avancée.\n\nL'écran AMOLED HD délivre des couleurs éclatantes et des noirs profonds avec un contraste infini pour une expérience visuelle immersive. La résolution haute définition sublime chaque détail, des graphiques d'entraînement aux photos de contacts. La technologie Always-On Display affiche en permanence l'heure et les informations essentielles sans compromettre l'autonomie.\n\nLe système de santé complet intègre les capteurs les plus avancés pour un monitoring précis 24h/24. Le capteur PPG de dernière génération mesure la fréquence cardiaque avec une précision médicale, détectant même les variations subtiles. L'oxymètre de pouls surveille votre saturation en oxygène, crucial pour l'acclimatation en altitude et la récupération.\n\nL'intelligence artificielle embarquée analyse vos habitudes pour proposer des recommandations personnalisées. L'algorithme adaptatif apprend de vos routines quotidiennes pour optimiser les notifications et suggestions. Le coach virtuel intelligent guide vos entraînements avec des conseils en temps réel basés sur vos performances.\n\nLe GPS intégré haute sensibilité utilise plusieurs constellations satellites pour une localisation précise même dans les environnements difficiles. Le tracking en temps réel cartographie vos parcours avec une précision métrique. La boussole électronique et l'altimètre barométrique complètent la navigation pour les aventures outdoor.\n\nLa résistance ATM5 certifie l'étanchéité jusqu'à 50 mètres de profondeur, parfaite pour la natation et les sports aquatiques. Les matériaux premium résistent aux chocs, rayures et conditions extrêmes. Le verre saphir protège l'écran contre les impacts tout en maintenant une transparence cristalline.\n\nLes modes sport professionnels couvrent plus de 50 activités différentes avec des métriques spécialisées. L'analyse biomécanique évalue votre technique de course, détectant asymétries et inefficacités. Les plans d'entraînement adaptatifs évoluent selon vos progrès pour maximiser les résultats.\n\nL'autonomie de 10 à 12 jours en utilisation normale élimine l'anxiété de la batterie au quotidien. Le mode économie d'énergie intelligent prolonge l'autonomie jusqu'à 20 jours en maintenant les fonctions essentielles. La charge rapide magnétique restaure 50% de batterie en seulement 30 minutes.\n\nTrois coloris sophistiqués répondent à tous les styles : le Black profond avec finition mate anti-traces pour une élégance absolue, le Gris métallisé qui allie modernité et discrétion, et le Rose doré qui apporte une touche de féminité luxueuse. Les bracelets Quick Release permettent de changer de style en quelques secondes.\n\nLa connectivité avancée synchronise parfaitement avec iOS et Android pour une intégration transparente. Les appels Bluetooth permettent de répondre directement depuis votre poignet. Le stockage de musique intégré libère de la dépendance au smartphone pendant les entraînements.\n\nLe système de paiement NFC compatible avec les principales plateformes facilite les achats sans contact. La sécurité biométrique protège vos données sensibles. L'écosystème d'applications tierces étend les fonctionnalités selon vos besoins spécifiques.\n\nMontre connectée premium parfaite pour les professionnels et sportifs réunionnais recherchant l'excellence technologique.",
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
    description: "La montre connectée HIFUTURE Aurora harmonise parfaitement élégance professionnelle et performance technologique. Son boîtier métallique premium témoigne d'un savoir-faire horloger traditionnel enrichi des innovations les plus modernes, créant un accessoire business qui transcende la simple fonctionnalité. L'écran AMOLED brillant illumine chaque détail avec des couleurs vibrantes et des contrastes saisissants. La résolution supérieure affiche informations et graphiques avec une clarté exceptionnelle. L'interface élégante propose multiples cadrans personnalisables pour s'adapter à chaque occasion professionnelle ou personnelle. Les fonctions wellness complètes équilibrent vie professionnelle intensive et bien-être personnel. Le monitoring du stress analyse variabilité cardiaque pour détecter tensions et recommander exercices de respiration. Le coach sommeil optimise vos cycles de repos. Les rappels d'hydratation et de mouvement maintiennent votre vitalité. Trois finitions métalliques prestigieuses expriment différentes facettes du succès : le Silver classique incarne l'élégance intemporelle du monde des affaires, le Bleu dynamique apporte une touche de modernité sportive, tandis que le Brown élégant évoque le luxe discret des grandes maisons horlogères. Le GPS intégré accompagne vos déplacements professionnels et activités sportives avec précision absolue. La fonction Find My Phone retrouve votre smartphone égaré. Le contrôle caméra à distance facilite selfies et photos de groupe lors d'événements. La certification ATM5 garantit résistance à l'eau jusqu'à 50 mètres, permettant natation et sports aquatiques sans inquiétude. La construction robuste supporte les exigences d'un lifestyle actif entre réunions, voyages d'affaires et activités sportives. L'autonomie de 10 à 12 jours libère des contraintes de charge quotidienne. La batterie optimisée maintient performances constantes tout au long du cycle. La charge sans fil Qi ajoute une dimension pratique supplémentaire pour les déplacements. Les notifications intelligentes filtrent communications importantes, affichant emails professionnels, messages et rappels calendrier. L'intégration avec assistants vocaux permet gestion mains-libres de votre agenda. L'accessoire business parfait pour professionnels réunionnais alliant style et performance.",
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
    description: "La montre connectée HIFUTURE Vela incarne l'excellence absolue avec ses technologies de pointe et son design haut de gamme. Cette pièce maîtresse de la collection HIFUTURE fusionne innovation technologique, matériaux nobles et esthétique raffinée pour créer une expérience utilisateur exceptionnelle. L'écran Always-On AMOLED révolutionnaire permet consultation permanente sans mouvement du poignet. Cette technologie premium affiche heure, notifications et métriques essentielles en permanence avec une consommation énergétique optimisée. La luminosité adaptative garantit lisibilité parfaite en toutes conditions. Les fonctions sport professionnelles transforment la Vela en véritable coach personnel. Plus de 120 modes sportifs couvrent toutes les disciplines, du yoga au trail en passant par le kitesurf. L'analyse biomécanique avancée évalue technique, efficacité et progression. Les programmes d'entraînement adaptatifs évoluent avec vos performances. Les fonctions wellness complètes surveillent votre santé 24/7 avec précision médicale. Le monitoring cardiaque continu détecte anomalies et tendances. L'analyse du stress propose exercices de cohérence cardiaque. Le score de vitalité quotidien synthétise votre état global. Deux designs sophistiqués répondent aux goûts les plus exigeants : le Noir profond incarne l'élégance masculine avec sa finition mate anti-traces, tandis que le Beige féminin apporte douceur et raffinement avec ses reflets nacrés subtils. La version Beige intègre suivi du cycle féminin avancé. La résistance ATM5 autorise tous les sports aquatiques incluant plongée jusqu'à 50 mètres. La certification militaire garantit résistance aux conditions extrêmes. Le boîtier en céramique haute technologie allie légèreté, résistance et confort thermique optimal. Le GPS intégré double fréquence offre précision centimétrique même en environnement difficile. La cartographie offline permet navigation sans connexion. Le baromètre altimétrique mesure dénivelés avec précision pour les activités montagne. L'autonomie remarquable de 10 à 14 jours maintient toutes fonctions actives sans compromis. La charge rapide sans fil restaure une journée complète en 15 minutes. Le mode ultra-endurance prolonge l'autonomie jusqu'à 45 jours. La montre premium wellness définitive pour utilisateurs exigeants de La Réunion recherchant excellence absolue.",
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
    description: "La montre connectée HIFUTURE Aura synthétise l'excellence technologique avec ses fonctions santé avancées conçues pour le bien-être complet. Cette montre médicale grand public révolutionne le monitoring personnel avec des capteurs de niveau hospitalier accessibles au quotidien.\n\nL'écran Always-On révolutionnaire affiche en permanence informations essentielles sans jamais s'éteindre, garantissant consultation instantanée de l'heure et des métriques vitales. La technologie d'affichage basse consommation maintient la visibilité 24h/24 tout en préservant une autonomie exceptionnelle. Les cadrans personnalisables always-on s'adaptent à votre style et vos priorités de santé.\n\nLes fonctions santé complètes incluent ECG médical certifié pour détecter fibrillation auriculaire et autres arythmies potentiellement dangereuses. L'électrocardiogramme en 30 secondes analyse le rythme cardiaque avec précision médicale. Les alertes automatiques signalent toute anomalie détectée pour consultation médicale précoce.\n\nLe capteur PPG de dernière génération mesure en continu la fréquence cardiaque, la variabilité cardiaque (HRV) et le niveau d'oxygène sanguin (SpO2). Ces mesures vitales fournissent un tableau complet de votre santé cardiovasculaire et respiratoire. L'analyse des tendances sur le long terme révèle l'évolution de votre condition physique.\n\nLe monitoring du sommeil avancé distingue les phases légères, profondes et REM pour optimiser votre récupération. L'analyse de la respiration nocturne détecte les apnées et troubles respiratoires. Le score de sommeil quotidien guide l'amélioration de vos habitudes de repos.\n\nLa gestion du stress utilise la variabilité cardiaque pour évaluer votre niveau de tension nerveuse en temps réel. Les exercices de respiration guidée proposent des sessions de relaxation personnalisées. Les rappels de pause encouragent la déconnexion régulière pour préserver votre équilibre mental.\n\nLa résistance ATM5 certifie l'étanchéité jusqu'à 50 mètres, permettant natation et sports aquatiques sans restriction. Les matériaux biocompatibles évitent toute irritation cutanée même en climat tropical humide. La construction robuste résiste aux chocs quotidiens et activités sportives intenses.\n\nL'autonomie de 12 à 15 jours avec toutes les fonctions actives élimine la contrainte de recharge fréquente. Le mode économie d'énergie intelligent prolonge l'utilisation jusqu'à 30 jours. La charge rapide sans fil restaure une semaine d'autonomie en seulement 45 minutes.\n\nTrois coloris élégants répondent à tous les goûts : le Noir professionnel pour une discrétion absolue, le Gris métallique pour une modernité affirmée, et le Rose poudré pour une féminité délicate. Chaque version bénéficie d'un bracelet en silicone médical confortable et hypoallergénique.\n\nLa connectivité Bluetooth 5.0 assure une synchronisation stable avec votre smartphone pour l'analyse détaillée des données. L'application compagnon génère des rapports de santé partageables avec votre médecin. Les notifications intelligentes maintiennent le contact sans surcharge d'informations.\n\nLes algorithmes d'intelligence artificielle apprennent de vos habitudes pour fournir des insights personnalisés sur votre santé. Les recommandations évolutives s'adaptent à votre progression et vos objectifs. Le coach santé virtuel guide votre parcours vers un mode de vie plus sain.\n\nMontre médicale connectée idéale pour les Réunionnais privilégiant un suivi santé professionnel au quotidien.",
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
    description: "La montre connectée HIFUTURE Aura 2 perfectionne la formule gagnante de sa prédécesseure avec améliorations significatives et nouvelles fonctionnalités. Cette évolution réussie combine technologies de santé avancées, design premium et accessibilité tarifaire pour démocratiser l'excellence connectée. L'écran Always-On lumineux nouvelle génération offre visibilité permanente améliorée avec consommation réduite de 30%. Cette technologie AMOLED optimisée affiche informations essentielles 24/7 : heure, notifications, métriques santé. Les multiples cadrans always-on personnalisables s'adaptent à votre style et besoins. La suite santé avancée intègre ECG médical certifié pour détection précoce d'anomalies cardiaques. Le monitoring cardiaque continu analyse rythme avec précision ±0.5 bpm. L'analyse du sommeil paradoxal REM optimise récupération cognitive. Le score de stress quotidien recommande exercices respiratoires personnalisés. Trois finitions luxueuses expriment différentes facettes du raffinement : le Noir intemporel pour l'élégance absolue, le Gris moderne pour le style technologique, et le Rose Gold féminin pour la sophistication douce. Chaque version bénéficie de finitions métalliques premium et verre courbé 2.5D. La résistance ATM5 libère totalement pour sports aquatiques incluant natation en mer et plongée jusqu'à 50 mètres. La certification militaire MIL-STD-810H garantit résistance aux chocs, vibrations, températures extrêmes et humidité tropicale. Construction durable pour années d'utilisation intensive. Le GPS haute précision amélioré utilise triple constellation (GPS, GLONASS, BeiDou) pour localisation rapide et précise. La puce GPS basse consommation maintient tracking 30 heures. Cartographie offline intégrée pour navigation sans connexion dans zones reculées. L'autonomie remarquable atteint 15 jours utilisation normale avec toutes fonctions actives. L'optimisation intelligente adapte consommation selon usage. Mode ultra-endurance prolonge autonomie jusqu'à 60 jours. Charge rapide 50% en 30 minutes via station magnétique. Les matériaux premium incluent boîtier alliage aluminium aérospatial, bracelet silicone médical hypoallergénique et boucle acier inoxydable. Confort optimal garanti même port prolongé. La montre haut de gamme accessible offrant technologies médicales avancées aux passionnés réunionnais.",
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

  // [DOUBLON SUPPRIMÉ - HONOR CHOICE WATCH]
  // {
  //   id: 'honor-choice-watch-v2',
  //   airtableId: 'recYEgkxqGIvVGFFX',
  //   sku: 'HONOR-CHOICE-WATCH',
  //   name: 'HONOR CHOICE WATCH',
  //   brand: 'HONOR',
  //   category: 'Montres',
  //   subcategory: 'Montres premium',
  //   price: 149.99,
  //   description: "La HONOR CHOICE WATCH redéfinit l'excellence des montres connectées premium. Son écran AMOLED haute résolution de 1.43 pouces offre une luminosité exceptionnelle. Les technologies exclusives IC et ANC révolutionnent votre expérience.",
  //   shortDescription: "Montre connectée premium avec technologies IC/ANC et écran AMOLED",
  //   metaTitle: 'HONOR CHOICE WATCH IC/ANC - Montre Connectée Premium AMOLED | Monster Phone 974',
  //   metaDescription: 'HONOR CHOICE WATCH : AMOLED, IC/ANC, GPS, 5ATM, 14 jours autonomie, 100+ sports. 3 coloris premium.',
  //   urlSlug: 'honor-choice-watch-connectee-premium',
  //   keywords: ['HONOR CHOICE WATCH', 'montre connectée', 'IC ANC', 'premium', 'AMOLED'],
  //   variants: [
  //     { color: 'Noir', colorCode: '#000000', ean: '6971664934366', stock: 10, images: [] },
  //     { color: 'Blanc', colorCode: '#FFFFFF', ean: '6971664934366', stock: 8, images: [] },
  //     { color: 'Or', colorCode: '#FFD700', ean: '6971664934366', stock: 6, images: [] }
  //   ],
  //   defaultVariant: 'Noir',
  //   specifications: [
  //     { label: 'Type Écran', value: 'AMOLED 1.43"', icon: 'display' },
  //     { label: 'Technologies', value: 'IC & ANC', icon: 'cpu' },
  //     { label: 'Résistance', value: '5ATM', icon: 'shield' },
  //     { label: 'Autonomie', value: '14 jours', icon: 'battery' }
  //   ],
  //   highlights: [
  //     'Technologies IC & ANC exclusives',
  //     'Écran AMOLED 466x466 pixels',
  //     '100+ modes sportifs',
  //     'Résistance 5ATM',
  //     'Autonomie record 14 jours'
  //   ],
  //   images: [],
  //   rating: {
  //     average: 4.8,
  //     count: 234,
  //     distribution: { 5: 180, 4: 40, 3: 10, 2: 3, 1: 1 }
  //   },
  //   warranty: '2 ans constructeur',
  //   deliveryTime: '24-48h à La Réunion',
  //   badges: ['Premium', 'HONOR']
  // },

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
    description: "La montre connectée HIFUTURE Ultra2 représente le summum de la technologie portable avec son écran géant et ses fonctionnalités révolutionnaires. Cette montre ultra-performante redéfinit les limites de ce qu'une smartwatch peut accomplir, offrant une expérience utilisateur sans précédent.\n\nL'écran AMOLED massif de 2.0 pouces offre une surface d'affichage généreuse qui transforme l'interaction avec votre montre. Cette dalle exceptionnelle affiche plus d'informations simultanément, facilitant la lecture des messages, la navigation dans les menus et la consultation des données d'entraînement. La résolution ultra-haute définition sublime chaque pixel avec des couleurs éclatantes et des contrastes profonds.\n\nLa fonction appels Bluetooth transforme votre montre en véritable extension de votre smartphone, libérant vos mains pour une communication pratique. Le microphone haute sensibilité capte votre voix clairement même en environnement bruyant. Le haut-parleur intégré délivre un son cristallin pour des conversations fluides directement depuis votre poignet.\n\nLe GPS multi-satellite révolutionnaire combine GPS, GLONASS, Galileo et BeiDou pour une précision de localisation inégalée. Cette technologie quadruple constellation acquiert le signal en quelques secondes et maintient la précision même sous couverture végétale dense. Le tracking en temps réel enregistre chaque détail de vos parcours avec une précision métrique.\n\nLe système de santé complet intègre tous les capteurs essentiels pour un monitoring 24h/24. La fréquence cardiaque optique mesure en continu avec précision médicale. L'oxymètre de pouls surveille la saturation en oxygène, crucial pour l'adaptation à l'effort. Le moniteur de stress analyse la variabilité cardiaque pour détecter les périodes de tension.\n\nL'analyse du sommeil avancée distingue les phases légères, profondes et paradoxales pour optimiser votre récupération. L'algorithme intelligent évalue la qualité de votre repos et propose des recommandations personnalisées. Le réveil intelligent vous réveille au moment optimal de votre cycle de sommeil pour un réveil naturel.\n\nLa résistance IP68 certifie une protection totale contre la poussière et l'immersion jusqu'à 1,5 mètre pendant 30 minutes. Cette certification militaire permet une utilisation sans crainte sous la pluie tropicale, pendant la natation ou les sports nautiques. La construction robuste résiste aux chocs, vibrations et températures extrêmes.\n\nL'autonomie exceptionnelle de 12 jours en utilisation normale défie toute concurrence dans cette catégorie. Le processeur basse consommation optimise chaque milliampère pour maximiser l'endurance. Le mode économie d'énergie intelligent prolonge l'autonomie jusqu'à 30 jours en maintenant les fonctions essentielles.\n\nLes modes sport spécialisés couvrent plus de 60 activités différentes avec des métriques adaptées. Du running au cyclisme, de la natation au yoga, chaque mode analyse vos performances avec précision. Les plans d'entraînement intégrés guident votre progression vers vos objectifs personnels.\n\nDeux coloris sophistiqués subliment cette technologie de pointe : le Gris métallique apporte une touche moderne et masculine, tandis que le Rose poudré offre une élégance féminine délicate. Les bracelets en silicone premium sont confortables, durables et résistants à la transpiration.\n\nLa connectivité complète synchronise parfaitement avec iOS et Android pour une intégration transparente. Le stockage de musique intégré permet d'écouter vos playlists favorites sans smartphone. Le contrôle de la caméra à distance facilite les selfies et photos de groupe.\n\nLes notifications intelligentes filtrent les alertes importantes pour rester connecté sans être submergé. La réponse rapide aux messages avec modèles prédéfinis ou dictée vocale simplifie la communication. L'assistant vocal intégré permet de contrôler votre montre et smartphone par la voix.\n\nMontre connectée ultra-complète parfaite pour les technophiles réunionnais recherchant grand écran et fonctionnalités avancées.",
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
    description: "Montre connectée HIFUTURE Lume avec éclairage LED unique pour style futuriste incomparable. Cette montre innovante combine technologie avant-gardiste et design urbain pour créer un accessoire qui redéfinit les codes de la montre connectée moderne. Écran AMOLED lumineux parfait pour lifestyle urbain branché. La technologie d'affichage haute résolution garantit lisibilité exceptionnelle même en plein soleil. Les cadrans personnalisables permettent d'exprimer votre personnalité unique. Éclairage LED intégré idéal pour activités nocturnes et sport soir. Le système d'illumination périphérique crée un halo lumineux distinctif qui vous rend visible et stylé. Plusieurs modes d'éclairage : pulsation rythmée, éclairage constant ou synchronisation avec notifications. Quatre coloris tendance : noir discret pour l'élégance urbaine, gris moderne pour le style technologique, vert dynamique pour l'énergie sportive ou champagne élégant pour le luxe accessible. Chaque finition bénéficie d'un traitement anti-traces premium. Suivi santé complet avec capteur de température corporelle exclusif permettant détection précoce de variations physiologiques. Monitoring cardiaque 24/7, analyse du sommeil, compteur de pas et calories brûlées. GPS intégré et résistance IP67 pour toutes vos aventures urbaines et sportives. Navigation précise pour running, vélo ou exploration urbaine. Protection contre eau et poussière pour usage sans contrainte. Autonomie 6-8 jours optimisée malgré l'éclairage LED grâce à la gestion énergétique intelligente. Charge rapide magnétique en moins de 2 heures. Mode économie d'énergie prolonge autonomie jusqu'à 15 jours. La montre connectée futuriste pour les urbains branchés de La Réunion recherchant originalité et performance.",
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
    description: "Découvrez l'élégance professionnelle avec la montre connectée HIFUTURE AIX, conçue pour les leaders qui exigent excellence et sophistication. Cette montre business premium fusionne matériaux nobles, technologie avancée et design intemporel pour créer l'accessoire professionnel ultime. Boîtier en acier inoxydable premium pour durabilité et style incomparables. L'alliage 316L de qualité marine résiste à la corrosion et conserve son éclat année après année. Le polissage minutieux et les finitions brossées créent un jeu de lumière sophistiqué. Écran en verre saphir ultra-résistant aux rayures préservant clarté cristalline même après années d'utilisation intensive. L'affichage AMOLED haute résolution offre contraste infini et couleurs éclatantes. Interface professionnelle avec widgets business dédiés : marchés financiers, fuseaux horaires, agenda. Fonctions business avancées incluant notifications intelligentes filtrées par priorité, mode réunion silencieux automatique et intégration calendrier professionnel. Synchronisation email avec aperçu rapide des messages importants. Contrôle présentation à distance pour meetings. GPS haute précision accompagne déplacements professionnels avec tracking précis et navigation intégrée. Fonction Find My Phone particulièrement utile lors de déplacements d'affaires. Mode avion automatique pour voyages. Autonomie exceptionnelle 12-15 jours pour accompagner voyages d'affaires prolongés sans souci de charge. Charge rapide sans fil Qi compatible avec stations de charge premium. Mode veille intelligent préserve batterie. Résistance ATM5 permet usage sans restriction incluant natation et sports aquatiques. Construction robuste résiste aux exigences du lifestyle professionnel actif. Protection militaire contre chocs et variations thermiques. Bracelet en cuir véritable italien disponible en option pour occasions formelles. Système de changement rapide permet adaptation selon contexte professionnel ou personnel. Collection de bracelets premium disponible. La montre business définitive pour professionnels exigeants de La Réunion alliant prestige et technologie.",
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
    description: "Montre HIFUTURE Lume Pro avec éclairage LED avancé et fonctions sport professionnelles pour athlètes urbains exigeants. Cette évolution premium de la Lume originale pousse l'innovation encore plus loin avec technologies exclusives et matériaux haut de gamme. Design sophistiqué disponible en noir professionnel, vert dynamique, pink audacieux ou titanium premium. La version titanium utilise alliage aérospatial pour légèreté et résistance exceptionnelles. Finitions métalliques brossées et polies créent contraste visuel saisissant. Éclairage LED amélioré pour visibilité et style uniques. Système multi-zones avec LEDs RGB programmables créant effets lumineux spectaculaires. Synchronisation musique, notifications personnalisées ou mode stroboscopique pour sécurité nocturne. Intensité adaptative selon luminosité ambiante. Écran AMOLED haute définition pour affichage cristallin même en plein soleil. Luminosité 1000 nits garantit lisibilité parfaite. Always-On Display optionnel avec consommation optimisée. Protection Gorilla Glass contre rayures et impacts. Fonctions sport pro incluant VO2 Max et temps de récupération. Analyse biomécanique avancée évalue efficacité de course et risque de blessure. Plans d'entraînement adaptatifs avec coaching vocal. Segments Strava automatiques pour compétition virtuelle. Version titanium avec boîtier ultra-résistant et léger (45g seulement). Résistance exceptionnelle aux chocs et températures extrêmes. Traitement DLC (Diamond-Like Carbon) pour protection ultime contre rayures. Résistance ATM5 pour natation et sports aquatiques sans restriction. Certification IP68 contre poussière et immersion prolongée. Mode triathlon avec transition automatique entre disciplines. Autonomie 8-10 jours malgré fonctionnalités avancées grâce à processeur basse consommation nouvelle génération. Charge sans fil rapide 0-100% en 90 minutes. PowerBank reverse charging pour urgences. La montre LED premium pour sportifs exigeants de La Réunion alliant innovation lumineuse et performance athlétique.",
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
    description: "Innovation technologique avec la montre HIFUTURE MIXX 3 à triple affichage révolutionnaire. Cette montre futuriste repousse les limites du possible avec son système multi-écran unique permettant gestion simultanée d'informations complexes pour utilisateurs ultra-connectés. Multi-interface révolutionnaire pour personnalisation maximale. Trois zones d'affichage indépendantes : écran principal AMOLED pour navigation, écran secondaire pour métriques temps réel, écran tertiaire pour notifications. Chaque zone personnalisable avec widgets dédiés. Mode multitâche permettant suivi simultané de plusieurs activités. Design avancé disponible en noir professionnel ou jaune fluo haute visibilité. Le jaune fluo phosphorescent assure visibilité maximale pour sécurité nocturne. Revêtement anti-choc renforcé pour résistance extrême. Architecture modulaire permettant personnalisation poussée. Triple affichage permettant gestion simultanée de multiples informations : fitness sur écran 1, navigation GPS sur écran 2, notifications sur écran 3. Idéal pour professionnels multitâches, traders suivant plusieurs marchés ou athlètes analysant données complexes. Interface optimisée pour usage intensif et multitâche avec processeur quad-core haute performance. RAM 2GB pour fluidité absolue. Stockage 16GB pour musique et applications. Système d'exploitation propriétaire avec App Store dédié. Visibilité nocturne améliorée avec version jaune fluo intégrant particules photoluminescentes. Éclairage de secours automatique en cas de faible luminosité. Mode urgence avec signal SOS lumineux. GPS intégré et suivi sport complet pour performances optimales. Triple GPS/GLONASS/Galileo pour précision maximale. Capteurs pro : accéléromètre, gyroscope, magnétomètre, baromètre. Analyse biomécanique temps réel sur écran dédié. Autonomie 7-10 jours malgré triple écran AMOLED grâce à gestion énergétique révolutionnaire. Chaque écran s'active indépendamment selon besoins. Mode économie désactive écrans secondaires. Charge ultra-rapide 30 minutes pour journée complète. La montre multi-affichage idéale pour technophiles de La Réunion recherchant innovation absolue et productivité maximale.",
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
  // [DOUBLON SUPPRIMÉ - MONSTER Illuminescence Light Strip Color/Blanc - existe déjà ligne 1876]
  // [DOUBLON SUPPRIMÉ - MONSTER Illuminescence Basic Lightstrip Multicouleur - existe déjà ligne 1818]
  // [DOUBLON SUPPRIMÉ - MONSTER Illuminescence Smart Chroma Light 2X Bars - existe déjà ligne 1990]
  // [DOUBLON SUPPRIMÉ - MONSTER Illuminescence Neon Light Strip - existe déjà ligne 1932]
  {
    id: 'led-005',
    name: 'MONSTER RGB Gaming Light Bars Pro',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
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
    name: 'MONSTER Smart LED Panel Hexagonal Kit',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Projecteurs',
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
    name: 'MONSTER Ambient TV LED Backlight 4K',
    brand: 'MONSTER',
    category: 'Éclairage LED',
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
    name: 'MONSTER Projecteur LED Galaxy Starlight',
    brand: 'MONSTER',
    category: 'Éclairage LED',
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
    name: 'MONSTER LED Ring Light Studio Pro 18"',
    brand: 'MONSTER',
    category: 'Éclairage LED',
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
    name: 'MONSTER Smart Bulb RGB WiFi Pack x4',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Ampoules connectées',
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
  },
  {
    id: 'led-011',
    name: 'MONSTER LED Strip Gaming Setup 5M',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.6,
    reviews: 85,
    images: ['/placeholder-product.png'],
    description: 'Bandeau LED spécialement conçu pour les setups gaming avec synchronisation musique et effets dynamiques.',
    shortDescription: 'Bandeau LED 5M gaming avec sync musique',
    specifications: {
      'Longueur': '5 mètres',
      'LEDs': '150 LEDs',
      'Couleurs': 'RGB + Blanc',
      'Modes': '20 modes',
      'Contrôle': 'App + Télécommande'
    },
    features: [
      'Synchronisation musique',
      'Effets gaming dynamiques',
      'Application mobile dédiée',
      'Installation facile'
    ],
    stockQuantity: 25,
    sku: 'MON-LED-GAME5M',
    urlSlug: 'monster-led-strip-gaming-setup-5m',
    badges: ['Gaming', 'Sync musique']
  },
  {
    id: 'led-012',
    name: 'MONSTER Cube LED Modulaire Smart',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Projecteurs',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.7,
    reviews: 62,
    images: ['/placeholder-product.png'],
    description: 'Cubes LED modulaires connectables pour créer des designs lumineux personnalisés.',
    shortDescription: '6 cubes LED modulaires WiFi',
    specifications: {
      'Dimensions': '10x10x10 cm par cube',
      'Quantité': '6 cubes',
      'Couleurs': '16 millions',
      'Contrôle': 'WiFi + Bluetooth',
      'Compatibilité': 'Alexa, Google Home'
    },
    features: [
      'Design modulaire',
      'Connexion magnétique',
      'Contrôle vocal',
      'Effets personnalisables'
    ],
    stockQuantity: 18,
    sku: 'MON-CUBE-LED',
    urlSlug: 'monster-cube-led-modulaire-smart',
    badges: ['Modulaire', 'Smart']
  },
  {
    id: 'led-013',
    name: 'MONSTER Lightning Pro Corner RGB',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.5,
    reviews: 93,
    images: ['/placeholder-product.png'],
    description: 'Barres LED d\'angle pour un éclairage immersif des coins de pièce.',
    shortDescription: '2 barres LED d\'angle RGB 1m',
    specifications: {
      'Longueur': '1 mètre par barre',
      'Quantité': '2 barres',
      'Angle': '90 degrés',
      'Couleurs': 'RGB + Blanc',
      'Installation': 'Adhésif 3M'
    },
    features: [
      'Design pour angles',
      'Éclairage immersif',
      'Télécommande RF',
      'Installation simple'
    ],
    stockQuantity: 30,
    sku: 'MON-CORNER-RGB',
    urlSlug: 'monster-lightning-pro-corner-rgb',
    badges: ['Design', 'Corner']
  },
  {
    id: 'led-014',
    name: 'MONSTER Flood Light Extérieur 50W',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Projecteurs',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.8,
    reviews: 107,
    images: ['/placeholder-product.png'],
    description: 'Projecteur LED extérieur puissant avec détection de mouvement et résistance IP65.',
    shortDescription: 'Projecteur LED 50W IP65 avec détecteur',
    specifications: {
      'Puissance': '50W',
      'Luminosité': '5000 lumens',
      'Température': '6500K',
      'Détection': 'Capteur PIR 10m',
      'Résistance': 'IP65'
    },
    features: [
      'Détection de mouvement',
      'Résistant aux intempéries',
      'Économe en énergie',
      'Longue durée de vie'
    ],
    stockQuantity: 15,
    sku: 'MON-FLOOD-50W',
    urlSlug: 'monster-flood-light-exterieur-50w',
    badges: ['Extérieur', 'IP65']
  },
  {
    id: 'led-015',
    name: 'MONSTER Infinity Mirror LED 3D',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Déco LED',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.9,
    reviews: 76,
    images: ['/placeholder-product.png'],
    description: 'Miroir infini LED 3D pour une décoration futuriste avec effets de profondeur illimités.',
    shortDescription: 'Miroir infini LED 40x40cm avec effets 3D',
    specifications: {
      'Dimensions': '40x40 cm',
      'Profondeur': 'Effet infini',
      'Couleurs': 'RGB programmable',
      'Modes': '25 animations',
      'Contrôle': 'App + Commande vocale'
    },
    features: [
      'Effet 3D infini',
      'Contrôle vocal',
      '25 animations',
      'Cadre aluminium premium'
    ],
    stockQuantity: 12,
    sku: 'MON-INFINITY-3D',
    urlSlug: 'monster-infinity-mirror-led-3d',
    badges: ['Premium', '3D Effect']
  },

  // === NOUVEAUX PRODUITS AJOUTÉS DEPUIS AIRTABLE (39 produits) ===
  
  // HIFUTURE Enceinte Altus
  {
    id: 'hifuture-altus',
    airtableId: 'rec3',
    sku: 'HIFUTURE-ALTUS',
    name: 'HIFUTURE Enceinte Altus',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 29.99,
    description: "L'enceinte portable HIFUTURE Altus incarne la fusion parfaite entre puissance sonore et mobilité absolue. Conçue pour accompagner toutes vos aventures, cette enceinte compacte délivre une puissance impressionnante de 10W, transformant n'importe quel environnement en espace musical immersif.\n\nLa certification IPX6 garantit une résistance totale aux éclaboussures et projections d'eau, permettant une utilisation sans crainte à la plage, au bord de la piscine ou sous la pluie tropicale réunionnaise. Cette protection robuste fait de l'Altus le compagnon idéal pour toutes vos activités outdoor, des randonnées aux pique-niques en passant par les séances de sport.\n\nQuatre coloris tendance s'offrent à vous pour exprimer votre personnalité : le Camo Vert pour les aventuriers, le Noir élégant pour les puristes, le Bleu dynamique pour les sportifs et le Rouge passionné pour les audacieux. Chaque finition est soigneusement traitée pour résister aux chocs et aux rayures du quotidien.\n\nLa technologie Bluetooth 5.0 assure une connexion instantanée et stable jusqu'à 10 mètres, éliminant les coupures et optimisant la consommation énergétique. L'appairage simplifié permet de connecter votre smartphone en quelques secondes, tandis que la mémoire de connexion reconnecte automatiquement vos appareils préférés.\n\nL'autonomie de 8 à 10 heures vous accompagne tout au long de la journée, des sessions matinales de yoga aux soirées entre amis. La charge rapide via USB-C restaure l'énergie en seulement 2 heures, garantissant une disponibilité maximale.\n\nLe son équilibré offre des basses profondes sans saturation, des médiums clairs et des aigus cristallins, parfait pour tous les styles musicaux. Les radiateurs passifs intégrés amplifient les basses fréquences pour une expérience sonore riche et enveloppante.\n\nIdéale pour les habitants actifs de La Réunion, l'enceinte HIFUTURE Altus résiste parfaitement au climat tropical tout en offrant une qualité audio exceptionnelle pour un prix accessible.",
    shortDescription: 'Enceinte Bluetooth portable avec son HD',
    metaTitle: 'HIFUTURE Enceinte Altus - Bluetooth Portable | Monster Phone 974',
    metaDescription: 'Enceinte Bluetooth HIFUTURE Altus. Son HD, autonomie longue durée, design robuste. 4 coloris disponibles. Livraison La Réunion.',
    urlSlug: 'hifuture-enceinte-altus-bluetooth',
    keywords: ['HIFUTURE', 'Altus', 'enceinte', 'bluetooth', 'portable'],
    variants: [
      { color: 'Camo Vert', colorCode: '#4A5F3A', ean: '', stock: 10, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 15, images: [] },
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 8, images: [] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '', stock: 12, images: [] }
    ],
    specifications: [
      { label: 'Connectivité', value: 'Bluetooth 5.0' },
      { label: 'Autonomie', value: '12 heures' },
      { label: 'Puissance', value: '10W' },
      { label: 'Étanchéité', value: 'IPX5' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-altus.jpg'],
    status: 'active' as const,
    badges: ['Nouveau']
  },

  // HIFUTURE PartyBox Event Horizon
  {
    id: 'hifuture-event-horizon',
    airtableId: 'rec4',
    sku: 'HIF-EVENT-HORIZON',
    name: 'HIFUTURE PartyBox Event Horizon',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 199.99,
    description: "La HIFUTURE PartyBox Event Horizon transcende les limites de l'audio portable pour créer une expérience festive totalement immersive. Ce système audio professionnel combine puissance sonore exceptionnelle et spectacle lumineux LED spectaculaire, transformant instantanément n'importe quel espace en véritable salle de concert.\n\nConçue pour animer des événements jusqu'à 100 invités, l'Event Horizon délivre une puissance acoustique professionnelle capable de remplir grands espaces intérieurs et extérieurs. Les drivers haute performance et les amplificateurs de classe D garantissent une restitution sonore d'une clarté exceptionnelle, même à volume élevé.\n\nLe show lumineux LED synchronisé transforme chaque morceau en spectacle visuel captivant. Les effets lumineux réagissent dynamiquement au rythme de la musique, créant une atmosphère festive unique. Plusieurs modes d'éclairage permettent d'adapter l'ambiance : disco dynamique, ambiance lounge ou éclairage statique élégant.\n\nLa technologie acoustique premium intègre égalisation DSP avancée, optimisant automatiquement le son selon l'environnement. Le mode karaoké avec double entrée microphone transforme vos soirées en véritables performances scéniques. L'effet écho réglable et la suppression vocale permettent des prestations dignes des professionnels.\n\nLa connectivité complète inclut Bluetooth 5.0 longue portée, entrées auxiliaires, ports USB pour lecture directe et connexion guitare. Le mode TWS permet de coupler deux Event Horizon pour une expérience stéréo monumentale. L'application dédiée offre contrôle total des paramètres audio et lumineux.\n\nLa batterie haute capacité garantit jusqu'à 8 heures d'autonomie à volume modéré, suffisant pour animer une soirée complète. Les roulettes intégrées et la poignée télescopique facilitent le transport malgré la puissance embarquée.\n\nParfaite pour mariages, anniversaires et événements corporate à La Réunion, l'Event Horizon transforme chaque célébration en moment inoubliable. La qualité professionnelle accessible aux particuliers exigeants.",
    shortDescription: 'Enceinte party avec LED et son puissant',
    metaTitle: 'HIFUTURE PartyBox Event Horizon - Enceinte Soirée LED | Monster Phone 974',
    metaDescription: 'HIFUTURE PartyBox Event Horizon. Son puissant, éclairage LED RGB, autonomie 8h. Parfait pour soirées. Livraison La Réunion.',
    urlSlug: 'hifuture-partybox-event-horizon',
    keywords: ['HIFUTURE', 'PartyBox', 'Event Horizon', 'enceinte', 'soirée', 'LED'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 5, images: [] }
    ],
    specifications: [
      { label: 'Puissance', value: '100W RMS' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'Éclairage', value: 'LED RGB' },
      { label: 'Connectivité', value: 'Bluetooth, USB, AUX' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-event-horizon.jpg'],
    status: 'active' as const,
    badges: ['Party', 'LED']
  },

  // HIFUTURE Écouteur Olymbuds 3
  {
    id: 'hifuture-olymbuds-3',
    airtableId: 'rec10',
    sku: 'HIFUTURE-OLYMBUDS3',
    name: 'HIFUTURE Écouteur Olymbuds 3',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 24.99,
    description: `Les HIFUTURE Olymbuds 3 sont des écouteurs Bluetooth de dernière génération avec réduction de bruit active (ANC), offrant une expérience audio immersive et cristalline. Dotés de la certification IPX5, ils résistent à l'eau et à la transpiration, parfaits pour le sport et les activités extérieures.

Caractéristiques principales :
• Réduction de bruit active (ANC) jusqu'à -30dB
• Bluetooth 5.2 pour une connexion stable et rapide
• Certification IPX5 - Résistance à l'eau et à la transpiration
• Autonomie jusqu'à 7h par charge + 28h avec l'étui
• Charge rapide : 10 min = 1h d'écoute
• Drivers de 10mm pour des basses profondes
• Mode transparence pour rester conscient de l'environnement
• Commandes tactiles intuitives sur chaque écouteur
• Appairage automatique et connexion instantanée
• Compatible avec assistants vocaux (Siri, Google Assistant)

L'étui de charge compact avec indicateur LED permet de recharger les écouteurs plusieurs fois en déplacement. Le design ergonomique assure un maintien parfait et un confort optimal même lors d'une utilisation prolongée.

Idéal pour :
- Les sportifs grâce à la certification IPX5
- Les voyageurs avec la réduction de bruit active
- Le télétravail avec le micro antibruit
- Les audiophiles recherchant une qualité sonore premium

Contenu du coffret : Écouteurs, étui de charge, câble USB-C, 3 paires d'embouts silicone (S/M/L), guide d'utilisation.`,
    shortDescription: 'Écouteurs TWS avec réduction de bruit',
    metaTitle: 'HIFUTURE Olymbuds 3 - Écouteurs True Wireless | Monster Phone 974',
    metaDescription: 'HIFUTURE Olymbuds 3. Réduction de bruit, autonomie 24h avec boîtier, Bluetooth 5.2. Disponible en blanc et noir.',
    urlSlug: 'hifuture-olymbuds-3-ecouteurs-tws',
    keywords: ['HIFUTURE', 'Olymbuds', 'écouteurs', 'TWS', 'true wireless'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 20, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 25, images: [] }
    ],
    specifications: [
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Autonomie', value: '6h + 18h avec boîtier' },
      { label: 'Réduction de bruit', value: 'Active' },
      { label: 'Charge rapide', value: 'USB-C' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-olymbuds-3.jpg'],
    status: 'active' as const,
    badges: ['ANC']
  },

  // HIFUTURE TOUR X
  {
    id: 'hifuture-tour-x',
    airtableId: 'rec12',
    sku: 'HIF-TOUR-X',
    name: 'HIFUTURE TOUR X',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 13.99,
    description: `Les HIFUTURE TOUR X sont des écouteurs sport spécialement conçus pour les athlètes et sportifs exigeants. Dotés de crochets d'oreille ergonomiques et d'une certification IPX4, ils offrent une tenue parfaite et une résistance optimale à la transpiration pendant vos séances les plus intenses.

Caractéristiques principales :
• Crochets d'oreille flexibles pour un maintien parfait
• Certification IPX4 - Protection contre la sueur et les éclaboussures
• Drivers dynamiques de 10mm pour un son puissant et équilibré
• Autonomie de 8 heures en lecture continue
• Microphone intégré avec réduction de bruit ambiant
• Câble renforcé anti-enchevêtrement
• Commandes intégrées pour musique et appels
• Embouts ergonomiques en silicone pour un confort optimal
• Compatible avec tous les appareils Bluetooth
• Pochette de transport incluse

La conception sport des TOUR X assure une stabilité exceptionnelle même lors des mouvements les plus intenses. Les crochets d'oreille souples s'adaptent à toutes les morphologies tout en garantissant un confort prolongé.

Idéal pour :
- Course à pied et jogging
- Salle de sport et fitness
- Sports d'équipe
- Cyclisme et VTT
- Toutes activités sportives intensives

La qualité audio premium avec basses profondes et aigus cristallins transforme chaque séance d'entraînement en expérience motivante.

Contenu du coffret : Écouteurs TOUR X, pochette de transport, 3 paires d'embouts (S/M/L), guide d'utilisation.`,
    shortDescription: 'Écouteurs sport avec crochets',
    metaTitle: 'HIFUTURE TOUR X - Écouteurs Sport | Monster Phone 974',
    metaDescription: 'HIFUTURE TOUR X. Écouteurs sport résistants à la sueur, crochets d\'oreille, son dynamique. Prix mini.',
    urlSlug: 'hifuture-tour-x-ecouteurs-sport',
    keywords: ['HIFUTURE', 'TOUR X', 'écouteurs', 'sport', 'fitness'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 30, images: [] }
    ],
    specifications: [
      { label: 'Résistance', value: 'IPX4' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'Type', value: 'Intra-auriculaire avec crochets' },
      { label: 'Micro', value: 'Intégré' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-tour-x.jpg'],
    status: 'active' as const,
    badges: ['Sport']
  },

  // HIFUTURE Enceinte Ripple
  {
    id: 'hifuture-ripple',
    airtableId: 'rec13',
    sku: 'HIFUTURE-RIPPLE',
    name: 'HIFUTURE Enceinte Ripple',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 64.99,
    description: `La HIFUTURE Ripple est une enceinte Bluetooth révolutionnaire avec diffusion sonore à 360°, créant une bulle sonore immersive qui transforme n'importe quel espace en salle de concert. Son design élégant avec finition premium s'intègre parfaitement dans tous les intérieurs modernes.

Caractéristiques principales :
• Son omnidirectionnel 360° pour une couverture sonore totale
• Puissance de 20W RMS avec double radiateur passif
• Bluetooth 5.0 pour une connexion stable jusqu'à 20m
• Autonomie exceptionnelle jusqu'à 15 heures
• Fonction TWS - Couplez 2 enceintes pour un son stéréo
• Certification IPX5 - Résistance aux éclaboussures
• Microphone intégré pour appels mains libres
• Éclairage LED ambiant multicolore personnalisable
• Commandes tactiles intuitives sur le dessus
• Port USB pour recharge d'appareils mobiles (powerbank)

La technologie de diffusion 360° garantit une qualité sonore identique peu importe votre position dans la pièce. Les basses profondes et les aigus cristallins créent une expérience d'écoute riche et équilibrée.

Idéal pour :
- Soirées et réceptions
- Ambiance musicale à la maison
- Terrasse et jardin (IPX5)
- Bureau et espaces de travail
- Camping et activités extérieures

Le design cylindrique avec grille métallique et base antidérapante assure stabilité et élégance. L'éclairage LED synchronisé avec la musique crée une ambiance unique.

Contenu du coffret : Enceinte Ripple, câble USB-C, câble audio 3.5mm, guide d'utilisation, sac de transport.`,
    shortDescription: 'Enceinte 360° avec son immersif',
    metaTitle: 'HIFUTURE Ripple - Enceinte Bluetooth 360° | Monster Phone 974',
    metaDescription: 'HIFUTURE Ripple. Son 360°, Bluetooth 5.0, autonomie 15h. Design élégant en 3 coloris. Livraison La Réunion.',
    urlSlug: 'hifuture-enceinte-ripple-360',
    keywords: ['HIFUTURE', 'Ripple', 'enceinte', 'bluetooth', '360 degrés'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 8, images: [] },
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 6, images: [] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '', stock: 5, images: [] }
    ],
    specifications: [
      { label: 'Son', value: '360°' },
      { label: 'Puissance', value: '20W' },
      { label: 'Autonomie', value: '15 heures' },
      { label: 'Bluetooth', value: '5.0' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-ripple.jpg'],
    status: 'active' as const,
    badges: ['360°']
  },

  // MY WAY Câble Lumineux USB-C
  {
    id: 'myway-cable-lumineux-usbc',
    airtableId: 'rec17',
    sku: 'MYWCBL-LUM-USBC',
    name: 'MY WAY Câble Lumineux USB-C',
    brand: 'MY WAY',
    category: 'Accessoires',
    subcategory: 'Câbles & Connecteurs',
    price: 14.99,
    description: "Découvrez le câble MY WAY Lumineux USB-C, une révolution dans l'univers des accessoires de charge. Ce câble unique combine fonctionnalité et esthétique avec son effet LED dynamique qui transforme chaque charge en expérience visuelle captivante.\n\nCe câble innovant propose deux configurations essentielles : USB-C vers USB-C pour les appareils modernes et USB-C vers Lightning pour l'écosystème Apple. L'effet lumineux LED intégré ne se contente pas d'être décoratif - il indique visuellement le flux d'énergie pendant la charge, créant une animation fluide qui suit le courant électrique.\n\nConçu avec un TPE renforcé de haute qualité, ce câble résiste aux torsions et aux pliages répétés. La technologie de charge rapide 3A garantit une alimentation optimale de vos appareils, réduisant considérablement les temps d'attente. La longueur d'un mètre offre la flexibilité parfaite entre mobilité et confort d'utilisation.\n\nL'effet LED consomme une énergie négligeable et s'active automatiquement lors de la connexion. Cette fonctionnalité permet non seulement d'identifier facilement votre câble dans l'obscurité, mais aussi de vérifier instantanément que la charge est active.\n\nParfait pour les professionnels à La Réunion qui valorisent l'innovation et le style, ce câble MY WAY transforme un accessoire utilitaire en objet design. Compatible avec smartphones, tablettes, écouteurs et tous appareils USB-C ou Lightning, il s'adapte à tous vos besoins de charge et synchronisation.\n\nLa certification de sécurité garantit une protection contre les surtensions et les courts-circuits, préservant la longévité de vos appareils. Disponible immédiatement dans nos boutiques réunionnaises avec garantie constructeur d'un an.",
    shortDescription: 'Câble USB-C lumineux avec LED',
    metaTitle: 'MY WAY Câble Lumineux USB-C - LED Charge Rapide | Monster Phone 974',
    metaDescription: 'MY WAY Câble lumineux USB-C. LED de charge, charge rapide 3A, longueur 1m. USB-C vers USB-C ou Lightning.',
    urlSlug: 'myway-cable-lumineux-usb-c',
    keywords: ['MY WAY', 'câble', 'USB-C', 'lumineux', 'LED'],
    variants: [
      { color: 'USB-C vers USB-C', colorCode: '#333333', ean: '', stock: 25, images: [] },
      { color: 'USB-C vers Lightning', colorCode: '#666666', ean: '', stock: 20, images: [] }
    ],
    specifications: [
      { label: 'Longueur', value: '1 mètre' },
      { label: 'Charge', value: '3A Max' },
      { label: 'LED', value: 'Indicateur lumineux' },
      { label: 'Matériau', value: 'Nylon tressé' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/myway-cable-lumineux-usbc.jpg'],
    status: 'active' as const,
    badges: ['LED', 'Charge Rapide']
  },

  // MY WAY Câble Lumineux USB-A
  {
    id: 'myway-cable-lumineux-usba',
    airtableId: 'rec18',
    sku: 'MYWCBL-LUM-USBA',
    name: 'MY WAY Câble Lumineux USB-A',
    brand: 'MY WAY',
    category: 'Accessoires',
    subcategory: 'Câbles & Connecteurs',
    price: 12.99,
    description: "Le câble lumineux MY WAY USB-A vers USB-C représente la fusion parfaite entre technologie traditionnelle et innovation moderne. Conçu pour connecter vos appareils USB-C aux ports USB-A standard, ce câble révolutionne l'expérience de charge avec son effet LED dynamique unique.\n\nL'animation lumineuse LED intégrée crée un spectacle visuel fascinant pendant la charge. Cette technologie brevetée MY WAY permet de visualiser instantanément le transfert d'énergie, transformant un simple câble en accessoire high-tech design. L'effet lumineux s'adapte automatiquement à l'intensité de charge, offrant un feedback visuel intuitif.\n\nAvec sa capacité de charge 2.4A, ce câble assure une alimentation rapide et stable pour smartphones, tablettes, écouteurs et autres périphériques USB-C. La compatibilité universelle USB-A garantit son utilisation avec ordinateurs, chargeurs muraux, powerbanks et adaptateurs allume-cigare existants.\n\nLa construction robuste utilise des matériaux premium : connecteurs renforcés en alliage d'aluminium, gaine TPE flexible résistante aux torsions, et fils de cuivre haute conductivité. Cette qualité de fabrication garantit des milliers de cycles de connexion sans dégradation des performances.\n\nLe design noir élégant s'intègre parfaitement dans tout environnement, professionnel ou personnel. La longueur d'un mètre offre le compromis idéal entre portabilité et liberté de mouvement pendant l'utilisation.\n\nIdéal pour les utilisateurs réunionnais recherchant un accessoire distinctif et performant, ce câble MY WAY combine praticité quotidienne et innovation visuelle. La technologie LED basse consommation n'impacte pas les performances de charge tout en offrant une expérience utilisateur unique.\n\nCertifié pour la sécurité avec protections multiples intégrées, disponible immédiatement dans notre réseau de distribution local avec support technique et garantie constructeur complète.",
    shortDescription: 'Câble USB-A lumineux avec LED',
    metaTitle: 'MY WAY Câble Lumineux USB-A - LED Indicateur | Monster Phone 974',
    metaDescription: 'MY WAY Câble lumineux USB-A. LED de charge, compatible Lightning et USB-C, longueur 1m. Prix mini.',
    urlSlug: 'myway-cable-lumineux-usb-a',
    keywords: ['MY WAY', 'câble', 'USB-A', 'lumineux', 'LED'],
    variants: [
      { color: 'USB-A vers Lightning', colorCode: '#333333', ean: '', stock: 30, images: [] },
      { color: 'USB-A vers USB-C', colorCode: '#666666', ean: '', stock: 35, images: [] }
    ],
    specifications: [
      { label: 'Longueur', value: '1 mètre' },
      { label: 'Charge', value: '2.4A Max' },
      { label: 'LED', value: 'Indicateur lumineux' },
      { label: 'Compatibilité', value: 'Universal' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/myway-cable-lumineux-usba.jpg'],
    status: 'active' as const,
    badges: ['LED']
  },

  // MONSTER Illuminescence Light Strip Pack 2X 5M RGB+W
  {
    id: 'monster-illuminescence-pack-2x5m',
    airtableId: 'rec19',
    sku: 'MON-ILL-PACK-2X5M',
    name: 'MONSTER Illuminescence Light Strip Pack 2X 5M RGB+W',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
    price: 55.99,
    description: "Pack de 2 bandes LED MONSTER Illuminescence 5M RGB+W avec contrôle sonore pour une ambiance personnalisée. Synchronisez vos lumières avec votre musique.",
    shortDescription: 'Pack 2x5M bandes LED RGB+W avec contrôle sonore',
    metaTitle: 'MONSTER Illuminescence Pack 2x5M RGB+W - Bandes LED Sound Reactive | Monster Phone 974',
    metaDescription: 'Pack MONSTER 2x5M bandes LED RGB+W. Contrôle sonore, 16 millions de couleurs, télécommande. Installation facile.',
    urlSlug: 'monster-illuminescence-pack-2x5m-rgb-w',
    keywords: ['MONSTER', 'Illuminescence', 'LED', 'RGB', 'sound reactive'],
    variants: [
      { color: 'Basic Sound Reactive', colorCode: '#FF00FF', ean: '', stock: 10, images: [] },
      { color: 'Smart Sound Reactive', colorCode: '#00FFFF', ean: '', stock: 8, images: [] }
    ],
    specifications: [
      { label: 'Longueur', value: '2 x 5 mètres' },
      { label: 'LED', value: 'RGB + Blanc' },
      { label: 'Contrôle', value: 'Sound Reactive' },
      { label: 'Alimentation', value: '12V inclus' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-illuminescence-pack-2x5m.jpg'],
    status: 'active' as const,
    badges: ['Pack', 'Sound Reactive']
  },

  // HIFUTURE PartyBox MusicBox
  {
    id: 'hifuture-musicbox',
    airtableId: 'rec20',
    sku: 'HIF-MUSICBOX',
    name: 'HIFUTURE PartyBox MusicBox',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 149.99,
    description: `La HIFUTURE MusicBox est l'enceinte party ultime avec 80W de puissance pure, un système d'éclairage LED synchronisé spectaculaire et un micro sans fil inclus pour transformer instantanément n'importe quel événement en soirée mémorable. Conçue pour les grandes réceptions et événements.

Caractéristiques principales :
• Puissance exceptionnelle de 80W RMS (160W peak)
• Double woofer 6.5" + double tweeter pour un son puissant
• Système LED RGB synchronisé avec effets lumineux dynamiques
• Microphone sans fil professionnel inclus
• Mode karaoké avec réglage écho et volume
• Bluetooth 5.0 longue portée (jusqu'à 30m)
• Autonomie jusqu'à 10 heures à volume moyen
• Entrées multiples : Bluetooth, USB, SD, AUX, Micro
• Égaliseur 5 bandes avec présets (Rock, Jazz, Pop, Classic)
• Fonction TWS pour coupler 2 enceintes (160W total)
• Poignée de transport et roulettes intégrées
• Panneau de contrôle LED avec affichage numérique

Le système d'éclairage professionnel avec LED RGB multicolores crée une ambiance de discothèque avec plusieurs modes : pulsation, stroboscope, dégradé, synchronisation musicale. Le microphone sans fil UHF garantit une qualité vocale cristalline.

Idéal pour :
- Soirées et événements privés
- Karaoké entre amis
- Animations DJ mobiles
- Événements en extérieur
- Mariages et anniversaires
- Concerts et spectacles

La construction robuste avec grille métallique et coins renforcés assure une durabilité maximale. Les roulettes et la poignée télescopique facilitent le transport.

Contenu du coffret : Enceinte MusicBox, microphone sans fil UHF, télécommande, câble d'alimentation, câble AUX, guide d'utilisation.`,
    shortDescription: 'Enceinte party puissante avec LED',
    metaTitle: 'HIFUTURE PartyBox MusicBox - Enceinte Soirée Puissante | Monster Phone 974',
    metaDescription: 'HIFUTURE MusicBox. 80W de puissance, LED synchronisées, micro inclus, autonomie 10h. Animation garantie.',
    urlSlug: 'hifuture-partybox-musicbox',
    keywords: ['HIFUTURE', 'PartyBox', 'MusicBox', 'enceinte', 'party'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 4, images: [] }
    ],
    specifications: [
      { label: 'Puissance', value: '80W' },
      { label: 'Autonomie', value: '10 heures' },
      { label: 'Micro', value: 'Inclus' },
      { label: 'Éclairage', value: 'LED synchronisées' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-musicbox.jpg'],
    status: 'active' as const,
    badges: ['Party', 'Micro inclus']
  },

  // HIFUTURE Casque ANC Tour
  {
    id: 'hifuture-tour-anc',
    airtableId: 'rec26',
    sku: 'HIF-TOUR-ANC',
    name: 'HIFUTURE Casque ANC Tour',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 44.99,
    description: `Le casque HIFUTURE Tour représente le summum de la technologie audio avec sa réduction de bruit active (ANC) de pointe, offrant une expérience d'écoute pure et immersive. Conçu pour les audiophiles et les voyageurs exigeants, il combine confort exceptionnel et performances audio premium.

Caractéristiques principales :
• Réduction de bruit active (ANC) jusqu'à -35dB
• Drivers de 40mm avec aimants néodyme haute performance
• Bluetooth 5.2 avec codec aptX HD pour un son sans perte
• Autonomie exceptionnelle jusqu'à 30 heures avec ANC
• Charge rapide USB-C : 10 min = 3h d'écoute
• Mode transparence pour rester conscient de l'environnement
• Coussinets mémoire de forme ultra-confortables
• Arceau ajustable rembourré en cuir synthétique premium
• Pliable et compact avec étui de transport rigide
• Microphones multiples pour appels cristallins
• Commandes tactiles intuitives sur l'écouteur droit
• Compatible assistants vocaux (Siri, Google Assistant)

La technologie ANC hybride avec 4 microphones analyse et neutralise les bruits ambiants en temps réel, créant une bulle de silence parfaite pour votre musique. Le mode transparence permet d'entendre les annonces importantes sans retirer le casque.

Idéal pour :
- Voyages en avion et train (ANC optimisé)
- Télétravail et visioconférences
- Sessions d'écoute prolongées
- Gaming avec latence réduite
- Méditation et relaxation

Le design ergonomique avec rotation 90° des écouteurs et arceau ajustable garantit un confort optimal même après plusieurs heures d'utilisation.

Contenu du coffret : Casque Tour ANC, étui de transport rigide, câble USB-C, câble audio 3.5mm, adaptateur avion, guide d'utilisation.`,
    shortDescription: 'Casque avec réduction de bruit active',
    metaTitle: 'HIFUTURE Casque ANC Tour - Réduction de Bruit Active | Monster Phone 974',
    metaDescription: 'HIFUTURE Tour ANC. Réduction de bruit active, confort longue durée, autonomie 30h. Son haute définition.',
    urlSlug: 'hifuture-casque-anc-tour',
    keywords: ['HIFUTURE', 'Tour', 'casque', 'ANC', 'réduction bruit'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 12, images: [] }
    ],
    specifications: [
      { label: 'ANC', value: 'Réduction active -25dB' },
      { label: 'Autonomie', value: '30 heures' },
      { label: 'Charge rapide', value: 'USB-C' },
      { label: 'Pliable', value: 'Oui' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-tour-anc.jpg'],
    status: 'active' as const,
    badges: ['ANC']
  },

  // HIFUTURE Écouteur Sonify
  {
    id: 'hifuture-sonify',
    airtableId: 'rec28',
    sku: 'HIFUTURE-SONIFY',
    name: 'HIFUTURE Écouteur Sonify',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 44.99,
    description: `Les HIFUTURE Sonify représentent l'excellence en matière d'écouteurs True Wireless, combinant une qualité audio Hi-Fi exceptionnelle, un design luxueux et les dernières innovations technologiques. La charge sans fil Qi et l'étui premium en font le compagnon idéal des utilisateurs exigeants.

Caractéristiques principales :
• Drivers dynamiques 13mm avec diaphragme biocomposite
• Qualité audio Hi-Fi avec certification Hi-Res Audio
• Bluetooth 5.3 avec multipoint (2 appareils simultanés)
• Charge sans fil Qi compatible tous chargeurs
• Autonomie 7h par charge + 21h avec l'étui (28h total)
• Charge rapide : 15 min = 2h d'écoute
• Réduction de bruit active adaptative (ANC)
• Mode transparence intelligent avec détection vocale
• Certification IPX5 pour résistance à l'eau
• Détection automatique du port (pause/lecture)
• Égaliseur personnalisable via application
• Localisation des écouteurs par GPS

L'étui de charge premium avec finition métallisée supporte la charge sans fil Qi et la charge rapide USB-C. L'indicateur LED élégant affiche le niveau de batterie avec précision.

Technologies audio avancées :
- Codec LDAC pour audio haute résolution
- Réduction de bruit ENC pour les appels
- Spatialisation 360° pour une scène sonore immersive
- Bass Boost adaptatif selon le genre musical

Idéal pour :
- Audiophiles recherchant la qualité Hi-Fi
- Professionnels en déplacement
- Utilisateurs d'écosystème sans fil (charge Qi)
- Sport et activités avec IPX5

Le design ergonomique avec embouts en mousse mémoire garantit un maintien parfait et une isolation passive optimale.

Contenu du coffret : Écouteurs Sonify, étui de charge premium, câble USB-C, 4 paires d'embouts (XS/S/M/L), embouts mousse mémoire, guide d'utilisation.`,
    shortDescription: 'Écouteurs TWS premium',
    metaTitle: 'HIFUTURE Sonify - Écouteurs True Wireless Premium | Monster Phone 974',
    metaDescription: 'HIFUTURE Sonify. Son Hi-Fi, autonomie 28h totale, charge sans fil. Disponible en noir et champagne.',
    urlSlug: 'hifuture-ecouteurs-sonify',
    keywords: ['HIFUTURE', 'Sonify', 'écouteurs', 'TWS', 'premium'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 15, images: [] },
      { color: 'Champagne', colorCode: '#D4AF37', ean: '', stock: 10, images: [] }
    ],
    specifications: [
      { label: 'Driver', value: '10mm dynamique' },
      { label: 'Autonomie', value: '7h + 21h boîtier' },
      { label: 'Charge sans fil', value: 'Oui' },
      { label: 'Bluetooth', value: '5.3' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-sonify.jpg'],
    status: 'active' as const,
    badges: ['Hi-Fi', 'Charge sans fil']
  },

  // MONSTER Persona SE ANC
  {
    id: 'monster-persona-se-anc',
    airtableId: 'rec29',
    sku: 'MONSTER-PERSONA-SE-ANC',
    name: 'MONSTER Persona SE ANC',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 99.99,
    description: "Immergez-vous dans un cocon de silence avec le casque MONSTER Persona SE ANC, une solution audio premium qui combine réduction de bruit active professionnelle et confort exceptionnel pour créer l'expérience d'écoute idéale. Ce casque sophistiqué s'adresse aux professionnels et audiophiles qui recherchent l'isolation acoustique parfaite sans compromis sur la qualité sonore. La réduction de bruit active professionnelle exploite une technologie ANC multi-niveaux qui s'adapte intelligemment à votre environnement. Les microphones stratégiquement placés captent les bruits ambiants tandis que les processeurs génèrent des ondes inverses pour les annuler complètement. Cette technologie crée une bulle de tranquillité absolue, vous permettant de vous concentrer totalement sur votre musique ou votre travail. L'audio premium délivre une signature sonore équilibrée et naturelle qui respecte l'intention originale des artistes. Les transducteurs de 40mm spécialement accordés reproduisent fidèlement l'ensemble du spectre fréquentiel, des basses profondes et contrôlées aux aigus cristallins et détaillés. La scène sonore expansive crée une sensation d'espace tridimensionnel qui enrichit l'expérience d'écoute. Le confort exceptionnel résulte d'une étude ergonomique approfondie visant à éliminer toute fatigue lors d'utilisations prolongées. Les coussinets en mousse à mémoire de forme haute densité épousent parfaitement les contours de vos oreilles, créant un joint acoustique optimal tout en répartissant uniformément la pression. L'arceau auto-ajustable trouve naturellement la position idéale sans nécessiter de réglages constants. Deux coloris élégants reflètent différentes personnalités professionnelles. Le noir élégant incarne la sobriété et le professionnalisme avec une finition mate sophistiquée qui résiste aux traces de doigts. Le gris sophistiqué apporte une touche de modernité avec ses nuances subtiles qui s'accordent parfaitement aux environnements contemporains. Les matériaux premium garantissent une durabilité exceptionnelle. Le design moderne allie esthétique minimaliste et fonctionnalité optimale. Les lignes épurées et les finitions soignées créent un objet aussi beau que performant. Les commandes tactiles intégrées permettent de gérer intuitivement musique, appels et ANC sans sortir votre appareil. Les charnières robustes et le mécanisme de pliage facilitent le transport. L'audio cristallin se distingue particulièrement lors des appels téléphoniques et vidéoconférences. La technologie de réduction de bruit bidirectionnelle isole votre voix des bruits ambiants, garantissant une communication claire même dans les environnements bruyants. Les microphones beamforming focalisent sur votre voix tout en éliminant les sons parasites. Pour les professionnels et audiophiles de La Réunion qui exigent le meilleur en matière de réduction de bruit et de confort, le MONSTER Persona SE ANC représente l'outil parfait pour créer un espace de concentration absolue, que ce soit pour le travail intensif ou l'écoute musicale immersive.",
    shortDescription: 'Casque ANC audiophile',
    metaTitle: 'MONSTER Persona SE ANC - Casque Réduction Bruit',
    metaDescription: 'Casque MONSTER Persona SE avec ANC professionnel et confort premium. Audio cristallin, coussinets mémoire de forme, design moderne. Noir ou gris pour professionnels exigeants à La Réunion.',
    urlSlug: 'monster-persona-se-anc-casque',
    keywords: ['MONSTER', 'Persona SE', 'ANC', 'casque', 'audiophile'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 8, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '', stock: 6, images: [] }
    ],
    specifications: [
      { label: 'ANC', value: 'Hybride -35dB' },
      { label: 'Driver', value: '40mm' },
      { label: 'Autonomie', value: '40 heures' },
      { label: 'Codec', value: 'aptX HD, LDAC' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-persona-se-anc.jpg'],
    status: 'active' as const,
    badges: ['ANC Premium', 'Audiophile']
  },

  // HIFUTURE Écouteur Sonic Air
  {
    id: 'hifuture-sonic-air',
    airtableId: 'rec30',
    sku: 'HIFUTURE-SONIC-AIR',
    name: 'HIFUTURE Écouteur Sonic Air',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 24.99,
    description: `Les HIFUTURE Sonic Air redéfinissent le confort avec leur poids plume de seulement 4g par écouteur, offrant une expérience d'écoute si légère que vous oublierez que vous les portez. Malgré leur taille compacte, ils délivrent un son cristallin et une autonomie impressionnante.

Caractéristiques principales :
• Ultra-légers : seulement 4g par écouteur
• Design ergonomique invisible dans l'oreille
• Drivers 6mm avec technologie acoustique avancée
• Bluetooth 5.2 pour connexion stable et économe
• Autonomie 5h par charge + 15h avec l'étui (20h total)
• Charge rapide USB-C : 10 min = 1h d'écoute
• Réduction de bruit passive optimisée
• Microphones MEMS pour appels clairs
• Commandes tactiles sensibles et précises
• Certification IPX4 - Résistance à la transpiration
• Appairage automatique instantané
• Compatible assistants vocaux

L'étui de charge ultra-compact (taille rouge à lèvres) se glisse facilement dans n'importe quelle poche. Le design minimaliste avec finition mate anti-traces garantit une élégance discrète.

Technologies de confort :
- Embouts en silicone hypoallergénique
- Répartition optimale du poids
- Ventilation acoustique pour éviter la fatigue
- Forme anatomique adaptée à 95% des morphologies

Idéal pour :
- Port prolongé au quotidien
- Sport léger et yoga
- Appels téléphoniques fréquents
- Voyage avec encombrement minimal
- Personnes sensibles au poids des écouteurs

La technologie de réduction de bruit passive associée aux embouts parfaitement ajustés offre une isolation efficace sans la lourdeur d'un système ANC.

Contenu du coffret : Écouteurs Sonic Air, étui de charge compact, câble USB-C court, 3 paires d'embouts (S/M/L), guide rapide.`,
    shortDescription: 'Écouteurs TWS ultra-légers',
    metaTitle: 'HIFUTURE Sonic Air - Écouteurs True Wireless Légers | Monster Phone 974',
    metaDescription: 'HIFUTURE Sonic Air. Ultra-légers 4g, autonomie 20h totale, charge rapide. Blanc, noir ou champagne.',
    urlSlug: 'hifuture-sonic-air-ecouteurs',
    keywords: ['HIFUTURE', 'Sonic Air', 'écouteurs', 'TWS', 'léger'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 20, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 25, images: [] },
      { color: 'Champagne', colorCode: '#D4AF37', ean: '', stock: 15, images: [] }
    ],
    specifications: [
      { label: 'Poids', value: '4g par écouteur' },
      { label: 'Autonomie', value: '5h + 15h boîtier' },
      { label: 'Charge rapide', value: '15min = 2h' },
      { label: 'IPX4', value: 'Résistant à la sueur' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-sonic-air.jpg'],
    status: 'active' as const,
    badges: ['Ultra-léger']
  },

  // HIFUTURE Écouteur Conduction Air Mate
  {
    id: 'hifuture-air-mate-conduction',
    airtableId: 'rec31',
    sku: 'HIF-MATE-CONDUCTION',
    name: 'HIFUTURE Écouteur Conduction Air Mate',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 34.99,
    description: `Les HIFUTURE Air Mate révolutionnent l'écoute sportive avec leur technologie de conduction osseuse qui transmet le son par vibrations à travers les os du crâne, laissant vos oreilles complètement libres. Cette innovation garantit sécurité et confort optimal pendant toutes vos activités sportives.

Caractéristiques principales :
• Technologie de conduction osseuse avancée (7e génération)
• Oreilles 100% libres pour conscience environnementale totale
• Certification IPX5 - Protection contre sueur et pluie
• Structure en titane flexible et ultra-résistante
• Poids plume de 29g pour confort maximal
• Autonomie 8 heures en lecture continue
• Charge rapide magnétique : 10 min = 1,5h d'écoute
• Bluetooth 5.3 avec portée étendue 15m
• Double microphone avec réduction de bruit CVC 8.0
• Vibrations optimisées pour minimiser les chatouillements
• Mode Sport avec amplification des basses
• Mémoire intégrée 32GB pour écoute sans téléphone

La conception open-ear permet d'entendre parfaitement l'environnement (circulation, autres coureurs, instructions) tout en profitant de votre musique. Idéal pour la sécurité lors des activités extérieures.

Technologies exclusives :
- PremiumPitch 2.0+ pour basses profondes
- LeakSlayer pour réduction des fuites sonores
- Dual suspension pour confort longue durée
- Revêtement nano-coating anti-transpiration

Idéal pour :
- Course à pied et trail en sécurité
- Cyclisme urbain et VTT
- Sports d'équipe nécessitant communication
- Natation (mode MP3 étanche)
- Port prolongé sans fatigue auditive

Le tour de cou ergonomique avec mémoire de forme s'adapte parfaitement à toutes les morphologies et reste stable même lors des mouvements les plus intenses.

Contenu du coffret : Écouteurs Air Mate, câble de charge magnétique, bouchons d'oreilles (pour environnements bruyants), pochette sport, guide d'utilisation.`,
    shortDescription: 'Écouteurs conduction osseuse sport',
    metaTitle: 'HIFUTURE Air Mate Conduction - Écouteurs Sport Conduction Osseuse | Monster Phone 974',
    metaDescription: 'HIFUTURE Air Mate. Conduction osseuse, oreilles libres, IPX5, autonomie 8h. Parfait pour le sport.',
    urlSlug: 'hifuture-air-mate-conduction-osseuse',
    keywords: ['HIFUTURE', 'Air Mate', 'conduction osseuse', 'sport', 'écouteurs'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 10, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '', stock: 8, images: [] }
    ],
    specifications: [
      { label: 'Type', value: 'Conduction osseuse' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'Étanchéité', value: 'IPX5' },
      { label: 'Poids', value: '29g' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-air-mate.jpg'],
    status: 'active' as const,
    badges: ['Conduction osseuse', 'Sport']
  },

  // MONSTER Illuminescence LED Touch Light X3 RGB
  {
    id: 'monster-touch-light-x3',
    airtableId: 'rec34',
    sku: 'MON-ILL-TOUCH-X3',
    name: 'MONSTER Illuminescence LED Touch Light X3 RGB',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
    price: 26.99,
    description: "Pack de 3 lampes LED tactiles MONSTER Illuminescence RGB pour créer une ambiance personnalisée. Installation adhésive sans fil pour une flexibilité maximale.",
    shortDescription: 'Pack 3 lampes LED tactiles RGB',
    metaTitle: 'MONSTER LED Touch Light X3 RGB - Pack Lampes Tactiles | Monster Phone 974',
    metaDescription: 'Pack 3 lampes LED tactiles MONSTER RGB. Contrôle tactile, 16 couleurs, télécommande. Installation adhésive.',
    urlSlug: 'monster-led-touch-light-x3-rgb',
    keywords: ['MONSTER', 'touch light', 'LED', 'RGB', 'tactile'],
    variants: [
      { color: 'Pack de 3', colorCode: '#FFFFFF', ean: '', stock: 15, images: [] }
    ],
    specifications: [
      { label: 'Quantité', value: '3 lampes' },
      { label: 'Contrôle', value: 'Tactile + télécommande' },
      { label: 'Couleurs', value: '16 RGB' },
      { label: 'Alimentation', value: 'Piles AAA' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-touch-light-x3.jpg'],
    status: 'active' as const,
    badges: ['Pack', 'Tactile']
  },

  // MONSTER Illuminescence Light Strip 5M Multicolor IPX6
  {
    id: 'monster-light-strip-5m-ipx6',
    airtableId: 'rec35',
    sku: 'MON-ILL-5M-IPX6',
    name: 'MONSTER Illuminescence Light Strip 5M Multicolor IPX6',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
    price: 39.99,
    description: "Bande LED MONSTER Illuminescence 5M étanche IPX6 pour intérieur et extérieur. Résiste aux intempéries pour illuminer terrasse, jardin ou piscine.",
    shortDescription: 'Bande LED 5M étanche IPX6',
    metaTitle: 'MONSTER Light Strip 5M IPX6 - Bande LED Étanche Multicolor | Monster Phone 974',
    metaDescription: 'MONSTER bande LED 5M IPX6. Étanche intérieur/extérieur, multicolore, télécommande. Installation facile.',
    urlSlug: 'monster-light-strip-5m-ipx6',
    keywords: ['MONSTER', 'LED', 'IPX6', 'étanche', 'multicolor'],
    variants: [
      { color: '5m Intérieur/Extérieur', colorCode: '#00FF00', ean: '', stock: 12, images: [] }
    ],
    specifications: [
      { label: 'Longueur', value: '5 mètres' },
      { label: 'Étanchéité', value: 'IPX6' },
      { label: 'LED', value: 'Multicolore RGB' },
      { label: 'Usage', value: 'Intérieur/Extérieur' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-light-strip-ipx6.jpg'],
    status: 'active' as const,
    badges: ['IPX6', 'Extérieur']
  },

  // MUVIT KidPic Appareil Photo Enfant
  {
    id: 'muvit-kidpic-appareil-photo',
    airtableId: 'rec36',
    sku: 'MUAPN000',
    name: 'MUVIT KidPic Appareil Photo Enfant',
    brand: 'MUVIT',
    category: 'High-Tech',
    subcategory: 'Appareils Photo',
    price: 59.99,
    description: "L'appareil photo MUVIT KidPic révolutionne la photographie pour enfants avec sa technologie d'impression instantanée spécialement conçue pour les jeunes créateurs. Cet appareil innovant combine capture d'images numériques et impression immédiate, offrant aux enfants la satisfaction instantanée de voir leurs créations prendre vie.\n\nL'ergonomie pensée pour les petites mains garantit une prise en main parfaite dès 3 ans. Les boutons surdimensionnés et intuitifs permettent une utilisation autonome, encourageant l'exploration visuelle et la créativité. La coque robuste résiste aux chocs et chutes, accompagnant les aventures photographiques sans crainte.\n\nLa fonction d'impression instantanée transforme chaque photo en souvenir tangible. Les enfants découvrent la magie de voir leur image apparaître progressivement sur papier, créant une expérience sensorielle complète. Cette immédiateté renforce l'apprentissage et stimule la créativité continue.\n\nDisponible en bleu et rose, le KidPic s'adapte aux préférences de chaque enfant. Les couleurs vives et le design ludique en font un compagnon attractif qui donne envie d'explorer le monde à travers l'objectif. L'écran LCD intégré permet de visualiser les photos avant impression, développant le sens critique et artistique.\n\nLes fonctionnalités créatives incluent filtres colorés, cadres amusants et autocollants intégrés, transformant chaque photo en œuvre unique. Le mode selfie avec retardateur encourage l'expression personnelle et les photos de groupe entre amis.\n\nParfait pour les familles réunionnaises valorisant l'éveil artistique, cet appareil MUVIT favorise le développement cognitif et créatif. Idéal pour immortaliser sorties scolaires, anniversaires et moments familiaux précieux.\n\nLivré avec rouleaux de papier initial, manuel illustré adapté aux enfants et dragonnes de sécurité. Garantie constructeur 2 ans pour une utilisation sereine. Disponible dans nos boutiques locales avec démonstration possible.",
    shortDescription: 'Appareil photo numérique pour enfants',
    metaTitle: 'MUVIT KidPic - Appareil Photo Numérique Enfant | Monster Phone 974',
    metaDescription: 'MUVIT KidPic appareil photo enfant. Écran 2", vidéo HD, jeux intégrés. Disponible en bleu et rose.',
    urlSlug: 'muvit-kidpic-appareil-photo-enfant',
    keywords: ['MUVIT', 'KidPic', 'appareil photo', 'enfant', 'numérique'],
    variants: [
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 8, images: [] },
      { color: 'Rose', colorCode: '#FF69B4', ean: '', stock: 10, images: [] }
    ],
    specifications: [
      { label: 'Écran', value: '2 pouces' },
      { label: 'Photo', value: '12MP' },
      { label: 'Vidéo', value: 'HD 1080p' },
      { label: 'Mémoire', value: 'Carte SD 32GB incluse' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-kidpic.jpg'],
    status: 'active' as const,
    badges: ['Enfants', 'HD']
  },

  // CASQUE SANS FILS ENFANTS MUVIT
  {
    id: 'muvit-casque-enfant-sans-fil',
    airtableId: 'rec37',
    sku: 'MUV-CASQUE-SANS-FIL',
    name: 'CASQUE SANS FILS ENFANTS MUVIT',
    brand: 'MUVIT',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 39.99,
    description: "Casque sans fil MUVIT pour enfants avec limitation de volume et design fun. Protège l'audition des plus jeunes avec limiteur 85dB intégré.",
    shortDescription: 'Casque Bluetooth enfant avec limiteur',
    metaTitle: 'MUVIT Casque Sans Fil Enfant - Bluetooth Limiteur Volume | Monster Phone 974',
    metaDescription: 'Casque Bluetooth MUVIT enfant. Limiteur 85dB, designs fun animaux, confortable. 5 modèles disponibles.',
    urlSlug: 'muvit-casque-sans-fil-enfant',
    keywords: ['MUVIT', 'casque', 'enfant', 'bluetooth', 'limiteur'],
    variants: [
      { color: 'CHAT', colorCode: '#FFA500', ean: '', stock: 6, images: [] },
      { color: 'LAPIN', colorCode: '#FFB6C1', ean: '', stock: 8, images: [] },
      { color: 'PIKA', colorCode: '#FFFF00', ean: '', stock: 5, images: [] },
      { color: 'LICORNE', colorCode: '#FF69B4', ean: '', stock: 7, images: [] },
      { color: 'DRAGON', colorCode: '#00FF00', ean: '', stock: 4, images: [] }
    ],
    specifications: [
      { label: 'Limiteur', value: '85dB max' },
      { label: 'Autonomie', value: '20 heures' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Pliable', value: 'Oui' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-casque-enfant.jpg'],
    status: 'active' as const,
    badges: ['Enfants', 'Limiteur 85dB']
  },

  // MUVIT Casque Sans Fil Enfant (version alternative)
  {
    id: 'muvit-casque-enfant-bt',
    airtableId: 'rec38',
    sku: 'MUHPH01',
    name: 'MUVIT Casque Sans Fil Enfant',
    brand: 'MUVIT',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 39.99,
    description: "Casque Bluetooth MUVIT pour enfants avec designs animaux et protection auditive. Confort optimal pour les longues sessions d'écoute.",
    shortDescription: 'Casque Bluetooth enfant protection auditive',
    metaTitle: 'MUVIT Casque Bluetooth Enfant - Protection Auditive | Monster Phone 974',
    metaDescription: 'Casque MUVIT enfant Bluetooth. Protection 85dB, designs animaux fun, autonomie 20h. Confort garanti.',
    urlSlug: 'muvit-casque-bluetooth-enfant',
    keywords: ['MUVIT', 'casque', 'enfant', 'bluetooth', 'protection'],
    variants: [
      { color: 'Lapin', colorCode: '#FFB6C1', ean: '', stock: 10, images: [] },
      { color: 'Chat', colorCode: '#FFA500', ean: '', stock: 8, images: [] },
      { color: 'Licorne', colorCode: '#FF69B4', ean: '', stock: 9, images: [] },
      { color: 'Dragon', colorCode: '#00FF00', ean: '', stock: 6, images: [] },
      { color: 'Pika', colorCode: '#FFFF00', ean: '', stock: 7, images: [] }
    ],
    specifications: [
      { label: 'Protection', value: '85dB' },
      { label: 'Âge', value: '3-12 ans' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Micro', value: 'Intégré' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-casque-bt.jpg'],
    status: 'active' as const,
    badges: ['Enfants', '85dB']
  },

  // MONSTER Illuminescence Smart Light Strip RGB+W
  {
    id: 'monster-smart-light-strip-rgbw',
    airtableId: 'rec39',
    sku: 'MON-ILL-SMART-RGBW',
    name: 'MONSTER Illuminescence Smart Light Strip RGB+W',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
    price: 24.99,
    description: "Bande LED intelligente MONSTER RGB+W avec contrôle app et compatibilité assistants vocaux. Contrôlez vos lumières à la voix avec Alexa ou Google Assistant.",
    shortDescription: 'Bande LED smart RGB+W contrôle app',
    metaTitle: 'MONSTER Smart Light Strip RGB+W - Bande LED Connectée | Monster Phone 974',
    metaDescription: 'MONSTER bande LED smart RGB+W. Contrôle app, Alexa/Google, 16M couleurs. 2m, 5m ou sound reactive.',
    urlSlug: 'monster-smart-light-strip-rgbw',
    keywords: ['MONSTER', 'smart', 'LED', 'RGB', 'connectée'],
    variants: [
      { color: '2m', colorCode: '#FF0000', ean: '', stock: 20, images: [] },
      { color: '5m', colorCode: '#00FF00', ean: '', stock: 15, images: [] },
      { color: '5m Sound Reactive', colorCode: '#0000FF', ean: '', stock: 10, images: [] }
    ],
    specifications: [
      { label: 'Contrôle', value: 'App + Voice' },
      { label: 'Couleurs', value: '16 millions' },
      { label: 'Compatible', value: 'Alexa, Google' },
      { label: 'WiFi', value: '2.4GHz' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-smart-light-strip.jpg'],
    status: 'active' as const,
    badges: ['Smart', 'Voice Control']
  },

  // MONSTER N-Lite 206
  {
    id: 'monster-n-lite-206',
    airtableId: 'rec42',
    sku: 'MNLT206',
    name: 'MONSTER N-Lite 206',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 19.99,
    description: "Les écouteurs intra-auriculaires MONSTER N-Lite 206 représentent l'excellence audio accessible, offrant une expérience sonore premium dans un format compact et élégant. Conçus pour les audiophiles exigeants et les utilisateurs quotidiens, ces écouteurs filaires garantissent une qualité sonore constante et fiable sans les contraintes de batterie ou de connexion Bluetooth. La technologie acoustique avancée utilise des drivers dynamiques de 10mm spécialement calibrés pour délivrer un spectre sonore complet et équilibré. Les basses profondes et contrôlées apportent puissance et émotion à votre musique sans masquer les détails. Les médiums naturels préservent la chaleur des voix et l'authenticité des instruments acoustiques. Les aigus cristallins révèlent chaque nuance et texture sonore, des cymbales délicates aux harmoniques subtiles. Le design ergonomique étudié assure un confort optimal même après des heures d'écoute continue. Les embouts en silicone souple de qualité médicale s'adaptent parfaitement au canal auditif, créant un joint acoustique qui isole efficacement du bruit ambiant tout en garantissant un maintien sécurisé. Trois tailles d'embouts incluses permettent une personnalisation parfaite selon votre morphologie. La construction robuste utilise des matériaux premium sélectionnés pour leur durabilité. Le câble renforcé résiste aux enchevêtrements et aux tensions répétées, prolongeant significativement la durée de vie. Les connecteurs plaqués or garantissent une transmission du signal optimale et résistent à la corrosion, même dans l'environnement salin de La Réunion. Disponibles en deux coloris intemporels - Noir classique pour la discrétion professionnelle et Blanc élégant pour un style moderne - ces écouteurs s'adaptent à toutes les occasions. La finition mate anti-traces préserve l'aspect neuf même après usage intensif. La compatibilité universelle via jack 3.5mm assure une connexion immédiate avec smartphones, tablettes, ordinateurs portables, consoles de jeux et systèmes audio. Aucune configuration nécessaire, branchez et profitez instantanément de votre musique. Le microphone intégré avec bouton de contrôle permet de gérer appels et lecture musicale sans sortir votre appareil. Idéaux pour les mélomanes réunionnais recherchant qualité audio supérieure et fiabilité à prix accessible, les MONSTER N-Lite 206 offrent l'héritage sonore MONSTER dans un format pratique pour la vie quotidienne.",
    shortDescription: 'Écouteurs avec son puissant',
    metaTitle: 'MONSTER N-Lite 206 - Écouteurs Intra-Auriculaires',
    metaDescription: 'Écouteurs MONSTER N-Lite 206 intra-auriculaires avec drivers 10mm et isolation passive. Design ergonomique, câble renforcé, compatibilité universelle. Noir ou blanc disponibles La Réunion 974.',
    urlSlug: 'monster-n-lite-206-ecouteurs',
    keywords: ['MONSTER', 'N-Lite', '206', 'écouteurs'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '5010016634871', stock: 12, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '5010016634888', stock: 15, images: [] }
    ],
    specifications: [
      { label: 'Driver', value: '10mm' },
      { label: 'Impédance', value: '32Ω' },
      { label: 'Câble', value: '1.2m' },
      { label: 'Jack', value: '3.5mm' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-n-lite-206.jpg'],
    status: 'active' as const,
    badges: ['Premium']
  },

  // HIFUTURE Enceinte Ascendo
  {
    id: 'hifuture-ascendo',
    airtableId: 'rec43',
    sku: 'HIF-ASCENDO',
    name: 'HIFUTURE Enceinte Ascendo',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 54.99,
    description: "Enceinte HIFUTURE Ascendo Rose alliant élégance féminine et performance audio. Design rose sophistiqué qui embellit votre intérieur moderne. Son premium avec technologie acoustique optimisée pour clarté exceptionnelle. Autonomie longue durée pour profiter de votre musique sans interruption. Connectivité Bluetooth stable pour streaming sans fil depuis tous vos appareils. Construction robuste avec finition soignée dans les moindres détails. Idéale pour créer une ambiance musicale raffinée. L'enceinte design parfaite pour intérieurs élégants à La Réunion.",
    shortDescription: 'Enceinte Bluetooth basses profondes',
    metaTitle: 'HIFUTURE Ascendo - Enceinte Bluetooth Compacte | Monster Phone 974',
    metaDescription: 'HIFUTURE Ascendo. Basses profondes, 12h autonomie, IPX5. Disponible en 3 couleurs.',
    urlSlug: 'hifuture-enceinte-ascendo',
    keywords: ['HIFUTURE', 'Ascendo', 'enceinte', 'bluetooth', 'basses'],
    variants: [
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 10, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 12, images: [] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '', stock: 8, images: [] }
    ],
    specifications: [
      { label: 'Puissance', value: '15W' },
      { label: 'Autonomie', value: '12 heures' },
      { label: 'Étanchéité', value: 'IPX5' },
      { label: 'Bluetooth', value: '5.0' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-ascendo.jpg'],
    status: 'active' as const,
    badges: ['Basses+', 'IPX5']
  },

  // MONSTER Mission 100
  {
    id: 'monster-mission-100',
    airtableId: 'rec44',
    sku: 'MONSTER-MISSION-100',
    name: 'MONSTER Mission 100',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 59.99,
    description: "Le casque MONSTER Mission 100 incarne la nouvelle génération d'accessoires audio conçus pour les passionnés exigeants. Cette référence accessible de la gamme MONSTER combine ingénierie acoustique avancée et design contemporain pour offrir une expérience sonore immersive adaptée à tous les usages : musique, films, jeux vidéo et communication. La signature sonore MONSTER se caractérise par une restitution audio précise et dynamique. Les drivers de 40mm haute performance délivrent une réponse en fréquence étendue de 20Hz à 20kHz, couvrant l'intégralité du spectre audible humain. Les basses puissantes et contrôlées créent une fondation solide sans empiéter sur les autres fréquences. Les médiums détaillés préservent la clarté des dialogues et l'authenticité des instruments. Les aigus nets révèlent les subtilités sonores souvent perdues avec des casques standards. Le confort étudié permet des sessions prolongées sans fatigue. Les coussinets circumauraux en mousse à mémoire de forme enveloppent délicatement les oreilles, distribuant uniformément la pression et créant une isolation acoustique passive efficace. Le bandeau rembourré ajustable s'adapte à toutes les morphologies, tandis que l'arceau flexible mais résistant garantit durabilité sans compression excessive. L'architecture acoustique semi-ouverte offre le meilleur des deux mondes : l'isolation nécessaire pour une écoute concentrée et la spatialisation naturelle pour une scène sonore élargie. Cette conception optimise particulièrement l'expérience multimédia, permettant de localiser précisément les sources sonores dans l'espace virtuel. Deux finitions élégantes répondent à tous les styles : le Blanc immaculé apporte une touche de modernité lumineuse, parfait pour les setups épurés, tandis que le Noir mat intemporel s'intègre discrètement dans tout environnement. La qualité de finition et les détails soignés reflètent l'attention portée à chaque aspect du produit. La connectivité jack 3.5mm universelle garantit compatibilité maximale avec tous vos appareils : smartphones, tablettes, consoles de jeux, ordinateurs et interfaces audio. Le câble détachable de 1,5 mètre offre liberté de mouvement tout en permettant un remplacement facile en cas d'usure. L'adaptateur 6.35mm inclus étend la compatibilité aux équipements audio professionnels. Parfait pour les utilisateurs réunionnais recherchant un casque polyvalent offrant qualité audio supérieure et confort longue durée à prix accessible, le MONSTER Mission 100 représente l'entrée idéale dans l'univers audio MONSTER.",
    shortDescription: 'Casque gaming surround avec micro',
    metaTitle: 'MONSTER Mission 100 - Casque Gaming Abordable',
    metaDescription: 'Casque MONSTER Mission 100 avec drivers 40mm et confort optimisé. Design élégant, compatible tous appareils, isolation passive. Blanc ou noir disponibles La Réunion 974.',
    urlSlug: 'monster-mission-100-casque-gaming',
    keywords: ['MONSTER', 'Mission 100', 'gaming', 'casque', 'surround'],
    variants: [
      { color: 'Storm Gray', colorCode: '#708090', ean: '', stock: 6, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 8, images: [] },
      { color: 'Crème', colorCode: '#FFFDD0', ean: '', stock: 4, images: [] }
    ],
    specifications: [
      { label: 'Son', value: 'Surround 7.1' },
      { label: 'Driver', value: '50mm' },
      { label: 'Micro', value: 'Détachable' },
      { label: 'RGB', value: 'Oui' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-mission-100.jpg'],
    status: 'active' as const,
    badges: ['Gaming', '7.1 Surround']
  },

  // MY WAY Powerbank
  {
    id: 'myway-powerbank',
    airtableId: 'rec46',
    sku: 'MYWPB',
    name: 'MY WAY Powerbank',
    brand: 'MY WAY',
    category: 'Accessoires',
    subcategory: 'Chargeur & Batteries',
    price: 32.99,
    description: "La powerbank MY WAY redéfinit l'autonomie mobile avec ses capacités exceptionnelles de 10000mAh et 20000mAh. Cette batterie externe haute performance répond aux besoins énergétiques les plus exigeants des utilisateurs modernes, garantissant une alimentation fiable pour tous vos appareils.\n\nLa version 10000mAh offre jusqu'à 3 charges complètes pour un smartphone standard, idéale pour une journée intensive ou un court déplacement. Le modèle 20000mAh double cette capacité, permettant jusqu'à 6 charges complètes ou l'alimentation simultanée de plusieurs appareils pendant plusieurs jours.\n\nL'architecture multi-ports révolutionne l'usage : deux ports USB-A et un port USB-C permettent de charger simultanément trois appareils. La technologie de charge rapide 18W via USB-C réduit drastiquement les temps de charge, restaurant 50% de batterie en seulement 30 minutes sur les appareils compatibles.\n\nL'indicateur LED intelligent affiche précisément le niveau de charge restant, éliminant l'incertitude sur l'autonomie disponible. Le système de protection multiple intégré surveille en permanence température, voltage et courant, garantissant une sécurité absolue pour vos appareils premium.\n\nLe design compact optimisé facilite le transport malgré la haute capacité. La surface texturée antidérapante assure une prise en main sécurisée, tandis que la construction robuste résiste aux chocs et vibrations du quotidien.\n\nParfaitement adaptée au climat tropical de La Réunion, cette powerbank MY WAY maintient ses performances même en conditions de chaleur élevée. Indispensable pour les professionnels mobiles, voyageurs et amateurs d'activités outdoor, elle garantit une connectivité permanente.\n\nLa compatibilité universelle couvre smartphones, tablettes, écouteurs, montres connectées, appareils photo et même certains ordinateurs portables USB-C. Livrée avec câbles de charge et manuel détaillé, garantie 2 ans pour une tranquillité totale.",
    shortDescription: 'Powerbank haute capacité charge rapide',
    metaTitle: 'MY WAY Powerbank - Batterie Externe Haute Capacité | Monster Phone 974',
    metaDescription: 'MY WAY Powerbank. 10000, 20000 ou 30000mAh. Charge rapide, multi-ports, LED indicateur.',
    urlSlug: 'myway-powerbank-batterie-externe',
    keywords: ['MY WAY', 'powerbank', 'batterie externe', 'charge rapide'],
    variants: [
      { color: '10000mAh', colorCode: '#333333', ean: '', stock: 20, images: [] },
      { color: '20000mAh', colorCode: '#666666', ean: '', stock: 15, images: [] },
      { color: '30000mAh', colorCode: '#999999', ean: '', stock: 10, images: [] }
    ],
    specifications: [
      { label: 'Ports', value: '2 USB-A + 1 USB-C' },
      { label: 'Charge rapide', value: '18W PD' },
      { label: 'LED', value: 'Indicateur 4 niveaux' },
      { label: 'Protection', value: 'Multi-protection' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/myway-powerbank.jpg'],
    status: 'active' as const,
    badges: ['Charge Rapide', 'Multi-ports']
  },

  // MONSTER Illuminescence DUO Monitor Light
  {
    id: 'monster-duo-monitor-light',
    airtableId: 'rec47',
    sku: 'MON-ILL-DUO-MONITOR',
    name: 'MONSTER Illuminescence DUO Monitor Light',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
    price: 49.99,
    description: "Lampe d'écran MONSTER DUO pour double moniteur avec éclairage RGB personnalisable. Réduit la fatigue oculaire lors de longues sessions gaming.",
    shortDescription: 'Lampe double écran RGB',
    metaTitle: 'MONSTER DUO Monitor Light - Lampe Double Écran RGB | Monster Phone 974',
    metaDescription: 'MONSTER DUO Monitor Light. Éclairage RGB double écran, réglable, USB. Parfait pour setup gaming.',
    urlSlug: 'monster-duo-monitor-light-rgb',
    keywords: ['MONSTER', 'monitor light', 'RGB', 'double écran', 'gaming'],
    variants: [
      { color: 'Dual Monitor RGB', colorCode: '#FF00FF', ean: '', stock: 8, images: [] }
    ],
    specifications: [
      { label: 'Compatibilité', value: 'Double écran' },
      { label: 'Éclairage', value: 'RGB personnalisable' },
      { label: 'Alimentation', value: 'USB' },
      { label: 'Réglable', value: 'Angle et intensité' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-duo-monitor-light.jpg'],
    status: 'active' as const,
    badges: ['Double Écran', 'RGB']
  },

  // MONSTER Element Air
  {
    id: 'monster-element-air',
    airtableId: 'rec48',
    sku: 'MONSTER-ELEMENT-AIR',
    name: 'MONSTER Element Air',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 199.99,
    description: "Casque MONSTER Element Air haut de gamme avec technologie sans fil avancée. Audio haute résolution pour qualité sonore exceptionnelle. Design ultra-léger pour confort maximal durant longues sessions. Autonomie exceptionnelle permettant usage intensif sans contrainte. Le casque sans fil premium pour mélomanes exigeants à La Réunion.",
    shortDescription: 'Casque sans fil haut de gamme',
    metaTitle: 'MONSTER Element Air - Casque Sans Fil Haut de Gamme',
    metaDescription: 'Casque MONSTER Element Air avec technologie sans fil premium. Audio haute résolution, léger, autonomie longue durée.',
    urlSlug: 'monster-element-air-casque-sans-fil',
    keywords: ['MONSTER', 'Element Air', 'TWS', 'écouteurs', 'true wireless'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 18, images: [] },
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 14, images: [] }
    ],
    specifications: [
      { label: 'Autonomie', value: '6h + 18h boîtier' },
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Charge', value: 'USB-C rapide' },
      { label: 'IPX4', value: 'Résistant à l\'eau' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-element-air.jpg'],
    status: 'active' as const,
    badges: ['TWS', 'IPX4']
  },

  // MONSTER ENCEINTE PARTY
  {
    id: 'monster-enceinte-party',
    airtableId: 'rec49',
    sku: 'MONSTER-ENCEINTE-PARTY',
    name: 'MONSTER ENCEINTE PARTY',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 179.99,
    description: "Enceinte de fête MONSTER PARTY avec système audio ultra-puissant pour événements. Éclairage LED multicolore intégré pour ambiance festive garantie. Performance sonore exceptionnelle pour animer grandes réceptions. Construction robuste conçue pour usage intensif et transport fréquent. Disponible en version standard et améliorée selon vos besoins. L'enceinte parfaite pour DJs et animateurs à La Réunion.",
    shortDescription: 'Enceinte party puissante avec LED',
    metaTitle: 'MONSTER ENCEINTE PARTY - Système Audio Fête | Monster Phone 974',
    metaDescription: 'Enceinte MONSTER PARTY avec éclairage LED. 2 versions disponibles. Monster Phone 974.',
    urlSlug: 'monster-enceinte-party-systeme-audio',
    keywords: ['MONSTER', 'enceinte', 'party', 'soirée', 'LED'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 5, images: [] }
    ],
    specifications: [
      { label: 'Puissance', value: '60W' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'LED', value: 'Synchronisées musique' },
      { label: 'Extras', value: 'Micro karaoké inclus' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-enceinte-party.jpg'],
    status: 'active' as const,
    badges: ['Party', 'Karaoké']
  },

  // HIFUTURE Écouteur Yacht
  {
    id: 'hifuture-yacht',
    airtableId: 'rec50',
    sku: 'HIFUTURE-YACHT',
    name: 'HIFUTURE Écouteur Yacht',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 59.99,
    description: "Écouteurs HIFUTURE Yacht incarnant le luxe audio moderne. Design sophistiqué avec finitions premium exceptionnelles. Disponible en black classique, rose féminin ou black gold exclusif. Performance audio exceptionnelle avec technologie acoustique avancée. Bluetooth 5.3 et résistance IPX5 pour usage sans contrainte. Confort suprême avec matériaux nobles et ergonomie étudiée. Boîtier de charge élégant complétant l'expérience luxueuse. Les écouteurs premium pour mélomanes exigeants de La Réunion.",
    shortDescription: 'Écouteurs TWS premium luxe',
    metaTitle: 'HIFUTURE Yacht - Écouteurs True Wireless Premium | Monster Phone 974',
    metaDescription: 'HIFUTURE Yacht. Design luxe, son Hi-Fi, ANC, autonomie 30h. Noir ou blanc. Premium quality.',
    urlSlug: 'hifuture-yacht-ecouteurs-premium',
    keywords: ['HIFUTURE', 'Yacht', 'premium', 'TWS', 'luxe'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 6, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 5, images: [] }
    ],
    specifications: [
      { label: 'ANC', value: 'Actif -30dB' },
      { label: 'Driver', value: '12mm graphène' },
      { label: 'Autonomie', value: '8h + 22h boîtier' },
      { label: 'Codec', value: 'aptX, AAC' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-yacht.jpg'],
    status: 'active' as const,
    badges: ['Premium', 'ANC', 'Hi-Fi']
  },

  // MONSTER Illuminescence Smart Prism II RGB+IC
  {
    id: 'monster-smart-prism-ii',
    airtableId: 'rec52',
    sku: 'MON-ILL-PRISM',
    name: 'MONSTER Illuminescence Smart Prism II RGB+IC',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Projecteurs',
    price: 64.99,
    description: "Pack 6 panneaux LED MONSTER Smart Prism II RGB+IC avec effets flow et contrôle app. Créez des motifs lumineux uniques et personnalisés.",
    shortDescription: 'Pack 6 panneaux LED RGB+IC flow',
    metaTitle: 'MONSTER Smart Prism II RGB+IC - Pack 6 Panneaux LED | Monster Phone 974',
    metaDescription: 'MONSTER Smart Prism II. Pack 6 panneaux LED RGB+IC, effets flow, contrôle app, modulaire.',
    urlSlug: 'monster-smart-prism-ii-rgb-ic',
    keywords: ['MONSTER', 'prism', 'LED', 'RGB', 'IC', 'flow'],
    variants: [
      { color: 'Pack X6 RGB+IC Flow', colorCode: '#FF00FF', ean: '', stock: 6, images: [] }
    ],
    specifications: [
      { label: 'Quantité', value: '6 panneaux' },
      { label: 'Type', value: 'RGB+IC' },
      { label: 'Effets', value: 'Flow dynamique' },
      { label: 'Contrôle', value: 'App + Voice' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-smart-prism-ii.jpg'],
    status: 'active' as const,
    badges: ['Modulaire', 'IC Flow']
  },

  // HIFUTURE PartyBox Vocalist 300
  {
    id: 'hifuture-vocalist-300',
    airtableId: 'rec57',
    sku: 'HIF-VOCALIST-300',
    name: 'HIFUTURE PartyBox Vocalist 300',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 269.99,
    description: "HIFUTURE PartyBox Vocalist 300 système audio professionnel avec fonction karaoké intégrée. Puissance impressionnante de 300W pour performances vocales exceptionnelles. Microphones professionnels inclus pour karaoké et animations. Effets vocaux et mixage pour expérience complète. Idéale pour karaokés, événements et établissements à La Réunion.",
    shortDescription: 'Enceinte karaoké 2 micros sans fil',
    metaTitle: 'HIFUTURE Vocalist 300 - Système Audio Karaoké Pro | Monster Phone 974',
    metaDescription: 'PartyBox HIFUTURE Vocalist 300 avec karaoké professionnel. 300W, microphones inclus. 269,99€.',
    urlSlug: 'hifuture-vocalist-300-karaoke',
    keywords: ['HIFUTURE', 'Vocalist', 'karaoké', 'micro', 'party'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 3, images: [] }
    ],
    specifications: [
      { label: 'Puissance', value: '150W' },
      { label: 'Micros', value: '2 sans fil inclus' },
      { label: 'Effets', value: 'Echo, reverb, pitch' },
      { label: 'Autonomie', value: '6 heures' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-vocalist-300.jpg'],
    status: 'active' as const,
    badges: ['Karaoké Pro', '2 Micros']
  },

  // MONSTER Illuminescence Basic Ampoule A19
  {
    id: 'monster-ampoule-a19',
    airtableId: 'rec59',
    sku: 'MON-ILL-AMPOULE-A19',
    name: 'MONSTER Illuminescence Basic Ampoule A19',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Ampoules connectées',
    price: 12.99,
    description: "Ampoule LED MONSTER A19 avec température de couleur réglable pour éclairage optimal. 25000 heures de durée de vie pour des économies durables.",
    shortDescription: 'Ampoule LED A19 température réglable',
    metaTitle: 'MONSTER Ampoule A19 - LED Température Réglable | Monster Phone 974',
    metaDescription: 'MONSTER Ampoule LED A19. 3 températures couleur, 800 lumens, économie énergie. E27 standard.',
    urlSlug: 'monster-ampoule-led-a19',
    keywords: ['MONSTER', 'ampoule', 'LED', 'A19', 'température couleur'],
    variants: [
      { color: 'Warm White 3000K', colorCode: '#FFE4B5', ean: '', stock: 25, images: [] },
      { color: 'Cool White 5000K', colorCode: '#F0F8FF', ean: '', stock: 20, images: [] },
      { color: 'Daylight 6500K', colorCode: '#FFFFFF', ean: '', stock: 22, images: [] }
    ],
    specifications: [
      { label: 'Puissance', value: '9W (60W équiv)' },
      { label: 'Lumens', value: '800lm' },
      { label: 'Culot', value: 'E27' },
      { label: 'Durée vie', value: '25000h' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-ampoule-a19.jpg'],
    status: 'active' as const,
    badges: ['Économie', 'Longue durée']
  },

  // HIFUTURE Écouteur Flybuds 4 ANC
  {
    id: 'hifuture-flybuds-4-anc',
    airtableId: 'rec62',
    sku: 'HIF-FLYBUDS-4-ANC',
    name: 'HIFUTURE Écouteur Flybuds 4 ANC',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 44.99,
    description: "Expérience audio premium avec les écouteurs HIFUTURE Flybuds 4 ANC. Réduction active du bruit avancée pour immersion totale dans votre musique. Bluetooth 5.3 dernière génération pour connexion ultra-stable et économie d'énergie. Design premium disponible en noir classique, rose chaud féminin ou beige élégant. Résistance IPX4 pour usage quotidien sans souci même sous la pluie. Commandes tactiles intuitives pour contrôle facile sans sortir le téléphone. Boîtier de charge compact offrant plusieurs recharges complètes. Les écouteurs ANC accessibles aux mélomanes exigeants de La Réunion.",
    shortDescription: 'Écouteurs TWS ANC avancé',
    metaTitle: 'HIFUTURE Flybuds 4 ANC - Écouteurs Réduction Bruit | Monster Phone 974',
    metaDescription: 'HIFUTURE Flybuds 4 ANC. Réduction bruit -35dB, autonomie 32h, charge sans fil. Premium TWS.',
    urlSlug: 'hifuture-flybuds-4-anc',
    keywords: ['HIFUTURE', 'Flybuds', 'ANC', 'TWS', 'réduction bruit'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 10, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 8, images: [] }
    ],
    specifications: [
      { label: 'ANC', value: '-35dB' },
      { label: 'Autonomie', value: '8h + 24h boîtier' },
      { label: 'Charge sans fil', value: 'Qi compatible' },
      { label: 'Bluetooth', value: '5.3' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-flybuds-4-anc.jpg'],
    status: 'active' as const,
    badges: ['ANC Pro', 'Charge sans fil']
  },

  // HIFUTURE Écouteur Filaire Hi5
  {
    id: 'hifuture-hi5-filaire',
    airtableId: 'rec63',
    sku: 'HIFUTURE-HI5-FILAIRE',
    name: 'HIFUTURE Écouteur Filaire Hi5',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques & Écouteurs',
    price: 19.99,
    description: `Les écouteurs filaires HIFUTURE Hi5 offrent une qualité audio exceptionnelle sans compromis, combinant la fiabilité d'une connexion filaire avec des technologies acoustiques avancées. Le câble anti-enchevêtrement et le micro intégré en font le compagnon idéal pour un usage quotidien intensif.

Caractéristiques principales :
• Drivers dynamiques 10mm haute définition
• Réponse en fréquence étendue 20Hz-20kHz
• Impédance optimisée 32Ω pour tous appareils
• Sensibilité élevée 105dB pour volume puissant
• Câble TPE anti-enchevêtrement 1.2m renforcé
• Connecteur Jack 3.5mm plaqué or anti-corrosion
• Microphone intégré avec bouton multifonction
• Télécommande 3 boutons (Play/Pause, Volume +/-)
• Embouts ergonomiques en silicone premium
• Design intra-auriculaire avec isolation passive
• Compatible tous appareils avec jack 3.5mm
• Aucune latence - Parfait pour gaming et vidéos

La technologie de chambre acoustique optimisée offre des basses profondes et percutantes tout en préservant la clarté des médiums et la brillance des aigus. Le design acoustique semi-ouvert évite la fatigue auditive.

Avantages du filaire :
- Zéro latence pour gaming et vidéos
- Pas de batterie à recharger
- Qualité audio non compressée
- Compatibilité universelle
- Prix accessible pour qualité premium

Idéal pour :
- Écoute musicale haute fidélité
- Appels téléphoniques clairs
- Gaming mobile sans latence
- Visionnage vidéo synchronisé
- Usage professionnel quotidien

Le câble renforcé avec gaine TPE résiste aux torsions et aux tiraillements. Les connecteurs renforcés garantissent une durabilité exceptionnelle même en usage intensif.

Contenu du coffret : Écouteurs Hi5, 3 paires d'embouts (S/M/L), clip de câble, pochette de transport, guide d'utilisation.`,
    shortDescription: 'Écouteurs filaires haute qualité',
    metaTitle: 'HIFUTURE Hi5 Filaire - Écouteurs Jack 3.5mm | Monster Phone 974',
    metaDescription: 'HIFUTURE Hi5 filaire. Son HD, micro intégré, confort optimal. Compatible tous appareils 3.5mm.',
    urlSlug: 'hifuture-hi5-ecouteurs-filaires',
    keywords: ['HIFUTURE', 'Hi5', 'filaire', 'écouteurs', 'jack'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 30, images: [] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 25, images: [] }
    ],
    specifications: [
      { label: 'Driver', value: '10mm' },
      { label: 'Jack', value: '3.5mm' },
      { label: 'Câble', value: '1.2m anti-nœud' },
      { label: 'Micro', value: 'Intégré avec bouton' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-hi5-filaire.jpg'],
    status: 'active' as const,
    badges: ['Hi-Fi', 'Micro']
  },

  // MUVIT KidPic Rouleaux Papier Photo
  {
    id: 'muvit-kidpic-rouleaux',
    airtableId: 'rec64',
    sku: 'MUAPN001',
    name: 'MUVIT KidPic Rouleaux Papier Photo',
    brand: 'MUVIT',
    category: 'Créativité',
    subcategory: 'Appareils Photo',
    price: 19.99,
    description: "Les rouleaux de papier photo MUVIT KidPic constituent l'accessoire indispensable pour votre imprimante instantanée pour enfants. Ce pack généreux de 6 rouleaux de papier thermique haute qualité garantit des heures d'impression créative et de plaisir pour les jeunes photographes. Chaque rouleau est spécialement conçu pour l'imprimante KidPic, offrant une compatibilité parfaite et des résultats d'impression optimaux à chaque utilisation. Le papier thermique premium assure des impressions nettes et durables, avec des couleurs vives et des détails précis qui donnent vie aux souvenirs capturés par vos enfants. Format pratique de carte de crédit (53 x 86 mm), idéal pour créer des mini-albums, décorer des cahiers ou partager des photos avec les amis. La technologie d'impression thermique élimine le besoin d'encre ou de cartouches, rendant l'utilisation simple, propre et économique pour les parents. Installation facile et rapide des rouleaux dans l'imprimante, permettant aux enfants de recharger eux-mêmes leur appareil en toute autonomie. Papier résistant aux taches et à l'eau, garantissant la longévité des souvenirs imprimés et leur conservation dans le temps. Pack économique de 6 rouleaux offrant un excellent rapport qualité-prix pour des sessions d'impression prolongées.",
    shortDescription: 'Pack 3 rouleaux papier photo KidPic',
    metaTitle: 'MUVIT KidPic Rouleaux - Papier Photo Recharge | Monster Phone 974',
    metaDescription: 'MUVIT KidPic rouleaux papier photo. Pack 3 rouleaux, impression instantanée. Compatible KidPic.',
    urlSlug: 'muvit-kidpic-rouleaux-papier',
    keywords: ['MUVIT', 'KidPic', 'papier photo', 'rouleaux', 'recharge'],
    variants: [
      { color: 'Pack de 3 rouleaux', colorCode: '#FFFFFF', ean: '', stock: 20, images: [] }
    ],
    specifications: [
      { label: 'Quantité', value: '3 rouleaux' },
      { label: 'Photos/rouleau', value: '50 photos' },
      { label: 'Format', value: '5x7.5cm' },
      { label: 'Compatible', value: 'MUVIT KidPic' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-kidpic-rouleaux.jpg'],
    status: 'active' as const,
    badges: ['Recharge', 'Pack Éco']
  },

  // MONSTER Illuminescence Smart Beam + 2X Bars Kit
  {
    id: 'monster-smart-beam-bars-kit',
    airtableId: 'rec65',
    sku: 'MON-ILL-BEAM-BARS',
    name: 'MONSTER Illuminescence Smart Beam + 2X Bars Kit',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
    price: 79.99,
    description: "Kit complet MONSTER Smart Beam avec 2 barres LED pour éclairage gaming immersif. Synchronisation avec musique et jeux pour une expérience totale.",
    shortDescription: 'Kit éclairage gaming beam + 2 barres',
    metaTitle: 'MONSTER Smart Beam + Bars Kit - Éclairage Gaming RGB | Monster Phone 974',
    metaDescription: 'MONSTER Smart Beam kit. Beam central + 2 barres LED, RGB sync, contrôle app. Setup gaming ultime.',
    urlSlug: 'monster-smart-beam-bars-kit',
    keywords: ['MONSTER', 'smart beam', 'bars', 'kit', 'gaming', 'RGB'],
    variants: [
      { color: 'RGB Kit Complet', colorCode: '#FF00FF', ean: '', stock: 5, images: [] }
    ],
    specifications: [
      { label: 'Contenu', value: '1 beam + 2 barres' },
      { label: 'RGB', value: '16M couleurs' },
      { label: 'Sync', value: 'Musique et jeux' },
      { label: 'Contrôle', value: 'App + PC software' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-smart-beam-bars-kit.jpg'],
    status: 'active' as const,
    badges: ['Kit Gaming', 'RGB Sync']
  },
  {
    id: 'monster-hdmi-essential-4k',
    airtableId: 'recpoVzuFWFjjsDOD',
    sku: 'MCB-HDMI-PHS',
    name: 'MONSTER CABLE HDMI ESSENTIAL 4K',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles & Connecteurs',
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    promo: 'PROMO',
    description: "Le câble MONSTER HDMI Essential 4K représente la référence absolue pour votre installation home cinéma et gaming. Certifié Premium High Speed, ce câble délivre une performance exceptionnelle avec prise en charge native de la résolution 4K à 60Hz, garantissant une fluidité parfaite pour films et jeux vidéo.\n\nLa technologie HDR (High Dynamic Range) compatible offre une palette de couleurs étendue et des contrastes saisissants, transformant votre expérience visuelle. Avec une bande passante impressionnante de 18 Gbps, ce câble transmet sans compression les flux vidéo les plus exigeants, incluant Dolby Vision et HDR10+.\n\nL'Ethernet intégré permet le partage de connexion internet entre appareils compatibles, éliminant le besoin de câbles réseau supplémentaires. Cette fonctionnalité est particulièrement appréciée pour les Smart TV et consoles de jeux nécessitant une connexion stable.\n\nDisponible en deux longueurs optimisées (1m80 et 3m60), ce câble s'adapte parfaitement à toutes les configurations d'installation. Les connecteurs plaqués or 24 carats garantissent une transmission sans perte et une résistance exceptionnelle à la corrosion, même dans le climat tropical de La Réunion.\n\nLa construction robuste avec blindage triple couche élimine les interférences électromagnétiques, assurant un signal pur et stable. Compatible avec tous les appareils HDMI : TV 4K/8K, consoles PlayStation et Xbox, lecteurs Blu-ray, box TV, projecteurs et systèmes audio home cinéma.\n\nBénéficiez de la garantie MONSTER de 3 ans, témoignage de la qualité et durabilité exceptionnelles de ce câble premium. Support technique local disponible à La Réunion pour accompagner votre installation.",
    shortDescription: 'Câble HDMI Premium High Speed 4K@60Hz avec HDR et Ethernet intégré',
    metaTitle: 'MONSTER CABLE HDMI ESSENTIAL 4K - Premium High Speed | Monster Phone 974',
    metaDescription: 'Câble MONSTER HDMI Essential 4K Premium High Speed, résolution 4K@60Hz, HDR compatible, Ethernet intégré, 18 Gbps. Disponible 1m80 et 3m60. Livraison La Réunion 974.',
    urlSlug: 'monster-cable-hdmi-essential-4k',
    keywords: ['MONSTER HDMI', 'câble 4K', 'Premium High Speed', 'HDR', 'Ethernet', 'home cinéma', 'gaming'],
    ean: '',
    stock: 25,
    stockStatus: 'in_stock' as const,
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    reviews: 142,
    specifications: [
      { label: 'Type', value: 'HDMI Premium High Speed' },
      { label: 'Résolution', value: '4K@60Hz' },
      { label: 'HDR', value: 'Compatible (HDR10, Dolby Vision)' },
      { label: 'Ethernet', value: 'Intégré' },
      { label: 'Bande passante', value: '18 Gbps' },
      { label: 'Connecteurs', value: 'HDMI Type A mâle/mâle' },
      { label: 'Plaquage', value: 'Or 24 carats' },
      { label: 'Audio', value: 'Jusqu\'à 32 canaux' },
      { label: 'CEC', value: 'Compatible' },
      { label: 'ARC/eARC', value: 'Supporté' },
      { label: 'Blindage', value: 'Triple couche' },
      { label: 'Certification', value: 'Premium High Speed' }
    ],
    variants: [
      { id: 'hdmi-essential-180', name: '1m80', color: '1m80', price: 24.99, stock: 15, sku: 'MCB-HDMI-PHS-180' },
      { id: 'hdmi-essential-360', name: '3m60', color: '3m60', price: 34.99, stock: 10, sku: 'MCB-HDMI-PHS-360' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-hdmi-essential-4k.jpg'],
    status: 'active' as const,
    badges: ['4K HDR', 'Premium']
  },
  {
    id: 'monster-hdmi-standard',
    airtableId: 'recu7CfPNRVDn4nKe',
    sku: 'MCB-HDMI-STD',
    name: 'MONSTER Câble HDMI Standard',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles & Connecteurs',
    price: 12.99,
    originalPrice: 19.99,
    discount: 35,
    promo: 'PROMO',
    description: "Le câble MONSTER HDMI Standard offre une solution fiable et abordable pour tous vos besoins de connexion multimédia. Conçu pour délivrer une qualité d'image Full HD 1080p cristalline, ce câble est l'accessoire indispensable pour profiter pleinement de vos contenus préférés.\n\nAvec ses connecteurs HDMI Type A universels, ce câble garantit une compatibilité totale avec l'ensemble de vos appareils : téléviseurs, consoles de jeux, lecteurs DVD/Blu-ray, décodeurs TV et ordinateurs. La transmission numérique pure préserve l'intégrité du signal pour une image nette et un son parfait.\n\nDisponible en quatre longueurs pratiques (1.5m, 2m, 3m et 5m), ce câble s'adapte à toutes les configurations d'installation. Que vous connectiez votre console de jeu proche de la TV ou un projecteur au plafond, nous avons la longueur idéale pour votre setup.\n\nLa construction robuste MONSTER assure une durabilité exceptionnelle. Les connecteurs renforcés résistent aux manipulations fréquentes, tandis que le câble flexible facilite l'installation même dans les espaces restreints. Le blindage efficace protège contre les interférences pour un signal stable.\n\nCe câble supporte l'audio multicanal pour une expérience sonore immersive, transmettant jusqu'à 8 canaux audio non compressés. Compatible avec les formats Dolby Digital et DTS, il transforme votre salon en véritable salle de cinéma.\n\nBénéficiez de la garantie MONSTER de 2 ans et du support technique local à La Réunion. Un excellent rapport qualité-prix pour équiper tous vos appareils avec la fiabilité légendaire MONSTER. Disponible immédiatement dans nos boutiques réunionnaises.",
    shortDescription: 'Câble HDMI Standard 1080p Full HD disponible en 4 longueurs',
    metaTitle: 'MONSTER Câble HDMI Standard - Full HD 1080p | Monster Phone 974',
    metaDescription: 'Câble MONSTER HDMI Standard, résolution 1080p Full HD, connecteurs Type A universels. Disponible en 1.5m, 2m, 3m et 5m. Garantie 2 ans. Livraison La Réunion 974.',
    urlSlug: 'monster-cable-hdmi-standard',
    keywords: ['MONSTER HDMI', 'câble 1080p', 'Full HD', 'HDMI Standard', 'multimédia', 'connexion TV'],
    ean: '',
    stock: 45,
    stockStatus: 'in_stock' as const,
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    reviews: 89,
    specifications: [
      { label: 'Type', value: 'HDMI Standard' },
      { label: 'Résolution', value: '1080p Full HD' },
      { label: 'Connecteurs', value: 'HDMI Type A' },
      { label: 'Audio', value: 'Jusqu\'à 8 canaux' },
      { label: 'Certification', value: 'HDMI Standard' },
      { label: 'Débit', value: '4.95 Gbps' },
      { label: 'Fréquence', value: '165 MHz' },
      { label: 'Blindage', value: 'Double couche' },
      { label: 'Conducteurs', value: 'Cuivre haute pureté' }
    ],
    variants: [
      { id: 'hdmi-std-150', name: '1.5m', color: '1.5m', price: 12.99, stock: 15, sku: 'MCB-HDMI-STD-150' },
      { id: 'hdmi-std-200', name: '2m', color: '2m', price: 14.99, stock: 12, sku: 'MCB-HDMI-STD-200' },
      { id: 'hdmi-std-300', name: '3m', color: '3m', price: 17.99, stock: 10, sku: 'MCB-HDMI-STD-300' },
      { id: 'hdmi-std-500', name: '5m', color: '5m', price: 22.99, stock: 8, sku: 'MCB-HDMI-STD-500' }
    ],
    images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-hdmi-standard.jpg'],
    status: 'active' as const,
    badges: ['Full HD', 'Garantie 2 ans']
  },

  // HIFUTURE TOUR X ANC Casque
  {
    id: 'hifuture-tour-x-anc-casque',
    airtableId: 'recD8f1N0Qr8gA7vW',
    sku: 'HIFUTURE-TOUR -X-ANC-CASQUE',
    name: 'HIFUTURE TOUR X ANC Casque',
    brand: 'HIFUTURE',
    category: 'Audio & Son',
    subcategory: 'Casques & Écouteurs',
    price: 69.99,
    description: "Le casque HIFUTURE TOUR ANC révolutionne votre expérience audio avec sa technologie de réduction active du bruit de pointe. Conçu pour créer une bulle sonore parfaite, ce casque élimine jusqu'à 35 décibels de bruit ambiant, transformant les environnements les plus bruyants en espaces de concentration absolue. La réduction active du bruit utilise des microphones de détection avancés qui analysent et neutralisent les fréquences indésirables en temps réel. Idéal pour le télétravail, les transports ou simplement pour s'isoler, l'ANC s'adapte automatiquement à votre environnement. Le mode transparence permet de rester connecté au monde extérieur d'une simple pression. Les drivers dynamiques de 40mm délivrent un son haute résolution avec une réponse en fréquence étendue de 20Hz à 20kHz. Les basses profondes sans distorsion, les médiums naturels et les aigus détaillés recréent fidèlement chaque nuance de votre musique. Le codec audio HD garantit une transmission sans perte via Bluetooth. Le confort supreme est assuré par les coussinets en mousse à mémoire de forme qui épousent parfaitement la forme de vos oreilles. Le bandeau rembourré répartit uniformément le poids plume de 250 grammes, permettant des sessions d'écoute prolongées sans fatigue. La conception circum-auriculaire offre isolation passive supplémentaire. L'autonomie marathon de 30 heures avec ANC activé accompagne vos plus longues journées. La charge rapide USB-C restaure 5 heures d'écoute en 10 minutes. Le mode filaire permet utilisation illimitée via câble jack 3.5mm inclus. Le design pliable compact facilite transport dans l'étui rigide fourni. Les commandes tactiles intuitives sur l'oreillette droite gèrent musique, appels et modes ANC. Compatible avec assistants vocaux pour contrôle mains-libres. Idéal pour professionnels et voyageurs réunionnais recherchant isolation sonore et qualité audio accessibles.",
    shortDescription: 'Casque avec réduction active du bruit -35dB, drivers 40mm HD et autonomie 30h',
    metaTitle: 'CASQUE ANC HIFUTURE TOUR - Réduction de Bruit Active | Monster Phone 974',
    metaDescription: 'Casque HIFUTURE TOUR ANC avec réduction active -35dB et drivers 40mm HD. Mode transparence, confort mousse mémoire, autonomie 30h. 2 coloris disponibles La Réunion 974.',
    urlSlug: 'casque-anc-hifuture-tour',
    keywords: ['HIFUTURE TOUR', 'casque ANC', 'réduction bruit active', 'casque audio', 'casque sans fil'],
    variants: [
      {
        color: 'Champagne',
        colorCode: '#D4AF37',
        ean: '34030003200025',
        stock: 15,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-tour-x-anc-champagne.jpg']
      },
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '34030003200035',
        stock: 20,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-tour-x-anc-noir.jpg']
      }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Type', value: 'Circum-auriculaire avec ANC' },
      { label: 'Réduction de bruit', value: 'Active -35dB' },
      { label: 'Drivers', value: '40mm dynamiques HD' },
      { label: 'Réponse en fréquence', value: '20Hz - 20kHz' },
      { label: 'Autonomie', value: '30h avec ANC' },
      { label: 'Charge rapide', value: 'USB-C (10min = 5h)' },
      { label: 'Poids', value: '250g' },
      { label: 'Bluetooth', value: '5.0 avec codec HD' },
      { label: 'Mode filaire', value: 'Jack 3.5mm inclus' },
      { label: 'Pliable', value: 'Oui, avec étui rigide' }
    ],
    highlights: [
      'Réduction active du bruit -35dB',
      'Drivers 40mm haute résolution',
      'Autonomie 30 heures avec ANC',
      'Confort mousse à mémoire de forme',
      'Mode transparence adaptatif',
      'Charge rapide USB-C',
      'Design pliable avec étui'
    ],
    images: [
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-tour-x-anc-1.jpg',
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/hifuture-tour-x-anc-2.jpg'
    ],
    status: 'active' as const,
    rating: {
      average: 4.6,
      count: 28,
      distribution: { 5: 18, 4: 7, 3: 2, 2: 1, 1: 0 }
    },
    warranty: '2 ans',
    deliveryTime: '2-3 jours',
    badges: ['ANC -35dB', 'Autonomie 30h', 'Premium Audio']
  },

  // Monster Illuminessence LED Strip Smart 5M IC
  {
    id: 'mon-ill-smart-5m-ic',
    airtableId: 'recKOzXmP6A55Hfdj',
    sku: 'MON-ILL-SMART-5M-IC',
    name: 'Monster Illuminessence LED Strip Smart 5M IC',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
    price: 54.99,
    description: "Le ruban LED Monster Illuminessence Smart 5M IC révolutionne l'éclairage d'ambiance avec sa technologie RGB+IC avancée. Chaque LED est contrôlable individuellement grâce aux circuits intégrés (IC), permettant des effets lumineux dynamiques impossibles avec des rubans LED classiques. Créez des animations fluides, des dégradés de couleurs progressifs et des effets de vague spectaculaires. L'application smartphone dédiée offre un contrôle total avec plus de 100 modes préprogrammés : arc-en-ciel fluide, effet néon, simulation feu, ambiance océan, et bien plus. La synchronisation musicale analyse en temps réel les fréquences audio pour créer un spectacle lumineux parfaitement rythmé. Idéal pour transformer votre espace gaming, home cinéma ou soirées. La technologie Flow permet des transitions de couleurs ultra-douces entre les 16 millions de nuances disponibles. Chaque segment de 5cm peut afficher une couleur différente, créant des motifs complexes et personnalisables. L'adhésif 3M premium garantit une fixation durable sur toutes surfaces. Installation simplifiée avec marquages de découpe tous les 5cm et connecteurs sans soudure inclus. Contrôle vocal via Alexa et Google Assistant pour une domotique intelligente. Programmation horaire, simulation de présence et scénarios personnalisés via l'app. Le mode économie d'énergie ajuste automatiquement la luminosité selon l'heure. Consommation optimisée de seulement 24W pour 5 mètres à pleine puissance. Durée de vie exceptionnelle de 50000 heures. Parfait pour les créateurs de contenu et gamers réunionnais cherchant un éclairage RGB personnalisable et spectaculaire.",
    shortDescription: 'Ruban LED Smart 5M avec technologie RGB+IC pour effets dynamiques',
    metaTitle: 'Monster Illuminessence LED Strip Smart 5M IC - RGB Contrôlable | Monster Phone 974',
    metaDescription: 'Ruban LED Monster Smart 5M avec technologie IC pour contrôle individuel des LEDs. 100+ effets, sync musicale, app smartphone. Livraison La Réunion 974.',
    urlSlug: 'monster-illuminessence-led-strip-smart-5m-ic',
    keywords: ['LED strip', 'ruban LED', 'RGB IC', 'éclairage intelligent', 'Monster Illuminessence', 'LED gaming'],
    variants: [
      {
        color: '5m Flow',
        colorCode: '#FF00FF',
        ean: '34040004200010',
        stock: 25,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-5m-ic.jpg']
      }
    ],
    specifications: [
      { label: 'Longueur', value: '5 mètres' },
      { label: 'Technologie', value: 'RGB+IC (contrôle individuel)' },
      { label: 'LEDs', value: '150 LEDs (30/mètre)' },
      { label: 'Couleurs', value: '16 millions de nuances' },
      { label: 'Modes', value: '100+ effets préprogrammés' },
      { label: 'Contrôle', value: 'App smartphone + télécommande' },
      { label: 'Sync musicale', value: 'Microphone intégré' },
      { label: 'Découpe', value: 'Tous les 5cm' },
      { label: 'Alimentation', value: '24W (12V/2A)' },
      { label: 'Durée de vie', value: '50000 heures' },
      { label: 'Étanchéité', value: 'IP20 (intérieur)' },
      { label: 'Compatible', value: 'Alexa, Google Assistant' }
    ],
    highlights: [
      'Technologie RGB+IC pour contrôle individuel',
      '100+ modes d\'effets dynamiques',
      'Synchronisation musicale en temps réel',
      'Application smartphone complète',
      'Compatible assistants vocaux',
      'Installation facile avec adhésif 3M',
      'Économie d\'énergie intelligente'
    ],
    images: [
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-5m-ic-1.jpg',
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-5m-ic-2.jpg'
    ],
    status: 'active' as const,
    rating: {
      average: 4.7,
      count: 42,
      distribution: { 5: 30, 4: 8, 3: 3, 2: 1, 1: 0 }
    },
    warranty: '2 ans',
    deliveryTime: '2-3 jours',
    badges: ['RGB+IC', 'Sync Musicale', 'Smart Control']
  },

  // Monster Illuminessence LED Strip Smart Flow
  {
    id: 'mon-ill-smart-flow',
    airtableId: 'recUWnBN9UVK7VQ2g',
    sku: 'MON-ILL-SMART-FLOW',
    name: 'Monster Illuminessence LED Strip Smart Multicolor Flow',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Bandeaux LED',
    price: 27.99,
    description: "Le ruban LED Monster Illuminessence Smart Flow transforme instantanément votre espace avec ses effets multicolores fluides et hypnotiques. Disponible en versions 2m et 4m pour s'adapter à tous les projets d'éclairage. La technologie Flow exclusive crée des transitions de couleurs progressives et naturelles, idéales pour une ambiance relaxante ou dynamique selon vos envies. L'installation plug & play ne nécessite aucune compétence technique : déroulez, collez, branchez et illuminez. L'adhésif double face haute performance adhère sur toutes surfaces propres. Les marquages de découpe permettent d'ajuster parfaitement la longueur. Le contrôleur intelligent intégré propose 20 modes d'effets préprogrammés : respiration douce, vague arc-en-ciel, stroboscope party, ambiance coucher de soleil, et plus. La télécommande RF portée 10m permet de contrôler l'éclairage depuis votre canapé. Ajustez luminosité, vitesse des effets et couleurs en temps réel. Parfait pour décorer chambre, salon, cuisine ou espace gaming. La consommation optimisée et la technologie LED basse température garantissent sécurité et économies d'énergie. Créez des ambiances uniques pour chaque moment : détente, soirée, concentration ou sommeil. Le mode mémoire conserve vos réglages préférés. Idéal pour les foyers réunionnais cherchant une solution d'éclairage décoratif simple et efficace.",
    shortDescription: 'Ruban LED Smart avec effets Flow multicolores, disponible en 2m et 4m',
    metaTitle: 'Monster Illuminessence LED Strip Smart Flow - Multicolor | Monster Phone 974',
    metaDescription: 'Ruban LED Monster Smart Flow avec transitions multicolores fluides. 20 modes, télécommande, installation facile. 2m ou 4m disponibles La Réunion 974.',
    urlSlug: 'monster-illuminessence-led-strip-smart-flow',
    keywords: ['LED strip', 'ruban LED', 'multicolor', 'éclairage décoratif', 'Monster Flow', 'LED ambiance'],
    variants: [
      {
        color: '2m',
        colorCode: '#00FF00',
        ean: '34040004200020',
        stock: 30,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-flow-2m.jpg']
      },
      {
        color: '4m',
        colorCode: '#0000FF',
        ean: '34040004200021',
        stock: 20,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-flow-4m.jpg']
      }
    ],
    defaultVariant: '2m',
    specifications: [
      { label: 'Longueurs disponibles', value: '2m ou 4m' },
      { label: 'Technologie', value: 'RGB Flow multicolor' },
      { label: 'LEDs', value: '60 LEDs/mètre' },
      { label: 'Modes', value: '20 effets préprogrammés' },
      { label: 'Contrôle', value: 'Télécommande RF 10m' },
      { label: 'Découpe', value: 'Tous les 10cm' },
      { label: 'Alimentation', value: '12W (2m) / 24W (4m)' },
      { label: 'Installation', value: 'Adhésif 3M inclus' },
      { label: 'Angle éclairage', value: '120°' },
      { label: 'Température couleur', value: '2700K-6500K + RGB' }
    ],
    highlights: [
      'Effets Flow multicolores fluides',
      '20 modes d\'ambiance préprogrammés',
      'Installation plug & play simple',
      'Télécommande RF longue portée',
      'Disponible en 2m et 4m',
      'Économe en énergie',
      'Mémoire des réglages'
    ],
    images: [
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-flow-1.jpg',
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-smart-flow-2.jpg'
    ],
    status: 'active' as const,
    rating: {
      average: 4.5,
      count: 35,
      distribution: { 5: 22, 4: 9, 3: 3, 2: 1, 1: 0 }
    },
    warranty: '2 ans',
    deliveryTime: '2-3 jours',
    badges: ['Flow Effect', 'Plug & Play', 'Energy Saver']
  },

  // Monster Illuminessence LED Beam Kit
  {
    id: 'mon-ill-beam-kit',
    airtableId: 'reczZNn9ztInmt6ts',
    sku: 'MON-ILL-BEAM-KIT',
    name: 'Monster Illuminessence LED Beam Kit',
    brand: 'MONSTER',
    category: 'Éclairage LED',
    subcategory: 'Accessoires LED',
    price: 149.99,
    description: "Le kit Monster Illuminessence Beam révolutionne l'éclairage architectural avec son système modulaire complet. Ce kit premium comprend une barre centrale Beam et 2 barres latérales pour créer des installations lumineuses spectaculaires. Chaque élément intègre la technologie LED haute densité avec diffuseur opalin pour un éclairage homogène sans points chauds visibles. Le système de montage magnétique breveté permet une installation et reconfiguration instantanées sans outils. Créez des motifs géométriques, des cadres lumineux ou des installations artistiques en quelques secondes. La connectivité sans fil entre modules élimine les câbles disgracieux. Le contrôleur central intelligent synchronise parfaitement les 3 éléments pour des effets coordonnés époustouflants. Plus de 50 scénarios d'éclairage préprogrammés transforment votre espace : aurore boréale, feu de cheminée, océan calme, néon urbain. L'application dédiée offre un contrôle précis de chaque barre individuellement ou en groupe. Programmez des ambiances pour chaque moment de la journée avec transitions douces automatiques. La technologie de gradation sans scintillement protège vos yeux lors des longues sessions. Compatible avec les écosystèmes domotiques majeurs pour une intégration smart home complète. Construction aluminium premium avec dissipation thermique optimale pour durabilité maximale. Parfait pour créer un mur d'accent, encadrer un téléviseur ou illuminer une tête de lit. Les créateurs de contenu et architectes d'intérieur réunionnais apprécient sa polyvalence et qualité professionnelle.",
    shortDescription: 'Kit complet LED Beam avec barre centrale + 2 barres latérales modulaires',
    metaTitle: 'Monster Illuminessence LED Beam Kit - Éclairage Architectural | Monster Phone 974',
    metaDescription: 'Kit LED Monster Beam complet avec système modulaire magnétique. 50+ scénarios, contrôle app, installation sans outils. Premium lighting La Réunion 974.',
    urlSlug: 'monster-illuminessence-led-beam-kit',
    keywords: ['LED beam', 'kit éclairage', 'LED architectural', 'Monster Beam', 'éclairage modulaire', 'smart lighting'],
    variants: [
      {
        color: 'Kit Complet',
        colorCode: '#FFFFFF',
        ean: '34040004200030',
        stock: 10,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-beam-kit.jpg']
      }
    ],
    specifications: [
      { label: 'Contenu', value: '1x Beam central + 2x Bars latérales' },
      { label: 'Longueur Beam', value: '120cm' },
      { label: 'Longueur Bars', value: '60cm chacune' },
      { label: 'Puissance totale', value: '45W' },
      { label: 'Lumens', value: '4500lm total' },
      { label: 'Installation', value: 'Magnétique sans outils' },
      { label: 'Connectivité', value: 'Sans fil entre modules' },
      { label: 'Contrôle', value: 'App + télécommande + vocal' },
      { label: 'Scénarios', value: '50+ modes préprogrammés' },
      { label: 'Matériau', value: 'Aluminium premium' },
      { label: 'Gradation', value: '0-100% sans scintillement' },
      { label: 'Compatible', value: 'Alexa, Google, HomeKit' }
    ],
    highlights: [
      'Kit complet Beam + 2 Bars',
      'Installation magnétique modulaire',
      'Connexion sans fil entre éléments',
      '50+ scénarios d\'éclairage',
      'Contrôle app intelligent',
      'Compatible domotique',
      'Construction aluminium premium'
    ],
    images: [
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-beam-kit-1.jpg',
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/monster-led-beam-kit-2.jpg'
    ],
    status: 'active' as const,
    rating: {
      average: 4.8,
      count: 15,
      distribution: { 5: 12, 4: 2, 3: 1, 2: 0, 1: 0 }
    },
    warranty: '3 ans',
    deliveryTime: '3-5 jours',
    badges: ['Kit Premium', 'Magnétique', 'Pro Lighting']
  },

  // MUVIT Rouleaux de papier photo
  {
    id: 'muapn-roll',
    airtableId: 'recyrOXiEI3UsXLz0',
    sku: 'MUAPN-ROLL',
    name: 'MUVIT KidPic Rouleaux Papier Photo',
    brand: 'MUVIT',
    category: 'Créativité',
    subcategory: 'Appareils Photo',
    price: 7.99,
    description: "Les rouleaux de papier photo MUVIT KidPic constituent l'accessoire indispensable pour prolonger l'aventure photographique des jeunes créateurs. Ce pack économique de 5 rouleaux garantit des heures d'impression instantanée, permettant aux enfants de capturer et matérialiser leurs découvertes visuelles sans interruption. Chaque rouleau contient suffisamment de papier pour imprimer jusqu'à 30 photos, offrant un total de 150 impressions par pack. Le papier thermique spécial développe instantanément les images sans encre ni cartouche, utilisant une technologie écologique et sécuritaire pour les enfants. La qualité d'impression optimisée produit des photos nettes et contrastées qui résistent au temps. Les images conservent leur éclat pendant des années, créant des souvenirs durables que les enfants peuvent collectionner, partager ou offrir. Le format compact des photos permet de créer albums, collages et projets créatifs. L'installation simplifiée permet aux enfants de changer eux-mêmes les rouleaux, développant autonomie et responsabilité. Le système de chargement intuitif évite les erreurs et garantit un alignement parfait pour des impressions réussies à chaque fois. Le papier autocollant au dos transforme chaque photo en sticker repositionnable, multipliant les possibilités créatives. Les enfants peuvent décorer cahiers, chambres et créations artistiques avec leurs propres photos, personnalisant leur univers avec leurs souvenirs préférés. Le conditionnement protégé préserve la qualité du papier contre humidité et poussière, garantissant des impressions parfaites même après stockage prolongé. Idéal pour le climat tropical de La Réunion, le papier résiste aux variations de température et d'humidité. Compatible exclusivement avec les appareils MUVIT KidPic, ce papier certifié garantit performances optimales et sécurité d'utilisation.",
    shortDescription: 'Pack de 5 rouleaux de papier photo pour appareil MUVIT KidPic - 150 impressions',
    metaTitle: 'Rouleaux Papier Photo MUVIT KidPic - Pack de 5 | Monster Phone 974',
    metaDescription: 'Rouleaux papier photo MUVIT KidPic, pack 5 rouleaux pour 150 impressions instantanées. Papier autocollant écologique, installation facile. Stock La Réunion 974.',
    urlSlug: 'muvit-kidpic-rouleaux-papier-photo',
    keywords: ['rouleaux papier photo', 'MUVIT KidPic', 'recharge appareil photo', 'papier impression instantanée', 'accessoire KidPic'],
    variants: [
      {
        color: 'Pack x5',
        colorCode: '#FFFFFF',
        ean: '34040004100030',
        stock: 50,
        images: ['https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-rouleaux-papier.jpg']
      }
    ],
    specifications: [
      { label: 'Contenu', value: 'Pack de 5 rouleaux' },
      { label: 'Photos par rouleau', value: '30 photos' },
      { label: 'Total impressions', value: '150 photos' },
      { label: 'Type papier', value: 'Thermique sans encre' },
      { label: 'Format photo', value: 'Format carte' },
      { label: 'Dos autocollant', value: 'Oui, repositionnable' },
      { label: 'Conservation', value: 'Plusieurs années' },
      { label: 'Installation', value: 'Système easy-load' },
      { label: 'Écologique', value: 'Sans encre ni cartouche' },
      { label: 'Compatible', value: 'MUVIT KidPic uniquement' }
    ],
    highlights: [
      'Pack économique 5 rouleaux',
      '150 impressions totales',
      'Papier thermique écologique',
      'Dos autocollant créatif',
      'Installation facile par enfant',
      'Qualité d\'impression durable',
      'Résistant climat tropical'
    ],
    images: [
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-rouleaux-papier-1.jpg',
      'https://raw.githubusercontent.com/Aiolia-dev/monster-phone-images/main/products/muvit-rouleaux-papier-2.jpg'
    ],
    status: 'active' as const,
    rating: {
      average: 4.9,
      count: 72,
      distribution: { 5: 65, 4: 5, 3: 2, 2: 0, 1: 0 }
    },
    warranty: '6 mois',
    deliveryTime: '1-2 jours',
    badges: ['Pack Éco', 'Sans Encre', 'Autocollant']
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
        brands: ['HIFUTURE', 'HiFuture', 'MONSTER']
      },
      {
        name: 'Enceintes',
        slug: 'enceintes',
        brands: ['HIFUTURE', 'HiFuture', 'MONSTER']
      },
      {
        name: 'Enceintes haut de gamme',
        slug: 'enceintes-haut-de-gamme',
        brands: ['MONSTER', 'HIFUTURE']
      },
      {
        name: 'Casques gaming',
        slug: 'casques-gaming',
        brands: ['MONSTER', 'HIFUTURE']
      },
      {
        name: 'Casques sport',
        slug: 'casques-sport',
        brands: ['MONSTER', 'HIFUTURE']
      },
      {
        name: 'Microphones',
        slug: 'microphones',
        brands: ['HiFuture', 'HIFUTURE']
      }
    ]
  },
  {
    name: 'Éclairage LED',
    slug: 'eclairage-led',
    subcategories: [
      {
        name: 'Bandeaux LED',
        slug: 'bandeaux-led',
        brands: ['MONSTER']
      },
      {
        name: 'Néon LED',
        slug: 'neon-led',
        brands: ['MONSTER']
      },
      {
        name: 'Ampoules connectées',
        slug: 'ampoules-connectees',
        brands: ['MONSTER']
      },
      {
        name: 'Projecteurs',
        slug: 'projecteurs',
        brands: ['MONSTER']
      },
      {
        name: 'Accessoires LED',
        slug: 'accessoires-led',
        brands: ['MONSTER']
      }
    ]
  },
  {
    name: 'Accessoires',
    slug: 'accessoires',
    subcategories: [
      {
        name: 'Casques & Écouteurs',
        slug: 'casques-ecouteurs',
        brands: ['MONSTER', 'HIFUTURE', 'MUVIT']
      },
      {
        name: 'Chargeur & Batteries',
        slug: 'chargeur-batteries',
        brands: ['MONSTER', 'MY WAY']
      },
      {
        name: 'Câbles & Connecteurs',
        slug: 'cables-connecteurs',
        brands: ['MONSTER', 'MY WAY']
      },
      {
        name: 'Enceintes',
        slug: 'enceintes',
        brands: ['MONSTER', 'HIFUTURE']
      },
      {
        name: 'Support',
        slug: 'support',
        brands: ['MONSTER', 'MUVIT']
      }
    ]
  },
  {
    name: 'Créativité',
    slug: 'creativite',
    subcategories: [
      {
        name: 'Appareils Photo',
        slug: 'appareils-photo',
        brands: ['MUVIT']
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
    category: 'Audio', 
    brands: getBrandsByCategory('Audio & Son')
  },
  {
    category: 'Accessoires',
    brands: getBrandsByCategory('Chargement & Énergie')
  }
];