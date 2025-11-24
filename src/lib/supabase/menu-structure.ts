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
 * Structure de menu fixe - Organisation par catégories
 * Les slugs sont mappés vers les catégories/sous-catégories Supabase
 */
export const MENU_STRUCTURE: MenuCategory[] = [
  {
    name: 'Smartphones',
    slug: 'smartphones',
    // Pas de subcategories - affichage direct des produits
  },
  {
    name: 'Tablettes',
    slug: 'tablettes',
    // Pas de subcategories - affichage direct des produits
  },
  {
    name: 'Audio',
    slug: 'audio',
    subcategories: [
      {
        name: 'Écouteurs',
        slug: 'ecouteurs',
      },
      {
        name: 'Enceintes',
        slug: 'enceintes',
      },
      {
        name: 'Casques',
        slug: 'casques',
      },
      {
        name: 'Micro',
        slug: 'micro',
      }
    ]
  },
  {
    name: 'Montres',
    slug: 'montres',
    subcategories: [
      {
        name: 'Montres connectées',
        slug: 'connectees',
      },
      {
        name: 'Montres Sport',
        slug: 'sport',
      }
    ]
  },
  {
    name: 'LED',
    slug: 'led',
    // Pas de subcategories - affichage direct des produits
  },
  {
    name: 'Accessoires',
    slug: 'accessoires',
    subcategories: [
      {
        name: 'Câbles',
        slug: 'cables',
      },
      {
        name: 'Chargeurs',
        slug: 'chargeurs',
      },
      {
        name: 'Batteries externes',
        slug: 'batteries',
      },
      {
        name: 'Divers',
        slug: 'divers',
      }
    ]
  }
];

/**
 * Mapping entre les slugs du menu et les catégories Supabase
 * Permet de maintenir la structure fixe tout en utilisant les données Supabase
 */
export const MENU_TO_SUPABASE_MAPPING: Record<string, string> = {
  // Catégories principales
  'smartphones': 'smartphones',
  'tablettes': 'tablettes',
  'audio': 'audio',
  'montres': 'montres',
  'led': 'led',
  'accessoires': 'accessoires',

  // Sous-catégories Audio
  'ecouteurs': 'ecouteurs',
  'enceintes': 'enceintes',
  'casques': 'casques-audio',
  'micro': 'micro',

  // Sous-catégories Montres
  'connectees': 'montres-connectees',
  'sport': 'montres-sport',

  // Sous-catégories Accessoires
  'cables': 'cables',
  'chargeurs': 'chargeurs',
  'batteries': 'batteries-externes',
  'divers': 'accessoires-divers',
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
