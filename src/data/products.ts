// Vraies données de produits depuis Airtable E-commerce - Monster Phone Produits

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  price?: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  keywords: string;
  images: string[];
  variants: string;
  status: string;
}

// Données réelles de la base Airtable
export const allProducts: Product[] = [
  // SMARTPHONES - HONOR
  {
    id: "recFsFez7xoI10570",
    name: "HONOR 200 PRO Smartphone",
    brand: "HONOR",
    category: "Smartphones",
    sku: "HONOR-200-PRO",
    description: "Smartphone HONOR 200 PRO avec caméras professionnelles et performance flagship. Design premium, technologie avancée, autonomie exceptionnelle.",
    metaTitle: "HONOR 200 PRO - Smartphone Flagship Caméras Pro",
    metaDescription: "HONOR 200 PRO smartphone premium avec caméras professionnelles. Performance flagship, design élégant, autonomie longue durée.",
    urlSlug: "honor-200-pro-smartphone-flagship",
    keywords: "HONOR 200 PRO, smartphone flagship, caméras professionnelles, smartphone premium, HONOR mobile",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/200-Pro/HONOR-200-PRO-1280x800-1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/200-Pro/HONOR_200_PRO.png",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/200-Pro/HONOR_200_PRO_BLACK.png",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/200-Pro/HONOR_200_PRO_Moonlight_White.png",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/200-Pro/HONOR_200_PRO_OCEAN_CYAN.png"
    ],
    variants: "Black, Moonlight White, Ocean Cyan",
    status: "Brouillon",
    price: "799€"
  },
  {
    id: "recTFM2sslHPUoxY9",
    name: "HONOR X5B Smartphone",
    brand: "HONOR",
    category: "Smartphones",
    sku: "HONOR-X5B",
    description: "Smartphone HONOR X5B élégant et performant. Design moderne, performance fluide, excellent rapport qualité-prix.",
    metaTitle: "HONOR X5B - Smartphone Performance et Style Abordable",
    metaDescription: "HONOR X5B smartphone élégant et performant. Design moderne, performance fluide, autonomie solide.",
    urlSlug: "honor-x5b-smartphone-performance-style",
    keywords: "HONOR X5B, smartphone abordable, HONOR mobile, smartphone performance, design moderne",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/X5B/Honor-X5b-main.webp",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/X5B/Goofy_Blue_Front_PNG.png",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Images/X5B/honor-x5b-plus-4g-midnight-black.jpeg"
    ],
    variants: "Midnight Black, Blue",
    status: "Brouillon",
    price: "199€"
  },

  // CÂBLES DE CHARGEMENT - MY WAY
  {
    id: "rec4awWqJz7xVLIfe",
    name: "MY-WAY Câble USB-A vers USB-C Lumineux",
    brand: "MY WAY",
    category: "Câbles de Chargement",
    sku: "MYWAY-USB-A-USB-C",
    description: "Câble USB-A vers USB-C MY-WAY avec technologie LED lumineuse. Charge rapide et transfert de données.",
    metaTitle: "Câble USB-A USB-C MY-WAY Lumineux - Charge Rapide Android",
    metaDescription: "Câble USB-A USB-C MY-WAY avec éclairage LED intégré. Compatible Android, charge rapide, design innovant.",
    urlSlug: "myway-cable-usb-a-usb-c-lumineux",
    keywords: "câble USB-C, MY-WAY, USB-A USB-C, câble lumineux, charge Android, LED cable",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-A-USB-C/CABLE_USB-A_USB-C.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-A-USB-C/CABLE_USB-A_USB-C_1.jpg"
    ],
    variants: "Blanc avec LED",
    status: "Brouillon",
    price: "19.90€"
  },
  {
    id: "recCXf1abRprReiJP",
    name: "MY-WAY Câble USB-A vers Lightning Lumineux",
    brand: "MY WAY",
    category: "Câbles de Chargement",
    sku: "MYWAY-USB-A-LIGHTNING",
    description: "Câble USB-A vers Lightning MY-WAY avec éclairage LED. Charge rapide et synchronisation pour iPhone et iPad.",
    metaTitle: "Câble USB-A Lightning MY-WAY Lumineux - Charge Rapide iPhone",
    metaDescription: "Câble USB-A Lightning MY-WAY avec LED lumineux. Compatible iPhone/iPad, charge rapide, design premium.",
    urlSlug: "myway-cable-usb-a-lightning-lumineux",
    keywords: "câble lightning, MY-WAY, USB-A lightning, câble lumineux, charge iPhone, LED cable",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-A-Lightning/CABLE_USB-A_LIGHTNING.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-A-Lightning/CABLE_USB-A_LIGHTNING_1.jpg"
    ],
    variants: "Blanc avec LED",
    status: "Brouillon",
    price: "19.90€"
  },
  {
    id: "recRdnugDxpN7eikl",
    name: "MY-WAY Câble USB-C vers Lightning Lumineux",
    brand: "MY WAY",
    category: "Câbles de Chargement",
    sku: "MYWAY-USB-C-LIGHTNING",
    description: "Câble USB-C vers Lightning MY-WAY avec éclairage LED premium. Charge ultra-rapide pour iPhone avec chargeurs USB-C.",
    metaTitle: "Câble USB-C Lightning MY-WAY Lumineux - Charge Ultra-Rapide",
    metaDescription: "Câble USB-C Lightning MY-WAY avec LED. Charge ultra-rapide iPhone, compatible chargeurs USB-C.",
    urlSlug: "myway-cable-usb-c-lightning-lumineux",
    keywords: "câble USB-C lightning, MY-WAY, charge ultra-rapide, câble lumineux, iPhone fast charge",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-C-Lightning/CABLE_USB-C_LIGHTNING.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-C-Lightning/CABLE_USB-C_LIGHTNING_2.jpg"
    ],
    variants: "Blanc avec LED",
    status: "Brouillon",
    price: "24.90€"
  },
  {
    id: "rectOAIRK6v1iRhTn",
    name: "MY-WAY Câble USB-C vers USB-C Lumineux",
    brand: "MY WAY",
    category: "Câbles de Chargement",
    sku: "MYWAY-USB-C-USB-C",
    description: "Câble USB-C vers USB-C MY-WAY avec technologie LED lumineuse. Charge rapide et transfert de données haute vitesse.",
    metaTitle: "Câble USB-C MY-WAY Lumineux - Charge Rapide Universelle",
    metaDescription: "Câble USB-C USB-C MY-WAY avec éclairage LED. Compatible tous appareils USB-C, charge rapide, transfert données.",
    urlSlug: "myway-cable-usb-c-usb-c-lumineux",
    keywords: "câble USB-C, MY-WAY, USB-C to USB-C, câble lumineux, charge universelle, LED cable",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-C-USB-C/CABLE_USB-C_USB-C.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MY-WAY/Images/Cables-Lumineux/USB-C-USB-C/CABLE_USB-C_USB-C_1.jpg"
    ],
    variants: "Blanc avec LED",
    status: "Brouillon",
    price: "22.90€"
  },

  // CASQUES ENFANT - MUVIT
  {
    id: "recLyY1ihnMkFBb1B",
    name: "MUVIT Casque Enfant Pika",
    brand: "MUVIT",
    category: "Casques Enfant",
    sku: "MUVIT-CASQUE-PIKA",
    description: "Casque audio enfant MUVIT avec design Pika captivant. Protection auditive optimale, volume contrôlé.",
    metaTitle: "Casque Enfant MUVIT Pika - Audio Ludique et Protégé",
    metaDescription: "Découvrez le casque MUVIT Pika pour enfants. Design fun, protection auditive garantie, confort optimal.",
    urlSlug: "casque-enfant-muvit-pika",
    keywords: "casque enfant, MUVIT, pika, pokemon, casque pika, audio enfant, protection auditive",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Pika/CASQUE_PIKA.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Pika/CASQUE_PIKA_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Pika/CASQUE_PIKA_2.jpg"
    ],
    variants: "Pika (jaune/rouge)",
    status: "Brouillon",
    price: "39.90€"
  },
  {
    id: "receBo3p9exzCfOod",
    name: "MUVIT Casque Enfant Lapin",
    brand: "MUVIT",
    category: "Casques Enfant",
    sku: "MUVIT-CASQUE-LAPIN",
    description: "Casque audio enfant MUVIT avec design Lapin créatif. Audio sécurisé avec limitation de volume.",
    metaTitle: "Casque Enfant MUVIT Lapin - Protection Auditive Design Créatif",
    metaDescription: "Casque MUVIT Lapin pour enfants avec protection auditive intégrée. Design original et confortable.",
    urlSlug: "casque-enfant-muvit-lapin",
    keywords: "casque enfant, MUVIT, lapin, audio sécurisé, casque lapin, protection auditive, design animal",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Lapin/CASQUE_LAPIN.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Lapin/CASQUE_LAPIN_2.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Lapin/CASQUE_LAPIN_3.jpg"
    ],
    variants: "Lapin (blanc/rose)",
    status: "Brouillon",
    price: "34.90€"
  },
  {
    id: "recinaUvGhjnXefRM",
    name: "MUVIT Casque Enfant Dragon",
    brand: "MUVIT",
    category: "Casques Enfant",
    sku: "MUVIT-CASQUE-DRAGON",
    description: "Casque audio pour enfant MUVIT avec design Dragon amusant. Confortable et sécurisé avec limitation de volume.",
    metaTitle: "Casque Enfant MUVIT Dragon - Audio Sécurisé pour Enfants",
    metaDescription: "Découvrez le casque enfant MUVIT Dragon. Design amusant, volume limité pour protection auditive.",
    urlSlug: "casque-enfant-muvit-dragon",
    keywords: "casque enfant, MUVIT, dragon, audio enfant, protection auditive, casque sécurisé, volume limité",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Dragon/CASQUE_DRAGON.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Dragon/CASQUE_DRAGON_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Dragon/CASQUE_DRAGON_2.jpg"
    ],
    variants: "Dragon (vert/rouge)",
    status: "Brouillon",
    price: "34.90€"
  },
  {
    id: "recuMHK1lHj9kLiH9",
    name: "MUVIT Casque Enfant Chat",
    brand: "MUVIT",
    category: "Casques Enfant",
    sku: "MUVIT-CASQUE-CHAT",
    description: "Casque audio enfant MUVIT avec adorable design Chat. Protection auditive avec volume limité.",
    metaTitle: "Casque Enfant MUVIT Chat - Audio Sécurisé Design Félin",
    metaDescription: "Casque enfant MUVIT Chat avec design mignon et protection auditive. Volume sécurisé, confortable pour enfants.",
    urlSlug: "casque-enfant-muvit-chat",
    keywords: "casque enfant, MUVIT, chat, audio enfant, casque chat, protection auditive, design animal",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Chat/CASQUE_CHAT.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Chat/CASQUE_CHAT_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Chat/CASQUE_CHAT_2.jpg"
    ],
    variants: "Chat (rose/blanc)",
    status: "Brouillon",
    price: "34.90€"
  },
  {
    id: "reczv6DhbDSp8tFLe",
    name: "MUVIT Casque Enfant Licorne",
    brand: "MUVIT",
    category: "Casques Enfant",
    sku: "MUVIT-CASQUE-LICORNE",
    description: "Casque audio enfant MUVIT avec design Licorne magique. Protection auditive avancée, volume limité.",
    metaTitle: "Casque Enfant MUVIT Licorne - Audio Magique et Sécurisé",
    metaDescription: "Casque MUVIT Licorne pour enfants avec design féerique. Volume sécurisé, qualité audio premium.",
    urlSlug: "casque-enfant-muvit-licorne",
    keywords: "casque enfant, MUVIT, licorne, casque licorne, audio enfant, féerique, protection auditive",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Licorne/CASQUE_LICORNE.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Licorne/CASQUE_LICORNE_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/Casques-Enfant/Licorne/CASQUE_LICORNE_2.jpg"
    ],
    variants: "Licorne (rose/blanc/doré)",
    status: "Brouillon",
    price: "39.90€"
  },

  // APPAREILS PHOTO ENFANT - MUVIT
  {
    id: "recGG5rqQpwfUBKZB",
    name: "MUVIT KidPic Appareil Photo Enfant Rose",
    brand: "MUVIT",
    category: "Appareils Photo Enfant",
    sku: "MUVIT-KIDPIC-ROSE",
    description: "Appareil photo enfant MUVIT KidPic rose avec impression instantanée. Conçu pour les petites mains.",
    metaTitle: "MUVIT KidPic Rose - Appareil Photo Enfant Créatif",
    metaDescription: "Appareil photo KidPic MUVIT rose pour enfants. Impression instantanée, design ergonomique, développe la créativité.",
    urlSlug: "muvit-kidpic-appareil-photo-enfant-rose",
    keywords: "appareil photo enfant, MUVIT KidPic, impression instantanée, photo enfant, caméra enfant, rose, fille",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/KidPic-Rose/KIDPIC_ROSE.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/KidPic-Rose/KIDPIC_ROSE_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/KidPic-Rose/KIDPIC_ROSE_2.jpg"
    ],
    variants: "Rose",
    status: "Brouillon",
    price: "89.90€"
  },
  {
    id: "recsPgVWd9NyQlLdi",
    name: "MUVIT KidPic Appareil Photo Enfant Bleu",
    brand: "MUVIT",
    category: "Appareils Photo Enfant",
    sku: "MUVIT-KIDPIC-BLEU",
    description: "Appareil photo enfant MUVIT KidPic bleu avec impression instantanée. Design robuste, facile à utiliser.",
    metaTitle: "MUVIT KidPic Bleu - Appareil Photo Enfant Impression Instantanée",
    metaDescription: "Appareil photo enfant KidPic MUVIT bleu avec impression immédiate. Robuste, simple d'utilisation, stimule la créativité.",
    urlSlug: "muvit-kidpic-appareil-photo-enfant-bleu",
    keywords: "appareil photo enfant, MUVIT KidPic, impression instantanée, photo enfant, caméra enfant, bleu",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/KidPic-Bleu/KIDPIC_BLEU.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/KidPic-Bleu/KIDPIC_BLEU_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/KidPic-Bleu/KIDPIC_BLEU_2.jpg"
    ],
    variants: "Bleu",
    status: "Brouillon",
    price: "89.90€"
  },

  // BATTERIES PORTABLES - MONSTER
  {
    id: "recuJxSSe3dqH4cfJ",
    name: "MONSTER N-Lite 206 Batterie Portable",
    brand: "MONSTER",
    category: "Batteries Portables",
    sku: "MONSTER-N-LITE-206",
    description: "Batterie portable MONSTER N-Lite 206 haute capacité. Design compact et léger, charge rapide multiple appareils.",
    metaTitle: "MONSTER N-Lite 206 - Batterie Portable Haute Performance",
    metaDescription: "Batterie portable MONSTER N-Lite 206 haute capacité. Charge rapide, design compact, qualité MONSTER.",
    urlSlug: "monster-n-lite-206-batterie-portable",
    keywords: "batterie portable, MONSTER N-Lite 206, powerbank, charge rapide, batterie externe MONSTER",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Images/N-Lite-206/N_LITE_206.jpeg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Images/N-Lite-206/N_LITE_206_1.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MONSTER/Images/N-Lite-206/N_LITE_206_2.jpg"
    ],
    variants: "Noir mat premium",
    status: "Brouillon",
    price: "49.90€"
  },

  // ACCESSOIRES - MUVIT
  {
    id: "rechl1h4K1itTUGsC",
    name: "MUVIT KidPic Rouleaux Papier Photo",
    brand: "MUVIT",
    category: "Accessoires",
    sku: "MUVIT-KIDPIC-ROULEAUX",
    description: "Rouleaux de papier photo pour appareil MUVIT KidPic. Recharges essentielles pour impression instantanée.",
    metaTitle: "Rouleaux Papier Photo MUVIT KidPic - Recharges Impression",
    metaDescription: "Rouleaux papier photo KidPic MUVIT pour impression instantanée. Recharges compatibles appareils KidPic.",
    urlSlug: "muvit-kidpic-rouleaux-papier-photo",
    keywords: "rouleaux papier photo, MUVIT KidPic, recharge appareil photo, papier impression, accessoire KidPic",
    images: [
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/Rouleaux-Papier/ROULEAUX_KIDPIC.jpg",
      "https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MUVIT/Images/App-Photo-Enfant/Rouleaux-Papier/ROULEAUX_KIDPIC_1.jpg"
    ],
    variants: "Pack recharge standard",
    status: "Brouillon",
    price: "14.90€"
  },

  // NOUVEAUX PRODUITS GAMING - MONSTER
  {
    id: "recGAMING001",
    name: "MONSTER Gaming Controller RGB",
    brand: "MONSTER",
    category: "Accessoires Gaming",
    sku: "MONSTER-CTRL-RGB",
    description: "Manette gaming MONSTER RGB avec connexion Bluetooth 5.0, compatible tous smartphones. Éclairage RGB personnalisable, batterie 15h.",
    metaTitle: "Manette Gaming MONSTER RGB - Controller Smartphone Pro",
    metaDescription: "Manette gaming MONSTER avec RGB personnalisable. Bluetooth 5.0, 15h d'autonomie, compatible Android/iOS.",
    urlSlug: "manette-gaming-monster-rgb",
    keywords: "manette gaming, controller, RGB, MONSTER, bluetooth, smartphone gaming, pro gaming",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "RGB Pro Edition",
    status: "Publié",
    price: "79.90€"
  },
  {
    id: "recGAMING002",
    name: "MONSTER Cooling Fan Pro",
    brand: "MONSTER",
    category: "Accessoires Gaming",
    sku: "MONSTER-COOL-PRO",
    description: "Ventilateur refroidisseur MONSTER pour smartphone gaming. Système de refroidissement actif, compatible tous modèles.",
    metaTitle: "Refroidisseur Gaming MONSTER Pro - Cooling Fan Smartphone",
    metaDescription: "Ventilateur gaming MONSTER Pro pour refroidir votre smartphone. Performance maximale sans throttling.",
    urlSlug: "refroidisseur-gaming-monster-pro",
    keywords: "refroidisseur, cooling fan, gaming, MONSTER, ventilateur smartphone, pro gaming",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "Version Pro",
    status: "Publié",
    price: "49.90€"
  },
  {
    id: "recGAMING003",
    name: "MONSTER Gaming Triggers",
    brand: "MONSTER",
    category: "Accessoires Gaming",
    sku: "MONSTER-TRIG-SET",
    description: "Gâchettes gaming MONSTER pour smartphone. Pack de 4 triggers tactiles, installation rapide, compatible tous jeux.",
    metaTitle: "Gâchettes Gaming MONSTER - Triggers Smartphone Pro",
    metaDescription: "Triggers gaming MONSTER pour transformer votre smartphone en console. Pack 4 gâchettes tactiles pro.",
    urlSlug: "gachettes-gaming-monster",
    keywords: "triggers, gâchettes, gaming, MONSTER, accessoire gaming, mobile gaming",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "Pack 4 triggers",
    status: "Publié",
    price: "29.90€"
  },
  {
    id: "recGAMING004",
    name: "MONSTER Gaming Dock Station",
    brand: "MONSTER",
    category: "Accessoires Gaming",
    sku: "MONSTER-DOCK-PRO",
    description: "Station d'accueil gaming MONSTER avec hub USB-C, charge rapide 65W, sortie HDMI 4K. Transformez votre smartphone en PC gaming.",
    metaTitle: "Dock Gaming MONSTER - Station d'Accueil Pro Smartphone",
    metaDescription: "Station gaming MONSTER avec hub USB-C, charge 65W et HDMI 4K. Console de jeu mobile ultime.",
    urlSlug: "dock-gaming-monster-pro",
    keywords: "dock station, hub USB-C, gaming dock, MONSTER, charge rapide, HDMI 4K",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "Pro Gaming Edition",
    status: "Publié",
    price: "129.90€"
  },
  {
    id: "recGAMING005",
    name: "MONSTER Gaming Earbuds Pro",
    brand: "MONSTER",
    category: "Audio Gaming",
    sku: "MONSTER-EARBUDS-PRO",
    description: "Écouteurs gaming MONSTER avec latence ultra-faible, son surround 7.1 virtuel, micro antibruit. La perfection pour le gaming mobile.",
    metaTitle: "Écouteurs Gaming MONSTER Pro - Earbuds Low Latency",
    metaDescription: "Écouteurs gaming MONSTER Pro avec latence minimale et son 7.1. Expérience gaming mobile ultime.",
    urlSlug: "ecouteurs-gaming-monster-pro",
    keywords: "écouteurs gaming, earbuds, low latency, MONSTER, 7.1 surround, gaming audio",
    images: [
      "/placeholder-audio.svg"
    ],
    variants: "Black Pro Edition",
    status: "Publié",
    price: "99.90€"
  },
  {
    id: "recGAMING006",
    name: "MONSTER RGB Gaming Stand",
    brand: "MONSTER",
    category: "Accessoires Gaming",
    sku: "MONSTER-STAND-RGB",
    description: "Support gaming MONSTER avec éclairage RGB synchronisé, angle ajustable, charge sans fil 15W intégrée.",
    metaTitle: "Support Gaming MONSTER RGB - Stand Premium Smartphone",
    metaDescription: "Support gaming MONSTER RGB avec charge sans fil 15W. Design premium pour setup gaming mobile.",
    urlSlug: "support-gaming-monster-rgb",
    keywords: "support gaming, RGB, MONSTER, charge sans fil, gaming stand, setup gaming",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "RGB Edition",
    status: "Publié",
    price: "59.90€"
  },
  {
    id: "recPOWER001",
    name: "MONSTER PowerBank Gaming 20000mAh",
    brand: "MONSTER",
    category: "Batteries Portables",
    sku: "MONSTER-PB-20K",
    description: "Batterie externe MONSTER 20000mAh spécial gaming. Charge rapide 65W, 3 ports USB-C/USB-A, affichage LED.",
    metaTitle: "PowerBank Gaming MONSTER 20000mAh - Batterie Pro",
    metaDescription: "Batterie externe MONSTER 20000mAh avec charge 65W. Gaming non-stop avec affichage LED.",
    urlSlug: "powerbank-gaming-monster-20000",
    keywords: "batterie externe, powerbank, 20000mAh, MONSTER, charge rapide, gaming",
    images: [
      "/placeholder-charger.svg"
    ],
    variants: "20000mAh Pro",
    status: "Publié",
    price: "89.90€"
  },
  {
    id: "recCASE001",
    name: "HONOR Magic5 Pro Gaming Case MONSTER",
    brand: "MONSTER",
    category: "Coques & Protection",
    sku: "MONSTER-CASE-HM5P",
    description: "Coque gaming MONSTER pour HONOR Magic5 Pro. Protection militaire, système de refroidissement intégré, design RGB.",
    metaTitle: "Coque Gaming MONSTER HONOR Magic5 Pro - Protection RGB",
    metaDescription: "Coque gaming MONSTER pour HONOR Magic5 Pro avec refroidissement et RGB. Protection ultime.",
    urlSlug: "coque-gaming-monster-honor-magic5-pro",
    keywords: "coque gaming, HONOR Magic5 Pro, MONSTER, protection, RGB, refroidissement",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "Carbon Black RGB",
    status: "Publié",
    price: "49.90€"
  },
  {
    id: "recCASE002",
    name: "HONOR 90 Gaming Case MONSTER",
    brand: "MONSTER",
    category: "Coques & Protection",
    sku: "MONSTER-CASE-H90",
    description: "Coque gaming MONSTER pour HONOR 90. Design ergonomique avec grips latéraux, protection renforcée, compatible triggers.",
    metaTitle: "Coque Gaming MONSTER HONOR 90 - Protection Pro",
    metaDescription: "Coque gaming MONSTER pour HONOR 90 avec grips ergonomiques. Conçue pour le gaming intensif.",
    urlSlug: "coque-gaming-monster-honor-90",
    keywords: "coque gaming, HONOR 90, MONSTER, protection, ergonomique, triggers",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "Pro Gaming Black",
    status: "Publié",
    price: "39.90€"
  },
  {
    id: "recCASE003",
    name: "HONOR X8a Gaming Case MONSTER",
    brand: "MONSTER",
    category: "Coques & Protection",
    sku: "MONSTER-CASE-HX8A",
    description: "Coque gaming MONSTER pour HONOR X8a. Protection antichoc, design aéré pour refroidissement optimal, compatible accessoires.",
    metaTitle: "Coque Gaming MONSTER HONOR X8a - Protection Gaming",
    metaDescription: "Coque gaming MONSTER pour HONOR X8a avec ventilation optimale. Protection gaming abordable.",
    urlSlug: "coque-gaming-monster-honor-x8a",
    keywords: "coque gaming, HONOR X8a, MONSTER, protection, ventilation, gaming",
    images: [
      "/placeholder-product.svg"
    ],
    variants: "Gaming Edition",
    status: "Publié",
    price: "34.90€"
  }
];

// Structure hiérarchique pour le menu déroulant
export interface CategoryStructure {
  name: string;
  subcategories?: {
    name: string;
    brands: {
      name: string;
      products: Product[];
    }[];
  }[];
  brands?: {
    name: string;
    products: Product[];
  }[];
}

// Organisation hiérarchique pour menu déroulant
export const menuStructure: {
  smartphones: CategoryStructure[];
  accessoires: CategoryStructure[];
  casquesAudio: CategoryStructure[];
  montres: CategoryStructure[];
  luminaire: CategoryStructure[];
  accessoiresMonster: CategoryStructure[];
  muvit: CategoryStructure[];
} = {
  smartphones: [
    {
      name: "Smartphones",
      brands: [
        {
          name: "HONOR",
          products: allProducts.filter(p => p.category === "Smartphones" && p.brand === "HONOR")
        }
      ]
    }
  ],
  accessoires: [
    {
      name: "Audio & Son",
      subcategories: [
        {
          name: "Casques Enfant",
          brands: [
            {
              name: "MUVIT",
              products: allProducts.filter(p => p.category === "Casques Enfant" && p.brand === "MUVIT")
            }
          ]
        }
      ]
    },
    {
      name: "Chargement & Énergie",
      subcategories: [
        {
          name: "Câbles de Chargement",
          brands: [
            {
              name: "MY WAY",
              products: allProducts.filter(p => p.category === "Câbles de Chargement" && p.brand === "MY WAY")
            }
          ]
        },
        {
          name: "Batteries Portables",
          brands: [
            {
              name: "MONSTER",
              products: allProducts.filter(p => p.category === "Batteries Portables" && p.brand === "MONSTER")
            }
          ]
        }
      ]
    },
    {
      name: "Créativité & Enfants",
      subcategories: [
        {
          name: "Appareils Photo Enfant",
          brands: [
            {
              name: "MUVIT",
              products: allProducts.filter(p => p.category === "Appareils Photo Enfant" && p.brand === "MUVIT")
            }
          ]
        }
      ]
    },
    {
      name: "Accessoires",
      brands: [
        {
          name: "MUVIT",
          products: allProducts.filter(p => p.category === "Accessoires" && p.brand === "MUVIT")
        }
      ]
    }
  ],
  casquesAudio: [
    {
      name: "Casques",
      brands: [
        {
          name: "Placeholder",
          products: [] // À remplir avec les vrais produits de casques de l'Airtable
        }
      ]
    },
    {
      name: "Écouteurs", 
      brands: [
        {
          name: "Placeholder",
          products: [] // À remplir avec les vrais produits d'écouteurs de l'Airtable
        }
      ]
    },
    {
      name: "Enceintes",
      brands: [
        {
          name: "Placeholder", 
          products: [] // À remplir avec les vrais produits d'enceintes de l'Airtable
        }
      ]
    },
    {
      name: "Casques Enfant",
      brands: [
        {
          name: "MUVIT",
          products: allProducts.filter(p => p.category === "Casques Enfant" && p.brand === "MUVIT")
        }
      ]
    }
  ],
  montres: [
    {
      name: "Montres Connectées",
      brands: [
        {
          name: "Placeholder",
          products: [] // À remplir avec les vrais produits de montres de l'Airtable
        }
      ]
    }
  ],
  luminaire: [
    {
      name: "Luminaire Monster",
      brands: [
        {
          name: "Placeholder",
          products: [] // À remplir avec les vrais produits d'éclairage gaming de l'Airtable
        }
      ]
    }
  ],
  accessoiresMonster: [
    {
      name: "Accessoires Monster",
      brands: [
        {
          name: "MONSTER",
          products: allProducts.filter(p => p.brand === "MONSTER")
        }
      ]
    }
  ],
  muvit: [
    {
      name: "Produits MUVIT",
      brands: [
        {
          name: "MUVIT",
          products: allProducts.filter(p => p.brand === "MUVIT")
        }
      ]
    }
  ]
};

// Utilitaires
export const getBrands = (): string[] => {
  return Array.from(new Set(allProducts.map(p => p.brand)));
};

export const getCategories = (): string[] => {
  return Array.from(new Set(allProducts.map(p => p.category)));
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(p => p.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return allProducts.filter(p => p.brand === brand);
};

export const getSmartphones = (): Product[] => {
  return allProducts.filter(p => p.category === "Smartphones");
};

export const getAccessories = (): Product[] => {
  return allProducts.filter(p => p.category !== "Smartphones");
};