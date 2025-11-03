const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Test du domaine de production principal...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Tester l'URL de production principale
  const productionUrl = 'https://monster-phone.re';

  console.log(`📍 Navigation vers ${productionUrl}...`);

  try {
    await page.goto(productionUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✅ Page chargée!');

    // Attendre que React monte les composants
    await page.waitForTimeout(3000);

    // Vérifier la présence de catégories
    const hasCategories = await page.evaluate(() => {
      const html = document.body.innerHTML;
      return {
        title: document.title,
        hasAccessoires: html.toLowerCase().includes('accessoires'),
        hasAudio: html.toLowerCase().includes('audio'),
        hasMontres: html.toLowerCase().includes('montres'),
        hasVercelLogin: html.includes('Log in to Vercel'),
        bodyText: document.body.innerText.substring(0, 500)
      };
    });

    console.log('\n📊 Contenu de la page:');
    console.log('Titre:', hasCategories.title);
    console.log('Page Vercel Login?', hasCategories.hasVercelLogin);
    console.log('A des catégories?', hasCategories.hasAccessoires || hasCategories.hasAudio || hasCategories.hasMontres);
    console.log('\nTexte visible (500 premiers chars):');
    console.log(hasCategories.bodyText);

    // Prendre un screenshot
    await page.screenshot({
      path: '/tmp/production-test.png',
      fullPage: false
    });
    console.log('\n📸 Screenshot: /tmp/production-test.png');

    // Vérifier les logs de console
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push(`${msg.type()}: ${msg.text()}`));

    await page.waitForTimeout(2000);

    if (consoleLogs.length > 0) {
      console.log('\n📝 Logs de console:');
      consoleLogs.forEach(log => console.log(log));
    }

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }

  await browser.close();
  console.log('\n✅ Test terminé!');
})();
