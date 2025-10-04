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

interface ProductVariant {
  id: string;
  product_id: string;
  color: string;
  color_code?: string;
  stock: number;
  is_default: boolean;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  stock_quantity: number;
  status: string;
  price: number;
  category_id: string;
  brand_id: string;
  product_variants?: ProductVariant[];
}

interface VariantRow {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  sku: string;
  color: string;
  colorCode?: string;
  stock: number;
  price: number;
  isVariant: boolean;
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
  console.log('[ADMIN STOCK] Component rendering...');

  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [variantRows, setVariantRows] = useState<VariantRow[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingStock, setEditingStock] = useState<number>(0);
  const [editingPrice, setEditingPrice] = useState<number>(0);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  useEffect(() => {
    loadData();
    setupRealtime();
  }, []);

  const loadData = async () => {
    try {
      console.log('[ADMIN] Starting data load...');

      // Load products with variants
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .order('name');

      console.log('[ADMIN] Products query result:', {
        count: productsData?.length,
        error: productsError,
        firstProduct: productsData?.[0]
      });

      if (productsError) {
        console.error('[ADMIN] Products error:', productsError);
        throw productsError;
      }

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

      // Transform products to variant rows
      const rows: VariantRow[] = [];
      (productsData || []).forEach((product) => {
        console.log(`[ADMIN] Processing product: ${product.name}`, {
          has_variants: !!product.product_variants,
          variant_count: product.product_variants?.length || 0,
          variants: product.product_variants
        });

        if (product.product_variants && product.product_variants.length > 0) {
          // Create a row for each variant
          product.product_variants.forEach((variant: any) => {
            rows.push({
              id: `variant-${variant.id}`,
              variantId: variant.id,
              productId: product.id,
              productName: product.name,
              sku: product.sku,
              color: variant.color,
              colorCode: variant.color_code,
              stock: variant.stock,
              price: product.price,
              isVariant: true,
            });
          });
        } else {
          // Product without variants - keep old behavior for backward compatibility
          rows.push({
            id: `product-${product.id}`,
            variantId: '',
            productId: product.id,
            productName: product.name,
            sku: product.sku,
            color: '',
            colorCode: undefined,
            stock: product.stock_quantity || 0,
            price: product.price,
            isVariant: false,
          });
        }
      });

      console.log('[ADMIN] Total variant rows created:', rows.length);
      console.log('[ADMIN] First 3 rows:', rows.slice(0, 3));

      setVariantRows(rows);
      setBrands(brandsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('[ADMIN] Error loading data:', error);
      showToast('Erreur lors du chargement des données', 'error');
    } finally {
      setLoading(false);
    }
  };

  const setupRealtime = () => {
    const channel = supabase
      .channel('product-variants-stock-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'product_variants',
        },
        (payload) => {
          console.log('Variant stock updated:', payload);
          // Update the specific variant row
          setVariantRows((prev) =>
            prev.map((row) =>
              row.variantId === payload.new.id
                ? { ...row, stock: payload.new.stock }
                : row
            )
          );
          showToast('Stock variant mis à jour en temps réel', 'info');
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

  const startEditing = (row: VariantRow) => {
    setEditingId(row.id);
    setEditingStock(row.stock);
    setEditingPrice(row.price);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingStock(0);
    setEditingPrice(0);
  };

  const saveStock = async (rowId: string) => {
    try {
      const row = variantRows.find((r) => r.id === rowId);
      if (!row) return;

      if (row.isVariant) {
        // Update variant stock via API route (uses service_role to bypass RLS)
        const stockResponse = await fetch('/api/admin/update-stock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            variantId: row.variantId,
            stock: editingStock
          })
        });

        const stockResult = await stockResponse.json();
        if (!stockResponse.ok || stockResult.error) {
          throw new Error(stockResult.error || 'Failed to update stock');
        }

        console.log(`Stock updated for ${row.productName} - ${row.color}: ${editingStock}`);

        // Update product price via generic API route
        const priceResponse = await fetch('/api/admin/supabase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operation: 'update',
            table: 'products',
            data: { price: editingPrice },
            filters: [{ column: 'id', value: row.productId }]
          })
        });

        const priceResult = await priceResponse.json();
        if (!priceResponse.ok || priceResult.error) {
          throw new Error(priceResult.error || 'Failed to update price');
        }

        console.log(`Price updated for ${row.productName}: ${editingPrice}€`);

        // Update the row in state
        setVariantRows((prev) =>
          prev.map((r) =>
            r.id === rowId ? { ...r, stock: editingStock, price: editingPrice } : r
          )
        );
      } else {
        // Fallback for products without variants (backward compatibility)
        // Update both stock and price via API route
        const response = await fetch('/api/admin/supabase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operation: 'update',
            table: 'products',
            data: {
              stock_quantity: editingStock,
              price: editingPrice,
              status: editingStock === 0 ? 'out-of-stock' : 'active',
            },
            filters: [{ column: 'id', value: row.productId }]
          })
        });

        const result = await response.json();
        if (!response.ok || result.error) {
          throw new Error(result.error || 'Failed to update product');
        }

        setVariantRows((prev) =>
          prev.map((r) =>
            r.id === rowId ? { ...r, stock: editingStock, price: editingPrice } : r
          )
        );
      }

      // Revalidate the main site to update stock display
      try {
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: `/produit/${row.sku}`,
            tag: 'products'
          }),
        });
        console.log('Site revalidated successfully');
      } catch (revalidateError) {
        console.error('Revalidation error:', revalidateError);
      }

      showToast('Stock et prix mis à jour avec succès', 'success');
      cancelEditing();
    } catch (error) {
      console.error('Error updating stock/price:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  };

  const filteredVariantRows = variantRows.filter((row) => {
    const matchesSearch =
      searchQuery === '' ||
      row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.color.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'in-stock' && row.stock > 0) ||
      (statusFilter === 'out-of-stock' && row.stock === 0) ||
      (statusFilter === 'low-stock' && row.stock > 0 && row.stock < 10);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: variantRows.length,
    inStock: variantRows.filter((r) => r.stock > 0).length,
    outOfStock: variantRows.filter((r) => r.stock === 0).length,
    lowStock: variantRows.filter((r) => r.stock > 0 && r.stock < 10).length,
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
              {filteredVariantRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {row.productName}
                      {row.isVariant && (
                        <span className="ml-2 text-gray-400">- {row.color}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{row.sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === row.id ? (
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
                          row.stock === 0
                            ? 'text-red-500'
                            : row.stock < 10
                            ? 'text-orange-500'
                            : 'text-green-500'
                        }`}
                      >
                        {row.stock}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {row.isVariant && row.colorCode && (
                        <div
                          className="w-4 h-4 rounded-full border border-gray-600"
                          style={{ backgroundColor: row.colorCode }}
                          title={row.color}
                        />
                      )}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.stock === 0
                            ? 'bg-red-500/10 text-red-500'
                            : row.stock < 10
                            ? 'bg-orange-500/10 text-orange-500'
                            : 'bg-green-500/10 text-green-500'
                        }`}
                      >
                        {row.stock === 0
                          ? 'Rupture'
                          : row.stock < 10
                          ? 'Stock faible'
                          : 'En stock'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === row.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editingPrice}
                          onChange={(e) =>
                            setEditingPrice(parseFloat(e.target.value) || 0)
                          }
                          min="0"
                          step="0.01"
                          className="w-24 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-400">€</span>
                      </div>
                    ) : (
                      <div className="text-sm text-white">
                        {row.price?.toFixed(2)} €
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === row.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => saveStock(row.id)}
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
                        onClick={() => startEditing(row)}
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

          {filteredVariantRows.length === 0 && (
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
