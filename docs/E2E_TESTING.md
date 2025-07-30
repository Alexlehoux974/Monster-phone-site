# E2E Testing avec Playwright

## Vue d'ensemble

Les tests E2E (End-to-End) sont configurés avec Playwright pour tester l'application Monster Phone Boutique dans des navigateurs réels.

## Configuration

### Installation
```bash
# Installer les dépendances
npm install --save-dev @playwright/test

# Installer les navigateurs
npx playwright install
```

### Structure des tests
```
e2e/
├── smoke.spec.ts       # Tests de fumée basiques
├── homepage.spec.ts    # Tests de la page d'accueil
├── navigation.spec.ts  # Tests de navigation
├── products.spec.ts    # Tests de la page produits
├── contact.spec.ts     # Tests du formulaire de contact
├── cart.spec.ts        # Tests du panier
└── responsive.spec.ts  # Tests responsive
```

## Scripts disponibles

```bash
# Lancer tous les tests E2E
npm run test:e2e

# Lancer les tests avec l'interface graphique
npm run test:e2e:ui

# Lancer les tests en mode debug
npm run test:e2e:debug

# Voir le rapport des tests
npm run test:e2e:report
```

## Tests implémentés

### 1. Tests de fumée (`smoke.spec.ts`)
- Vérification du chargement de la page d'accueil
- Test d'accessibilité des pages principales

### 2. Tests de la page d'accueil (`homepage.spec.ts`)
- Affichage du hero section
- Statistiques visibles
- Navigation fonctionnelle
- Section de confiance
- Newsletter

### 3. Tests de navigation (`navigation.spec.ts`)
- Navigation menu principal
- Navigation panier
- Liens du footer
- Menu dropdown
- Navigation par logo

### 4. Tests des produits (`products.spec.ts`)
- Affichage des produits
- Filtrage par catégorie
- Recherche de produits
- Tri des produits
- Gestion des résultats vides

### 5. Tests de contact (`contact.spec.ts`)
- Formulaire de contact
- Validation des champs
- Informations de contact
- Liens sociaux
- Horaires d'ouverture

### 6. Tests du panier (`cart.spec.ts`)
- Panier vide
- Ajout au panier
- Mise à jour quantité
- Suppression d'articles
- Calcul du total

### 7. Tests responsive (`responsive.spec.ts`)
- Menu mobile
- Adaptation hero
- Grille produits responsive
- Footer responsive
- Formulaires mobiles
- Images responsive

## Configuration Playwright

Le fichier `playwright.config.ts` configure :
- Tests en parallèle
- Retry automatique en CI
- Base URL : http://localhost:3000
- Traces et screenshots en cas d'échec
- Tests sur Chrome, Firefox, Safari, et mobiles
- Serveur de développement automatique

## Bonnes pratiques

1. **Sélecteurs robustes** : Utilisation de rôles ARIA et data-testid
2. **Attentes explicites** : await expect() pour éviter les flaky tests
3. **Tests isolés** : Chaque test doit être indépendant
4. **Tests rapides** : Focus sur les cas critiques
5. **Tests maintenables** : Éviter la duplication de code

## Debugging

### Mode debug
```bash
npm run test:e2e:debug
```

### Voir les traces
```bash
npx playwright show-trace trace.zip
```

### Screenshots
Les screenshots sont automatiquement capturés en cas d'échec et stockés dans `test-results/`.

## CI/CD

Pour l'intégration continue :
```yaml
- name: Install dependencies
  run: npm ci
  
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
  
- name: Run Playwright tests
  run: npm run test:e2e
  
- uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

## Problèmes connus

1. **Images GitHub** : Les images depuis GitHub retournent text/plain au lieu d'images
2. **Dépendances système** : Certaines bibliothèques système peuvent manquer sur certains environnements

## Prochaines étapes

1. Ajouter tests d'authentification quand implémenté
2. Tests de performance avec Lighthouse
3. Tests d'accessibilité automatisés
4. Tests de paiement (mode sandbox)
5. Tests d'API si backend ajouté