'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import SearchBar from '@/components/admin/SearchBar';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Toast from '@/components/admin/Toast';
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Edit2,
  Save,
  X,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock_quantity: number;
  status: string;
  price: number;
  category_id: string;
  brand_id: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

export default function StockManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingStock, setEditingStock] = useState<number>(0);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadData();
    setupRealtime();
  }, []);

  const loadData = async () => {
    try {
      // Load products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (productsError) throw productsError;

      // Load brands
      const { data: brandsData } = await supabase
        .from('brands')
        .select('id, name')
        .order('name');

      // Load categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      setProducts(productsData || []);
      setBrands(brandsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Erreur lors du chargement des données', 'error');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtime = () => {
    const channel = supabase
      .channel('products-stock-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          console.log('Stock updated:', payload);
          setProducts((prev) =>
            prev.map((p) =>
              p.id === payload.new.id ? { ...p, ...payload.new } : p
            )
          );
          showToast('Stock mis à jour en temps réel', 'info');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setToast({ message, type });
  };

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditingStock(product.stock_quantity || 0);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingStock(0);
  };

  const saveStock = async (productId: string) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const newStatus =
        editingStock === 0
          ? 'out-of-stock'
          : editingStock > 0
          ? 'active'
          : product.status;

      const { error } = await supabase
        .from('products')
        .update({
          stock_quantity: editingStock,
          status: newStatus,
        })
        .eq('id', productId);

      if (error) throw error;

      // Log history
      await supabase.from('product_stock_history').insert({
        product_id: productId,
        previous_stock: product.stock_quantity,
        new_stock: editingStock,
        change_amount: editingStock - (product.stock_quantity || 0),
        change_reason: 'Mise à jour manuelle via admin',
        admin_email: (await supabase.auth.getUser()).data.user?.email,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId
            ? { ...p, stock_quantity: editingStock, status: newStatus }
            : p
        )
      );

      showToast('Stock mis à jour avec succès', 'success');
      cancelEditing();
    } catch (error) {
      console.error('Error updating stock:', error);
      showToast('Erreur lors de la mise à jour du stock', 'error');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'in-stock' && (product.stock_quantity || 0) > 0) ||
      (statusFilter === 'out-of-stock' &&
        (product.stock_quantity || 0) === 0) ||
      (statusFilter === 'low-stock' &&
        (product.stock_quantity || 0) > 0 &&
        (product.stock_quantity || 0) < 10);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: products.length,
    inStock: products.filter((p) => (p.stock_quantity || 0) > 0).length,
    outOfStock: products.filter((p) => (p.stock_quantity || 0) === 0).length,
    lowStock: products.filter(
      (p) => (p.stock_quantity || 0) > 0 && (p.stock_quantity || 0) < 10
    ).length,
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
        <h1 className="text-3xl font-bold text-white mb-2">Gestion du Stock</h1>
        <p className="text-gray-400">
          Gérez les quantités en stock de vos produits
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Produits</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">En Stock</p>
              <p className="text-2xl font-bold text-white">{stats.inStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Stock Faible</p>
              <p className="text-2xl font-bold text-white">{stats.lowStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <X className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Rupture</p>
              <p className="text-2xl font-bold text-white">
                {stats.outOfStock}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Rechercher par nom ou SKU..."
            onSearch={setSearchQuery}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="in-stock">En stock</option>
          <option value="low-stock">Stock faible (&lt; 10)</option>
          <option value="out-of-stock">Rupture de stock</option>
        </select>
      </div>

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
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stock Actuel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Prix
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{product.sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={editingStock}
                        onChange={(e) =>
                          setEditingStock(parseInt(e.target.value) || 0)
                        }
                        min="0"
                        className="w-24 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div
                        className={`text-sm font-semibold ${
                          (product.stock_quantity || 0) === 0
                            ? 'text-red-500'
                            : (product.stock_quantity || 0) < 10
                            ? 'text-orange-500'
                            : 'text-green-500'
                        }`}
                      >
                        {product.stock_quantity || 0}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (product.stock_quantity || 0) === 0
                          ? 'bg-red-500/10 text-red-500'
                          : (product.stock_quantity || 0) < 10
                          ? 'bg-orange-500/10 text-orange-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}
                    >
                      {(product.stock_quantity || 0) === 0
                        ? 'Rupture'
                        : (product.stock_quantity || 0) < 10
                        ? 'Stock faible'
                        : 'En stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {product.price?.toFixed(2)} €
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === product.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => saveStock(product.id)}
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
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
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
