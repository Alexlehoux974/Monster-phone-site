import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /Contactez-nous/i })).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel(/Nom/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Téléphone/i)).toBeVisible();
    await expect(page.getByLabel(/Message/i)).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole('button', { name: /Envoyer/i })).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    // Check contact details
    await expect(page.getByText(/contact@monster-phone-reunion.com/i)).toBeVisible();
    await expect(page.getByText(/02 62 02 51 02/)).toBeVisible();

    // Check address
    await expect(page.getByText(/Le Port/i)).toBeVisible();
    await expect(page.getByText(/La Réunion/i)).toBeVisible();
  });

  test('should fill and submit contact form', async ({ page }) => {
    // Fill form
    await page.getByLabel(/Nom/i).fill('Jean Dupont');
    await page.getByLabel(/Email/i).fill('jean.dupont@example.com');
    await page.getByLabel(/Téléphone/i).fill('0692123456');
    await page.getByLabel(/Message/i).fill('Je souhaite avoir des informations sur vos produits.');
    
    // Submit form
    await page.getByRole('button', { name: /Envoyer/i }).click();
    
    // Check for success message or confirmation
    // Note: This depends on actual implementation
    await page.waitForTimeout(1000);
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /Envoyer/i }).click();
    
    // Check for validation messages
    const nameInput = page.getByLabel(/Nom/i);
    const emailInput = page.getByLabel(/Email/i);
    
    // Check if HTML5 validation is triggered
    const nameValidity = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    const emailValidity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    
    expect(nameValidity).toBe(false);
    expect(emailValidity).toBe(false);
  });

  test('should validate email format', async ({ page }) => {
    // Fill with invalid email
    await page.getByLabel(/Email/i).fill('invalid-email');
    await page.getByLabel(/Nom/i).fill('Test User');
    await page.getByLabel(/Message/i).fill('Test message');
    
    // Try to submit
    await page.getByRole('button', { name: /Envoyer/i }).click();
    
    // Check if email validation is triggered
    const emailInput = page.getByLabel(/Email/i);
    const emailValidity = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    
    expect(emailValidity).toBe(false);
  });

  test('should have working social media links', async ({ page }) => {
    // Check for social media section
    const socialLinks = page.locator('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"]');
    const count = await socialLinks.count();
    
    // Should have at least one social media link
    expect(count).toBeGreaterThan(0);
  });

  test('should display business hours', async ({ page }) => {
    // Check for opening hours
    await expect(page.getByText(/Lundi/i)).toBeVisible();
    await expect(page.getByText(/Vendredi/i)).toBeVisible();
    await expect(page.getByText(/9h/i)).toBeVisible();
  });
});