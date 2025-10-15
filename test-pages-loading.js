const { chromium } = require('playwright');

(async () => {
  console.log('🧪 TEST DE CHARGEMENT DES PAGES APRÈS COMMANDE\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Tester plusieurs pages avec timeout court
  const pagesToTest = [
    { name: 'Homepage', url: 'https://monster-phone.re' },
    { name: 'Admin Login', url: 'https://monster-phone.re/admin/login' },
    { name: 'Products', url: 'https://monster-phone.re/produits' },
  ];

  for (const testPage of pagesToTest) {
    console.log(`📍 Test: ${testPage.name}`);
    console.log(`   URL: ${testPage.url}`);

    const startTime = Date.now();

    try {
      await page.goto(testPage.url, {
        waitUntil: 'domcontentloaded',
        timeout: 15000 // 15 secondes max
      });

      const loadTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`   ✅ Chargé en ${loadTime}s\n`);
    } catch (error) {
      const loadTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`   ❌ TIMEOUT après ${loadTime}s`);
      console.log(`   Erreur: ${error.message}\n`);
    }
  }

  await browser.close();

  console.log('=' .repeat(60));
  console.log('💡 Si les pages timeout:');
  console.log('   - Vérifier les logs Vercel');
  console.log('   - Possible deadlock Supabase');
  console.log('   - Webhook Stripe qui bloque');
})();
