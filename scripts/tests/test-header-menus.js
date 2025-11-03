const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Lancement du test Playwright...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Naviguer vers la page
  console.log('📍 Navigation vers la page de production...');
  await page.goto('https://monster-phone-boutique-avb42lem3-alexs-projects-601e6017.vercel.app', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  console.log('✅ Page chargée!');

  // Attendre que les composants React soient montés
  await page.waitForTimeout(3000);

  // Vérifier les erreurs de console
  console.log('\n📊 Vérification des erreurs de console...');
  const logs = await page.evaluate(() => {
    return {
      errors: window.console._errors || [],
      hasMultipleGoTrueClient: document.body.innerHTML.includes('Multiple GoTrueClient')
    };
  });

  // Prendre un snapshot de l'accessibilité pour voir la structure du menu
  console.log('\n🔍 Analyse de la structure du menu...');
  const snapshot = await page.accessibility.snapshot();

  // Fonction récursive pour trouver les menus
  function findMenus(node, depth = 0) {
    if (!node) return [];

    const results = [];
    const indent = '  '.repeat(depth);

    // Chercher les éléments de menu
    if (node.name && (
      node.name.toLowerCase().includes('menu') ||
      node.name.toLowerCase().includes('navigation') ||
      node.name.toLowerCase().includes('accessoires') ||
      node.name.toLowerCase().includes('audio') ||
      node.name.toLowerCase().includes('montres')
    )) {
      results.push(`${indent}✓ ${node.role}: ${node.name}`);
    }

    // Récursion sur les enfants
    if (node.children) {
      for (const child of node.children) {
        results.push(...findMenus(child, depth + 1));
      }
    }

    return results;
  }

  const menuItems = findMenus(snapshot);

  if (menuItems.length > 0) {
    console.log('✅ Menus de navigation trouvés:');
    menuItems.forEach(item => console.log(item));
  } else {
    console.log('❌ Aucun menu de navigation trouvé!');
  }

  // Vérifier la présence de catégories dans la page
  console.log('\n🔍 Vérification du contenu HTML...');
  const hasCategories = await page.evaluate(() => {
    const html = document.body.innerHTML;
    return {
      hasAccessoires: html.includes('Accessoires'),
      hasAudio: html.includes('Audio'),
      hasMontres: html.includes('Montres'),
      hasMenuStructure: html.includes('menuStructure') || html.includes('category')
    };
  });

  console.log('Catégories présentes:', hasCategories);

  // Prendre un screenshot pour inspection visuelle
  console.log('\n📸 Capture d\'écran...');
  await page.screenshot({
    path: '/tmp/header-test.png',
    fullPage: false
  });
  console.log('Screenshot sauvegardé: /tmp/header-test.png');

  // Fermer le navigateur
  await browser.close();

  console.log('\n✅ Test terminé!');

  // Résumé final
  console.log('\n📋 RÉSUMÉ:');
  console.log(`- Menus trouvés: ${menuItems.length > 0 ? 'OUI ✅' : 'NON ❌'}`);
  console.log(`- Catégories dans HTML: ${hasCategories.hasAccessoires || hasCategories.hasAudio ? 'OUI ✅' : 'NON ❌'}`);

  process.exit(menuItems.length > 0 ? 0 : 1);
})();
