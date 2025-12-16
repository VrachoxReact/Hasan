import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getVozila } from "@/lib/vozila";
import VozilaClient from "./VozilaClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

const vehiclesAlternates = {
  hr: "/vozila",
  en: "/en/vozila",
  de: "/de/vozila",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "vehicles" });
  const title = t("pageTitle");
  const description = t("pageDescription");

  return {
    title,
    description,
    alternates: {
      canonical:
        vehiclesAlternates[locale as keyof typeof vehiclesAlternates] ||
        vehiclesAlternates.hr,
      languages: vehiclesAlternates,
    },
    openGraph: {
      title,
      description,
    },
  };
}

// Static data; rebuild when content changes
export const revalidate = 3600;

export default function VozilaPage() {
  const allVozila = getVozila();
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <VozilaClient initialVozila={allVozila} />
    </Suspense>
  );
}
