'use client';

import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

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
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          {title}
        </h3>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>

      {/* Carousel horizontal de produits */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-80">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}