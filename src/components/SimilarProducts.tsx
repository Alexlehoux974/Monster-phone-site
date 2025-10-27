'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SimilarProductsProps {
  categorySlug: string;
  brandSlug: string;
  currentProductId: string;
}

interface Product {
  id: string;
  name: string;
  url_slug: string;
  price: number;
  original_price?: number;
  stock_quantity?: number;
  brand_id: string;
  brands: {
    name: string;
  };
  product_images: Array<{
    url: string;
    is_primary: boolean;
  }>;
  similarity_score?: number;
}

export default function SimilarProducts({ categorySlug, brandSlug, currentProductId }: SimilarProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`/api/similar-products?productId=${currentProductId}`);
        const data = await response.json();

        if (data.success && data.products) {
          console.log('✅ Produits similaires chargés:', data.products.length);
          setProducts(data.products);
        } else {
          console.log('❌ Erreur API:', data.error);
          setProducts([]);
        }
      } catch (error) {
        console.error('❌ Erreur chargement produits similaires:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [currentProductId]);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('similar-products-scroll');
    if (!container) return;

    const scrollAmount = 300;
    const newPosition = direction === 'left'
      ? scrollPosition - scrollAmount
      : scrollPosition + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  if (loading) {
    return (
      <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
        <div className="text-center py-8 text-gray-500">
          Chargement des produits similaires...
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
        <div className="text-center py-8 text-gray-500">
          Aucun produit similaire trouvé.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Produits similaires</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div
        id="similar-products-scroll"
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          const imageUrl = product.product_images?.find(img => img.is_primary)?.url
            || product.product_images?.[0]?.url
            || '/placeholder-monster.svg';

          const hasDiscount = product.original_price && product.original_price > product.price;
          const discountPercent = hasDiscount
            ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/produit-supabase/${product.url_slug}`}
              className="flex-none w-[280px] group"
            >
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/placeholder-monster.svg';
                    }}
                  />
                  {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                      -{discountPercent}%
                    </div>
                  )}
                  {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Infos */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.brands?.name}</p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {product.price.toFixed(2)} €
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.original_price?.toFixed(2)} €
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
