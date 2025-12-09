"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info, Copy, Check } from "lucide-react";
import { formatCijena } from "@/lib/vozila";
import { toast } from "sonner";

interface KalkulatorFinanciranjaProps {
  cijenaVozila: number;
}

export default function KalkulatorFinanciranja({
  cijenaVozila,
}: KalkulatorFinanciranjaProps) {
  const [predujam, setPredujam] = useState(Math.round(cijenaVozila * 0.2));
  const [brojRata, setBrojRata] = useState(60);
  const [kamatnaStopa, setKamatnaStopa] = useState(6.9);
  const [copySuccess, setCopySuccess] = useState(false);

  // Helper function to calculate financing for any term
  const calculateForTerm = (term: number) => {
    const glavnica = cijenaVozila - predujam;
    const mjesecnaKamata = kamatnaStopa / 100 / 12;

    if (glavnica <= 0) {
      return { mjesecnaRata: 0, ukupnoZaPlacanje: 0, ukupnaKamata: 0 };
    }

    const rata =
      (glavnica * mjesecnaKamata * Math.pow(1 + mjesecnaKamata, term)) /
      (Math.pow(1 + mjesecnaKamata, term) - 1);

    const ukupno = rata * term + predujam;
    const kamata = ukupno - cijenaVozila;

    return {
      mjesecnaRata: rata,
      ukupnoZaPlacanje: ukupno,
      ukupnaKamata: kamata,
    };
  };

  const { mjesecnaRata, ukupnoZaPlacanje, ukupnaKamata } = useMemo(
    () => calculateForTerm(brojRata),
    [cijenaVozila, predujam, brojRata, kamatnaStopa]
  );

  // Comparison options
  const termOptions = [36, 60, 84];
  const comparisonCalculations = useMemo(
    () => termOptions.map((term) => ({ term, ...calculateForTerm(term) })),
    [cijenaVozila, predujam, kamatnaStopa]
  );

  // Copy calculation to clipboard
  const handleCopy = async () => {
    const summary = `Kalkulator financiranja\n\nCijena vozila: ${formatCijena(
      cijenaVozila
    )}\nPredujam: ${formatCijena(predujam)} (${Math.round(
      (predujam / cijenaVozila) * 100
    )}%)\nBroj rata: ${brojRata} mjeseci\nKamatna stopa: ${kamatnaStopa.toFixed(
      2
    )}%\n\nIznos kredita: ${formatCijena(
      cijenaVozila - predujam
    )}\nMjesečna rata: ${formatCijena(
      Math.round(mjesecnaRata)
    )}\nUkupna kamata: ${formatCijena(
      Math.round(ukupnaKamata)
    )}\nUkupno za platiti: ${formatCijena(Math.round(ukupnoZaPlacanje))}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      toast.success("Izračun kopiran!");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      toast.error("Greška pri kopiranju");
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="bg-accent/10 dark:bg-accent/20 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-accent">
          <Calculator className="w-5 h-5" />
          Kalkulator financiranja
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Predujam */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">
              Predujam (učešće)
            </label>
            <Input
              type="number"
              min={0}
              max={cijenaVozila}
              value={predujam}
              onChange={(e) =>
                setPredujam(
                  Math.max(
                    0,
                    Math.min(Number(e.target.value) || 0, cijenaVozila)
                  )
                )
              }
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[predujam]}
            onValueChange={(values) => setPredujam(values[0])}
            min={0}
            max={cijenaVozila}
            step={1000}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 €</span>
            <span>{Math.round((predujam / cijenaVozila) * 100)}%</span>
            <span>{formatCijena(cijenaVozila)}</span>
          </div>
        </div>

        {/* Broj rata */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">
              Broj rata
            </label>
            <Input
              type="number"
              min={12}
              max={84}
              value={brojRata}
              onChange={(e) =>
                setBrojRata(
                  Math.max(12, Math.min(Number(e.target.value) || 12, 84))
                )
              }
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[brojRata]}
            onValueChange={(values) => setBrojRata(values[0])}
            min={12}
            max={84}
            step={6}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>12 mj.</span>
            <span>84 mj.</span>
          </div>
        </div>

        {/* Kamatna stopa */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-foreground">
              Godišnja kamatna stopa
            </label>
            <Input
              type="number"
              min={3}
              max={15}
              step={0.1}
              value={kamatnaStopa}
              onChange={(e) =>
                setKamatnaStopa(
                  Math.max(3, Math.min(Number(e.target.value) || 3, 15))
                )
              }
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[kamatnaStopa]}
            onValueChange={(values) => setKamatnaStopa(values[0])}
            min={3}
            max={15}
            step={0.1}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Rezultati */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Iznos kredita:</span>
            <span className="font-medium">
              {formatCijena(cijenaVozila - predujam)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Ukupna kamata:</span>
            <span className="font-medium text-destructive">
              {formatCijena(Math.round(ukupnaKamata))}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Ukupno za platiti:</span>
            <span className="font-medium">
              {formatCijena(Math.round(ukupnoZaPlacanje))}
            </span>
          </div>

          {/* Mjesečna rata - istaknuto */}
          <motion.div
            key={mjesecnaRata}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="bg-accent/10 rounded-xl p-4 text-center mt-4"
          >
            <p className="text-sm text-muted-foreground mb-1">Mjesečna rata</p>
            <p className="text-3xl font-bold text-accent">
              {formatCijena(Math.round(mjesecnaRata))}
            </p>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Usporedba opcija financiranja
          </h4>
          <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3">
            {comparisonCalculations.map(({ term, mjesecnaRata: rata }) => (
              <div
                key={term}
                className={`p-3 rounded-lg border transition-all ${
                  term === brojRata
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <p className="text-xs text-muted-foreground mb-1">
                  {term} mjeseci
                </p>
                <p className="text-lg font-bold text-accent">
                  {formatCijena(Math.round(rata))}
                </p>
                <p className="text-xs text-muted-foreground">mjesečno</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copy Button */}
        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full"
          disabled={copySuccess}
        >
          {copySuccess ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Kopirano!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Kopiraj izračun
            </>
          )}
        </Button>

        {/* Info */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Ovo je informativni izračun. Stvarni uvjeti financiranja mogu se
            razlikovati ovisno o banci i vašoj kreditnoj sposobnosti.
            Kontaktirajte nas za preciznu ponudu.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
