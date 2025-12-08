import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uvjeti korištenja | Produkt Auto",
  description:
    "Pravila i uvjeti korištenja web stranice i usluga Produkt Auto. Pročitajte prije korištenja naših usluga.",
  openGraph: {
    title: "Uvjeti korištenja | Produkt Auto",
    description:
      "Pravila i uvjeti korištenja web stranice i usluga Produkt Auto.",
  },
};

export default function UvjetiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
