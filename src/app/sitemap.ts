import { MetadataRoute } from "next";
import { getVozila } from "@/lib/vozila";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      "https://produktauto.hr")?.replace(/\/$/, "") || "https://produktauto.hr";
  const vozila = getVozila();

  const getLocalePrefix = (locale: string) => {
    if (routing.localePrefix === "as-needed" && locale === routing.defaultLocale)
      return "";
    return `/${locale}`;
  };

  const withLocale = (locale: string, pathname: string) =>
    `${baseUrl}${getLocalePrefix(locale)}${pathname}`;

  const alternatesFor = (pathname: string) => ({
    languages: {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, withLocale(locale, pathname)])
      ),
      "x-default": withLocale(routing.defaultLocale, pathname),
    },
  });

  const staticRoutes = [
    { pathname: "", changeFrequency: "daily" as const, priority: 1 },
    { pathname: "/vozila", changeFrequency: "daily" as const, priority: 0.9 },
    { pathname: "/usporedi", changeFrequency: "weekly" as const, priority: 0.5 },
    { pathname: "/favoriti", changeFrequency: "weekly" as const, priority: 0.5 },
    { pathname: "/o-nama", changeFrequency: "monthly" as const, priority: 0.7 },
    { pathname: "/kontakt", changeFrequency: "monthly" as const, priority: 0.8 },
    {
      pathname: "/privatnost",
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    { pathname: "/uvjeti", changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map(
    ({ pathname, changeFrequency, priority }) => ({
      url: withLocale(routing.defaultLocale, pathname),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: alternatesFor(pathname),
    })
  );

  const vehicleUrls: MetadataRoute.Sitemap = vozila.map((vozilo) => {
    const pathname = `/vozila/${vozilo.id}`;
    return {
      url: withLocale(routing.defaultLocale, pathname),
      lastModified: new Date(vozilo.datumObjave),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: alternatesFor(pathname),
      images: vozilo.slike?.[0] ? [vozilo.slike[0]] : undefined,
    };
  });

  return [...staticUrls, ...vehicleUrls];
}
