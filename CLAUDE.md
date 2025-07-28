# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Monster Phone Boutique** - E-commerce Next.js 15 application for gaming phone accessories.

**Tech Stack**: Next.js 15.4.2 + React 19 + TypeScript, Tailwind CSS v4 + Radix UI + Framer Motion  
**Data Sources**: Airtable for products, GitHub repository for images, Google Drive for documents  

## Development Commands

```bash
# Development
npm run dev                    # Development server with Turbopack
npm run build                  # Production build
npm start -- -p 3001         # Start production server on port 3001
npm run lint                   # ESLint code linting

# Testing and debugging
curl -I http://localhost:3001/ # Test server response
ps aux | grep next            # Check running processes
netstat -tlnp | grep 3001     # Check port availability
rm -rf .next                   # Clean build cache when TypeScript errors persist
```

## Architecture & Key Patterns

### Data Integration
- **Airtable Base**: "E-commerce - Monster Phone Produits" with 15 products, 7 categories, 4 brands (HONOR, MY WAY, MUVIT, MONSTER)
- **Product Data**: Static export in `/src/data/products.ts` (source of truth)
- **GitHub CDN**: Images served from `https://raw.githubusercontent.com/Alexlehoux974/Monster-Phone-Images/main/`
- **⚠️ Critical Issue**: Images return `text/plain` instead of actual images due to repository access issues

### TypeScript Interface Mismatch
**Critical**: Two conflicting Product interfaces exist:
- `/src/data/products.ts`: Uses simplified English field names (`name`, `brand`, `category`, `price`)
- `/src/types/index.ts`: Uses French Airtable field names (`'Nom du Produit'`, `'Marque'`, `'Catégorie'`)

**Solution**: Always use the interface from `/src/data/products.ts` as it matches the actual data structure.

### Navigation System
- **Complex Dropdown Menus**: Hierarchical structure (Categories → Subcategories → Brands → Products)
- **State Management**: React state hooks (`hoveredCategory`, `hoveredSubcategory`, `hoveredBrand`)
- **URL Filtering**: `/nos-produits?category=...&brand=...`
- **Known Issue**: Dropdown menus rely on mouse events (enter/leave) which may conflict with z-index and overlays

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── nos-produits/      # Product listing
│   ├── accessoires/       # Accessories
│   ├── services/          # Service pages (livraison, garantie, support, etc.)
│   └── legal/             # Legal pages (mentions-legales, confidentialite, etc.)
├── components/            
│   ├── Header.tsx         # Complex navigation with dropdowns
│   ├── MonsterPhoneHero.tsx # Animated hero section
│   ├── ProductCard.tsx    # Product display
│   └── ui/               # Radix UI primitives
├── data/
│   └── products.ts        # Product data and menu structure
└── types/
    └── index.ts           # TypeScript interfaces (outdated)
```

### Common Issues & Solutions

**Server Won't Start**
```bash
ps aux | grep next         # Find existing process
kill -9 [PID]             # Kill if necessary
npm run build && npm start -- -p 3001
```

**Images Not Loading**
- Test URL directly in browser
- Use Google Drive MCP for alternative images
- Implement placeholder fallbacks

**Build Errors**
- TypeScript strict mode is enabled
- ESLint ignores build errors (`ignoreDuringBuilds: true`)
- Clean cache: `rm -rf .next`

## Important Configuration

- **Production Port**: Always use port 3001 to avoid conflicts
- **Next.js Config**: ESLint ignores build errors which may hide issues
- **Image Optimization**: Next.js Image component configured for GitHub CDN
- **Path Aliases**: `@/*` maps to `./src/*`

## MCP Integrations

- **Airtable**: Access product database "E-commerce - Monster Phone Produits"
- **Google Drive**: Search for product documentation and images
- **WhatsApp**: Customer communication (if configured)

## Memory

### Workflow and Verification
- When completing tasks, verify with Playwright before returning to user
- Monitor server.log for image loading errors and compilation issues
- The project is actively being developed with frequent UI updates