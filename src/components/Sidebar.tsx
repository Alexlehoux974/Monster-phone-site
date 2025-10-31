'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  products: Product[];
  selectedCategory: string;
  selectedBrand: string;
  selectedProduct: string;
  setSelectedCategory: (category: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedProduct: (product: string) => void;
}

interface HierarchyStructure {
  [category: string]: {
    [brand: string]: Product[];
  };
}

export default function Sidebar({
  products,
  selectedCategory,
  selectedBrand,
  selectedProduct,
  setSelectedCategory,
  setSelectedBrand,
  setSelectedProduct,
}: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());

  // Organiser les produits en hiérarchie
  const hierarchy: HierarchyStructure = products.reduce((acc, product) => {
    const category = product.category;
    const brand = product.brand;
    
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][brand]) {
      acc[category][brand] = [];
    }
    acc[category][brand].push(product);
    
    return acc;
  }, {} as HierarchyStructure);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleBrand = (category: string, brand: string) => {
    const key = `${category}-${brand}`;
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedBrands(newExpanded);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
      // Auto-expand la catégorie sélectionnée
      const newExpanded = new Set(expandedCategories);
      newExpanded.add(category);
      setExpandedCategories(newExpanded);
    }
  };

  const handleBrandClick = (brand: string) => {
    if (selectedBrand === brand) {
      setSelectedBrand('');
    } else {
      setSelectedBrand(brand);
    }
  };

  const handleProductClick = (productName: string) => {
    if (selectedProduct === productName) {
      setSelectedProduct('');
    } else {
      setSelectedProduct(productName);
    }
  };

  const activeFiltersCount = [selectedCategory, selectedBrand, selectedProduct].filter(Boolean).length;

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-lg flex flex-col h-full">
      {/* Sidebar */}
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-gray-800" />
            <h2 className="font-semibold text-gray-900">Filtres</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSelectedCategory(''); setSelectedBrand(''); setSelectedProduct(''); }}
                className="text-xs"
              >
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Filtres actifs */}
        {activeFiltersCount > 0 && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="text-sm font-medium text-gray-800 mb-2">Filtres actifs :</div>
            <div className="flex flex-col gap-1">
              {selectedCategory && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer text-xs w-fit"
                  onClick={() => setSelectedCategory('')}
                >
                  Catégorie: {selectedCategory} ×
                </Badge>
              )}
              {selectedBrand && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer text-xs w-fit"
                  onClick={() => setSelectedBrand('')}
                >
                  Marque: {selectedBrand} ×
                </Badge>
              )}
              {selectedProduct && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer text-xs w-fit"
                  onClick={() => setSelectedProduct('')}
                >
                  Produit: {selectedProduct} ×
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Contenu hiérarchique */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {Object.entries(hierarchy).map(([category, brands]) => (
              <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Catégorie */}
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedCategory === category ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                  }`}
                >
                  <span className="font-medium text-sm">{category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-800">
                      ({Object.values(brands).flat().length})
                    </span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(category);
                      }}
                      className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                    >
                      {expandedCategories.has(category) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Marques */}
                <AnimatePresence>
                  {expandedCategories.has(category) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      <div className="pl-4">
                        {Object.entries(brands).map(([brand, brandProducts]) => (
                          <div key={brand} className="border-l-2 border-gray-200">
                            {/* Marque */}
                            <button
                              onClick={() => handleBrandClick(brand)}
                              className={`w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 transition-colors ${
                                selectedBrand === brand ? 'bg-blue-50 text-blue-700' : 'text-gray-800'
                              }`}
                            >
                              <span className="text-sm font-medium">{brand}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-800">
                                  ({brandProducts.length})
                                </span>
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBrand(category, brand);
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                                >
                                  {expandedBrands.has(`${category}-${brand}`) ? (
                                    <ChevronDown className="w-3 h-3" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3" />
                                  )}
                                </div>
                              </div>
                            </button>

                            {/* Produits */}
                            <AnimatePresence>
                              {expandedBrands.has(`${category}-${brand}`) && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden bg-white"
                                >
                                  <div className="pl-4">
                                    {brandProducts.map((product: any) => (
                                      <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.name)}
                                        className={`w-full text-left p-2 text-sm hover:bg-gray-50 transition-colors border-l-2 ${
                                          selectedProduct === product.name
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 text-gray-800'
                                        }`}
                                      >
                                        <div className="truncate" title={product.name}>
                                          {product.name}
                                        </div>
                                        <div className="text-xs text-gray-800 mt-1">
                                          {product.price}€
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Footer avec statistiques */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-800 space-y-1">
            <div>Total produits: {products.length}</div>
            <div>Catégories: {Object.keys(hierarchy).length}</div>
            <div>Marques: {new Set(products.map(p => p.brand)).size}</div>
          </div>
        </div>
    </div>
  );
}