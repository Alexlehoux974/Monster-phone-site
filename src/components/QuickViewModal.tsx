'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import ImageWithFallback from './ImageWithFallback';
import { formatPrice, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const images = product.variants?.flatMap(v =>
    (v.images || []).map(img => ({
      src: img.startsWith('http') ? img : `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${img}.png`,
      variant: v.color
    }))
  ) || [];

  const currentImage = images[imageIndex]?.src || '/placeholder-monster.svg';

  const hasAdminDiscount = selectedVariant?.adminDiscountPercent && selectedVariant.adminDiscountPercent > 0;
  const finalPrice = hasAdminDiscount
    ? product.basePrice * (1 - selectedVariant!.adminDiscountPercent! / 100)
    : product.basePrice;
  const hasDiscount = hasAdminDiscount || (product.originalPrice && product.originalPrice > product.basePrice);
  const isInStock = selectedVariant ? selectedVariant.stock > 0 : (product.variants?.[0]?.stock || 0) > 0;

  const handleAddToCart = () => {
    if (!isInStock) return;
    addToCart(product, 1, selectedVariant?.color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-gray-50 rounded-tl-2xl sm:rounded-bl-2xl overflow-hidden">
            {hasDiscount && (
              <Badge className="absolute top-3 left-3 z-10 bg-red-500 text-white">
                -{hasAdminDiscount ? selectedVariant?.adminDiscountPercent : product.discountPercent}%
              </Badge>
            )}
            <ImageWithFallback
              src={currentImage}
              alt={product.name}
              productCategory={product.categoryName}
              fill
              className="object-contain p-4"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            {images.length > 1 && (
              <>
                {imageIndex > 0 && (
                  <button
                    onClick={() => setImageIndex(prev => prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                {imageIndex < images.length - 1 && (
                  <button
                    onClick={() => setImageIndex(prev => prev + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Infos */}
          <div className="p-5 flex flex-col">
            <p className="text-sm text-gray-500 mb-1">{product.brandName}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

            {/* Prix */}
            <div className="flex items-end gap-2 mb-3">
              <span className="text-2xl font-bold text-blue-600">{formatPrice(finalPrice)}</span>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(hasAdminDiscount ? product.basePrice : (product.originalPrice || product.basePrice))}
                </span>
              )}
            </div>

            {/* Description courte */}
            {product.shortDescription && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{product.shortDescription}</p>
            )}

            {/* Sélecteur de variantes */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Couleur :</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <button
                      key={v.color}
                      onClick={() => {
                        setSelectedVariant(v);
                        const idx = images.findIndex(img => img.variant === v.color);
                        if (idx >= 0) setImageIndex(idx);
                      }}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all",
                        selectedVariant?.color === v.color
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300",
                        v.stock === 0 && "opacity-40"
                      )}
                    >
                      {v.colorCode && (
                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: v.colorCode }} />
                      )}
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-2">
              {/* Ajouter au panier */}
              <Button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className={cn(
                  "w-full",
                  added
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700",
                  !isInStock && "opacity-50 cursor-not-allowed"
                )}
              >
                {added ? (
                  <><Check className="w-4 h-4 mr-2" /> Ajouté !</>
                ) : !isInStock ? (
                  'Rupture de stock'
                ) : (
                  <><ShoppingCart className="w-4 h-4 mr-2" /> Ajouter au panier</>
                )}
              </Button>

              {/* Voir le produit */}
              <Link
                href={`/produit/${product.urlSlug}`}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
                onClick={onClose}
              >
                Voir tous les détails
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
