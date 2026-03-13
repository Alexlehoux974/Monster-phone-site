'use client';

import { useState, useEffect, Suspense } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContextSimple';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { trackBeginCheckout } from '@/lib/tracking/events';
import type { GA4Item } from '@/lib/tracking/types';
import {
  CreditCard,
  Truck,
  Shield,
  Package,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  AlertCircle,
  X
} from 'lucide-react';

// Wrapper pour gérer Suspense avec useSearchParams
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCanceledMessage, setShowCanceledMessage] = useState(false);

  // Détecter si l'utilisateur revient après avoir annulé sur Stripe
  useEffect(() => {
    if (searchParams.get('canceled') === 'true') {
      setShowCanceledMessage(true);
    }
  }, [searchParams]);
  // Suppression du système d'étapes pour un checkout en 1 seule page

  // État du formulaire avec récupération LocalStorage
  const [formData, setFormData] = useState(() => {
    // Essayer de récupérer depuis localStorage (pour utilisateurs non-connectés)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('monsterphone-checkout-draft');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            // Ne pas sauvegarder terms (doit être coché à chaque fois)
            terms: false,
            newsletter: parsed.newsletter || false,
          };
        } catch (e) {
          console.error('Erreur récupération draft:', e);
        }
      }
    }

    return {
      // Informations de livraison
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',

      // Mode de livraison
      shippingMethod: 'standard',

      // Options
      newsletter: false,
      terms: false,
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rediriger uniquement si pas de produits dans le panier
  // ✅ Permettre le checkout invité (guest checkout)
  useEffect(() => {
    // Ne pas rediriger pendant le chargement de l'auth
    if (isLoading) return;

    // Rediriger vers le panier uniquement si vide
    if (items.length === 0) {
      router.push('/panier');
    }
  }, [items, router, isLoading]);

  // 📊 Tracking GA4 - begin_checkout (une seule fois au chargement)
  useEffect(() => {
    if (items.length > 0) {
      const ga4Items: GA4Item[] = items.map(item => ({
        item_id: item.product.sku || item.product.id,
        item_name: item.product.name,
        item_brand: item.product.brandName,
        item_category: item.product.categoryName,
        item_variant: item.variant,
        price: item.product.basePrice,
        quantity: item.quantity,
      }));

      trackBeginCheckout({
        items: ga4Items,
        value: getCartTotal(),
        currency: 'EUR',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionnellement vide pour ne tracker qu'une fois

  // Pré-remplir avec les infos utilisateur si connecté (prioritaire sur localStorage)
  useEffect(() => {
    if (user) {
      setFormData((prev: typeof formData) => ({
        ...prev,
        email: user.email || prev.email,
        firstName: user.name.split(' ')[0] || prev.firstName,
        lastName: user.name.split(' ').slice(1).join(' ') || prev.lastName,
        phone: user.phone || prev.phone,
        address: user.address?.street || prev.address,
        city: user.address?.city || prev.city,
        postalCode: user.address?.postalCode || prev.postalCode,
      }));
    }
  }, [user]);

  // Sauvegarder le brouillon dans localStorage à chaque modification (pour utilisateurs non-connectés)
  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      // Sauvegarder uniquement si au moins un champ est rempli
      const hasData = Object.values(formData).some(val =>
        typeof val === 'string' ? val.trim() !== '' : val
      );

      if (hasData) {
        localStorage.setItem('monsterphone-checkout-draft', JSON.stringify({
          ...formData,
          terms: false, // Ne jamais sauvegarder l'acceptation des CGV
        }));
      }
    }
  }, [formData, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validation en temps réel (débounce de 500ms) - Effacer l'erreur immédiatement
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validation positive immédiate pour les champs requis remplis
    if (type !== 'checkbox' && value.trim() !== '') {
      // Marquer le champ comme valide visuellement
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validation des informations de livraison
    if (!formData.firstName) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName) newErrors.lastName = 'Nom requis';

    // Validation email avec regex
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Format email invalide (ex: nom@exemple.com)';
    }

    // Validation téléphone (format La Réunion / France)
    if (!formData.phone) {
      newErrors.phone = 'Téléphone requis';
    } else {
      // Nettoyer le numéro (enlever espaces, tirets, points)
      const cleanPhone = formData.phone.replace(/[\s.\-]/g, '');
      // Accepter : 0692XXXXXX, 0262XXXXXX, +262692XXXXXX, 06XXXXXXXX, etc.
      if (!/^(?:(?:\+|00)(?:262|33)|0)[1-9](?:[0-9]{8})$/.test(cleanPhone)) {
        newErrors.phone = 'Format téléphone invalide (ex: 0692 XX XX XX)';
      }
    }

    if (!formData.address) newErrors.address = 'Adresse requise';
    if (!formData.city) newErrors.city = 'Ville requise';

    // Validation code postal (La Réunion 974XX ou France métropolitaine)
    if (!formData.postalCode) {
      newErrors.postalCode = 'Code postal requis';
    } else if (!/^(974|97[1-6]|[0-9]{5})$/.test(formData.postalCode.replace(/\s/g, ''))) {
      newErrors.postalCode = 'Code postal invalide (ex: 97400)';
    }

    // Validation finale avant paiement Stripe
    if (!formData.terms) newErrors.terms = 'Vous devez accepter les conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Préparer les données pour Stripe
      const customerInfo = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      };

      const capturedUserId = user?.id || null;

      // Créer une session Stripe Checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => {
            // Calculer le prix de base
            const basePrice = typeof item.product.basePrice === 'string'
              ? parseFloat(item.product.basePrice)
              : item.product.basePrice;

            // Trouver le variant object si disponible
            const variantObj = item.variant && item.product.variants
              ? item.product.variants.find((v: any) => v.color === item.variant)
              : null;

            const adminDiscount = variantObj?.adminDiscountPercent || 0;
            const finalPrice = adminDiscount > 0
              ? basePrice * (1 - adminDiscount / 100)
              : basePrice;

            return {
              id: String(item.product.id),
              name: item.product.name,
              description: item.product.shortDescription || item.product.fullDescription,
              price: finalPrice,
              quantity: item.quantity,
              image_url: variantObj?.images?.[0] || '',
              brand_name: item.product.brandName,
              category_name: item.product.categoryName,
              variant: item.variant || null,
            };
          }),
          customerInfo,
          userId: capturedUserId, // ✅ Utiliser la variable capturée
          shippingCost: shipping, // ✅ Inclure les frais de livraison
          shippingMethod: formData.shippingMethod, // ✅ Inclure la méthode de livraison
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session de paiement');
      }

      // Rediriger vers Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement manquante');
      }
    } catch (error: any) {
      console.error('Erreur paiement:', error);
      setErrors({ ...errors, submit: error.message || 'Erreur réseau. Veuillez réessayer.' });
      setIsProcessing(false);
    }
  };

  const subtotal = getCartTotal();
  const shipping = formData.shippingMethod === 'express' ? 9.99 : (subtotal >= 100 ? 0 : 4.99);
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-[120px] sm:pt-[140px] lg:pt-[176px]">
        <div className="max-w-6xl mx-auto">
          {/* En-tête avec étapes */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/panier')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au panier
            </button>

            <h1 className="text-3xl font-bold mb-2">Finaliser ma commande</h1>
            <p className="text-gray-600 mb-6">
              Remplissez vos informations et procédez au paiement sécurisé
            </p>

            {/* Message d'annulation Stripe */}
            {showCanceledMessage && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-amber-800">Paiement annulé</p>
                  <p className="text-sm text-amber-700">
                    Votre paiement a été annulé. Vos articles sont toujours dans votre panier, vous pouvez réessayer quand vous le souhaitez.
                  </p>
                </div>
                <button
                  onClick={() => setShowCanceledMessage(false)}
                  className="text-amber-600 hover:text-amber-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulaire principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informations de livraison */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Informations de livraison
                  </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom *
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom *
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            <Mail className="inline w-4 h-4 mr-1" />
                            Email *
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            <Phone className="inline w-4 h-4 mr-1" />
                            Téléphone *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+262 6 92 XX XX XX"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse *
                          </label>
                          <input
                            id="address"
                            type="text"
                            name="address"
                            autoComplete="street-address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="123 Rue de la Paix"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.address ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            Ville *
                          </label>
                          <input
                            id="city"
                            type="text"
                            name="city"
                            autoComplete="address-level2"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Saint-Denis"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Code postal *
                          </label>
                          <input
                            id="postalCode"
                            type="text"
                            name="postalCode"
                            autoComplete="postal-code"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="97400"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.postalCode ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.postalCode && (
                            <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                          )}
                        </div>
                      </div>

                  {/* Mode de livraison */}
                  <h3 className="text-lg font-semibold mt-8 mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Mode de livraison
                  </h3>

                  <div className="space-y-3">
                    <label className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Livraison standard</p>
                        <p className="text-sm text-gray-600">3-5 jours ouvrés</p>
                      </div>
                      <span className="font-medium">
                        {subtotal >= 100 ? 'Gratuit' : '4,99 €'}
                      </span>
                    </label>

                    <label className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Livraison express</p>
                        <p className="text-sm text-gray-600">24-48h</p>
                      </div>
                      <span className="font-medium">9,99 €</span>
                    </label>
                  </div>
                </div>

                {/* Section confirmation et CGV */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Paiement sécurisé
                  </h2>

                  {/* Info paiement */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-6 h-6 text-blue-600" />
                      <p className="font-semibold text-blue-900">Paiement 100% sécurisé par Stripe</p>
                    </div>
                    <p className="text-sm text-gray-700">
                      Vous serez redirigé vers notre page de paiement sécurisée.
                      Cartes bancaires (Visa, Mastercard, American Express) et autres moyens de paiement acceptés.
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <p className="font-medium">S&apos;inscrire à la newsletter</p>
                        <p className="text-sm text-gray-600">
                          Recevez nos offres exclusives et nouveautés
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <p className="font-medium">
                          J&apos;accepte les conditions générales de vente *
                        </p>
                        {errors.terms && (
                          <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Bouton de paiement */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Redirection vers le paiement...
                      </>
                    ) : (
                      <>
                        <Shield className="w-6 h-6 mr-3" />
                        Payer {total.toFixed(2)} € en toute sécurité
                      </>
                    )}
                  </button>

                  {errors.submit && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {errors.submit}
                    </div>
                  )}
                </div>
              </div>

              {/* Résumé de la commande (sidebar) */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Résumé</h2>

                  {/* Articles */}
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {items.map((item: any) => {
                      // Calculer le prix avec la réduction admin si elle existe
                      const basePrice = typeof item.product.basePrice === 'string'
                        ? parseFloat(item.product.basePrice)
                        : item.product.basePrice;

                      // Trouver le variant object si disponible ou prendre le premier
                      const variantObj = item.variant && item.product.variants
                        ? item.product.variants.find((v: any) => v.color === item.variant)
                        : item.product.variants?.[0];

                      const adminDiscount = variantObj?.adminDiscountPercent || 0;
                      const price = adminDiscount > 0
                        ? basePrice * (1 - adminDiscount / 100)
                        : basePrice;
                      return (
                        <div key={`${item.product.id}-${item.variant}`} className="flex items-center space-x-3">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {variantObj?.images?.[0] ? (
                              <Image
                                src={variantObj.images[0]}
                                alt={item.product.name}
                                fill
                                className="object-contain"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-product.png';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                            {item.variant && (
                              <p className="text-xs text-blue-600 font-medium">
                                Couleur: {item.variant}
                              </p>
                            )}
                            <p className="text-xs text-gray-600">
                              {item.quantity} × {price.toFixed(2)} €
                            </p>
                          </div>
                          <span className="font-medium">
                            {(price * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Totaux */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Livraison</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Gratuit</span>
                        ) : (
                          `${shipping.toFixed(2)} €`
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{total.toFixed(2)} €</span>
                      </div>
                    </div>
                  </div>

                  {/* Garanties */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Shield className="w-4 h-4 mr-2 text-green-600" />
                      Paiement 100% sécurisé
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Truck className="w-4 h-4 mr-2 text-blue-600" />
                      Livraison rapide
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-purple-600" />
                      Retours sous 30 jours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}