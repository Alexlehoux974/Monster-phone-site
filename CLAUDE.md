# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Monster Phone Boutique** - Site e-commerce Next.js 15 pour accessoires et téléphones gaming
- **Framework** : Next.js 15.4.2 + React 19 + TypeScript
- **Styling** : Tailwind CSS v4 + Radix UI + Framer Motion
- **Serveur** : Production sur port 3001 (`npm start -- -p 3001`)
- **Build** : `npm run build` puis `npm start -- -p 3001`

## 🗂️ Sources de Données & Intégrations

### 1. Base Airtable - Données Produits
- **Base** : "E-commerce - Monster Phone Produits" 
- **Accès** : Via export statique dans `/src/data/products.ts`
- **Structure** :
  - 15 produits, 7 catégories, 4 marques (HONOR, MY WAY, MUVIT, MONSTER)
  - Champs : id, name, brand, category, price, description, images[], metaTitle, urlSlug, etc.
- **Consultation** : Utiliser MCP Airtable pour accéder aux données live si besoin

### 2. GitHub Repository - Images
- **Repo** : `Alexlehoux974/Monster-Phone-Images`
- **CDN** : `https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/`
- **Structure** : Organisée par marque/produit (`/HONOR/Images/200-Pro/`, `/MUVIT/Images/`, etc.)
- **⚠️ Problème actuel** : Images retournent `text/plain` au lieu d'images (accès repo/404)

### 3. Google Drive - Recherche & Documents
- **Usage** : Recherche de documentation produits, spécifications techniques
- **Intégration** : Via MCP Google Drive pour accéder aux fiches produits
- **Types** : Fiches techniques, images alternatives, documents marketing

## Architecture & Tech Stack

**Framework**: Next.js 15.4.2 with App Router, React 19, TypeScript  
**Styling**: Tailwind CSS v4 + Radix UI + Framer Motion  
**Data Sources**: Static data from Airtable export, GitHub CDN for images  
**Production**: Runs on port 3001 (`npm start -- -p 3001`)

### Project Structure
```
src/
├── app/                    # Pages Next.js App Router
│   ├── page.tsx           # Accueil (Header + MonsterPhoneHero)
│   ├── nos-produits/      # Listing produits avec filtres
│   ├── accessoires/       # Page accessoires
│   └── [produit]/         # Pages produits individuelles
├── components/            # Composants UI
│   ├── Header.tsx         # Navigation avec menus hiérarchiques
│   ├── MonsterPhoneHero.tsx # Hero page d'accueil
│   └── ProductCard.tsx    # Cartes produits
├── data/
│   └── products.ts        # Export Airtable (source de vérité)
└── types/
    └── index.ts           # Interfaces TypeScript
```

### Key Development Patterns

**Image Handling**: All product images are served from GitHub CDN. Images may return `text/plain` instead of actual images due to repository access issues. Use Next.js Image component for optimization.

**Data Management**: Product data is statically imported from `/src/data/products.ts` which contains Airtable export. Update this file when product data changes.

**Navigation**: Hierarchical menu system (Categories → Subcategories → Brands → Products) with hover-based navigation and URL parameters (`/nos-produits?category=...&brand=...`).

**TypeScript**: Strict mode enabled. Product interface defined in `/src/types/index.ts`.

### 3. Development Commands

```bash
# Development
npm run dev                    # Development server with Turbopack
npm run build                  # Production build
npm start                      # Start production server (default port 3000)
npm start -- -p 3001         # Start production server on port 3001
npm run lint                   # ESLint code linting

# Common debugging
curl -I http://localhost:3001/ # Test server response
ps aux | grep next            # Check running processes
netstat -tlnp | grep 3001     # Check port availability
rm -rf .next                   # Clean build cache
```

### 4. Résolution de Problèmes Courants

#### A. Server ne démarre pas
1. Vérifier processus existants : `ps aux | grep next`
2. Killer si nécessaire : `kill -9 [PID]`
3. Check port disponible : `netstat -tlnp | grep 3001`
4. Rebuild si erreurs : `npm run build`

#### B. Images ne chargent pas
1. Tester URL image directement dans navigateur
2. Vérifier accès repo GitHub
3. Alternative : chercher images dans Google Drive
4. Utiliser placeholder temporaire si nécessaire

#### C. Menus déroulants bugués
1. Vérifier événements mouse (enter/leave)
2. Check z-index et overlay conflicts
3. Tester navigation hierarchique (categories → subcategories → brands)

#### D. Build Errors
1. Clean : `rm -rf .next`
2. Rebuild : `npm run build`
3. Vérifier TypeScript errors
4. Check imports et exports

## 🎯 Fonctionnalités Clés

### 1. Navigation Hiérarchique
- **Structure** : Categories → Subcategories → Brands → Products
- **Comportement** : Hover pour navigation, click pour sélection
- **URLs** : `/nos-produits?category=...&brand=...`

### 2. Hero Page Gaming
- **Component** : MonsterPhoneHero avec animations Framer Motion
- **Design** : Background Aurora, particules, shimmer text
- **CTA** : Liens vers catalogue et promotions

### 3. Catalogue Produits
- **Filtrage** : Par marque, catégorie, prix
- **Display** : Grid responsive avec ProductCard
- **SEO** : URLs optimisées et meta données

## MCP Integrations

### Airtable (Product Data)
- **Base**: "E-commerce - Monster Phone Produits"
- **Access**: Use MCP Airtable tools to sync product data
- **Key Records**: 15 products, 7 categories, 4 brands (HONOR, MY WAY, MUVIT, MONSTER)

### Google Drive (Documentation)
- **Purpose**: Product specifications, technical sheets, marketing materials
- **Integration**: Use MCP Google Drive tools for document access

## Important Notes

**Image CDN Issue**: GitHub repository images may return `text/plain` responses instead of actual images. Monitor access and implement fallbacks.

**Production Server**: Always run production server on port 3001 to avoid conflicts: `npm start -- -p 3001`

**Navigation System**: Complex hierarchical dropdown menus rely on mouse events (enter/leave). Test thoroughly on different devices.

**Build Process**: Clean `.next` directory if encountering build issues. TypeScript strict mode is enabled.