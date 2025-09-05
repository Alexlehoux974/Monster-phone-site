/**
 * Structure de menu fixe pour Monster Phone Boutique
 * Cette structure est utilisée pour maintenir l'organisation exacte du menu
 * tout en utilisant les données de Supabase
 */

export interface MenuSubcategory {
  name: string;
  slug: string;
  brands?: string[];
}

export interface MenuCategory {
  name: string;
  slug: string;
  icon?: string;
  subcategories?: MenuSubcategory[];
}

/**
 * Structure de menu fixe - DOIT rester identique à l'original
 * Les slugs sont mappés vers les catégories/sous-catégories Supabase
 */
export const MENU_STRUCTURE: MenuCategory[] = [
  {
    name: 'Smartphones',
    slug: 'smartphones',
    subcategories: [
      {
        name: 'Par marque',
        slug: 'par-marque',
        brands: ['Samsung', 'Apple', 'Xiaomi', 'Honor', 'Oppo', 'OnePlus', 'Google', 'Nothing']
      },
      {
        name: 'Par gamme de prix',
        slug: 'par-prix',
        brands: ['Moins de 200€', '200€ - 500€', '500€ - 800€', 'Plus de 800€']
      },
      {
        name: 'Smartphones Gaming',
        slug: 'gaming',
        brands: ['ASUS ROG', 'RedMagic', 'Black Shark', 'Legion']
      },
      {
        name: 'Smartphones pliables',
        slug: 'pliables',
        brands: ['Samsung Galaxy Z', 'Motorola Razr', 'Oppo Find N']
      }
    ]
  },
  {
    name: 'Tablettes',
    slug: 'tablettes',
    subcategories: [
      {
        name: 'iPad',
        slug: 'ipad',
        brands: ['iPad Pro', 'iPad Air', 'iPad', 'iPad Mini']
      },
      {
        name: 'Tablettes Android',
        slug: 'android',
        brands: ['Samsung Galaxy Tab', 'Xiaomi Pad', 'Lenovo Tab', 'OnePlus Pad']
      },
      {
        name: 'Tablettes Gaming',
        slug: 'gaming-tablets',
        brands: ['ASUS ROG', 'Lenovo Legion']
      }
    ]
  },
  {
    name: 'Audio',
    slug: 'audio',
    subcategories: [
      {
        name: 'Écouteurs',
        slug: 'ecouteurs',
        brands: ['Monster', 'Apple AirPods', 'Samsung Galaxy Buds', 'Sony', 'JBL', 'Beats', 'Nothing Ear']
      },
      {
        name: 'Casques',
        slug: 'casques-audio',
        brands: ['Monster', 'MUVIT', 'Sony', 'Bose', 'JBL', 'Marshall', 'Beats', 'HyperX']
      },
      {
        name: 'Enceintes',
        slug: 'enceintes',
        brands: ['JBL', 'Sony', 'Bose', 'Marshall', 'Ultimate Ears', 'Harman Kardon']
      },
      {
        name: 'Gaming Audio',
        slug: 'gaming-audio',
        brands: ['Monster', 'HyperX', 'Razer', 'SteelSeries', 'Logitech G', 'ASUS ROG']
      }
    ]
  },
  {
    name: 'Montres',
    slug: 'montres',
    subcategories: [
      {
        name: 'Apple Watch',
        slug: 'apple-watch',
        brands: ['Series 9', 'SE', 'Ultra']
      },
      {
        name: 'Galaxy Watch',
        slug: 'galaxy-watch',
        brands: ['Watch 6', 'Watch 6 Classic', 'Watch FE']
      },
      {
        name: 'Montres Sport',
        slug: 'sport',
        brands: ['Garmin', 'Polar', 'Suunto', 'Fitbit']
      },
      {
        name: 'Montres connectées',
        slug: 'connectees',
        brands: ['Xiaomi', 'Amazfit', 'Honor', 'Huawei', 'OnePlus']
      }
    ]
  },
  {
    name: 'LED',
    slug: 'led',
    subcategories: [
      {
        name: 'Barre LED',
        slug: 'barre-led',
        brands: ['Philips Hue', 'Govee', 'Monster LED', 'LIFX']
      },
      {
        name: 'Néon',
        slug: 'neon',
        brands: ['Govee', 'Nanoleaf', 'Monster LED', 'Twinkly']
      },
      {
        name: 'Kits Éclairage',
        slug: 'kits-eclairage',
        brands: ['Philips Hue', 'LIFX', 'Razer Chroma', 'Elgato']
      },
      {
        name: 'Ampoules',
        slug: 'ampoules',
        brands: ['Philips Hue', 'LIFX', 'TP-Link Kasa', 'Yeelight']
      },
      {
        name: 'RGB',
        slug: 'rgb',
        brands: ['MY WAY', 'Monster LED', 'Razer Chroma', 'Govee']
      },
      {
        name: 'Cables Lumineux',
        slug: 'cables-lumineux',
        brands: ['MY WAY', 'Monster LED', 'Baseus', 'UGREEN']
      }
    ]
  },
  {
    name: 'Accessoires',
    slug: 'accessoires',
    subcategories: [
      {
        name: 'Coques & Protection',
        slug: 'coques-protection',
        brands: ['Spigen', 'OtterBox', 'UAG', 'Ringke', 'ESR', 'Monster Shield']
      },
      {
        name: 'Chargeurs',
        slug: 'chargeurs',
        brands: ['Anker', 'Belkin', 'Samsung', 'Apple', 'Baseus', 'Monster Charge']
      },
      {
        name: 'Câbles',
        slug: 'cables',
        brands: ['Anker', 'Belkin', 'Baseus', 'UGREEN', 'Monster Cable']
      },
      {
        name: 'Batteries externes',
        slug: 'batteries',
        brands: ['Anker', 'Xiaomi', 'Baseus', 'Monster Power']
      },
      {
        name: 'Supports',
        slug: 'supports',
        brands: ['Support voiture', 'Support bureau', 'Support vélo', 'Trépied']
      },
      {
        name: 'Gaming Mobile',
        slug: 'gaming-mobile',
        brands: ['Manettes', 'Triggers', 'Cooling fans', 'Grips']
      }
    ]
  }
];

/**
 * Mapping entre les slugs du menu et les catégories Supabase
 * Permet de maintenir la structure fixe tout en utilisant les données Supabase
 */
export const MENU_TO_SUPABASE_MAPPING: Record<string, string> = {
  'smartphones': 'smartphones',
  'tablettes': 'tablettes',
  'audio': 'audio',
  'montres': 'montres-connectees',
  'led': 'eclairage-led',
  'accessoires': 'accessoires',
  // Sous-catégories
  'par-marque': 'all-brands',
  'par-prix': 'by-price',
  'gaming': 'gaming-phones',
  'pliables': 'foldable-phones',
  'ipad': 'apple-ipad',
  'android': 'android-tablets',
  'gaming-tablets': 'gaming-tablets',
  'ecouteurs': 'earphones',
  'casques': 'headphones',
  'enceintes': 'speakers',
  'gaming-audio': 'gaming-audio',
  'apple-watch': 'apple-watch',
  'galaxy-watch': 'samsung-watch',
  'sport': 'sport-watches',
  'connectees': 'smartwatches',
  'gaming-led': 'gaming-lighting',
  'eclairage-intelligent': 'smart-lighting',
  'decoratives': 'decorative-led',
  'accessoires-led': 'led-accessories',
  'coques-protection': 'cases-protection',
  'chargeurs': 'chargers',
  'cables': 'cables',
  'batteries': 'power-banks',
  'supports': 'mounts-stands',
  'gaming-mobile': 'mobile-gaming'
};

/**
 * Obtenir le slug Supabase correspondant au slug du menu
 */
export function getSupabaseSlug(menuSlug: string): string {
  return MENU_TO_SUPABASE_MAPPING[menuSlug] || menuSlug;
}

/**
 * Obtenir la structure de menu pour une catégorie donnée
 */
export function getMenuCategory(slug: string): MenuCategory | undefined {
  return MENU_STRUCTURE.find(cat => cat.slug === slug);
}

/**
 * Obtenir toutes les sous-catégories d'une catégorie
 */
export function getSubcategories(categorySlug: string): MenuSubcategory[] {
  const category = getMenuCategory(categorySlug);
  return category?.subcategories || [];
}