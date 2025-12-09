"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  User,
  Euro,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FloatingInput,
  FloatingTextarea,
} from "@/components/ui/floating-input";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/PageTransition";
import { toast } from "sonner";
import { typography, spacing, components } from "@/lib/designTokens";
import { contactFormSchema } from "@/lib/schemas";
import { CONTACT, WORKING_HOURS } from "@/lib/constants";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: CONTACT.phone,
    href: `tel:${CONTACT.phoneRaw}`,
    description: `${WORKING_HOURS.weekdays.label}: ${WORKING_HOURS.weekdays.open} - ${WORKING_HOURS.weekdays.close}`,
  },
  {
    icon: Mail,
    title: "Email",
    content: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    description: "Odgovaramo unutar 24h",
  },
  {
    icon: MapPin,
    title: "Adresa",
    content: CONTACT.address.street,
    href: CONTACT.maps.directionsUrl,
    description: `${CONTACT.address.postalCode} ${CONTACT.address.city}, ${CONTACT.address.country}`,
  },
  {
    icon: Clock,
    title: "Radno vrijeme",
    content: `${WORKING_HOURS.weekdays.label}: ${WORKING_HOURS.weekdays.open} - ${WORKING_HOURS.weekdays.close}`,
    href: null,
    description: `${WORKING_HOURS.saturday.label}: ${WORKING_HOURS.saturday.open} - ${WORKING_HOURS.saturday.close}`,
  },
];

const budgetOptions = [
  { value: "do-15000", label: "Do 15.000 €" },
  { value: "15000-25000", label: "15.000 € - 25.000 €" },
  { value: "25000-40000", label: "25.000 € - 40.000 €" },
  { value: "40000-60000", label: "40.000 € - 60.000 €" },
  { value: "preko-60000", label: "Preko 60.000 €" },
];

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    telefon: "",
    budzet: "",
    poruka: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const lastSubmitTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds
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
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Vaša poruka je uspješno poslana!");

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        ime: "",
        email: "",
        telefon: "",
        budzet: "",
        poruka: "",
      });
      setErrors({});
    }, 3000);
  };

  // JSON-LD structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: "Produkt Auto",
    image: "https://produktauto.hr/logo.png",
    "@id": "https://produktauto.hr",
    url: "https://produktauto.hr",
    telephone: "+385911234567",
    email: "info@produktauto.hr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ulica grada Vukovara 271",
      addressLocality: "Zagreb",
      postalCode: "10000",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.8014399,
      longitude: 15.9819711,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "€€€",
    description:
      "Vaš pouzdani partner za kupnju kvalitetnih rabljenih vozila u Hrvatskoj.",
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        {/* Lighter Overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className={`${typography.h1} text-white mb-6 drop-shadow-lg`}>
                Kontaktirajte nas
              </h1>
              <p
                className={`${typography.bodyLarge} text-white/95 drop-shadow-md`}
              >
                Imate pitanja ili želite zakazati pregled vozila? Javite nam se
                - tu smo za vas!
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <StaggerContainer
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.gap.default}`}
          >
            {contactInfo.map((item) => (
              <StaggerItem key={item.title}>
                <Card className={`${components.card.elevated} h-full`}>
                  <CardContent className={`${spacing.card.medium} text-center`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-14 h-14 rounded-2xl ${components.icon.background} flex items-center justify-center mx-auto mb-4`}
                    >
                      <item.icon
                        className={`w-7 h-7 ${components.icon.accent}`}
                      />
                    </motion.div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-accent font-medium hover:text-accent/80 transition-colors block"
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-accent font-medium">{item.content}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <SlideIn direction="left">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Animated gradient border - reduced on mobile/reduced motion */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-accent via-primary to-accent ${
                    shouldReduceMotion
                      ? "opacity-50 blur-lg"
                      : "opacity-75 blur-xl"
                  }`}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          opacity: [0.5, 0.75, 0.5],
                        }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <Card className="relative bg-card/95 backdrop-blur-sm border-2 border-accent/20 shadow-2xl overflow-hidden">
                  {/* Animated gradient top border */}
                  <motion.div
                    className="h-2 bg-gradient-to-r from-accent/50 via-accent to-accent/50"
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            backgroundPosition: [
                              "0% 50%",
                              "100% 50%",
                              "0% 50%",
                            ],
                          }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  />

                  <CardContent className="p-10 md:p-16">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-4 mb-8 relative"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg shadow-accent/50"
                      >
                        <MessageSquare className="w-9 h-9 text-white" />
                        <motion.div
                          className="absolute -top-1 -right-1"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                          }}
                        >
                          <Sparkles className="w-4 h-4 text-accent fill-accent" />
                        </motion.div>
                      </motion.div>
                      <div>
                        <h2
                          className={`${typography.h3} text-foreground mb-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text`}
                        >
                          Pošaljite upit
                        </h2>
                        <p
                          className={`${typography.small} text-muted-foreground`}
                        >
                          Ispunite obrazac i javit ćemo vam se u najkraćem roku
                        </p>
                      </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.6, type: "spring" }}
                          className="relative bg-gradient-to-br from-success/10 via-success/5 to-transparent border-2 border-success/30 rounded-2xl p-10 text-center overflow-hidden"
                        >
                          {/* Animated background sparkles */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-success rounded-full"
                              initial={{
                                opacity: 0,
                                x: "50%",
                                y: "50%",
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                x: `${
                                  50 + Math.cos((i / 8) * Math.PI * 2) * 40
                                }%`,
                                y: `${
                                  50 + Math.sin((i / 8) * Math.PI * 2) * 40
                                }%`,
                                scale: [0, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 2,
                              }}
                            />
                          ))}
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: [0, 1.3, 1], rotate: 0 }}
                            transition={{ duration: 0.7, times: [0, 0.6, 1] }}
                            className="relative inline-block"
                          >
                            <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-6 mx-auto relative">
                              <CheckCircle className="w-16 h-16 text-success" />
                              <motion.div
                                className="absolute inset-0 rounded-full border-4 border-success"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1.5,
                                }}
                              />
                            </div>
                          </motion.div>
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-success mb-3"
                          >
                            Hvala na poruci!
                          </motion.h3>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-success/80 text-base"
                          >
                            Vaš upit je uspješno zaprimljen. Javit ćemo vam se u
                            najkraćem mogućem roku.
                          </motion.p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit}
                          className={components.form.group}
                        >
                          {/* Screen reader error announcement */}
                          {Object.keys(errors).length > 0 && (
                            <div
                              role="alert"
                              aria-live="polite"
                              className="sr-only"
                            >
                              Obrazac sadrži {Object.keys(errors).length}{" "}
                              {Object.keys(errors).length === 1
                                ? "grešku"
                                : "greške"}
                              . Molimo ispravite označena polja.
                            </div>
                          )}

                          <div className={components.form.row}>
                            <FloatingInput
                              label="Ime i prezime *"
                              icon={User}
                              value={formData.ime}
                              className="h-20 text-lg"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  ime: e.target.value,
                                });
                                if (errors.ime)
                                  setErrors({ ...errors, ime: "" });
                              }}
                              error={errors.ime}
                            />
                            <FloatingInput
                              label="Email *"
                              type="email"
                              icon={Mail}
                              value={formData.email}
                              className="h-20 text-lg"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                });
                                if (errors.email)
                                  setErrors({ ...errors, email: "" });
                              }}
                              error={errors.email}
                            />
                          </div>

                          <div className={components.form.row}>
                            <FloatingInput
                              label="Telefon *"
                              type="tel"
                              icon={Phone}
                              value={formData.telefon}
                              className="h-20 text-lg"
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  telefon: e.target.value,
                                });
                                if (errors.telefon)
                                  setErrors({ ...errors, telefon: "" });
                              }}
                              error={errors.telefon}
                            />
                            <Select
                              value={formData.budzet}
                              onValueChange={(value) =>
                                setFormData({ ...formData, budzet: value })
                              }
                            >
                              <SelectTrigger className="w-full h-20 px-5 text-lg rounded-xl border border-input bg-background transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none">
                                <div className="flex items-center gap-3">
                                  <Euro className="w-5 h-5 text-muted-foreground shrink-0" />
                                  <SelectValue placeholder="Odaberite budžet" />
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {budgetOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <FloatingTextarea
                            label="Vaša poruka *"
                            icon={MessageSquare}
                            value={formData.poruka}
                            className="min-h-[280px] text-lg leading-relaxed"
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                poruka: e.target.value,
                              });
                              if (errors.poruka)
                                setErrors({ ...errors, poruka: "" });
                            }}
                            error={errors.poruka}
                            showCharCount
                            maxLength={1000}
                          />

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              size="lg"
                              className="w-full h-20 text-xl bg-gradient-to-r from-accent via-accent/90 to-accent hover:from-accent/90 hover:via-accent hover:to-accent/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 group relative overflow-hidden"
                              disabled={isSubmitting}
                            >
                              {/* Animated shine effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{
                                  x: ["-100%", "200%"],
                                }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 3,
                                  ease: "linear",
                                }}
                              />
                              <span className="relative z-10 flex items-center justify-center">
                                {isSubmitting ? (
                                  <>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 1,
                                        ease: "linear",
                                      }}
                                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                                    />
                                    Šaljem...
                                  </>
                                ) : (
                                  <>
                                    Pošalji upit
                                    <motion.div
                                      className="ml-2"
                                      animate={{ x: [0, 5, 0] }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                      }}
                                    >
                                      <Send className="w-5 h-5" />
                                    </motion.div>
                                  </>
                                )}
                              </span>
                            </Button>
                          </motion.div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </SlideIn>

            {/* Map & Info */}
            <SlideIn direction="right">
              <div className="space-y-6">
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-[300px] lg:h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5024881073784!2d15.9819711!3d45.8014399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6f5f5555555%3A0x5555555555555555!2sUlica%20grada%20Vukovara%20271%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1701874800000!5m2!1shr!2shr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokacija Produkt Auto"
                  />
                </div>

                <Card className="bg-primary text-white border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      Radno vrijeme salona
                    </h3>
                    <div className="space-y-2 text-white/80">
                      <div className="flex justify-between">
                        <span>{WORKING_HOURS.weekdays.label}</span>
                        <span className="text-white font-medium">
                          {WORKING_HOURS.weekdays.open} -{" "}
                          {WORKING_HOURS.weekdays.close}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{WORKING_HOURS.saturday.label}</span>
                        <span className="text-white font-medium">
                          {WORKING_HOURS.saturday.open} -{" "}
                          {WORKING_HOURS.saturday.close}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{WORKING_HOURS.sunday.label}</span>
                        <span className="text-accent font-medium">
                          Zatvoreno
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/20">
                      <p className="text-sm text-white/70">
                        Pregled vozila izvan radnog vremena moguć je uz
                        prethodni dogovor. Nazovite nas za više informacija.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Često postavljana pitanja
              </h2>
              <p className="text-muted-foreground mb-6">
                Niste pronašli odgovor? Slobodno nas kontaktirajte putem
                telefona ili emaila - rado ćemo odgovoriti na sva vaša pitanja.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${CONTACT.phoneRaw}`}>
                  <Button size="lg" className="gap-2">
                    <Phone className="w-5 h-5" />
                    Nazovite nas
                  </Button>
                </a>
                <a href={`mailto:${CONTACT.email}`}>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Mail className="w-5 h-5" />
                    Pošaljite email
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
