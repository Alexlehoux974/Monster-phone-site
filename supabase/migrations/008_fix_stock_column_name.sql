-- ========================================
-- Fix Stock Column Name for Products Table
-- ========================================
-- The products table uses 'stock_quantity', not 'stock'
-- product_variants uses 'stock'

-- Drop existing functions first
DROP FUNCTION IF EXISTS decrement_product_stock(TEXT, INTEGER, UUID);
DROP FUNCTION IF EXISTS process_order_stock_decrement(UUID);

-- Modified function with correct column names
CREATE OR REPLACE FUNCTION decrement_product_stock(
    p_product_id TEXT,
    p_quantity INTEGER,
    p_variant_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_stock INTEGER;
    v_product_stock INTEGER;
    v_product_uuid UUID;
BEGIN
    -- Convert TEXT to UUID
    BEGIN
        v_product_uuid := p_product_id::UUID;
    EXCEPTION
        WHEN invalid_text_representation THEN
            RAISE WARNING 'Invalid product_id format: %', p_product_id;
            RETURN FALSE;
    END;

    -- Try to find variant by UUID first
    IF p_variant_id IS NOT NULL THEN
        SELECT stock INTO v_current_stock
        FROM product_variants
        WHERE id = p_variant_id
        LIMIT 1;

        -- If variant exists, decrement variant stock
        IF v_current_stock IS NOT NULL THEN
            IF v_current_stock < p_quantity THEN
                RAISE WARNING 'Insufficient stock for variant %. Current: %, Requested: %', p_variant_id, v_current_stock, p_quantity;
                UPDATE product_variants
                SET stock = 0, updated_at = NOW()
                WHERE id = p_variant_id;
                RETURN FALSE;
            END IF;

            UPDATE product_variants
            SET stock = stock - p_quantity, updated_at = NOW()
            WHERE id = p_variant_id;

            -- Update product status if all variants are empty
            UPDATE products
            SET status = 'out-of-stock', updated_at = NOW()
            WHERE id = v_product_uuid
            AND NOT EXISTS (
                SELECT 1 FROM product_variants
                WHERE product_id = v_product_uuid AND stock > 0
            );

            RAISE NOTICE '✅ Decremented variant stock: variant_id=%, quantity=%', p_variant_id, p_quantity;
            RETURN TRUE;
        END IF;
    END IF;

    -- NO VARIANT FOUND: Decrement main product stock directly
    RAISE NOTICE 'No variant UUID provided or found, decrementing main product stock for product %', p_product_id;

    -- ✅ FIX: Use stock_quantity for products table
    SELECT stock_quantity INTO v_product_stock
    FROM products
    WHERE id = v_product_uuid;

    IF v_product_stock IS NULL THEN
        RAISE WARNING 'Product not found: %', p_product_id;
        RETURN FALSE;
    END IF;

    IF v_product_stock < p_quantity THEN
        RAISE WARNING 'Insufficient stock for product %. Current: %, Requested: %', p_product_id, v_product_stock, p_quantity;
        UPDATE products
        SET stock_quantity = 0, status = 'out-of-stock', updated_at = NOW()
        WHERE id = v_product_uuid;
        RETURN FALSE;
    END IF;

    -- ✅ FIX: Decrement stock_quantity for products table
    UPDATE products
    SET stock_quantity = stock_quantity - p_quantity, updated_at = NOW()
    WHERE id = v_product_uuid;

    -- Update status if stock is now 0
    UPDATE products
    SET status = 'out-of-stock'
    WHERE id = v_product_uuid AND stock_quantity <= 0;

    RAISE NOTICE '✅ Decremented main product stock: product_id=%, quantity=%', p_product_id, p_quantity;
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Process order stock decrement (unchanged)
CREATE OR REPLACE FUNCTION process_order_stock_decrement(p_order_id UUID)
RETURNS JSON AS $$
DECLARE
    v_result JSON;
    v_item RECORD;
    v_success BOOLEAN;
    v_successes INTEGER := 0;
    v_failures INTEGER := 0;
    v_variant_id UUID;
BEGIN
    -- Iterate over order items
    FOR v_item IN
        SELECT
            oi.product_id,
            oi.quantity,
            (oi.product_metadata->>'variant_id')::UUID as variant_id
        FROM order_items oi
        WHERE oi.order_id = p_order_id
    LOOP
        v_success := decrement_product_stock(
            v_item.product_id,
            v_item.quantity,
            v_item.variant_id
        );

        IF v_success THEN
            v_successes := v_successes + 1;
        ELSE
            v_failures := v_failures + 1;
        END IF;
    END LOOP;

    v_result := json_build_object(
        'order_id', p_order_id,
        'successes', v_successes,
        'failures', v_failures,
        'total_items', v_successes + v_failures
    );

    RAISE NOTICE '📦 Stock decrement complete: %', v_result;
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION decrement_product_stock TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION process_order_stock_decrement TO authenticated, service_role;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Fixed column name: products.stock_quantity (not stock)';
    RAISE NOTICE '✅ product_variants.stock remains unchanged';
END
$$;
