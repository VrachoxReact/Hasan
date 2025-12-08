"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Car, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&auto=format&fit=crop&q=80",
    alt: "Luksuzni automobil u showroomu",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=80",
    alt: "Sportski automobil na cesti",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1920&auto=format&fit=crop&q=80",
    alt: "Premium vozilo u prirodi",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&auto=format&fit=crop&q=80",
    alt: "Moderno vozilo u salonu",
  },
];

interface HeroCarouselProps {
  children?: React.ReactNode;
}

export default function HeroCarousel({ children }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative">
      {/* Carousel Container */}
      <div
        className="relative h-[70vh] md:h-[80vh] overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>
          ))}
        </div>

        {/* CTA Buttons - Centered on carousel */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-8 sm:gap-16"
          >
            <Link href="/vozila">
              <Button
                size="lg"
                className="min-w-[220px] h-16 text-lg font-semibold bg-white text-primary hover:bg-white/90 shadow-xl transition-all hover:scale-105"
              >
                <Car className="w-5 h-5 mr-2" />
                DOSTUPNA VOZILA
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="min-w-[220px] h-16 text-lg font-semibold border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary shadow-xl transition-all hover:scale-105"
              >
                <Building2 className="w-5 h-5 mr-2" />
                VELEPRODAJA VOZILA
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Search Form Overlay - positioned to overlap bottom of carousel */}
      {children && (
        <div className="relative z-30 -mt-40 md:-mt-36 px-4">
          <div className="container mx-auto max-w-7xl">{children}</div>
        </div>
      )}
    </section>
  );
}
