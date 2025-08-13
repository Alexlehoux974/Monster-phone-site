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
- Static product data in `/src/data/products.ts` (15 products from Airtable export)
- GitHub CDN for images (currently problematic - returns text/plain instead of images)
- LocalStorage for cart persistence

## Development Commands

```bash
# Development
npm run dev                    # Turbopack dev server (binds to 0.0.0.0, auto-detects port)
npm run build                  # Production build
npm start                      # Production server (defaults to port 3000)
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
npm test -- ComponentName      # Run tests matching pattern
npx playwright test homepage   # Run specific E2E test file
npx playwright test -g "navigation"  # Run tests matching pattern

# Common Issues & Solutions
ps aux | grep next             # Find stuck Next.js processes
kill -9 [PID]                  # Kill stuck process
rm -rf .next                   # Clear build cache for TypeScript errors
```

## High-Level Architecture

### Core Application Structure
- **App Router**: Next.js 15 App Router with server components
- **Context API**: Cart state management with localStorage persistence (`CartContext`)
- **Static Data**: All product data hardcoded in `/src/data/products.ts` - Product interface with 30+ fields
- **SEO Optimized**: Structured data, metadata per page, sitemap generation at `/src/app/sitemap.ts`
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4

### Data Architecture
- **Product Interface**: TypeScript interface with variants, specifications, ratings in `/src/data/products.ts`
- **Menu Structure**: Complex hierarchical navigation (categories → subcategories → brands → products)
- **Static Pattern**: No API calls, manual Airtable exports, 15 products total
- **Cart Persistence**: LocalStorage with key `monsterphone-cart`, managed by CartContext

### Critical Known Issues

**1. Image Loading** ⚠️
- GitHub CDN (`raw.githubusercontent.com`) returns `text/plain` instead of images
- All product images fail to load with "not a valid image" error
- **Solution**: `ImageWithFallback` component uses placeholder images from `/src/lib/image-utils.ts`
- Placeholders mapped by category (Smartphones, Audio & Son, etc.)

**2. ESLint During Builds**
- `ignoreDuringBuilds: true` in next.config.ts bypasses type errors
- Must run `npm run lint` manually before deployment

**3. Port Configuration**
- Development server binds to 0.0.0.0 (accessible externally)
- Production typically runs on port 3000

### Navigation System
**Header Component** (`/src/components/Header.tsx`):
- Multi-level dropdown: Categories → Subcategories → Brands → Products
- Complex hover state management with multiple useState hooks
- URL pattern: `/nos-produits?category=...&brand=...`
- PromoBar component with animated gradient
- Cart dropdown with live preview and quantity controls

### Component Architecture
```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── page.tsx           # Homepage with hero, features, products
│   ├── nos-produits/      # Product catalog with filtering
│   ├── produit/[slug]/    # Dynamic product pages
│   ├── checkout/          # Checkout flow
│   └── legal/             # Legal pages (RGPD compliance)
├── components/            
│   ├── Header.tsx         # Complex navigation system
│   ├── ImageWithFallback.tsx # Handles broken GitHub images
│   ├── ProductCard.tsx    # Product display component
│   └── ui/               # Radix UI primitives (button, card, tabs, etc.)
├── contexts/
│   ├── CartContext.tsx    # Shopping cart with localStorage
│   └── AuthContext.tsx    # User authentication (mock)
├── data/
│   └── products.ts        # Static product data (538 lines)
└── lib/
    ├── utils.ts           # cn() helper, formatPrice()
    └── image-utils.ts     # Image fallback handling
```

## Testing Infrastructure

**Jest Configuration** (`jest.config.js`):
- Next.js preset with TypeScript support
- Test files in `src/__tests__/` and component-specific `__tests__` folders
- Module path alias: `@/` → `src/`
- Coverage excludes layout and page components
- Setup file: `jest.setup.js` for test environment

**Playwright Configuration** (`playwright.config.ts`):
- E2E tests in `e2e/` directory (7 test files)
- Tests against Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Base URL: http://localhost:3000
- Auto-starts dev server before tests with 120s timeout
- HTML reporter, screenshots on failure

## Key Utilities

**`/src/lib/utils.ts`**:
- `cn()` - Tailwind CSS class merging with clsx and tailwind-merge
- `formatPrice()` - Format numbers as EUR currency (French locale)
- `parseGitHubImages()` - Extract image URLs from newline-separated strings
- `generateSlug()` - Create URL-safe slugs from text
- `truncateText()` - Text truncation with ellipsis

**`/src/lib/image-utils.ts`**:
- `getCategoryPlaceholder()` - Returns placeholder image by product category
- `isProblematicGitHubUrl()` - Detects GitHub raw URLs
- `getWorkingImageUrl()` - Transforms or replaces problematic image URLs
- `generateProductPlaceholder()` - Dynamic placeholder generation

## TypeScript Configuration

- **Strict Mode**: Enabled in `tsconfig.json`
- **Path Alias**: `@/*` maps to `./src/*`
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **JSX**: Preserve for Next.js processing

## Important Development Notes

- **French Language**: All user-facing content must be in French
- **La Réunion Focus**: 974 area code, local delivery emphasis
- **Static Data**: Always import from `/src/data/products.ts`, no API calls
- **Image Handling**: Use `ImageWithFallback` component for all product images
- **Cart State**: Persists in localStorage, test mode support via `initialItems` prop
- **Mobile First**: Test responsive design, especially complex navigation on mobile
- **Next.js Config**: ESLint errors ignored during builds (`ignoreDuringBuilds: true`)