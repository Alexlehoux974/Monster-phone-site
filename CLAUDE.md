# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monster Phone Boutique - E-commerce Next.js 15 application for gaming phone accessories targeting La Réunion market (974).

**Tech Stack**:
- Next.js 15.4.2 + React 19 + TypeScript (strict mode)
- Tailwind CSS v4 + Radix UI + Framer Motion
- No backend API - static data architecture
- French language interface

**Data Sources**:
- Airtable base "E-commerce - Monster Phone Produits" (15 products exported statically)
- GitHub CDN for images (currently broken - returns text/plain)
- Local product data in `/src/data/products.ts`

## Development Commands

```bash
# Development
npm run dev                    # Turbopack dev server (binds to 0.0.0.0, auto-detects port)
npm run build                  # Production build
npm start -- -p 3001           # Production server (must use port 3001)
npm run lint                   # ESLint validation (Next.js core-web-vitals)

# Testing
npm run test                   # Run Jest unit tests
npm run test:watch             # Run Jest in watch mode
npm run test:coverage          # Generate test coverage report
npm run test:e2e               # Run Playwright E2E tests
npm run test:e2e:ui            # Open Playwright test UI
npm run test:e2e:debug         # Debug Playwright tests
npm run test:e2e:report        # Show Playwright test report

# Run specific tests
npm test -- smoke              # Run tests matching "smoke"
npm test -- --testPathPattern=components  # Test specific directory
npx playwright test homepage   # Run specific E2E test file
npx playwright test -g "navigation"  # Run tests matching pattern

# Common Issues & Solutions
ps aux | grep next             # Find stuck Next.js processes
kill -9 [PID]                  # Kill stuck process
rm -rf .next                   # Clear build cache for TypeScript errors
npm run build && npm start -- -p 3001  # Full production test
```

## High-Level Architecture

### Core Application Structure
- **App Router**: Next.js 15 App Router with server components
- **Context API**: Cart and authentication state management
- **Static Data**: No backend API, all product data hardcoded in `/src/data/products.ts`
- **SEO Optimized**: Structured data, metadata, sitemap generation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Data Architecture
- **Single Source of Truth**: `/src/data/products.ts` (538 lines)
  - 15 products: 3 HONOR phones, 12 accessories
  - Brands: HONOR, MY WAY, MUVIT, MONSTER
  - Categories: Smartphones, Audio & Son, Chargement & Énergie, Créativité & Enfants
- **Product Interface**: TypeScript interface with 18 fields including id, name, brand, category, price, images
- **Menu Structure**: `menuStructure` object provides 4-level navigation hierarchy
- **Static Pattern**: No API calls, manual Airtable exports

### Critical Known Issues

**1. Image Loading Broken** ⚠️
- GitHub CDN returns `text/plain` instead of images
- All product images fail to load
- Error: "The requested resource isn't a valid image"
- **Workaround**: `ImageWithFallback` component uses placeholder images

**2. Port Configuration**
- Development: Auto-detects (warning shows port 3002 when 3000 in use)
- Production: **MUST use port 3001** for deployment

**3. Cart Persistence** ✅ (Fixed)
- Cart now persists using localStorage with key `monsterphone-cart`
- Automatically saves/loads on state changes
- Test mode support via `initialItems` prop

### Navigation System
**Header Component** (`/src/components/Header.tsx`):
- Multi-level dropdown: Categories → Subcategories → Brands → Products
- State hooks: `hoveredCategory`, `hoveredSubcategory`, `hoveredBrand`
- URL pattern: `/nos-produits?category=...&brand=...`
- Z-index requirement: minimum z-[70] for dropdowns

### Component Architecture
```
src/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Homepage with component composition
│   ├── nos-produits/      # Product catalog with filtering
│   ├── produit/[slug]/    # Dynamic product pages
│   ├── accessoires/       # Accessories showcase
│   ├── services/          # Business services (multiple sub-routes)
│   ├── legal/             # Legal pages (RGPD compliance)
│   └── layout.tsx         # Root layout (lang="fr", Geist font)
├── components/            
│   ├── Header.tsx         # Complex navigation with PromoBar
│   ├── MonsterPhoneHero.tsx # Framer Motion animations
│   ├── ProductCard.tsx    # Product display component
│   ├── Footer.tsx         # Business info and links
│   └── ui/               # Radix UI primitives
├── contexts/
│   ├── CartContext.tsx    # Shopping cart state management (with localStorage)
│   └── AuthContext.tsx    # User authentication (mock)
├── data/
│   └── products.ts        # Product data + menu structure
└── lib/
    ├── utils.ts           # cn() helper for Tailwind
    └── image-utils.ts     # Image fallback handling
```

## Utility Functions

The project includes several utility functions in `/src/lib/utils.ts`:
- `cn()` - Tailwind CSS class merging with clsx
- `formatPrice()` - Format numbers as EUR currency (French locale)
- `parseGitHubImages()` - Extract image URLs from newline-separated strings
- `generateSlug()` - Create URL-safe slugs from text
- `truncateText()` - Text truncation with ellipsis

## Configuration Details

**Next.js Config (`next.config.ts`)**:
- ESLint: `ignoreDuringBuilds: true` ⚠️ (bypasses type errors during build!)
- Images: Remote patterns for GitHub CDN configured
- Turbopack: Enabled via --turbopack flag in dev script

**TypeScript Config (`tsconfig.json`)**:
- Strict mode enabled
- Target: ES2017
- Path alias: `@/*` → `./src/*`
- Module resolution: bundler

**Testing Configuration**:
- **Jest**: Unit testing with Next.js preset, setup in `jest.config.js`
- **Playwright**: E2E testing for multiple browsers, config in `playwright.config.ts`
- **Test Files**: Unit tests in `src/__tests__/`, E2E tests in `e2e/`

## Important Development Notes

- **React/Next.js Versions**: React 19.1.0 + Next.js 15.4.2 (latest versions)
- **Static Data**: Always import `Product` interface and `allProducts` from `/src/data/products.ts`
- **French Content**: All user-facing content must be in French
- **La Réunion Focus**: 974 area code, local delivery emphasis
- **Navigation Complexity**: May impact mobile performance due to multi-level dropdowns
- **Build Validation**: Always run `npm run lint` manually since build ignores ESLint errors
- **ImageWithFallback Component**: Use for all product images to handle CDN failures