import type { Locale } from "@/lib/i18n";
import type { LocalizedString } from "@/lib/types";

export function pickLocaleText(value: LocalizedString, locale: Locale) {
  return value[locale];
}
