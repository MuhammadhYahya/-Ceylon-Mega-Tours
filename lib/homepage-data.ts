import { fallbackHomepage } from "@/lib/fallback-content";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";

export async function getHomepageData(locale: Locale): Promise<HomepageData> {
  void locale;
  return fallbackHomepage;
}
