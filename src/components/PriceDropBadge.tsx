"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";

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
  const savings = originalPrice - currentPrice;
  const discountPercent = Math.round((savings / originalPrice) * 100);

  // Only show badge if discount is 5% or more
  if (discountPercent < 5) {
    return null;
  }

  // Format savings with thousands separator
  const formattedSavings = new Intl.NumberFormat("hr-HR").format(savings);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute bottom-16 right-3 z-10 flex items-center gap-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold shadow-lg border border-border/50 ${className}`}
    >
      <TrendingDown className="w-3.5 h-3.5 text-green-600" />
      <span className="text-orange-500">Ušteda</span>
      <span className="text-green-600">{formattedSavings} €</span>
    </motion.div>
  );
}
