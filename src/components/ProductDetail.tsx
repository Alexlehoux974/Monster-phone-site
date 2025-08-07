'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Shield, Truck, RefreshCw, Clock, Award, ChevronRight, Check, Package, Phone, CreditCard, Lock, Heart, Share2, Minus, Plus, Info } from 'lucide-react';
import { Product, ProductVariant } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';
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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Images du produit ou de la variante sélectionnée
  const currentImages = selectedVariant?.images || product.images;
  const mainImage = currentImages[selectedImageIndex] || product.images[0];

  // Prix avec réduction
  const currentPrice = product.price;
  const originalPrice = product.originalPrice || product.price;
  const hasDiscount = product.discount && product.discount > 0;
  const savings = hasDiscount ? originalPrice - currentPrice : 0;

  // Stock de la variante sélectionnée
  const currentStock = selectedVariant?.stock || 10;
  const isInStock = currentStock > 0;
  const isLowStock = currentStock > 0 && currentStock <= 5;

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
          <a href="/" className="hover:text-red-600 transition-colors">Accueil</a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <a href="/nos-produits" className="hover:text-red-600 transition-colors">Produits</a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <a href={`/nos-produits?category=${product.category}`} className="hover:text-red-600 transition-colors">{product.category}</a>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galerie d'images */}
        <div className="space-y-4">
          {/* Image principale */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl">
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white border-0 px-3 py-1.5 font-bold shadow-lg">
                -{product.discount}%
              </Badge>
            )}
            {product.badges?.new && (
              <Badge className="absolute top-4 right-4 z-10 bg-blue-500 text-white">
                Nouveau
              </Badge>
            )}
            <ImageWithFallback
              src={mainImage}
              alt={product.name}
              productCategory={product.category}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Miniatures */}
          {currentImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImageIndex === index ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-gray-300"
                  )}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    productCategory={product.category}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
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
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating.average)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating.average}</span>
                </div>
                <span className="text-gray-600">({product.rating.count} avis)</span>
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
                      {variant.stock === 0 && (
                        <Badge variant="secondary" className="ml-2">Rupture</Badge>
                      )}
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
              {isLowStock && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Plus que {currentStock} en stock
                </Badge>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              {isInStock ? (
                <>
                  <Package className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </>
              ) : (
                'Rupture de stock'
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
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-gray-50 p-1 rounded-xl">
            <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg font-medium">
              Caractéristiques
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-red-500 rounded-full"></span>
                Découvrez le {product.name}
              </h3>
              
              {/* Description structurée en paragraphes courts */}
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {product.description && product.description.split('. ').map((sentence, index) => {
                  if (sentence.length > 100) {
                    return (
                      <p key={index} className="text-base">
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            
              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Points forts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-lg border border-green-100">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {product.das && (
              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Information DAS</span>
                </div>
                <p className="text-sm text-gray-600">
                  DAS (Débit d'Absorption Spécifique) : {product.das} W/kg
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Le DAS maximal autorisé est de 2 W/kg pour la tête et le tronc.
                </p>
              </div>
            )}

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
            </div>
          </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <h3 className="text-xl font-bold mb-4">Caractéristiques techniques</h3>
          {product.specifications && product.specifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {spec.icon && (
                    <span className="text-2xl flex-shrink-0">{spec.icon}</span>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{spec.label}</p>
                    <p className="text-gray-600">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Aucune spécification technique disponible.</p>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Avis clients</h3>
              <Button variant="outline">Écrire un avis</Button>
            </div>

            {product.rating ? (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{product.rating.average}</p>
                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating.average)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.rating.count} avis vérifiés
                    </p>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = product.rating.distribution 
                        ? (product.rating.distribution[stars] / product.rating.count) * 100
                        : 0;
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