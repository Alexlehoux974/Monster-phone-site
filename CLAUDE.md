# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Monster Phone Boutique** - E-commerce Next.js 15 application for gaming phone accessories targeting La Réunion market.

**Tech Stack**: Next.js 15.4.2 + React 19 + TypeScript, Tailwind CSS v4 + Radix UI + Framer Motion  
**Data Sources**: Airtable for products, GitHub repository for images, Google Drive for documents  
**Language**: French (fr) interface with La Réunion specific content (974)

## Development Commands

```bash
# Development
npm run dev                    # Development server with Turbopack (auto-detects available port)
npm run build                  # Production build
npm start -- -p 3001         # Start production server on port 3001 (required for deployment)
npm run lint                   # ESLint code linting

# Troubleshooting
curl -I http://localhost:3001/ # Test server response
ps aux | grep next            # Check running processes  
kill -9 [PID]                 # Kill stuck Next.js process
netstat -tlnp | grep 3001     # Check port availability
rm -rf .next                   # Clean build cache for TypeScript errors
```

## Architecture & Key Patterns

### Data Architecture
- **Airtable Base**: "E-commerce - Monster Phone Produits" with 15 products across 7 categories
- **Brands**: HONOR (smartphones), MY WAY (cables), MUVIT (kids accessories), MONSTER (power banks)
- **Product Data**: Static export in `/src/data/products.ts` (authoritative source)
- **Menu Structure**: Hierarchical organization with categories → subcategories → brands → products
- **GitHub CDN**: Images from `raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/`

### Critical Data Issues
**⚠️ Image Loading Problem**: GitHub repository returns `text/plain` instead of images
- **Error Pattern**: `The requested resource isn't a valid image... received text/plain; charset=utf-8`
- **Impact**: All product images fail to load
- **Workaround**: Implement fallback images or use alternative CDN

**⚠️ TypeScript Interface Conflict**: 
- `/src/data/products.ts`: English fields (`name`, `brand`, `category`, `price`) ✅ **Use This**
- `/src/types/index.ts`: French Airtable fields (`'Nom du Produit'`, `'Marque'`) ❌ **Outdated**
- **Solution**: Always use `/src/data/products.ts` interface - it matches actual data structure

### Navigation Architecture
**Header Component**: Complex multi-level dropdown system with hover states
- **Structure**: Categories → Subcategories → Brands → Products (4 levels deep)
- **State Management**: `hoveredCategory`, `hoveredSubcategory`, `hoveredBrand` hooks
- **URL Routing**: `/nos-produits?category=...&brand=...` query parameters
- **Known Issue**: Mouse event conflicts with z-index layers (z-[70] required)

**Menu Data Source**: `menuStructure` object in `/src/data/products.ts`
- **smartphones**: HONOR products only  
- **accessoires**: Complex hierarchy (Audio & Son, Chargement & Énergie, Créativité & Enfants)
- **Placeholder Categories**: Empty categories for future expansion

### Project Structure & Patterns
```
src/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Homepage with component composition
│   ├── nos-produits/      # Product catalog with filtering
│   ├── accessoires/       # Accessories showcase
│   ├── services/          # Business pages (livraison, garantie, SAV)
│   ├── legal/             # Legal compliance (RGPD, mentions-legales)
│   └── layout.tsx         # Root layout with French locale
├── components/            
│   ├── Header.tsx         # Complex navigation (300+ lines)
│   ├── MonsterPhoneHero.tsx # Framer Motion hero animations
│   ├── ProductCard.tsx    # Product display with image fallbacks
│   ├── Footer.tsx         # Business info and legal links
│   └── ui/               # Radix UI primitives (button, card, badge)
├── data/
│   └── products.ts        # Single source of truth (530+ lines)
├── lib/
│   └── utils.ts           # Tailwind class merging utilities
└── types/
    └── index.ts           # Legacy interfaces (do not use)
```

**Key Architecture Patterns**:
- **Component Composition**: Homepage built from discrete sections
- **Static Data**: No API calls, all data in `/src/data/products.ts`
- **Image Optimization**: Next.js Image with GitHub CDN remote patterns
- **French Localization**: All content in French, targeting La Réunion market

### Common Issues & Solutions

**Development Server Issues**
```bash
# Port conflicts (common with multiple Next.js projects)
ps aux | grep next         # Find existing processes
kill -9 [PID]             # Kill stuck processes
npm run dev                # Turbopack auto-selects available port

# Production server startup
npm run build && npm start -- -p 3001  # Required port for deployment
```

**Image Loading Failures** 
- **Root Cause**: GitHub repository access returns `text/plain` instead of images
- **Detection**: Check `dev.log` for "requested resource isn't a valid image" errors
- **Temporary Fix**: Test individual image URLs in browser
- **Long-term**: Implement fallback placeholders or migrate to reliable CDN

**TypeScript & Build Problems**
```bash
rm -rf .next               # Clear Next.js cache
npm run build              # Check for type errors (strict mode enabled)
npm run lint               # ESLint validation (build errors ignored in config)
```

**Navigation Dropdown Issues**
- **Problem**: Mouse hover states conflict with z-index layering
- **Solution**: Use z-[70] minimum for dropdown overlays
- **Debug**: Check React state in dev tools (`hoveredCategory`, `hoveredSubcategory`)

## Configuration & Deployment

**Next.js Configuration (`next.config.ts`)**:
- ESLint ignores build errors (`ignoreDuringBuilds: true`) - may hide TypeScript issues
- Image optimization configured for GitHub CDN remote patterns
- Turbopack enabled for development builds

**TypeScript Setup**:
- **Strict Mode**: Enabled with ES2017 target
- **Path Aliases**: `@/*` maps to `./src/*`  
- **Import Resolution**: Bundler moduleResolution for Next.js 15

**Production Requirements**:
- **Port 3001**: Required for deployment to avoid conflicts
- **Build Validation**: Always test production build before deployment
- **Image Fallbacks**: Critical due to GitHub CDN reliability issues

## MCP Integration Points

**Data Sources**:
- **Airtable MCP**: Product database "E-commerce - Monster Phone Produits" (15 products, 7 categories)
- **Google Drive MCP**: Product documentation, alternative images, business documents
- **WhatsApp MCP**: Customer communication and support (if configured)

**Integration Pattern**: Static data export from Airtable to `/src/data/products.ts` rather than real-time API calls

## Development Best Practices

**Code Quality**:
- Follow existing French naming conventions for user-facing content
- Use TypeScript interfaces from `/src/data/products.ts` (not `/src/types/index.ts`)
- Maintain component composition pattern established in homepage
- Implement image fallbacks for GitHub CDN reliability issues

**Testing & Verification**:
- Always verify production build with `npm run build` before deployment
- Monitor `dev.log` and `server.log` for image loading errors  
- Test dropdown navigation behavior across different screen sizes
- Validate French content and La Réunion specific references (974 area code)

**Performance Considerations**:
- Leverage Turbopack for fast development builds
- Static data eliminates API latency but requires manual updates
- Next.js Image optimization helps with GitHub CDN issues when images load correctly
- Complex dropdown navigation may impact mobile performance