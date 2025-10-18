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
  Eye,
  EyeOff,
  Percent,
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
  is_visible: boolean;
  admin_discount_percent: number;
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
  isVisible: boolean;
  adminDiscountPercent: number;
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
  const [editingVisible, setEditingVisible] = useState<boolean>(true);
  const [editingDiscount, setEditingDiscount] = useState<number>(0);
  const [saving, setSaving] = useState(false); // État de sauvegarde en cours
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
      // Load products with variants
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .order('name');

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
              isVisible: product.is_visible !== undefined ? product.is_visible : true,
              adminDiscountPercent: variant.admin_discount_percent || 0, // IMPORTANT: Utiliser la promo du variant, pas du produit parent
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
            isVisible: product.is_visible !== undefined ? product.is_visible : true,
            adminDiscountPercent: product.admin_discount_percent || 0,
          });
        }
      });

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
    setEditingVisible(row.isVisible);
    setEditingDiscount(row.adminDiscountPercent);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingStock(0);
    setEditingPrice(0);
    setEditingVisible(true);
    setEditingDiscount(0);
  };

  const saveStock = async (rowId: string) => {
    console.log('💾 [SAVE STOCK] Function called for rowId:', rowId);

    // Empêcher les doubles clics
    if (saving) {
      console.log('⚠️ [SAVE STOCK] Already saving, ignoring click');
      return;
    }

    setSaving(true);

    try {
      const row = variantRows.find((r) => r.id === rowId);
      if (!row) {
        console.error('❌ [SAVE STOCK] Row not found:', rowId);
        setSaving(false);
        return;
      }

      console.log('📋 [SAVE STOCK] Row data:', {
        id: row.id,
        isVariant: row.isVariant,
        stock: editingStock,
        price: editingPrice,
        discount: editingDiscount
      });

      // Récupérer la session courante
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        console.error('❌ [SAVE STOCK] Session error:', sessionError);
        showToast('Session expirée, veuillez vous reconnecter', 'error');
        setSaving(false); // Réinitialiser avant redirection
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
        return;
      }

      console.log('✅ [SAVE STOCK] Session OK, access_token present');

      if (row.isVariant) {
        console.log('📦 [SAVE STOCK] Updating variant (stock + promo)...');

        // Update variant stock AND discount via generic API route
        const variantResponse = await fetch('/api/admin/supabase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}` // Token explicite
          },
          body: JSON.stringify({
            operation: 'update',
            table: 'product_variants',
            data: {
              stock: editingStock,
              admin_discount_percent: editingDiscount
            },
            filters: [{ column: 'id', value: row.variantId }]
          })
        });

        console.log('📡 [SAVE STOCK] Variant API response status:', variantResponse.status);

        const variantResult = await variantResponse.json();
        console.log('📡 [SAVE STOCK] Variant API result:', variantResult);

        if (!variantResponse.ok || variantResult.error) {
          throw new Error(variantResult.error || 'Failed to update variant');
        }

        console.log('🏷️ [SAVE STOCK] Updating product (price, visibility)...');

        // Update product price and visibility (NOT discount - it's now per-variant)
        const productResponse = await fetch('/api/admin/supabase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}` // Token explicite
          },
          body: JSON.stringify({
            operation: 'update',
            table: 'products',
            data: {
              price: editingPrice,
              is_visible: editingVisible
            },
            filters: [{ column: 'id', value: row.productId }]
          })
        });

        console.log('📡 [SAVE STOCK] Product API response status:', productResponse.status);

        const productResult = await productResponse.json();
        console.log('📡 [SAVE STOCK] Product API result:', productResult);

        if (!productResponse.ok || productResult.error) {
          throw new Error(productResult.error || 'Failed to update product');
        }

        // Update the row in state
        setVariantRows((prev) =>
          prev.map((r) =>
            r.id === rowId ? {
              ...r,
              stock: editingStock,
              price: editingPrice,
              isVisible: editingVisible,
              adminDiscountPercent: editingDiscount
            } : r
          )
        );
      } else {
        // Fallback for products without variants (backward compatibility)
        // Update stock, price, visibility and discount via API route
        const response = await fetch('/api/admin/supabase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}` // Token explicite
          },
          body: JSON.stringify({
            operation: 'update',
            table: 'products',
            data: {
              stock_quantity: editingStock,
              price: editingPrice,
              status: editingStock === 0 ? 'out-of-stock' : 'active',
              is_visible: editingVisible,
              admin_discount_percent: editingDiscount
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
            r.id === rowId ? {
              ...r,
              stock: editingStock,
              price: editingPrice,
              isVisible: editingVisible,
              adminDiscountPercent: editingDiscount
            } : r
          )
        );
      }

      // Revalidate the main site to update stock display
      console.log('🔄 [SAVE STOCK] Revalidating site cache...');
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
        console.log('✅ [SAVE STOCK] Site cache revalidated');
        } catch (revalidateError) {
        console.error('⚠️ [SAVE STOCK] Revalidation error (non-blocking):', revalidateError);
      }

      console.log('🎉 [SAVE STOCK] All operations completed successfully');
      showToast('Produit mis à jour avec succès', 'success');

      // Force reload data from database to ensure consistency
      console.log('🔄 [SAVE STOCK] Reloading data from database...');
      await loadData();

      cancelEditing();
    } catch (error) {
      console.error('❌ [SAVE STOCK] Error during save:', error);
      console.error('❌ [SAVE STOCK] Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      showToast(error instanceof Error ? error.message : 'Erreur lors de la mise à jour', 'error');
    } finally {
      // Toujours réinitialiser l'état de sauvegarde
      setSaving(false);
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
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Visible
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Promo %
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
                  {/* Visible Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {editingId === row.id ? (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingVisible}
                          onChange={(e) => setEditingVisible(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-center">
                        {row.isVisible ? (
                          <span title="Visible">
                            <Eye className="w-5 h-5 text-green-500" />
                          </span>
                        ) : (
                          <span title="Masqué">
                            <EyeOff className="w-5 h-5 text-gray-500" />
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  {/* Discount Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === row.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={editingDiscount}
                          onChange={(e) =>
                            setEditingDiscount(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))
                          }
                          min="0"
                          max="100"
                          className="w-16 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Percent className="w-4 h-4 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {row.adminDiscountPercent > 0 ? (
                          <>
                            <span className="text-sm font-semibold text-red-500">
                              -{row.adminDiscountPercent}%
                            </span>
                            <span className="text-xs text-gray-500">
                              ({(row.price * (1 - row.adminDiscountPercent / 100)).toFixed(2)}€)
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                    )}
                  </td>
                  {/* Actions Column */}
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
