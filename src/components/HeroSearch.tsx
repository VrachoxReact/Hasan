"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { typography, components } from "@/lib/designTokens";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MARKE, GODINE, CJENOVNI_PRAGOVI } from "@/types/vozilo";

export default function HeroSearch() {
  const router = useRouter();
  const [marka, setMarka] = useState<string>("");
  const [godina, setGodina] = useState<string>("");
  const [cijena, setCijena] = useState<string>("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (marka) params.set("marka", marka);
    if (godina) params.set("godinaOd", godina);
    if (cijena) {
      const prag = CJENOVNI_PRAGOVI.find((p) => p.value === cijena);
      if (prag) {
        params.set("cijenaOd", prag.min.toString());
        params.set("cijenaDo", prag.max.toString());
      }
    }

    router.push(`/vozila${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12 md:mt-16 rounded-2xl md:rounded-3xl bg-black/50 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-black/60"
    >
      <div className="px-6 pt-6 md:px-10 md:pt-8 pb-6 border-b border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className={`text-white/80 ${typography.small} font-medium`}>
            Brza pretraga vozila
          </p>
          <p className="text-xs text-white/60 mt-0.5">
            Filtrirajte ponudu po marki, godini i cijeni.
          </p>
        </div>
        <p className="text-xs text-white/50">
          Više od{" "}
          <span className="font-semibold text-white">
            30 pažljivo odabranih vozila
          </span>{" "}
          dostupnih odmah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 px-6 pb-6 md:px-10 md:pb-8 pt-6">
        {/* Marka */}
        <div>
          <label
            className={`text-white/90 ${typography.small} mb-2 block font-medium`}
          >
            Marka
          </label>
          <Select value={marka} onValueChange={setMarka}>
            <SelectTrigger className="hero-select-trigger bg-white/20 border-white/30 text-white h-14">
              <SelectValue placeholder="Sve marke" />
            </SelectTrigger>
            <SelectContent>
              {MARKE.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Godina */}
        <div>
          <label
            className={`text-white/90 ${typography.small} mb-2 block font-medium`}
          >
            Godina od
          </label>
          <Select value={godina} onValueChange={setGodina}>
            <SelectTrigger className="hero-select-trigger bg-white/20 border-white/30 text-white h-14">
              <SelectValue placeholder="Bilo koja" />
            </SelectTrigger>
            <SelectContent>
              {GODINE.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cijena */}
        <div>
          <label
            className={`text-white/90 ${typography.small} mb-2 block font-medium`}
          >
            Cijena
          </label>
          <Select value={cijena} onValueChange={setCijena}>
            <SelectTrigger className="hero-select-trigger bg-white/20 border-white/30 text-white h-14">
              <SelectValue placeholder="Bilo koja" />
            </SelectTrigger>
            <SelectContent>
              {CJENOVNI_PRAGOVI.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            size="lg"
            className={`w-full h-14 text-base font-semibold ${components.button.primary}`}
          >
            <Search className="w-5 h-5 mr-2" />
            Pretraži
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
