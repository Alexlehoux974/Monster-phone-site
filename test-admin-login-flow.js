const { chromium } = require('playwright');

(async () => {
  console.log('🔐 TEST COMPLET DU FLUX DE CONNEXION ADMIN\n');
  console.log('=' .repeat(70));

  const browser = await chromium.launch({ headless: true }); // Mode headless pour environnement serveur
  const page = await browser.newPage();

  // Capturer TOUS les événements réseau
  const networkEvents = [];
  page.on('request', request => {
    if (request.url().includes('/api/') || request.url().includes('supabase')) {
      networkEvents.push({
        type: 'REQUEST',
        timestamp: new Date().toISOString(),
        url: request.url(),
        method: request.method(),
        postData: request.postData()
      });
    }
  });

  page.on('response', async response => {
    const url = response.url();
    if (url.includes('/api/') || url.includes('supabase')) {
      let responseBody = null;
      try {
        const contentType = response.headers()['content-type'];
        if (contentType && contentType.includes('application/json')) {
          responseBody = await response.json();
        }
      } catch (e) {
        // Ignore parsing errors
      }

      networkEvents.push({
        type: 'RESPONSE',
        timestamp: new Date().toISOString(),
        url: url,
        status: response.status(),
        statusText: response.statusText(),
        body: responseBody
      });
    }
  });

  // Capturer les logs console
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      timestamp: new Date().toISOString(),
      text: msg.text()
    });
  });

  // Aller sur la page de login
  console.log('\n📍 ÉTAPE 1: Navigation vers /admin/login\n');
  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);
  console.log('✅ Page chargée\n');

  // Vérifier que le formulaire est présent
  const hasForm = await page.evaluate(() => {
    return {
      hasEmailField: !!document.querySelector('input[type="email"]'),
      hasPasswordField: !!document.querySelector('input[type="password"]')
    };
  });

  if (!hasForm.hasEmailField || !hasForm.hasPasswordField) {
    console.log('❌ ERREUR: Formulaire de login incomplet!');
    await browser.close();
    return;
  }

  console.log('📍 ÉTAPE 2: Remplissage du formulaire\n');

  // Demander les identifiants réels à l'utilisateur
  console.log('⚠️  UTILISATION DES IDENTIFIANTS DE TEST');
  console.log('Email: admin@monsterphone.re');
  console.log('Password: (mot de passe test)');

  await page.fill('input[type="email"]', 'admin@monsterphone.re');
  await page.fill('input[type="password"]', 'Admin123!'); // Mot de passe de test

  console.log('\n📍 ÉTAPE 3: Soumission du formulaire et observation du spinner\n');

  // Nettoyer les événements réseau avant soumission
  networkEvents.length = 0;
  consoleLogs.length = 0;

  // Cliquer sur le bouton de connexion
  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();
  await loginButton.click();

  console.log('⏳ Clic effectué, observation du spinner pendant 15 secondes...\n');

  // Observer le spinner pendant 15 secondes
  for (let i = 1; i <= 15; i++) {
    await page.waitForTimeout(1000);

    const pageState = await page.evaluate(() => {
      // Chercher le spinner de plusieurs façons
      const hasSpinner =
        document.querySelector('[class*="spin"]') !== null ||
        document.querySelector('[class*="loading"]') !== null ||
        document.querySelector('[class*="loader"]') !== null ||
        document.querySelector('svg[class*="animate-spin"]') !== null;

      const hasError =
        document.body.innerHTML.toLowerCase().includes('erreur') ||
        document.body.innerHTML.toLowerCase().includes('error') ||
        document.body.innerHTML.toLowerCase().includes('invalid');

      const currentUrl = window.location.href;
      const isDashboard = currentUrl.includes('/admin') && !currentUrl.includes('/login');

      return {
        hasSpinner,
        hasError,
        currentUrl,
        isDashboard
      };
    });

    const spinnerIcon = pageState.hasSpinner ? '🔄' : '✅';
    const statusText = pageState.isDashboard ? '🎉 DASHBOARD' :
                      pageState.hasError ? '❌ ERREUR' :
                      pageState.hasSpinner ? '⏳ SPINNER' : '⏸️  ATTENTE';

    console.log(`[${i}s] ${spinnerIcon} ${statusText} | URL: ${pageState.currentUrl.substring(30)}`);

    // Si on arrive au dashboard, c'est gagné!
    if (pageState.isDashboard) {
      console.log('\n✅ ✅ ✅ SUCCÈS! Redirection vers le dashboard!\n');
      break;
    }

    // Si erreur détectée, arrêter l'observation
    if (pageState.hasError && !pageState.hasSpinner) {
      console.log('\n❌ Erreur détectée, arrêt de l\'observation\n');
      break;
    }
  }

  // Analyser les événements réseau
  console.log('\n' + '='.repeat(70));
  console.log('📍 ÉTAPE 4: Analyse des appels réseau\n');

  if (networkEvents.length > 0) {
    console.log(`📡 ${networkEvents.length} événements réseau enregistrés:\n`);

    networkEvents.forEach((event, index) => {
      if (event.type === 'REQUEST') {
        console.log(`\n[${index + 1}] 📤 REQUEST`);
        console.log(`    URL: ${event.url}`);
        console.log(`    Method: ${event.method}`);
        if (event.postData) {
          console.log(`    Data: ${event.postData.substring(0, 100)}`);
        }
      } else {
        console.log(`\n[${index + 1}] 📥 RESPONSE`);
        console.log(`    URL: ${event.url}`);
        console.log(`    Status: ${event.status} ${event.statusText}`);
        if (event.body) {
          console.log(`    Body: ${JSON.stringify(event.body).substring(0, 150)}`);
        }
      }
    });
  } else {
    console.log('⚠️ AUCUN événement réseau capturé!');
    console.log('   → Le bouton de connexion ne déclenche peut-être pas d\'appel API');
  }

  // Analyser les logs console
  console.log('\n' + '='.repeat(70));
  console.log('📍 ÉTAPE 5: Logs console JavaScript\n');

  const errorLogs = consoleLogs.filter(log => log.type === 'error');
  const warningLogs = consoleLogs.filter(log => log.type === 'warning');
  const importantLogs = consoleLogs.filter(log =>
    log.text.toLowerCase().includes('admin') ||
    log.text.toLowerCase().includes('auth') ||
    log.text.toLowerCase().includes('error')
  );

  if (errorLogs.length > 0) {
    console.log(`❌ ${errorLogs.length} erreurs JavaScript:\n`);
    errorLogs.forEach((log, index) => {
      console.log(`  [${index + 1}] ${log.text.substring(0, 200)}`);
    });
  }

  if (warningLogs.length > 0) {
    console.log(`\n⚠️  ${warningLogs.length} avertissements:\n`);
    warningLogs.slice(0, 5).forEach((log, index) => {
      console.log(`  [${index + 1}] ${log.text.substring(0, 200)}`);
    });
  }

  if (importantLogs.length > 0) {
    console.log(`\nℹ️  Logs importants (auth/admin):\n`);
    importantLogs.slice(0, 10).forEach((log, index) => {
      console.log(`  [${index + 1}] ${log.text.substring(0, 200)}`);
    });
  }

  // Screenshot final
  await page.screenshot({ path: '/tmp/diagnosis-login-flow.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/diagnosis-login-flow.png');

  console.log('\n' + '='.repeat(70));
  console.log('🏁 DIAGNOSTIC TERMINÉ\n');

  // Fermer le navigateur
  await browser.close();
  console.log('✅ Navigateur fermé');
})();
