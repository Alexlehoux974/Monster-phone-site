'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Euro,
  ShoppingBag,
  Activity,
  Eye,
  RefreshCw,
} from 'lucide-react';

type Period = 'day' | 'week' | 'month' | 'year';

interface KpiValues {
  revenue: number;
  orders: number;
  avg_order: number;
  unique_customers: number;
}

interface StatsResponse {
  period: Period;
  range: { start: string; end: string; prev_start: string; prev_end: string; granularity: string };
  kpis: { current: KpiValues; previous: KpiValues } | null;
  revenue_series: Array<{ bucket: string; nb_orders: number; revenue: number }>;
  top_products: Array<{ product_name: string; total_qty: number; total_revenue: number }>;
  abandoned: {
    total: number;
    converted: number;
    reminders_sent: number;
    conversion_rate: number;
    avg_value: number;
  } | null;
  funnel: {
    visitors: number;
    product_viewers: number;
    checkout_viewers: number;
    abandoned: number;
    paid_orders: number;
  } | null;
  page_views_series: Array<{ bucket: string; views: number; unique_visitors: number }>;
  top_pages: Array<{ path: string; page_type: string; views: number; unique_visitors: number }>;
  top_collections: Array<{ collection: string; views: number; unique_visitors: number }>;
  live_visitors: {
    active_sessions: number;
    views_last_5min: number;
    top_pages: Array<{ path: string; n: number }>;
  } | null;
  new_customers: Array<{ bucket: string; nouveaux_clients: number }>;
  recent_orders: Array<{
    created_at: string;
    order_number: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    payment_status: string;
    status: string;
  }>;
}

function getAuthToken(): string | null {
  try {
    const raw = localStorage.getItem('sb-nswlznqoadjffpxkagoz-auth-token');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.access_token ?? null;
  } catch {
    return null;
  }
}

function formatEuros(value: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value || 0);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value || 0);
}

function formatBucket(iso: string, granularity: string): string {
  const d = new Date(iso);
  if (granularity === 'hour') return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (granularity === 'month') return d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
}

function pctDelta(curr: number, prev: number): number | null {
  if (!prev || prev === 0) return curr > 0 ? 100 : null;
  return Math.round(((curr - prev) / prev) * 100);
}

function KpiCard({
  title,
  value,
  previous,
  icon: Icon,
  format = 'number',
}: {
  title: string;
  value: number;
  previous: number;
  icon: LucideIcon;
  format?: 'number' | 'euros';
}) {
  const delta = pctDelta(value, previous);
  const positive = delta !== null && delta >= 0;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">{title}</span>
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="text-3xl font-bold text-white">
        {format === 'euros' ? formatEuros(value) : formatNumber(value)}
      </div>
      {delta !== null && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{positive ? '+' : ''}{delta}% vs période préc.</span>
        </div>
      )}
    </div>
  );
}

function FunnelBar({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{formatNumber(value)} ({pct}%)</span>
      </div>
      <div className="h-3 bg-gray-700 rounded overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AdminStatsPage() {
  const [period, setPeriod] = useState<Period>('month');
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (p: Period) => {
    setError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/admin/stats?period=${p}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const json: StatsResponse = await res.json();
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur chargement stats');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial + changement de periode
  useEffect(() => {
    setLoading(true);
    load(period);
  }, [period, load]);

  // Refresh live visitors toutes les 30s (silent reload complet, volume faible)
  useEffect(() => {
    const i = setInterval(() => {
      load(period);
    }, 30000);
    return () => clearInterval(i);
  }, [period, load]);

  const granularity = data?.range.granularity ?? 'day';

  const revenueData = useMemo(
    () => (data?.revenue_series ?? []).map((r) => ({
      name: formatBucket(r.bucket, granularity),
      revenue: Number(r.revenue) || 0,
      nb_orders: Number(r.nb_orders) || 0,
    })),
    [data, granularity]
  );

  const pageViewsData = useMemo(
    () => (data?.page_views_series ?? []).map((r) => ({
      name: formatBucket(r.bucket, granularity),
      views: Number(r.views) || 0,
      unique_visitors: Number(r.unique_visitors) || 0,
    })),
    [data, granularity]
  );

  const newCustomersData = useMemo(
    () => (data?.new_customers ?? []).map((r) => ({
      name: formatBucket(r.bucket, granularity),
      nouveaux: Number(r.nouveaux_clients) || 0,
    })),
    [data, granularity]
  );

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const curr = data?.kpis?.current ?? { revenue: 0, orders: 0, avg_order: 0, unique_customers: 0 };
  const prev = data?.kpis?.previous ?? { revenue: 0, orders: 0, avg_order: 0, unique_customers: 0 };
  const funnel = data?.funnel ?? { visitors: 0, product_viewers: 0, checkout_viewers: 0, abandoned: 0, paid_orders: 0 };
  const abandoned = data?.abandoned ?? { total: 0, converted: 0, reminders_sent: 0, conversion_rate: 0, avg_value: 0 };
  const live = data?.live_visitors ?? { active_sessions: 0, views_last_5min: 0, top_pages: [] };
  const funnelMax = Math.max(funnel.visitors, 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Statistiques</h1>
          <p className="text-sm text-gray-400 mt-1">Vue d&apos;ensemble business & visiteurs</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Live visitors badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <Activity className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-white font-medium">
              {live.active_sessions} en direct
            </span>
          </div>
          {/* Period selector */}
          <div className="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            {(['day', 'week', 'month', 'year'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  period === p ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {p === 'day' ? 'Jour' : p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
              </button>
            ))}
          </div>
          <button
            onClick={() => load(period)}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700"
            title="Rafraîchir"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Chiffre d'affaires" value={curr.revenue} previous={prev.revenue} icon={Euro} format="euros" />
        <KpiCard title="Commandes payées" value={curr.orders} previous={prev.orders} icon={ShoppingCart} />
        <KpiCard title="Panier moyen" value={curr.avg_order} previous={prev.avg_order} icon={ShoppingBag} format="euros" />
        <KpiCard title="Clients uniques" value={curr.unique_customers} previous={prev.unique_customers} icon={Users} />
      </div>

      {/* Funnel */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Funnel de conversion</h2>
        <div className="space-y-4">
          <FunnelBar label="Visiteurs uniques" value={funnel.visitors} total={funnelMax} />
          <FunnelBar label="Vue produit" value={funnel.product_viewers} total={funnelMax} />
          <FunnelBar label="Panier / Checkout" value={funnel.checkout_viewers} total={funnelMax} />
          <FunnelBar label="Paniers abandonnés" value={funnel.abandoned} total={funnelMax} />
          <FunnelBar label="Commandes payées" value={funnel.paid_orders} total={funnelMax} />
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Chiffre d&apos;affaires</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#F3F4F6' }}
                formatter={(value: number | string) => formatEuros(Number(value))}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Visiteurs & vues</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Legend wrapperStyle={{ color: '#9CA3AF' }} />
              <Line type="monotone" dataKey="views" stroke="#3B82F6" name="Vues" strokeWidth={2} />
              <Line type="monotone" dataKey="unique_visitors" stroke="#10B981" name="Visiteurs uniques" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top products + abandoned */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4">Top 10 produits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-700">
                  <th className="py-2 font-medium">Produit</th>
                  <th className="py-2 font-medium text-right">Qté</th>
                  <th className="py-2 font-medium text-right">CA</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {(data?.top_products ?? []).length === 0 ? (
                  <tr><td colSpan={3} className="py-6 text-center text-gray-500">Aucune donnée</td></tr>
                ) : (data?.top_products ?? []).map((p, i) => (
                  <tr key={i} className="border-b border-gray-700/50">
                    <td className="py-2">{p.product_name}</td>
                    <td className="py-2 text-right">{formatNumber(Number(p.total_qty))}</td>
                    <td className="py-2 text-right">{formatEuros(Number(p.total_revenue))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Paniers abandonnés</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-400">Total</dt><dd className="text-white font-medium">{formatNumber(abandoned.total)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Convertis</dt><dd className="text-green-400 font-medium">{formatNumber(abandoned.converted)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Relances envoyées</dt><dd className="text-white font-medium">{formatNumber(abandoned.reminders_sent)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Taux conversion</dt><dd className="text-white font-medium">{abandoned.conversion_rate}%</dd></div>
            <div className="flex justify-between"><dt className="text-gray-400">Valeur moyenne</dt><dd className="text-white font-medium">{formatEuros(Number(abandoned.avg_value))}</dd></div>
          </dl>
        </div>
      </div>

      {/* Top pages + top collections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Top pages</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-700">
                  <th className="py-2 font-medium">Page</th>
                  <th className="py-2 font-medium text-right">Vues</th>
                  <th className="py-2 font-medium text-right">Visiteurs</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {(data?.top_pages ?? []).length === 0 ? (
                  <tr><td colSpan={3} className="py-6 text-center text-gray-500">Aucune vue enregistrée</td></tr>
                ) : (data?.top_pages ?? []).map((p, i) => (
                  <tr key={i} className="border-b border-gray-700/50">
                    <td className="py-2 truncate max-w-xs" title={p.path}>
                      <span className="text-xs text-gray-500 mr-2">{p.page_type || '—'}</span>
                      {p.path}
                    </td>
                    <td className="py-2 text-right">{formatNumber(Number(p.views))}</td>
                    <td className="py-2 text-right">{formatNumber(Number(p.unique_visitors))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4">Top collections</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-700">
                  <th className="py-2 font-medium">Collection</th>
                  <th className="py-2 font-medium text-right">Vues</th>
                  <th className="py-2 font-medium text-right">Visiteurs</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {(data?.top_collections ?? []).length === 0 ? (
                  <tr><td colSpan={3} className="py-6 text-center text-gray-500">Aucune vue de collection</td></tr>
                ) : (data?.top_collections ?? []).map((p, i) => (
                  <tr key={i} className="border-b border-gray-700/50">
                    <td className="py-2 truncate max-w-xs" title={p.collection}>{p.collection}</td>
                    <td className="py-2 text-right">{formatNumber(Number(p.views))}</td>
                    <td className="py-2 text-right">{formatNumber(Number(p.unique_visitors))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Nouveaux clients + live pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-4">Nouveaux clients</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={newCustomersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line type="monotone" dataKey="nouveaux" stroke="#A78BFA" strokeWidth={2} name="Nouveaux" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" /> Live (5 min)
          </h2>
          <div className="text-3xl font-bold text-white mb-4">
            {formatNumber(live.active_sessions)}
            <span className="text-sm text-gray-400 font-normal ml-2">sessions actives</span>
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Pages les plus consultées</div>
          <ul className="space-y-2 text-sm">
            {(live.top_pages ?? []).length === 0 ? (
              <li className="text-gray-500">Aucune activité</li>
            ) : (live.top_pages ?? []).map((p, i) => (
              <li key={i} className="flex justify-between text-gray-300">
                <span className="truncate max-w-[180px]" title={p.path}>{p.path}</span>
                <span className="text-gray-400">{p.n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Dernières commandes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-700">
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">N°</th>
                <th className="py-2 font-medium">Client</th>
                <th className="py-2 font-medium text-right">Montant</th>
                <th className="py-2 font-medium">Paiement</th>
                <th className="py-2 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {(data?.recent_orders ?? []).length === 0 ? (
                <tr><td colSpan={6} className="py-6 text-center text-gray-500">Aucune commande</td></tr>
              ) : (data?.recent_orders ?? []).map((o, i) => (
                <tr key={i} className="border-b border-gray-700/50">
                  <td className="py-2 text-gray-400">{new Date(o.created_at).toLocaleDateString('fr-FR')}</td>
                  <td className="py-2 font-mono text-xs">{o.order_number}</td>
                  <td className="py-2">
                    <div>{o.customer_name}</div>
                    <div className="text-xs text-gray-500">{o.customer_email}</div>
                  </td>
                  <td className="py-2 text-right font-medium">{formatEuros(Number(o.total_amount))}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      o.payment_status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'
                    }`}>{o.payment_status}</span>
                  </td>
                  <td className="py-2 text-gray-300">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
