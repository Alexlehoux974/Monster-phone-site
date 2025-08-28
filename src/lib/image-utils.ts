/**
 * Utility functions for handling product images
 */

/**
 * Map product categories to placeholder images
 */
const categoryPlaceholders: Record<string, string> = {
  'Smartphones': '/placeholder-phone.svg',
  'Audio & Son': '/placeholder-audio.svg',
  'Chargement & Énergie': '/placeholder-charger.svg',
  'Créativité & Enfants': '/placeholder-creative.svg',
  'default': '/placeholder-product.svg'
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
 * For now, this returns the placeholder based on category
 */
export function getWorkingImageUrl(originalUrl: string, productCategory?: string): string {
  // If no URL provided, return placeholder
  if (!originalUrl) {
    return getCategoryPlaceholder(productCategory || 'default');
  }
  
  // Return the URL as-is, including GitHub raw URLs
  // GitHub raw URLs are now working properly
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