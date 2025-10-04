'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterPanel, { FilterState } from '@/components/FilterPanel';
import Pagination from '@/components/Pagination';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import { Button } from '@/components/ui/button';
import { Filter, X, Search, Package } from 'lucide-react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase/client';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import { formatPrice } from '@/lib/utils';

interface SupabaseProduct {
  id: string;
  sku: string;
  name: string;
  url_slug: string;
  price: number;
  original_price?: number;
  discount?: number;
  stock_quantity?: number;
  status: string;
  description?: string;
  short_description?: string;
  image_url?: string;
  images?: string[];
  average_rating?: number;
  total_reviews?: number;
  repairability_index?: number;
  das_head?: string;
  das_body?: string;
  das_limb?: string;
  d3e_tax?: number;
  tva_rate?: number;
  energy_class?: string;
  brands: {
    id: string;
    name: string;
    slug: string;
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  };
  product_variants: Array<{
    id: string;
    color?: string;
    storage?: string;
    ram?: string;
    stock: number;
    ean?: string;
  }>;
}

function ProduitsSupabasePageContent() {
  const searchParams = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filtres
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    hasPromo: false,
    minRating: 0,
    inStock: false,
    brands: [],
    categories: []
  });
  
  // Tri et pagination
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Charger les produits depuis Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer d'abord les produits de base
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (productsError) {
          console.error('Erreur Supabase produits:', productsError);
          setError(productsError.message);
          return;
        }

        // Récupérer les marques
        const { data: brandsData } = await supabase
          .from('brands')
          .select('*');

        // Récupérer les catégories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*');

        // Récupérer les variantes
        const { data: variantsData } = await supabase
          .from('product_variants')
          .select('*');

        // Mapper les données
        const brandsMap = new Map(brandsData?.map(b => [b.id, b]) || []);
        const categoriesMap = new Map(categoriesData?.map(c => [c.id, c]) || []);
        const variantsMap = new Map<string, any[]>();
        
        variantsData?.forEach(v => {
          if (!variantsMap.has(v.product_id)) {
            variantsMap.set(v.product_id, []);
          }
          variantsMap.get(v.product_id)?.push(v);
        });

        // Combiner les données
        const data = productsData?.map(product => ({
          ...product,
          brands: brandsMap.get(product.brand_id) || { id: '', name: 'Unknown', slug: '' },
          categories: categoriesMap.get(product.category_id) || { id: '', name: 'Unknown', slug: '' },
          product_variants: variantsMap.get(product.id) || []
        }));

        setProducts(data || []);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement des produits');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    // Setup realtime subscription for stock updates
    const channel = supabase
      .channel('products-stock-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'product_variants',
        },
        (payload) => {
          console.log('🔄 [REALTIME] Variant stock updated:', payload.new);
          // Update the specific variant in products
          setProducts((prevProducts) =>
            prevProducts.map((product) => ({
              ...product,
              product_variants: product.product_variants.map((variant) =>
                variant.id === payload.new.id
                  ? { ...variant, stock: payload.new.stock }
                  : variant
              ),
            }))
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          console.log('🔄 [REALTIME] Product stock updated:', payload.new);
          // Update the product stock_quantity
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === payload.new.id
                ? { ...product, stock_quantity: payload.new.stock_quantity }
                : product
            )
          );
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Read URL parameters on mount and when they change
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const brand = searchParams.get('brand') || '';
    const category = searchParams.get('category') || '';
    
    setSearchQuery(search);
    
    // Appliquer les filtres depuis l'URL
    if (brand || category) {
      setFilters(prev => ({
        ...prev,
        brands: brand ? [brand] : [],
        categories: category ? [category] : []
      }));
    }
  }, [searchParams]);

  // Gestion des changements de filtres
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Gestion des changements de pagination
  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  // Transformer les produits Supabase au format attendu par ProductCard
  const transformedProducts = useMemo(() => {
    return products.map(product => {
      // Créer un ProductFullView partiel pour l'adaptateur
      const fullViewProduct = {
        ...product,
        brand_name: product.brands?.name || '',
        brand_slug: product.brands?.slug || '',
        category_name: product.categories?.name || '',
        category_slug: product.categories?.slug || '',
        product_variants: product.product_variants || [],
        reviews: [],
        rating: product.average_rating ? {
          average: product.average_rating,
          count: product.total_reviews || 0
        } : undefined
      };
      return supabaseProductToLegacy(fullViewProduct as any);
    });
  }, [products]);

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    return transformedProducts.filter(product => {
      // Recherche
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtres de prix
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
      // Promotion
      const matchesPromo = !filters.hasPromo || 
                          (product.discount && product.discount > 0);
      
      // Note minimale
      const matchesRating = !filters.minRating || 
                           (product.rating && product.rating.average >= filters.minRating);
      
      // Stock - vérifier via les variantes ou le statut
      const hasStock = product.variants?.some(v => v.stock > 0) || product.status !== 'out-of-stock';
      const matchesStock = !filters.inStock || hasStock;
      
      // Marques
      const matchesBrand = filters.brands.length === 0 || 
                          filters.brands.includes(product.brand);
      
      // Catégories
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);
      
      return matchesSearch && matchesPrice && matchesPromo && 
             matchesRating && matchesStock && matchesBrand && matchesCategory;
    });
  }, [transformedProducts, searchQuery, filters]);

  // Tri des produits
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        sorted.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
        break;
      case 'newest':
      case 'bestseller':
        // Garder l'ordre original (plus récent en premier)
        break;
      case 'relevance':
      default:
        // Ordre par défaut
        break;
    }
    
    return sorted;
  }, [filteredProducts, sortOption]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header avec titre et infos */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Produits en Stock (Supabase)
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              {products.length} produits disponibles
            </span>
            <span className="flex items-center gap-1 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {products.filter(p => {
                const totalStock = p.product_variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || p.stock_quantity || 0;
                return totalStock > 0;
              }).length} avec stock
            </span>
            {filteredProducts.length !== products.length && (
              <span className="text-orange-600">
                {filteredProducts.length} produits après filtrage
              </span>
            )}
            <span className="text-green-600 font-semibold">
              Données en temps réel depuis Supabase
            </span>
          </div>
        </div>

        {/* Barre de recherche et actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un produit, une marque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="sm:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filtres Desktop */}
          <aside className="hidden sm:block w-64 shrink-0">
            <FilterPanel 
              products={transformedProducts}
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </aside>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 sm:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filtres</h2>
                  <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <FilterPanel 
                  products={transformedProducts}
                  onFiltersChange={handleFiltersChange}
                  initialFilters={filters}
                />
              </div>
            </div>
          )}

          {/* Liste des produits */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => {
                    const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0;
                    return (
                      <div key={product.id} className="relative">
                        <ProductCard product={product} />
                        {/* Badge stock en temps réel */}
                        <div className="absolute top-2 right-2 z-10">
                          {totalStock > 0 ? (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                              {totalStock} en stock
                            </span>
                          ) : (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              Rupture
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={sortedProducts.length}
                      onItemsPerPageChange={handleItemsPerPageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Aucun produit ne correspond à vos critères
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 2000],
                      hasPromo: false,
                      minRating: 0,
                      inStock: false,
                      brands: [],
                      categories: []
                    });
                    setSearchQuery('');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProduitsSupabasePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    }>
      <ProduitsSupabasePageContent />
    </Suspense>
  );
}