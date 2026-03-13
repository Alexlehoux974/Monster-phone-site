'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, Shield, Truck, RefreshCw, Clock, Award, ChevronRight, ChevronLeft, Check, Package, Phone, CreditCard, Lock, Heart, Share2, Minus, Plus, ZoomIn, Eye, X } from 'lucide-react';
import { StarRating } from '@/components/StarRating';
import { Product, ProductVariant } from '@/data/products';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import ProductContentCards from '@/components/ProductContentCards';
import { trackViewItem, trackAddToCart } from '@/lib/tracking/events';
import { useAuth } from '@/contexts/AuthContextSimple';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  // Sélectionner le variant par défaut ou le premier disponible avec du stock
  const defaultVariant = product.variants?.find(v => v.is_default) ||
                        product.variants?.find(v => v.stock > 0) ||
                        product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants || []);
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.basePrice);
  const [productStockQuantity, setProductStockQuantity] = useState(defaultVariant?.stock || 0);
  const [adminDiscountPercent, setAdminDiscountPercent] = useState(defaultVariant?.adminDiscountPercent || 0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 4) + 2);

  // Varier légèrement le viewer count toutes les 15-30s
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(1, Math.min(7, prev + delta));
      });
    }, (Math.random() * 15000) + 15000);
    return () => clearInterval(interval);
  }, []);

  // Vérifier si le produit est dans la wishlist
  useEffect(() => {
    if (isAuthenticated && product.id) {
      checkWishlistStatus();
    }
  }, [isAuthenticated, product.id]);

  const checkWishlistStatus = async () => {
    try {
      const response = await fetch('/api/user/wishlist');
      if (response.ok) {
        const data = await response.json();
        const inWishlist = data.wishlist?.some((item: any) => item.product_id === product.id);
        setIsWishlisted(inWishlist);
      }
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  // 🔄 Synchroniser les états locaux quand les props changent (après refresh)
  useEffect(() => {
    console.log('🔄 [PRODUCT SYNC] Synchronisation des états avec nouvelles props');

    // Réinitialiser le variant sélectionné
    const newDefaultVariant = product.variants?.find(v => v.is_default) ||
                              product.variants?.find(v => v.stock > 0) ||
                              product.variants?.[0];
    setSelectedVariant(newDefaultVariant);

    // Réinitialiser tous les états avec les nouvelles données du produit
    setProductName(product.name);
    setProductPrice(product.basePrice);
    setProductStockQuantity(newDefaultVariant?.stock || 0);
    setAdminDiscountPercent(newDefaultVariant?.adminDiscountPercent || 0);
    setVariants(product.variants || []);
    setSelectedImageIndex(0);
    setQuantity(1);

    console.log('✅ [PRODUCT SYNC] États synchronisés avec:', {
      price: product.basePrice,
      stock: newDefaultVariant?.stock,
      discount: newDefaultVariant?.adminDiscountPercent,
      variants: product.variants?.length
    });

    // 📊 Tracking GA4 - view_item
    trackViewItem({
      item_id: product.sku || product.id,
      item_name: product.name,
      item_brand: product.brandName,
      item_category: product.categoryName,
      item_variant: newDefaultVariant?.color,
      price: product.basePrice,
    });
  }, [product]);

  // Setup real-time subscription for stock and price updates
  useEffect(() => {
    const supabase = createClient();

    // Subscribe to variant stock changes
    const channel = supabase
      .channel('product-detail-realtime')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'product_variants',
        filter: `product_id=eq.${product.id}`
      }, (payload) => {
        // Update variants state (stock + admin_discount_percent)
        setVariants(prev => prev.map(v =>
          v.id === payload.new.id
            ? {
                ...v,
                stock: payload.new.stock,
                adminDiscountPercent: payload.new.admin_discount_percent || 0
              }
            : v
        ));
        // Update selected variant if it's the one that changed
        if (selectedVariant?.id === payload.new.id) {
          setSelectedVariant(prev => prev ? {
            ...prev,
            stock: payload.new.stock,
            adminDiscountPercent: payload.new.admin_discount_percent || 0
          } : prev);
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'products',
        filter: `id=eq.${product.id}`
      }, (payload) => {
        if (payload.new.name) setProductName(payload.new.name);
        setProductPrice(payload.new.price);
        setProductStockQuantity(payload.new.stock_quantity || 0);
        setAdminDiscountPercent(payload.new.admin_discount_percent || 0);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [product.id, selectedVariant?.id]);

  // Combiner toutes les images : images de toutes les variantes
  const getAllImages = () => {
    const allImages: { src: string; variant?: string; variantColor?: string }[] = [];

    // Ajouter les images de chaque variante
    if (product.variants) {
      product.variants.forEach((variant) => {
        if (variant.images && variant.images.length > 0) {
          variant.images.forEach((img) => {
            // Éviter les doublons (comparer sur l'image brute, pas l'URL transformée)
            if (!allImages.find(i => i.src === img)) {
              // ✨ TRANSFORM Cloudinary IDs to full URLs HERE (server-side)
              // This prevents Next.js Image from receiving raw IDs during SSR
              const fullUrl = img.startsWith('http')
                ? img
                : `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${img}.png`;

              allImages.push({
                src: fullUrl, // Now passing full URL instead of Cloudinary ID
                variant: variant.color,
                variantColor: variant.colorCode
              });
            }
          });
        }
      });
    }

    return allImages;
  };

  const allImages = getAllImages();

  // Mettre à jour le prix et la promotion lorsque le variant sélectionné change
  useEffect(() => {
    if (selectedVariant) {
      setAdminDiscountPercent(selectedVariant.adminDiscountPercent || 0);
    }
  }, [selectedVariant]);

  // ✨ IMPORTANT: Fallback image MUST also be transformed from Cloudinary ID to full URL
  const fallbackImage = product.variants?.[0]?.images?.[0];
  const transformedFallback = fallbackImage
    ? (fallbackImage.startsWith('http')
        ? fallbackImage
        : `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${fallbackImage}.png`)
    : '/placeholder-monster.svg';

  const mainImage = allImages[selectedImageIndex]?.src || transformedFallback;

  // Prix avec réduction (utiliser productPrice pour le temps réel)
  const hasAdminDiscount = adminDiscountPercent > 0;
  const finalPrice = hasAdminDiscount
    ? productPrice * (1 - adminDiscountPercent / 100)
    : productPrice;
  const currentPrice = finalPrice;
  const originalPrice = hasAdminDiscount ? productPrice : (product.originalPrice || productPrice);
  const hasDiscount = hasAdminDiscount || (product.discountPercent && product.discountPercent > 0);
  const displayDiscount = hasAdminDiscount ? adminDiscountPercent : product.discountPercent;
  const savings = hasDiscount ? originalPrice - currentPrice : 0;

  // Stock de la variante sélectionnée ou stock du produit principal (utiliser productStockQuantity pour le temps réel)
  const currentStock = variants && variants.length > 0
    ? (selectedVariant?.stock || 0)
    : productStockQuantity;
  const isInStock = currentStock > 0;
  const isLowStock = currentStock > 0 && currentStock <= 5;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant?.color);
    toast.success(`${productName} ajouté au panier`, {
      description: selectedVariant ? `Couleur: ${selectedVariant.color}` : undefined,
    });

    // 📊 Tracking GA4 - add_to_cart
    trackAddToCart({
      item_id: product.sku || product.id,
      item_name: product.name,
      item_brand: product.brandName,
      item_category: product.categoryName,
      item_variant: selectedVariant?.color,
      price: finalPrice,
      quantity: quantity,
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Connectez-vous pour ajouter des favoris');
      router.push('/auth/signin?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        // Retirer de la wishlist
        const response = await fetch(`/api/user/wishlist?product_id=${product.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setIsWishlisted(false);
          toast.success('Retiré des favoris');
        }
      } else {
        // Ajouter à la wishlist
        const response = await fetch('/api/user/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: product.id,
            variant_id: selectedVariant?.id,
          }),
        });
        if (response.ok) {
          setIsWishlisted(true);
          toast.success('Ajouté aux favoris');
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Erreur lors de la mise à jour des favoris');
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productName,
        text: product.shortDescription || product.fullDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papier');
    }
  };

  const handleBuyNow = () => {
    if (!isInStock || quantity > currentStock) {
      toast.error('Produit indisponible');
      return;
    }
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">Accueil</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link href="/nos-produits" className="hover:text-red-600 transition-colors">Produits</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link href={`/nos-produits?category=${encodeURIComponent(product.categoryName)}`} className="hover:text-red-600 transition-colors">{product.categoryName}</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">{productName}</span>
        </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galerie d'images */}
        <div className="space-y-4">
          {/* Image principale avec navigation */}
          <div className="relative">
            <div
              className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 px-3 py-1.5 font-bold shadow-lg">
                  -{displayDiscount}%
                </Badge>
              )}
              {product.isNewArrival && (
                <Badge className="absolute top-4 right-4 z-10 bg-blue-500 text-white">
                  Nouveau
                </Badge>
              )}
              
              {/* Indicateur de zoom */}
              <div className="absolute bottom-4 right-4 z-10 bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-5 w-5" />
              </div>
              
              <ImageWithFallback
                src={mainImage}
                alt={product.name}
                productCategory={product.categoryName}
                fill
                className="object-contain transition-transform duration-300"
                priority
              />
            </div>
            
            {/* Flèches de navigation si plus d'une image */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const newIndex = selectedImageIndex === 0 ? allImages.length - 1 : selectedImageIndex - 1;
                    setSelectedImageIndex(newIndex);
                    // Si l'image appartient à une variante, la sélectionner
                    if (allImages[newIndex].variant) {
                      const variant = product.variants?.find(v => v.color === allImages[newIndex].variant);
                      if (variant) setSelectedVariant(variant);
                    }
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={() => {
                    const newIndex = selectedImageIndex === allImages.length - 1 ? 0 : selectedImageIndex + 1;
                    setSelectedImageIndex(newIndex);
                    // Si l'image appartient à une variante, la sélectionner
                    if (allImages[newIndex].variant) {
                      const variant = product.variants?.find(v => v.color === allImages[newIndex].variant);
                      if (variant) setSelectedVariant(variant);
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Carrousel de miniatures avec toutes les images et variants */}
          <div className="space-y-2">
            {/* Mobile: Scroll horizontal - Toujours visible */}
            <div className="block lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      if (image.variant) {
                        const variant = product.variants?.find(v => v.color === image.variant);
                        if (variant) {
                          setSelectedVariant(variant);
                        }
                      }
                    }}
                    className={cn(
                      "relative flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all snap-start",
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-gray-200"
                    )}
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={`${product.name} - ${image.variant ? `Couleur ${image.variant}` : `Image ${index + 1}`}`}
                      productCategory={product.categoryName}
                      fill
                      className="object-contain"
                    />
                    {image.variant && image.variantColor && (
                      <div className="absolute bottom-1 right-1 p-0.5 bg-white/90 rounded-full shadow-sm">
                        <div
                          className="w-2 h-2 rounded-full border border-gray-300"
                          style={{ backgroundColor: image.variantColor }}
                          title={image.variant}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Desktop: Grille 5 colonnes - Toujours visible avec minimum 8 images */}
            <div className="hidden lg:grid grid-cols-5 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      if (image.variant) {
                        const variant = product.variants?.find(v => v.color === image.variant);
                        if (variant) {
                          setSelectedVariant(variant);
                        }
                      }
                    }}
                    className={cn(
                      "relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all group",
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/20 shadow-lg"
                        : "border-gray-200 hover:border-primary/50 hover:shadow-md"
                    )}
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={`${product.name} - ${image.variant ? `Couleur ${image.variant}` : `Image ${index + 1}`}`}
                      productCategory={product.categoryName}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                    {image.variant && image.variantColor && (
                      <div className="absolute bottom-1 right-1 p-1 bg-white/90 rounded-full shadow-sm">
                        <div
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: image.variantColor }}
                          title={image.variant}
                        />
                      </div>
                    )}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Informations produit */}
        <div className="space-y-6">
          {/* En-tête */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">{product.brandName}</p>
                <h1 className="text-3xl font-bold text-gray-900">{productName}</h1>
                {product.sku && (
                  <p className="text-sm text-gray-500 mt-1">Réf: {product.sku}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                  className={cn(isWishlisted && "text-red-500 border-red-500")}
                  title={isAuthenticated ? (isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris") : "Connectez-vous pour ajouter aux favoris"}
                >
                  {wishlistLoading ? (
                    <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                  )}
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Note et avis */}
            {product.rating && product.rating.count > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <StarRating average={product.rating?.average || 0} size="md" />
                <span className="ml-1 font-semibold">{product.rating?.average?.toFixed(1) || "0.0"}</span>
                <span className="text-gray-600">({product.rating?.count || 0} avis*)</span>
              </div>
            )}
          </div>

          {/* Prix */}
          <div className="border-y py-4">
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(currentPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <Badge variant="destructive">Économisez {formatPrice(savings)}</Badge>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">Prix TTC - Éco-participation incluse</p>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mt-2">
              <Shield className="w-4 h-4" />
              Meilleur prix garanti à La Réunion
            </div>
          </div>

          {/* Sélecteur de variantes */}
          {variants && variants.length > 0 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Couleur : <span className="font-normal">{selectedVariant?.color}</span>
              </Label>
              <RadioGroup
                value={selectedVariant?.color}
                onValueChange={(value) => {
                  const variant = variants?.find(v => v.color === value);
                  if (!variant) return;
                  setSelectedVariant(variant);
                  setQuantity(1);
                  // Trouver la première image de ce variant dans la galerie
                  const idx = allImages.findIndex(img => img.variant === value);
                  if (idx >= 0) {
                    setSelectedImageIndex(idx);
                  }
                }}
                className="flex flex-wrap gap-2"
              >
                {variants.map((variant: any) => (
                  <div key={variant.color} className="relative">
                    <RadioGroupItem
                      value={variant.color}
                      id={variant.color}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={variant.color}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all",
                        "hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5",
                        variant.stock === 0 && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {variant.colorCode && (
                        <span
                          className="w-5 h-5 rounded-full border"
                          style={{ backgroundColor: variant.colorCode }}
                        />
                      )}
                      <span>{variant.color}</span>
                      {variant.stock === 0 ? (
                        <Badge variant="secondary" className="ml-2 text-red-600">Rupture</Badge>
                      ) : variant.stock <= 5 ? (
                        <Badge variant="secondary" className="ml-2 text-orange-600">{variant.stock} restant{variant.stock > 1 ? 's' : ''}</Badge>
                      ) : null}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {selectedVariant?.ean && (
                <p className="text-xs text-gray-500 mt-2">EAN: {selectedVariant.ean}</p>
              )}
            </div>
          )}

          {/* Quantité et ajout au panier */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="text-base font-semibold">Quantité :</Label>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= currentStock}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {/* Alerte stock - Affichage uniquement si rupture ou moins de 5 en stock */}
              {isOutOfStock ? (
                <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">
                  ❌ Rupture de stock
                </Badge>
              ) : isLowStock ? (
                <div className="space-y-2">
                  <Badge variant="outline" className="text-orange-600 border-orange-600 font-semibold animate-pulse">
                    ⚠️ Plus que {currentStock} en stock !
                  </Badge>
                  <p className="text-xs text-orange-700">
                    Commandez vite, stock limité
                  </p>
                </div>
              ) : null}
            </div>

            {/* Viewer count - social proof */}
            {isInStock && (
              <div className="flex items-center gap-2 text-orange-600 text-sm">
                <Eye className="w-4 h-4" />
                <span>{viewerCount} personnes regardent ce produit</span>
              </div>
            )}

            <Button
              onClick={handleAddToCart}
              disabled={!isInStock || quantity > currentStock}
              className={cn(
                "w-full h-12 text-lg font-semibold transition-all shadow-lg",
                isOutOfStock ? "opacity-50 cursor-not-allowed bg-gray-400" :
                isLowStock ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white animate-pulse" :
                "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-[1.02] hover:shadow-xl"
              )}
              size="lg"
            >
              {isOutOfStock ? (
                <>❌ Rupture de stock</>
              ) : isLowStock ? (
                <>
                  <Package className="mr-2 h-5 w-5" />
                  Commander vite - Stock limité !
                </>
              ) : (
                <>
                  <Package className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </>
              )}
            </Button>

            {/* Bouton Procéder au paiement */}
            <Button
              onClick={handleBuyNow}
              disabled={!isInStock || quantity > currentStock}
              variant="outline"
              className={cn(
                "w-full h-12 text-lg font-semibold transition-all duration-300 group",
                "hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:scale-[1.02]",
                "active:scale-[0.98]",
                !isInStock && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-current hover:scale-100"
              )}
              size="lg"
            >
              <CreditCard className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Procéder au paiement
            </Button>

            {/* Badges de confiance */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Livraison gratuite dès 100€</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Garantie 2 ans</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RefreshCw className="h-4 w-4 text-purple-600" />
                <span>Retour sous 14 jours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-orange-600" />
                <span>Expédition en 24H</span>
              </div>
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Service client réactif</p>
                <p className="text-sm text-gray-600">Réponse en moins de 24h</p>
              </div>
            </div>
          </div>

          {/* Paiement sécurisé avec logos */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold">Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { name: 'Visa', src: '/payment-logos/visa.webp' },
                { name: 'Mastercard', src: '/payment-logos/mastercard.webp' },
                { name: 'American Express', src: '/payment-logos/american-express.png' },
                { name: 'Stripe', src: '/payment-logos/stripe.png' },
              ].map((m) => (
                <div key={m.name} className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 flex items-center justify-center" style={{ minWidth: '60px', height: '36px' }}>
                  <Image src={m.src} alt={m.name} width={48} height={28} className="object-contain" style={{ height: 'auto', maxHeight: '24px' }} />
                </div>
              ))}
              <Badge variant="outline" className="text-xs">
                <CreditCard className="h-3 w-3 mr-1" />
                PayPal
              </Badge>
              <Badge variant="outline" className="text-xs">
                Apple Pay
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-2">SSL 256-bit &bull; Certifié PCI DSS &bull; Données cryptées</p>
          </div>
        </div>
      </div>

      {/* Product Content Cards - CMS-managed content with modern card layout */}
      <ProductContentCards productId={product.id} productCategory={product.categoryName} productBrand={product.brandName} productSlug={product.urlSlug} />
      </div>

      {/* Lightbox galerie fullscreen */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            (e.currentTarget as any)._touchStartX = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const startX = (e.currentTarget as any)._touchStartX;
            if (startX === undefined) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
              if (diff > 0 && selectedImageIndex < allImages.length - 1) {
                setSelectedImageIndex(prev => prev + 1);
              } else if (diff < 0 && selectedImageIndex > 0) {
                setSelectedImageIndex(prev => prev - 1);
              }
            }
            delete (e.currentTarget as any)._touchStartX;
          }}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Compteur */}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            {selectedImageIndex + 1} / {allImages.length}
          </div>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{ touchAction: 'pinch-zoom' }}
          >
            <ImageWithFallback
              src={allImages[selectedImageIndex]?.src || transformedFallback}
              alt={product.name}
              productCategory={product.categoryName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Navigation gauche */}
          {allImages.length > 1 && selectedImageIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => prev - 1); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
              aria-label="Image précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Navigation droite */}
          {allImages.length > 1 && selectedImageIndex < allImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(prev => prev + 1); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Miniatures en bas */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 rounded-full px-3 py-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(i); }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    i === selectedImageIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}