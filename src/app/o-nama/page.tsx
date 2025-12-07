"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Users,
  Target,
  Heart,
  CheckCircle,
  ArrowRight,
  Car,
  Clock,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  SlideIn,
} from "@/components/PageTransition";
import { typography, spacing, components } from "@/lib/designTokens";

const values = [
  {
    icon: Shield,
    title: "Pouzdanost",
    description:
      "Svako vozilo prolazi rigoroznu kontrolu kvalitete. Jamčimo za svaki automobil koji prodajemo.",
  },
  {
    icon: Heart,
    title: "Iskrenost",
    description:
      "Transparentno komuniciramo sve informacije o vozilima - bez skrivenih mana ili iznenađenja.",
  },
  {
    icon: Users,
    title: "Profesionalnost",
    description:
      "Naš tim čine iskusni stručnjaci s dugogodišnjim iskustvom u automobilskoj industriji.",
  },
  {
    icon: Target,
    title: "Fokus na kupca",
    description:
      "Slušamo vaše potrebe i pomažemo pronaći vozilo koje savršeno odgovara vašem životnom stilu.",
  },
];

const timeline = [
  {
    year: "2014",
    title: "Početak priče",
    description:
      "Osnovali smo Produkt Auto s vizijom pružanja premium iskustva kupnje rabljenih vozila.",
  },
  {
    year: "2017",
    title: "Širenje ponude",
    description:
      "Proširili smo ponudu na premium marke i uveli program certificiranih vozila.",
  },
  {
    year: "2020",
    title: "Digitalna transformacija",
    description:
      "Pokrenuli smo online platformu za lakše pretraživanje i kupnju vozila.",
  },
  {
    year: "2024",
    title: "Lider na tržištu",
    description:
      "Postali smo jedan od vodećih prodavača premium rabljenih vozila u regiji.",
  },
];

const stats = [
  { icon: Car, value: "500+", label: "Prodanih vozila" },
  { icon: Clock, value: "10+", label: "Godina iskustva" },
  { icon: ThumbsUp, value: "98%", label: "Zadovoljnih kupaca" },
  { icon: Award, value: "30", label: "Dana jamstva" },
];

export default function ONamaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1568844293986-8c68a25a9b5a?w=1920"
            alt="Produkt Auto tim"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 dark:from-gray-900/95 dark:to-gray-900/85" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`${typography.h1} text-white mb-6`}>O nama</h1>
              <p className={`${typography.bodyLarge} text-white/90`}>
                Više od desetljeća posvećeni smo pružanju izvanrednog iskustva
                kupnje automobila. Naša strast prema automobilima i predanost
                korisnicima čine nas pouzdanim partnerom za pronalazak vašeg
                savršenog vozila.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${components.icon.background} flex items-center justify-center mx-auto mb-3`}
                >
                  <stat.icon className={`w-7 h-7 ${components.icon.accent}`} />
                </div>
                <div
                  className={`${typography.stat} ${components.icon.accent} mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideIn direction="left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800"
                    alt="Naš salon"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div>
                <h2 className={`${typography.h2} text-foreground mb-6`}>
                  Naša priča
                </h2>
                <div
                  className={`space-y-4 ${typography.body} text-muted-foreground`}
                >
                  <p>
                    Produkt Auto je osnovan 2014. godine s jednostavnom misijom:
                    učiniti kupnju rabljenog automobila ugodnim i sigurnim
                    iskustvom. Vjerujemo da svatko zaslužuje voziti kvalitetan
                    automobil uz potpunu transparentnost i podršku.
                  </p>
                  <p>
                    Tijekom godina izgradili smo reputaciju pouzdanog partnera
                    koji stavlja kupce na prvo mjesto. Svako vozilo u našoj
                    ponudi prolazi detaljnu inspekciju i pripremu prije prodaje.
                  </p>
                  <p>
                    Danas smo ponosni na preko 500 uspješnih prodaja i tisuće
                    zadovoljnih kupaca koji nam vjeruju. Naš tim čine
                    entuzijasti koji dijele strast prema automobilima i
                    predanost izvrsnosti.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className={`${typography.h2} text-foreground mb-4`}>
                Naš put
              </h2>
              <p
                className={`${typography.body} text-muted-foreground max-w-2xl mx-auto`}
              >
                Pogledajte ključne trenutke koji su oblikovali Produkt Auto u
                tvrtku kakva je danas.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex items-start gap-6 pb-12 last:pb-0"
              >
                {/* Line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[23px] top-12 w-0.5 h-full bg-border" />
                )}

                {/* Year Badge */}
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm z-10">
                  {item.year.slice(2)}
                </div>

                {/* Content */}
                <Card className="flex-1 bg-card border-border/50">
                  <CardContent className="p-5">
                    <span className="text-sm text-accent font-medium">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Naše vrijednosti
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ove temeljne vrijednosti vode sve što radimo i definiraju naš
                pristup poslu.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="h-full bg-card border-border/50 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4"
                    >
                      <value.icon className="w-7 h-7 text-accent" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Zašto odabrati Produkt Auto?
                </h2>
                <div className="space-y-4">
                  {[
                    "Sva vozila s provjerenom poviješću i servisnom dokumentacijom",
                    "30 dana jamstva na svako kupljeno vozilo",
                    "Mogućnost financiranja putem vodećih banaka",
                    "Profesionalna procjena vašeg starog vozila",
                    "Besplatna dostava vozila na području Hrvatske",
                    "Podrška nakon kupnje za sve vaše upite",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-white/90">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/vozila">
                    <Button
                      size="lg"
                      className="bg-accent text-white hover:bg-accent/90"
                    >
                      Pregledaj vozila
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/kontakt">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary"
                    >
                      Kontaktirajte nas
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800"
                    alt="Premium vozilo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-2xl -z-10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
