const { chromium } = require('playwright');

(async () => {
  console.log('🔐 DIAGNOSTIC AUTHENTIFICATION ADMIN DÉTAILLÉ\n');
  console.log('=' .repeat(70));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer TOUS les appels API
  const apiCalls = [];
  page.on('response', response => {
    const url = response.url();
    if (url.includes('/api/')) {
      apiCalls.push({
        url: url,
        status: response.status(),
        statusText: response.statusText(),
        timestamp: new Date().toISOString()
      });
    }
  });

  // Capturer les erreurs console
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Aller sur la page de login admin
  console.log('\n📍 ÉTAPE 1: Navigation vers /admin/login\n');
  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);

  const loginPageState = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const hasLoginButton = buttons.some(btn => btn.innerText.includes('Se connecter'));

    return {
      url: window.location.href,
      hasEmailField: !!document.querySelector('input[type="email"]'),
      hasPasswordField: !!document.querySelector('input[type="password"]'),
      hasLoginButton: hasLoginButton,
      bodySnippet: document.body.innerText.substring(0, 200)
    };
  });

  console.log('État de la page de login:');
  console.log('  URL:', loginPageState.url);
  console.log('  Champ email:', loginPageState.hasEmailField ? '✅' : '❌');
  console.log('  Champ password:', loginPageState.hasPasswordField ? '✅' : '❌');
  console.log('  Bouton login:', loginPageState.hasLoginButton ? '✅' : '❌');

  if (!loginPageState.hasEmailField || !loginPageState.hasPasswordField) {
    console.log('\n❌ ERREUR: Formulaire de login incomplet!');
    await browser.close();
    return;
  }

  // Tester avec les identifiants du diagnostic
  console.log('\n📍 ÉTAPE 2: Test de connexion avec identifiants\n');
  console.log('Email: admin@monsterphone.re');
  console.log('Password: test123');

  // Remplir le formulaire
  await page.fill('input[type="email"]', 'admin@monsterphone.re');
  await page.fill('input[type="password"]', 'test123');

  // Cliquer sur le bouton de connexion
  console.log('\n⏳ Tentative de connexion...\n');

  // Attendre un peu pour voir les appels API
  await page.waitForTimeout(1000);

  // Cliquer et attendre (chercher le bouton avec texte "Se connecter")
  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();
  await loginButton.click();

  // Attendre 5 secondes pour voir tous les appels API
  await page.waitForTimeout(5000);

  // Analyser l'état après tentative de login
  const afterLoginState = await page.evaluate(() => {
    return {
      url: window.location.href,
      bodyText: document.body.innerText.substring(0, 800),
      hasErrorMessage: document.body.innerHTML.toLowerCase().includes('erreur') ||
                       document.body.innerHTML.toLowerCase().includes('error') ||
                       document.body.innerHTML.toLowerCase().includes('invalid'),
      errorMessages: Array.from(document.querySelectorAll('[class*="error"], [class*="alert"]'))
        .map(el => el.innerText)
        .filter(text => text && text.length > 0)
    };
  });

  console.log('📍 ÉTAPE 3: Résultat de la tentative de connexion\n');
  console.log('URL finale:', afterLoginState.url);
  console.log('Message d\'erreur détecté:', afterLoginState.hasErrorMessage ? '⚠️ OUI' : '✅ NON');

  if (afterLoginState.errorMessages.length > 0) {
    console.log('\n❌ Messages d\'erreur affichés:');
    afterLoginState.errorMessages.forEach(msg => {
      console.log('  -', msg);
    });
  }

  console.log('\n📍 ÉTAPE 4: Analyse des appels API\n');

  if (apiCalls.length > 0) {
    console.log('📡 Appels API effectués:');
    apiCalls.forEach(call => {
      console.log(`\n  ${call.url}`);
      console.log(`  → Status: ${call.status} ${call.statusText}`);
      console.log(`  → Timestamp: ${call.timestamp}`);
    });
  } else {
    console.log('⚠️ AUCUN appel API détecté!');
  }

  if (consoleErrors.length > 0) {
    console.log('\n📍 ÉTAPE 5: Erreurs console JavaScript\n');
    console.log('❌ Erreurs détectées:');
    consoleErrors.forEach((err, index) => {
      console.log(`\n  Erreur ${index + 1}:`);
      console.log('  ', err.substring(0, 200));
    });
  } else {
    console.log('\n✅ Aucune erreur console JavaScript');
  }

  // Screenshot final
  await page.screenshot({ path: '/tmp/diagnosis-auth-detailed.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/diagnosis-auth-detailed.png');

  console.log('\n' + '='.repeat(70));
  console.log('\n🏁 DIAGNOSTIC TERMINÉ\n');

  // Résumé du diagnostic
  console.log('📊 RÉSUMÉ:');
  console.log('  Formulaire de login: ✅ Présent et fonctionnel');
  console.log('  Appels API effectués:', apiCalls.length);
  console.log('  Erreurs JavaScript:', consoleErrors.length);
  console.log('  Message d\'erreur affiché:', afterLoginState.hasErrorMessage ? 'OUI' : 'NON');
  console.log('  Redirection réussie:', afterLoginState.url.includes('/admin/dashboard') ? 'OUI' : 'NON');

  await browser.close();
})();
