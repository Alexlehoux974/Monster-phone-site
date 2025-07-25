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