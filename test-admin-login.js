const { chromium } = require('playwright');

(async () => {
  console.log('🔐 Test de connexion admin...\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer les logs console
  page.on('console', msg => {
    if (msg.text().includes('[ADMIN') || msg.text().includes('session')) {
      console.log('📝 Console:', msg.text());
    }
  });

  try {
    // Aller sur la page de login
    console.log('1️⃣ Navigation vers /admin/login...');
    await page.goto('https://monster-phone.re/admin/login', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('✅ Page de login chargée\n');

    // Remplir le formulaire
    console.log('2️⃣ Remplissage du formulaire...');
    await page.fill('input[type="email"]', 'alexlehoux@gmail.com');
    await page.fill('input[type="password"]', 'Monster@phone2025!');
    console.log('✅ Formulaire rempli\n');

    // Cliquer sur le bouton de connexion
    console.log('3️⃣ Soumission du formulaire...');
    await page.click('button[type="submit"]');
    
    // Attendre la navigation
    await page.waitForURL(/\/admin/, { timeout: 10000 });
    const currentUrl = page.url();
    console.log('✅ Redirection effectuée vers:', currentUrl, '\n');

    // Vérifier qu'on n'est PAS sur /admin/login
    if (currentUrl.includes('/admin/login')) {
      console.error('❌ ÉCHEC: Toujours sur la page de login (boucle de redirection)\n');
      await browser.close();
      process.exit(1);
    }

    // Attendre un peu pour que la session se charge
    await page.waitForTimeout(2000);

    // Vérifier qu'on est bien sur le dashboard admin
    if (currentUrl.includes('/admin') && !currentUrl.includes('/admin/login')) {
      console.log('✅ SUCCÈS: Connexion réussie et accès au dashboard admin!\n');
      
      // Tester la navigation vers une autre page admin
      console.log('4️⃣ Test navigation vers /admin/stock...');
      await page.goto('https://monster-phone.re/admin/stock', {
        waitUntil: 'networkidle',
        timeout: 10000
      });
      
      const stockUrl = page.url();
      if (stockUrl.includes('/admin/stock')) {
        console.log('✅ Navigation /admin/stock réussie - session persistante!\n');
      } else if (stockUrl.includes('/admin/login')) {
        console.error('❌ Redirigé vers login - session non persistante\n');
        await browser.close();
        process.exit(1);
      }
    }

    await browser.close();
    console.log('🎉 Tous les tests passés avec succès!\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur durant le test:', error.message);
    await browser.close();
    process.exit(1);
  }
})();
