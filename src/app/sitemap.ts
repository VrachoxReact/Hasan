import { MetadataRoute } from "next";
import { getVozila } from "@/lib/vozila";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://produktauto.hr";
  const vozila = getVozila();

  // Generate vehicle URLs
  const vehicleUrls = vozila.map((vozilo) => ({
    url: `${baseUrl}/vozila/${vozilo.id}`,
    lastModified: new Date(vozilo.datumObjave),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/vozila`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/usporedi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/favoriti`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/o-nama`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...vehicleUrls,
  ];
}
