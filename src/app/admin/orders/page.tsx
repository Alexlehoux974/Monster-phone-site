'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthHeaders } from '@/lib/supabase/admin';
import { Package, Clock, Check, XCircle, Eye, Calendar, Search, Download, X } from 'lucide-react';

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  items_count?: number;
  items?: OrderItem[];
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const STATUS_ICONS = {
  pending: Clock,
  processing: Package,
  shipped: Package,
  delivered: Check,
  cancelled: XCircle,
};

const STATUS_LABELS = {
  pending: 'En attente',
  processing: 'En traitement',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export default function AdminOrdersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // const isAdmin = await verifyAdmin();
      const isAdmin = true; // TODO: Implement proper admin verification
      if (!isAdmin) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const auth = getAuthHeaders();

      if (!auth) {
        console.error('Session expirée');
        setLoading(false);
        return;
      }

      // Récupérer toutes les commandes
      const ordersResponse = await fetch(
        `${auth.url}/rest/v1/orders?select=*&order=created_at.desc`,
        { headers: auth.headers }
      );

      if (!ordersResponse.ok) {
        console.error('Erreur récupération commandes');
        setLoading(false);
        return;
      }

      const ordersData = await ordersResponse.json();

      // Récupérer le nombre d'items pour chaque commande
      const ordersWithCounts = await Promise.all(
        (ordersData || []).map(async (order: any) => {
          const countResponse = await fetch(
            `${auth.url}/rest/v1/order_items?select=*&order_id=eq.${order.id}`,
            {
              headers: { ...auth.headers, 'Prefer': 'count=exact' },
              method: 'HEAD'
            }
          );

          const count = countResponse.headers.get('content-range')?.split('/')[1] || '0';

          return {
            ...order,
            items_count: parseInt(count),
          };
        })
      );

      setOrders(ordersWithCounts);
    } catch (error) {
      console.error('Erreur fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const auth = getAuthHeaders();
      if (!auth) {
        console.error('Session expirée');
        return;
      }

      const response = await fetch(
        `${auth.url}/rest/v1/orders?id=eq.${orderId}`,
        {
          method: 'PATCH',
          headers: auth.headers,
          body: JSON.stringify({
            status: newStatus,
            updated_at: new Date().toISOString()
          }),
        }
      );

      if (!response.ok) {
        console.error('Erreur mise à jour statut');
        return;
      }

      // Mettre à jour l'état local
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
            : order
        )
      );

      } catch (error) {
      console.error('Erreur update status:', error);
    }
  };

  const viewOrderDetails = async (orderId: string) => {
    try {
      const auth = getAuthHeaders();
      if (!auth) {
        console.error('Session expirée');
        return;
      }

      // Récupérer la commande complète
      const orderResponse = await fetch(
        `${auth.url}/rest/v1/orders?id=eq.${orderId}`,
        { headers: auth.headers }
      );

      if (!orderResponse.ok) {
        console.error('Erreur récupération commande');
        return;
      }

      const [order] = await orderResponse.json();

      // Récupérer les items de la commande
      const itemsResponse = await fetch(
        `${auth.url}/rest/v1/order_items?order_id=eq.${orderId}`,
        { headers: auth.headers }
      );

      if (!itemsResponse.ok) {
        console.error('Erreur récupération items');
        return;
      }

      const items = await itemsResponse.json();

      setSelectedOrder({ ...order, items });
    } catch (error) {
      console.error('Erreur view order:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Numéro', 'Client', 'Email', 'Téléphone', 'Adresse', 'Montant', 'Statut', 'Date'];
    const rows = filteredOrders.map(order => [
      order.order_number,
      order.customer_name,
      order.customer_email,
      order.customer_phone || '',
      `${order.shipping_address || ''} ${order.shipping_postal_code || ''} ${order.shipping_city || ''}`.trim(),
      order.total_amount.toFixed(2),
      STATUS_LABELS[order.status],
      new Date(order.created_at).toLocaleDateString('fr-FR'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `commandes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  const searchedOrders = searchQuery
    ? filteredOrders.filter(order =>
        order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredOrders;

  const statsOrders = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total_amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des commandes</h1>
        <p className="text-gray-600">Gérez toutes les commandes clients</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total commandes</p>
              <p className="text-3xl font-bold text-gray-900">{statsOrders.total}</p>
            </div>
            <Package className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Chiffre d'affaires</p>
              <p className="text-3xl font-bold text-green-600">{totalRevenue.toFixed(2)} €</p>
            </div>
            <Check className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">En attente</p>
              <p className="text-3xl font-bold text-yellow-600">{statsOrders.pending}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Livrées</p>
              <p className="text-3xl font-bold text-blue-600">{statsOrders.delivered}</p>
            </div>
            <Check className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Barre de recherche et export */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro, nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Toutes ({statsOrders.total})
          </button>
          {Object.entries(STATUS_LABELS).map(([status, label]) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label} ({statsOrders[status as keyof typeof statsOrders]})
            </button>
          ))}
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Articles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? 'Aucune commande ne correspond à votre recherche' : 'Aucune commande trouvée'}
                  </td>
                </tr>
              ) : (
                searchedOrders.map((order: any) => {
                  const StatusIcon = STATUS_ICONS[order.status];

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.order_number}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer_name}
                          </div>
                          <div className="text-sm text-gray-500">{order.customer_email}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.items_count} article{order.items_count && order.items_count > 1 ? 's' : ''}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {order.total_amount.toFixed(2)} €
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            STATUS_COLORS[order.status]
                          }`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {STATUS_LABELS[order.status]}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewOrderDetails(order.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="pending">En attente</option>
                            <option value="processing">En traitement</option>
                            <option value="shipped">Expédiée</option>
                            <option value="delivered">Livrée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal détails commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Commande {selectedOrder.order_number}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations client */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations client</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom:</span>
                    <span className="font-medium text-gray-900">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">{selectedOrder.customer_email}</span>
                  </div>
                  {selectedOrder.customer_phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="font-medium text-gray-900">{selectedOrder.customer_phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Adresse de livraison */}
              {(selectedOrder.shipping_address || selectedOrder.shipping_city) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Adresse de livraison</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">
                      {selectedOrder.shipping_address}
                      {selectedOrder.shipping_postal_code && `, ${selectedOrder.shipping_postal_code}`}
                      {selectedOrder.shipping_city && ` ${selectedOrder.shipping_city}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Articles commandés */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Articles commandés</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Qté</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Prix unit.</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items?.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.product_name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.unit_price.toFixed(2)} €</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{item.total_price.toFixed(2)} €</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">Total</td>
                        <td className="px-4 py-3 text-lg font-bold text-gray-900 text-right">{selectedOrder.total_amount.toFixed(2)} €</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Statut */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Statut de la commande</h3>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                      STATUS_COLORS[selectedOrder.status]
                    }`}
                  >
                    {STATUS_LABELS[selectedOrder.status]}
                  </span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as Order['status']);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value as Order['status'] });
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En traitement</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
