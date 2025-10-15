const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Test d\u00e9taill\u00e9 du header sur monster-phone.re...\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://monster-phone.re', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Attendre explicitement le header
  await page.waitForSelector('header', { timeout: 10000 });

  // Analyse détaillée du DOM
  const headerAnalysis = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return { error: 'Header not found' };

    // Récupérer tout le contenu du header
    const headerHTML = header.innerHTML;
    const headerText = header.innerText;

    // Chercher spécifiquement les menus de navigation
    const navElements = Array.from(header.querySelectorAll('nav, [role="navigation"], a, button'));
    const menuItems = navElements.map(el => ({
      tag: el.tagName,
      text: el.innerText?.trim() || el.textContent?.trim(),
      href: el.href || null,
      className: el.className,
      hasDropdown: el.querySelector('svg, [data-dropdown]') !== null
    })).filter(item => item.text && item.text.length > 0);

    // Vérifier les liens de catégories spécifiques
    const categoryLinks = {
      smartphones: header.innerHTML.toLowerCase().includes('smartphones'),
      tablettes: header.innerHTML.toLowerCase().includes('tablettes'),
      montres: header.innerHTML.toLowerCase().includes('montres'),
      audio: header.innerHTML.toLowerCase().includes('audio'),
      led: header.innerHTML.toLowerCase().includes('led'),
      accessoires: header.innerHTML.toLowerCase().includes('accessoires')
    };

    return {
      headerExists: true,
      headerTextLength: headerText.length,
      headerHTMLLength: headerHTML.length,
      menuItemsCount: menuItems.length,
      menuItems: menuItems.slice(0, 20), // Limiter à 20 premiers éléments
      categoryLinks,
      headerTextSnippet: headerText.substring(0, 500)
    };
  });

  console.log('📊 Analyse du Header:');
  console.log('   Header existe:', headerAnalysis.headerExists);
  console.log('   Longueur HTML:', headerAnalysis.headerHTMLLength, 'caractères');
  console.log('   Longueur texte:', headerAnalysis.headerTextLength, 'caractères');
  console.log('   Nombre d\'éléments menu:', headerAnalysis.menuItemsCount);
  console.log('\n🔗 Liens de catégories détectés dans le HTML:');
  console.log('   Smartphones:', headerAnalysis.categoryLinks.smartphones ? '✅' : '❌');
  console.log('   Tablettes:', headerAnalysis.categoryLinks.tablettes ? '✅' : '❌');
  console.log('   Montres:', headerAnalysis.categoryLinks.montres ? '✅' : '❌');
  console.log('   Audio:', headerAnalysis.categoryLinks.audio ? '✅' : '❌');
  console.log('   LED:', headerAnalysis.categoryLinks.led ? '✅' : '❌');
  console.log('   Accessoires:', headerAnalysis.categoryLinks.accessoires ? '✅' : '❌');

  console.log('\n📝 Éléments de menu trouvés:');
  headerAnalysis.menuItems.forEach((item, index) => {
    if (item.text.length < 50) { // Afficher seulement les textes courts (menus)
      console.log(`   ${index + 1}. [${item.tag}] "${item.text}"`);
    }
  });

  console.log('\n📄 Texte du header (extrait):');
  console.log(headerAnalysis.headerTextSnippet);

  // Vérifier aussi les console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await page.screenshot({ path: '/tmp/header-detailed-test.png', fullPage: false });
  console.log('\n📸 Screenshot sauvegardé: /tmp/header-detailed-test.png');

  if (consoleErrors.length > 0) {
    console.log('\n⚠️ Erreurs console détectées:');
    consoleErrors.forEach(err => console.log('   -', err));
  }

  await browser.close();
})();
