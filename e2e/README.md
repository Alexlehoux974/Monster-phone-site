# 🧪 Tests E2E - Monster Phone Boutique

Tests end-to-end utilisant Playwright pour valider le parcours d'achat complet et le tableau de bord admin.

## 📋 Prérequis

```bash
# Installer les navigateurs Playwright (si ce n'est pas déjà fait)
npx playwright install
```

## 🚀 Lancer les tests

### Tous les tests
```bash
# Mode headless (par défaut)
npm run test:e2e

# Mode UI interactif (recommandé pour le développement)
npx playwright test --ui

# Mode headed (voir le navigateur)
npx playwright test --headed
```

### Tests spécifiques
```bash
# Seulement les tests de checkout
npx playwright test checkout.spec.ts

# Seulement les tests admin
npx playwright test admin.spec.ts

# Un test spécifique
npx playwright test checkout.spec.ts -g "devrait afficher la page d'accueil"
```

### Tests par navigateur
```bash
# Chromium seulement
npx playwright test --project=chromium

# Firefox seulement
npx playwright test --project=firefox

# Mobile Chrome
npx playwright test --project="Mobile Chrome"
```

## 📊 Rapports et Résultats

### Voir le rapport HTML
```bash
npx playwright show-report
```

### Voir les traces (debugging)
```bash
# Les traces sont automatiquement capturées en cas d'échec
npx playwright show-trace trace.zip
```

### Screenshots
Les screenshots des échecs sont sauvegardés dans `test-results/`

## 🧪 Structure des Tests

### `checkout.spec.ts`
Tests du parcours d'achat complet:
- ✅ Navigation et affichage des produits
- ✅ Ajout/modification/suppression du panier
- ✅ Formulaire de checkout
- ✅ Validation des champs
- ✅ Intégration Stripe (redirection)
- ✅ Gestion du stock
- ✅ Responsive design (mobile/tablette)

### `admin.spec.ts`
Tests du tableau de bord admin:
- ✅ Affichage de la liste des commandes
- ✅ Statistiques (total, CA, en attente, livrées)
- ✅ Filtres par statut
- ✅ Recherche de commandes
- ✅ Mise à jour du statut
- ✅ Modal de détails
- ✅ Export CSV
- ✅ Responsive design

## 🔧 Configuration

La configuration se trouve dans `playwright.config.ts`:

```typescript
{
  baseURL: 'http://localhost:3001',  // Port du serveur de dev
  timeout: 30000,                     // Timeout par test
  retries: process.env.CI ? 2 : 0,   // Retries en CI
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
}
```

## 📝 Data Attributes pour les Tests

Pour faciliter les tests, ajoutez des `data-testid` dans vos composants:

```tsx
// Composant produit
<div data-testid="product-card">
  <button data-testid="add-to-cart">Ajouter au panier</button>
</div>

// Panier
<div data-testid="cart-item">
  <button data-testid="increase-quantity">+</button>
  <span data-testid="item-quantity">1</span>
  <button data-testid="remove-item">×</button>
</div>

// Badge panier
<span data-testid="cart-badge">3</span>

// Stock
<span data-testid="out-of-stock">Rupture de stock</span>

// Menu mobile
<button data-testid="mobile-menu-button">Menu</button>
```

## 🐛 Debugging

### Mode Debug
```bash
# Lancer en mode debug (ouvre l'inspecteur)
npx playwright test --debug

# Debug un test spécifique
npx playwright test checkout.spec.ts --debug -g "devrait ajouter un produit"
```

### Voir les logs
```bash
# Logs détaillés
DEBUG=pw:api npx playwright test
```

### Inspector Playwright
```bash
npx playwright inspector
```

## ⚠️ Notes Importantes

### Tests Stripe
Les tests s'arrêtent avant le paiement Stripe réel pour éviter de créer de vraies transactions. Pour tester le paiement complet:

1. Utilisez les [cartes de test Stripe](https://stripe.com/docs/testing)
2. Simulez le webhook Stripe en local
3. Ou utilisez [Stripe CLI](https://stripe.com/docs/stripe-cli) pour les webhooks

### Base de Données
Les tests utilisent la vraie base de données Supabase. Considérez:
- Créer une base de données de test séparée
- Utiliser des données de test facilement identifiables (préfixe "E2E Test")
- Nettoyer les données après les tests

### CI/CD
Pour GitHub Actions ou autre CI:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev)
- [Best Practices Playwright](https://playwright.dev/docs/best-practices)
- [Sélecteurs Playwright](https://playwright.dev/docs/selectors)
- [Test Retry](https://playwright.dev/docs/test-retries)

## 🎯 Prochaines Étapes

### Tests à Ajouter
- [ ] Tests d'intégration avec Stripe complet (webhooks simulés)
- [ ] Tests de performance (temps de chargement)
- [ ] Tests d'accessibilité (a11y)
- [ ] Tests de sécurité (XSS, CSRF)
- [ ] Tests de concurrence (plusieurs utilisateurs simultanés)
- [ ] Tests de régression visuelle (screenshots)

### Améliorations
- [ ] Créer des fixtures pour les données de test
- [ ] Ajouter des helpers pour les actions communes
- [ ] Mettre en place une base de données de test
- [ ] Configurer le nettoyage automatique des données de test
- [ ] Ajouter des tests de charge avec Artillery ou k6

## ✅ Checklist Tests Recommandés

Avant chaque release:
- [ ] Tous les tests passent en local
- [ ] Tests sur Chrome, Firefox et Safari
- [ ] Tests mobile (iPhone et Android)
- [ ] Test du parcours complet de bout en bout
- [ ] Vérification des screenshots de régression
- [ ] Validation des performances (Lighthouse)
