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
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (Header + MonsterPhoneHero)
│   ├── nos-produits/      # Product listing with filters
│   ├── accessoires/       # Accessories page
│   ├── promotions/        # Promotions page
│   ├── reparation/        # Repair services page
│   └── test-*/            # Test pages for development
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation with hierarchical menus
│   ├── MonsterPhoneHero.tsx # Homepage hero section
│   ├── ProductCard.tsx    # Product display cards
│   ├── Footer.tsx         # Site footer
│   └── ui/               # UI primitives (Radix-based)
├── data/
│   └── products.ts        # Airtable export (source of truth)
├── types/
│   └── index.ts           # TypeScript interfaces
├── hooks/                 # Custom React hooks
└── lib/
    └── utils.ts           # Utility functions
```

### Key Development Patterns

**Image Handling**: All product images are served from GitHub CDN (`raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/`). Images may return `text/plain` instead of actual images due to repository access issues. Next.js Image component is configured with the GitHub remote pattern in `next.config.ts`.

**Data Management**: Product data is statically imported from `/src/data/products.ts` which contains Airtable export. **Critical**: There's a type mismatch between the Product interface in `/src/data/products.ts` (simplified field names like `name`, `brand`) and `/src/types/index.ts` (French Airtable field names like `'Nom du Produit'`, `'Marque'`). Use the `/src/data/products.ts` interface for data operations.

**Navigation**: Complex hierarchical dropdown menu system in Header component with hover-based state management. Uses React state (`hoveredCategory`, `hoveredSubcategory`, `hoveredBrand`) for multi-level navigation. URL parameters for filtering: `/nos-produits?category=...&brand=...`.

**State Management**: Client-side React state for navigation menus, no external state management library. Component state handles dropdown visibility and hover interactions.

**Styling**: Tailwind CSS v4 with custom configuration, Radix UI primitives in `/src/components/ui/`, class-variance-authority for component variants, Framer Motion for animations (hero section).

**TypeScript Configuration**: Strict mode enabled with path aliases (`@/*` → `./src/*`). ESLint configured to ignore build errors in `next.config.ts`.

## Development Commands

```bash
# Development
npm run dev                    # Development server with Turbopack
npm run build                  # Production build
npm start                      # Start production server (default port 3000)
npm start -- -p 3001         # Start production server on port 3001
npm run lint                   # ESLint code linting

# Testing and debugging
curl -I http://localhost:3001/ # Test server response
curl -I [image-url]           # Test individual image URLs from GitHub CDN
ps aux | grep next            # Check running processes
netstat -tlnp | grep 3001     # Check port availability
rm -rf .next                   # Clean build cache when TypeScript errors persist
npm run build && npm start -- -p 3001  # Full production build test
```

## Common Issues & Troubleshooting

### Server Won't Start
1. Check existing processes: `ps aux | grep next`
2. Kill if necessary: `kill -9 [PID]`
3. Check port availability: `netstat -tlnp | grep 3001`
4. Rebuild if errors: `npm run build`

### Images Not Loading
1. Test image URL directly in browser
2. Verify GitHub repository access
3. Alternative: search for images in Google Drive
4. Use temporary placeholder if necessary

### Dropdown Menus Broken
1. Check mouse events (enter/leave)
2. Verify z-index and overlay conflicts
3. Test hierarchical navigation (categories → subcategories → brands)

### Build Errors
1. Clean: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check TypeScript errors
4. Verify imports and exports

### TypeScript Interface Mismatch
**Critical Issue**: The project has two conflicting Product interfaces:
- `/src/data/products.ts`: Uses simplified English field names (`name`, `brand`, `category`, `price`)
- `/src/types/index.ts`: Uses French Airtable field names (`'Nom du Produit'`, `'Marque'`, `'Catégorie'`)

**Solution**: Always use the interface from `/src/data/products.ts` for data operations as it matches the actual exported data structure. The `/src/types/index.ts` interface appears to be outdated Airtable field mappings.

## Key Features

### Hierarchical Navigation
- **Structure**: Categories → Subcategories → Brands → Products
- **Behavior**: Hover for navigation, click for selection
- **URLs**: `/nos-produits?category=...&brand=...`

### Gaming Hero Section
- **Component**: MonsterPhoneHero with Framer Motion animations
- **Design**: Aurora background, particles, shimmer text effects
- **CTA**: Links to catalog and promotions

### Product Catalog
- **Filtering**: By brand, category, price range
- **Display**: Responsive grid with ProductCard components
- **SEO**: Optimized URLs and meta data

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

**Type Safety**: Project has two conflicting Product interfaces which will cause TypeScript errors. Always use the interface from `/src/data/products.ts` as it matches the actual data structure.

**Font Configuration**: Uses Geist fonts (sans and mono) from next/font/google, but layout.tsx still has default create-next-app metadata instead of Monster Phone Boutique branding.

**Build Configuration**: ESLint ignores build errors (`ignoreDuringBuilds: true` in next.config.ts), which may hide important issues during development.

## Memory

### Workflow and Verification
- Lorsque tu as fini de réaliser la demande de l'utilisateur et que tu es prêt à revenir vers lui pour attendre de nouvelles instructions, visite avant le projet avec playwright pour t'assurer que c'est vraiment fini.