-- ========================================
-- Monster Phone Boutique - Supabase Schema
-- Optimized for SEO and Performance
-- ========================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy search

-- ========================================
-- CORE TABLES
-- ========================================

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    meta_title VARCHAR(160),
    meta_description VARCHAR(320),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table with hierarchy support
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    description TEXT,
    meta_title VARCHAR(160),
    meta_description VARCHAR(320),
    icon VARCHAR(50),
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections table for thematic grouping
CREATE TABLE IF NOT EXISTS collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    emoji VARCHAR(10),
    banner_url TEXT,
    meta_title VARCHAR(160),
    meta_description VARCHAR(320),
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sku VARCHAR(100) NOT NULL UNIQUE,
    airtable_id VARCHAR(100) UNIQUE,
    name VARCHAR(255) NOT NULL,
    brand_id UUID REFERENCES brands(id),
    category_id UUID REFERENCES categories(id),
    subcategory_id UUID REFERENCES categories(id),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    original_price DECIMAL(10,2) CHECK (original_price >= 0),
    discount INTEGER CHECK (discount >= 0 AND discount <= 100),
    promo VARCHAR(100),
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    url_slug VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'draft', 'out-of-stock')),
    warranty VARCHAR(255),
    delivery_time VARCHAR(100),
    repairability_index DECIMAL(3,1) CHECK (repairability_index >= 0 AND repairability_index <= 10),
    das_head VARCHAR(50),
    das_body VARCHAR(50),
    weight_grams INTEGER,
    dimensions_cm JSONB,
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- ========================================
-- RELATION TABLES
-- ========================================

-- Product variants (colors, sizes, etc.)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color VARCHAR(100) NOT NULL,
    color_code VARCHAR(7),
    ean VARCHAR(20) UNIQUE,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    price_adjustment DECIMAL(10,2) DEFAULT 0,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, color)
);

-- Product specifications
CREATE TABLE IF NOT EXISTS product_specifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product highlights
CREATE TABLE IF NOT EXISTS product_highlights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    highlight TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product badges
CREATE TABLE IF NOT EXISTS product_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    badge_text VARCHAR(50) NOT NULL,
    badge_color VARCHAR(20),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product collections mapping (many-to-many)
CREATE TABLE IF NOT EXISTS product_collections (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (product_id, collection_id)
);

-- Product keywords for SEO
CREATE TABLE IF NOT EXISTS product_keywords (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    keyword VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (product_id, keyword)
);

-- ========================================
-- REVIEWS & RATINGS
-- ========================================

-- Customer reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aggregated product ratings (materialized view for performance)
CREATE TABLE IF NOT EXISTS product_ratings (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    average_rating DECIMAL(2,1) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    five_star INTEGER DEFAULT 0,
    four_star INTEGER DEFAULT 0,
    three_star INTEGER DEFAULT 0,
    two_star INTEGER DEFAULT 0,
    one_star INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- SEO TABLES
-- ========================================

-- SEO metadata for all entities
CREATE TABLE IF NOT EXISTS seo_metadata (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('product', 'category', 'collection', 'brand', 'page')),
    entity_id UUID NOT NULL,
    meta_title VARCHAR(160) NOT NULL,
    meta_description VARCHAR(320) NOT NULL,
    og_title VARCHAR(160),
    og_description VARCHAR(320),
    og_image TEXT,
    twitter_title VARCHAR(160),
    twitter_description VARCHAR(320),
    twitter_image TEXT,
    canonical_url TEXT,
    robots VARCHAR(100) DEFAULT 'index, follow',
    structured_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(entity_type, entity_id)
);

-- URL redirects for SEO
CREATE TABLE IF NOT EXISTS url_redirects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    from_url VARCHAR(500) NOT NULL UNIQUE,
    to_url VARCHAR(500) NOT NULL,
    redirect_type INTEGER DEFAULT 301 CHECK (redirect_type IN (301, 302)),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sitemap entries
CREATE TABLE IF NOT EXISTS sitemap_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url VARCHAR(500) NOT NULL UNIQUE,
    changefreq VARCHAR(20) DEFAULT 'weekly' CHECK (changefreq IN ('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never')),
    priority DECIMAL(2,1) DEFAULT 0.5 CHECK (priority >= 0 AND priority <= 1),
    lastmod TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Products indexes
CREATE INDEX idx_products_url_slug ON products(url_slug);
CREATE INDEX idx_products_status ON products(status) WHERE status = 'active';
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_search ON products USING GIN(search_vector);

-- Categories indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_is_active ON categories(is_active) WHERE is_active = true;

-- Collections indexes
CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_collections_is_featured ON collections(is_featured) WHERE is_featured = true;

-- Product variants indexes
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_product_variants_stock ON product_variants(stock) WHERE stock > 0;

-- Product images indexes
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_is_primary ON product_images(is_primary) WHERE is_primary = true;

-- Reviews indexes
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- Product keywords index for reverse search
CREATE INDEX idx_product_keywords_keyword ON product_keywords(keyword);

-- SEO metadata indexes
CREATE INDEX idx_seo_metadata_entity ON seo_metadata(entity_type, entity_id);

-- URL redirects index
CREATE INDEX idx_url_redirects_from_url ON url_redirects(from_url) WHERE is_active = true;

-- ========================================
-- FULL-TEXT SEARCH CONFIGURATION
-- ========================================

-- Create French text search configuration
CREATE TEXT SEARCH CONFIGURATION french_unaccent (COPY = french);
ALTER TEXT SEARCH CONFIGURATION french_unaccent
    ALTER MAPPING FOR hword, hword_part, word
    WITH unaccent, french_stem;

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('french_unaccent', COALESCE(NEW.name, '')), 'A') ||
        setweight(to_tsvector('french_unaccent', COALESCE(NEW.short_description, '')), 'B') ||
        setweight(to_tsvector('french_unaccent', COALESCE(NEW.description, '')), 'C') ||
        setweight(to_tsvector('simple', COALESCE(NEW.sku, '')), 'A');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update search vector
CREATE TRIGGER products_search_vector_update
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_product_search_vector();

-- ========================================
-- UTILITY FUNCTIONS
-- ========================================

-- Function to generate URL slug
CREATE OR REPLACE FUNCTION generate_url_slug(input_text TEXT)
RETURNS TEXT AS $$
DECLARE
    slug TEXT;
BEGIN
    -- Convert to lowercase
    slug := LOWER(input_text);
    -- Remove accents
    slug := unaccent(slug);
    -- Replace non-alphanumeric characters with hyphens
    slug := REGEXP_REPLACE(slug, '[^a-z0-9]+', '-', 'g');
    -- Remove leading/trailing hyphens
    slug := TRIM(BOTH '-' FROM slug);
    RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update product ratings
CREATE OR REPLACE FUNCTION update_product_ratings()
RETURNS trigger AS $$
BEGIN
    -- Update or insert product rating statistics
    INSERT INTO product_ratings (
        product_id,
        average_rating,
        total_reviews,
        five_star,
        four_star,
        three_star,
        two_star,
        one_star,
        last_updated
    )
    SELECT
        NEW.product_id,
        AVG(rating)::DECIMAL(2,1),
        COUNT(*),
        COUNT(*) FILTER (WHERE rating = 5),
        COUNT(*) FILTER (WHERE rating = 4),
        COUNT(*) FILTER (WHERE rating = 3),
        COUNT(*) FILTER (WHERE rating = 2),
        COUNT(*) FILTER (WHERE rating = 1),
        NOW()
    FROM reviews
    WHERE product_id = NEW.product_id AND is_published = true
    ON CONFLICT (product_id) DO UPDATE
    SET
        average_rating = EXCLUDED.average_rating,
        total_reviews = EXCLUDED.total_reviews,
        five_star = EXCLUDED.five_star,
        four_star = EXCLUDED.four_star,
        three_star = EXCLUDED.three_star,
        two_star = EXCLUDED.two_star,
        one_star = EXCLUDED.one_star,
        last_updated = EXCLUDED.last_updated;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings after review insert/update/delete
CREATE TRIGGER update_product_ratings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_ratings();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update timestamp trigger to relevant tables
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_images_updated_at BEFORE UPDATE ON product_images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- VIEWS FOR API OPTIMIZATION
-- ========================================

-- View for product listing (lightweight)
CREATE OR REPLACE VIEW products_listing AS
SELECT 
    p.id,
    p.sku,
    p.name,
    p.url_slug,
    p.price,
    p.original_price,
    p.discount,
    p.promo,
    p.short_description,
    p.status,
    b.name as brand_name,
    b.slug as brand_slug,
    c.name as category_name,
    c.slug as category_slug,
    pr.average_rating,
    pr.total_reviews,
    (
        SELECT url 
        FROM product_images pi 
        WHERE pi.product_id = p.id AND pi.is_primary = true 
        LIMIT 1
    ) as primary_image_url,
    (
        SELECT json_agg(DISTINCT pb.badge_text)
        FROM product_badges pb
        WHERE pb.product_id = p.id
    ) as badges
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_ratings pr ON p.id = pr.product_id
WHERE p.status = 'active';

-- View for product detail (full data)
CREATE OR REPLACE VIEW products_full AS
SELECT 
    p.*,
    b.name as brand_name,
    b.slug as brand_slug,
    b.logo_url as brand_logo,
    c.name as category_name,
    c.slug as category_slug,
    sc.name as subcategory_name,
    sc.slug as subcategory_slug,
    pr.average_rating,
    pr.total_reviews,
    pr.five_star,
    pr.four_star,
    pr.three_star,
    pr.two_star,
    pr.one_star,
    (
        SELECT json_agg(json_build_object(
            'id', pv.id,
            'color', pv.color,
            'color_code', pv.color_code,
            'ean', pv.ean,
            'stock', pv.stock,
            'price_adjustment', pv.price_adjustment,
            'is_default', pv.is_default
        ) ORDER BY pv.is_default DESC, pv.color)
        FROM product_variants pv
        WHERE pv.product_id = p.id
    ) as variants,
    (
        SELECT json_agg(json_build_object(
            'label', ps.label,
            'value', ps.value,
            'icon', ps.icon
        ) ORDER BY ps.display_order)
        FROM product_specifications ps
        WHERE ps.product_id = p.id
    ) as specifications,
    (
        SELECT json_agg(ph.highlight ORDER BY ph.display_order)
        FROM product_highlights ph
        WHERE ph.product_id = p.id
    ) as highlights,
    (
        SELECT json_agg(json_build_object(
            'id', pi.id,
            'url', pi.url,
            'alt_text', pi.alt_text,
            'is_primary', pi.is_primary
        ) ORDER BY pi.is_primary DESC, pi.display_order)
        FROM product_images pi
        WHERE pi.product_id = p.id
    ) as images,
    (
        SELECT json_agg(DISTINCT pb.badge_text)
        FROM product_badges pb
        WHERE pb.product_id = p.id
    ) as badges,
    (
        SELECT json_agg(DISTINCT pk.keyword)
        FROM product_keywords pk
        WHERE pk.product_id = p.id
    ) as keywords,
    (
        SELECT json_build_object(
            'meta_title', sm.meta_title,
            'meta_description', sm.meta_description,
            'og_title', sm.og_title,
            'og_description', sm.og_description,
            'og_image', sm.og_image,
            'canonical_url', sm.canonical_url
        )
        FROM seo_metadata sm
        WHERE sm.entity_type = 'product' AND sm.entity_id = p.id
    ) as seo_metadata
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN categories sc ON p.subcategory_id = sc.id
LEFT JOIN product_ratings pr ON p.id = pr.product_id;

-- View for sitemap generation
CREATE OR REPLACE VIEW products_sitemap AS
SELECT 
    '/produit/' || p.url_slug as loc,
    p.updated_at as lastmod,
    CASE 
        WHEN p.updated_at > NOW() - INTERVAL '7 days' THEN 'daily'
        WHEN p.updated_at > NOW() - INTERVAL '30 days' THEN 'weekly'
        ELSE 'monthly'
    END as changefreq,
    CASE 
        WHEN pr.average_rating >= 4.5 THEN 0.9
        WHEN pr.average_rating >= 4.0 THEN 0.8
        WHEN pr.average_rating >= 3.5 THEN 0.7
        ELSE 0.6
    END as priority
FROM products p
LEFT JOIN product_ratings pr ON p.id = pr.product_id
WHERE p.status = 'active';

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE url_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitemap_entries ENABLE ROW LEVEL SECURITY;

-- Public read access for active products and related data
CREATE POLICY "Public read access for active brands" ON brands
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active collections" ON collections
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active products" ON products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Public read access for product variants" ON product_variants
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_variants.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for product specifications" ON product_specifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_specifications.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for product highlights" ON product_highlights
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_highlights.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for product images" ON product_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_images.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for product badges" ON product_badges
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_badges.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for product collections" ON product_collections
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_collections.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for product keywords" ON product_keywords
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_keywords.product_id 
            AND products.status = 'active'
        )
    );

CREATE POLICY "Public read access for published reviews" ON reviews
    FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for product ratings" ON product_ratings
    FOR SELECT USING (true);

CREATE POLICY "Public read access for SEO metadata" ON seo_metadata
    FOR SELECT USING (true);

CREATE POLICY "Public read access for active redirects" ON url_redirects
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active sitemap entries" ON sitemap_entries
    FOR SELECT USING (is_active = true);

-- ========================================
-- INITIAL DATA
-- ========================================

-- Insert some initial categories
INSERT INTO categories (name, slug, description, display_order) VALUES
    ('Smartphones', 'smartphones', 'Smartphones gaming et flagship', 1),
    ('Tablettes', 'tablettes', 'Tablettes premium et gaming', 2),
    ('Audio', 'audio', 'Casques, écouteurs et enceintes', 3),
    ('Accessoires', 'accessoires', 'Accessoires gaming et protection', 4),
    ('Montres connectées', 'montres-connectees', 'Smartwatches et trackers', 5),
    ('Chargement & Énergie', 'chargement-energie', 'Chargeurs, batteries et câbles', 6);

-- Insert some initial collections
INSERT INTO collections (name, slug, description, emoji, display_order, is_featured) VALUES
    ('Gaming Pack Complet', 'gaming-pack', 'Smartphones avec pack complet inclus', '🔥', 1, true),
    ('Audio Premium', 'audio-premium', 'Le meilleur du son', '🎧', 2, true),
    ('Nouveautés', 'nouveautes', 'Les derniers arrivages', '🆕', 3, true),
    ('Promotions', 'promotions', 'Les meilleures offres', '💰', 4, true);

-- Grant usage on schema to authenticated and anon users
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant select permissions on all tables to anon and authenticated
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- Grant insert on reviews for authenticated users only
GRANT INSERT ON reviews TO authenticated;

-- Grant execute on functions to anon and authenticated
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Monster Phone Boutique database schema created successfully!';
END
$$;