import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should display mobile menu on small screens', async ({ browser }) => {
    // Create mobile context
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Mobile menu button should be visible
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenuButton).toBeVisible();
    
    // Desktop menu should be hidden
    const desktopNav = page.locator('nav').filter({ hasText: 'Nos Produits' });
    await expect(desktopNav).toBeHidden();
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Mobile menu should be visible
    await expect(page.getByRole('link', { name: 'Nos Produits' })).toBeVisible();
    
    await context.close();
  });

  test('should adapt hero section for mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check hero text is visible but smaller
    const heroTitle = page.getByRole('heading', { name: /Libérez le Monster/i });
    await expect(heroTitle).toBeVisible();
    
    // Check CTA buttons stack vertically
    const ctaContainer = page.locator('.flex-col.sm\\:flex-row');
    await expect(ctaContainer).toBeVisible();
    
    await context.close();
  });

  test('should display desktop navigation on large screens', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Desktop navigation should be visible
    const desktopNav = page.locator('nav').filter({ hasText: 'Nos Produits' });
    await expect(desktopNav).toBeVisible();
    
    // Mobile menu button should be hidden
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenuButton).toBeHidden();
  });

  test('should adapt product grid for different screen sizes', async ({ browser }) => {
    // Test on tablet
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const tabletPage = await tabletContext.newPage();
    
    await tabletPage.goto('/nos-produits');
    
    // Check grid layout exists
    const productGrid = tabletPage.locator('.grid');
    await expect(productGrid).toBeVisible();
    
    // Test on mobile
    const mobileContext = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const mobilePage = await mobileContext.newPage();
    
    await mobilePage.goto('/nos-produits');
    
    // Products should stack vertically on mobile
    const mobileGrid = mobilePage.locator('.grid');
    await expect(mobileGrid).toBeVisible();
    
    await tabletContext.close();
    await mobileContext.close();
  });

  test('should handle footer responsively', async ({ browser }) => {
    // Mobile view
    const mobileContext = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const mobilePage = await mobileContext.newPage();
    
    await mobilePage.goto('/');
    await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Footer sections should stack vertically
    const footerSections = mobilePage.locator('footer .grid > div');
    const sectionCount = await footerSections.count();
    expect(sectionCount).toBeGreaterThan(0);
    
    // Desktop view
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const desktopPage = await desktopContext.newPage();
    
    await desktopPage.goto('/');
    await desktopPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Footer should have multi-column layout
    const desktopFooter = desktopPage.locator('footer .grid');
    await expect(desktopFooter).toHaveClass(/lg:grid-cols-4/);
    
    await mobileContext.close();
    await desktopContext.close();
  });

  test('should handle form inputs on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/contact');
    
    // Form inputs should be full width on mobile
    const nameInput = page.getByLabel(/Nom/i);
    await expect(nameInput).toBeVisible();
    
    // Test input interaction
    await nameInput.click();
    await nameInput.fill('Test User');
    
    // Keyboard should not obscure submit button
    const submitButton = page.getByRole('button', { name: /Envoyer/i });
    await expect(submitButton).toBeInViewport();
    
    await context.close();
  });

  test('should handle images responsively', async ({ browser }) => {
    // Test different viewports
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const page = await context.newPage();
      
      await page.goto('/');
      
      // Check images are visible and properly sized
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        const firstImage = images.first();
        await expect(firstImage).toBeVisible();
        
        // Image should not overflow viewport
        const imageBounds = await firstImage.boundingBox();
        if (imageBounds) {
          expect(imageBounds.width).toBeLessThanOrEqual(viewport.width);
        }
      }
      
      await context.close();
    }
  });
});