"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Handshake,
  Headphones,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroCarousel from "@/components/HeroCarousel";
import HeroSearch from "@/components/HeroSearch";
import EkskluzivnaPonuda from "@/components/EkskluzivnaPonuda";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/PageTransition";
import { typography, spacing, components } from "@/lib/designTokens";

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

export default function HomePage() {
  return (
    <>
      {/* Hero Carousel with Search Overlay */}
      <HeroCarousel>
        <HeroSearch />
      </HeroCarousel>

      {/* Ekskluzivna Ponuda Section */}
      <EkskluzivnaPonuda />

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5024881073784!2d15.9819711!3d45.8014399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6f5f5555555%3A0x5555555555555555!2sUlica%20grada%20Vukovara%20271%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1701874800000!5m2!1shr!2shr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "450px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokacija Produkt Auto"
                />
              </div>
            </FadeIn>

            <FadeIn>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className={`${typography.h3} text-foreground mb-4`}>
                    Vaš pouzdani partner za kvalitetna vozila
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className={typography.body}>
                      <strong className="text-foreground">Produkt Auto</strong>{" "}
                      je renomirana tvrtka specijalizirana za prodaju
                      kvalitetnih rabljenih vozila. Sa sjedištem u Zagrebu,
                      poslujemo na tržištu već više od 10 godina.
                    </p>
                    <p className={typography.body}>
                      Naša ponuda uključuje širok izbor pažljivo odabranih
                      vozila različitih marki i modela. Svako vozilo prolazi
                      temeljitu provjeru i pripremu prije nego dođe u našu
                      ponudu.
                    </p>
                    <p className={typography.body}>
                      Nudimo potpunu transparentnost - sva vozila dolaze s
                      provjerenom dokumentacijom i poviješću servisa. Naš
                      stručni tim je tu da vam pomogne u odabiru idealnog vozila
                      prema vašim potrebama i budžetu.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Radno vrijeme
                        </p>
                        <p className="text-sm">Pon - Pet: 08:00 - 18:00</p>
                        <p className="text-sm">Subota: 09:00 - 14:00</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Kontakt
                        </p>
                        <p className="text-sm">Tel: +385 91 123 4567</p>
                        <p className="text-sm">Email: info@produktauto.hr</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
