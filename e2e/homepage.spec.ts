import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main hero section', async ({ page }) => {
    // Check main title
    await expect(page.getByRole('heading', { name: /Libérez le Monster qui sommeille en vous/i })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText(/Découvrez notre collection exclusive/i)).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Découvrir la Collection/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Voir les Offres Spéciales/i })).toBeVisible();
  });

  test('should display statistics', async ({ page }) => {
    // Check for stats
    await expect(page.getByText('16K')).toBeVisible();
    await expect(page.getByText('CLIENTS')).toBeVisible();
    await expect(page.getByText('98%')).toBeVisible();
    await expect(page.getByText('SATISFACTION')).toBeVisible();
    await expect(page.getByText('48H')).toBeVisible();
    await expect(page.getByText('LIVRAISON')).toBeVisible();
  });

  test('should have a working navigation', async ({ page }) => {
    // Check header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check logo
    await expect(page.getByRole('link', { name: /Monster Phone/i })).toBeVisible();
    
    // Check main navigation links
    await expect(page.getByRole('link', { name: 'Nos Produits' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Accessoires' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Promotions' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('should display trust section', async ({ page }) => {
    // Scroll to trust section
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Check trust features
    await expect(page.getByText('Livraison Express')).toBeVisible();
    await expect(page.getByText('Garantie Constructeur')).toBeVisible();
    await expect(page.getByText('Support Technique')).toBeVisible();
  });

  test('should display newsletter section', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check newsletter section
    await expect(page.getByText(/Restez informé/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Votre adresse email/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /S'abonner/i })).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    // Click on "Découvrir la Collection" button
    await page.getByRole('link', { name: /Découvrir la Collection/i }).click();
    
    // Wait for navigation
    await page.waitForURL('/nos-produits');
    
    // Check we're on the products page
    await expect(page).toHaveURL('/nos-produits');
    await expect(page.getByRole('heading', { name: /Nos Produits/i })).toBeVisible();
  });
});