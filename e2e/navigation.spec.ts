import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate through main menu items', async ({ page }) => {
    // Test navigation to Nos Produits
    await page.getByRole('link', { name: 'Nos Produits', exact: true }).click();
    await expect(page).toHaveURL('/nos-produits');
    await expect(page.getByRole('heading', { name: /Nos Produits/i })).toBeVisible();

    // Test navigation to Accessoires
    await page.getByRole('link', { name: 'Accessoires' }).click();
    await expect(page).toHaveURL('/accessoires');
    
    // Test navigation to Promotions
    await page.getByRole('link', { name: 'Promotions' }).click();
    await expect(page).toHaveURL('/promotions');
    
    // Test navigation to Contact
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: /Contactez-nous/i })).toBeVisible();
  });

  test('should navigate to cart page', async ({ page }) => {
    // Click on cart icon
    await page.getByRole('link', { name: /panier/i }).click();
    await expect(page).toHaveURL('/panier');
    await expect(page.getByRole('heading', { name: /Votre Panier/i })).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Test Services links
    await page.getByRole('link', { name: 'Livraison' }).click();
    await expect(page).toHaveURL('/services/livraison');
    
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await page.getByRole('link', { name: 'Garantie' }).click();
    await expect(page).toHaveURL('/services/garantie');
  });

  test('should navigate to legal pages', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Test legal links
    await page.getByRole('link', { name: 'Mentions légales' }).click();
    await expect(page).toHaveURL('/legal/mentions-legales');
    
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    await page.getByRole('link', { name: 'Politique de confidentialité' }).click();
    await expect(page).toHaveURL('/legal/confidentialite');
  });

  test('should show dropdown menu on hover', async ({ page }) => {
    // Hover over "Nos Produits"
    await page.getByRole('link', { name: 'Nos Produits', exact: true }).hover();
    
    // Check dropdown is visible
    await expect(page.getByText('Smartphones')).toBeVisible();
    await expect(page.getByText('Audio & Son')).toBeVisible();
  });

  test('logo should navigate to homepage', async ({ page }) => {
    // Go to another page first
    await page.goto('/contact');
    await expect(page).toHaveURL('/contact');
    
    // Click logo to go back to homepage
    await page.getByRole('link', { name: /Monster Phone/i }).first().click();
    await expect(page).toHaveURL('/');
  });
});