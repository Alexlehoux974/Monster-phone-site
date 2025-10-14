'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDashboardStats } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/client';
import {
  Package,
  CheckCircle,
  AlertTriangle,
  FolderKanban,
  Megaphone,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  totalCollections: number;
  activeBanners: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait a tiny bit for session to be available
      await new Promise(resolve => setTimeout(resolve, 100));

      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/admin/login');
        return;
      }

      setChecking(false);
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (checking) return;

    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Erreur chargement statistiques:', error);
        // Afficher des stats vides en cas d'erreur
        setStats({
          totalProducts: 0,
          activeProducts: 0,
          outOfStock: 0,
          totalCollections: 0,
          activeBanners: 0,
        });
      } finally {
        // Toujours arrêter le loading, même en cas d'erreur
        setLoading(false);
      }
    };

    loadStats();
  }, [checking]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Produits Total',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-500',
    },
    {
      title: 'Produits Actifs',
      value: stats?.activeProducts || 0,
      icon: CheckCircle,
      color: 'from-green-600 to-green-500',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-500',
    },
    {
      title: 'Rupture de Stock',
      value: stats?.outOfStock || 0,
      icon: AlertTriangle,
      color: 'from-red-600 to-orange-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-500',
    },
    {
      title: 'Collections',
      value: stats?.totalCollections || 0,
      icon: FolderKanban,
      color: 'from-purple-600 to-purple-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-500',
    },
    {
      title: 'Bannières Actives',
      value: stats?.activeBanners || 0,
      icon: Megaphone,
      color: 'from-orange-600 to-orange-500',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-500',
    },
  ];

  const stockPercentage = stats?.totalProducts
    ? ((stats.activeProducts / stats.totalProducts) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-400">
          Vue d'ensemble de votre boutique Monster Phone
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-white">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock health */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Santé du Stock
            </h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Taux de disponibilité</span>
                <span className="text-lg font-semibold text-white">{stockPercentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${stockPercentage}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-sm text-gray-400 mb-1">En stock</p>
                <p className="text-2xl font-bold text-green-500">
                  {stats?.activeProducts || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Rupture</p>
                <p className="text-2xl font-bold text-red-500">
                  {stats?.outOfStock || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Actions rapides
          </h3>
          <div className="space-y-3">
            <a
              href="/admin/stock"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors group"
            >
              <Package className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Gérer le stock</p>
                <p className="text-xs text-gray-400">Mise à jour des quantités</p>
              </div>
              <ArrowUp className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </a>
            <a
              href="/admin/pricing"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors group"
            >
              <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Prix & Promotions</p>
                <p className="text-xs text-gray-400">Gérer les tarifs</p>
              </div>
              <ArrowUp className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </a>
            <a
              href="/admin/banners"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors group"
            >
              <Megaphone className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Bannières</p>
                <p className="text-xs text-gray-400">Gérer les annonces</p>
              </div>
              <ArrowUp className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {stats && stats.outOfStock > 0 && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-1">
                Attention : Produits en rupture
              </h4>
              <p className="text-gray-400">
                {stats.outOfStock} produit{stats.outOfStock > 1 ? 's sont' : ' est'} actuellement en rupture de stock.
                Pensez à mettre à jour les quantités pour éviter les pertes de ventes.
              </p>
              <a
                href="/admin/stock"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Gérer le stock
                <ArrowUp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
