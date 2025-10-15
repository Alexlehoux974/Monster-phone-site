const { chromium } = require('playwright');

(async () => {
  console.log('🔍 DIAGNOSTIC DÉTAILLÉ - Observation du Spinner Bloqué\n');
  console.log('=' .repeat(70));
  console.log('\n⚠️  Ce test va observer le comportement RÉEL pendant 30 secondes');
  console.log('   pour identifier EXACTEMENT où le code reste bloqué.\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer TOUS les appels réseau avec timing
  const networkTimeline = [];

  page.on('request', request => {
    networkTimeline.push({
      type: 'REQUEST',
      timestamp: Date.now(),
      url: request.url(),
      method: request.method()
    });
  });

  page.on('response', async response => {
    networkTimeline.push({
      type: 'RESPONSE',
      timestamp: Date.now(),
      url: response.url(),
      status: response.status()
    });
  });

  // Capturer les logs console avec catégories
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    // Filtrer les logs importants
    if (
      text.includes('admin') ||
      text.includes('auth') ||
      text.includes('session') ||
      text.includes('error') ||
      text.includes('ADMIN') ||
      text.includes('signIn')
    ) {
      consoleLogs.push({
        timestamp: Date.now(),
        type: msg.type(),
        text: text
      });
    }
  });

  // Aller sur la page de login
  console.log('📍 Navigation vers https://monster-phone.re/admin/login\n');
  const startTime = Date.now();

  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);
  console.log('✅ Page chargée\n');

  // Remplir avec des identifiants qui DEVRAIENT retourner une erreur claire
  console.log('📝 Remplissage du formulaire avec identifiants de test\n');
  await page.fill('input[type="email"]', 'admin@monsterphone.re');
  await page.fill('input[type="password"]', 'TestPassword123'); // Mot de passe volontairement incorrect

  console.log('🚀 Soumission du formulaire...\n');
  console.log('⏱️  OBSERVATION DÉTAILLÉE (30 secondes):\n');

  // Nettoyer les logs avant soumission
  networkTimeline.length = 0;
  consoleLogs.length = 0;

  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();
  const clickTime = Date.now();
  await loginButton.click();

  // Observer pendant 30 secondes avec logs détaillés
  for (let i = 1; i <= 30; i++) {
    await page.waitForTimeout(1000);

    const state = await page.evaluate(() => {
      // Chercher le spinner
      const spinnerExists =
        document.querySelector('[class*="animate-spin"]') !== null ||
        document.querySelector('[class*="spinner"]') !== null ||
        document.querySelector('[class*="loading"]') !== null;

      // Chercher le message d'erreur
      const errorElement = document.querySelector('[class*="text-red"]');
      const errorText = errorElement ? errorElement.innerText : '';

      // Chercher le bouton
      const button = Array.from(document.querySelectorAll('button')).find(
        btn => btn.innerText.includes('Se connecter') || btn.innerText.includes('Connexion')
      );
      const buttonText = button ? button.innerText : '';
      const buttonDisabled = button ? button.disabled : false;

      return {
        spinnerExists,
        errorText,
        buttonText,
        buttonDisabled,
        url: window.location.href
      };
    });

    // Calculer le temps écoulé depuis le clic
    const elapsed = Date.now() - clickTime;
    const elapsedSec = (elapsed / 1000).toFixed(1);

    // Afficher l'état actuel
    const spinnerIcon = state.spinnerExists ? '🔄' : '✅';
    const errorIcon = state.errorText ? '❌' : '  ';

    console.log(`[${i}s / +${elapsedSec}s] ${spinnerIcon} Button: "${state.buttonText}" ${errorIcon}${state.errorText ? ' ERROR: ' + state.errorText.substring(0, 40) : ''}`);

    // Si on détecte un message d'erreur ET plus de spinner, on peut arrêter
    if (state.errorText && !state.spinnerExists) {
      console.log('\n✅ Erreur détectée et affichée, spinner arrêté normalement');
      break;
    }

    // Si redirection vers dashboard
    if (state.url.includes('/admin') && !state.url.includes('/login')) {
      console.log('\n✅ Redirection vers dashboard réussie!');
      break;
    }

    // Après 10 secondes, afficher un résumé des appels réseau
    if (i === 10) {
      console.log('\n📊 RÉSUMÉ à 10s:');
      console.log(`   Appels réseau: ${networkTimeline.length}`);
      console.log(`   Logs console: ${consoleLogs.length}`);

      // Afficher les derniers appels réseau
      const recentCalls = networkTimeline.slice(-5);
      if (recentCalls.length > 0) {
        console.log('\n   📡 Derniers appels réseau:');
        recentCalls.forEach(call => {
          const time = ((call.timestamp - clickTime) / 1000).toFixed(2);
          console.log(`     [+${time}s] ${call.type} ${call.status || ''} ${call.url.substring(30, 80)}`);
        });
      }
      console.log('');
    }
  }

  // Analyse finale
  console.log('\n' + '='.repeat(70));
  console.log('📊 ANALYSE FINALE\n');

  // Timeline réseau complète
  console.log('📡 TIMELINE RÉSEAU (tous les appels):\n');
  if (networkTimeline.length > 0) {
    networkTimeline.forEach((event, index) => {
      const elapsed = ((event.timestamp - clickTime) / 1000).toFixed(2);
      const prefix = event.type === 'REQUEST' ? '📤' : '📥';
      const status = event.status ? `[${event.status}]` : '';

      // Afficher uniquement les appels admin/auth
      if (event.url.includes('/api/') || event.url.includes('supabase') || event.url.includes('auth')) {
        console.log(`  [+${elapsed}s] ${prefix} ${event.method || ''} ${status}`);
        console.log(`          ${event.url}`);
      }
    });
  } else {
    console.log('  ⚠️ AUCUN appel réseau capturé!');
  }

  // Logs console importants
  console.log('\n📝 LOGS CONSOLE (auth/admin):\n');
  if (consoleLogs.length > 0) {
    consoleLogs.forEach((log, index) => {
      const elapsed = ((log.timestamp - clickTime) / 1000).toFixed(2);
      console.log(`  [+${elapsed}s] ${log.type.toUpperCase()}: ${log.text.substring(0, 100)}`);
    });
  } else {
    console.log('  ℹ️  Aucun log console capturé');
  }

  // État final de la page
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

  console.log('\n🎯 ÉTAT FINAL:\n');
  console.log('  URL:', finalState.url);
  console.log('  Spinner actif:', finalState.hasSpinner ? '🔄 OUI' : '✅ NON');
  console.log('  Message d\'erreur:', finalState.errorMessage || '(aucun)');
  console.log('  Texte du bouton:', finalState.buttonText);

  // Screenshot
  await page.screenshot({ path: '/tmp/diagnosis-spinner-blocked.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/diagnosis-spinner-blocked.png');

  console.log('\n' + '='.repeat(70));

  await browser.close();
  console.log('\n✅ Test terminé\n');
})();
