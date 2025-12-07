"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Handshake,
  Headphones,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VoziloCard from "@/components/VoziloCard";
import HeroSearch from "@/components/HeroSearch";
import RecentlyViewed from "@/components/RecentlyViewed";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/PageTransition";
import { getIstaknutaVozila } from "@/lib/vozila";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { typography, spacing, components } from "@/lib/designTokens";
import AnimatedCounter from "@/components/AnimatedCounter";

const features = [
  {
    icon: Shield,
    title: "Jamstvo kvalitete",
    description:
      "Svako vozilo prolazi detaljnu inspekciju od 150+ točaka provjere prije ponude.",
  },
  {
    icon: Handshake,
    title: "Transparentnost",
    description:
      "Potpuna povijest vozila, dokumentacija i servisna knjižica dostupni odmah.",
  },
  {
    icon: Headphones,
    title: "Stručna podrška",
    description:
      "Naš tim stručnjaka dostupan je radnim danima za sva vaša pitanja i podršku.",
  },
];

const stats = [
  { value: "500+", numericValue: 500, suffix: "+", label: "Prodanih vozila" },
  { value: "10+", numericValue: 10, suffix: "+", label: "Godina iskustva" },
  { value: "98%", numericValue: 98, suffix: "%", label: "Zadovoljnih kupaca" },
  { value: "30", numericValue: 30, suffix: "", label: "Dana jamstva" },
];

export default function HomePage() {
  const istaknutaVozila = getIstaknutaVozila().slice(0, 6);

  // Parallax setup
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax on mobile for performance
  const isMobile = useMediaQuery("(max-width: 768px)");
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary"
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: isMobile ? 0 : parallaxY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&auto=format&fit=crop&q=80"
            alt="Noćni grad i moderna vozila u salonu"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/40 dark:from-background/95 dark:via-background/90 dark:to-background/60" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] items-start gap-10 lg:gap-14">
            <div className="max-w-2xl lg:pl-32 xl:pl-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-accent border-2 border-accent font-semibold mb-4 shadow-lg">
                  <Star className="w-4 h-4 fill-accent" />
                  Premium rabljena vozila
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`${typography.h1} text-white mb-6`}
              >
                Pronađite svoj
                <span className="text-accent"> savršen automobil</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`${typography.bodyLarge} text-white/90 mb-8`}
              >
                Više od 10 godina iskustva u prodaji kvalitetnih rabljenih
                vozila. Provjerena kvaliteta, transparentna povijest i podrška
                koju zaslužujete.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/vozila">
                  <Button
                    size="lg"
                    className={`${components.button.primary} px-8`}
                  >
                    Pregledaj vozila
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/kontakt">
                  <Button
                    size="lg"
                    variant="outline"
                    className={`${components.button.secondary} px-8`}
                  >
                    Kontaktirajte nas
                  </Button>
                </Link>
              </motion.div>

              {/* Hero Search */}
              <HeroSearch />
            </div>

            {/* Hero Featured Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/40">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&auto=format&fit=crop&q=80"
                    alt="Luksuzni automobil u modernom salonu"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                        Ekskluzivna ponuda
                      </p>
                      <p className="text-lg font-semibold text-white">
                        Pažljivo odabrana vozila provjerene povijesti
                      </p>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-xs text-white/60 mb-1">
                        Počevši već od
                      </span>
                      <span className="text-2xl font-semibold text-white">
                        15.900 €
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-white/10 bg-black/40 text-white/80">
                  <div className="px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                      Prosječna starost
                    </p>
                    <p className="text-lg font-semibold">3,8 god.</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                      Prosječna kilometraža
                    </p>
                    <p className="text-lg font-semibold">78.000 km</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
                      Dostupno odmah
                    </p>
                    <p className="text-lg font-semibold">25+ vozila</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`${spacing.section.small} bg-gradient-to-r from-primary via-primary/95 to-primary/90`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 ${spacing.gap.default}`}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter
                  value={stat.numericValue}
                  suffix={stat.suffix}
                  className={`${typography.stat} text-accent mb-1`}
                />
                <div className={`${typography.statLabel} text-white/90`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className={spacing.section.medium}>
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className={`${typography.h2} text-foreground mb-4`}>
                Istaknuta vozila
              </h2>
              <p
                className={`${typography.body} text-muted-foreground max-w-2xl mx-auto`}
              >
                Pogledajte našu selekciju najkvalitetnijih vozila koje trenutno
                nudimo. Svako vozilo je pažljivo odabrano i provjereno.
              </p>
            </div>
          </FadeIn>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${spacing.gap.default}`}
          >
            {istaknutaVozila.map((vozilo, index) => (
              <VoziloCard
                key={vozilo.id}
                vozilo={vozilo}
                index={index}
                priority={index < 3}
              />
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link href="/vozila">
              <Button size="lg" variant="outline" className="group">
                Pogledaj sva vozila
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Why Us Section */}
      <section className={`${spacing.section.medium} bg-muted/50`}>
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className={`${typography.h2} text-foreground mb-4`}>
                Zašto odabrati nas?
              </h2>
              <p
                className={`${typography.body} text-muted-foreground max-w-2xl mx-auto`}
              >
                Posvećeni smo pružanju najboljeg iskustva kupnje automobila. Evo
                što nas razlikuje od konkurencije.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className={`grid grid-cols-1 md:grid-cols-3 ${spacing.gap.default}`}
          >
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card className={`${components.card.elevated} h-full`}>
                  <CardContent className={`${spacing.card.medium} text-center`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl ${components.icon.background} flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon
                        className={`w-8 h-8 ${components.icon.accent}`}
                      />
                    </motion.div>
                    <h3 className={`${typography.h4} text-foreground mb-2`}>
                      {feature.title}
                    </h3>
                    <p className={`${typography.body} text-muted-foreground`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`${spacing.section.medium} bg-gradient-to-br from-primary via-primary/90 to-accent/20`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className={`${typography.h2} text-white mb-4`}>
                Spremni pronaći svoj sljedeći automobil?
              </h2>
              <p className={`${typography.bodyLarge} text-white/90 mb-8`}>
                Posjetite nas ili nas kontaktirajte za više informacija. Naš tim
                stručnjaka pomoći će vam pronaći savršeno vozilo za vaše
                potrebe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button
                    size="lg"
                    className={`${components.button.primary} min-w-[200px]`}
                  >
                    Kontaktirajte nas
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+385911234567">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold min-w-[200px]"
                  >
                    +385 91 123 4567
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Recently Viewed Section */}
      <RecentlyViewed />

      {/* Map Section */}
      <section className={spacing.section.medium}>
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className={`${typography.h2} text-foreground mb-4`}>
                Posjetite nas
              </h2>
              <div
                className={`flex items-center justify-center gap-2 ${typography.body} text-muted-foreground`}
              >
                <MapPin className={`w-5 h-5 ${components.icon.accent}`} />
                <span>Ulica grada Vukovara 271, 10000 Zagreb</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5024881073784!2d15.9819711!3d45.8014399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6f5f5555555%3A0x5555555555555555!2sUlica%20grada%20Vukovara%20271%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1701874800000!5m2!1shr!2shr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija Produkt Auto"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
