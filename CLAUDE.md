# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Monster Phone Boutique** - E-commerce Next.js 15 application for gaming phone accessories targeting La Réunion market (974).

**Tech Stack**:
- Next.js 15.4.2 + React 19 + TypeScript (strict mode)
- Tailwind CSS v4 + Radix UI + Framer Motion
- No backend API - static data architecture
- French language interface

**Data Sources**:
- Airtable base "E-commerce - Monster Phone Produits" (15 products exported statically)
- GitHub CDN for images (currently broken - returns text/plain)
- Future: Google Drive integration planned

**Key Dependencies**:
- `framer-motion` (^12.23.6) - Hero animations and UI transitions
- `@radix-ui/react-slot` - Composable component primitives
- `lucide-react` - Icon library
- `clsx` + `tailwind-merge` - Conditional className utilities
- `class-variance-authority` - Component variant management
- `playwright` (^1.54.1) - Installed but not configured for testing

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

# Development Files Created
dev.log                        # Development server output log
server.log                     # Production server log
```

## Utility Functions Available

The project includes several utility functions in `/src/lib/utils.ts`:
- `cn()` - Tailwind CSS class merging with clsx
- `formatPrice()` - Format numbers as EUR currency (French locale)
- `parseGitHubImages()` - Extract image URLs from newline-separated strings
- `generateSlug()` - Create URL-safe slugs from text
- `truncateText()` - Text truncation with ellipsis

## Important Development Notes

**Core Package.json Scripts**:
- `dev`: Uses `--turbopack` flag and binds to `0.0.0.0` (accessible from network)
- `start`: Must be run with `-p 3001` flag for production deployment
- Full test suite configured with Jest for unit tests and Playwright for E2E tests

**React/Next.js Versions**:
- React 19.1.0 (latest) + Next.js 15.4.2
- Uses Next.js App Router (not Pages Router)
- TypeScript strict mode enabled

## Architecture & Key Patterns

### High-Level Architecture
This is a Next.js 15 e-commerce application using:
- **App Router**: Modern Next.js routing with server components
- **Context API**: For cart and authentication state management
- **Static Data**: No backend API, all product data is hardcoded
- **SEO Optimized**: Structured data, metadata, and sitemap generation
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Data Architecture
- **Single Source of Truth**: `/src/data/products.ts` (538 lines)
  - 15 products: 3 HONOR phones, 12 accessories
  - Brands: HONOR, MY WAY, MUVIT, MONSTER
  - Categories: Smartphones, Audio & Son, Chargement & Énergie, Créativité & Enfants
- **Product Interface**: TypeScript interface with 13 fields (id, name, brand, category, sku, price, description, metaTitle, metaDescription, urlSlug, keywords, images[], variants, status)
- **Menu Structure**: `menuStructure` object provides 4-level navigation hierarchy
- **Static Pattern**: No API calls, manual Airtable exports

### State Management
- **CartContext** (`/src/contexts/CartContext.tsx`): Shopping cart state and operations
- **AuthContext** (`/src/contexts/AuthContext.tsx`): User authentication state (mock implementation)
- Both contexts wrap the entire app in the root layout

### Critical Known Issues

**1. Image Loading Broken** ⚠️
- GitHub CDN returns `text/plain` instead of images
- All product images fail to load
- Error: "The requested resource isn't a valid image"
- **TODO**: Implement fallback images or migrate CDN

**2. TypeScript Interface Mismatch** ⚠️
- `/src/data/products.ts`: Uses English fields ✅ **CORRECT** - This is the single source of truth
- `/src/types/index.ts`: Uses French Airtable fields ❌ **OUTDATED - DO NOT USE**
- Always import `Product` interface and `allProducts` array from `/src/data/products.ts`
- The Product interface has: id, name, brand, category, sku, price?, description, metaTitle, metaDescription, urlSlug, keywords, images[], variants, status

**3. Port Configuration**
- Development: Auto-detects (warning shows port 3002 when 3000 in use)
- Production: **MUST use port 3001** for deployment

### Navigation System
**Header Component** (300+ lines):
- Multi-level dropdown: Categories → Subcategories → Brands → Products
- State hooks: `hoveredCategory`, `hoveredSubcategory`, `hoveredBrand`
- URL pattern: `/nos-produits?category=...&brand=...`
- Z-index requirement: minimum z-[70] for dropdowns

### Component Architecture
```
src/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Homepage (component composition)
│   ├── nos-produits/      # Product catalog with filtering
│   ├── accessoires/       # Accessories showcase page
│   ├── services/          # Business services (multiple sub-routes)
│   │   ├── garantie/      # Warranty information
│   │   ├── livraison/     # Delivery options
│   │   ├── retours/       # Return policy
│   │   ├── sav/           # After-sales service
│   │   └── support/       # Technical support
│   ├── legal/             # Legal pages (RGPD compliance)
│   │   ├── conditions-generales/
│   │   ├── confidentialite/
│   │   ├── mentions-legales/
│   │   └── plan-du-site/
│   ├── contact/           # Contact form page
│   ├── promotions/        # Promotional offers
│   └── layout.tsx         # Root layout (lang="fr", Geist font)
├── components/            
│   ├── Header.tsx         # Complex navigation with PromoBar
│   ├── MonsterPhoneHero.tsx # Framer Motion animations
│   ├── ProductCard.tsx    # Product display component
│   ├── Footer.tsx         # Business info and links
│   └── ui/               # Radix UI primitives
├── data/
│   └── products.ts        # Product data + menu structure
└── lib/
    └── utils.ts           # cn() helper for Tailwind
```

### Key Patterns
- **Component Composition**: Homepage sections as separate components
- **Static Data**: No loading states needed, instant rendering
- **French First**: All user-facing content in French
- **La Réunion Focus**: 974 area code, local delivery emphasis

### SEO & Metadata Architecture
- **Dynamic Metadata**: Each page exports metadata via `metadata.ts` files
- **Structured Data**: JSON-LD schemas for organization and website
- **Sitemap Generation**: Automatic via `sitemap.ts`
- **Robots.txt**: Generated dynamically via `robots.ts`
- **Open Graph**: Full social media preview support

### Routing Patterns
- **Product URLs**: `/produit/[slug]` - Dynamic routes based on `urlSlug`
- **Category Filtering**: `/nos-produits?category=X&brand=Y` - Query params
- **Service Pages**: Multiple sub-routes under `/services/`
- **Legal Pages**: RGPD-compliant pages under `/legal/`

## Configuration Details

**Next.js Config (`next.config.ts`)**:
- ESLint: `ignoreDuringBuilds: true` ⚠️ (bypasses type errors during build!)
- Images: Remote patterns for GitHub CDN configured (raw.githubusercontent.com)
- Turbopack: Enabled via --turbopack flag in dev script
- **WARNING**: Build process ignores ESLint errors - must run `npm run lint` manually

**TypeScript Config (`tsconfig.json`)**:
- Strict mode enabled
- Target: ES2017
- Path alias: `@/*` → `./src/*`
- Module resolution: bundler
- JSX: preserve
- Includes: all .ts/.tsx files, excludes node_modules

**Tailwind CSS v4**:
- PostCSS configuration with @tailwindcss/postcss
- Custom utilities via `cn()` helper (clsx + tailwind-merge)
- Radix UI component styling integration

**ESLint Config (`eslint.config.mjs`)**:
- Extends: next/core-web-vitals, next/typescript
- Uses FlatCompat for configuration compatibility
- **WARNING**: `ignoreDuringBuilds: true` in next.config.ts bypasses type errors during build!

## Testing Approach

### Unit Testing (Jest)
- **Configuration**: `jest.config.js` with Next.js preset
- **Test Files**: Place in `src/__tests__/` or alongside components as `*.test.tsx`
- **Coverage**: Configured to exclude boilerplate files
- **Mocks**: Next.js router and browser APIs pre-configured in `jest.setup.js`

### E2E Testing (Playwright)
- **Configuration**: `playwright.config.ts` with multi-browser support
- **Test Files**: Located in `/e2e/` directory
- **Browsers**: Chrome, Firefox, Safari + mobile viewports
- **Base URL**: http://localhost:3000
- **Key Test Suites**:
  - `smoke.spec.ts`: Basic functionality checks
  - `homepage.spec.ts`: Homepage tests
  - `products.spec.ts`: Product catalog tests
  - `navigation.spec.ts`: Navigation flow tests
  - `cart.spec.ts`: Shopping cart functionality
  - `contact.spec.ts`: Contact form tests
  - `responsive.spec.ts`: Mobile responsiveness

### Test Validation Process
1. `npm run lint` - ESLint validation (manual due to build bypass)
2. `npm run test` - Unit test suite
3. `npm run test:e2e` - Full E2E test suite
4. `npm run build` - TypeScript compilation check

## Deployment Requirements

1. **Port 3001 Required**: Production must use this specific port
2. **Build Validation**: Always run `npm run build` before deploy
3. **Image Fallbacks**: Critical - implement placeholder images
4. **French Content**: Verify all text is properly localized
5. **Performance**: Test navigation dropdowns on mobile

## Common Development Tasks

### Adding New Products
1. Update `/src/data/products.ts` with new product data
2. Ensure product follows existing interface (English fields)
3. Add to appropriate category in `menuStructure`
4. Test navigation dropdown shows new product

### Fixing Image Issues
1. Check if GitHub repo is accessible
2. Test individual image URLs in browser
3. Implement fallback in `ProductCard.tsx`
4. Consider alternative CDN solution

### Updating Navigation
1. Edit `menuStructure` in `/src/data/products.ts`
2. Test all hover states in Header component
3. Verify z-index layering (minimum z-[70])
4. Check mobile menu functionality

## Performance Considerations

- **Turbopack**: Fast refresh in development
- **Static Data**: No API latency, instant page loads
- **Image Optimization**: Next.js Image component (when CDN works)
- **Bundle Size**: Monitor with `npm run build` output
- **Navigation Complexity**: May impact mobile performance

## Project Context

This project is part of a multi-project repository structure where `/monster-phone-dev/monster-phone-boutique/` is a subdirectory. The parent directory contains other projects including School (Skool clone), WhatsApp MCP server, SuperClaude Framework, and Animations demos.

## Component Styling Patterns

- **Radix UI Components**: Located in `/src/components/ui/` (badge.tsx, button.tsx, card.tsx)
- **CVA (Class Variance Authority)**: Used for component variants in UI primitives
- **Tailwind Merge**: All className props should use `cn()` helper to properly merge classes
- **Framer Motion**: Used for hero animations and page transitions
```