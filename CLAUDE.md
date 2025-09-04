# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Monster Phone Boutique - E-commerce Next.js application for gaming phone accessories and smartphones, targeting the La Réunion market (974).

**Tech Stack**:
- Next.js 15.4.2 + React 19 + TypeScript (strict mode)
- Tailwind CSS v4 + Radix UI components + Framer Motion
- Supabase integration for product data (migration in progress)
- Static product data fallback in `/src/data/products.ts`
- French language interface

## Development Commands

```bash
# Development
npm run dev                    # Dev server with Turbopack on 0.0.0.0:3000
npm run build                  # Production build
npm start -- -p 3001           # Production server on port 3001 (preferred)
npm run lint                   # ESLint validation (always run before deployment)

# Testing
npm test                       # Run Jest unit tests
npm test -- ComponentName      # Run specific test pattern
npm run test:coverage          # Generate coverage report
npm run test:e2e              # Run all Playwright E2E tests
npx playwright test homepage   # Run specific E2E test
npm run test:e2e:ui           # Open Playwright UI for debugging

# Database (Supabase)
npm run db:setup              # Apply initial schema (run migration 001 first in dashboard)
npm run db:migrate            # Migrate static products to Supabase
```

## High-Level Architecture

### Dual Data Architecture (Migration in Progress)
- **Static Data Path**: `/src/data/products.ts` → React Components → LocalStorage Cart
- **Supabase Path**: Supabase DB → `/src/lib/supabase/client.ts` → Adapter → React Components
- **Adapter Layer**: `/src/lib/supabase/adapters.ts` converts between formats
- **Parallel Pages**: `/nos-produits` (static) and `/produits-supabase` (database)
- **Cart State**: React Context with localStorage persistence (key: `monsterphone-cart`)

### Critical Image System
- **Primary Source**: GitHub CDN `https://raw.githubusercontent.com/*/Monster-Phone-Images/main/**`
- **Fallback Component**: `ImageWithFallback` with category-based placeholders
- **Image Utils**: `/src/lib/image-utils.ts` handles URL transformations
- **Known Issue**: Some GitHub images may return 404 or text responses

### Navigation Architecture
The Header component implements multi-level navigation:
- **Structure**: Categories → Subcategories → Brands → Products
- **URL Pattern**: `/nos-produits?category=...&subcategory=...&brand=...`
- **Data Sources**: Static (`products_menu.ts`) or dynamic (Supabase)
- **Mobile**: Responsive drawer with touch-optimized navigation

### Product Display System
- **Catalog Pages**: `/nos-produits` (static) and `/produits-supabase` (database)
- **Product Pages**: Dynamic routes `/produit/[slug]` and `/produit-supabase/[slug]`
- **Reviews**: Mandatory rating object and reviews array for static products
- **Variants**: Color/size options with stock tracking

## Supabase Integration

**Database**: `nswlznqoadjffpxkagoz.supabase.co`
**Tables**: products, brands, categories, variants, images, specifications, reviews, collections

**Key Adapter Functions**:
- `supabaseProductToLegacy()`: Converts DB product to static format
- `legacyProductToSupabase()`: Converts static product to DB format
- `generateMenuStructureFromProducts()`: Builds navigation from DB products

**Migration Status**:
- Products table populated with 100+ products
- Images and variants migrated
- Reviews and ratings migrated
- Navigation menu generation working
- Full-text search implemented

## Testing Infrastructure

**Jest Configuration**: Tests in `src/__tests__/` and component `__tests__` folders
- Module alias: `@/` maps to `src/`
- Coverage excludes layouts and pages

**Playwright E2E**: Tests in `e2e/` directory
- All major browsers and mobile viewports
- Auto-starts dev server before tests
- Base URL: http://localhost:3000

## Key Utilities

**`/src/lib/utils.ts`**:
- `cn()`: Tailwind class merging
- `formatPrice()`: EUR currency formatting

**`/src/lib/image-utils.ts`**:
- `getCategoryPlaceholder()`: Category-specific fallbacks
- `getWorkingImageUrl()`: URL transformation
- `generateProductPlaceholder()`: Dynamic placeholders

**`/src/hooks/useSupabaseData.ts`**:
- `useSupabaseProducts()`: Fetch products with relations
- `useSupabaseCategories()`: Category data
- `useSupabaseBrands()`: Brand data

## Build Configuration

**ESLint**: Errors ignored during builds (`ignoreDuringBuilds: true`)
- **Important**: Always run `npm run lint` manually before deployment
- Common warnings in Header component may be intentional

**TypeScript**: Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Target: ES2017

## Important Development Notes

- **French Language**: All user-facing content must be in French
- **Production Port**: Always use port 3001: `npm start -- -p 3001`
- **Image Component**: Always use `ImageWithFallback` for product images
- **Reviews Required**: Every static product needs rating and reviews arrays
- **Cart Testing**: CartContext supports test mode via `initialItems` prop
- **Mobile First**: Test responsive design, especially navigation
- **Migration Path**: New features should use Supabase, maintain static compatibility