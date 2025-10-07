'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Star, Check, Zap, Shield } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { formatPrice, cn, isCompletelyOutOfStock } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, className = '', viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);

  const mainImage = product.images[0] || '';
  const hasDiscount = product.discount && product.discount > 0;

  // Vérifier le stock: pour variants OU pour produits directs
  const isInStock = selectedVariant
    ? selectedVariant.stock > 0
    : (product.stockQuantity !== undefined ? product.stockQuantity > 0 : true);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInStock) return;
    
    setIsAdding(true);
    
    // Simuler un délai pour l'animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product, 1, selectedVariant?.color);
    setIsAdding(false);
    setShowSuccess(true);
    
    // Cacher le message de succès après 2 secondes
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  // Vue liste
  if (viewMode === 'list') {
    return (
      <div className={cn("bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group", className)}>
        <div className="flex p-6">
          {/* Image */}
          <div className="flex-shrink-0 w-32 h-32 relative">
            <Link href={`/produit/${product.urlSlug}`}>
              <div className="relative h-full">
                <div className="absolute top-0 left-0 z-10 flex flex-col gap-1">
                  {hasDiscount && (
                    <Badge className="bg-red-500 text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  {isCompletelyOutOfStock(product) && (
                    <Badge className="bg-gray-500 text-white">
                      Rupture de stock
                    </Badge>
                  )}
                </div>
                <ImageWithFallback
                  src={mainImage}
                  alt={product.name}
                  productCategory={product.category}
                  fill
                  className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                  sizes="128px"
                />
              </div>
            </Link>
          </div>

          {/* Contenu */}
          <div className="flex-1 ml-6">
            <Link href={`/produit/${product.urlSlug}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {product.shortDescription || product.description}
            </p>
            
            {/* Note */}
            {product.rating && product.rating.average > 0 && (
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating?.average || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  ({product.rating.average}) • {product.rating.count || 0} avis
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                )}
                {product.variants && product.variants.length > 1 && (
                  <span className="text-sm text-gray-500">
                    {product.variants.length} variantes
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || !isInStock}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                    showSuccess
                      ? "bg-green-600 text-white"
                      : isInCart(product.id)
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-blue-600 text-white hover:bg-blue-700",
                    (isAdding || !isInStock) && "opacity-50 cursor-not-allowed",
                    isAdding && "scale-95"
                  )}
                >
                  {showSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Ajouté !
                    </>
                  ) : !isInStock ? (
                    'Rupture'
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
    <div className={cn("bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group", className)}>
      <Link href={`/produit/${product.urlSlug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-50">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {hasDiscount && (
              <Badge className="bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
            {product.badges?.includes('Nouveau') && (
              <Badge className="bg-blue-500 text-white">
                Nouveau
              </Badge>
            )}
            {product.badges?.includes('Bestseller') && (
              <Badge className="bg-orange-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Best-seller
              </Badge>
            )}
            {isCompletelyOutOfStock(product) && (
              <Badge className="bg-gray-500 text-white">
                Rupture de stock
              </Badge>
            )}
          </div>
          
          {/* Badge garantie */}
          {product.warranty && (
            <div className="absolute top-2 right-2 z-10">
              <Badge variant="outline" className="bg-white/90">
                <Shield className="w-3 h-3 mr-1" />
                {product.warranty}
              </Badge>
            </div>
          )}
          
          <ImageWithFallback
            src={mainImage}
            alt={product.name}
            productCategory={product.category}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/produit/${product.urlSlug}`}>
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
        {product.rating && product.rating.average > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating?.average || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating.average})
            </span>
          </div>
        )}

        {/* Prix et actions */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>
            {product.variants && product.variants.length > 1 && (
              <p className="text-xs text-gray-500 mt-1">
                {product.variants.length} variantes disponibles
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !isInStock}
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                showSuccess
                  ? "bg-green-600 text-white"
                  : isInCart(product.id)
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-blue-600 text-white hover:bg-blue-700",
                (isAdding || !isInStock) && "opacity-50 cursor-not-allowed",
                isAdding && "scale-95"
              )}
              title={!isInStock ? "Rupture de stock" : isInCart(product.id) ? "Déjà dans le panier" : "Ajouter au panier"}
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