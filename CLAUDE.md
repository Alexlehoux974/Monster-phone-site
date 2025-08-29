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
- Static product data in `/src/data/products.ts` (100+ products from Airtable export)
- Images from GitHub CDN: `https://raw.githubusercontent.com/*/Monster-Phone-Images/main/**`
- LocalStorage for cart persistence (key: `monsterphone-cart`)
- Airtable database "E-Commerce" (appBe6BwVNs2wvp60) with table "Catalogue Produits Unifié" (tblA440HJGiI17SQJ)

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

**1. GitHub Images**
- Some GitHub CDN images may fail to load properly
- Solution: `ImageWithFallback` component handles fallbacks automatically
- Category-based placeholders in `/src/lib/image-utils.ts`

**2. Build Configuration**
- ESLint errors ignored during builds (`ignoreDuringBuilds: true` in next.config.ts)
- **Important**: Always run `npm run lint` manually before deployment

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
- 100+ products total processed from Airtable
- All products synchronized with products.ts
- Automatic URL slug generation for new products
- Base: E-Commerce (appBe6BwVNs2wvp60)
- Table: Catalogue Produits Unifié (tblA440HJGiI17SQJ)

## Important Development Notes

- **French Language**: All user-facing content must be in French
- **La Réunion Focus**: 974 area code, local delivery emphasis
- **Static Data**: Always import from `/src/data/products.ts`, no API calls
- **Image Handling**: Always use `ImageWithFallback` component for product images
- **Cart State**: Persists in localStorage, supports test mode via `initialItems` prop
- **Mobile First**: Test responsive design, especially complex navigation
- **Production Port**: When running production, use port 3001: `npm start -- -p 3001`

## Product Integration Workflow

### Adding New Products from Airtable

1. **Fetch from Airtable**: Query products where `fait` = false (max 2 at a time)
   ```bash
   mcp__airtable__list_records baseId="appBe6BwVNs2wvp60" tableId="tblA440HJGiI17SQJ" filterByFormula="NOT({fait})" maxRecords=2
   ```

2. **Add to products.ts**: Update `/src/data/products.ts` with Product interface structure
   - Generate unique `urlSlug` 
   - Map category/subcategory correctly
   - Include all variants with color codes

3. **Handle Images**: 
   - Download from Airtable: `wget [URL] -O filename.jpg`
   - Upload to GitHub: `Monster-Phone-Images` repository
   - Use format: `https://raw.githubusercontent.com/[user]/Monster-Phone-Images/main/[brand]/[category]/[file]`

4. **Validation**:
   - Test on `http://localhost:3001/produit/[slug]`
   - Verify category filtering on `/nos-produits`
   - Check cart functionality

### Image Repository Structure
```
Monster-Phone-Images/
├── HONOR/
│   ├── Smartphones/
│   └── Tablettes/
├── HIFUTURE/
│   └── Ecouteurs/
└── Accessoires/
    └── LED/
```

## Product Data Structure

Key fields in `/src/data/products.ts`:
- **Product Interface**: 30+ fields including variants, specifications, ratings
- **ProductVariant**: color, colorCode, ean, stock, images[]
- **Dynamic URL generation**: `/produit/[urlSlug]` pages created automatically
- **Menu structure**: Auto-generated from product categories and brands