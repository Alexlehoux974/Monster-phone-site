-- Migration: Dashboard admin stats
-- Date: 2026-04-13
-- Non-destructive: CREATE IF NOT EXISTS + CREATE OR REPLACE.
-- Ajoute: table page_views (tracking anonyme) + RPC pour /admin/stats.

-- =========================================================================
-- TABLE page_views
-- =========================================================================
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  session_id TEXT NOT NULL,
  user_agent_hash TEXT,
  country TEXT,
  page_type TEXT,
  page_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_type ON page_views(page_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_ref ON page_views(page_type, page_ref) WHERE page_ref IS NOT NULL;

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
-- Pas de policy publique: inserts/selects uniquement via service_role (API routes).

-- =========================================================================
-- RPC: KPIs financiers avec p\u00e9riode pr\u00e9c\u00e9dente
-- =========================================================================
CREATE OR REPLACE FUNCTION get_dashboard_kpis(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  prev_start TIMESTAMPTZ,
  prev_end TIMESTAMPTZ
)
RETURNS JSON AS $$
  WITH current_period AS (
    SELECT
      COALESCE(SUM(total_amount), 0) AS revenue,
      COUNT(*) AS orders,
      COALESCE(ROUND(AVG(total_amount)::numeric, 2), 0) AS avg_order,
      COUNT(DISTINCT customer_email) AS unique_customers
    FROM orders
    WHERE payment_status = 'paid'
      AND created_at >= period_start AND created_at < period_end
  ),
  previous_period AS (
    SELECT
      COALESCE(SUM(total_amount), 0) AS revenue,
      COUNT(*) AS orders,
      COALESCE(ROUND(AVG(total_amount)::numeric, 2), 0) AS avg_order,
      COUNT(DISTINCT customer_email) AS unique_customers
    FROM orders
    WHERE payment_status = 'paid'
      AND created_at >= prev_start AND created_at < prev_end
  )
  SELECT json_build_object(
    'current', (SELECT row_to_json(c) FROM current_period c),
    'previous', (SELECT row_to_json(p) FROM previous_period p)
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Revenue par p\u00e9riode (granularit\u00e9 dynamique)
-- =========================================================================
CREATE OR REPLACE FUNCTION get_revenue_by_period(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  granularity TEXT
)
RETURNS TABLE(bucket TIMESTAMPTZ, nb_orders BIGINT, revenue NUMERIC) AS $$
  SELECT
    DATE_TRUNC(granularity, created_at) AS bucket,
    COUNT(*)::BIGINT AS nb_orders,
    COALESCE(SUM(total_amount), 0)::NUMERIC AS revenue
  FROM orders
  WHERE payment_status = 'paid'
    AND created_at >= period_start AND created_at < period_end
  GROUP BY 1
  ORDER BY 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Top produits sur p\u00e9riode
-- =========================================================================
CREATE OR REPLACE FUNCTION get_top_products(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  lim INT DEFAULT 10
)
RETURNS TABLE(product_name TEXT, total_qty BIGINT, total_revenue NUMERIC) AS $$
  SELECT
    oi.product_name::TEXT,
    SUM(oi.quantity)::BIGINT,
    SUM(oi.total_price)::NUMERIC
  FROM order_items oi
  JOIN orders o ON o.id = oi.order_id
  WHERE o.payment_status = 'paid'
    AND o.created_at >= period_start AND o.created_at < period_end
  GROUP BY oi.product_name
  ORDER BY 3 DESC
  LIMIT lim;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Stats paniers abandonn\u00e9s
-- =========================================================================
CREATE OR REPLACE FUNCTION get_abandoned_cart_stats(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ
)
RETURNS JSON AS $$
  SELECT json_build_object(
    'total', COUNT(*),
    'converted', COUNT(*) FILTER (WHERE converted),
    'reminders_sent', COUNT(*) FILTER (WHERE reminder_sent),
    'conversion_rate', COALESCE(ROUND(
      COUNT(*) FILTER (WHERE converted)::numeric / NULLIF(COUNT(*), 0) * 100, 1
    ), 0),
    'avg_value', COALESCE(ROUND(AVG(total)::numeric, 2), 0)
  )
  FROM abandoned_carts
  WHERE created_at >= period_start AND created_at < period_end;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Funnel de conversion sur p\u00e9riode
-- =========================================================================
CREATE OR REPLACE FUNCTION get_funnel_stats(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ
)
RETURNS JSON AS $$
  WITH visitors AS (
    SELECT COUNT(DISTINCT session_id) AS n
    FROM page_views
    WHERE created_at >= period_start AND created_at < period_end
  ),
  product_viewers AS (
    SELECT COUNT(DISTINCT session_id) AS n
    FROM page_views
    WHERE page_type = 'product'
      AND created_at >= period_start AND created_at < period_end
  ),
  checkout_viewers AS (
    SELECT COUNT(DISTINCT session_id) AS n
    FROM page_views
    WHERE page_type IN ('cart', 'checkout')
      AND created_at >= period_start AND created_at < period_end
  ),
  abandoned AS (
    SELECT COUNT(*) AS n
    FROM abandoned_carts
    WHERE created_at >= period_start AND created_at < period_end
  ),
  paid_orders AS (
    SELECT COUNT(*) AS n
    FROM orders
    WHERE payment_status = 'paid'
      AND created_at >= period_start AND created_at < period_end
  )
  SELECT json_build_object(
    'visitors', (SELECT n FROM visitors),
    'product_viewers', (SELECT n FROM product_viewers),
    'checkout_viewers', (SELECT n FROM checkout_viewers),
    'abandoned', (SELECT n FROM abandoned),
    'paid_orders', (SELECT n FROM paid_orders)
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Vues et visiteurs uniques par p\u00e9riode (s\u00e9rie temporelle)
-- =========================================================================
CREATE OR REPLACE FUNCTION get_page_views_stats(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  granularity TEXT
)
RETURNS TABLE(bucket TIMESTAMPTZ, views BIGINT, unique_visitors BIGINT) AS $$
  SELECT
    DATE_TRUNC(granularity, created_at) AS bucket,
    COUNT(*)::BIGINT AS views,
    COUNT(DISTINCT session_id)::BIGINT AS unique_visitors
  FROM page_views
  WHERE created_at >= period_start AND created_at < period_end
  GROUP BY 1
  ORDER BY 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Top pages (tous types)
-- =========================================================================
CREATE OR REPLACE FUNCTION get_top_pages(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  lim INT DEFAULT 10
)
RETURNS TABLE(path TEXT, page_type TEXT, views BIGINT, unique_visitors BIGINT) AS $$
  SELECT
    pv.path::TEXT,
    pv.page_type::TEXT,
    COUNT(*)::BIGINT AS views,
    COUNT(DISTINCT pv.session_id)::BIGINT AS unique_visitors
  FROM page_views pv
  WHERE pv.created_at >= period_start AND pv.created_at < period_end
  GROUP BY pv.path, pv.page_type
  ORDER BY views DESC
  LIMIT lim;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Top collections (page_type='collection')
-- =========================================================================
CREATE OR REPLACE FUNCTION get_top_collections(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  lim INT DEFAULT 10
)
RETURNS TABLE(collection TEXT, views BIGINT, unique_visitors BIGINT) AS $$
  SELECT
    COALESCE(pv.page_ref, pv.path)::TEXT AS collection,
    COUNT(*)::BIGINT AS views,
    COUNT(DISTINCT pv.session_id)::BIGINT AS unique_visitors
  FROM page_views pv
  WHERE pv.page_type = 'collection'
    AND pv.created_at >= period_start AND pv.created_at < period_end
  GROUP BY 1
  ORDER BY views DESC
  LIMIT lim;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Visiteurs live (5 derni\u00e8res minutes)
-- =========================================================================
CREATE OR REPLACE FUNCTION get_live_visitors()
RETURNS JSON AS $$
  WITH live AS (
    SELECT session_id, path, page_type, page_ref
    FROM page_views
    WHERE created_at >= NOW() - INTERVAL '5 minutes'
  ),
  top_live_pages AS (
    SELECT path, COUNT(DISTINCT session_id) AS n
    FROM live
    GROUP BY path
    ORDER BY n DESC
    LIMIT 5
  )
  SELECT json_build_object(
    'active_sessions', (SELECT COUNT(DISTINCT session_id) FROM live),
    'views_last_5min', (SELECT COUNT(*) FROM live),
    'top_pages', COALESCE((SELECT json_agg(row_to_json(t)) FROM top_live_pages t), '[]'::json)
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Nouveaux clients (inscriptions profiles) par p\u00e9riode
-- =========================================================================
CREATE OR REPLACE FUNCTION get_new_customers_by_period(
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  granularity TEXT
)
RETURNS TABLE(bucket TIMESTAMPTZ, nouveaux_clients BIGINT) AS $$
  SELECT
    DATE_TRUNC(granularity, created_at) AS bucket,
    COUNT(*)::BIGINT
  FROM profiles
  WHERE created_at >= period_start AND created_at < period_end
  GROUP BY 1
  ORDER BY 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- =========================================================================
-- RPC: Derni\u00e8res commandes
-- =========================================================================
CREATE OR REPLACE FUNCTION get_recent_orders(lim INT DEFAULT 10)
RETURNS TABLE(
  created_at TIMESTAMPTZ,
  order_number TEXT,
  customer_name TEXT,
  customer_email TEXT,
  total_amount NUMERIC,
  payment_status TEXT,
  status TEXT
) AS $$
  SELECT
    o.created_at,
    o.order_number::TEXT,
    o.customer_name::TEXT,
    o.customer_email::TEXT,
    o.total_amount::NUMERIC,
    o.payment_status::TEXT,
    o.status::TEXT
  FROM orders o
  ORDER BY o.created_at DESC
  LIMIT lim;
$$ LANGUAGE sql SECURITY DEFINER;
