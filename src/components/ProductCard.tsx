'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, parseGitHubImages, truncateText } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, className = '', viewMode = 'grid' }: ProductCardProps) {
  const images = parseGitHubImages(product['Images GitHub']);
  const mainImage = images[0] || '/placeholder-product.jpg';
  const productSlug = product['URL Slug'] || product.id;

  // Badge de statut (nouveau, promo, etc.)
  const getBadge = () => {
    if (product['Statut Publication'] === 'Publié') {
      return (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Disponible
        </span>
      );
    }
    return null;
  };

  // Prix (pour l'instant fictif)
  const price = product.Prix || Math.floor(Math.random() * 800) + 200;

  // Vue liste
  if (viewMode === 'list') {
    return (
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group ${className}`}>
        <div className="flex p-6">
          {/* Image */}
          <div className="flex-shrink-0 w-32 h-32 relative">
            <div className="relative">
              {getBadge()}
              <Image
                src={mainImage}
                alt={product['Nom du Produit']}
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                sizes="128px"
              />
            </div>
          </div>
          
          {/* Contenu */}
          <div className="ml-6 flex-1 flex flex-col justify-between">
            <div>
              {/* Marque et nom */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {product.Marque}
                </p>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link href={`/produits/${productSlug}`} className="hover:text-blue-600 transition-colors">
                  {product['Nom du Produit']}
                </Link>
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4">
                {truncateText(product['Description SEO'], 150)}
              </p>
              
              {/* Note et variantes */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(42)</span>
                </div>
                
                {product['Variantes/Couleurs'] && (
                  <span className="text-sm text-gray-500">
                    {product['Variantes/Couleurs'].split(',').length} variante(s)
                  </span>
                )}
                
                <span className="inline-flex items-center text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  En stock
                </span>
              </div>
            </div>
            
            {/* Prix et actions */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(price)}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Link
                  href={`/produits/${productSlug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Voir détail
                </Link>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue grille (par défaut)
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group ${className}`}>
      {/* Badge */}
      <div className="relative">
        {getBadge()}
        
        {/* Image */}
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={mainImage}
            alt={product['Nom du Produit']}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Actions au survol */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 text-gray-700" />
              </button>
              <button className="bg-blue-600 p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors">
                <ShoppingCart className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        {/* Marque */}
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
          {product.Marque}
        </p>

        {/* Nom du produit */}
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/produits/${productSlug}`} className="hover:text-blue-600 transition-colors">
            {truncateText(product['Nom du Produit'], 60)}
          </Link>
        </h3>

        {/* Description courte */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {truncateText(product['Description SEO'], 80)}
        </p>

        {/* Note et variantes */}
        <div className="flex items-center justify-between mb-3">
          {/* Note (fictive pour l'instant) */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">(42)</span>
          </div>

          {/* Variantes */}
          {product['Variantes/Couleurs'] && (
            <span className="text-xs text-gray-500">
              {product['Variantes/Couleurs'].split(',').length} variante(s)
            </span>
          )}
        </div>

        {/* Prix et action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          </div>
          
          <Link
            href={`/produits/${productSlug}`}
            className="bg-blue-600 text-white px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voir détail
          </Link>
        </div>

        {/* Stock */}
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center text-xs text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
            En stock
          </span>
        </div>
      </div>
    </div>
  );
}