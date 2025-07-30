'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, className = '', viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const mainImage = product.images[0] || '/placeholder-product.svg';
  const price = parseFloat(product.price?.replace('€', '') || '0');

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Simuler un délai pour l'animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product);
    setIsAdding(false);
    setShowSuccess(true);
    
    // Cacher le message de succès après 2 secondes
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // Badge de statut
  const getBadge = () => {
    if (product.status === 'Publié' || product.status === 'available') {
      return (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Disponible
        </span>
      );
    }
    if (product.category === 'Smartphones') {
      return (
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Nouveau
        </span>
      );
    }
    return null;
  };

  // Vue liste
  if (viewMode === 'list') {
    return (
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group ${className}`}>
        <div className="flex p-6">
          {/* Image */}
          <div className="flex-shrink-0 w-32 h-32 relative">
            <Link href={`/produit/${product.urlSlug || product.id}`}>
              <div className="relative h-full">
                {getBadge()}
                <ImageWithFallback
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  sizes="128px"
                  fallbackSrc="/placeholder-product.svg"
                />
              </div>
            </Link>
          </div>

          {/* Contenu */}
          <div className="flex-1 ml-6">
            <Link href={`/produit/${product.urlSlug || product.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600">{price.toFixed(2)} €</span>
                {product.variants && (
                  <span className="text-sm text-gray-500">{product.variants}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    showSuccess
                      ? 'bg-green-600 text-white'
                      : isInCart(product.id)
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } ${isAdding ? 'scale-95' : ''}`}
                >
                  {showSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Ajouté !
                    </>
                  ) : isInCart(product.id) ? (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Dans le panier
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Ajouter
                    </>
                  )}
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
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
    <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group ${className}`}>
      <Link href={`/produit/${product.urlSlug || product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
          {getBadge()}
          <ImageWithFallback
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            fallbackSrc="/placeholder-product.svg"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/produit/${product.urlSlug || product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-1 mb-3">
          <p className="text-sm text-gray-600">{product.brand}</p>
          <span className="text-gray-300">•</span>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>

        {/* Note et avis */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">(4.2)</span>
        </div>

        {/* Prix et actions */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-blue-600">{price.toFixed(2)} €</span>
            {product.variants && (
              <p className="text-xs text-gray-500 mt-1">{product.variants}</p>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`p-2 rounded-lg transition-all duration-300 ${
                showSuccess
                  ? 'bg-green-600 text-white'
                  : isInCart(product.id)
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } ${isAdding ? 'scale-95' : ''}`}
              title={isInCart(product.id) ? 'Déjà dans le panier' : 'Ajouter au panier'}
            >
              {showSuccess ? (
                <Check className="w-5 h-5" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Ajouter aux favoris"
            >
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}