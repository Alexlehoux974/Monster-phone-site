/**
 * Utility functions for handling product images
 */

/**
 * Map product categories to placeholder images
 */
const categoryPlaceholders: Record<string, string> = {
  'Smartphones': '/placeholder-monster.svg',
  'Audio & Son': '/placeholder-monster.svg',
  'Audio': '/placeholder-monster.svg',
  'Chargement & Énergie': '/placeholder-monster.svg',
  'Créativité & Enfants': '/placeholder-monster.svg',
  'Tablettes': '/placeholder-monster.svg',
  'Écouteurs': '/placeholder-monster.svg',
  'Casques': '/placeholder-monster.svg',
  'Enceintes': '/placeholder-monster.svg',
  'Montres connectées': '/placeholder-monster.svg',
  'LED': '/placeholder-monster.svg',
  'Accessoires': '/placeholder-monster.svg',
  'default': '/placeholder-monster.svg'
};

/**
 * Get a placeholder image based on product category
 */
export function getCategoryPlaceholder(category: string): string {
  return categoryPlaceholders[category] || categoryPlaceholders.default;
}

/**
 * Check if URL is a GitHub raw URL that might have issues
 */
export function isProblematicGitHubUrl(url: string): boolean {
  return url ? url.includes('raw.githubusercontent.com') : false;
}

/**
 * Transform image URL to use a proxy or alternative source
 * Converts Cloudinary IDs to full URLs
 */
export function getWorkingImageUrl(originalUrl: string, productCategory?: string): string {
  // If no URL provided, return placeholder
  if (!originalUrl) {
    return getCategoryPlaceholder(productCategory || 'default');
  }

  // Check if it's a Cloudinary ID (doesn't start with http)
  if (!originalUrl.startsWith('http')) {
    return `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${originalUrl}.png`;
  }

  // Return the URL as-is for full URLs
  return originalUrl;
}

/**
 * Generate a dynamic placeholder with product initials
 */
export function generateProductPlaceholder(productName: string, category: string): string {
  // For now, return category-based placeholder
  // In the future, this could generate SVG data URLs with product initials
  return getCategoryPlaceholder(category);
}