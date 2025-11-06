# Script d'Enrichissement des Produits Monster Phone

## 📋 Vue d'ensemble

Ce script enrichit automatiquement tous les produits Monster Phone avec des sections CMS complètes, en suivant le template du **Nokia 110 4G**.

## 🎯 Objectif

Créer **4 sections CMS** pour chaque produit sans toucher à l'entête (prix, stock, variants, SKU):

1. **description_card** - Description marketing avec image
2. **specs_grid** - Grille de 8 spécifications techniques
3. **features_list** - 5 points forts du produit
4. **engagement_card** - Section "Pourquoi choisir ce produit"

## ⚠️ Ce que le script NE TOUCHE PAS

- ❌ **Prix** (gérés via CSV `/root/Monster-Phone-Images/Captures d'écran/STOCK BOUTIQUE ICELL4 DIGIQO Novembre 2025.csv`)
- ❌ **Stock** (géré via CSV)
- ❌ **Variants** (gérés via CSV)
- ❌ **SKU codes** (gérés via CSV)
- ❌ **Images produit** (tâche séparée future)

## 🚀 Utilisation

### Mode Dry-Run (Recommandé pour tester)

```bash
npx tsx scripts/enrich-product-cms.ts --dry-run
```

Affiche les actions qui seraient effectuées SANS modifier la base de données.

### Mode Dry-Run avec Limite

```bash
npx tsx scripts/enrich-product-cms.ts --dry-run --limit=5
```

Teste uniquement sur 5 produits.

### Exécution Réelle

```bash
# Traiter tous les produits
npx tsx scripts/enrich-product-cms.ts

# Traiter 10 produits
npx tsx scripts/enrich-product-cms.ts --limit=10

# Traiter 50 produits
npx tsx scripts/enrich-product-cms.ts --limit=50
```

## 📊 Statut Actuel

- **119 produits totaux** dans la base
- **118 produits** nécessitent un enrichissement
- **1 produit** (Nokia 110 4G) sert de référence
- **3 produits pilotes** enrichis avec succès:
  - HONOR X5B 4+
  - HONOR X6C 6+
  - HONOR X7C 8+

## ✅ Validation Effectuée

### Test Pilote (3 produits)

✅ **4 sections créées** par produit
✅ **Contenu en français** adapté pour La Réunion
✅ **Structure identique** au template Nokia 110 4G
✅ **Entête produit intact** (prix, stock, status non modifiés)
✅ **Métadonnées JSON** bien structurées
✅ **8 spécifications** avec icônes

### Produit Vérifié: HONOR X5B 4+

**URL**: https://monster-phone.re/produit/honor-x5b-4

**Sections créées**:
- display_order 2: description_card
- display_order 3: specs_grid (8 specs)
- display_order 4: features_list (5 features)
- display_order 5: engagement_card

**Entête intact**:
- Prix: 149.99€ ✅
- Stock: 0 ✅
- Status: active ✅

## 🏗️ Structure du Contenu Généré

### 1. Description Card

```html
<p>Le <strong>{NOM_PRODUIT}</strong> de <strong>{MARQUE}</strong> est un produit de qualité conçu pour répondre à vos besoins en {CATEGORIE}.</p>
<p>Avec ses fonctionnalités avancées et sa fiabilité reconnue, ce produit offre une expérience utilisateur optimale. Idéal pour un usage quotidien à La Réunion.</p>
```

### 2. Specs Grid (8 spécifications)

```json
{
  "specs": [
    {"icon":"📱", "label":"CATÉGORIE", "value":"{CATEGORIE}", "details":"Type de produit"},
    {"icon":"🌐", "label":"MARQUE", "value":"{MARQUE}", "details":"Fabricant"},
    {"icon":"✓", "label":"QUALITÉ", "value":"Premium", "details":"Produit certifié"},
    {"icon":"🚚", "label":"LIVRAISON", "value":"Rapide", "details":"24-48h à La Réunion"},
    {"icon":"🔒", "label":"GARANTIE", "value":"2 ans", "details":"Garantie constructeur"},
    {"icon":"💳", "label":"PAIEMENT", "value":"Sécurisé", "details":"CB, PayPal"},
    {"icon":"📞", "label":"SUPPORT", "value":"Local", "details":"SAV à La Réunion"},
    {"icon":"⭐", "label":"QUALITÉ", "value":"Certifiée", "details":"Normes CE"}
  ]
}
```

### 3. Features List (5 points forts)

```json
{
  "features": [
    {"icon":"✓", "text":"Qualité {MARQUE} - Fiabilité et performance reconnues"},
    {"icon":"✓", "text":"Livraison rapide - Expédition sous 24-48h à La Réunion"},
    {"icon":"✓", "text":"Garantie 2 ans - Protection constructeur complète"},
    {"icon":"✓", "text":"SAV local - Support technique disponible à La Réunion"},
    {"icon":"✓", "text":"Paiement sécurisé - Transactions protégées et confidentielles"}
  ]
}
```

### 4. Engagement Card

```html
<p>Choisir le <strong>{NOM_PRODUIT}</strong>, c'est opter pour la qualité et la fiabilité. Nous garantissons votre satisfaction avec nos produits soigneusement sélectionnés.</p>
<p><strong>Livraison rapide à La Réunion</strong> - Recevez votre commande en 24-48h.</p>
<p><strong>Service après-vente local</strong> - Une équipe à votre écoute pour vous accompagner.</p>
```

## 🔍 Checklist de Validation

Avant d'enrichir tous les produits:

- [x] Tester en mode --dry-run
- [x] Vérifier 3 produits pilotes
- [x] Confirmer entête intact (prix/stock/variants)
- [x] Valider structure des 4 sections
- [x] Vérifier contenu en français
- [x] Confirmer métadonnées JSON valides
- [ ] Enrichir tous les 115 produits restants

## 📝 Logs et Rapports

Le script affiche:

```
🚀 Script d'enrichissement des produits Monster Phone
================================================

🔍 Recherche des produits sans sections CMS...

📊 118 produit(s) nécessitent un enrichissement

📝 Création des sections pour: HONOR X5B 4+
   ✅ 4 sections créées avec succès

================================================
📊 RÉSULTATS

   ✅ Succès: 3
   ❌ Erreurs: 0
   📋 Total traité: 3
   ⏳ Restant: 115

================================================
```

## 🛠️ Architecture Technique

### Tables Supabase

**`product_content_sections`**:
- `product_id` (UUID) - Référence vers products
- `section_type` (enum) - Type de section
- `title` (text) - Titre de la section
- `content` (text) - Contenu HTML
- `metadata` (jsonb) - Données structurées (specs, features)
- `images` (text[]) - URLs Google Drive
- `is_enabled` (boolean) - Section active
- `display_order` (integer) - Ordre d'affichage
- `layout_variant` (text) - Variante de mise en page

### Composants Next.js

**`ProductContentCards.tsx`**:
- Récupère les sections via API `/api/product-sections`
- Affiche les 4 sections dans l'ordre
- Gère les mises à jour en temps réel via Supabase

## 🔗 Références

- **Produit template**: [Nokia 110 4G](https://monster-phone.re/produit/nokia-110-4g-2025)
- **Product ID template**: `42821a9c-9402-4047-9279-c33b0ce40b17`
- **Composant**: `/src/components/ProductContentCards.tsx`
- **API**: `/src/app/api/product-sections/route.ts`

## 💡 Prochaines Étapes

1. ✅ ~~Valider 3 produits pilotes~~
2. ⏳ Enrichir les 115 produits restants
3. ⏳ Améliorer le contenu avec descriptions spécifiques par catégorie
4. ⏳ Ajouter les images produit (tâche séparée)

## 📞 Support

Pour toute question ou problème:
- Vérifier les logs du script
- Consulter la base Supabase directement
- Tester en mode --dry-run avant modification

---

**Créé le**: 2025-11-06
**Dernière mise à jour**: 2025-11-06
**Statut**: ✅ Testé et validé sur 3 produits pilotes
