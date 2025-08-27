const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test alignement menu Accessoires ===\n');
  
  // Obtenir la position du bouton Accessoires
  const button = await page.locator('button:has-text("Accessoires")');
  const buttonBox = await button.boundingBox();
  
  if (buttonBox) {
    console.log('Position bouton Accessoires:');
    console.log(`- Position gauche: ${buttonBox.x}px`);
    console.log(`- Position droite: ${buttonBox.x + buttonBox.width}px`);
    console.log(`- Largeur: ${buttonBox.width}px`);
  }
  
  // Ouvrir le menu
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  const dropdown = await page.locator('.absolute.top-full').first();
  const dropdownBox = await dropdown.boundingBox();
  
  if (dropdownBox) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    
    console.log('\nPosition menu dropdown (1 colonne):');
    console.log(`- Position gauche: ${dropdownBox.x}px`);
    console.log(`- Position droite: ${dropdownBox.x + dropdownBox.width}px`);
    console.log(`- Largeur: ${dropdownBox.width}px`);
    console.log(`- Aligné sous le bouton: ${Math.abs(dropdownBox.x - buttonBox.x) < 5 ? '✓' : '✗ (décalage de ' + (dropdownBox.x - buttonBox.x) + 'px)'}`);
    
    // Ouvrir 2 colonnes
    await page.hover('button:has-text("Batteries & Chargeurs")');
    await page.waitForTimeout(500);
    
    const dropdownBox2 = await dropdown.boundingBox();
    if (dropdownBox2) {
      const rightSpace2 = screenWidth - (dropdownBox2.x + dropdownBox2.width);
      console.log('\nAvec 2 colonnes:');
      console.log(`- Largeur: ${dropdownBox2.width}px`);
      console.log(`- Bord droit: ${dropdownBox2.x + dropdownBox2.width}px`);
      console.log(`- Espace à droite: ${rightSpace2}px`);
      console.log(`- Visible: ${rightSpace2 >= 0 ? '✓' : '✗ Dépasse de ' + Math.abs(rightSpace2) + 'px'}`);
    }
    
    // Essayer 3 colonnes
    try {
      await page.locator('button:has-text("MONSTER")').first().hover({ timeout: 2000 });
      await page.waitForTimeout(500);
      
      const dropdownBox3 = await dropdown.boundingBox();
      if (dropdownBox3) {
        const rightSpace3 = screenWidth - (dropdownBox3.x + dropdownBox3.width);
        console.log('\nAvec 3 colonnes:');
        console.log(`- Largeur: ${dropdownBox3.width}px`);
        console.log(`- Bord droit: ${dropdownBox3.x + dropdownBox3.width}px`);
        console.log(`- Espace à droite: ${rightSpace3}px`);
        console.log(`- Visible: ${rightSpace3 >= 0 ? '✓' : '✗ Dépasse de ' + Math.abs(rightSpace3) + 'px'}`);
        
        if (rightSpace3 < 0) {
          console.log('\n⚠️ Solution nécessaire: Le menu dépasse à droite');
          console.log('Options possibles:');
          console.log('1. Réduire la largeur des colonnes');
          console.log('2. Utiliser un scroll horizontal');
          console.log('3. Repositionner dynamiquement le menu');
        }
      }
    } catch (e) {
      console.log('\n⚠️ Impossible d\'ouvrir la 3e colonne');
    }
  }
  
  // Screenshot
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-alignement.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-alignement.png');
  
  await browser.close();
})();