/**
 * Hooks React pour Supabase
 * Facilite l'utilisation des données Supabase dans les composants React
 */

import { useState, useEffect } from 'react';
import {
  getActiveProducts,
  getProductBySlug,
  getProductsByCategory,
  getProductsByBrand,
  getProductsByCollection,
  getDiscountedProducts,
  getNewProducts,
  getBestSellers,
  getSimilarProducts,
  getAllBrands,
  getAllCategories,
  getActiveCollections,
  getProductReviews,
  searchProducts,
} from './api';
import type { ProductFullView, DatabaseBrand, DatabaseCollection } from './client';

// ========================================
// HOOKS PRODUITS
// ========================================

/**
 * Hook pour récupérer les produits actifs
 */
export function useProducts(options?: {
  limit?: number;
  offset?: number;
  sortBy?: 'price' | 'name' | 'created_at' | 'rating';
  sortOrder?: 'asc' | 'desc';
}) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getActiveProducts(options);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options?.limit, options?.offset, options?.sortBy, options?.sortOrder]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer un produit par son slug
 */
export function useProduct(slug: string) {
  const [product, setProduct] = useState<ProductFullView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

/**
 * Hook pour récupérer les produits d'une catégorie
 */
export function useProductsByCategory(categorySlug: string, options?: {
  limit?: number;
  offset?: number;
  includeSubcategories?: boolean;
}) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!categorySlug) return;
      
      try {
        setLoading(true);
        const data = await getProductsByCategory(categorySlug, options);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categorySlug, options?.limit, options?.offset, options?.includeSubcategories]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer les produits d'une marque
 */
export function useProductsByBrand(brandSlug: string, options?: {
  limit?: number;
  offset?: number;
}) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!brandSlug) return;
      
      try {
        setLoading(true);
        const data = await getProductsByBrand(brandSlug, options);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [brandSlug, options?.limit, options?.offset]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer les produits d'une collection
 */
export function useProductsByCollection(collectionSlug: string) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!collectionSlug) return;
      
      try {
        setLoading(true);
        const data = await getProductsByCollection(collectionSlug);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [collectionSlug]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer les produits en promotion
 */
export function useDiscountedProducts(minDiscount: number = 10) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getDiscountedProducts(minDiscount);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [minDiscount]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer les nouveautés
 */
export function useNewProducts(days: number = 30, limit: number = 10) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getNewProducts(days, limit);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [days, limit]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer les meilleures ventes
 */
export function useBestSellers(limit: number = 10) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getBestSellers(limit);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer les produits similaires
 */
export function useSimilarProducts(productId: string, limit: number = 4) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!productId) return;
      
      try {
        setLoading(true);
        const data = await getSimilarProducts(productId, limit);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [productId, limit]);

  return { products, loading, error };
}

/**
 * Hook pour la recherche de produits
 */
export function useProductSearch(query: string, options?: {
  limit?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function search() {
      if (!query || query.length < 2) {
        setProducts([]);
        return;
      }
      
      try {
        setLoading(true);
        const data = await searchProducts(query, options);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    // Debounce la recherche
    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [query, options?.limit, options?.category, options?.brand, options?.minPrice, options?.maxPrice]);

  return { products, loading, error };
}

// ========================================
// HOOKS MARQUES
// ========================================

/**
 * Hook pour récupérer toutes les marques
 */
export function useBrands() {
  const [brands, setBrands] = useState<DatabaseBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        const data = await getAllBrands();
        setBrands(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  return { brands, loading, error };
}

// ========================================
// HOOKS CATÉGORIES
// ========================================

/**
 * Hook pour récupérer toutes les catégories
 */
export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// ========================================
// HOOKS COLLECTIONS
// ========================================

/**
 * Hook pour récupérer les collections actives
 */
export function useCollections() {
  const [collections, setCollections] = useState<DatabaseCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        const data = await getActiveCollections();
        setCollections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return { collections, loading, error };
}

// ========================================
// HOOKS AVIS
// ========================================

/**
 * Hook pour récupérer les avis d'un produit
 */
export function useProductReviews(productId: string, options?: {
  limit?: number;
  offset?: number;
  sortBy?: 'recent' | 'helpful' | 'rating_high' | 'rating_low';
}) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      if (!productId) return;
      
      try {
        setLoading(true);
        const data = await getProductReviews(productId, options);
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [productId, options?.limit, options?.offset, options?.sortBy]);

  return { reviews, loading, error };
}