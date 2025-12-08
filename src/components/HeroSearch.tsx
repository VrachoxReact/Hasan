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
import { MARKE, MODELI_PO_MARKI, GODINE, GORIVA } from "@/types/vozilo";
import { getVozila } from "@/lib/vozila";

const MAX_PRICE = 100000;

export default function HeroSearch() {
  const router = useRouter();
  const [marka, setMarka] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [godina, setGodina] = useState<string>("");
  const [gorivo, setGorivo] = useState<string>("");
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
      if (v.cijena < priceRange[0] || v.cijena > priceRange[1]) return false;
      return true;
    }).length;
  }, [marka, model, godina, gorivo, priceRange]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (marka) params.set("marka", marka);
    if (model) params.set("model", model);
    if (godina) params.set("godinaOd", godina);
    if (gorivo) params.set("gorivo", gorivo);
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
      className="rounded-2xl bg-white dark:bg-card shadow-2xl border border-border/50"
    >
      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {/* Proizvođač */}
        <div>
          <Select value={marka} onValueChange={handleMarkaChange}>
            <SelectTrigger className="h-16 bg-background border-border text-base">
              <SelectValue placeholder="Proizvođač" />
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

        {/* Model */}
        <div>
          <Select value={model} onValueChange={setModel} disabled={!marka}>
            <SelectTrigger className="h-16 bg-background border-border text-base">
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
        </div>

        {/* Godina od */}
        <div>
          <Select value={godina} onValueChange={setGodina}>
            <SelectTrigger className="h-16 bg-background border-border text-base">
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
        </div>

        {/* Tip goriva */}
        <div>
          <Select value={gorivo} onValueChange={setGorivo}>
            <SelectTrigger className="h-16 bg-background border-border text-base">
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
        </div>
      </div>

      {/* Price Slider Row */}
      <div className="px-6 pb-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">
              {formatPrice(priceRange[0])}€ - {formatPrice(priceRange[1])}€
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={MAX_PRICE}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          size="lg"
          className="h-16 px-8 text-base font-semibold bg-accent hover:bg-accent/90 text-white min-w-[180px]"
        >
          <Search className="w-5 h-5 mr-2" />
          {matchingCount} Automobila
        </Button>
      </div>
    </motion.div>
  );
}
