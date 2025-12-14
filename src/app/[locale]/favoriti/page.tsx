"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import VoziloCard from "@/components/VoziloCard";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/PageTransition";
import { useFavoritiStore } from "@/stores/favoritiStore";
import { typography, spacing, components } from "@/lib/designTokens";

export default function FavoritiPage() {
  const [mounted, setMounted] = useState(false);
  const { favoriti, clearFavoriti } = useFavoritiStore();
  const t = useTranslations("favorites");
  const tCommon = useTranslations("common");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          {t("loading")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Heart
                className={`w-8 h-8 text-favorite fill-favorite ${components.icon.accent}`}
              />
              <div>
                <h1 className={`${typography.h2} text-foreground`}>
                  {t("pageTitle")}
                </h1>
                <p className={`${typography.body} text-muted-foreground`}>
                  {favoriti.length === 0
                    ? t("emptyTitle")
                    : t("vehicleCount", { count: favoriti.length })}
                </p>
              </div>
            </div>

            {favoriti.length > 0 && (
              <Button
                variant="outline"
                className="text-favorite hover:text-favorite/90 hover:bg-favorite/10 dark:hover:bg-favorite/20"
                onClick={clearFavoriti}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("clearAll")}
              </Button>
            )}
          </div>
        </FadeIn>

        {favoriti.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-24 h-24 rounded-2xl ${components.icon.background} flex items-center justify-center mx-auto mb-6`}
              >
                <Heart className="w-12 h-12 text-muted-foreground" />
              </motion.div>
              <h2 className={`${typography.h3} text-foreground mb-4`}>
                {t("emptyTitle")}
              </h2>
              <p
                className={`${typography.body} text-muted-foreground mb-8 max-w-md mx-auto`}
              >
                {t("emptyDescription")}
              </p>
              <Link href="/vozila">
                <Button size="lg" className={components.button.primary}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("browseVehicles")}
                </Button>
              </Link>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${spacing.gap.default}`}
            >
              {favoriti.map((vozilo, index) => (
                <StaggerItem key={vozilo.id}>
                  <VoziloCard vozilo={vozilo} index={index} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        )}

        {/* Back to listings */}
        <FadeIn>
          <div className="mt-12 text-center">
            <Link href="/vozila">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToVehicles")}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
