# Produkt Auto - AI Coding Agent Instructions

## Project Overview

Next.js 16 (App Router) vehicle dealership site with **Croatian/English/German i18n**, Sanity CMS, and Zustand state management. Focuses on premium used vehicles with comparison, favorites, and financing calculator features.

## Key Architecture Patterns

### Internationalization (next-intl)

- **Routing**: Locale-prefixed routes via `[locale]` dynamic segment. Croatian (default) has no prefix, EN/DE use `/en`, `/de`
- **Locales**: Defined in `src/i18n/routing.ts` as `["hr", "en", "de"]`
- **Navigation**: Always use `Link` from `@/i18n/navigation`, never Next.js Link directly
- **Translations**: Access via `useTranslations("namespace")` hook. Message files in `src/i18n/messages/{locale}.json`
- **Server Components**: Call `await setRequestLocale(locale)` at top of page components for proper locale context

### State Management (Zustand + Persist)

- **Hydration Pattern**: All persisted stores use `skipHydration: true` and manual rehydration via `StoreHydration` component
- **Critical**: Check `hasHydrated` state before rendering UI dependent on store data to prevent SSR/client mismatches
- **Example**: `usporediStore` limits vehicle comparison to 3 items, stores in localStorage as `usporedi-storage`
- **Stores**: `favoritiStore` (favorites), `usporediStore` (comparison)

### Sanity CMS Integration

- **Admin Panel**: Embedded at `/admin` route (configured in `sanity.config.ts`)
- **Content Fetching**: Use functions from `src/sanity/lib/fetch.ts` with proper caching strategies
- **Schema**: Vehicle schema at `src/sanity/schemas/vozilo.ts` with groups: `osnovni`, `tehnika`, `slike`, `dodatno`
- **Images**: Use `@sanity/image-url` builder from `src/sanity/lib/client.ts` for optimized image URLs

### Design System & Styling

- **Color System**: Custom semantic tokens documented in `docs/COLOR_SYSTEM.md`
  - Use `text-savings` and `text-savings-label` for price discounts (NOT `text-success`)
  - Bronze/copper for "Ušteda" labels, teal-green for discounted prices
- **Design Tokens**: Centralized in `src/lib/designTokens.ts` - use these constants instead of hardcoded values
- **UI Components**: Radix UI + shadcn/ui in `src/components/ui/`. Modify via `components.json` config

### Data & Validation

- **Vehicle Type**: `Vozilo` interface in `src/types/vozilo.ts` defines all vehicle properties
- **Validation**: Zod schemas in `src/lib/schemas.ts` with **localized error messages**
  - Use `getContactFormSchema(locale)` for locale-specific validation
- **Honeypot**: Contact forms include `hp` field for spam prevention (should remain empty)

## Critical Developer Workflows

### Testing (Vitest + Testing Library)

```bash
npm test              # Run tests
npm run test:ui       # Interactive UI mode
npm run test:coverage # With coverage (thresholds: 80%)
```

- **Setup**: `src/__tests__/setup.ts` mocks `next-intl` and `@/i18n/navigation`
- **Pattern**: Tests colocated in `src/__tests__/{components,lib,stores}/`
- **i18n Mocking**: Uses Croatian messages by default. Access via mocked `useTranslations`

### Running Development

```bash
npm run dev    # Starts dev server at localhost:3000
npm run build  # Production build
npm run lint   # ESLint
```

- **Sanity Studio**: Access at `http://localhost:3000/admin` after dev server starts
- **Hot Reload**: Works for code changes; locale changes require page refresh

### Environment Variables Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://produktauto.hr
CONTACT_EMAIL=produktauto@gmail.com
# Optional (not yet integrated):
# RESEND_API_KEY=<for-future-email-integration>
```

## Common Patterns & Conventions

### Client/Server Component Split

- **Server Default**: All components are Server Components unless marked `"use client"`
- **Client Indicators**: Hooks (useState, useEffect), event handlers, browser APIs, Zustand stores
- **Dynamic Imports**: Use for heavy client components (e.g., `QuickViewModal` in `VoziloCard.tsx`)

### Path Aliases

- **`@/*`**: Maps to `src/*` (configured in `tsconfig.json`)
- Always use absolute imports: `import { Vozilo } from "@/types/vozilo"`

### Component File Naming

- **Pages**: `page.tsx` in route folders
- **Layouts**: `layout.tsx` with locale support
- **Components**: PascalCase files (e.g., `VoziloCard.tsx`, `FloatingWhatsApp.tsx`)

### Contact Information

- **Single Source**: All contact details in `src/lib/constants.ts` under `CONTACT` and `WORKING_HOURS` exports
- Never hardcode phone numbers, addresses, or social links - always import from constants

### Image Optimization

- **Next.js Image**: Always use `next/image` with `priority={true}` for above-fold images
- **Allowed Domains**: Configured in `next.config.ts` (cdn.sanity.io, unsplash, pexels, etc.)
- **Formats**: AVIF + WebP with quality [75, 85]

## Anti-Patterns to Avoid

- ❌ Using `next/link` instead of `@/i18n/navigation` Link
- ❌ Accessing Zustand stores before hydration check
- ❌ Hardcoding colors instead of using design tokens
- ❌ Using `text-success` for price discounts (use `text-savings`)
- ❌ Creating localized schemas without checking `getContactFormSchema` pattern
- ❌ Rendering vehicle comparison UI before checking `hasHydrated` flag

## Quick Reference

- **Type Definitions**: `src/types/vozilo.ts`
- **Utils**: `src/lib/utils.ts` (includes `cn()` for Tailwind merging)
- **Vehicle Helpers**: `src/lib/vozila.ts` (formatKilometraza, filterVozila, etc.)
- **Locale Config**: `src/i18n/routing.ts`
- **Test Mocks**: `src/__tests__/setup.ts`
