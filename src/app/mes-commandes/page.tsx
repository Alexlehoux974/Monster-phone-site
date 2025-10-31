'use client';

import { useState } from 'react';
import { Package, Mail, Search, Calendar, CreditCard, Truck, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  total: number;
  payment_status: string;
  status: string;
  created_at: string;
  items: any[];
}

export default function MesCommandesPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(false);

    try {
      const response = await fetch(`/api/orders/list?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commandes');
      }

      const data = await response.json();
      setOrders(data.orders || []);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
      processing: { label: 'En préparation', color: 'bg-blue-100 text-blue-800', icon: '📦' },
      shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-800', icon: '🚚' },
      delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800', icon: '✅' },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: '❌' },
    };

    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: '📋' };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Mes Commandes
          </h1>
          <p className="text-lg text-gray-600">
            Suivez vos commandes en temps réel avec votre adresse email
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email utilisée lors de la commande
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Recherche en cours...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Rechercher mes commandes
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Orders List */}
        {searched && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Aucune commande trouvée pour cette adresse email
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Vérifiez que vous avez saisi la bonne adresse email
                </p>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-blue-800 font-medium">
                    ✨ {orders.length} commande{orders.length > 1 ? 's' : ''} trouvée{orders.length > 1 ? 's' : ''}
                  </p>
                </div>

                {orders.map((order: any) => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="w-6 h-6" />
                          <span className="font-bold text-lg">
                            Commande N° {order.order_number || order.id.substring(0, 8).toUpperCase()}
                          </span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-2 text-blue-100">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Order Items */}
                      <div className="space-y-3 mb-6">
                        {order.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-start pb-3 border-b border-gray-200 last:border-0">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.product_name}</p>
                              <p className="text-sm text-gray-600">Quantité : {item.quantity}</p>
                            </div>
                            <p className="font-bold text-gray-900">{(item.total_price || 0).toFixed(2)} €</p>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {(order.total || 0).toFixed(2)} €
                        </span>
                      </div>

                      {/* Payment Status */}
                      <div className="mt-6 flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">
                          ✅ Paiement confirmé
                        </span>
                      </div>

                      {/* Delivery Info */}
                      {order.status === 'shipped' && (
                        <div className="mt-4 flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                          <Truck className="w-5 h-5 text-purple-600" />
                          <span className="text-purple-700 font-medium">
                            🚚 En cours de livraison
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
