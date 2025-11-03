const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Test du spinner admin avec attente prolongée...\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer TOUS les logs console
  const consoleMessages = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push({
      type: msg.type(),
      text: text,
      timestamp: new Date().toISOString()
    });
    console.log(`[${msg.type().toUpperCase()}] ${text}`);
  });

  // Capturer les erreurs réseau
  const networkErrors = [];
  page.on('requestfailed', request => {
    const error = {
      url: request.url(),
      failure: request.failure()?.errorText || 'Unknown',
      timestamp: new Date().toISOString()
    };
    networkErrors.push(error);
    console.log(`[NETWORK ERROR] ${error.url} → ${error.failure}`);
  });

  // Capturer les réponses API
  page.on('response', response => {
    const url = response.url();
    if (url.includes('/api/admin')) {
      console.log(`[API RESPONSE] ${url} → Status: ${response.status()}`);
    }
  });

  try {
    console.log('📍 Navigation vers https://monster-phone.re/admin...\n');

    const startTime = Date.now();

    await page.goto('https://monster-phone.re/admin', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log(`\n⏱️  Temps de chargement initial: ${Date.now() - startTime}ms\n`);

    // Attendre 15 secondes pour observer le comportement
    console.log('⏳ Attente de 15 secondes pour observer le spinner...\n');

    for (let i = 0; i < 15; i++) {
      await page.waitForTimeout(1000);

      const pageState = await page.evaluate(() => {
        const hasSpinner = document.querySelector('[class*="spin"]') !== null ||
                          document.querySelector('[class*="animate-spin"]') !== null;
        const hasLoginForm = document.body.innerHTML.toLowerCase().includes('connexion') ||
                            document.body.innerHTML.toLowerCase().includes('se connecter');
        const currentUrl = window.location.href;

        return {
          hasSpinner,
          hasLoginForm,
          currentUrl,
          bodyLength: document.body.innerHTML.length
        };
      });

      console.log(`[${i + 1}s] URL: ${pageState.currentUrl}`);
      console.log(`      Spinner: ${pageState.hasSpinner ? '🔄 OUI' : '✅ NON'}`);
      console.log(`      Login Form: ${pageState.hasLoginForm ? '✅ OUI' : '❌ NON'}`);
      console.log(`      Body HTML: ${pageState.bodyLength} chars\n`);

      // Si on détecte un changement, arrêter l'observation
      if (!pageState.hasSpinner && pageState.hasLoginForm) {
        console.log('✅ Formulaire de connexion détecté!\n');
        break;
      }
    }

    // État final
    const finalState = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        hasSpinner: document.querySelector('[class*="spin"]') !== null,
        hasLoginForm: document.body.innerHTML.toLowerCase().includes('se connecter'),
        bodyText: document.body.innerText.substring(0, 500)
      };
    });

    console.log('📊 État final après 15 secondes:');
    console.log('   Titre:', finalState.title);
    console.log('   URL:', finalState.url);
    console.log('   Spinner présent:', finalState.hasSpinner ? '🔄 OUI (PROBLÈME!)' : '✅ NON');
    console.log('   Formulaire login:', finalState.hasLoginForm ? '✅ OUI' : '❌ NON (PROBLÈME!)');
    console.log('\n   Texte visible:');
    console.log(finalState.bodyText);

    await page.screenshot({ path: '/tmp/admin-spinner-final.png', fullPage: true });
    console.log('\n📸 Screenshot final: /tmp/admin-spinner-final.png');

    // Résumé des logs console
    if (consoleMessages.length > 0) {
      console.log('\n📋 Résumé des logs console (' + consoleMessages.length + ' messages):');
      consoleMessages.forEach(msg => {
        console.log(`   [${msg.type}] ${msg.text.substring(0, 100)}`);
      });
    }

    // Résumé des erreurs réseau
    if (networkErrors.length > 0) {
      console.log('\n⚠️  Erreurs réseau (' + networkErrors.length + '):');
      networkErrors.forEach(err => {
        console.log(`   ${err.url}`);
        console.log(`   → ${err.failure}`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }

  await browser.close();
  console.log('\n🏁 Test terminé!');
})();
