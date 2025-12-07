import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usporedi vozila",
  description:
    "Usporedite do 3 vozila istovremeno. Pregledajte specifikacije, opremu i cijene jedan pored drugog.",
  openGraph: {
    title: "Usporedi vozila | Produkt Auto",
    description:
      "Usporedite do 3 vozila istovremeno i pronađite savršen izbor.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Usporedi vozila | Produkt Auto",
    description: "Usporedite do 3 vozila istovremeno - specifikacije i cijene.",
  },
};

export default function UsporediLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
