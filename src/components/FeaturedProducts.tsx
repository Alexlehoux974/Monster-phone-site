'use client';

import Image from 'next/image';
import Link from 'next/link';
import { allProducts, Product } from '@/data/products';

export default function FeaturedProducts() {
  // Sélection de 6 produits phares stratégiques de différentes catégories
  const featuredProducts = allProducts.filter(p => 
    ['HONOR-200-PRO', 'HONOR-X5B', 'CASQUE_PIKA', 'CABLE_USB-C_LIGHTNING', 'KIDPIC_ROSE', 'N_LITE_206'].includes(p.sku)
  ).slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Produits Phares
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Découvrez notre sélection d&apos;accessoires et smartphones gaming, 
            choisis pour leur innovation et leur qualité exceptionnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div key={product.sku} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image container */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Badge catégorie */}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                {/* Badge prix si disponible */}
                {product.price && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                      {product.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-medium text-blue-600">{product.brand}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                  </div>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-800 text-base mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.price && (
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span>
                    )}
                    <span className="text-sm text-gray-800">
                      {product.variants}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/produit/${product.urlSlug}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Découvrir
                  </Link>
                </div>
              </div>
            </div>
          ))}
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