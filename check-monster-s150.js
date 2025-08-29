const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  // Navigate to Monster S150 page
  await page.goto('http://localhost:3000/produit/monster-s150-enceinte-haute-qualite');
  
  // Wait for images to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Take full page screenshot
  await page.screenshot({ 
    path: 'monster-s150-page.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved as monster-s150-page.png');
  
  // Check if images are loaded
  const images = await page.locator('img[alt*="Monster S150"]').all();
  console.log(`Found ${images.length} Monster S150 images on the page`);
  
  // Get image sources
  for (let i = 0; i < images.length; i++) {
    const src = await images[i].getAttribute('src');
    console.log(`Image ${i + 1}: ${src}`);
  }
  
  // Check reviews section
  const reviewsButton = await page.locator('button:has-text("Avis")').textContent();
  console.log(`Reviews button shows: ${reviewsButton}`);
  
  await browser.close();
})();