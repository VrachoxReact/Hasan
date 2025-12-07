import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Upoznajte Produkt Auto - više od 10 godina iskustva u prodaji kvalitetnih rabljenih vozila. Naša misija, vrijednosti i priča o uspjehu.",
  keywords: [
    "o produkt auto",
    "povijest produkt auto",
    "auto salon zagreb povijest",
    "pouzdani prodavač automobila",
    "iskustvo prodaja vozila",
  ],
  openGraph: {
    title: "O nama | Produkt Auto",
    description:
      "Više od 10 godina iskustva u prodaji kvalitetnih rabljenih vozila.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "O nama | Produkt Auto",
    description:
      "Više od 10 godina iskustva u prodaji kvalitetnih rabljenih vozila.",
  },
};

export default function ONamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
