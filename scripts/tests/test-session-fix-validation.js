const { chromium } = require('playwright');

(async () => {
  console.log('🧪 TEST DE VALIDATION DU FIX DE SESSION\n');
  console.log('=' .repeat(70));
  console.log('Objectif: Vérifier que le singleton Supabase résout le spinner infini\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer tous les messages console pour voir les logs de session
  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ time: Date.now(), type: msg.type(), text });
    if (text.includes('[ADMIN LAYOUT]') || text.includes('[getAdminSession]') || text.includes('GoTrueClient')) {
      console.log(`📋 Console [${msg.type()}]: ${text}`);
    }
  });

  // Capturer les erreurs
  page.on('pageerror', error => {
    console.log(`❌ Page Error: ${error.message}`);
  });

  console.log('📍 Étape 1: Navigation vers page de login\n');
  await page.goto('https://monster-phone.re/admin/login', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(2000);

  console.log('📍 Étape 2: Remplissage du formulaire\n');
  await page.fill('input[type="email"]', 'alexandre@digiqo.fr');
  await page.fill('input[type="password"]', 'MonsterAdmin2025');

  const loginButton = await page.locator('button').filter({ hasText: 'Se connecter' }).first();

  console.log('📍 Étape 3: Clic sur "Se connecter"\n');
  const clickTime = Date.now();
  await loginButton.click();

  // Attendre la redirection vers /admin
  try {
    await page.waitForURL('**/admin', { timeout: 10000 });
    console.log('✅ Redirection vers /admin réussie\n');
  } catch (e) {
    console.log('⚠️  Pas de redirection dans les 10 secondes\n');
  }

  console.log('📍 Étape 4: Observation de la page /admin (20 secondes max)\n');

  let spinnerDisappeared = false;
  let dashboardLoaded = false;

  for (let i = 1; i <= 20; i++) {
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

    // Afficher chaque seconde pour diagnostic détaillé
    if (i <= 10 || i % 5 === 0) {
      const icon = state.hasSpinner ? '🔄' : '✅';
      console.log(`[${String(i).padStart(2)}s / +${elapsed}s] ${icon} Spinner: ${state.hasSpinner ? 'ACTIF' : 'DISPARU'} | Dashboard: ${state.hasDashboard ? 'CHARGÉ' : 'non chargé'}`);
    }

    if (!state.hasSpinner && !spinnerDisappeared) {
      spinnerDisappeared = true;
      console.log(`   ✅ Spinner disparu après ${elapsed}s!`);
    }

    if (state.hasDashboard && !dashboardLoaded) {
      dashboardLoaded = true;
      console.log(`   🎉 Dashboard détecté après ${elapsed}s!`);
    }

    // Success: Dashboard chargé et plus de spinner
    if (state.hasDashboard && !state.hasSpinner) {
      console.log(`\n🎉 SUCCÈS COMPLET! Dashboard chargé en ${elapsed}s\n`);
      break;
    }
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

  console.log('=' .repeat(70));
  console.log('📊 RÉSULTAT DU TEST\n');
  console.log('URL finale:', finalState.url);
  console.log('Spinner actif:', finalState.hasSpinner ? '🔄 OUI (PROBLÈME!)' : '✅ NON');
  console.log('Dashboard visible:', finalState.hasDashboard ? '✅ OUI' : '❌ NON');

  // Analyser les logs de console pour vérifier le fix
  console.log('\n📋 ANALYSE DES LOGS CONSOLE\n');

  const sessionLogs = consoleLogs.filter(log =>
    log.text.includes('getAdminSession') ||
    log.text.includes('ADMIN LAYOUT')
  );

  if (sessionLogs.length > 0) {
    console.log(`Logs de session détectés: ${sessionLogs.length}\n`);
    sessionLogs.forEach(log => {
      const time = ((log.time - clickTime) / 1000).toFixed(2);
      console.log(`[+${time}s] ${log.text}`);
    });
  } else {
    console.log('⚠️  Aucun log de session détecté');
  }

  const multiClientWarning = consoleLogs.some(log =>
    log.text.includes('Multiple GoTrueClient')
  );

  console.log('\n🔍 VÉRIFICATION DU FIX\n');
  console.log('Multiple GoTrueClient warning:', multiClientWarning ? '❌ PRÉSENT (problème!)' : '✅ ABSENT (fix OK!)');

  // Verdict final
  console.log('\n' + '=' .repeat(70));
  console.log('🎯 VERDICT FINAL\n');

  if (finalState.hasDashboard && !finalState.hasSpinner && !multiClientWarning) {
    console.log('✅ LE FIX FONCTIONNE PARFAITEMENT!');
    console.log('   - Session persistée correctement');
    console.log('   - Dashboard chargé sans spinner');
    console.log('   - Plus d\'avertissement multiple instances');
  } else if (finalState.hasSpinner) {
    console.log('❌ PROBLÈME PERSISTANT: Spinner toujours actif');
    console.log('   Le singleton n\'a pas résolu le problème de session');
  } else if (!finalState.hasDashboard) {
    console.log('⚠️  PROBLÈME PARTIEL: Pas de spinner mais pas de dashboard');
    console.log('   Possiblement une redirection incorrecte');
  } else if (multiClientWarning) {
    console.log('⚠️  AVERTISSEMENT: Multiple instances détectées');
    console.log('   Le singleton pourrait ne pas être utilisé partout');
  }

  await page.screenshot({ path: '/tmp/validation-session-fix.png', fullPage: true });
  console.log('\n📸 Screenshot: /tmp/validation-session-fix.png');

  console.log('\n' + '=' .repeat(70));
  await browser.close();
})();
