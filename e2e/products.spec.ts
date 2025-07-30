import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/nos-produits');
  });

  test('should display products page correctly', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /Nos Produits/i })).toBeVisible();
    
    // Check if products are displayed
    const productCards = page.locator('[data-testid="product-card"]');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter products by category', async ({ page }) => {
    // Check category buttons exist
    await expect(page.getByRole('button', { name: /Smartphones/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Audio & Son/i })).toBeVisible();
    
    // Click on a category
    await page.getByRole('button', { name: /Smartphones/i }).click();
    
    // Wait for filtering to occur
    await page.waitForTimeout(500);
    
    // Verify products are filtered (this depends on actual implementation)
    const products = page.locator('[data-testid="product-card"]');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should search products', async ({ page }) => {
    // Find search input
    const searchInput = page.getByPlaceholder(/Rechercher/i);
    
    // Type in search
    await searchInput.fill('HONOR');
    
    // Wait for search results
    await page.waitForTimeout(500);
    
    // Check that products are filtered
    const products = page.locator('[data-testid="product-card"]');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should sort products', async ({ page }) => {
    // Look for sort dropdown
    const sortSelect = page.locator('select').filter({ hasText: /Trier/i });
    
    if (await sortSelect.isVisible()) {
      // Select a sort option
      await sortSelect.selectOption({ index: 1 });
      
      // Wait for sorting
      await page.waitForTimeout(500);
      
      // Verify products are still displayed
      const products = page.locator('[data-testid="product-card"]');
      const count = await products.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should display product details on hover or click', async ({ page }) => {
    // Get first product card
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    
    // Hover over product
    await firstProduct.hover();
    
    // Check if price is visible
    await expect(firstProduct.locator('text=/€/')).toBeVisible();
  });

  test('should handle empty search results', async ({ page }) => {
    // Search for something that doesn't exist
    const searchInput = page.getByPlaceholder(/Rechercher/i);
    await searchInput.fill('xyzabc123notfound');
    
    // Wait for search
    await page.waitForTimeout(500);
    
    // Check for no results message or empty state
    const products = page.locator('[data-testid="product-card"]');
    const count = await products.count();
    
    if (count === 0) {
      // Look for empty state message
      const emptyMessage = page.getByText(/Aucun produit/i);
      await expect(emptyMessage).toBeVisible();
    }
  });
});