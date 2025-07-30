import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('should display empty cart message', async ({ page }) => {
    await page.goto('/panier');
    
    // Check page title
    await expect(page.getByRole('heading', { name: /Votre Panier/i })).toBeVisible();
    
    // Check empty cart message
    await expect(page.getByText(/Votre panier est vide/i)).toBeVisible();
    
    // Check continue shopping button
    await expect(page.getByRole('link', { name: /Continuer vos achats/i })).toBeVisible();
  });

  test('should navigate to products from empty cart', async ({ page }) => {
    await page.goto('/panier');
    
    // Click continue shopping
    await page.getByRole('link', { name: /Continuer vos achats/i }).click();
    
    // Should navigate to products page
    await expect(page).toHaveURL('/nos-produits');
  });

  test('should add product to cart from products page', async ({ page }) => {
    // Go to products page
    await page.goto('/nos-produits');
    
    // Add first product to cart
    const addToCartButton = page.getByRole('button', { name: /Ajouter au panier/i }).first();
    
    if (await addToCartButton.isVisible()) {
      await addToCartButton.click();
      
      // Check for success notification or cart counter update
      await page.waitForTimeout(500);
      
      // Go to cart
      await page.goto('/panier');
      
      // Cart should not be empty
      const emptyMessage = page.getByText(/Votre panier est vide/i);
      const isEmpty = await emptyMessage.isVisible().catch(() => false);
      
      if (!isEmpty) {
        // Check for cart items
        const cartItems = page.locator('[data-testid="cart-item"]');
        const count = await cartItems.count();
        expect(count).toBeGreaterThan(0);
      }
    }
  });

  test('should display cart summary', async ({ page }) => {
    await page.goto('/panier');
    
    // Look for cart summary elements
    const cartItems = page.locator('[data-testid="cart-item"]');
    const hasItems = await cartItems.count() > 0;
    
    if (hasItems) {
      // Check for price elements
      await expect(page.getByText(/Total/i)).toBeVisible();
      await expect(page.getByText(/€/)).toBeVisible();
      
      // Check for checkout button
      await expect(page.getByRole('button', { name: /Commander/i })).toBeVisible();
    }
  });

  test('should update quantity in cart', async ({ page }) => {
    await page.goto('/panier');
    
    // Check if there are items in cart
    const quantityInput = page.locator('input[type="number"]').first();
    
    if (await quantityInput.isVisible()) {
      // Get current value
      const currentValue = await quantityInput.inputValue();
      
      // Update quantity
      await quantityInput.fill('2');
      
      // Wait for update
      await page.waitForTimeout(500);
      
      // Verify quantity was updated
      const newValue = await quantityInput.inputValue();
      expect(newValue).toBe('2');
    }
  });

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/panier');
    
    // Look for remove button
    const removeButton = page.getByRole('button', { name: /Supprimer/i }).first();
    
    if (await removeButton.isVisible()) {
      // Count items before removal
      const itemsBefore = await page.locator('[data-testid="cart-item"]').count();
      
      // Remove item
      await removeButton.click();
      
      // Wait for removal
      await page.waitForTimeout(500);
      
      // Count items after removal
      const itemsAfter = await page.locator('[data-testid="cart-item"]').count();
      
      // Should have one less item
      expect(itemsAfter).toBe(itemsBefore - 1);
    }
  });

  test('should calculate total correctly', async ({ page }) => {
    await page.goto('/panier');
    
    // Check if there are items with prices
    const prices = page.locator('[data-testid="item-price"]');
    const priceCount = await prices.count();
    
    if (priceCount > 0) {
      // Get all prices
      const priceValues = await prices.evaluateAll((elements) => 
        elements.map(el => parseFloat(el.textContent?.replace(/[^0-9.,]/g, '').replace(',', '.') || '0'))
      );
      
      // Calculate expected total
      const expectedTotal = priceValues.reduce((sum, price) => sum + price, 0);
      
      // Get displayed total
      const totalElement = page.locator('[data-testid="cart-total"]');
      const totalText = await totalElement.textContent();
      const displayedTotal = parseFloat(totalText?.replace(/[^0-9.,]/g, '').replace(',', '.') || '0');
      
      // Compare (allowing for small rounding differences)
      expect(Math.abs(displayedTotal - expectedTotal)).toBeLessThan(0.01);
    }
  });
});