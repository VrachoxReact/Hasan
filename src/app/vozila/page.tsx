"use client";

import {
  useState,
  useEffect,
  useMemo,
  useTransition,
  startTransition,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import VoziloCard from "@/components/VoziloCard";
import VoziloListItem from "@/components/VoziloListItem";
import VehicleCardSkeleton from "@/components/VehicleCardSkeleton";
import { typography, spacing, components } from "@/lib/designTokens";
import { FadeIn } from "@/components/PageTransition";
import {
  getVozila,
  filterVozila,
  getSortedVozila,
  formatCijena,
  formatKilometraza,
} from "@/lib/vozila";
import { MARKE, GORIVA, MJENJACI } from "@/types/vozilo";
import type { FilterOptions, Vozilo } from "@/types/vozilo";

type RangeTuple = [number, number];

interface FilterContentProps {
  filters: FilterOptions;
  activeFiltersCount: number;
  onMarkaChange: (value: string) => void;
  onGorivoChange: (gorivo: string, checked: boolean) => void;
  onMjenjacChange: (value: string) => void;
  onPriceCommit: (values: number[]) => void;
  onKmCommit: (value: number) => void;
  onYearCommit: (values: number[]) => void;
  onClearFilters: () => void;
}

function FilterContent({
  filters,
  activeFiltersCount,
  onMarkaChange,
  onGorivoChange,
  onMjenjacChange,
  onPriceCommit,
  onKmCommit,
  onYearCommit,
  onClearFilters,
}: FilterContentProps) {
  const [priceRange, setPriceRange] = useState<RangeTuple>([
    filters.cijenaOd ?? 0,
    filters.cijenaDo ?? 100000,
  ]);
  const [kmValue, setKmValue] = useState<number>(
    filters.kilometrazaDo ?? 200000
  );
  const [yearRange, setYearRange] = useState<RangeTuple>([
    filters.godinaOd ?? 2017,
    filters.godinaDo ?? 2025,
  ]);

  // Keep sliders in sync when filters change externally (URL sync / clear)
  useEffect(() => {
    setPriceRange([filters.cijenaOd ?? 0, filters.cijenaDo ?? 100000]);
  }, [filters.cijenaOd, filters.cijenaDo]);

  useEffect(() => {
    setKmValue(filters.kilometrazaDo ?? 200000);
  }, [filters.kilometrazaDo]);

  useEffect(() => {
    setYearRange([filters.godinaOd ?? 2017, filters.godinaDo ?? 2025]);
  }, [filters.godinaOd, filters.godinaDo]);

  const filterPresets = [
    {
      label: "Luksuzna",
      icon: "✨",
      filters: { cijenaOd: 40000, cijenaDo: 100000 },
    },
    {
      label: "Ekonomična",
      icon: "💰",
      filters: { cijenaOd: 0, cijenaDo: 20000 },
    },
    {
      label: "Novija",
      icon: "🆕",
      filters: { godinaOd: 2022, godinaDo: 2025 },
    },
  ];

  const applyPreset = (presetFilters: Partial<FilterOptions>) => {
    onPriceCommit([
      presetFilters.cijenaOd ?? 0,
      presetFilters.cijenaDo ?? 100000,
    ]);
    if (presetFilters.godinaOd || presetFilters.godinaDo) {
      onYearCommit([
        presetFilters.godinaOd ?? 2017,
        presetFilters.godinaDo ?? 2025,
      ]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Filter Presets */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-3 block`}
        >
          Brzi filteri
        </label>
        <div className="grid grid-cols-3 gap-2">
          {filterPresets.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset.filters)}
              className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs hover:bg-accent hover:text-accent-foreground"
            >
              <span className="text-lg">{preset.icon}</span>
              <span className="font-medium">{preset.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Marka */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-2 block`}
        >
          Marka
        </label>
        <Select value={filters.marka || "all"} onValueChange={onMarkaChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sve marke" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sve marke</SelectItem>
            {MARKE.map((marka) => (
              <SelectItem key={marka} value={marka}>
                {marka}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gorivo */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-3 block`}
        >
          Vrsta goriva
        </label>
        <div className="space-y-3">
          {GORIVA.map((g) => (
            <div key={g.value} className="flex items-center gap-2 min-h-[44px]">
              <Checkbox
                id={g.value}
                checked={filters.gorivo?.includes(g.value) || false}
                onCheckedChange={(checked) =>
                  onGorivoChange(g.value, checked as boolean)
                }
                className="h-5 w-5"
              />
              <label
                htmlFor={g.value}
                className={`${typography.small} text-muted-foreground cursor-pointer flex-1 py-2`}
              >
                {g.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Mjenjač */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-2 block`}
        >
          Vrsta mjenjača
        </label>
        <Select
          value={filters.mjenjac || "all"}
          onValueChange={onMjenjacChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Svi mjenjači" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Svi mjenjači</SelectItem>
            {MJENJACI.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cijena */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-3 block`}
        >
          Cijena
        </label>
        <Slider
          value={priceRange}
          onValueChange={(values) => setPriceRange([values[0], values[1]])}
          onValueCommit={(values) => {
            const next: RangeTuple = [values[0], values[1]];
            setPriceRange(next);
            onPriceCommit(next);
          }}
          min={0}
          max={100000}
          step={5000}
          className="mb-2"
        />
        <div
          className={`flex justify-between ${typography.tiny} text-muted-foreground`}
        >
          <span>{formatCijena(priceRange[0])}</span>
          <span>{formatCijena(priceRange[1])}</span>
        </div>
      </div>

      {/* Kilometraža */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-3 block`}
        >
          Maksimalna kilometraža
        </label>
        <Slider
          value={[kmValue]}
          onValueChange={(values) => setKmValue(values[0])}
          onValueCommit={(values) => {
            const next = values[0];
            setKmValue(next);
            onKmCommit(next);
          }}
          min={0}
          max={200000}
          step={1}
          className="mb-2"
        />
        <div
          className={`flex justify-between ${typography.tiny} text-muted-foreground`}
        >
          <span>0 km</span>
          <span>{formatKilometraza(kmValue)}</span>
        </div>
      </div>

      {/* Godina */}
      <div>
        <label
          className={`${typography.small} font-medium text-foreground mb-3 block`}
        >
          Godina proizvodnje
        </label>
        <Slider
          value={yearRange}
          onValueChange={(values) => setYearRange([values[0], values[1]])}
          onValueCommit={(values) => {
            const next: RangeTuple = [values[0], values[1]];
            setYearRange(next);
            onYearCommit(next);
          }}
          min={2017}
          max={2025}
          step={1}
          className="mb-2"
        />
        <div
          className={`flex justify-between ${typography.tiny} text-muted-foreground`}
        >
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={onClearFilters}>
          <X className="w-4 h-4 mr-2" />
          Obriši filtere ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
}

const sortOptions = [
  { value: "datum", label: "Najnovije" },
  { value: "cijena-asc", label: "Cijena: niža prvo" },
  { value: "cijena-desc", label: "Cijena: viša prvo" },
  { value: "godina-desc", label: "Godina: novije prvo" },
  { value: "godina-asc", label: "Godina: starije prvo" },
  { value: "kilometraza-asc", label: "Kilometraža: manja prvo" },
];

export default function VozilaPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allVozila] = useState<Vozilo[]>(getVozila());
  const [filteredVozila, setFilteredVozila] = useState<Vozilo[]>(allVozila);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isPending, startTransition] = useTransition();

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    marka: searchParams.get("marka") || undefined,
    gorivo: searchParams.get("gorivo")?.split(",") || [],
    mjenjac: searchParams.get("mjenjac") || undefined,
    godinaOd: searchParams.get("godinaOd")
      ? parseInt(searchParams.get("godinaOd")!)
      : undefined,
    godinaDo: searchParams.get("godinaDo")
      ? parseInt(searchParams.get("godinaDo")!)
      : undefined,
    cijenaOd: searchParams.get("cijenaOd")
      ? parseInt(searchParams.get("cijenaOd")!)
      : undefined,
    cijenaDo: searchParams.get("cijenaDo")
      ? parseInt(searchParams.get("cijenaDo")!)
      : undefined,
    kilometrazaDo: searchParams.get("kilometrazaDo")
      ? parseInt(searchParams.get("kilometrazaDo")!)
      : undefined,
  });

  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "datum");

  // Update URL with filters
  const updateURL = (newFilters: FilterOptions, newSort: string) => {
    const params = new URLSearchParams();
    if (newFilters.marka) params.set("marka", newFilters.marka);
    if (newFilters.gorivo && newFilters.gorivo.length > 0)
      params.set("gorivo", newFilters.gorivo.join(","));
    if (newFilters.mjenjac) params.set("mjenjac", newFilters.mjenjac);
    if (newFilters.godinaOd)
      params.set("godinaOd", newFilters.godinaOd.toString());
    if (newFilters.godinaDo)
      params.set("godinaDo", newFilters.godinaDo.toString());
    if (newFilters.cijenaOd)
      params.set("cijenaOd", newFilters.cijenaOd.toString());
    if (newFilters.cijenaDo && newFilters.cijenaDo < 100000)
      params.set("cijenaDo", newFilters.cijenaDo.toString());
    if (newFilters.kilometrazaDo && newFilters.kilometrazaDo < 200000)
      params.set("kilometrazaDo", newFilters.kilometrazaDo.toString());
    if (newSort !== "datum") params.set("sort", newSort);

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  // Memoize filtered and sorted vehicles for better performance
  const processedVozila = useMemo(() => {
    const filtered = filterVozila(allVozila, filters);
    return getSortedVozila(filtered, sortBy);
  }, [allVozila, filters, sortBy]);

  // Apply filters with loading state
  useEffect(() => {
    setIsFiltering(true);
    const timeoutId = setTimeout(() => {
      setFilteredVozila(processedVozila);
      setIsFiltering(false);
    }, 150); // Reduced delay for snappier feel
    return () => clearTimeout(timeoutId);
  }, [processedVozila]);

  const handleMarkaChange = (value: string) => {
    const newMarka = value === "all" ? undefined : value;
    const newFilters = { ...filters, marka: newMarka };
    setFilters(newFilters);
    updateURL(newFilters, sortBy);
  };

  const handleGorivoChange = (gorivo: string, checked: boolean) => {
    const newGorivo = checked
      ? [...(filters.gorivo || []), gorivo]
      : (filters.gorivo || []).filter((g) => g !== gorivo);
    const newFilters = { ...filters, gorivo: newGorivo };
    setFilters(newFilters);
    updateURL(newFilters, sortBy);
  };

  const handleMjenjacChange = (value: string) => {
    const newMjenjac = value === "all" ? undefined : value;
    const newFilters = { ...filters, mjenjac: newMjenjac };
    setFilters(newFilters);
    updateURL(newFilters, sortBy);
  };

  const handlePriceCommit = (values: number[]) => {
    const newFilters = {
      ...filters,
      cijenaOd: values[0] > 0 ? values[0] : undefined,
      cijenaDo: values[1] < 100000 ? values[1] : undefined,
    };
    setFilters(newFilters);
    updateURL(newFilters, sortBy);
  };

  const handleKmCommit = (value: number) => {
    const newFilters = {
      ...filters,
      kilometrazaDo: value < 200000 ? value : undefined,
    };
    setFilters(newFilters);
    updateURL(newFilters, sortBy);
  };

  const handleYearCommit = (values: number[]) => {
    const newFilters = {
      ...filters,
      godinaOd: values[0] > 2017 ? values[0] : undefined,
      godinaDo: values[1] < 2025 ? values[1] : undefined,
    };
    setFilters(newFilters);
    updateURL(newFilters, sortBy);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateURL(filters, value);
  };

  const clearFilters = () => {
    setFilters({});
    setSortBy("datum");
    router.push(pathname, { scroll: false });
  };

  const activeFiltersCount = [
    filters.marka,
    filters.gorivo?.length,
    filters.mjenjac,
    filters.cijenaOd || filters.cijenaDo,
    filters.kilometrazaDo,
    filters.godinaOd || filters.godinaDo,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section
        className={`bg-gradient-to-br from-primary to-primary/80 ${spacing.section.small}`}
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className={`${typography.h2} text-white mb-2`}>
              Naša ponuda vozila
            </h1>
            <p className={`${typography.body} text-white/90`}>
              Pronađite savršeno vozilo iz naše ponude od {allVozila.length}{" "}
              kvalitetnih automobila
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-6 max-h-[calc(100vh-120px)] overflow-y-auto filter-scrollbar">
              <h2
                className={`${typography.h4} text-foreground mb-4 flex items-center gap-2`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filteri
              </h2>
              <FilterContent
                filters={filters}
                activeFiltersCount={activeFiltersCount}
                onMarkaChange={handleMarkaChange}
                onGorivoChange={handleGorivoChange}
                onMjenjacChange={handleMjenjacChange}
                onPriceCommit={handlePriceCommit}
                onKmCommit={handleKmCommit}
                onYearCommit={handleYearCommit}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter & Sort Bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filteri
                    {activeFiltersCount > 0 && (
                      <Badge className="bg-primary text-primary-foreground ml-1">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filteri</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent
                      filters={filters}
                      activeFiltersCount={activeFiltersCount}
                      onMarkaChange={handleMarkaChange}
                      onGorivoChange={handleGorivoChange}
                      onMjenjacChange={handleMjenjacChange}
                      onPriceCommit={handlePriceCommit}
                      onKmCommit={handleKmCommit}
                      onYearCommit={handleYearCommit}
                      onClearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground hidden sm:block">
                {filteredVozila.length} vozila
              </p>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.marka && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.marka}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleMarkaChange("all")}
                    />
                  </Badge>
                )}
                {filters.gorivo?.map((g) => (
                  <Badge key={g} variant="secondary" className="gap-1">
                    {GORIVA.find((go) => go.value === g)?.label}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleGorivoChange(g, false)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Vehicle Grid/List */}
            {isFiltering ? (
              // Loading skeleton during filter
              viewMode === "grid" ? (
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ${spacing.gap.default}`}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <VehicleCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <VehicleCardSkeleton key={index} variant="list" />
                  ))}
                </div>
              )
            ) : filteredVozila.length > 0 ? (
              viewMode === "grid" ? (
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ${spacing.gap.default}`}
                >
                  {filteredVozila.map((vozilo, index) => (
                    <VoziloCard key={vozilo.id} vozilo={vozilo} index={index} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVozila.map((vozilo, index) => (
                    <VoziloListItem
                      key={vozilo.id}
                      vozilo={vozilo}
                      index={index}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto"
                >
                  {/* Empty State SVG Illustration */}
                  <svg
                    className="w-48 h-48 mx-auto mb-6"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Car body */}
                    <path
                      d="M30 120 L50 90 L150 90 L170 120 L170 140 L30 140 Z"
                      className="fill-muted stroke-muted-foreground/30"
                      strokeWidth="2"
                    />
                    {/* Car roof */}
                    <path
                      d="M60 90 L75 60 L125 60 L140 90"
                      className="fill-muted stroke-muted-foreground/30"
                      strokeWidth="2"
                    />
                    {/* Windows */}
                    <path
                      d="M65 88 L78 65 L98 65 L98 88 Z"
                      className="fill-background stroke-muted-foreground/20"
                      strokeWidth="1"
                    />
                    <path
                      d="M102 88 L102 65 L122 65 L135 88 Z"
                      className="fill-background stroke-muted-foreground/20"
                      strokeWidth="1"
                    />
                    {/* Wheels */}
                    <circle
                      cx="60"
                      cy="140"
                      r="18"
                      className="fill-muted-foreground/20"
                    />
                    <circle
                      cx="60"
                      cy="140"
                      r="10"
                      className="fill-background"
                    />
                    <circle
                      cx="140"
                      cy="140"
                      r="18"
                      className="fill-muted-foreground/20"
                    />
                    <circle
                      cx="140"
                      cy="140"
                      r="10"
                      className="fill-background"
                    />
                    {/* Magnifying glass */}
                    <circle
                      cx="155"
                      cy="55"
                      r="28"
                      className="fill-accent/10 stroke-accent/40"
                      strokeWidth="4"
                    />
                    <line
                      x1="175"
                      y1="75"
                      x2="195"
                      y2="95"
                      className="stroke-accent/40"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Question mark in magnifying glass */}
                    <text
                      x="155"
                      y="62"
                      textAnchor="middle"
                      className="fill-accent/60 text-2xl font-bold"
                      style={{ fontSize: "24px" }}
                    >
                      ?
                    </text>
                  </svg>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Nema vozila koja odgovaraju filterima
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Pokušajte promijeniti ili obrisati neke filtere kako biste
                    vidjeli više rezultata.
                  </p>
                  <Button
                    onClick={clearFilters}
                    variant="gradient"
                    size="lg"
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Obriši sve filtere
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
