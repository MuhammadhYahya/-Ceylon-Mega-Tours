export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "en" ? "ru" : "en";
}
