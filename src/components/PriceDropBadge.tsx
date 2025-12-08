"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { savings } from "@/lib/designTokens";

interface PriceDropBadgeProps {
  originalPrice: number;
  currentPrice: number;
  className?: string;
}

export default function PriceDropBadge({
  originalPrice,
  currentPrice,
  className = "",
}: PriceDropBadgeProps) {
  const savingsAmount = originalPrice - currentPrice;
  const discountPercent = Math.round((savingsAmount / originalPrice) * 100);

  // Only show badge if discount is 5% or more
  if (discountPercent < 5) {
    return null;
  }

  // Format savings with thousands separator
  const formattedSavings = new Intl.NumberFormat("hr-HR").format(savingsAmount);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute bottom-16 right-3 z-10 flex items-center gap-1.5 bg-savings-muted/95 dark:bg-savings-muted/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-savings/10 border border-savings/20 ${className}`}
    >
      <TrendingDown className={`w-3.5 h-3.5 ${savings.icon.default}`} />
      <span className={savings.label}>Ušteda</span>
      <span className={savings.amount}>{formattedSavings} €</span>
    </motion.div>
  );
}
