const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test produits MY WAY dans menu Accessoires ===\n');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  // Hover sur Batteries & Chargeurs
  await page.hover('button:has-text("Batteries & Chargeurs")');
  await page.waitForTimeout(500);
  
  // Hover sur MY WAY
  await page.hover('button:has-text("MY WAY")');
  await page.waitForTimeout(500);
  
  // Compter les produits MY WAY affichés
  const products = await page.locator('.min-w-\\[190px\\] a[href^="/produit/"]').all();
  
  console.log(`Nombre de produits MY WAY affichés: ${products.length}`);
  
  for (const product of products) {
    const name = await product.locator('.text-sm.font-semibold').textContent();
    const price = await product.locator('.text-red-600').textContent();
    const url = await product.getAttribute('href');
    console.log(`- ${name}: ${price}`);
    console.log(`  URL: ${url}`);
  }
  
  // Vérifier le texte du lien "Voir tous"
  const viewAllLink = await page.locator('a[href*="brand=MY%20WAY"]').first();
  if (viewAllLink) {
    const linkText = await viewAllLink.textContent();
    console.log(`\nLien "Voir tous": ${linkText}`);
  }
  
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-myway.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-myway.png');
  
  await browser.close();
})();
