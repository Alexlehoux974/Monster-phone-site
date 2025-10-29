'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar } from 'lucide-react';

function ComptePageContent() {
  const { user, isAuthenticated, login, register, logout, updateProfile, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'France',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [forceShowLogin, setForceShowLogin] = useState(false);

  // Timeout de sécurité : si isLoading reste à true plus de 3 secondes, forcer l'affichage de la page de connexion
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading && !isAuthenticated) {
        console.warn('⏱️ Timeout: forcing login page display');
        setForceShowLogin(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isLoading, isAuthenticated]);

  // Lire le paramètre tab depuis l'URL pour activer l'onglet correspondant
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'orders', 'security'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Rediriger si non connecté (optionnel - on peut aussi afficher le formulaire de connexion)
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || prev.address,
      }));
    }
  }, [isAuthenticated, user, isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
        setSuccess('Connexion réussie !');

        // Vérifier s'il y a une redirection en attente
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterLogin');
          // ✅ Marquer qu'on vient de se connecter pour éviter boucle infinie
          sessionStorage.setItem('justLoggedIn', 'true');
          // ✅ Attendre un cycle de rendu pour que isAuthenticated soit mis à jour
          setTimeout(() => {
            router.push(redirectPath);
          }, 100);
        }
      } else {
        await register(formData.email, formData.password, formData.name);
        setSuccess('Inscription réussie !');

        // Vérifier s'il y a une redirection en attente
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterLogin');
          // ✅ Marquer qu'on vient de se connecter pour éviter boucle infinie
          sessionStorage.setItem('justLoggedIn', 'true');
          // ✅ Attendre un cycle de rendu pour que isAuthenticated soit mis à jour
          setTimeout(() => {
            router.push(redirectPath);
          }, 100);
        }
      }
      // Réinitialiser le formulaire
      setFormData(prev => ({ ...prev, email: '', password: '' }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      setSuccess('Profil mis à jour avec succès !');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Si le chargement est terminé et que l'utilisateur n'est pas authentifié
  // OU si le timeout de sécurité a été déclenché
  if ((!isLoading && !isAuthenticated) || forceShowLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Connexion requise
            </h2>
            <p className="text-gray-600">
              Vous devez être connecté pour accéder à votre espace personnel et consulter vos commandes.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/auth/signin')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Se connecter
            </button>
            <button
              onClick={() => router.push('/auth/signup')}
              className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Créer un compte
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full text-gray-600 hover:text-gray-900 px-6 py-2 transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Afficher le spinner uniquement pendant le chargement initial (max 3 secondes)
  if (isLoading && !forceShowLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'orders', label: 'Mes Commandes', icon: Package },
    { id: 'security', label: 'Sécurité', icon: Shield },
  ];

  // Charger les commandes de l'utilisateur depuis Supabase
  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout | null = null;

    if (isAuthenticated && user) {
      const fetchOrders = async () => {
        try {
          // Protection timeout 10 secondes
          const controller = new AbortController();
          timeoutId = setTimeout(() => controller.abort(), 10000);

          // Récupérer les commandes par userId ET par email pour inclure les commandes passées en tant qu'invité
          const response = await fetch(`/api/orders/list?userId=${user.id}&email=${encodeURIComponent(user.email || '')}`, {
            signal: controller.signal
          });

          if (timeoutId) clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (isMounted) {
              setOrders(data.orders || []);
            }
          } else {
            console.error('Erreur API orders:', response.status);
          }
        } catch (error: any) {
          if (error.name === 'AbortError') {
            console.error('⏱️ Timeout: impossible de charger les commandes');
          } else {
            console.error('Erreur chargement commandes:', error);
          }
        } finally {
          if (isMounted) {
            setLoadingOrders(false);
          }
        }
      };
      fetchOrders();
    } else {
      setLoadingOrders(false);
    }

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-[150px]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {isAuthenticated ? 'Mon Compte' : 'Connexion / Inscription'}
          </h1>

          {!isAuthenticated ? (
            // Formulaire de connexion/inscription
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="flex mb-6">
                <button
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 py-2 text-center font-medium rounded-l-lg transition-colors ${
                    isLoginMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 py-2 text-center font-medium rounded-r-lg transition-colors ${
                    !isLoginMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inscription
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLoginMode}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Jean Dupont"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="jean.dupont@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  {!isLoginMode && (
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 6 caractères
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Chargement...' : isLoginMode ? 'Se connecter' : "S'inscrire"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                {isLoginMode ? (
                  <p>
                    Pas encore de compte ?{' '}
                    <button
                      onClick={() => setIsLoginMode(false)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Inscrivez-vous
                    </button>
                  </p>
                ) : (
                  <p>
                    Déjà un compte ?{' '}
                    <button
                      onClick={() => setIsLoginMode(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Connectez-vous
                    </button>
                  </p>
                )}
              </div>
            </div>
          ) : (
            // Dashboard utilisateur connecté
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user?.name}</h3>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-600'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Déconnexion</span>
                    </button>
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  {activeTab === 'profile' && (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Informations Personnelles</h2>
                      
                      <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <User className="inline w-4 h-4 mr-1" />
                              Nom complet
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <Mail className="inline w-4 h-4 mr-1" />
                              Email
                            </label>
                            <input
                              type="email"
                              value={user?.email}
                              disabled
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <Phone className="inline w-4 h-4 mr-1" />
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+262 6 92 XX XX XX"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <Calendar className="inline w-4 h-4 mr-1" />
                              Membre depuis
                            </label>
                            <input
                              type="text"
                              value={new Date(user?.createdAt || '').toLocaleDateString('fr-FR')}
                              disabled
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            Adresse de livraison
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rue
                              </label>
                              <input
                                type="text"
                                name="address.street"
                                value={formData.address.street}
                                onChange={handleInputChange}
                                placeholder="123 Rue de la Paix"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ville
                              </label>
                              <input
                                type="text"
                                name="address.city"
                                value={formData.address.city}
                                onChange={handleInputChange}
                                placeholder="Saint-Denis"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Code postal
                              </label>
                              <input
                                type="text"
                                name="address.postalCode"
                                value={formData.address.postalCode}
                                onChange={handleInputChange}
                                placeholder="97400"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        {error && (
                          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                          </div>
                        )}

                        {success && (
                          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                            {success}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        >
                          {isSubmitting ? 'Mise à jour...' : 'Enregistrer les modifications'}
                        </button>
                      </form>
                    </>
                  )}

                  {activeTab === 'orders' && (
                    <>
                      <h2 className="text-2xl font-bold mb-6"><span className="font-medium">Commandes</span></h2>

                      {loadingOrders ? (
                        <div className="text-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600">Chargement de vos commandes...</p>
                        </div>
                      ) : orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => {
                            const statusLabels: { [key: string]: string } = {
                              pending: 'En attente',
                              processing: 'En préparation',
                              shipped: 'Expédiée',
                              delivered: 'Livrée',
                              cancelled: 'Annulée',
                              refunded: 'Remboursée',
                            };

                            const statusColors: { [key: string]: string } = {
                              pending: 'bg-gray-100 text-gray-800',
                              processing: 'bg-blue-100 text-blue-800',
                              shipped: 'bg-purple-100 text-purple-800',
                              delivered: 'bg-green-100 text-green-800',
                              cancelled: 'bg-red-100 text-red-800',
                              refunded: 'bg-orange-100 text-orange-800',
                            };

                            const itemCount = Array.isArray(order.order_items) ? order.order_items.length : 0;

                            return (
                              <div
                                key={order.id}
                                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer"
                                onClick={() => router.push(`/compte/commandes/${order.id}`)}
                              >
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="font-semibold text-lg text-blue-600 hover:text-blue-700">
                                      Commande #{order.id.substring(0, 8).toUpperCase()}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </p>
                                  </div>
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                      statusColors[order.status] || 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {statusLabels[order.status] || order.status}
                                  </span>
                                </div>

                                {/* Liste des produits */}
                                {order.order_items && order.order_items.length > 0 && (
                                  <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                                    {order.order_items.map((item: any, index: number) => {
                                      // Parser le metadata pour obtenir les variantes
                                      let variantInfo = '';
                                      if (item.product_metadata) {
                                        try {
                                          const metadata = typeof item.product_metadata === 'string'
                                            ? JSON.parse(item.product_metadata)
                                            : item.product_metadata;

                                          if (metadata.color) {
                                            variantInfo = `${metadata.color}`;
                                          }
                                          if (metadata.storage && metadata.color) {
                                            variantInfo = `${metadata.color} - ${metadata.storage}`;
                                          } else if (metadata.storage) {
                                            variantInfo = metadata.storage;
                                          }
                                        } catch (e) {
                                          console.error('Error parsing metadata:', e);
                                        }
                                      }

                                      return (
                                        <div key={index} className="flex justify-between items-start py-2">
                                          <div className="flex-1">
                                            <p className="font-medium text-gray-900">{item.product_name}</p>
                                            {variantInfo && (
                                              <p className="text-sm text-gray-600 mt-1">
                                                Variante: {variantInfo}
                                              </p>
                                            )}
                                            <p className="text-sm text-gray-500 mt-1">
                                              Quantité: {item.quantity} × {item.unit_price?.toFixed(2)} €
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-semibold text-gray-900">
                                              {item.total_price?.toFixed(2)} €
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                  <p className="font-semibold text-gray-700">Total</p>
                                  <p className="font-bold text-lg text-gray-900">
                                    {order.total?.toFixed(2)} €
                                  </p>
                                </div>

                                {order.tracking_number && (
                                  <div className="mt-3 text-sm text-gray-600">
                                    <span className="font-medium">Suivi : </span>
                                    <span className="text-blue-600">{order.tracking_number}</span>
                                  </div>
                                )}

                                {/* Bouton Voir les détails */}
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <button
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Empêcher le clic sur le div parent
                                      router.push(`/compte/commandes/${order.id}`);
                                    }}
                                  >
                                    <Package className="w-4 h-4" />
                                    Voir les détails et le suivi
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-600">Aucune commande pour le moment</p>
                          <button
                            onClick={() => router.push('/nos-produits')}
                            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Découvrir nos produits
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'security' && (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Sécurité du Compte</h2>
                      
                      <div className="space-y-6">
                        <div className="border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold mb-4">Changer le mot de passe</h3>
                          <form className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe actuel
                              </label>
                              <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nouveau mot de passe
                              </label>
                              <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmer le nouveau mot de passe
                              </label>
                              <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                              />
                            </div>

                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                              Mettre à jour le mot de passe
                            </button>
                          </form>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold mb-4">Sessions actives</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Session actuelle</p>
                                <p className="text-sm text-gray-600">La Réunion, France</p>
                              </div>
                              <span className="text-sm text-green-600">Active</span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                          <h3 className="font-semibold text-red-800 mb-2">Zone dangereuse</h3>
                          <p className="text-sm text-red-700 mb-4">
                            La suppression de votre compte est irréversible. Toutes vos données seront perdues.
                          </p>
                          <button className="text-red-600 hover:text-red-800 font-medium text-sm border border-red-300 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">
                            Supprimer mon compte
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ComptePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ComptePageContent />
    </Suspense>
  );
}