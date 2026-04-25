import { groq } from "next-sanity";
import { fallbackHomepage } from "@/lib/fallback-content";
import { TOUR_CATALOG_FALLBACK } from "@/lib/tour-catalog";
import type { Locale } from "@/lib/i18n";
import { getSanityClient } from "@/lib/sanity/client";
import type {
  LocalizedRichText,
  LocalizedString,
  LocalizedStringList,
  TourPackageAccommodation,
  TourPackageCard,
  TourPackageDetail,
  TourPackagePanelItem,
  TourPackagePlace,
  TourPackageSection
} from "@/lib/types";

type SanityLocalizedValue = {
  en?: string | null;
  ru?: string | null;
};

type SanityLocalizedList = {
  en?: string[] | null;
  ru?: string[] | null;
};

type SanityCoverImage = {
  url?: string | null;
  fallbackSrc?: string | null;
  alt?: SanityLocalizedValue | null;
};

type SanityPanelItem = {
  title?: SanityLocalizedValue | null;
  description?: SanityLocalizedValue | null;
  image?: SanityCoverImage | null;
};

type SanityTourPackageSection =
  | {
      _type: "placesSection";
      title?: SanityLocalizedValue | null;
      items?: Array<{
        place?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
        image?: SanityCoverImage | null;
      }> | null;
    }
  | {
      _type: "accommodationSection";
      title?: SanityLocalizedValue | null;
      items?: Array<{
        hotel?: SanityLocalizedValue | null;
        description?: SanityLocalizedValue | null;
        image?: SanityCoverImage | null;
      }> | null;
    }
  | {
      _type: "richTextSection";
      title?: SanityLocalizedValue | null;
      body?: SanityLocalizedValue | null;
    }
  | {
      _type: "highlightsSection" | "includesSection" | "excludesSection" | "idealForSection";
      title?: SanityLocalizedValue | null;
      items?: SanityPanelItem[] | null;
    };

type SanityTourPackageDocument = {
  slug?: string | null;
  title?: SanityLocalizedValue | null;
  summary?: SanityLocalizedValue | null;
  duration?: SanityLocalizedValue | null;
  durationDays?: number | null;
  category?: TourPackageDetail["category"] | null;
  difficulty?: TourPackageDetail["difficulty"] | null;
  location?: SanityLocalizedValue | null;
  bestTime?: SanityLocalizedValue | null;
  languages?: SanityLocalizedValue[] | null;
  badge?: SanityLocalizedValue | null;
  priceLabel?: SanityLocalizedValue | null;
  coverImage?: SanityCoverImage | null;
  featured?: boolean | null;
  sortOrder?: number | null;
  publishReady?: boolean | null;
  seoTitle?: SanityLocalizedValue | null;
  seoDescription?: SanityLocalizedValue | null;
  seoKeywords?: SanityLocalizedList | null;
  sections?: SanityTourPackageSection[] | null;
};

const LIST_QUERY = groq`
  *[_type == "tourPackage"] | order(coalesce(sortOrder, 999) asc, title.en asc) {
    "slug": slug.current,
    title,
    summary,
    duration,
    durationDays,
    category,
    difficulty,
    location,
    bestTime,
    languages,
    badge,
    priceLabel,
    featured,
    sortOrder,
    publishReady,
    coverImage {
      fallbackSrc,
      alt,
      "url": image.asset->url
    }
  }
`;

const DETAIL_QUERY = groq`
  *[_type == "tourPackage" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    summary,
    duration,
    durationDays,
    category,
    difficulty,
    location,
    bestTime,
    languages,
    badge,
    priceLabel,
    featured,
    sortOrder,
    publishReady,
    seoTitle,
    seoDescription,
    seoKeywords,
    coverImage {
      fallbackSrc,
      alt,
      "url": image.asset->url
    },
    sections[] {
      _type,
      title,
      body,
      items[] {
        title,
        description,
        hotel,
        place,
        image {
          fallbackSrc,
          alt,
          "url": image.asset->url
        }
      }
    }
  }
`;

const COUNT_QUERY = groq`
  count(*[_type == "tourPackage"])
`;

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const junkContentPattern = /\b(test(?:ing)?|yahya|pecheg|russion)\b/i;

function isNonEmptyText(value?: string | null) {
  return Boolean(value?.trim());
}

function hasDistinctRussianCopy(value?: LocalizedString) {
  if (!value) {
    return false;
  }

  return isNonEmptyText(value.ru) && value.ru.trim() !== value.en.trim();
}

function containsJunkContent(values: Array<string | undefined>) {
  return values.some((value) => value && junkContentPattern.test(value));
}

function hasMeaningfulImageAlt(image?: TourPackageDetail["image"]) {
  return Boolean(image?.alt.en.trim() && image.alt.ru.trim() && image.alt.en.trim().length >= 5);
}

function isPublishReadyPackage(item: TourPackageDetail, explicitPublishReady?: boolean | null) {
  const searchableStrings = [
    item.slug,
    item.title.en,
    item.title.ru,
    item.summary.en,
    item.summary.ru,
    item.location?.en,
    item.location?.ru,
    item.image.alt.en,
    item.image.alt.ru
  ];

  if (!slugPattern.test(item.slug)) {
    return false;
  }

  if (!isNonEmptyText(item.title.en) || !isNonEmptyText(item.summary.en) || !hasMeaningfulImageAlt(item.image)) {
    return false;
  }

  if (containsJunkContent(searchableStrings)) {
    return false;
  }

  if (item.durationDays && item.durationDays > 1 && item.category && item.category !== "multiday") {
    return false;
  }

  if (item.durationDays === 1 && item.category === "multiday") {
    return false;
  }

  return explicitPublishReady !== false;
}

function isLocalizedForLocale(item: TourPackageDetail, locale: Locale) {
  if (locale === "en") {
    return true;
  }

  return (
    hasDistinctRussianCopy(item.title) &&
    hasDistinctRussianCopy(item.summary) &&
    hasDistinctRussianCopy(item.duration) &&
    Boolean(item.location ? hasDistinctRussianCopy(item.location) : true)
  );
}

function toLocalizedString(
  value: SanityLocalizedValue | null | undefined,
  fallback?: LocalizedString
): LocalizedString {
  return {
    en: value?.en?.trim() || fallback?.en || "",
    ru: value?.ru?.trim() || fallback?.ru || ""
  };
}

function toLocalizedStringList(
  value: SanityLocalizedList | null | undefined,
  fallback?: LocalizedStringList
): LocalizedStringList {
  return {
    en: (value?.en || fallback?.en || []).filter(Boolean),
    ru: (value?.ru || fallback?.ru || []).filter(Boolean)
  };
}

function toLocalizedRichText(
  value: SanityLocalizedValue | null | undefined,
  fallback?: LocalizedRichText
): LocalizedRichText {
  const splitParagraphs = (input?: string | null) =>
    (input || "")
      .split(/\r?\n\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

  const en = splitParagraphs(value?.en);
  const ru = splitParagraphs(value?.ru);

  return {
    en: en.length ? en : fallback?.en || [],
    ru: ru.length ? ru : fallback?.ru || []
  };
}

function toImage(
  value: SanityCoverImage | null | undefined,
  fallback?: TourPackageDetail["image"]
) {
  return {
    src: value?.url || value?.fallbackSrc || fallback?.src || "/hero.png",
    alt: toLocalizedString(value?.alt, fallback?.alt)
  };
}

function mapPanelItem(
  item: SanityPanelItem,
  fallback?: TourPackagePanelItem
): TourPackagePanelItem | null {
  if (!item.title && !fallback?.title) {
    return null;
  }

  return {
    title: toLocalizedString(item.title, fallback?.title),
    description: item.description
      ? toLocalizedRichText(item.description, fallback?.description)
      : fallback?.description,
    image: item.image ? toImage(item.image, fallback?.image as TourPackageDetail["image"]) : fallback?.image
  };
}

function mapSanitySection(
  section: SanityTourPackageSection,
  fallback?: TourPackageSection
): TourPackageSection | null {
  if (section._type === "placesSection") {
    const items = (section.items || []).reduce<TourPackagePlace[]>((acc, item, index) => {
      const fallbackItem =
        fallback?._type === "placesSection" ? fallback.items[index] : undefined;

      if (!item?.place && !fallbackItem?.place) {
        return acc;
      }

      acc.push({
        place: toLocalizedString(item.place, fallbackItem?.place),
        description: item.description
          ? toLocalizedRichText(item.description, fallbackItem?.description)
          : fallbackItem?.description,
        image: item.image ? toImage(item.image, fallbackItem?.image as TourPackageDetail["image"]) : fallbackItem?.image
      });

      return acc;
    }, []);

    return {
      _type: "placesSection",
      title:
        section.title || (fallback?._type === "placesSection" && fallback.title)
          ? toLocalizedString(
              section.title,
              fallback?._type === "placesSection" ? fallback.title : undefined
            )
          : undefined,
      items
    };
  }

  if (section._type === "accommodationSection") {
    const items = (section.items || []).reduce<TourPackageAccommodation[]>((acc, item, index) => {
      const fallbackItem =
        fallback?._type === "accommodationSection" ? fallback.items[index] : undefined;

      const hotelValue = "hotel" in item ? item.hotel : undefined;

      if (!hotelValue && !fallbackItem?.hotel) {
        return acc;
      }

      acc.push({
        hotel: toLocalizedString(hotelValue, fallbackItem?.hotel),
        description: item.description
          ? toLocalizedRichText(item.description, fallbackItem?.description)
          : fallbackItem?.description,
        image: item.image ? toImage(item.image, fallbackItem?.image as TourPackageDetail["image"]) : fallbackItem?.image
      });

      return acc;
    }, []);

    return {
      _type: "accommodationSection",
      title:
        section.title || (fallback?._type === "accommodationSection" && fallback.title)
          ? toLocalizedString(
              section.title,
              fallback?._type === "accommodationSection" ? fallback.title : undefined
            )
          : undefined,
      items
    };
  }

  if (section._type === "richTextSection") {
    return {
      _type: "richTextSection",
      title:
        section.title || (fallback?._type === "richTextSection" && fallback.title)
          ? toLocalizedString(
              section.title,
              fallback?._type === "richTextSection" ? fallback.title : undefined
            )
          : undefined,
      body: toLocalizedRichText(
        section.body,
        fallback?._type === "richTextSection" ? fallback.body : undefined
      )
    };
  }

  const items = (section.items || []).reduce<TourPackagePanelItem[]>((acc, item, index) => {
    const fallbackItem =
      fallback &&
      (fallback._type === section._type) &&
      "items" in fallback
        ? fallback.items[index]
        : undefined;

    const mapped = mapPanelItem(item, fallbackItem);

    if (mapped) {
      acc.push(mapped);
    }

    return acc;
  }, []);

  return {
    _type: section._type,
    title: toLocalizedString(
      section.title,
      fallback &&
        fallback._type === section._type &&
        "title" in fallback
        ? fallback.title
        : undefined
    ),
    items
  };
}

function mapSanityPackage(
  item: SanityTourPackageDocument,
  fallback?: TourPackageDetail
): TourPackageDetail | null {
  if (!item.slug) {
    return fallback || null;
  }

  const fallbackSections = fallback?.sections || [];
  const sections = (item.sections || [])
    .map((section, index) => mapSanitySection(section, fallbackSections[index]))
    .filter((section): section is TourPackageSection => Boolean(section));

  return {
    slug: item.slug,
    title: toLocalizedString(item.title, fallback?.title),
    summary: toLocalizedString(item.summary, fallback?.summary),
    duration: toLocalizedString(item.duration, fallback?.duration),
    durationDays: item.durationDays ?? fallback?.durationDays,
    category: item.category ?? fallback?.category,
    difficulty: item.difficulty ?? fallback?.difficulty,
    location: item.location ? toLocalizedString(item.location, fallback?.location) : fallback?.location,
    bestTime: item.bestTime ? toLocalizedString(item.bestTime, fallback?.bestTime) : fallback?.bestTime,
    languages: (item.languages || fallback?.languages || []).map((language, index) =>
      toLocalizedString(language, fallback?.languages?.[index])
    ),
    badge: item.badge ? toLocalizedString(item.badge, fallback?.badge) : fallback?.badge,
    image: toImage(item.coverImage, fallback?.image),
    priceLabel: item.priceLabel
      ? toLocalizedString(item.priceLabel, fallback?.priceLabel)
      : fallback?.priceLabel,
    featured: item.featured ?? fallback?.featured ?? false,
    sortOrder: item.sortOrder ?? fallback?.sortOrder,
    sections: sections.length ? sections : fallback?.sections || [],
    seoTitle: item.seoTitle ? toLocalizedString(item.seoTitle, fallback?.seoTitle) : fallback?.seoTitle,
    seoDescription: item.seoDescription
      ? toLocalizedRichText(item.seoDescription, fallback?.seoDescription)
      : fallback?.seoDescription,
    seoKeywords: item.seoKeywords
      ? toLocalizedStringList(item.seoKeywords, fallback?.seoKeywords)
      : fallback?.seoKeywords
  };
}

function toCard(item: TourPackageDetail): TourPackageCard {
  return {
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    duration: item.duration,
    durationDays: item.durationDays,
    category: item.category,
    difficulty: item.difficulty,
    location: item.location,
    bestTime: item.bestTime,
    languages: item.languages,
    badge: item.badge,
    image: item.image,
    priceLabel: item.priceLabel,
    featured: item.featured,
    sortOrder: item.sortOrder
  };
}

function getVisiblePackage(
  item: TourPackageDetail | null,
  locale: Locale,
  explicitPublishReady?: boolean | null
) {
  if (!item) {
    return null;
  }

  if (!isPublishReadyPackage(item, explicitPublishReady) || !isLocalizedForLocale(item, locale)) {
    return null;
  }

  return item;
}

export function getTourPackagesSectionCopy() {
  return fallbackHomepage.tourPackages;
}

export function getTourPackageFallbackDetails() {
  return TOUR_CATALOG_FALLBACK;
}

export async function getTourPackages(locale: Locale = "en"): Promise<TourPackageCard[]> {
  const fallback = getTourPackageFallbackDetails();
  const client = getSanityClient();

  if (!client) {
    return fallback
      .map((item) => getVisiblePackage(item, locale))
      .filter((item): item is TourPackageDetail => Boolean(item))
      .map(toCard);
  }

  try {
    const items = await client.fetch<SanityTourPackageDocument[]>(LIST_QUERY);

    if (!items.length) {
      return fallback
        .map((item) => getVisiblePackage(item, locale))
        .filter((item): item is TourPackageDetail => Boolean(item))
        .map(toCard);
    }

    return items
      .map((item) => getVisiblePackage(mapSanityPackage(item), locale, item.publishReady))
      .filter((item): item is TourPackageDetail => Boolean(item))
      .map(toCard);
  } catch {
    return fallback
      .map((item) => getVisiblePackage(item, locale))
      .filter((item): item is TourPackageDetail => Boolean(item))
      .map(toCard);
  }
}

export async function getFeaturedTourPackages(limit = 3, locale: Locale = "en"): Promise<TourPackageCard[]> {
  const items = await getTourPackages(locale);
  const featured = items.filter((item) => item.featured);
  return (featured.length ? featured : items).slice(0, limit);
}

export async function getTourPackageBySlug(
  slug: string,
  locale: Locale = "en"
): Promise<TourPackageDetail | null> {
  const fallback = getTourPackageFallbackDetails().find((item) => item.slug === slug) || null;
  const client = getSanityClient();

  if (!client) {
    return getVisiblePackage(fallback, locale);
  }

  try {
    const item = await client.fetch<SanityTourPackageDocument | null>(DETAIL_QUERY, { slug });

    if (item) {
      return getVisiblePackage(mapSanityPackage(item), locale, item.publishReady);
    }

    const count = await client.fetch<number>(COUNT_QUERY);
    return count === 0 ? getVisiblePackage(fallback, locale) : null;
  } catch {
    return getVisiblePackage(fallback, locale);
  }
}

export async function getAllTourPackageSlugs(locale: Locale = "en"): Promise<string[]> {
  const fallback = getTourPackageFallbackDetails()
    .map((item) => getVisiblePackage(item, locale))
    .filter((item): item is TourPackageDetail => Boolean(item))
    .map((item) => item.slug);
  const client = getSanityClient();

  if (!client) {
    return fallback;
  }

  try {
    const items = await client.fetch<SanityTourPackageDocument[]>(LIST_QUERY);
    const slugs = items
      .map((item) => getVisiblePackage(mapSanityPackage(item), locale, item.publishReady))
      .filter((item): item is TourPackageDetail => Boolean(item))
      .map((item) => item.slug);
    return slugs.length ? slugs : fallback;
  } catch {
    return fallback;
  }
}

export function pickLocalizedParagraphs(
  value: LocalizedRichText | undefined,
  locale: Locale,
  fallback?: string
) {
  const paragraphs = value?.[locale] || value?.[locale === "en" ? "ru" : "en"] || [];
  return paragraphs.length ? paragraphs : fallback ? [fallback] : [];
}
