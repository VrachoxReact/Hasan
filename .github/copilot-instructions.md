# GitHub Copilot Instructions - Produkt Auto

## Project Overview

This is a **Next.js 16** car dealership website for "Produkt Auto" - a Croatian used car sales company. The website is fully in **Croatian language** and uses modern React patterns with TypeScript.

## Tech Stack

- **Framework**: Next.js 16.0.7 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: Radix UI primitives + shadcn/ui components
- **State Management**: Zustand (for favorites, comparison)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Carousel**: Embla Carousel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── vozila/            # Vehicle listings & details
│   ├── favoriti/          # Favorites page
│   ├── usporedi/          # Compare vehicles page
│   ├── kontakt/           # Contact page
│   ├── o-nama/            # About us
│   ├── privatnost/        # Privacy policy
│   └── uvjeti/            # Terms & conditions
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   └── *.tsx             # Feature components
├── lib/                   # Utilities & helpers
│   ├── constants.ts      # Contact info, company data
│   ├── designTokens.ts   # Typography, spacing, component styles
│   ├── vozila.ts         # Vehicle data functions
│   └── utils.ts          # General utilities (cn, etc.)
├── stores/               # Zustand stores
│   ├── favoritiStore.ts  # Favorites management
│   └── usporediStore.ts  # Vehicle comparison (max 3)
├── types/                # TypeScript types
│   └── vozilo.ts         # Vehicle interface & constants
└── data/
    └── vozila.json       # Vehicle data
```

## Design System

### Always use design tokens from `@/lib/designTokens`:

```typescript
import { typography, spacing, components } from "@/lib/designTokens";

// Typography
typography.h1, typography.h2, typography.h3, typography.h4;
typography.body, typography.bodyLarge, typography.bodySmall;

// Spacing
spacing.section.small, spacing.section.medium, spacing.section.large;
spacing.card.small, spacing.card.medium, spacing.card.large;
spacing.gap.tight, spacing.gap.default, spacing.gap.loose;

// Components
components.button.primary, components.button.secondary;
components.card.default, components.card.elevated;
components.price.card, components.price.list, components.price.detail;
components.icon.accent, components.icon.background;
```

### Color Palette (CSS Variables)

- `--primary`: Deep navy blue (text, headers)
- `--accent`: Bright sapphire blue (CTAs, interactive elements)
- `--premium`: Gold/orange (exclusive offers badge)
- `--success`: Green (savings, positive feedback)
- `--muted`: Light blue-gray backgrounds
- `--destructive`: Red (errors, important alerts)

### Price Display Colors

- Old price: `text-white/70` on cards, `text-gray-600` on lists
- New price: `text-green-500/600`
- "Ušteda" label: `text-orange-500`
- Savings amount: `text-green-500/600`

## Key Components

### VoziloCard

Vehicle card with image, badges, prices, favorite/compare buttons.

- Lazy loads images with intersection observer
- Shows "Ekskluzivno" (exclusive) badge with gold gradient
- Shows "Ušteda X €" (savings) badge on discounted vehicles
- Quick view modal on desktop hover

### HeroCarousel

Landing page carousel with CTA buttons.

- "DOSTUPNA VOZILA" → /vozila
- "VELEPRODAJA VOZILA" → /kontakt
- Subtle pulsing glow animation on buttons

### HeroSearch

Quick vehicle search overlay on hero.

- Filters: Proizvođač, Model, Godina, Gorivo, Mjenjač, Cijena
- Shows matching vehicle count dynamically

### PriceDisplay

Unified price display component.

- Variants: "card", "list", "detail"
- Shows old price (strikethrough), new price, savings

## Croatian Language

All UI text must be in Croatian:

- "Vozila" = Vehicles
- "Favoriti" = Favorites
- "Usporedi" = Compare
- "Kontakt" = Contact
- "Pretraži" = Search
- "Cijena" = Price
- "Ušteda" = Savings
- "Godina" = Year
- "Kilometraža" = Mileage
- "Gorivo" = Fuel
- "Mjenjač" = Transmission
- "Ekskluzivno" = Exclusive
- "Istaknuto" = Featured

## Zustand Stores

### useFavoritiStore

```typescript
toggleFavorit(vozilo: Vozilo): boolean
isFavorit(id: string): boolean
getFavoriti(): Vozilo[]
```

### useUsporediStore

```typescript
addVozilo(vozilo: Vozilo): boolean  // max 3 vehicles
removeVozilo(id: string): void
isInList(id: string): boolean
getVozila(): Vozilo[]
```

## Vehicle Interface (Vozilo)

```typescript
interface Vozilo {
  id: string;
  marka: string; // Brand (Audi, BMW, etc.)
  model: string;
  godina: number; // Year
  cijena: number; // Current price
  staracijena?: number; // Original price (for discounts)
  kilometraza: number; // Mileage in km
  gorivo: "benzin" | "dizel" | "hibrid" | "elektricni";
  mjenjac: "rucni" | "automatski";
  snaga: number; // Power in kW
  boja: string; // Color
  opis: string; // Description
  slike: string[]; // Image URLs
  istaknuto: boolean; // Featured
  ekskluzivno?: boolean; // Exclusive offer
  datumObjave: string; // Publication date
  karakteristike: string[]; // Features
}
```

## Code Style Guidelines

1. **Use "use client"** directive for components with interactivity
2. **Import paths**: Always use `@/` alias (e.g., `@/components/ui/button`)
3. **Component exports**: Use `export default function ComponentName()`
4. **Formatting**: Use Prettier defaults (already configured)
5. **Images**: Use Next.js `Image` component with proper sizing
6. **Animations**: Use Framer Motion for animations
7. **Toasts**: Use `sonner` for notifications (`toast.success()`, `toast.error()`)

## Testing

```bash
npm run test        # Run tests
npm run test:ui     # Vitest UI
npm run test:coverage
```

## Common Patterns

### Page Layout

```tsx
export default function PageName() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">...</section>

      {/* Content Section */}
      <section className={`${spacing.section.medium} bg-background`}>
        <div className="container mx-auto px-4">...</div>
      </section>
    </div>
  );
}
```

### Card with Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
>
  <Card className={components.card.elevated}>
    <CardContent className={spacing.card.medium}>...</CardContent>
  </Card>
</motion.div>
```

## Contact Information

Use constants from `@/lib/constants`:

```typescript
import { CONTACT, COMPANY, WORKING_HOURS } from "@/lib/constants";

CONTACT.phone, CONTACT.email, CONTACT.address.full;
CONTACT.whatsapp.url, CONTACT.social.facebook;
COMPANY.name, COMPANY.tagline;
```

## Git Workflow

- Branch: `master`
- Repository: https://github.com/VrachoxReact/Hasan
- Commit messages: Descriptive, in English
