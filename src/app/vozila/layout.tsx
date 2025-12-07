import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sva vozila",
  description:
    "Pregledajte našu ponudu kvalitetnih rabljenih vozila. BMW, Mercedes-Benz, Audi, Volkswagen i druge premium marke s jamstvom kvalitete.",
  keywords: [
    "rabljena vozila",
    "automobili na prodaju",
    "bmw rabljena",
    "mercedes rabljena",
    "audi rabljena",
    "volkswagen rabljena",
    "kvalitetna vozila",
  ],
  openGraph: {
    title: "Sva vozila | Produkt Auto",
    description:
      "Pregledajte našu ponudu kvalitetnih rabljenih vozila. Premium marke s jamstvom kvalitete.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sva vozila | Produkt Auto",
    description:
      "Pregledajte našu ponudu kvalitetnih rabljenih vozila. Premium marke.",
  },
};

export default function VozilaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
