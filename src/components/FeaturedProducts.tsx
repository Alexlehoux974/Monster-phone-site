'use client';

import Link from 'next/link';
import { allProducts, Product } from '@/data/products';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products?: Product[];
  title?: string;
}

export default function FeaturedProducts({ products, title }: FeaturedProductsProps = {}) {
  // Utiliser les produits fournis ou sélectionner les produits HONOR phares par défaut
  const featuredProducts = products || allProducts.filter(p => 
    ['HONOR-X9B', 'HONOR-200-PRO', 'HONOR-PAD-9', 'HONOR-CHOICE-WATCH', 'HONOR-X7C', 'HONOR-X6B'].includes(p.sku)
  ).slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Nos Produits Phares'}
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Découvrez notre sélection d&apos;accessoires et smartphones gaming, 
            choisis pour leur innovation et leur qualité exceptionnelle.
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

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