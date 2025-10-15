const { chromium } = require('playwright');

(async () => {
  console.log('🔍 VÉRIFICATION DU CODE DÉPLOYÉ EN PRODUCTION\n');
  console.log('=' .repeat(70));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Capturer les logs console JavaScript
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  console.log('📍 Navigation vers /admin...\n');

  // Aller directement sur /admin sans login (devrait rediriger vers /login normalement)
  await page.goto('https://monster-phone.re/admin', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  await page.waitForTimeout(5000);

  console.log('📊 LOGS CONSOLE CAPTURÉS:\n');

  // Filtrer les logs importants (ceux qui contiennent "ADMIN LAYOUT")
  const adminLogs = consoleLogs.filter(log =>
    log.text.includes('ADMIN LAYOUT') ||
    log.text.includes('[ADMIN') ||
    log.text.includes('admin') ||
    log.text.includes('session') ||
    log.text.includes('getAdminSession')
  );

  if (adminLogs.length > 0) {
    console.log('Logs de l\'AdminLayout trouvés:');
    adminLogs.forEach((log, i) => {
      console.log(`\n[${i + 1}] ${log.type.toUpperCase()}:`);
      console.log(`    ${log.text}`);
    });
  } else {
    console.log('⚠️ AUCUN log d\'AdminLayout trouvé!');
    console.log('   Cela suggère que les console.log ont été retirés du code déployé.');
  }

  // Extraire les erreurs
  const errors = consoleLogs.filter(log => log.type === 'error');

  if (errors.length > 0) {
    console.log('\n\n❌ ERREURS JAVASCRIPT DÉTECTÉES:\n');
    errors.forEach((log, i) => {
      console.log(`[${i + 1}] ${log.text.substring(0, 200)}`);
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('📝 TOUS LES LOGS (premiers 30):\n');

  consoleLogs.slice(0, 30).forEach((log, i) => {
    console.log(`[${i + 1}] ${log.type.padEnd(8)}: ${log.text.substring(0, 100)}`);
  });

  console.log('\n' + '='.repeat(70));

  await browser.close();
})();
