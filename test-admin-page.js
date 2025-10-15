const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Test de la page Admin...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const adminUrl = 'https://monster-phone.re/admin';

  console.log(`📍 Navigation vers ${adminUrl}...`);

  await page.goto(adminUrl, {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  console.log('✅ Page chargée!');

  // Attendre que React monte
  await page.waitForTimeout(3000);

  // Vérifier la présence de spinner ou de contenu
  const pageContent = await page.evaluate(() => {
    const html = document.body.innerHTML;
    const text = document.body.innerText;

    return {
      title: document.title,
      hasSpinner: html.includes('spinner') || html.includes('loading') || html.includes('Loading'),
      hasLoginForm: html.toLowerCase().includes('connexion') || html.toLowerCase().includes('login') || html.toLowerCase().includes('email'),
      hasDashboard: html.toLowerCase().includes('dashboard') || html.toLowerCase().includes('tableau de bord'),
      bodyText: text.substring(0, 800)
    };
  });

  console.log('\n📊 Analyse de la page Admin:');
  console.log('Titre:', pageContent.title);
  console.log('A un spinner?', pageContent.hasSpinner);
  console.log('A un formulaire de login?', pageContent.hasLoginForm);
  console.log('A un dashboard?', pageContent.hasDashboard);
  console.log('\nTexte visible (800 premiers chars):');
  console.log(pageContent.bodyText);

  // Screenshot
  await page.screenshot({
    path: '/tmp/admin-page-test.png',
    fullPage: false
  });
  console.log('\n📸 Screenshot: /tmp/admin-page-test.png');

  await browser.close();

  console.log('\n✅ Test terminé!');
  console.log('\n📋 RÉSUMÉ:');
  if (pageContent.hasLoginForm) {
    console.log('✅ Page Admin accessible - Formulaire de connexion présent');
  } else if (pageContent.hasSpinner) {
    console.log('⚠️ Spinner détecté - Possible problème de chargement infini');
  } else if (pageContent.hasDashboard) {
    console.log('✅ Dashboard Admin accessible');
  } else {
    console.log('❓ État inconnu - Voir screenshot pour analyse');
  }
})();
