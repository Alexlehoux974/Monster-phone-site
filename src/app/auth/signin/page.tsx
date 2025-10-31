'use client';

import { useState, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContextSimple';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

function SignInFormContent() {
  const { login } = useAuth();
  const router = useRouter();

  // Récupérer l'URL de redirection depuis les paramètres (par défaut: /compte?tab=orders)
  // Utiliser window.location au lieu de useSearchParams pour éviter l'erreur React #300
  const [redirectTo] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('redirect') || '/compte?tab=orders';
    }
    return '/compte?tab=orders';
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      console.log('🔐 [SignIn] Starting login process...');
      await login(formData.email, formData.password);
      console.log('✅ [SignIn] Login completed successfully, redirecting immediately...');

      // Redirection immédiate - onAuthStateChange va gérer la session
      console.log('🔄 [SignIn] Redirecting to:', redirectTo);
      window.location.href = redirectTo;
    } catch (err: any) {
      console.error('❌ [SignIn] Login failed:', err);
      setError(err.message || 'Erreur lors de la connexion');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link
              href={`/auth/signup${redirectTo !== '/compte?tab=orders' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Créer un compte
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
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
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
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="votre@email.com"
                />
              </div>
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
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
                  Connexion en cours...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SignInFormContent />
      </Suspense>
      <Footer />
    </>
  );
}
