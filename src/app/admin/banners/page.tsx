'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import SearchBar from '@/components/admin/SearchBar';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import Toast from '@/components/admin/Toast';
import {
  Megaphone,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Calendar,
  X,
} from 'lucide-react';

interface PromoBanner {
  id: string;
  title: string;
  message: string;
  icon?: string;
  bg_color: string;
  text_color: string;
  is_active: boolean;
  display_order: number;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<PromoBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    icon: '',
    bg_color: '#DC2626',
    text_color: '#FFFFFF',
    is_active: true,
    start_date: '',
    end_date: '',
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: bannersData, error } = await supabase
        .from('promo_banners')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      setBanners(bannersData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Erreur lors du chargement des données', 'error');
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

  const openCreateModal = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      message: '',
      icon: '',
      bg_color: '#DC2626',
      text_color: '#FFFFFF',
      is_active: true,
      start_date: '',
      end_date: '',
    });
    setShowModal(true);
  };

  const openEditModal = (banner: PromoBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      message: banner.message,
      icon: banner.icon || '',
      bg_color: banner.bg_color,
      text_color: banner.text_color,
      is_active: banner.is_active,
      start_date: banner.start_date
        ? new Date(banner.start_date).toISOString().split('T')[0]
        : '',
      end_date: banner.end_date
        ? new Date(banner.end_date).toISOString().split('T')[0]
        : '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      showToast('Le titre et le message sont obligatoires', 'warning');
      return;
    }

    try {
      const bannerData = {
        title: formData.title,
        message: formData.message,
        icon: formData.icon || null,
        bg_color: formData.bg_color,
        text_color: formData.text_color,
        is_active: formData.is_active,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      };

      if (editingBanner) {
        // Update existing banner
        const { error } = await supabase
          .from('promo_banners')
          .update(bannerData)
          .eq('id', editingBanner.id);

        if (error) throw error;
        showToast('Bannière mise à jour avec succès', 'success');
      } else {
        // Create new banner
        const { error } = await supabase.from('promo_banners').insert({
          ...bannerData,
          display_order: banners.length,
        });

        if (error) throw error;
        showToast('Bannière créée avec succès', 'success');
      }

      setShowModal(false);
      await loadData();
    } catch (error) {
      console.error('Error saving banner:', error);
      showToast('Erreur lors de la sauvegarde', 'error');
    }
  };

  const toggleActive = async (bannerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('promo_banners')
        .update({ is_active: !currentStatus })
        .eq('id', bannerId);

      if (error) throw error;

      setBanners((prev) =>
        prev.map((b) =>
          b.id === bannerId ? { ...b, is_active: !currentStatus } : b
        )
      );

      showToast(
        `Bannière ${!currentStatus ? 'activée' : 'désactivée'}`,
        'success'
      );
    } catch (error) {
      console.error('Error toggling active:', error);
      showToast('Erreur lors de la modification', 'error');
    }
  };

  const moveOrder = async (bannerId: string, direction: 'up' | 'down') => {
    const currentIndex = banners.findIndex((b) => b.id === bannerId);
    if (currentIndex === -1) return;

    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === banners.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newBanners = [...banners];
    [newBanners[currentIndex], newBanners[newIndex]] = [
      newBanners[newIndex],
      newBanners[currentIndex],
    ];

    // Update display_order for both banners
    try {
      const updates = newBanners.map((banner, index) => ({
        id: banner.id,
        display_order: index,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('promo_banners')
          .update({ display_order: update.display_order })
          .eq('id', update.id);

        if (error) throw error;
      }

      setBanners(newBanners);
      showToast('Ordre mis à jour', 'success');
    } catch (error) {
      console.error('Error updating order:', error);
      showToast('Erreur lors de la mise à jour', 'error');
    }
  };

  const confirmDelete = (bannerId: string) => {
    setBannerToDelete(bannerId);
    setShowDeleteModal(true);
  };

  const deleteBanner = async () => {
    if (!bannerToDelete) return;

    try {
      const { error } = await supabase
        .from('promo_banners')
        .delete()
        .eq('id', bannerToDelete);

      if (error) throw error;

      await loadData();
      showToast('Bannière supprimée avec succès', 'success');
    } catch (error) {
      console.error('Error deleting banner:', error);
      showToast('Erreur lors de la suppression', 'error');
    } finally {
      setShowDeleteModal(false);
      setBannerToDelete(null);
    }
  };

  const filteredBanners = banners.filter(
    (banner) =>
      searchQuery === '' ||
      banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      banner.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: banners.length,
    active: banners.filter((b) => b.is_active).length,
    scheduled: banners.filter((b) => b.start_date || b.end_date).length,
  };

  const colorPresets = [
    { name: 'Rouge', bg: '#DC2626', text: '#FFFFFF' },
    { name: 'Bleu', bg: '#2563EB', text: '#FFFFFF' },
    { name: 'Vert', bg: '#16A34A', text: '#FFFFFF' },
    { name: 'Orange', bg: '#EA580C', text: '#FFFFFF' },
    { name: 'Violet', bg: '#9333EA', text: '#FFFFFF' },
    { name: 'Jaune', bg: '#EAB308', text: '#000000' },
  ];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bannières Promotionnelles
          </h1>
          <p className="text-gray-400">
            Gérez les bannières affichées sur le site
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Bannière
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Megaphone className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Bannières</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Eye className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Actives</p>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Programmées</p>
              <p className="text-2xl font-bold text-white">{stats.scheduled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar
        placeholder="Rechercher une bannière..."
        onSearch={setSearchQuery}
      />

      {/* Banners List */}
      <div className="space-y-4">
        {filteredBanners.map((banner, index) => (
          <div
            key={banner.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Order Controls */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveOrder(banner.id, 'up')}
                    disabled={index === 0}
                    className={`p-1 rounded ${
                      index === 0
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    } transition-colors`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveOrder(banner.id, 'down')}
                    disabled={index === banners.length - 1}
                    className={`p-1 rounded ${
                      index === banners.length - 1
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    } transition-colors`}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Banner Preview */}
                <div className="flex-1">
                  <div
                    className="rounded-lg p-4 mb-3"
                    style={{
                      backgroundColor: banner.bg_color,
                      color: banner.text_color,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {banner.icon && <span className="text-2xl">{banner.icon}</span>}
                      <div>
                        <h3 className="font-bold text-lg">{banner.title}</h3>
                        <p className="text-sm opacity-90">{banner.message}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {banner.start_date && (
                      <span>
                        Début:{' '}
                        {new Date(banner.start_date).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                    {banner.end_date && (
                      <span>
                        Fin: {new Date(banner.end_date).toLocaleDateString('fr-FR')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(banner.id, banner.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      banner.is_active
                        ? 'text-green-500 hover:bg-green-500/10'
                        : 'text-gray-500 hover:bg-gray-700'
                    }`}
                    title={banner.is_active ? 'Actif' : 'Inactif'}
                  >
                    {banner.is_active ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => openEditModal(banner)}
                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(banner.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredBanners.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
            <Megaphone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucune bannière trouvée</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingBanner ? 'Modifier la Bannière' : 'Nouvelle Bannière'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Emoji/Icône (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="🎉"
                  />
                </div>

                {/* Color Presets */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Couleurs Prédéfinies
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            bg_color: preset.bg,
                            text_color: preset.text,
                          })
                        }
                        className="p-3 rounded-lg border-2 transition-all"
                        style={{
                          backgroundColor: preset.bg,
                          color: preset.text,
                          borderColor:
                            formData.bg_color === preset.bg
                              ? '#FFFFFF'
                              : 'transparent',
                        }}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Couleur de fond
                    </label>
                    <input
                      type="color"
                      value={formData.bg_color}
                      onChange={(e) =>
                        setFormData({ ...formData, bg_color: e.target.value })
                      }
                      className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Couleur du texte
                    </label>
                    <input
                      type="color"
                      value={formData.text_color}
                      onChange={(e) =>
                        setFormData({ ...formData, text_color: e.target.value })
                      }
                      className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prévisualisation
                  </label>
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: formData.bg_color,
                      color: formData.text_color,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {formData.icon && (
                        <span className="text-2xl">{formData.icon}</span>
                      )}
                      <div>
                        <h3 className="font-bold text-lg">
                          {formData.title || 'Titre de la bannière'}
                        </h3>
                        <p className="text-sm opacity-90">
                          {formData.message || 'Message de la bannière'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date de début (optionnel)
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) =>
                        setFormData({ ...formData, start_date: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date de fin (optionnel)
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) =>
                        setFormData({ ...formData, end_date: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="is_active" className="text-sm text-gray-300">
                    Bannière active
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    {editingBanner ? 'Mettre à jour' : 'Créer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Confirmer la suppression
            </h3>
            <p className="text-gray-400 mb-6">
              Êtes-vous sûr de vouloir supprimer cette bannière ? Cette action est
              irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={deleteBanner}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Supprimer
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Annuler
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
