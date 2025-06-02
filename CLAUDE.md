# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LaunchPad is a full-stack demo application showcasing a modern JAMstack architecture with:
- **Frontend**: Next.js 14 with TypeScript, App Router, and Tailwind CSS
- **Backend**: Strapi v5 headless CMS with SQLite database
- **Structure**: Monorepo managed with Bun

## Essential Commands

### Development
```bash
# Initial setup (first time only)
bun run setup          # Installs dependencies and copies .env files for both apps

# Start development servers
bun run dev            # Runs both Strapi (port 1337) and Next.js (port 3000) concurrently
bun run next          # Run only Next.js
bun run strapi        # Run only Strapi

# Import demo data
bun run seed          # Imports pre-configured content into Strapi
```

### Building & Production
```bash
# Next.js (from /next directory)
bun run build         # Build for production
bun run start         # Start production server

# Strapi (from /strapi directory)
bun run build         # Build Strapi admin panel
bun run start         # Start production server
```

### Code Quality
```bash
# From /next directory
bun run lint          # Run ESLint

# Note: No test commands are configured in this project
```

## Architecture & Key Patterns

### Dynamic Zone System
The core of this architecture is the Dynamic Zone Manager that maps Strapi components to React components:
- **Location**: `/next/components/dynamic-zone/manager.tsx`
- **Pattern**: Uses Next.js dynamic imports with `ssr: false` for all dynamic components
- **Components**: 12 dynamic zone types (hero, features, testimonials, pricing, etc.)

### Data Fetching Layer
- **Main utility**: `/next/lib/strapi/fetchContentType.ts`
- **Features**: Draft mode support, error handling, no-store cache policy
- **Pattern**: Always use `spreadStrapiData` to normalize Strapi responses

### Internationalization (i18n)
- **Locales**: English (`en`) and French (`fr`)
- **Middleware**: Auto-redirects to locale-prefixed URLs
- **Context**: `SlugContext` manages localized slugs for language switching
- **Pattern**: All content fetching must include locale parameter

### Routing Architecture
- **Dynamic Pages**: `[locale]/[slug]` catch-all pattern
- **Content Types**: Different handling for pages, blog articles, and products
- **Preview Mode**: Secret-based authentication with live updates via postMessage

### State Management
- **Cart**: Global cart state via React Context (`/next/context/cart-context.tsx`)
- **Slugs**: Localized slug management for language switching

## Critical Implementation Details

### Environment Variables
```bash
# Strapi (.env)
HOST=0.0.0.0
PORT=1337
APP_KEYS=<generated>
JWT_SECRET=<generated>
API_TOKEN_SALT=<generated>
ADMIN_JWT_SECRET=<generated>
TRANSFER_TOKEN_SALT=<generated>

# Next.js (.env)
WEBSITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:1337
PREVIEW_SECRET=<your-secret>
IMAGE_HOSTNAME=localhost
```

### Strapi Content Structure
- **Single Types**: Global, BlogPage, ProductPage (with localization)
- **Collection Types**: Page, Article, Product, Category, FAQ, Testimonial, Plan
- **Dynamic Zones**: Flexible page builder with reusable components
- **Deep Population**: Custom middleware at `/strapi/src/middlewares/deepPopulate.ts`

### Component Organization
- **Server Components**: Default for pages (SEO-friendly)
- **Client Components**: Dynamic zones and interactive elements
- **Pattern**: Always check if a component should be client-side before adding interactivity

### Data Flow
1. Content created/edited in Strapi CMS
2. Next.js fetches via REST API with locale parameter
3. Dynamic Zone Manager renders appropriate components
4. SEO metadata generated from Strapi data
5. Draft mode for preview functionality

## Development Workflow

1. **Adding New Dynamic Zone Components**:
   - Create component in `/next/components/dynamic-zone/`
   - Add to componentMap in `manager.tsx`
   - Create corresponding Strapi component in `/strapi/src/components/dynamic-zone/`

2. **Working with Localization**:
   - Always include locale in Strapi queries
   - Use `SlugContext` for language switching
   - Ensure all content types have i18n enabled in Strapi

3. **Modifying Content Types**:
   - Update schema in `/strapi/src/api/[content-type]/content-types/[content-type]/schema.json`
   - Run `bun run strapi develop` to apply changes
   - Update TypeScript types if needed

4. **Performance Considerations**:
   - Use dynamic imports for heavy components
   - Keep dynamic zones client-side only (`ssr: false`)
   - Optimize images with Next.js Image component