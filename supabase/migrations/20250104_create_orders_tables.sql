-- Migration pour créer les tables de gestion des commandes

-- Table des commandes
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table des articles de commande
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  variant_id UUID REFERENCES public.product_variants(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  product_name TEXT NOT NULL,
  variant_color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policies: permettre la lecture à tous (pour l'admin panel)
CREATE POLICY "Allow read access to all users" ON public.orders
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to all users" ON public.order_items
  FOR SELECT USING (true);

-- Policies: permettre l'insertion à tous (pour l'API de création de commande)
CREATE POLICY "Allow insert access to all users" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert access to all users" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Policies: permettre la mise à jour à tous (pour l'admin panel)
CREATE POLICY "Allow update access to all users" ON public.orders
  FOR UPDATE USING (true);

-- Commentaires pour la documentation
COMMENT ON TABLE public.orders IS 'Table des commandes clients';
COMMENT ON TABLE public.order_items IS 'Table des articles de commande';
COMMENT ON COLUMN public.orders.status IS 'Statut de la commande: pending, processing, shipped, delivered, cancelled';
