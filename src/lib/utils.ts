import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formater le prix en euros
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
}

/**
 * Extraire les URLs des images depuis le champ GitHub
 */
export function parseGitHubImages(githubImagesString: string): string[] {
  if (!githubImagesString) return [];
  
  return githubImagesString
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);
}

/**
 * Générer un slug à partir d'une chaîne
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Tronquer un texte
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Vérifier si un produit est complètement en rupture de stock
 * Pour les produits avec variants: TOUS les variants doivent être en rupture
 * Pour les produits sans variants: stockQuantity doit être 0, null ou undefined
 */
export function isCompletelyOutOfStock(product: { variants?: { stock: number }[]; stockQuantity?: number }): boolean {
  // Produit avec variants: vérifier si TOUS sont en rupture
  if (product.variants && product.variants.length > 0) {
    return product.variants.every(variant => (variant.stock ?? 0) === 0);
  }

  // Produit sans variants: vérifier stockQuantity (traiter null/undefined comme 0)
  return (product.stockQuantity ?? 0) === 0;
}

/**
 * Vérifier si un produit a du stock disponible
 */
export function hasStock(product: { variants?: { stock: number }[]; stockQuantity?: number }): boolean {
  return !isCompletelyOutOfStock(product);
}

/**
 * Vérifier si un produit est un produit phare/prestigieux
 * Basé sur les badges et le prix
 */
export function isFeaturedProduct(product: { badges?: string[]; price?: number; basePrice?: number }): boolean {
  const hasPrestigiousBadge = product.badges?.some(badge =>
    badge.includes('Bestseller') ||
    badge.includes('Best-seller') ||
    badge.includes('Nouveau') ||
    badge.includes('Premium')
  );

  const productPrice = product.basePrice ?? product.price ?? 0;
  // Produit avec badge prestigieux OU prix élevé (>500€)
  return hasPrestigiousBadge || productPrice >= 500;
}

// IDs des catégories prioritaires pour la page d'accueil
const PRIORITY_CATEGORY_IDS = [
  '3fa6e04b-2cab-46db-8a85-f6865909d51c', // Écouteurs
  '80194285-ea90-40ff-8e2a-8edbe3609330', // Smartphones
  '1273f118-da30-41c3-818e-c7cb1b1c1b19', // Smartphones Gaming
  '6a9f5e42-d28c-433e-9c0c-29ee2f264ee0', // Smartphones 5G
];

/**
 * Tri intelligent des produits par priorité
 * Ordre: En stock > Catégories prioritaires (Smartphones/Écouteurs) > Phares > Prix décroissant > Rupture de stock
 */
export function sortProductsByPriority<T extends { variants?: { stock: number }[]; stockQuantity?: number; badges?: string[]; price?: number; basePrice?: number; categoryId?: string }>(
  products: T[]
): T[] {
  return [...products].sort((a, b) => {
    const aInStock = hasStock(a);
    const bInStock = hasStock(b);
    const aIsFeatured = isFeaturedProduct(a);
    const bIsFeatured = isFeaturedProduct(b);
    const aIsPriority = PRIORITY_CATEGORY_IDS.includes(a.categoryId || '');
    const bIsPriority = PRIORITY_CATEGORY_IDS.includes(b.categoryId || '');

    // 1. Produits en stock d'abord
    if (aInStock !== bInStock) {
      return aInStock ? -1 : 1;
    }

    // 2. Parmi les produits en stock, catégories prioritaires (smartphones/écouteurs) d'abord
    if (aIsPriority !== bIsPriority) {
      return aIsPriority ? -1 : 1;
    }

    // 3. Produits phares d'abord
    if (aIsFeatured !== bIsFeatured) {
      return aIsFeatured ? -1 : 1;
    }

    // 4. Trier par prix décroissant (produits premium en premier)
    const aPrice = a.basePrice ?? a.price ?? 0;
    const bPrice = b.basePrice ?? b.price ?? 0;
    return bPrice - aPrice;
  });
}