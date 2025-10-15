const { chromium } = require('playwright');

(async () => {
  console.log('🔍 Comparaison entre les deux URLs...\n');
  const browser = await chromium.launch({ headless: true });

  // Test 1: Domaine de production monster-phone.re
  console.log('📍 Test 1: https://monster-phone.re');
  const page1 = await browser.newPage();
  try {
    await page1.goto('https://monster-phone.re', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    const prodInfo = await page1.evaluate(() => {
      const html = document.body.innerHTML;
      return {
        title: document.title,
        hasSmartphones: html.includes('Smartphones') || html.includes('smartphones'),
        hasTablettes: html.includes('Tablettes') || html.includes('tablettes'),
        hasAccessoires: html.includes('Accessoires') || html.includes('accessoires'),
        hasVercelLogin: html.includes('Log in to Vercel'),
        url: window.location.href,
        headerText: document.querySelector('header')?.innerText || 'No header',
        bodySnippet: document.body.innerText.substring(0, 300)
      };
    });

    console.log('✅ monster-phone.re chargé:');
    console.log('   Titre:', prodInfo.title);
    console.log('   URL actuelle:', prodInfo.url);
    console.log('   Menu Smartphones:', prodInfo.hasSmartphones ? '✅' : '❌');
    console.log('   Menu Tablettes:', prodInfo.hasTablettes ? '✅' : '❌');
    console.log('   Menu Accessoires:', prodInfo.hasAccessoires ? '✅' : '❌');
    console.log('   Vercel Login:', prodInfo.hasVercelLogin ? '⚠️ OUI' : '✅ NON');
    console.log('   Header:', prodInfo.headerText.substring(0, 150));
    console.log('   Contenu:', prodInfo.bodySnippet);

    await page1.screenshot({ path: '/tmp/monster-phone-re.png', fullPage: false });
    console.log('📸 Screenshot sauvegardé: /tmp/monster-phone-re.png\n');
  } catch (error) {
    console.error('❌ Erreur sur monster-phone.re:', error.message);
  }
  await page1.close();

  // Test 2: Déploiement Vercel git-main
  console.log('📍 Test 2: https://monster-phone-boutique-git-main-alexs-projects-601e6017.vercel.app');
  const page2 = await browser.newPage();
  try {
    await page2.goto('https://monster-phone-boutique-git-main-alexs-projects-601e6017.vercel.app', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    const gitInfo = await page2.evaluate(() => {
      const html = document.body.innerHTML;
      return {
        title: document.title,
        hasSmartphones: html.includes('Smartphones') || html.includes('smartphones'),
        hasTablettes: html.includes('Tablettes') || html.includes('tablettes'),
        hasAccessoires: html.includes('Accessoires') || html.includes('accessoires'),
        hasVercelLogin: html.includes('Log in to Vercel'),
        url: window.location.href,
        headerText: document.querySelector('header')?.innerText || 'No header',
        bodySnippet: document.body.innerText.substring(0, 300)
      };
    });

    console.log('✅ Déploiement git-main chargé:');
    console.log('   Titre:', gitInfo.title);
    console.log('   URL actuelle:', gitInfo.url);
    console.log('   Menu Smartphones:', gitInfo.hasSmartphones ? '✅' : '❌');
    console.log('   Menu Tablettes:', gitInfo.hasTablettes ? '✅' : '❌');
    console.log('   Menu Accessoires:', gitInfo.hasAccessoires ? '✅' : '❌');
    console.log('   Vercel Login:', gitInfo.hasVercelLogin ? '⚠️ OUI' : '✅ NON');
    console.log('   Header:', gitInfo.headerText.substring(0, 150));
    console.log('   Contenu:', gitInfo.bodySnippet);

    await page2.screenshot({ path: '/tmp/git-main-vercel.png', fullPage: false });
    console.log('📸 Screenshot sauvegardé: /tmp/git-main-vercel.png\n');
  } catch (error) {
    console.error('❌ Erreur sur git-main:', error.message);
  }
  await page2.close();

  console.log('🏁 Comparaison terminée!');
  await browser.close();
})();
