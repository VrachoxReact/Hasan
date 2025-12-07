import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Produkt Auto za sve informacije o vozilima. Posjetite nas u Zagrebu ili nas nazovite. Radno vrijeme: Pon-Pet 08-18h, Sub 09-14h.",
  keywords: [
    "kontakt produkt auto",
    "auto salon zagreb",
    "ulica grada vukovara",
    "kontakt broj",
    "radno vrijeme",
  ],
  openGraph: {
    title: "Kontakt | Produkt Auto",
    description:
      "Kontaktirajte nas za sve informacije o vozilima. Zagreb, Ulica grada Vukovara 271.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kontakt | Produkt Auto",
    description:
      "Kontaktirajte nas za sve informacije o vozilima. Zagreb, Hrvatska.",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
