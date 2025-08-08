'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSuggestions from '@/components/ProductSuggestions';
import { useProductSuggestions } from '@/hooks/useProductSuggestions';
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
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Suggestions de produits basées sur le panier
  const suggestions = useProductSuggestions(items, 4);

  // État du formulaire
  const [formData, setFormData] = useState({
    // Informations de livraison
    firstName: '',
    lastName: '',
    email: user?.email || '',
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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rediriger si pas de produits dans le panier
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/panier');
    }
  }, [items, router, orderComplete]);

  // Pré-remplir avec les infos utilisateur si connecté
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
        address: user.address?.street || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step >= 1) {
      // Validation des informations de livraison
      if (!formData.firstName) newErrors.firstName = 'Prénom requis';
      if (!formData.lastName) newErrors.lastName = 'Nom requis';
      if (!formData.email) newErrors.email = 'Email requis';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
      if (!formData.address) newErrors.address = 'Adresse requise';
      if (!formData.city) newErrors.city = 'Ville requise';
      if (!formData.postalCode) newErrors.postalCode = 'Code postal requis';
    }

    if (step >= 2 && formData.paymentMethod === 'card') {
      // Validation des informations de paiement
      if (!formData.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
      if (!formData.cardName) newErrors.cardName = 'Nom sur la carte requis';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Date d\'expiration requise';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV requis';
    }

    if (step >= 3) {
      // Validation finale
      if (!formData.terms) newErrors.terms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(3, prev + 1));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }

    setIsProcessing(true);

    // Simuler le traitement du paiement
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simuler la réussite de la commande
    setOrderComplete(true);
    setIsProcessing(false);

    // Vider le panier
    clearCart();

    // Scroller en haut
    window.scrollTo(0, 0);
  };

  const subtotal = getCartTotal();
  const shipping = formData.shippingMethod === 'express' ? 9.99 : (subtotal >= 50 ? 0 : 4.99);
  const total = subtotal + shipping;

  const steps = [
    { number: 1, label: 'Livraison', icon: Truck },
    { number: 2, label: 'Paiement', icon: CreditCard },
    { number: 3, label: 'Confirmation', icon: Check },
  ];

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-16 mt-20">
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
      
      <main className="container mx-auto px-4 py-8 mt-20">
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

            <h1 className="text-3xl font-bold mb-6">Finaliser ma commande</h1>

            {/* Indicateur d&apos;étapes */}
            <div className="flex items-center justify-between max-w-2xl">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : isCompleted
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={`ml-3 font-medium hidden sm:block ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 mx-4">
                        <div
                          className={`h-1 rounded transition-colors ${
                            isCompleted ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulaire principal */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {/* Étape 1: Informations de livraison */}
                  {currentStep === 1 && (
                    <>
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
                    </>
                  )}

                  {/* Étape 2: Paiement */}
                  {currentStep === 2 && (
                    <>
                      <h2 className="text-xl font-bold mb-6 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Informations de paiement
                      </h2>

                      {/* Mode de paiement */}
                      <div className="space-y-3 mb-6">
                        <label className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                          <span className="font-medium">Carte bancaire</span>
                        </label>

                        <label className="border rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <div className="w-5 h-5 mr-3 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            P
                          </div>
                          <span className="font-medium">PayPal</span>
                        </label>
                      </div>

                      {/* Formulaire de carte bancaire */}
                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Numéro de carte *
                            </label>
                            <input
                              id="cardNumber"
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.cardNumber && (
                              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                              Nom sur la carte *
                            </label>
                            <input
                              id="cardName"
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              placeholder="JEAN DUPONT"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.cardName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.cardName && (
                              <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Date d&apos;expiration *
                              </label>
                              <input
                                id="cardExpiry"
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/AA"
                                maxLength={5}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.cardExpiry && (
                                <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV *
                              </label>
                              <input
                                id="cardCvv"
                                type="text"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength={4}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                  errors.cardCvv ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.cardCvv && (
                                <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>
                              )}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-blue-900">Paiement 100% sécurisé</p>
                              <p className="text-blue-700">
                                Vos informations de paiement sont cryptées et sécurisées.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PayPal */}
                      {formData.paymentMethod === 'paypal' && (
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                            P
                          </div>
                          <p className="text-gray-600">
                            Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Étape 3: Confirmation */}
                  {currentStep === 3 && (
                    <>
                      <h2 className="text-xl font-bold mb-6 flex items-center">
                        <Check className="w-5 h-5 mr-2" />
                        Vérification et confirmation
                      </h2>

                      {/* Résumé de la commande */}
                      <div className="space-y-6">
                        {/* Adresse de livraison */}
                        <div>
                          <h3 className="font-semibold mb-2">Adresse de livraison</h3>
                          <div className="bg-gray-50 p-4 rounded-lg text-sm">
                            <p>{formData.firstName} {formData.lastName}</p>
                            <p>{formData.address}</p>
                            <p>{formData.postalCode} {formData.city}</p>
                            <p className="mt-2">
                              <strong>Email:</strong> {formData.email}<br />
                              <strong>Téléphone:</strong> {formData.phone}
                            </p>
                          </div>
                        </div>

                        {/* Mode de livraison */}
                        <div>
                          <h3 className="font-semibold mb-2">Mode de livraison</h3>
                          <div className="bg-gray-50 p-4 rounded-lg text-sm">
                            <p className="font-medium">
                              {formData.shippingMethod === 'express' ? 'Livraison express' : 'Livraison standard'}
                            </p>
                            <p className="text-gray-600">
                              {formData.shippingMethod === 'express' ? '24-48h' : '3-5 jours ouvrés'}
                            </p>
                          </div>
                        </div>

                        {/* Mode de paiement */}
                        <div>
                          <h3 className="font-semibold mb-2">Mode de paiement</h3>
                          <div className="bg-gray-50 p-4 rounded-lg text-sm">
                            <p className="font-medium">
                              {formData.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}
                            </p>
                            {formData.paymentMethod === 'card' && formData.cardNumber && (
                              <p className="text-gray-600">
                                **** **** **** {formData.cardNumber.slice(-4)}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
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
                      </div>
                    </>
                  )}

                  {/* Navigation entre étapes */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Retour
                      </button>
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                      >
                        Continuer
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Traitement...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Confirmer et payer {total.toFixed(2)} €
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Résumé de la commande (sidebar) */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Résumé</h2>

                  {/* Articles */}
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {items.map((item) => {
                      // Price is already a number in the Product interface
                      const price = item.product.price;
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