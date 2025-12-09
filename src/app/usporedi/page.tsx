"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Car,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Zap,
  Palette,
  ArrowRight,
  Trash2,
  Plus,
  GitCompare,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/PageTransition";
import { useUsporediStore } from "@/stores/usporediStore";
import { typography, spacing, components } from "@/lib/designTokens";
import {
  formatCijena,
  formatKilometraza,
  formatSnaga,
  getGorivoLabel,
  getMjenjacLabel,
} from "@/lib/vozila";
import { Vozilo } from "@/types/vozilo";

const comparisonSpecs = [
  {
    key: "cijena",
    label: "Cijena",
    format: (v: Vozilo) => formatCijena(v.cijena),
    icon: null,
    highlight: true,
  },
  {
    key: "godina",
    label: "Godina",
    format: (v: Vozilo) => v.godina.toString(),
    icon: Calendar,
  },
  {
    key: "kilometraza",
    label: "Kilometraža",
    format: (v: Vozilo) => formatKilometraza(v.kilometraza),
    icon: Gauge,
  },
  {
    key: "gorivo",
    label: "Gorivo",
    format: (v: Vozilo) => getGorivoLabel(v.gorivo),
    icon: Fuel,
  },
  {
    key: "mjenjac",
    label: "Mjenjač",
    format: (v: Vozilo) => getMjenjacLabel(v.mjenjac),
    icon: Settings,
  },
  {
    key: "snaga",
    label: "Snaga",
    format: (v: Vozilo) => formatSnaga(v.snaga),
    icon: Zap,
  },
  { key: "boja", label: "Boja", format: (v: Vozilo) => v.boja, icon: Palette },
];

export default function UsporediPage() {
  const { vozila, removeVozilo, clearAll } = useUsporediStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate best values for highlighting
  const bestValues = useMemo(() => {
    if (vozila.length === 0) return null;

    return {
      lowestPrice: Math.min(...vozila.map((v) => v.cijena)),
      newestYear: Math.max(...vozila.map((v) => v.godina)),
      lowestKm: Math.min(...vozila.map((v) => v.kilometraza)),
    };
  }, [vozila]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Učitavanje...</div>
      </div>
    );
  }

  if (vozila.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <section className={`bg-primary ${spacing.section.small}`}>
          <div className="container mx-auto px-4">
            <FadeIn>
              <h1 className={`${typography.h2} text-white mb-2`}>
                Usporedi vozila
              </h1>
              <p className={`${typography.body} text-white/90`}>
                Usporedite do 3 vozila istovremeno
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Empty State */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-24 h-24 rounded-2xl ${components.icon.background} flex items-center justify-center mx-auto mb-6`}
            >
              <GitCompare className={`w-12 h-12 ${components.icon.accent}`} />
            </motion.div>
            <h2 className={`${typography.h3} text-foreground mb-3`}>
              Nema vozila za usporedbu
            </h2>
            <p className={`${typography.body} text-muted-foreground mb-8`}>
              Dodajte vozila klikom na ikonu usporedbe na karticama vozila.
              Možete usporediti do 3 vozila istovremeno i vidjeti sve
              specifikacije u usporedbi.
            </p>
            <Link href="/vozila">
              <Button
                size="lg"
                className={`gap-2 ${components.button.primary}`}
              >
                <Plus className="w-5 h-5" />
                Pregledaj vozila
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className={`bg-primary ${spacing.section.small}`}>
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className={`${typography.h2} text-white mb-2`}>
                  Usporedi vozila
                </h1>
                <p className={`${typography.body} text-white/90`}>
                  Uspoređujete {vozila.length} od 3 moguća vozila
                </p>
              </div>
              <div className="flex gap-3">
                {vozila.length < 3 && (
                  <Link href="/vozila">
                    <Button variant="secondary" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Dodaj vozilo
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className={`${components.button.secondary} gap-2`}
                  onClick={clearAll}
                >
                  <Trash2 className="w-4 h-4" />
                  Obriši sve
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Mobile scroll hint */}
          <div className="md:hidden flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
            <span>← Povucite za usporedbu →</span>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent pb-4">
            <div className="min-w-[500px] md:min-w-[600px]">
              {/* Vehicle Cards Header */}
              <div
                className="grid gap-3 md:gap-4"
                style={{
                  gridTemplateColumns: `minmax(100px, 150px) repeat(${vozila.length}, minmax(140px, 1fr))`,
                }}
              >
                {/* Empty corner cell */}
                <div />

                {/* Vehicle Cards */}
                <AnimatePresence>
                  {vozila.map((vozilo, index) => (
                    <motion.div
                      key={vozilo.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="relative overflow-hidden border-border/50">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 z-10 h-8 w-8 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 shadow-sm"
                          onClick={() => removeVozilo(vozilo.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>

                        <div className="aspect-[4/3] relative">
                          <Image
                            src={vozilo.slike[0]}
                            alt={`${vozilo.marka} ${vozilo.model}`}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <CardContent className="p-4">
                          <Link
                            href={`/vozila/${vozilo.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {vozilo.marka} {vozilo.model}
                          </Link>
                          {vozilo.istaknuto && (
                            <Badge className="mt-2 bg-accent/10 text-accent">
                              Istaknuto
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty slots */}
                {Array.from({ length: 3 - vozila.length }).map((_, index) => (
                  <motion.div
                    key={`empty-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (vozila.length + index) * 0.1 }}
                  >
                    <Link href="/vozila">
                      <Card className="h-full border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center min-h-[250px]">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Dodaj vozilo za usporedbu
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="mt-6 space-y-2">
                {comparisonSpecs.map((spec, specIndex) => (
                  <motion.div
                    key={spec.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: specIndex * 0.05 }}
                    className={`grid gap-3 md:gap-4 items-center py-3 md:py-4 px-3 md:px-4 rounded-lg ${
                      spec.highlight
                        ? "bg-accent/10"
                        : specIndex % 2 === 0
                        ? "bg-muted/50"
                        : ""
                    }`}
                    style={{
                      gridTemplateColumns: `minmax(100px, 150px) repeat(${vozila.length}, minmax(140px, 1fr))`,
                    }}
                  >
                    {/* Label */}
                    <div className="flex items-center gap-3">
                      {spec.icon && (
                        <spec.icon className="w-5 h-5 text-accent" />
                      )}
                      <span
                        className={`font-medium ${
                          spec.highlight ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {spec.label}
                      </span>
                    </div>

                    {/* Values */}
                    {vozila.map((vozilo) => {
                      const value = vozilo[spec.key as keyof Vozilo];
                      const isLowestPrice =
                        spec.key === "cijena" &&
                        bestValues &&
                        value === bestValues.lowestPrice;
                      const isNewestYear =
                        spec.key === "godina" &&
                        bestValues &&
                        value === bestValues.newestYear;
                      const isLowestKm =
                        spec.key === "kilometraza" &&
                        bestValues &&
                        value === bestValues.lowestKm;

                      const isBestValue =
                        isLowestPrice || isNewestYear || isLowestKm;
                      const highlightClass =
                        isLowestPrice || isLowestKm
                          ? "bg-success/10 border-l-4 border-success"
                          : isNewestYear
                          ? "bg-accent/10 border-l-4 border-accent"
                          : "";

                      return (
                        <div
                          key={vozilo.id}
                          className={`text-center py-2 px-3 rounded-r transition-all ${
                            spec.highlight
                              ? "text-2xl font-bold text-accent"
                              : "text-foreground"
                          } ${highlightClass}`}
                        >
                          {isBestValue && (
                            <Badge
                              className={`mb-2 ${
                                isLowestPrice || isLowestKm
                                  ? "bg-success text-success-foreground shadow-lg shadow-success/50"
                                  : "bg-accent text-accent-foreground shadow-lg shadow-accent/50"
                              }`}
                            >
                              <Trophy className="w-3 h-3 mr-1" />
                              {isLowestPrice
                                ? "Najniža cijena"
                                : isNewestYear
                                ? "Najnovije"
                                : "Najmanje km"}
                            </Badge>
                          )}
                          <div>{spec.format(vozilo)}</div>
                        </div>
                      );
                    })}

                    {/* Empty cells for missing vehicles */}
                    {Array.from({ length: 3 - vozila.length }).map(
                      (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="text-center text-muted-foreground"
                        >
                          -
                        </div>
                      )
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Features Comparison */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 px-4">
                  Oprema
                </h3>

                {/* Get all unique features */}
                {(() => {
                  const allFeatures = new Set<string>();
                  vozila.forEach((v) =>
                    v.karakteristike.forEach((k) => allFeatures.add(k))
                  );

                  return Array.from(allFeatures).map((feature, index) => (
                    <div
                      key={feature}
                      className={`grid gap-3 md:gap-4 items-center py-2 md:py-3 px-3 md:px-4 rounded-lg ${
                        index % 2 === 0 ? "bg-muted/30" : ""
                      }`}
                      style={{
                        gridTemplateColumns: `minmax(100px, 150px) repeat(${vozila.length}, minmax(140px, 1fr))`,
                      }}
                    >
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                      {vozila.map((vozilo) => (
                        <div key={vozilo.id} className="text-center">
                          {vozilo.karakteristike.includes(feature) ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/10 text-success">
                              ✓
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
                              -
                            </span>
                          )}
                        </div>
                      ))}
                      {Array.from({ length: 3 - vozila.length }).map(
                        (_, idx) => (
                          <div
                            key={`empty-${idx}`}
                            className="text-center text-muted-foreground"
                          >
                            -
                          </div>
                        )
                      )}
                    </div>
                  ));
                })()}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronašli ste vozilo koje vam odgovara?
              </h2>
              <p className="text-white/70 mb-6">
                Kontaktirajte nas za više informacija ili zakazivanje pregleda
                vozila.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button
                    size="lg"
                    className="bg-accent text-white hover:bg-accent/90 gap-2"
                  >
                    Kontaktirajte nas
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="tel:+385911234567">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    +385 91 123 4567
                  </Button>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
