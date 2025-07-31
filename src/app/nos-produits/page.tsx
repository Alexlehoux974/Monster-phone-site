'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { allProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function SmartphonesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simuler un chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const products = allProducts;

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBrand = selectedBrand === '' || product.brand === selectedBrand;
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesProduct = selectedProduct === '' || product.name === selectedProduct;
      
      return matchesSearch && matchesBrand && matchesCategory && matchesProduct;
    });
  }, [products, searchQuery, selectedBrand, selectedCategory, selectedProduct]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <div className="pt-[110px] min-h-screen flex flex-col">
        {/* Layout principal avec Grid CSS */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr]">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-[110px] h-[calc(100vh-110px)] overflow-hidden">
              <Sidebar
                products={products}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
              />
            </div>
          </div>

          {/* Sidebar Mobile - Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-lg">
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
                <div className="h-[calc(100vh-64px)] overflow-hidden">
                  <Sidebar
                    products={products}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                </div>
              </div>
            </div>
          )}
        
          {/* Contenu principal */}
          <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="max-w-[1600px] mx-auto">
              {/* Header avec recherche */}
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
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Résultats */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Grille de produits optimisée */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 lg:gap-5">
                {isLoading ? (
                  // Afficher les skeletons pendant le chargement
                  Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardSkeleton key={index} viewMode="grid" />
                  ))
                ) : (
                  // Afficher les produits
                  filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
                    >
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                        <Image
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="p-3 lg:p-4">
                        <h3 className="font-semibold text-sm lg:text-base text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-600 mb-2">{product.brand}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg lg:text-xl font-bold text-blue-600">
                            {product.price ? `${product.price}€` : 'Prix sur demande'}
                          </p>
                          <Button size="sm" className="text-xs lg:text-sm">
                            Voir
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message si aucun produit */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-gray-600 mb-4">Aucun produit trouvé</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                      setSelectedBrand('');
                      setSelectedProduct('');
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