'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, Shield, Truck, RefreshCw, Clock, Award, ChevronRight, ChevronLeft, Check, Package, Phone, CreditCard, Lock, Heart, Share2, Minus, Plus, ZoomIn } from 'lucide-react';
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

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  // Sélectionner le variant par défaut ou le premier disponible avec du stock
  const defaultVariant = product.variants?.find(v => v.is_default) ||
                        product.variants?.find(v => v.stock > 0) ||
                        product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants || []);
  const [productPrice, setProductPrice] = useState(product.basePrice);
  const [productStockQuantity, setProductStockQuantity] = useState(defaultVariant?.stock || 0);
  const [adminDiscountPercent, setAdminDiscountPercent] = useState(defaultVariant?.adminDiscountPercent || 0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // 🔄 Synchroniser les états locaux quand les props changent (après refresh)
  useEffect(() => {
    console.log('🔄 [PRODUCT SYNC] Synchronisation des états avec nouvelles props');

    // Réinitialiser le variant sélectionné
    const newDefaultVariant = product.variants?.find(v => v.is_default) ||
                              product.variants?.find(v => v.stock > 0) ||
                              product.variants?.[0];
    setSelectedVariant(newDefaultVariant);

    // Réinitialiser tous les états avec les nouvelles données du produit
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
        setProductPrice(payload.new.price);
        setProductStockQuantity(payload.new.stock_quantity || 0);
        setAdminDiscountPercent(payload.new.admin_discount_percent || 0);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [product.id, selectedVariant?.id]);

  // Mettre à jour le prix et la promotion lorsque le variant sélectionné change
  useEffect(() => {
    if (selectedVariant) {
      // Utiliser la promotion du variant sélectionné
      setAdminDiscountPercent(selectedVariant.adminDiscountPercent || 0);
    }
  }, [selectedVariant]);

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
    toast.success(`${product.name} ajouté au panier`, {
      description: selectedVariant ? `Couleur: ${selectedVariant.color}` : undefined,
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
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
    router.push('/panier');
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
          <Link href={`/nos-produits?category=${product.categoryName}`} className="hover:text-red-600 transition-colors">{product.categoryName}</Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galerie d'images */}
        <div className="space-y-4">
          {/* Image principale avec navigation */}
          <div className="relative">
            <div 
              className={cn(
                "relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl cursor-zoom-in group",
                isZoomed && "cursor-zoom-out"
              )}
              onClick={() => setIsZoomed(!isZoomed)}
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
                className={cn(
                  "object-contain transition-transform duration-300",
                  isZoomed && "scale-150"
                )}
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
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                {product.sku && (
                  <p className="text-sm text-gray-500 mt-1">Réf: {product.sku}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  className={cn(isWishlisted && "text-red-500 border-red-500")}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Note et avis */}
            {product.rating && product.rating.count > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating?.average || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="ml-2 font-semibold">
                    {product.rating?.average?.toFixed(1) || "0.0"}
                  </span>
                </div>
                <span className="text-gray-600">({product.rating?.count || 0} avis)</span>
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
                  setSelectedVariant(variant);
                  setSelectedImageIndex(0);
                  setQuantity(1);
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
                <span>Livraison gratuite dès 50€</span>
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

          {/* Paiement sécurisé */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold">Paiement 100% sécurisé</span>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                <CreditCard className="h-3 w-3 mr-1" />
                Visa
              </Badge>
              <Badge variant="outline">
                <CreditCard className="h-3 w-3 mr-1" />
                Mastercard
              </Badge>
              <Badge variant="outline">
                <CreditCard className="h-3 w-3 mr-1" />
                PayPal
              </Badge>
              <Badge variant="outline">
                <CreditCard className="h-3 w-3 mr-1" />
                Apple Pay
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Product Content Cards - CMS-managed content with modern card layout */}
      <ProductContentCards productId={product.id} productCategory={product.categoryName} productBrand={product.brandName} />
      </div>
    </div>
  );
}