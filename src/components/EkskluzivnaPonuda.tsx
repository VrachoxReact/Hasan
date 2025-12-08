"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoziloCard from "@/components/VoziloCard";
import { getEkskluzivnaVozila } from "@/lib/vozila";
import { typography, spacing } from "@/lib/designTokens";

export default function EkskluzivnaPonuda() {
  const ekskluzivnaVozila = getEkskluzivnaVozila().slice(0, 4);

  if (ekskluzivnaVozila.length === 0) {
    return null;
  }

  return (
    <section
      className={`${spacing.section} bg-gradient-to-b from-accent/5 to-background pt-8 md:pt-10 -mt-4`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`${typography.h2} text-foreground mb-4`}>
            Ekskluzivna ponuda
          </h2>
          <p
            className={`${typography.body} text-muted-foreground max-w-2xl mx-auto`}
          >
            Odabrana vozila koja ispunjavaju visoke standarde kvalitete i
            pouzdanosti – sada dostupna uz pažljivo formirane cijene koje
            omogućuju stvarnu uštedu.
          </p>
        </motion.div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 scale-[1.15] origin-center">
          {ekskluzivnaVozila.map((vozilo, index) => (
            <motion.div
              key={vozilo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <VoziloCard vozilo={vozilo} />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/vozila?ekskluzivno=true">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white transition-all"
            >
              Pogledaj sve ponude
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
