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

  const mainImage = selectedVariant?.images?.[0] || product.variants?.[0]?.images?.[0] || '';
  const hasDiscount = product.discountPercent && product.discountPercent > 0;
  const hasAdminDiscount = selectedVariant?.adminDiscountPercent && selectedVariant.adminDiscountPercent > 0;
  const outOfStock = isCompletelyOutOfStock(product);

  // Calculer le prix final avec la réduction admin
  const finalPrice = hasAdminDiscount
    ? product.basePrice * (1 - selectedVariant.adminDiscountPercent! / 100)
    : product.basePrice;

  // Vérifier le stock: pour variants
  const isInStock = selectedVariant
    ? selectedVariant.stock > 0
    : (product.variants?.[0]?.stock || 0) > 0;

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
                  {hasAdminDiscount && (
                    <Badge className="bg-red-500 text-white">
                      -{selectedVariant?.adminDiscountPercent}%
                    </Badge>
                  )}
                  {!hasAdminDiscount && hasDiscount && (
                    <Badge className="bg-red-500 text-white">
                      -{product.discountPercent}%
                    </Badge>
                  )}
                  {outOfStock && (
                    <Badge className="bg-gray-500 text-white">
                      Rupture de stock
                    </Badge>
                  )}
                </div>
                <ImageWithFallback
                  src={mainImage}
                  alt={product.name}
                  productCategory={product.categoryName}
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
            <p className="text-sm text-gray-600 mb-2">{product.brandName}</p>
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {product.shortDescription || product.fullDescription}
            </p>
            
            {/* Note */}
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
              {product.rating && product.rating.count > 0 && (
                <span className="text-sm text-gray-600 ml-1">
                  ({product.rating.count} avis)
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(finalPrice)}
              </span>
              {(hasAdminDiscount || hasDiscount) && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.basePrice)}
                </span>
              )}
              {product.variants && product.variants.length > 1 && (
                <span className="text-sm text-gray-500">
                  {product.variants.length} variantes
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/produit/${product.urlSlug}`}
                className="px-6 py-2 text-center rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Voir le produit
              </Link>
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !isInStock}
                className={cn(
                  "px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
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
                  'Rupture de stock'
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Acheter maintenant
                  </>
                )}
              </button>
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
            {hasAdminDiscount && (
              <Badge className="bg-red-500 text-white">
                -{selectedVariant?.adminDiscountPercent}%
              </Badge>
            )}
            {!hasAdminDiscount && hasDiscount && (
              <Badge className="bg-red-500 text-white">
                -{product.discountPercent}%
              </Badge>
            )}
            {product.isNewArrival && (
              <Badge className="bg-blue-500 text-white">
                Nouveau
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-orange-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Best-seller
              </Badge>
            )}
            {outOfStock && (
              <Badge className="bg-gray-500 text-white">
                Rupture de stock
              </Badge>
            )}
          </div>
          
          {/* Badge garantie */}
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="outline" className="bg-white/90">
              <Shield className="w-3 h-3 mr-1" />
              2 ans Garantie
            </Badge>
          </div>
          
          <ImageWithFallback
            src={mainImage}
            alt={product.name}
            productCategory={product.categoryName}
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
          <p className="text-sm text-gray-600">{product.brandName}</p>
          <span className="text-gray-300">•</span>
          <p className="text-sm text-gray-600">{product.categoryName}</p>
        </div>

        {/* Note et avis */}
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
          {product.rating && product.rating.count > 0 && (
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating.count} avis)
            </span>
          )}
        </div>

        {/* Prix */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(finalPrice)}
            </span>
            {(hasAdminDiscount || hasDiscount) && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>
          {product.variants && product.variants.length > 1 && (
            <p className="text-xs text-gray-500 mt-1">
              {product.variants.length} variantes disponibles
            </p>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/produit/${product.urlSlug}`}
            className="w-full px-4 py-2 text-center rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
          >
            Voir le produit
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !isInStock}
            className={cn(
              "w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
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
              'Rupture de stock'
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Acheter maintenant
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}