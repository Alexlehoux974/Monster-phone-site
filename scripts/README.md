# Scripts - Monster Phone Boutique

Organisation des scripts de développement, test, et maintenance.

## 📁 Structure

```
scripts/
├── tests/          # Scripts de test (39 fichiers)
├── debug/          # Scripts de debug et maintenance (16 fichiers)
├── migrations/     # Scripts de migration DB (1 fichier)
├── maintenance/    # Scripts d'utilitaires (2 fichiers)
└── obsolete/       # Scripts archivés (8 fichiers)
```

---

## 🧪 Tests (`/tests/`)

Scripts de test pour différents composants de l'application.

### Tests d'authentification
- `test-admin-authentication.js` - Test d'authentification admin
- `test-admin-login-*.js` - Tests du flow de connexion admin
- `test-login-flow.js` - Test du parcours de connexion général

### Tests de produits
- `test-product-*.js` - Tests des structures produits
- `test-stock-*.js` - Tests de gestion du stock

### Tests de commandes
- `test-order-*.js` - Tests du flow de commande
- `test-admin-after-order.js` - Test admin après commande

### Tests UI
- `test-audio-menu.js` - Test du menu audio
- `test-hero-section.js` - Test de la section hero

---

## 🔧 Debug (`/debug/`)

Scripts de débogage et de correction one-time.

### Gestion des admins
- `add-admin-*.js` - Scripts d'ajout d'utilisateurs admin
- `check-admin*.js` - Vérification des comptes admin
- `create-admin-user.js` - Création d'utilisateur admin
- `fix-admin-role.js` - Correction des rôles admin
- `fix-role-issue.js` - Fix des problèmes de rôles

### Analyse et debug
- `analyze-products.js` - Analyse de la structure des produits
- `analyze-all-products.js` - Analyse complète des produits
- `debug-promotions.js` - Debug du système de promotions
- `fix-parent-promos.js` - Fix des promotions parentes
- `check-categories.js` - Vérification des catégories

---

## 🗄️ Migrations (`/migrations/`)

Scripts de migration de base de données.

- `run-migration.js` - Exécution de migrations DB

---

## 🛠️ Maintenance (`/maintenance/`)

Scripts d'utilitaires et de maintenance.

- `trigger-admin-verify.js` - Déclenchement de vérification admin
- `validate-all-rules.js` - Validation de toutes les règles métier

---

## 🗑️ Obsolète (`/obsolete/`)

Scripts archivés qui ne sont plus nécessaires (auth maintenant fixée).

### Debug auth (résolu)
- `test-admin-spinner.js`
- `test-admin-stuck-spinner.js`
- `test-admin-long-wait.js`
- `test-admin-debug-complet.js`
- `test-admin-detailed.js`
- `test-alexandre-login.js`
- `test-login-fixed.js`
- `test-real-login-detailed.js`

**Note:** Ces scripts ont servi à débugger les problèmes de connexion qui sont maintenant résolus (voir commits 658c559, 3355c6d, d42e38a).

---

## 🚀 Utilisation

### Exécuter un script de test
```bash
node scripts/tests/test-login-flow.js
```

### Exécuter un script de debug
```bash
node scripts/debug/check-admin.js
```

### Exécuter une migration
```bash
node scripts/migrations/run-migration.js
```

---

## ⚠️ Avertissement

**Ne jamais exécuter les scripts dans `/obsolete/`** - ils sont conservés pour référence historique uniquement.

Les scripts dans `/debug/` sont des one-time fixes et ne doivent être exécutés que si nécessaire.

---

## 📝 Historique

**2025-01-03** - Organisation initiale des scripts
- Création de la structure de dossiers
- Déplacement de 57 scripts depuis la racine
- Archivage des scripts obsolètes d'auth
