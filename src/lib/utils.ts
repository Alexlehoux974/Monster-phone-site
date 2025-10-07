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
export function isFeaturedProduct(product: { badges?: string[]; price: number }): boolean {
  const hasPrestigiousBadge = product.badges?.some(badge =>
    badge.includes('Bestseller') ||
    badge.includes('Best-seller') ||
    badge.includes('Nouveau') ||
    badge.includes('Premium')
  );

  // Produit avec badge prestigieux OU prix élevé (>500€)
  return hasPrestigiousBadge || product.price >= 500;
}

/**
 * Tri intelligent des produits par priorité
 * Ordre: En stock > Phares > Prix décroissant > Rupture de stock
 */
export function sortProductsByPriority<T extends { variants?: { stock: number }[]; stockQuantity?: number; badges?: string[]; price: number }>(
  products: T[]
): T[] {
  return [...products].sort((a, b) => {
    const aInStock = hasStock(a);
    const bInStock = hasStock(b);
    const aIsFeatured = isFeaturedProduct(a);
    const bIsFeatured = isFeaturedProduct(b);

    // 1. Produits en stock d'abord
    if (aInStock !== bInStock) {
      return aInStock ? -1 : 1;
    }

    // 2. Parmi les produits en stock (ou hors stock), produits phares d'abord
    if (aIsFeatured !== bIsFeatured) {
      return aIsFeatured ? -1 : 1;
    }

    // 3. Trier par prix décroissant (produits premium en premier)
    return b.price - a.price;
  });
}