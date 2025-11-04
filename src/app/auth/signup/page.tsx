'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContextSimple';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

function SignUpFormContent() {
  const { register, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // ✅ Fix hydration: Récupérer l'URL de redirection côté client uniquement
  const [redirectTo, setRedirectTo] = useState('/compte?tab=orders');

  // Effet pour initialiser redirectTo uniquement côté client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect') || '/compte?tab=orders';
      setRedirectTo(redirect);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'France',
    },
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
        return '';
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Format d\'email invalide (exemple: nom@domaine.com)';
        return '';
      case 'password':
        if (!value) return 'Le mot de passe est requis';
        if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
        return '';
      case 'confirmPassword':
        if (!value) return 'La confirmation du mot de passe est requise';
        if (value !== formData.password) return 'Les mots de passe ne correspondent pas';
        return '';
      case 'phone':
        if (!value.trim()) return 'Le téléphone est requis';
        const phoneRegex = /^[\d\s+()-]{10,}$/;
        if (!phoneRegex.test(value)) return 'Format de téléphone invalide (exemple: 06 12 34 56 78)';
        return '';
      case 'address.street':
        if (!value.trim()) return 'L\'adresse est requise';
        return '';
      case 'address.postalCode':
        if (!value.trim()) return 'Le code postal est requis';
        if (!/^\d{5}$/.test(value.trim())) return 'Le code postal doit contenir 5 chiffres';
        return '';
      case 'address.city':
        if (!value.trim()) return 'La ville est requise';
        return '';
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validation complète de tous les champs
    const errors: Record<string, string> = {};

    // Valider chaque champ
    errors.name = validateField('name', formData.name);
    errors.email = validateField('email', formData.email);
    errors.password = validateField('password', formData.password);
    errors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    errors.phone = validateField('phone', formData.phone);
    errors['address.street'] = validateField('address.street', formData.address.street);
    errors['address.postalCode'] = validateField('address.postalCode', formData.address.postalCode);
    errors['address.city'] = validateField('address.city', formData.address.city);

    // Filtrer les erreurs vides
    const filteredErrors = Object.fromEntries(
      Object.entries(errors).filter(([_, error]) => error !== '')
    );

    if (Object.keys(filteredErrors).length > 0) {
      setFieldErrors(filteredErrors);
      setError('Veuillez corriger les erreurs dans le formulaire');
      // Scroll vers le premier champ en erreur
      const firstErrorField = Object.keys(filteredErrors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // 🔥 CRITIQUE: Si l'utilisateur est déjà connecté, le déconnecter AVANT de créer le nouveau compte
      if (isAuthenticated) {
        console.log('⚠️ [SignUp] User already logged in, logging out first...');
        await logout();
        // Attendre un peu pour que la déconnexion se termine
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Passer toutes les données à la fonction register
      console.log('🔐 [SignUp] Starting registration process...');
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      console.log('✅ [SignUp] Registration completed successfully');

      // Attendre un peu pour que la session se propage
      console.log('⏳ [SignUp] Waiting for session to propagate (500ms)...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Redirection immédiate avec window.location pour forcer le rechargement
      console.log('🔄 [SignUp] Redirecting to:', redirectTo);
      window.location.href = redirectTo;
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du compte');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Gérer les champs d'adresse imbriqués
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Avertissement si l'utilisateur est déjà connecté */}
          {isAuthenticated && (
            <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Vous êtes déjà connecté
                  </h3>
                  <p className="mt-1 text-xs text-yellow-700">
                    En créant un nouveau compte, vous serez automatiquement déconnecté de votre compte actuel et connecté au nouveau compte.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Créer votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link
                href={`/auth/signin${redirectTo !== '/compte?tab=orders' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Se connecter
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                    {(error.includes('déjà utilisé') || error.includes('déjà un compte')) && (
                      <p className="mt-2">
                        <Link
                          href={`/auth/signin${redirectTo !== '/compte?tab=orders' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Se connecter maintenant
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 px-3 py-2 border ${fieldErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm`}
                    placeholder="Jean Dupont"
                  />
                </div>
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 px-3 py-2 border ${fieldErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm`}
                    placeholder="votre@email.com"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 px-3 py-2 border ${fieldErrors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
                {fieldErrors.password ? (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">Minimum 6 caractères</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 px-3 py-2 border ${fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm`}
                    placeholder="••••••••"
                  />
                </div>
                {fieldErrors.confirmPassword ? (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.confirmPassword}
                  </p>
                ) : formData.confirmPassword && formData.password === formData.confirmPassword ? (
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <p className="text-xs text-green-600">Les mots de passe correspondent</p>
                  </div>
                ) : null}
              </div>

              {/* Séparateur */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Informations de livraison</h3>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${fieldErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm`}
                  placeholder="06 12 34 56 78"
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  id="address.street"
                  name="address.street"
                  type="text"
                  autoComplete="street-address"
                  value={formData.address.street}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-3 py-2 border ${fieldErrors['address.street'] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm`}
                  placeholder="12 Rue de la République"
                />
                {fieldErrors['address.street'] && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors['address.street']}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Code postal
                  </label>
                  <input
                    id="address.postalCode"
                    name="address.postalCode"
                    type="text"
                    autoComplete="postal-code"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${fieldErrors['address.postalCode'] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm`}
                    placeholder="97400"
                  />
                  {fieldErrors['address.postalCode'] && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors['address.postalCode']}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    id="address.city"
                    name="address.city"
                    type="text"
                    autoComplete="address-level2"
                    value={formData.address.city}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full px-3 py-2 border ${fieldErrors['address.city'] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none sm:text-sm`}
                    placeholder="Saint-Denis"
                  />
                  {fieldErrors['address.city'] && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors['address.city']}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">
                  Pays
                </label>
                <input
                  id="address.country"
                  name="address.country"
                  type="text"
                  autoComplete="country-name"
                  disabled
                  value={formData.address.country}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-500 rounded-lg sm:text-sm cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500">Livraison disponible uniquement en France</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/" className="font-medium text-gray-600 hover:text-gray-500">
                  ← Retour à l'accueil
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Création du compte...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Créer mon compte
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>

            <p className="text-xs text-center text-gray-500">
              En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            </p>
          </form>
        </div>
      </div>
  );
}

export default function SignUpPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SignUpFormContent />
      </Suspense>
      <Footer />
    </>
  );
}
