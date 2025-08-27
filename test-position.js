const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  // Test menu Accessoires
  console.log('=== Test menu Accessoires ===');
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  const dropdown = await page.locator('.absolute.top-full').first();
  const box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    const rightSpace = screenWidth - (box.x + box.width);
    console.log(`Position: ${box.x}px, Largeur: ${box.width}px`);
    console.log(`Espace depuis le bord droit: ${rightSpace}px`);
    console.log(`Position correcte à droite: ${rightSpace > 0 && rightSpace < 50 ? '✓' : '✗'}`);
  }
  
  // Capture screenshot
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-accessoires-final.png' });
  console.log('\nScreenshot sauvé: /root/Monster-Phone-Images/test-accessoires-final.png');
  
  // Test menu LED pour comparaison
  await page.reload();
  await page.waitForTimeout(1000);
  
  console.log('\n=== Test menu LED (comparaison) ===');
  await page.hover('button:has-text("LED")');
  await page.waitForTimeout(500);
  
  const dropdownLED = await page.locator('.absolute.top-full').first();
  const boxLED = await dropdownLED.boundingBox();
  
  if (boxLED) {
    console.log(`Position LED: ${boxLED.x}px, Largeur: ${boxLED.width}px`);
  }
  
  await browser.close();
})();