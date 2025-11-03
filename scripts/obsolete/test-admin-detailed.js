const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Test détaillé de la page /admin...\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer les erreurs console
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  // Capturer les erreurs réseau
  const networkErrors = [];
  page.on('requestfailed', request => {
    networkErrors.push({
      url: request.url(),
      failure: request.failure()
    });
  });

  try {
    console.log('📍 Navigation vers https://monster-phone.re/admin...');
    await page.goto('https://monster-phone.re/admin', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Attendre un peu pour que la page se charge
    await page.waitForTimeout(3000);

    // Analyser le contenu de la page
    const pageAnalysis = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        bodyText: document.body.innerText.substring(0, 1000),
        bodyHTML: document.body.innerHTML.substring(0, 2000),
        hasLoginForm: document.body.innerHTML.toLowerCase().includes('connexion') ||
                      document.body.innerHTML.toLowerCase().includes('login') ||
                      document.body.innerHTML.toLowerCase().includes('email'),
        hasSpinner: document.body.innerHTML.includes('spinner') ||
                    document.body.innerHTML.includes('loading') ||
                    document.querySelector('[class*="spin"]') !== null ||
                    document.querySelector('[class*="load"]') !== null,
        hasError: document.body.innerHTML.toLowerCase().includes('error') ||
                  document.body.innerHTML.toLowerCase().includes('erreur'),
        rootElement: document.getElementById('__next')?.innerHTML.substring(0, 500) || 'No #__next',
        mainElement: document.querySelector('main')?.innerHTML.substring(0, 500) || 'No main'
      };
    });

    console.log('✅ Page chargée:');
    console.log('   Titre:', pageAnalysis.title);
    console.log('   URL:', pageAnalysis.url);
    console.log('   A formulaire de login?', pageAnalysis.hasLoginForm ? '✅' : '❌');
    console.log('   A un spinner?', pageAnalysis.hasSpinner ? '⚠️ OUI' : '✅ NON');
    console.log('   A une erreur?', pageAnalysis.hasError ? '⚠️ OUI' : '✅ NON');

    console.log('\n📄 Contenu de la page:');
    console.log(pageAnalysis.bodyText);

    console.log('\n🔧 Élément #__next:');
    console.log(pageAnalysis.rootElement);

    console.log('\n🔧 Élément main:');
    console.log(pageAnalysis.mainElement);

    // Afficher les erreurs console
    if (consoleMessages.length > 0) {
      console.log('\n📊 Messages console (' + consoleMessages.length + '):');
      consoleMessages.slice(0, 10).forEach(msg => {
        console.log(`   [${msg.type}] ${msg.text}`);
      });
    }

    // Afficher les erreurs réseau
    if (networkErrors.length > 0) {
      console.log('\n⚠️ Erreurs réseau (' + networkErrors.length + '):');
      networkErrors.slice(0, 5).forEach(err => {
        console.log(`   ${err.url}`);
        console.log(`   → ${err.failure?.errorText || 'Unknown error'}`);
      });
    }

    await page.screenshot({ path: '/tmp/admin-detailed.png', fullPage: true });
    console.log('\n📸 Screenshot complet sauvegardé: /tmp/admin-detailed.png');

  } catch (error) {
    console.error('❌ Erreur lors du chargement:', error.message);
  }

  await browser.close();
})();
