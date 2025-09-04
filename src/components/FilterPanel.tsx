'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';

interface FilterPanelProps {
  products: Product[];
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  priceRange: [number, number];
  hasPromo: boolean;
  minRating: number;
  inStock: boolean;
  brands: string[];
  categories: string[];
}

export default function FilterPanel({ products, onFiltersChange, initialFilters }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['price', 'brand']));
  
  // Sécurité si products n'est pas défini
  const safeProducts = products || [];
  
  // Calculer les prix min et max depuis les produits
  const prices = safeProducts.length > 0 
    ? safeProducts.map(p => p.price).filter(p => p !== undefined)
    : [0];
  const minPrice = prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  const maxPrice = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 2000;
  
  // Extraire les marques et catégories uniques
  const uniqueBrands = Array.from(new Set(safeProducts.map(p => p.brand))).sort();
  const uniqueCategories = Array.from(new Set(safeProducts.map(p => p.category))).sort();
  
  const [filters, setFilters] = useState<FilterState>(initialFilters || {
    priceRange: [minPrice, maxPrice],
    hasPromo: false,
    minRating: 0,
    inStock: false,
    brands: [],
    categories: []
  });

  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>(filters.priceRange);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handlePriceChange = (value: [number, number]) => {
    setTempPriceRange(value);
  };

  const applyPriceFilter = () => {
    setFilters(prev => ({ ...prev, priceRange: tempPriceRange }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }));
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [minPrice, maxPrice] as [number, number],
      hasPromo: false,
      minRating: 0,
      inStock: false,
      brands: [],
      categories: []
    };
    setFilters(defaultFilters);
    setTempPriceRange([minPrice, maxPrice]);
  };

  const activeFilterCount = 
    (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice ? 1 : 0) +
    (filters.hasPromo ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    filters.brands.length +
    filters.categories.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* En-tête des filtres */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-lg">Filtres</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Section Prix */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-2 text-left hover:text-blue-600 transition-colors"
        >
          <span className="font-medium">Prix</span>
          {expandedSections.has('price') ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.has('price') && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={tempPriceRange[0]}
                onChange={(e) => handlePriceChange([Number(e.target.value), tempPriceRange[1]])}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                min={minPrice}
                max={tempPriceRange[1]}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={tempPriceRange[1]}
                onChange={(e) => handlePriceChange([tempPriceRange[0], Number(e.target.value)])}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                min={tempPriceRange[0]}
                max={maxPrice}
              />
              <span className="text-sm text-gray-600">€</span>
            </div>
            
            {/* Slider de prix */}
            <div className="relative pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={tempPriceRange[0]}
                  onChange={(e) => handlePriceChange([Number(e.target.value), tempPriceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={tempPriceRange[1]}
                  onChange={(e) => handlePriceChange([tempPriceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            <Button
              size="sm"
              onClick={applyPriceFilter}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Appliquer
            </Button>
          </div>
        )}
      </div>

      {/* Section Promotions */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <label className="flex items-center gap-3 cursor-pointer py-2 hover:bg-gray-50 px-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={filters.hasPromo}
            onChange={(e) => setFilters(prev => ({ ...prev, hasPromo: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="font-medium">En promotion uniquement</span>
        </label>
      </div>

      {/* Section Disponibilité */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <label className="flex items-center gap-3 cursor-pointer py-2 hover:bg-gray-50 px-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="font-medium">En stock uniquement</span>
        </label>
      </div>

      {/* Section Note minimale */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between py-2 text-left hover:text-blue-600 transition-colors"
        >
          <span className="font-medium">Note minimale</span>
          {expandedSections.has('rating') ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.has('rating') && (
          <div className="mt-3 space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center gap-2 py-2 px-2 rounded transition-colors ${
                  filters.minRating === rating
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">& plus</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Section Marques */}
      {uniqueBrands.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <button
            onClick={() => toggleSection('brand')}
            className="w-full flex items-center justify-between py-2 text-left hover:text-blue-600 transition-colors"
          >
            <span className="font-medium">
              Marques
              {filters.brands.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                  {filters.brands.length}
                </Badge>
              )}
            </span>
            {expandedSections.has('brand') ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.has('brand') && (
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
              {uniqueBrands.map((brand) => {
                const count = products.filter(p => p.brand === brand).length;
                return (
                  <label
                    key={brand}
                    className="flex items-center gap-3 cursor-pointer py-1.5 px-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">{brand}</span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Section Catégories */}
      {uniqueCategories.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between py-2 text-left hover:text-blue-600 transition-colors"
          >
            <span className="font-medium">
              Catégories
              {filters.categories.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                  {filters.categories.length}
                </Badge>
              )}
            </span>
            {expandedSections.has('category') ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {expandedSections.has('category') && (
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
              {uniqueCategories.map((category) => {
                const count = products.filter(p => p.category === category).length;
                return (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer py-1.5 px-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm flex-1">{category}</span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}