const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test câbles MY WAY dans menu Accessoires ===\n');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  // Hover sur Câbles & Connectiques
  await page.hover('button:has-text("Câbles & Connectiques")');
  await page.waitForTimeout(500);
  
  // Vérifier les marques affichées
  const brands = await page.locator('.min-w-\\[170px\\] button span.font-medium').allTextContents();
  console.log('Marques affichées dans Câbles & Connectiques:');
  brands.forEach(brand => console.log(`- ${brand}`));
  
  // Hover sur MY WAY
  await page.hover('button:has-text("MY WAY")');
  await page.waitForTimeout(500);
  
  // Compter les produits MY WAY affichés
  const products = await page.locator('.min-w-\\[190px\\] a[href^="/produit/"]').all();
  
  console.log(`\nNombre de produits MY WAY affichés: ${products.length}`);
  
  for (const product of products) {
    const name = await product.locator('.text-sm.font-semibold').textContent();
    const price = await product.locator('.text-red-600').textContent();
    console.log(`- ${name}: ${price}`);
  }
  
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-cables-myway.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-cables-myway.png');
  
  await browser.close();
})();
