'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContextSimple';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package, Truck, Shield, CreditCard } from 'lucide-react';

export default function PanierPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const discount = promoDiscount;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    // Simulation de codes promo
    if (promoCode.toUpperCase() === 'MONSTER10') {
      setPromoDiscount(subtotal * 0.1);
    } else if (promoCode.toUpperCase() === 'BIENVENUE') {
      setPromoDiscount(5);
    } else {
      setPromoDiscount(0);
      alert('Code promo invalide');
    }
  };

  const handleCheckout = () => {
    // ✅ Toujours rediriger vers le checkout, même si non authentifié
    // Le checkout invité est maintenant permis
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-16 pt-[150px]">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">
              Découvrez nos produits et commencez votre shopping !
            </p>
            <Link
              href="/nos-produits"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Découvrir nos produits
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-[150px]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Mon Panier ({items.length} article{items.length > 1 ? 's' : ''})</h1>

          {/* Barre de progression livraison gratuite */}
          {subtotal < 50 && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Plus que {(50 - subtotal).toFixed(2)}€ pour la livraison gratuite !
                  </span>
                </div>
                <span className="text-sm text-blue-700">{Math.round((subtotal / 50) * 100)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
          {subtotal >= 50 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium text-green-800">Livraison gratuite débloquée !</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des produits */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* En-tête du tableau */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-700">
                  <div className="col-span-6">Produit</div>
                  <div className="col-span-2 text-center">Prix</div>
                  <div className="col-span-2 text-center">Quantité</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Produits */}
                <div className="divide-y divide-gray-200">
                  {items.map((item: any) => {
                    // Assurer la conversion en nombre pour éviter NaN
                    const basePrice = typeof item.product.basePrice === 'string'
                      ? parseFloat(item.product.basePrice)
                      : item.product.basePrice;

                    // Trouver le variant correspondant (si spécifié) ou prendre le premier
                    const selectedVariant = item.variant
                      ? item.product.variants.find((v: any) => v.color === item.variant)
                      : item.product.variants[0];

                    // Appliquer la réduction admin si elle existe au niveau du variant
                    const adminDiscount = selectedVariant?.adminDiscountPercent || 0;
                    const price = adminDiscount > 0
                      ? basePrice * (1 - adminDiscount / 100)
                      : basePrice;

                    const itemTotal = price * item.quantity;
                    const hasDiscount = adminDiscount > 0;
                    
                    return (
                      <div key={`${item.product.id}-${item.variant}`} className="py-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Image et infos produit */}
                          <div className="col-span-12 md:col-span-6">
                            <div className="flex items-center space-x-4">
                              <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {selectedVariant?.images?.[0] ? (
                                  <Image
                                    src={selectedVariant.images[0]}
                                    alt={item.product.name}
                                    fill
                                    className="object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = '/placeholder-product.png';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                  {item.product.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {item.product.brandName}
                                </p>
                                {item.variant && (
                                  <p className="text-sm text-gray-500">
                                    Variante: {item.variant}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Prix */}
                          <div className="col-span-4 md:col-span-2 text-center">
                            <span className="md:hidden text-sm text-gray-600">Prix: </span>
                            <div className="flex flex-col items-center">
                              {hasDiscount && (
                                <span className="text-xs text-gray-500 line-through">
                                  {basePrice.toFixed(2)} €
                                </span>
                              )}
                              <span className={`font-medium ${hasDiscount ? 'text-red-600' : ''}`}>
                                {price.toFixed(2)} €
                              </span>
                              {hasDiscount && (
                                <span className="text-xs font-medium text-green-600">
                                  -{adminDiscount}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantité */}
                          <div className="col-span-4 md:col-span-2">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Total et supprimer */}
                          <div className="col-span-4 md:col-span-2 flex items-center justify-between md:justify-end space-x-4">
                            <span className="font-semibold">
                              {itemTotal.toFixed(2)} €
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Supprimer du panier"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <Link
                    href="/nos-produits"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    ← Continuer mes achats
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Vider le panier
                  </button>
                </div>
              </div>

              {/* Avantages */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Livraison gratuite</p>
                    <p className="text-xs text-gray-600">Dès 50€ d&apos;achat</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Paiement sécurisé</p>
                    <p className="text-xs text-gray-600">100% sécurisé</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
                  <Package className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Retours faciles</p>
                    <p className="text-xs text-gray-600">Sous 30 jours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

                {/* Code promo */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code promo
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Entrez votre code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Appliquer
                    </button>
                  </div>
                  {/* Codes promo disponibles - plus visible */}
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm font-medium text-amber-800 mb-1">🎁 Codes disponibles :</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setPromoCode('MONSTER10')}
                        className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-mono hover:bg-amber-200 transition-colors"
                      >
                        MONSTER10 (-10%)
                      </button>
                      <button
                        onClick={() => setPromoCode('BIENVENUE')}
                        className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded font-mono hover:bg-amber-200 transition-colors"
                      >
                        BIENVENUE (-5€)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Détails du prix */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Frais de livraison</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratuit</span>
                      ) : (
                        `${shipping.toFixed(2)} €`
                      )}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Remise</span>
                      <span>-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                {/* Bouton checkout */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Procéder au paiement</span>
                </button>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-600 text-center mt-3">
                    Pas de compte ? Pas de problème ! Commandez en tant qu&apos;invité.
                  </p>
                )}

                {/* Modes de paiement acceptés */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Modes de paiement acceptés
                  </p>
                  <div className="flex space-x-2">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                      CB
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                      Visa
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                      MC
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                      PayPal
                    </div>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="mt-6 space-y-2 text-xs text-gray-600">
                  <p>✓ Livraison gratuite dès 50€ d&apos;achat</p>
                  <p>✓ Retours gratuits sous 30 jours</p>
                  <p>✓ Service client disponible 7j/7</p>
                  <p>✓ Garantie satisfait ou remboursé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}