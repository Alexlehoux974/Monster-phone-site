-- ========================================
-- Stock Management Functions
-- ========================================

-- Function to decrement product variant stock after order
CREATE OR REPLACE FUNCTION decrement_product_stock(
    p_product_id UUID,
    p_quantity INTEGER,
    p_variant_color VARCHAR DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_variant_id UUID;
    v_current_stock INTEGER;
BEGIN
    -- Find the variant ID based on product_id and optional color
    IF p_variant_color IS NOT NULL THEN
        SELECT id, stock INTO v_variant_id, v_current_stock
        FROM product_variants
        WHERE product_id = p_product_id AND color = p_variant_color
        LIMIT 1;
    ELSE
        -- If no color specified, get the default variant or first available
        SELECT id, stock INTO v_variant_id, v_current_stock
        FROM product_variants
        WHERE product_id = p_product_id
        ORDER BY is_default DESC NULLS LAST, stock DESC
        LIMIT 1;
    END IF;

    -- Check if variant exists and has enough stock
    IF v_variant_id IS NULL THEN
        RAISE EXCEPTION 'Product variant not found for product_id %', p_product_id;
        RETURN FALSE;
    END IF;

    IF v_current_stock < p_quantity THEN
        RAISE WARNING 'Insufficient stock for variant %. Current: %, Requested: %', v_variant_id, v_current_stock, p_quantity;
        -- Update to 0 instead of going negative
        UPDATE product_variants
        SET stock = 0,
            updated_at = NOW()
        WHERE id = v_variant_id;

        -- Update product status to out-of-stock if all variants are empty
        UPDATE products
        SET status = 'out-of-stock',
            updated_at = NOW()
        WHERE id = p_product_id
        AND NOT EXISTS (
            SELECT 1 FROM product_variants
            WHERE product_id = p_product_id AND stock > 0
        );

        RETURN FALSE;
    END IF;

    -- Decrement stock
    UPDATE product_variants
    SET stock = stock - p_quantity,
        updated_at = NOW()
    WHERE id = v_variant_id;

    -- Update product status to out-of-stock if this was the last item
    UPDATE products
    SET status = 'out-of-stock',
        updated_at = NOW()
    WHERE id = p_product_id
    AND NOT EXISTS (
        SELECT 1 FROM product_variants
        WHERE product_id = p_product_id AND stock > 0
    );

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to handle stock decrement for entire order
CREATE OR REPLACE FUNCTION process_order_stock_decrement(p_order_id UUID)
RETURNS TABLE(success BOOLEAN, message TEXT) AS $$
DECLARE
    v_item RECORD;
    v_success BOOLEAN;
    v_total_items INTEGER := 0;
    v_processed_items INTEGER := 0;
    v_failed_items INTEGER := 0;
BEGIN
    -- Get all order items
    FOR v_item IN
        SELECT
            oi.product_id,
            oi.quantity,
            oi.product_metadata->>'color' as variant_color
        FROM order_items oi
        WHERE oi.order_id = p_order_id
    LOOP
        v_total_items := v_total_items + 1;

        -- Try to decrement stock for each item
        BEGIN
            v_success := decrement_product_stock(
                v_item.product_id::UUID,
                v_item.quantity,
                v_item.variant_color
            );

            IF v_success THEN
                v_processed_items := v_processed_items + 1;
            ELSE
                v_failed_items := v_failed_items + 1;
            END IF;
        EXCEPTION WHEN OTHERS THEN
            v_failed_items := v_failed_items + 1;
            RAISE WARNING 'Failed to decrement stock for product %: %', v_item.product_id, SQLERRM;
        END;
    END LOOP;

    -- Return summary
    IF v_failed_items = 0 THEN
        RETURN QUERY SELECT TRUE, format('Successfully decremented stock for %s items', v_processed_items);
    ELSIF v_processed_items = 0 THEN
        RETURN QUERY SELECT FALSE, format('Failed to decrement stock for all %s items', v_total_items);
    ELSE
        RETURN QUERY SELECT TRUE, format('Partially succeeded: %s/%s items processed', v_processed_items, v_total_items);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION decrement_product_stock TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION process_order_stock_decrement TO authenticated, service_role;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Stock management functions created successfully!';
END
$$;
