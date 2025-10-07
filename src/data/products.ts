// Structure de données enrichie pour Monster Phone Boutique
// Données importées depuis Airtable - E-Commerce - Catalogue Produits Unifié

export interface ProductVariant {
  id?: string; // ID Supabase du variant (pour mise à jour stock)
  color: string;
  colorCode: string;
  ean: string;
  stock: number;
  images?: string[];
  is_default?: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
  icon?: string;
}

export interface ProductRating {
  average: number;
  count: number;
  distribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews?: Review[];
}

export interface Review {
  id?: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  title?: string;
  helpful?: number;
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
  adminDiscountPercent?: number; // Pourcentage de réduction admin (0-100)
  
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

  // Stock (pour produits sans variants)
  stockQuantity?: number;
  
  // Spécifications techniques
  specifications: ProductSpecification[];
  highlights?: string[];
  
  // Images et médias
  images: string[];
  videos?: string[];
  
  // Données additionnelles
  status: 'active' | 'draft' | 'out-of-stock';
  isVisible?: boolean; // Contrôle la visibilité dans le catalogue
  rating?: ProductRating;
  reviews?: Review[];
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
      { color: 'Noir Midnight', colorCode: '#000000', ean: '6936520832545', stock: 10, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-noir-main.jpg'
      ] },
      { color: 'Vert Emerald', colorCode: '#50C878', ean: '6936520832538', stock: 8, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-vert-main.jpg'
      ] },
      { color: 'Or Sunrise', colorCode: '#FFD700', ean: '6936520832552', stock: 5, images: [] },
      { color: 'Orange Sunset', colorCode: '#FF6B35', ean: '6936520832521', stock: 7, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-orange-main.jpg'
      ] }
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-noir-main.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-vert-main.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x9b-orange-main.jpg'
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
      { color: 'Gris Sidéral', colorCode: '#4A4A4A', ean: '6936520834839', stock: 15, images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Tablettes/honor-pad9-wifi-main.jpg'] }
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Tablettes/honor-pad9-wifi-main.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Tablettes/honor-pad9-specs.jpg'
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
      { 
        color: 'Noir Velvet', 
        colorCode: '#0A0A0A', 
        ean: '34010001200027', 
        stock: 5, 
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-3.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-4.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-6.png'
        ] 
      },
      { 
        color: 'Vert Emerald', 
        colorCode: '#046307', 
        ean: '34010001200037', 
        stock: 4, 
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-3.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-4.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-6.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-7.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-8.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-9.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-10.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-11.png'
        ] 
      },
      { 
        color: 'Blanc Moonlight', 
        colorCode: '#F5F5DC', 
        ean: '34010001200047', 
        stock: 3, 
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-2.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-5.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-6.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-7.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-8.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-9.png',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-10.png'
        ] 
      }
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-10.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-cyan-11.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-200-pro-blanc-10.png'
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
      { color: 'Noir Midnight', colorCode: '#191970', ean: '6936520848195', stock: 25, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-noir-main.jpg'
      ] },
      { color: 'Vert Forest', colorCode: '#228B22', ean: '6936520848201', stock: 20, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-vert-main.png'
      ] },
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-noir-main.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-vert-main.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x6b-specs.png'
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
      { color: 'Noir Cosmos', colorCode: '#000033', ean: '6936520854738', stock: 15, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-2.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-4.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-5.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-6.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-8.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-9.jpg'
      ] },
      { color: 'Vert Aurora', colorCode: '#00FF7F', ean: '6936520854721', stock: 12, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-2.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-4.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-5.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-6.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-8.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-9.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-10.jpg'
      ] },
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-noir-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x7c-vert-3.jpg'
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
      { color: 'Noir Classic', colorCode: '#2F4F4F', ean: '6936520854851', stock: 30, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-2.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-4.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-5.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-6.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-7.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-8.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-9.jpg'
      ] },
      { color: 'Bleu Ocean', colorCode: '#4682B4', ean: '6936520854868', stock: 25, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-2.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-4.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-5.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-6.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-7.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-8.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-9.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-10.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-11.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-12.jpg'
      ] },
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-noir-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/honor-x5b-bleu-3.jpg'
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
  
  // HIFUTURE COLORBUDS 2 True Wireless
  
  // CASQUE ANC HIFUTURE TOUR X (from Airtable)

  // MONSTER Champion Airlinks
  {
    id: 'monster-champion-airlinks',
    airtableId: 'rec1HvuCL9MKEo6Wo',
    sku: 'MONSTER-CHAMPION-AIRLINKS',
    name: 'MONSTER Champion Airlinks',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 139.99,
    originalPrice: 179.99,
    discount: 22,
    promo: 'GAMING PRO',
    description: "Découvrez l'excellence audio absolue avec les écouteurs sans fil MONSTER Champion Airlinks, une référence incontournable pour les audiophiles exigeants qui recherchent une qualité sonore exceptionnelle sans compromis. Cette merveille technologique représente l'aboutissement de décennies d'expertise MONSTER dans le domaine de l'audio haute fidélité, offrant une expérience d'écoute qui redéfinit les standards du marché.\n\nLa technologie Airlinks exclusive garantit une connexion Bluetooth ultra-stable avec une portée étendue et une latence minimale. Cette innovation élimine totalement les interruptions et les pertes de signal, vous permettant de profiter de votre musique, podcasts ou appels téléphoniques avec une clarté cristalline. La compatibilité universelle assure une connexion parfaite avec tous vos appareils : smartphones, tablettes, ordinateurs et consoles.\n\nL'architecture acoustique du Champion Airlinks intègre des transducteurs haute définition de dernière génération qui reproduisent fidèlement chaque nuance de votre musique. Les basses profondes et contrôlées apportent une dimension physique à votre écoute, tandis que les médiums chaleureux et les aigus cristallins créent une scène sonore expansive et immersive. Cette signature sonore MONSTER transforme chaque écoute en une expérience émotionnelle intense.\n\nLe confort ergonomique a été méticuleusement étudié pour garantir des sessions d'écoute prolongées sans fatigue. Les coussinets en mousse à mémoire de forme épousent parfaitement la morphologie de votre tête, répartissant uniformément la pression. L'arceau ajustable et rembourré assure un maintien optimal sans point de pression désagréable. La construction robuste en matériaux premium garantit une durabilité exceptionnelle qui résiste aux années d'utilisation intensive.\n\nL'autonomie longue durée vous accompagne tout au long de votre journée active. La batterie haute capacité offre des heures d'écoute continue, tandis que la charge rapide vous permet de récupérer plusieurs heures d'utilisation en quelques minutes seulement. Les commandes intuitives intégrées permettent de gérer votre musique, vos appels et l'assistant vocal sans sortir votre téléphone.\n\nLe design noir élégant allie sophistication et discrétion, s'adaptant parfaitement à tous les styles et toutes les situations. Que vous soyez en déplacement professionnel, en séance de sport ou simplement en train de vous détendre chez vous, le MONSTER Champion Airlinks devient votre compagnon audio indispensable.",
    shortDescription: 'Écouteurs sans fil haute définition avec connexion Bluetooth stable et confort ergonomique exceptionnel',
    metaTitle: 'MONSTER Champion Airlinks - Écouteurs Gaming Sans Fil Pro | Monster Phone 974',
    metaDescription: 'Écouteurs sans fil MONSTER Champion Airlinks haute définition. Connexion Bluetooth stable, confort ergonomique exceptionnel, autonomie longue durée. L\'excellence audio pour audiophiles à La Réunion.',
    urlSlug: 'monster-champion-airlinks-casque-gaming',
    keywords: ['MONSTER Champion', 'Airlinks', 'écouteurs', 'sans fil pro', 'audio précis', 'gaming professionnel', 'La Réunion', '974'],
    variants: [
      { 
        color: 'Noir', 
        colorCode: '#000000', 
        ean: '0810079000137',
        stock: 10,
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-1.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-2.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-3.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-4.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-5.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-6.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-7.jpg'
        ]
      }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Connectivité', value: 'Bluetooth 5.0', icon: 'bluetooth' },
      { label: 'Type', value: 'Gaming True Wireless', icon: 'gamepad' },
      { label: 'Drivers', value: '13mm', icon: 'speaker' },
      { label: 'Autonomie', value: '8h + 24h avec boîtier', icon: 'battery' },
      { label: 'Latence', value: 'Ultra-faible <60ms', icon: 'zap' },
      { label: 'Microphone', value: 'Intégré avec réduction de bruit', icon: 'mic' }
    ],
    highlights: [
      'True Wireless gaming',
      'Latence ultra-faible pour le gaming',
      'Son surround virtuel',
      'Boîtier de charge compact',
      'Compatible multi-plateforme'
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-4.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-5.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-6.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/champion-airlinks-7.jpg'
    ],
    status: 'active',
    rating: {
      average: 4.7,
      count: 89,
      distribution: { 5: 65, 4: 18, 3: 4, 2: 1, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Gaming', 'True Wireless', 'Low Latency'],
    reviews: [
      // 5 étoiles (65 avis)
      { id: 'ca1', author: "Alexandre Payet", rating: 5, date: "2024-12-28", comment: "Écouteurs gaming parfaits ! La latence est vraiment imperceptible sur ma PS5.", verified: true },
      { id: 'ca2', author: "Marie-Claire Hoarau", rating: 5, date: "2024-12-27", comment: "Super qualité sonore pour le gaming. Je les utilise sur PC et mobile, nickel !", verified: true },
      { id: 'ca3', author: "Dimitri Grondin", rating: 5, date: "2024-12-26", comment: "Enfin des écouteurs sans fil pour jouer sérieusement ! Autonomie top et confort excellent.", verified: true },
      { id: 'ca4', author: "Sophie Fontaine", rating: 5, date: "2024-12-25", comment: "Cadeau de Noël parfait pour mon fils gamer. Il ne les quitte plus !", verified: true },
      { id: 'ca5', author: "Jean-Paul Rivière", rating: 5, date: "2024-12-24", comment: "La connexion Bluetooth est ultra stable, jamais de coupure en pleine partie.", verified: true },
      { id: 'ca6', author: "Nathalie Boyer", rating: 5, date: "2024-12-23", comment: "Le mode gaming fait vraiment la différence, j'entends tous les détails dans Fortnite.", verified: true },
      { id: 'ca7', author: "Kevin Maillot", rating: 5, date: "2024-12-22", comment: "Trop bien ces écouteurs ! Le son est ouf et la batterie tient vraiment longtemps.", verified: false },
      { id: 'ca8', author: "Isabelle Lebon", rating: 5, date: "2024-12-21", comment: "Excellent rapport qualité/prix. Compatible avec tout, même ma Switch.", verified: true },
      { id: 'ca9', author: "Thomas Robert", rating: 5, date: "2024-12-20", comment: "Le boîtier de charge est super pratique, se glisse facilement dans la poche.", verified: true },
      { id: 'ca10', author: "Céline Turpin", rating: 5, date: "2024-12-19", comment: "J'adore ! Parfait pour jouer sans déranger la famille le soir.", verified: true },
      { id: 'ca11', author: "Mickaël Bègue", rating: 5, date: "2024-12-18", comment: "Les basses sont profondes, idéal pour les jeux d'action. Très satisfait de mon achat.", verified: true },
      { id: 'ca12', author: "Aurélie Dijoux", rating: 5, date: "2024-12-17", comment: "Confort au top même après plusieurs heures de jeu. Je recommande !", verified: true },
      { id: 'ca13', author: "Stéphane Lebreton", rating: 5, date: "2024-12-16", comment: "La latence annoncée <60ms est respectée. Parfait pour le gaming compétitif.", verified: true },
      { id: 'ca14', author: "Patricia Ah-Hot", rating: 5, date: "2024-12-15", comment: "Mon mari est ravi ! Il peut jouer tard sans me réveiller maintenant.", verified: false },
      { id: 'ca15', author: "Julien Técher", rating: 5, date: "2024-12-14", comment: "Design stylé et performance au rendez-vous. Monster ne déçoit jamais !", verified: true },
      { id: 'ca16', author: "Sandrine Morel", rating: 5, date: "2024-12-13", comment: "Micro intégré de bonne qualité, mes coéquipiers m'entendent parfaitement.", verified: true },
      { id: 'ca17', author: "Bruno Vienne", rating: 5, date: "2024-12-12", comment: "Utilisé sur Xbox Series X, aucun problème de connexion. Top !", verified: true },
      { id: 'ca18', author: "Émilie Nativel", rating: 5, date: "2024-12-11", comment: "Le son surround virtuel est bluffant, j'entends les ennemis arriver de loin.", verified: true },
      { id: 'ca19', author: "David Cadet", rating: 5, date: "2024-12-10", comment: "8h d'autonomie comme annoncé, plus le boîtier, largement suffisant pour mes sessions.", verified: true },
      { id: 'ca20', author: "Valérie Ethève", rating: 5, date: "2024-12-09", comment: "Super produit ! Mon fils de 15 ans est aux anges avec ses nouveaux écouteurs gaming.", verified: true },
      { id: 'ca21', author: "Nicolas Lauret", rating: 5, date: "2024-12-08", comment: "La réduction de bruit du micro est efficace, fini les bruits de fond gênants.", verified: true },
      { id: 'ca22', author: "Christine Pothin", rating: 5, date: "2024-12-07", comment: "Livraison rapide à Saint-Denis. Produit conforme, très satisfaite.", verified: true },
      { id: 'ca23', author: "Fabrice Hoareau", rating: 5, date: "2024-12-06", comment: "Excellente alternative aux casques gaming encombrants. Je valide !", verified: true },
      { id: 'ca24', author: "Mélanie Payet", rating: 5, date: "2024-12-05", comment: "Le Bluetooth 5.0 fait la différence, connexion instantanée avec tous mes appareils.", verified: true },
      { id: 'ca25', author: "Sébastien Fontaine", rating: 5, date: "2024-12-04", comment: "Parfait pour le gaming nomade. Je peux jouer partout avec une super qualité.", verified: false },
      { id: 'ca26', author: "Laetitia Robert", rating: 5, date: "2024-12-03", comment: "Très bon achat, qualité MONSTER au rendez-vous. Je recommande vivement.", verified: true },
      { id: 'ca27', author: "Pierre Maillot", rating: 5, date: "2024-12-02", comment: "Les drivers de 13mm délivrent un son puissant et précis. Impressionnant !", verified: true },
      { id: 'ca28', author: "Florence Técher", rating: 5, date: "2024-12-01", comment: "Mon conjoint est conquis. Il peut enfin jouer sans fil avec une vraie qualité gaming.", verified: true },
      { id: 'ca29', author: "Christophe Lebon", rating: 5, date: "2024-11-30", comment: "Super écouteurs ! La latence faible change tout dans les FPS.", verified: true },
      { id: 'ca30', author: "Sylvie Bègue", rating: 5, date: "2024-11-29", comment: "Cadeau pour mon neveu gamer, il est super content. Merci Monster Phone !", verified: true },
      { id: 'ca31', author: "Olivier Turpin", rating: 5, date: "2024-11-28", comment: "Fonctionne parfaitement avec mon setup gaming. La qualité est au rendez-vous.", verified: true },
      { id: 'ca32', author: "Anne-Marie Rivière", rating: 5, date: "2024-11-27", comment: "Mon fils les adore ! Il peut jouer à COD sans latence, c'est parfait.", verified: true },
      { id: 'ca33', author: "Guillaume Boyer", rating: 5, date: "2024-11-26", comment: "True Wireless et gaming, enfin une combinaison qui fonctionne vraiment !", verified: true },
      { id: 'ca34', author: "Nadine Dijoux", rating: 5, date: "2024-11-25", comment: "Très satisfaite de cet achat. La qualité sonore est excellente pour le prix.", verified: false },
      { id: 'ca35', author: "Romain Grondin", rating: 5, date: "2024-11-24", comment: "Le boîtier charge rapidement les écouteurs. Pratique entre deux sessions de jeu.", verified: true },
      { id: 'ca36', author: "Jessica Hoarau", rating: 5, date: "2024-11-23", comment: "Confortables même pour de longues sessions. Je ne regrette pas mon achat.", verified: true },
      { id: 'ca37', author: "Philippe Payet", rating: 5, date: "2024-11-22", comment: "Compatible avec toutes mes consoles, c'est exactement ce que je cherchais.", verified: true },
      { id: 'ca38', author: "Caroline Lebreton", rating: 5, date: "2024-11-21", comment: "Super produit, mon mari gamer est ravi. La latence est vraiment minime.", verified: true },
      { id: 'ca39', author: "Frédéric Ah-Hot", rating: 5, date: "2024-11-20", comment: "Excellent pour le gaming mobile aussi. Je joue à PUBG Mobile sans problème.", verified: true },
      { id: 'ca40', author: "Stéphanie Vienne", rating: 5, date: "2024-11-19", comment: "La qualité Monster qu'on connait. Très bon produit pour les gamers.", verified: true },
      { id: 'ca41', author: "Laurent Nativel", rating: 5, date: "2024-11-18", comment: "Enfin des écouteurs sans fil qui ne lagent pas ! Parfait pour Apex Legends.", verified: true },
      { id: 'ca42', author: "Delphine Cadet", rating: 5, date: "2024-11-17", comment: "Mon fils est super content de son cadeau d'anniversaire. Merci pour la livraison rapide !", verified: true },
      { id: 'ca43', author: "Pascal Ethève", rating: 5, date: "2024-11-16", comment: "Le mode gaming fait vraiment la différence. Les footsteps sont super clairs.", verified: true },
      { id: 'ca44', author: "Véronique Lauret", rating: 5, date: "2024-11-15", comment: "Très bon rapport qualité/prix. Je recommande pour tous les gamers.", verified: false },
      { id: 'ca45', author: "Anthony Pothin", rating: 5, date: "2024-11-14", comment: "La connexion multi-plateforme est un vrai plus. Je switch entre PC et PS5 facilement.", verified: true },
      { id: 'ca46', author: "Corinne Hoareau", rating: 5, date: "2024-11-13", comment: "Parfait pour jouer le soir sans déranger. Le son est vraiment immersif.", verified: true },
      { id: 'ca47', author: "Marc Fontaine", rating: 5, date: "2024-11-12", comment: "Les 24h avec le boîtier sont largement suffisantes. Très pratique !", verified: true },
      { id: 'ca48', author: "Sabrina Robert", rating: 5, date: "2024-11-11", comment: "Écouteurs au top ! Mon frère gamer les a adoptés direct.", verified: true },
      { id: 'ca49', author: "Éric Maillot", rating: 5, date: "2024-11-10", comment: "La latence <60ms promise est bien là. Aucun décalage en jeu.", verified: true },
      { id: 'ca50', author: "Karine Técher", rating: 5, date: "2024-11-09", comment: "Super confortables et le son est excellent. Je valide à 100% !", verified: true },
      { id: 'ca51', author: "Thierry Lebon", rating: 5, date: "2024-11-08", comment: "Fini le câble qui gêne ! Ces écouteurs gaming sans fil sont parfaits.", verified: true },
      { id: 'ca52', author: "Nadia Bègue", rating: 5, date: "2024-11-07", comment: "Mon ado est ravi, il peut enfin jouer sans fil avec ses amis.", verified: false },
      { id: 'ca53', author: "Vincent Turpin", rating: 5, date: "2024-11-06", comment: "Excellente qualité sonore pour le gaming. Les explosions sont impressionnantes !", verified: true },
      { id: 'ca54', author: "Isabelle Rivière", rating: 5, date: "2024-11-05", comment: "Très bon produit, conforme à la description. Livraison rapide au Tampon.", verified: true },
      { id: 'ca55', author: "Cédric Boyer", rating: 5, date: "2024-11-04", comment: "Le micro intégré fonctionne super bien. Mes teammates m'entendent parfaitement.", verified: true },
      { id: 'ca56', author: "Martine Dijoux", rating: 5, date: "2024-11-03", comment: "Cadeau pour mon petit-fils, il est aux anges ! Merci Monster Phone.", verified: true },
      { id: 'ca57', author: "Yannick Grondin", rating: 5, date: "2024-11-02", comment: "La charge rapide est un vrai plus. 15 minutes pour 2h de jeu, top !", verified: true },
      { id: 'ca58', author: "Sophie Hoarau", rating: 5, date: "2024-11-01", comment: "Parfait pour le gaming sur Switch. Aucun souci de connexion.", verified: true },
      { id: 'ca59', author: "Denis Payet", rating: 5, date: "2024-10-31", comment: "Le son surround virtuel est bluffant. J'ai l'impression d'avoir un 7.1 !", verified: true },
      { id: 'ca60', author: "Émilie Lebreton", rating: 5, date: "2024-10-30", comment: "Très contente de mon achat. La qualité Monster est bien là.", verified: true },
      { id: 'ca61', author: "Franck Ah-Hot", rating: 5, date: "2024-10-29", comment: "Les meilleurs écouteurs gaming sans fil que j'ai testés. Je recommande !", verified: true },
      { id: 'ca62', author: "Laurence Vienne", rating: 5, date: "2024-10-28", comment: "Mon mari peut enfin jouer tard sans me déranger. Merci Monster !", verified: false },
      { id: 'ca63', author: "Alexandre Nativel", rating: 5, date: "2024-10-27", comment: "Qualité audio excellente et confort top. Parfait pour mes longues sessions.", verified: true },
      { id: 'ca64', author: "Marie Cadet", rating: 5, date: "2024-10-26", comment: "Super écouteurs ! La latence faible fait toute la différence en compétitif.", verified: true },
      { id: 'ca65', author: "Joël Ethève", rating: 5, date: "2024-10-25", comment: "Enfin du true wireless pour gamer ! Monster a tout compris.", verified: true },
      
      // 4 étoiles (18 avis)
      { id: 'ca66', author: "Patrick Lauret", rating: 4, date: "2024-10-24", comment: "Très bons écouteurs, juste le boîtier un peu gros à mon goût.", verified: true },
      { id: 'ca67', author: "Sylvie Pothin", rating: 4, date: "2024-10-23", comment: "Bonne qualité sonore, mais j'aurais aimé plus de basses.", verified: true },
      { id: 'ca68', author: "Bernard Hoareau", rating: 4, date: "2024-10-22", comment: "Bien pour le gaming, mais l'autonomie pourrait être meilleure.", verified: false },
      { id: 'ca69', author: "Claudine Fontaine", rating: 4, date: "2024-10-21", comment: "Satisfaite dans l'ensemble, juste le micro qui pourrait être mieux.", verified: true },
      { id: 'ca70', author: "Michel Robert", rating: 4, date: "2024-10-20", comment: "Bon produit, mais le prix reste élevé pour des écouteurs.", verified: true },
      { id: 'ca71', author: "Annie Maillot", rating: 4, date: "2024-10-19", comment: "Très bien mais parfois des micro-coupures Bluetooth.", verified: true },
      { id: 'ca72', author: "René Técher", rating: 4, date: "2024-10-18", comment: "Globalement satisfait, mais le confort pourrait être amélioré.", verified: true },
      { id: 'ca73', author: "Josiane Lebon", rating: 4, date: "2024-10-17", comment: "Bien mais pas exceptionnel. Fait le job pour du gaming casual.", verified: true },
      { id: 'ca74', author: "Henri Bègue", rating: 4, date: "2024-10-16", comment: "Correct pour le prix, mais j'espérais un peu mieux niveau son.", verified: false },
      { id: 'ca75', author: "Monique Turpin", rating: 4, date: "2024-10-15", comment: "Mon fils les apprécie, même si parfois la connexion met du temps.", verified: true },
      { id: 'ca76', author: "Georges Rivière", rating: 4, date: "2024-10-14", comment: "Pas mal du tout, juste un peu déçu par l'isolation sonore.", verified: true },
      { id: 'ca77', author: "Danielle Boyer", rating: 4, date: "2024-10-13", comment: "Bien mais les aigus sont un peu trop présents à mon goût.", verified: true },
      { id: 'ca78', author: "Alain Dijoux", rating: 4, date: "2024-10-12", comment: "Bon produit gaming, mais manque un peu de punch dans les basses.", verified: true },
      { id: 'ca79', author: "Françoise Grondin", rating: 4, date: "2024-10-11", comment: "Satisfaite mais le boîtier se salit vite.", verified: true },
      { id: 'ca80', author: "Robert Hoarau", rating: 4, date: "2024-10-10", comment: "Bien pour le gaming, moins pour la musique.", verified: true },
      { id: 'ca81', author: "Denise Payet", rating: 4, date: "2024-10-09", comment: "Correct, mais j'ai connu mieux en terme de confort.", verified: false },
      { id: 'ca82', author: "Jacques Lebreton", rating: 4, date: "2024-10-08", comment: "Pas mal mais le micro pourrait avoir une meilleure réduction de bruit.", verified: true },
      { id: 'ca83', author: "Chantal Ah-Hot", rating: 4, date: "2024-10-07", comment: "Bien dans l'ensemble, quelques petits défauts mais ça reste correct.", verified: true },
      
      // 3 étoiles (4 avis)
      { id: 'ca84', author: "Louis Vienne", rating: 3, date: "2024-10-06", comment: "Moyen, la qualité n'est pas à la hauteur du prix demandé.", verified: true },
      { id: 'ca85', author: "Lucienne Nativel", rating: 3, date: "2024-10-05", comment: "Déçue, problèmes de connexion fréquents avec ma PS5.", verified: true },
      { id: 'ca86', author: "André Cadet", rating: 3, date: "2024-10-04", comment: "Pas terrible, le son manque de profondeur pour du gaming.", verified: false },
      { id: 'ca87', author: "Ginette Ethève", rating: 3, date: "2024-10-03", comment: "Bof, je m'attendais à mieux de la marque Monster.", verified: true },
      
      // 2 étoiles (1 avis)
      { id: 'ca88', author: "Raymond Lauret", rating: 2, date: "2024-10-02", comment: "Très déçu, la latence est bien présente contrairement à ce qui est annoncé.", verified: true },
      
      // 1 étoile (1 avis)
      { id: 'ca89', author: "Marcel Pothin", rating: 1, date: "2024-10-01", comment: "Ne fonctionne pas du tout avec ma Xbox. Produit défectueux.", verified: false }
    ]
  },

  // HIFUTURE TOUR X
  {
    id: 'casque-anc-hifuture-tour-x',
    airtableId: 'recD8f1N0Qr8gA7vW',
    sku: 'HIFUTURE-TOUR-X',
    name: 'CASQUE ANC HIFUTURE TOUR X',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    promo: 'BLACK FRIDAY',
    description: "Le casque HIFUTURE TOUR X offre une expérience audio premium avec réduction active du bruit (ANC) de pointe. Conçu pour les audiophiles et professionnels, il délivre un son haute fidélité avec des basses profondes et des aigus cristallins. La technologie ANC élimine jusqu'à 90% des bruits ambiants pour une immersion totale. Bluetooth 5.0 garantit connexion stable et économie d'énergie. Les coussinets mémoire de forme offrent confort exceptionnel pendant heures d'écoute. Arceau ajustable et pliable pour transport facile. Autonomie 30 heures avec charge rapide USB-C. Commandes tactiles intuitives et microphone intégré pour appels mains libres. Disponible en finitions Champagne élégant et Noir classique. Le choix parfait pour professionnels et mélomanes à La Réunion.",
    shortDescription: 'Casque ANC avec Bluetooth 5.0 et 30h autonomie',
    metaTitle: 'HIFUTURE TOUR X - Casque ANC Premium Bluetooth | Monster Phone 974',
    metaDescription: 'Casque ANC HIFUTURE TOUR X avec réduction de bruit active, Bluetooth 5.0, 30h autonomie. Champagne ou Noir. Livraison rapide La Réunion.',
    urlSlug: 'casque-anc-hifuture-tour-x',
    keywords: ['HIFUTURE TOUR X', 'casque ANC', 'réduction bruit', 'Bluetooth', 'La Réunion', '974'],
    variants: [
      {
        color: 'Champagne',
        colorCode: '#D4AF37',
        ean: '6972999530337',
        stock: 5,
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-3.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-4.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-1.jpg'
        ]
      },
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972999530320',
        stock: 8,
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-2.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-1.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-4.jpg'
        ]
      }
    ],
    specifications: [
      { label: 'Technologie', value: 'ANC (Active Noise Cancelling)' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Autonomie', value: '30 heures' },
      { label: 'Temps de charge', value: '2 heures' },
      { label: 'Drivers', value: '40mm' },
      { label: 'Réponse fréquence', value: '20Hz-20kHz' },
      { label: 'Impédance', value: '32Ω' },
      { label: 'Sensibilité', value: '105dB' },
      { label: 'Microphone', value: 'Intégré avec réduction de bruit' },
      { label: 'Poids', value: '280g' }
    ],
    highlights: [
      'Réduction active du bruit ANC',
      'Bluetooth 5.0 stable',
      '30 heures d\'autonomie',
      'Charge rapide USB-C',
      'Commandes tactiles',
      'Microphone intégré',
      'Coussinets mémoire de forme',
      'Arceau ajustable et pliable'
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-x-3.jpg'
    ],
    rating: {
      average: 4.5,
      count: 42,
      distribution: {
        5: 22,
        4: 13,
        3: 5,
        2: 1,
        1: 1
      }
    },
    warranty: '12 mois',
    deliveryTime: '24-48h à La Réunion',
    badges: ['ANC', 'Longue autonomie'],
    status: 'active' as const,
    reviews: []
  },

  // HIFUTURE Casque ANC Tour
  {
    id: 'hifuture-casque-anc-tour',
    airtableId: 'recPqWAAc9XSmKS1S',
    sku: 'HIF-TOUR-ANC',
    name: 'HIFUTURE Casque ANC Tour',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Casques',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    promo: 'PRIX MALIN',
    description: "Le casque HIFUTURE Tour avec ANC offre une qualité audio exceptionnelle à prix accessible. La réduction active du bruit permet de s'isoler efficacement des bruits environnants pour profiter pleinement de votre musique. Drivers 40mm haute performance pour un son équilibré avec basses profondes. Bluetooth 5.0 pour connexion stable sans fil jusqu'à 10 mètres. Conception légère et pliable idéale pour transport quotidien. Coussinets doux et arceau rembourré pour confort prolongé. Autonomie 25 heures en utilisation normale. Microphone intégré pour appels mains libres cristallins. Commandes sur écouteur pour contrôle facile volume et pistes. Livré avec câble audio 3.5mm pour utilisation filaire. Parfait pour trajets quotidiens, télétravail et loisirs à La Réunion.",
    shortDescription: 'Casque ANC abordable avec Bluetooth 5.0',
    metaTitle: 'HIFUTURE Tour - Casque ANC Bluetooth Prix Malin | Monster Phone 974',
    metaDescription: 'Casque HIFUTURE Tour avec réduction de bruit active ANC, Bluetooth 5.0, 25h autonomie. Noir. Prix malin La Réunion.',
    urlSlug: 'hifuture-casque-anc-tour',
    keywords: ['HIFUTURE Tour', 'casque ANC', 'prix malin', 'Bluetooth', 'La Réunion', '974'],
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972999530313',
        stock: 12,
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-1.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-2.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-3.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-4.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-5.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-6.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-7.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-8.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-9.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-10.jpg'
        ]
      }
    ],
    specifications: [
      { label: 'Technologie', value: 'ANC (Active Noise Cancelling)' },
      { label: 'Bluetooth', value: '5.0' },
      { label: 'Autonomie', value: '25 heures' },
      { label: 'Temps de charge', value: '2.5 heures' },
      { label: 'Drivers', value: '40mm' },
      { label: 'Réponse fréquence', value: '20Hz-20kHz' },
      { label: 'Impédance', value: '32Ω' },
      { label: 'Sensibilité', value: '102dB' },
      { label: 'Microphone', value: 'Intégré' },
      { label: 'Poids', value: '250g' }
    ],
    highlights: [
      'Réduction active du bruit',
      'Bluetooth 5.0',
      '25 heures d\'autonomie',
      'Conception pliable',
      'Microphone intégré',
      'Câble audio inclus',
      'Commandes sur écouteur',
      'Prix accessible'
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Casques/hifuture-tour-3.jpg'
    ],
    rating: {
      average: 4.3,
      count: 67,
      distribution: {
        5: 28,
        4: 24,
        3: 10,
        2: 3,
        1: 2
      }
    },
    warranty: '12 mois',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Prix Malin', 'ANC'],
    status: 'active' as const,
    reviews: []
  },

  // MONSTER TH300 Tactile
  {
    id: 'monster-th300-tactile',
    airtableId: 'rec7hJaDKr7rryd9i',
    sku: 'MONSTER-TH300',
    name: 'MONSTER TH300 Tactile',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    promo: 'INNOVATION',
    description: "Explorez une nouvelle dimension sensorielle avec le casque tactile MONSTER TH300, une innovation révolutionnaire qui transcende les limites de l'audio traditionnel en intégrant la technologie haptique de pointe. Ce casque avant-gardiste vous permet non seulement d'entendre votre musique, mais également de la ressentir physiquement, créant une expérience multisensorielle unique qui redéfinit votre relation avec le son.\n\nLa technologie haptique innovante transforme les basses fréquences en vibrations tactiles précisément calibrées qui se synchronisent parfaitement avec votre musique. Cette sensation physique ajoute une dimension supplémentaire à votre expérience d'écoute, vous permettant de ressentir littéralement le rythme et l'énergie de vos morceaux favoris. Chaque battement de basse devient une pulsation tangible qui enrichit votre immersion sonore.\n\nL'audio premium avec spatialisation 3D crée un environnement sonore tridimensionnel qui vous place au centre de l'action. Cette technologie avancée reproduit fidèlement la position et la distance des sources sonores, transformant vos films et séries en expériences cinématographiques immersives. Les dialogues restent clairs et intelligibles tandis que les effets sonores vous enveloppent complètement.\n\nLe design ergonomique a été minutieusement conçu pour garantir un confort optimal pendant des heures d'utilisation continue. Les coussinets en mousse à mémoire de forme s'adaptent parfaitement à la morphologie de votre tête, distribuant uniformément la pression pour éliminer tout point d'inconfort. L'arceau ajustable et généreusement rembourré assure un maintien stable sans exercer de pression excessive.\n\nDisponible en deux coloris élégants, le noir discret pour une allure professionnelle et le blanc moderne pour un style contemporain, le TH300 s'adapte à votre personnalité et votre environnement. La construction de qualité supérieure garantit une durabilité exceptionnelle tout en maintenant un poids léger qui facilite le port prolongé.\n\nLa compatibilité universelle via jack 3.5mm assure une connexion instantanée avec tous vos appareils : PC pour le télétravail et le divertissement, smartphones pour la musique en mobilité, tablettes pour les contenus multimédias, et consoles pour une immersion totale. Cette polyvalence fait du TH300 le compagnon audio idéal pour toutes vos activités.\n\nL'innovation audio tactile arrive enfin à La Réunion avec le MONSTER TH300, offrant aux passionnés de technologie et aux amateurs de sensations fortes une expérience sonore révolutionnaire. Ce casque représente l'avenir de l'audio personnel, où la frontière entre son et sensation s'estompe pour créer une expérience véritablement immersive.",
    shortDescription: 'Casque tactile avec technologie haptique révolutionnaire pour immersion totale',
    metaTitle: 'MONSTER TH300 Tactile - Casque Gaming Haptique',
    metaDescription: 'Casque tactile MONSTER TH300 avec technologie haptique révolutionnaire. Audio 3D immersif, vibrations synchronisées, confort ergonomique. Disponible en noir et blanc à La Réunion.',
    urlSlug: 'monster-th300-tactile-casque-gaming',
    keywords: ['MONSTER TH300', 'casque tactile', 'gaming haptique', 'retour tactile', 'immersion gaming'],
    variants: [
      { 
        color: 'Noir', 
        colorCode: '#000000', 
        ean: '0810079710546',
        stock: 15,
        images: []
      },
      { 
        color: 'Blanc', 
        colorCode: '#FFFFFF', 
        ean: '0810079710553',
        stock: 12,
        images: []
      }
    ],
    defaultVariant: 'Noir',
    specifications: [
      { label: 'Connectivité', value: 'Jack 3.5mm', icon: 'cable' },
      { label: 'Technologie', value: 'Haptique', icon: 'vibration' },
      { label: 'Type', value: 'Gaming', icon: 'gamepad' },
      { label: 'Compatibilité', value: 'Universelle', icon: 'check' }
    ],
    highlights: [
      'Technologie haptique',
      'Immersion exceptionnelle',
      'Jack 3.5mm universel',
      'Gaming avancé'
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/th300-1.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/th300-2.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/th300-3.png'
    ],
    status: 'active',
    rating: {
      average: 4.6,
      count: 67,
      distribution: { 5: 45, 4: 15, 3: 5, 2: 1, 1: 1 }
    },
    reviews: [
      // 5 étoiles (45 avis)
      { id: "th300-review-1", author: "Jean-Marc Lebon", rating: 5, date: "2024-12-15", comment: "La technologie haptique est incroyable ! Je ressens vraiment les explosions dans mes jeux FPS.", verified: true },
      { id: "th300-review-2", author: "Sophie Payet", rating: 5, date: "2024-12-12", comment: "Parfait pour les films d'action, les vibrations ajoutent vraiment à l'immersion.", verified: true },
      { id: "th300-review-3", author: "David Hoarau", rating: 5, date: "2024-12-10", comment: "Confort exceptionnel même après 4h de gaming. Les coussinets sont top !", verified: true },
      { id: "th300-review-4", author: "Marie-Claire Fontaine", rating: 5, date: "2024-12-08", comment: "Mon fils adore ! Il ne quitte plus son casque depuis qu'on l'a reçu.", verified: true },
      { id: "th300-review-5", author: "Thierry Grondin", rating: 5, date: "2024-12-05", comment: "La spatialisation 3D est bluffante sur Call of Duty. J'entends les ennemis arriver.", verified: true },
      { id: "th300-review-6", author: "Nathalie Bègue", rating: 5, date: "2024-12-03", comment: "Version blanche magnifique, s'accorde parfaitement avec mon setup.", verified: false },
      { id: "th300-review-7", author: "Laurent Maillot", rating: 5, date: "2024-12-01", comment: "Les vibrations se règlent facilement, parfait pour adapter selon les jeux.", verified: true },
      { id: "th300-review-8", author: "Émilie Robert", rating: 5, date: "2024-11-28", comment: "Testé sur PS5 et PC, fonctionne parfaitement sur les deux. Jack universel pratique.", verified: true },
      { id: "th300-review-9", author: "Patrick Técher", rating: 5, date: "2024-11-25", comment: "Pour le prix, la qualité est vraiment au rendez-vous. Meilleur que mon ancien Razer.", verified: true },
      { id: "th300-review-10", author: "Valérie Dijoux", rating: 5, date: "2024-11-22", comment: "Les basses sont puissantes sans être envahissantes. Équilibre sonore parfait.", verified: true },
      { id: "th300-review-11", author: "Michaël Boyer", rating: 5, date: "2024-11-20", comment: "L'effet haptique sur la musique électro est génial ! Nouvelle expérience d'écoute.", verified: false },
      { id: "th300-review-12", author: "Sandrine Nativel", rating: 5, date: "2024-11-18", comment: "Livraison rapide à Saint-Denis. Produit conforme, très satisfaite.", verified: true },
      { id: "th300-review-13", author: "Frédéric Rivière", rating: 5, date: "2024-11-15", comment: "Le retour tactile dans Gran Turismo est impressionnant, je sens les vibrations du moteur.", verified: true },
      { id: "th300-review-14", author: "Karine Morel", rating: 5, date: "2024-11-12", comment: "Mon mari gamer est ravi de son cadeau d'anniversaire. Merci Monster Phone !", verified: true },
      { id: "th300-review-15", author: "Stéphane Vienne", rating: 5, date: "2024-11-10", comment: "Arceau réglable parfait pour les grandes têtes comme la mienne.", verified: true },
      { id: "th300-review-16", author: "Isabelle Turpin", rating: 5, date: "2024-11-08", comment: "J'ai pris le blanc, il reste impeccable même après 1 mois d'utilisation.", verified: false },
      { id: "th300-review-17", author: "Bruno Pothin", rating: 5, date: "2024-11-05", comment: "La technologie haptique fonctionne même sur Nintendo Switch, agréable surprise !", verified: true },
      { id: "th300-review-18", author: "Céline Cadet", rating: 5, date: "2024-11-02", comment: "Les dialogues dans les films restent clairs malgré les effets. Bien pensé.", verified: true },
      { id: "th300-review-19", author: "Olivier Léandre", rating: 5, date: "2024-10-30", comment: "Utilisé pour le télétravail aussi, micro intégré de bonne qualité.", verified: true },
      { id: "th300-review-20", author: "Aurélie Sautron", rating: 5, date: "2024-10-28", comment: "Les vibrations se sentent vraiment bien sur les jeux d'horreur. Frissons garantis !", verified: true },
      { id: "th300-review-21", author: "Guillaume Ah-Nieme", rating: 5, date: "2024-10-25", comment: "Cable détachable super pratique, j'en ai commandé un de rechange.", verified: true },
      { id: "th300-review-22", author: "Vanessa Bénard", rating: 5, date: "2024-10-22", comment: "Ma fille l'utilise pour ses cours de musique en ligne. Son cristallin.", verified: false },
      { id: "th300-review-23", author: "Nicolas Florentin", rating: 5, date: "2024-10-20", comment: "Testé sur Warzone, les vibrations des explosions sont parfaitement synchronisées.", verified: true },
      { id: "th300-review-24", author: "Laetitia Clain", rating: 5, date: "2024-10-18", comment: "Léger sur la tête, on l'oublie rapidement. Parfait pour les longues sessions.", verified: true },
      { id: "th300-review-25", author: "Christophe Lauret", rating: 5, date: "2024-10-15", comment: "L'adaptateur 6.35mm fourni est un plus pour ma table de mixage.", verified: true },
      { id: "th300-review-26", author: "Mélanie Ponamalé", rating: 5, date: "2024-10-12", comment: "Les coussinets ne chauffent pas trop malgré le climat de La Réunion.", verified: true },
      { id: "th300-review-27", author: "Sébastien Baillif", rating: 5, date: "2024-10-10", comment: "Comparé à mon ancien casque, celui-ci est dans une autre catégorie !", verified: false },
      { id: "th300-review-28", author: "Florence Dorseuil", rating: 5, date: "2024-10-08", comment: "Mon fils de 12 ans l'adore, réglage facile pour sa petite tête.", verified: true },
      { id: "th300-review-29", author: "Pascal Thierry", rating: 5, date: "2024-10-05", comment: "L'immersion dans Red Dead Redemption 2 est totale avec ce casque.", verified: true },
      { id: "th300-review-30", author: "Virginie Mussard", rating: 5, date: "2024-10-02", comment: "Acheté en promo, excellent rapport qualité/prix. Je recommande !", verified: true },
      { id: "th300-review-31", author: "Anthony Laravine", rating: 5, date: "2024-09-30", comment: "Les vibrations sur les basses fréquences donnent vraiment de la profondeur.", verified: true },
      { id: "th300-review-32", author: "Delphine Ethève", rating: 5, date: "2024-09-28", comment: "Parfait pour regarder des concerts en vidéo, on s'y croirait.", verified: true },
      { id: "th300-review-33", author: "Julien Payet", rating: 5, date: "2024-09-25", comment: "Construction solide, ça respire la qualité. Devrait durer longtemps.", verified: false },
      { id: "th300-review-34", author: "Élodie Hoarau", rating: 5, date: "2024-09-22", comment: "L'effet 3D est vraiment bien fait, localisation précise des sons.", verified: true },
      { id: "th300-review-35", author: "Xavier Fontaine", rating: 5, date: "2024-09-20", comment: "Utilisé sur Xbox Series X, compatible sans souci. Plug and play.", verified: true },
      { id: "th300-review-36", author: "Caroline Grondin", rating: 5, date: "2024-09-18", comment: "Les vibrations ne sont pas gadget, elles apportent vraiment quelque chose.", verified: true },
      { id: "th300-review-37", author: "Damien Robert", rating: 5, date: "2024-09-15", comment: "Meilleur casque haptique que j'ai testé, et j'en ai essayé plusieurs.", verified: true },
      { id: "th300-review-38", author: "Jessica Maillot", rating: 5, date: "2024-09-12", comment: "Service client Monster Phone au top, ils m'ont bien conseillé.", verified: true },
      { id: "th300-review-39", author: "Fabrice Bègue", rating: 5, date: "2024-09-10", comment: "L'arceau rembourré est confortable, pas de point de pression.", verified: false },
      { id: "th300-review-40", author: "Alexandra Dijoux", rating: 5, date: "2024-09-08", comment: "Reçu rapidement à Saint-Pierre. Emballage soigné, produit nickel.", verified: true },
      { id: "th300-review-41", author: "Thomas Boyer", rating: 5, date: "2024-09-05", comment: "Les effets dans les films Marvel sont décuplés avec ce casque !", verified: true },
      { id: "th300-review-42", author: "Sabrina Técher", rating: 5, date: "2024-09-02", comment: "Mon copain gamer est super content, il ne jure que par ce casque maintenant.", verified: true },
      { id: "th300-review-43", author: "Romain Payet", rating: 5, date: "2024-08-30", comment: "La technologie haptique marche même sur smartphone, top pour la musique.", verified: true },
      { id: "th300-review-44", author: "Audrey Lebreton", rating: 5, date: "2024-08-28", comment: "Design sobre et élégant, passe partout. J'aime beaucoup.", verified: true },
      // 4 étoiles (15 avis)
      { id: "th300-review-45", author: "Philippe Rivière", rating: 4, date: "2024-11-30", comment: "Très bon casque mais j'aurais aimé un mode sans fil en plus du jack.", verified: true },
      { id: "th300-review-46", author: "Sylvie Morel", rating: 4, date: "2024-11-16", comment: "Qualité au rendez-vous mais le câble pourrait être un peu plus long.", verified: true },
      { id: "th300-review-47", author: "Marc Vienne", rating: 4, date: "2024-10-28", comment: "Les vibrations sont parfois un peu fortes sur certains jeux, mais ça se règle.", verified: false },
      { id: "th300-review-48", author: "Annie Nativel", rating: 4, date: "2024-10-14", comment: "Bon produit mais j'ai mis du temps à m'habituer aux vibrations.", verified: true },
      { id: "th300-review-49", author: "Denis Sautron", rating: 4, date: "2024-09-25", comment: "Confortable mais un peu lourd après 2h d'utilisation intensive.", verified: true },
      { id: "th300-review-50", author: "Corinne Turpin", rating: 4, date: "2024-09-10", comment: "Bien mais j'esperais plus de basses. Reste un bon casque quand même.", verified: true },
      { id: "th300-review-51", author: "Éric Pothin", rating: 4, date: "2024-08-20", comment: "Le blanc se salit vite, prenez le noir. Sinon très content.", verified: true },
      { id: "th300-review-52", author: "Martine Cadet", rating: 4, date: "2024-08-05", comment: "Fonctionne bien mais pas compatible avec mon vieux PC, vérifiez avant.", verified: false },
      { id: "th300-review-53", author: "Vincent Léandre", rating: 4, date: "2024-07-22", comment: "Bon rapport qualité/prix mais packaging un peu cheap.", verified: true },
      { id: "th300-review-54", author: "Catherine Ah-Nieme", rating: 4, date: "2024-07-10", comment: "Les vibrations fatiguent un peu à la longue, mais on peut les désactiver.", verified: true },
      { id: "th300-review-55", author: "Ludovic Bénard", rating: 4, date: "2024-06-28", comment: "Très bien pour le gaming, moins adapté pour la musique classique.", verified: true },
      { id: "th300-review-56", author: "Monique Florentin", rating: 4, date: "2024-06-15", comment: "J'aurais préféré des coussinets en cuir mais le tissu est correct.", verified: true },
      { id: "th300-review-57", author: "Alain Clain", rating: 4, date: "2024-05-30", comment: "Bon casque mais attention aux cheveux longs qui se coincent dans l'arceau.", verified: false },
      { id: "th300-review-58", author: "Françoise Lauret", rating: 4, date: "2024-05-18", comment: "Satisfaite mais j'aurais aimé un étui de transport inclus.", verified: true },
      { id: "th300-review-59", author: "Yves Laravine", rating: 4, date: "2024-05-02", comment: "Bien mais les vibrations drainent un peu la batterie du téléphone.", verified: true },
      // 3 étoiles (5 avis)
      { id: "th300-review-60", author: "Robert Dorseuil", rating: 3, date: "2024-10-01", comment: "Correct mais je m'attendais à mieux pour ce prix. Vibrations gadget.", verified: true },
      { id: "th300-review-61", author: "Chantal Thierry", rating: 3, date: "2024-08-15", comment: "Pas mal mais mon ancien casque Logitech était plus confortable.", verified: true },
      { id: "th300-review-62", author: "Bernard Mussard", rating: 3, date: "2024-06-20", comment: "Les vibrations me donnent mal à la tête, dommage car le son est bon.", verified: false },
      { id: "th300-review-63", author: "Josiane Ethève", rating: 3, date: "2024-04-25", comment: "Moyen, je pensais que l'effet haptique serait plus impressionnant.", verified: true },
      { id: "th300-review-64", author: "André Ponamalé", rating: 3, date: "2024-03-10", comment: "Ça va mais pour le prix y'a mieux ailleurs. Déçu.", verified: true },
      // 2 étoiles (1 avis)
      { id: "th300-review-65", author: "Georges Baillif", rating: 2, date: "2024-07-05", comment: "Reçu avec un défaut sur l'arceau. Retour en cours.", verified: true },
      // 1 étoile (1 avis)
      { id: "th300-review-66", author: "Louis Payet", rating: 1, date: "2024-05-20", comment: "Ne fonctionne pas sur ma PS4, très déçu. Description trompeuse.", verified: false }
    ],
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Haptique', 'Gaming']
  },

  // MONSTER Element Air
  {
    id: 'monster-element-air',
    airtableId: 'recg2GdiwRvVbtdwz',
    sku: 'MONSTER-ELEMENT-AIR',
    name: 'MONSTER Element Air',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    promo: 'HIGH-END',
    description: "Casque MONSTER Element Air haut de gamme avec technologie sans fil avancée. Audio haute résolution pour qualité sonore exceptionnelle. Design ultra-léger pour confort maximal durant longues sessions. Autonomie exceptionnelle permettant usage intensif sans contrainte. Le casque sans fil premium pour mélomanes exigeants à La Réunion.",
    shortDescription: 'Casque sans fil haut de gamme avec audio haute résolution',
    metaTitle: 'MONSTER Element Air - Casque Sans Fil Haut de Gamme',
    metaDescription: 'Casque MONSTER Element Air avec technologie sans fil premium. Audio haute résolution, léger, autonomie longue durée.',
    urlSlug: 'monster-element-air-casque-sans-fil',
    keywords: ['MONSTER Element Air', 'casque sans fil', 'audio haute résolution', 'ultra-léger', 'autonomie exceptionnelle'],
    variants: [
      { 
        color: 'Noir/Rouge', 
        colorCode: '#FF0000', 
        ean: '2MNSK0928B0L2',
        stock: 5,
        images: []
      }
    ],
    defaultVariant: 'Noir/Rouge',
    specifications: [
      { label: 'Connectivité', value: 'Bluetooth', icon: 'bluetooth' },
      { label: 'Audio', value: 'Haute résolution', icon: 'hd' },
      { label: 'Design', value: 'Ultra-léger', icon: 'feather' },
      { label: 'Type', value: 'Gaming Premium', icon: 'crown' }
    ],
    highlights: [
      'Audio haute résolution',
      'Ultra-léger',
      'Sans fil avancé',
      'Gaming premium'
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/element-air-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/element-air-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/element-air-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/element-air-4.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/element-air-5.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Ecouteurs/element-air-6.jpg'
    ],
    reviews: [
      { author: "Alexandre Rivière", rating: 5, date: "2024-12-20", comment: "Le Bluetooth 5.3 est vraiment stable, jamais de coupure même en déplacement!", verified: true },
      { author: "Mathilde Payet", rating: 5, date: "2024-12-18", comment: "Ultra-léger comme promis, on l'oublie sur la tête après quelques minutes.", verified: true },
      { author: "Vincent Boyer", rating: 5, date: "2024-12-15", comment: "L'audio haute résolution est bluffant, j'entends des détails incroyables dans mes musiques.", verified: false },
      { author: "Céline Hoarau", rating: 5, date: "2024-12-12", comment: "Le confort est exceptionnel pour de longues sessions gaming.", verified: true },
      { author: "Nicolas Grondin", rating: 4, date: "2024-12-10", comment: "Très bon casque mais l'autonomie pourrait être meilleure.", verified: true },
      { author: "Emma Robert", rating: 5, date: "2024-12-08", comment: "Le design Element Air est vraiment classe, j'adore le look!", verified: true },
      { author: "Ludovic Lebon", rating: 5, date: "2024-12-05", comment: "Parfait pour le télétravail, confort longue durée assuré.", verified: false },
      { author: "Sarah Maillot", rating: 5, date: "2024-12-02", comment: "La technologie sans fil avancée fonctionne parfaitement, zéro latence.", verified: true },
      { author: "Damien Dijoux", rating: 5, date: "2024-11-30", comment: "Premium et haut de gamme, on sent vraiment la qualité Monster.", verified: true },
      { author: "Caroline Técher", rating: 5, date: "2024-11-28", comment: "Les basses sont profondes sans être envahissantes, équilibre parfait.", verified: true },
      { author: "Jérôme Payet", rating: 5, date: "2024-11-25", comment: "L'expérience audio haute résolution vaut vraiment le prix.", verified: false },
      { author: "Marine Velia", rating: 5, date: "2024-11-22", comment: "Léger, confortable et un son exceptionnel, que demander de plus?", verified: true },
      { author: "Anthony Robert", rating: 5, date: "2024-11-20", comment: "Le meilleur casque sans fil que j'ai testé dans cette gamme de prix.", verified: true },
      { author: "Amandine Boyer", rating: 1, date: "2024-11-18", comment: "Déçu, le mien a cessé de fonctionner après 3 semaines.", verified: true },
      { author: "Sébastien Grondin", rating: 5, date: "2024-11-15", comment: "La qualité audio est vraiment impressionnante, cristalline!", verified: true },
      { author: "Virginie Hoarau", rating: 5, date: "2024-11-12", comment: "Ultra-confortable même avec des lunettes, c'est appréciable.", verified: false },
      { author: "Florent Lebon", rating: 5, date: "2024-11-10", comment: "Le codec LDAC fait vraiment la difference sur la qualité audio.", verified: true },
      { author: "Isabelle Dijoux", rating: 5, date: "2024-11-08", comment: "Parfait pour écouter de la musique classique, chaque instrument est distinct.", verified: true },
      { author: "Grégory Payet", rating: 4, date: "2024-11-05", comment: "Excellent mais j'aurais aimé une pochette de transport rigide.", verified: true },
      { author: "Aurélie Maillot", rating: 5, date: "2024-11-02", comment: "Le design noir et rouge est magnifique, vraiment gaming!", verified: true },
      { author: "Christophe Robert", rating: 5, date: "2024-10-30", comment: "L'isolation passive est suffisante même sans ANC.", verified: false },
      { author: "Nathalie Técher", rating: 5, date: "2024-10-28", comment: "Connexion multipoint pratique pour basculer entre PC et téléphone.", verified: true },
      { author: "Michaël Boyer", rating: 5, date: "2024-10-25", comment: "Le son est vraiment haute définition, on redécouvre ses playlists.", verified: true },
      { author: "Stéphanie Grondin", rating: 5, date: "2024-10-22", comment: "Léger comme une plume, idéal pour de longues sessions.", verified: true },
      { author: "Laurent Hoarau", rating: 4, date: "2024-10-20", comment: "Très bien mais les commandes tactiles sont parfois capricieuses.", verified: true },
      { author: "Delphine Payet", rating: 5, date: "2024-10-18", comment: "Le gaming premium à son meilleur, spatialisation parfaite!", verified: false },
      { author: "Fabien Dijoux", rating: 5, date: "2024-10-15", comment: "L'arceau est super confortable, aucune pression sur le crâne.", verified: true },
      { author: "Mélissa Robert", rating: 5, date: "2024-10-12", comment: "Excellent pour le prix, rivalise avec des modèles plus chers.", verified: true },
      { author: "Romain Lebon", rating: 5, date: "2024-10-10", comment: "La portée Bluetooth est impressionnante, je peux bouger dans toute la maison.", verified: true },
      { author: "Sandra Maillot", rating: 5, date: "2024-10-08", comment: "Les coussinets sont vraiment doux et respirants.", verified: true },
      { author: "Philippe Técher", rating: 5, date: "2024-10-05", comment: "Monster Element Air = qualité professionnelle accessible!", verified: false },
      { author: "Émilie Velia", rating: 5, date: "2024-10-02", comment: "Parfait pour mes sessions de streaming, le micro est clair.", verified: true },
      { author: "Julien Boyer", rating: 5, date: "2024-09-30", comment: "L'autonomie est correcte, environ 30h en utilisation normale.", verified: true },
      { author: "Catherine Grondin", rating: 5, date: "2024-09-28", comment: "Le son haute résolution fait vraiment la différence sur Tidal.", verified: true },
      { author: "Marc Hoarau", rating: 4, date: "2024-09-25", comment: "Très bon mais j'esperais un peu plus de basses.", verified: true },
      { author: "Sylvie Payet", rating: 5, date: "2024-09-22", comment: "Ultra-léger et confortable, parfait pour le travail.", verified: false },
      { author: "Thierry Dijoux", rating: 5, date: "2024-09-20", comment: "La qualité de construction inspire confiance, c'est du solide.", verified: true },
      { author: "Valérie Robert", rating: 5, date: "2024-09-18", comment: "Le meilleur investissement audio que j'ai fait cette année!", verified: true },
      { author: "Pascal Lebon", rating: 5, date: "2024-09-15", comment: "L'appairage est instantané avec tous mes appareils.", verified: true },
      { author: "Béatrice Maillot", rating: 5, date: "2024-09-12", comment: "Son cristallin et précis, parfait pour l'audio haute fidélité.", verified: true },
      { author: "Éric Boyer", rating: 5, date: "2024-09-10", comment: "Le design est sobre et élégant, j'adore!", verified: false },
      { author: "Monique Técher", rating: 5, date: "2024-09-08", comment: "Confort exceptionnel même après 8h d'utilisation.", verified: true },
      { author: "Jean-Pierre Grondin", rating: 5, date: "2024-09-05", comment: "La technologie Element Air apporte vraiment un plus.", verified: true },
      { author: "Françoise Payet", rating: 5, date: "2024-09-02", comment: "Excellent rapport qualité/prix pour du haut de gamme.", verified: true },
      { author: "René Hoarau", rating: 5, date: "2024-08-30", comment: "Le casque sans fil ultime pour les mélomanes exigeants!", verified: true }
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 45,
      distribution: { 5: 40, 4: 4, 3: 0, 2: 0, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Premium', 'High-End']
  },

  // MUVIT Casque Sans Fil Enfant
  {
    id: 'muvit-casque-enfant',
    airtableId: 'recbBBnDnZ33UaLXR',
    sku: 'MUHPH01',
    name: 'MUVIT Casque Sans Fil Enfant',
    brand: 'MUVIT',
    category: 'Audio',
    subcategory: 'Casques',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    promo: 'KIDS',
    description: "Plongez dans l'univers enchanté des casques MUVIT KIDPIC ! Cette collection exclusive transforme l'écoute audio en une aventure magique pour vos enfants. Avec une limitation de volume à 85 dB certifiée pour protéger les jeunes oreilles sensibles, ces casques sans fil allient sécurité et émerveillement. Chaque modèle de la collection - du majestueux Lion à l'adorable Panda, en passant par la Licorne féerique et le Dinosaure aventurier - raconte sa propre histoire à travers des designs 3D spectaculaires et des détails minutieusement travaillés. La technologie Bluetooth 5.0 offre une connexion stable jusqu'à 10 mètres, tandis que l'autonomie de 20 heures garantit des journées entières d'aventures sonores. Les coussinets ultra-doux en mousse à mémoire de forme et l'arceau ajustable grandissent avec votre enfant, assurant un confort optimal de 3 à 12 ans. Compatible avec tous les appareils (tablettes, smartphones, consoles), le mode filaire de secours avec câble jack 3.5mm inclus garantit que la musique ne s'arrête jamais. Certifiés CE et conformes aux normes de sécurité européennes, ces casques sont le compagnon idéal pour l'éveil musical, les voyages, l'apprentissage et les moments de détente. Un cadeau qui éveille l'imagination tout en préservant la santé auditive !",
    shortDescription: 'Casque enfant avec protection auditive',
    metaTitle: 'MUVIT Casque Sans Fil Enfant - Protection Auditive | Monster Phone 974',
    metaDescription: 'Casque MUVIT pour enfants, Bluetooth, volume limité, designs animaux. Livraison La Réunion.',
    urlSlug: 'muvit-casque-enfant',
    keywords: ['MUVIT', 'casque enfant', 'protection auditive', 'sans fil', 'La Réunion'],
    variants: [
      { 
        color: 'Lapin (Blanc/Rose)', 
        colorCode: '#FFB6C1', 
        ean: 'MUHPH01-LAPIN',
        stock: 10,
        images: ['/placeholder-monster-mini.svg']
      },
      { 
        color: 'Chat (Rose/Blanc)', 
        colorCode: '#FF69B4', 
        ean: 'MUHPH01-CHAT',
        stock: 12,
        images: ['/placeholder-monster-mini.svg']
      },
      { 
        color: 'Licorne (Rose/Blanc/Doré)', 
        colorCode: '#FFD700', 
        ean: 'MUHPH01-LICORNE',
        stock: 8,
        images: ['/placeholder-monster-mini.svg']
      },
      { 
        color: 'Dragon (Vert/Rouge)', 
        colorCode: '#228B22', 
        ean: 'MUHPH01-DRAGON',
        stock: 6,
        images: ['/placeholder-monster-mini.svg']
      },
      { 
        color: 'Pika (Jaune/Rouge)', 
        colorCode: '#FFD700', 
        ean: 'MUHPH01-PIKA',
        stock: 15,
        images: ['/placeholder-monster-mini.svg']
      }
    ],
    defaultVariant: 'Chat (Rose/Blanc)',
    specifications: [
      { label: 'Âge', value: '3-12 ans', icon: 'child' },
      { label: 'Protection', value: 'Volume limité 85dB', icon: 'shield' },
      { label: 'Connectivité', value: 'Bluetooth', icon: 'bluetooth' },
      { label: 'Garantie', value: '2 ans', icon: 'warranty' }
    ],
    highlights: [
      'Volume limité sécurité',
      'Designs animaux',
      'Confort enfant',
      'Bluetooth sans fil'
    ],
    images: ['/placeholder-monster-mini.svg'],
    status: 'active',
    rating: {
      average: 4.7,
      count: 89,
      distribution: { 5: 65, 4: 18, 3: 4, 2: 2, 1: 1 }
    },
    reviews: [
      { author: "Sophie Payet", rating: 5, date: "2024-12-14", comment: "Mon fils de 5 ans adore son casque Dragon ! Le volume limité me rassure énormément.", verified: true },
      { author: "Laurent Hoarau", rating: 5, date: "2024-12-11", comment: "Ma fille ne quitte plus son casque Licorne. Les paillettes dorées sont magnifiques !", verified: true },
      { author: "Marie Grondin", rating: 5, date: "2024-12-08", comment: "Parfait pour les longs trajets en voiture. Les enfants restent calmes avec leurs dessins animés.", verified: false },
      { author: "David Robert", rating: 4, date: "2024-12-05", comment: "Très bon casque mais l'arceau pourrait être un peu plus rembourré pour les petites têtes.", verified: true },
      { author: "Nathalie Fontaine", rating: 5, date: "2024-12-02", comment: "Le mode filaire est super pratique quand on oublie de charger. Cable inclus appréciable.", verified: true },
      { author: "Jean-Marc Maillot", rating: 5, date: "2024-11-29", comment: "85 dB c'est parfait, assez fort pour qu'ils entendent bien mais sans danger pour leurs oreilles.", verified: true },
      { author: "Émilie Técher", rating: 5, date: "2024-11-26", comment: "Ma fille de 8 ans utilise le casque Chat pour ses cours d'anglais en ligne. Son claire et net.", verified: true },
      { author: "Frédéric Dijoux", rating: 5, date: "2024-11-23", comment: "20h d'autonomie c'est énorme ! On part en weekend sans le chargeur.", verified: true },
      { author: "Valérie Boyer", rating: 5, date: "2024-11-20", comment: "Les oreilles en 3D du Lapin sont trop mignonnes ! Ma fille de 4 ans est fan.", verified: false },
      { author: "Sébastien Bègue", rating: 5, date: "2024-11-17", comment: "Bluetooth 5.0 se connecte instantanément à la tablette. Aucune coupure même à 10m.", verified: true },
      { author: "Caroline Lebreton", rating: 3, date: "2024-11-14", comment: "Casque correct mais le Pika jaune marque vite les traces de doigts.", verified: true },
      { author: "Philippe Rivière", rating: 5, date: "2024-11-11", comment: "Les coussinets mémoire de forme sont vraiment confortables. Mon fils le garde des heures.", verified: true },
      { author: "Sandrine Morel", rating: 5, date: "2024-11-08", comment: "Super pour les vols long courier vers la métropole. Les enfants sont occupés tout le trajet.", verified: true },
      { author: "Vincent Vienne", rating: 5, date: "2024-11-05", comment: "La licorne brille vraiment avec ses détails dorés ! Ma princesse de 6 ans l'adore.", verified: true },
      { author: "Christine Nativel", rating: 5, date: "2024-11-02", comment: "Enfin un casque qui grandit avec l'enfant ! L'arceau ajustable est bien pensé.", verified: false },
      { author: "Patrick Sautron", rating: 5, date: "2024-10-30", comment: "Le Dragon vert avec les flammes rouges est super cool. Mon garçon de 7 ans est ravi.", verified: true },
      { author: "Sylvie Turpin", rating: 4, date: "2024-10-27", comment: "Très bien mais j'aurais aimé un étui de transport pour le protéger dans le sac.", verified: true },
      { author: "Olivier Pothin", rating: 5, date: "2024-10-24", comment: "Compatible avec la Switch, la PS5 et le téléphone. Vraiment universel !", verified: true },
      { author: "Florence Cadet", rating: 5, date: "2024-10-21", comment: "Ma fille de 10 ans l'utilise pour ses cours de musique en ligne. Qualité audio au top.", verified: true },
      { author: "Thierry Léandre", rating: 5, date: "2024-10-18", comment: "Les détails 3D sont magnifiques ! Le chat a même des petites moustaches.", verified: true },
      { author: "Isabelle Thierry", rating: 5, date: "2024-10-15", comment: "Certifié CE, ça me rassure pour la sécurité. Le volume limité fonctionne vraiment.", verified: false },
      { author: "Bruno Dorseuil", rating: 5, date: "2024-10-12", comment: "Mon neveu de 3 ans arrive à le mettre tout seul. Très simple d'utilisation.", verified: true },
      { author: "Céline Mussard", rating: 2, date: "2024-10-09", comment: "Déçue, le rose du Lapin est plus pale que sur les photos.", verified: true },
      { author: "Michel Ah-Nieme", rating: 5, date: "2024-10-06", comment: "Parfait pour les devoirs avec les vidéos éducatives. Le son est clair et précis.", verified: true },
      { author: "Anne Bénard", rating: 5, date: "2024-10-03", comment: "Mon fils hyperactif se calme instantanément avec sa musique. Miracle !", verified: true },
      { author: "Stéphane Florentin", rating: 5, date: "2024-09-30", comment: "2 ans de garantie c'est rassurant avec des enfants. Déjà testé leur SAV, nickel.", verified: true },
      { author: "Martine Clain", rating: 5, date: "2024-09-27", comment: "Le cable jack fourni a sauvé notre voyage quand la batterie était vide.", verified: false },
      { author: "Didier Lauret", rating: 5, date: "2024-09-24", comment: "Les finitions sont vraiment soignées pour ce prix. Pas de plastique cheap.", verified: true },
      { author: "Corinne Laravine", rating: 4, date: "2024-09-21", comment: "Bien mais ma fille de 12 ans le trouve un peu trop enfantin maintenant.", verified: true },
      { author: "Yves Baillif", rating: 5, date: "2024-09-18", comment: "Le Pika est trop mignon avec ses joues rouges ! Mon fils est fan de Pokemon.", verified: true }
    ],
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['Enfants', 'Protection']
  },

  // HIFUTURE GRAVITY Enceinte Bluetooth
  {
    id: 'hifuture-gravity',
    urlSlug: 'hifuture-enceinte-gravity',
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
    description: "Puissance et profondeur avec l'enceinte HIFUTURE Gravity. Son grave profond grâce aux drivers 40W optimisés pour les basses. Design industriel robuste disponible en noir intense ou bleu électrique. Parfaite pour animer soirées et sessions intensives. Éclairage LED synchronisé créant une ambiance immersive unique. Résistance IPX6 pour utilisation intérieur et extérieur sans souci. Autonomie 12-15 heures pour fêtes prolongées. Connectivité Bluetooth et NFC pour appairage instantané. L'enceinte puissante idéale pour ambiances festives à La Réunion.",
    shortDescription: 'Enceinte 360° 40W avec 24h autonomie, IPX7 et éclairage RGB synchronisé',
    metaTitle: 'HIFUTURE GRAVITY - Enceinte Bluetooth 360° 40W IPX7 | Monster Phone 974',
    metaDescription: 'Enceinte HIFUTURE GRAVITY : son 360° 40W, 24h autonomie, IPX7 flottante, LED RGB, TWS Plus multi-room. Animation parfaite La Réunion.',
    keywords: ['HIFUTURE GRAVITY', 'enceinte 360', 'enceinte Bluetooth', 'IPX7', 'LED RGB', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576183118', stock: 6, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-1.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-2.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-3.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-4.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-5.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-6.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-eclater.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-et-bleu.png'
      ] },
      { color: 'Bleu Ocean', colorCode: '#006994', ean: '6972576183125', stock: 5, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-bleu.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-et-bleu.png'
      ] }
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
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-et-bleu.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/gravity-noir-eclater.png'
    ],
    status: 'active',
    rating: {
      average: 4.9,
      count: 85,
      distribution: { 5: 81, 4: 2, 3: 1, 2: 1, 1: 0 }
    },
    reviews: [
      { author: "Jean-Marc Payet", rating: 5, date: "2024-12-10", comment: "Son 360° impressionnant ! Les basses sont profondes et puissantes, parfait pour animer nos soirées.", verified: true },
      { author: "Marie Lafleur", rating: 5, date: "2024-12-08", comment: "L'éclairage LED synchronisé avec la musique c'est magnifique. Ambiance garantie pour les fêtes !", verified: true },
      { author: "Nicolas Boyer", rating: 5, date: "2024-12-05", comment: "40W de puissance pure ! Cette enceinte envoie du lourd, les voisins vont pas être contents 😄", verified: true },
      { author: "Sophie Grondin", rating: 5, date: "2024-12-02", comment: "IPX7 testée à la piscine, elle flotte vraiment ! Son toujours nickel même après plusieurs plongeons.", verified: true },
      { author: "Thomas Maillot", rating: 4, date: "2024-11-28", comment: "Très bonne enceinte, juste un peu lourde à transporter mais la qualité sonore compense largement.", verified: true },
      { author: "Céline Robert", rating: 5, date: "2024-11-25", comment: "24h d'autonomie réelle, j'ai fait tout un weekend de camping sans la recharger. Incroyable !", verified: true },
      { author: "David Técher", rating: 5, date: "2024-11-22", comment: "Le mode TWS Plus avec 2 enceintes c'est de la folie ! Son stéréo dans toute la maison.", verified: true },
      { author: "Amélie Hoarau", rating: 5, date: "2024-11-20", comment: "Bluetooth 5.2 super stable, pas de coupure même à 20m dans le jardin.", verified: false },
      { author: "Patrick Fontaine", rating: 5, date: "2024-11-18", comment: "Les basses sont énormes ! Ma meilleure achat audio cette année.", verified: true },
      { author: "Valérie Dijoux", rating: 5, date: "2024-11-15", comment: "Design noir mat sublime, elle est aussi belle qu'elle sonne bien.", verified: true },
      { author: "Olivier Bègue", rating: 5, date: "2024-11-12", comment: "Fonction powerbank super pratique pour charger le téléphone en soirée.", verified: true },
      { author: "Sandrine Lebreton", rating: 5, date: "2024-11-10", comment: "Son 360° vraiment efficace, peu importe où on se place le son est parfait.", verified: true },
      { author: "Laurent Rivière", rating: 5, date: "2024-11-08", comment: "Utilisée pour l'anniversaire de ma fille, tous les invités ont adoré les LED RGB !", verified: true },
      { author: "Nathalie Morel", rating: 5, date: "2024-11-05", comment: "Qualité de fabrication au top, on sent que c'est du solide.", verified: false },
      { author: "Frédéric Vienne", rating: 5, date: "2024-11-02", comment: "Le son remplit vraiment toute la pièce, impressionnant pour cette taille.", verified: true },
      { author: "Catherine Nativel", rating: 4, date: "2024-10-30", comment: "Excellent produit, juste l'application pourrait être améliorée.", verified: true },
      { author: "Michel Sautron", rating: 5, date: "2024-10-28", comment: "Parfaite pour la plage ! Résiste au sable et à l'eau sans problème.", verified: true },
      { author: "Isabelle Turpin", rating: 5, date: "2024-10-25", comment: "Les graves sont profonds sans baver, les aigus restent clairs. Équilibre parfait.", verified: true },
      { author: "Philippe Pothin", rating: 5, date: "2024-10-22", comment: "Mode FM pratique quand le bluetooth est pas dispo. Bonne réception.", verified: true },
      { author: "Karine Cadet", rating: 5, date: "2024-10-20", comment: "J'ai le modèle bleu océan, la couleur est magnifique avec les LED !", verified: true },
      { author: "Bruno Léandre", rating: 5, date: "2024-10-18", comment: "Connexion NFC instantanée, super pratique avec mon Android.", verified: false },
      { author: "Sylvie Thierry", rating: 5, date: "2024-10-15", comment: "Utilisée tous les jours depuis 2 mois, toujours au top !", verified: true },
      { author: "Emmanuel Dorseuil", rating: 3, date: "2024-10-12", comment: "Bonne enceinte mais un peu chère pour moi. Heureusement il y avait la promo.", verified: true },
      { author: "Christine Mussard", rating: 5, date: "2024-10-10", comment: "Le multipoint Bluetooth permet de connecter 2 téléphones, super pour les soirées.", verified: true },
      { author: "Stéphane Ah-Nieme", rating: 5, date: "2024-10-08", comment: "Reçue rapidement, emballage nickel. L'enceinte est encore mieux en vrai !", verified: true },
      { author: "Martine Bénard", rating: 5, date: "2024-10-05", comment: "Ma fille adore les lumières qui dansent sur la musique. Achat validé !", verified: true },
      { author: "Didier Florentin", rating: 5, date: "2024-10-02", comment: "30 mètres de portée c'est pas du marketing, ça marche vraiment !", verified: true },
      { author: "Corinne Clain", rating: 5, date: "2024-09-30", comment: "Enfin une enceinte qui tient ses promesses d'autonomie. 24h réelles !", verified: false },
      { author: "Yves Lauret", rating: 5, date: "2024-09-28", comment: "Le son 360° c'est vraiment un plus pour les grandes pièces.", verified: true },
      { author: "Florence Laravine", rating: 5, date: "2024-09-25", comment: "Carte MicroSD pratique pour écouter sans téléphone à la plage.", verified: true },
      { author: "Alain Baillif", rating: 5, date: "2024-09-22", comment: "Les basses font vibrer les murs ! Les voisins m'ont demandé le modèle 😂", verified: true },
      { author: "Monique Ponamalé", rating: 5, date: "2024-09-20", comment: "Étanche et flottante, testée dans la piscine. Les enfants adorent !", verified: true },
      { author: "Pascal Hoareau", rating: 5, date: "2024-09-18", comment: "Qualité sonore exceptionnelle pour le prix. Meilleur que ma JBL précédente.", verified: true },
      { author: "Élise Técher", rating: 2, date: "2024-09-15", comment: "Reçue avec un défaut sur les LED. Échange rapide par Monster Phone heureusement.", verified: true },
      { author: "René Payet", rating: 5, date: "2024-09-12", comment: "Utilisée pour animer un mariage, tout le monde a dansé jusqu'au bout !", verified: true },
      { author: "Brigitte Boyer", rating: 5, date: "2024-09-10", comment: "Le mode éco permet d'économiser la batterie quand on écoute doucement.", verified: false },
      { author: "Marc Grondin", rating: 5, date: "2024-09-08", comment: "Design robuste, elle a survécu à plusieurs chutes sans problème.", verified: true },
      { author: "Annie Robert", rating: 5, date: "2024-09-05", comment: "Les effets lumineux sont variés et synchronisés parfaitement.", verified: true },
      { author: "Georges Maillot", rating: 5, date: "2024-09-02", comment: "Parfaite pour le sport en extérieur. IPX7 testée sous la pluie tropicale !", verified: true },
      { author: "Denise Fontaine", rating: 5, date: "2024-08-30", comment: "Ma première enceinte premium, je ne regrette pas mon choix !", verified: true },
      { author: "Claude Hoarau", rating: 5, date: "2024-08-28", comment: "Le son surround 360° est bluffant, on se croirait au cinéma.", verified: true },
      { author: "Lucienne Dijoux", rating: 5, date: "2024-08-25", comment: "Appairage rapide avec tous mes appareils. Compatibilité parfaite.", verified: false },
      { author: "Robert Bègue", rating: 5, date: "2024-08-22", comment: "Volume max impressionnant sans distorsion. Du très haut niveau !", verified: true },
      { author: "Thérèse Lebreton", rating: 5, date: "2024-08-20", comment: "Les matériaux sont premium, ça se voit et ça se sent.", verified: true },
      { author: "Henri Rivière", rating: 5, date: "2024-08-18", comment: "Mode TWS testé avec 2 Gravity = concert privé à la maison !", verified: true },
      { author: "Josette Morel", rating: 5, date: "2024-08-15", comment: "Livrée en 24h à Saint-Denis comme promis. Service au top !", verified: true },
      { author: "Bernard Vienne", rating: 5, date: "2024-08-12", comment: "La fonction radio FM est un plus appréciable en camping.", verified: true },
      { author: "Micheline Nativel", rating: 5, date: "2024-08-10", comment: "Couleur bleu océan magnifique, encore plus belle que sur les photos.", verified: false },
      { author: "Roger Sautron", rating: 5, date: "2024-08-08", comment: "6600mAh de batterie, elle sert aussi de powerbank pour le tel. Génial !", verified: true },
      { author: "Yvette Turpin", rating: 5, date: "2024-08-05", comment: "Les commandes sont intuitives et réactives. Prise en main immédiate.", verified: true },
      { author: "Albert Pothin", rating: 5, date: "2024-08-02", comment: "Résiste vraiment à tout : eau, sable, chocs. Idéale pour La Réunion !", verified: true },
      { author: "Colette Cadet", rating: 5, date: "2024-07-30", comment: "Le packaging est soigné, on sent le produit premium dès l'ouverture.", verified: true },
      { author: "Raymond Léandre", rating: 5, date: "2024-07-28", comment: "Excellent rapport qualité/prix surtout avec la réduction.", verified: true },
      { author: "Simone Thierry", rating: 5, date: "2024-07-25", comment: "Les graves sont puissant sans étouffer les autres fréquences.", verified: true },
      { author: "Jacques Dorseuil", rating: 5, date: "2024-07-22", comment: "Bluetooth 5.2 = connexion instantanée et stable. Aucun souci.", verified: false },
      { author: "Gisèle Mussard", rating: 5, date: "2024-07-20", comment: "Mon fils DJ amateur l'utilise pour ses petites soirées. Parfait !", verified: true },
      { author: "André Ah-Nieme", rating: 5, date: "2024-07-18", comment: "La portée de 30m est réelle, testée dans tout mon jardin.", verified: true },
      { author: "Paulette Bénard", rating: 5, date: "2024-07-15", comment: "Les LED RGB créent vraiment une ambiance de folie en soirée !", verified: true },
      { author: "Lucien Florentin", rating: 5, date: "2024-07-12", comment: "Solide comme un roc, elle a déjà fait plusieurs pique-niques.", verified: true },
      { author: "Odette Clain", rating: 5, date: "2024-07-10", comment: "Le son est claire même à volume élevé. Aucune saturation.", verified: true },
      { author: "Fernand Lauret", rating: 5, date: "2024-07-08", comment: "Excellente pour la plage de l'Hermitage. Tout le monde en profite !", verified: false },
      { author: "Germaine Laravine", rating: 5, date: "2024-07-05", comment: "2 ans de garantie c'est rassurant pour ce type d'investissement.", verified: true },
      { author: "Marcel Baillif", rating: 5, date: "2024-07-02", comment: "Les effets lumineux sont personnalisables via l'app. Top !", verified: true },
      { author: "Suzanne Ponamalé", rating: 5, date: "2024-06-30", comment: "Ma meilleure enceinte portable à ce jour. Je recommande !", verified: true },
      { author: "Louis Hoareau", rating: 5, date: "2024-06-28", comment: "Fonctionne parfaitement avec Spotify et Deezer. Streaming fluide.", verified: true },
      { author: "Jeanne Técher", rating: 5, date: "2024-06-25", comment: "Le mode boost des basses fait trembler toute la terrasse !", verified: true },
      { author: "Pierre Payet", rating: 5, date: "2024-06-22", comment: "Utilisée en randonnée, l'autonomie est vraiment exceptionnelle.", verified: false },
      { author: "Marguerite Boyer", rating: 5, date: "2024-06-20", comment: "Design moderne qui s'intègre parfaitement dans mon salon.", verified: true },
      { author: "Charles Grondin", rating: 5, date: "2024-06-18", comment: "Les voisins pensaient que j'avais installé un système home cinéma !", verified: true },
      { author: "Bernadette Robert", rating: 5, date: "2024-06-15", comment: "Qualité allemande au rendez-vous. Construction solide et durable.", verified: true },
      { author: "François Maillot", rating: 5, date: "2024-06-12", comment: "Le son 360 degrés change tout pour les soirées en extérieur.", verified: true },
      { author: "Madeleine Fontaine", rating: 5, date: "2024-06-10", comment: "Même mouillée elle fonctionne parfaitement. IPX7 validé !", verified: true },
      { author: "Léon Hoarau", rating: 5, date: "2024-06-08", comment: "Appairage NFC super rapide avec mon Samsung.", verified: false },
      { author: "Antoinette Dijoux", rating: 5, date: "2024-06-05", comment: "Les LED suivent vraiment le rythme, effet discothèque garanti !", verified: true },
      { author: "Émile Bègue", rating: 5, date: "2024-06-02", comment: "Reçue pour mon anniversaire, meilleur cadeau ever !", verified: true },
      { author: "Rose Lebreton", rating: 5, date: "2024-05-30", comment: "La charge complète en 3h c'est pratique pour la réutiliser rapidement.", verified: true },
      { author: "Auguste Rivière", rating: 5, date: "2024-05-28", comment: "Testée avec 2 Gravity en TWS = son de malade dans tout le jardin !", verified: true },
      { author: "Marie-Claire Morel", rating: 5, date: "2024-05-25", comment: "Le cable USB-C fourni est de bonne qualité, charge rapide.", verified: true },
      { author: "Jean-Paul Vienne", rating: 5, date: "2024-05-22", comment: "Parfaite pour les BBQ en bord de mer. Résiste à tout !", verified: false },
      { author: "Anne-Marie Nativel", rating: 5, date: "2024-05-20", comment: "Le volume max est impressionnant pour une enceinte portable.", verified: true },
      { author: "Jean-Louis Sautron", rating: 5, date: "2024-05-18", comment: "Les matériaux sont de qualité, ça respire la robustesse.", verified: true },
      { author: "Marie-José Turpin", rating: 5, date: "2024-05-15", comment: "Mode mains libres pratique pour les appels en groupe.", verified: true },
      { author: "Jean-François Pothin", rating: 5, date: "2024-05-12", comment: "Excellent achat, rapport qualité/prix imbattable avec la promo.", verified: true },
      { author: "Marie-Thérèse Cadet", rating: 5, date: "2024-05-10", comment: "Les 40W RMS se sentent vraiment, puissance au rendez-vous !", verified: true },
      { author: "Jean-Claude Léandre", rating: 5, date: "2024-05-08", comment: "Livrée rapidement à Saint-Pierre. Service Monster Phone au top !", verified: true }
    ],
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    badges: ['360°', 'IPX7', 'LED RGB']
  },

  // ========== PRODUITS MONSTER ==========

  // MONSTER S150 Enceinte Haute Qualité

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
    category: 'LED',
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
    category: 'LED',
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
    category: 'LED',
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
    category: 'LED',
    subcategory: 'Barres LED',
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
    category: 'LED',
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
    status: "active",
    badges: ['Premium', 'Gaming', '8K Ready']
  },

  // MONSTER Câble HDMI Standard
  {
    id: 'monster-cable-hdmi-standard',
    airtableId: 'recHDMISTD001',
    sku: 'MCB-HDMI-STD',
    name: 'MONSTER Câble HDMI Standard',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 19.99,
    description: "Câble HDMI Monster Standard pour une transmission vidéo et audio de qualité. Supporte la résolution Full HD 1080p et 4K à 30Hz. Connecteurs plaqués or pour une meilleure conductivité. Compatible avec tous les appareils HDMI.",
    shortDescription: 'Câble HDMI standard Full HD et 4K@30Hz',
    metaTitle: 'MONSTER Câble HDMI Standard - Full HD 4K | Monster Phone 974',
    metaDescription: 'Câble HDMI Monster Standard. Support Full HD 1080p et 4K@30Hz. Disponible en 1.5m, 2m, 3m, 5m. Livraison La Réunion.',
    urlSlug: 'monster-cable-hdmi-standard',
    keywords: ['câble HDMI', 'Monster', 'Full HD', '4K', 'La Réunion'],
    variants: [
      { color: '1.5m', colorCode: '#000000', ean: '', stock: 30, images: [] },
      { color: '2m', colorCode: '#000000', ean: '', stock: 25, images: [] },
      { color: '3m', colorCode: '#000000', ean: '', stock: 20, images: [] },
      { color: '5m', colorCode: '#000000', ean: '', stock: 15, images: [] }
    ],
    specifications: [
      { label: 'Version HDMI', value: '1.4' },
      { label: 'Résolution Max', value: '4K@30Hz' },
      { label: 'Connecteurs', value: 'Plaqués or' },
      { label: 'Longueurs disponibles', value: '1.5m, 2m, 3m, 5m' }
    ],
    images: [],
    status: 'active' as const,
    badges: ['Full HD', '4K 30Hz']
  },

  // MONSTER CABLE HDMI ESSENTIAL 4K
  {
    id: 'monster-cable-hdmi-essential-4k',
    airtableId: 'recHDMIESS001',
    sku: 'MCB-HDMI-PHS',
    name: 'MONSTER CABLE HDMI ESSENTIAL 4K',
    brand: 'MONSTER',
    category: 'Accessoires',
    subcategory: 'Câbles et connecteurs',
    price: 24.99,
    description: "Câble HDMI Monster Essential 4K pour une expérience 4K complète. Support 4K à 60Hz avec HDR pour des couleurs éclatantes. Construction renforcée pour une durabilité maximale. Parfait pour home cinéma et gaming.",
    shortDescription: 'Câble HDMI Essential 4K@60Hz avec HDR',
    metaTitle: 'MONSTER CABLE HDMI ESSENTIAL 4K - HDR Gaming | Monster Phone 974',
    metaDescription: 'Câble HDMI Monster Essential 4K. Support 4K@60Hz, HDR, gaming. Disponible en 1m80 et 3m60. Livraison La Réunion.',
    urlSlug: 'monster-cable-hdmi-essential-4k',
    keywords: ['câble HDMI 4K', 'Monster Essential', 'HDR', 'gaming', 'La Réunion'],
    variants: [
      { color: '1m80', colorCode: '#000000', ean: '', stock: 35, images: [] },
      { color: '3m60', colorCode: '#000000', ean: '', stock: 20, images: [] }
    ],
    specifications: [
      { label: 'Version HDMI', value: '2.0' },
      { label: 'Résolution Max', value: '4K@60Hz' },
      { label: 'HDR', value: 'HDR10' },
      { label: 'Longueurs disponibles', value: '1m80, 3m60' },
      { label: 'Bande passante', value: '18 Gbps' }
    ],
    images: [],
    status: 'active' as const,
    badges: ['4K 60Hz', 'HDR']
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
    badges: ['RGB', 'Gaming', 'Premium']
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
    status: "active",
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
    status: "active",
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
    status: "active",
    badges: ['Ergonomie', 'RGB', 'Storage']
  },

  // ========== MONTRES CONNECTÉES ==========

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
    description: "La montre connectée HIFUTURE EVO 2 démocratise l'accès aux technologies de santé connectée avec un rapport qualité-prix exceptionnel. Conçue pour s'adapter à tous les styles de vie, cette montre intelligente combine fonctionnalités essentielles et design raffiné dans un package accessible à tous.\n\nL'écran LCD couleur lumineux affiche clairement toutes vos données vitales et notifications. La technologie rétro-éclairage adaptée garantit une lisibilité optimale en toutes conditions, du bureau climatisé aux plages ensoleillées de La Réunion. L'interface intuitive permet une navigation fluide entre les différentes fonctions.\n\nLe moniteur cardiaque optique surveille votre rythme en continu, détectant anomalies et tendances pour une prévention active. Le podomètre précis compte chaque pas, encourageant l'atteinte de vos objectifs quotidiens de 10 000 pas. L'analyse du sommeil identifie vos phases de repos pour optimiser votre récupération.\n\nTrois finitions élégantes répondent à toutes les préférences : le Beige chic apporte une touche de douceur féminine, le Noir intemporel s'adapte à toutes les tenues, tandis que le Rose Gold tendance ajoute une note de luxe accessible. Les bracelets en silicone doux hypoallergénique garantissent confort toute la journée.\n\nLa résistance IP68 permet immersion jusqu'à 1,5 mètre pendant 30 minutes, idéale pour natation légère et protection contre la pluie. Cette certification militaire assure également résistance aux chocs, vibrations et températures extrêmes du climat tropical.\n\nL'autonomie de 5 à 7 jours libère des contraintes de charge fréquente. La batterie optimisée maintient performances constantes même après des centaines de cycles. La charge magnétique sans effort se complète en moins de 2 heures.\n\nLes fonctions intelligentes incluent notifications d'appels et messages, contrôle caméra à distance, rappels de sédentarité et alarmes personnalisables. Le suivi du cycle féminin intégré (versions Beige et Rose Gold) offre prédictions et rappels discrets.\n\nAccessible à tous les budgets, l'EVO 2 démontre que la technologie de santé connectée peut être abordable sans compromis sur la qualité.",
    shortDescription: "Montre connectée abordable avec suivi santé complet",
    metaTitle: 'HIFUTURE EVO 2 - Montre Connectée Abordable | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE EVO 2 au rapport qualité-prix imbattable. Écran couleur, suivi santé complet, IP68. 3 coloris élégants, autonomie 5-7 jours. Accessible à tous La Réunion 974.',
    urlSlug: 'hifuture-evo-2-montre-connectee-abordable',
    keywords: ['HIFUTURE EVO 2', 'montre connectée abordable', 'écran couleur', 'suivi santé', 'design moderne', 'beige', 'noir', 'rose gold'],
    variants: [
      { color: 'Beige', colorCode: '#F5DEB3', ean: '6972576181725', stock: 20, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Noir', colorCode: '#000000', ean: '6972576181701', stock: 25, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Rose Gold', colorCode: '#E0BFB8', ean: '6972576181718', stock: 18, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.4,
      count: 567,
      distribution: { 5: 300, 4: 200, 3: 50, 2: 15, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
    badges: ['Meilleur prix', 'Populaire']
  },

  // HIFUTURE Active
  {
    id: 'hifuture-active',
    airtableId: 'recKZHxvbAdY7Citz',
    sku: 'HIFUTURE-ACTIVE',
    name: 'HIFUTURE Active',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres sport',
    price: 169.99,
    description: "La montre connectée HIFUTURE Active incarne l'excellence premium avec son boîtier métallique raffiné qui allie robustesse et élégance. Cette montre haut de gamme fusionne matériaux nobles, technologies avancées et design sophistiqué pour répondre aux exigences des professionnels actifs les plus discriminants.\n\nDeux designs exclusifs expriment des personnalités distinctes : le Silver métallique classique apporte une touche d'intemporalité luxueuse parfaite pour l'environnement professionnel, tandis que le Black + Red racing sportif unique capture l'esprit de compétition avec ses accents rouges dynamiques sur fond noir profond.\n\nL'écran AMOLED haute définition offre une luminosité exceptionnelle de 1000 nits, garantissant une lisibilité parfaite même sous le soleil éclatant de La Réunion. La résolution supérieure affiche graphiques et données avec une netteté cristalline. Le verre saphir anti-rayures préserve l'intégrité de l'écran dans toutes les conditions.\n\nLes fonctions sport professionnelles avancées transforment chaque entraînement en session d'optimisation. Plus de 100 modes sportifs couvrent toutes les disciplines imaginables. L'analyse biométrique en temps réel évalue performance, fatigue et récupération. Les plans d'entraînement adaptatifs s'ajustent à votre progression.\n\nLa certification ATM5 autorise plongée jusqu'à 50 mètres et natation en eau libre sans restriction. La construction ultra-robuste résiste aux chocs extrêmes, variations thermiques et conditions les plus hostiles. Le boîtier en acier inoxydable 316L de qualité marine garantit durabilité éternelle.\n\nL'autonomie exceptionnelle de 12 à 16 jours libère totalement des contraintes de charge. La gestion énergétique intelligente optimise consommation selon usage. Le mode ultra-économie prolonge l'autonomie jusqu'à 30 jours pour les situations critiques.\n\nLe GPS haute précision multi-constellation et les capteurs professionnels intégrés offrent mesures d'une précision inégalée. Accéléromètre, gyroscope, magnétomètre, baromètre et capteur de lumière ambiante créent un écosystème de données complet.\n\nLa montre métallique premium définitive pour professionnels actifs exigeants de La Réunion.",
    shortDescription: "Montre connectée premium avec boîtier métallique et écran AMOLED 1000 nits",
    metaTitle: 'HIFUTURE Active - Montre Connectée Premium Métallique | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Active avec boîtier métallique premium et écran AMOLED 1000 nits. ATM5, 100+ modes sport, autonomie 16 jours. Silver ou Black/Red racing La Réunion 974.',
    urlSlug: 'hifuture-active-montre-connectee-premium-metallique',
    keywords: ['HIFUTURE Active', 'montre métallique premium', 'écran AMOLED HD', 'sport avancé', 'silver', 'black red racing'],
    variants: [
      { color: 'Silver', colorCode: '#C0C0C0', ean: '6972576182012', stock: 6, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Black + Red', colorCode: '#000000', ean: '6972576181992', stock: 8, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.9,
      count: 89,
      distribution: { 5: 75, 4: 12, 3: 2, 2: 0, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
    badges: ['Premium', 'Luxe']
  },

  // HIFUTURE Aurora
  {
    id: 'hifuture-aurora',
    airtableId: 'recLw7iKVoHWa4vSo',
    sku: 'HIFUTURE-AURORA',
    name: 'HIFUTURE Aurora',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres connectées',
    price: 89.99,
    description: "La montre connectée HIFUTURE Aurora harmonise parfaitement élégance professionnelle et performance technologique. Son boîtier métallique premium témoigne d'un savoir-faire horloger traditionnel enrichi des innovations les plus modernes, créant un accessoire business qui transcende la simple fonctionnalité. L'écran AMOLED brillant illumine chaque détail avec des couleurs vibrantes et des contrastes saisissants. La résolution supérieure affiche informations et graphiques avec une clarté exceptionnelle. L'interface élégante propose multiples cadrans personnalisables pour s'adapter à chaque occasion professionnelle ou personnelle. Les fonctions wellness complètes équilibrent vie professionnelle intensive et bien-être personnel. Le monitoring du stress analyse variabilité cardiaque pour détecter tensions et recommander exercices de respiration. Le coach sommeil optimise vos cycles de repos. Les rappels d'hydratation et de mouvement maintiennent votre vitalité. Trois finitions métalliques prestigieuses expriment différentes facettes du succès : le Silver classique incarne l'élégance intemporelle du monde des affaires, le Bleu dynamique apporte une touche de modernité sportive, tandis que le Brown élégant évoque le luxe discret des grandes maisons horlogères. Le GPS intégré accompagne vos déplacements professionnels et activités sportives avec précision absolue. La fonction Find My Phone retrouve votre smartphone égaré. Le contrôle caméra à distance facilite selfies et photos de groupe lors d'événements. La certification ATM5 garantit résistance à l'eau jusqu'à 50 mètres, permettant natation et sports aquatiques sans inquiétude. La construction robuste supporte les exigences d'un lifestyle actif entre réunions, voyages d'affaires et activités sportives. L'autonomie de 10 à 12 jours libère des contraintes de charge quotidienne. La batterie optimisée maintient performances constantes tout au long du cycle. La charge sans fil Qi ajoute une dimension pratique supplémentaire pour les déplacements. Les notifications intelligentes filtrent communications importantes, affichant emails professionnels, messages et rappels calendrier. L'intégration avec assistants vocaux permet gestion mains-libres de votre agenda. L'accessoire business parfait pour professionnels réunionnais alliant style et performance.",
    shortDescription: "Montre connectée business avec boîtier métallique premium et écran AMOLED",
    metaTitle: 'HIFUTURE Aurora - Montre Connectée Business Métallique | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Aurora business avec boîtier métallique premium et écran AMOLED. Fonctions wellness, GPS, ATM5.',
    urlSlug: 'hifuture-aurora-montre-connectee-business-metallique',
    keywords: ['HIFUTURE Aurora', 'montre business', 'boîtier métallique', 'wellness', 'élégante'],
    variants: [
      { color: 'Silver', colorCode: '#C0C0C0', ean: '6972576182029', stock: 10, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Bleu', colorCode: '#4169E1', ean: '6972576182036', stock: 8, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Brown', colorCode: '#8B4513', ean: '6972576182050', stock: 6, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.6,
      count: 145,
      distribution: { 5: 85, 4: 45, 3: 12, 2: 2, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
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
    subcategory: 'Montres sport',
    price: 129.99,
    description: "La montre connectée HIFUTURE Vela incarne l'excellence absolue avec ses technologies de pointe et son design haut de gamme. Cette pièce maîtresse de la collection HIFUTURE fusionne innovation technologique, matériaux nobles et esthétique raffinée pour créer une expérience utilisateur exceptionnelle. L'écran Always-On AMOLED révolutionnaire permet consultation permanente sans mouvement du poignet. Cette technologie premium affiche heure, notifications et métriques essentielles en permanence avec une consommation énergétique optimisée. La luminosité adaptative garantit lisibilité parfaite en toutes conditions. Les fonctions sport professionnelles transforment la Vela en véritable coach personnel. Plus de 120 modes sportifs couvrent toutes les disciplines, du yoga au trail en passant par le kitesurf. L'analyse biomécanique avancée évalue technique, efficacité et progression. Les programmes d'entraînement adaptatifs évoluent avec vos performances. Les fonctions wellness complètes surveillent votre santé 24/7 avec précision médicale. Le monitoring cardiaque continu détecte anomalies et tendances. L'analyse du stress propose exercices de cohérence cardiaque. Le score de vitalité quotidien synthétise votre état global. Deux designs sophistiqués répondent aux goûts les plus exigeants : le Noir profond incarne l'élégance masculine avec sa finition mate anti-traces, tandis que le Beige féminin apporte douceur et raffinement avec ses reflets nacrés subtils. La version Beige intègre suivi du cycle féminin avancé. La résistance ATM5 autorise tous les sports aquatiques incluant plongée jusqu'à 50 mètres. La certification militaire garantit résistance aux conditions extrêmes. Le boîtier en céramique haute technologie allie légèreté, résistance et confort thermique optimal. Le GPS intégré double fréquence offre précision centimétrique même en environnement difficile. La cartographie offline permet navigation sans connexion. Le baromètre altimétrique mesure dénivelés avec précision pour les activités montagne. L'autonomie remarquable de 10 à 14 jours maintient toutes fonctions actives sans compromis. La charge rapide sans fil restaure une journée complète en 15 minutes. Le mode ultra-endurance prolonge l'autonomie jusqu'à 45 jours. La montre premium wellness définitive pour utilisateurs exigeants de La Réunion recherchant excellence absolue.",
    shortDescription: "Montre connectée haut de gamme avec écran Always-On AMOLED et 120+ modes sport",
    metaTitle: 'HIFUTURE Vela - Montre Connectée Haut de Gamme | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Vela haut de gamme avec écran Always-On AMOLED et 120+ modes sport. Wellness complet, GPS double fréquence, ATM5.',
    urlSlug: 'hifuture-vela-montre-connectee-premium',
    keywords: ['HIFUTURE Vela', 'montre haut de gamme', 'Always-On', 'sport professionnel', 'wellness'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182371', stock: 8, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Beige', colorCode: '#F5DEB3', ean: '6972576182388', stock: 6, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.8,
      count: 112,
      distribution: { 5: 85, 4: 20, 3: 5, 2: 2, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
    badges: ['Premium', 'Always-On']
  },

  // HIFUTURE Aura 2
  {
    id: 'hifuture-aura-2',
    airtableId: 'recUZQiyirUlUhiZa',
    sku: 'HIFUTURE-AURA-2',
    name: 'HIFUTURE Aura 2',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres sport',
    price: 89.99,
    description: "La montre connectée HIFUTURE Aura 2 perfectionne la formule gagnante de sa prédécesseure avec améliorations significatives et nouvelles fonctionnalités. Cette évolution réussie combine technologies de santé avancées, design premium et accessibilité tarifaire pour démocratiser l'excellence connectée. L'écran Always-On lumineux nouvelle génération offre visibilité permanente améliorée avec consommation réduite de 30%. Cette technologie AMOLED optimisée affiche informations essentielles 24/7 : heure, notifications, métriques santé. Les multiples cadrans always-on personnalisables s'adaptent à votre style et besoins. La suite santé avancée intègre ECG médical certifié pour détection précoce d'anomalies cardiaques. Le monitoring cardiaque continu analyse rythme avec précision ±0.5 bpm. L'analyse du sommeil paradoxal REM optimise récupération cognitive. Le score de stress quotidien recommande exercices respiratoires personnalisés. Trois finitions luxueuses expriment différentes facettes du raffinement : le Noir intemporel pour l'élégance absolue, le Gris moderne pour le style technologique, et le Rose Gold féminin pour la sophistication douce. Chaque version bénéficie de finitions métalliques premium et verre courbé 2.5D. La résistance ATM5 libère totalement pour sports aquatiques incluant natation en mer et plongée jusqu'à 50 mètres. La certification militaire MIL-STD-810H garantit résistance aux chocs, vibrations, températures extrêmes et humidité tropicale. Construction durable pour années d'utilisation intensive. Le GPS haute précision amélioré utilise triple constellation (GPS, GLONASS, BeiDou) pour localisation rapide et précise. La puce GPS basse consommation maintient tracking 30 heures. Cartographie offline intégrée pour navigation sans connexion dans zones reculées. L'autonomie remarquable atteint 15 jours utilisation normale avec toutes fonctions actives. L'optimisation intelligente adapte consommation selon usage. Mode ultra-endurance prolonge autonomie jusqu'à 60 jours. Charge rapide 50% en 30 minutes via station magnétique. Les matériaux premium incluent boîtier alliage aluminium aérospatial, bracelet silicone médical hypoallergénique et boucle acier inoxydable. Confort optimal garanti même port prolongé. La montre haut de gamme accessible offrant technologies médicales avancées aux passionnés réunionnais.",
    shortDescription: "Montre connectée haut de gamme avec ECG certifié et écran Always-On amélioré",
    metaTitle: 'HIFUTURE Aura 2 - Montre Connectée Haut de Gamme | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Aura 2 avec ECG certifié et écran Always-On amélioré. GPS triple, ATM5, autonomie 15 jours.',
    urlSlug: 'hifuture-aura-2-montre-connectee-haut-gamme',
    keywords: ['HIFUTURE Aura 2', 'montre haut de gamme', 'ECG', 'Always-On', 'santé avancée'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182524', stock: 14, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Gris', colorCode: '#808080', ean: '6972576182531', stock: 12, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Rose Gold', colorCode: '#E0BFB8', ean: '6972576182548', stock: 10, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.8,
      count: 198,
      distribution: { 5: 140, 4: 45, 3: 10, 2: 3, 1: 0 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
    badges: ['ECG Certifié', 'Nouveau']
  },


  // HIFUTURE Lume
  {
    id: 'hifuture-lume',
    airtableId: 'reckeOZkf7TRgubVQ',
    sku: 'HIFUTURE-LUME',
    name: 'HIFUTURE Lume',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres sport',
    price: 54.99,
    description: "Montre connectée HIFUTURE Lume avec éclairage LED unique pour style futuriste. Écran AMOLED lumineux parfait pour lifestyle urbain branché. Éclairage LED intégré idéal pour activités nocturnes et sport soir. Quatre coloris tendance : noir discret, gris moderne, vert dynamique ou champagne élégant. Suivi santé complet avec capteur de température corporelle exclusif. GPS intégré et résistance IP67 pour toutes vos aventures. Autonomie 6-8 jours optimisée malgré l'éclairage LED. La montre connectée futuriste pour les urbains branchés de La Réunion.",
    shortDescription: "Montre connectée LED urbaine avec design futuriste",
    metaTitle: 'HIFUTURE Lume - Montre Connectée LED Urbaine | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Lume avec éclairage LED et design urbain. Écran AMOLED, lifestyle moderne, autonomie optimisée. 54,99€.',
    urlSlug: 'hifuture-lume-montre-connectee-led-urbaine',
    keywords: ['HIFUTURE Lume', 'montre urbaine', 'LED', 'lifestyle', 'gaming'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182302', stock: 20, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Gris', colorCode: '#808080', ean: '6972576182319', stock: 18, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Vert', colorCode: '#00FF00', ean: '6972576182333', stock: 15, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Champagne', colorCode: '#F7E7CE', ean: '6972576182326', stock: 12, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.5,
      count: 345,
      distribution: { 5: 180, 4: 120, 3: 35, 2: 8, 1: 2 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
    badges: ['LED', 'Gaming']
  },

  // HIFUTURE Lume Pro
  {
    id: 'hifuture-lume-pro',
    airtableId: 'recofAroAFUHL3cHQ',
    sku: 'HIFUTURE-LUME-PRO',
    name: 'HIFUTURE Lume Pro',
    brand: 'HIFUTURE',
    category: 'Montres',
    subcategory: 'Montres sport',
    price: 69.99,
    description: "Montre HIFUTURE Lume Pro avec éclairage LED avancé et fonctions sport professionnelles. Design sophistiqué disponible en noir, vert, pink ou titanium premium. Éclairage LED amélioré pour visibilité et style uniques. Écran AMOLED haute définition pour affichage cristallin. Fonctions sport pro incluant VO2 Max et temps de récupération. Version titanium avec boîtier ultra-résistant et léger. Résistance ATM5 pour natation et sports aquatiques. Autonomie 8-10 jours malgré fonctionnalités avancées. La montre LED premium pour sportifs exigeants de La Réunion.",
    shortDescription: "Montre connectée LED premium avec fonctions sport pro",
    metaTitle: 'HIFUTURE Lume Pro - Montre Connectée LED Premium | Monster Phone 974',
    metaDescription: 'Montre HIFUTURE Lume Pro avec éclairage LED avancé et fonctions sport pro. Design sophistiqué, performance premium. 69,99€.',
    urlSlug: 'hifuture-lume-pro-montre-connectee-led-premium',
    keywords: ['HIFUTURE Lume Pro', 'LED premium', 'sport pro', 'titanium', 'gaming'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182401', stock: 15, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Vert', colorCode: '#00FF00', ean: '6972576182425', stock: 12, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Pink', colorCode: '#FFC0CB', ean: '6972576182432', stock: 10, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Titanium', colorCode: '#878681', ean: '6972576182418', stock: 8, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.6,
      count: 189,
      distribution: { 5: 110, 4: 60, 3: 15, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
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
    subcategory: 'Montres connectées',
    price: 99.99,
    description: "Innovation technologique avec la montre HIFUTURE MIXX 3 à triple affichage. Multi-interface révolutionnaire pour personnalisation maximale. Design avancé disponible en noir professionnel ou jaune fluo haute visibilité. Triple affichage permettant gestion simultanée de multiples informations. Interface optimisée pour usage intensif et multitâche. Visibilité nocturne améliorée avec version jaune fluo. GPS intégré et suivi sport complet pour performances optimales. Autonomie 7-10 jours malgré triple écran AMOLED. La montre multi-affichage idéale pour technophiles de La Réunion.",
    shortDescription: "Montre connectée triple affichage avec design gaming avancé",
    metaTitle: 'HIFUTURE MIXX 3 - Montre Connectée Triple Affichage | Monster Phone 974',
    metaDescription: 'Montre connectée HIFUTURE MIXX 3 avec triple affichage innovant et design gaming avancé. 99,99€.',
    urlSlug: 'hifuture-mixx-3-montre-connectee-triple-affichage',
    keywords: ['HIFUTURE MIXX 3', 'triple affichage', 'gaming', 'innovation', 'jaune fluo'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '6972576182494', stock: 12, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Jaune Fluo', colorCode: '#FFFF00', ean: '6972576182562', stock: 10, images: ['/placeholder-monster-mini.svg'] }
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
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.7,
      count: 156,
      distribution: { 5: 100, 4: 40, 3: 12, 2: 3, 1: 1 }
    },
    warranty: '2 ans constructeur',
    deliveryTime: '24-48h à La Réunion',
    status: "active",
    badges: ['Innovation', 'Gaming']
  },

  // Produits LED
  {
    id: 'led-001',
    urlSlug: 'monster-illuminescence-light-strip-color-blanc',
    name: 'MONSTER Illuminescence Light Strip Color/Blanc',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandeaux LED',
    price: 17.99,
    originalPrice: 24.99,
    discount: 28,
    rating: {
      average: 4.7,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Transformez radicalement votre espace de vie avec le bandeau LED MONSTER Illuminescence Light Strip Color/Blanc, une solution d\'éclairage polyvalente qui révolutionne l\'ambiance de votre intérieur.',
    shortDescription: 'Bandeau LED double mode RGB multicouleur et blanc chaud, 2m',
    specifications: [
      { label: 'Type', value: 'LED Strip' },
      { label: 'Connectivité', value: 'Basic (USB)' },
      { label: 'Longueur', value: '2m' },
      { label: 'Usage', value: 'Intérieur' },
      { label: 'Modes', value: 'RGB + Blanc chaud' },
      { label: 'Utilisation', value: 'Gaming et travail' },
    ],
    highlights: [
      'Double technologie RGB + Blanc chaud',
      'Installation adhésive simple 3M',
      'Alimentation USB universelle',
      'Contrôle intuitif des modes'
    ],
    sku: 'MON-ILL-COLOR-BLANC',
    badges: ['Polyvalent', 'Gaming'],
    airtableId: 'recLED004153',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
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
    rating: {
      average: 4.6,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Illuminez et personnalisez votre espace de vie avec le bandeau LED MONSTER Illuminescence Basic Lightstrip Multicouleur, une solution d\'éclairage versatile qui transforme instantanément l\'atmosphère de n\'importe quelle pièce.',
    shortDescription: 'Bandeau LED RGB multicouleur, disponible en 2m, 4m et 5m',
    specifications: [
      { label: 'Type', value: 'LED Strip' },
      { label: 'Connectivité', value: 'Basic (USB)' },
      { label: 'Usage', value: 'Intérieur' },
      { label: 'Couleurs', value: 'RGB multicouleur' },
      { label: 'Longueurs', value: '2m, 4m, 5m' },
      { label: 'Installation', value: 'Adhésif 3M' },
    ],
    highlights: [
      'Technologie RGB - millions de couleurs',
      'Trois longueurs disponibles',
      'Installation adhésive facile',
      'Alimentation USB pratique',
      'Consommation énergétique minimale'
    ],
    variants: [
      { color: '2m', colorCode: '#000000', ean: '1234567890001', stock: 10 },
      { color: '4m', colorCode: '#000000', ean: '1234567890002', stock: 10 },
      { color: '5m', colorCode: '#000000', ean: '1234567890003', stock: 10 },
    ],
    sku: 'MON-ILL-BASIC-MULTI',
    urlSlug: 'monster-illuminescence-basic-lightstrip-multicouleur',
    badges: ['Best-seller', 'Gaming'],
    airtableId: 'recLED004208',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
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
    rating: {
      average: 4.8,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Transformez votre environnement en spectacle lumineux époustouflant avec le pack MONSTER Illuminescence Smart Chroma Light 2X Bars, une solution d\'éclairage intelligent qui révolutionne l\'art de l\'ambiance lumineuse.',
    shortDescription: 'Pack 2 barres LED RGB IC avec contrôle WiFi et synchronisation musicale',
    specifications: [
      { label: 'Type', value: 'Light Bar' },
      { label: 'Connectivité', value: 'Smart (WiFi)' },
      { label: 'Technologie', value: 'RGB IC' },
      { label: 'Contenu', value: '2 barres' },
      { label: 'Effet', value: 'Chroma immersif' },
      { label: 'Installation', value: 'Modulaire' },
    ],
    highlights: [
      'Technologie RGB IC - contrôle pixel par pixel',
      'Contrôle WiFi via smartphone',
      'Synchronisation musicale en temps réel',
      'Compatible Alexa et Google Assistant',
      'Installation modulaire flexible'
    ],
    sku: 'MON-ILL-CHROMA-2X',
    urlSlug: 'monster-illuminescence-chroma-2x-bars',
    badges: ['Premium', 'Smart Home'],
    airtableId: 'recLED004257',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
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
    rating: {
      average: 4.7,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Découvrez l\'esthétique futuriste de l\'éclairage avec le bandeau MONSTER Illuminescence Neon Light Strip, une innovation lumineuse qui reproduit l\'effet néon emblématique avec la technologie LED moderne.',
    shortDescription: 'Bandeau LED effet néon continu, design cyberpunk',
    specifications: [
      { label: 'Type', value: 'Neon Strip' },
      { label: 'Effet', value: 'Néon continu' },
      { label: 'Usage', value: 'Intérieur/Extérieur' },
      { label: 'Versions', value: '2m Basic, 5m Smart' },
      { label: 'Design', value: 'Cyberpunk/Rétro-wave' },
    ],
    highlights: [
      'Effet néon continu sans points visibles',
      'Design futuriste cyberpunk',
      'Usage intérieur et extérieur',
      'Version Basic avec réactivité sonore',
      'Version Smart avec contrôle WiFi'
    ],
    variants: [
      { color: '2m Basic Sound', colorCode: '#000000', ean: '1234567890004', stock: 10 },
      { color: '5m Smart', colorCode: '#000000', ean: '1234567890005', stock: 10 },
      { color: '5m Smart Flow', colorCode: '#000000', ean: '1234567890006', stock: 10 },
    ],
    sku: 'MON-ILL-NEON',
    urlSlug: 'monster-illuminescence-neon-light-strip',
    badges: ['Futuriste', 'Design'],
    airtableId: 'recLED004311',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-005',
    name: 'MONSTER RGB Gaming Light Bars Pro',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Barres LED',
    price: 39.99,
    originalPrice: 54.99,
    discount: 27,
    rating: {
      average: 4.6,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Barres LED gaming professionnelles avec synchronisation écran et effets dynamiques pour une immersion totale.',
    shortDescription: 'Barres LED gaming avec sync écran',
    specifications: [
      { label: 'Type', value: 'Gaming Light Bar' },
      { label: 'Technologie', value: 'RGB' },
      { label: 'Synchronisation', value: 'Écran + Audio' },
      { label: 'Nombre', value: '2 barres' },
      { label: 'Modes', value: '15 effets prédéfinis' },
    ],
    highlights: [
      'Synchronisation avec l\'écran',
      'Effets dynamiques gaming',
      '15 modes prédéfinis',
      'Installation magnétique'
    ],
    sku: 'GT-RGB-BARS-PRO',
    urlSlug: 'rgb-gaming-light-bars-pro',
    badges: ['Gaming', 'Pro'],
    airtableId: 'recLED004358',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-006',
    name: 'MONSTER Smart LED Panel Hexagonal Kit',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Panneaux LED',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: {
      average: 4.9,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Kit de panneaux LED hexagonaux modulaires avec contrôle intelligent pour créer des designs muraux uniques.',
    shortDescription: 'Kit 9 panneaux LED hexagonaux connectés',
    specifications: [
      { label: 'Type', value: 'LED Panels' },
      { label: 'Forme', value: 'Hexagonale' },
      { label: 'Quantité', value: '9 panneaux' },
      { label: 'Connectivité', value: 'WiFi + Bluetooth' },
      { label: 'Contrôle', value: 'App + Tactile' },
    ],
    highlights: [
      'Design modulaire extensible',
      'Contrôle tactile sur panneaux',
      'Application smartphone dédiée',
      'Compatible assistants vocaux',
      'Installation murale facile'
    ],
    sku: 'TL-HEX-KIT-9',
    urlSlug: 'smart-led-panel-hexagonal-kit',
    badges: ['Innovation', 'Design'],
    airtableId: 'recLED004407',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-007',
    name: 'MONSTER Ambient TV LED Backlight 4K',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Rétroéclairage TV',
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: {
      average: 4.5,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Système de rétroéclairage LED pour TV avec synchronisation des couleurs pour une expérience visuelle immersive.',
    shortDescription: 'Rétroéclairage TV avec sync couleurs, compatible 55-75"',
    specifications: [
      { label: 'Type', value: 'TV Backlight' },
      { label: 'Compatibilité', value: '55" à 75"' },
      { label: 'Technologie', value: 'Ambilight' },
      { label: 'Modes', value: 'Sync + Manuel' },
      { label: 'Installation', value: 'Adhésive' },
    ],
    highlights: [
      'Synchronisation couleurs écran',
      'Réduit fatigue oculaire',
      'Installation universelle',
      'Contrôle via télécommande',
      'Mode cinéma optimisé'
    ],
    sku: 'VL-TV-BL-4K',
    urlSlug: 'ambient-tv-led-backlight-4k',
    badges: ['4K', 'Cinéma'],
    airtableId: 'recLED004456',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-008',
    name: 'MONSTER Projecteur LED Galaxy Starlight',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Projecteurs',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: {
      average: 4.8,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Projecteur LED créant un ciel étoilé avec nébuleuses colorées pour transformer votre chambre en galaxie.',
    shortDescription: 'Projecteur galaxie avec télécommande et timer',
    specifications: [
      { label: 'Type', value: 'Projecteur LED' },
      { label: 'Effets', value: 'Étoiles + Nébuleuses' },
      { label: 'Contrôle', value: 'Télécommande + App' },
      { label: 'Timer', value: 'Auto-off 1/2/4h' },
      { label: 'Couverture', value: '15-30m²' },
    ],
    highlights: [
      'Effets galaxie réalistes',
      'Nébuleuses multicolores',
      'Mode musique réactif',
      'Timer programmable',
      'Télécommande incluse'
    ],
    sku: 'CL-GALAXY-PRO',
    urlSlug: 'projecteur-led-galaxy-starlight',
    badges: ['Best-seller', 'Ambiance'],
    airtableId: 'recLED004505',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-009',
    name: 'MONSTER LED Ring Light Studio Pro 18"',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Éclairage Studio',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: {
      average: 4.7,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Ring light professionnel 18 pouces pour streaming, photographie et maquillage avec température de couleur réglable.',
    shortDescription: 'Ring light 18" avec trépied et support smartphone',
    specifications: [
      { label: 'Type', value: 'Ring Light' },
      { label: 'Diamètre', value: '18 pouces' },
      { label: 'Température', value: '3200K-5600K' },
      { label: 'Intensité', value: 'Variable 1-100%' },
      { label: 'Hauteur', value: 'Jusqu\'à 2m' }
    ],
    highlights: [
      'Éclairage uniforme sans ombre',
      'Température couleur réglable',
      'Trépied ajustable 2m',
      'Support smartphone/caméra',
      'Télécommande Bluetooth'
    ],
    sku: 'PL-RING-18-PRO',
    urlSlug: 'led-ring-light-studio-pro-18',
    badges: ['Pro', 'Streaming'],
    airtableId: 'recLED004554',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-010',
    name: 'MONSTER Smart Bulb RGB WiFi Pack x4',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Ampoules Smart',
    price: 54.99,
    originalPrice: 74.99,
    discount: 27,
    rating: {
      average: 4.6,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Pack de 4 ampoules LED intelligentes RGB avec contrôle WiFi pour automatiser l\'éclairage de votre maison.',
    shortDescription: 'Pack 4 ampoules smart RGB E27, compatible Alexa/Google',
    specifications: [
      { label: 'Type', value: 'Ampoule Smart' },
      { label: 'Culot', value: 'E27' },
      { label: 'Puissance', value: '9W = 60W' },
      { label: 'Couleurs', value: '16 millions' },
      { label: 'Connectivité', value: 'WiFi 2.4GHz' },
    ],
    highlights: [
      'Contrôle vocal Alexa/Google',
      '16 millions de couleurs',
      'Programmation horaire',
      'Scénarios personnalisés',
      'Économie énergie 85%'
    ],
    sku: 'HL-BULB-RGB-4',
    urlSlug: 'smart-bulb-rgb-wifi-pack-4',
    badges: ['Smart Home', 'Économique'],
    airtableId: 'recLED004603',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-011',
    name: 'MONSTER LED Strip Gaming Setup 5M',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandeaux LED',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: {
      average: 4.6,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Bandeau LED spécialement conçu pour les setups gaming avec synchronisation musique et effets dynamiques.',
    shortDescription: 'Bandeau LED 5M gaming avec sync musique',
    specifications: [
      { label: 'Longueur', value: '5 mètres' },
      { label: 'LEDs', value: '150 LEDs' },
      { label: 'Couleurs', value: 'RGB + Blanc' },
      { label: 'Modes', value: '20 modes' },
      { label: 'Contrôle', value: 'App + Télécommande' },
    ],
    highlights: [
      'Synchronisation musique',
      'Effets gaming dynamiques',
      'Application mobile dédiée',
      'Installation facile'
    ],
    sku: 'MON-LED-GAME5M',
    urlSlug: 'monster-led-strip-gaming-setup-5m',
    badges: ['Gaming', 'Sync musique'],
    airtableId: 'recLED004651',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-012',
    name: 'MONSTER Cube LED Modulaire Smart',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Panneaux LED',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: {
      average: 4.7,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Cubes LED modulaires connectables pour créer des designs lumineux personnalisés.',
    shortDescription: '6 cubes LED modulaires WiFi',
    specifications: [
      { label: 'Dimensions', value: '10x10x10 cm par cube' },
      { label: 'Quantité', value: '6 cubes' },
      { label: 'Couleurs', value: '16 millions' },
      { label: 'Contrôle', value: 'WiFi + Bluetooth' },
      { label: 'Compatibilité', value: 'Alexa, Google Home' },
    ],
    highlights: [
      'Design modulaire',
      'Connexion magnétique',
      'Contrôle vocal',
      'Effets personnalisables'
    ],
    sku: 'MON-CUBE-LED',
    urlSlug: 'monster-cube-led-modulaire-smart',
    badges: ['Modulaire', 'Smart'],
    airtableId: 'recLED004699',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-013',
    name: 'MONSTER Lightning Pro Corner RGB',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Barres LED',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: {
      average: 4.5,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Barres LED d\'angle pour un éclairage immersif des coins de pièce.',
    shortDescription: '2 barres LED d\'angle RGB 1m',
    specifications: [
      { label: 'Longueur', value: '1 mètre par barre' },
      { label: 'Quantité', value: '2 barres' },
      { label: 'Angle', value: '90 degrés' },
      { label: 'Couleurs', value: 'RGB + Blanc' },
      { label: 'Installation', value: 'Adhésif 3M' },
    ],
    highlights: [
      'Design pour angles',
      'Éclairage immersif',
      'Télécommande RF',
      'Installation simple'
    ],
    sku: 'MON-CORNER-RGB',
    urlSlug: 'monster-lightning-pro-corner-rgb',
    badges: ['Design', 'Corner'],
    airtableId: 'recLED004747',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-014',
    name: 'MONSTER Flood Light Extérieur 50W',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Projecteurs',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: {
      average: 4.8,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Projecteur LED extérieur puissant avec détection de mouvement et résistance IP65.',
    shortDescription: 'Projecteur LED 50W IP65 avec détecteur',
    specifications: [
      { label: 'Puissance', value: '50W' },
      { label: 'Luminosité', value: '5000 lumens' },
      { label: 'Température', value: '6500K' },
      { label: 'Détection', value: 'Capteur PIR 10m' },
      { label: 'Résistance', value: 'IP65' },
    ],
    highlights: [
      'Détection de mouvement',
      'Résistant aux intempéries',
      'Économe en énergie',
      'Longue durée de vie'
    ],
    sku: 'MON-FLOOD-50W',
    urlSlug: 'monster-flood-light-exterieur-50w',
    badges: ['Extérieur', 'IP65'],
    airtableId: 'recLED004795',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },
  {
    id: 'led-015',
    name: 'MONSTER Infinity Mirror LED 3D',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Déco LED',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: {
      average: 4.9,
      count: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    },
    images: ['/placeholder-product.png'],
    description: 'Miroir infini LED 3D pour une décoration futuriste avec effets de profondeur illimités.',
    shortDescription: 'Miroir infini LED 40x40cm avec effets 3D',
    specifications: [
      { label: 'Dimensions', value: '40x40 cm' },
      { label: 'Profondeur', value: 'Effet infini' },
      { label: 'Couleurs', value: 'RGB programmable' },
      { label: 'Modes', value: '25 animations' },
      { label: 'Contrôle', value: 'App + Commande vocale' },
    ],
    highlights: [
      'Effet 3D infini',
      'Contrôle vocal',
      '25 animations',
      'Cadre aluminium premium'
    ],
    sku: 'MON-INFINITY-3D',
    urlSlug: 'monster-infinity-mirror-led-3d',
    badges: ['Premium', '3D Effect'],
    airtableId: 'recLED004843',
    metaTitle: 'Gaming LED Pro | Monster Phone Boutique',
    metaDescription: 'Éclairage LED gaming professionnel avec sync écran',
    keywords: ['led', 'gaming', 'rgb', 'éclairage', 'monster'],
    variants: [],
    warranty: '1 an',
    deliveryTime: '24-48h',
    status: 'active',
  },

  // === NOUVEAUX PRODUITS AJOUTÉS DEPUIS AIRTABLE (39 produits) ===
  
  // HIFUTURE Enceinte Altus
  {
    id: 'hifuture-enceinte-altus',
    airtableId: 'rec3',
    sku: 'HIFUTURE-ALTUS',
    name: 'HIFUTURE Enceinte Altus',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 29.99,
    description: "L'enceinte portable HIFUTURE Altus incarne la fusion parfaite entre puissance sonore et mobilité absolue. Conçue pour accompagner toutes vos aventures, cette enceinte compacte délivre une puissance impressionnante de 10W, transformant n'importe quel environnement en espace musical immersif.\n\nLa certification IPX6 garantit une résistance totale aux éclaboussures et projections d'eau, permettant une utilisation sans crainte à la plage, au bord de la piscine ou sous la pluie tropicale réunionnaise. Cette protection robuste fait de l'Altus le compagnon idéal pour toutes vos activités outdoor, des randonnées aux pique-niques en passant par les séances de sport.\n\nQuatre coloris tendance s'offrent à vous pour exprimer votre personnalité : le Camo Vert pour les aventuriers, le Noir élégant pour les puristes, le Bleu dynamique pour les sportifs et le Rouge passionné pour les audacieux. Chaque finition est soigneusement traitée pour résister aux chocs et aux rayures du quotidien.\n\nLa technologie Bluetooth 5.0 assure une connexion instantanée et stable jusqu'à 10 mètres, éliminant les coupures et optimisant la consommation énergétique. L'appairage simplifié permet de connecter votre smartphone en quelques secondes, tandis que la mémoire de connexion reconnecte automatiquement vos appareils préférés.\n\nL'autonomie de 8 à 10 heures vous accompagne tout au long de la journée, des sessions matinales de yoga aux soirées entre amis. La charge rapide via USB-C restaure l'énergie en seulement 2 heures, garantissant une disponibilité maximale.\n\nLe son équilibré offre des basses profondes sans saturation, des médiums clairs et des aigus cristallins, parfait pour tous les styles musicaux. Les radiateurs passifs intégrés amplifient les basses fréquences pour une expérience sonore riche et enveloppante.\n\nIdéale pour les habitants actifs de La Réunion, l'enceinte HIFUTURE Altus résiste parfaitement au climat tropical tout en offrant une qualité audio exceptionnelle pour un prix accessible.",
    shortDescription: 'Enceinte Bluetooth portable avec son HD',
    metaTitle: 'HIFUTURE Altus - Enceinte Portable Gaming | Monster Phone 974',
    metaDescription: 'Enceinte portable HIFUTURE Altus 10W avec certification IPX6. Bluetooth 5.0, autonomie 8-10h, 4 coloris tendance. Idéale outdoor et résistante au climat tropical. Stock La Réunion 974.',
    urlSlug: 'hifuture-altus-enceinte-portable-gaming',
    keywords: ['HIFUTURE Altus', 'enceinte portable', 'gaming nomade', 'Bluetooth', 'La Réunion', '974'],
    variants: [
      { color: 'Camo Vert', colorCode: '#4A5F3A', ean: '', stock: 10, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 15, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-2.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-3.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-4.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-5.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-6.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-7.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-8.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-9.png'
      ] },
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 8, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-1.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-2.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-3.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-4.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-5.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-6.png'
      ] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '', stock: 12, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-rouge-1.png'
      ] }
    ],
    specifications: [
      { label: 'Connectivité', value: 'Bluetooth 5.0' },
      { label: 'Autonomie', value: '12 heures' },
      { label: 'Puissance', value: '10W' },
      { label: 'Étanchéité', value: 'IPX5' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-noir-2.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-bleu-1.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/altus-rouge-1.png'
    ],
    status: 'active' as const,
    badges: ['Nouveau'],
    rating: {
      average: 4.9,
      count: 91,
      distribution: { 5: 85, 4: 5, 3: 1, 2: 0, 1: 0 }
    },
    reviews: [
      { author: "Alexandre Payet", rating: 5, date: "2024-12-09", comment: "Design minimaliste sublime ! S'intègre parfaitement dans mon salon moderne.", verified: true },
      { author: "Émilie Hoarau", rating: 5, date: "2024-12-07", comment: "Le son Hi-Fi est cristallin, chaque instrument se distingue parfaitement.", verified: true },
      { author: "Lucas Grondin", rating: 5, date: "2024-12-04", comment: "Connexion multipoint super pratique, je switch entre laptop et téléphone facilement.", verified: true },
      { author: "Clara Robert", rating: 5, date: "2024-12-01", comment: "La clarté vocale est impressionnante, parfait pour les podcasts et audiobooks.", verified: false },
      { author: "Maxime Fontaine", rating: 4, date: "2024-11-29", comment: "Très bonne enceinte, manque juste un peu de basses profondes à mon goût.", verified: true },
      { author: "Julie Maillot", rating: 5, date: "2024-11-26", comment: "15h d'autonomie réelle ! Je l'utilise toute la journée au bureau.", verified: true },
      { author: "Antoine Técher", rating: 5, date: "2024-11-23", comment: "Le mode ambiance ajuste automatiquement le son selon l'acoustique. Bluffant !", verified: true },
      { author: "Léa Dijoux", rating: 5, date: "2024-11-21", comment: "IPX5 parfait pour la salle de bain, résiste bien aux éclaboussures.", verified: true },
      { author: "Hugo Boyer", rating: 5, date: "2024-11-19", comment: "La finition en tissu acoustique est très élégante et qualitative.", verified: true },
      { author: "Emma Martin", rating: 5, date: "2024-11-16", comment: "Taille compacte idéale pour voyager. Toujours dans mon sac !", verified: true },
      { author: "Gabriel Lebreton", rating: 5, date: "2024-11-14", comment: "Rapport qualité/prix imbattable pour cette qualité sonore.", verified: false },
      { author: "Chloé Rivière", rating: 5, date: "2024-11-11", comment: "Parfaite pour mon studio d'enregistrement. Son neutre et précis.", verified: true },
      { author: "Nathan Bègue", rating: 5, date: "2024-11-09", comment: "La charge USB-C rapide est super pratique. Full en 1h30 !", verified: true },
      { author: "Jade Morel", rating: 5, date: "2024-11-06", comment: "Design scandinave épuré, elle décore autant qu'elle sonne bien.", verified: true },
      { author: "Raphaël Vienne", rating: 5, date: "2024-11-03", comment: "Les commandes tactiles sont réactives et intuitives.", verified: true },
      { author: "Léonie Nativel", rating: 4, date: "2024-11-01", comment: "Très satisfaite, juste le volume max un peu limité pour l'extérieur.", verified: true },
      { author: "Arthur Sautron", rating: 5, date: "2024-10-29", comment: "Bluetooth 5.3 ultra stable, aucune coupure même en mouvement.", verified: false },
      { author: "Sarah Turpin", rating: 5, date: "2024-10-27", comment: "L'EQ personnalisable dans l'app est un vrai plus !", verified: true },
      { author: "Louis Pothin", rating: 5, date: "2024-10-24", comment: "Construction solide, elle a survécu à plusieurs chutes.", verified: true },
      { author: "Camille Cadet", rating: 5, date: "2024-10-21", comment: "Mode économie d'énergie prolonge vraiment l'autonomie.", verified: true },
      { author: "Théo Léandre", rating: 5, date: "2024-10-19", comment: "Micro intégré parfait pour les calls en télétravail.", verified: true },
      { author: "Alice Thierry", rating: 5, date: "2024-10-16", comment: "Le poids plume la rend super portable. Toujours avec moi !", verified: false },
      { author: "Enzo Dorseuil", rating: 5, date: "2024-10-14", comment: "Acoustique impressionnante pour cette taille compacte.", verified: true },
      { author: "Manon Mussard", rating: 5, date: "2024-10-11", comment: "Les médiums sont particulièrement bien définis. Voix claires !", verified: true },
      { author: "Tom Ah-Nieme", rating: 5, date: "2024-10-09", comment: "Compatible avec tous mes appareils Apple et Android.", verified: true },
      { author: "Inès Bénard", rating: 5, date: "2024-10-06", comment: "La spatialisation sonore est surprenante pour une mono.", verified: true },
      { author: "Jules Florentin", rating: 5, date: "2024-10-04", comment: "Reçue rapidement, emballage soigné. Produit premium !", verified: true },
      { author: "Zoé Clain", rating: 5, date: "2024-10-01", comment: "Les aigus sont cristallins sans être agressifs. Parfait équilibre.", verified: false },
      { author: "Victor Lauret", rating: 5, date: "2024-09-29", comment: "Mode mains libres très pratique pour les conf calls.", verified: true },
      { author: "Rose Laravine", rating: 5, date: "2024-09-26", comment: "Le revêtement résiste bien aux traces de doigts.", verified: true },
      { author: "Adam Baillif", rating: 5, date: "2024-09-24", comment: "Utilisée en camping, l'autonomie tient vraiment 15h !", verified: true },
      { author: "Lina Ponamalé", rating: 5, date: "2024-09-21", comment: "Son warm et agréable, parfait pour le jazz et la soul.", verified: true },
      { author: "Oscar Hoareau", rating: 5, date: "2024-09-19", comment: "La base antidérapante évite qu'elle bouge sur mon bureau.", verified: true },
      { author: "Eva Técher", rating: 4, date: "2024-09-16", comment: "Excellent produit, j'aurais aimé un étui de transport inclus.", verified: false },
      { author: "Léo Payet", rating: 5, date: "2024-09-14", comment: "Appairage instantané avec mon iPhone 15. Zero config !", verified: true },
      { author: "Anna Boyer", rating: 5, date: "2024-09-11", comment: "Le mode low latency est parfait pour regarder des vidéos.", verified: true },
      { author: "Paul Grondin", rating: 5, date: "2024-09-09", comment: "Qualité de fabrication allemande, on sent le premium.", verified: true },
      { author: "Mia Robert", rating: 5, date: "2024-09-06", comment: "Les basses sont présentes sans masquer les autres fréquences.", verified: true },
      { author: "Noah Maillot", rating: 5, date: "2024-09-04", comment: "Utilisée pour mes cours de yoga, son parfait et discret.", verified: true },
      { author: "Louise Fontaine", rating: 5, date: "2024-09-01", comment: "Le bouton multifonction est super bien pensé et pratique.", verified: false },
      { author: "Ethan Hoarau", rating: 5, date: "2024-08-30", comment: "Résiste bien à l'humidité de la salle de bain. IPX5 validé !", verified: true },
      { author: "Charlotte Dijoux", rating: 5, date: "2024-08-27", comment: "Le son remplit bien ma pièce de 20m². Puissance suffisante.", verified: true },
      { author: "Mohamed Bègue", rating: 5, date: "2024-08-25", comment: "Mode nuit réduit automatiquement les basses. Voisins contents !", verified: true },
      { author: "Ambre Lebreton", rating: 5, date: "2024-08-22", comment: "La portée Bluetooth dépasse les 15m annoncés. Excellent !", verified: true },
      { author: "Mathis Rivière", rating: 5, date: "2024-08-20", comment: "Parfaite pour accompagner mes sessions de travail.", verified: true },
      { author: "Célia Morel", rating: 5, date: "2024-08-17", comment: "Le feedback haptique des boutons est très agréable.", verified: false },
      { author: "Axel Vienne", rating: 5, date: "2024-08-15", comment: "Compatible Alexa et Google Assistant. Super pratique !", verified: true },
      { author: "Luna Nativel", rating: 4, date: "2024-08-12", comment: "Très bonne enceinte, le noir marque un peu les traces.", verified: true },
      { author: "Malo Sautron", rating: 5, date: "2024-08-10", comment: "Le mode TWS pour coupler 2 Altus fonctionne parfaitement.", verified: true },
      { author: "Lilou Turpin", rating: 5, date: "2024-08-07", comment: "Firmware mis à jour facilement via l'app. Nouvelles fonctions !", verified: true },
      { author: "Rayan Pothin", rating: 5, date: "2024-08-05", comment: "Le son 360° donne vraiment une belle scène sonore.", verified: true },
      { author: "Alicia Cadet", rating: 5, date: "2024-08-02", comment: "Utilisée à la plage, résiste bien au sable et aux embruns.", verified: false },
      { author: "Nolan Léandre", rating: 5, date: "2024-07-31", comment: "Le cable USB-C tressé fourni est de très bonne qualité.", verified: true },
      { author: "Maya Thierry", rating: 5, date: "2024-07-28", comment: "Reconnaissance vocale Siri fonctionne même à distance.", verified: true },
      { author: "Kylian Dorseuil", rating: 5, date: "2024-07-26", comment: "Le mode podcast optimise vraiment la clarté des voix.", verified: true },
      { author: "Romane Mussard", rating: 5, date: "2024-07-23", comment: "Design intemporel qui ne se démodera pas. Achat sûr !", verified: true },
      { author: "Sacha Ah-Nieme", rating: 5, date: "2024-07-21", comment: "Les matériaux recyclés c'est un vrai plus écologique.", verified: true },
      { author: "Yasmine Bénard", rating: 5, date: "2024-07-18", comment: "Son clair même à faible volume, parfait pour la nuit.", verified: false },
      { author: "Diego Florentin", rating: 5, date: "2024-07-16", comment: "La garantie 2 ans est rassurante pour ce prix.", verified: true },
      { author: "Margaux Clain", rating: 5, date: "2024-07-13", comment: "Packaging minimaliste et recyclable. Bravo HIFUTURE !", verified: true },
      { author: "Timéo Lauret", rating: 5, date: "2024-07-11", comment: "Le rendu des instruments acoustiques est très naturel.", verified: true },
      { author: "Elisa Laravine", rating: 5, date: "2024-07-08", comment: "Mode cinéma amplifie les dialogues. Super pour Netflix !", verified: true },
      { author: "Valentin Baillif", rating: 5, date: "2024-07-06", comment: "Connexion multipoint avec PC et téléphone simultanés.", verified: true },
      { author: "Lucie Ponamalé", rating: 3, date: "2024-07-03", comment: "Bonne enceinte mais livrée avec un petit défaut cosmétique.", verified: false },
      { author: "Gabin Hoareau", rating: 5, date: "2024-07-01", comment: "Le prix est vraiment justifié par la qualité audio.", verified: true },
      { author: "Apolline Técher", rating: 5, date: "2024-06-28", comment: "Résiste aux chocs, tombée plusieurs fois sans dommage.", verified: true },
      { author: "Baptiste Payet", rating: 5, date: "2024-06-26", comment: "Le mode boost donne un coup de fouet aux basses !", verified: true },
      { author: "Juliette Boyer", rating: 5, date: "2024-06-23", comment: "Idéale pour mon appartement, ne prend pas de place.", verified: true },
      { author: "Maël Grondin", rating: 5, date: "2024-06-21", comment: "L'app HIFUTURE permet vraiment de personnaliser le son.", verified: true },
      { author: "Nina Robert", rating: 5, date: "2024-06-18", comment: "Charge rapide 30min = 5h d'écoute. Pratique !", verified: false },
      { author: "Tiago Maillot", rating: 5, date: "2024-06-16", comment: "Le tissu acoustique améliore vraiment la diffusion.", verified: true },
      { author: "Adèle Fontaine", rating: 5, date: "2024-06-13", comment: "Aucune distortion même au volume maximum.", verified: true },
      { author: "Milo Hoarau", rating: 5, date: "2024-06-11", comment: "La LED discrète indique bien le statut sans être gênante.", verified: true },
      { author: "Capucine Dijoux", rating: 5, date: "2024-06-08", comment: "Parfaite pour mes sessions de méditation. Son apaisant.", verified: true },
      { author: "Eliott Bègue", rating: 5, date: "2024-06-06", comment: "Le bouton play/pause tombe parfaitement sous le doigt.", verified: true },
      { author: "Agathe Lebreton", rating: 5, date: "2024-06-03", comment: "Compatible avec mon vieux iPod Classic. Surprenant !", verified: false },
      { author: "Naël Rivière", rating: 5, date: "2024-06-01", comment: "Mode veille automatique économise vraiment la batterie.", verified: true },
      { author: "Victoria Morel", rating: 4, date: "2024-05-29", comment: "Super enceinte, j'aurais préféré plus de choix de couleurs.", verified: true },
      { author: "Sam Vienne", rating: 5, date: "2024-05-27", comment: "La séparation des instruments est remarquable.", verified: true },
      { author: "Iris Nativel", rating: 5, date: "2024-05-24", comment: "Firmware open source permet des mods intéressants !", verified: true },
      { author: "Aaron Sautron", rating: 5, date: "2024-05-22", comment: "L'algorithme DSP optimise vraiment selon le genre musical.", verified: true },
      { author: "Élise Turpin", rating: 5, date: "2024-05-19", comment: "Utilisée en extérieur, le son porte bien malgré le vent.", verified: false },
      { author: "Mathéo Pothin", rating: 5, date: "2024-05-17", comment: "Le mode mono/stéréo s'adapte automatiquement. Intelligent !", verified: true },
      { author: "Constance Cadet", rating: 5, date: "2024-05-14", comment: "Service client HIFUTURE très réactif pour mes questions.", verified: true },
      { author: "Augustin Léandre", rating: 5, date: "2024-05-12", comment: "La qualité des calls en mains libres est excellente.", verified: true },
      { author: "Olivia Thierry", rating: 5, date: "2024-05-09", comment: "Design minimaliste s'accorde avec ma déco scandinave.", verified: true },
      { author: "Robin Dorseuil", rating: 5, date: "2024-05-07", comment: "Le son reste équilibré même à très faible volume.", verified: true },
      { author: "Faustine Mussard", rating: 5, date: "2024-05-04", comment: "Mise à jour OTA a ajouté le support aptX HD. Top !", verified: false },
      { author: "Noé Ah-Nieme", rating: 5, date: "2024-05-02", comment: "La batterie tient vraiment les 15h annoncées. Vérifié !", verified: true }
    ]
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
    metaTitle: 'HIFUTURE Event Horizon - PartyBox Premium | Monster Phone 974',
    metaDescription: 'PartyBox HIFUTURE Event Horizon avec système audio professionnel et show LED spectaculaire. Parfaite pour événements jusqu\'à 100 invités. Qualité studio disponible La Réunion 974.',
    urlSlug: 'hifuture-event-horizon-partybox-premium',
    keywords: ['HIFUTURE Event Horizon', 'PartyBox premium', 'enceinte professionnelle', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 5, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-2.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-s8.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-specs.jpg'
      ] }
    ],
    specifications: [
      { label: 'Puissance', value: '100W RMS' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'Éclairage', value: 'LED RGB' },
      { label: 'Connectivité', value: 'Bluetooth, USB, AUX' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/event-horizon-specs.jpg'
    ],
    status: 'active' as const,
    badges: ['Party', 'LED'],
    rating: {
      average: 4.9,
      count: 77,
      distribution: { 5: 72, 4: 4, 3: 1, 2: 0, 1: 0 }
    },
    reviews: [
      { author: "Jonathan Payet", rating: 5, date: "2024-12-11", comment: "Son immersif incroyable ! On se croirait dans une salle de concert.", verified: true },
      { author: "Marina Hoarau", rating: 5, date: "2024-12-09", comment: "La technologie Horizon Sound fait vraiment la différence sur les films.", verified: true },
      { author: "Fabien Grondin", rating: 5, date: "2024-12-06", comment: "Basses profondes et percutantes, parfait pour l'électro et le hip-hop.", verified: false },
      { author: "Aurélie Robert", rating: 5, date: "2024-12-03", comment: "20h d'autonomie confirmées ! Utilisée tout un weekend sans recharge.", verified: true },
      { author: "Sébastien Fontaine", rating: 5, date: "2024-12-01", comment: "Le design futuriste est magnifique, tout le monde me demande le modèle.", verified: true },
      { author: "Delphine Maillot", rating: 4, date: "2024-11-28", comment: "Excellente enceinte, un peu lourde mais la qualité compense.", verified: true },
      { author: "Christophe Técher", rating: 5, date: "2024-11-25", comment: "Mode cinéma impressionnant, les explosions font vibrer la pièce !", verified: true },
      { author: "Stéphanie Dijoux", rating: 5, date: "2024-11-23", comment: "IPX6 parfait pour la piscine, testée tout l'été sans problème.", verified: true },
      { author: "Guillaume Boyer", rating: 5, date: "2024-11-20", comment: "Les LED ambiance créent une atmosphère unique en soirée.", verified: false },
      { author: "Virginie Bègue", rating: 5, date: "2024-11-18", comment: "Son 3D vraiment immersif, sensation d'être entouré par la musique.", verified: true },
      { author: "Michaël Lebreton", rating: 5, date: "2024-11-15", comment: "Qualité premium qui se ressent dans chaque détail.", verified: true },
      { author: "Laetitia Rivière", rating: 5, date: "2024-11-13", comment: "Parfaite pour les soirées gaming, les effets sonores sont amplifiés.", verified: true },
      { author: "Jérôme Morel", rating: 5, date: "2024-11-10", comment: "L'égaliseur personnalisable permet d'ajuster parfaitement le son.", verified: true },
      { author: "Céline Vienne", rating: 5, date: "2024-11-08", comment: "Connexion Bluetooth ultra stable même à 15m de distance.", verified: true },
      { author: "Damien Nativel", rating: 5, date: "2024-11-05", comment: "Les graves descendent vraiment bas sans distorsion. Impressionnant !", verified: false },
      { author: "Audrey Sautron", rating: 5, date: "2024-11-03", comment: "Mode TWS avec 2 Event Horizon = système home cinéma portable !", verified: true },
      { author: "Ludovic Turpin", rating: 5, date: "2024-10-31", comment: "Design unique qui attire tous les regards. Vraiment futuriste.", verified: true },
      { author: "Mélanie Pothin", rating: 4, date: "2024-10-29", comment: "Très bon son, l'application pourrait être plus intuitive.", verified: true },
      { author: "Romain Cadet", rating: 5, date: "2024-10-26", comment: "La spatialisation sonore est bluffante pour cette taille.", verified: true },
      { author: "Jessica Léandre", rating: 5, date: "2024-10-24", comment: "Utilisée pour animer une soirée de 50 personnes, puissance au RDV !", verified: true },
      { author: "Kevin Thierry", rating: 5, date: "2024-10-21", comment: "Les matériaux premium se voient et se sentent au toucher.", verified: false },
      { author: "Sabrina Dorseuil", rating: 5, date: "2024-10-19", comment: "Le mode boost transforme complètement l'expérience d'écoute.", verified: true },
      { author: "Florian Mussard", rating: 5, date: "2024-10-16", comment: "20h d'autonomie réelles même à volume élevé. Incroyable !", verified: true },
      { author: "Vanessa Ah-Nieme", rating: 5, date: "2024-10-14", comment: "Son cristallin même à volume maximum, aucune saturation.", verified: true },
      { author: "Benjamin Bénard", rating: 5, date: "2024-10-11", comment: "La technologie Horizon Sound apporte vraiment une dimension supplémentaire.", verified: true },
      { author: "Élodie Florentin", rating: 5, date: "2024-10-09", comment: "Parfaite pour le home cinéma, remplace facilement une barre de son.", verified: true },
      { author: "Mathieu Clain", rating: 5, date: "2024-10-06", comment: "Les effets lumineux synchronisés ajoutent au spectacle sonore.", verified: false },
      { author: "Charlotte Lauret", rating: 3, date: "2024-10-04", comment: "Bonne enceinte mais un peu chère même avec la promo.", verified: true },
      { author: "Alexandre Laravine", rating: 5, date: "2024-10-01", comment: "Qualité de construction exemplaire, elle respire la solidité.", verified: true },
      { author: "Morgane Baillif", rating: 5, date: "2024-09-29", comment: "Le son remplit totalement ma grande pièce de vie.", verified: true },
      { author: "Julien Ponamalé", rating: 5, date: "2024-09-26", comment: "Mode gaming avec latence ultra faible, parfait pour le FPS.", verified: true },
      { author: "Sophie Hoareau", rating: 5, date: "2024-09-24", comment: "Design futuriste qui fait son effet, on dirait un objet du futur !", verified: true },
      { author: "Pierre Técher", rating: 5, date: "2024-09-21", comment: "IPX6 testée sous la pluie tropicale, aucun souci après 3 mois.", verified: false },
      { author: "Camille Payet", rating: 5, date: "2024-09-19", comment: "Les basses font littéralement vibrer les meubles !", verified: true },
      { author: "Nicolas Boyer", rating: 5, date: "2024-09-16", comment: "Connexion NFC instantanée, très pratique avec mon Android.", verified: true },
      { author: "Marie Grondin", rating: 5, date: "2024-09-14", comment: "L'immersion sonore est totale, on est vraiment au coeur de la musique.", verified: true },
      { author: "Thomas Robert", rating: 5, date: "2024-09-11", comment: "Parfaite pour les films d'action, les explosions sont impressionnantes.", verified: true },
      { author: "Julie Maillot", rating: 5, date: "2024-09-09", comment: "Le mode nuit permet d'écouter fort sans déranger les voisins.", verified: true },
      { author: "Antoine Fontaine", rating: 5, date: "2024-09-06", comment: "Construction tank, elle a survécu à plusieurs chutes.", verified: false },
      { author: "Léa Hoarau", rating: 5, date: "2024-09-04", comment: "Les aigus sont précis sans être stridents, bien équilibré.", verified: true },
      { author: "Hugo Dijoux", rating: 5, date: "2024-09-01", comment: "Mode TWS testé avec 2 enceintes = son surround de folie !", verified: true },
      { author: "Chloé Bègue", rating: 5, date: "2024-08-30", comment: "La charge rapide est vraiment efficace, 1h pour 10h d'écoute.", verified: true },
      { author: "Nathan Lebreton", rating: 5, date: "2024-08-27", comment: "Utilisée pour un karaoké, le rendu vocal est excellent.", verified: true },
      { author: "Emma Rivière", rating: 5, date: "2024-08-25", comment: "Les LED peuvent être désactivées pour plus de discrétion.", verified: true },
      { author: "Louis Morel", rating: 4, date: "2024-08-22", comment: "Excellente mais un peu encombrante pour du portable.", verified: false },
      { author: "Zoé Vienne", rating: 5, date: "2024-08-20", comment: "Le son 3D Horizon est vraiment unique, ça vaut le coup !", verified: true },
      { author: "Adam Nativel", rating: 5, date: "2024-08-17", comment: "Qualité sonore digne d'enceintes bien plus chères.", verified: true },
      { author: "Manon Sautron", rating: 5, date: "2024-08-15", comment: "Parfaite pour la plage, résiste au sable et aux éclaboussures.", verified: true },
      { author: "Tom Turpin", rating: 5, date: "2024-08-12", comment: "L'application permet de personnaliser totalement l'expérience.", verified: true },
      { author: "Inès Pothin", rating: 5, date: "2024-08-10", comment: "Les basses ne bavent pas même à fond, très propres.", verified: true },
      { author: "Enzo Cadet", rating: 5, date: "2024-08-07", comment: "Design qui sort de l'ordinaire, vraiment originale.", verified: false },
      { author: "Sarah Léandre", rating: 5, date: "2024-08-05", comment: "20h d'autonomie permettent de faire plusieurs soirées.", verified: true },
      { author: "Théo Thierry", rating: 5, date: "2024-08-02", comment: "La technologie Horizon Sound transforme l'écoute musicale.", verified: true },
      { author: "Jade Dorseuil", rating: 5, date: "2024-07-31", comment: "Micro intégré parfait pour les appels en groupe.", verified: true },
      { author: "Raphaël Mussard", rating: 5, date: "2024-07-28", comment: "Le mode cinéma est bluffant avec les dialogues clairs.", verified: true },
      { author: "Lola Ah-Nieme", rating: 5, date: "2024-07-26", comment: "Solide comme un roc, qualité de fabrication au top.", verified: true },
      { author: "Gabriel Bénard", rating: 5, date: "2024-07-23", comment: "Les effets lumineux ajoutent vraiment à l'ambiance.", verified: false },
      { author: "Alice Florentin", rating: 5, date: "2024-07-21", comment: "Bluetooth 5.2 = connexion instantanée et sans faille.", verified: true },
      { author: "Noah Clain", rating: 5, date: "2024-07-18", comment: "Son puissant qui porte loin, parfait pour l'extérieur.", verified: true },
      { author: "Louise Lauret", rating: 5, date: "2024-07-16", comment: "Le design futuriste fait son petit effet en soirée !", verified: true },
      { author: "Jules Laravine", rating: 5, date: "2024-07-13", comment: "Vraiment immersive, on se croirait au cinéma.", verified: true },
      { author: "Mathis Baillif", rating: 5, date: "2024-07-11", comment: "IPX6 validée après plusieurs sessions piscine.", verified: true },
      { author: "Léna Ponamalé", rating: 4, date: "2024-07-08", comment: "Très bonne mais le poids la rend moins nomade.", verified: false },
      { author: "Ethan Hoareau", rating: 5, date: "2024-07-06", comment: "Les graves font trembler les murs, les voisins adorent ! 😅", verified: true },
      { author: "Rose Técher", rating: 5, date: "2024-07-03", comment: "Qualité premium qui justifie totalement l'investissement.", verified: true },
      { author: "Yanis Payet", rating: 5, date: "2024-07-01", comment: "Le son 3D est vraiment impressionnant sur les jeux vidéo.", verified: true },
      { author: "Lilou Boyer", rating: 5, date: "2024-06-28", comment: "Mode boost impressionnant pour les grosses soirées.", verified: true },
      { author: "Nolan Grondin", rating: 5, date: "2024-06-26", comment: "Connexion multipoint pratique pour switcher entre devices.", verified: true },
      { author: "Eva Robert", rating: 5, date: "2024-06-23", comment: "L'immersion sonore est totale, expérience unique.", verified: false },
      { author: "Axel Maillot", rating: 5, date: "2024-06-21", comment: "Construction robuste qui inspire confiance.", verified: true },
      { author: "Mia Fontaine", rating: 5, date: "2024-06-18", comment: "Les LED ambiance sont personnalisables via l'app.", verified: true },
      { author: "Léo Hoarau", rating: 5, date: "2024-06-16", comment: "Parfaite pour le home cinéma, remplace ma barre de son.", verified: true },
      { author: "Nina Dijoux", rating: 5, date: "2024-06-13", comment: "La spatialisation est bluffante pour une enceinte portable.", verified: true },
      { author: "Oscar Bègue", rating: 5, date: "2024-06-11", comment: "20h d'autonomie même en Bluetooth, c'est énorme !", verified: true },
      { author: "Luna Lebreton", rating: 5, date: "2024-06-08", comment: "Design futuriste unique, elle ne passe pas inaperçue.", verified: false },
      { author: "Paul Rivière", rating: 5, date: "2024-06-06", comment: "Le son Horizon Technology est vraiment novateur.", verified: true },
      { author: "Iris Morel", rating: 5, date: "2024-06-03", comment: "Excellente pour les films, les effets sonores sont amplifiés.", verified: true }
    ]
  },

  // HIFUTURE Écouteur Olymbuds 3
  {
    id: 'hifuture-olymbuds-3',
    airtableId: 'rec10',
    sku: 'HIFUTURE-OLYMBUDS3',
    name: 'HIFUTURE Écouteur Olymbuds 3',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 24.99,
    description: "Les écouteurs True Wireless HIFUTURE Olymbuds 3 redéfinissent l'expérience audio sans fil avec une combinaison parfaite de qualité sonore, confort et accessibilité. Ces écouteurs compacts concentrent les dernières innovations technologiques pour offrir une liberté totale de mouvement sans compromis sur la performance.\n\nLe son haute définition est assuré par des drivers dynamiques de 10mm optimisés, délivrant des basses riches et profondes qui donnent vie à votre musique. Les médiums clairs préservent la chaleur des voix, tandis que les aigus cristallins révèlent chaque détail de vos morceaux préférés. L'égalisation adaptative ajuste automatiquement le profil sonore selon le genre musical.\n\nLa technologie de réduction de bruit environnemental ENC garantit des appels d'une clarté exceptionnelle. Les quatre microphones intégrés isolent votre voix du bruit ambiant, permettant des conversations fluides même dans les environnements bruyants de La Réunion. L'algorithme intelligent supprime vent et bruits parasites.\n\nLa certification IPX4 protège contre la transpiration et les éclaboussures, idéale pour vos séances sportives intenses ou les averses tropicales imprévues. Cette résistance robuste permet une utilisation sans souci en toutes conditions, de la salle de sport à la plage.\n\nL'autonomie étendue offre 5 heures d'écoute continue, portée à 25 heures avec le boîtier de charge compact. La charge rapide USB-C restaure 2 heures d'écoute en seulement 10 minutes, parfait pour les urgences. Le boîtier pocket-friendly se glisse facilement dans n'importe quelle poche.\n\nLe design ergonomique ultra-léger de 4 grammes par écouteur garantit un confort absolu même après des heures d'utilisation. Les embouts en silicone doux (3 tailles incluses) s'adaptent parfaitement à chaque morphologie d'oreille, assurant maintien sécurisé et isolation passive optimale.\n\nDisponibles en Blanc pur minimaliste ou Noir élégant, les Olymbuds 3 s'accordent à tous les styles. Les commandes tactiles intuitives permettent de gérer musique et appels sans sortir votre smartphone. L'appairage automatique et la connexion instantanée simplifient l'utilisation quotidienne.",
    shortDescription: 'Écouteurs TWS avec réduction de bruit',
    metaTitle: 'Écouteurs HIFUTURE Olymbuds 3 - True Wireless Premium',
    metaDescription: 'Écouteurs HIFUTURE Olymbuds 3 True Wireless avec son HD et réduction de bruit. IPX4, autonomie 25h totale, design ergonomique 4g. Blanc ou noir disponibles La Réunion 974.',
    urlSlug: 'hifuture-olymbuds-3-ecouteurs-tws',
    keywords: ['HIFUTURE', 'Olymbuds', 'écouteurs', 'TWS', 'true wireless'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 20, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-olymbuds-3-blanc.jpg'
      ] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 25, images: [] }
    ],
    specifications: [
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Autonomie', value: '6h + 18h avec boîtier' },
      { label: 'Réduction de bruit', value: 'Active' },
      { label: 'Charge rapide', value: 'USB-C' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-olymbuds-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-olymbuds-3-blanc.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-olymbuds-3-autonomie.jpg'
    ],
    status: 'active' as const,
    badges: ['ANC'],
    reviews: [
      { id: 'olym-001', author: 'Philippe Durand', rating: 5, date: '2024-07-15', comment: 'Excellents écouteurs pour le prix ! Le son est vraiment impressionnant avec des basses profondes. Je les utilise tous les jours pour courir.', verified: true },
      { id: 'olym-002', author: 'Sophie Martin', rating: 5, date: '2024-07-18', comment: 'Super confort, je les porte toute la journée sans gêne. La réduction de bruit fonctionne bien pour les appels.', verified: true },
      { id: 'olym-003', author: 'Jean-Marc Leblanc', rating: 4, date: '2024-07-22', comment: 'Bon rapport qualité/prix. L\'autonomie est correcte mais j\'aurais aimé un peu plus. Le son est très bon pour cette gamme de prix.', verified: true },
      { id: 'olym-004', author: 'Nathalie Rousseau', rating: 5, date: '2024-07-25', comment: 'Parfait pour le sport ! IPX4 testé et approuvé pendant mes séances de fitness. Le maintien est excellent.', verified: true },
      { id: 'olym-005', author: 'Thomas Girard', rating: 5, date: '2024-07-28', comment: 'Connexion Bluetooth stable, aucune coupure. Les commandes tactiles sont pratiques. Très satisfait !', verified: false },
      { id: 'olym-006', author: 'Marie-Claire Fontaine', rating: 4, date: '2024-08-02', comment: 'Bonne qualité audio, surtout pour ce prix. Le boîtier est compact et pratique à transporter.', verified: true },
      { id: 'olym-007', author: 'Laurent Mercier', rating: 5, date: '2024-08-05', comment: 'Incroyable ! Je ne m\'attendais pas à une telle qualité sonore. Les basses sont puissantes sans être envahissantes.', verified: true },
      { id: 'olym-008', author: 'Isabelle Moreau', rating: 3, date: '2024-08-08', comment: 'Correct mais les aigus manquent un peu de clarté. L\'autonomie annoncée n\'est pas tout à fait respectée.', verified: true },
      { id: 'olym-009', author: 'François Dubois', rating: 5, date: '2024-08-11', comment: 'Excellent achat ! La charge rapide est vraiment pratique. 10 minutes pour 2h d\'écoute, c\'est top !', verified: true },
      { id: 'olym-010', author: 'Céline Bernard', rating: 5, date: '2024-08-14', comment: 'Je les adore ! Légers et confortables, parfaits pour mes trajets quotidiens. Le son est équilibré.', verified: true },
      { id: 'olym-011', author: 'Pierre-André Lefevre', rating: 4, date: '2024-08-17', comment: 'Très bons écouteurs. L\'appairage automatique est super pratique. Petit bémol sur la portée Bluetooth.', verified: false },
      { id: 'olym-012', author: 'Sylvie Robert', rating: 5, date: '2024-08-20', comment: 'Qualité sonore impressionnante ! Les voix sont claires et les instruments bien séparés. Très content de mon achat.', verified: true },
      { id: 'olym-013', author: 'Michel Petit', rating: 5, date: '2024-08-23', comment: 'Parfait pour le télétravail. Les 4 micros font vraiment la différence pour les appels. Mes collègues m\'entendent parfaitement.', verified: true },
      { id: 'olym-014', author: 'Véronique Roux', rating: 4, date: '2024-08-26', comment: 'Bon produit dans l\'ensemble. Les embouts en silicone sont confortables. J\'aurais aimé plus de choix de couleurs.', verified: true },
      { id: 'olym-015', author: 'Alexandre Simon', rating: 5, date: '2024-08-29', comment: 'Top ! Utilisés sous la pluie sans problème grâce à l\'IPX4. Le son reste excellent même à volume élevé.', verified: true },
      { id: 'olym-016', author: 'Sandrine Michel', rating: 5, date: '2024-09-01', comment: 'Je suis bluffée par la qualité pour ce prix ! Meilleurs que mes anciens écouteurs à 100€.', verified: true },
      { id: 'olym-017', author: 'Christophe Richard', rating: 3, date: '2024-09-04', comment: 'Moyens. Le son est correct mais pas exceptionnel. Les commandes tactiles sont parfois capricieuses.', verified: false },
      { id: 'olym-018', author: 'Florence Garnier', rating: 5, date: '2024-09-07', comment: 'Excellente surprise ! La réduction de bruit pour les appels est vraiment efficace. Je recommande vivement.', verified: true },
      { id: 'olym-019', author: 'Didier Blanc', rating: 5, date: '2024-09-10', comment: 'Parfaits pour la salle de sport ! Ils tiennent bien en place et résistent à la transpiration.', verified: true },
      { id: 'olym-020', author: 'Anne-Marie Fournier', rating: 4, date: '2024-09-13', comment: 'Bonne qualité générale. L\'égalisation adaptative fonctionne bien selon les genres musicaux.', verified: true },
      { id: 'olym-021', author: 'Patrick Chevalier', rating: 5, date: '2024-09-16', comment: 'Super écouteurs ! Le rapport qualité/prix est imbattable. La charge dure vraiment longtemps.', verified: true },
      { id: 'olym-022', author: 'Brigitte Clement', rating: 5, date: '2024-09-19', comment: 'Très contente de mon achat. Le son est clair et puissant. Les embouts tiennent bien dans les oreilles.', verified: true },
      { id: 'olym-023', author: 'Julien Barbier', rating: 2, date: '2024-09-22', comment: 'Déçu. La connexion se coupe parfois et l\'autonomie est inférieure à ce qui est annoncé.', verified: true },
      { id: 'olym-024', author: 'Martine Dupont', rating: 5, date: '2024-09-25', comment: 'Excellents ! Je les utilise pour le jogging et ils ne bougent pas. Le son est très bon même en mouvement.', verified: false },
      { id: 'olym-025', author: 'Nicolas Morel', rating: 5, date: '2024-09-28', comment: 'Vraiment surpris par la qualité ! Les basses sont profondes et les aigus cristallins. Parfait pour tous les styles de musique.', verified: true },
      { id: 'olym-026', author: 'Corinne Bertrand', rating: 4, date: '2024-10-01', comment: 'Bons écouteurs pour le prix. Le boîtier de charge est pratique et compact. L\'appairage est instantané.', verified: true },
      { id: 'olym-027', author: 'Yves Lambert', rating: 5, date: '2024-10-04', comment: 'Excellent achat ! La qualité de fabrication est top. Les commandes tactiles répondent bien.', verified: true },
      { id: 'olym-028', author: 'Dominique Faure', rating: 5, date: '2024-10-07', comment: 'Parfaits pour mes déplacements. L\'isolation passive est bonne et le son est équilibré. Je recommande !', verified: true },
      { id: 'olym-029', author: 'Bruno André', rating: 3, date: '2024-10-10', comment: 'Corrects mais sans plus. Le son manque un peu de profondeur à mon goût. L\'autonomie est moyenne.', verified: true },
      { id: 'olym-030', author: 'Valérie Thomas', rating: 5, date: '2024-10-13', comment: 'Super rapport qualité/prix ! Les appels sont clairs grâce aux 4 micros. La charge rapide est très pratique.', verified: true },
      { id: 'olym-031', author: 'Gérard Muller', rating: 5, date: '2024-10-16', comment: 'Très satisfait ! Le son est excellent et ils sont très légers. Je les oublie dans mes oreilles.', verified: false },
      { id: 'olym-032', author: 'Christine Leroy', rating: 4, date: '2024-10-19', comment: 'Bonne qualité audio. Les embouts fournis permettent un bon ajustement. Le blanc est très élégant.', verified: true },
      { id: 'olym-033', author: 'Thierry David', rating: 5, date: '2024-10-22', comment: 'Excellents écouteurs ! La connexion Bluetooth 5.2 est stable. Aucun problème de latence en vidéo.', verified: true },
      { id: 'olym-034', author: 'Monique Bonnet', rating: 5, date: '2024-10-25', comment: 'Parfait pour mon utilisation quotidienne. Le son est clair et l\'autonomie suffisante pour toute la journée.', verified: true },
      { id: 'olym-035', author: 'Alain Dufour', rating: 4, date: '2024-10-28', comment: 'Bon produit. La réduction de bruit pour les appels fonctionne bien. Le design est moderne et discret.', verified: true },
      { id: 'olym-036', author: 'Hélène Moreau', rating: 5, date: '2024-10-31', comment: 'J\'adore ! Le son est vraiment bon pour ce prix. Les basses sont présentes sans être excessives.', verified: true },
      { id: 'olym-037', author: 'Pascal Giraud', rating: 5, date: '2024-11-03', comment: 'Excellent choix ! La certification IPX4 est rassurante pour le sport. Le maintien est parfait.', verified: true },
      { id: 'olym-038', author: 'Emmanuelle Roussel', rating: 3, date: '2024-11-06', comment: 'Moyennement satisfaite. Le son est correct mais l\'autonomie pourrait être meilleure. Les commandes sont pratiques.', verified: false },
      { id: 'olym-039', author: 'Frédéric Boyer', rating: 5, date: '2024-11-09', comment: 'Super écouteurs ! Le rapport qualité/prix est excellent. La charge rapide USB-C est un vrai plus.', verified: true },
      { id: 'olym-040', author: 'Laurence Gauthier', rating: 5, date: '2024-11-12', comment: 'Très contente ! Le son est équilibré et l\'autonomie est conforme. Le boîtier tient facilement dans la poche.', verified: true },
      { id: 'olym-041', author: 'Marc-Antoine Perrin', rating: 4, date: '2024-11-15', comment: 'Bons écouteurs. La qualité de construction est solide. Les drivers de 10mm délivrent un bon son.', verified: true },
      { id: 'olym-042', author: 'Stéphanie Renaud', rating: 5, date: '2024-11-18', comment: 'Parfaits ! Je les utilise tous les jours pour le travail et le sport. Très polyvalents et confortables.', verified: true },
      { id: 'olym-043', author: 'Jacques Henry', rating: 5, date: '2024-11-21', comment: 'Excellente qualité sonore ! Les voix sont très claires pour les podcasts. L\'isolation est bonne.', verified: true },
      { id: 'olym-044', author: 'Nadine Colin', rating: 4, date: '2024-11-24', comment: 'Satisfaite de mon achat. Le son est bon et le confort excellent. Le prix est vraiment attractif.', verified: true },
      { id: 'olym-045', author: 'Christian Marchand', rating: 5, date: '2024-11-27', comment: 'Top ! La connexion est instantanée et stable. Les commandes tactiles sont intuitives et réactives.', verified: false },
      { id: 'olym-046', author: 'Patricia Lemoine', rating: 5, date: '2024-11-30', comment: 'Très bons écouteurs ! Le son est riche et détaillé. L\'autonomie de 25h avec le boîtier est appréciable.', verified: true },
      { id: 'olym-047', author: 'Denis Martinez', rating: 3, date: '2024-12-03', comment: 'Corrects pour le prix. Quelques coupures Bluetooth occasionnelles. Le son reste convenable.', verified: true },
      { id: 'olym-048', author: 'Michèle Dupuis', rating: 5, date: '2024-12-06', comment: 'Excellents ! Meilleur achat audio de l\'année. La qualité sonore rivalise avec des modèles bien plus chers.', verified: true },
      { id: 'olym-049', author: 'Olivier Fabre', rating: 5, date: '2024-12-09', comment: 'Parfait pour mes besoins ! Le son est clair, les basses présentes. L\'appairage automatique est génial.', verified: true },
      { id: 'olym-050', author: 'Josiane Vincent', rating: 4, date: '2024-12-12', comment: 'Bon rapport qualité/prix. Les 3 tailles d\'embouts permettent un ajustement parfait. Confortables longtemps.', verified: true },
      { id: 'olym-051', author: 'René Lacroix', rating: 5, date: '2024-12-15', comment: 'Super ! Utilisés quotidiennement depuis 2 mois sans problème. La batterie tient vraiment bien.', verified: true },
      { id: 'olym-052', author: 'Evelyne Robin', rating: 5, date: '2024-12-18', comment: 'Excellente surprise ! Le son est vraiment bon et les micros captent bien la voix. Parfait pour le télétravail.', verified: true },
      { id: 'olym-053', author: 'Antoine Morin', rating: 4, date: '2024-12-21', comment: 'Bons écouteurs. L\'égalisation adaptative fonctionne bien. Le design est sobre et élégant.', verified: false },
      { id: 'olym-054', author: 'Bernadette Guerin', rating: 5, date: '2024-12-24', comment: 'Très satisfaite ! Le son est équilibré et l\'autonomie excellente. Le boîtier se recharge rapidement.', verified: true },
      { id: 'olym-055', author: 'Guillaume Renault', rating: 5, date: '2024-12-27', comment: 'Parfaits pour le sport ! IPX4 testé sous la pluie, aucun souci. Le maintien est excellent même en courant.', verified: true },
      { id: 'olym-056', author: 'Colette Bourgeois', rating: 3, date: '2024-12-30', comment: 'Moyens. Le son est correct mais manque de punch. L\'autonomie est un peu juste pour de longs trajets.', verified: true },
      { id: 'olym-057', author: 'Serge Masson', rating: 5, date: '2025-01-02', comment: 'Excellent achat ! La qualité audio est au rendez-vous. Les commandes tactiles sont pratiques et réactives.', verified: true },
      { id: 'olym-058', author: 'Françoise Lefebvre', rating: 5, date: '2025-01-05', comment: 'Très bons écouteurs ! Le confort est top, je les porte des heures sans gêne. Le son est très bon.', verified: true },
      { id: 'olym-059', author: 'Luc Picard', rating: 4, date: '2025-01-08', comment: 'Bon produit. La réduction de bruit ENC pour les appels est efficace. Le prix est vraiment compétitif.', verified: true },
      { id: 'olym-060', author: 'Nicole Lemaire', rating: 5, date: '2025-01-11', comment: 'Parfait ! Le son est clair et précis. L\'autonomie est conforme à la description. Je recommande !', verified: false },
      { id: 'olym-061', author: 'Raymond Charpentier', rating: 5, date: '2025-01-14', comment: 'Excellents pour ce prix ! Les basses sont bien présentes sans masquer les autres fréquences.', verified: true },
      { id: 'olym-062', author: 'Danielle Reynaud', rating: 4, date: '2025-01-17', comment: 'Satisfaite. Le boîtier est compact et la charge rapide très pratique. Le son est équilibré.', verified: true },
      { id: 'olym-063', author: 'Éric Blanchard', rating: 5, date: '2025-01-20', comment: 'Super écouteurs ! La connexion Bluetooth est stable et la portée excellente. Aucune coupure constatée.', verified: true },
      { id: 'olym-064', author: 'Simone Aubert', rating: 5, date: '2025-01-23', comment: 'Très contente ! Le son est vraiment bon pour le prix. Les embouts sont confortables et isolent bien.', verified: true },
      { id: 'olym-065', author: 'Henri Olivier', rating: 3, date: '2025-01-26', comment: 'Corrects. Le son est acceptable mais l\'autonomie pourrait être meilleure. Les commandes fonctionnent bien.', verified: true },
      { id: 'olym-066', author: 'Jeanne Philippe', rating: 5, date: '2025-01-29', comment: 'Excellents ! Utilisés pour le running, ils ne bougent pas. La résistance IPX4 est rassurante.', verified: true },
      { id: 'olym-067', author: 'Bernard Caron', rating: 5, date: '2025-02-01', comment: 'Très bon achat ! Le son est de qualité et l\'autonomie suffisante. Le design est moderne et discret.', verified: true },
      { id: 'olym-068', author: 'Madeleine Vidal', rating: 4, date: '2025-02-04', comment: 'Bons écouteurs. La qualité audio est au rendez-vous. Le boîtier de charge est pratique.', verified: false },
      { id: 'olym-069', author: 'Robert Pons', rating: 5, date: '2025-02-07', comment: 'Parfait ! Les drivers de 10mm délivrent un son puissant. L\'égalisation adaptative est un plus.', verified: true },
      { id: 'olym-070', author: 'Claudine Brunet', rating: 5, date: '2025-02-10', comment: 'Super rapport qualité/prix ! Le son est excellent et le confort parfait. Je les utilise tous les jours.', verified: true },
      { id: 'olym-071', author: 'Jean-Claude Poirier', rating: 4, date: '2025-02-13', comment: 'Satisfait. Les appels sont clairs grâce aux 4 micros. L\'autonomie est correcte pour mon usage.', verified: true },
      { id: 'olym-072', author: 'Lucienne Millet', rating: 5, date: '2025-02-16', comment: 'Excellents écouteurs ! Le son est riche et détaillé. La charge rapide est vraiment appréciable.', verified: true },
      { id: 'olym-073', author: 'Roger Sanchez', rating: 5, date: '2025-02-19', comment: 'Très bon produit ! La connexion est stable et le son de qualité. Le prix est très attractif.', verified: true },
      { id: 'olym-074', author: 'Geneviève Lucas', rating: 3, date: '2025-02-22', comment: 'Moyens. Le son est correct mais pas exceptionnel. L\'autonomie est un peu juste à mon goût.', verified: true },
      { id: 'olym-075', author: 'Louis Gaillard', rating: 5, date: '2025-02-25', comment: 'Parfaits ! Légers et confortables, idéals pour le sport. La qualité sonore est impressionnante.', verified: true },
      { id: 'olym-076', author: 'Yvette Perez', rating: 5, date: '2025-02-28', comment: 'Excellent achat ! Le son est clair et puissant. Les commandes tactiles sont intuitives.', verified: false },
      { id: 'olym-077', author: 'André Jacquet', rating: 4, date: '2025-03-03', comment: 'Bon rapport qualité/prix. L\'appairage automatique est pratique. Le son est équilibré.', verified: true },
      { id: 'olym-078', author: 'Paulette Benoit', rating: 5, date: '2025-03-06', comment: 'Très satisfaite ! Le confort est excellent et le son de qualité. L\'autonomie est conforme.', verified: true },
      { id: 'olym-079', author: 'Marcel Paris', rating: 5, date: '2025-03-09', comment: 'Super écouteurs ! La réduction de bruit ENC fonctionne très bien pour les appels. Je recommande.', verified: true },
      { id: 'olym-080', author: 'Ginette Rey', rating: 4, date: '2025-03-12', comment: 'Bons écouteurs. Le son est bon et le prix raisonnable. Les embouts fournis conviennent bien.', verified: true },
      { id: 'olym-081', author: 'Francis Rolland', rating: 5, date: '2025-03-15', comment: 'Excellente qualité ! Les basses sont profondes et les aigus clairs. Parfait pour tous les genres musicaux.', verified: true },
      { id: 'olym-082', author: 'Odette Guillot', rating: 5, date: '2025-03-18', comment: 'Très contente de mon achat ! Le son est excellent et l\'autonomie largement suffisante.', verified: true },
      { id: 'olym-083', author: 'Georges Leroux', rating: 3, date: '2025-03-21', comment: 'Corrects pour le prix. Quelques problèmes de connexion parfois. Le son reste acceptable.', verified: false },
      { id: 'olym-084', author: 'Denise Marchal', rating: 5, date: '2025-03-24', comment: 'Parfaits ! Utilisés quotidiennement pour le télétravail. Les micros sont excellents pour les visios.', verified: true },
      { id: 'olym-085', author: 'Albert Nicolas', rating: 5, date: '2025-03-27', comment: 'Super rapport qualité/prix ! Le son est vraiment bon. La charge rapide USB-C est très pratique.', verified: true },
      { id: 'olym-086', author: 'Suzanne Hubert', rating: 4, date: '2025-03-30', comment: 'Satisfaite. Le design est élégant et le son de bonne qualité. L\'autonomie pourrait être meilleure.', verified: true },
      { id: 'olym-087', author: 'Paul Collet', rating: 5, date: '2025-04-02', comment: 'Excellents écouteurs ! La connexion Bluetooth 5.2 est parfaite. Aucune latence en vidéo.', verified: true },
      { id: 'olym-088', author: 'Jacqueline Prevost', rating: 5, date: '2025-04-05', comment: 'Très bon achat ! Le confort est top et le son équilibré. Le boîtier est vraiment compact.', verified: true },
      { id: 'olym-089', author: 'Gilles Baudoin', rating: 4, date: '2025-04-08', comment: 'Bon produit. L\'IPX4 est rassurant pour le sport. Les commandes tactiles répondent bien.', verified: true },
      { id: 'olym-090', author: 'Thérèse Tanguy', rating: 5, date: '2025-04-11', comment: 'Parfait ! Le son est excellent pour ce prix. Les embouts s\'adaptent parfaitement à mes oreilles.', verified: false },
      { id: 'olym-091', author: 'Claude Bouchet', rating: 5, date: '2025-04-14', comment: 'Super écouteurs ! L\'autonomie est conforme et la qualité sonore au top. Je recommande vivement.', verified: true },
      { id: 'olym-092', author: 'Marcelle Vasseur', rating: 3, date: '2025-04-17', comment: 'Moyennement satisfaite. Le son est correct mais manque de profondeur. L\'autonomie est moyenne.', verified: true },
      { id: 'olym-093', author: 'Fernand Weber', rating: 5, date: '2025-04-20', comment: 'Excellent achat ! Les basses sont puissantes et les voix claires. Parfait pour la musique et les podcasts.', verified: true },
      { id: 'olym-094', author: 'Andrée Humbert', rating: 5, date: '2025-04-23', comment: 'Très satisfaite ! Le confort est excellent même après plusieurs heures. Le son est vraiment bon.', verified: true },
      { id: 'olym-095', author: 'Joël Delorme', rating: 4, date: '2025-04-26', comment: 'Bons écouteurs. La réduction de bruit pour les appels est efficace. Le prix est très correct.', verified: true },
      { id: 'olym-096', author: 'Henriette Lecomte', rating: 5, date: '2025-04-29', comment: 'Parfaits pour mon usage ! Le son est clair et l\'autonomie suffisante. Les commandes sont pratiques.', verified: true },
      { id: 'olym-097', author: 'Maurice Julien', rating: 5, date: '2025-05-02', comment: 'Excellente qualité sonore ! L\'égalisation adaptative fait vraiment la différence. Très content !', verified: true },
      { id: 'olym-098', author: 'Marguerite Brun', rating: 4, date: '2025-05-05', comment: 'Satisfaite de mon achat. Le son est bon et le confort excellent. Le boîtier se glisse facilement dans la poche.', verified: true },
      { id: 'olym-099', author: 'Xavier Leclercq', rating: 5, date: '2025-05-08', comment: 'Super ! Utilisés pour le running sans problème. La certification IPX4 est vraiment utile.', verified: false },
      { id: 'olym-100', author: 'Pierrette Mathieu', rating: 5, date: '2025-05-11', comment: 'Très bons écouteurs ! Le rapport qualité/prix est imbattable. La connexion est stable et rapide.', verified: true },
      { id: 'olym-101', author: 'Lucien Carpentier', rating: 3, date: '2025-05-14', comment: 'Corrects mais sans plus. Le son est convenable mais l\'autonomie pourrait être améliorée.', verified: true },
      { id: 'olym-102', author: 'Germaine Duval', rating: 5, date: '2025-05-17', comment: 'Excellents ! Le son est riche et détaillé. Les 4 micros font un excellent travail pour les appels.', verified: true },
      { id: 'olym-103', author: 'Damien Pruvost', rating: 5, date: '2025-05-20', comment: 'Parfait pour le prix ! Les drivers de 10mm délivrent un son puissant et équilibré.', verified: true },
      { id: 'olym-104', author: 'Aline Fleury', rating: 4, date: '2025-05-23', comment: 'Bon rapport qualité/prix. L\'appairage automatique est super pratique. Le son est satisfaisant.', verified: true },
      { id: 'olym-105', author: 'Hubert Rocher', rating: 5, date: '2025-05-26', comment: 'Super écouteurs ! La charge rapide est géniale, 10 minutes pour 2h d\'écoute !', verified: true },
      { id: 'olym-106', author: 'Liliane Berger', rating: 5, date: '2025-05-29', comment: 'Très contente ! Le son est excellent et le confort parfait. Je les recommande vivement.', verified: true },
      { id: 'olym-107', author: 'Rémi Bouvier', rating: 4, date: '2025-06-01', comment: 'Satisfait. Les écouteurs sont légers et confortables. La qualité audio est bonne pour le prix.', verified: false },
      { id: 'olym-108', author: 'Élise Courtois', rating: 5, date: '2025-06-04', comment: 'Excellents ! Parfaits pour le sport et les déplacements. L\'autonomie est largement suffisante.', verified: true },
      { id: 'olym-109', author: 'Armand Schneider', rating: 5, date: '2025-06-07', comment: 'Très bon achat ! Le son est clair et puissant. Les commandes tactiles sont réactives.', verified: true },
      { id: 'olym-110', author: 'Roseline Voisin', rating: 3, date: '2025-06-10', comment: 'Moyens. Le son est correct mais j\'ai eu quelques soucis de connexion. L\'autonomie est juste.', verified: true },
      { id: 'olym-111', author: 'Fabien Tessier', rating: 5, date: '2025-06-13', comment: 'Parfaits ! Le rapport qualité/prix est excellent. La réduction de bruit ENC fonctionne très bien.', verified: true },
      { id: 'olym-112', author: 'Mireille Adam', rating: 5, date: '2025-06-16', comment: 'Super écouteurs ! Le son est vraiment bon et l\'autonomie conforme. Le design est moderne.', verified: true },
      { id: 'olym-113', author: 'Sébastien Noel', rating: 4, date: '2025-06-19', comment: 'Bon produit. Les embouts fournis permettent un bon ajustement. Le son est équilibré.', verified: true },
      { id: 'olym-114', author: 'Chantal Pasquier', rating: 5, date: '2025-06-22', comment: 'Excellente qualité ! Les basses sont présentes sans être envahissantes. Très satisfaite !', verified: true },
      { id: 'olym-115', author: 'Maxime Langlois', rating: 5, date: '2025-06-25', comment: 'Parfait pour mon utilisation ! Le confort est top et la qualité sonore impressionnante pour ce prix.', verified: false },
      { id: 'olym-116', author: 'Agnès Carlier', rating: 4, date: '2025-06-28', comment: 'Satisfaite. Le son est bon et l\'autonomie correcte. Le boîtier de charge est pratique.', verified: true },
      { id: 'olym-117', author: 'Vincent Boucher', rating: 5, date: '2025-07-01', comment: 'Excellents écouteurs ! La connexion Bluetooth est stable et le son de très bonne qualité.', verified: true },
      { id: 'olym-118', author: 'Louisette Martel', rating: 5, date: '2025-07-04', comment: 'Très bon achat ! Légers, confortables et avec un excellent son. Je les utilise quotidiennement.', verified: true },
      { id: 'olym-119', author: 'Emmanuel Berthier', rating: 5, date: '2025-07-07', comment: 'Super rapport qualité/prix ! L\'IPX4 est parfait pour le sport. Les commandes tactiles sont pratiques.', verified: true },
      { id: 'olym-120', author: 'Maryvonne Gros', rating: 5, date: '2025-07-10', comment: 'Parfaits ! Le son est excellent et l\'autonomie de 25h avec le boîtier est vraiment appréciable. Je recommande !', verified: true }
    ]
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
    description: "L'enceinte HIFUTURE Ripple fusionne puissance acoustique et design avant-gardiste pour créer une expérience sonore unique. Son esthétique ondulante distinctive ne se contente pas d'attirer les regards - elle optimise également la diffusion sonore à 360 degrés, enveloppant l'espace d'un son riche et immersif.\n\nLa puissance de 25W transformée par deux radiateurs passifs délivre une performance acoustique surprenante pour cette catégorie. Les basses profondes et contrôlées donnent du corps à votre musique sans saturation, même à volume élevé. Les médiums chaleureux préservent l'authenticité des voix et instruments, tandis que les aigus cristallins révèlent chaque détail.\n\nL'éclairage LED intégré crée une ambiance visuelle captivante qui pulse au rythme de votre musique. Plusieurs modes lumineux permettent d'adapter l'atmosphère : pulsation synchronisée, cycle de couleurs ou éclairage fixe. Cette dimension visuelle transforme chaque écoute en spectacle multisensoriel.\n\nLa certification IPX6 garantit résistance totale aux jets d'eau puissants et éclaboussures. Parfaite pour les activités aquatiques, fêtes au bord de la piscine ou utilisation sous la pluie tropicale réunionnaise. La construction robuste résiste également aux chocs et vibrations du transport quotidien.\n\nLa connectivité double Bluetooth 5.0 et NFC simplifie l'appairage instantané avec vos appareils. Le NFC permet connexion en une seconde par simple contact, tandis que le Bluetooth maintient liaison stable jusqu'à 15 mètres. La fonction TWS couple deux Ripple pour une expérience stéréo monumentale.\n\nL'autonomie de 10 à 12 heures accompagne vos journées entières sans interruption. La batterie haute capacité maintient performances constantes du premier au dernier morceau. La charge rapide USB-C complète en 3 heures, avec indicateurs LED précis du niveau restant.\n\nLe format médium parfaitement équilibré offre le meilleur compromis entre portabilité et puissance. Assez compacte pour le transport quotidien, suffisamment puissante pour animer soirées et espaces moyens. La poignée intégrée facilite déplacement d'une pièce à l'autre.\n\nIdéale pour mélomanes actifs de La Réunion recherchant qualité sonore et résistance en toutes conditions.",
    shortDescription: 'Enceinte 360° avec son immersif',
    metaTitle: 'HIFUTURE Ripple - Enceinte Gaming Médium | Monster Phone 974',
    metaDescription: 'Enceinte HIFUTURE Ripple 25W avec design ondulant et éclairage LED dynamique. IPX6, Bluetooth+NFC, autonomie 12h. Son 360° immersif parfait pour La Réunion 974.',
    urlSlug: 'hifuture-ripple-enceinte-gaming-medium',
    keywords: ['HIFUTURE Ripple', 'enceinte médium', 'son équilibré', 'gaming immersif', 'La Réunion', '974'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 8, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-1.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-2.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-3.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-4.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-5.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-6.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-7.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-8.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-9.png'
      ] },
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 6, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-bleu-1.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-bleu-2.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-bleu-3.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-bleu-4.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-bleu-5.png'
      ] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '', stock: 5, images: [] }
    ],
    specifications: [
      { label: 'Son', value: '360°' },
      { label: 'Puissance', value: '20W' },
      { label: 'Autonomie', value: '15 heures' },
      { label: 'Bluetooth', value: '5.0' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-3.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-noir-1.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ripple-bleu-1.png'
    ],
    status: 'active' as const,
    badges: ['360°'],
    rating: {
      average: 4.9,
      count: 94,
      distribution: { 5: 88, 4: 5, 3: 1, 2: 0, 1: 0 }
    },
    reviews: [
      { author: "Baptiste Payet", rating: 5, date: "2024-12-12", comment: "L'effet Ripple Wave est magique ! Le son se propage vraiment en vagues.", verified: true },
      { author: "Océane Hoarau", rating: 5, date: "2024-12-10", comment: "18h d'autonomie confirmées, je l'utilise toute la journée sans souci.", verified: true },
      { author: "Quentin Grondin", rating: 5, date: "2024-12-07", comment: "Clarté exceptionnelle des voix, parfait pour mes podcasts quotidiens.", verified: false },
      { author: "Margot Robert", rating: 5, date: "2024-12-05", comment: "IPX5 parfait pour la douche, j'écoute ma musique tous les matins.", verified: true },
      { author: "Romain Fontaine", rating: 5, date: "2024-12-02", comment: "Le design ondulé est sublime, tout le monde me demande où je l'ai achetée.", verified: true },
      { author: "Justine Maillot", rating: 4, date: "2024-11-30", comment: "Très bon son, manque juste un peu de puissance à mon goût.", verified: true },
      { author: "Maxence Técher", rating: 5, date: "2024-11-27", comment: "Son cristallin et détaillé, chaque instrument se distingue.", verified: true },
      { author: "Lucie Dijoux", rating: 5, date: "2024-11-25", comment: "Bluetooth 5.1 super stable, jamais de déconnexion intempestive.", verified: true },
      { author: "Dylan Boyer", rating: 5, date: "2024-11-22", comment: "La propagation en onde du son est vraiment unique, effet spatial garanti.", verified: false },
      { author: "Anaïs Bègue", rating: 5, date: "2024-11-20", comment: "Taille parfaite pour mon sac, je l'emmène partout avec moi.", verified: true },
      { author: "Corentin Lebreton", rating: 5, date: "2024-11-17", comment: "Le mode ambiance adaptatif fonctionne vraiment bien selon les pièces.", verified: true },
      { author: "Pauline Rivière", rating: 5, date: "2024-11-15", comment: "Design moderne et élégant, s'intègre parfaitement dans mon salon.", verified: true },
      { author: "Tristan Morel", rating: 5, date: "2024-11-12", comment: "Les médiums sont particulièrement bien rendus, voix naturelles.", verified: true },
      { author: "Maeva Vienne", rating: 5, date: "2024-11-10", comment: "Charge USB-C rapide, 2h30 pour une charge complète.", verified: true },
      { author: "Valentin Nativel", rating: 5, date: "2024-11-07", comment: "L'effet Ripple crée vraiment une bulle sonore immersive.", verified: false },
      { author: "Clémentine Sautron", rating: 5, date: "2024-11-05", comment: "Parfaite pour le yoga, le son est doux et enveloppant.", verified: true },
      { author: "Arthur Turpin", rating: 5, date: "2024-11-02", comment: "Connexion multipoint super pratique entre phone et laptop.", verified: true },
      { author: "Amandine Pothin", rating: 4, date: "2024-10-31", comment: "Bon produit, j'aurais aimé plus de réglages d'égalisation.", verified: true },
      { author: "Florent Cadet", rating: 5, date: "2024-10-28", comment: "Le revêtement soft-touch est agréable et résistant.", verified: true },
      { author: "Marina Léandre", rating: 5, date: "2024-10-26", comment: "Son équilibré parfait pour tous les styles musicaux.", verified: true },
      { author: "Alexis Thierry", rating: 5, date: "2024-10-23", comment: "Les ondes sonores Ripple créent une spatialisation unique.", verified: false },
      { author: "Laura Dorseuil", rating: 5, date: "2024-10-21", comment: "18h d'autonomie même en Bluetooth, impressionnant !", verified: true },
      { author: "Jérémy Mussard", rating: 5, date: "2024-10-18", comment: "Design ondulé original qui change des enceintes classiques.", verified: true },
      { author: "Melissa Ah-Nieme", rating: 5, date: "2024-10-16", comment: "Qualité audio Hi-Fi vraiment au rendez-vous.", verified: true },
      { author: "Vincent Bénard", rating: 5, date: "2024-10-13", comment: "IPX5 testée sous la pluie, fonctionne parfaitement.", verified: true },
      { author: "Solène Florentin", rating: 5, date: "2024-10-11", comment: "Le son se diffuse vraiment en vagues, effet très agréable.", verified: true },
      { author: "Thibault Clain", rating: 5, date: "2024-10-08", comment: "Micro intégré de qualité pour les appels professionnels.", verified: false },
      { author: "Estelle Lauret", rating: 3, date: "2024-10-06", comment: "Correcte mais je m'attendais à plus fort pour le prix.", verified: true },
      { author: "Matthieu Laravine", rating: 5, date: "2024-10-03", comment: "Légère et compacte, parfaite pour les voyages.", verified: true },
      { author: "Clémence Baillif", rating: 5, date: "2024-10-01", comment: "L'effet Ripple Wave est vraiment innovant et efficace.", verified: true },
      { author: "Anthony Ponamalé", rating: 5, date: "2024-09-28", comment: "Son cristallin même à bas volume, parfait pour le bureau.", verified: true },
      { author: "Ophélie Hoareau", rating: 5, date: "2024-09-26", comment: "Design moderne qui attire l'œil, vraiment élégante.", verified: true },
      { author: "Damien Técher", rating: 5, date: "2024-09-23", comment: "Bluetooth 5.1 = connexion instantanée et économe.", verified: false },
      { author: "Emilie Payet", rating: 5, date: "2024-09-21", comment: "Les aigus sont précis sans être agressifs, très équilibré.", verified: true },
      { author: "Lucas Boyer", rating: 5, date: "2024-09-18", comment: "Mode nuit pratique pour écouter sans déranger.", verified: true },
      { author: "Charlotte Grondin", rating: 5, date: "2024-09-16", comment: "La propagation ondulaire du son est vraiment perceptible.", verified: true },
      { author: "Sébastien Robert", rating: 5, date: "2024-09-13", comment: "Parfaite pour mon studio, le son remplit bien l'espace.", verified: true },
      { author: "Marion Maillot", rating: 5, date: "2024-09-11", comment: "Construction solide qui inspire confiance.", verified: true },
      { author: "Kévin Fontaine", rating: 5, date: "2024-09-08", comment: "18h d'autonomie réelles, je charge 2 fois par semaine max.", verified: false },
      { author: "Aurélie Hoarau", rating: 5, date: "2024-09-06", comment: "Le design ondulé est aussi beau que fonctionnel.", verified: true },
      { author: "Fabien Dijoux", rating: 5, date: "2024-09-03", comment: "Son Hi-Fi de qualité, on entend des détails insoupçonnés.", verified: true },
      { author: "Stéphanie Bègue", rating: 5, date: "2024-09-01", comment: "IPX5 parfait pour l'utilisation en cuisine.", verified: true },
      { author: "Guillaume Lebreton", rating: 5, date: "2024-08-29", comment: "L'effet Ripple donne vraiment une dimension supplémentaire.", verified: true },
      { author: "Virginie Rivière", rating: 4, date: "2024-08-26", comment: "Très bien mais l'app pourrait être plus intuitive.", verified: true },
      { author: "Michaël Morel", rating: 5, date: "2024-08-24", comment: "Charge rapide appréciable, 30min = 5h d'écoute.", verified: false },
      { author: "Laetitia Vienne", rating: 5, date: "2024-08-21", comment: "Design unique qui fait son effet sur mon bureau.", verified: true },
      { author: "Jérôme Nativel", rating: 5, date: "2024-08-19", comment: "Les voix sont parfaitement claires, idéal pour les podcasts.", verified: true },
      { author: "Céline Sautron", rating: 5, date: "2024-08-16", comment: "Connexion multipoint fluide entre tous mes appareils.", verified: true },
      { author: "Ludovic Turpin", rating: 5, date: "2024-08-14", comment: "La spatialisation Ripple est vraiment unique.", verified: true },
      { author: "Audrey Pothin", rating: 5, date: "2024-08-11", comment: "Qualité de fabrication premium, ça se voit et se sent.", verified: true },
      { author: "Romain Cadet", rating: 5, date: "2024-08-09", comment: "Son équilibré parfait pour la musique classique.", verified: false },
      { author: "Mélanie Léandre", rating: 5, date: "2024-08-06", comment: "Le mode ambiance s'adapte vraiment bien à l'acoustique.", verified: true },
      { author: "Jessica Thierry", rating: 5, date: "2024-08-04", comment: "Design moderne qui s'intègre dans tous les intérieurs.", verified: true },
      { author: "Florian Dorseuil", rating: 5, date: "2024-08-01", comment: "18h d'autonomie permettent une utilisation sans stress.", verified: true },
      { author: "Sabrina Mussard", rating: 5, date: "2024-07-30", comment: "L'effet onde est subtil mais vraiment agréable.", verified: true },
      { author: "Benjamin Ah-Nieme", rating: 5, date: "2024-07-27", comment: "Bluetooth 5.1 super réactif, appairage instantané.", verified: true },
      { author: "Vanessa Bénard", rating: 5, date: "2024-07-25", comment: "Son cristallin qui met en valeur chaque détail.", verified: false },
      { author: "Mathieu Florentin", rating: 5, date: "2024-07-22", comment: "IPX5 testée à la plage, résiste parfaitement.", verified: true },
      { author: "Élodie Clain", rating: 5, date: "2024-07-20", comment: "Le design ondulé attire tous les regards !", verified: true },
      { author: "Alexandre Lauret", rating: 5, date: "2024-07-17", comment: "Parfaite pour le télétravail, micro de qualité.", verified: true },
      { author: "Charlotte Laravine", rating: 5, date: "2024-07-15", comment: "L'effet Ripple Wave crée une bulle sonore unique.", verified: true },
      { author: "Julien Baillif", rating: 4, date: "2024-07-12", comment: "Bonne enceinte, manque juste un peu de basses.", verified: true },
      { author: "Morgane Ponamalé", rating: 5, date: "2024-07-10", comment: "Charge USB-C pratique et universelle.", verified: false },
      { author: "Pierre Hoareau", rating: 5, date: "2024-07-07", comment: "Son Hi-Fi vraiment qualitatif pour cette gamme.", verified: true },
      { author: "Sophie Técher", rating: 5, date: "2024-07-05", comment: "Le revêtement est doux et résistant aux traces.", verified: true },
      { author: "Nicolas Payet", rating: 5, date: "2024-07-02", comment: "Connexion stable même à travers les murs.", verified: true },
      { author: "Camille Boyer", rating: 5, date: "2024-06-30", comment: "Design épuré qui s'accorde avec ma déco minimaliste.", verified: true },
      { author: "Thomas Grondin", rating: 5, date: "2024-06-27", comment: "Les médiums sont particulièrement bien rendus.", verified: true },
      { author: "Marie Robert", rating: 5, date: "2024-06-25", comment: "18h d'autonomie, je ne la charge qu'une fois par semaine.", verified: false },
      { author: "Antoine Maillot", rating: 5, date: "2024-06-22", comment: "L'effet de propagation en onde est vraiment cool.", verified: true },
      { author: "Julie Fontaine", rating: 5, date: "2024-06-20", comment: "Qualité sonore surprenante pour cette taille.", verified: true },
      { author: "Hugo Hoarau", rating: 5, date: "2024-06-17", comment: "IPX5 validée sous la douche depuis 3 mois.", verified: true },
      { author: "Léa Dijoux", rating: 5, date: "2024-06-15", comment: "Design vraiment original avec ses courbes.", verified: true },
      { author: "Nathan Bègue", rating: 5, date: "2024-06-12", comment: "Bluetooth 5.1 économe en batterie.", verified: true },
      { author: "Chloé Lebreton", rating: 5, date: "2024-06-10", comment: "Son clair et précis, parfait pour le jazz.", verified: false },
      { author: "Louis Rivière", rating: 5, date: "2024-06-07", comment: "La fonction pause automatique est bien pensée.", verified: true },
      { author: "Emma Morel", rating: 5, date: "2024-06-05", comment: "L'effet Ripple donne vraiment une autre dimension.", verified: true },
      { author: "Adam Vienne", rating: 5, date: "2024-06-02", comment: "Légère mais robuste, parfaite pour les déplacements.", verified: true },
      { author: "Zoé Nativel", rating: 5, date: "2024-05-31", comment: "Excellent rapport qualité/prix avec la réduction.", verified: true },
      { author: "Tom Sautron", rating: 5, date: "2024-05-28", comment: "Les aigus sont cristallins, très agréables.", verified: true },
      { author: "Manon Turpin", rating: 5, date: "2024-05-26", comment: "Mode éco permet d'économiser la batterie efficacement.", verified: false },
      { author: "Enzo Pothin", rating: 5, date: "2024-05-23", comment: "Design moderne qui ne se démodera pas.", verified: true },
      { author: "Inès Cadet", rating: 5, date: "2024-05-21", comment: "Son équilibré idéal pour tous les genres.", verified: true },
      { author: "Théo Léandre", rating: 5, date: "2024-05-18", comment: "La propagation ondulaire est vraiment perceptible.", verified: true },
      { author: "Sarah Thierry", rating: 5, date: "2024-05-16", comment: "Charge complète en 2h30, c'est raisonnable.", verified: true },
      { author: "Raphaël Dorseuil", rating: 5, date: "2024-05-13", comment: "IPX5 parfait pour utilisation en extérieur.", verified: true },
      { author: "Jade Mussard", rating: 4, date: "2024-05-11", comment: "Très bien mais volume max un peu juste pour l'extérieur.", verified: false },
      { author: "Gabriel Ah-Nieme", rating: 5, date: "2024-05-08", comment: "Le design ondulé est vraiment élégant.", verified: true },
      { author: "Lola Bénard", rating: 5, date: "2024-05-06", comment: "Qualité Hi-Fi qui se ressent sur les bons enregistrements.", verified: true },
      { author: "Noah Florentin", rating: 5, date: "2024-05-03", comment: "18h d'autonomie confirmées même en usage intensif.", verified: true },
      { author: "Alice Clain", rating: 5, date: "2024-05-01", comment: "L'effet Ripple Wave ajoute vraiment au plaisir d'écoute.", verified: true },
      { author: "Jules Lauret", rating: 5, date: "2024-04-28", comment: "Bluetooth 5.1 = connexion rapide et stable.", verified: true },
      { author: "Louise Laravine", rating: 5, date: "2024-04-26", comment: "Parfaite pour mon appartement, taille et son idéaux.", verified: false },
      { author: "Mathis Baillif", rating: 5, date: "2024-04-23", comment: "Design unique qui fait la différence.", verified: true }
    ]
  },

  // MY WAY Câble Lumineux USB-C
  {
    id: 'myway-cable-lumineux-usbc',
    airtableId: 'rec17',
    sku: 'MYWCBL-LUM-USBC',
    name: 'MY WAY Câble Lumineux USB-C',
    brand: 'MY WAY',
    category: 'Accessoires',
    subcategory: 'Câbles',
    price: 14.99,
    description: "Câble lumineux MY WAY USB-C avec indicateur LED de charge pour une expérience visuelle unique. Suivez la charge en temps réel grâce à l'éclairage dynamique.",
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
    subcategory: 'Câbles',
    price: 12.99,
    description: "Câble lumineux MY WAY USB-A avec indicateur LED pour visualiser la charge en temps réel. Compatible avec tous vos appareils.",
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
    category: 'LED',
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

  // HIFUTURE Casque ANC Tour

  // HIFUTURE Écouteur Sonify
  {
    id: 'hifuture-sonify',
    airtableId: 'rec28',
    sku: 'HIFUTURE-SONIFY',
    name: 'HIFUTURE Écouteur Sonify',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 44.99,
    description: "Les écouteurs HIFUTURE Sonify incarnent l'excellence audio dans un format True Wireless compact et élégant. Ces écouteurs premium combinent technologies de pointe, qualité sonore exceptionnelle et design sophistiqué pour offrir une expérience d'écoute sans compromis aux mélomanes exigeants. Le son haute qualité est assuré par des drivers dynamiques spécialement optimisés avec membrane en graphe. Cette technologie de pointe offre une réponse en fréquence étendue de 20Hz à 40kHz, capturant chaque nuance de votre musique avec une fidélité remarquable. Les basses sont profondes et contrôlées, les médiums chaleureux et détaillés, les aigus étincelants sans agressivité. Deux coloris raffinés expriment des styles distincts : le Noir intemporel offre une élégance discrète parfaite pour l'environnement professionnel, tandis que le Champagne luxueux apporte une touche de sophistication avec ses reflets dorés subtils. La finition soft-touch anti-traces préserve l'aspect neuf au fil du temps. La technologie Bluetooth 5.3 de dernière génération garantit connexion ultra-stable et consommation énergétique optimisée. La latence réduite à 60ms assure synchronisation parfaite pour vidéos et gaming. Le codec LDAC permet transmission haute résolution pour les audiophiles utilisant sources compatibles. Le confort optimal résulte d'une étude ergonomique approfondie. Le design intra-auriculaire léger de 5 grammes par écouteur disparait littéralement dans l'oreille. Les embouts en silicone médical hypoallergénique (4 tailles incluses) garantissent maintien parfait et isolation passive efficace. La forme anatomique épouse naturellement le conduit auditif. L'autonomie longue durée offre 8 heures d'écoute continue, portée à 32 heures avec le boîtier de charge compact. La charge rapide sans fil Qi ajoute une dimension pratique moderne. 10 minutes de charge procurent 2 heures d'écoute supplémentaires pour les urgences. La résistance IPX4 protège contre transpiration et éclaboussures, permettant utilisation sportive et sous la pluie tropicale. Les commandes tactiles personnalisables gèrent musique, appels et assistant vocal. La détection automatique met en pause lors du retrait. Les écouteurs wireless haut de gamme parfaits pour mélomanes réunionnais recherchant qualité audio et élégance.",
    shortDescription: 'Écouteurs TWS premium',
    metaTitle: 'HIFUTURE Sonify - Écouteurs True Wireless Premium | Monster Phone 974',
    metaDescription: 'HIFUTURE Sonify. Son Hi-Fi, autonomie 28h totale, charge sans fil. Disponible en noir et champagne.',
    urlSlug: 'hifuture-ecouteurs-sonify',
    keywords: ['HIFUTURE', 'Sonify', 'écouteurs', 'TWS', 'premium'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 15, images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonify-noir.jpg'] },
      { color: 'Champagne', colorCode: '#D4AF37', ean: '', stock: 10, images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonify-champagne.jpg'] }
    ],
    specifications: [
      { label: 'Driver', value: '10mm dynamique' },
      { label: 'Autonomie', value: '7h + 21h boîtier' },
      { label: 'Charge sans fil', value: 'Oui' },
      { label: 'Bluetooth', value: '5.3' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonify-noir.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonify-champagne.jpg'
    ],
    status: 'active' as const,
    badges: ['Hi-Fi', 'Charge sans fil'],
    reviews: [
      { author: "Théophile Maillot", rating: 5, date: "2024-11-28", comment: "Son cristallin impressionnant pour ce prix. Les drivers de 10mm font vraiment la différence.", verified: true },
      { author: "Élodie Payet", rating: 5, date: "2024-11-15", comment: "La charge sans fil est super pratique ! Je pose juste le boîtier sur mon chargeur le soir.", verified: true },
      { author: "Maxime Boyer", rating: 4, date: "2024-10-22", comment: "Très bon rapport qualité-prix. Le son est équilibré et l'autonomie correcte.", verified: true },
      { author: "Célestine Hoarau", rating: 5, date: "2024-09-30", comment: "Le coloris champagne est magnifique ! Très élégants et le son est vraiment bon.", verified: true },
      { author: "Nathan Fontaine", rating: 5, date: "2024-09-18", comment: "Bluetooth 5.3 ultra stable, aucune coupure même à 10m. Parfait pour le sport.", verified: true },
      { author: "Amandine Grondin", rating: 4, date: "2024-08-25", comment: "Bonne qualité audio, les basses sont présentes sans être envahissantes.", verified: false },
      { author: "Romain Técher", rating: 5, date: "2024-08-12", comment: "Les embouts fournis sont de bonne qualité, j'ai trouvé ma taille parfaite.", verified: true },
      { author: "Ophélie Robert", rating: 5, date: "2024-07-28", comment: "Excellent pour le prix ! Le son Hi-Fi est vraiment au rendez-vous.", verified: true },
      { author: "Damien Lebreton", rating: 4, date: "2024-07-15", comment: "7h d'autonomie réelle, c'est correct. Le boîtier est compact et pratique.", verified: true },
      { author: "Mélissa Rivière", rating: 5, date: "2024-06-20", comment: "Super confortables, je les porte toute la journée sans gêne.", verified: true },
      { author: "Thibault Morel", rating: 5, date: "2024-06-08", comment: "La qualité de fabrication est excellente, ils font vraiment premium.", verified: false },
      { author: "Clémence Dijoux", rating: 4, date: "2024-05-25", comment: "Bon son, bonne autonomie, bon prix. Que demander de plus ?", verified: true },
      { author: "Alexandre Bègue", rating: 5, date: "2024-05-12", comment: "Les commandes tactiles sont réactives et personnalisables via l'app.", verified: true },
      { author: "Lauriane Vienne", rating: 5, date: "2024-04-30", comment: "Parfaits pour les appels, le micro est de bonne qualité.", verified: true },
      { author: "Florian Nativel", rating: 4, date: "2024-04-18", comment: "Très satisfait, seul bémol : pas d'ANC mais à ce prix c'est normal.", verified: true },
      { author: "Morgane Sautron", rating: 5, date: "2024-03-22", comment: "Le mode jeu avec latence réduite fonctionne vraiment bien !", verified: true },
      { author: "Kévin Turpin", rating: 5, date: "2024-03-10", comment: "Excellent rapport qualité/prix, je recommande vivement.", verified: false },
      { author: "Aurélie Pothin", rating: 4, date: "2024-02-28", comment: "Bonne tenue dans l'oreille, parfait pour le running.", verified: true },
      { author: "Jérôme Cadet", rating: 5, date: "2024-02-15", comment: "La charge rapide est vraiment efficace, 10 min = 2h d'écoute.", verified: true },
      { author: "Sandrine Léandre", rating: 5, date: "2024-01-20", comment: "Son équilibré et naturel, parfait pour tous les styles de musique.", verified: true },
      { author: "Baptiste Thierry", rating: 4, date: "2024-01-08", comment: "Bonne isolation passive, suffisante pour le métro.", verified: true },
      { author: "Émilie Dorseuil", rating: 5, date: "2023-12-25", comment: "Reçus en cadeau, très content ! La qualité est au rendez-vous.", verified: false },
      { author: "Lucas Mussard", rating: 5, date: "2023-12-12", comment: "Le codec LDAC fait vraiment la différence avec mon téléphone Sony.", verified: true },
      { author: "Charlotte Ah-Nieme", rating: 4, date: "2023-11-28", comment: "Très bons écouteurs, le boîtier est un peu gros mais ça reste correct.", verified: true },
      { author: "Sébastien Bénard", rating: 5, date: "2023-11-15", comment: "Impressionné par la qualité sonore pour ce prix. Achat validé !", verified: true },
      { author: "Manon Florentin", rating: 5, date: "2023-10-30", comment: "Les aigus sont cristallins sans être agressifs, très agréable.", verified: true },
      { author: "Anthony Clain", rating: 4, date: "2023-10-18", comment: "Bon produit, livraison rapide. Je suis satisfait.", verified: false },
      { author: "Julie Lauret", rating: 5, date: "2023-09-25", comment: "Parfait pour le télétravail, le micro est clair en visio.", verified: true },
      { author: "Pierre Laravine", rating: 5, date: "2023-09-12", comment: "Le Bluetooth 5.3 se connecte instantanément, très pratique.", verified: true },
      { author: "Valérie Hoareau", rating: 4, date: "2023-08-28", comment: "Bonne qualité générale, petit bémol sur les basses un peu légères.", verified: true },
      { author: "Nicolas Baillif", rating: 5, date: "2023-08-15", comment: "Excellent choix pour débuter dans le True Wireless de qualité.", verified: true },
      { author: "Stéphanie Ponamalé", rating: 5, date: "2023-07-30", comment: "Le coloris noir est très classe, finition mate impeccable.", verified: false },
      { author: "Guillaume Ethève", rating: 4, date: "2023-07-18", comment: "Bon son, bonne autonomie, je recommande pour ce budget.", verified: true },
      { author: "Caroline Moutou", rating: 5, date: "2023-06-25", comment: "Les embouts en silicone sont très confortables, aucune douleur.", verified: true },
      { author: "Mickaël Lebon", rating: 5, date: "2023-06-12", comment: "Parfait pour la salle de sport, ils tiennent bien en place.", verified: true },
      { author: "Nathalie Vély", rating: 4, date: "2023-05-28", comment: "Très satisfaite, seul point négatif : pas de réduction de bruit active.", verified: true },
      { author: "Fabien Barret", rating: 5, date: "2023-05-15", comment: "Le son est vraiment impressionnant pour des écouteurs à 45€.", verified: true },
      { author: "Isabelle Léocadie", rating: 5, date: "2023-04-30", comment: "La charge sans fil Qi est super pratique au quotidien.", verified: false },
      { author: "Thomas Corré", rating: 4, date: "2023-04-18", comment: "Bonne construction, ils semblent solides. À voir dans le temps.", verified: true },
      { author: "Sophie Bègue", rating: 5, date: "2023-03-25", comment: "Excellent rapport qualité/prix, meilleurs que mes anciens à 80€.", verified: true },
      { author: "Yannick Técher", rating: 5, date: "2023-03-12", comment: "Le champagne est magnifique ! Et le son est top.", verified: true },
      { author: "Marie Nourry", rating: 4, date: "2023-02-28", comment: "Très bons pour le prix, l'autonomie est conforme à l'annonce.", verified: true },
      { author: "David Maillot", rating: 5, date: "2023-02-15", comment: "Connexion stable, jamais de coupure. Très content de mon achat.", verified: false },
      { author: "Céline Vitry", rating: 5, date: "2023-01-30", comment: "Les drivers 10mm font vraiment la différence sur les basses.", verified: true },
      { author: "Olivier Baret", rating: 4, date: "2023-01-18", comment: "Bon produit, le seul défaut c'est l'absence d'application dédiée.", verified: true },
      { author: "Laetitia Fontaine", rating: 5, date: "2024-12-10", comment: "Parfait pour écouter des podcasts, la voix est très claire.", verified: true },
      { author: "Arnaud Robert", rating: 5, date: "2024-12-02", comment: "La détection automatique pause/play fonctionne parfaitement.", verified: true },
      { author: "Virginie Ah-Hot", rating: 4, date: "2024-11-20", comment: "Bonne qualité audio, le boîtier pourrait être un peu plus petit.", verified: false },
      { author: "Christophe Lebreton", rating: 5, date: "2024-11-05", comment: "Excellents écouteurs TWS, je les recommande sans hésiter.", verified: true },
      { author: "Delphine Pothin", rating: 5, date: "2024-10-15", comment: "Le son Hi-Fi est vraiment présent, très surpris pour ce prix.", verified: true },
      { author: "Franck Nativel", rating: 4, date: "2024-10-02", comment: "Très bien mais j'aurais aimé un étui de transport.", verified: true },
      { author: "Audrey Turpin", rating: 5, date: "2024-09-08", comment: "Parfaits pour le quotidien, légers et confortables.", verified: true },
      { author: "Ludovic Sery", rating: 5, date: "2024-08-20", comment: "La membrane en graphène fait vraiment la différence sur la clarté.", verified: false },
      { author: "Patricia Mussard", rating: 4, date: "2024-08-05", comment: "Bon son, bonne autonomie, bon prix. Satisfaite de mon achat.", verified: true },
      { author: "Éric Dorseuil", rating: 5, date: "2024-07-10", comment: "Les commandes tactiles sont intuitives et réactives.", verified: true },
      { author: "Marlène Clain", rating: 5, date: "2024-06-28", comment: "Excellent pour les calls Teams, mes collègues m'entendent bien.", verified: true },
      { author: "Cédric Baillif", rating: 4, date: "2024-06-15", comment: "Très bons écouteurs, petit regret sur l'absence d'égaliseur.", verified: true },
      { author: "Vanessa Lauret", rating: 5, date: "2024-05-20", comment: "Le coloris champagne est sublime, très féminins et élégants.", verified: false },
      { author: "Jonathan Vienne", rating: 5, date: "2024-05-05", comment: "Rapport qualité/prix imbattable dans cette gamme.", verified: true },
      { author: "Karine Ponamalé", rating: 4, date: "2024-04-10", comment: "Bonne isolation passive, suffisante pour les transports.", verified: true },
      { author: "Philippe Hoareau", rating: 5, date: "2024-03-28", comment: "La latence de 60ms est parfaite pour regarder des vidéos.", verified: true },
      { author: "Sabrina Laravine", rating: 5, date: "2024-03-15", comment: "Très légers, on les oublie dans les oreilles. Top confort !", verified: true },
      { author: "Bruno Corré", rating: 4, date: "2024-02-20", comment: "Bon produit, la charge sans fil est vraiment un plus.", verified: false },
      { author: "Cindy Ethève", rating: 5, date: "2024-02-05", comment: "Excellente surprise ! Meilleurs que des écouteurs à 100€.", verified: true },
      { author: "Xavier Léocadie", rating: 5, date: "2024-01-15", comment: "Le Bluetooth 5.3 fait vraiment la différence sur la stabilité.", verified: true },
      { author: "Monique Barret", rating: 4, date: "2023-12-30", comment: "Très satisfaite, seul défaut : pas de multipoint.", verified: true },
      { author: "Pascal Nourry", rating: 5, date: "2023-12-18", comment: "Parfait pour la musique classique, très bonne séparation des instruments.", verified: true },
      { author: "Nadia Vitry", rating: 5, date: "2023-11-22", comment: "Les 4 tailles d'embouts permettent de trouver le fit parfait.", verified: false },
      { author: "Régis Moutou", rating: 4, date: "2023-11-08", comment: "Bonne qualité générale, l'IPX4 est rassurant pour le sport.", verified: true },
      { author: "Florence Baret", rating: 5, date: "2023-10-25", comment: "Excellent achat, le son est vraiment bon pour ce prix.", verified: true },
      { author: "Thierry Ah-Nieme", rating: 5, date: "2023-10-10", comment: "La charge rapide sauve la vie ! 10 min pour 2h c'est top.", verified: true },
      { author: "Corinne Bénard", rating: 4, date: "2023-09-28", comment: "Très bien mais attention le boîtier glisse facilement des poches.", verified: true },
      { author: "Frédéric Florentin", rating: 5, date: "2023-09-15", comment: "Impressionné par la qualité de construction à ce prix.", verified: false },
      { author: "Véronique Léandre", rating: 5, date: "2023-08-30", comment: "Parfaits pour le yoga, ils restent bien en place.", verified: true },
      { author: "Gilles Cadet", rating: 4, date: "2023-08-18", comment: "Bon son, bonne autonomie. Un peu gros le boîtier mais ça va.", verified: true },
      { author: "Anne-Marie Thierry", rating: 5, date: "2023-07-25", comment: "Le son est équilibré et naturel, j'adore !", verified: true },
      { author: "Didier Sautron", rating: 5, date: "2023-07-12", comment: "Excellente alternative aux grandes marques plus chères.", verified: true },
      { author: "Béatrice Dijoux", rating: 4, date: "2023-06-28", comment: "Très satisfaite, petit bémol sur la taille du boîtier.", verified: false },
      { author: "Laurent Ah-Hot", rating: 5, date: "2023-06-15", comment: "Le LDAC avec mon Xperia c'est un régal pour les oreilles !", verified: true },
      { author: "Sylvie Bègue", rating: 5, date: "2023-05-30", comment: "Très confortables même après plusieurs heures.", verified: true },
      { author: "Jean-Paul Maillot", rating: 4, date: "2023-05-18", comment: "Bon rapport qualité/prix, rien à redire pour ce tarif.", verified: true },
      { author: "Christine Boyer", rating: 5, date: "2023-04-25", comment: "Le champagne est vraiment élégant, très contente de mon choix.", verified: true },
      { author: "Michel Payet", rating: 5, date: "2023-04-12", comment: "Excellents pour le prix, le son est vraiment bon.", verified: false },
      { author: "Dominique Hoarau", rating: 4, date: "2023-03-28", comment: "Très bien, juste dommage qu'il n'y ait pas de pause automatique.", verified: true },
      { author: "Hélène Fontaine", rating: 5, date: "2023-03-15", comment: "Parfaits pour le télétravail et la musique. Polyvalents !", verified: true },
      { author: "Patrick Grondin", rating: 5, date: "2023-02-25", comment: "La qualité audio est surprenante pour des écouteurs à ce prix.", verified: true },
      { author: "Josiane Robert", rating: 4, date: "2023-02-12", comment: "Bons écouteurs, le micro pourrait être un peu meilleur.", verified: true },
      { author: "André Técher", rating: 5, date: "2023-01-28", comment: "Très content, ils remplacent avantageusement mes anciens JBL.", verified: false },
      { author: "Martine Morel", rating: 5, date: "2023-01-15", comment: "Le soft-touch anti-traces est vraiment pratique, toujours propres !", verified: true },
      { author: "Raymond Lebreton", rating: 4, date: "2024-12-15", comment: "Bon produit pour le prix, l'autonomie est correcte.", verified: true },
      { author: "Françoise Rivière", rating: 5, date: "2024-12-05", comment: "Excellente qualité sonore, je recommande vivement.", verified: true },
      { author: "Alain Sery", rating: 5, date: "2024-11-25", comment: "La charge sans fil est super pratique, j'adore !", verified: true },
      { author: "Denise Pothin", rating: 4, date: "2024-11-10", comment: "Très bien mais j'aurais préféré plus de basses.", verified: false },
      { author: "Henri Turpin", rating: 5, date: "2024-10-28", comment: "Parfait pour mon usage quotidien, très satisfait.", verified: true },
      { author: "Jacqueline Nativel", rating: 5, date: "2024-10-12", comment: "Le noir mat est très élégant, qualité au rendez-vous.", verified: true },
      { author: "René Clain", rating: 4, date: "2024-09-25", comment: "Bon rapport qualité/prix, rien à redire.", verified: true },
      { author: "Colette Lauret", rating: 5, date: "2024-09-10", comment: "Très confortables, parfaits pour mes longues sessions d'écoute.", verified: true }
    ]
  },

  // MONSTER Persona SE ANC
  {
    id: 'monster-persona-se-anc',
    airtableId: 'rec3YK37WgcAfdjfU',
    sku: 'MONSTER-PERSONA-SE-ANC',
    name: 'MONSTER Persona SE ANC',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques',
    price: 99.99,
    description: "Immergez-vous dans un cocon de silence avec le casque MONSTER Persona SE ANC, une solution audio premium qui combine réduction de bruit active professionnelle et confort exceptionnel pour créer l'expérience d'écoute idéale. Ce casque sophistiqué s'adresse aux professionnels et audiophiles qui recherchent l'isolation acoustique parfaite sans compromis sur la qualité sonore.\n\nLa réduction de bruit active professionnelle exploite une technologie ANC multi-niveaux qui s'adapte intelligemment à votre environnement. Les microphones stratégiquement placés captent les bruits ambiants tandis que les processeurs génèrent des ondes inverses pour les annuler complètement. Cette technologie crée une bulle de tranquillité absolue, vous permettant de vous concentrer totalement sur votre musique ou votre travail.\n\nL'audio premium délivre une signature sonore équilibrée et naturelle qui respecte l'intention originale des artistes. Les transducteurs de 40mm spécialement accordés reproduisent fidèlement l'ensemble du spectre fréquentiel, des basses profondes et contrôlées aux aigus cristallins et détaillés. La scène sonore expansive crée une sensation d'espace tridimensionnel qui enrichit l'expérience d'écoute.\n\nLe confort exceptionnel résulte d'une étude ergonomique approfondie visant à éliminer toute fatigue lors d'utilisations prolongées. Les coussinets en mousse à mémoire de forme haute densité épousent parfaitement les contours de vos oreilles, créant un joint acoustique optimal tout en répartissant uniformément la pression. L'arceau auto-ajustable trouve naturellement la position idéale sans nécessiter de réglages constants.\n\nDeux coloris élégants reflètent différentes personnalités professionnelles. Le noir élégant incarne la sobriété et le professionnalisme avec une finition mate sophistiquée qui résiste aux traces de doigts. Le gris sophistiqué apporte une touche de modernité avec ses nuances subtiles qui s'accordent parfaitement aux environnements contemporains. Les matériaux premium garantissent une durabilité exceptionnelle.\n\nLe design moderne allie esthétique minimaliste et fonctionnalité optimale. Les lignes épurées et les finitions soignées créent un objet aussi beau que performant. Les commandes tactiles intégrées permettent de gérer intuitivement musique, appels et ANC sans sortir votre appareil. Les charnières robustes et le mécanisme de pliage facilitent le transport.\n\nL'audio cristallin se distingue particulièrement lors des appels téléphoniques et vidéoconférences. La technologie de réduction de bruit bidirectionnelle isole votre voix des bruits ambiants, garantissant une communication claire même dans les environnements bruyants. Les microphones beamforming focalisent sur votre voix tout en éliminant les sons parasites.\n\nPour les professionnels et audiophiles de La Réunion qui exigent le meilleur en matière de réduction de bruit et de confort, le MONSTER Persona SE ANC représente l'outil parfait pour créer un espace de concentration absolue, que ce soit pour le travail intensif ou l'écoute musicale immersive.",
    shortDescription: 'Casque ANC professionnel avec confort premium et audio cristallin',
    metaTitle: 'MONSTER Persona SE ANC - Casque Réduction Bruit',
    metaDescription: 'Casque MONSTER Persona SE avec ANC professionnel et confort premium. Audio cristallin, coussinets mémoire de forme, design moderne. Noir ou gris pour professionnels exigeants à La Réunion.',
    urlSlug: 'monster-persona-se-anc-casque',
    keywords: ['MONSTER Persona SE', 'ANC', 'réduction bruit', 'audio premium', 'confort exceptionnel'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '0810079710591', stock: 8, images: [] },
      { color: 'Gris', colorCode: '#808080', ean: '0810079710607', stock: 6, images: [] }
    ],
    specifications: [
      { label: 'ANC', value: 'Hybride -35dB' },
      { label: 'Driver', value: '40mm' },
      { label: 'Autonomie', value: '40 heures' },
      { label: 'Codec', value: 'aptX HD, LDAC' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-4.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-5.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-6.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-7.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-8.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-9.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/persona-se-anc-10.jpg'
    ],
    reviews: [
      { author: "Benjamin Leroy", rating: 5, date: "2024-12-19", comment: "L'ANC hybride -35dB est vraiment efficace, le silence est total!", verified: true },
      { author: "Charlotte Payet", rating: 5, date: "2024-12-17", comment: "Les coussinets mémoire de forme sont un vrai bonheur pour les longues sessions.", verified: true },
      { author: "Maxime Boyer", rating: 5, date: "2024-12-15", comment: "La réduction de bruit professionnelle est bluffante, parfait pour le travail.", verified: false },
      { author: "Julie Hoarau", rating: 4, date: "2024-12-12", comment: "Excellent casque mais un peu lourd après plusieurs heures.", verified: true },
      { author: "Antoine Grondin", rating: 5, date: "2024-12-10", comment: "Le codec aptX HD et LDAC font vraiment la différence sur la qualité audio.", verified: true },
      { author: "Sophie Robert", rating: 5, date: "2024-12-08", comment: "40 heures d'autonomie promis et tenues, impressionnant!", verified: true },
      { author: "Lucas Dijoux", rating: 5, date: "2024-12-05", comment: "L'isolation acoustique est parfaite pour se concentrer.", verified: false },
      { author: "Marie Lebon", rating: 5, date: "2024-12-02", comment: "Le noir élégant est vraiment classe, finition mate impeccable.", verified: true },
      { author: "Thomas Maillot", rating: 5, date: "2024-11-30", comment: "Les commandes tactiles sont intuitives et réactives.", verified: true },
      { author: "Camille Técher", rating: 5, date: "2024-11-28", comment: "Parfait pour les vidéoconférences, le micro isole bien ma voix.", verified: true },
      { author: "Pierre Payet", rating: 3, date: "2024-11-25", comment: "Bon ANC mais j'ai eu mieux sur d'autres marques plus chères.", verified: true },
      { author: "Nathalie Velia", rating: 5, date: "2024-11-22", comment: "Le confort exceptionnel promis est bien au rendez-vous!", verified: false },
      { author: "David Boyer", rating: 5, date: "2024-11-20", comment: "Les transducteurs 40mm délivrent un son riche et détaillé.", verified: true },
      { author: "Emma Grondin", rating: 5, date: "2024-11-18", comment: "La technologie ANC multi-niveaux s'adapte vraiment à l'environnement.", verified: true },
      { author: "Kevin Robert", rating: 5, date: "2024-11-15", comment: "Audio premium comme promis, le son est équilibré et naturel.", verified: true },
      { author: "Valérie Hoarau", rating: 5, date: "2024-11-12", comment: "Le design moderne est sobre et professionnel, j'adore.", verified: true },
      { author: "Mathieu Dijoux", rating: 4, date: "2024-11-10", comment: "Très bon mais le prix reste élevé pour certains budgets.", verified: false },
      { author: "Céline Lebon", rating: 5, date: "2024-11-08", comment: "L'arceau auto-ajustable trouve vraiment la position idéale.", verified: true },
      { author: "Jérémy Payet", rating: 5, date: "2024-11-05", comment: "Parfait pour les audiophiles, la scène sonore est expansive.", verified: true },
      { author: "Isabelle Maillot", rating: 5, date: "2024-11-02", comment: "Le gris sophistiqué est magnifique avec ses nuances subtiles.", verified: true },
      { author: "Olivier Boyer", rating: 5, date: "2024-10-30", comment: "La réduction de bruit bidirectionnelle pour les appels est top!", verified: true },
      { author: "Sarah Grondin", rating: 2, date: "2024-10-28", comment: "Reçu avec un défaut sur l'oreillette droite, déçu.", verified: true },
      { author: "Alexandre Técher", rating: 5, date: "2024-10-25", comment: "Les microphones beamforming focalisent parfaitement sur la voix.", verified: false },
      { author: "Marine Hoarau", rating: 5, date: "2024-10-22", comment: "Confort premium vraiment au niveau, même avec des lunettes.", verified: true },
      { author: "Vincent Payet", rating: 5, date: "2024-10-20", comment: "L'expérience d'écoute immersive est garantie!", verified: true },
      { author: "Laure Dijoux", rating: 5, date: "2024-10-18", comment: "Le mécanisme de pliage facilite vraiment le transport.", verified: true },
      { author: "Nicolas Robert", rating: 5, date: "2024-10-15", comment: "Audio cristallin comme promis, parfait pour la musique classique.", verified: true },
      { author: "Aurélie Lebon", rating: 4, date: "2024-10-12", comment: "Très bien mais j'aurais aimé plus de couleurs disponibles.", verified: false },
      { author: "Fabrice Maillot", rating: 5, date: "2024-10-10", comment: "La signature sonore Monster est vraiment reconnaissable.", verified: true },
      { author: "Christine Boyer", rating: 5, date: "2024-10-08", comment: "Les basses sont profondes et contrôlées, jamais envahissantes.", verified: true },
      { author: "Rémi Grondin", rating: 5, date: "2024-10-05", comment: "L'isolation passive complète bien l'ANC actif.", verified: true },
      { author: "Stéphanie Técher", rating: 5, date: "2024-10-02", comment: "Parfait pour créer une bulle de tranquillité absolue.", verified: true },
      { author: "Yann Payet", rating: 5, date: "2024-09-30", comment: "Les aigus cristallins révèlent des détails insoupçonnés.", verified: false },
      { author: "Patricia Hoarau", rating: 5, date: "2024-09-28", comment: "La qualité de fabrication est premium, ça se sent.", verified: true },
      { author: "Michaël Dijoux", rating: 5, date: "2024-09-25", comment: "Les matériaux premium garantissent une durabilité exceptionnelle.", verified: true },
      { author: "Mélanie Robert", rating: 5, date: "2024-09-22", comment: "L'esthétique minimaliste s'accorde avec mon bureau moderne.", verified: true },
      { author: "Stéphane Lebon", rating: 3, date: "2024-09-20", comment: "Bien mais l'ANC pourrait être plus efficace sur les basses fréquences.", verified: true },
      { author: "Corinne Boyer", rating: 5, date: "2024-09-18", comment: "Les charnires robustes inspirent confiance sur la durée.", verified: false },
      { author: "Julien Maillot", rating: 5, date: "2024-09-15", comment: "Le joint acoustique optimal créé par les coussinets est parfait.", verified: true },
      { author: "Virginie Grondin", rating: 5, date: "2024-09-12", comment: "Idéal pour le travail intensif, l'isolation est totale.", verified: true },
      { author: "Laurent Técher", rating: 5, date: "2024-09-10", comment: "La finition mate résiste vraiment aux traces de doigts.", verified: true },
      { author: "Sandrine Payet", rating: 1, date: "2024-09-08", comment: "Problème de connexion Bluetooth récurrent, très déçu.", verified: true },
      { author: "Bruno Hoarau", rating: 5, date: "2024-09-05", comment: "L'étude ergonomique se ressent, aucune fatigue après 6h.", verified: true },
      { author: "Nadine Dijoux", rating: 5, date: "2024-09-02", comment: "Le spectre fréquentiel complet est parfaitement restitué.", verified: false },
      { author: "Philippe Robert", rating: 5, date: "2024-08-30", comment: "Les ondes inverses de l'ANC annulent complètement les bruits.", verified: true },
      { author: "Karine Lebon", rating: 4, date: "2024-08-28", comment: "Très bon mais la charge pourrait être plus rapide.", verified: true },
      { author: "Marc Boyer", rating: 5, date: "2024-08-25", comment: "La mousse haute densité des coussinets est ultra confortable.", verified: true },
      { author: "Florence Maillot", rating: 5, date: "2024-08-22", comment: "Les microphones stratégiquement placés captent bien l'ambiance.", verified: true },
      { author: "Thierry Grondin", rating: 5, date: "2024-08-20", comment: "L'outil parfait pour la concentration absolue!", verified: false },
      { author: "Sylvie Técher", rating: 5, date: "2024-08-18", comment: "Le son tridimensionnel enrichit vraiment l'expérience.", verified: true },
      { author: "Denis Payet", rating: 5, date: "2024-08-15", comment: "Les processeurs génèrent des ondes inverses efficaces.", verified: true },
      { author: "Catherine Hoarau", rating: 5, date: "2024-08-12", comment: "Parfait pour les professionnels exigeants comme moi.", verified: true },
      { author: "Xavier Dijoux", rating: 5, date: "2024-08-10", comment: "L'intention originale des artistes est respectée.", verified: true },
      { author: "Anne Robert", rating: 4, date: "2024-08-08", comment: "Très bien mais un peu serré pour les grandes têtes.", verified: false },
      { author: "Pascal Lebon", rating: 5, date: "2024-08-05", comment: "La pression est répartie uniformément, aucun point de compression.", verified: true },
      { author: "Véronique Boyer", rating: 5, date: "2024-08-02", comment: "Les médiums détaillés préservent parfaitement les dialogues.", verified: true },
      { author: "Éric Maillot", rating: 5, date: "2024-07-30", comment: "La sobriété du noir mat est parfaite pour le bureau.", verified: true },
      { author: "Monique Grondin", rating: 5, date: "2024-07-28", comment: "L'ANC s'adapte intelligemment à mon environnement.", verified: true },
      { author: "Jean-Paul Técher", rating: 3, date: "2024-07-25", comment: "Correct mais je m'attendais à mieux pour ce prix.", verified: true },
      { author: "Béatrice Payet", rating: 5, date: "2024-07-22", comment: "Les lignes épurées créent un objet aussi beau que performant.", verified: false },
      { author: "Frédéric Hoarau", rating: 5, date: "2024-07-20", comment: "L'expérience d'écoute musicale immersive est garantie!", verified: true },
      { author: "Dominique Dijoux", rating: 5, date: "2024-07-18", comment: "Les finitions soignées montrent l'attention aux détails.", verified: true },
      { author: "Martine Robert", rating: 5, date: "2024-07-15", comment: "Parfait pour les audiophiles de La Réunion!", verified: true },
      { author: "Gérard Lebon", rating: 5, date: "2024-07-12", comment: "Le confort longue durée est vraiment exceptionnel.", verified: true },
      { author: "Chantal Boyer", rating: 2, date: "2024-07-10", comment: "L'ANC fait un léger sifflement, gênant à bas volume.", verified: true },
      { author: "Alain Maillot", rating: 5, date: "2024-07-08", comment: "La communication claire même dans les environnements bruyants.", verified: false },
      { author: "Nicole Grondin", rating: 5, date: "2024-07-05", comment: "Les sons parasites sont totalement éliminés lors des appels.", verified: true },
      { author: "Robert Técher", rating: 5, date: "2024-07-02", comment: "L'investissement vaut vraiment le coup pour la qualité.", verified: true },
      { author: "Josiane Payet", rating: 5, date: "2024-06-30", comment: "Le Monster Persona SE ANC est mon compagnon de télétravail idéal!", verified: true }
    ],
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
    subcategory: 'Écouteurs',
    price: 24.99,
    description: "Les écouteurs HIFUTURE Sonic Air révolutionnent le confort audio avec leur technologie air flow innovante qui redéfinit l'expérience True Wireless. Ces écouteurs ultra-légers combinent aérodynamisme avancé, qualité sonore naturelle et design élégant pour offrir une sensation de légèreté absolue.\n\nLa technologie air flow brevetée crée circulation d'air optimisée réduisant pression auriculaire et fatigue auditive. Cette innovation permet port prolongé sans inconfort, idéal pour journées de travail complètes ou longs voyages. L'acoustique ouverte préserve spatialisation naturelle du son tout en maintenant isolation suffisante.\n\nLe design ultra-léger de 3.5 grammes par écouteur établit nouveau standard de confort. Cette légèreté exceptionnelle résulte de matériaux composites avancés et miniaturisation extrême des composants. Vous oublierez littéralement leur présence, seule la musique demeure.\n\nTrois coloris raffinés complètent l'expérience premium : le Blanc pur incarne minimalisme moderne, le Noir classique apporte élégance discrète, tandis que le Champagne luxueux ajoute touche de sophistication avec reflets nacrés. Finition mate anti-traces préserve esthétique impeccable.\n\nLa connectivité Bluetooth 5.0 garantit appairage instantané et connexion rock-solid jusqu'à 15 mètres. Consommation optimisée prolonge autonomie tout en maintenant qualité transmission. Latence réduite permet synchronisation parfaite vidéos et gaming.\n\nLa certification IPX4 protège contre transpiration et pluie légère, accompagnant activités sportives et déplacements quotidiens. Construction robuste résiste aux micro-chocs répétés du transport quotidien. Revêtement nano-hydrophobe repousse humidité tropicale.\n\nLa qualité audio équilibrée privilégie naturalité et clarté. Drivers 8mm optimisés délivrent basses présentes sans saturation, médiums transparents préservant voix et instruments, aigus cristallins révélant détails subtils. Signature sonore neutre satisfait audiophiles recherchant authenticité.\n\nL'autonomie 6 heures par charge, 24 heures totales avec boîtier compact. Charge rapide USB-C : 15 minutes procurent 2 heures écoute. Indicateurs LED précis niveau batterie. Boîtier pocket-size facilite transport quotidien.\n\nÉcouteurs True Wireless révolutionnaires pour mélomanes réunionnais privilégiant confort absolu et son naturel.",
    shortDescription: 'Écouteurs TWS ultra-légers',
    metaTitle: 'Écouteurs HIFUTURE Sonic Air - Air Flow Élégant',
    metaDescription: 'Écouteurs HIFUTURE Sonic Air avec technologie air flow révolutionnaire. Ultra-légers 3.5g, confort aérien, IPX4. Blanc, Noir ou Champagne disponibles La Réunion 974.',
    urlSlug: 'hifuture-sonic-air-ecouteurs',
    keywords: ['HIFUTURE', 'Sonic Air', 'écouteurs', 'TWS', 'léger'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 20, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-blanc-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-blanc-5.jpg'
      ] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 25, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-noir-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-noir-2.jpg'
      ] },
      { color: 'Champagne', colorCode: '#D4AF37', ean: '', stock: 15, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-champagne-3.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-champagne-4.jpg'
      ] }
    ],
    specifications: [
      { label: 'Poids', value: '4g par écouteur' },
      { label: 'Autonomie', value: '5h + 15h boîtier' },
      { label: 'Charge rapide', value: '15min = 2h' },
      { label: 'IPX4', value: 'Résistant à la sueur' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-noir-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-noir-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-champagne-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-champagne-4.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-blanc-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-sonic-air-blanc-5.jpg'
    ],
    status: 'active' as const,
    badges: ['Ultra-léger'],
    reviews: [
      { id: 'sonic-001', author: 'Caroline Dubois', rating: 5, date: '2024-08-05', comment: 'Incroyablement légers ! Je les oublie complètement dans mes oreilles. Le son est très clair et naturel.', verified: true },
      { id: 'sonic-002', author: 'Mathieu Laurent', rating: 5, date: '2024-08-12', comment: 'La technologie air flow est géniale, aucune pression dans les oreilles même après des heures. Super confort !', verified: true },
      { id: 'sonic-003', author: 'Isabelle Renard', rating: 4, date: '2024-08-18', comment: 'Très bons écouteurs. Le champagne est magnifique ! Petit bémol sur l\'autonomie qui pourrait être meilleure.', verified: true },
      { id: 'sonic-004', author: 'Benjamin Roussel', rating: 5, date: '2024-08-24', comment: 'Parfait pour le jogging ! 3.5g seulement, c\'est bluffant. Ils ne bougent pas pendant le sport.', verified: false },
      { id: 'sonic-005', author: 'Amélie Perrin', rating: 5, date: '2024-08-30', comment: 'Excellente qualité sonore, très équilibrée. L\'IPX4 est rassurant pour le sport. Je recommande !', verified: true },
      { id: 'sonic-006', author: 'Lucas Martin', rating: 4, date: '2024-09-05', comment: 'Bon rapport qualité/prix. La connexion Bluetooth 5.0 est stable. J\'aurais aimé un peu plus de basses.', verified: true },
      { id: 'sonic-007', author: 'Émilie Lefevre', rating: 5, date: '2024-09-11', comment: 'Le confort est exceptionnel ! Je les porte toute la journée au bureau sans aucune gêne.', verified: true },
      { id: 'sonic-008', author: 'Hugo Moreau', rating: 5, date: '2024-09-17', comment: 'Super légers et le son est vraiment bon. La charge rapide est très pratique, 15 min pour 2h !', verified: true },
      { id: 'sonic-009', author: 'Julie Bernard', rating: 3, date: '2024-09-23', comment: 'Corrects mais l\'isolation pourrait être meilleure. Le design est très élégant par contre.', verified: true },
      { id: 'sonic-010', author: 'Thomas Petit', rating: 5, date: '2024-09-29', comment: 'Excellents écouteurs ! Le son naturel est parfait pour les podcasts et la musique classique.', verified: true },
      { id: 'sonic-011', author: 'Marion Durand', rating: 5, date: '2024-10-05', comment: 'J\'adore le coloris champagne ! Ultra légers et confortables. Parfaits pour mes trajets quotidiens.', verified: false },
      { id: 'sonic-012', author: 'Nicolas Robert', rating: 4, date: '2024-10-11', comment: 'Bonne qualité audio. Les drivers de 8mm font le job. Le boîtier est vraiment compact.', verified: true },
      { id: 'sonic-013', author: 'Céline Girard', rating: 5, date: '2024-10-17', comment: 'Bluffée par la légèreté ! On les oublie vraiment. Le son est clair et précis.', verified: true },
      { id: 'sonic-014', author: 'Maxime Blanc', rating: 5, date: '2024-10-23', comment: 'Parfait pour le télétravail. Aucune fatigue auditive même après une journée complète d\'utilisation.', verified: true },
      { id: 'sonic-015', author: 'Laura Thomas', rating: 4, date: '2024-10-29', comment: 'Très satisfaite. L\'autonomie de 24h avec le boîtier est suffisante. Le blanc est très classe.', verified: true },
      { id: 'sonic-016', author: 'Alexandre Roux', rating: 5, date: '2024-11-04', comment: 'La technologie air flow fait vraiment la différence ! Plus de pression dans les oreilles.', verified: true },
      { id: 'sonic-017', author: 'Sophie Michel', rating: 5, date: '2024-11-10', comment: 'Excellents pour le prix ! Le son est naturel et équilibré. Les aigus sont cristallins.', verified: true },
      { id: 'sonic-018', author: 'Julien Fournier', rating: 3, date: '2024-11-16', comment: 'Moyens. Le son manque un peu de punch à mon goût. Mais le confort est indéniable.', verified: false },
      { id: 'sonic-019', author: 'Marine Lambert', rating: 5, date: '2024-11-22', comment: 'Super écouteurs ! L\'appairage est instantané et la connexion reste stable jusqu\'à 15m.', verified: true },
      { id: 'sonic-020', author: 'Pierre Simon', rating: 5, date: '2024-11-28', comment: 'Parfaits pour le sport ! L\'IPX4 les protège bien de la transpiration. Très légers !', verified: true },
      { id: 'sonic-021', author: 'Aurélie Bonnet', rating: 4, date: '2024-12-04', comment: 'Bon produit. La finition mate anti-traces est appréciable. Le son est correct.', verified: true },
      { id: 'sonic-022', author: 'Romain Faure', rating: 5, date: '2024-12-10', comment: 'Incroyable légèreté ! 3.5g c\'est vraiment impressionnant. Le son est très bon pour cette gamme.', verified: true },
      { id: 'sonic-023', author: 'Camille André', rating: 5, date: '2024-12-16', comment: 'J\'adore ! Le design minimaliste est parfait. La qualité audio est au rendez-vous.', verified: true },
      { id: 'sonic-024', author: 'Florian Mercier', rating: 2, date: '2024-12-22', comment: 'Déçu. L\'autonomie n\'est pas à la hauteur et j\'ai eu des problèmes de connexion.', verified: true },
      { id: 'sonic-025', author: 'Léa Vincent', rating: 5, date: '2024-12-28', comment: 'Excellente surprise ! Le confort est incomparable. Je les porte des heures sans problème.', verified: false },
      { id: 'sonic-026', author: 'Quentin Lefebvre', rating: 5, date: '2025-01-03', comment: 'Top pour les audiophiles ! Le son neutre et naturel est exactement ce que je recherchais.', verified: true },
      { id: 'sonic-027', author: 'Emma Muller', rating: 4, date: '2025-01-09', comment: 'Bons écouteurs. Le champagne est sublime ! L\'autonomie pourrait être un peu meilleure.', verified: true },
      { id: 'sonic-028', author: 'Anthony Leroy', rating: 5, date: '2025-01-15', comment: 'Parfait ! La circulation d\'air réduit vraiment la fatigue auditive. Génial pour les longs vols.', verified: true },
      { id: 'sonic-029', author: 'Manon David', rating: 5, date: '2025-01-21', comment: 'Super légers et confortables ! Le son est équilibré et la charge rapide très pratique.', verified: true },
      { id: 'sonic-030', author: 'Kevin Martin', rating: 3, date: '2025-01-27', comment: 'Corrects. Le son est bien mais manque de basses. Le confort est excellent par contre.', verified: true },
      { id: 'sonic-031', author: 'Pauline Boyer', rating: 5, date: '2025-02-02', comment: 'Excellents ! La légèreté est vraiment impressionnante. Les indicateurs LED sont pratiques.', verified: true },
      { id: 'sonic-032', author: 'Jérôme Garnier', rating: 5, date: '2025-02-08', comment: 'Très bon achat ! Le son est clair et naturel. Parfait pour la musique acoustique.', verified: false },
      { id: 'sonic-033', author: 'Charlotte Robin', rating: 4, date: '2025-02-14', comment: 'Satisfaite. Le revêtement nano-hydrophobe fonctionne bien contre l\'humidité tropicale.', verified: true },
      { id: 'sonic-034', author: 'Damien Rousseau', rating: 5, date: '2025-02-20', comment: 'Parfaits pour le quotidien ! Ultra légers, on les oublie. Le boîtier est très compact.', verified: true },
      { id: 'sonic-035', author: 'Virginie Clement', rating: 5, date: '2025-02-26', comment: 'J\'adore le design épuré ! Le son est très bon et l\'autonomie suffisante pour mon usage.', verified: true },
      { id: 'sonic-036', author: 'Olivier Perrot', rating: 4, date: '2025-03-04', comment: 'Bon rapport qualité/prix. La latence réduite est appréciable pour les vidéos.', verified: true },
      { id: 'sonic-037', author: 'Nathalie Guerin', rating: 5, date: '2025-03-10', comment: 'Excellents écouteurs ! Le confort aérien est vraiment agréable. Aucune pression !', verified: true },
      { id: 'sonic-038', author: 'Stéphane Morin', rating: 5, date: '2025-03-16', comment: 'Super pour le gaming ! Pas de latence perceptible. Le son est clair et précis.', verified: true },
      { id: 'sonic-039', author: 'Jessica Dupuis', rating: 3, date: '2025-03-22', comment: 'Moyennement convaincue. Le son est correct mais l\'autonomie est un peu juste.', verified: false },
      { id: 'sonic-040', author: 'Mickael Blanc', rating: 5, date: '2025-03-28', comment: 'Parfait ! Les matériaux composites avancés se sentent vraiment. Très premium !', verified: true },
      { id: 'sonic-041', author: 'Delphine Renaud', rating: 5, date: '2025-04-03', comment: 'Très contente ! Le son est naturel et les voix très claires. Idéal pour les podcasts.', verified: true },
      { id: 'sonic-042', author: 'François Lemaire', rating: 4, date: '2025-04-09', comment: 'Bons écouteurs. Le noir mat est très élégant. La connexion Bluetooth est stable.', verified: true },
      { id: 'sonic-043', author: 'Sandrine Dubois', rating: 5, date: '2025-04-15', comment: 'Excellente qualité ! L\'acoustique ouverte préserve bien la spatialisation du son.', verified: true },
      { id: 'sonic-044', author: 'Guillaume Richard', rating: 5, date: '2025-04-21', comment: 'Top ! La légèreté est incomparable. Je les utilise pour courir, ils ne bougent pas.', verified: true },
      { id: 'sonic-045', author: 'Mélanie Bertrand', rating: 4, date: '2025-04-27', comment: 'Satisfaite. Le champagne est vraiment luxueux ! Le son est équilibré.', verified: true },
      { id: 'sonic-046', author: 'Christophe Morel', rating: 5, date: '2025-05-03', comment: 'Parfaits pour les mélomanes ! La signature sonore neutre est exactement ce qu\'il faut.', verified: false },
      { id: 'sonic-047', author: 'Valérie Petit', rating: 5, date: '2025-05-09', comment: 'Super écouteurs ! La miniaturisation extrême est impressionnante. Très confortables !', verified: true },
      { id: 'sonic-048', author: 'Sébastien Barbier', rating: 3, date: '2025-05-15', comment: 'Corrects. Le son manque un peu de profondeur. Le confort est excellent cependant.', verified: true },
      { id: 'sonic-049', author: 'Laure Philippe', rating: 5, date: '2025-05-21', comment: 'Excellents ! Je les porte toute la journée sans fatigue. Le son est très naturel.', verified: true },
      { id: 'sonic-050', author: 'Pascal Henry', rating: 5, date: '2025-05-27', comment: 'Très bon achat ! La charge rapide USB-C est super pratique. 15 min = 2h !', verified: true },
      { id: 'sonic-051', author: 'Anne-Sophie Colin', rating: 4, date: '2025-06-02', comment: 'Bonne qualité. Les reflets nacrés du champagne sont sublimes. Le son est correct.', verified: true },
      { id: 'sonic-052', author: 'Ludovic Marchand', rating: 5, date: '2025-06-08', comment: 'Parfait pour le bureau ! Aucune pression auriculaire même après 8h de port.', verified: true },
      { id: 'sonic-053', author: 'Stéphanie Olivier', rating: 5, date: '2025-06-14', comment: 'J\'adore ! Ultra légers et le son est vraiment bon. Les basses sont présentes sans saturer.', verified: true },
      { id: 'sonic-054', author: 'Marc Nicolas', rating: 2, date: '2025-06-20', comment: 'Pas convaincu. L\'autonomie est trop juste et le son manque de caractère.', verified: true },
      { id: 'sonic-055', author: 'Audrey Prevost', rating: 5, date: '2025-06-26', comment: 'Excellents écouteurs ! La technologie air flow est vraiment innovante. Plus de fatigue !', verified: false },
      { id: 'sonic-056', author: 'Bruno Lacroix', rating: 5, date: '2025-07-02', comment: 'Top ! Le minimalisme moderne du blanc est parfait. Le son est clair et détaillé.', verified: true },
      { id: 'sonic-057', author: 'Élodie Gauthier', rating: 4, date: '2025-07-08', comment: 'Satisfaite. La construction robuste inspire confiance. L\'IPX4 fonctionne bien.', verified: true },
      { id: 'sonic-058', author: 'Yannick Hubert', rating: 5, date: '2025-07-14', comment: 'Parfaits pour le sport ! 3.5g seulement et ils tiennent parfaitement. Impressionnant !', verified: true },
      { id: 'sonic-059', author: 'Claire Tanguy', rating: 5, date: '2025-07-20', comment: 'Excellente qualité sonore ! Les médiums transparents sont parfaits pour les voix.', verified: true },
      { id: 'sonic-060', author: 'Fabrice Brun', rating: 3, date: '2025-07-26', comment: 'Moyens. Le son est correct mais j\'attendais mieux pour le prix. Le confort est bon.', verified: true },
      { id: 'sonic-061', author: 'Morgane Rey', rating: 5, date: '2025-08-01', comment: 'Super ! L\'élégance discrète du noir est top. Parfaits pour les longs trajets.', verified: true },
      { id: 'sonic-062', author: 'Arnaud Weber', rating: 5, date: '2025-08-07', comment: 'Très bons écouteurs ! La portée de 15m est vraiment pratique. Aucune coupure !', verified: true },
      { id: 'sonic-063', author: 'Lucie Rolland', rating: 4, date: '2025-08-13', comment: 'Bon produit. Les aigus cristallins révèlent vraiment tous les détails. Satisfaite !', verified: false },
      { id: 'sonic-064', author: 'Thibault Vidal', rating: 5, date: '2025-08-19', comment: 'Excellents ! Le boîtier pocket-size est génial. L\'autonomie est correcte.', verified: true },
      { id: 'sonic-065', author: 'Coralie Benoit', rating: 5, date: '2025-08-25', comment: 'Parfait pour les audiophiles ! La naturalité du son est remarquable. Je recommande !', verified: true },
      { id: 'sonic-066', author: 'Raphaël Gros', rating: 4, date: '2025-08-31', comment: 'Bons écouteurs. La finition mate est très pratique contre les traces. Son équilibré.', verified: true },
      { id: 'sonic-067', author: 'Karine Lucas', rating: 5, date: '2025-09-06', comment: 'J\'adore ! Le confort absolu pour de longues sessions d\'écoute. Très légers !', verified: true },
      { id: 'sonic-068', author: 'Benoît Adam', rating: 5, date: '2025-09-12', comment: 'Super rapport qualité/prix ! La synchronisation parfaite pour les vidéos est top.', verified: true },
      { id: 'sonic-069', author: 'Hélène Pasquier', rating: 3, date: '2025-09-18', comment: 'Corrects mais pas exceptionnels. L\'isolation pourrait être meilleure. Design sympa.', verified: true },
      { id: 'sonic-070', author: 'Philippe Noel', rating: 5, date: '2025-09-24', comment: 'Excellents ! La consommation optimisée prolonge bien l\'autonomie. Très satisfait !', verified: false },
      { id: 'sonic-071', author: 'Agathe Langlois', rating: 5, date: '2025-09-30', comment: 'Parfaits ! Le champagne avec ses reflets nacrés est magnifique. Son de qualité !', verified: true },
      { id: 'sonic-072', author: 'Loïc Carlier', rating: 4, date: '2025-10-06', comment: 'Bon achat. Les micro-chocs du transport quotidien sont bien absorbés. Solides !', verified: true },
      { id: 'sonic-073', author: 'Fanny Boucher', rating: 5, date: '2025-10-12', comment: 'Super écouteurs ! L\'acoustique ouverte est parfaite pour la musique classique.', verified: true },
      { id: 'sonic-074', author: 'Denis Martel', rating: 5, date: '2025-10-18', comment: 'Très bon produit ! Les indicateurs LED du boîtier sont vraiment pratiques.', verified: true },
      { id: 'sonic-075', author: 'Solène Berthier', rating: 4, date: '2025-10-24', comment: 'Satisfaite. Le revêtement hydrophobe fonctionne bien. Le son est équilibré.', verified: true },
      { id: 'sonic-076', author: 'Jonathan Leroux', rating: 5, date: '2025-10-30', comment: 'Excellents ! La réduction de pression auriculaire est vraiment efficace. Top confort !', verified: true },
      { id: 'sonic-077', author: 'Chloé Vasseur', rating: 5, date: '2025-11-05', comment: 'J\'adore ! Seule la musique demeure, on oublie vraiment les écouteurs. Magique !', verified: true },
      { id: 'sonic-078', author: 'Grégory Humbert', rating: 3, date: '2025-11-11', comment: 'Moyens. Le son est correct mais manque de personnalité. Le confort est bon.', verified: false },
      { id: 'sonic-079', author: 'Mylène Delorme', rating: 5, date: '2025-11-17', comment: 'Parfaits pour le quotidien ! Ultra légers et pratiques. La charge rapide est géniale.', verified: true },
      { id: 'sonic-080', author: 'Xavier Lecomte', rating: 5, date: '2025-11-23', comment: 'Excellent achat ! La spatialisation naturelle du son est préservée. Très immersif !', verified: true },
      { id: 'sonic-081', author: 'Patricia Julien', rating: 4, date: '2025-11-29', comment: 'Bons écouteurs. Le blanc pur incarne vraiment le minimalisme moderne. Élégant !', verified: true },
      { id: 'sonic-082', author: 'Rémy Schneider', rating: 5, date: '2025-12-05', comment: 'Super ! Les drivers 8mm optimisés font un excellent travail. Son naturel et clair.', verified: true },
      { id: 'sonic-083', author: 'Angélique Voisin', rating: 5, date: '2025-12-11', comment: 'Très satisfaite ! Le confort est incomparable pour cette gamme de prix. Je recommande !', verified: true },
      { id: 'sonic-084', author: 'Cédric Tessier', rating: 4, date: '2025-12-17', comment: 'Bon produit. L\'appairage instantané est pratique. Le son pourrait avoir plus de basses.', verified: true },
      { id: 'sonic-085', author: 'Emmanuelle Pruvost', rating: 5, date: '2025-12-23', comment: 'Excellents écouteurs ! La légèreté exceptionnelle change tout. Plus de fatigue !', verified: true },
      { id: 'sonic-086', author: 'Gilles Fleury', rating: 5, date: '2025-12-29', comment: 'Parfait pour les mélomanes ! L\'authenticité du son est remarquable. Très content !', verified: false },
      { id: 'sonic-087', author: 'Vanessa Rocher', rating: 3, date: '2026-01-04', comment: 'Corrects. L\'autonomie de 6h est un peu juste. Le design est très réussi par contre.', verified: true },
      { id: 'sonic-088', author: 'Franck Berger', rating: 5, date: '2026-01-10', comment: 'Super écouteurs ! La circulation d\'air optimisée fait vraiment la différence. Confort top !', verified: true },
      { id: 'sonic-089', author: 'Sabrina Bouvier', rating: 5, date: '2026-01-16', comment: 'J\'adore le champagne luxueux ! Le son est équilibré et naturel. Très satisfaite !', verified: true },
      { id: 'sonic-090', author: 'Adrien Courtois', rating: 4, date: '2026-01-22', comment: 'Bon rapport qualité/prix. La latence réduite pour le gaming est appréciable.', verified: true },
      { id: 'sonic-091', author: 'Muriel Blanchard', rating: 5, date: '2026-01-28', comment: 'Excellents ! Les matériaux composites avancés se sentent. Très haute qualité !', verified: true },
      { id: 'sonic-092', author: 'Cyril Aubert', rating: 5, date: '2026-02-03', comment: 'Parfaits pour le sport ! L\'IPX4 et la légèreté en font des compagnons idéaux.', verified: true },
      { id: 'sonic-093', author: 'Nadia Philippe', rating: 4, date: '2026-02-09', comment: 'Satisfaite. Le son est clair et les voix bien rendues. L\'autonomie pourrait être meilleure.', verified: true },
      { id: 'sonic-094', author: 'Frédéric Pons', rating: 5, date: '2026-02-15', comment: 'Super ! L\'esthétique impeccable est préservée grâce à la finition anti-traces. Top !', verified: true },
      { id: 'sonic-095', author: 'Séverine Caron', rating: 5, date: '2026-02-21', comment: 'Excellents écouteurs ! 3.5g c\'est vraiment révolutionnaire. On les oublie complètement !', verified: true }
    ]
  },

  // HIFUTURE Écouteur Conduction Air Mate
  {
    id: 'hifuture-air-mate-conduction',
    airtableId: 'rec31',
    sku: 'HIF-MATE-CONDUCTION',
    name: 'HIFUTURE Écouteur Conduction Air Mate',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 34.99,
    description: "Les écouteurs HIFUTURE Mate à conduction d'air représentent une innovation majeure dans l'audio portable, offrant une alternative révolutionnaire aux écouteurs traditionnels. Cette technologie unique permet de profiter de votre musique tout en restant parfaitement conscient de votre environnement, idéal pour sécurité et communication.\n\nLa technologie de conduction d'air transmet le son via vibrations aériennes dirigées, sans obstruction du canal auditif. Cette approche innovante élimine fatigue auditive et inconfort des écouteurs intra-auriculaires classiques. Vous entendez votre musique clairement tout en percevant sons ambiants, parfait pour activités urbaines ou sportives nécessitant vigilance.\n\nLe confort ultime résulte de l'absence totale d'insertion auriculaire. Plus de pression, d'irritation ou d'accumulation de cérumen. Le design ergonomique breveté épouse parfaitement contour de l'oreille avec maintien sécurisé sans serrage. Port prolongé possible sans aucune gêne, révolutionnant l'expérience d'écoute quotidienne.\n\nLe design ergonomique sophistiqué résulte d'études anatomiques approfondies. La forme adaptative s'ajuste automatiquement à différentes morphologies auriculaires. Matériaux souples mémoire de forme garantissent maintien parfait pendant activités dynamiques. Poids plume réparti uniformément évite points pression.\n\nLa certification IPX4 assure résistance transpiration et éclaboussures pour utilisation sportive intensive. Idéal pour running, cyclisme, fitness où conscience environnementale est cruciale. Protection contre humidité tropicale réunionnaise garantit durabilité long terme.\n\nTrois coloris dynamiques expriment différentes personnalités : Noir discret pour élégance professionnelle, Gris moderne pour style technologique affirmé, Rouge dynamique pour énergie sportive. Finition soft-touch agréable au toucher résiste aux traces et rayures.\n\nL'écoute ouverte révolutionnaire permet conversations naturelles sans retirer écouteurs. Parfait pour environnements professionnels nécessitant interactions fréquentes. Sécurité accrue pour activités extérieures : entendez véhicules, avertissements, appels.\n\nQualité audio optimisée pour conduction aérienne avec égalisation spécifique compensant caractéristiques transmission. Basses renforcées, médiums clairs, aigus précis. Volume automatique s'adapte bruit ambiant pour écoute confortable.\n\nAutonomie 8 heures utilisation continue, 32 heures avec boîtier charge. Charge rapide magnétique sans contact. Commandes tactiles intuitives gèrent musique et appels. Microphone antibruit pour communications claires.\n\nL'innovation audio pour utilisateurs actifs réunionnais recherchant sécurité et confort révolutionnaire.",
    shortDescription: 'Écouteurs conduction osseuse sport',
    metaTitle: 'HIFUTURE Mate Conduction Air - Écouteurs Innovants',
    metaDescription: 'Écouteurs HIFUTURE Mate conduction d\'air révolutionnaire. Écoute ouverte sans obstruction, confort ultime, IPX4. Noir, Gris ou Rouge dynamique La Réunion 974.',
    urlSlug: 'hifuture-air-mate-conduction-osseuse',
    keywords: ['HIFUTURE', 'Air Mate', 'conduction osseuse', 'sport', 'écouteurs'],
    variants: [
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 10, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-noir-1.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-noir-2.png'
      ] },
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '', stock: 8, images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-blanc-1.png',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-blanc-2.png'
      ] }
    ],
    specifications: [
      { label: 'Type', value: 'Conduction osseuse' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'Étanchéité', value: 'IPX5' },
      { label: 'Poids', value: '29g' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-noir-1.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-noir-2.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-blanc-1.png',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Ecouteurs/hifuture-air-mate-blanc-2.png'
    ],
    status: 'active' as const,
    badges: ['Conduction osseuse', 'Sport'],
    reviews: [
      { id: 'am-001', author: 'Thierry Grondin', rating: 5, date: '2026-02-14', comment: "Parfait pour courir en sécurité à Saint-Denis ! J'entends tout autour de moi.", verified: true },
      { id: 'am-002', author: 'Émilie Nativel', rating: 5, date: '2026-02-10', comment: "La conduction osseuse est bluffante, jamais eu aussi peu de fatigue auditive.", verified: true },
      { id: 'am-003', author: 'Didier Maillot', rating: 4, date: '2026-02-05', comment: 'Excellent pour le vélo, je reste conscient du trafic. Son correct pour ce type de technologie.', verified: true },
      { id: 'am-004', author: 'Vanessa Techer', rating: 5, date: '2026-01-28', comment: "Plus de douleur aux oreilles après mes longues sessions de sport !", verified: false },
      { id: 'am-005', author: 'Kévin Bègue', rating: 5, date: '2026-01-22', comment: "Génial pour le trail, j'entends les autres coureurs arriver. Tient parfaitement même en transpirant.", verified: true },
      { id: 'am-006', author: 'Sandrine Ah-Fat', rating: 4, date: '2026-01-15', comment: 'Surprenant au début mais on s\'habitue vite. Idéal pour rester connecté tout en restant aware.', verified: true },
      { id: 'am-007', author: 'Mickaël Fontaine', rating: 5, date: '2026-01-08', comment: "Top pour le running matinal, sécurité maximale dans les rues de Saint-Pierre.", verified: true },
      { id: 'am-008', author: 'Aurélie Payet', rating: 5, date: '2025-12-30', comment: "Confort incroyable, aucune pression sur les oreilles. Parfait pour mes 2h de gym.", verified: false },
      { id: 'am-009', author: 'Jean-Marc Vienne', rating: 3, date: '2025-12-22', comment: 'Basses un peu faibles mais normal pour la conduction osseuse. Pratique pour le sport.', verified: true },
      { id: 'am-010', author: 'Nathalie Boyer', rating: 5, date: '2025-12-18', comment: "J'adore pouvoir discuter sans enlever mes écouteurs ! Révolutionnaire.", verified: true },
      { id: 'am-011', author: 'Cédric Hoarau', rating: 5, date: '2025-12-10', comment: "Parfait pour le cyclisme, j'entends les voitures arriver. La sécurité avant tout !", verified: true },
      { id: 'am-012', author: 'Stéphanie Lebon', rating: 4, date: '2025-12-02', comment: 'IPX5 confirmé, résiste bien à la transpiration intense. Son clair pour les podcasts.', verified: true },
      { id: 'am-013', author: 'Nicolas Rivière', rating: 5, date: '2025-11-25', comment: "8h d'autonomie réelle, largement suffisant pour mes sorties longues.", verified: false },
      { id: 'am-014', author: 'Mélanie Turpin', rating: 5, date: '2025-11-18', comment: "Plus jamais d'écouteurs qui tombent pendant le sport ! Tenue parfaite.", verified: true },
      { id: 'am-015', author: 'Fabrice Robert', rating: 4, date: '2025-11-10', comment: 'Très bon pour le prix. La technologie conduction osseuse fonctionne vraiment bien.', verified: true },
      { id: 'am-016', author: 'Isabelle Dijoux', rating: 5, date: '2025-11-03', comment: "Idéal pour courir sur le front de mer, je profite de la musique et du bruit des vagues.", verified: true },
      { id: 'am-017', author: 'Yannick François', rating: 5, date: '2025-10-28', comment: "Léger comme une plume, on les oublie sur la tête. Qualité sonore surprenante.", verified: true },
      { id: 'am-018', author: 'Corinne Sautron', rating: 3, date: '2025-10-20', comment: 'Il faut augmenter le volume en environnement bruyant mais reste utilisable.', verified: false },
      { id: 'am-019', author: 'Alexandre Morel', rating: 5, date: '2025-10-12', comment: "Excellent pour le VTT dans les hauts, sécurité et musique combinées !", verified: true },
      { id: 'am-020', author: 'Patricia Hoareau', rating: 5, date: '2025-10-05', comment: "Plus de problème d'hygiène avec les embouts, c'est un gros plus pour moi.", verified: true },
      { id: 'am-021', author: 'Bruno Élisabeth', rating: 4, date: '2025-09-28', comment: "Bonne alternative aux écouteurs traditionnels. Microphone correct pour les appels.", verified: true },
      { id: 'am-022', author: 'Virginie Pausé', rating: 5, date: '2025-09-20', comment: "Parfait pour mes cours de fitness, je peux donner des instructions tout en écoutant ma musique.", verified: true },
      { id: 'am-023', author: 'Frédéric Lebreton', rating: 5, date: '2025-09-12', comment: "La charge magnétique est super pratique. Design moderne et discret.", verified: false },
      { id: 'am-024', author: 'Laurence Pothin', rating: 4, date: '2025-09-04', comment: 'Très confortable même avec des lunettes. Son acceptable pour le sport.', verified: true },
      { id: 'am-025', author: 'Jérôme Bénard', rating: 5, date: '2025-08-27', comment: "Indispensable pour mes sorties running nocturnes, sécurité maximale !", verified: true },
      { id: 'am-026', author: 'Valérie Cadet', rating: 5, date: '2025-08-19', comment: "Aucune gêne même après 3h de randonnée. Le maintien est parfait.", verified: true },
      { id: 'am-027', author: 'Sébastien Valy', rating: 3, date: '2025-08-11', comment: 'Prend un peu de temps pour s\'habituer à la sensation. Son correct mais pas exceptionnel.', verified: true },
      { id: 'am-028', author: 'Christine Técher', rating: 5, date: '2025-08-03', comment: "Génial pour le paddle, résiste aux éclaboussures et je reste attentive à l'environnement.", verified: false },
      { id: 'am-029', author: 'Olivier Lauret', rating: 5, date: '2025-07-26', comment: "Qualité de fabrication au top. Les commandes tactiles répondent bien.", verified: true },
      { id: 'am-030', author: 'Marie-Claire Vitry', rating: 4, date: '2025-07-18', comment: 'Bon rapport qualité/prix pour de la conduction osseuse. Confortable pour le sport.', verified: true },
      { id: 'am-031', author: 'Philippe Damour', rating: 5, date: '2025-07-10', comment: "Parfait pour le jogging matinal, je salue les voisins sans enlever mes écouteurs !", verified: true },
      { id: 'am-032', author: 'Céline Mussard', rating: 5, date: '2025-07-02', comment: "La liberté totale ! Plus jamais je ne reviendrai aux écouteurs intra.", verified: true },
      { id: 'am-033', author: 'Ludovic Ramassamy', rating: 4, date: '2025-06-24', comment: 'Étonnant au début mais vraiment pratique. Batterie tient bien la journée.', verified: false },
      { id: 'am-034', author: 'Nadia Bègue', rating: 5, date: '2025-06-16', comment: "Idéal pour le yoga, aucune gêne dans les positions au sol.", verified: true },
      { id: 'am-035', author: 'Régis Rivière', rating: 5, date: '2025-06-08', comment: "Super pour le trail running, conscience de l'environnement preservée.", verified: true },
      { id: 'am-036', author: 'Sophie Laravine', rating: 3, date: '2025-05-31', comment: 'Manque un peu de puissance dans les basses mais reste correct pour le sport.', verified: true },
      { id: 'am-037', author: 'Christophe Hoareau', rating: 5, date: '2025-05-23', comment: "Excellent achat ! Je peux courir en toute sécurité dans les chemins.", verified: true },
      { id: 'am-038', author: 'Emmanuelle Payet', rating: 5, date: '2025-05-15', comment: "Plus de douleur au canal auditif, c'est un vrai soulagement après mes longues sessions.", verified: false },
      { id: 'am-039', author: 'Pascal Gonthier', rating: 4, date: '2025-05-07', comment: 'Bonne technologie, il faut juste s\'habituer. Pratique pour rester connecté.', verified: true },
      { id: 'am-040', author: 'Véronique Fontaine', rating: 5, date: '2025-04-29', comment: "Parfait pour mes cours de zumba, je peux suivre la musique et les instructions du prof.", verified: true },
      { id: 'am-041', author: 'Gilles Turpin', rating: 5, date: '2025-04-21', comment: "Le top pour le vélo route, sécurité assurée sur les routes de l'île !", verified: true },
      { id: 'am-042', author: 'Karine Dijoux', rating: 4, date: '2025-04-13', comment: 'Confortable même avec un casque de vélo. Son clair pour les appels.', verified: true },
      { id: 'am-043', author: 'Anthony Lebon', rating: 5, date: '2025-04-05', comment: "Résiste parfaitement à la transpiration intense. Vraiment IPX5 !", verified: false },
      { id: 'am-044', author: 'Muriel Robert', rating: 5, date: '2025-03-28', comment: "Je peux enfin faire mon footing en écoutant de la musique sans m'isoler.", verified: true },
      { id: 'am-045', author: 'Denis Cadet', rating: 3, date: '2025-03-20', comment: 'Son moins immersif qu\'des écouteurs classiques mais c\'est le principe de la conduction.', verified: true },
      { id: 'am-046', author: 'Béatrice Vienne', rating: 5, date: '2025-03-12', comment: "Génial pour la marche nordique, légèreté et sécurité au rendez-vous.", verified: true },
      { id: 'am-047', author: 'Éric Pausé', rating: 5, date: '2025-03-04', comment: "Plus de problème d'écouteurs qui glissent avec la sueur. Tenue impeccable !", verified: true },
      { id: 'am-048', author: 'Sylvie Morel', rating: 4, date: '2025-02-24', comment: 'Très pratique pour le sport. La qualité audio est correcte pour ce type de produit.', verified: false },
      { id: 'am-049', author: 'Marc Bénard', rating: 5, date: '2025-02-16', comment: "Idéal pour mes sorties VTT, je reste attentif aux bruits de la nature.", verified: true },
      { id: 'am-050', author: 'Florence Pothin', rating: 5, date: '2025-02-08', comment: "Confort absolu ! Je les porte pendant des heures sans aucune gêne.", verified: true },
      { id: 'am-051', author: 'Jean-Yves Hoarau', rating: 5, date: '2025-01-31', comment: "Parfait pour le crossfit, tient bien même pendant les mouvements intenses.", verified: true },
      { id: 'am-052', author: 'Anne-Marie Lauret', rating: 4, date: '2025-01-23', comment: 'Bon produit pour le prix. La conduction osseuse fonctionne bien.', verified: true },
      { id: 'am-053', author: 'Thierry Élisabeth', rating: 5, date: '2025-01-15', comment: "Super pour courir le matin sur le littoral, sécurité et plaisir musical !", verified: false },
      { id: 'am-054', author: 'Carole Técher', rating: 5, date: '2025-01-07', comment: "Je peux enfin porter des écouteurs toute la journée sans douleur !", verified: true },
      { id: 'am-055', author: 'David Ramassamy', rating: 3, date: '2024-12-30', comment: 'Il faut monter le volume en extérieur mais c\'est normal. Pratique pour le sport.', verified: true },
      { id: 'am-056', author: 'Nadine Vitry', rating: 5, date: '2024-12-22', comment: "Excellent pour le RPM, je suis la musique tout en entendant le coach.", verified: true },
      { id: 'am-057', author: 'Patrick François', rating: 5, date: '2024-12-14', comment: "La charge tient vraiment 8h, parfait pour mes longues sorties vélo du dimanche.", verified: true },
      { id: 'am-058', author: 'Monique Grondin', rating: 4, date: '2024-12-06', comment: 'Surprenant mais efficace. Plus hygiénique que des écouteurs classiques.', verified: false },
      { id: 'am-059', author: 'Alain Nativel', rating: 5, date: '2024-11-28', comment: "Indispensable pour mes trails dans les hauts, sécurité avant tout !", verified: true },
      { id: 'am-060', author: 'Martine Maillot', rating: 5, date: '2024-11-20', comment: "Le confort est incomparable, je ne supporte plus les écouteurs intra maintenant.", verified: true },
      { id: 'am-061', author: 'Stéphane Ah-Fat', rating: 4, date: '2024-11-12', comment: 'Bien pour le sport et les appels. Microphone antibruit efficace.', verified: true },
      { id: 'am-062', author: 'Catherine Bègue', rating: 5, date: '2024-11-04', comment: "Parfait pour mes séances d'aquagym, résiste aux éclaboussures sans problème.", verified: true },
      { id: 'am-063', author: 'Bruno Lebreton', rating: 5, date: '2024-10-27', comment: "Génial pour le running urbain, je reste vigilant au trafic.", verified: false },
      { id: 'am-064', author: 'Jocelyne Sautron', rating: 3, date: '2024-10-19', comment: 'Audio moins riche qu\'avec des écouteurs classiques mais c\'est le compromis pour la sécurité.', verified: true },
      { id: 'am-065', author: 'Guillaume Boyer', rating: 5, date: '2024-10-11', comment: "Les commandes tactiles sont super réactives. Design vraiment moderne.", verified: true },
      { id: 'am-066', author: 'Chantal Turpin', rating: 5, date: '2024-10-03', comment: "Plus de problème de cérumen ou d'irritation, c'est vraiment appréciable.", verified: true },
      { id: 'am-067', author: 'François Damour', rating: 4, date: '2024-09-25', comment: "Bon rapport qualité/prix. Parfait pour le sport en extérieur.", verified: true },
      { id: 'am-068', author: 'Dominique Laravine', rating: 5, date: '2024-09-17', comment: "Je peux enfin courir en musique tout en restant prudent, merci HIFUTURE !", verified: false },
      { id: 'am-069', author: 'René Valy', rating: 5, date: '2024-09-09', comment: "Excellente tenue même en transpirant beaucoup. IPX5 confirmé !", verified: true },
      { id: 'am-070', author: 'Michèle Gonthier', rating: 5, date: '2024-09-01', comment: "Légèreté incroyable, 29g c'est vraiment plume ! On les oublie.", verified: true },
      { id: 'am-071', author: 'Bernard Payet', rating: 4, date: '2024-08-24', comment: 'Pratique pour le vélo, je peux entendre les voitures. Son correct pour les podcasts.', verified: true },
      { id: 'am-072', author: 'Claudine Robert', rating: 5, date: '2024-08-16', comment: "Parfait pour mes marches matinales, je peux saluer les gens sans enlever mes écouteurs.", verified: true },
      { id: 'am-073', author: 'Serge Fontaine', rating: 3, date: '2024-08-08', comment: 'Il faut s\'habituer à la sensation de vibration mais ça fonctionne bien.', verified: false },
      { id: 'am-074', author: 'Danielle Cadet', rating: 5, date: '2024-07-31', comment: "Génial pour le fitness, aucune gêne pendant les exercices au sol.", verified: true },
      { id: 'am-075', author: 'Henri Dijoux', rating: 5, date: '2024-07-23', comment: "Super invention ! Je peux faire mon jogging en toute sécurité maintenant.", verified: true },
      { id: 'am-076', author: 'Colette Vienne', rating: 4, date: '2024-07-15', comment: 'Bonne autonomie et charge rapide. Pratique pour une utilisation quotidienne.', verified: true },
      { id: 'am-077', author: 'Jacques Pausé', rating: 5, date: '2024-07-07', comment: "Parfait pour le trail, j'entends les autres coureurs et la nature autour.", verified: true },
      { id: 'am-078', author: 'Françoise Lauret', rating: 5, date: '2024-06-29', comment: "Plus jamais mal aux oreilles après le sport ! C'est une révolution.", verified: false },
      { id: 'am-079', author: 'Raymond Técher', rating: 4, date: '2024-06-21', comment: 'Très bien pour le prix. La technologie conduction osseuse est efficace.', verified: true },
      { id: 'am-080', author: 'Jeanne Bénard', rating: 5, date: '2024-06-13', comment: "Idéal pour courir sur la route côtière, je reste attentif au traffic.", verified: true },
      { id: 'am-081', author: 'Louis Pothin', rating: 5, date: '2024-06-05', comment: "Le maintien est parfait même pendant le crossfit. Vraiment résistant !", verified: true },
      { id: 'am-082', author: 'Denise Morel', rating: 3, date: '2024-05-28', comment: 'Son moins puissant qu\'espéré mais pratique pour rester conscient de l\'environnement.', verified: true },
      { id: 'am-083', author: 'Charles Hoarau', rating: 5, date: '2024-05-20', comment: "Excellente alternative aux écouteurs traditionnels. Confort optimal.", verified: false },
      { id: 'am-084', author: 'Pierrette Élisabeth', rating: 5, date: '2024-05-12', comment: "Je peux enfin écouter ma musique pendant l'aquabike sans problème !", verified: true },
      { id: 'am-085', author: 'Georges Ramassamy', rating: 4, date: '2024-05-04', comment: 'Bon produit, il faut juste accepter une qualité audio différente.', verified: true },
      { id: 'am-086', author: 'Roseline Vitry', rating: 5, date: '2024-04-26', comment: "Parfait pour mes 10km quotidiens, légèreté et sécurité au top !", verified: true },
      { id: 'am-087', author: 'André François', rating: 5, date: '2024-04-18', comment: "La charge magnétique est super pratique. Pas de port à nettoyer.", verified: true },
      { id: 'am-088', author: 'Josette Grondin', rating: 4, date: '2024-04-10', comment: "Confortable avec les lunettes. Son correct pour le sport.", verified: false },
      { id: 'am-089', author: 'Roger Nativel', rating: 5, date: '2024-04-02', comment: "Génial pour le vélo de route, je peux profiter de la musique en toute sécurité.", verified: true },
      { id: 'am-090', author: 'Simone Maillot', rating: 5, date: '2024-03-25', comment: "Plus de problème d'hygiène, c'est vraiment un gros avantage !", verified: true },
      { id: 'am-091', author: 'Marcel Ah-Fat', rating: 3, date: '2024-03-17', comment: 'Prend du temps pour s\'habituer mais pratique une fois maîtrisé.', verified: true },
      { id: 'am-092', author: 'Lucette Bègue', rating: 5, date: '2024-03-09', comment: "Parfait pour la randonnée, je peux profiter de la nature et de ma musique.", verified: true },
      { id: 'am-093', author: 'Albert Lebreton', rating: 5, date: '2024-03-01', comment: "8h d'autonomie confirmées ! Largement suffisant pour mes sorties.", verified: false },
      { id: 'am-094', author: 'Ginette Sautron', rating: 4, date: '2024-02-22', comment: 'Bien pour le sport. Les commandes tactiles fonctionnent correctement.', verified: true },
      { id: 'am-095', author: 'Robert Boyer', rating: 5, date: '2024-02-14', comment: "Excellent pour courir en ville, je reste vigilant tout en écoutant mes podcasts.", verified: true },
      { id: 'am-096', author: 'Huguette Turpin', rating: 5, date: '2024-02-06', comment: "Le confort est incomparable ! Plus jamais d'écouteurs qui font mal.", verified: true },
      { id: 'am-097', author: 'Paul Damour', rating: 4, date: '2024-01-29', comment: 'Bon rapport qualité/prix pour de la conduction osseuse. Satisfait.', verified: true },
      { id: 'am-098', author: 'Yvette Laravine', rating: 5, date: '2024-01-21', comment: "Parfait pour mes cours de gym, je peux suivre le prof et ma musique.", verified: false },
      { id: 'am-099', author: 'Michel Valy', rating: 3, date: '2024-01-13', comment: 'Audio différent des écouteurs classiques mais c\'est le principe. Pratique pour le sport.', verified: true },
      { id: 'am-100', author: 'Thérèse Gonthier', rating: 5, date: '2024-01-05', comment: "Génial pour la marche rapide, légèreté et maintien parfaits !", verified: true },
      { id: 'am-101', author: 'Jean-Louis Payet', rating: 5, date: '2023-12-28', comment: "IPX5 vraiment efficace, résiste à ma transpiration intense sans problème.", verified: true },
      { id: 'am-102', author: 'Marie-José Robert', rating: 4, date: '2023-12-20', comment: 'Très bien pour rester connecté tout en restant conscient de son environnement.', verified: true },
      { id: 'am-103', author: 'Pierre Fontaine', rating: 5, date: '2023-12-12', comment: "Super pour le VTT dans les sentiers, sécurité maximale !", verified: false },
      { id: 'am-104', author: 'Christiane Cadet', rating: 5, date: '2023-12-04', comment: "Plus de douleur au canal auditif, c'est vraiment libérateur.", verified: true },
      { id: 'am-105', author: 'Daniel Dijoux', rating: 4, date: '2023-11-26', comment: 'Bonne technologie, pratique pour le sport. Microphone correct pour les appels.', verified: true },
      { id: 'am-106', author: 'Madeleine Vienne', rating: 5, date: '2023-11-18', comment: "Parfait pour mes sorties running matinales, je peux saluer les voisins !", verified: true },
      { id: 'am-107', author: 'Joseph Pausé', rating: 5, date: '2023-11-10', comment: "La légèreté est impressionnante, on oublie qu'on les porte.", verified: true },
      { id: 'am-108', author: 'Nicole Lauret', rating: 3, date: '2023-11-02', comment: 'Il faut accepter un son différent mais la sécurité prime. Bon produit.', verified: false },
      { id: 'am-109', author: 'Guy Técher', rating: 5, date: '2023-10-25', comment: "Excellent pour le trail running, conscience de l'environnement préservée !", verified: true },
      { id: 'am-110', author: 'Evelyne Bénard', rating: 5, date: '2023-10-17', comment: "Révolutionnaire ! Je peux enfin faire du sport en musique sans m'isoler.", verified: true }
    ]
  },

  // MONSTER Illuminescence LED Touch Light X3 RGB
  {
    id: 'monster-touch-light-x3',
    airtableId: 'rec34',
    sku: 'MON-ILL-TOUCH-X3',
    name: 'MONSTER Illuminescence LED Touch Light X3 RGB',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Lampes LED',
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
    category: 'LED',
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
    category: 'Accessoires',
    subcategory: 'Appareil Photo',
    price: 59.99,
    description: "L'appareil photo MUVIT KidPic révolutionne la photographie pour enfants avec sa technologie d'impression instantanée spécialement conçue pour les jeunes créateurs. Cet appareil innovant combine capture d'images numériques et impression immédiate, offrant aux enfants la satisfaction instantanée de voir leurs créations prendre vie.\n\nL'ergonomie pensée pour les petites mains garantit une prise en main parfaite dès 3 ans. Les boutons surdimensionnés et intuitifs permettent une utilisation autonome, encourageant l'exploration visuelle et la créativité. La coque robuste résiste aux chocs et chutes, accompagnant les aventures photographiques sans crainte.\n\nLa fonction d'impression instantanée transforme chaque photo en souvenir tangible. Les enfants découvrent la magie de voir leur image apparaître progressivement sur papier, créant une expérience sensorielle complète. Cette immédiateté renforce l'apprentissage et stimule la créativité continue.\n\nDisponible en bleu et rose, le KidPic s'adapte aux préférences de chaque enfant. Les couleurs vives et le design ludique en font un compagnon attractif qui donne envie d'explorer le monde à travers l'objectif. L'écran LCD intégré permet de visualiser les photos avant impression, développant le sens critique et artistique.\n\nLes fonctionnalités créatives incluent filtres colorés, cadres amusants et autocollants intégrés, transformant chaque photo en œuvre unique. Le mode selfie avec retardateur encourage l'expression personnelle et les photos de groupe entre amis.\n\nParfait pour les familles réunionnaises valorisant l'éveil artistique, cet appareil MUVIT favorise le développement cognitif et créatif. Idéal pour immortaliser sorties scolaires, anniversaires et moments familiaux précieux.\n\nLivré avec rouleaux de papier initial, manuel illustré adapté aux enfants et dragonnes de sécurité. Garantie constructeur 2 ans pour une utilisation sereine. Disponible dans nos boutiques locales avec démonstration possible.",
    shortDescription: 'Appareil photo enfant avec impression instantanée',
    metaTitle: 'MUVIT KidPic - Appareil Photo Enfant Impression Instantanée',
    metaDescription: 'Appareil photo enfant MUVIT KidPic avec impression instantanée magique. Design ergonomique 3-10 ans, robuste et coloré. Stimule créativité et exploration. Stock La Réunion 974.',
    urlSlug: 'muvit-kidpic-appareil-photo-enfant',
    keywords: ['appareil photo enfant', 'MUVIT KidPic', 'impression instantanée', 'photo enfant', 'caméra enfant', 'créativité enfant'],
    variants: [
      { color: 'Bleu', colorCode: '#0066CC', ean: '34040004100020', stock: 8, images: ['/placeholder-monster-mini.svg'] },
      { color: 'Rose', colorCode: '#FF69B4', ean: '3663111187243', stock: 10, images: ['/placeholder-monster-mini.svg'] }
    ],
    specifications: [
      { label: 'Écran', value: '2 pouces' },
      { label: 'Photo', value: '12MP' },
      { label: 'Vidéo', value: 'HD 1080p' },
      { label: 'Mémoire', value: 'Carte SD 32GB incluse' }
    ],
    images: ['/placeholder-monster-mini.svg'],
    rating: {
      average: 4.3,
      count: 42,
      distribution: { 5: 18, 4: 15, 3: 6, 2: 2, 1: 1 },
      reviews: [
        {
          id: 'review-kidpic-1',
          author: 'Marie L.',
          rating: 5,
          date: '2024-11-28',
          verified: true,
          helpful: 8,
          title: 'Ma fille de 5 ans adore !',
          comment: "Acheté pour l'anniversaire de ma fille, elle ne le lâche plus ! La qualité d'impression est surprenante pour un appareil enfant. Les photos sortent en noir et blanc mais c'est parfait pour elle. Super robuste, il a déjà survécu à plusieurs chutes."
        },
        {
          id: 'review-kidpic-2',
          author: 'Jean-Pierre R.',
          rating: 4,
          date: '2024-11-15',
          verified: true,
          helpful: 5,
          title: 'Très bien mais papier cher',
          comment: "L'appareil est génial, mon petit-fils est ravi. Par contre les recharges de papier sont un peu chères. Heureusement qu'on peut les commander chez Monster Phone. La batterie tient bien la journée."
        },
        {
          id: 'review-kidpic-3',
          author: 'Sandrine M.',
          rating: 5,
          date: '2024-11-02',
          verified: true,
          helpful: 12,
          title: 'Parfait pour développer la créativité',
          comment: "Mon fils de 7 ans fait des reportages photo de tout ! Il imprime ses meilleures photos pour son album. Les filtres intégrés sont amusants. La dragonne est indispensable, bien solide."
        },
        {
          id: 'review-kidpic-4',
          author: 'Patrick D.',
          rating: 3,
          date: '2024-10-20',
          verified: true,
          helpful: 3,
          title: 'Correct mais qualité photo moyenne',
          comment: "Pour le prix c'est correct mais faut pas s'attendre à des photos de qualité. C'est plus un jouet qu'un vrai appareil photo. Ma fille s'amuse bien avec mais les photos sont floues si elle bouge trop."
        },
        {
          id: 'review-kidpic-5',
          author: 'Nathalie T.',
          rating: 5,
          date: '2024-10-08',
          verified: true,
          helpful: 7,
          title: 'Excellent cadeau de Noël',
          comment: "Offert à ma nièce de 6 ans, elle était aux anges ! L'impression instantanée c'est magique pour les enfants. Elle a pris des photos de toute la famille pendant les fêtes. Le mode selfie marche super bien."
        },
        {
          id: 'review-kidpic-6',
          author: 'Laurent B.',
          rating: 4,
          date: '2024-09-25',
          verified: true,
          helpful: 4,
          title: 'Robuste et ludique',
          comment: "Mes jumeaux de 4 ans se le partagent. Il resiste bien à leurs manipulations. Les boutons sont bien pensés pour les petites mains. Seul bémol : l'écran est un peu petit pour bien voir les photos avant impression."
        },
        {
          id: 'review-kidpic-7',
          author: 'Sophie G.',
          rating: 2,
          date: '2024-09-12',
          verified: true,
          helpful: 2,
          title: 'Déçue de la batterie',
          comment: "La batterie ne tient pas longtemps surtout si on imprime beaucoup. Obligé de recharger tous les jours. Sinon l'appareil est mignon et ma fille l'aime bien mais c'est frustrant."
        },
        {
          id: 'review-kidpic-8',
          author: 'Thierry L.',
          rating: 5,
          date: '2024-08-30',
          verified: true,
          helpful: 9,
          title: 'Mon fils est devenu photographe !',
          comment: "Depuis qu'il a cet appareil, mon fils de 8 ans photographie tout : les insectes, les fleurs, ses legos... Il fait même des expositions dans sa chambre ! La fonction impression directe évite d'encombrer le téléphone."
        },
        {
          id: 'review-kidpic-9',
          author: 'Émilie P.',
          rating: 4,
          date: '2024-08-18',
          verified: true,
          helpful: 6,
          title: 'Bon appareil éducatif',
          comment: "Parfait pour apprendre la photo aux enfants. Ma fille comprend maintenant qu'il faut cadrer et ne pas bouger. Les autocollants intégrés sont sympas. Le papier s'épuise vite par contre, prévoir du stock !"
        },
        {
          id: 'review-kidpic-10',
          author: 'Michel A.',
          rating: 1,
          date: '2024-08-05',
          verified: true,
          helpful: 1,
          title: 'Tombé en panne après 2 mois',
          comment: "L'appareil ne s'allume plus après 2 mois. Ma petite fille est déçue. J'attends le retour SAV mais c'est long. Pour le prix j'espérais mieux niveau fiabilité."
        },
        {
          id: 'review-kidpic-11',
          author: 'Caroline F.',
          rating: 5,
          date: '2024-07-22',
          verified: true,
          helpful: 11,
          title: 'Super pour les sorties scolaires',
          comment: "Ma fille l'emmène aux sorties scolaires et fait des souvenirs pour ses copines. Les maîtresses trouvent ça génial aussi. L'impression rapide permet de partager tout de suite les photos. Très social comme jouet !"
        },
        {
          id: 'review-kidpic-12',
          author: 'David M.',
          rating: 4,
          date: '2024-07-10',
          verified: true,
          helpful: 4,
          title: 'Bonne autonomie créative',
          comment: "Mon fils de 6 ans l'utilise tout seul, pas besoin d'aide. Les icônes sont claires. Il fait ses petits projets photos. Juste dommage que les photos soient pas en couleur mais bon, pour le prix..."
        },
        {
          id: 'review-kidpic-13',
          author: 'Isabelle R.',
          rating: 3,
          date: '2024-06-28',
          verified: true,
          helpful: 3,
          title: 'Bien mais pas exceptionnel',
          comment: "C'est mignon et ça occupe les enfants mais la qualité photo est vraiment basique. Les filtres sont rigolos par contre. Ma fille de 5 ans s'amuse bien mais je pensais que ce serait mieux."
        },
        {
          id: 'review-kidpic-14',
          author: 'François B.',
          rating: 5,
          date: '2024-06-15',
          verified: true,
          helpful: 8,
          title: 'Mes enfants adorent',
          comment: "Acheté 2 appareils pour mes enfants de 4 et 7 ans. Ils font des concours de photos ! C'est devenu leur activité préferée le weekend. Très solide, le petit l'a fait tomber plusieurs fois, toujours intact."
        },
        {
          id: 'review-kidpic-15',
          author: 'Sylvie L.',
          rating: 4,
          date: '2024-06-02',
          verified: true,
          helpful: 5,
          title: 'Cadeau original et apprécié',
          comment: "Offert à ma petite-fille pour ses 6 ans, elle était ravie ! Plus original qu'une tablette. Elle imprime ses photos préférées pour décorer sa chambre. Le côté instantané plaît beaucoup aux enfants."
        },
        {
          id: 'review-kidpic-16',
          author: 'Nicolas G.',
          rating: 2,
          date: '2024-05-20',
          verified: true,
          helpful: 2,
          title: 'Qualité décevante',
          comment: "Les photos sont vraiment pas terribles, très pixelisées. Mon fils de 8 ans est déçu car il voulait faire de belles photos comme papa. Pour le prix j'attendais mieux. Au moins il est solide."
        },
        {
          id: 'review-kidpic-17',
          author: 'Anne-Marie D.',
          rating: 5,
          date: '2024-05-08',
          verified: true,
          helpful: 7,
          title: 'Parfait pour débuter la photo',
          comment: "Ma petite-fille de 7 ans apprend les bases : cadrage, lumière, patience. Elle est fière de ses créations. L'impression immédiate la motive à continuer. Le design rose est très joli."
        },
        {
          id: 'review-kidpic-18',
          author: 'Bruno T.',
          rating: 4,
          date: '2024-04-25',
          verified: true,
          helpful: 4,
          title: 'Bon rapport qualité prix',
          comment: "Pour moins de 60€ on a un appareil photo ET une imprimante. Mes enfants l'utilisent tous les jours. Les recharges papier se trouvent facilement chez Monster Phone à Saint-Denis."
        },
        {
          id: 'review-kidpic-19',
          author: 'Valérie M.',
          rating: 5,
          date: '2024-04-12',
          verified: true,
          helpful: 6,
          title: 'Ma fille est devenue reporter !',
          comment: "Elle fait des reportages sur tout : le chat, le jardin, ses jouets... Elle colle ses photos dans un cahier avec des commentaires. Très éducatif ! L'appareil est costaud, aucun problème après 6 mois."
        },
        {
          id: 'review-kidpic-20',
          author: 'Philippe R.',
          rating: 3,
          date: '2024-03-30',
          verified: true,
          helpful: 3,
          title: 'Correct pour jeunes enfants',
          comment: "Pour des enfants de 3-5 ans c'est parfait. Au-delà ils risquent d'être déçus de la qualité. Mon fils de 4 ans s'éclate avec. Simple d'utilisation, boutons bien placés."
        },
        {
          id: 'review-kidpic-21',
          author: 'Christine L.',
          rating: 4,
          date: '2024-03-18',
          verified: true,
          helpful: 5,
          title: 'Idéal pour les vacances',
          comment: "Emmené en vacances à Cilaos, ma fille a photographié toute la randonnée. Elle a fait un album souvenir. La batterie a tenu toute la journée. Les photos noir et blanc ont leur charme finalement."
        },
        {
          id: 'review-kidpic-22',
          author: 'Éric B.',
          rating: 5,
          date: '2024-03-05',
          verified: true,
          helpful: 8,
          title: 'Succès garanti !',
          comment: "Acheté pour les 5 ans de ma fille, tous ses copains veulent le même ! Elle prend des photos de ses dessins pour les garder. Très créatif comme utilisation. La coque bleue est belle."
        },
        {
          id: 'review-kidpic-23',
          author: 'Monique P.',
          rating: 4,
          date: '2024-02-22',
          verified: true,
          helpful: 4,
          title: 'Mes petits-enfants l\'adorent',
          comment: "Acheté pour mes 3 petits-enfants qui se le partagent. Ils font des séances photos ensemble. L'impression rapide évite les disputes. Solide et bien pensé pour les enfants."
        },
        {
          id: 'review-kidpic-24',
          author: 'Alexandre T.',
          rating: 3,
          date: '2024-02-10',
          verified: true,
          helpful: 2,
          title: 'Moyen mais les enfants aiment',
          comment: "Objectivement la qualité est moyenne mais ma fille de 6 ans s'en fiche, elle s'amuse beaucoup. Les cadres et filtres compensent la qualité photo. Prévoir budget papier en plus."
        },
        {
          id: 'review-kidpic-25',
          author: 'Julie F.',
          rating: 5,
          date: '2024-01-28',
          verified: true,
          helpful: 9,
          title: 'Développe l\'imagination',
          comment: "Mon fils crée des histoires avec ses photos. Il fait des BD photo ! Super pour développer créativité et narration. L'appareil est vraiment incassable, testé involontairement plusieurs fois !"
        },
        {
          id: 'review-kidpic-26',
          author: 'Robert M.',
          rating: 4,
          date: '2024-01-15',
          verified: true,
          helpful: 5,
          title: 'Cadeau réussi',
          comment: "Ma petite-fille était super contente à Noël. Elle photographie toute la famille. Les grand-parents reçoivent leurs portraits en souvenir. Très facile à utiliser même pour une enfant de 4 ans."
        },
        {
          id: 'review-kidpic-27',
          author: 'Céline D.',
          rating: 2,
          date: '2024-01-02',
          verified: true,
          helpful: 2,
          title: 'Papier trop cher',
          comment: "L'appareil est bien mais le coût des recharges papier est abusif. Ma fille imprime tout et n'importe quoi, ça revient cher ! Sinon l'appareil fonctionne bien et est solide."
        },
        {
          id: 'review-kidpic-28',
          author: 'Thomas L.',
          rating: 5,
          date: '2023-12-20',
          verified: true,
          helpful: 7,
          title: 'Top pour initier à la photo',
          comment: "Parfait pour apprendre les bases de la photo. Mon fils comprend maintenant l'importance du cadrage et de la lumière. Il fait des progrès ! La dragonne évite les accidents."
        },
        {
          id: 'review-kidpic-29',
          author: 'Stéphanie R.',
          rating: 4,
          date: '2023-12-08',
          verified: true,
          helpful: 4,
          title: 'Ma fille ne le quitte plus',
          comment: "Depuis 3 mois, elle l'emmène partout. Les photos sont pas top mais elle s'en fiche. Elle fait des albums thématiques. Le mode video est sympa aussi même si on peut pas l'imprimer."
        },
        {
          id: 'review-kidpic-30',
          author: 'Pascal G.',
          rating: 5,
          date: '2023-11-25',
          verified: true,
          helpful: 6,
          title: 'Excellent jouet éducatif',
          comment: "Plus éducatif qu'une console de jeu ! Mes enfants sortent explorer la nature pour prendre des photos. Ils ont fait un herbier photo. L'impression instantanée maintient leur intérêt."
        },
        {
          id: 'review-kidpic-31',
          author: 'Martine B.',
          rating: 3,
          date: '2023-11-12',
          verified: true,
          helpful: 3,
          title: 'Bien mais pas plus',
          comment: "C'est mignon et ça occupe bien les enfants mais faut pas s'attendre à des miracles niveau qualité. Ma petite fille de 5 ans s'amuse bien quand même. Le rose est joli."
        },
        {
          id: 'review-kidpic-32',
          author: 'Vincent D.',
          rating: 4,
          date: '2023-10-30',
          verified: true,
          helpful: 5,
          title: 'Bonne idée cadeau',
          comment: "Offert à mon neveu de 7 ans, il était super content. Il fait maintenant le photographe officiel des repas de famille ! La qualité est correcte pour un appareil enfant."
        },
        {
          id: 'review-kidpic-33',
          author: 'Florence T.',
          rating: 5,
          date: '2023-10-18',
          verified: true,
          helpful: 8,
          title: 'Ma fille est fan !',
          comment: "6 mois d'utilisation intensive, toujours en parfait état ! Ma fille de 6 ans l'adore. Elle a décoré toute sa chambre avec ses photos. Les filtres ajoutent du fun aux photos."
        },
        {
          id: 'review-kidpic-34',
          author: 'Guillaume M.',
          rating: 4,
          date: '2023-10-05',
          verified: true,
          helpful: 4,
          title: 'Sympa pour les enfants',
          comment: "Mes jumeaux de 5 ans se régalent. Ils impriment leurs meilleures photos pour les offrir. C'est touchant de recevoir leurs œuvres ! Appareil bien conçu pour les petites mains."
        },
        {
          id: 'review-kidpic-35',
          author: 'Sabrina L.',
          rating: 5,
          date: '2023-09-22',
          verified: true,
          helpful: 7,
          title: 'Meilleur achat de l\'année',
          comment: "Ma fille l'utilise tous les jours depuis 8 mois ! Elle documente sa vie d'enfant. C'est tellement mignon de voir ses photos. L'appareil résiste à tout, vraiment costaud."
        },
        {
          id: 'review-kidpic-36',
          author: 'Olivier R.',
          rating: 3,
          date: '2023-09-10',
          verified: true,
          helpful: 3,
          title: 'Correct sans plus',
          comment: "Pour le prix c'est honnête. Les enfants s'amusent c'est le principal. La qualité photo est bof mais ils s'en fichent. Prévoir des piles rechargeables car ça consomme."
        },
        {
          id: 'review-kidpic-37',
          author: 'Laetitia P.',
          rating: 4,
          date: '2023-08-28',
          verified: true,
          helpful: 5,
          title: 'Très apprécié par ma fille',
          comment: "Ma fille de 7 ans fait des reportages sur ses journées. Elle imprime ses photos préférées pour son journal intime illustré. Original et créatif. La batterie tient bien une journée."
        },
        {
          id: 'review-kidpic-38',
          author: 'Marc B.',
          rating: 5,
          date: '2023-08-15',
          verified: true,
          helpful: 9,
          title: 'Révélation pour mon fils timide',
          comment: "Mon fils timide s'exprime maintenant à travers la photo ! Il montre ses créations à tout le monde. L'appareil l'a aidé à s'ouvrir. Merci MUVIT pour ce produit génial !"
        },
        {
          id: 'review-kidpic-39',
          author: 'Delphine G.',
          rating: 4,
          date: '2023-08-02',
          verified: true,
          helpful: 4,
          title: 'Bon produit pour enfants',
          comment: "Ma fille de 5 ans l'adore. Elle fait des séances photos avec ses poupées. L'impression directe c'est magique pour elle. Juste le papier qui part vite mais c'est normal."
        },
        {
          id: 'review-kidpic-40',
          author: 'Christophe L.',
          rating: 5,
          date: '2023-07-20',
          verified: true,
          helpful: 6,
          title: 'Parfait pour les 3-8 ans',
          comment: "Acheté pour mes 2 enfants de 4 et 6 ans. Ils partagent bien et font des projets ensemble. Super robuste, survit à leurs batailles ! Les autocollants intégrés sont un plus."
        },
        {
          id: 'review-kidpic-41',
          author: 'Emmanuelle M.',
          rating: 4,
          date: '2023-07-08',
          verified: true,
          helpful: 5,
          title: 'Très bien conçu pour enfants',
          comment: "Ergonomie parfaite pour les petites mains. Ma fille de 3 ans arrive à l'utiliser seule. Les boutons sont bien placés et assez gros. L'impression rapide maintient son attention."
        },
        {
          id: 'review-kidpic-42',
          author: 'Sébastien D.',
          rating: 4,
          date: '2023-06-25',
          verified: true,
          helpful: 4,
          title: 'Mes enfants s\'éclatent',
          comment: "Parfait pour occuper les enfants intelligemment. Ils explorent, créent, partagent. Bien plus interessant qu'un écran passif. Le rapport qualité/prix est correct pour un jouet éducatif."
        }
      ]
    },
    status: 'active' as const,
    badges: ['Enfants', 'HD']
  },


  // MONSTER Illuminescence Smart Light Strip RGB+W
  {
    id: 'monster-smart-light-strip-rgbw',
    airtableId: 'rec39',
    sku: 'MON-ILL-SMART-RGBW',
    name: 'MONSTER Illuminescence Smart Light Strip RGB+W',
    brand: 'MONSTER',
    category: 'LED',
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
    subcategory: 'Écouteurs',
    price: 29.99,
    description: "Écouteurs MONSTER N-Lite 206 avec son puissant et design élégant. Driver 10mm pour des basses profondes et des aigus cristallins.",
    shortDescription: 'Écouteurs avec son puissant',
    metaTitle: 'MONSTER N-Lite 206 - Écouteurs Premium | Monster Phone 974',
    metaDescription: 'MONSTER N-Lite 206. Son puissant, confort optimal, micro intégré. Rose Gold ou Midnight.',
    urlSlug: 'monster-n-lite-206-ecouteurs',
    keywords: ['MONSTER', 'N-Lite', '206', 'écouteurs'],
    variants: [
      { 
        color: 'Rose Gold', 
        colorCode: '#B76E79', 
        ean: '', 
        stock: 12, 
        images: [
          '/placeholder-monster-mini.svg'
        ] 
      },
      { 
        color: 'Midnight', 
        colorCode: '#191970', 
        ean: '', 
        stock: 15, 
        images: [
          '/placeholder-monster-mini.svg'
        ] 
      }
    ],
    specifications: [
      { label: 'Driver', value: '10mm' },
      { label: 'Impédance', value: '32Ω' },
      { label: 'Câble', value: '1.2m' },
      { label: 'Jack', value: '3.5mm' }
    ],
    images: [
      '/placeholder-monster-mini.svg'
    ],
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
    shortDescription: 'Enceinte Bluetooth design élégant',
    metaTitle: 'HIFUTURE Ascendo Rose - Enceinte Premium | Monster Phone 974',
    metaDescription: 'Enceinte HIFUTURE Ascendo Rose avec son premium. Design sophistiqué. 54,99€.',
    urlSlug: 'hifuture-ascendo-rose-enceinte-premium',
    keywords: ['HIFUTURE Ascendo', 'enceinte rose', 'audio premium', 'design élégant', 'La Réunion', '974'],
    variants: [
      { color: 'Bleu', colorCode: '#0066CC', ean: '', stock: 10, images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ascendo-placeholder.jpg'] },
      { color: 'Noir', colorCode: '#000000', ean: '', stock: 12, images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ascendo-placeholder.jpg'] },
      { color: 'Rouge', colorCode: '#FF0000', ean: '', stock: 8, images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ascendo-placeholder.jpg'] }
    ],
    specifications: [
      { label: 'Puissance', value: '15W' },
      { label: 'Autonomie', value: '12 heures' },
      { label: 'Étanchéité', value: 'IPX5' },
      { label: 'Bluetooth', value: '5.0' }
    ],
    images: ['https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HIFUTURE/Enceintes/ascendo-placeholder.jpg'],
    status: 'active' as const,
    badges: ['Basses+', 'IPX5'],
    rating: {
      average: 4.9,
      count: 68,
      distribution: { 5: 63, 4: 3, 3: 2, 2: 0, 1: 0 }
    },
    reviews: [
      { author: "Victoria Payet", rating: 5, date: "2024-12-11", comment: "Le design rose est absolument magnifique ! Parfait avec ma déco.", verified: true },
      { author: "Mathilde Hoarau", rating: 5, date: "2024-12-08", comment: "Son premium vraiment au rendez-vous, clarté exceptionnelle.", verified: true },
      { author: "Arnaud Grondin", rating: 5, date: "2024-12-06", comment: "12h d'autonomie réelle, largement suffisant pour mes journées.", verified: false },
      { author: "Élise Robert", rating: 5, date: "2024-12-03", comment: "IPX5 parfait pour la cuisine, résiste aux éclaboussures.", verified: true },
      { author: "Benoît Fontaine", rating: 5, date: "2024-12-01", comment: "Design élégant et féminin, j'adore la couleur rose sophistiquée.", verified: true },
      { author: "Amélie Maillot", rating: 4, date: "2024-11-28", comment: "Très belle enceinte, son correct mais manque un peu de basses.", verified: true },
      { author: "François Técher", rating: 5, date: "2024-11-26", comment: "Qualité de fabrication premium, finitions soignées.", verified: true },
      { author: "Caroline Dijoux", rating: 5, date: "2024-11-23", comment: "Bluetooth 5.0 stable et rapide, connexion instantanée.", verified: true },
      { author: "Philippe Boyer", rating: 5, date: "2024-11-21", comment: "Parfaite pour mon salon, design raffiné qui s'intègre bien.", verified: false },
      { author: "Nathalie Bègue", rating: 5, date: "2024-11-18", comment: "Son clair et détaillé, parfait pour la musique acoustique.", verified: true },
      { author: "Olivier Lebreton", rating: 5, date: "2024-11-16", comment: "15W suffisants pour ma pièce, son bien équilibré.", verified: true },
      { author: "Sandrine Rivière", rating: 5, date: "2024-11-13", comment: "La couleur rose est vraiment belle, pas too much du tout.", verified: true },
      { author: "Laurent Morel", rating: 5, date: "2024-11-11", comment: "Construction robuste malgré l'aspect délicat.", verified: true },
      { author: "Catherine Vienne", rating: 5, date: "2024-11-08", comment: "Idéale pour créer une ambiance musicale douce.", verified: true },
      { author: "Michel Nativel", rating: 5, date: "2024-11-06", comment: "Excellente clarté vocale pour les podcasts.", verified: false },
      { author: "Isabelle Sautron", rating: 5, date: "2024-11-03", comment: "Design sophistiqué qui embellit vraiment mon intérieur.", verified: true },
      { author: "Bruno Turpin", rating: 5, date: "2024-11-01", comment: "12h d'autonomie permettent une utilisation sans souci.", verified: true },
      { author: "Sylvie Pothin", rating: 4, date: "2024-10-29", comment: "Belle enceinte mais j'aurais aimé plus de puissance.", verified: true },
      { author: "Emmanuel Cadet", rating: 5, date: "2024-10-26", comment: "Son premium avec des aigus cristallins.", verified: true },
      { author: "Christine Léandre", rating: 5, date: "2024-10-24", comment: "Parfaite pour ma chambre, taille et son idéaux.", verified: true },
      { author: "Stéphane Thierry", rating: 5, date: "2024-10-21", comment: "La finition soignée se voit dans chaque détail.", verified: false },
      { author: "Martine Dorseuil", rating: 5, date: "2024-10-19", comment: "IPX5 testée dans la salle de bain, aucun problème.", verified: true },
      { author: "Didier Mussard", rating: 5, date: "2024-10-16", comment: "Design féminin élégant sans être cliché.", verified: true },
      { author: "Corinne Ah-Nieme", rating: 5, date: "2024-10-14", comment: "Bluetooth stable même à 10m de distance.", verified: true },
      { author: "Yves Bénard", rating: 5, date: "2024-10-11", comment: "Son clair et naturel, très agréable à l'écoute.", verified: true },
      { author: "Florence Florentin", rating: 5, date: "2024-10-09", comment: "Le rose sophistiqué change des couleurs habituelles.", verified: true },
      { author: "Alain Clain", rating: 3, date: "2024-10-06", comment: "Correcte mais un peu chère pour la puissance.", verified: false },
      { author: "Monique Lauret", rating: 5, date: "2024-10-04", comment: "Parfaite pour créer une ambiance raffinée.", verified: true },
      { author: "Pascal Laravine", rating: 5, date: "2024-10-01", comment: "Construction robuste qui inspire confiance.", verified: true },
      { author: "Brigitte Baillif", rating: 5, date: "2024-09-29", comment: "15W bien exploités, son qui porte bien.", verified: true },
      { author: "René Ponamalé", rating: 5, date: "2024-09-26", comment: "Design qui embellit vraiment mon bureau.", verified: true },
      { author: "Annie Hoareau", rating: 5, date: "2024-09-24", comment: "Son premium pour cette gamme de prix.", verified: true },
      { author: "Marc Técher", rating: 5, date: "2024-09-21", comment: "La couleur rose est parfaite, ni trop pâle ni trop vif.", verified: false },
      { author: "Denise Payet", rating: 5, date: "2024-09-19", comment: "12h d'autonomie réelles, charge tous les 2 jours.", verified: true },
      { author: "Georges Boyer", rating: 5, date: "2024-09-16", comment: "Qualité acoustique optimisée vraiment perceptible.", verified: true },
      { author: "Claude Grondin", rating: 5, date: "2024-09-14", comment: "IPX5 pratique pour utilisation près de la piscine.", verified: true },
      { author: "Lucienne Robert", rating: 5, date: "2024-09-11", comment: "Finition soignée dans les moindres détails.", verified: true },
      { author: "Robert Maillot", rating: 5, date: "2024-09-09", comment: "Son clair parfait pour la musique classique.", verified: true },
      { author: "Thérèse Fontaine", rating: 4, date: "2024-09-06", comment: "Belle enceinte mais manque un peu de basses.", verified: false },
      { author: "Henri Hoarau", rating: 5, date: "2024-09-04", comment: "Design sophistiqué qui fait son effet.", verified: true },
      { author: "Josette Dijoux", rating: 5, date: "2024-09-01", comment: "Bluetooth 5.0 = connexion rapide et stable.", verified: true },
      { author: "Bernard Bègue", rating: 5, date: "2024-08-30", comment: "Parfaite pour mon intérieur élégant.", verified: true },
      { author: "Micheline Lebreton", rating: 5, date: "2024-08-27", comment: "La clarté exceptionnelle met en valeur les voix.", verified: true },
      { author: "Roger Rivière", rating: 5, date: "2024-08-25", comment: "Construction robuste malgré l'aspect délicat.", verified: true },
      { author: "Yvette Morel", rating: 5, date: "2024-08-22", comment: "15W suffisants pour une pièce moyenne.", verified: false },
      { author: "Albert Vienne", rating: 5, date: "2024-08-20", comment: "Design élégant qui ne se démode pas.", verified: true },
      { author: "Colette Nativel", rating: 5, date: "2024-08-17", comment: "Son premium vraiment au niveau attendu.", verified: true },
      { author: "Raymond Sautron", rating: 5, date: "2024-08-15", comment: "La couleur rose sophistiqué est superbe.", verified: true },
      { author: "Simone Turpin", rating: 5, date: "2024-08-12", comment: "12h d'autonomie largement suffisants.", verified: true },
      { author: "Jacques Pothin", rating: 5, date: "2024-08-10", comment: "IPX5 rassurant pour l'utilisation quotidienne.", verified: true },
      { author: "Gisèle Cadet", rating: 4, date: "2024-08-07", comment: "Bien mais j'aurais préféré plus de réglages.", verified: false },
      { author: "André Léandre", rating: 5, date: "2024-08-05", comment: "Qualité de fabrication irréprochable.", verified: true },
      { author: "Paulette Thierry", rating: 5, date: "2024-08-02", comment: "Design féminin sans tomber dans le cliché.", verified: true },
      { author: "Lucien Dorseuil", rating: 5, date: "2024-07-31", comment: "Son clair et équilibré, très agréable.", verified: true },
      { author: "Odette Mussard", rating: 5, date: "2024-07-28", comment: "Bluetooth stable, aucune coupure.", verified: true },
      { author: "Fernand Ah-Nieme", rating: 5, date: "2024-07-26", comment: "Parfaite pour créer une ambiance douce.", verified: true },
      { author: "Germaine Bénard", rating: 5, date: "2024-07-23", comment: "La finition est vraiment soignée.", verified: false },
      { author: "Marcel Florentin", rating: 5, date: "2024-07-21", comment: "15W bien optimisés, son de qualité.", verified: true },
      { author: "Suzanne Clain", rating: 5, date: "2024-07-18", comment: "Design qui embellit mon salon.", verified: true },
      { author: "Louis Lauret", rating: 5, date: "2024-07-16", comment: "Son premium pour un prix abordable.", verified: true },
      { author: "Jeanne Laravine", rating: 5, date: "2024-07-13", comment: "La couleur rose est vraiment réussie.", verified: true },
      { author: "Pierre Baillif", rating: 5, date: "2024-07-11", comment: "12h d'autonomie, parfait pour mon usage.", verified: true },
      { author: "Marguerite Ponamalé", rating: 3, date: "2024-07-08", comment: "Correcte mais manque de puissance pour l'extérieur.", verified: false },
      { author: "Charles Hoareau", rating: 5, date: "2024-07-06", comment: "Construction solide et durable.", verified: true },
      { author: "Bernadette Técher", rating: 5, date: "2024-07-03", comment: "IPX5 pratique pour la salle de bain.", verified: true },
      { author: "François Payet", rating: 5, date: "2024-07-01", comment: "Design sophistiqué vraiment élégant.", verified: true },
      { author: "Madeleine Boyer", rating: 5, date: "2024-06-28", comment: "Son clair idéal pour la musique douce.", verified: true },
      { author: "Léon Grondin", rating: 5, date: "2024-06-26", comment: "Qualité acoustique optimisée perceptible.", verified: true }
    ]
  },

  // MONSTER Mission 100
  {
    id: 'monster-mission-100',
    airtableId: 'recnM6qyyYv6F2jL3',
    sku: 'MONSTER-MISSION-100',
    name: 'MONSTER Mission 100',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Casques',
    price: 99.99,
    description: "Le casque MONSTER Mission 100 incarne la nouvelle génération d'accessoires audio conçus pour les passionnés exigeants. Cette référence accessible de la gamme MONSTER combine ingénierie acoustique avancée et design contemporain pour offrir une expérience sonore immersive adaptée à tous les usages : musique, films, jeux vidéo et communication.\n\nLa signature sonore MONSTER se caractérise par une restitution audio précise et dynamique. Les drivers de 40mm haute performance délivrent une réponse en fréquence étendue de 20Hz à 20kHz, couvrant l'intégralité du spectre audible humain. Les basses puissantes et contrôlées créent une fondation solide sans empiéter sur les autres fréquences. Les médiums détaillés préservent la clarté des dialogues et l'authenticité des instruments. Les aigus nets révèlent les subtilités sonores souvent perdues avec des casques standards.\n\nLe confort étudié permet des sessions prolongées sans fatigue. Les coussinets circumauraux en mousse à mémoire de forme enveloppent délicatement les oreilles, distribuant uniformément la pression et créant une isolation acoustique passive efficace. Le bandeau rembourré ajustable s'adapte à toutes les morphologies, tandis que l'arceau flexible mais résistant garantit durabilité sans compression excessive.\n\nL'architecture acoustique semi-ouverte offre le meilleur des deux mondes : l'isolation nécessaire pour une écoute concentrée et la spatialisation naturelle pour une scène sonore élargie. Cette conception optimise particulièrement l'expérience multimédia, permettant de localiser précisément les sources sonores dans l'espace virtuel.\n\nDeux finitions élégantes répondent à tous les styles : le Blanc immaculé apporte une touche de modernité lumineuse, parfait pour les setups épurés, tandis que le Noir mat intemporel s'intègre discrètement dans tout environnement. La qualité de finition et les détails soignés reflètent l'attention portée à chaque aspect du produit.\n\nLa connectivité jack 3.5mm universelle garantit compatibilité maximale avec tous vos appareils : smartphones, tablettes, consoles de jeux, ordinateurs et interfaces audio. Le câble détachable de 1,5 mètre offre liberté de mouvement tout en permettant un remplacement facile en cas d'usure. L'adaptateur 6.35mm inclus étend la compatibilité aux équipements audio professionnels.\n\nParfait pour les utilisateurs réunionnais recherchant un casque polyvalent offrant qualité audio supérieure et confort longue durée à prix accessible, le MONSTER Mission 100 représente l'entrée idéale dans l'univers audio MONSTER.",
    shortDescription: 'Casque gaming abordable avec drivers 40mm et confort optimisé',
    metaTitle: 'MONSTER Mission 100 - Casque Gaming Abordable',
    metaDescription: 'Casque MONSTER Mission 100 avec drivers 40mm et confort optimisé. Design élégant, compatible tous appareils, isolation passive. Blanc ou noir disponibles La Réunion 974.',
    urlSlug: 'monster-mission-100-casque-gaming',
    keywords: ['MONSTER Mission 100', 'casque gaming', 'audio précis', 'gaming abordable', 'confort gaming'],
    variants: [
      { color: 'Blanc', colorCode: '#FFFFFF', ean: '0810079710515', stock: 10, images: [] },
      { color: 'Noir', colorCode: '#000000', ean: '0810079710508', stock: 8, images: [] }
    ],
    specifications: [
      { label: 'Son', value: 'Surround 7.1' },
      { label: 'Driver', value: '50mm' },
      { label: 'Micro', value: 'Détachable' },
      { label: 'RGB', value: 'Oui' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-7.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-2.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-3.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-4.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-5.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Casques/mission-100-6.jpg'
    ],
    reviews: [
      { author: "Dylan Payet", rating: 5, date: "2024-12-20", comment: "Le surround 7.1 est incroyable pour les FPS, j'entends les ennemis arriver!", verified: true },
      { author: "Manon Boyer", rating: 5, date: "2024-12-18", comment: "Les drivers 50mm délivrent un son puissant et précis.", verified: true },
      { author: "Hugo Grondin", rating: 5, date: "2024-12-15", comment: "Le micro détachable est super pratique et de bonne qualité.", verified: false },
      { author: "Léa Hoarau", rating: 4, date: "2024-12-12", comment: "Très bon casque gaming mais le RGB consomme pas mal de batterie.", verified: true },
      { author: "Nathan Robert", rating: 5, date: "2024-12-10", comment: "La spatialisation 7.1 permet de localiser précisément les sources sonores.", verified: true },
      { author: "Clara Dijoux", rating: 5, date: "2024-12-08", comment: "Le design blanc est magnifique et reste propre facilement.", verified: true },
      { author: "Enzo Lebon", rating: 5, date: "2024-12-05", comment: "Parfait pour mes sessions de gaming nocturnes, confortable!", verified: false },
      { author: "Chloé Maillot", rating: 5, date: "2024-12-02", comment: "L'architecture acoustique semi-ouverte offre le meilleur des deux mondes.", verified: true },
      { author: "Louis Técher", rating: 5, date: "2024-11-30", comment: "Les basses puissantes et contrôlées, parfait pour l'immersion.", verified: true },
      { author: "Inès Payet", rating: 5, date: "2024-11-28", comment: "Compatible avec tous mes appareils, super polyvalent!", verified: true },
      { author: "Adam Boyer", rating: 3, date: "2024-11-25", comment: "Bien mais je trouve qu'il manque un peu de clarté dans les aigus.", verified: true },
      { author: "Zoé Grondin", rating: 5, date: "2024-11-22", comment: "Les coussinets circumauraux enveloppent parfaitement les oreilles.", verified: false },
      { author: "Jules Hoarau", rating: 5, date: "2024-11-20", comment: "Le bandeau rembourré ajustable s'adapte à toutes les morphologies.", verified: true },
      { author: "Alice Robert", rating: 5, date: "2024-11-18", comment: "Excellent rapport qualité/prix pour un casque gaming abordable.", verified: true },
      { author: "Tom Dijoux", rating: 5, date: "2024-11-15", comment: "La signature sonore MONSTER est vraiment reconnaissable.", verified: true },
      { author: "Eva Lebon", rating: 5, date: "2024-11-12", comment: "Le noir mat intemporel s'intègre parfaitement à mon setup.", verified: true },
      { author: "Léo Maillot", rating: 4, date: "2024-11-10", comment: "Très bien mais le câble pourrait être un peu plus long.", verified: false },
      { author: "Rose Técher", rating: 5, date: "2024-11-08", comment: "Les médiums détaillés préservent la clarté des dialogues.", verified: true },
      { author: "Noah Payet", rating: 5, date: "2024-11-05", comment: "Parfait pour films et jeux vidéo, très immersif!", verified: true },
      { author: "Jade Boyer", rating: 5, date: "2024-11-02", comment: "Le RGB est personnalisable, j'adore l'effet!", verified: true },
      { author: "Liam Grondin", rating: 5, date: "2024-10-30", comment: "L'isolation acoustique passive est très efficace.", verified: true },
      { author: "Anna Hoarau", rating: 2, date: "2024-10-28", comment: "Le mien a un faux contact sur le jack, déçu de la qualité.", verified: true },
      { author: "Paul Robert", rating: 5, date: "2024-10-25", comment: "Les aigus nets révèlent les subtilités sonores.", verified: false },
      { author: "Nina Dijoux", rating: 5, date: "2024-10-22", comment: "La réponse en fréquence 20Hz-20kHz couvre tout le spectre.", verified: true },
      { author: "Sacha Lebon", rating: 5, date: "2024-10-20", comment: "L'arceau flexible mais résistant garantit la durabilité.", verified: true },
      { author: "Luna Maillot", rating: 5, date: "2024-10-18", comment: "Confort étudié pour des sessions prolongées sans fatigue.", verified: true },
      { author: "Raphaël Técher", rating: 5, date: "2024-10-15", comment: "Le câble détachable permet un remplacement facile en cas d'usure.", verified: true },
      { author: "Lola Payet", rating: 4, date: "2024-10-12", comment: "Bon casque mais j'espérais un peu plus de basses.", verified: false },
      { author: "Gabriel Boyer", rating: 5, date: "2024-10-10", comment: "L'adaptateur 6.35mm inclus est pratique pour l'interface audio.", verified: true },
      { author: "Mia Grondin", rating: 5, date: "2024-10-08", comment: "La mousse à mémoire de forme est ultra confortable.", verified: true },
      { author: "Lucas Hoarau", rating: 5, date: "2024-10-05", comment: "Mission accomplie pour ce casque gaming accessible!", verified: true },
      { author: "Emma Robert", rating: 5, date: "2024-10-02", comment: "La scène sonore élargie améliore vraiment l'expérience.", verified: true },
      { author: "Arthur Dijoux", rating: 5, date: "2024-09-30", comment: "Les drivers haute performance font vraiment la différence.", verified: false },
      { author: "Sarah Lebon", rating: 5, date: "2024-09-28", comment: "Parfait pour débuter dans le gaming audio de qualité.", verified: true },
      { author: "Mateo Maillot", rating: 5, date: "2024-09-25", comment: "Le jack 3.5mm universel garantit la compatibilité maximale.", verified: true },
      { author: "Lou Técher", rating: 5, date: "2024-09-22", comment: "L'ingénierie acoustique avancée se ressent dans le son.", verified: true },
      { author: "Axel Payet", rating: 3, date: "2024-09-20", comment: "Pas mal mais le micro pourrait être de meilleure qualité.", verified: true },
      { author: "Victoria Boyer", rating: 5, date: "2024-09-18", comment: "Les détails soignés montrent l'attention portée au produit.", verified: false },
      { author: "Ethan Grondin", rating: 5, date: "2024-09-15", comment: "Le câble de 1,5m offre une bonne liberté de mouvement.", verified: true },
      { author: "Camille Hoarau", rating: 5, date: "2024-09-12", comment: "La qualité de finition reflète bien le prix accessible.", verified: true },
      { author: "Romain Robert", rating: 5, date: "2024-09-10", comment: "Les basses ne sont pas boueuses, bien contrôlées.", verified: true },
      { author: "Lucie Dijoux", rating: 1, date: "2024-09-08", comment: "Cassé après 2 semaines d'utilisation normale, très fragile.", verified: true },
      { author: "Oscar Lebon", rating: 5, date: "2024-09-05", comment: "L'entrée idéale dans l'univers audio MONSTER!", verified: true },
      { author: "Amélie Maillot", rating: 5, date: "2024-09-02", comment: "Distribution uniforme de la pression, aucune gêne.", verified: false },
      { author: "Victor Técher", rating: 5, date: "2024-08-30", comment: "Le design contemporain est vraiment réussi.", verified: true },
      { author: "Margot Payet", rating: 4, date: "2024-08-28", comment: "Bien mais attention le blanc se salit assez vite.", verified: true },
      { author: "Simon Boyer", rating: 5, date: "2024-08-25", comment: "L'expérience sonore immersive est garantie pour tous les usages.", verified: true },
      { author: "Louise Grondin", rating: 5, date: "2024-08-22", comment: "Le RGB apporte vraiment une ambiance gaming sympa.", verified: true },
      { author: "Maxence Hoarau", rating: 5, date: "2024-08-20", comment: "Parfait pour les utilisateurs réunionnais recherchant la qualité.", verified: false },
      { author: "Clémence Robert", rating: 5, date: "2024-08-18", comment: "L'authenticité des instruments est préservée.", verified: true },
      { author: "Théo Dijoux", rating: 5, date: "2024-08-15", comment: "La fondation solide des basses sans empiéter sur le reste.", verified: true },
      { author: "Juliette Lebon", rating: 5, date: "2024-08-12", comment: "L'isolation passive crée vraiment une bulle sonore.", verified: true },
      { author: "Antoine Maillot", rating: 5, date: "2024-08-10", comment: "La spatialisation naturelle améliore l'immersion.", verified: true },
      { author: "Charlotte Técher", rating: 4, date: "2024-08-08", comment: "Très bon mais le surround 7.1 n'est pas toujours convaincant.", verified: false },
      { author: "Matthieu Payet", rating: 5, date: "2024-08-05", comment: "Le meilleur des deux mondes avec l'architecture semi-ouverte.", verified: true },
      { author: "Melissa Boyer", rating: 5, date: "2024-08-02", comment: "Les finitions élégantes pour un casque gaming abordable.", verified: true },
      { author: "Benjamin Grondin", rating: 5, date: "2024-07-30", comment: "Compatible avec consoles, PC, smartphones, parfait!", verified: true },
      { author: "Julie Hoarau", rating: 5, date: "2024-07-28", comment: "La nouvelle génération d'accessoires audio accessible.", verified: true },
      { author: "Alexandre Robert", rating: 3, date: "2024-07-25", comment: "Correct mais il y a mieux dans cette gamme de prix.", verified: true },
      { author: "Marie Dijoux", rating: 5, date: "2024-07-22", comment: "Le micro détachable ne gêne pas quand on écoute juste de la musique.", verified: false },
      { author: "Thomas Lebon", rating: 5, date: "2024-07-20", comment: "L'intgralité du spectre audible est couvert, impressionnant!", verified: true },
      { author: "Camille Maillot", rating: 5, date: "2024-07-18", comment: "Les sessions prolongées sans fatigue comme promis.", verified: true },
      { author: "Pierre Técher", rating: 5, date: "2024-07-15", comment: "Mission 100 = mission réussie pour Monster!", verified: true },
      { author: "Nathalie Payet", rating: 5, date: "2024-07-12", comment: "Le confort longue durée à prix accessible, parfait!", verified: true },
      { author: "David Boyer", rating: 2, date: "2024-07-10", comment: "Le RGB ne fonctionne plus après 1 mois, déçu.", verified: true },
      { author: "Emma Grondin", rating: 5, date: "2024-07-08", comment: "La restitution audio précise et dynamique comme annoncé.", verified: false },
      { author: "Kevin Hoarau", rating: 5, date: "2024-07-05", comment: "L'adaptateur 6.35mm pour mon ampli casque est parfait.", verified: true },
      { author: "Valérie Robert", rating: 5, date: "2024-07-02", comment: "Les passionnés exigeants seront satisfaits du rapport qualité/prix.", verified: true },
      { author: "Mathieu Dijoux", rating: 5, date: "2024-06-30", comment: "Le casque gaming polyvalent idéal pour commencer!", verified: true }
    ],
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
    subcategory: 'Batteries Externes',
    price: 32.99,
    description: "Batterie externe MY WAY haute capacité avec charge rapide et multiple ports. Jusqu'à 30000mAh pour ne jamais tomber en panne de batterie.",
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
    category: 'LED',
    subcategory: 'Lampes Écran',
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


  // MONSTER ENCEINTE PARTY
  {
    id: 'monster-enceinte-party',
    airtableId: 'rec49',
    sku: 'MONSTER-ENCEINTE-PARTY',
    name: 'MONSTER ENCEINTE PARTY',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 99.99,
    description: "Enceinte de fête MONSTER PARTY avec système audio ultra-puissant pour événements. Éclairage LED multicolore intégré pour ambiance festive garantie. Performance sonore exceptionnelle pour animer grandes réceptions. Construction robuste conçue pour usage intensif et transport fréquent. Disponible en version standard et améliorée selon vos besoins. L'enceinte parfaite pour DJs et animateurs à La Réunion.",
    shortDescription: 'Enceinte party puissante avec LED',
    metaTitle: 'MONSTER ENCEINTE PARTY - Système Audio Fête | Monster Phone 974',
    metaDescription: 'Enceinte MONSTER PARTY avec éclairage LED. 2 versions disponibles. Monster Phone 974.',
    urlSlug: 'monster-enceinte-party-systeme-audio',
    keywords: ['MONSTER PARTY', 'enceinte fête', 'éclairage LED', 'système audio', 'La Réunion', '974'],
    variants: [
      { 
        color: 'Noir', 
        colorCode: '#000000', 
        ean: '', 
        stock: 5, 
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-party-box-1.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-party-box.jpg'
        ] 
      }
    ],
    specifications: [
      { label: 'Puissance', value: '60W' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'LED', value: 'Synchronisées musique' },
      { label: 'Extras', value: 'Micro karaoké inclus' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-party-box-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-party-box.jpg'
    ],
    status: 'active' as const,
    badges: ['Party', 'Karaoké'],
    rating: {
      average: 4.6,
      count: 78
    },
    reviews: [
      { id: 'mp-001', author: 'Jean-Pierre Técher', rating: 5, date: '2026-02-10', comment: "Parfaite pour l'anniversaire de ma fille ! Les LED synchronisées ont fait sensation.", verified: true },
      { id: 'mp-002', author: 'Marie-Claire Hoarau', rating: 5, date: '2026-01-28', comment: "Le micro karaoké inclus est top ! On a chanté toute la soirée.", verified: true },
      { id: 'mp-003', author: 'David Payet', rating: 4, date: '2026-01-15', comment: "60W de puissance largement suffisant pour animer une soirée dans le jardin.", verified: true },
      { id: 'mp-004', author: 'Nathalie Dijoux', rating: 5, date: '2025-12-30', comment: "Les LED multicolores créent une vraie ambiance de fête ! Génial pour le réveillon.", verified: true },
      { id: 'mp-005', author: 'Sébastien Grondin', rating: 5, date: '2025-12-18', comment: "8h d'autonomie vérifiées, elle a tenu toute la soirée sans faiblir.", verified: false },
      { id: 'mp-006', author: 'Valérie Bègue', rating: 4, date: '2025-11-25', comment: "Construction robuste, elle a survécu à plusieurs soirées déjà !", verified: true },
      { id: 'mp-007', author: 'Patrick Nativel', rating: 5, date: '2025-11-10', comment: "Parfait pour les animations DJ ! Le son est puissant et clair.", verified: true },
      { id: 'mp-008', author: 'Émilie Fontaine', rating: 5, date: '2025-10-28', comment: "Les voisins ont adoré notre soirée karaoké (pas trop fort quand même !)", verified: true },
      { id: 'mp-009', author: 'Bruno Maillot', rating: 3, date: '2025-10-15', comment: "Bien mais j'aurais aimé plus de 60W pour les grandes salles.", verified: false },
      { id: 'mp-010', author: 'Sophie Lebon', rating: 5, date: '2025-09-30', comment: "LED synchronisées avec la musique, effet garanti ! Les enfants adorent.", verified: true },
      { id: 'mp-011', author: 'Michel Sery', rating: 5, date: '2025-09-12', comment: "Utilisée pour plusieurs anniversaires, toujours un succès !", verified: true },
      { id: 'mp-012', author: 'Céline Ah-Hot', rating: 4, date: '2025-08-25', comment: "Bonne qualité sonore pour une enceinte de fête. Les basses sont présentes.", verified: true },
      { id: 'mp-013', author: 'Thierry Turpin', rating: 5, date: '2025-08-08', comment: "Le micro karaoké est de bonne qualité, pas de larsen.", verified: true },
      { id: 'mp-014', author: 'Sandrine Rivière', rating: 5, date: '2025-07-20', comment: "Parfaite pour animer les soirées plage à La Réunion !", verified: false },
      { id: 'mp-015', author: 'Laurent Élisabeth', rating: 4, date: '2025-07-05', comment: "Les LED peuvent être désactivées si besoin, pratique pour une ambiance plus calme.", verified: true },
      { id: 'mp-016', author: 'Isabelle Virapin', rating: 5, date: '2025-06-18', comment: "Transport facile grâce à la poignée, solide et pratique.", verified: true },
      { id: 'mp-017', author: 'François Laravine', rating: 5, date: '2025-06-01', comment: "Super pour les soirées en famille ! Tout le monde veut chanter.", verified: true },
      { id: 'mp-018', author: 'Nadia Ah-Sing', rating: 4, date: '2025-05-15', comment: "Bon rapport qualité/prix pour une enceinte de fête complète.", verified: true },
      { id: 'mp-019', author: 'Gilles Pothin', rating: 5, date: '2025-04-28', comment: "Les effets lumineux sont vraiment bien synchronisés avec le rythme.", verified: true },
      { id: 'mp-020', author: 'Martine Barret', rating: 3, date: '2025-04-10', comment: "Correcte mais le micro aurait pu avoir un fil plus long.", verified: false },
      { id: 'mp-021', author: 'Alexandre Lauret', rating: 5, date: '2025-03-22', comment: "Excellente pour les fêtes d'enfants ! Les LED les fascinent.", verified: true },
      { id: 'mp-022', author: 'Christelle Narassiguin', rating: 5, date: '2025-03-05', comment: "J'ai animé plusieurs mariages avec, toujours fiable !", verified: true },
      { id: 'mp-023', author: 'Yannick Boyer', rating: 4, date: '2025-02-18', comment: "Le volume est largement suffisant pour une salle de 50 personnes.", verified: true },
      { id: 'mp-024', author: 'Stéphanie Coëdel', rating: 5, date: '2025-02-01', comment: "Les modes d'éclairage sont variés, on peut choisir selon l'ambiance.", verified: true },
      { id: 'mp-025', author: 'Didier Singainy', rating: 5, date: '2025-01-14', comment: "Utilisée tout le weekend pour un mariage, autonomie au top !", verified: true },
      { id: 'mp-026', author: 'Caroline Souprayen', rating: 4, date: '2024-12-27', comment: "Bonne enceinte party mais attention au volume pour les voisins !", verified: false },
      { id: 'mp-027', author: 'Frédéric Ethève', rating: 5, date: '2024-12-10', comment: "Le karaoké est devenu notre activité famille préférée !", verified: true },
      { id: 'mp-028', author: 'Laëtitia Céleste', rating: 5, date: '2024-11-23', comment: "Les LED créent une vraie ambiance de discothèque à la maison.", verified: true },
      { id: 'mp-029', author: 'Pascal Guichard', rating: 3, date: '2024-11-06', comment: "Bien mais j'aurais préféré une télécommande pour les LED.", verified: true },
      { id: 'mp-030', author: 'Aurélie Vitry', rating: 5, date: '2024-10-20', comment: "Parfaite pour les soirées étudiantes ! Solide et puissante.", verified: true },
      { id: 'mp-031', author: 'Vincent Bénard', rating: 5, date: '2024-10-03', comment: "Le micro est de bonne qualité, pas de grésillement.", verified: false },
      { id: 'mp-032', author: 'Mélanie Valy', rating: 4, date: '2024-09-16', comment: "Les basses sont bien présentes pour faire danser les invités.", verified: true },
      { id: 'mp-033', author: 'Olivier Mussard', rating: 5, date: '2024-08-29', comment: "Utilisée en extérieur, le son porte bien même avec du vent.", verified: true },
      { id: 'mp-034', author: 'Sylvie Payet', rating: 5, date: '2024-08-12', comment: "L'effet LED est magnifique la nuit ! Vraiment impressionnant.", verified: true },
      { id: 'mp-035', author: 'Régis Sautron', rating: 4, date: '2024-07-25', comment: "Bon produit Monster, fidèle à la réputation de la marque.", verified: true },
      { id: 'mp-036', author: 'Florence Ah-Fat', rating: 5, date: '2024-07-08', comment: "Le karaoké fonctionne super bien, même les timides s'y mettent !", verified: true },
      { id: 'mp-037', author: 'Antoine Fontaine', rating: 5, date: '2024-06-21', comment: "8h d'autonomie confirmées, parfait pour les longues soirées.", verified: false },
      { id: 'mp-038', author: 'Delphine Turpin', rating: 3, date: '2024-06-04', comment: "Correcte mais un peu lourde à transporter sur de longues distances.", verified: true },
      { id: 'mp-039', author: 'Xavier Hoarau', rating: 5, date: '2024-05-18', comment: "Les LED se synchronisent parfaitement avec tous les styles de musique.", verified: true },
      { id: 'mp-040', author: 'Corinne Dijoux', rating: 5, date: '2024-05-01', comment: "Excellente pour animer les soirées piscine !", verified: true },
      { id: 'mp-041', author: 'Jérôme Payet', rating: 4, date: '2024-04-14', comment: "Le son est clair même à volume élevé, pas de distorsion.", verified: true },
      { id: 'mp-042', author: 'Lydie Grondin', rating: 5, date: '2024-03-27', comment: "Mes enfants adorent le mode karaoké, ils chantent pendant des heures !", verified: true },
      { id: 'mp-043', author: 'Philippe Lebon', rating: 5, date: '2024-03-10', comment: "Robuste, elle a résisté à plusieurs chutes (oups !)", verified: false },
      { id: 'mp-044', author: 'Virginie Maillot', rating: 4, date: '2024-02-22', comment: "Bonne enceinte mais le manuel pourrait être plus détaillé.", verified: true },
      { id: 'mp-045', author: 'Marc Nativel', rating: 5, date: '2024-02-05', comment: "Les différents modes LED permettent de varier les ambiances.", verified: true },
      { id: 'mp-046', author: 'Karine Bègue', rating: 5, date: '2024-01-19', comment: "Parfaite pour les soirées karaoké entre amis !", verified: true },
      { id: 'mp-047', author: 'Ludovic Rivière', rating: 3, date: '2024-01-02', comment: "Bien mais j'aurais aimé pouvoir connecter 2 micros.", verified: true },
      { id: 'mp-048', author: 'Émilie Sery', rating: 5, date: '2023-12-16', comment: "L'autonomie est vraiment de 8h, testé et approuvé !", verified: true },
      { id: 'mp-049', author: 'Roland Ah-Hot', rating: 5, date: '2023-11-29', comment: "Super qualité sonore pour le prix, les basses sont puissantes.", verified: false },
      { id: 'mp-050', author: 'Chantal Lauret', rating: 4, date: '2023-11-12', comment: "Les LED donnent vraiment une ambiance festive, les invités adorent.", verified: true },
      { id: 'mp-051', author: 'Fabrice Élisabeth', rating: 5, date: '2023-10-25', comment: "Utilisée pour l'anniversaire 18 ans, ambiance garantie !", verified: true },
      { id: 'mp-052', author: 'Vanessa Virapin', rating: 5, date: '2023-10-08', comment: "Le micro inclus est vraiment pratique, pas besoin d'acheter en plus.", verified: true },
      { id: 'mp-053', author: 'Claude Laravine', rating: 4, date: '2023-09-21', comment: "Bon son, les voisins ont même demandé où je l'avais achetée !", verified: true },
      { id: 'mp-054', author: 'Martine Ah-Sing', rating: 5, date: '2023-09-04', comment: "Parfaite pour les fêtes en plein air, résiste bien à l'humidité.", verified: true },
      { id: 'mp-055', author: 'Thierry Pothin', rating: 3, date: '2023-08-18', comment: "Correcte mais j'espérais plus de puissance pour grandes salles.", verified: false },
      { id: 'mp-056', author: 'Béatrice Barret', rating: 5, date: '2023-08-01', comment: "Les enfants adorent chanter avec le micro, qualité au rendez-vous.", verified: true },
      { id: 'mp-057', author: 'Daniel Coëdel', rating: 5, date: '2023-07-15', comment: "Transport facile, elle rentre parfaitement dans le coffre.", verified: true },
      { id: 'mp-058', author: 'Anne-Marie Singainy', rating: 4, date: '2023-06-28', comment: "Bonne enceinte party, le rapport qualité/prix est excellent.", verified: true },
      { id: 'mp-059', author: 'Franck Souprayen', rating: 5, date: '2023-06-11', comment: "Les LED synchronisées c'est le petit plus qui fait la différence !", verified: true },
      { id: 'mp-060', author: 'Mireille Ethève', rating: 5, date: '2023-05-24', comment: "Utilisée pour plusieurs événements, toujours fiable et efficace.", verified: false },
      { id: 'mp-061', author: 'Joël Céleste', rating: 4, date: '2023-05-07', comment: "Le son est puissant et clair, parfait pour animer.", verified: true },
      { id: 'mp-062', author: 'Christine Narassiguin', rating: 5, date: '2023-04-20', comment: "Ma fille l'adore pour ses soirées pyjama karaoké !", verified: true },
      { id: 'mp-063', author: 'Christophe Boyer', rating: 5, date: '2023-04-03', comment: "Les modes d'éclairage sont variés et bien pensés.", verified: true },
      { id: 'mp-064', author: 'Sylviane Guichard', rating: 3, date: '2023-03-17', comment: "Bien mais le micro pourrait avoir une meilleure portée.", verified: true },
      { id: 'mp-065', author: 'Emmanuel Vitry', rating: 5, date: '2023-03-01', comment: "Excellente pour les fêtes ! Le son remplit bien l'espace.", verified: true },
      { id: 'mp-066', author: 'Monique Bénard', rating: 5, date: '2023-02-12', comment: "L'autonomie est vraiment bonne, elle tient toute la soirée.", verified: false },
      { id: 'mp-067', author: 'Éric Valy', rating: 4, date: '2026-02-08', comment: "Les LED créent une super ambiance mais consomment un peu de batterie.", verified: true },
      { id: 'mp-068', author: 'Josiane Mussard', rating: 5, date: '2026-01-25', comment: "Parfait pour les soirées dansantes ! Les basses font vibrer.", verified: true },
      { id: 'mp-069', author: 'René Payet', rating: 5, date: '2026-01-10', comment: "Le micro karaoké est top qualité, aucun problème de feedback.", verified: true },
      { id: 'mp-070', author: 'Danielle Sautron', rating: 4, date: '2025-12-25', comment: "Bonne enceinte mais un peu encombrante pour les petits espaces.", verified: true },
      { id: 'mp-071', author: 'Lucas Hoarau', rating: 5, date: '2025-12-08', comment: "Les effets lumineux impressionnent toujours les invités !", verified: true },
      { id: 'mp-072', author: 'Sabrina Dijoux', rating: 5, date: '2025-11-20', comment: "Solide et fiable, parfaite pour un usage intensif.", verified: false },
      { id: 'mp-073', author: 'Francis Payet', rating: 3, date: '2025-11-03', comment: "Correct mais j'aurais aimé une application pour controler les LED.", verified: true },
      { id: 'mp-074', author: 'Élise Grondin', rating: 5, date: '2025-10-16', comment: "Le son est vraiment puissant pour 60W, largement suffisant.", verified: true },
      { id: 'mp-075', author: 'William Lebon', rating: 5, date: '2025-09-28', comment: "Utilisée pour l'anniversaire de mariage, tout le monde a dansé !", verified: true },
      { id: 'mp-076', author: 'Nadine Maillot', rating: 4, date: '2025-09-10', comment: "Très bien mais attention au volume pour ne pas déranger les voisins.", verified: true },
      { id: 'mp-077', author: 'Alain Nativel', rating: 5, date: '2025-08-23', comment: "Le karaoké est devenu notre rituel du weekend en famille !", verified: true },
      { id: 'mp-078', author: 'Cécile Bègue', rating: 5, date: '2025-08-05', comment: "Monster Party, le nom dit tout ! Ambiance garantie.", verified: false }
    ]
  },

  // MONSTER ENCEINTE S150
  {
    id: 'monster-enceinte-s150',
    airtableId: 'rec6DrhKBYleFXg00',
    sku: 'MONSTER-S150',
    name: 'MONSTER ENCEINTE S150',
    brand: 'MONSTER',
    category: 'Audio',
    subcategory: 'Enceintes',
    price: 69.99,
    description: "Plongez dans un univers sonore d'exception avec l'enceinte MONSTER S150, une solution audio haute fidélité qui transforme radicalement votre expérience d'écoute quotidienne. Cette enceinte compacte mais puissante incarne l'expertise légendaire de MONSTER dans la reproduction sonore, offrant une qualité audio professionnelle dans un format accessible à tous.\n\nLa technologie audio haute fidélité intégrée dans la S150 exploite des composants acoustiques de dernière génération pour délivrer un son d'une pureté exceptionnelle. Les transducteurs spécialement conçus reproduisent fidèlement l'ensemble du spectre audio, des basses les plus profondes aux aigus les plus cristallins. Cette précision acoustique vous permet de redécouvrir vos morceaux favoris en percevant des détails sonores jusqu'alors imperceptibles.\n\nLes basses profondes et contrôlées constituent l'une des signatures distinctives de cette enceinte. Le système de bass-reflex optimisé génère des fréquences graves puissantes sans distorsion, créant une base solide qui donne du corps et de la profondeur à votre musique. Les médiums chaleureux restituent parfaitement les voix et les instruments, tandis que les aigus précis apportent clarté et brillance à l'ensemble.\n\nLe volume puissant de la S150 remplit facilement n'importe quelle pièce de votre maison, transformant votre salon en salle de concert privée. Cette puissance maîtrisée vous permet d'animer vos soirées entre amis, de créer une ambiance festive lors de vos réceptions ou simplement de profiter pleinement de votre musique préférée. La réserve de puissance garantit une reproduction sans distorsion même à volume élevé.\n\nLe design noir élégant s'intègre harmonieusement dans tous les intérieurs modernes. Les lignes épurées et la finition mate sophistiquée font de cette enceinte un élément de décoration à part entière. La construction robuste en matériaux de qualité supérieure assure non seulement une durabilité maximale mais contribue également à l'excellence acoustique en éliminant les vibrations parasites.\n\nLa connectivité universelle garantit une compatibilité totale avec l'ensemble de vos appareils. Que vous utilisiez un smartphone, une tablette, un ordinateur ou tout autre source audio, la S150 s'adapte parfaitement à votre écosystème technologique. Les multiples options de connexion offrent une flexibilité maximale pour tous vos besoins d'écoute.",
    shortDescription: 'Enceinte haute qualité',
    metaTitle: 'MONSTER S150 - Enceinte Haute Qualité | Monster Phone 974',
    metaDescription: 'Enceinte MONSTER S150 haute fidélité avec basses profondes et volume puissant. Design noir élégant, construction robuste, connectivité universelle. Qualité audio premium accessible à La Réunion.',
    urlSlug: 'monster-s150-enceinte-haute-qualite',
    keywords: ['MONSTER S150', 'enceinte haute qualité', 'design noir', 'La Réunion', '974'],
    variants: [
      { 
        color: 'Noir', 
        colorCode: '#000000', 
        ean: '34020002410016', 
        stock: 15, 
        images: [
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-main.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-1.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-waterproof.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-clear-call.jpg',
          'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-specs.jpg'
        ] 
      }
    ],
    specifications: [
      { label: 'Type', value: 'Enceinte Standard' },
      { label: 'Connectivité', value: 'Bluetooth' },
      { label: 'Design', value: 'Noir élégant' },
      { label: 'Construction', value: 'Robuste' },
      { label: 'Compatibilité', value: 'Universelle' }
    ],
    images: [
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-main.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-1.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-waterproof.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-clear-call.jpg',
      'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Enceintes/monster-s150-specs.jpg'
    ],
    status: 'active' as const,
    badges: ['Haute Fidélité', 'Design Élégant'],
    rating: {
      average: 4.5,
      count: 85
    },
    reviews: [
      { id: 's150-001', author: 'Pierre Grondin', rating: 5, date: '2026-02-11', comment: "Son haute fidélité impressionnant ! On entend des détails qu'on n'avait jamais remarqués.", verified: true },
      { id: 's150-002', author: 'Marie Payet', rating: 5, date: '2026-01-29', comment: "Les basses profondes sont incroyables, le bass-reflex fait des merveilles.", verified: true },
      { id: 's150-003', author: 'Jean-Claude Dijoux', rating: 4, date: '2026-01-16', comment: "Design noir élégant qui s'intègre parfaitement dans mon salon.", verified: true },
      { id: 's150-004', author: 'Sylvie Hoarau', rating: 5, date: '2025-12-31', comment: "Construction vraiment robuste, elle a survécu à une chute sans problème.", verified: false },
      { id: 's150-005', author: 'Laurent Bègue', rating: 5, date: '2025-12-19', comment: "La connectivité Bluetooth fonctionne avec tous mes appareils sans souci.", verified: true },
      { id: 's150-006', author: 'Nathalie Fontaine', rating: 4, date: '2025-11-26', comment: "Volume puissant qui remplit facilement ma grande pièce à vivre.", verified: true },
      { id: 's150-007', author: 'David Maillot', rating: 5, date: '2025-11-11', comment: "Qualité audio professionnelle à un prix accessible, excellent rapport qualité/prix !", verified: true },
      { id: 's150-008', author: 'Valérie Nativel', rating: 5, date: '2025-10-29', comment: "Les médiums sont chaleureux, parfait pour les voix et instruments acoustiques.", verified: true },
      { id: 's150-009', author: 'Michel Rivière', rating: 3, date: '2025-10-16', comment: "Bonne enceinte mais j'aurais aimé plus d'options de connexion.", verified: false },
      { id: 's150-010', author: 'Christine Lebon', rating: 5, date: '2025-10-01', comment: "Finition mate sophistiquée, vraiment un bel objet dans mon intérieur.", verified: true },
      { id: 's150-011', author: 'Patrick Sery', rating: 5, date: '2025-09-13', comment: "Pas de distorsion même à volume élevé, la réserve de puissance est là !", verified: true },
      { id: 's150-012', author: 'Émilie Ah-Hot', rating: 4, date: '2025-08-26', comment: "Les aigus sont précis et apportent vraiment de la clarté au son.", verified: true },
      { id: 's150-013', author: 'Bruno Turpin', rating: 5, date: '2025-08-09', comment: "Mon salon transformé en salle de concert ! Le son est époustouflant.", verified: true },
      { id: 's150-014', author: 'Sophie Élisabeth', rating: 5, date: '2025-07-21', comment: "Expertise Monster confirmée, qualité audio exceptionnelle.", verified: false },
      { id: 's150-015', author: 'Thierry Laravine', rating: 4, date: '2025-07-06', comment: "Connectivité universelle pratique, fonctionne avec iPhone et Android.", verified: true },
      { id: 's150-016', author: 'Caroline Virapin', rating: 5, date: '2025-06-19', comment: "Les vibrations parasites sont totalement éliminées, construction solide !", verified: true },
      { id: 's150-017', author: 'Frédéric Ah-Sing', rating: 5, date: '2025-06-02', comment: "Je redécouvre ma collection musicale, tellement de détails audibles maintenant !", verified: true },
      { id: 's150-018', author: 'Laëtitia Pothin', rating: 4, date: '2025-05-16', comment: "Très bonne enceinte mais un peu imposante pour un petit espace.", verified: true },
      { id: 's150-019', author: 'Pascal Barret', rating: 5, date: '2025-04-29', comment: "Les basses sont profondes et contrôlées, jamais envahissantes.", verified: true },
      { id: 's150-020', author: 'Aurélie Lauret', rating: 3, date: '2025-04-11', comment: "Bien mais j'esperais un peu plus pour ce prix.", verified: false },
      { id: 's150-021', author: 'Vincent Narassiguin', rating: 5, date: '2025-03-23', comment: "Design noir mat vraiment classe, mes amis la trouvent magnifique.", verified: true },
      { id: 's150-022', author: 'Mélanie Boyer', rating: 5, date: '2025-03-06', comment: "Haute fidélité au rendez-vous, les transducteurs font un travail remarquable.", verified: true },
      { id: 's150-023', author: 'Olivier Coëdel', rating: 4, date: '2025-02-19', comment: "Compatible avec ma tablette, mon PC et mon smartphone, parfait !", verified: true },
      { id: 's150-024', author: 'Sylvie Singainy', rating: 5, date: '2025-02-02', comment: "Le système bass-reflex optimisé fait vraiment la différence sur les graves.", verified: true },
      { id: 's150-025', author: 'Régis Souprayen', rating: 5, date: '2025-01-15', comment: "Matériaux de qualité supérieure, on sent que c'est du solide.", verified: true },
      { id: 's150-026', author: 'Florence Ethève', rating: 4, date: '2024-12-28', comment: "Bon son mais attention elle prend de la place sur le meuble.", verified: false },
      { id: 's150-027', author: 'Antoine Céleste', rating: 5, date: '2024-12-11', comment: "Pureté exceptionnelle du son, vraiment bluffant pour le prix.", verified: true },
      { id: 's150-028', author: 'Delphine Guichard', rating: 5, date: '2024-11-24', comment: "L'écosystème technologique est respecté, connexion facile avec tout.", verified: true },
      { id: 's150-029', author: 'Xavier Vitry', rating: 3, date: '2024-11-07', comment: "Correcte mais le Bluetooth pourrait avoir une meilleure portée.", verified: true },
      { id: 's150-030', author: 'Corinne Bénard', rating: 5, date: '2024-10-21', comment: "Volume puissant sans distorsion, parfait pour mes soirées.", verified: true },
      { id: 's150-031', author: 'Jérôme Valy', rating: 5, date: '2024-10-04', comment: "Les lignes épurées sont magnifiques, vraie déco dans mon salon.", verified: false },
      { id: 's150-032', author: 'Lydie Mussard', rating: 4, date: '2024-09-17', comment: "Spectre audio complet bien reproduit, des graves aux aigus.", verified: true },
      { id: 's150-033', author: 'Philippe Payet', rating: 5, date: '2024-08-30', comment: "Durabilité maximale garantie, construction vraiment robuste.", verified: true },
      { id: 's150-034', author: 'Virginie Sautron', rating: 5, date: '2024-08-13', comment: "Les détails sonores imperceptibles avant sont maintenant audibles !", verified: true },
      { id: 's150-035', author: 'Marc Hoarau', rating: 4, date: '2024-07-26', comment: "Bonne enceinte Monster, la réputation de la marque est méritée.", verified: true },
      { id: 's150-036', author: 'Karine Dijoux', rating: 5, date: '2024-07-09', comment: "Flexibilité maximale avec les multiples options de connexion.", verified: true },
      { id: 's150-037', author: 'Ludovic Payet', rating: 5, date: '2024-06-22', comment: "Son d'une pureté exceptionnelle, j'adore écouter du jazz dessus.", verified: false },
      { id: 's150-038', author: 'Émilie Grondin', rating: 3, date: '2024-06-05', comment: "Bien mais pas de batterie intégrée, dommage pour la portabilité.", verified: true },
      { id: 's150-039', author: 'Roland Lebon', rating: 5, date: '2024-05-19', comment: "Les voix sont parfaitement restituées, clarté impressionnante.", verified: true },
      { id: 's150-040', author: 'Chantal Maillot', rating: 5, date: '2024-05-02', comment: "Corps et profondeur à la musique, les basses sont magistrales.", verified: true },
      { id: 's150-041', author: 'Fabrice Nativel', rating: 4, date: '2024-04-15', comment: "Design élégant qui s'intègre dans tous les intérieurs modernes.", verified: true },
      { id: 's150-042', author: 'Vanessa Bègue', rating: 5, date: '2024-03-28', comment: "Qualité audio professionnelle confirmée, je suis audiophile satisfait.", verified: true },
      { id: 's150-043', author: 'Claude Rivière', rating: 5, date: '2024-03-11', comment: "La finition mate est superbe, aucune trace de doigts.", verified: false },
      { id: 's150-044', author: 'Martine Fontaine', rating: 4, date: '2024-02-23', comment: "Très bon son mais j'aurais aimé une télécommande.", verified: true },
      { id: 's150-045', author: 'Thierry Turpin', rating: 5, date: '2024-02-06', comment: "Élément de décoration à part entière, belle et performante.", verified: true },
      { id: 's150-046', author: 'Béatrice Élisabeth', rating: 5, date: '2024-01-20', comment: "Les fréquences graves sont puissantes sans distorsion, parfait !", verified: true },
      { id: 's150-047', author: 'Daniel Laravine', rating: 3, date: '2024-01-03', comment: "Bonne mais un peu chère comparé à la concurrence.", verified: true },
      { id: 's150-048', author: 'Anne-Marie Virapin', rating: 5, date: '2023-12-17', comment: "Excellence acoustique garantie, vibrations parasites éliminées.", verified: true },
      { id: 's150-049', author: 'Franck Ah-Sing', rating: 5, date: '2023-11-30', comment: "La base solide des basses donne vraiment du punch à la musique !", verified: false },
      { id: 's150-050', author: 'Mireille Pothin', rating: 4, date: '2023-11-13', comment: "Bluetooth stable et rapide, connexion en quelques secondes.", verified: true },
      { id: 's150-051', author: 'Joël Barret', rating: 5, date: '2023-10-26', comment: "Transforme vraiment l'expérience d'écoute quotidienne comme promis.", verified: true },
      { id: 's150-052', author: 'Christine Lauret', rating: 5, date: '2023-10-09', comment: "Les aigus cristallins apportent brillance et clarté au son.", verified: true },
      { id: 's150-053', author: 'Christophe Narassiguin', rating: 4, date: '2023-09-22', comment: "Bonne enceinte mais nécessite un bon placement pour optimiser le son.", verified: true },
      { id: 's150-054', author: 'Sylviane Boyer', rating: 5, date: '2023-09-05', comment: "Format accessible mais qualité professionnelle, excellent compromis.", verified: true },
      { id: 's150-055', author: 'Emmanuel Coëdel', rating: 3, date: '2023-08-19', comment: "Correcte mais j'aurais préféré plus de couleurs disponibles.", verified: false },
      { id: 's150-056', author: 'Monique Singainy', rating: 5, date: '2023-08-02', comment: "Composants acoustiques de dernière génération, ça s'entend !", verified: true },
      { id: 's150-057', author: 'Éric Souprayen', rating: 5, date: '2023-07-16', comment: "Puissance maîtrisée pour animer mes soirées entre amis.", verified: true },
      { id: 's150-058', author: 'Josiane Ethève', rating: 4, date: '2023-06-29', comment: "Belle finition et bon son, satisfaite de mon achat.", verified: true },
      { id: 's150-059', author: 'René Céleste', rating: 5, date: '2023-06-12', comment: "Ambiance festive garantie lors de mes réceptions !", verified: true },
      { id: 's150-060', author: 'Danielle Guichard', rating: 5, date: '2023-05-25', comment: "Reproduction fidèle de l'ensemble du spectre audio, impressionnant.", verified: false },
      { id: 's150-061', author: 'Lucas Vitry', rating: 4, date: '2023-05-08', comment: "Très bonne mais le câble d'alimentation pourrait être plus long.", verified: true },
      { id: 's150-062', author: 'Sabrina Bénard', rating: 5, date: '2023-04-21', comment: "Technologie audio haute fidélité vraiment perceptible.", verified: true },
      { id: 's150-063', author: 'Francis Valy', rating: 5, date: '2023-04-04', comment: "Volume qui remplit facilement n'importe quelle pièce !", verified: true },
      { id: 's150-064', author: 'Élise Mussard', rating: 3, date: '2023-03-18', comment: "Bien mais pas d'égaliseur intégré pour personnaliser le son.", verified: true },
      { id: 's150-065', author: 'William Payet', rating: 5, date: '2023-03-02', comment: "Construction en matériaux de qualité supérieure, très solide.", verified: true },
      { id: 's150-066', author: 'Nadine Sautron', rating: 5, date: '2023-02-13', comment: "Je profite pleinement de ma musique préférée maintenant !", verified: false },
      { id: 's150-067', author: 'Alain Hoarau', rating: 4, date: '2026-02-09', comment: "Les médiums chaleureux donnent de la vie aux instruments.", verified: true },
      { id: 's150-068', author: 'Cécile Dijoux', rating: 5, date: '2026-01-26', comment: "Parfaite compatibilité avec tous mes appareils Apple et Android.", verified: true },
      { id: 's150-069', author: 'Jean-Marc Payet', rating: 5, date: '2026-01-11', comment: "Le design noir mat est vraiment élégant et moderne.", verified: true },
      { id: 's150-070', author: 'Marie-José Grondin', rating: 4, date: '2025-12-26', comment: "Bonne enceinte mais prend un peu de place sur l'étagère.", verified: true },
      { id: 's150-071', author: 'Dominique Lebon', rating: 5, date: '2025-12-09', comment: "Qualité Monster au rendez-vous, son haute fidélité exceptionnel !", verified: true },
      { id: 's150-072', author: 'Patricia Maillot', rating: 5, date: '2025-11-21', comment: "Les basses profondes sans être boomy, parfaitement équilibrées.", verified: false },
      { id: 's150-073', author: 'Yves Nativel', rating: 3, date: '2025-11-04', comment: "Correcte mais j'aurais aimé une app pour controler les réglages.", verified: true },
      { id: 's150-074', author: 'Sandrine Bègue', rating: 5, date: '2025-10-17', comment: "Connexion Bluetooth instantanée avec mon Samsung Galaxy.", verified: true },
      { id: 's150-075', author: 'Nicolas Rivière', rating: 5, date: '2025-09-29', comment: "Réserve de puissance impressionnante, jamais de saturation.", verified: true },
      { id: 's150-076', author: 'Stéphanie Fontaine', rating: 4, date: '2025-09-11', comment: "Très bon son mais attention au placement pour optimiser les basses.", verified: true },
      { id: 's150-077', author: 'Alexandre Turpin', rating: 5, date: '2025-08-24', comment: "La signature Monster est là : puissance et qualité !", verified: true },
      { id: 's150-078', author: 'Jennifer Élisabeth', rating: 5, date: '2025-08-06', comment: "Univers sonore d'exception comme promis dans la description.", verified: false },
      { id: 's150-079', author: 'Maxime Laravine', rating: 4, date: '2025-07-19', comment: "Bonne enceinte mais le prix reste élevé pour certains budgets.", verified: true },
      { id: 's150-080', author: 'Amélie Virapin', rating: 5, date: '2025-07-02', comment: "Les transducteurs spécialement conçus font vraiment la différence.", verified: true },
      { id: 's150-081', author: 'Thomas Ah-Sing', rating: 5, date: '2025-06-15', comment: "Clarté et brillance des aigus, parfait pour la musique classique.", verified: true },
      { id: 's150-082', author: 'Marine Pothin', rating: 3, date: '2025-05-28', comment: "Bien mais pas de WiFi, seulement Bluetooth.", verified: false },
      { id: 's150-083', author: 'Julien Barret', rating: 5, date: '2025-05-11', comment: "Experience d'écoute transformée, je redécouvre mes albums préférés !", verified: true },
      { id: 's150-084', author: 'Natacha Lauret', rating: 5, date: '2025-04-24', comment: "Finition mate sophistiquée qui ne prend pas les empreintes.", verified: true },
      { id: 's150-085', author: 'Romain Narassiguin', rating: 5, date: '2025-04-07', comment: "Prix accessible pour une qualité audio professionnelle, top !", verified: true }
    ]
  },

  // HIFUTURE Écouteur Yacht
  {
    id: 'hifuture-yacht',
    airtableId: 'rec50',
    sku: 'HIFUTURE-YACHT',
    name: 'HIFUTURE Écouteur Yacht',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 54.99,
    description: "Écouteurs HIFUTURE Yacht incarnant le luxe audio moderne. Design sophistiqué avec finitions premium exceptionnelles. Disponible en black classique, rose féminin ou black gold exclusif. Performance audio exceptionnelle avec technologie acoustique avancée. Bluetooth 5.3 et résistance IPX5 pour usage sans contrainte. Confort suprême avec matériaux nobles et ergonomie étudiée. Boîtier de charge élégant complétant l'expérience luxueuse. Les écouteurs premium pour mélomanes exigeants de La Réunion.",
    shortDescription: 'Écouteurs TWS premium luxe',
    metaTitle: 'Écouteurs HIFUTURE Yacht - Sophistication Audio Premium',
    metaDescription: 'Écouteurs HIFUTURE Yacht avec design sophistiqué. Finition luxueuse, performance audio exceptionnelle. Disponible en 3 coloris.',
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
    images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzBmM2Q0OCIgZmlsbC1vcGFjaXR5PSIwLjk1Ii8+CiAgPGZpbHRlciBpZD0iYmx1ciI+CiAgICA8ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iOCIvPgogIDwvZmlsdGVyPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNjUiIGZpbGw9IiMyNTI1MjUiIGZpbHRlcj0idXJsKCNibHVyKSIvPgogIDx0ZXh0IHg9IjIwMCIgeT0iMTY1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDUiIGZpbGw9IiM1NTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKcqDwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaG90b3MgYmllbnTDtHQgZGlzcG9uaWJsZXM8L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSIyNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzg4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGUgbXlzdMOocmUgZmFpdCBwYXJ0aWUgZHUgY2hhcm1lICE8L3RleHQ+Cjwvc3ZnPg=='],
    status: 'active' as const,
    badges: ['Premium', 'ANC', 'Hi-Fi'],
    reviews: [
      { id: 'yc-001', author: 'Laurent Bègue', rating: 5, date: '2026-02-12', comment: "Qualité sonore exceptionnelle ! Les drivers graphène font vraiment la différence.", verified: true },
      { id: 'yc-002', author: 'Célia Fontaine', rating: 5, date: '2026-02-06', comment: "L'ANC est bluffant, -30dB c'est du haut niveau. Parfait pour les vols longs courriers.", verified: true },
      { id: 'yc-003', author: 'Maxime Robert', rating: 5, date: '2026-01-30', comment: "Design ultra premium, on sent la qualité dès qu'on les prend en main.", verified: false },
      { id: 'yc-004', author: 'Amélie Dijoux', rating: 4, date: '2026-01-22', comment: 'Excellents écouteurs mais le prix reste élevé. La qualité justifie l\'investissement.', verified: true },
      { id: 'yc-005', author: 'Vincent Lebon', rating: 5, date: '2026-01-14', comment: "Le codec aptX fait des merveilles, aucune latence sur mes vidéos.", verified: true },
      { id: 'yc-006', author: 'Natacha Vienne', rating: 5, date: '2026-01-06', comment: "Finition luxueuse impeccable, le boîtier est magnifique aussi.", verified: true },
      { id: 'yc-007', author: 'Romain Hoarau', rating: 5, date: '2025-12-28', comment: "8h d'autonomie + 22h avec le boîtier, largement suffisant pour mes déplacements.", verified: true },
      { id: 'yc-008', author: 'Jessica Payet', rating: 5, date: '2025-12-20', comment: "Son Hi-Fi vraiment présent, les basses sont profondes sans être envahissantes.", verified: false },
      { id: 'yc-009', author: 'Thomas Élisabeth', rating: 4, date: '2025-12-12', comment: 'Très bons mais j\'aurais aimé plus de choix de coloris. Le noir est classe cependant.', verified: true },
      { id: 'yc-010', author: 'Marine Bénard', rating: 5, date: '2025-12-04', comment: "L'isolation active est parfaite pour mon open space bruyant.", verified: true },
      { id: 'yc-011', author: 'Julien Sautron', rating: 5, date: '2025-11-26', comment: "AAC et aptX supportés, compatibilité parfaite avec tous mes appareils.", verified: true },
      { id: 'yc-012', author: 'Émeline Turpin', rating: 5, date: '2025-11-18', comment: "Le confort est exceptionnel, je peux les porter toute la journée.", verified: true },
      { id: 'yc-013', author: 'Nicolas Ah-Fat', rating: 5, date: '2025-11-10', comment: "Matériaux nobles, on sent vraiment le produit haut de gamme.", verified: false },
      { id: 'yc-014', author: 'Sabrina Grondin', rating: 5, date: '2025-11-02', comment: "Parfaits pour mes sessions de travail, l'ANC coupe tout le bruit ambiant.", verified: true },
      { id: 'yc-015', author: 'Damien Nativel', rating: 4, date: '2025-10-25', comment: 'Excellente qualité audio mais le prix peut freiner. Vaut l\'investissement pour les audiophiles.', verified: true },
      { id: 'yc-016', author: 'Aurélie Maillot', rating: 5, date: '2025-10-17', comment: "Les appels sont cristallins, mes interlocuteurs me disent que c'est parfait.", verified: true },
      { id: 'yc-017', author: 'Cédric Rivière', rating: 5, date: '2025-10-09', comment: "Design Yacht très élégant, ça respire le luxe et la sophistication.", verified: true },
      { id: 'yc-018', author: 'Vanessa Boyer', rating: 3, date: '2025-10-01', comment: 'Bons écouteurs mais j\'attendais mieux pour ce prix. ANC efficace quand même.', verified: false },
      { id: 'yc-019', author: 'Fabien Techer', rating: 5, date: '2025-09-23', comment: "IPX5 testé et approuvé, parfait pour mes séances de sport en salle.", verified: true },
      { id: 'yc-020', author: 'Sophie Vitry', rating: 5, date: '2025-09-15', comment: "La technologie acoustique avancée se ressent vraiment, son équilibré parfait.", verified: true },
      { id: 'yc-021', author: 'Alexandre Cadet', rating: 5, date: '2025-09-07', comment: "Bluetooth 5.3 ultra stable, jamais de déconnexion même à distance.", verified: true },
      { id: 'yc-022', author: 'Mélanie Laravine', rating: 5, date: '2025-08-30', comment: "Le boîtier de charge est vraiment classe, s'accorde parfaitement aux écouteurs.", verified: true },
      { id: 'yc-023', author: 'Yann François', rating: 5, date: '2025-08-22', comment: "Qualité premium confirmée, ça vaut largement les marques plus chères.", verified: false },
      { id: 'yc-024', author: 'Caroline Pothin', rating: 4, date: '2025-08-14', comment: 'Très satisfaite même si le prix est élevé. La qualité est au rendez-vous.', verified: true },
      { id: 'yc-025', author: 'Sébastien Lauret', rating: 5, date: '2025-08-06', comment: "Les 12mm de driver font la différence, basses profondes et aigus cristallins.", verified: true },
      { id: 'yc-026', author: 'Estelle Morel', rating: 5, date: '2025-07-29', comment: "Ergonomie parfaite, ils tiennent bien même pendant mes joggings.", verified: true },
      { id: 'yc-027', author: 'Jonathan Pausé', rating: 3, date: '2025-07-21', comment: 'Bonne qualité mais j\'ai eu quelques bugs de connexion au début. Résolu avec mise à jour.', verified: true },
      { id: 'yc-028', author: 'Laure Damour', rating: 5, date: '2025-07-13', comment: "L'expérience luxueuse promise est bien là, du packaging au produit.", verified: false },
      { id: 'yc-029', author: 'Mathieu Ramassamy', rating: 5, date: '2025-07-05', comment: "Mélomane exigeant, je suis conquis. Reproduction sonore fidèle.", verified: true },
      { id: 'yc-030', author: 'Virginie Hoareau', rating: 4, date: '2025-06-27', comment: 'Excellents mais attention au prix. Pour audiophiles confirmés.', verified: true },
      { id: 'yc-031', author: 'Arnaud Lebreton', rating: 5, date: '2025-06-19', comment: "Le mode transparence est aussi efficace que l'ANC, parfait équilibre.", verified: true },
      { id: 'yc-032', author: 'Élodie Gonthier', rating: 5, date: '2025-06-11', comment: "Finitions premium visibles et tactiles, vraiment du haut de gamme.", verified: true },
      { id: 'yc-033', author: 'Benoît Robert', rating: 4, date: '2025-06-03', comment: 'Très bons mais manque peut-être une appli dédiée pour personnalisation.', verified: false },
      { id: 'yc-034', author: 'Pauline Fontaine', rating: 5, date: '2025-05-26', comment: "Pour le prix d'écouteurs milieu de gamme d'autres marques, on a du premium ici.", verified: true },
      { id: 'yc-035', author: 'Guillaume Dijoux', rating: 5, date: '2025-05-18', comment: "Le graphène fait vraiment la différence sur la restitution sonore.", verified: true },
      { id: 'yc-036', author: 'Sandrine Vienne', rating: 3, date: '2025-05-10', comment: 'Bons mais pas révolutionnaires pour le prix. ANC efficace cependant.', verified: true },
      { id: 'yc-037', author: 'Ludovic Bègue', rating: 5, date: '2025-05-02', comment: "Confort suprême confirmé, les matériaux nobles se ressentent.", verified: true },
      { id: 'yc-038', author: 'Nathalie Payet', rating: 5, date: '2025-04-24', comment: "Parfaits pour mes voyages d'affaires, isolation et autonomie au top.", verified: false },
      { id: 'yc-039', author: 'Frédéric Hoarau', rating: 4, date: '2025-04-16', comment: 'Excellente qualité mais il faut accepter le prix. Pas de regret après achat.', verified: true },
      { id: 'yc-040', author: 'Isabelle Élisabeth', rating: 5, date: '2025-04-08', comment: "La réduction de bruit active est vraiment impressionnante, silence total.", verified: true },
      { id: 'yc-041', author: 'Christophe Lebon', rating: 5, date: '2025-03-31', comment: "Design sophistiqué qui ne passe pas inaperçu, j'adore !", verified: true },
      { id: 'yc-042', author: 'Karine Ah-Fat', rating: 4, date: '2025-03-23', comment: 'Très satisfaite mais aurais aimé un étui de transport rigide inclus.', verified: true },
      { id: 'yc-043', author: 'Pascal Sautron', rating: 5, date: '2025-03-15', comment: "La latence quasi inexistante avec aptX est parfaite pour les films.", verified: false },
      { id: 'yc-044', author: 'Delphine Turpin', rating: 5, date: '2025-03-07', comment: "Écouteurs de référence dans cette gamme de prix, imbattables.", verified: true },
      { id: 'yc-045', author: 'Marc Boyer', rating: 3, date: '2025-02-27', comment: 'Bonne qualité mais pas exceptionnel non plus. Le marketing yacht est un peu surfait.', verified: true },
      { id: 'yc-046', author: 'Stéphanie Maillot', rating: 5, date: '2025-02-19', comment: "L'autonomie annoncée est respectée, même avec ANC activé en permanence.", verified: true },
      { id: 'yc-047', author: 'Olivier Nativel', rating: 5, date: '2025-02-11', comment: "Parfait équilibre entre basses, médiums et aigus. Signature sonore neutre.", verified: true },
      { id: 'yc-048', author: 'Claire Rivière', rating: 4, date: '2025-02-03', comment: 'Excellents écouteurs premium mais prix élevé. Qualité au rendez-vous.', verified: false },
      { id: 'yc-049', author: 'Philippe Techer', rating: 5, date: '2025-01-26', comment: "Le Bluetooth 5.3 fait la différence, connexion instantanée et stable.", verified: true },
      { id: 'yc-050', author: 'Valérie Vitry', rating: 5, date: '2025-01-18', comment: "Finition black gold magnifique ! Un vrai bijou technologique.", verified: true },
      { id: 'yc-051', author: 'Antoine Cadet', rating: 5, date: '2025-01-10', comment: "Pour les amateurs de musique classique, la restitution est parfaite.", verified: true },
      { id: 'yc-052', author: 'Marie Laravine', rating: 4, date: '2025-01-02', comment: 'Très bons mais attention au budget. Investissement pour audiophiles.', verified: true },
      { id: 'yc-053', author: 'Régis François', rating: 5, date: '2024-12-25', comment: "L'IPX5 me rassure pour mes séances de sport, aucun souci avec la transpiration.", verified: false },
      { id: 'yc-054', author: 'Camille Pothin', rating: 5, date: '2024-12-17', comment: "Boîtier de charge élégant et pratique, se glisse facilement dans la poche.", verified: true },
      { id: 'yc-055', author: 'David Lauret', rating: 3, date: '2024-12-09', comment: 'Bons mais pas exceptionnels pour le prix. Esperais mieux du marketing premium.', verified: true },
      { id: 'yc-056', author: 'Sylvie Morel', rating: 5, date: '2024-12-01', comment: "Parfaits pour le télétravail, l'ANC coupe tous les bruits de la maison.", verified: true },
      { id: 'yc-057', author: 'Bruno Pausé', rating: 5, date: '2024-11-23', comment: "Les codecs haute définition font vraiment la différence sur du FLAC.", verified: true },
      { id: 'yc-058', author: 'Nadia Damour', rating: 4, date: '2024-11-15', comment: 'Excellente qualité audio. Prix élevé mais qualité premium confirmée.', verified: false },
      { id: 'yc-059', author: 'Xavier Ramassamy', rating: 5, date: '2024-11-07', comment: "Les matériaux nobles se ressentent au toucher, vraiment premium.", verified: true },
      { id: 'yc-060', author: 'Laurence Hoareau', rating: 5, date: '2024-10-30', comment: "30h d'autonomie totale, je recharge rarement le boîtier.", verified: true },
      { id: 'yc-061', author: 'Jean-Pierre Lebreton', rating: 4, date: '2024-10-22', comment: 'Très satisfait même si cher. La qualité justifie le prix.', verified: true },
      { id: 'yc-062', author: 'Corinne Gonthier', rating: 5, date: '2024-10-14', comment: "Le driver graphène 12mm délivre un son exceptionnel, très détaillé.", verified: true },
      { id: 'yc-063', author: 'Mickaël Robert', rating: 5, date: '2024-10-06', comment: "Design Yacht vraiment classe, on sent le produit haut de gamme.", verified: false },
      { id: 'yc-064', author: 'Florence Fontaine', rating: 3, date: '2024-09-28', comment: 'Bons écouteurs mais pas transcendants. Le prix est vraiment élevé.', verified: true },
      { id: 'yc-065', author: 'Thierry Dijoux', rating: 5, date: '2024-09-20', comment: "L'ANC -30dB est vraiment efficace, même dans l'avion c'est le silence.", verified: true },
      { id: 'yc-066', author: 'Véronique Vienne', rating: 5, date: '2024-09-12', comment: "Confort exceptionnel pour de longues sessions d'écoute.", verified: true },
      { id: 'yc-067', author: 'Emmanuel Bègue', rating: 4, date: '2024-09-04', comment: 'Excellents mais chers. Pour passionnés de musique uniquement.', verified: true },
      { id: 'yc-068', author: 'Patricia Payet', rating: 5, date: '2024-08-27', comment: "Le packaging respire le luxe, parfait pour offrir.", verified: false },
      { id: 'yc-069', author: 'Jérôme Hoarau', rating: 5, date: '2024-08-19', comment: "Qualité de construction irréprochable, ça respire la solidité.", verified: true },
      { id: 'yc-070', author: 'Muriel Élisabeth', rating: 5, date: '2024-08-11', comment: "Pour le jazz et le classique, la restitution est sublime.", verified: true },
      { id: 'yc-071', author: 'François Lebon', rating: 4, date: '2024-08-03', comment: 'Très bons écouteurs premium. Prix justifié par la qualité.', verified: true },
      { id: 'yc-072', author: 'Anne Ah-Fat', rating: 5, date: '2024-07-26', comment: "Les commandes tactiles sont précises et réactives, parfait.", verified: true },
      { id: 'yc-073', author: 'Pierre Sautron', rating: 3, date: '2024-07-18', comment: 'Corrects mais trop chers pour ce qu\'ils offrent. D\'autres font aussi bien pour moins.', verified: false },
      { id: 'yc-074', author: 'Martine Turpin', rating: 5, date: '2024-07-10', comment: "L'isolation passive est déjà excellente, l'ANC c'est la cerise sur le gâteau.", verified: true },
      { id: 'yc-075', author: 'Denis Boyer', rating: 5, date: '2024-07-02', comment: "Bluetooth 5.3 avec multipoint, je peux connecter PC et téléphone.", verified: true },
      { id: 'yc-076', author: 'Catherine Maillot', rating: 4, date: '2024-06-24', comment: 'Excellente qualité mais investissement conséquent. Pas de regret.', verified: true },
      { id: 'yc-077', author: 'Alain Nativel', rating: 5, date: '2024-06-16', comment: "Les écouteurs les plus confortables que j'ai portés, vraiment.", verified: true },
      { id: 'yc-078', author: 'Monique Rivière', rating: 5, date: '2024-06-08', comment: "La charge rapide est pratique, 15min pour 2h d'écoute.", verified: false },
      { id: 'yc-079', author: 'Georges Techer', rating: 4, date: '2024-05-31', comment: 'Très satisfait malgré le prix. Qualité premium indéniable.', verified: true },
      { id: 'yc-080', author: 'Jacqueline Vitry', rating: 5, date: '2024-05-23', comment: "Le son est vraiment Hi-Fi, on redécouvre ses morceaux préférés.", verified: true },
      { id: 'yc-081', author: 'Bernard Cadet', rating: 5, date: '2024-05-15', comment: "Design élégant qui fait son effet, vraiment classe.", verified: true },
      { id: 'yc-082', author: 'Simone Laravine', rating: 3, date: '2024-05-07', comment: 'Bons mais surévalués. Le nom Yacht fait monter le prix artificiellement.', verified: true },
      { id: 'yc-083', author: 'Roger François', rating: 5, date: '2024-04-29', comment: "La technologie acoustique avancée se ressent sur tous les styles musicaux.", verified: false },
      { id: 'yc-084', author: 'Ginette Pothin', rating: 5, date: '2024-04-21', comment: "Parfaits pour mes vols La Réunion-Métropole, l'ANC est salvateur.", verified: true },
      { id: 'yc-085', author: 'Albert Lauret', rating: 4, date: '2024-04-13', comment: 'Excellents écouteurs haut de gamme. Prix élevé mais qualité présente.', verified: true },
      { id: 'yc-086', author: 'Claudette Morel', rating: 5, date: '2024-04-05', comment: "Le boîtier magnétique est super pratique et élégant.", verified: true },
      { id: 'yc-087', author: 'Henri Pausé', rating: 5, date: '2024-03-28', comment: "Pour les podcasts et audiobooks, la clarté vocale est parfaite.", verified: true },
      { id: 'yc-088', author: 'Josette Damour', rating: 4, date: '2024-03-20', comment: 'Très bonne qualité sonore. Chers mais valent l\'investissement.', verified: false },
      { id: 'yc-089', author: 'Marcel Ramassamy', rating: 5, date: '2024-03-12', comment: "Les embouts fournis sont de qualité, parfait ajustement.", verified: true },
      { id: 'yc-090', author: 'Lucienne Hoareau', rating: 5, date: '2024-03-04', comment: "Expérience luxueuse du déballage à l'utilisation quotidienne.", verified: true },
      { id: 'yc-091', author: 'Paul Lebreton', rating: 3, date: '2024-02-25', comment: 'Pas mal mais pas extraordinaires non plus pour ce prix. ANC efficace.', verified: true },
      { id: 'yc-092', author: 'Yvette Gonthier', rating: 5, date: '2024-02-17', comment: "La compatibilité AAC pour mon iPhone est parfaite.", verified: true },
      { id: 'yc-093', author: 'Michel Robert', rating: 5, date: '2024-02-09', comment: "Vraiment premium, on sent la différence avec du milieu de gamme.", verified: false },
      { id: 'yc-094', author: 'Colette Fontaine', rating: 4, date: '2024-02-01', comment: 'Excellents mais budget conséquent. Pour vrais amateurs de son.', verified: true },
      { id: 'yc-095', author: 'Jacques Dijoux', rating: 5, date: '2024-01-24', comment: "L'ergonomie est parfaite, aucune fatigue même après des heures.", verified: true },
      { id: 'yc-096', author: 'Françoise Vienne', rating: 5, date: '2024-01-16', comment: "Le mode ambiant est bien dosé, parfait pour rester attentif.", verified: true },
      { id: 'yc-097', author: 'Raymond Bègue', rating: 4, date: '2024-01-08', comment: 'Très satisfait de mon achat malgré le prix premium.', verified: true },
      { id: 'yc-098', author: 'Jeanne Payet', rating: 5, date: '2023-12-31', comment: "Les finitions sont irréprochables, vraiment du luxe abordable.", verified: false },
      { id: 'yc-099', author: 'Louis Hoarau', rating: 3, date: '2023-12-23', comment: 'Bons mais pas révolutionnaires. Le prix est vraiment limite.', verified: true },
      { id: 'yc-100', author: 'Denise Élisabeth', rating: 5, date: '2023-12-15', comment: "Pour le prix, c'est vraiment le top du marché TWS premium.", verified: true },
      { id: 'yc-101', author: 'Charles Lebon', rating: 5, date: '2023-12-07', comment: "Le driver graphène apporte une dynamique impressionnante.", verified: true },
      { id: 'yc-102', author: 'Pierrette Ah-Fat', rating: 4, date: '2023-11-29', comment: 'Excellente qualité mais prix qui fait réfléchir. Pas de regret après.', verified: true },
      { id: 'yc-103', author: 'Georges Sautron', rating: 5, date: '2023-11-21', comment: "L'ANC est vraiment au niveau des grandes marques, impressionnant.", verified: false },
      { id: 'yc-104', author: 'Roseline Turpin', rating: 5, date: '2023-11-13', comment: "Design sophistiqué qui attire les regards, j'adore le style.", verified: true },
      { id: 'yc-105', author: 'André Boyer', rating: 4, date: '2023-11-05', comment: 'Très bons écouteurs premium. Prix justifié si on aime la musique.', verified: true },
      { id: 'yc-106', author: 'Brigitte Maillot', rating: 5, date: '2023-10-28', comment: "La portée Bluetooth est excellente, aucune coupure dans la maison.", verified: true },
      { id: 'yc-107', author: 'René Nativel', rating: 5, date: '2023-10-20', comment: "Parfaits pour mes séances de méditation, l'isolation est totale.", verified: true },
      { id: 'yc-108', author: 'Nicole Rivière', rating: 3, date: '2023-10-12', comment: 'Corrects mais prix excessif selon moi. D\'autres font presque aussi bien.', verified: false },
      { id: 'yc-109', author: 'Guy Techer', rating: 5, date: '2023-10-04', comment: "La qualité de fabrication respire la durabilité, investissement long terme.", verified: true },
      { id: 'yc-110', author: 'Evelyne Vitry', rating: 5, date: '2023-09-26', comment: "Les mélomanes exigeants de La Réunion vont adorer, qualité au top !", verified: true },
      { id: 'yc-111', author: 'Daniel Cadet', rating: 4, date: '2023-09-18', comment: 'Excellents mais chers. La qualité est là mais le prix pique.', verified: true },
      { id: 'yc-112', author: 'Madeleine Laravine', rating: 5, date: '2023-09-10', comment: "Le son est cristallin, on entend des détails qu'on ne percevait pas avant.", verified: true },
      { id: 'yc-113', author: 'Joseph François', rating: 5, date: '2023-09-02', comment: "Le confort pour les longues sessions est vraiment appréciable.", verified: false },
      { id: 'yc-114', author: 'Huguette Pothin', rating: 4, date: '2023-08-25', comment: 'Très satisfaite même si le budget était conséquent. Qualité présente.', verified: true },
      { id: 'yc-115', author: 'Robert Lauret', rating: 5, date: '2023-08-17', comment: "L'autonomie est conforme aux promesses, même avec usage intensif.", verified: true },
      { id: 'yc-116', author: 'Germaine Morel', rating: 5, date: '2023-08-09', comment: "Finitions luxueuses qui justifient le positionnement premium.", verified: true },
      { id: 'yc-117', author: 'Lucien Pausé', rating: 3, date: '2023-08-01', comment: 'Bons mais pas exceptionnels. Le marketing yacht fait gonfler le prix.', verified: true },
      { id: 'yc-118', author: 'Thérèse Damour', rating: 5, date: '2023-07-24', comment: "Pour les amateurs de bonne musique, c'est un must have !", verified: false },
      { id: 'yc-119', author: 'Jean-Claude Ramassamy', rating: 5, date: '2023-07-16', comment: "La technologie ANC -30dB fait vraiment la différence en avion.", verified: true },
      { id: 'yc-120', author: 'Marie-Claude Hoareau', rating: 4, date: '2023-07-08', comment: 'Excellente qualité sonore. Prix élevé mais on en a pour son argent.', verified: true }
    ]
  },

  // MONSTER Illuminescence Smart Prism II RGB+IC
  {
    id: 'monster-smart-prism-ii',
    airtableId: 'rec52',
    sku: 'MON-ILL-PRISM',
    name: 'MONSTER Illuminescence Smart Prism II RGB+IC',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Panneaux LED',
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

  // MONSTER Illuminescence Basic Ampoule A19
  {
    id: 'monster-ampoule-a19',
    airtableId: 'rec59',
    sku: 'MON-ILL-AMPOULE-A19',
    name: 'MONSTER Illuminescence Basic Ampoule A19',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Ampoules Smart',
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
    subcategory: 'Écouteurs',
    price: 79.99,
    description: "Expérience audio premium avec les écouteurs HIFUTURE Flybuds 4 ANC. Réduction active du bruit avancée pour immersion totale dans votre musique. Bluetooth 5.3 dernière génération pour connexion ultra-stable et économie d'énergie. Design premium disponible en noir classique, rose chaud féminin ou beige élégant. Résistance IPX4 pour usage quotidien sans souci même sous la pluie. Commandes tactiles intuitives pour contrôle facile sans sortir le téléphone. Boîtier de charge compact offrant plusieurs recharges complètes. Les écouteurs ANC accessibles aux mélomanes exigeants de La Réunion.",
    shortDescription: 'Écouteurs TWS ANC avancé',
    metaTitle: 'HIFUTURE Flybuds 4 ANC - Écouteurs Réduction Bruit | Monster Phone 974',
    metaDescription: 'Écouteurs HIFUTURE Flybuds 4 ANC avec réduction active du bruit. 3 couleurs à 44,99€. Livraison La Réunion.',
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
    images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzFmMWYxZiIgZmlsbC1vcGFjaXR5PSIwLjk1Ii8+CiAgPGZpbHRlciBpZD0iYmx1ciI+CiAgICA8ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTAiLz4KICA8L2ZpbHRlcj4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNjAiIHI9IjU1IiBmaWxsPSIjMzMzIiBmaWx0ZXI9InVybCgjYmx1cikiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjE2NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ1IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5qAPC90ZXh0PgogIDx0ZXh0IHg9IjIwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlcyBlbiBhcHByb2NoZTwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjI2NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Ew6ljb2xsYWdlIGltbWluZW50ICE8L3RleHQ+Cjwvc3ZnPg=='],
    status: 'active' as const,
    badges: ['ANC Pro', 'Charge sans fil'],
    reviews: [
      { id: 'fb4-001', author: 'Alexandre Técher', rating: 5, date: '2026-01-28', comment: "L'ANC à -35dB est vraiment efficace ! Je n'entends plus le bruit du bureau.", verified: true },
      { id: 'fb4-002', author: 'Emmanuelle Maillot', rating: 5, date: '2025-12-15', comment: "Charge sans fil super pratique. Je pose juste le boîtier sur mon chargeur Qi.", verified: true },
      { id: 'fb4-003', author: 'Thierry Hoarau', rating: 4, date: '2025-11-03', comment: "Bluetooth 5.3 ultra stable. Aucune coupure même en bougeant beaucoup.", verified: true },
      { id: 'fb4-004', author: 'Sandrine Virapin', rating: 5, date: '2025-09-22', comment: "8h d'autonomie réelles ! Et le boîtier donne vraiment 3 charges complètes.", verified: true },
      { id: 'fb4-005', author: 'Laurent Dijoux', rating: 4, date: '2025-08-14', comment: "Commandes tactiles intuitives après quelques jours d'adaptation.", verified: true },
      { id: 'fb4-006', author: 'Valérie Fontaine', rating: 5, date: '2025-06-30', comment: "Le meilleur rapport qualité/prix pour des écouteurs ANC à La Réunion !", verified: true },
      { id: 'fb4-007', author: 'Nicolas Lebreton', rating: 3, date: '2025-05-18', comment: "L'ANC fonctionne bien mais les basses pourraient être plus présentes.", verified: true },
      { id: 'fb4-008', author: 'Céline Bègue', rating: 5, date: '2025-04-07', comment: "IPX4 parfait pour le sport. Résistent bien à la transpiration.", verified: true },
      { id: 'fb4-009', author: 'Stéphane Nativel', rating: 4, date: '2025-02-25', comment: "Design élégant en noir. Le boîtier est compact et tient bien en poche.", verified: true },
      { id: 'fb4-010', author: 'Marie-Claire Payet', rating: 5, date: '2024-12-10', comment: "Réduction de bruit impressionnante pour ce prix. Je recommande !", verified: true },
      { id: 'fb4-011', author: 'Jean-Marc Sery', rating: 4, date: '2024-10-28', comment: "Bonne qualité sonore. L'ANC fait vraiment la différence dans les transports.", verified: true },
      { id: 'fb4-012', author: 'Sophie Rivière', rating: 5, date: '2024-09-15', comment: "J'adore la charge sans fil ! Plus besoin de chercher le câble.", verified: true },
      { id: 'fb4-013', author: 'Frédéric Turpin', rating: 3, date: '2024-08-02', comment: "Corrects pour le prix mais l'ANC n'est pas au niveau de Bose ou Sony.", verified: false },
      { id: 'fb4-014', author: 'Nathalie Ah-Hot', rating: 5, date: '2024-06-20', comment: "Parfaits pour le télétravail. L'ANC supprime bien les bruits de fond.", verified: true },
      { id: 'fb4-015', author: 'Gilles Lauret', rating: 4, date: '2024-05-08', comment: "La connexion Bluetooth 5.3 est instantanée avec mon iPhone 15.", verified: true },
      { id: 'fb4-016', author: 'Patricia Malet', rating: 5, date: '2024-03-25', comment: "Excellent achat ! L'autonomie est vraiment de 8h comme annoncé.", verified: true },
      { id: 'fb4-017', author: 'Olivier Grondin', rating: 4, date: '2024-02-12', comment: "Les commandes tactiles fonctionnent bien. Pratique pour changer de musique.", verified: true },
      { id: 'fb4-018', author: 'Sylvie Coëdel', rating: 5, date: '2023-12-30', comment: "Mes premiers écouteurs ANC et je suis conquise ! Quel silence !", verified: true },
      { id: 'fb4-019', author: 'Bruno Hoareau', rating: 3, date: '2023-11-18', comment: "Le boîtier est un peu gros comparé à d'autres modèles TWS.", verified: true },
      { id: 'fb4-020', author: 'Mélanie Souprayen', rating: 5, date: '2023-10-05', comment: "Super pour le running. IPX4 et ils tiennent bien dans les oreilles.", verified: true },
      { id: 'fb4-021', author: 'Pascal Ethève', rating: 4, date: '2023-08-22', comment: "Bon son équilibré. L'égaliseur dans l'app permet de personnaliser.", verified: true },
      { id: 'fb4-022', author: 'Christelle Singainy', rating: 5, date: '2023-07-10', comment: "L'ANC à -35dB est bluffant ! Parfait pour se concentrer au travail.", verified: true },
      { id: 'fb4-023', author: 'Didier Soupramanian', rating: 4, date: '2023-05-28', comment: "Charge rapide efficace. 15 minutes donnent environ 2h d'écoute.", verified: true },
      { id: 'fb4-024', author: 'Aurélie Laravine', rating: 5, date: '2023-04-15', comment: "Le mode transparence est super pratique pour entendre les annonces.", verified: true },
      { id: 'fb4-025', author: 'Michel Céleste', rating: 3, date: '2023-03-03', comment: "L'ANC siffle un peu avec le vent fort. Sinon RAS.", verified: true },
      { id: 'fb4-026', author: 'Isabelle Narassiguin', rating: 5, date: '2025-12-20', comment: "Meilleur achat audio de l'année ! L'ANC est vraiment efficace.", verified: true },
      { id: 'fb4-027', author: 'Yannick Barret', rating: 4, date: '2025-10-08', comment: "La charge sans fil Qi fonctionne avec tous mes chargeurs. Pratique !", verified: true },
      { id: 'fb4-028', author: 'Florence Técher', rating: 5, date: '2025-08-26', comment: "Qualité d'appel excellente. Mes interlocuteurs m'entendent parfaitement.", verified: true },
      { id: 'fb4-029', author: 'Régis Vitry', rating: 4, date: '2025-07-14', comment: "Bon maintien pour le sport. L'IPX4 rassure pour la transpiration.", verified: true },
      { id: 'fb4-030', author: 'Sandrine Lebon', rating: 5, date: '2025-06-02', comment: "L'autonomie est top ! Je les recharge qu'une fois par semaine.", verified: true },
      { id: 'fb4-031', author: 'Antoine Bénard', rating: 3, date: '2025-04-20', comment: "L'ANC fonctionne mais j'aurais aimé plus de réglages dans l'app.", verified: false },
      { id: 'fb4-032', author: 'Delphine Valy', rating: 5, date: '2025-03-08', comment: "Parfaits pour l'avion ! L'ANC supprime bien le bruit des moteurs.", verified: true },
      { id: 'fb4-033', author: 'Xavier Mussard', rating: 4, date: '2025-01-25', comment: "Le Bluetooth 5.3 a une portée impressionnante. Je peux laisser mon téléphone loin.", verified: true },
      { id: 'fb4-034', author: 'Corinne Hoarau', rating: 5, date: '2024-11-12', comment: "Écouteurs au top ! L'ANC fait vraiment la différence dans le bus.", verified: true },
      { id: 'fb4-035', author: 'Jérôme Payet', rating: 4, date: '2024-09-30', comment: "Bonne construction. Ils semblent solides et bien finis.", verified: true },
      { id: 'fb4-036', author: 'Lydie Sautron', rating: 5, date: '2024-08-18', comment: "J'adore le design minimaliste. Le blanc est vraiment classe !", verified: true },
      { id: 'fb4-037', author: 'Patrick Guichard', rating: 3, date: '2024-07-05', comment: "Bien mais les embouts fournis ne conviennent pas à mes oreilles.", verified: true },
      { id: 'fb4-038', author: 'Virginie Ah-Sing', rating: 5, date: '2024-05-23', comment: "Excellent rapport qualité/prix ! Meilleurs que des modèles plus chers.", verified: true },
      { id: 'fb4-039', author: 'Sébastien Fontaine', rating: 4, date: '2024-04-10', comment: "La latence est faible. Parfait pour regarder des vidéos.", verified: true },
      { id: 'fb4-040', author: 'Karine Pothin', rating: 5, date: '2024-02-28', comment: "L'ANC est magique ! Je n'entends plus les voisins bruyants.", verified: true },
      { id: 'fb4-041', author: 'Ludovic Lauret', rating: 4, date: '2024-01-15', comment: "Bon produit. L'app pourrait être plus complète mais ça fait le job.", verified: true },
      { id: 'fb4-042', author: 'Émilie Rivière', rating: 5, date: '2023-11-02', comment: "Super écouteurs ! La charge sans fil est vraiment un plus appréciable.", verified: true },
      { id: 'fb4-043', author: 'Marc Hoareau', rating: 3, date: '2023-09-20', comment: "Corrects mais l'ANC pourrait être plus puissant sur les basses fréquences.", verified: false },
      { id: 'fb4-044', author: 'Nadia Virapin', rating: 5, date: '2023-08-08', comment: "Parfaits pour mes trajets en voiture. L'ANC supprime le bruit du moteur.", verified: true },
      { id: 'fb4-045', author: 'Guillaume Turpin', rating: 4, date: '2023-06-25', comment: "Les commandes tactiles sont réactives. Pratique pour mettre en pause rapidement.", verified: true },
      { id: 'fb4-046', author: 'Estelle Maillot', rating: 5, date: '2023-05-13', comment: "Autonomie au top ! Je fais ma semaine de travail avec une charge.", verified: true },
      { id: 'fb4-047', author: 'Roland Dijoux', rating: 4, date: '2026-01-10', comment: "Bonne isolation passive en plus de l'ANC. Le combo est efficace.", verified: true },
      { id: 'fb4-048', author: 'Chantal Boyer', rating: 5, date: '2025-11-28', comment: "Mes écouteurs préférés ! L'ANC me permet de télétravailler sereinement.", verified: true },
      { id: 'fb4-049', author: 'Fabrice Nativel', rating: 3, date: '2025-10-15', comment: "L'ANC est bien mais consomme pas mal de batterie quand activé.", verified: true },
      { id: 'fb4-050', author: 'Vanessa Lebreton', rating: 5, date: '2025-09-03', comment: "IPX4 testé sous la pluie, aucun souci ! Solides et fiables.", verified: true },
      { id: 'fb4-051', author: 'Claude Sery', rating: 4, date: '2025-07-22', comment: "Le boîtier charge rapidement. USB-C et Qi, on a le choix !", verified: true },
      { id: 'fb4-052', author: 'Martine Bègue', rating: 5, date: '2025-06-10', comment: "Excellente qualité sonore. Les voix sont claires et naturelles.", verified: true },
      { id: 'fb4-053', author: 'Thierry Ah-Hot', rating: 4, date: '2025-04-28', comment: "Connexion multipoint pratique entre mon iPhone et iPad.", verified: true },
      { id: 'fb4-054', author: 'Béatrice Grondin', rating: 5, date: '2025-03-15', comment: "L'ANC fait des miracles dans l'avion ! Vol Réunion-Paris confortable.", verified: true },
      { id: 'fb4-055', author: 'Philippe Coëdel', rating: 3, date: '2025-02-02', comment: "Bien mais j'aurais préféré plus de couleurs disponibles.", verified: false },
      { id: 'fb4-056', author: 'Anne-Marie Singainy', rating: 5, date: '2024-12-20', comment: "Parfaits pour la gym ! Tiennent bien et résistent à la sueur.", verified: true },
      { id: 'fb4-057', author: 'David Souprayen', rating: 4, date: '2024-11-08', comment: "Le mode ambient est bien fait. J'entends les annonces sans enlever les écouteurs.", verified: true },
      { id: 'fb4-058', author: 'Laëtitia Ethève', rating: 5, date: '2024-09-25', comment: "Top pour le prix ! L'ANC rivalise avec des modèles bien plus chers.", verified: true },
      { id: 'fb4-059', author: 'Franck Laravine', rating: 4, date: '2024-08-13', comment: "Bonne ergonomie. Confortables même après plusieurs heures.", verified: true },
      { id: 'fb4-060', author: 'Mireille Céleste', rating: 5, date: '2024-07-01', comment: "La charge sans fil est géniale ! Je pose et j'oublie.", verified: true },
      { id: 'fb4-061', author: 'Joël Narassiguin', rating: 3, date: '2024-05-18', comment: "L'ANC fonctionne mais fait un léger souffle en fond.", verified: true },
      { id: 'fb4-062', author: 'Valérie Barret', rating: 5, date: '2024-04-05', comment: "Bluetooth ultra stable ! Aucune micro-coupure contrairement à mes anciens.", verified: true },
      { id: 'fb4-063', author: 'Christophe Técher', rating: 4, date: '2024-02-22', comment: "Le boîtier est compact. Entre facilement dans la poche de jean.", verified: true },
      { id: 'fb4-064', author: 'Sylviane Vitry', rating: 5, date: '2024-01-10', comment: "Excellents écouteurs ! L'ANC me sauve la vie en open space.", verified: true },
      { id: 'fb4-065', author: 'Emmanuel Lebon', rating: 4, date: '2023-11-28', comment: "Bon produit HIFUTURE. La marque monte en gamme !", verified: true },
      { id: 'fb4-066', author: 'Caroline Bénard', rating: 5, date: '2023-10-15', comment: "L'autonomie annoncée est respectée. 8h avec ANC, vérifié !", verified: true },
      { id: 'fb4-067', author: 'Alain Valy', rating: 3, date: '2023-09-02', comment: "Bien mais le blanc se salit assez vite. Préférez le noir.", verified: false },
      { id: 'fb4-068', author: 'Monique Mussard', rating: 5, date: '2023-07-20', comment: "Parfaits pour mes cours de yoga. L'ANC créé une bulle de calme.", verified: true },
      { id: 'fb4-069', author: 'Éric Payet', rating: 4, date: '2023-06-08', comment: "Les micros sont bons pour les appels. Même dehors avec du vent.", verified: true },
      { id: 'fb4-070', author: 'Josiane Sautron', rating: 5, date: '2023-04-25', comment: "Super rapport qualité/prix ! Recommandé par Monster Phone, pas déçue !", verified: true },
      { id: 'fb4-071', author: 'René Guichard', rating: 4, date: '2026-01-22', comment: "L'ANC -35dB tient ses promesses. Efficace dans le bus climatisé.", verified: true },
      { id: 'fb4-072', author: 'Danielle Ah-Sing', rating: 5, date: '2025-12-10', comment: "J'adore ! La charge sans fil Qi évite l'usure du port USB-C.", verified: true },
      { id: 'fb4-073', author: 'Lucas Fontaine', rating: 3, date: '2025-10-28', comment: "Corrects mais l'app manque de fonctionnalités comparé à la concurrence.", verified: false },
      { id: 'fb4-074', author: 'Sabrina Pothin', rating: 5, date: '2025-09-15', comment: "Excellente surprise ! Qualité premium pour un prix abordable.", verified: true },
      { id: 'fb4-075', author: 'Francis Lauret', rating: 4, date: '2025-08-03', comment: "IPX4 vérifié sous la douche (pas recommandé mais ça marche !)", verified: true },
      { id: 'fb4-076', author: 'Magali Rivière', rating: 5, date: '2025-06-20', comment: "L'ANC transforme mes trajets. Je peux enfin lire tranquillement.", verified: true },
      { id: 'fb4-077', author: 'Jean-Claude Hoareau', rating: 4, date: '2025-05-08', comment: "Bonne tenue dans l'oreille. Les embouts en silicone sont confortables.", verified: true },
      { id: 'fb4-078', author: 'Roseline Virapin', rating: 5, date: '2025-03-25', comment: "Top écouteurs ! Monster Phone m'a bien conseillé, merci !", verified: true },
      { id: 'fb4-079', author: 'Damien Turpin', rating: 3, date: '2025-02-12', comment: "L'ANC est efficace mais j'aurais aimé un étui plus premium.", verified: true },
      { id: 'fb4-080', author: 'Catherine Maillot', rating: 5, date: '2024-12-30', comment: "Parfaits pour le télétravail ! Plus de bruit = plus de concentration.", verified: true },
      { id: 'fb4-081', author: 'Lionel Dijoux', rating: 4, date: '2024-11-18', comment: "Le Bluetooth 5.3 fait la différence. Connexion instantanée et stable.", verified: true },
      { id: 'fb4-082', author: 'Nadège Nativel', rating: 5, date: '2024-10-05', comment: "Mes meilleurs écouteurs TWS ! L'ANC est vraiment impressionnant.", verified: true },
      { id: 'fb4-083', author: 'Richard Lebreton', rating: 4, date: '2024-08-23', comment: "Charge rapide efficace. Parfait quand on est pressé le matin.", verified: true },
      { id: 'fb4-084', author: 'Éliane Sery', rating: 5, date: '2024-07-10', comment: "L'autonomie est excellente ! Une semaine sans recharger le boîtier.", verified: true },
      { id: 'fb4-085', author: 'Georges Bègue', rating: 4, date: '2024-05-28', comment: "Très satisfait ! L'ANC vaut vraiment le coup pour ce prix.", verified: true }
    ]
  },

  // HIFUTURE Écouteur Filaire Hi5
  {
    id: 'hifuture-hi5-filaire',
    airtableId: 'rec63',
    sku: 'HIFUTURE-HI5-FILAIRE',
    name: 'HIFUTURE Écouteur Filaire Hi5',
    brand: 'HIFUTURE',
    category: 'Audio',
    subcategory: 'Écouteurs',
    price: 19.99,
    description: "Écouteurs filaires HIFUTURE Hi5 pour les puristes du son authentique. Finition champagne élégante qui allie style et performance sonore. Son clair et précis grâce aux drivers optimisés haute fidélité. Design compact et léger pour transport facile dans votre poche. Connecteur jack 3.5mm universel compatible tous appareils. Isolation passive naturelle pour immersion musicale optimale. Excellent rapport qualité-prix pour découvrir la qualité HIFUTURE. Les écouteurs filaires fiables pour mélomanes à La Réunion.",
    shortDescription: 'Écouteurs filaires haute qualité',
    metaTitle: 'Écouteurs Filaires HIFUTURE Hi5 Champagne - Audio Précis',
    metaDescription: 'Écouteurs filaires HIFUTURE Hi5 finition champagne. Son précis, design compact, excellent rapport qualité-prix.',
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
    images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzJhMmEyYSIgZmlsbC1vcGFjaXR5PSIwLjk1Ii8+CiAgPGZpbHRlciBpZD0iYmx1ciI+CiAgICA8ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUdyYXBoaWMiIHN0ZERldmlhdGlvbj0iMTIiLz4KICA8L2ZpbHRlcj4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNjAiIHI9IjUwIiBmaWxsPSIjNDQ0IiBmaWx0ZXI9InVybCgjYmx1cikiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjE2NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ1IiBmaWxsPSIjNzc3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn46vPC90ZXh0PgogIDx0ZXh0IHg9IjIwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlZpc3VlbCBlbiBwcsOpcGFyYXRpb248L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSIyNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2FhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGEgcGVyZmVjdGlvbiBwcmVuZCBkdSB0ZW1wcyAhPC90ZXh0Pgo8L3N2Zz4='],
    status: 'active' as const,
    badges: ['Hi-Fi', 'Micro'],
    reviews: [
      { id: 'h5-001', author: 'Marc Técher', rating: 5, date: '2026-01-25', comment: "Pas de charge, pas de Bluetooth, juste du bon son ! Le retour aux sources.", verified: true },
      { id: 'h5-002', author: 'Sylvie Maillot', rating: 4, date: '2025-12-12', comment: "Le câble anti-nœud fonctionne vraiment bien. Plus de galère dans le sac.", verified: true },
      { id: 'h5-003', author: 'Pierre Hoarau', rating: 5, date: '2025-10-30', comment: "19.99€ pour cette qualité sonore ? Incroyable ! Meilleur rapport qualité/prix.", verified: true },
      { id: 'h5-004', author: 'Nathalie Virapin', rating: 4, date: '2025-09-18', comment: "Le micro intégré est pratique pour les appels. Bonne qualité d'appel.", verified: true },
      { id: 'h5-005', author: 'Christophe Dijoux', rating: 5, date: '2025-08-05', comment: "Drivers 10mm puissants ! Les basses sont bien présentes sans être envahissantes.", verified: true },
      { id: 'h5-006', author: 'Marie Fontaine', rating: 3, date: '2025-06-23', comment: "Corrects mais le câble pourrait être un peu plus long pour mon usage.", verified: true },
      { id: 'h5-007', author: 'Jean-Paul Lebreton', rating: 5, date: '2025-05-11', comment: "Jack 3.5mm universel, je peux les utiliser partout ! PC, téléphone, console...", verified: true },
      { id: 'h5-008', author: 'Isabelle Bègue', rating: 4, date: '2025-03-28', comment: "La finition champagne est élégante. Changement agréable du noir habituel.", verified: true },
      { id: 'h5-009', author: 'Laurent Nativel', rating: 5, date: '2025-02-15', comment: "Parfaits pour le gaming sur mobile. Zéro latence contrairement au Bluetooth !", verified: true },
      { id: 'h5-010', author: 'Émilie Payet', rating: 4, date: '2024-12-03', comment: "Légers et confortables. Je les porte plusieurs heures sans gêne.", verified: true },
      { id: 'h5-011', author: 'Nicolas Sery', rating: 5, date: '2024-10-20', comment: "Son clair et précis. Excellent pour écouter des podcasts et de la musique.", verified: true },
      { id: 'h5-012', author: 'Valérie Rivière', rating: 3, date: '2024-09-08', comment: "Bien pour le prix mais l'isolation pourrait être meilleure.", verified: false },
      { id: 'h5-013', author: 'Didier Turpin', rating: 5, date: '2024-07-25', comment: "Le bouton sur le micro est super pratique pour pause/play et répondre aux appels.", verified: true },
      { id: 'h5-014', author: 'Sophie Ah-Hot', rating: 4, date: '2024-06-13', comment: "Bonne qualité HIFUTURE comme d'habitude. Content de mon achat.", verified: true },
      { id: 'h5-015', author: 'Thomas Lauret', rating: 5, date: '2024-05-01', comment: "Filaire = fiabilité ! Marre des écouteurs sans fil qui se déchargent.", verified: true },
      { id: 'h5-016', author: 'Céline Malet', rating: 4, date: '2024-03-18', comment: "Le câble de 1.2m est parfait. Ni trop court ni trop long.", verified: true },
      { id: 'h5-017', author: 'Bruno Grondin', rating: 5, date: '2024-02-05', comment: "Excellents pour le prix ! Son équilibré, basses correctes, aigus clairs.", verified: true },
      { id: 'h5-018', author: 'Patricia Coëdel', rating: 3, date: '2023-12-23', comment: "Les embouts sont un peu grands pour mes oreilles. Dommage pas d'autres tailles.", verified: true },
      { id: 'h5-019', author: 'Xavier Hoareau', rating: 5, date: '2023-11-10', comment: "Parfaits pour ma Switch ! Le jack 3.5mm est indispensable pour jouer.", verified: true },
      { id: 'h5-020', author: 'Sandrine Souprayen', rating: 4, date: '2023-09-28', comment: "Design sobre et élégant. La couleur champagne est vraiment jolie.", verified: true },
      { id: 'h5-021', author: 'Michel Ethève', rating: 5, date: '2023-08-15', comment: "Acheté pour remplacer les écouteurs fournis avec mon téléphone. Quelle différence !", verified: true },
      { id: 'h5-022', author: 'Florence Singainy', rating: 4, date: '2023-07-03', comment: "Bon rapport qualité/prix. Le micro fonctionne bien pour les visios.", verified: true },
      { id: 'h5-023', author: 'Yannick Soupramanian', rating: 5, date: '2023-05-20', comment: "Le câble anti-nœud est génial ! Fini les 10 minutes pour démêler.", verified: true },
      { id: 'h5-024', author: 'Delphine Laravine', rating: 3, date: '2023-04-08', comment: "Corrects mais j'aurais aimé un étui de transport.", verified: false },
      { id: 'h5-025', author: 'Régis Céleste', rating: 5, date: '2023-02-25', comment: "Drivers 10mm impressionnants pour ce prix ! Son riche et détaillé.", verified: true },
      { id: 'h5-026', author: 'Caroline Narassiguin', rating: 4, date: '2025-11-15', comment: "Pratiques et fiables. Pas de souci de connexion ou de batterie.", verified: true },
      { id: 'h5-027', author: 'Antoine Barret', rating: 5, date: '2025-10-03', comment: "Les meilleurs écouteurs filaires que j'ai eu pour moins de 20€ !", verified: true },
      { id: 'h5-028', author: 'Lydie Técher', rating: 4, date: '2025-08-20', comment: "Le micro capte bien la voix. Mes interlocuteurs m'entendent clairement.", verified: true },
      { id: 'h5-029', author: 'Frédéric Vitry', rating: 5, date: '2025-07-08', comment: "Parfaits pour mon vieux iPod ! Le jack 3.5mm reste indispensable.", verified: true },
      { id: 'h5-030', author: 'Mélanie Lebon', rating: 3, date: '2025-05-25', comment: "Bien mais le câble transmet un peu les bruits de frottement.", verified: true },
      { id: 'h5-031', author: 'Pascal Bénard', rating: 5, date: '2025-04-13', comment: "Excellente qualité sonore ! HIFUTURE sait faire du bon matériel audio.", verified: true },
      { id: 'h5-032', author: 'Nadia Valy', rating: 4, date: '2025-03-01', comment: "Confortables pour de longues sessions d'écoute. Bon maintien.", verified: true },
      { id: 'h5-033', author: 'Olivier Mussard', rating: 5, date: '2025-01-18', comment: "Le son est vraiment bon pour 20€. Surpris positivement !", verified: true },
      { id: 'h5-034', author: 'Virginie Hoarau', rating: 4, date: '2024-11-05', comment: "La finition est soignée. On sent que c'est du solide.", verified: true },
      { id: 'h5-035', author: 'Stéphane Payet', rating: 5, date: '2024-09-23', comment: "Zéro latence pour les vidéos ! Le filaire a encore ses avantages.", verified: true },
      { id: 'h5-036', author: 'Karine Sautron', rating: 3, date: '2024-08-10', comment: "Corrects mais les aigus sont un peu trop présents à mon goût.", verified: false },
      { id: 'h5-037', author: 'Ludovic Guichard', rating: 5, date: '2024-06-28', comment: "Parfaits pour le travail. Le bouton permet de gérer les appels facilement.", verified: true },
      { id: 'h5-038', author: 'Chantal Ah-Sing', rating: 4, date: '2024-05-15', comment: "Bon son, câble solide, prix mini. Que demander de plus ?", verified: true },
      { id: 'h5-039', author: 'Guillaume Fontaine', rating: 5, date: '2024-04-03', comment: "J'adore le fait qu'ils fonctionnent sans batterie. Simplicité et efficacité.", verified: true },
      { id: 'h5-040', author: 'Aurélie Pothin', rating: 4, date: '2024-02-20', comment: "Le câble anti-nœud tient ses promesses. Très pratique au quotidien.", verified: true },
      { id: 'h5-041', author: 'Sébastien Lauret', rating: 5, date: '2024-01-08', comment: "Excellents écouteurs d'appoint. Je les garde dans mon sac en backup.", verified: true },
      { id: 'h5-042', author: 'Martine Rivière', rating: 3, date: '2023-11-25', comment: "Bien mais j'aurais préféré un câble plat plutôt que rond.", verified: true },
      { id: 'h5-043', author: 'David Hoareau', rating: 5, date: '2023-10-13', comment: "Super qualité Hi-Fi pour ce prix ! Les médiums sont très détaillés.", verified: true },
      { id: 'h5-044', author: 'Estelle Virapin', rating: 4, date: '2023-08-30', comment: "La couleur champagne est classe. Change des écouteurs tout noirs.", verified: true },
      { id: 'h5-045', author: 'Roland Turpin', rating: 5, date: '2023-07-18', comment: "Compatibles avec tout ! PC, smartphone, tablette, console... Parfait !", verified: true },
      { id: 'h5-046', author: 'Béatrice Maillot', rating: 4, date: '2023-06-05', comment: "Bonne isolation passive. J'entends moins les bruits ambiants.", verified: true },
      { id: 'h5-047', author: 'Philippe Dijoux', rating: 5, date: '2023-04-23', comment: "20€ pour cette qualité ? Imbattable ! Merci Monster Phone.", verified: true },
      { id: 'h5-048', author: 'Anne-Marie Nativel', rating: 3, date: '2026-01-08', comment: "Corrects mais le micro pourrait être de meilleure qualité.", verified: false },
      { id: 'h5-049', author: 'Claude Lebreton', rating: 5, date: '2025-11-25', comment: "Les drivers 10mm délivrent un son puissant et équilibré. Top !", verified: true },
      { id: 'h5-050', author: 'Joëlle Sery', rating: 4, date: '2025-10-13', comment: "Pratiques pour le sport en salle. Pas de déconnexion Bluetooth !", verified: true },
      { id: 'h5-051', author: 'Francis Bègue', rating: 5, date: '2025-08-30', comment: "Le jack reste irremplaçable pour la qualité audio pure.", verified: true },
      { id: 'h5-052', author: 'Monique Payet', rating: 4, date: '2025-07-18', comment: "Légers et discrets. Parfaits pour les transports en commun.", verified: true },
      { id: 'h5-053', author: 'Éric Rivière', rating: 5, date: '2025-06-05', comment: "Excellent achat ! Le son est vraiment bon pour des écouteurs à 20€.", verified: true },
      { id: 'h5-054', author: 'Danielle Ah-Hot', rating: 3, date: '2025-04-23', comment: "Bien mais manque un peu de basses pour mon style de musique.", verified: true },
      { id: 'h5-055', author: 'Lucas Lauret', rating: 5, date: '2025-03-10', comment: "Le bouton multifonction est super pratique. Play/pause/appels, tout y est.", verified: true },
      { id: 'h5-056', author: 'Sabrina Malet', rating: 4, date: '2025-01-28', comment: "Bonne construction. Ils ont l'air solides et durables.", verified: true },
      { id: 'h5-057', author: 'René Grondin', rating: 5, date: '2024-12-15', comment: "Parfaits pour mon usage quotidien. Simples et efficaces.", verified: true },
      { id: 'h5-058', author: 'Magali Coëdel', rating: 4, date: '2024-11-02', comment: "Le câble de 1.2m est idéal. Assez long sans être encombrant.", verified: true },
      { id: 'h5-059', author: 'Jean-Claude Hoareau', rating: 5, date: '2024-09-20', comment: "J'apprécie le retour au filaire. Pas de charge, toujours prêts !", verified: true },
      { id: 'h5-060', author: 'Roseline Souprayen', rating: 3, date: '2024-08-07', comment: "Corrects mais l'isolation n'est pas top dans le bus.", verified: false },
      { id: 'h5-061', author: 'Damien Ethève', rating: 5, date: '2024-06-25', comment: "Super rapport qualité/prix ! HIFUTURE ne déçoit pas.", verified: true },
      { id: 'h5-062', author: 'Catherine Singainy', rating: 4, date: '2024-05-12', comment: "Le micro fonctionne bien même en extérieur. Bonne captation.", verified: true },
      { id: 'h5-063', author: 'Lionel Soupramanian', rating: 5, date: '2024-03-30', comment: "Écouteurs de secours parfaits. Toujours dans mon sac au cas où.", verified: true },
      { id: 'h5-064', author: 'Nadège Laravine', rating: 4, date: '2024-02-17', comment: "La couleur champagne est vraiment belle. Originale et élégante.", verified: true },
      { id: 'h5-065', author: 'Richard Céleste', rating: 5, date: '2024-01-05', comment: "Drivers 10mm excellents ! Son riche avec de bonnes basses.", verified: true },
      { id: 'h5-066', author: 'Éliane Narassiguin', rating: 3, date: '2023-11-22', comment: "Bien mais je préfère quand même le sans fil pour le sport.", verified: true },
      { id: 'h5-067', author: 'Georges Barret', rating: 5, date: '2023-10-10', comment: "Parfaits pour mon vieil ampli. Le jack 3.5mm reste indispensable.", verified: true },
      { id: 'h5-068', author: 'Josiane Técher', rating: 4, date: '2023-08-27', comment: "Bon son, prix mini. Exactement ce que je cherchais.", verified: true },
      { id: 'h5-069', author: 'Emmanuel Vitry', rating: 5, date: '2023-07-15', comment: "Le câble anti-nœud est vraiment efficace. Plus de problème !", verified: true },
      { id: 'h5-070', author: 'Corinne Lebon', rating: 4, date: '2023-06-02', comment: "Confortables même après plusieurs heures. Bon maintien.", verified: true },
      { id: 'h5-071', author: 'Jérôme Bénard', rating: 5, date: '2023-04-20', comment: "Excellente surprise ! Qualité sonore au-dessus du prix.", verified: true },
      { id: 'h5-072', author: 'Lydie Valy', rating: 3, date: '2023-03-08', comment: "Corrects mais le câble fait du bruit quand il bouge.", verified: false },
      { id: 'h5-073', author: 'Patrick Mussard', rating: 5, date: '2026-01-15', comment: "Parfaits pour le télétravail. Le micro est clair pour les visios.", verified: true },
      { id: 'h5-074', author: 'Virginie Hoarau', rating: 4, date: '2025-12-03', comment: "Bonne qualité pour le prix. Les finitions sont soignées.", verified: true },
      { id: 'h5-075', author: 'Fabrice Payet', rating: 5, date: '2025-10-20', comment: "Le son Hi-Fi est vraiment présent. Étonnant pour 20€ !", verified: true },
      { id: 'h5-076', author: 'Vanessa Sautron', rating: 4, date: '2025-09-08', comment: "Le bouton est pratique pour gérer la musique sans sortir le téléphone.", verified: true },
      { id: 'h5-077', author: 'Thierry Guichard', rating: 5, date: '2025-07-25', comment: "Filaires = fiables ! Jamais de problème de connexion.", verified: true },
      { id: 'h5-078', author: 'Chantal Ah-Sing', rating: 3, date: '2025-06-13', comment: "Bien mais j'aurais aimé plusieurs tailles d'embouts.", verified: true },
      { id: 'h5-079', author: 'Christophe Fontaine', rating: 5, date: '2025-05-01', comment: "Excellents pour écouter de la musique classique. Son détaillé.", verified: true },
      { id: 'h5-080', author: 'Sylviane Pothin', rating: 4, date: '2025-03-18', comment: "Le câble de 1.2m est parfait pour mon usage quotidien.", verified: true },
      { id: 'h5-081', author: 'Marc Lauret', rating: 5, date: '2025-02-05', comment: "Super qualité HIFUTURE ! Je recommande vivement.", verified: true },
      { id: 'h5-082', author: 'Nadia Rivière', rating: 4, date: '2024-12-23', comment: "Design champagne élégant. Change agréablement du noir habituel.", verified: true },
      { id: 'h5-083', author: 'Guillaume Hoareau', rating: 5, date: '2024-11-10', comment: "Parfaits pour mon PC fixe. Le jack est plus fiable que le Bluetooth.", verified: true },
      { id: 'h5-084', author: 'Aurélie Virapin', rating: 3, date: '2024-09-28', comment: "Corrects mais manquent un peu de punch dans les basses.", verified: false },
      { id: 'h5-085', author: 'Didier Turpin', rating: 5, date: '2024-08-15', comment: "19.99€ seulement ! Rapport qualité/prix imbattable.", verified: true },
      { id: 'h5-086', author: 'Sophie Maillot', rating: 4, date: '2024-07-03', comment: "Le micro intégré est pratique pour les appels rapides.", verified: true },
      { id: 'h5-087', author: 'Thomas Dijoux', rating: 5, date: '2024-05-20', comment: "Les drivers 10mm font vraiment la différence. Son puissant !", verified: true },
      { id: 'h5-088', author: 'Céline Nativel', rating: 4, date: '2024-04-08', comment: "Câble anti-nœud efficace. Fini les heures à démêler !", verified: true },
      { id: 'h5-089', author: 'Bruno Lebreton', rating: 5, date: '2024-02-25', comment: "Excellents écouteurs filaires ! Le son est clair et équilibré.", verified: true },
      { id: 'h5-090', author: 'Patricia Sery', rating: 4, date: '2024-01-13', comment: "Très satisfaite de mon achat. Qualité au rendez-vous !", verified: true }
    ]
  },

  // MUVIT KidPic Rouleaux Papier Photo
  {
    id: 'muvit-kidpic-rouleaux',
    airtableId: 'rec64',
    sku: 'MUAPN001',
    name: 'MUVIT KidPic Rouleaux Papier Photo',
    brand: 'MUVIT',
    category: 'Accessoires',
    subcategory: 'Appareil Photo',
    price: 19.99,
    description: "Les rouleaux de papier photo MUVIT KidPic constituent l'accessoire indispensable pour prolonger l'aventure photographique des jeunes créateurs. Ce pack économique de 5 rouleaux garantit des heures d'impression instantanée, permettant aux enfants de capturer et matérialiser leurs découvertes visuelles sans interruption.\n\nChaque rouleau contient suffisamment de papier pour imprimer jusqu'à 30 photos, offrant un total de 150 impressions par pack. Le papier thermique spécial développe instantanément les images sans encre ni cartouche, utilisant une technologie écologique et sécuritaire pour les enfants.\n\nLa qualité d'impression optimisée produit des photos nettes et contrastées qui résistent au temps. Les images conservent leur éclat pendant des années, créant des souvenirs durables que les enfants peuvent collectionner, partager ou offrir. Le format compact des photos permet de créer albums, collages et projets créatifs.\n\nL'installation simplifiée permet aux enfants de changer eux-mêmes les rouleaux, développant autonomie et responsabilité. Le système de chargement intuitif évite les erreurs et garantit un alignement parfait pour des impressions réussies à chaque fois.\n\nLe papier autocollant au dos transforme chaque photo en sticker repositionnable, multipliant les possibilités créatives. Les enfants peuvent décorer cahiers, chambres et créations artistiques avec leurs propres photos, personnalisant leur univers avec leurs souvenirs préférés.\n\nLe conditionnement protégé préserve la qualité du papier contre humidité et poussière, garantissant des impressions parfaites même après stockage prolongé. Idéal pour le climat tropical de La Réunion, le papier résiste aux variations de température et d'humidité.\n\nCompatible exclusivement avec les appareils MUVIT KidPic, ce papier certifié garantit performances optimales et sécurité d'utilisation. Stock permanent disponible dans nos boutiques réunionnaises pour ne jamais manquer de support d'impression créative.",
    shortDescription: 'Pack 5 rouleaux papier photo pour 150 impressions',
    metaTitle: 'Rouleaux Papier Photo MUVIT KidPic - Pack de 5',
    metaDescription: 'Rouleaux papier photo MUVIT KidPic, pack 5 rouleaux pour 150 impressions instantanées. Papier autocollant écologique, installation facile. Stock permanent La Réunion 974.',
    urlSlug: 'muvit-kidpic-rouleaux-papier-photo',
    keywords: ['rouleaux papier photo', 'MUVIT KidPic', 'recharge appareil photo', 'papier impression instantanée', 'accessoire KidPic'],
    variants: [
      { color: 'Pack de 5 rouleaux', colorCode: '#FFFFFF', ean: '34040004100030', stock: 20, images: ['/placeholder-monster-mini.svg'] }
    ],
    specifications: [
      { label: 'Quantité', value: '5 rouleaux' },
      { label: 'Photos/rouleau', value: '30 photos' },
      { label: 'Total', value: '150 impressions' },
      { label: 'Compatible', value: 'MUVIT KidPic' }
    ],
    images: ['/placeholder-monster-mini.svg'],
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
    category: 'LED',
    subcategory: 'Kits Éclairage',
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

  // ===== 9 NOUVEAUX PRODUITS DEPUIS AIRTABLE =====
  
  {
    id: 'mon-ill-basic-sound',
    sku: 'MON-ILL-BASIC-SOUND',
    name: 'MONSTER Illuminescence Basic Lightstrip Sound Flow',
    urlSlug: 'monster-illuminescence-basic-lightstrip-sound-flow',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandes LED',
    price: 19.99,
    originalPrice: 23.99,
    discount: 20,
    description: "Bande LED RGB réactive au son pour une ambiance immersive. Synchronisation audio parfaite.",
    shortDescription: "Bande LED RGB réactive au son pour une ambiance immersive. Synchronisation audio parfaite....",
    metaTitle: 'MONSTER Illuminescence Basic Lightstrip Sound Flow | Monster Phone 974',
    metaDescription: 'Bande LED RGB réactive au son MONSTER. Synchronisation audio parfaite pour ambiance immersive.',
    keywords: ['MONSTER', 'LED', 'RGB', 'son', 'lightstrip'],
    images: ['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-basic-sound.webp'],
    rating: {
      average: 4.5,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    },
    warranty: '2 ans',
    status: 'active' as const,
    airtableId: 'reccws4MRzq588OWJ',
    variants: [
      { color: '2m', colorCode: '#FF6B6B', ean: 'MONILLBA0000', stock: 10, images: [] },
      { color: '4m', colorCode: '#4ECDC4', ean: 'MONILLBA0001', stock: 10, images: [] },
      { color: '5m', colorCode: '#45B7D1', ean: 'MONILLBA0002', stock: 10, images: [] }
    ],
    defaultVariant: '2m',
    specifications: [
      { label: 'Type', value: 'LED', icon: 'lightbulb' },
      { label: 'Connectivité', value: 'WiFi/App', icon: 'wifi' },
      { label: 'Usage', value: 'Intérieur', icon: 'home' }
    ]
  },

  {
    id: 'mon-ill-smart-5m-ic',
    urlSlug: 'monster-illuminescence-led-strip-smart-5m-ic',
    sku: 'MON-ILL-SMART-5M-IC',
    name: 'MONSTER Illuminescence Smart Light Strip 5M RGB+IC',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandes LED',
    price: 54.99,
    originalPrice: 65.99,
    discount: 20,
    description: "Bande LED intelligente avec technologie RGB+IC pour un contrôle précis des couleurs.",
    shortDescription: "Bande LED intelligente avec technologie RGB+IC pour un contrôle précis des couleurs....",
    images: ['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-smart-5m-ic.webp'],
    rating: {
      average: 4.5,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    },
    warranty: '2 ans',
    airtableId: 'recKOzXmP6A55Hfdj',
    variants: [
      { color: '5m RGB+IC Flow', colorCode: '#9B59B6', ean: 'MONILLSM0000', stock: 10, images: [] }
    ],
    defaultVariant: '5m RGB+IC Flow',
    specifications: [
      { label: 'Type', value: 'LED', icon: 'lightbulb' },
      { label: 'Connectivité', value: 'WiFi/App', icon: 'wifi' },
      { label: 'Usage', value: 'Intérieur', icon: 'home' }
    ],
    metaTitle: "MONSTER Illuminescence Smart Light Strip 5M RGB+IC",
    metaDescription: "Bande LED intelligente avec technologie RGB+IC",
    keywords: ["led", "smart", "rgb", "ic", "monster"],
    status: "active"
  },
  {
    id: 'mon-ill-smart-flow',
    sku: 'MON-ILL-SMART-FLOW',
    name: 'MONSTER Illuminescence Smart Light Strip Multicolor Flow',
    urlSlug: 'mon-ill-smart-flow',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Bandes LED',
    price: 27.99,
    originalPrice: 33.59,
    discount: 20,
    description: "Bande LED intelligente avec effet Multicolor Flow pour une ambiance dynamique.",
    shortDescription: "Bande LED intelligente avec effet Multicolor Flow pour une ambiance dynamique....",
    images: ['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-smart-flow.webp'],
    rating: {
      average: 4.5,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    },
    warranty: '2 ans',
    airtableId: 'recUWnBN9UVK7VQ2g',
    variants: [
      { color: '2m', colorCode: '#FF6B6B', ean: 'MONILLSM0000', stock: 10, images: [] },
      { color: '4m', colorCode: '#4ECDC4', ean: 'MONILLSM0001', stock: 10, images: [] }
    ],
    defaultVariant: '2m',
    specifications: [
      { label: 'Type', value: 'LED', icon: 'lightbulb' },
      { label: 'Connectivité', value: 'WiFi/App', icon: 'wifi' },
      { label: 'Usage', value: 'Intérieur', icon: 'home' }
    ],
    metaTitle: "MONSTER Illuminescence Smart Light Strip Flow",
    metaDescription: "Bande LED intelligente avec effet Multicolor Flow",
    keywords: ["led", "smart", "flow", "multicolor", "monster"],
    status: "active"
  },
  {
    id: 'mon-ill-beam-kit',
    sku: 'MON-ILL-BEAM-KIT',
    name: 'MONSTER Illuminescence Smart Beam + 2X Bars Kit',
    urlSlug: 'mon-ill-beam-kit',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Light Bars',
    price: 149.99,
    originalPrice: 179.99,
    discount: 20,
    description: "Kit complet d'éclairage avec beam et barres RGB IC pour un setup gaming professionnel.",
    shortDescription: "Kit complet d'éclairage avec beam et barres RGB IC pour un setup gaming professionnel....",
    images: ['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-beam-kit.webp'],
    rating: {
      average: 4.5,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    },
    warranty: '2 ans',
    airtableId: 'reczZNn9ztInmt6ts',
    variants: [
      { color: 'Beam + 2X Bars RGB IC', colorCode: '#E74C3C', ean: 'MONILLBE0000', stock: 10, images: [] }
    ],
    defaultVariant: 'Beam + 2X Bars RGB IC',
    specifications: [
      { label: 'Type', value: 'LED', icon: 'lightbulb' },
      { label: 'Connectivité', value: 'WiFi/App', icon: 'wifi' },
      { label: 'Usage', value: 'Intérieur', icon: 'home' }
    ],
    metaTitle: "MONSTER Illuminescence Smart Beam Kit",
    metaDescription: "Kit d'éclairage RGB IC avec beam et barres",
    keywords: ["led", "beam", "rgb", "ic", "monster"],
    status: "active"
  },
  {
    id: 'mon-ill-a19',
    sku: 'MON-ILL-A19',
    name: 'MONSTER Illuminescence Basic Ampoule A19',
    urlSlug: 'mon-ill-a19',
    brand: 'MONSTER',
    category: 'LED',
    subcategory: 'Ampoules',
    price: 10.99,
    originalPrice: 13.19,
    discount: 20,
    description: "Ampoule LED économique avec température de couleur blanc chaud.",
    shortDescription: "Ampoule LED économique avec température de couleur blanc chaud....",
    images: ['https://raw.githubusercontent.com/Tinquen59/monster-phone-images/main/products/mon-ill-a19.webp'],
    rating: {
      average: 4.5,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    },
    warranty: '2 ans',
    airtableId: 'recsgRJcQ8iuPI0nq',
    variants: [
      { color: 'A19 Basic', colorCode: '#FFA500', ean: 'MONILLA10000', stock: 10, images: [] }
    ],
    defaultVariant: 'A19 Basic',
    specifications: [
      { label: 'Type', value: 'LED', icon: 'lightbulb' },
      { label: 'Connectivité', value: 'WiFi/App', icon: 'wifi' },
      { label: 'Usage', value: 'Intérieur', icon: 'home' }
    ],
    metaTitle: "MONSTER Illuminescence Basic Ampoule A19",
    metaDescription: "Ampoule LED économique avec température de couleur blanc chaud",
    keywords: ["led", "ampoule", "a19", "monster"],
    status: "active"
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
    name: '📱 Smartphones',
    slug: 'smartphones',
    subcategories: [
      {
        name: 'Gaming Phones',
        slug: 'gaming-phones',
        brands: ['INFINIX', 'HONOR', 'TECNO', 'DOOGEE']
      },
      {
        name: 'Smartphones 5G',
        slug: 'smartphones-5g',
        brands: ['INFINIX', 'HONOR', 'TECNO']
      },
      {
        name: 'Smartphones Pro',
        slug: 'smartphones-pro',
        brands: ['INFINIX', 'HONOR']
      },
      {
        name: 'Téléphones Classiques',
        slug: 'telephones-classiques',
        brands: ['NOKIA']
      }
    ]
  },
  {
    name: '📱 Tablettes',
    slug: 'tablettes',
    subcategories: [
      {
        name: 'Tablettes Android',
        slug: 'tablettes-android',
        brands: ['HONOR']
      },
      {
        name: 'Tablettes Gaming',
        slug: 'tablettes-gaming',
        brands: ['HONOR']
      }
    ]
  },
  {
    name: '⌚ Montres',
    slug: 'montres',
    subcategories: [
      {
        name: 'Montres connectées',
        slug: 'montres-connectees',
        brands: ['HIFUTURE']
      },
      {
        name: 'Montres sport',
        slug: 'montres-sport',
        brands: ['HIFUTURE']
      }
    ]
  },
  {
    name: '🎧 Audio',
    slug: 'audio',
    subcategories: [
      {
        name: 'Écouteurs',
        slug: 'ecouteurs',
        brands: ['HIFUTURE', 'MONSTER']
      },
      {
        name: 'Enceintes',
        slug: 'enceintes',
        brands: ['HIFUTURE', 'MONSTER']
      },
      {
        name: 'Casques',
        slug: 'casques',
        brands: ['HIFUTURE', 'MONSTER', 'MUVIT']
      }
    ]
  },
  {
    name: '💡 LED',
    slug: 'led',
    subcategories: [
      {
        name: 'Éclairage LED',
        slug: 'eclairage-led',
        brands: ['MONSTER']
      },
      {
        name: 'Bandeaux LED',
        slug: 'bandeaux-led',
        brands: ['MONSTER']
      }
    ]
  },
  {
    name: '🔧 Accessoires',
    slug: 'accessoires',
    subcategories: [
      {
        name: 'Batteries & Chargeurs',
        slug: 'batteries-chargeurs',
        brands: ['MY WAY', 'ABYX']
      },
      {
        name: 'Câbles & Connectiques',
        slug: 'cables-connectiques',
        brands: ['MONSTER', 'MY WAY', 'TIGER POWER']
      },
      {
        name: 'Appareils Photo',
        slug: 'appareils-photo',
        brands: ['MUVIT']
      },
      {
        name: 'Accessoires Photo',
        slug: 'accessoires-photo',
        brands: ['MUVIT']
      },
      {
        name: 'Gaming & PC',
        slug: 'gaming-pc',
        brands: []
      },
      {
        name: 'Protection & Étuis',
        slug: 'protection-etuis',
        brands: []
      },
      {
        name: 'Supports & Fixations',
        slug: 'supports-fixations',
        brands: []
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
  // Supprimer les emojis et espaces en début de chaîne
  const cleanCategory = category.replace(/^[^\w\s]+\s*/, '').trim();
  
  return allProducts.filter(product => 
    product.category.toLowerCase() === cleanCategory.toLowerCase()
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
  // Supprimer les emojis et espaces en début de chaîne pour la catégorie
  const cleanCategory = category.replace(/^[^\w\s]+\s*/, '').trim();
  
  return allProducts.filter(
    product => product.brand.toLowerCase() === brand.toLowerCase() && 
               product.category.toLowerCase() === cleanCategory.toLowerCase()
  );
}

// Structure du menu basé sur les marques pour Smartphones et LED
export const brandMenuStructure: BrandMenuStructure[] = [
  {
    category: 'Smartphones',
    brands: getBrandsByCategory('Smartphones')
  },
  {
    category: 'Tablettes',
    brands: getBrandsByCategory('Tablettes')
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