'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { createClient } from '@/lib/supabase/client';
import { getActiveProducts } from '@/lib/supabase/api';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import { sortProductsByPriority } from '@/lib/utils';

interface FeaturedProductsSupabaseProps {
  products: Product[];
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function FeaturedProductsSupabase({ products: initialProducts, title, viewAllHref, viewAllLabel }: FeaturedProductsSupabaseProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const supabase = createClient();

    // S'abonner aux changements de la table products
    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Écouter tous les événements (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'products'
        },
        async (payload) => {
          console.log('🔄 Changement détecté sur products:', payload);

          // Rafraîchir tous les produits quand il y a un changement
          try {
            const supabaseProducts = await getActiveProducts();
            const convertedProducts = supabaseProducts.map(supabaseProductToLegacy);
            const featuredProducts = sortProductsByPriority(convertedProducts).slice(0, 12);
            setProducts(featuredProducts);
          } catch (error) {
            console.error('Erreur lors du rafraîchissement des produits:', error);
          }
        }
      )
      .subscribe();

    // Cleanup: Se désabonner quand le composant est démonté
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Nos Produits Phares'}
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Découvrez notre sélection d&apos;accessoires et smartphones,
            choisis pour leur innovation et leur qualité exceptionnelle.
          </p>
        </div>

        {/* Tous les produits en une seule rangée scrollable */}
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-2 snap-x snap-mandatory">
            {products.map((product: any) => (
              <div key={product.id} className="flex-shrink-0 w-[75vw] sm:w-80 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA vers catalogue complet */}
        <div className="text-center mt-12">
          <Link
            href={viewAllHref || "/nos-produits"}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {viewAllLabel || "Voir tous nos produits"}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
