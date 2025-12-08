"use client";

import { formatCijena } from "@/lib/vozila";
import { components } from "@/lib/designTokens";
import { cn } from "@/lib/utils";

export type PriceVariant = "card" | "list" | "detail";

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  variant?: PriceVariant;
  className?: string;
}

/**
 * PriceDisplay Component
 * Unified price display with consistent styling across the app
 *
 * Variants:
 * - card: For vehicle cards with overlay (white text, drop shadow)
 * - list: For list items (accent colored)
 * - detail: For detail pages (larger, accent colored)
 */
export default function PriceDisplay({
  price,
  oldPrice,
  variant = "card",
  className,
}: PriceDisplayProps) {
  const hasDiscount = oldPrice && oldPrice > price;

  // Variant-specific styles
  const variantStyles = {
    card: {
      container: "",
      oldPrice: components.price.oldPrice,
      currentPrice: components.price.card,
      discountPrice: "text-3xl font-bold text-success drop-shadow-lg",
    },
    list: {
      container: "",
      oldPrice: "text-base text-muted-foreground line-through",
      currentPrice: components.price.list,
      discountPrice: "text-2xl font-bold text-success",
    },
    detail: {
      container: "",
      oldPrice: "text-lg text-muted-foreground line-through",
      currentPrice: components.price.detail,
      discountPrice: "text-3xl font-bold text-success",
    },
  };

  const styles = variantStyles[variant];

  if (hasDiscount) {
    return (
      <div className={cn("flex flex-col", styles.container, className)}>
        <span className={styles.oldPrice}>{formatCijena(oldPrice)}</span>
        <span className={styles.discountPrice}>{formatCijena(price)}</span>
      </div>
    );
  }

  return (
    <span className={cn(styles.currentPrice, className)}>
      {formatCijena(price)}
    </span>
  );
}
