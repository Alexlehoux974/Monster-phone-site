const { chromium } = require('playwright');

(async () => {
  console.log('🔍 DIAGNOSTIC COMPLET DU SITE\n');
  console.log('=' .repeat(60));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Test 1: Page d'accueil et menus
  console.log('\n📍 TEST 1: PAGE D\'ACCUEIL ET MENUS HEADER\n');

  await page.goto('https://monster-phone.re', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  const headerState = await page.evaluate(() => {
    const header = document.querySelector('header');
    const menuButtons = Array.from(document.querySelectorAll('header button, header a')).filter(el => {
      const text = el.innerText?.toLowerCase() || '';
      return ['smartphones', 'tablettes', 'montres', 'audio', 'led', 'accessoires'].some(cat => text.includes(cat));
    });

    return {
      headerExists: !!header,
      headerHTML: header?.innerHTML.substring(0, 1000) || 'NO HEADER',
      menuCount: menuButtons.length,
      menuTexts: menuButtons.map(btn => btn.innerText?.trim()).filter(t => t && t.length < 50),
      hasSmartphones: header?.innerHTML.toLowerCase().includes('smartphones') || false,
      hasTablettes: header?.innerHTML.toLowerCase().includes('tablettes') || false,
      hasMontres: header?.innerHTML.toLowerCase().includes('montres') || false,
      hasAudio: header?.innerHTML.toLowerCase().includes('audio') || false,
      hasLED: header?.innerHTML.toLowerCase().includes('led') || false,
      hasAccessoires: header?.innerHTML.toLowerCase().includes('accessoires') || false
    };
  });

  console.log('État du Header:');
  console.log('  Header existe:', headerState.headerExists ? '✅' : '❌');
  console.log('  Nombre de menus détectés:', headerState.menuCount);
  console.log('\nMenus dans le HTML:');
  console.log('  📱 Smartphones:', headerState.hasSmartphones ? '✅' : '❌');
  console.log('  📱 Tablettes:', headerState.hasTablettes ? '✅' : '❌');
  console.log('  ⌚ Montres:', headerState.hasMontres ? '✅' : '❌');
  console.log('  🎧 Audio:', headerState.hasAudio ? '✅' : '❌');
  console.log('  💡 LED:', headerState.hasLED ? '✅' : '❌');
  console.log('  🔧 Accessoires:', headerState.hasAccessoires ? '✅' : '❌');

  if (headerState.menuTexts.length > 0) {
    console.log('\nTextes des menus trouvés:');
    headerState.menuTexts.forEach(text => {
      console.log('  -', text);
    });
  }

  await page.screenshot({ path: '/tmp/diagnosis-homepage.png', fullPage: false });
  console.log('\n📸 Screenshot: /tmp/diagnosis-homepage.png');

  // Test 2: Page Admin avec tentative de login
  console.log('\n' + '='.repeat(60));
  console.log('\n📍 TEST 2: PAGE ADMIN ET AUTHENTIFICATION\n');

  const adminPage = await browser.newPage();

  // Capturer les erreurs console
  const adminErrors = [];
  adminPage.on('console', msg => {
    if (msg.type() === 'error') {
      adminErrors.push(msg.text());
    }
  });

  // Capturer les requêtes API
  const apiCalls = [];
  adminPage.on('response', response => {
    const url = response.url();
    if (url.includes('/api/admin')) {
      apiCalls.push({
        url: url,
        status: response.status(),
        statusText: response.statusText()
      });
    }
  });

  await adminPage.goto('https://monster-phone.re/admin', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await adminPage.waitForTimeout(2000);

  const adminState = await adminPage.evaluate(() => {
    return {
      url: window.location.href,
      hasLoginForm: document.body.innerHTML.toLowerCase().includes('se connecter'),
      hasEmailField: !!document.querySelector('input[type="email"]'),
      hasPasswordField: !!document.querySelector('input[type="password"]'),
      hasSpinner: !!document.querySelector('[class*="spin"]'),
      bodySnippet: document.body.innerText.substring(0, 300)
    };
  });

  console.log('État de la page Admin:');
  console.log('  URL finale:', adminState.url);
  console.log('  Formulaire login:', adminState.hasLoginForm ? '✅' : '❌');
  console.log('  Champ email:', adminState.hasEmailField ? '✅' : '❌');
  console.log('  Champ password:', adminState.hasPasswordField ? '✅' : '❌');
  console.log('  Spinner présent:', adminState.hasSpinner ? '⚠️  OUI' : '✅ NON');

  // Tester la connexion avec des identifiants
  if (adminState.hasEmailField && adminState.hasPasswordField) {
    console.log('\n🔐 Test de connexion avec identifiants...');

    // Remplir le formulaire (utilisez vos vrais identifiants si vous voulez tester)
    await adminPage.fill('input[type="email"]', 'admin@monsterphone.re');
    await adminPage.fill('input[type="password"]', 'test123');

    // Cliquer sur le bouton de connexion
    await adminPage.click('button:has-text("Se connecter")');

    // Attendre la réponse
    await adminPage.waitForTimeout(3000);

    const afterLogin = await adminPage.evaluate(() => {
      return {
        url: window.location.href,
        bodyText: document.body.innerText.substring(0, 500),
        hasError: document.body.innerHTML.toLowerCase().includes('erreur') ||
                  document.body.innerHTML.toLowerCase().includes('error') ||
                  document.body.innerHTML.toLowerCase().includes('invalid')
      };
    });

    console.log('\nRésultat après tentative de connexion:');
    console.log('  URL:', afterLogin.url);
    console.log('  Message d\'erreur détecté:', afterLogin.hasError ? '⚠️  OUI' : '✅ NON');
    console.log('  Contenu:', afterLogin.bodyText.substring(0, 200));
  }

  if (apiCalls.length > 0) {
    console.log('\n📡 Appels API Admin détectés:');
    apiCalls.forEach(call => {
      console.log(`  ${call.url}`);
      console.log(`  → Status: ${call.status} ${call.statusText}`);
    });
  } else {
    console.log('\n⚠️  AUCUN appel API /api/admin détecté!');
  }

  if (adminErrors.length > 0) {
    console.log('\n❌ Erreurs console sur page admin:');
    adminErrors.slice(0, 5).forEach(err => {
      console.log('  -', err.substring(0, 100));
    });
  }

  await adminPage.screenshot({ path: '/tmp/diagnosis-admin.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/diagnosis-admin.png');

  // Test 3: Vérifier l'API admin directement
  console.log('\n' + '='.repeat(60));
  console.log('\n📍 TEST 3: API ADMIN DIRECTE\n');

  const apiPage = await browser.newPage();

  try {
    const response = await apiPage.goto('https://monster-phone.re/api/admin/verify', {
      timeout: 10000
    });

    console.log('Test de l\'API /api/admin/verify:');
    console.log('  Status:', response.status());
    console.log('  Status Text:', response.statusText());

    if (response.status() === 405) {
      console.log('  ℹ️  Status 405 = Method Not Allowed (normal, cette API nécessite POST)');
    } else if (response.status() === 500) {
      console.log('  ⚠️  Status 500 = Erreur serveur (problème de configuration!)');
    }
  } catch (error) {
    console.log('  ❌ Erreur d\'accès à l\'API:', error.message);
  }

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('\n🏁 DIAGNOSTIC TERMINÉ\n');
})();
