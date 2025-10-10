'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { ProductFullView } from '@/lib/supabase/client';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
  addedAt?: number; // Timestamp d'ajout pour expiration
}

interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product | ProductFullView, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
  prepareOrderItems: () => { productId: string; variantId?: string; quantity: number }[];
  createOrder: (customerInfo: CustomerInfo) => Promise<{ success: boolean; order?: any; error?: string }>;
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
          const parsedCart: CartItem[] = JSON.parse(savedCart);
          const now = Date.now();
          const tenDaysInMs = 10 * 24 * 60 * 60 * 1000; // 10 jours en millisecondes

          // Filtrer les items expirés (plus de 10 jours)
          const validItems = parsedCart.filter(item => {
            if (!item.addedAt) return true; // Garde les items sans timestamp (ancien format)
            return (now - item.addedAt) < tenDaysInMs;
          });

          setItems(validItems);

          // Log si des items ont été supprimés
          if (validItems.length < parsedCart.length) {
            console.log(`🗑️ ${parsedCart.length - validItems.length} article(s) expiré(s) supprimé(s) du panier`);
          }
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

  const addToCart = (product: Product | ProductFullView, quantity = 1, variant?: string) => {
    // Convertir ProductFullView en Product si nécessaire
    const productToAdd: Product = 'category_id' in product 
      ? supabaseProductToLegacy(product as ProductFullView)
      : product as Product;
    
    // Vérifier le stock disponible
    let availableStock = 0;

    if (productToAdd.variants && productToAdd.variants.length > 0 && variant) {
      // Si le produit a des variants, vérifier le stock du variant spécifique
      const selectedVariant = productToAdd.variants?.find(v => v.color === variant);
      if (!selectedVariant) {
        console.error(`Variant ${variant} non trouvé pour le produit ${productToAdd.name}`);
        return;
      }
      availableStock = selectedVariant.stock || 0;
    } else if (productToAdd.stockQuantity !== undefined) {
      // Produit sans variants: utiliser stockQuantity
      availableStock = productToAdd.stockQuantity;
    } else {
      // Fallback: utiliser le stock total des variantes
      availableStock = productToAdd.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
    }
    
    // Vérifier si le stock est suffisant
    if (availableStock === 0) {
      console.error(`Produit en rupture de stock: ${productToAdd.name}`);
      return;
    }
    
    setItems(currentItems => {
      // Pour les tests avec variants, on vérifie si le produit avec ce variant existe déjà
      const existingItemIndex = currentItems.findIndex(item => 
        item.product.id === productToAdd.id && 
        (variant ? item.variant === variant : !item.variant)
      );

      if (existingItemIndex !== -1) {
        // Le produit existe déjà, vérifier si on peut ajouter la quantité demandée
        const currentQuantity = currentItems[existingItemIndex].quantity;
        const newQuantity = Math.min(currentQuantity + quantity, availableStock);
        
        if (newQuantity === currentQuantity) {
          console.warn(`Stock insuffisant pour ${productToAdd.name}. Maximum disponible: ${availableStock}`);
          return currentItems; // Pas de changement si le stock est insuffisant
        }
        
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity,
          addedAt: newItems[existingItemIndex].addedAt || Date.now() // Garde l'ancien timestamp ou crée un nouveau
        };
        return newItems;
      } else {
        // Nouveau produit ou nouvelle variante
        const quantityToAdd = Math.min(quantity, availableStock);
        if (quantityToAdd === 0) {
          console.warn(`Stock insuffisant pour ${productToAdd.name}`);
          return currentItems;
        }
        return [...currentItems, {
          product: productToAdd,
          quantity: quantityToAdd,
          variant,
          addedAt: Date.now() // Timestamp d'ajout pour expiration 10 jours
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item => {
        if (item.product.id === productId && 
            (variant ? item.variant === variant : !item.variant)) {
          // Vérifier le stock disponible
          let availableStock = 0;

          if (item.product.variants && item.product.variants.length > 0 && item.variant) {
            const selectedVariant = item.product.variants?.find(v => v.color === item.variant);
            availableStock = selectedVariant?.stock || 0;
          } else if (item.product.stockQuantity !== undefined) {
            // Produit sans variants: utiliser stockQuantity
            availableStock = item.product.stockQuantity;
          } else {
            availableStock = item.product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
          }
          
          // Limiter la quantité au stock disponible
          const newQuantity = Math.min(quantity, availableStock);
          
          if (newQuantity === 0) {
            console.warn(`Stock insuffisant pour ${item.product.name}`);
            return item;
          }
          
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      // Assurer la conversion en nombre pour éviter NaN
      const price = typeof item.product.price === 'string' 
        ? parseFloat(item.product.price) 
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.product.id === productId);
  };

  /**
   * Prépare les données du panier pour deductStockAfterOrder()
   * Retourne un tableau avec productId, variantId (si applicable), et quantity
   */
  const prepareOrderItems = () => {
    return items.map(item => {
      // Trouver le variantId si un variant color est spécifié
      let variantId: string | undefined;

      if (item.variant && item.product.variants) {
        const selectedVariant = item.product.variants.find(v => v.color === item.variant);
        variantId = selectedVariant?.id; // ID Supabase du variant
      }

      return {
        productId: item.product.id,
        variantId,
        quantity: item.quantity
      };
    });
  };

  /**
   * Crée une commande avec les articles du panier
   * Appelle l'API /api/orders/create qui:
   * 1. Crée la commande dans Supabase
   * 2. Crée les order_items
   * 3. Déduit le stock automatiquement
   */
  const createOrder = async (customerInfo: CustomerInfo) => {
    try {
      // Préparer les données de la commande
      const orderItems = items.map(item => {
        let variantId: string | undefined;

        if (item.variant && item.product.variants) {
          const selectedVariant = item.product.variants.find(v => v.color === item.variant);
          variantId = selectedVariant?.id;
        }

        const price = typeof item.product.price === 'string'
          ? parseFloat(item.product.price)
          : item.product.price;

        return {
          productId: item.product.id,
          variantId,
          quantity: item.quantity,
          price,
          productName: item.product.name,
          variantColor: item.variant,
        };
      });

      const totalAmount = getCartTotal();

      // Appeler l'API de création de commande
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          items: orderItems,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Erreur lors de la création de la commande',
        };
      }

      // Commande créée avec succès, vider le panier
      clearCart();

      return {
        success: true,
        order: data.order,
      };
    } catch (error) {
      console.error('Erreur createOrder:', error);
      return {
        success: false,
        error: 'Erreur réseau lors de la création de la commande',
      };
    }
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
    prepareOrderItems,
    createOrder,
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