import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/admin-guard';
import { createAdminClient } from '@/lib/supabase/admin-client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Period = 'day' | 'week' | 'month' | 'year';

function computeRanges(period: Period) {
  const now = new Date();
  const end = now;
  let start: Date;
  let prevStart: Date;
  let prevEnd: Date;
  let granularity: 'hour' | 'day' | 'week' | 'month';

  switch (period) {
    case 'day':
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      prevEnd = new Date(start);
      prevStart = new Date(start);
      prevStart.setDate(prevStart.getDate() - 1);
      granularity = 'hour';
      break;
    case 'week': {
      start = new Date(now);
      const day = start.getDay();
      const diffToMonday = (day + 6) % 7;
      start.setDate(start.getDate() - diffToMonday);
      start.setHours(0, 0, 0, 0);
      prevEnd = new Date(start);
      prevStart = new Date(start);
      prevStart.setDate(prevStart.getDate() - 7);
      granularity = 'day';
      break;
    }
    case 'year':
      start = new Date(now.getFullYear(), 0, 1);
      prevEnd = new Date(start);
      prevStart = new Date(now.getFullYear() - 1, 0, 1);
      granularity = 'month';
      break;
    case 'month':
    default:
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      prevEnd = new Date(start);
      prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      granularity = 'day';
      break;
  }

  return { start, end, prevStart, prevEnd, granularity };
}

export async function GET(request: NextRequest) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authorized) {
    return unauthorizedResponse(auth);
  }

  const { searchParams } = new URL(request.url);
  const periodParam = (searchParams.get('period') ?? 'month') as Period;
  const period: Period = ['day', 'week', 'month', 'year'].includes(periodParam) ? periodParam : 'month';

  const { start, end, prevStart, prevEnd, granularity } = computeRanges(period);
  const startIso = start.toISOString();
  const endIso = end.toISOString();
  const prevStartIso = prevStart.toISOString();
  const prevEndIso = prevEnd.toISOString();

  const supabase = createAdminClient();

  const [
    kpis,
    revenueSeries,
    topProducts,
    abandoned,
    funnel,
    pageViewsSeries,
    topPages,
    topCollections,
    liveVisitors,
    newCustomers,
    recentOrders,
  ] = await Promise.all([
    supabase.rpc('get_dashboard_kpis', {
      period_start: startIso,
      period_end: endIso,
      prev_start: prevStartIso,
      prev_end: prevEndIso,
    }),
    supabase.rpc('get_revenue_by_period', {
      period_start: startIso,
      period_end: endIso,
      granularity,
    }),
    supabase.rpc('get_top_products', {
      period_start: startIso,
      period_end: endIso,
      lim: 10,
    }),
    supabase.rpc('get_abandoned_cart_stats', {
      period_start: startIso,
      period_end: endIso,
    }),
    supabase.rpc('get_funnel_stats', {
      period_start: startIso,
      period_end: endIso,
    }),
    supabase.rpc('get_page_views_stats', {
      period_start: startIso,
      period_end: endIso,
      granularity,
    }),
    supabase.rpc('get_top_pages', {
      period_start: startIso,
      period_end: endIso,
      lim: 10,
    }),
    supabase.rpc('get_top_collections', {
      period_start: startIso,
      period_end: endIso,
      lim: 10,
    }),
    supabase.rpc('get_live_visitors'),
    supabase.rpc('get_new_customers_by_period', {
      period_start: startIso,
      period_end: endIso,
      granularity,
    }),
    supabase.rpc('get_recent_orders', { lim: 10 }),
  ]);

  const firstError =
    kpis.error ?? revenueSeries.error ?? topProducts.error ?? abandoned.error ??
    funnel.error ?? pageViewsSeries.error ?? topPages.error ?? topCollections.error ??
    liveVisitors.error ?? newCustomers.error ?? recentOrders.error;

  if (firstError) {
    console.error('[admin/stats] RPC error:', firstError);
    return NextResponse.json(
      { error: 'Stats fetch failed', detail: firstError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    period,
    range: { start: startIso, end: endIso, prev_start: prevStartIso, prev_end: prevEndIso, granularity },
    kpis: kpis.data,
    revenue_series: revenueSeries.data ?? [],
    top_products: topProducts.data ?? [],
    abandoned: abandoned.data,
    funnel: funnel.data,
    page_views_series: pageViewsSeries.data ?? [],
    top_pages: topPages.data ?? [],
    top_collections: topCollections.data ?? [],
    live_visitors: liveVisitors.data,
    new_customers: newCustomers.data ?? [],
    recent_orders: recentOrders.data ?? [],
  });
}
