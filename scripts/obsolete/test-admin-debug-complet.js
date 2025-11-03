const { chromium } = require('playwright');

(async () => {
  console.log('🔐 Test DEBUG complet connexion admin...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capturer TOUS les logs console
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    const emoji = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '📝';
    console.log(`${emoji} [${type}] ${text}`);
  });

  // Capturer les erreurs réseau
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`🌐 HTTP ${response.status()}: ${response.url()}`);
    }
  });

  try {
    console.log('1️⃣ Navigation vers /admin/login...');
    await page.goto('https://monster-phone.re/admin/login', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('✅ Page de login chargée\n');

    console.log('2️⃣ Remplissage du formulaire...');
    await page.fill('input[type="email"]', 'alexlehoux@gmail.com');
    await page.fill('input[type="password"]', 'Monster@phone2025!');
    console.log('✅ Formulaire rempli\n');

    console.log('3️⃣ Soumission du formulaire et attente...');
    await page.click('button[type="submit"]');

    // Attendre 5 secondes pour voir TOUS les logs
    await page.waitForTimeout(5000);

    const currentUrl = page.url();
    console.log('\n📍 URL finale:', currentUrl);

    // Vérifier le localStorage
    const localStorage = await page.evaluate(() => {
      const items = {};
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.includes('supabase')) {
          items[key] = window.localStorage.getItem(key);
        }
      }
      return items;
    });

    console.log('\n💾 localStorage Supabase:', Object.keys(localStorage).length > 0 ? 'PRÉSENT' : 'VIDE');
    if (Object.keys(localStorage).length > 0) {
      for (const [key, value] of Object.entries(localStorage)) {
        console.log(`  - ${key}: ${value.substring(0, 50)}...`);
      }
    }

    if (currentUrl.includes('/admin/login')) {
      console.error('\n❌ ÉCHEC: Toujours sur la page de login (boucle de redirection)\n');
      await browser.close();
      process.exit(1);
    }

    if (currentUrl.includes('/admin') && !currentUrl.includes('/admin/login')) {
      console.log('\n✅ SUCCÈS: Connexion réussie et accès au dashboard admin!\n');
    }

    await browser.close();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Erreur durant le test:', error.message);
    await browser.close();
    process.exit(1);
  }
})();
