'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContextSimple';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Package, LogOut, ChevronRight, Shield, Calendar } from 'lucide-react';

export default function ComptePageContent() {
  const { user, isAuthenticated, logout, updateProfile, isLoading } = useAuth();
  const router = useRouter();

  // État pour gérer le délai d'initialisation
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  // Logs pour debugging
  console.log('🔍 [CompteContent] Render state:', { isLoading, isAuthenticated, hasUser: !!user, authCheckComplete });

  // Lire le tab depuis l'URL côté client uniquement
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
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

  // Lire le paramètre tab côté client APRÈS le montage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  // Attendre que l'auth soit initialisée
  useEffect(() => {
    if (!isLoading) {
      // Pas de délai artificiel - si isLoading est false, l'auth est prête
      console.log('✅ Auth check complete');
      setAuthCheckComplete(true);
    }
  }, [isLoading]);

  // Redirection si non connecté - SEULEMENT après que authCheckComplete soit true
  useEffect(() => {
    console.log('🔍 [CompteContent] Checking redirect conditions:', {
      authCheckComplete,
      isAuthenticated,
      activeTab
    });

    if (authCheckComplete && !isAuthenticated) {
      console.log('🔒🔒🔒 [CompteContent] NOT AUTHENTICATED! Redirecting to signin page...');
      const redirectUrl = `/auth/signin?redirect=/compte?tab=${activeTab}`;
      console.log('🔒 [CompteContent] Redirect URL:', redirectUrl);
      router.push(redirectUrl);
    } else if (authCheckComplete && isAuthenticated) {
      console.log('✅✅✅ [CompteContent] User is AUTHENTICATED! Staying on page.');
    }
  }, [authCheckComplete, isAuthenticated, router, activeTab]);

  // Charger les données utilisateur
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || {
          street: '',
          city: '',
          postalCode: '',
          country: 'France',
        },
      });
    }
  }, [isAuthenticated, user]);

  // Charger les commandes
  useEffect(() => {
    if (isAuthenticated && activeTab === 'orders') {
      const fetchOrders = async () => {
        try {
          setLoadingOrders(true);
          const response = await fetch('/api/orders/list');
          if (response.ok) {
            const data = await response.json();
            // S'assurer que data est bien un tableau
            const ordersArray = Array.isArray(data) ? data : [];
            console.log('📦 Orders fetched successfully:', ordersArray.length, 'orders');
            if (ordersArray.length > 0) {
              console.log('📦 First order sample:', ordersArray[0]);
            }
            setOrders(ordersArray);
          } else {
            console.error('❌ Failed to fetch orders:', response.status);
            setOrders([]); // Mettre un tableau vide en cas d'erreur
          }
        } catch (error) {
          console.error('❌ Error fetching orders:', error);
          setOrders([]); // Mettre un tableau vide en cas d'erreur
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated, activeTab]);

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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      setSuccess('Profil mis à jour avec succès !');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Afficher le loader pendant le chargement initial
  // Afficher le loader pendant que l'auth est en cours de vérification
  if (isLoading || !authCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isLoading ? 'Vérification de l\'authentification...' : 'Chargement de votre session...'}
          </p>
        </div>
      </div>
    );
  }

  // Si pas authentifié après la vérification complète, afficher le loader de redirection
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Compte</h1>
          <p className="mt-2 text-gray-600">Gérez vos informations et vos commandes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menu latéral */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Mon profil</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Mes commandes</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Sécurité</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </nav>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    {success}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Adresse de livraison</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse
                        </label>
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Code postal
                          </label>
                          <input
                            type="text"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ville
                          </label>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pays
                        </label>
                        <input
                          type="text"
                          value={formData.address.country}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Mes commandes</h2>

                {loadingOrders ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des commandes...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de commandes</p>
                    <button
                      onClick={() => router.push('/nos-produits')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Découvrir nos produits →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">Commande #{order.order_number || order.id?.substring(0, 8)}</p>
                            <p className="text-sm text-gray-500">
                              {order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR') : 'Date inconnue'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{typeof order.amount_total === 'number' ? order.amount_total.toFixed(2) : '0.00'} €</p>
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.payment_status === 'paid' ? 'Payée' : 'En attente'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => router.push(`/compte/commandes/${order.id}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                        >
                          Voir les détails
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Sécurité</h2>
                <p className="text-gray-600">Fonctionnalité à venir</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
