-- ========================================
-- Fix Stock Decrement for Products Without Variants
-- ========================================

-- Modified function to decrement product variant stock OR main product stock
CREATE OR REPLACE FUNCTION decrement_product_stock(
    p_product_id UUID,
    p_quantity INTEGER,
    p_variant_color VARCHAR DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_variant_id UUID;
    v_current_stock INTEGER;
    v_product_stock INTEGER;
BEGIN
    -- Try to find variant first
    IF p_variant_color IS NOT NULL THEN
        SELECT id, stock INTO v_variant_id, v_current_stock
        FROM product_variants
        WHERE product_id = p_product_id AND color = p_variant_color
        LIMIT 1;
    ELSE
        SELECT id, stock INTO v_variant_id, v_current_stock
        FROM product_variants
        WHERE product_id = p_product_id
        ORDER BY is_default DESC NULLS LAST, stock DESC
        LIMIT 1;
    END IF;

    -- If variant exists, decrement variant stock
    IF v_variant_id IS NOT NULL THEN
        IF v_current_stock < p_quantity THEN
            RAISE WARNING 'Insufficient stock for variant %. Current: %, Requested: %', v_variant_id, v_current_stock, p_quantity;
            UPDATE product_variants
            SET stock = 0, updated_at = NOW()
            WHERE id = v_variant_id;
            RETURN FALSE;
        END IF;

        UPDATE product_variants
        SET stock = stock - p_quantity, updated_at = NOW()
        WHERE id = v_variant_id;

        -- Update product status if all variants are empty
        UPDATE products
        SET status = 'out-of-stock', updated_at = NOW()
        WHERE id = p_product_id
        AND NOT EXISTS (
            SELECT 1 FROM product_variants
            WHERE product_id = p_product_id AND stock > 0
        );

        RETURN TRUE;
    END IF;

    -- NO VARIANT FOUND: Decrement main product stock directly
    RAISE NOTICE 'No variant found for product %, decrementing main product stock', p_product_id;

    SELECT stock INTO v_product_stock
    FROM products
    WHERE id = p_product_id;

    IF v_product_stock IS NULL THEN
        RAISE WARNING 'Product not found: %', p_product_id;
        RETURN FALSE;
    END IF;

    IF v_product_stock < p_quantity THEN
        RAISE WARNING 'Insufficient stock for product %. Current: %, Requested: %', p_product_id, v_product_stock, p_quantity;
        UPDATE products
        SET stock = 0, status = 'out-of-stock', updated_at = NOW()
        WHERE id = p_product_id;
        RETURN FALSE;
    END IF;

    -- Decrement main product stock
    UPDATE products
    SET stock = stock - p_quantity, updated_at = NOW()
    WHERE id = p_product_id;

    -- Update status if stock is now 0
    UPDATE products
    SET status = 'out-of-stock'
    WHERE id = p_product_id AND stock <= 0;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION decrement_product_stock TO authenticated, service_role;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Stock decrement function updated to handle products without variants!';
END
$$;
