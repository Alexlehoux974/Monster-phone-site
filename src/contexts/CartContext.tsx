'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, initialItems }: { children: ReactNode; initialItems?: CartItem[] }) {
  const [items, setItems] = useState<CartItem[]>(initialItems || []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    // Si on a des items initiaux (tests), ne pas charger depuis localStorage
    if (!initialItems) {
      const savedCart = localStorage.getItem('monsterphone-cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Erreur lors du chargement du panier:', error);
        }
      }
    }
    setIsLoaded(true);
  }, [initialItems]);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('monsterphone-cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setItems(currentItems => {
      // Pour les tests avec variants, on vérifie si le produit avec ce variant existe déjà
      const existingItemIndex = currentItems.findIndex(item => 
        item.product.id === product.id && 
        (variant ? item.variant === variant : !item.variant)
      );

      if (existingItemIndex !== -1) {
        // Le produit existe déjà, on met à jour la quantité
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      } else {
        // Nouveau produit ou nouvelle variante
        return [...currentItems, { product, quantity, variant }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price?.replace('€', '') || '0');
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.product.id === productId);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}