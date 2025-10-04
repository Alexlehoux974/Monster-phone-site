'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Toast from '@/components/admin/Toast';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Package,
  X,
  Save,
} from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  emoji: string | null;
  icon: string | null;
  display_order: number;
  is_featured: boolean;
  is_active: boolean;
  _count?: {
    products: number;
  };
}

interface Product {
  id: string;
  name: string;
  sku: string;
}

export default function CollectionsManagementPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    emoji: '',
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      loadCollectionProducts(selectedCollection);
    }
  }, [selectedCollection]);

  const loadData = async () => {
    try {
      // Load collections
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('collections')
        .select('*')
        .order('display_order');

      if (collectionsError) throw collectionsError;

      // Load products
      const { data: productsData } = await supabase
        .from('products')
        .select('id, name, sku')
        .order('name');

      // Count products per collection
      const collectionsWithCounts = await Promise.all(
        (collectionsData || []).map(async (collection) => {
          const { count } = await supabase
            .from('collection_products')
            .select('*', { count: 'exact', head: true })
            // @ts-ignore - Supabase type issue
            .eq('collection_id', collection.id);

          return {
            // @ts-ignore - Supabase type issue
            ...collection,
            _count: { products: count || 0 },
          };
        })
      );

      setCollections(collectionsWithCounts);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Erreur lors du chargement des données', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadCollectionProducts = async (collectionId: string) => {
    try {
      // @ts-ignore - Supabase type issue
      const { data, error } = await supabase
        .from('collection_products')
        .select(`
          product_id,
          products (
            id,
            name,
            sku
          )
        `)
        .eq('collection_id', collectionId)
        .order('display_order');

      if (error) throw error;

      const productsData = data.map((item: any) => item.products).filter(Boolean);
      setCollectionProducts(productsData);
    } catch (error) {
      console.error('Error loading collection products:', error);
      showToast('Erreur lors du chargement des produits', 'error');
    }
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setToast({ message, type });
  };

  const toggleCollectionStatus = async (collectionId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('collections')
        // @ts-ignore - Supabase type issue
        .update({ is_active: !isActive })
        .eq('id', collectionId);

      if (error) throw error;

      setCollections((prev) =>
        prev.map((c) => (c.id === collectionId ? { ...c, is_active: !isActive } : c))
      );

      showToast(
        `Collection ${!isActive ? 'activée' : 'désactivée'} avec succès`,
        'success'
      );
    } catch (error) {
      console.error('Error toggling collection:', error);
      showToast('Erreur lors de la modification de la collection', 'error');
    }
  };

  const addProductToCollection = async (productId: string) => {
    if (!selectedCollection) return;

    try {
      // @ts-ignore - Supabase type issue
      const { error } = await supabase.from('collection_products').insert({
        collection_id: selectedCollection,
        product_id: productId,
        display_order: collectionProducts.length,
      });

      if (error) throw error;

      await loadCollectionProducts(selectedCollection);
      await loadData(); // Reload to update counts
      setShowAddProductModal(false);
      showToast('Produit ajouté à la collection', 'success');
    } catch (error: any) {
      console.error('Error adding product:', error);
      if (error.code === '23505') {
        showToast('Ce produit est déjà dans la collection', 'warning');
      } else {
        showToast('Erreur lors de l\'ajout du produit', 'error');
      }
    }
  };

  const removeProductFromCollection = async (productId: string) => {
    if (!selectedCollection) return;

    try {
      const { error } = await supabase
        .from('collection_products')
        .delete()
        .eq('collection_id', selectedCollection)
        .eq('product_id', productId);

      if (error) throw error;

      await loadCollectionProducts(selectedCollection);
      await loadData();
      showToast('Produit retiré de la collection', 'success');
    } catch (error) {
      console.error('Error removing product:', error);
      showToast('Erreur lors du retrait du produit', 'error');
    }
  };

  const createCollection = async () => {
    if (!newCollection.name) {
      showToast('Le nom est obligatoire', 'warning');
      return;
    }

    try {
      const slug = newCollection.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // @ts-ignore - Supabase type issue
      const { error } = await supabase.from('collections').insert({
        name: newCollection.name,
        slug,
        description: newCollection.description,
        emoji: newCollection.emoji,
        display_order: collections.length,
      });

      if (error) throw error;

      await loadData();
      setShowCreateModal(false);
      setNewCollection({ name: '', description: '', emoji: '' });
      showToast('Collection créée avec succès', 'success');
    } catch (error) {
      console.error('Error creating collection:', error);
      showToast('Erreur lors de la création de la collection', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const availableProducts = products.filter(
    (p) => !collectionProducts.find((cp) => cp.id === p.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Collections</h1>
          <p className="text-gray-400">
            Organisez vos produits en collections
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Collection
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {collection.emoji && (
                  <span className="text-3xl">{collection.emoji}</span>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {collection._count?.products || 0} produits
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleCollectionStatus(collection.id, collection.is_active)}
                className={`p-2 rounded-lg transition-colors ${
                  collection.is_active
                    ? 'text-green-500 hover:bg-green-500/10'
                    : 'text-gray-500 hover:bg-gray-700'
                }`}
                title={collection.is_active ? 'Désactiver' : 'Activer'}
              >
                {collection.is_active ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {collection.description || 'Aucune description'}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCollection(collection.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
              >
                <Package className="w-4 h-4" />
                Gérer les produits
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Management Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {collections.find((c) => c.id === selectedCollection)?.name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {collectionProducts.length} produits dans la collection
                </p>
              </div>
              <button
                onClick={() => setSelectedCollection(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter un produit
                </button>
              </div>

              <div className="space-y-3">
                {collectionProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400">{product.sku}</p>
                    </div>
                    <button
                      onClick={() => removeProductFromCollection(product.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Retirer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {collectionProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Aucun produit dans cette collection
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[60vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">
                Ajouter un produit
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {availableProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProductToCollection(product.id)}
                    className="w-full flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400">{product.sku}</p>
                    </div>
                    <Plus className="w-4 h-4 text-green-500" />
                  </button>
                ))}

                {availableProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Tous les produits sont déjà dans la collection
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-md w-full">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                Nouvelle Collection
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={newCollection.name}
                  onChange={(e) =>
                    setNewCollection((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Ex: Nouveautés"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Emoji
                </label>
                <input
                  type="text"
                  value={newCollection.emoji}
                  onChange={(e) =>
                    setNewCollection((prev) => ({ ...prev, emoji: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Ex: 🔥"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={newCollection.description}
                  onChange={(e) =>
                    setNewCollection((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  rows={3}
                  placeholder="Description de la collection..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewCollection({ name: '', description: '', emoji: '' });
                }}
                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={createCollection}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-orange-700 transition-all"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

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
