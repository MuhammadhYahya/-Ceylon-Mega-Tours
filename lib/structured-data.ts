import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { buildAbsoluteUrl, getLocalizedPath, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { TourPackageDetail } from "@/lib/types";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createLocalBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: buildAbsoluteUrl(getLocalizedPath(locale)),
    email: CONTACT_EMAIL,
    telephone: WHATSAPP_DISPLAY,
    sameAs: [WHATSAPP_URL],
    areaServed: "Sri Lanka",
    availableLanguage: locale === "en" ? ["English", "Russian"] : ["Русский", "English"]
  };
}

export function createBreadcrumbJsonLd(locale: Locale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(getLocalizedPath(locale, item.path))
    }))
  };
}

export function createTourPackageJsonLd(locale: Locale, tourPackage: TourPackageDetail) {
  const title = pickLocaleText(tourPackage.title, locale);
  const description = pickLocaleText(tourPackage.summary, locale);
  const packageUrl = buildAbsoluteUrl(getLocalizedPath(locale, `/tour-packages/${tourPackage.slug}`));

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description,
    url: packageUrl,
    image: buildAbsoluteUrl(tourPackage.image.src),
    touristType: tourPackage.badge ? pickLocaleText(tourPackage.badge, locale) : undefined,
    itinerary: tourPackage.sections
      .filter((section) => section._type === "placesSection")
      .flatMap((section) =>
        section.items.map((item) => ({
          "@type": "TouristDestination",
          name: pickLocaleText(item.place, locale),
          description: item.description?.[locale]?.join(" ")
        }))
      ),
    offers: {
      "@type": "Offer",
      url: packageUrl,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: tourPackage.priceLabel
          ? pickLocaleText(tourPackage.priceLabel, locale)
          : locale === "en"
            ? "Price on request"
            : "Цена по запросу"
      }
    },
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: buildAbsoluteUrl(getLocalizedPath(locale))
    }
  };
}
