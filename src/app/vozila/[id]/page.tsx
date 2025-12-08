"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import type { Metadata } from "next";
import {
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Palette,
  Zap,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Check,
  GitCompare,
  Share2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import VoziloCard from "@/components/VoziloCard";
import KalkulatorFinanciranja from "@/components/KalkulatorFinanciranja";
import ImageGallery from "@/components/ImageGallery";
import TrustBadges from "@/components/TrustBadges";
import PriceDisplay from "@/components/PriceDisplay";
import { FadeIn, SlideIn } from "@/components/PageTransition";
import {
  getVoziloById,
  getSimilarVozila,
  formatCijena,
  formatKilometraza,
  formatSnaga,
  getGorivoLabel,
  getMjenjacLabel,
} from "@/lib/vozila";
import { CONTACT } from "@/lib/constants";
import { useUsporediStore } from "@/stores/usporediStore";
import { useFavoritiStore } from "@/stores/favoritiStore";
import { toast } from "sonner";
import { typography, spacing, components, badges } from "@/lib/designTokens";
import { use, useEffect } from "react";
import { vehicleInquirySchema } from "@/lib/schemas";

interface VoziloPageProps {
  params: Promise<{ id: string }>;
}

export default function VoziloPage({ params }: VoziloPageProps) {
  const { id } = use(params);
  const vozilo = getVoziloById(id);
  const addRecentlyViewed = useFavoritiStore(
    (state) => state.addRecentlyViewed
  );

  // Track recently viewed
  useEffect(() => {
    if (id) {
      addRecentlyViewed(id);
    }
  }, [id, addRecentlyViewed]);

  if (!vozilo) {
    notFound();
  }

  const similarVozila = getSimilarVozila(vozilo, 3);
  const [formData, setFormData] = useState({
    ime: "",
    telefon: "",
    email: "",
    poruka: `Zanima me vozilo ${vozilo.marka} ${vozilo.model} (${vozilo.godina}).`,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const lastSubmitTime = useRef(0);

  const { addVozilo, removeVozilo, isInList } = useUsporediStore();
  const isComparing = isInList(vozilo.id);

  const handleCompareToggle = () => {
    if (isComparing) {
      removeVozilo(vozilo.id);
      toast.info("Vozilo uklonjeno iz usporedbe");
    } else {
      const success = addVozilo(vozilo);
      if (success) {
        toast.success("Vozilo dodano u usporedbu");
      } else {
        toast.error("Možete usporediti maksimalno 3 vozila");
      }
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${vozilo.marka} ${vozilo.model}`,
        text: `Pogledajte ovo vozilo: ${vozilo.marka} ${vozilo.model} (${
          vozilo.godina
        }) - ${formatCijena(vozilo.cijena)}`,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link kopiran u međuspremnik");
    }
  };

  const validateForm = (): boolean => {
    const result = vehicleInquirySchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    const MIN_SUBMIT_INTERVAL = 5000;
    if (now - lastSubmitTime.current < MIN_SUBMIT_INTERVAL) {
      toast.error("Molimo pričekajte prije ponovnog slanja");
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error("Molimo ispravite greške u obrascu");
      return;
    }

    lastSubmitTime.current = now;
    toast.success("Vaš upit je uspješno poslan! Javit ćemo vam se uskoro.");
    setFormData({
      ime: "",
      telefon: "",
      email: "",
      poruka: `Zanima me vozilo ${vozilo.marka} ${vozilo.model} (${vozilo.godina}).`,
    });
    setErrors({});
  };

  const specs = [
    { icon: Calendar, label: "Godina", value: vozilo.godina.toString() },
    {
      icon: Gauge,
      label: "Kilometraža",
      value: formatKilometraza(vozilo.kilometraza),
    },
    { icon: Fuel, label: "Gorivo", value: getGorivoLabel(vozilo.gorivo) },
    {
      icon: Settings,
      label: "Mjenjač",
      value: getMjenjacLabel(vozilo.mjenjac),
    },
    { icon: Zap, label: "Snaga", value: formatSnaga(vozilo.snaga) },
    { icon: Palette, label: "Boja", value: vozilo.boja },
  ];

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Car",
    name: `${vozilo.marka} ${vozilo.model}`,
    brand: {
      "@type": "Brand",
      name: vozilo.marka,
    },
    model: vozilo.model,
    vehicleModelDate: vozilo.godina,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vozilo.kilometraza,
      unitCode: "KMT",
    },
    fuelType: getGorivoLabel(vozilo.gorivo),
    vehicleTransmission: getMjenjacLabel(vozilo.mjenjac),
    color: vozilo.boja,
    vehicleEngine: {
      "@type": "EngineSpecification",
      enginePower: {
        "@type": "QuantitativeValue",
        value: vozilo.snaga,
        unitCode: "KWT",
      },
    },
    image: vozilo.slike,
    offers: {
      "@type": "Offer",
      price: vozilo.cijena,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Produkt Auto",
      },
    },
    description: vozilo.opis,
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 border-b border-border">
        <div className="container mx-auto px-4">
          <nav className={`flex items-center gap-2 ${typography.small}`}>
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Početna
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              href="/vozila"
              className="text-muted-foreground hover:text-primary"
            >
              Vozila
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {vozilo.marka} {vozilo.model}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery with Lightbox */}
            <FadeIn>
              <div className="relative">
                {vozilo.istaknuto && (
                  <Badge className="absolute top-4 left-4 z-10 bg-accent text-white font-semibold">
                    Istaknuto
                  </Badge>
                )}
                <ImageGallery
                  images={vozilo.slike}
                  alt={`${vozilo.marka} ${vozilo.model}`}
                />
              </div>
            </FadeIn>

            {/* Title & Actions (Mobile) */}
            <div className="lg:hidden">
              <h1 className={`${typography.h3} text-foreground mb-2`}>
                {vozilo.marka} {vozilo.model}
              </h1>
              {vozilo.ekskluzivno && (
                <Badge className="bg-amber-500 text-white font-semibold mb-3">
                  Ekskluzivna ponuda
                </Badge>
              )}
              {vozilo.istaknuto && (
                <div className="mb-3">
                  <TrustBadges size="md" />
                </div>
              )}
              <div className="mb-4">
                <PriceDisplay
                  price={vozilo.cijena}
                  oldPrice={vozilo.staracijena}
                  variant="detail"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isComparing ? "default" : "outline"}
                  className="flex-1"
                  onClick={handleCompareToggle}
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  {isComparing ? "U usporedbi" : "Usporedi"}
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Specifications */}
            <SlideIn direction="left">
              <Card className={components.card.elevated}>
                <CardHeader>
                  <CardTitle className={typography.h4}>Specifikacije</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg ${components.icon.background} flex items-center justify-center`}
                        >
                          <spec.icon
                            className={`w-5 h-5 ${components.icon.accent}`}
                          />
                        </div>
                        <div>
                          <p
                            className={`${typography.tiny} text-muted-foreground`}
                          >
                            {spec.label}
                          </p>
                          <p
                            className={`${typography.small} font-medium text-foreground`}
                          >
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Description */}
            <SlideIn direction="left" delay={0.1}>
              <Card className={components.card.elevated}>
                <CardHeader>
                  <CardTitle className={typography.h4}>Opis vozila</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${typography.body} text-muted-foreground`}>
                    {vozilo.opis}
                  </p>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Features */}
            <SlideIn direction="left" delay={0.2}>
              <Card className={components.card.elevated}>
                <CardHeader>
                  <CardTitle className={typography.h4}>Oprema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vozilo.karakteristike.map((feature) => (
                      <div
                        key={feature}
                        className={`flex items-center gap-2 ${typography.small}`}
                      >
                        <Check className="w-4 h-4 text-success" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Financing Calculator */}
            <SlideIn direction="left" delay={0.3}>
              <KalkulatorFinanciranja cijenaVozila={vozilo.cijena} />
            </SlideIn>
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-6">
            {/* Price Card (Desktop) */}
            <div className="hidden lg:block sticky top-24">
              <SlideIn direction="right">
                <Card className="border-border/50">
                  <CardContent className={spacing.card.medium}>
                    <h1 className={`${typography.h3} text-foreground mb-1`}>
                      {vozilo.marka} {vozilo.model}
                    </h1>
                    <p
                      className={`${typography.small} text-muted-foreground mb-4`}
                    >
                      {vozilo.godina} • {formatKilometraza(vozilo.kilometraza)}
                    </p>

                    {vozilo.ekskluzivno && (
                      <Badge className="bg-amber-500 text-white font-semibold mb-4">
                        Ekskluzivna ponuda
                      </Badge>
                    )}

                    {vozilo.istaknuto && (
                      <div className="mb-4">
                        <TrustBadges size="md" />
                      </div>
                    )}

                    <div className="mb-6">
                      <PriceDisplay
                        price={vozilo.cijena}
                        oldPrice={vozilo.staracijena}
                        variant="detail"
                      />
                    </div>

                    <div className="flex gap-2 mb-6">
                      <Button
                        variant={isComparing ? "default" : "outline"}
                        className="flex-1"
                        onClick={handleCompareToggle}
                      >
                        <GitCompare className="w-4 h-4 mr-2" />
                        {isComparing ? "U usporedbi" : "Usporedi"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Separator className="my-6" />

                    {/* Quick Contact */}
                    <div className="space-y-3 mb-6">
                      <a
                        href={`tel:${CONTACT.phoneRaw}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        <div>
                          <p className="text-sm opacity-80">Nazovite odmah</p>
                          <p className="font-semibold">{CONTACT.phone}</p>
                        </div>
                      </a>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <Mail className="w-5 h-5 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground">
                            {CONTACT.email}
                          </p>
                        </div>
                      </a>
                    </div>

                    <Separator className="my-6" />

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h3 className={`${typography.h4} text-foreground`}>
                        Pošaljite upit
                      </h3>
                      <div>
                        <Input
                          placeholder="Vaše ime"
                          value={formData.ime}
                          onChange={(e) => {
                            setFormData({ ...formData, ime: e.target.value });
                            if (errors.ime) setErrors({ ...errors, ime: "" });
                          }}
                          className={errors.ime ? "border-red-500" : ""}
                        />
                        {errors.ime && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.ime}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Telefon"
                          type="tel"
                          value={formData.telefon}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              telefon: e.target.value,
                            });
                            if (errors.telefon)
                              setErrors({ ...errors, telefon: "" });
                          }}
                          className={errors.telefon ? "border-red-500" : ""}
                        />
                        {errors.telefon && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.telefon}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email)
                              setErrors({ ...errors, email: "" });
                          }}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <textarea
                          placeholder="Poruka"
                          className={`w-full min-h-[100px] px-3 py-2 rounded-md border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring ${
                            errors.poruka ? "border-red-500" : "border-input"
                          }`}
                          value={formData.poruka}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              poruka: e.target.value,
                            });
                            if (errors.poruka)
                              setErrors({ ...errors, poruka: "" });
                          }}
                        />
                        {errors.poruka && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.poruka}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className={`w-full ${components.button.primary}`}
                      >
                        Pošalji upit
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVozila.length > 0 && (
          <section className="mt-16">
            <FadeIn>
              <h2 className={`${typography.h3} text-foreground mb-6`}>
                Slična vozila
              </h2>
            </FadeIn>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${spacing.gap.default}`}
            >
              {similarVozila.map((v, index) => (
                <VoziloCard key={v.id} vozilo={v} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className={`${typography.small} text-muted-foreground`}>
              Cijena
            </p>
            <p className={`${typography.h4} ${components.icon.accent}`}>
              {formatCijena(vozilo.cijena)}
            </p>
          </div>
          <a href="tel:+385911234567">
            <Button className="bg-primary">
              <Phone className="w-4 h-4 mr-2" />
              Nazovi
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
