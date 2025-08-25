'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FilterPanel, { FilterState } from '@/components/FilterPanel';
import Pagination from '@/components/Pagination';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import { allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Filter, X, Search } from 'lucide-react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function SmartphonesPage() {
  const searchParams = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Simuler un chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Gestion des changements de filtres
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset à la première page lors du changement de filtres
  }, []);

  // Gestion des changements de pagination
  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  // Filtrage des produits
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
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
      
      // Stock
      const matchesStock = !filters.inStock || 
                          (product.status !== 'out-of-stock');
      
      // Marques
      const matchesBrand = filters.brands.length === 0 || 
                          filters.brands.includes(product.brand);
      
      // Catégories
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);
      
      return matchesSearch && matchesPrice && matchesPromo && 
             matchesRating && matchesStock && matchesBrand && matchesCategory;
    });
  }, [searchQuery, filters]);

  // Tri des produits
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
      case 'newest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt || '2024-01-01').getTime();
          const dateB = new Date(b.createdAt || '2024-01-01').getTime();
          return dateB - dateA;
        });
      case 'bestseller':
        return sorted.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
      case 'relevance':
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <div className="pt-[110px] min-h-screen flex flex-col">
        {/* Layout principal avec Grid CSS */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          {/* Sidebar avec FilterPanel - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-[110px] h-[calc(100vh-110px)] overflow-y-auto p-4">
              <FilterPanel
                products={allProducts}
                onFiltersChange={handleFiltersChange}
                initialFilters={filters}
              />
            </div>
          </div>

          {/* Sidebar Mobile - Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-[320px] bg-white shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="font-semibold">Filtres</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="h-[calc(100vh-64px)] overflow-y-auto p-4">
                  <FilterPanel
                    products={allProducts}
                    onFiltersChange={handleFiltersChange}
                    initialFilters={filters}
                  />
                </div>
              </div>
            </div>
          )}
        
          {/* Contenu principal */}
          <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="max-w-[1600px] mx-auto">
              {/* Header avec recherche et tri */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Nos Produits</h1>
                  
                  {/* Bouton filtres mobile */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
                
                {/* Barre de recherche */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit, une marque, une catégorie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Barre de contrôle avec résultats et tri */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-gray-600">
                    {sortedProducts.length} produit{sortedProducts.length !== 1 ? 's' : ''} trouvé{sortedProducts.length !== 1 ? 's' : ''}
                  </p>
                  
                  <SortDropdown 
                    value={sortOption} 
                    onChange={setSortOption} 
                  />
                </div>
              </div>

              {/* Grille de produits */}
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5">
                  {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <ProductCardSkeleton key={index} viewMode="grid" />
                  ))}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5">
                    {paginatedProducts.map((product) => (
                      <Link 
                        href={`/produit/${product.urlSlug}`}
                        key={product.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer block"
                      >
                        <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                          <Image
                            src={product.images?.[0] || '/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                          {product.discount && product.discount > 0 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                              -{product.discount}%
                            </div>
                          )}
                          {product.status === 'out-of-stock' && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="bg-white text-gray-900 px-3 py-1 rounded-md font-semibold">
                                Rupture de stock
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-3 lg:p-4">
                          <h3 className="font-semibold text-sm lg:text-base text-gray-900 mb-1 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs lg:text-sm text-gray-600 mb-2">{product.brand}</p>
                          
                          {/* Notation */}
                          {product.rating && product.rating.average > 0 && (
                            <div className="flex items-center gap-1 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating.average)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">({product.rating.count})</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg lg:text-xl font-bold text-blue-600">
                                {product.price ? `${product.price.toFixed(2)}€` : 'Prix sur demande'}
                              </p>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <p className="text-sm text-gray-500 line-through">
                                  {product.originalPrice.toFixed(2)}€
                                </p>
                              )}
                            </div>
                            <Button size="sm" className="text-xs lg:text-sm">
                              Voir
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={sortedProducts.length}
                      onItemsPerPageChange={handleItemsPerPageChange}
                    />
                  )}
                </>
              ) : (
                /* Message si aucun produit */
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 mb-4">Aucun produit ne correspond à vos critères</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        priceRange: [0, 2000],
                        hasPromo: false,
                        minRating: 0,
                        inStock: false,
                        brands: [],
                        categories: []
                      });
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}