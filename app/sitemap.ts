import type { MetadataRoute } from "next";
import { fallbackHomepage } from "@/lib/fallback-content";
import { locales } from "@/lib/i18n";
import { buildAbsoluteUrl, getLocalizedPath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/destinations", "/tour-packages"];

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((pathname) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, pathname)),
      lastModified: new Date(),
      changeFrequency: pathname ? ("weekly" as const) : ("daily" as const),
      priority: pathname ? 0.8 : 1
    }))
  );

  const packageEntries = locales.flatMap((locale) =>
    fallbackHomepage.tourPackages.items.map((item) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, `/tour-packages/${item.id}`)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  );

  return [...staticEntries, ...packageEntries];
}
