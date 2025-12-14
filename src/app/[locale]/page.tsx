"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Handshake,
  Headphones,
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
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  const features = [
    {
      icon: Shield,
      title: t("features.quality.title"),
      description: t("features.quality.description"),
    },
    {
      icon: Handshake,
      title: t("features.transparency.title"),
      description: t("features.transparency.description"),
    },
    {
      icon: Headphones,
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
  ];

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
                {t("features.title")}
              </h2>
              <p
                className={`${typography.body} text-muted-foreground max-w-2xl mx-auto`}
              >
                {t("features.subtitle")}
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
                {t("cta.title")}
              </h2>
              <p className={`${typography.bodyLarge} text-white/90 mb-8`}>
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button
                    size="lg"
                    className={`${components.button.primary} min-w-[200px]`}
                  >
                    {t("cta.contactUs")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+385991663776">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold min-w-[200px]"
                  >
                    +385 99 166 3776
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
                {t("map.title")}
              </h2>
              <div
                className={`flex items-center justify-center gap-2 ${typography.body} text-muted-foreground`}
              >
                <MapPin className={`w-5 h-5 ${components.icon.accent}`} />
                <span>Ulica Milana Prpića 120, 49243 Oroslavje</span>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2775.5!2d15.9408!3d45.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765cf00000000%3A0x0!2sUlica%20Milana%20Prpi%C4%87a%20120%2C%2049243%20Oroslavje!5e0!3m2!1shr!2shr!4v1701874800000!5m2!1shr!2shr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "450px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("map.locationTitle")}
                />
              </div>
            </FadeIn>

            <FadeIn>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className={`${typography.h3} text-foreground mb-4`}>
                    Produkt Auto j.d.o.o.
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className={typography.body}>
                      {t("map.companyDescription1")}
                    </p>
                    <p className={typography.body}>
                      {t("map.companyDescription2")}
                    </p>
                    <p className={typography.body}>
                      {t("map.companyDescription3")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {t("map.workingHoursTitle")}
                        </p>
                        <p className="text-sm">
                          {tCommon("workingHours.weekdays")}: 09:00 - 17:00
                        </p>
                        <p className="text-sm">
                          {tCommon("workingHours.sunday")}:{" "}
                          {tCommon("footer.closed")}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {tCommon("footer.contact")}
                        </p>
                        <p className="text-sm">Tel: +385 99 166 3776</p>
                        <p className="text-sm">Email: produktauto@gmail.com</p>
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
