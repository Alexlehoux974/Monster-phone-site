const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test visibilité menu Accessoires ===');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  // Vérifier la visibilité du dropdown
  const dropdown = await page.locator('.absolute.top-full').first();
  const isVisible = await dropdown.isVisible();
  console.log(`Menu visible: ${isVisible ? '✓' : '✗'}`);
  
  const box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    const rightEdge = box.x + box.width;
    const leftEdge = box.x;
    
    console.log(`\nPosition du menu:`);
    console.log(`- Bord gauche: ${leftEdge}px`);
    console.log(`- Bord droit: ${rightEdge}px`);
    console.log(`- Largeur du menu: ${box.width}px`);
    console.log(`- Largeur écran: ${screenWidth}px`);
    
    // Vérifier que le menu est dans l'écran
    const fullyVisible = leftEdge >= 0 && rightEdge <= screenWidth;
    console.log(`\nMenu entièrement visible dans l'écran: ${fullyVisible ? '✓' : '✗'}`);
    
    if (rightEdge > screenWidth) {
      console.log(`⚠️  Menu dépasse de ${rightEdge - screenWidth}px à droite`);
    }
    if (leftEdge < 0) {
      console.log(`⚠️  Menu dépasse de ${Math.abs(leftEdge)}px à gauche`);
    }
    
    // Espace par rapport aux bords
    console.log(`\nEspace depuis le bord droit: ${screenWidth - rightEdge}px`);
    console.log(`Espace depuis le bord gauche: ${leftEdge}px`);
  }
  
  // Survoler pour afficher toutes les colonnes
  await page.hover('button:has-text("Batteries & Chargeurs")');
  await page.waitForTimeout(500);
  await page.hover('button:has-text("MONSTER")');
  await page.waitForTimeout(500);
  
  // Screenshot
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-accessoires-visibility.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-accessoires-visibility.png');
  
  await browser.close();
})();