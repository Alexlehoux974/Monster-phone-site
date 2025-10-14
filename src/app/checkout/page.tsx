'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSuggestions from '@/components/ProductSuggestions';
import { useProductSuggestions } from '@/hooks/useProductSuggestions';
import { useProducts } from '@/lib/supabase/hooks';
import { supabaseProductToLegacy } from '@/lib/supabase/adapters';
import Image from 'next/image';
import {
  CreditCard,
  Truck,
  Shield,
  Package,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart, createOrder } = useCart();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  // Suppression du système d'étapes pour un checkout en 1 seule page

  // Récupérer tous les produits actifs depuis Supabase
  const { products: supabaseProducts } = useProducts();
  const availableProducts = supabaseProducts.map(p => supabaseProductToLegacy(p));

  // Suggestions de produits basées sur le panier
  const suggestions = useProductSuggestions(items, availableProducts, 4);

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

      // Mode de paiement
      paymentMethod: 'card',

      // Informations de paiement (simulées)
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',

      // Options
      newsletter: false,
      terms: false,
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rediriger si pas de produits dans le panier OU si non authentifié
  useEffect(() => {
    // Ne pas rediriger pendant le chargement de l'auth
    if (isLoading) return;

    if (items.length === 0 && !orderComplete) {
      router.push('/panier');
    } else if (items.length > 0 && !isAuthenticated) {
      // Sauvegarder l'intention de checkout dans sessionStorage
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      router.push('/compte');
    }
  }, [items, router, orderComplete, isAuthenticated, isLoading]);

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
    if (!formData.email) newErrors.email = 'Email requis';
    if (!formData.phone) newErrors.phone = 'Téléphone requis';
    if (!formData.address) newErrors.address = 'Adresse requise';
    if (!formData.city) newErrors.city = 'Ville requise';
    if (!formData.postalCode) newErrors.postalCode = 'Code postal requis';

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

      // Créer une session Stripe Checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => {
            return {
              id: String(item.product.id), // Forcer conversion en string
              name: item.product.name,
              description: item.product.description,
              price: typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price,
              quantity: item.quantity,
              image_url: item.product.images[0],
              brand_name: item.product.brand,
              category_name: item.product.category,
              variant: item.variant || null, // ✅ Inclure le variant (peut être couleur, capacité, etc)
            };
          }),
          customerInfo,
          userId: user?.id || null, // ID de l'utilisateur connecté
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
      console.error('❌ Erreur paiement:', error);
      setErrors({ ...errors, submit: error.message || 'Erreur réseau. Veuillez réessayer.' });
      setIsProcessing(false);
    }
  };

  const subtotal = getCartTotal();
  const shipping = formData.shippingMethod === 'express' ? 9.99 : (subtotal >= 50 ? 0 : 4.99);
  const total = subtotal + shipping;

  // Plus de système d'étapes - checkout en page unique pour conversion optimale

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-16 pt-[150px]">
          <div className="max-w-3xl mx-auto">
            {/* Message de succès */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
              <p className="text-xl text-gray-600 mb-2">
                Merci pour votre commande #{`CMD${Date.now().toString().slice(-6)}`}
              </p>
              <p className="text-gray-600 mb-8">
                Vous recevrez un email de confirmation dans quelques instants.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Détails de livraison</h3>
                <div className="text-left space-y-2 text-sm">
                  <p><strong>Destinataire :</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Adresse :</strong> {formData.address}, {formData.postalCode} {formData.city}</p>
                  <p><strong>Email :</strong> {formData.email}</p>
                  <p><strong>Téléphone :</strong> {formData.phone}</p>
                  <p><strong>Livraison :</strong> {formData.shippingMethod === 'express' ? 'Express (24-48h)' : 'Standard (3-5 jours)'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/nos-produits')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continuer mes achats
                </button>
                <button
                  onClick={() => router.push('/compte')}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Voir mes commandes
                </button>
              </div>
            </div>

            {/* Suggestions de produits */}
            <div className="mt-12">
              <ProductSuggestions 
                products={suggestions}
                title="Complétez votre équipement"
                subtitle="D'autres clients ont aussi acheté ces produits"
              />
            </div>
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
                        {subtotal >= 50 ? 'Gratuit' : '4,99 €'}
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
                    {items.map((item) => {
                      // Assurer la conversion en nombre pour éviter NaN
                      const price = typeof item.product.price === 'string' 
                        ? parseFloat(item.product.price) 
                        : item.product.price;
                      return (
                        <div key={`${item.product.id}-${item.variant}`} className="flex items-center space-x-3">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {item.product.images[0] ? (
                              <Image
                                src={item.product.images[0]}
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