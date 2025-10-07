'use client';

import Link from 'next/link';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface FeaturedProductsSupabaseProps {
  products: Product[];
  title?: string;
}

export default function FeaturedProductsSupabase({ products, title }: FeaturedProductsSupabaseProps) {
  // Séparer les produits en 2 rangées de 6 produits
  const firstRow = products.slice(0, 6);
  const secondRow = products.slice(6, 12);

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Nos Produits Phares'}
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Découvrez notre sélection d&apos;accessoires et smartphones gaming,
            choisis pour leur innovation et leur qualité exceptionnelle.
          </p>
        </div>

        {/* Première rangée de produits */}
        <div className="relative mb-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-2">
            {firstRow.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Deuxième rangée de produits */}
        {secondRow.length > 0 && (
          <div className="relative">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-2">
              {secondRow.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-80">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA vers catalogue complet */}
        <div className="text-center mt-12">
          <Link
            href="/nos-produits"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Voir tous nos produits
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
