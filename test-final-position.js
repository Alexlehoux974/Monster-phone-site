const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Position finale menu Accessoires ===\n');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  const dropdown = await page.locator('.absolute.top-full').first();
  const box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    const rightSpace = screenWidth - (box.x + box.width);
    
    console.log('Menu avec 1 colonne (Catégories):');
    console.log(`- Position: ${box.x}px depuis la gauche`);
    console.log(`- Largeur: ${box.width}px`);
    console.log(`- Espace à droite: ${rightSpace}px`);
    console.log(`- Visible: ${rightSpace >= 0 ? '✓' : '✗'}`);
    
    // Estimation avec 3 colonnes (240 + 200 + 225 = 665px environ)
    const estimatedFullWidth = 700; // Largeur approximative avec 3 colonnes
    const estimatedRightEdge = box.x + estimatedFullWidth;
    const estimatedRightSpace = screenWidth - estimatedRightEdge;
    
    console.log('\nEstimation avec 3 colonnes (700px):');
    console.log(`- Position: ${box.x}px depuis la gauche`);
    console.log(`- Largeur estimée: ${estimatedFullWidth}px`);
    console.log(`- Bord droit estimé: ${estimatedRightEdge}px`);
    console.log(`- Espace à droite estimé: ${estimatedRightSpace}px`);
    console.log(`- Restera visible: ${estimatedRightSpace >= 0 ? '✓' : '✗ Dépassera de ' + Math.abs(estimatedRightSpace) + 'px'}`);
    
    // Recommandation
    if (estimatedRightSpace < 50 && estimatedRightSpace >= 0) {
      console.log('\n⚠️  Attention: Marge droite faible avec 3 colonnes');
    } else if (estimatedRightSpace >= 50 && estimatedRightSpace <= 150) {
      console.log('\n✓ Position optimale: Menu visible avec marge raisonnable');
    } else if (estimatedRightSpace > 150) {
      console.log('\n⚠️  Menu pourrait être décalé plus à droite');
    }
  }
  
  // Screenshot
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-position-finale.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-position-finale.png');
  
  await browser.close();
})();