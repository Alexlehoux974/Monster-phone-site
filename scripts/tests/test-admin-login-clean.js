const { chromium } = require('playwright');

(async () => {
  console.log('🔐 Test de connexion admin avec localStorage nettoyé...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.text().includes('[ADMIN') || msg.text().includes('session')) {
      console.log('📝 Console:', msg.text());
    }
  });

  try {
    console.log('1️⃣ Navigation vers /admin/login...');
    await page.goto('https://monster-phone.re/admin/login', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('✅ Page de login chargée\n');

    // NETTOYER LE LOCALSTORAGE AVANT DE SE CONNECTER
    console.log('🧹 Nettoyage du localStorage...');
    await page.evaluate(() => {
      localStorage.clear();
      console.log('localStorage nettoyé');
    });
    console.log('✅ localStorage nettoyé\n');

    console.log('2️⃣ Remplissage du formulaire...');
    await page.fill('input[type="email"]', 'alexlehoux@gmail.com');
    await page.fill('input[type="password"]', 'Monster@phone2025!');
    console.log('✅ Formulaire rempli\n');

    console.log('3️⃣ Soumission du formulaire...');
    await page.click('button[type="submit"]');
    
    await page.waitForURL(/\/admin/, { timeout: 10000 });
    const currentUrl = page.url();
    console.log('✅ Redirection effectuée vers:', currentUrl, '\n');

    if (currentUrl.includes('/admin/login')) {
      console.error('❌ ÉCHEC: Toujours sur la page de login (boucle de redirection)\n');
      await browser.close();
      process.exit(1);
    }

    if (currentUrl.includes('/admin') && !currentUrl.includes('/admin/login')) {
      console.log('✅ SUCCÈS: Connexion réussie et accès au dashboard admin!\n');
    }

    await browser.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur durant le test:', error.message);
    await browser.close();
    process.exit(1);
  }
})();
