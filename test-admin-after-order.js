const { chromium } = require('playwright');

(async () => {
  console.log('🧪 TEST ADMIN APRÈS COMMANDE\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Logs pour debug
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('Error') || msg.text().includes('timeout')) {
      console.log(`🔴 Console Error: ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`❌ Page Error: ${error.message}`);
  });

  console.log('📍 Étape 1: Login admin\n');
  try {
    await page.goto('https://monster-phone.re/admin/login', { timeout: 15000 });

    await page.fill('input[type="email"]', 'alexandre@digiqo.fr');
    await page.fill('input[type="password"]', 'MonsterAdmin2025');

    const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();
    await loginButton.click();

    await page.waitForURL('**/admin', { timeout: 10000 });
    console.log('✅ Login réussi\n');
  } catch (e) {
    console.log(`❌ Erreur login: ${e.message}\n`);
    await browser.close();
    return;
  }

  console.log('📍 Étape 2: Attente chargement dashboard (20s max)\n');
  const startTime = Date.now();

  try {
    // Attendre que le dashboard se charge (disparition du spinner)
    await page.waitForSelector('[class*="animate-spin"]', { state: 'detached', timeout: 20000 });

    const loadTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Dashboard chargé en ${loadTime}s\n`);

    // Vérifier le contenu
    const content = await page.evaluate(() => {
      return {
        hasStats: document.body.innerText.includes('Statistiques') ||
                  document.body.innerText.includes('Dashboard'),
        hasOrders: document.body.innerText.includes('Commandes') ||
                   document.body.innerText.includes('Orders'),
        url: window.location.href
      };
    });

    console.log('📊 Contenu détecté:');
    console.log(`   - Stats/Dashboard: ${content.hasStats ? '✅' : '❌'}`);
    console.log(`   - Commandes: ${content.hasOrders ? '✅' : '❌'}`);
    console.log(`   - URL: ${content.url}\n`);

  } catch (e) {
    const loadTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`❌ TIMEOUT après ${loadTime}s`);
    console.log(`   Le dashboard ne s'est pas chargé\n`);

    // Capture l'état actuel
    const state = await page.evaluate(() => {
      return {
        hasSpinner: !!document.querySelector('[class*="animate-spin"]'),
        bodyPreview: document.body.innerText.substring(0, 200),
        url: window.location.href
      };
    });

    console.log('📋 État actuel:');
    console.log(`   - Spinner actif: ${state.hasSpinner ? '🔄 OUI' : '✅ NON'}`);
    console.log(`   - URL: ${state.url}`);
    console.log(`   - Contenu: ${state.bodyPreview}...`);
  }

  console.log('\n📍 Étape 3: Test rafraîchissement page\n');
  try {
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log('✅ Rafraîchissement réussi\n');
  } catch (e) {
    console.log(`❌ Rafraîchissement bloqué: ${e.message}\n`);
  }

  await browser.close();
})();
