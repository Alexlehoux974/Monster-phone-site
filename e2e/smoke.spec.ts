import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage should load', async ({ page }) => {
    // Simple test to check if the app loads
    await page.goto('/');
    
    // Check if page has loaded by looking for the main title
    await expect(page).toHaveTitle(/Monster Phone/i);
    
    // Check if hero section is visible
    const heroSection = page.locator('h2').filter({ hasText: /Libérez le/i });
    await expect(heroSection).toBeVisible();
  });

  test('main pages should be accessible', async ({ page }) => {
    const pages = [
      { url: '/', selector: 'h2:has-text("Libérez le")' },
      { url: '/nos-produits', selector: 'h1:has-text("Nos Produits")' },
      { url: '/contact', selector: 'h1:has-text("Contactez-nous")' },
      { url: '/panier', selector: 'h1:has-text("Votre Panier")' },
    ];

    for (const pageInfo of pages) {
      // Check page loaded without errors
      const response = await page.goto(pageInfo.url);
      expect(response?.status()).toBe(200);
      
      // Check specific content is visible
      await expect(page.locator(pageInfo.selector)).toBeVisible();
    }
  });
});