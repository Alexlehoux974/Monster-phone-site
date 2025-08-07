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
        brands: ['HONOR']
      },
      {
        name: 'Entrée de gamme',
        slug: 'entree-de-gamme',
        brands: ['HONOR']
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
    brands: ['HONOR']
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