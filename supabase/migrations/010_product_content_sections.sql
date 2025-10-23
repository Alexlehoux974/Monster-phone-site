-- ========================================
-- Product Content Sections - CMS-style management
-- ========================================

-- Create product_content_sections table
CREATE TABLE IF NOT EXISTS product_content_sections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    section_type VARCHAR(50) NOT NULL CHECK (section_type IN ('description', 'features', 'specifications', 'engagement', 'custom')),
    title VARCHAR(255),
    content TEXT, -- HTML supported
    images JSONB DEFAULT '[]'::jsonb, -- Array of Google Drive URLs
    is_enabled BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    layout_variant VARCHAR(50) DEFAULT 'text-left-image-right' CHECK (layout_variant IN ('text-left-image-right', 'text-right-image-left', 'full-width')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on product_content_sections
ALTER TABLE product_content_sections ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS Policies
-- ========================================

-- Policy: Public can view enabled sections
CREATE POLICY "Public can view enabled content sections"
ON product_content_sections FOR SELECT
USING (is_enabled = true);

-- Policy: Admins can view all sections (enabled or disabled)
CREATE POLICY "Admins view all content sections"
ON product_content_sections FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- Policy: Admins can insert sections
CREATE POLICY "Admins insert content sections"
ON product_content_sections FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- Policy: Admins can update sections
CREATE POLICY "Admins update content sections"
ON product_content_sections FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    )
);

-- Policy: Admins can delete sections
CREATE POLICY "Admins delete content sections"
ON product_content_sections FOR DELETE
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

-- Function to get sections for a product (ordered)
CREATE OR REPLACE FUNCTION get_product_sections(p_product_id UUID, include_disabled BOOLEAN DEFAULT false)
RETURNS TABLE(
    id UUID,
    section_type VARCHAR(50),
    title VARCHAR(255),
    content TEXT,
    images JSONB,
    is_enabled BOOLEAN,
    display_order INTEGER,
    layout_variant VARCHAR(50),
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    IF include_disabled THEN
        RETURN QUERY
        SELECT
            s.id,
            s.section_type,
            s.title,
            s.content,
            s.images,
            s.is_enabled,
            s.display_order,
            s.layout_variant,
            s.created_at,
            s.updated_at
        FROM product_content_sections s
        WHERE s.product_id = p_product_id
        ORDER BY s.display_order ASC, s.created_at ASC;
    ELSE
        RETURN QUERY
        SELECT
            s.id,
            s.section_type,
            s.title,
            s.content,
            s.images,
            s.is_enabled,
            s.display_order,
            s.layout_variant,
            s.created_at,
            s.updated_at
        FROM product_content_sections s
        WHERE s.product_id = p_product_id AND s.is_enabled = true
        ORDER BY s.display_order ASC, s.created_at ASC;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to duplicate sections from one product to another
CREATE OR REPLACE FUNCTION duplicate_product_sections(
    p_source_product_id UUID,
    p_target_product_id UUID
)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER := 0;
    v_section RECORD;
BEGIN
    -- Check if user is admin
    IF NOT EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can duplicate sections';
    END IF;

    -- Copy all sections from source to target
    FOR v_section IN
        SELECT
            section_type,
            title,
            content,
            images,
            is_enabled,
            display_order,
            layout_variant
        FROM product_content_sections
        WHERE product_id = p_source_product_id
        ORDER BY display_order ASC
    LOOP
        INSERT INTO product_content_sections (
            product_id,
            section_type,
            title,
            content,
            images,
            is_enabled,
            display_order,
            layout_variant
        ) VALUES (
            p_target_product_id,
            v_section.section_type,
            v_section.title,
            v_section.content,
            v_section.images,
            v_section.is_enabled,
            v_section.display_order,
            v_section.layout_variant
        );

        v_count := v_count + 1;
    END LOOP;

    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reorder sections
CREATE OR REPLACE FUNCTION reorder_product_sections(
    p_product_id UUID,
    p_section_ids UUID[]
)
RETURNS BOOLEAN AS $$
DECLARE
    v_section_id UUID;
    v_order INTEGER := 0;
BEGIN
    -- Check if user is admin
    IF NOT EXISTS (
        SELECT 1 FROM admin_users
        WHERE email = auth.jwt() ->> 'email'
        AND is_active = true
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can reorder sections';
    END IF;

    -- Update display_order for each section
    FOREACH v_section_id IN ARRAY p_section_ids
    LOOP
        UPDATE product_content_sections
        SET display_order = v_order,
            updated_at = NOW()
        WHERE id = v_section_id AND product_id = p_product_id;

        v_order := v_order + 1;
    END LOOP;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- Indexes for Performance
-- ========================================

CREATE INDEX IF NOT EXISTS idx_content_sections_product ON product_content_sections(product_id);
CREATE INDEX IF NOT EXISTS idx_content_sections_enabled ON product_content_sections(product_id, is_enabled);
CREATE INDEX IF NOT EXISTS idx_content_sections_order ON product_content_sections(product_id, display_order);

-- ========================================
-- Triggers for updated_at
-- ========================================

CREATE TRIGGER update_content_sections_updated_at
    BEFORE UPDATE ON product_content_sections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- Grant Permissions
-- ========================================

GRANT EXECUTE ON FUNCTION get_product_sections TO authenticated, anon;
GRANT EXECUTE ON FUNCTION duplicate_product_sections TO authenticated;
GRANT EXECUTE ON FUNCTION reorder_product_sections TO authenticated;

-- ========================================
-- Success Message
-- ========================================

DO $$
BEGIN
    RAISE NOTICE 'Product content sections system created successfully!';
    RAISE NOTICE 'Created table: product_content_sections';
    RAISE NOTICE 'Created helper functions: get_product_sections, duplicate_product_sections, reorder_product_sections';
    RAISE NOTICE 'Configured RLS policies for public viewing and admin management';
END
$$;
