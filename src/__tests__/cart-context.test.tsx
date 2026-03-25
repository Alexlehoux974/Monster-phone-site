import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import type { ReactNode } from 'react';

// Mock product pour les tests
const mockProduct = {
  id: 'prod-1',
  name: 'HONOR Magic6 Pro',
  urlSlug: 'honor-magic6-pro',
  brandName: 'HONOR',
  categoryName: 'Smartphones',
  basePrice: 499.99,
  originalPrice: 599.99,
  discountPercent: 17,
  shortDescription: 'Smartphone premium',
  variants: [
    {
      id: 'var-1',
      color: 'Noir',
      colorCode: '#000000',
      stock: 5,
      images: ['/images/magic6-noir.jpg'],
    },
    {
      id: 'var-2',
      color: 'Bleu',
      colorCode: '#0000FF',
      stock: 0,
      images: ['/images/magic6-bleu.jpg'],
    },
  ],
  images: ['/images/magic6-noir.jpg'],
  specifications: [],
  highlights: [],
  badges: [],
};

const mockProduct2 = {
  ...mockProduct,
  id: 'prod-2',
  name: 'HONOR Pad 9',
  urlSlug: 'honor-pad-9',
  categoryName: 'Tablettes',
  basePrice: 299.99,
  variants: [
    {
      id: 'var-3',
      color: 'Gris',
      colorCode: '#808080',
      stock: 3,
      images: ['/images/pad9-gris.jpg'],
    },
  ],
};

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider initialItems={[]}>{children}</CartProvider>;
}

describe('CartContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should start with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should add a product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.getItemCount()).toBe(1);
    expect(result.current.items[0].product.name).toBe('HONOR Magic6 Pro');
    expect(result.current.items[0].variant).toBe('Noir');
  });

  it('should not add out-of-stock variant', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Bleu');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should increment quantity when adding same product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });
    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.getItemCount()).toBe(2);
  });

  it('should not exceed available stock', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 10, 'Noir');
    });

    // Stock is 5, so quantity should be capped at 5
    expect(result.current.items[0].quantity).toBe(5);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });
    act(() => {
      result.current.removeFromCart('prod-1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });
    act(() => {
      result.current.updateQuantity('prod-1', 3, 'Noir');
    });

    expect(result.current.items[0].quantity).toBe(3);
  });

  it('should remove item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });
    act(() => {
      result.current.updateQuantity('prod-1', 0, 'Noir');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2, 'Noir');
    });
    act(() => {
      result.current.addToCart(mockProduct2, 1, 'Gris');
    });

    // 2 * 499.99 + 1 * 299.99 = 1299.97
    expect(result.current.getCartTotal()).toBeCloseTo(1299.97, 2);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
      result.current.addToCart(mockProduct2, 1, 'Gris');
    });
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should check if product is in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1, 'Noir');
    });

    expect(result.current.isInCart('prod-1')).toBe(true);
    expect(result.current.isInCart('prod-2')).toBe(false);
  });

  it('should handle different variants as separate items', () => {
    const multiVariantProduct = {
      ...mockProduct,
      variants: [
        { id: 'var-1', color: 'Noir', colorCode: '#000', stock: 5, images: [] },
        { id: 'var-4', color: 'Rouge', colorCode: '#F00', stock: 3, images: [] },
      ],
    };

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(multiVariantProduct, 1, 'Noir');
    });
    act(() => {
      result.current.addToCart(multiVariantProduct, 2, 'Rouge');
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.getItemCount()).toBe(3);
  });

  it('should prepare order items correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 2, 'Noir');
    });

    const orderItems = result.current.prepareOrderItems();
    expect(orderItems).toHaveLength(1);
    expect(orderItems[0]).toEqual({
      productId: 'prod-1',
      variantId: 'var-1',
      quantity: 2,
    });
  });
});
