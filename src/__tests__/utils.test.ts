import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  generateSlug,
  truncateText,
  isCompletelyOutOfStock,
  hasStock,
  isFeaturedProduct,
  parseGitHubImages,
} from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price in EUR', () => {
    const result = formatPrice(499.99);
    expect(result).toContain('499,99');
    expect(result).toContain('€');
  });

  it('should handle zero', () => {
    const result = formatPrice(0);
    expect(result).toContain('0,00');
  });
});

describe('generateSlug', () => {
  it('should convert text to slug', () => {
    expect(generateSlug('HONOR Magic6 Pro')).toBe('honor-magic6-pro');
  });

  it('should remove accents', () => {
    expect(generateSlug('Écouteurs Bluetooth')).toBe('ecouteurs-bluetooth');
  });

  it('should remove special characters', () => {
    expect(generateSlug('Produit (2024) - Édition Spéciale!')).toBe('produit-2024-edition-speciale');
  });

  it('should collapse multiple dashes', () => {
    expect(generateSlug('a   b   c')).toBe('a-b-c');
  });
});

describe('truncateText', () => {
  it('should not truncate short text', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('should truncate long text with ellipsis', () => {
    expect(truncateText('Hello World Test', 10)).toBe('Hello Worl...');
  });
});

describe('isCompletelyOutOfStock', () => {
  it('should return true when all variants have stock 0', () => {
    expect(isCompletelyOutOfStock({
      variants: [{ stock: 0 }, { stock: 0 }],
    })).toBe(true);
  });

  it('should return false when any variant has stock', () => {
    expect(isCompletelyOutOfStock({
      variants: [{ stock: 0 }, { stock: 3 }],
    })).toBe(false);
  });

  it('should return true when no variants and stockQuantity is 0', () => {
    expect(isCompletelyOutOfStock({ stockQuantity: 0 })).toBe(true);
  });

  it('should return false when no variants and stockQuantity > 0', () => {
    expect(isCompletelyOutOfStock({ stockQuantity: 5 })).toBe(false);
  });

  it('should treat undefined stockQuantity as 0', () => {
    expect(isCompletelyOutOfStock({})).toBe(true);
  });
});

describe('hasStock', () => {
  it('should return true when product has stock', () => {
    expect(hasStock({ variants: [{ stock: 5 }] })).toBe(true);
  });

  it('should return false when product is out of stock', () => {
    expect(hasStock({ variants: [{ stock: 0 }] })).toBe(false);
  });
});

describe('isFeaturedProduct', () => {
  it('should return true for products with Bestseller badge', () => {
    expect(isFeaturedProduct({ badges: ['Bestseller'], basePrice: 100 })).toBe(true);
  });

  it('should return true for products with Premium badge', () => {
    expect(isFeaturedProduct({ badges: ['Premium'], basePrice: 100 })).toBe(true);
  });

  it('should return true for expensive products (>= 500)', () => {
    expect(isFeaturedProduct({ badges: [], basePrice: 599 })).toBe(true);
  });

  it('should return false for cheap products without badges', () => {
    expect(isFeaturedProduct({ badges: [], basePrice: 29.99 })).toBe(false);
  });
});

describe('parseGitHubImages', () => {
  it('should parse newline-separated URLs', () => {
    const result = parseGitHubImages('https://img1.jpg\nhttps://img2.jpg');
    expect(result).toEqual(['https://img1.jpg', 'https://img2.jpg']);
  });

  it('should handle empty string', () => {
    expect(parseGitHubImages('')).toEqual([]);
  });

  it('should trim whitespace', () => {
    const result = parseGitHubImages('  https://img1.jpg  \n  https://img2.jpg  ');
    expect(result).toEqual(['https://img1.jpg', 'https://img2.jpg']);
  });
});
