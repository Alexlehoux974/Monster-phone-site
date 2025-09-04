'use client';

import { useState } from 'react';
import Link from 'next/link';
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

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  // Sélectionner le variant par défaut ou le premier disponible avec du stock
  const defaultVariant = product.variants?.find(v => v.is_default) || 
                        product.variants?.find(v => v.stock > 0) || 
                        product.variants?.[0];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Combiner toutes les images : produit principal + images de toutes les variantes
  const getAllImages = () => {
    const allImages: { src: string; variant?: string; variantColor?: string }[] = [];
    
    // Ajouter les images du produit principal
    product.images.forEach((img) => {
      allImages.push({ src: img });
    });
    
    // Ajouter les images de chaque variante
    if (product.variants) {
      product.variants.forEach((variant) => {
        if (variant.images && variant.images.length > 0) {
          variant.images.forEach((img) => {
            // Éviter les doublons
            if (!allImages.find(i => i.src === img)) {
              allImages.push({ 
                src: img, 
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
  const mainImage = allImages[selectedImageIndex]?.src || product.images[0];

  // Prix avec réduction
  const currentPrice = product.price;
  const originalPrice = product.originalPrice || product.price;
  const hasDiscount = product.discount && product.discount > 0;
  const savings = hasDiscount ? originalPrice - currentPrice : 0;

  // Stock de la variante sélectionnée ou stock du produit principal
  const currentStock = product.hasVariants 
    ? (selectedVariant?.stock || 0) 
    : (product.stock || 0);
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
        text: product.description || product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papier');
    }
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
          <Link href={`/nos-produits?category=${product.category}`} className="hover:text-red-600 transition-colors">{product.category}</Link>
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
                  -{product.discount}%
                </Badge>
              )}
              {product.badges?.includes('Nouveau') && (
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
                productCategory={product.category}
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
          {allImages.length > 1 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">
                  {allImages.length} images disponibles
                </p>
                {allImages.some(img => img.variant) && (
                  <p className="text-xs text-gray-500">
                    Cliquez pour voir les différentes couleurs
                  </p>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      // Si l'image appartient à une variante, la sélectionner
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
                      productCategory={product.category}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                    {/* Badge de couleur si c'est une image de variante */}
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
          )}
        </div>

        {/* Informations produit */}
        <div className="space-y-6">
          {/* En-tête */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
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
          {product.variants && product.variants.length > 0 && (
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Couleur : <span className="font-normal">{selectedVariant?.color}</span>
              </Label>
              <RadioGroup
                value={selectedVariant?.color}
                onValueChange={(value) => {
                  const variant = product.variants?.find(v => v.color === value);
                  setSelectedVariant(variant);
                  setSelectedImageIndex(0);
                  setQuantity(1);
                }}
                className="flex flex-wrap gap-2"
              >
                {product.variants.map((variant) => (
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

            {/* Badges de confiance */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Livraison gratuite dès 50€</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Garantie {product.warranty || '2 ans'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RefreshCw className="h-4 w-4 text-purple-600" />
                <span>Retour sous 14 jours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-orange-600" />
                <span>Expédition {product.deliveryTime || '24-48h'}</span>
              </div>
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Besoin d'aide ?</p>
                <p className="text-sm text-gray-600">Appelez-nous au 0262 xx xx xx</p>
              </div>
            </div>
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

      {/* Tabs avec description, spécifications, avis */}
      <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Tabs defaultValue="description" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto bg-gray-50 p-1 rounded-xl">
            <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
              Description
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
              Avis ({product.rating?.count || 0})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
              Livraison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              
              {/* Description avec rendu HTML */}
              <div className="prose prose-gray max-w-none">
                {product.description && (
                  product.description.startsWith('<') ? (
                    // Si la description commence par une balise HTML, la rendre directement
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  ) : (
                    // Sinon, afficher comme du texte simple en paragraphes
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      {product.description.split('. ').map((sentence, index) => {
                        if (sentence.trim()) {
                          return (
                            <p key={index} className="text-base">
                              {sentence.trim()}{!sentence.endsWith('.') && '.'}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )
                )}
              </div>
            

              {product.repairabilityIndex && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mt-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-6 w-6 text-green-600" />
                        <span className="font-bold text-gray-900">Indice de réparabilité</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-green-600">
                          {product.repairabilityIndex}/10
                        </span>
                        <span className="text-base font-medium text-gray-700">
                          {product.repairabilityIndex >= 8 ? '🌟 Excellent' :
                           product.repairabilityIndex >= 6 ? '✅ Bon' :
                           product.repairabilityIndex >= 4 ? '🔶 Moyen' : '⚠️ Faible'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Produit éco-responsable</p>
                      <p className="text-xs text-gray-500 mt-1">Réparable facilement</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Valeurs DAS (Débit d'Absorption Spécifique) */}
              {(product.dasHead || product.dasBody || product.dasLimb) && (
                <div className="bg-blue-50 rounded-xl p-6 mt-6 border border-blue-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-gray-900">Débit d'absorption spécifique (DAS)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {product.dasHead && (
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600 mb-1">Tête</p>
                        <p className="text-lg font-bold text-blue-700">{product.dasHead} W/kg</p>
                      </div>
                    )}
                    {product.dasBody && (
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600 mb-1">Corps</p>
                        <p className="text-lg font-bold text-blue-700">{product.dasBody} W/kg</p>
                      </div>
                    )}
                    {product.dasLimb && (
                      <div className="bg-white rounded-lg p-3 text-center">
                        <p className="text-sm text-gray-600 mb-1">Membres</p>
                        <p className="text-lg font-bold text-blue-700">{product.dasLimb} W/kg</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>


        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Avis clients</h3>
              <Button variant="outline">Écrire un avis</Button>
            </div>

            {product.rating?.reviews && product.rating.reviews.length > 0 ? (
              <>
                {/* Résumé des avis */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold">
                        {product.rating?.average?.toFixed(1) || "0.0"}
                      </p>
                      <div className="flex items-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(product.rating?.average || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {product.rating?.count || 0} avis vérifiés
                      </p>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = product.rating?.distribution?.[stars as keyof typeof product.rating.distribution] || 0;
                        const percentage = product.rating?.count ? (count / product.rating.count) * 100 : 0;
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-sm w-4">{stars}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-10 text-right">
                              {Math.round(percentage)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Liste des avis */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {(product.rating?.reviews || []).slice(0, 10).map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{review.author}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Achat vérifié
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3 w-3",
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                      )}
                      <p className="text-gray-700">{review.comment}</p>
                      {(review.helpful || 0) > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          {review.helpful} personne(s) ont trouvé cet avis utile
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {(product.rating?.reviews?.length || 0) > 10 && (
                  <Button variant="outline" className="w-full">
                    Voir tous les {product.rating?.reviews?.length || 0} avis
                  </Button>
                )}
              </>
            ) : (
              <p className="text-gray-600">Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Informations de livraison</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Livraison express</p>
                    <p className="text-sm text-gray-600">
                      Livraison en {product.deliveryTime || '24-48h'} à La Réunion (974)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Frais de port offerts</p>
                    <p className="text-sm text-gray-600">
                      Pour toute commande supérieure à 50€
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Préparation rapide</p>
                    <p className="text-sm text-gray-600">
                      Commande préparée le jour même si passée avant 14h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Politique de retour</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">14 jours pour changer d'avis</p>
                    <p className="text-sm text-gray-600">
                      Retour gratuit sous 14 jours après réception
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Garantie {product.warranty || '2 ans'}</p>
                    <p className="text-sm text-gray-600">
                      Garantie constructeur couvrant les défauts de fabrication
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Service après-vente local</p>
                    <p className="text-sm text-gray-600">
                      SAV disponible à La Réunion pour un support rapide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
  </div>
  );
}