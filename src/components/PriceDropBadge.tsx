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
  const discountPercent = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  // Only show badge if discount is 5% or more
  if (discountPercent < 5) {
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute top-3 right-16 z-10 flex items-center gap-1.5 bg-destructive text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse ${className}`}
    >
      <TrendingDown className="w-4 h-4" />
      {discountPercent}% OFF
    </motion.div>
  );
}
