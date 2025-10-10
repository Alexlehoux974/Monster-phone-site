import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour le tableau de bord admin
 *
 * Ces tests vérifient:
 * 1. Affichage de la liste des commandes
 * 2. Filtrage par statut
 * 3. Recherche de commandes
 * 4. Mise à jour du statut
 * 5. Affichage des détails
 * 6. Export CSV
 */

test.describe('Tableau de bord Admin - Commandes', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page admin des commandes
    await page.goto('/admin/orders');
  });

  test('devrait afficher la page admin correctement', async ({ page }) => {
    // Vérifier le titre
    await expect(page.locator('h1')).toContainText('Gestion des commandes');

    // Vérifier que les statistiques sont affichées
    await expect(page.locator('text=Total commandes')).toBeVisible();
    await expect(page.locator('text=Chiffre d\'affaires')).toBeVisible();
    await expect(page.locator('text=En attente')).toBeVisible();
    await expect(page.locator('text=Livrées')).toBeVisible();
  });

  test('devrait afficher les filtres de statut', async ({ page }) => {
    // Vérifier que tous les filtres sont présents
    await expect(page.locator('button:has-text("Toutes")')).toBeVisible();
    await expect(page.locator('button:has-text("En attente")')).toBeVisible();
    await expect(page.locator('button:has-text("En traitement")')).toBeVisible();
    await expect(page.locator('button:has-text("Expédiée")')).toBeVisible();
    await expect(page.locator('button:has-text("Livrée")')).toBeVisible();
    await expect(page.locator('button:has-text("Annulée")')).toBeVisible();
  });

  test('devrait filtrer les commandes par statut', async ({ page }) => {
    // Cliquer sur le filtre "En attente"
    await page.locator('button:has-text("En attente")').click();

    // Vérifier que le filtre est actif (bouton bleu)
    const pendingButton = page.locator('button:has-text("En attente")');
    await expect(pendingButton).toHaveClass(/bg-blue-600/);

    // Vérifier que seules les commandes "En attente" sont affichées
    // (si des commandes existent)
    const statusBadges = page.locator('span:has-text("En attente")');
    if (await statusBadges.count() > 0) {
      // Vérifier qu'aucun autre statut n'est affiché
      await expect(page.locator('span:has-text("Livrée")')).toHaveCount(0);
    }
  });

  test('devrait afficher la barre de recherche', async ({ page }) => {
    // Vérifier que la barre de recherche est présente
    const searchInput = page.locator('input[placeholder*="Rechercher"]');
    await expect(searchInput).toBeVisible();

    // Vérifier que le bouton export est présent
    await expect(page.locator('button:has-text("Exporter CSV")')).toBeVisible();
  });

  test('devrait rechercher des commandes', async ({ page }) => {
    // Attendre que les commandes soient chargées
    await page.waitForTimeout(1000);

    // Taper dans la barre de recherche
    const searchInput = page.locator('input[placeholder*="Rechercher"]');
    await searchInput.fill('ORDER');

    // Vérifier que les résultats sont filtrés
    // (Cette logique dépend de vos commandes de test)
  });

  test('devrait afficher le tableau des commandes', async ({ page }) => {
    // Vérifier que les en-têtes du tableau sont présents
    await expect(page.locator('th:has-text("Commande")')).toBeVisible();
    await expect(page.locator('th:has-text("Client")')).toBeVisible();
    await expect(page.locator('th:has-text("Articles")')).toBeVisible();
    await expect(page.locator('th:has-text("Montant")')).toBeVisible();
    await expect(page.locator('th:has-text("Statut")')).toBeVisible();
    await expect(page.locator('th:has-text("Date")')).toBeVisible();
    await expect(page.locator('th:has-text("Actions")')).toBeVisible();
  });

  test('devrait afficher "Aucune commande trouvée" si pas de commandes', async ({ page }) => {
    // Filtrer par un statut qui n'a probablement pas de commandes
    await page.locator('button:has-text("Annulée")').click();

    // Chercher un texte qui n'existe pas
    const searchInput = page.locator('input[placeholder*="Rechercher"]');
    await searchInput.fill('COMMANDE_INEXISTANTE_XYZ123');

    // Vérifier le message
    await expect(page.locator('text=Aucune commande ne correspond à votre recherche')).toBeVisible();
  });

  test('devrait ouvrir le modal de détails d\'une commande', async ({ page }) => {
    // Attendre que les commandes soient chargées
    await page.waitForTimeout(1000);

    // Vérifier s'il y a des commandes
    const orderRows = page.locator('tbody tr');
    const count = await orderRows.count();

    if (count > 0) {
      // Cliquer sur le bouton "Voir détails" (icône œil)
      const viewButton = page.locator('button[title="Voir détails"]').first();
      await viewButton.click();

      // Vérifier que le modal est ouvert
      await expect(page.locator('h2:has-text("Commande")')).toBeVisible();

      // Vérifier que les sections du modal sont présentes
      await expect(page.locator('text=Informations client')).toBeVisible();
      await expect(page.locator('text=Articles commandés')).toBeVisible();
      await expect(page.locator('text=Statut de la commande')).toBeVisible();

      // Fermer le modal
      await page.locator('button:has-text("×")').click();

      // Vérifier que le modal est fermé
      await expect(page.locator('h2:has-text("Commande")')).toHaveCount(0);
    } else {
      // Skip le test s'il n'y a pas de commandes
      test.skip();
    }
  });

  test('devrait mettre à jour le statut d\'une commande', async ({ page }) => {
    // Attendre que les commandes soient chargées
    await page.waitForTimeout(1000);

    const orderRows = page.locator('tbody tr');
    const count = await orderRows.count();

    if (count > 0) {
      // Récupérer le premier select de statut
      const statusSelect = page.locator('select').first();
      const currentValue = await statusSelect.inputValue();

      // Changer le statut
      const newStatus = currentValue === 'pending' ? 'processing' : 'pending';
      await statusSelect.selectOption(newStatus);

      // Vérifier que le statut a été mis à jour dans l'interface
      await page.waitForTimeout(500);
      const updatedValue = await statusSelect.inputValue();
      expect(updatedValue).toBe(newStatus);
    } else {
      test.skip();
    }
  });

  test('devrait télécharger le CSV des commandes', async ({ page }) => {
    // Attendre le téléchargement du CSV
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('button:has-text("Exporter CSV")').click()
    ]);

    // Vérifier que le fichier a été téléchargé
    const filename = download.suggestedFilename();
    expect(filename).toMatch(/commandes_\d{4}-\d{2}-\d{2}\.csv/);
  });

  test('devrait afficher les statistiques correctement', async ({ page }) => {
    // Attendre que les données soient chargées
    await page.waitForTimeout(1000);

    // Vérifier que les statistiques ont des valeurs numériques
    const totalOrders = page.locator('text=Total commandes').locator('..').locator('.text-3xl');
    const revenue = page.locator('text=Chiffre d\'affaires').locator('..').locator('.text-3xl');
    const pending = page.locator('text=En attente').locator('..').locator('.text-3xl');
    const delivered = page.locator('text=Livrées').locator('..').locator('.text-3xl');

    // Vérifier que les valeurs sont affichées
    await expect(totalOrders).toBeVisible();
    await expect(revenue).toBeVisible();
    await expect(pending).toBeVisible();
    await expect(delivered).toBeVisible();
  });

  test('devrait afficher correctement sur mobile', async ({ page }) => {
    // Définir la taille d'écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/admin/orders');

    // Vérifier que la page est responsive
    await expect(page.locator('h1')).toBeVisible();

    // Vérifier que le tableau est scrollable horizontalement
    const tableContainer = page.locator('.overflow-x-auto');
    await expect(tableContainer).toBeVisible();
  });
});

test.describe('Admin - Intégration avec commandes réelles', () => {
  test('devrait créer une commande et la voir dans admin', async ({ page, context }) => {
    // Ouvrir une nouvelle page pour faire un achat
    const buyerPage = await context.newPage();

    // Ajouter un produit au panier
    await buyerPage.goto('/products');
    await buyerPage.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await buyerPage.locator('[data-testid="product-card"]').first().click();
    await buyerPage.locator('button:has-text("Ajouter au panier")').click();

    // Aller au checkout
    await buyerPage.goto('/checkout');

    // Remplir le formulaire
    await buyerPage.fill('input[name="name"]', 'E2E Test User');
    await buyerPage.fill('input[name="email"]', 'e2e-test@example.com');
    await buyerPage.fill('input[name="phone"]', '0262999999');
    await buyerPage.fill('input[name="address"]', '999 Rue E2E Test');
    await buyerPage.fill('input[name="city"]', 'Saint-Denis');
    await buyerPage.fill('input[name="postalCode"]', '97400');

    // Note: Ce test s'arrête avant le paiement Stripe réel
    // Pour un test complet, vous devrez simuler le paiement Stripe

    await buyerPage.close();

    // Retourner à la page admin
    await page.reload();

    // Rechercher la commande créée
    const searchInput = page.locator('input[placeholder*="Rechercher"]');
    await searchInput.fill('e2e-test@example.com');

    // Vérifier que la commande apparaît
    // (Cela ne fonctionnera que si le paiement Stripe est simulé)
  });
});
