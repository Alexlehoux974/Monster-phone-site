const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test positionnement droit menu Accessoires ===\n');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  const dropdown = await page.locator('.absolute.top-full').first();
  const box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    const rightSpace = screenWidth - (box.x + box.width);
    
    console.log('Menu avec 1 colonne (Catégories):');
    console.log(`- Position gauche: ${box.x}px`);
    console.log(`- Position droite: ${box.x + box.width}px`);
    console.log(`- Largeur actuelle: ${box.width}px`);
    console.log(`- Espace à droite: ${rightSpace}px`);
    console.log(`- Visible: ${rightSpace >= 0 ? '✓' : '✗ Dépasse de ' + Math.abs(rightSpace) + 'px'}`);
    
    // Test avec 2 colonnes
    await page.hover('button:has-text("Batteries & Chargeurs")');
    await page.waitForTimeout(500);
    
    const box2 = await dropdown.boundingBox();
    if (box2) {
      const rightSpace2 = screenWidth - (box2.x + box2.width);
      console.log('\nMenu avec 2 colonnes (+ Marques):');
      console.log(`- Position gauche: ${box2.x}px`);
      console.log(`- Position droite: ${box2.x + box2.width}px`);
      console.log(`- Largeur actuelle: ${box2.width}px`);
      console.log(`- Espace à droite: ${rightSpace2}px`);
      console.log(`- Visible: ${rightSpace2 >= 0 ? '✓' : '✗ Dépasse de ' + Math.abs(rightSpace2) + 'px'}`);
    }
    
    // Test avec 3 colonnes
    try {
      await page.locator('.min-w-\\[200px] button:has-text("MONSTER")').first().hover({ timeout: 2000 });
      await page.waitForTimeout(500);
      
      const box3 = await dropdown.boundingBox();
      if (box3) {
        const rightSpace3 = screenWidth - (box3.x + box3.width);
        console.log('\nMenu avec 3 colonnes (+ Produits):');
        console.log(`- Position gauche: ${box3.x}px`);
        console.log(`- Position droite: ${box3.x + box3.width}px`); 
        console.log(`- Largeur totale: ${box3.width}px`);
        console.log(`- Espace à droite: ${rightSpace3}px`);
        console.log(`- Visible: ${rightSpace3 >= 0 ? '✓' : '✗ Dépasse de ' + Math.abs(rightSpace3) + 'px'}`);
        
        // Recommandation
        if (rightSpace3 < 0) {
          console.log('\n⚠️ Le menu dépasse à droite !');
        } else if (rightSpace3 > 0 && rightSpace3 < 30) {
          console.log('\n✓ Position correcte avec petite marge');
        } else if (rightSpace3 >= 30) {
          console.log('\n✓ Position parfaite avec marge confortable');
        }
      }
    } catch (e) {
      console.log('\n⚠️ Impossible de survoler MONSTER (peut-être hors écran)');
    }
  }
  
  // Screenshot
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-right-position.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-right-position.png');
  
  await browser.close();
})();