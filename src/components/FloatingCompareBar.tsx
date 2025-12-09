"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GitCompareArrows, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUsporediStore } from "@/stores/usporediStore";

export default function FloatingCompareBar() {
  const { vozila, removeVozilo, clearAll } = useUsporediStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const count = vozila.length;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="bg-card border border-border shadow-2xl rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              {/* Icon & Count */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                  <GitCompareArrows className="w-5 h-5 text-accent" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">
                    Usporedba vozila
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {count} od 3 vozila odabrano
                  </p>
                </div>
              </div>

              {/* Vehicle Thumbnails */}
              <div className="flex-1 flex items-center gap-2 overflow-hidden">
                {vozila.map((vozilo) => (
                  <div key={vozilo.id} className="relative group shrink-0">
                    <div className="w-14 h-10 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={vozilo.slike[0] || "/placeholder.jpg"}
                        alt={`${vozilo.marka} ${vozilo.model}`}
                        width={56}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removeVozilo(vozilo.id)}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-destructive text-white rounded-full flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-md"
                      aria-label={`Ukloni ${vozilo.marka} ${vozilo.model}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: 3 - count }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-14 h-10 rounded-lg border-2 border-dashed border-border/50 shrink-0 hidden sm:block"
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-muted-foreground hover:text-foreground hidden sm:flex"
                >
                  Obriši
                </Button>
                <Link href="/usporedi">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="gap-1"
                    disabled={count < 2}
                  >
                    <span className="hidden sm:inline">Usporedi</span>
                    <span className="sm:hidden">Usporedi ({count})</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(count / 3) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
