-- ========================================
-- Migration 012: User Addresses & Wishlist
-- Adds: Multiple addresses, Wishlist persistence
-- ========================================

-- ========================================
-- 1. USER ADDRESSES (Carnet d'adresses)
-- ========================================

CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL DEFAULT 'Domicile', -- Ex: "Domicile", "Bureau", "Parents"
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    street VARCHAR(500) NOT NULL,
    street_complement VARCHAR(255),
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'France',
    is_default BOOLEAN DEFAULT false,
    is_billing BOOLEAN DEFAULT false, -- Adresse de facturation
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_is_default ON user_addresses(user_id, is_default) WHERE is_default = true;

-- Trigger to ensure only one default address per user
CREATE OR REPLACE FUNCTION ensure_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = true THEN
        UPDATE user_addresses
        SET is_default = false
        WHERE user_id = NEW.user_id AND id != NEW.id AND is_default = true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_default_address_trigger
    BEFORE INSERT OR UPDATE ON user_addresses
    FOR EACH ROW
    EXECUTE FUNCTION ensure_single_default_address();

-- Trigger for updated_at
CREATE TRIGGER update_user_addresses_updated_at
    BEFORE UPDATE ON user_addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only see/edit their own addresses
CREATE POLICY "Users can view their own addresses" ON user_addresses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses" ON user_addresses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses" ON user_addresses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses" ON user_addresses
    FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- 2. WISHLIST (Liste de souhaits)
-- ========================================

CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    -- Prevent duplicates
    UNIQUE(user_id, product_id, variant_id)
);

-- Index for fast lookups
CREATE INDEX idx_wishlist_user_id ON wishlist_items(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist_items(product_id);

-- Enable RLS
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only see/edit their own wishlist
CREATE POLICY "Users can view their own wishlist" ON wishlist_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own wishlist" ON wishlist_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own wishlist" ON wishlist_items
    FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- 3. GRANTS
-- ========================================

GRANT SELECT, INSERT, UPDATE, DELETE ON user_addresses TO authenticated;
GRANT SELECT, INSERT, DELETE ON wishlist_items TO authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Migration 012: User addresses and wishlist tables created successfully!';
END
$$;
