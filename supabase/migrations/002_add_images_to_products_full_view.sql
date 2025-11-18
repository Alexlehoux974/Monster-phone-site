-- Migration: Add images field to product variants in products_full view
-- Date: 2025-01-17
-- Description: Update products_full view to include images array from product_variants

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
            'is_default', pv.is_default,
            'images', pv.images  -- ✅ AJOUT du champ images
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
        SELECT json_agg(json_build_object(
            'id', rev.id,
            'author_name', rev.author_name,
            'rating', rev.rating,
            'title', rev.title,
            'comment', rev.comment,
            'is_verified', rev.is_verified,
            'helpful_count', rev.helpful_count,
            'created_at', rev.created_at
        ) ORDER BY rev.created_at DESC)
        FROM reviews rev
        WHERE rev.product_id = p.id
    ) as reviews
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories sc ON p.subcategory_id = sc.id
LEFT JOIN (
    SELECT
        product_id,
        ROUND(AVG(rating)::numeric, 1) as average_rating,
        COUNT(*) as total_reviews,
        COUNT(*) FILTER (WHERE rating = 5) as five_star,
        COUNT(*) FILTER (WHERE rating = 4) as four_star,
        COUNT(*) FILTER (WHERE rating = 3) as three_star,
        COUNT(*) FILTER (WHERE rating = 2) as two_star,
        COUNT(*) FILTER (WHERE rating = 1) as one_star
    FROM reviews
    GROUP BY product_id
) pr ON p.id = pr.product_id;
