'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContextSimple';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Package,
  LogOut,
  ChevronRight,
  Shield,
  Heart,
  Plus,
  Trash2,
  Edit2,
  X,
  Eye,
  EyeOff,
  Home,
  Briefcase,
  Star,
  MapPin,
} from 'lucide-react';

// Types
interface Address {
  id: string;
  label: string;
  full_name: string;
  phone?: string;
  street: string;
  street_complement?: string;
  postal_code: string;
  city: string;
  country: string;
  is_default: boolean;
  is_billing: boolean;
}

interface WishlistItem {
  id: string;
  product_id: string;
  variant_id?: string;
  added_at: string;
  products?: {
    id: string;
    name: string;
    url_slug: string;
    price: number;
    original_price?: number;
    discount?: number;
    status: string;
  };
  image?: string;
}

export default function ComptePageContent() {
  const { user, isAuthenticated, logout, updateProfile, isLoading } = useAuth();
  const router = useRouter();

  // État général
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // État profil
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État commandes
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // État adresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<Partial<Address>>({
    label: 'Domicile',
    full_name: '',
    phone: '',
    street: '',
    street_complement: '',
    postal_code: '',
    city: '',
    country: 'France',
    is_default: false,
    is_billing: false,
  });

  // État sécurité
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // État wishlist
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  // Lire le paramètre tab côté client
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
      setAuthCheckComplete(true);
    }
  }, [isLoading]);

  // Redirection si non connecté
  useEffect(() => {
    if (authCheckComplete && !isAuthenticated) {
      router.push(`/auth/signin?redirect=/compte?tab=${activeTab}`);
    }
  }, [authCheckComplete, isAuthenticated, router, activeTab]);

  // Charger les données utilisateur
  useEffect(() => {
    if (isAuthenticated && user) {
      // Séparer le nom complet en prénom et nom
      const nameParts = (user.name || '').split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      setFormData({
        firstName,
        lastName,
        phone: user.phone || '',
      });
    }
  }, [isAuthenticated, user]);

  // Charger les commandes
  useEffect(() => {
    if (isAuthenticated && activeTab === 'orders' && user) {
      const fetchOrders = async () => {
        try {
          setLoadingOrders(true);
          const params = new URLSearchParams();
          if (user.id) params.append('userId', user.id);
          if (user.email) params.append('email', user.email);

          const response = await fetch(`/api/orders/list?${params.toString()}`);
          if (response.ok) {
            const data = await response.json();
            setOrders(Array.isArray(data.orders) ? data.orders : []);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
          setOrders([]);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated, activeTab, user]);

  // Charger les adresses (dans l'onglet profil maintenant)
  useEffect(() => {
    if (isAuthenticated && (activeTab === 'profile' || activeTab === 'addresses')) {
      fetchAddresses();
    }
  }, [isAuthenticated, activeTab]);

  // Charger la wishlist
  useEffect(() => {
    if (isAuthenticated && activeTab === 'wishlist') {
      fetchWishlist();
    }
  }, [isAuthenticated, activeTab]);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const response = await fetch('/api/user/addresses');
      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const fetchWishlist = async () => {
    setLoadingWishlist(true);
    try {
      const response = await fetch('/api/user/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Combiner prénom et nom pour l'update
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await updateProfile({ name: fullName, phone: formData.phone });
      setSuccess('Profil mis à jour avec succès !');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Gestion des adresses
  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const method = editingAddress ? 'PUT' : 'POST';
      const body = editingAddress
        ? { id: editingAddress.id, ...addressForm }
        : addressForm;

      const response = await fetch('/api/user/addresses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSuccess(editingAddress ? 'Adresse modifiée !' : 'Adresse ajoutée !');
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({
          label: 'Domicile',
          full_name: user?.name || '',
          phone: '',
          street: '',
          street_complement: '',
          postal_code: '',
          city: '',
          country: 'France',
          is_default: false,
          is_billing: false,
        });
        await fetchAddresses();
      } else {
        const data = await response.json();
        setError(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Supprimer cette adresse ?')) return;

    try {
      const response = await fetch(`/api/user/addresses?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Adresse supprimée');
        await fetchAddresses();
      }
    } catch (error) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleSetDefaultAddress = async (address: Address) => {
    try {
      const response = await fetch('/api/user/addresses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: address.id, is_default: true }),
      });

      if (response.ok) {
        await fetchAddresses();
      }
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  // Gestion du mot de passe
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess('Mot de passe modifié avec succès !');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordError(data.error || 'Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      setPasswordError('Erreur serveur');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Gestion wishlist
  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/user/wishlist?product_id=${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchWishlist();
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  // Loaders
  if (isLoading || !authCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection vers la connexion...</p>
        </div>
      </div>
    );
  }

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'bureau':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
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
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'wishlist'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Mes favoris</span>
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
            {/* Messages globaux */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
                <button onClick={() => setError('')} className="float-right"><X className="w-4 h-4" /></button>
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                {success}
                <button onClick={() => setSuccess('')} className="float-right"><X className="w-4 h-4" /></button>
              </div>
            )}

            {/* Tab: Profil */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Informations personnelles */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                  </form>
                </div>

                {/* Mes adresses */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Mes adresses</h2>
                    <button
                      onClick={() => {
                        setShowAddressForm(true);
                        setEditingAddress(null);
                        setAddressForm({
                          label: 'Domicile',
                          full_name: `${formData.firstName} ${formData.lastName}`.trim() || user?.name || '',
                          phone: formData.phone || '',
                          street: '',
                          street_complement: '',
                          postal_code: '',
                          city: '',
                          country: 'France',
                          is_default: addresses.length === 0,
                          is_billing: false,
                        });
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter
                    </button>
                  </div>

                  {/* Formulaire d'adresse */}
                  {showAddressForm && (
                    <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <h3 className="font-medium mb-4">{editingAddress ? 'Modifier l\'adresse' : 'Nouvelle adresse'}</h3>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={addressForm.label}
                              onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Domicile">Domicile</option>
                              <option value="Bureau">Bureau</option>
                              <option value="Autre">Autre</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                            <input
                              type="text"
                              value={addressForm.full_name}
                              onChange={(e) => setAddressForm({ ...addressForm, full_name: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                          <input
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                          <input
                            type="text"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Complément</label>
                          <input
                            type="text"
                            value={addressForm.street_complement}
                            onChange={(e) => setAddressForm({ ...addressForm, street_complement: e.target.value })}
                            placeholder="Bâtiment, étage, code..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
                            <input
                              type="text"
                              value={addressForm.postal_code}
                              onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                            <input
                              type="text"
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={addressForm.is_default}
                              onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">Adresse par défaut</span>
                          </label>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddressForm(false);
                              setEditingAddress(null);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Liste des adresses */}
                  {loadingAddresses ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : addresses.length === 0 && !showAddressForm ? (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Aucune adresse enregistrée</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`p-4 border rounded-lg ${
                            address.is_default ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                {getLabelIcon(address.label)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{address.label}</span>
                                  {address.is_default && (
                                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">Par défaut</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{address.full_name}</p>
                                <p className="text-sm text-gray-600">{address.street}</p>
                                {address.street_complement && (
                                  <p className="text-sm text-gray-600">{address.street_complement}</p>
                                )}
                                <p className="text-sm text-gray-600">{address.postal_code} {address.city}</p>
                                {address.phone && (
                                  <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!address.is_default && (
                                <button
                                  onClick={() => handleSetDefaultAddress(address)}
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                  title="Définir par défaut"
                                >
                                  <Star className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setEditingAddress(address);
                                  setAddressForm(address);
                                  setShowAddressForm(true);
                                }}
                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Modifier"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Commandes */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Mes commandes</h2>

                {loadingOrders ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Vous n'avez pas encore de commandes</p>
                    <Link href="/nos-produits" className="text-blue-600 hover:text-blue-700 font-medium">
                      Découvrir nos produits →
                    </Link>
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

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Mes favoris</h2>

                {loadingWishlist ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucun produit dans vos favoris</p>
                    <Link href="/nos-produits" className="text-blue-600 hover:text-blue-700 font-medium">
                      Découvrir nos produits →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        {/* Image placeholder */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                          {item.image && (
                            <img
                              src={item.image.startsWith('http') ? item.image : `https://res.cloudinary.com/monster-phone/image/upload/v1763527513/${item.image}.png`}
                              alt={item.products?.name}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/produit-supabase/${item.products?.url_slug}`}
                            className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                          >
                            {item.products?.name}
                          </Link>
                          <div className="mt-1">
                            {item.products?.discount && item.products.discount > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-red-600">
                                  {((item.products.price || 0) * (1 - item.products.discount / 100)).toFixed(2)} €
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  {item.products?.price?.toFixed(2)} €
                                </span>
                              </div>
                            ) : (
                              <span className="font-semibold">{item.products?.price?.toFixed(2)} €</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Ajouté le {new Date(item.added_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromWishlist(item.product_id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors self-start"
                          title="Retirer des favoris"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Sécurité */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Sécurité</h2>

                <div className="max-w-md">
                  <h3 className="font-medium mb-4">Changer le mot de passe</h3>

                  {passwordError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                      {passwordSuccess}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isChangingPassword ? 'Modification...' : 'Changer le mot de passe'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
