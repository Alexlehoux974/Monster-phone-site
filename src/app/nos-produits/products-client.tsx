'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Filter, X, Search, Grid, List, ShoppingCart, Star } from 'lucide-react';
import FilterPanel, { FilterState } from '@/components/FilterPanel';
import Pagination from '@/components/Pagination';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, sortProductsByPriority } from '@/lib/utils';
import type { Product } from '@/data/products';
import type { ProductFullView } from '@/lib/supabase/client';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';

interface ProductsClientProps {
  initialProducts: ProductFullView[];
  categories: { id: string; name: string; slug: string }[];
  brands: { id: string; name: string; slug: string }[];
}

function ProductsClientContent({
  initialProducts,
  categories,
  brands
}: ProductsClientProps) {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  
  // Transformer les ProductFullView en Product pour FilterPanel
  const legacyProducts: Product[] = useMemo(() => {
    return initialProducts.map(p => {
      // ProductFullView a déjà brand_name, category_name, etc. depuis l'API
      const fullViewProduct = {
        ...p,
        product_variants: p.variants || [],
        reviews: [],
        rating: p.average_rating ? {
          average: p.average_rating,
          count: p.total_reviews || 0
        } : undefined
      };
      return supabaseProductToLegacy(fullViewProduct as any);
    });
  }, [initialProducts]);
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtres - utiliser les noms depuis les paramètres d'URL
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    hasPromo: false,
    minRating: 0,
    inStock: false,
    brands: searchParams.get('brand') ? [searchParams.get('brand')!] : [],
    categories: searchParams.get('category') ? [searchParams.get('category')!] : []
  });
  
  // Tri et pagination
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Gestion des changements de filtres
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Gestion de la recherche
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Recherche
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filtres de prix
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
      // Promotion
      const hasDiscount = product.original_price && product.original_price > product.price;
      const matchesPromo = !filters.hasPromo || hasDiscount;
      
      // Note minimale
      const matchesRating = !filters.minRating || 
                           (product.average_rating && product.average_rating >= filters.minRating);
      
      // Stock - ProductFullView n'a pas stock_quantity, on suppose tous en stock
      const matchesStock = !filters.inStock || true;

      // Marques - utiliser brand_name directement depuis ProductFullView
      const matchesBrand = filters.brands.length === 0 ||
                          filters.brands.includes(product.brand_name);

      // Catégories - utiliser category_name directement depuis ProductFullView
      const matchesCategory = filters.categories.length === 0 ||
                             filters.categories.includes(product.category_name);
      
      return matchesSearch && matchesPrice && matchesPromo && 
             matchesRating && matchesStock && matchesBrand && matchesCategory;
    });
  }, [initialProducts, searchQuery, filters]);

  // Tri des produits
  const sortedProducts = useMemo(() => {
    // Convertir les ProductFullView filtrés en format Product pour le tri
    const convertedFiltered = filteredProducts.map(p => {
      // ProductFullView a déjà brand_name, category_name, etc.
      const fullViewProduct = {
        ...p,
        product_variants: p.variants || [],
        reviews: [],
        rating: p.average_rating ? {
          average: p.average_rating,
          count: p.total_reviews || 0
        } : undefined
      };
      return supabaseProductToLegacy(fullViewProduct as any);
    });

    let sorted = [...filteredProducts];

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
        sorted.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case 'newest':
      case 'bestseller':
      case 'relevance':
      default:
        // Appliquer le tri par priorité (en stock > phares > prix décroissant)
        const sortedByPriority = sortProductsByPriority(convertedFiltered);
        // Mapper de retour vers DatabaseProduct en gardant l'ordre
        const productIdMap = new Map(filteredProducts.map(p => [p.id, p]));
        sorted = sortedByPriority.map(p => productIdMap.get(p.id)!).filter(Boolean);
        break;
    }

    return sorted;
  }, [filteredProducts, sortOption, brands, categories]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Ajouter au panier
  const handleAddToCart = useCallback((product: ProductFullView) => {
    // ProductFullView a déjà toutes les infos nécessaires
    const fullViewProduct = {
      ...product,
      product_variants: product.variants || [],
      reviews: [],
      rating: product.average_rating ? {
        average: product.average_rating,
        count: product.total_reviews || 0
      } : undefined
    };
    addToCart(fullViewProduct as any);
  }, [addToCart]);

  return (
    <div className="container mx-auto px-4 pt-32 pb-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Nos Produits</h1>
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Rechercher un produit..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-monster-green"
            />
          </div>
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="outline"
            className="lg:hidden"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterPanel 
            products={legacyProducts}
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filtres</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterPanel
                products={legacyProducts}
                onFiltersChange={handleFiltersChange}
                initialFilters={filters}
              />
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className="flex-1">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun produit trouvé</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product: any) => {
                // Utiliser la première image du produit ou un placeholder
                const productImage = product.images && product.images.length > 0
                  ? product.images[0]
                  : '/images/placeholder-product.jpg';

                return (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <Link href={`/produit/${product.url_slug}`}>
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.discount && product.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">
                      <Link href={`/produit/${product.url_slug}`} className="hover:text-monster-green">
                        {product.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.average_rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      {product.total_reviews > 0 && (
                        <span className="text-sm text-gray-600 ml-1">
                          ({product.total_reviews} avis)
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-monster-green">{formatPrice(product.price)}</p>
                        {product.original_price && product.original_price > product.price && (
                          <p className="text-sm text-gray-500 line-through">{formatPrice(product.original_price)}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/produit/${product.url_slug}`}
                        className="w-full px-3 py-2 text-center text-sm rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                      >
                        Voir le produit
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Acheter maintenant
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProducts.map((product: any) => {
                // Utiliser la première image du produit ou un placeholder
                const productImage = product.images && product.images.length > 0
                  ? product.images[0]
                  : '/images/placeholder-product.jpg';

                return (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4">
                  <div className="flex gap-4">
                    <Link href={`/produit/${product.url_slug}`} className="flex-shrink-0">
                      <div className="w-32 h-32 relative overflow-hidden rounded">
                        <ImageWithFallback
                          src={productImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2">
                        <Link href={`/produit/${product.url_slug}`} className="hover:text-monster-green">
                          {product.name}
                        </Link>
                      </h3>
                      {product.short_description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.short_description}</p>
                      )}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.average_rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        {product.total_reviews > 0 && (
                          <span className="text-sm text-gray-600 ml-1">
                            ({product.total_reviews} avis)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="mb-3">
                          <p className="text-xl font-bold text-monster-green">{formatPrice(product.price)}</p>
                          {product.original_price && product.original_price > product.price && (
                            <p className="text-sm text-gray-500 line-through">{formatPrice(product.original_price)}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/produit/${product.url_slug}`}
                            className="px-4 py-2 text-center rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                          >
                            Voir le produit
                          </Link>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Acheter maintenant
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              totalItems={sortedProducts.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsClient(props: ProductsClientProps) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-monster-green mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    }>
      <ProductsClientContent {...props} />
    </Suspense>
  );
}