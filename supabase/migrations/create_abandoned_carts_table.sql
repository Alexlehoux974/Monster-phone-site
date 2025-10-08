-- Table pour les paniers abandonnés
CREATE TABLE IF NOT EXISTS abandoned_carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  checkout_url TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  reminder_sent BOOLEAN DEFAULT FALSE,
  reminder_sent_at TIMESTAMP WITH TIME ZONE,
  converted BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_email ON abandoned_carts(customer_email);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_session ON abandoned_carts(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_reminder ON abandoned_carts(reminder_sent, expires_at);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_abandoned_carts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER abandoned_carts_updated_at
  BEFORE UPDATE ON abandoned_carts
  FOR EACH ROW
  EXECUTE FUNCTION update_abandoned_carts_updated_at();

-- Commentaires
COMMENT ON TABLE abandoned_carts IS 'Stocke les paniers abandonnés pour relance email';
COMMENT ON COLUMN abandoned_carts.stripe_session_id IS 'ID session Stripe checkout';
COMMENT ON COLUMN abandoned_carts.items IS 'Produits du panier au format JSON';
COMMENT ON COLUMN abandoned_carts.expires_at IS 'Date expiration du panier (24h après création)';
COMMENT ON COLUMN abandoned_carts.reminder_sent IS 'Email de relance envoyé';
COMMENT ON COLUMN abandoned_carts.converted IS 'Panier finalisé en commande';
