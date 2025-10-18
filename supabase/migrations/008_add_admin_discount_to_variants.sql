-- ========================================
-- Add admin_discount_percent to product_variants
-- Permet de gérer les promotions au niveau du variant
-- ========================================

-- Add admin_discount_percent column to product_variants
ALTER TABLE product_variants
ADD COLUMN IF NOT EXISTS admin_discount_percent INTEGER DEFAULT 0
CHECK (admin_discount_percent >= 0 AND admin_discount_percent <= 100);

-- Add comment for documentation
COMMENT ON COLUMN product_variants.admin_discount_percent IS 'Admin-controlled discount percentage for this variant (0-100), overrides product-level discount';

-- Add visible column to product_variants (for variant-level visibility control)
ALTER TABLE product_variants
ADD COLUMN IF NOT EXISTS visible BOOLEAN DEFAULT true;

-- Add comment for documentation
COMMENT ON COLUMN product_variants.visible IS 'Visibility flag for this variant in the store';

-- Update existing variants to have visible=true
UPDATE product_variants SET visible = true WHERE visible IS NULL;
