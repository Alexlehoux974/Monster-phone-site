// Types pour Monster Phone Boutique

export interface Product {
  id: string;
  'Nom du Produit': string;
  'Marque': 'MUVIT' | 'MY WAY' | 'MONSTER' | 'HONOR' | 'HIFUTURE';
  'Catégorie': string;
  'SKU': string;
  'Description SEO': string;
  'Meta Title': string;
  'Meta Description': string;
  'URL Slug': string;
  'Mots-clés SEO': string;
  'Images GitHub': string;
  'Variantes/Couleurs': string;
  'Prix'?: number;
  'Statut Publication': 'Brouillon' | 'En révision' | 'Publié' | 'Non publié';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Brand {
  name: string;
  logo: string;
  count: number;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface FilterOptions {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  inStock?: boolean;
}