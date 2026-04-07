import { groq } from "next-sanity";
import { fallbackHomepage } from "@/lib/fallback-content";
import type { Locale } from "@/lib/i18n";
import { getSanityClient } from "@/lib/sanity/client";
import type {
  LocalizedRichText,
  LocalizedString,
  TourPackageCard,
  TourPackageAccommodation,
  TourPackageDetail,
  TourPackagePlace,
  TourPackageSection,
} from "@/lib/types";

type SanityLocalizedValue = {
  en?: string | null;
  ru?: string | null;
};

type SanityCoverImage = {
  url?: string | null;
  fallbackSrc?: string | null;
  alt?: SanityLocalizedValue | null;
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
    };

type SanityTourPackageDocument = {
  slug?: string | null;
  title?: SanityLocalizedValue | null;
  summary?: SanityLocalizedValue | null;
  duration?: SanityLocalizedValue | null;
  priceLabel?: SanityLocalizedValue | null;
  coverImage?: SanityCoverImage | null;
  featured?: boolean | null;
  sortOrder?: number | null;
  seoTitle?: SanityLocalizedValue | null;
  seoDescription?: SanityLocalizedValue | null;
  sections?: SanityTourPackageSection[] | null;
};

const LIST_QUERY = groq`
  *[_type == "tourPackage"] | order(coalesce(sortOrder, 999) asc, title.en asc) {
    "slug": slug.current,
    title,
    summary,
    duration,
    priceLabel,
    featured,
    sortOrder,
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
    priceLabel,
    featured,
    sortOrder,
    seoTitle,
    seoDescription,
    coverImage {
      fallbackSrc,
      alt,
      "url": image.asset->url
    },
    sections[] {
      _type,
      title,
      "items": select(
        _type == "placesSection" => items[]{
          place,
          description,
          image {
            fallbackSrc,
            alt,
            "url": image.asset->url
          }
        },
        _type == "accommodationSection" => items[]{
          hotel,
          description,
          image {
            fallbackSrc,
            alt,
            "url": image.asset->url
          }
        },
        items
      )
    }
  }
`;

const SLUGS_QUERY = groq`
  *[_type == "tourPackage" && defined(slug.current)] | order(coalesce(sortOrder, 999) asc) {
    "slug": slug.current
  }
`;

function toLocalizedString(
  value: SanityLocalizedValue | null | undefined,
  fallback?: LocalizedString
): LocalizedString {
  return {
    en: value?.en?.trim() || fallback?.en || "",
    ru: value?.ru?.trim() || fallback?.ru || ""
  };
}

function toLocalizedRichText(value: SanityLocalizedValue | null | undefined): LocalizedRichText {
  const splitParagraphs = (input?: string | null) =>
    (input || "")
      .split(/\r?\n\r?\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

  return {
    en: splitParagraphs(value?.en),
    ru: splitParagraphs(value?.ru)
  };
}

function toImage(
  value: SanityCoverImage | null | undefined,
  fallback?: { src: string; alt: LocalizedString }
) {
  return {
    src: value?.url || value?.fallbackSrc || fallback?.src || "/hero.png",
    alt: toLocalizedString(value?.alt, fallback?.alt)
  };
}

function mapFallbackPackage(
  item: (typeof fallbackHomepage.tourPackages.items)[number],
  index: number
): TourPackageDetail {
  const sections: TourPackageSection[] = [];

  if (item.highlights?.length) {
    sections.push({
      _type: "placesSection",
      title: {
        en: "Places you'll visit",
        ru: "Mesta, kotorye vy posetite"
      },
      items: item.highlights.map((highlight) => ({
        place: highlight
      }))
    });
  }

  return {
    slug: item.id,
    title: item.title,
    summary: item.description,
    duration: item.duration,
    priceLabel: item.price,
    image: item.image,
    featured: index < 3,
    sortOrder: index,
    sections
  };
}

function mapSanitySection(section: SanityTourPackageSection): TourPackageSection | null {
  if (section._type === "placesSection") {
    const items = (section.items || []).reduce<TourPackagePlace[]>((acc, item) => {
      if (!item?.place) {
        return acc;
      }

      acc.push({
        place: toLocalizedString(item.place),
        description: item.description ? toLocalizedRichText(item.description) : undefined,
        image: item.image ? toImage(item.image) : undefined
      });

      return acc;
    }, []);

    return {
      _type: "placesSection",
      title: section.title ? toLocalizedString(section.title) : undefined,
      items
    };
  }

  if (section._type === "accommodationSection") {
    const items = (section.items || []).reduce<TourPackageAccommodation[]>((acc, item) => {
      if (!item?.hotel) {
        return acc;
      }

      acc.push({
        hotel: toLocalizedString(item.hotel),
        description: item.description ? toLocalizedRichText(item.description) : undefined,
        image: item.image ? toImage(item.image) : undefined
      });

      return acc;
    }, []);

    return {
      _type: "accommodationSection",
      title: section.title ? toLocalizedString(section.title) : undefined,
      items
    };
  }

  return null;
}

function mapSanityPackage(
  item: SanityTourPackageDocument,
  fallback?: TourPackageDetail
): TourPackageDetail | null {
  if (!item.slug) {
    return fallback || null;
  }

  const sections = (item.sections || [])
    .map(mapSanitySection)
    .filter((section): section is TourPackageSection => Boolean(section));

  return {
    slug: item.slug,
    title: toLocalizedString(item.title, fallback?.title),
    summary: toLocalizedString(item.summary, fallback?.summary),
    duration: toLocalizedString(item.duration, fallback?.duration),
    priceLabel: item.priceLabel
      ? toLocalizedString(item.priceLabel, fallback?.priceLabel)
      : fallback?.priceLabel,
    image: toImage(item.coverImage, fallback?.image),
    featured: item.featured ?? fallback?.featured ?? true,
    sortOrder: item.sortOrder ?? fallback?.sortOrder,
    sections: sections.length ? sections : fallback?.sections || [],
    seoTitle: item.seoTitle ? toLocalizedString(item.seoTitle) : undefined,
    seoDescription: item.seoDescription ? toLocalizedRichText(item.seoDescription) : undefined
  };
}

function getFallbackTourPackageDetails() {
  return fallbackHomepage.tourPackages.items.map(mapFallbackPackage);
}

function toCard(item: TourPackageDetail): TourPackageCard {
  return {
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    duration: item.duration,
    image: item.image,
    priceLabel: item.priceLabel,
    featured: item.featured,
    sortOrder: item.sortOrder
  };
}

export function getTourPackagesSectionCopy() {
  return fallbackHomepage.tourPackages;
}

export async function getTourPackages(): Promise<TourPackageCard[]> {
  const fallback = getFallbackTourPackageDetails();
  const client = getSanityClient();

  if (!client) {
    return fallback.map(toCard);
  }

  try {
    const items = await client.fetch<SanityTourPackageDocument[]>(LIST_QUERY);

    if (!items.length) {
      return fallback.map(toCard);
    }

    return items
      .map((item) =>
        mapSanityPackage(item, fallback.find((fallbackItem) => fallbackItem.slug === item.slug))
      )
      .filter((item): item is TourPackageDetail => Boolean(item))
      .map(toCard);
  } catch {
    return fallback.map(toCard);
  }
}

export async function getFeaturedTourPackages(limit = 3): Promise<TourPackageCard[]> {
  const items = await getTourPackages();
  const featured = items.filter((item) => item.featured);
  return (featured.length ? featured : items).slice(0, limit);
}

export async function getTourPackageBySlug(slug: string): Promise<TourPackageDetail | null> {
  const fallback = getFallbackTourPackageDetails().find((item) => item.slug === slug) || null;
  const client = getSanityClient();

  if (!client) {
    return fallback;
  }

  try {
    const item = await client.fetch<SanityTourPackageDocument | null>(DETAIL_QUERY, { slug });

    if (!item) {
      return fallback;
    }

    return mapSanityPackage(item, fallback || undefined);
  } catch {
    return fallback;
  }
}

export async function getAllTourPackageSlugs(): Promise<string[]> {
  const fallback = getFallbackTourPackageDetails().map((item) => item.slug);
  const client = getSanityClient();

  if (!client) {
    return fallback;
  }

  try {
    const items = await client.fetch<Array<{ slug?: string | null }>>(SLUGS_QUERY);
    const slugs = items.map((item) => item.slug).filter((slug): slug is string => Boolean(slug));
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
