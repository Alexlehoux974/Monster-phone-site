import { test, expect } from '@playwright/test';

/**
 * Tests E2E pour le parcours d'achat complet
 *
 * Ces tests vérifient:
 * 1. Navigation et affichage des produits
 * 2. Ajout au panier
 * 3. Processus de checkout
 * 4. Intégration Stripe (mode test)
 * 5. Page de succès
 */

test.describe('Parcours d\'achat complet', () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page d'accueil
    await page.goto('/');
  });

  test('devrait afficher la page d\'accueil correctement', async ({ page }) => {
    // Vérifier le titre de la page
    await expect(page).toHaveTitle(/Monster Phone/i);

    // Vérifier que le header est présent
    await expect(page.locator('header')).toBeVisible();

    // Vérifier que la section hero est présente
    await expect(page.locator('text=Accessoires Gaming')).toBeVisible();
  });

  test('devrait naviguer vers la page produits', async ({ page }) => {
    // Cliquer sur "Voir nos produits" ou naviguer directement
    await page.goto('/products');

    // Vérifier que les produits sont affichés
    await expect(page.locator('h1')).toContainText(/Produits/i);

    // Attendre que les produits soient chargés
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Vérifier qu'au moins un produit est affiché
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible();
  });

  test('devrait afficher les détails d\'un produit', async ({ page }) => {
    await page.goto('/products');

    // Attendre que les produits soient chargés
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Cliquer sur le premier produit
    await page.locator('[data-testid="product-card"]').first().click();

    // Vérifier qu'on est sur la page de détails
    await expect(page).toHaveURL(/\/products\/.+/);

    // Vérifier que le bouton "Ajouter au panier" est présent
    await expect(page.locator('button:has-text("Ajouter au panier")')).toBeVisible();
  });

  test('devrait ajouter un produit au panier', async ({ page }) => {
    await page.goto('/products');

    // Attendre que les produits soient chargés
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Cliquer sur le premier produit
    await page.locator('[data-testid="product-card"]').first().click();

    // Ajouter au panier
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Vérifier que le compteur du panier est mis à jour
    // (Vous devrez ajuster ce sélecteur selon votre implémentation)
    const cartBadge = page.locator('[data-testid="cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  });

  test('devrait afficher le panier avec les produits', async ({ page }) => {
    // D'abord ajouter un produit au panier
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await page.locator('[data-testid="product-card"]').first().click();
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Aller au panier
    await page.goto('/cart');

    // Vérifier que le panier contient des produits
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);

    // Vérifier que le bouton "Passer commande" est présent
    await expect(page.locator('button:has-text("Passer commande")')).toBeVisible();
  });

  test('devrait modifier la quantité d\'un produit dans le panier', async ({ page }) => {
    // Ajouter un produit au panier
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await page.locator('[data-testid="product-card"]').first().click();
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Aller au panier
    await page.goto('/cart');

    // Augmenter la quantité
    const increaseButton = page.locator('[data-testid="increase-quantity"]').first();
    await increaseButton.click();

    // Vérifier que la quantité est passée à 2
    const quantity = page.locator('[data-testid="item-quantity"]').first();
    await expect(quantity).toHaveText('2');
  });

  test('devrait supprimer un produit du panier', async ({ page }) => {
    // Ajouter un produit au panier
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await page.locator('[data-testid="product-card"]').first().click();
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Aller au panier
    await page.goto('/cart');

    // Supprimer le produit
    await page.locator('[data-testid="remove-item"]').first().click();

    // Vérifier que le panier est vide
    await expect(page.locator('text=Votre panier est vide')).toBeVisible();
  });

  test('devrait naviguer vers la page de checkout', async ({ page }) => {
    // Ajouter un produit au panier
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await page.locator('[data-testid="product-card"]').first().click();
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Aller au panier
    await page.goto('/cart');

    // Cliquer sur "Passer commande"
    await page.locator('button:has-text("Passer commande")').click();

    // Vérifier qu'on est sur la page de checkout
    await expect(page).toHaveURL(/\/checkout/);

    // Vérifier que le formulaire de checkout est présent
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('devrait valider le formulaire de checkout', async ({ page }) => {
    // Ajouter un produit au panier
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await page.locator('[data-testid="product-card"]').first().click();
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Aller au checkout
    await page.goto('/checkout');

    // Essayer de soumettre sans remplir le formulaire
    await page.locator('button:has-text("Continuer vers le paiement")').click();

    // Vérifier que les messages d'erreur s'affichent
    await expect(page.locator('text=Ce champ est requis')).toHaveCount(3);
  });

  test('devrait rediriger vers Stripe avec les bonnes informations', async ({ page }) => {
    // Ajouter un produit au panier
    await page.goto('/products');
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await page.locator('[data-testid="product-card"]').first().click();
    await page.locator('button:has-text("Ajouter au panier")').click();

    // Aller au checkout
    await page.goto('/checkout');

    // Remplir le formulaire
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0262123456');
    await page.fill('input[name="address"]', '123 Rue de Test');
    await page.fill('input[name="city"]', 'Saint-Denis');
    await page.fill('input[name="postalCode"]', '97400');

    // Intercepter la navigation vers Stripe
    const [stripeResponse] = await Promise.all([
      page.waitForResponse(response => response.url().includes('api.stripe.com')),
      page.locator('button:has-text("Continuer vers le paiement")').click()
    ]);

    // Vérifier que la requête vers Stripe a été faite
    expect(stripeResponse.status()).toBe(200);
  });
});

test.describe('Gestion du stock', () => {
  test('devrait afficher "Rupture de stock" pour les produits épuisés', async ({ page }) => {
    await page.goto('/products');

    // Attendre que les produits soient chargés
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

    // Vérifier si un produit en rupture de stock existe
    const outOfStock = page.locator('[data-testid="out-of-stock"]');
    if (await outOfStock.count() > 0) {
      await expect(outOfStock.first()).toContainText(/Rupture de stock/i);
    }
  });

  test('devrait empêcher l\'ajout au panier d\'un produit en rupture', async ({ page }) => {
    // Cette test nécessite d'avoir un produit en rupture de stock
    // Vous pouvez le skip si vous n'avez pas de produits en rupture
    test.skip();
  });
});

test.describe('Responsive Design', () => {
  test('devrait afficher correctement sur mobile', async ({ page }) => {
    // Définir la taille d'écran mobile
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Vérifier que le menu burger est visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();

    // Vérifier que le contenu s'affiche correctement
    await expect(page.locator('header')).toBeVisible();
  });

  test('devrait afficher correctement sur tablette', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/products');

    // Vérifier que les produits s'affichent en grille adaptée
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });
    await expect(page.locator('[data-testid="product-card"]')).toHaveCount.greaterThan(0);
  });
});
