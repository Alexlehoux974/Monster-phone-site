const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test menu Accessoires complet (3 colonnes) ===');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  // Survoler Batteries & Chargeurs pour afficher la 2e colonne
  try {
    await page.hover('button:has-text("Batteries & Chargeurs")', { timeout: 2000 });
    await page.waitForTimeout(500);
    console.log('✓ Colonne Marques affichée');
  } catch (e) {
    console.log('✗ Impossible de survoler Batteries & Chargeurs');
  }
  
  // Vérifier la position avec juste 2 colonnes
  let dropdown = await page.locator('.absolute.top-full').first();
  let box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    console.log(`\nAvec 2 colonnes:`);
    console.log(`- Position: ${box.x}px depuis la gauche`);
    console.log(`- Largeur: ${box.width}px`);
    console.log(`- Bord droit: ${box.x + box.width}px`);
    console.log(`- Visible: ${box.x + box.width <= screenWidth ? '✓' : '✗ Dépasse de ' + ((box.x + box.width) - screenWidth) + 'px'}`);
  }
  
  // Essayer de survoler MONSTER pour afficher la 3e colonne
  try {
    // Utiliser un sélecteur plus spécifique
    await page.locator('.min-w-\\[200px] button:has-text("MONSTER")').first().hover({ timeout: 2000 });
    await page.waitForTimeout(500);
    console.log('✓ Colonne Produits affichée');
  } catch (e) {
    console.log('✗ Impossible de survoler MONSTER (peut-être hors écran)');
  }
  
  // Vérifier la position finale avec 3 colonnes
  dropdown = await page.locator('.absolute.top-full').first();
  box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    const rightEdge = box.x + box.width;
    
    console.log(`\nAvec 3 colonnes (si visibles):`);
    console.log(`- Position: ${box.x}px depuis la gauche`);
    console.log(`- Largeur totale: ${box.width}px`);
    console.log(`- Bord droit: ${rightEdge}px`);
    console.log(`- Espace à droite: ${screenWidth - rightEdge}px`);
    console.log(`- Menu complet visible: ${rightEdge <= screenWidth ? '✓' : '✗ Dépasse de ' + (rightEdge - screenWidth) + 'px'}`);
  }
  
  // Screenshot
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-accessoires-3columns.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-accessoires-3columns.png');
  
  await browser.close();
})();