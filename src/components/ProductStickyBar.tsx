'use client';

import { useState, useEffect } from 'react';
import { Package, CreditCard } from 'lucide-react';
import { Product, ProductVariant } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ProductStickyBarProps {
  product: Product;
}

export default function ProductStickyBar({ product }: ProductStickyBarProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Sélectionner le variant par défaut ou le premier disponible avec du stock
  const defaultVariant = product.variants?.find(v => v.is_default) ||
                        product.variants?.find(v => v.stock > 0) ||
                        product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [quantity] = useState(1);

  // Calculer le prix final avec promotion variant
  const activeDiscount = selectedVariant?.adminDiscountPercent || 0;

  const finalPrice = activeDiscount > 0
    ? product.basePrice * (1 - activeDiscount / 100)
    : product.basePrice;
  const originalPrice = activeDiscount > 0 ? product.basePrice : (product.discountPercent && product.discountPercent > 0 ? product.basePrice : product.basePrice);

  // Déterminer le stock disponible
  const currentStock = selectedVariant?.stock ?? 0;
  const isInStock = currentStock > 0;
  const isOutOfStock = currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= 5;

  const handleAddToCart = () => {
    if (!isInStock || quantity > currentStock) {
      toast.error('Stock insuffisant');
      return;
    }

    // Appeler addToCart avec le produit complet et le variant color
    addToCart(product, quantity, selectedVariant?.color);

    toast.success('Produit ajouté au panier', {
      description: selectedVariant
        ? `${product.name} - ${selectedVariant.color}`
        : product.name,
    });
  };

  const handleBuyNow = () => {
    if (!isInStock || quantity > currentStock) {
      toast.error('Stock insuffisant');
      return;
    }

    // Appeler addToCart avec le produit complet et le variant color
    addToCart(product, quantity, selectedVariant?.color);

    // Rediriger vers le panier
    router.push('/panier');
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-xl z-40 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Product Info */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xl font-bold text-primary">{finalPrice.toFixed(2)} €</span>
              {originalPrice && originalPrice !== finalPrice && (
                <span className="text-sm text-gray-500 line-through">{originalPrice.toFixed(2)} €</span>
              )}
            </div>
          </div>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-900 hidden sm:block whitespace-nowrap">
                Couleur:
              </span>
              <div className="flex gap-2">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={cn(
                      'px-5 py-2.5 rounded-lg font-extrabold text-sm transition-all duration-200 border-2 whitespace-nowrap shadow-md',
                      selectedVariant?.id === variant.id
                        ? 'bg-primary border-primary text-white scale-105 shadow-lg ring-2 ring-primary/30'
                        : variant.stock === 0
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-primary hover:shadow-lg'
                    )}
                  >
                    {variant.color}
                    {variant.stock === 0 && (
                      <span className="ml-1.5 text-xs font-normal">(épuisé)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={cn(
                'flex-1 sm:flex-none font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.98]',
                isOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isLowStock
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white animate-pulse'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-[1.02] hover:shadow-xl'
              )}
            >
              {isOutOfStock ? (
                <>❌ Rupture de stock</>
              ) : isLowStock ? (
                <>
                  <Package className="inline mr-2 h-4 w-4" />
                  Commander vite !
                </>
              ) : (
                <>
                  <Package className="inline mr-2 h-4 w-4" />
                  Ajouter au panier
                </>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={cn(
                'flex-1 sm:flex-none border-2 font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 active:scale-[0.98]',
                isOutOfStock
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:scale-[1.02]'
              )}
            >
              <CreditCard className="inline mr-2 h-4 w-4" />
              Paiement rapide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
