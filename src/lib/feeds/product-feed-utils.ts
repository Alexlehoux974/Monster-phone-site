/**
 * Utilitaires pour la génération des flux produits (Google Merchant Center, Meta)
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://monsterphone.re';
const CLOUDINARY_BASE = 'https://res.cloudinary.com/monster-phone/image/upload';

/**
 * Formate le prix pour les feeds (ex: "299.99 EUR")
 */
export function formatFeedPrice(price: number | string, currency = 'EUR'): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${numPrice.toFixed(2)} ${currency}`;
}

/**
 * Détermine la disponibilité pour les feeds
 */
export function getAvailability(stock: number): 'in_stock' | 'out_of_stock' | 'preorder' {
  if (stock > 0) return 'in_stock';
  return 'out_of_stock';
}

/**
 * Génère l'URL complète du produit
 */
export function getProductUrl(urlSlug: string): string {
  return `${SITE_URL}/produit/${urlSlug}`;
}

/**
 * Génère l'URL complète de l'image Cloudinary
 */
export function getImageUrl(imageId: string): string {
  if (!imageId) return '';

  // Si c'est déjà une URL complète, la retourner
  if (imageId.startsWith('http')) {
    return imageId;
  }

  // Sinon, construire l'URL Cloudinary
  return `${CLOUDINARY_BASE}/v1/${imageId}.png`;
}

/**
 * Échappe les caractères spéciaux XML
 */
export function escapeXml(text: string | null | undefined): string {
  if (!text) return '';

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Nettoie la description pour les feeds (enlève le HTML, limite la longueur)
 */
export function cleanDescription(description: string | null | undefined, maxLength = 5000): string {
  if (!description) return '';

  // Supprimer les tags HTML
  let cleaned = description.replace(/<[^>]*>/g, '');

  // Supprimer les retours à la ligne multiples
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // Limiter la longueur
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength - 3) + '...';
  }

  return cleaned.trim();
}

/**
 * Génère un identifiant unique pour un produit + variant
 */
export function generateItemId(productId: string, variantId?: string): string {
  if (variantId) {
    return `${productId}_${variantId}`;
  }
  return productId;
}

/**
 * Mappe une catégorie Monster Phone vers une catégorie Google
 * https://support.google.com/merchants/answer/6324436
 */
export function getGoogleProductCategory(categoryName: string): string {
  const categoryMap: Record<string, string> = {
    'Smartphones': 'Electronics > Communications > Telephony > Mobile Phones',
    'Téléphones': 'Electronics > Communications > Telephony > Mobile Phones',
    'Accessoires': 'Electronics > Electronics Accessories',
    'Audio': 'Electronics > Audio > Headphones & Earbuds',
    'Casques': 'Electronics > Audio > Headphones & Earbuds',
    'Écouteurs': 'Electronics > Audio > Headphones & Earbuds',
    'Montres': 'Electronics > Wearable Technology > Smartwatches',
    'Protection': 'Electronics > Electronics Accessories > Mobile Phone Accessories > Mobile Phone Cases',
    'Chargeurs': 'Electronics > Electronics Accessories > Power Accessories > Power Adapters & Chargers',
    'Câbles': 'Electronics > Electronics Accessories > Computer Accessories > Computer Cable Adapters',
    'Enceintes': 'Electronics > Audio > Speakers',
  };

  return categoryMap[categoryName] || 'Electronics > Communications > Telephony > Mobile Phones';
}

/**
 * Calcule le prix final avec réduction
 */
export function calculateFinalPrice(basePrice: number, discountPercent?: number): number {
  if (!discountPercent || discountPercent <= 0) {
    return basePrice;
  }
  return basePrice * (1 - discountPercent / 100);
}

/**
 * Interface pour un produit formaté pour le feed
 */
export interface FeedProduct {
  id: string;
  title: string;
  description: string;
  link: string;
  image_link: string;
  additional_image_links: string[];
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  price: string;
  sale_price?: string;
  brand: string;
  gtin?: string;
  mpn?: string;
  condition: 'new' | 'refurbished' | 'used';
  google_product_category: string;
  item_group_id?: string;
  color?: string;
  shipping_weight?: string;
}
