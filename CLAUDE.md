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

## Development Commands

```bash
# Development
npm run dev                    # Turbopack dev server (auto-detects port, defaults to 3000)
npm run build                  # Production build
npm start -- -p 3001           # Production server (must use port 3001)
npm run lint                   # ESLint validation

# Common Issues & Solutions
ps aux | grep next             # Find stuck Next.js processes
kill -9 [PID]                  # Kill stuck process
rm -rf .next                   # Clear build cache for TypeScript errors
npm run build && npm start -- -p 3001  # Full production test
```

## Architecture & Key Patterns

### Data Architecture
- **Single Source of Truth**: `/src/data/products.ts` (538 lines)
  - 15 products: 3 HONOR phones, 12 accessories
  - Brands: HONOR, MY WAY, MUVIT, MONSTER
  - Categories: Smartphones, Audio & Son, Chargement & Énergie, Créativité & Enfants
- **Menu Structure**: `menuStructure` object provides 4-level navigation hierarchy
- **Static Pattern**: No API calls, manual Airtable exports

### Critical Known Issues

**1. Image Loading Broken** ⚠️
- GitHub CDN returns `text/plain` instead of images
- All product images fail to load
- Error: "The requested resource isn't a valid image"
- **TODO**: Implement fallback images or migrate CDN

**2. TypeScript Interface Mismatch** ⚠️
- `/src/data/products.ts`: Uses English fields ✅ **CORRECT**
- `/src/types/index.ts`: Uses French Airtable fields ❌ **OUTDATED - DO NOT USE**
- Always import from `/src/data/products.ts`

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
│   ├── services/          # Business services (SAV, livraison, garantie)
│   ├── legal/             # Legal pages (RGPD compliance)
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

## Configuration Details

**Next.js Config (`next.config.ts`)**:
- ESLint: `ignoreDuringBuilds: true` (hides type errors!)
- Images: Remote patterns for GitHub CDN configured
- Turbopack: Enabled for fast dev builds

**TypeScript Config**:
- Strict mode enabled
- Target: ES2017
- Path alias: `@/*` → `./src/*`
- Module resolution: bundler

**Tailwind CSS v4**:
- PostCSS configuration present
- Custom utilities via `cn()` helper
- Radix UI component styling

## Testing Approach

Currently no formal testing framework. Validation process:
1. `npm run build` - Catch TypeScript errors
2. `npm run lint` - ESLint validation  
3. Manual browser testing
4. Check dev.log for image loading errors

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