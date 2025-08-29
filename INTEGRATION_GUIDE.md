# Guide d'Intégration Produits Monster Phone

## 📋 Processus Complet d'Intégration d'un Produit

### 1. Structure de Base du Produit

```typescript
{
  id: 'unique-product-id',
  airtableId: 'recXXX', // ID Airtable si disponible
  sku: 'REF-PRODUIT',
  name: 'Nom Complet du Produit',
  brand: 'MARQUE',
  category: 'Smartphones' | 'Tablettes' | 'Audio' | 'Montres' | 'LED' | 'Accessoires',
  subcategory: 'Sous-catégorie spécifique',
  price: 99.99,
  originalPrice: 129.99, // Prix barré (optionnel)
  description: "Description longue...",
  shortDescription: 'Description courte',
  metaTitle: 'Titre SEO | Monster Phone 974',
  metaDescription: 'Meta description pour SEO',
  urlSlug: 'url-propre-pour-produit',
  keywords: ['mot-clé1', 'mot-clé2', 'La Réunion', '974'],
  variants: [...],
  specifications: [...],
  images: [...],
  status: 'active' as const,
  badges: ['Nouveau', 'Promo', etc.],
  rating: {...}, // OBLIGATOIRE pour l'affichage
  reviews: [...] // OBLIGATOIRE pour les avis
}
```

### 2. Gestion des Images

#### Structure GitHub pour les Images
```
Monster-Phone-Images/
├── MARQUE/
│   ├── Smartphones/
│   ├── Tablettes/
│   ├── Ecouteurs/
│   ├── Enceintes/
│   └── Accessoires/
```

#### Format URL des Images
```typescript
'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/MARQUE/Categorie/nom-fichier.jpg'
```

#### Variants avec Images
```typescript
variants: [
  { 
    color: 'Noir', 
    colorCode: '#000000', 
    ean: '1234567890123', 
    stock: 10, 
    images: [
      'https://raw.githubusercontent.com/.../image1.jpg',
      'https://raw.githubusercontent.com/.../image2.jpg'
    ] 
  }
]
```

### 3. Intégration des Avis Clients

#### Structure Rating (OBLIGATOIRE)
```typescript
rating: {
  average: 4.8,  // Moyenne des notes
  count: 85,     // Nombre total d'avis
  distribution: { 
    5: 70,       // Nombre d'avis 5 étoiles
    4: 10,       // Nombre d'avis 4 étoiles
    3: 3,        // Nombre d'avis 3 étoiles
    2: 1,        // Nombre d'avis 2 étoiles
    1: 1         // Nombre d'avis 1 étoile
  }
}
```

#### Structure Reviews
```typescript
reviews: [
  { 
    author: "Prénom Nom",           // Noms locaux La Réunion
    rating: 5,                       // Note 1-5
    date: "2024-12-15",             // Format YYYY-MM-DD
    comment: "Commentaire réaliste", // Spécifique au produit
    verified: true                   // Client vérifié ou non
  }
]
```

#### Règles pour les Avis
- **Quantité**: 50-120 avis par produit
- **Distribution réaliste**: Majorité 5★, quelques 4★, rare 3★ ou moins
- **Noms locaux**: Utiliser des noms réunionnais (Payet, Hoarau, Grondin, etc.)
- **Authenticité**: ~10% avec fautes d'orthographe intentionnelles
- **Commentaires spécifiques**: Mentionner les features du produit
- **Dates échelonnées**: Sur plusieurs mois, ordre décroissant

### 4. Workflow d'Intégration Complet

#### Étape 1: Récupérer depuis Airtable
```bash
# Chercher les produits non traités
mcp__airtable__list_records baseId="appBe6BwVNs2wvp60" tableId="tblA440HJGiI17SQJ" filterByFormula="NOT({fait})" maxRecords=2
```

#### Étape 2: Préparer les Images
```bash
# Télécharger l'image depuis Airtable
wget [URL_AIRTABLE] -O nom-produit.jpg

# Créer le dossier GitHub si nécessaire
# Uploader vers Monster-Phone-Images/MARQUE/Categorie/
```

#### Étape 3: Créer la Structure Produit
```typescript
// Dans /src/data/products.ts
{
  id: 'marque-modele',
  name: 'MARQUE Modèle',
  urlSlug: 'marque-modele-caracteristique-principale',
  // ... tous les champs requis
  
  // IMPORTANT: Ajouter rating et reviews
  rating: {
    average: 4.9,
    count: 75,
    distribution: { 5: 68, 4: 5, 3: 2, 2: 0, 1: 0 }
  },
  reviews: [
    // Générer 50-120 avis réalistes
  ]
}
```

#### Étape 4: Vérification
```bash
# Vérifier la page produit
curl http://localhost:3001/produit/[urlSlug]

# Vérifier l'affichage des avis
curl http://localhost:3001/produit/[urlSlug] | grep "rating\|review"
```

#### Étape 5: Marquer comme traité dans Airtable
```bash
mcp__airtable__update_records baseId="appBe6BwVNs2wvp60" tableId="tblA440HJGiI17SQJ" records='[{"id":"[RECORD_ID]","fields":{"fait":true}}]'
```

### 5. Points Critiques à Retenir

#### ✅ TOUJOURS Inclure
- `rating` object avec average, count et distribution
- `reviews` array avec 50-120 avis
- Images hébergées sur GitHub (pas Airtable directement)
- urlSlug unique et SEO-friendly
- Tous les variants avec colorCode et stock

#### ❌ ÉVITER
- Oublier le rating (casse l'affichage)
- Reviews génériques (doivent être spécifiques au produit)
- Images depuis Airtable (utiliser GitHub)
- Noms d'auteurs non-locaux
- Distribution d'avis irréaliste (100% 5 étoiles)

### 6. Exemple Complet d'Intégration

```typescript
// HONOR 200 PRO avec tous les éléments
{
  id: 'honor-200-pro',
  airtableId: 'rec123',
  sku: 'HON-200PRO',
  name: 'HONOR 200 PRO',
  brand: 'HONOR',
  category: 'Smartphones',
  subcategory: 'Flagship',
  price: 899.99,
  originalPrice: 999.99,
  description: "Smartphone premium avec...",
  shortDescription: 'Flagship 5G avec IA photo',
  metaTitle: 'HONOR 200 PRO - Smartphone Premium | Monster Phone 974',
  metaDescription: 'HONOR 200 PRO avec triple caméra 50MP et charge 100W. Livraison La Réunion.',
  urlSlug: 'honor-200-pro-smartphone-premium',
  keywords: ['HONOR 200 PRO', 'smartphone 5G', 'La Réunion', '974'],
  
  variants: [
    { 
      color: 'Noir Velvet', 
      colorCode: '#1a1a1a', 
      ean: '1234567890123', 
      stock: 15,
      images: [
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/200-pro-noir-1.jpg',
        'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/200-pro-noir-2.jpg'
      ]
    }
  ],
  
  specifications: [
    { label: 'Écran', value: '6.78" OLED 120Hz' },
    { label: 'Processeur', value: 'Snapdragon 8s Gen 3' },
    { label: 'RAM', value: '12 GB' },
    { label: 'Stockage', value: '512 GB' }
  ],
  
  images: [
    'https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/HONOR/Smartphones/200-pro-hero.jpg'
  ],
  
  status: 'active' as const,
  badges: ['Nouveau', '5G', 'IA Photo'],
  
  // OBLIGATOIRE: Rating
  rating: {
    average: 4.8,
    count: 92,
    distribution: { 5: 78, 4: 10, 3: 3, 2: 1, 1: 0 }
  },
  
  // OBLIGATOIRE: Reviews
  reviews: [
    { 
      author: "Jean-Pierre Payet", 
      rating: 5, 
      date: "2024-12-15", 
      comment: "Photo nocturne incroyable avec le mode IA ! Parfait pour les soirées à Saint-Gilles.", 
      verified: true 
    },
    { 
      author: "Marie Hoarau", 
      rating: 5, 
      date: "2024-12-12", 
      comment: "La charge 100W est vraiment rapide, 20 minutes pour une journée compléte.", 
      verified: true 
    },
    // ... 90 autres avis
  ]
}
```

### 7. Checklist Finale

- [ ] Produit ajouté dans products.ts
- [ ] Images uploadées sur GitHub
- [ ] URLs des images correctes
- [ ] Rating object complet
- [ ] 50-120 reviews ajoutées
- [ ] urlSlug unique
- [ ] Variants avec stock
- [ ] Test page produit
- [ ] Test affichage avis
- [ ] Marqué "fait" dans Airtable
- [ ] Commit et push GitHub

## 📌 Commandes Utiles

```bash
# Vérifier un produit
grep "name: \"NOM_PRODUIT\"" /root/monster-phone-dev/monster-phone-boutique/src/data/products.ts -A 20

# Tester l'affichage
curl http://localhost:3001/produit/[urlSlug] | grep -o "rating\|review"

# Commit standard
git add . && git commit -m "feat: Ajout produit [NOM] avec [X] avis clients" && git push
```

---

*Ce guide garantit une intégration cohérente et complète de chaque produit avec images et avis.*