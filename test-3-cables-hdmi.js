const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test 3 câbles HDMI MONSTER ===\n');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  // Hover sur Câbles & Connectiques
  await page.hover('button:has-text("Câbles & Connectiques")');
  await page.waitForTimeout(500);
  
  // Hover sur MONSTER
  await page.hover('button:has-text("MONSTER")');
  await page.waitForTimeout(500);
  
  // Compter les produits MONSTER affichés
  const products = await page.locator('.min-w-\\[190px\\] a[href^="/produit/"]').all();
  
  console.log(`Nombre de câbles HDMI MONSTER affichés: ${products.length}\n`);
  
  for (const product of products) {
    const name = await product.locator('.text-sm.font-semibold').textContent();
    const price = await product.locator('.text-red-600').textContent();
    console.log(`✓ ${name}`);
    console.log(`  Prix: ${price}`);
  }
  
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-3-cables-hdmi.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-3-cables-hdmi.png');
  
  await browser.close();
})();
