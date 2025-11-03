const { chromium } = require('playwright');

(async () => {
  console.log('⏱️  TEST D\'ATTENTE LONGUE DURÉE - 60 secondes\n');
  console.log('=' .repeat(70));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer TOUS les appels à /api/admin/verify
  const verifyApiCalls = [];

  page.on('request', request => {
    if (request.url().includes('/api/admin/verify')) {
      verifyApiCalls.push({
        type: 'REQUEST',
        time: Date.now(),
        url: request.url(),
        data: request.postData()
      });
      console.log(`📤 [REQUEST] /api/admin/verify`);
      console.log(`   Data: ${request.postData()}`);
    }
  });

  page.on('response', async response => {
    if (response.url().includes('/api/admin/verify')) {
      let body = null;
      try {
        body = await response.json();
      } catch (e) {}

      verifyApiCalls.push({
        type: 'RESPONSE',
        time: Date.now(),
        status: response.status(),
        body: body
      });

      console.log(`📥 [RESPONSE] /api/admin/verify`);
      console.log(`   Status: ${response.status()}`);
      console.log(`   Body: ${JSON.stringify(body)}`);
    }
  });

  console.log('📍 Navigation et login...\n');

  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(1000);

  await page.fill('input[type="email"]', 'alexandre@digiqo.fr');
  await page.fill('input[type="password"]', 'MonsterAdmin2025');

  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();

  console.log('🚀 Clic sur "Se connecter"...\n');

  const clickTime = Date.now();
  await loginButton.click();

  // Attendre la redirection vers /admin
  await page.waitForURL('**/admin', { timeout: 10000 }).catch(() => {
    console.log('⚠️  Pas de redirection vers /admin dans les 10 secondes');
  });

  console.log('📍 Maintenant sur /admin, observation du spinner pendant 60 secondes...\n');

  let spinnerDisappeared = false;
  let dashboardLoaded = false;

  for (let i = 1; i <= 60; i++) {
    await page.waitForTimeout(1000);

    const state = await page.evaluate(() => {
      const hasSpinner = document.querySelector('[class*="animate-spin"]') !== null;
      const hasDashboard = document.body.innerHTML.includes('Dashboard') ||
                          document.body.innerHTML.includes('Tableau de bord') ||
                          document.body.innerHTML.includes('Statistiques');

      return {
        hasSpinner,
        hasDashboard,
        url: window.location.href
      };
    });

    const elapsed = ((Date.now() - clickTime) / 1000).toFixed(1);
    const icon = state.hasSpinner ? '🔄' : '✅';

    // Afficher seulement les changements importants
    if (i === 1 || i % 10 === 0 || (!state.hasSpinner && !spinnerDisappeared) || (state.hasDashboard && !dashboardLoaded)) {
      console.log(`[${String(i).padStart(2)}s / +${elapsed}s] ${icon} Spinner: ${state.hasSpinner ? 'ACTIF' : 'DISPARU'} | Dashboard: ${state.hasDashboard ? 'CHARGÉ' : 'non chargé'}`);

      if (!state.hasSpinner && !spinnerDisappeared) {
        spinnerDisappeared = true;
        console.log('   ✅ Spinner a disparu!');
      }

      if (state.hasDashboard && !dashboardLoaded) {
        dashboardLoaded = true;
        console.log('   🎉 Dashboard détecté!');
      }
    }

    // Si dashboard chargé sans spinner, c'est bon!
    if (state.hasDashboard && !state.hasSpinner) {
      console.log(`\n🎉 SUCCÈS! Dashboard chargé complètement après ${elapsed}s`);
      break;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 RÉSUMÉ DES APPELS À /api/admin/verify\n');

  if (verifyApiCalls.length > 0) {
    console.log(`Total d'appels: ${verifyApiCalls.length}\n`);

    verifyApiCalls.forEach((call, index) => {
      const elapsed = call.time ? ((call.time - clickTime) / 1000).toFixed(2) : '?';

      if (call.type === 'REQUEST') {
        console.log(`[${index + 1}] [+${elapsed}s] 📤 REQUEST`);
        console.log(`    Data: ${call.data}`);
      } else {
        console.log(`[${index + 1}] [+${elapsed}s] 📥 RESPONSE`);
        console.log(`    Status: ${call.status}`);
        console.log(`    Body: ${JSON.stringify(call.body)}`);
      }
    });
  } else {
    console.log('⚠️ AUCUN appel à /api/admin/verify détecté sur /admin!');
    console.log('   Cela suggère que le AdminLayout ne vérifie pas la session.');
  }

  // État final
  const finalState = await page.evaluate(() => {
    return {
      url: window.location.href,
      hasSpinner: document.querySelector('[class*="animate-spin"]') !== null,
      hasDashboard: document.body.innerHTML.includes('Dashboard') ||
                   document.body.innerHTML.includes('Statistiques'),
      bodySnippet: document.body.innerText.substring(0, 500)
    };
  });

  console.log('\n' + '='.repeat(70));
  console.log('🎯 ÉTAT FINAL\n');
  console.log('URL:', finalState.url);
  console.log('Spinner actif:', finalState.hasSpinner ? '🔄 OUI (BLOQUÉ!)' : '✅ NON');
  console.log('Dashboard visible:', finalState.hasDashboard ? 'OUI' : 'NON');

  if (!finalState.hasDashboard && !finalState.hasSpinner) {
    console.log('\n⚠️  SITUATION ANORMALE: Pas de spinner ET pas de dashboard!');
    console.log('Extrait du contenu de la page:');
    console.log(finalState.bodySnippet);
  }

  await page.screenshot({ path: '/tmp/diagnosis-long-wait.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/diagnosis-long-wait.png');

  console.log('\n' + '='.repeat(70));
  await browser.close();
})();
