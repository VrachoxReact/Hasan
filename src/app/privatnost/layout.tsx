import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika privatnosti | Produkt Auto",
  description:
    "Saznajte kako Produkt Auto prikuplja, koristi i štiti vaše osobne podatke. Vaša privatnost nam je izuzetno važna.",
  openGraph: {
    title: "Politika privatnosti | Produkt Auto",
    description:
      "Saznajte kako Produkt Auto prikuplja, koristi i štiti vaše osobne podatke.",
  },
};

export default function PrivatnostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
