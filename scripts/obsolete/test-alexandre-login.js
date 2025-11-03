const { chromium } = require('playwright');

(async () => {
  console.log('🔐 TEST AVEC LES IDENTIFIANTS D\'ALEXANDRE\n');
  console.log('=' .repeat(70));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer les appels API
  const apiCalls = [];
  page.on('request', request => {
    if (request.url().includes('/api/') || request.url().includes('supabase')) {
      apiCalls.push({
        type: 'REQUEST',
        timestamp: Date.now(),
        url: request.url(),
        method: request.method(),
        postData: request.postData()
      });
    }
  });

  page.on('response', async response => {
    if (response.url().includes('/api/') || response.url().includes('supabase')) {
      let body = null;
      try {
        const contentType = response.headers()['content-type'];
        if (contentType && contentType.includes('application/json')) {
          body = await response.json();
        }
      } catch (e) {}

      apiCalls.push({
        type: 'RESPONSE',
        timestamp: Date.now(),
        url: response.url(),
        status: response.status(),
        body: body
      });
    }
  });

  console.log('📍 Navigation vers la page de login\n');
  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);

  console.log('📝 Remplissage avec les identifiants d\'Alexandre:\n');
  console.log('   Email: alexandre@digiqo.fr');
  console.log('   Password: MonsterAdmin2025\n');

  await page.fill('input[type="email"]', 'alexandre@digiqo.fr');
  await page.fill('input[type="password"]', 'MonsterAdmin2025');

  console.log('🚀 Soumission du formulaire...\n');

  // Nettoyer avant soumission
  apiCalls.length = 0;
  const startTime = Date.now();

  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();
  await loginButton.click();

  console.log('⏳ Observation pendant 20 secondes...\n');

  // Observer pendant 20 secondes
  for (let i = 1; i <= 20; i++) {
    await page.waitForTimeout(1000);

    const state = await page.evaluate(() => {
      const spinner = document.querySelector('[class*="animate-spin"]') !== null;
      const errorDiv = document.querySelector('[class*="text-red"]');
      const error = errorDiv ? errorDiv.innerText : null;
      const button = Array.from(document.querySelectorAll('button')).find(
        btn => btn.innerText.includes('Se connecter') || btn.innerText.includes('Connexion')
      );

      return {
        hasSpinner: spinner,
        errorMessage: error,
        buttonText: button ? button.innerText : null,
        url: window.location.href
      };
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const icon = state.hasSpinner ? '🔄' : '✅';
    const errorTxt = state.errorMessage ? ` ❌ ${state.errorMessage}` : '';

    console.log(`[${i}s / +${elapsed}s] ${icon} "${state.buttonText}"${errorTxt}`);

    // Si erreur détectée et spinner arrêté
    if (state.errorMessage && !state.hasSpinner) {
      console.log('\n✅ Erreur affichée, spinner arrêté');
      break;
    }

    // Si redirection
    if (state.url.includes('/admin') && !state.url.includes('/login')) {
      console.log('\n✅ Redirection vers dashboard!');
      break;
    }
  }

  // Analyse des appels API
  console.log('\n' + '='.repeat(70));
  console.log('📊 ANALYSE DES APPELS API\n');

  if (apiCalls.length > 0) {
    let lastRequestTime = startTime;

    apiCalls.forEach((call, index) => {
      const elapsed = ((call.timestamp - startTime) / 1000).toFixed(2);

      if (call.type === 'REQUEST') {
        console.log(`\n[+${elapsed}s] 📤 ${call.method} REQUEST`);
        console.log(`         ${call.url}`);
        if (call.postData) {
          console.log(`         Data: ${call.postData}`);
        }
        lastRequestTime = call.timestamp;
      } else {
        const responseTime = ((call.timestamp - lastRequestTime) / 1000).toFixed(2);
        console.log(`\n[+${elapsed}s] 📥 RESPONSE (took ${responseTime}s)`);
        console.log(`         Status: ${call.status}`);
        console.log(`         ${call.url}`);
        if (call.body) {
          console.log(`         Body: ${JSON.stringify(call.body)}`);
        }
      }
    });
  } else {
    console.log('⚠️ AUCUN appel API capturé');
  }

  // État final
  const finalState = await page.evaluate(() => {
    return {
      url: window.location.href,
      hasSpinner: document.querySelector('[class*="animate-spin"]') !== null,
      errorMessage: document.querySelector('[class*="text-red"]')?.innerText || null,
      buttonText: Array.from(document.querySelectorAll('button'))
        .find(btn => btn.innerText.includes('Se connecter') || btn.innerText.includes('Connexion'))
        ?.innerText || null
    };
  });

  console.log('\n' + '='.repeat(70));
  console.log('🎯 ÉTAT FINAL\n');
  console.log('  URL:', finalState.url);
  console.log('  Spinner actif:', finalState.hasSpinner ? '🔄 OUI' : '✅ NON');
  console.log('  Erreur affichée:', finalState.errorMessage || '(aucune)');
  console.log('  Bouton:', finalState.buttonText);

  await page.screenshot({ path: '/tmp/diagnosis-alexandre.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/diagnosis-alexandre.png');

  console.log('\n' + '='.repeat(70));
  console.log('\n🏁 Test terminé\n');

  await browser.close();
})();
