import type { Locale } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/types";

export function pickLocaleText(value: LocalizedString, locale: Locale) {
  const primary = value[locale]?.trim();
  const fallback = value[locale === "en" ? "ru" : "en"]?.trim();
  return primary || fallback || "";
}
