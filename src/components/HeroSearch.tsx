"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MARKE,
  MODELI_PO_MARKI,
  GODINE,
  GORIVA,
  MJENJACI,
} from "@/types/vozilo";
import { getVozila } from "@/lib/vozila";

const MAX_PRICE = 100000;

export default function HeroSearch() {
  const router = useRouter();
  const [marka, setMarka] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [godina, setGodina] = useState<string>("");
  const [gorivo, setGorivo] = useState<string>("");
  const [mjenjac, setMjenjac] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);

  // Get available models based on selected brand
  const availableModels = useMemo(() => {
    if (!marka) return [];
    return MODELI_PO_MARKI[marka] || [];
  }, [marka]);

  // Reset model when brand changes
  const handleMarkaChange = (value: string) => {
    setMarka(value);
    setModel("");
  };

  // Count matching vehicles
  const matchingCount = useMemo(() => {
    const vozila = getVozila();
    return vozila.filter((v) => {
      if (marka && v.marka !== marka) return false;
      if (model && v.model !== model) return false;
      if (godina && v.godina < parseInt(godina)) return false;
      if (gorivo && v.gorivo !== gorivo) return false;
      if (mjenjac && v.mjenjac !== mjenjac) return false;
      if (v.cijena < priceRange[0] || v.cijena > priceRange[1]) return false;
      return true;
    }).length;
  }, [marka, model, godina, gorivo, mjenjac, priceRange]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (marka) params.set("marka", marka);
    if (model) params.set("model", model);
    if (godina) params.set("godinaOd", godina);
    if (gorivo) params.set("gorivo", gorivo);
    if (mjenjac) params.set("mjenjac", mjenjac);
    if (priceRange[0] > 0) params.set("cijenaOd", priceRange[0].toString());
    if (priceRange[1] < MAX_PRICE)
      params.set("cijenaDo", priceRange[1].toString());

    router.push(`/vozila${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("hr-HR").format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="rounded-lg bg-white dark:bg-card shadow-xl border border-border/50"
    >
      <div className="p-2.5 md:p-3">
        {/* All fields in one row on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-2.5">
          {/* Proizvodžač */}
          <Select value={marka} onValueChange={handleMarkaChange}>
            <SelectTrigger className="h-9 bg-background border-border text-xs">
              <SelectValue placeholder="Proizvodžač" />
            </SelectTrigger>
            <SelectContent>
              {MARKE.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Model */}
          <Select value={model} onValueChange={setModel} disabled={!marka}>
            <SelectTrigger className="h-9 bg-background border-border text-xs">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Godina od */}
          <Select value={godina} onValueChange={setGodina}>
            <SelectTrigger className="h-9 bg-background border-border text-xs">
              <SelectValue placeholder="Godina od" />
            </SelectTrigger>
            <SelectContent>
              {GODINE.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tip goriva */}
          <Select value={gorivo} onValueChange={setGorivo}>
            <SelectTrigger className="h-9 bg-background border-border text-xs">
              <SelectValue placeholder="Tip goriva" />
            </SelectTrigger>
            <SelectContent>
              {GORIVA.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Mjenjač */}
          <Select value={mjenjac} onValueChange={setMjenjac}>
            <SelectTrigger className="h-9 bg-background border-border text-xs">
              <SelectValue placeholder="Vrsta mjenjača" />
            </SelectTrigger>
            <SelectContent>
              {MJENJACI.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Button - takes last column */}
          <Button
            onClick={handleSearch}
            size="sm"
            className="h-9 px-3 text-xs font-semibold bg-accent hover:bg-accent/90 text-white"
          >
            <Search className="w-4 h-4 mr-1" />
            {matchingCount}
          </Button>
        </div>

        {/* Price Slider Row - Compact */}
        <div className="flex items-center gap-2.5 mt-2">
          <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
            {formatPrice(priceRange[0])}€ - {formatPrice(priceRange[1])}€
          </span>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={MAX_PRICE}
            step={1000}
            className="flex-1"
          />
        </div>
      </div>
    </motion.div>
  );
}
