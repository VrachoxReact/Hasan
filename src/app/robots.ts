import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      "https://produktauto.hr")?.replace(/\/$/, "") || "https://produktauto.hr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
