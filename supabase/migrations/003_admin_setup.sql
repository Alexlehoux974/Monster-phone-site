-- ========================================
-- Admin Panel Setup - Security & Auth
-- ========================================

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only super_admins can manage admin_users
CREATE POLICY "Super admins manage admin_users"
ON admin_users FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND role = 'super_admin'
        AND is_active = true
    )
);

-- Policy: Admins can view admin_users
CREATE POLICY "Admins can view admin_users"
ON admin_users FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- ========================================
-- Admin Stock Management Table
-- ========================================

CREATE TABLE IF NOT EXISTS product_stock_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    previous_stock INTEGER,
    new_stock INTEGER,
    change_amount INTEGER,
    change_reason TEXT,
    admin_email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on stock history
ALTER TABLE product_stock_history ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view stock history
CREATE POLICY "Admins view stock history"
ON product_stock_history FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- Policy: Admins can insert stock history
CREATE POLICY "Admins insert stock history"
ON product_stock_history FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- ========================================
-- Banners Table for Dynamic Promo Bar
-- ========================================

CREATE TABLE IF NOT EXISTS promo_banners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    icon VARCHAR(50),
    bg_color VARCHAR(50) DEFAULT 'bg-red-600',
    text_color VARCHAR(50) DEFAULT 'text-white',
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on banners
ALTER TABLE promo_banners ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view active banners
CREATE POLICY "Public can view active banners"
ON promo_banners FOR SELECT
USING (is_active = true AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW()));

-- Policy: Admins can manage all banners
CREATE POLICY "Admins manage banners"
ON promo_banners FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- ========================================
-- Collection-Product Junction Table
-- ========================================

CREATE TABLE IF NOT EXISTS collection_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(collection_id, product_id)
);

-- Enable RLS on collection_products
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;

-- Policy: Public can view collection products
CREATE POLICY "Public can view collection products"
ON collection_products FOR SELECT
USING (true);

-- Policy: Admins can manage collection products
CREATE POLICY "Admins manage collection products"
ON collection_products FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- ========================================
-- Update RLS on existing tables for admin
-- ========================================

-- Products: Add admin management policy
CREATE POLICY "Admins manage products"
ON products FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- Collections: Add admin management policy
CREATE POLICY "Admins manage collections"
ON collections FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- ========================================
-- Helper Functions
-- ========================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = user_email
        AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update stock with history
CREATE OR REPLACE FUNCTION update_product_stock(
    p_product_id UUID,
    p_new_stock INTEGER,
    p_reason TEXT DEFAULT 'Manual update'
)
RETURNS void AS $$
DECLARE
    v_current_stock INTEGER;
    v_admin_email TEXT;
BEGIN
    -- Get current stock
    SELECT stock_quantity INTO v_current_stock
    FROM products
    WHERE id = p_product_id;

    -- Get admin email from JWT
    v_admin_email := auth.jwt() ->> 'email';

    -- Check if user is admin
    IF NOT is_admin(v_admin_email) THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can update stock';
    END IF;

    -- Insert history record
    INSERT INTO product_stock_history (
        product_id,
        previous_stock,
        new_stock,
        change_amount,
        change_reason,
        admin_email
    ) VALUES (
        p_product_id,
        v_current_stock,
        p_new_stock,
        p_new_stock - COALESCE(v_current_stock, 0),
        p_reason,
        v_admin_email
    );

    -- Update product stock
    UPDATE products
    SET stock_quantity = p_new_stock,
        updated_at = NOW()
    WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- Indexes for Performance
-- ========================================

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_stock_history_product ON product_stock_history(product_id);
CREATE INDEX IF NOT EXISTS idx_banners_active ON promo_banners(is_active, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_collection_products_collection ON collection_products(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_products_product ON collection_products(product_id);

-- ========================================
-- Initial Data
-- ========================================

-- Insert first super admin (à remplacer par votre email)
INSERT INTO admin_users (email, role, is_active)
VALUES ('admin@monsterphone.re', 'super_admin', true)
ON CONFLICT (email) DO NOTHING;

-- Insert default promo banner
INSERT INTO promo_banners (title, message, icon, is_active, display_order)
VALUES (
    'Livraison Express',
    'LIVRAISON EXPRESS 24H/48H À LA RÉUNION • LIVRAISON GRATUITE DÈS 50€',
    'Truck',
    true,
    1
) ON CONFLICT DO NOTHING;

-- ========================================
-- Triggers for updated_at
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promo_banners_updated_at
    BEFORE UPDATE ON promo_banners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
