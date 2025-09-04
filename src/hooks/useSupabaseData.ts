'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  getActiveProducts, 
  getProductsByCategory, 
  getProductsByBrand,
  getAllBrands,
  getAllCategories,
  getBestSellers,
  getDiscountedProducts,
  getNewProducts
} from '@/lib/supabase/api';
import { ProductFullView, createClient } from '@/lib/supabase/client';
import { MENU_STRUCTURE, getSupabaseSlug } from '@/lib/supabase/menu-structure';

/**
 * Hook pour récupérer les produits depuis Supabase avec cache
 */
export function useSupabaseProducts(options?: {
  category?: string;
  brand?: string;
  limit?: number;
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
        let data: ProductFullView[] = [];
        
        if (options?.category) {
          const supabaseSlug = getSupabaseSlug(options.category);
          data = await getProductsByCategory(supabaseSlug, {
            limit: options.limit,
            includeSubcategories: true
          });
        } else if (options?.brand) {
          data = await getProductsByBrand(options.brand, {
            limit: options.limit
          });
        } else {
          data = await getActiveProducts(options);
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Erreur récupération produits:', err);
        setError('Impossible de charger les produits');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options?.category, options?.brand, options?.limit, options?.sortBy, options?.sortOrder]);

  return { products, loading, error };
}

/**
 * Hook pour récupérer la structure de menu avec les produits
 */
export function useSupabaseMenu() {
  const [menuData, setMenuData] = useState(MENU_STRUCTURE);
  const [loading, setLoading] = useState(false);
  const [productsCache, setProductsCache] = useState<Record<string, ProductFullView[]>>({});

  const getProductsForCategory = useCallback(async (categorySlug: string) => {
    // Utiliser le cache si disponible
    if (productsCache[categorySlug]) {
      return productsCache[categorySlug];
    }

    try {
      const supabaseSlug = getSupabaseSlug(categorySlug);
      const products = await getProductsByCategory(supabaseSlug, {
        includeSubcategories: true
      });
      
      // Mettre en cache
      setProductsCache(prev => ({
        ...prev,
        [categorySlug]: products
      }));
      
      return products;
    } catch (error) {
      console.error(`Erreur récupération produits pour ${categorySlug}:`, error);
      return [];
    }
  }, [productsCache]);

  const getProductsForBrand = useCallback(async (brandSlug: string) => {
    // Utiliser le cache si disponible
    const cacheKey = `brand_${brandSlug}`;
    if (productsCache[cacheKey]) {
      return productsCache[cacheKey];
    }

    try {
      const products = await getProductsByBrand(brandSlug);
      
      // Mettre en cache
      setProductsCache(prev => ({
        ...prev,
        [cacheKey]: products
      }));
      
      return products;
    } catch (error) {
      console.error(`Erreur récupération produits pour ${brandSlug}:`, error);
      return [];
    }
  }, [productsCache]);

  return {
    menuStructure: menuData,
    getProductsForCategory,
    getProductsForBrand,
    loading
  };
}

/**
 * Hook pour récupérer toutes les marques
 */
export function useSupabaseBrands() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await getAllBrands();
        setBrands(data.map(b => b.name));
      } catch (error) {
        console.error('Erreur récupération marques:', error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  return { brands, loading };
}

/**
 * Hook pour récupérer les meilleures ventes
 */
export function useBestSellers(limit: number = 10) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      try {
        const data = await getBestSellers(limit);
        setProducts(data);
      } catch (error) {
        console.error('Erreur récupération meilleures ventes:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBestSellers();
  }, [limit]);

  return { products, loading };
}

/**
 * Hook pour récupérer les produits en promotion
 */
export function useDiscountedProducts(minDiscount: number = 10) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscounted() {
      try {
        const data = await getDiscountedProducts(minDiscount);
        setProducts(data);
      } catch (error) {
        console.error('Erreur récupération promotions:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDiscounted();
  }, [minDiscount]);

  return { products, loading };
}

/**
 * Hook pour récupérer les nouveautés
 */
export function useNewProducts(days: number = 30, limit: number = 10) {
  const [products, setProducts] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNew() {
      try {
        const data = await getNewProducts(days, limit);
        setProducts(data);
      } catch (error) {
        console.error('Erreur récupération nouveautés:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNew();
  }, [days, limit]);

  return { products, loading };
}

/**
 * Hook pour la recherche de produits
 */
export function useProductSearch(query: string, options?: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const [results, setResults] = useState<ProductFullView[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const searchProducts = async () => {
      setLoading(true);
      try {
        // Pour l'instant, on fait une recherche simple sur le nom
        const allProducts = await getActiveProducts();
        const filtered = allProducts.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand_name?.toLowerCase().includes(query.toLowerCase())
        );
        
        // Appliquer les filtres supplémentaires
        let finalResults = filtered;
        
        if (options?.category) {
          const supabaseSlug = getSupabaseSlug(options.category);
          finalResults = finalResults.filter(p => 
            p.category_slug === supabaseSlug
          );
        }
        
        if (options?.brand) {
          finalResults = finalResults.filter(p => 
            p.brand_slug === options.brand
          );
        }
        
        if (options?.minPrice) {
          finalResults = finalResults.filter(p => 
            p.price >= options.minPrice
          );
        }
        
        if (options?.maxPrice) {
          finalResults = finalResults.filter(p => 
            p.price <= options.maxPrice
          );
        }
        
        setResults(finalResults.slice(0, 10)); // Limiter à 10 résultats
      } catch (error) {
        console.error('Erreur recherche:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delaySearch = setTimeout(searchProducts, 300); // Debounce
    return () => clearTimeout(delaySearch);
  }, [query, options?.category, options?.brand, options?.minPrice, options?.maxPrice]);

  return { results, loading };
}

/**
 * Hook pour récupérer un produit avec ses variants depuis Supabase
 */
export function useProductWithVariants(slug: string) {
  const [product, setProduct] = useState<ProductFullView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const supabase = createClient();
        
        // Fetch product with variants
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            brand:brands(*),
            category:categories!products_category_id_fkey(*),
            product_variants(*)
          `)
          .eq('url_slug', slug)
          .single();

        if (error) throw error;
        
        if (data) {
          // Transform to ProductFullView format
          const transformedProduct: ProductFullView = {
            id: data.id,
            name: data.name,
            slug: data.url_slug,
            url_slug: data.url_slug,
            description: data.description || '',
            short_description: data.short_description || '',
            price: parseFloat(data.price || '0'),
            unit_price_ttc: parseFloat(data.price || '0'),
            unit_price_ht: parseFloat(data.unit_price_ht || '0'),
            pvc: data.pvc,
            discount_percentage: data.discount_percentage || 0,
            images: data.images || [],
            brand_id: data.brand_id,
            brand_name: data.brand?.name || '',
            brand_slug: data.brand?.slug || '',
            category_id: data.category_id,
            category_name: data.category?.name || '',
            category_slug: data.category?.slug || '',
            subcategory: data.subcategory || '',
            specifications: data.specifications || {},
            stock: data.stock_quantity || 0,
            sku: data.sku,
            ean: data.ean,
            has_variants: data.has_variants || false,
            variant_type: data.variant_type,
            base_name: data.base_name,
            base_sku: data.base_sku,
            product_variants: data.product_variants?.map((v: any) => ({
              id: v.id,
              product_id: v.product_id,
              color: v.color,
              size: v.size,
              capacity: v.capacity,
              stock: v.stock,
              ean: v.ean,
              supplier_reference: v.supplier_reference,
              images: v.images || []
            })) || [],
            rating: {
              average: 4.5,
              count: 89
            },
            das: data.das,
            tete: data.tete,
            corps: data.corps,
            membre: data.membre,
            tax_d3e: data.tax_d3e || 0,
            tva: data.tva || 8.5,
            status: data.status,
            created_at: data.created_at,
            updated_at: data.updated_at
          };
          
          setProduct(transformedProduct);
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
}