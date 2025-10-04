# 🛠️ Installation des tables de commandes dans Supabase

## Étape 1 : Accéder au SQL Editor de Supabase

1. Connectez-vous à votre dashboard Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **New query**

## Étape 2 : Copier-coller le SQL ci-dessous

```sql
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
```

## Étape 3 : Exécuter le SQL

1. Cliquez sur **Run** (ou appuyez sur `Ctrl+Enter`)
2. Vérifiez qu'il n'y a pas d'erreurs dans le panneau de résultats
3. Les tables `orders` et `order_items` sont maintenant créées ✅

## Étape 4 : Vérification

Pour vérifier que les tables ont bien été créées :

```sql
-- Voir toutes les tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Voir la structure de la table orders
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders';
```

## Structure des tables

### Table `orders`
- `id` : UUID (clé primaire)
- `customer_name` : Nom du client
- `customer_email` : Email du client
- `customer_phone` : Téléphone (optionnel)
- `customer_address` : Adresse de livraison (optionnel)
- `total_amount` : Montant total (en euros)
- `status` : Statut de la commande (pending, processing, shipped, delivered, cancelled)
- `created_at` : Date de création
- `updated_at` : Date de dernière modification

### Table `order_items`
- `id` : UUID (clé primaire)
- `order_id` : Référence vers la commande
- `product_id` : Référence vers le produit
- `variant_id` : Référence vers le variant (optionnel)
- `quantity` : Quantité commandée
- `unit_price` : Prix unitaire
- `product_name` : Nom du produit (pour historique)
- `variant_color` : Couleur du variant (optionnel)
- `created_at` : Date de création

## ✅ C'est terminé !

Votre système de gestion des commandes est maintenant opérationnel. Le flux complet fonctionne :

1. **Client** : Ajoute des produits au panier → Passe commande
2. **API** : Crée la commande → Enregistre les articles → Déduit le stock
3. **Admin** : Visualise les commandes → Change le statut → Suit le chiffre d'affaires

## 🔍 Requêtes utiles

```sql
-- Voir toutes les commandes avec le nombre d'articles
SELECT
  o.id,
  o.customer_name,
  o.customer_email,
  o.total_amount,
  o.status,
  COUNT(oi.id) as items_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id
ORDER BY o.created_at DESC;

-- Voir les articles d'une commande spécifique
SELECT
  oi.product_name,
  oi.variant_color,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) as total
FROM order_items oi
WHERE oi.order_id = 'VOTRE_ORDER_ID';

-- Chiffre d'affaires total
SELECT
  SUM(total_amount) as revenue,
  COUNT(*) as total_orders,
  COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_orders
FROM orders
WHERE status != 'cancelled';
```
