'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
import SearchBar from '@/components/admin/SearchBar';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Toast from '@/components/admin/Toast';
import {
  DollarSign,
  Edit2,
  Save,
  X,
  TrendingUp,
  Percent,
  Tag,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  original_price: number | null;
  discount: number | null;
  promo: string | null;
  status: string;
}

export default function PricingManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState({
    price: 0,
    original_price: 0,
    discount: 0,
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, sku, price, original_price, discount, promo, status')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      showToast('Erreur lors du chargement des produits', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setToast({ message, type });
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditingData({
      price: product.price || 0,
      original_price: product.original_price || product.price || 0,
      discount: product.discount || 0,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (originalPrice === 0 || price >= originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const updateEditingData = (field: string, value: number) => {
    const newData = { ...editingData, [field]: value };

    // Auto-calculate discount if price or original_price changes
    if (field === 'price' || field === 'original_price') {
      newData.discount = calculateDiscount(
        field === 'price' ? value : newData.price,
        field === 'original_price' ? value : newData.original_price
      );
    }

    // Auto-calculate price if discount changes
    if (field === 'discount' && newData.original_price > 0) {
      newData.price = Math.round(
        newData.original_price * (1 - value / 100) * 100
      ) / 100;
    }

    setEditingData(newData);
  };

  const savePricing = async (productId: string) => {
    try {
      const updates: any = {
        price: editingData.price,
        original_price: editingData.original_price,
        discount: editingData.discount,
      };

      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Non authentifié');
      }

      // Update via API route (uses service_role to bypass RLS)
      const response = await fetch('/api/admin/supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          operation: 'update',
          table: 'products',
          data: updates,
          filters: [{ column: 'id', value: productId }],
        }),
      });

      const result = await response.json();
      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to update pricing');
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
      );

      showToast('Prix mis à jour avec succès', 'success');
      cancelEditing();
    } catch (error) {
      console.error('Error updating pricing:', error);
      showToast('Erreur lors de la mise à jour du prix', 'error');
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    withDiscount: products.filter((p) => (p.discount || 0) > 0).length,
    withPromo: products.filter((p) => p.promo).length,
    averageDiscount:
      products.length > 0
        ? Math.round(
            products.reduce((acc, p) => acc + (p.discount || 0), 0) /
              products.length
          )
        : 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Prix & Promotions
        </h1>
        <p className="text-gray-400">
          Gérez les prix et les réductions de vos produits
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Produits</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Percent className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avec Réduction</p>
              <p className="text-2xl font-bold text-white">
                {stats.withDiscount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Tag className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">En Promo</p>
              <p className="text-2xl font-bold text-white">
                {stats.withPromo}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Réduction Moy.</p>
              <p className="text-2xl font-bold text-white">
                {stats.averageDiscount}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        placeholder="Rechercher par nom ou SKU..."
        onSearch={setSearchQuery}
      />

      {/* Products Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Prix Actuel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Prix Original
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Réduction
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Promo
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-400">{product.sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editingData.price}
                        onChange={(e) =>
                          updateEditingData('price', parseFloat(e.target.value) || 0)
                        }
                        step="0.01"
                        min="0"
                        className="w-28 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-white">
                        {product.price?.toFixed(2)} €
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editingData.original_price}
                        onChange={(e) =>
                          updateEditingData(
                            'original_price',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        step="0.01"
                        min="0"
                        className="w-28 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div className="text-sm text-gray-400">
                        {product.original_price
                          ? `${product.original_price.toFixed(2)} €`
                          : '-'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === product.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editingData.discount}
                          onChange={(e) =>
                            updateEditingData('discount', parseInt(e.target.value) || 0)
                          }
                          min="0"
                          max="100"
                          className="w-20 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-400">%</span>
                      </div>
                    ) : (
                      <div>
                        {product.discount ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                            -{product.discount}%
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.promo ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500">
                        {product.promo}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === product.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => savePricing(product.id)}
                          className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Sauvegarder"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
                          title="Annuler"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(product)}
                        className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
