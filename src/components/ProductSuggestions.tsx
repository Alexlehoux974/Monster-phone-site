'use client';

import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ProductSuggestionsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductSuggestions({ 
  products, 
  title = "Vous pourriez aussi aimer",
  subtitle = "Complétez votre achat avec ces produits"
}: ProductSuggestionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2; // Sur mobile
  const itemsPerPageDesktop = 4; // Sur desktop

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(products.length - itemsPerPage, prev + 1));
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            {title}
          </h3>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        
        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Produits précédents"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= products.length - itemsPerPageDesktop}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Produits suivants"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grille de produits avec défilement horizontal sur mobile */}
      <div className="relative">
        <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-[280px] md:w-auto ${
                  index < currentIndex || index >= currentIndex + itemsPerPageDesktop
                    ? 'hidden md:block md:hidden'
                    : ''
                }`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation mobile */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * itemsPerPage)}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / itemsPerPage) === i
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}