"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VoziloCard from "@/components/VoziloCard";
import { useFavoritiStore } from "@/stores/favoritiStore";
import { getVoziloById } from "@/lib/vozila";
import { Vozilo } from "@/types/vozilo";

export default function RecentlyViewed() {
  const [recentVozila, setRecentVozila] = useState<Vozilo[]>([]);
  const [mounted, setMounted] = useState(false);
  const getRecentlyViewedIds = useFavoritiStore(
    (state) => state.getRecentlyViewedIds
  );

  useEffect(() => {
    setMounted(true);
    const ids = getRecentlyViewedIds();
    const vozila = ids
      .map((id) => getVoziloById(id))
      .filter((v): v is Vozilo => v !== undefined)
      .slice(0, 4);
    setRecentVozila(vozila);
  }, [getRecentlyViewedIds]);

  if (!mounted || recentVozila.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">
              Nedavno pregledano
            </h2>
          </div>
          <Link href="/vozila">
            <Button
              variant="ghost"
              className="text-accent hover:text-accent/80"
            >
              Sva vozila
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentVozila.map((vozilo, index) => (
            <VoziloCard key={vozilo.id} vozilo={vozilo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
