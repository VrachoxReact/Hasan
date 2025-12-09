/**
 * Produkt Auto Design System
 * Budget-Friendly & Transparent Business Feel
 *
 * Psychology:
 * - Medium weights = approachable, not aggressive
 * - Generous line-height = easy reading, no pressure
 * - Slightly looser tracking = friendly, open feel
 */

export const typography = {
  // Display & Headings - Friendly but confident
  h1: "text-4xl md:text-5xl lg:text-6xl font-semibold tracking-normal leading-snug",
  h2: "text-3xl md:text-4xl font-semibold tracking-normal leading-snug",
  h3: "text-xl md:text-2xl font-medium leading-relaxed",
  h4: "text-lg font-medium leading-relaxed",

  // Body Text - Easy to read, no pressure
  bodyLarge: "text-lg leading-loose",
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",

  // Utility
  small: "text-sm tracking-normal",
  tiny: "text-xs tracking-wide",

  // Special - Prices prominent but not aggressive
  stat: "text-3xl md:text-4xl font-bold",
  statLabel: "text-sm font-medium",

  // Trust signals
  trustHeading: "text-lg font-medium text-foreground/90",
  transparent: "text-sm text-muted-foreground leading-relaxed",
} as const;

export const spacing = {
  // Section Padding (Vertical)
  section: {
    small: "py-12 md:py-16",
    medium: "py-16 md:py-24",
    large: "py-20 md:py-32",
  },

  // Card Padding
  card: {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  },

  // Grid Gaps
  gap: {
    tight: "gap-4 md:gap-6",
    default: "gap-6 lg:gap-8",
    loose: "gap-8 lg:gap-12",
  },
} as const;

export const components = {
  // Price Display - Clear, honest, prominent
  price: {
    card: "text-3xl font-bold text-white drop-shadow-lg",
    list: "text-2xl font-bold text-accent",
    detail: "text-3xl font-bold text-accent",
    oldPrice: "text-base text-white/60 line-through drop-shadow-lg",
  },

  // Buttons - Friendly, action-oriented
  button: {
    primary: "bg-accent text-white hover:bg-accent/90 font-medium shadow-sm",
    secondary:
      "border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary font-medium",
    deal: "bg-premium text-white hover:bg-premium/90 font-semibold shadow-md",
    lightOutline:
      "border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm font-medium",
    // NEW: Trust-building CTA
    trust:
      "bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-white font-medium",
  },

  // Cards
  card: {
    default:
      "bg-card border-border/50 hover:shadow-xl transition-all duration-300",
    elevated:
      "bg-card border-border/50 hover:shadow-lg transition-shadow duration-300",
  },

  // Icons
  icon: {
    accent: "text-accent",
    muted: "text-muted-foreground",
    background: "bg-accent/10 dark:bg-accent/20",
    premium: "text-premium",
  },

  // Icon Containers - Standardized sizes
  iconContainer: {
    small: "w-9 h-9 rounded-lg",
    medium: "w-12 h-12 rounded-xl",
    large: "w-16 h-16 rounded-2xl",
    xlarge: "w-24 h-24 rounded-2xl",
  },

  // Metadata (vehicle specs)
  metadata: {
    container: "flex items-center gap-2",
    icon: "w-4 h-4 text-accent",
    text: "text-muted-foreground text-sm",
  },

  // Header variants
  header: {
    light:
      "bg-white/95 dark:bg-primary/95 backdrop-blur-xl border-b border-border/30",
    dark: "bg-primary/95 backdrop-blur-xl border-b border-white/10",
  },

  // Form styling
  form: {
    card: "bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg",
    cardHeader: "h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50",
    group: "space-y-5",
    row: "grid grid-cols-1 md:grid-cols-2 gap-5",
    submitButton:
      "w-full h-12 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30",
    successCard:
      "bg-success/10 border border-success/30 rounded-xl p-8 text-center",
    successIcon: "w-16 h-16 text-success mx-auto mb-4",
    successTitle: "text-xl font-semibold text-success mb-2",
    successText: "text-success/80",
  },
} as const;

/**
 * Savings Color System
 * Psychology: Green = money saved, smart choice, value
 * Orange labels = attention, urgency, "don't miss this deal"
 */
export const savings = {
  // Price display - prominent, clear savings
  price: {
    card: "text-savings font-bold drop-shadow-lg",
    list: "text-savings font-bold",
    detail: "text-savings font-bold text-3xl",
  },

  // Old/original price - visible but secondary
  oldPrice: {
    card: "text-white/60 line-through drop-shadow-lg",
    list: "text-muted-foreground/80 line-through",
    detail: "text-muted-foreground/80 line-through text-xl",
  },

  // "Ušteda" label - attention-grabbing orange
  label: "text-savings-label font-bold uppercase tracking-wide text-sm",

  // Savings amount - prominent green
  amount: "text-savings font-bold",

  // Badge styling - eye-catching but trustworthy
  badge: {
    container:
      "bg-savings-muted border border-savings/30 text-savings font-bold shadow-sm",
    icon: "text-savings",
  },

  // Icon styling
  icon: {
    default: "text-savings",
    muted: "text-savings/70",
    background: "bg-savings/15 dark:bg-savings/25",
  },
} as const;

/**
 * Badge Variants
 * Psychology: Deal-focused, value-oriented messaging
 */
export const badges = {
  // Special offer badge - warm orange for "great deal" feeling
  ekskluzivno:
    "bg-gradient-to-r from-premium to-premium/90 text-white font-bold shadow-md",

  // Featured/recommended - trustworthy blue
  istaknuto: "bg-accent text-white font-medium shadow-sm",

  // Savings badge - prominent green for money saved
  savings: "bg-savings text-white font-bold shadow-sm",

  // NEW: Value badge for budget-conscious messaging
  value: "bg-savings-muted border-2 border-savings/40 text-savings font-bold",

  // NEW: Trust badge
  trust: "bg-accent/10 border border-accent/30 text-accent font-medium",
} as const;

export const animation = {
  // Framer Motion presets
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  },

  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },

  stagger: (index: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, delay: index * 0.1 },
  }),
} as const;
