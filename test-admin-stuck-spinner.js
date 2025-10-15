const { chromium } = require('playwright');

(async () => {
  console.log('🔍 DIAGNOSTIC COMPLET - Spinner qui Tourne dans le Vide\n');
  console.log('=' .repeat(70));
  console.log('\n⚠️  Test avec les identifiants réels d\'Alexandre');
  console.log('   Observation de TOUTE la séquence de login\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capturer TOUT
  const events = [];

  page.on('request', request => {
    events.push({
      type: 'REQUEST',
      time: Date.now(),
      url: request.url(),
      method: request.method()
    });
  });

  page.on('response', async response => {
    events.push({
      type: 'RESPONSE',
      time: Date.now(),
      url: response.url(),
      status: response.status()
    });
  });

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('ADMIN') || text.includes('admin') || text.includes('auth') || text.includes('session')) {
      events.push({
        type: 'CONSOLE',
        time: Date.now(),
        level: msg.type(),
        text: text
      });
    }
  });

  console.log('📍 ÉTAPE 1: Navigation vers /admin/login\n');
  const startTime = Date.now();

  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);
  console.log('✅ Page chargée\n');

  console.log('📍 ÉTAPE 2: Remplissage du formulaire\n');
  console.log('   Email: alexandre@digiqo.fr');
  console.log('   Password: MonsterAdmin2025\n');

  await page.fill('input[type="email"]', 'alexandre@digiqo.fr');
  await page.fill('input[type="password"]', 'MonsterAdmin2025');

  console.log('📍 ÉTAPE 3: Clic sur le bouton "Se connecter"\n');

  // Nettoyer les événements
  events.length = 0;
  const clickTime = Date.now();

  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();
  await loginButton.click();

  console.log('⏳ Observation en temps réel (30 secondes):\n');

  // Observer TRÈS attentivement pendant 30 secondes
  for (let i = 1; i <= 30; i++) {
    await page.waitForTimeout(1000);

    const pageState = await page.evaluate(() => {
      // Détecter le spinner
      const hasSpinner = document.querySelector('[class*="animate-spin"]') !== null;

      // Détecter les erreurs
      const errorElements = Array.from(document.querySelectorAll('[class*="text-red"], [class*="error"]'));
      const errors = errorElements.map(el => el.innerText).filter(t => t && t.length > 0);

      // État du bouton
      const button = Array.from(document.querySelectorAll('button')).find(
        btn => btn.innerText.toLowerCase().includes('connecter') || btn.innerText.toLowerCase().includes('connexion')
      );

      // URL actuelle
      const currentUrl = window.location.href;

      // Détecter si on est sur la page admin (pas login)
      const onDashboard = currentUrl.includes('/admin') && !currentUrl.includes('/login');

      // Détecter un spinner ailleurs que dans le bouton
      const bodySpinners = Array.from(document.querySelectorAll('[class*="spin"]')).length;

      return {
        hasSpinner,
        errors,
        buttonText: button ? button.innerText : 'NO BUTTON',
        buttonDisabled: button ? button.disabled : false,
        currentUrl,
        onDashboard,
        spinnerCount: bodySpinners
      };
    });

    const elapsed = ((Date.now() - clickTime) / 1000).toFixed(1);

    // Icônes de statut
    const spinIcon = pageState.hasSpinner ? '🔄' : '✅';
    const urlShort = pageState.currentUrl.substring(pageState.currentUrl.lastIndexOf('/'));
    const errorTxt = pageState.errors.length > 0 ? ` ❌ ${pageState.errors[0].substring(0, 30)}` : '';

    console.log(`[${String(i).padStart(2)}s / +${elapsed}s] ${spinIcon} ${urlShort.padEnd(15)} | Btn: "${pageState.buttonText.substring(0, 15)}"${errorTxt}`);

    // Si on détecte le dashboard
    if (pageState.onDashboard) {
      console.log('\n🎉 SUCCÈS! Redirection vers le dashboard détectée!');
      break;
    }

    // Si spinner disparaît mais on reste sur login avec erreur
    if (!pageState.hasSpinner && pageState.errors.length > 0) {
      console.log('\n❌ Erreur détectée et spinner arrêté');
      break;
    }

    // Afficher un rapport intermédiaire toutes les 10 secondes
    if (i % 10 === 0) {
      console.log(`\n   📊 Rapport à ${i}s:`);
      console.log(`      Spinners visibles: ${pageState.spinnerCount}`);
      console.log(`      URL: ${pageState.currentUrl}`);
      console.log(`      Bouton disabled: ${pageState.buttonDisabled}`);

      // Compter les appels réseau récents
      const recentCalls = events.filter(e => e.time > clickTime);
      console.log(`      Événements réseau: ${recentCalls.length}\n`);
    }
  }

  // Analyse finale des événements
  console.log('\n' + '='.repeat(70));
  console.log('📊 ANALYSE DÉTAILLÉE DES ÉVÉNEMENTS\n');

  // Filtrer les événements pertinents
  const relevantEvents = events.filter(e =>
    e.type === 'CONSOLE' ||
    (e.url && (e.url.includes('/api/') || e.url.includes('supabase') || e.url.includes('auth')))
  );

  if (relevantEvents.length > 0) {
    console.log('Chronologie complète:\n');

    relevantEvents.forEach((event, index) => {
      const elapsed = ((event.time - clickTime) / 1000).toFixed(2);

      if (event.type === 'REQUEST') {
        console.log(`[+${elapsed}s] 📤 ${event.method} ${event.url.substring(30, 80)}`);
      } else if (event.type === 'RESPONSE') {
        console.log(`[+${elapsed}s] 📥 [${event.status}] ${event.url.substring(30, 80)}`);
      } else if (event.type === 'CONSOLE') {
        console.log(`[+${elapsed}s] 💬 ${event.level.toUpperCase()}: ${event.text.substring(0, 100)}`);
      }
    });
  } else {
    console.log('⚠️ AUCUN événement réseau ou console capturé!');
    console.log('   Cela suggère que le formulaire ne soumet peut-être pas...');
  }

  // État final très détaillé
  const finalState = await page.evaluate(() => {
    return {
      url: window.location.href,
      title: document.title,
      hasSpinner: document.querySelector('[class*="animate-spin"]') !== null,
      spinnerCount: document.querySelectorAll('[class*="spin"]').length,
      errors: Array.from(document.querySelectorAll('[class*="text-red"], [class*="error"]'))
        .map(el => el.innerText)
        .filter(t => t && t.length > 0),
      forms: document.querySelectorAll('form').length,
      buttons: Array.from(document.querySelectorAll('button')).map(b => ({
        text: b.innerText,
        disabled: b.disabled,
        type: b.type
      })),
      bodyClasses: document.body.className,
      hasAdminLayout: document.querySelector('[class*="admin"]') !== null ||
                     document.body.innerHTML.includes('Dashboard') ||
                     document.body.innerHTML.includes('Tableau de bord')
    };
  });

  console.log('\n' + '='.repeat(70));
  console.log('🎯 ÉTAT FINAL DE LA PAGE\n');
  console.log('URL finale:', finalState.url);
  console.log('Titre:', finalState.title);
  console.log('Spinner visible:', finalState.hasSpinner ? '🔄 OUI' : '✅ NON');
  console.log('Nombre total de spinners:', finalState.spinnerCount);
  console.log('Erreurs affichées:', finalState.errors.length > 0 ? finalState.errors.join(', ') : '(aucune)');
  console.log('Sur layout admin:', finalState.hasAdminLayout ? 'OUI' : 'NON');
  console.log('\nBoutons présents:');
  finalState.buttons.forEach((btn, i) => {
    console.log(`  ${i + 1}. "${btn.text}" (type: ${btn.type}, disabled: ${btn.disabled})`);
  });

  // Screenshots multiples
  await page.screenshot({ path: '/tmp/diagnosis-stuck-full.png', fullPage: true });
  console.log('\n📸 Screenshot complet: /tmp/diagnosis-stuck-full.png');

  // Screenshot juste de la zone du formulaire
  const formArea = await page.locator('form').first();
  if (formArea) {
    await formArea.screenshot({ path: '/tmp/diagnosis-stuck-form.png' });
    console.log('📸 Screenshot du formulaire: /tmp/diagnosis-stuck-form.png');
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n🏁 DIAGNOSTIC TERMINÉ\n');

  await browser.close();
})();
