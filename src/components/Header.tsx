"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GitCompare, Phone, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useUsporediStore } from "@/stores/usporediStore";
import { useFavoritiStore } from "@/stores/favoritiStore";
import ThemeToggle from "@/components/ThemeToggle";
import { typography } from "@/lib/designTokens";
import { CONTACT } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/vozila", label: "Vozila" },
  { href: "/o-nama", label: "O Nama" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const vozila = useUsporediStore((state) => state.vozila);
  const favoriti = useFavoritiStore((state) => state.favoriti);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const compareCount = useMemo(
    () => (mounted ? vozila.length : 0),
    [mounted, vozila.length]
  );
  const favoritiCount = useMemo(
    () => (mounted ? favoriti.length : 0),
    [mounted, favoriti.length]
  );

  // Track previous counts for badge animation
  const prevCompareCount = useRef(compareCount);
  const prevFavoritiCount = useRef(favoritiCount);
  const [compareAnimating, setCompareAnimating] = useState(false);
  const [favoritiAnimating, setFavoritiAnimating] = useState(false);

  // Animate badges when counts change
  useEffect(() => {
    if (compareCount !== prevCompareCount.current && compareCount > 0) {
      setCompareAnimating(true);
      setTimeout(() => setCompareAnimating(false), 600);
    }
    prevCompareCount.current = compareCount;
  }, [compareCount]);

  useEffect(() => {
    if (favoritiCount !== prevFavoritiCount.current && favoritiCount > 0) {
      setFavoritiAnimating(true);
      setTimeout(() => setFavoritiAnimating(false), 600);
    }
    prevFavoritiCount.current = favoritiCount;
  }, [favoritiCount]);

  return (
    <>
      {/* Floating Logo - elegantly positioned overlapping header bottom */}
      <Link
        href="/"
        className="fixed top-2 left-4 md:left-6 z-[60] group"
        aria-label="Produkt Auto - Početna"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative"
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Logo container */}
          <div className="relative bg-white rounded-2xl p-3 md:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-2 ring-white/50 group-hover:ring-accent/60 group-hover:shadow-[0_12px_40px_rgba(96,165,250,0.4)] transition-all duration-300">
            <Image
              src="/logoweb.png"
              alt="Produkt Auto logo"
              width={100}
              height={100}
              className="object-contain w-20 h-20 md:w-[100px] md:h-[100px]"
              priority
            />
          </div>
        </motion.div>
      </Link>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-primary/95 backdrop-blur-xl shadow-lg border-b border-border/30"
            : "bg-white/90 dark:bg-primary/90 backdrop-blur-xl border-b border-border/20"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Spacer for logo area */}
            <div className="w-28 md:w-32" />

            {/* Desktop Navigation - centered */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-200 rounded-lg px-4 py-2.5 ${
                    pathname === link.href
                      ? "text-white bg-accent"
                      : "text-foreground/80 hover:text-foreground hover:bg-accent/10 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10"
                  } focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions: WhatsApp, Compare, Favorites, Theme */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* WhatsApp Button - Large desktop only */}
              <a
                href={CONTACT.whatsapp.messageUrl(
                  "Pozdrav! Zanima me ponuda vozila."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex"
                aria-label="Kontaktirajte nas putem WhatsApp"
              >
                <Button
                  size="sm"
                  className="bg-[#25D366] hover:bg-[#22c55e] text-white gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </Button>
              </a>

              {/* Compare Button */}
              <Link
                href="/usporedi"
                aria-label={`Usporedi vozila${
                  compareCount > 0 ? ` (${compareCount})` : ""
                }`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="relative border-accent/50 text-accent hover:bg-accent hover:text-white bg-background/50 dark:bg-transparent min-h-[40px] rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <GitCompare className="w-4 h-4 mr-1.5" />
                  <span className="hidden sm:inline">Usporedi</span>
                  <AnimatePresence>
                    {compareCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: compareAnimating ? [1, 1.3, 1] : 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge
                          variant="default"
                          className="h-5 w-5 p-0 flex items-center justify-center bg-accent text-white text-xs font-bold"
                          aria-hidden="true"
                        >
                          {compareCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>

              {/* Favorites Button - Improved accessibility */}
              <Link
                href="/favoriti"
                className="hidden sm:block"
                aria-label={`Favoriti${
                  favoritiCount > 0 ? ` (${favoritiCount})` : ""
                }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground/60 hover:text-red-400 hover:bg-accent/10 dark:text-white/80 dark:hover:text-red-400 dark:hover:bg-white/10 min-w-[40px] min-h-[40px] rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favoritiCount > 0 ? "fill-red-400 text-red-400" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <AnimatePresence>
                    {favoritiCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: favoritiAnimating ? [1, 1.3, 1] : 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge
                          variant="default"
                          className="h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold"
                          aria-hidden="true"
                        >
                          {favoritiCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground dark:text-white min-w-[44px] min-h-[44px] rounded-xl hover:bg-accent/10 dark:hover:bg-white/10"
                    aria-label="Otvori navigacijski izbornik"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-gradient-to-b from-primary via-primary to-primary/95 border-l border-accent/20 w-[85vw] max-w-[360px] p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="relative px-6 pt-6 pb-4">
                      {/* Decorative accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent" />

                      <div className="flex items-center justify-between">
                        <Link
                          href="/"
                          className="flex items-center gap-3 group"
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="bg-white rounded-xl p-2 shadow-lg shadow-black/20"
                          >
                            <Image
                              src="/logoweb.png"
                              alt="Produkt Auto logo"
                              width={48}
                              height={48}
                              className="w-12 h-12 object-contain"
                            />
                          </motion.div>
                          <div className="flex flex-col">
                            <span className="text-lg font-bold text-white leading-tight">
                              Produkt <span className="text-accent">Auto</span>
                            </span>
                            <span className="text-xs text-white/50">
                              Premium vozila
                            </span>
                          </div>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsOpen(false)}
                          className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl w-10 h-10"
                          aria-label="Zatvori izbornik"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex-1 px-4 py-4 overflow-y-auto">
                      <div className="space-y-1">
                        {navLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`group flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-200 ${
                                pathname === link.href
                                  ? "bg-accent text-white shadow-lg shadow-accent/30"
                                  : "text-white/80 hover:bg-white/10 hover:text-white active:bg-white/15"
                              }`}
                            >
                              <span className="text-[15px]">{link.label}</span>
                              {pathname === link.href && (
                                <motion.div
                                  layoutId="mobile-nav-active"
                                  className="ml-auto w-2 h-2 rounded-full bg-white"
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Quick Actions Section */}
                      <div className="mt-6">
                        <p className="px-4 mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                          Brzi pristup
                        </p>
                        <div className="space-y-1">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <Link
                              href="/usporedi"
                              onClick={() => setIsOpen(false)}
                              className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 active:bg-white/15"
                            >
                              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                                <GitCompare className="w-5 h-5 text-accent" />
                              </div>
                              <div className="flex-1">
                                <span className="text-[15px] font-medium">
                                  Usporedi vozila
                                </span>
                                {compareCount > 0 && (
                                  <p className="text-xs text-white/50">
                                    {compareCount} vozila odabrano
                                  </p>
                                )}
                              </div>
                              {compareCount > 0 && (
                                <Badge className="bg-accent text-white h-7 min-w-[28px] px-2.5 text-sm font-bold">
                                  {compareCount}
                                </Badge>
                              )}
                            </Link>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Link
                              href="/favoriti"
                              onClick={() => setIsOpen(false)}
                              className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 active:bg-white/15"
                            >
                              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                                <Heart
                                  className={`w-5 h-5 text-red-400 ${
                                    favoritiCount > 0 ? "fill-current" : ""
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <span className="text-[15px] font-medium">
                                  Favoriti
                                </span>
                                {favoritiCount > 0 && (
                                  <p className="text-xs text-white/50">
                                    {favoritiCount} spremljeno
                                  </p>
                                )}
                              </div>
                              {favoritiCount > 0 && (
                                <Badge className="bg-red-500 text-white h-7 min-w-[28px] px-2.5 text-sm font-bold">
                                  {favoritiCount}
                                </Badge>
                              )}
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </nav>

                    {/* Contact Actions - Footer */}
                    <div className="px-4 pb-6 pt-4 border-t border-white/10 bg-black/20">
                      <p className="px-4 mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                        Kontakt
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.a
                          href={`tel:${CONTACT.phoneRaw}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 active:bg-white/15"
                        >
                          <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-accent" />
                          </div>
                          <span className="text-xs font-medium text-white/70">
                            Nazovi
                          </span>
                        </motion.a>

                        <motion.a
                          href={CONTACT.whatsapp.messageUrl(
                            "Pozdrav! Zanima me ponuda vozila."
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all duration-200 active:bg-[#25D366]/30"
                        >
                          <div className="w-11 h-11 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-[#25D366]" />
                          </div>
                          <span className="text-xs font-medium text-[#25D366]">
                            WhatsApp
                          </span>
                        </motion.a>
                      </div>

                      {/* Phone number display */}
                      <div className="mt-4 text-center">
                        <a
                          href={`tel:${CONTACT.phoneRaw}`}
                          className="text-sm text-white/50 hover:text-white/70 transition-colors"
                        >
                          {CONTACT.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
