const { chromium } = require('playwright');

async function testAdminStockUpdate() {
  console.log('🚀 Démarrage du test admin stock...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capturer les requêtes réseau
  const requests = [];
  page.on('request', request => {
    if (request.url().includes('/api/admin')) {
      requests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData()
      });
    }
  });

  // Capturer les réponses
  const responses = [];
  page.on('response', async response => {
    if (response.url().includes('/api/admin')) {
      const body = await response.text().catch(() => 'Unable to read body');
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
        body: body
      });
    }
  });

  // Capturer les erreurs console
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Aller sur la page de login
    console.log('📍 Navigation vers /login...');
    await page.goto('https://monster-phone.re/login', { waitUntil: 'networkidle' });

    // 2. Se connecter avec admin credentials
    console.log('🔐 Connexion admin...');
    await page.fill('input[type="email"]', 'alex974@monster-phone.re');
    await page.fill('input[type="password"]', 'Monsterphone2025');
    await page.click('button[type="submit"]');

    // Attendre la redirection
    await page.waitForURL('**/compte', { timeout: 10000 });
    console.log('✅ Connexion réussie\n');

    // 3. Vérifier les cookies Supabase
    const cookies = await context.cookies();
    const supabaseCookies = cookies.filter(c => c.name.includes('sb-'));

    console.log('🍪 Cookies Supabase trouvés:');
    supabaseCookies.forEach(cookie => {
      console.log(`  - ${cookie.name}: ${cookie.value.substring(0, 50)}...`);
    });
    console.log('');

    if (supabaseCookies.length === 0) {
      console.error('❌ PROBLÈME: Aucun cookie Supabase trouvé après login!');
      return;
    }

    // 4. Aller sur la page admin/stock
    console.log('📍 Navigation vers /admin/stock...');
    await page.goto('https://monster-phone.re/admin/stock', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // 5. Trouver un input de stock et le modifier
    console.log('✏️ Modification du stock...');
    const stockInputs = await page.$$('input[type="number"]');

    if (stockInputs.length === 0) {
      console.error('❌ Aucun input de stock trouvé sur la page');
      return;
    }

    // Modifier le premier input
    await stockInputs[0].fill('999');

    // 6. Cliquer sur le bouton Enregistrer
    console.log('💾 Clic sur Enregistrer...');
    await page.click('text=Enregistrer');

    // Attendre les requêtes API
    await page.waitForTimeout(3000);

    // 7. Analyser les résultats
    console.log('\n📊 ANALYSE DES REQUÊTES API:\n');

    if (requests.length === 0) {
      console.error('❌ Aucune requête API capturée');
    }

    requests.forEach((req, i) => {
      console.log(`Requête ${i + 1}:`);
      console.log(`  URL: ${req.url}`);
      console.log(`  Method: ${req.method}`);
      console.log(`  Headers:`);
      console.log(`    Cookie: ${req.headers.cookie ? req.headers.cookie.substring(0, 100) + '...' : 'ABSENT'}`);
      console.log(`    Content-Type: ${req.headers['content-type'] || 'ABSENT'}`);
      if (req.postData) {
        console.log(`  Body: ${req.postData.substring(0, 200)}`);
      }
      console.log('');
    });

    console.log('📊 ANALYSE DES RÉPONSES API:\n');
    responses.forEach((res, i) => {
      console.log(`Réponse ${i + 1}:`);
      console.log(`  URL: ${res.url}`);
      console.log(`  Status: ${res.status}`);
      console.log(`  Body: ${res.body.substring(0, 500)}`);
      console.log('');
    });

    if (consoleErrors.length > 0) {
      console.log('❌ ERREURS CONSOLE:\n');
      consoleErrors.forEach(err => console.log(`  - ${err}`));
    }

    // 8. Vérifier le statut final
    const has401 = responses.some(r => r.status === 401);
    if (has401) {
      console.error('\n❌ ÉCHEC: Erreur 401 détectée');

      // Vérifier si les cookies sont envoyés
      const hasCookies = requests.some(r => r.headers.cookie && r.headers.cookie.includes('sb-'));
      if (!hasCookies) {
        console.error('❌ CAUSE: Les cookies Supabase ne sont PAS envoyés dans la requête API');
      } else {
        console.error('⚠️ Les cookies sont envoyés mais le serveur retourne quand même 401');
      }
    } else {
      console.log('\n✅ SUCCÈS: Aucune erreur 401');
    }

  } catch (error) {
    console.error('❌ Erreur pendant le test:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
    console.log('\n🏁 Test terminé');
  }
}

testAdminStockUpdate();
