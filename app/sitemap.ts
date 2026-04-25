import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { buildAbsoluteUrl, getLocalizedPath } from "@/lib/site";
import { getAllTourPackageSlugs } from "@/lib/tour-packages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/destinations", "/tour-packages"];

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((pathname) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, pathname)),
      lastModified: new Date(),
      changeFrequency: pathname ? ("weekly" as const) : ("daily" as const),
      priority: pathname ? 0.8 : 1
    }))
  );

  const localizedPackageSlugs = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      slugs: await getAllTourPackageSlugs(locale)
    }))
  );

  const packageEntries = localizedPackageSlugs.flatMap(({ locale, slugs }) =>
    slugs.map((slug) => ({
      url: buildAbsoluteUrl(getLocalizedPath(locale, `/tour-packages/${slug}`)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  );

  return [...staticEntries, ...packageEntries];
}
