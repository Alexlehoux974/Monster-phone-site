const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  console.log('=== Test complet menu Accessoires avec 3 colonnes ===\n');
  
  // Ouvrir le menu Accessoires
  await page.hover('button:has-text("Accessoires")');
  await page.waitForTimeout(500);
  
  // Survoler "Batteries & Chargeurs" pour afficher la colonne des marques
  await page.hover('button:has-text("Batteries & Chargeurs")');
  await page.waitForTimeout(500);
  
  // Essayer de survoler MONSTER de différentes manières
  const monsterSelectors = [
    '.min-w-\\[200px] button:has-text("MONSTER")',
    'button:has-text("MONSTER")',
    'text=MONSTER',
    '//button[contains(text(), "MONSTER")]'
  ];
  
  let hovered = false;
  for (const selector of monsterSelectors) {
    try {
      console.log(`Tentative avec sélecteur: ${selector}`);
      await page.locator(selector).first().hover({ timeout: 1000 });
      await page.waitForTimeout(500);
      hovered = true;
      console.log('✓ MONSTER survolé avec succès');
      break;
    } catch (e) {
      console.log(`✗ Échec avec ce sélecteur`);
    }
  }
  
  // Vérifier les dimensions finales
  const dropdown = await page.locator('.absolute.top-full').first();
  const box = await dropdown.boundingBox();
  
  if (box) {
    const screenWidth = await page.evaluate(() => window.innerWidth);
    const rightSpace = screenWidth - (box.x + box.width);
    
    console.log('\n=== Résultats finaux ===');
    console.log(`Nombre de colonnes visibles: ${hovered ? '3 (toutes)' : '2'}`);
    console.log(`Position gauche: ${box.x}px`);
    console.log(`Position droite: ${box.x + box.width}px`);
    console.log(`Largeur totale: ${box.width}px`);
    console.log(`Espace à droite: ${rightSpace}px`);
    
    if (rightSpace < 0) {
      console.log(`\n❌ PROBLÈME: Le menu dépasse de ${Math.abs(rightSpace)}px à droite !`);
      console.log(`   Solution: Réduire translateX d'environ ${Math.abs(rightSpace) + 20}px`);
    } else if (rightSpace < 20) {
      console.log('\n⚠️ Marge droite insuffisante (< 20px)');
    } else if (rightSpace > 20 && rightSpace < 50) {
      console.log('\n✅ Position PARFAITE avec marge appropriée');
    } else if (rightSpace >= 50 && rightSpace < 200) {
      console.log('\n✅ Position correcte, marge confortable');
    } else {
      console.log('\n⚠️ Marge droite excessive, le menu pourrait être plus à droite');
    }
    
    // Estimation avec 3 colonnes si on n'a que 2
    if (!hovered && box.width < 600) {
      const estimatedWidth = 700; // Largeur avec 3 colonnes
      const estimatedRight = box.x + estimatedWidth;
      const estimatedRightSpace = screenWidth - estimatedRight;
      
      console.log('\n=== Estimation avec 3 colonnes (700px) ===');
      console.log(`Position droite estimée: ${estimatedRight}px`);
      console.log(`Espace à droite estimé: ${estimatedRightSpace}px`);
      
      if (estimatedRightSpace < 0) {
        console.log(`❌ Le menu dépasserait de ${Math.abs(estimatedRightSpace)}px`);
      } else if (estimatedRightSpace < 20) {
        console.log('⚠️ Marge droite serait insuffisante');
      } else {
        console.log('✅ Le menu devrait tenir avec 3 colonnes');
      }
    }
  }
  
  // Screenshot final
  await page.screenshot({ path: '/root/Monster-Phone-Images/test-3-columns-final.png' });
  console.log('\nScreenshot: /root/Monster-Phone-Images/test-3-columns-final.png');
  
  await browser.close();
})();