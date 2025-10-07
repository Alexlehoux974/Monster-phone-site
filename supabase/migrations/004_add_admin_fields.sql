-- ========================================
-- Add Admin Management Fields
-- ========================================

-- Add is_visible column for catalog visibility control
ALTER TABLE products
ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- Add stock_quantity column if it doesn't exist (for products without variants)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0);

-- Add admin_discount_percent for admin-controlled promotions
ALTER TABLE products
ADD COLUMN IF NOT EXISTS admin_discount_percent INTEGER DEFAULT 0 CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100);

-- Create index for is_visible
CREATE INDEX IF NOT EXISTS idx_products_is_visible ON products(is_visible) WHERE is_visible = true;

-- Update RLS policy to include is_visible check
DROP POLICY IF EXISTS "Public read access for active products" ON products;

CREATE POLICY "Public read access for active and visible products" ON products
    FOR SELECT USING (status = 'active' AND is_visible = true);

-- Comment on new columns
COMMENT ON COLUMN products.is_visible IS 'Controls whether product is visible in catalog (admin can hide without deleting)';
COMMENT ON COLUMN products.admin_discount_percent IS 'Admin-controlled discount percentage (0-100), automatically applied to price';
COMMENT ON COLUMN products.stock_quantity IS 'Stock quantity for products without variants';

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Admin management fields added successfully!';
END
$$;
