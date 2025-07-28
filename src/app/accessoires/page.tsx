'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { allProducts } from '@/data/products';

export default function AccessoiresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  // Filtrer uniquement les accessoires (pas les smartphones)
  const products = useMemo(() => {
    return allProducts.filter(product => product.category !== 'Smartphones');
  }, []);

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

  // Filtres rapides pour les accessoires
  const quickFilters = [
    { name: 'Coques', category: 'Coques & Protection', icon: '📱' },
    { name: 'Audio', category: 'Audio', icon: '🎧' },
    { name: 'Batteries', category: 'Batteries', icon: '🔋' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
        <div className="flex">
        <Sidebar
          products={products}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
        
        <main className="flex-1 lg:ml-80 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessoires</h1>
            
            {/* Filtres rapides */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quickFilters.map((filter) => (
                <button
                  key={filter.name}
                  onClick={() => setSelectedCategory(filter.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === filter.category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {filter.icon} {filter.name}
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory('')}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Tous les accessoires
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un accessoire..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-base text-gray-800 mb-1">{product.brand}</p>
                  <p className="text-base text-blue-600 mb-2">{product.category}</p>
                  <p className="text-xl font-bold text-blue-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-800">Aucun accessoire trouvé</p>
            </div>
          )}
        </main>
        </div>
      <Footer />
    </div>
  );
}