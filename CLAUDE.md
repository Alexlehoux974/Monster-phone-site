# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monster Phone Boutique - E-commerce Next.js 15 application for gaming phone accessories and smartphones targeting the La Réunion market (974).

**Tech Stack**:
- Next.js 15.4.2 + React 19 + TypeScript (strict mode)
- Tailwind CSS v4 + Radix UI components + Framer Motion animations  
- No backend API - fully static data architecture
- French language interface

**Data Sources**:
- Static product data in `/src/data/products.ts` (65+ products from Airtable export)
- Images from GitHub CDN (known issue: returns text/plain instead of images)
- LocalStorage for cart persistence
- Airtable database "E-Commerce" (appBe6BwVNs2wvp60) with main table "Catalogue Produits Unifié"

## Development Commands

```bash
# Development
npm run dev                    # Dev server with Turbopack (binds to 0.0.0.0)
npm run build                  # Production build  
npm start                      # Production server (port 3000)
npm run lint                   # ESLint validation

# Testing  
npm test                       # Run Jest unit tests
npm run test:watch            # Jest watch mode
npm run test:coverage         # Generate coverage report
npm run test:e2e              # Run Playwright E2E tests
npm run test:e2e:ui           # Open Playwright UI
npm run test:e2e:debug        # Debug Playwright tests
npm run test:e2e:report       # Show test report

# Run specific tests
npm test -- ComponentName      # Match pattern in Jest
npx playwright test homepage   # Run specific E2E test

# Common Issues
ps aux | grep next            # Find stuck Next.js processes
kill -9 [PID]                 # Kill stuck process
rm -rf .next                  # Clear build cache
```

## High-Level Architecture

### Core Application Structure
- **App Router**: Next.js 15 App Router with server components by default
- **Cart State**: React Context API with localStorage persistence (`CartContext`)
- **Static Data**: All product data hardcoded in `/src/data/products.ts`
- **SEO Optimized**: Structured data, metadata per page, sitemap generation
- **Responsive Design**: Mobile-first with Tailwind CSS v4

### Data Flow Architecture  
- **Product Interface**: TypeScript interface with 30+ fields including variants, specifications, ratings
- **Menu Structure**: Complex hierarchical navigation (categories → subcategories → brands → products)
- **Static Pattern**: No API calls, manual Airtable exports, 65+ products total
- **Cart Persistence**: LocalStorage with key `monsterphone-cart`

### Critical Known Issues

**1. Image Loading** ⚠️
- GitHub CDN returns `text/plain` instead of images
- All product images fail to load with validation errors
- Solution: `ImageWithFallback` component provides placeholder images based on category
- Placeholders mapped in `/src/lib/image-utils.ts`

**2. Build Configuration**
- ESLint errors ignored during builds via `ignoreDuringBuilds: true` in next.config.ts
- Must run `npm run lint` manually before deployment

### Component Architecture
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with hero, features, products
│   ├── nos-produits/      # Product catalog with filtering
│   ├── produit/[slug]/    # Dynamic product pages
│   ├── checkout/          # Checkout flow
│   └── legal/             # Legal pages (RGPD compliance)
├── components/            
│   ├── Header.tsx         # Complex navigation system
│   ├── ImageWithFallback.tsx # Handles broken GitHub images
│   ├── ProductCard.tsx   # Product display component
│   └── ui/               # Radix UI primitives
├── contexts/
│   ├── CartContext.tsx    # Shopping cart state management
│   └── AuthContext.tsx    # User authentication (mock)
├── data/
│   └── products.ts        # Static product data (65+ products)
└── lib/
    ├── utils.ts           # cn() helper, formatPrice()
    └── image-utils.ts     # Image fallback handling
```

### Navigation System
**Header Component** (`/src/components/Header.tsx`):
- Multi-level dropdown: Categories → Subcategories → Brands → Products
- Complex hover state management
- URL pattern: `/nos-produits?category=...&brand=...`
- PromoBar component with animated gradient
- Cart dropdown with live preview and quantity controls

## Testing Infrastructure

**Jest Configuration** (`jest.config.js`):
- Next.js preset with TypeScript support
- Test files in `src/__tests__/` and component `__tests__` folders
- Module path alias: `@/` → `src/`
- Coverage excludes layout and page components

**Playwright Configuration** (`playwright.config.ts`):
- E2E tests in `e2e/` directory (7 test files)
- Tests against Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Base URL: http://localhost:3000
- Auto-starts dev server before tests

## Key Utilities

**`/src/lib/utils.ts`**:
- `cn()` - Tailwind CSS class merging with clsx and tailwind-merge
- `formatPrice()` - Format numbers as EUR currency (French locale)
- `parseGitHubImages()` - Extract image URLs from strings
- `generateSlug()` - Create URL-safe slugs from text
- `truncateText()` - Text truncation with ellipsis

**`/src/lib/image-utils.ts`**:
- `getCategoryPlaceholder()` - Returns placeholder by product category
- `isProblematicGitHubUrl()` - Detects problematic GitHub URLs
- `getWorkingImageUrl()` - Transforms or replaces broken image URLs
- `generateProductPlaceholder()` - Dynamic placeholder generation

## TypeScript Configuration

- **Strict Mode**: Enabled in `tsconfig.json`
- **Path Alias**: `@/*` maps to `./src/*`
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **JSX**: Preserve for Next.js processing

## Airtable Synchronization

**Sync Report** (`AIRTABLE_SYNC_REPORT.md`):
- 65 products total processed from Airtable
- 26 products synchronized
- 39 products added to products.ts
- Base: E-Commerce (appBe6BwVNs2wvp60)
- Table: Catalogue Produits Unifié (tblA440HJGiI17SQJ)

## Important Development Notes

- **French Language**: All user-facing content must be in French
- **La Réunion Focus**: 974 area code, local delivery emphasis
- **Static Data**: Always import from `/src/data/products.ts`, no API calls
- **Image Handling**: Always use `ImageWithFallback` component for product images
- **Cart State**: Persists in localStorage, supports test mode via `initialItems` prop
- **Mobile First**: Test responsive design, especially complex navigation
- **Next.js Config**: ESLint errors ignored during builds - run lint manually
- Parcours d'intégration d'un nouveau produit

  1. Récupération des données Airtable

  - Vérifier le produit dans la base Airtable "E-Commerce" (appBe6BwVNs2wvp60)
  - Table "Catalogue Produits Unifié" (tblA440HJGiI17SQJ)
  - Noter tous les champs : SKU, nom, prix, description, catégorie, marque, variantes, etc.

  2. Ajout dans products.ts

  - Ouvrir /src/data/products.ts
  - Ajouter le produit en respectant l'interface Product existante
  - Générer un slug unique pour l'URL
  - Mapper correctement category/subcategory selon la structure du menu

  3. Gestion des images

  - Comme les images GitHub retournent du text/plain, je dois :
    - Soit utiliser les placeholders par catégorie (automatique via ImageWithFallback)
    - Soit proposer une URL alternative si disponible
    - Le système utilisera automatiquement le bon placeholder selon la catégorie

  4. Vérification de l'intégration

  - Le produit apparaîtra automatiquement sur /nos-produits (filtrage par catégorie)
  - La page produit /produit/[slug] sera créée dynamiquement
  - Vérifier dans le menu Header si la catégorie/marque est bien listée

  5. Points de validation

  - ✅ Le produit s'affiche dans la bonne catégorie
  - ✅ Les variantes sont correctement listées
  - ✅ Le prix et les promotions s'affichent
  - ✅ La navigation menu → catégorie → produit fonctionne
  - ✅ Le produit peut être ajouté au panier

  6. Aucune action supplémentaire requise

  - Pas de build nécessaire (Next.js gère dynamiquement)
  - Pas de création de page (routing dynamique)
  - Pas de mise à jour du menu (généré depuis products.ts)

  Point critique : Tout passe par /src/data/products.ts - c'est le seul fichier à modifier pour ajouter un
  produit.
- Oui, je comprends maintenant parfaitement le processus ! Voici un script
  détaillé de la démarche pour intégrer les images depuis Airtable vers le
  site :

  📋 Script d'intégration des images Airtable → GitHub → Site

  1. Récupération depuis Airtable

  # Process automatisé (2 produits à la fois)
  1. Lire les produits Airtable avec champ "fait" = false
  2. Pour chaque produit:
     - Récupérer les URLs d'images depuis les champs:
       • "Images produit principal"
       • "Images variantes" (si variants existent)
     - Parser les URLs (format: nom_fichier (URL))

  2. Upload vers GitHub

  # Structure des dossiers GitHub
  Monster-Phone-Images/
  ├── HONOR/
  │   ├── Smartphones/
  │   └── Tablettes/
  ├── HIFUTURE/
  │   └── Ecouteurs/
  └── Accessoires/
      └── LED/

  # Téléchargement et upload
  - wget [URL_AIRTABLE] -O [nom_fichier]
  - git add, commit, push vers le repo GitHub

  3. Mise à jour products.ts

  // Structure à mettre à jour
  {
    id: 'produit-001',
    name: 'Nom Produit',
    images: [
      'https://raw.githubusercontent.com/[USER]/Monster-Phone-Images/main/[C
  ATEGORIE]/[nom_fichier]'
    ],
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        images: [
          'https://raw.githubusercontent.com/[USER]/Monster-Phone-Images/mai
  n/[CATEGORIE]/[variant_image]'
        ],
        stock: 10
      }
    ]
  }

  4. Configuration Next.js

  // next.config.ts - Déjà configuré ✅
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  }

  5. Validation et marquage Airtable

  # Après intégration réussie
  - Vérifier l'affichage sur le site (localhost:3001)
  - NE PAS cocher "fait" dans Airtable (consigne utilisateur)
  - Continuer avec les 2 produits suivants

  6. Points clés à retenir

  Images principales:
    - Toujours mettre dans le tableau "images" du produit
    - Format GitHub: raw.githubusercontent.com/[user]/[repo]/main/[path]

  Images variants:
    - Placer dans variant.images[] pour chaque couleur
    - Synchronisation automatique avec le carrousel

  Carrousel:
    - Combine automatiquement images produit + variants
    - Gère la navigation et le zoom
    - Badges couleur sur miniatures variants

  Erreurs courantes:
    - URL GitHub mal formée → 404
    - Duplicate urlSlug → Compilation TypeScript échoue
    - Images bloquées → Vérifier image-utils.ts

  7. Commande complète type

  # Exemple workflow complet pour 2 produits
  mcp__airtable__list_records baseId="appBe6BwVNs2wvp60"
  tableId="tblA440HJGiI17SQJ" filterByFormula="NOT({fait})" maxRecords=2

  # Pour chaque produit:
  wget "[URL_IMAGE]" -O "product-name.jpg"
  cd Monster-Phone-Images && git add . && git commit -m "Add product images"
   && git push

  # Update products.ts avec les nouvelles URLs GitHub
  # Test sur localhost:3001/produit/[slug]

  Ce processus garantit que chaque produit a ses images correctement
  intégrées et affichées dans le nouveau carrousel amélioré ! 🎯