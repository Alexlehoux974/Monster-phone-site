'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContextSimple';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  product_id: string;
  variant_id?: string;
  added_at: string;
  products?: {
    id: string;
    name: string;
    url_slug: string;
    price: number;
    original_price?: number;
    discount?: number;
    status: string;
  };
  product_variants?: {
    id: string;
    color: string;
    color_code?: string;
    stock: number;
  };
  image?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  isLoading: boolean;
  isInWishlist: (productId: string, variantId?: string) => boolean;
  addToWishlist: (productId: string, variantId?: string) => Promise<void>;
  removeFromWishlist: (productId: string, variantId?: string) => Promise<void>;
  toggleWishlist: (productId: string, variantId?: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger la wishlist quand l'utilisateur se connecte
  const refreshWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/user/wishlist');
      if (response.ok) {
        const data = await response.json();
        setItems(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  // Vérifier si un produit est dans la wishlist
  const isInWishlist = useCallback((productId: string, variantId?: string): boolean => {
    return items.some(item =>
      item.product_id === productId &&
      (variantId ? item.variant_id === variantId : true)
    );
  }, [items]);

  // Ajouter à la wishlist
  const addToWishlist = useCallback(async (productId: string, variantId?: string) => {
    if (!isAuthenticated) {
      toast.error('Connectez-vous pour ajouter des favoris');
      return;
    }

    try {
      const response = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, variant_id: variantId }),
      });

      if (response.ok) {
        toast.success('Ajouté aux favoris');
        await refreshWishlist();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Erreur lors de l\'ajout aux favoris');
    }
  }, [isAuthenticated, refreshWishlist]);

  // Retirer de la wishlist
  const removeFromWishlist = useCallback(async (productId: string, variantId?: string) => {
    if (!isAuthenticated) return;

    try {
      const params = new URLSearchParams({ product_id: productId });
      if (variantId) params.append('variant_id', variantId);

      const response = await fetch(`/api/user/wishlist?${params.toString()}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Retiré des favoris');
        await refreshWishlist();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Erreur lors de la suppression');
    }
  }, [isAuthenticated, refreshWishlist]);

  // Toggle wishlist (add if not present, remove if present)
  const toggleWishlist = useCallback(async (productId: string, variantId?: string) => {
    if (isInWishlist(productId, variantId)) {
      await removeFromWishlist(productId, variantId);
    } else {
      await addToWishlist(productId, variantId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  const value: WishlistContextType = {
    items,
    isLoading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    refreshWishlist,
    itemCount: items.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
