import { fallbackHomepage } from "@/lib/fallback-content";
import { sanityClient } from "@/lib/sanity/client";
import { homepageQuery } from "@/lib/sanity/queries";
import type { Locale } from "@/lib/i18n";
import type { HomepageData, HybridCard } from "@/lib/types";

type HomepageQueryResult = Partial<HomepageData> & {
  aboutSection?: HomepageData["about"];
  servicesSection?: HomepageData["services"];
  hybridShowcaseSection?: HomepageData["hybridShowcase"];
  gallerySection?: HomepageData["gallery"];
  experiencesSection?: HomepageData["tourPackages"];
  tourPackagesSection?: HomepageData["tourPackages"];
  testimonialsSection?: HomepageData["testimonials"];
};

function isHomepageData(value: unknown): value is HomepageQueryResult {
  return Boolean(value && typeof value === "object" && "hero" in (value as object));
}

function safeArray<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function mergeRecord<T extends Record<string, unknown>>(
  fallback: T,
  incoming?: Partial<T> | null
): T {
  return {
    ...fallback,
    ...(incoming ?? {})
  };
}

function deriveHybridShowcase(data: HomepageQueryResult): HomepageData["hybridShowcase"] {
  const fallback = fallbackHomepage.hybridShowcase;
  const destinationCards = safeArray(
    data.destinations?.cards,
    fallbackHomepage.destinations.cards
  ).slice(0, 3);
  const serviceCards = safeArray(
    data.servicesSection?.items,
    fallbackHomepage.services.items
  ).slice(0, 3);

  const derivedItems: HybridCard[] = [
    ...destinationCards.map((item, index) => ({
      ...fallback.items[index],
      id: `${item.id}-hybrid`,
      kind: "destination" as const,
      title: item.name,
      description: item.description
    })),
    ...serviceCards.map((item, index) => ({
      ...fallback.items[index + 3],
      id: `${item.id}-hybrid`,
      kind: "service" as const,
      title: item.title,
      description: item.description,
      image: item.image,
      meta: item.stats
    }))
  ];

  return {
    ...fallback,
    items: derivedItems.length === fallback.items.length ? derivedItems : fallback.items
  };
}

export async function getHomepageData(locale: Locale): Promise<HomepageData> {
  void locale;

  if (!sanityClient) {
    return fallbackHomepage;
  }

  try {
    const data = await sanityClient.fetch<HomepageQueryResult>(homepageQuery);
    if (!isHomepageData(data)) {
      return fallbackHomepage;
    }

    const header = mergeRecord(fallbackHomepage.header, data.header);
    const hero = mergeRecord(fallbackHomepage.hero, data.hero);
    const about = mergeRecord(fallbackHomepage.about, data.aboutSection ?? data.about);
    const servicesSection = mergeRecord(fallbackHomepage.services, data.servicesSection);
    const destinations = mergeRecord(fallbackHomepage.destinations, data.destinations);
    const whyChooseUs = mergeRecord(fallbackHomepage.whyChooseUs, data.whyChooseUs);
    const hybridShowcase = mergeRecord(
      deriveHybridShowcase(data),
      data.hybridShowcaseSection ?? data.hybridShowcase
    );
    const tourPackagesSection = mergeRecord(
      fallbackHomepage.tourPackages,
      data.tourPackagesSection ?? data.experiencesSection
    );
    const gallery = mergeRecord(fallbackHomepage.gallery, data.gallerySection ?? data.gallery);
    const testimonialsSection = mergeRecord(
      fallbackHomepage.testimonials,
      data.testimonialsSection
    );
    const inquiry = mergeRecord(fallbackHomepage.inquiry, data.inquiry);
    const footer = mergeRecord(fallbackHomepage.footer, data.footer);

    return {
      ...fallbackHomepage,
      ...data,
      header: {
        ...header,
        navigation: safeArray(
          data.header?.navigation,
          fallbackHomepage.header.navigation
        )
      },
      hero: {
        ...hero,
        highlights: safeArray(data.hero?.highlights, fallbackHomepage.hero.highlights)
      },
      about: {
        ...about,
        highlights: safeArray(data.aboutSection?.highlights, fallbackHomepage.about.highlights),
        stats: safeArray(data.aboutSection?.stats, fallbackHomepage.about.stats)
      },
      trustPoints: safeArray(data.trustPoints, fallbackHomepage.trustPoints),
      services: {
        ...servicesSection,
        items: safeArray(data.servicesSection?.items, fallbackHomepage.services.items)
      },
      destinations: {
        ...destinations,
        cards: safeArray(data.destinations?.cards, fallbackHomepage.destinations.cards)
      },
      hybridShowcase: {
        ...hybridShowcase,
        items: safeArray(
          (data.hybridShowcaseSection ?? data.hybridShowcase)?.items,
          deriveHybridShowcase(data).items
        )
      },
      whyChooseUs: {
        ...whyChooseUs,
        points: safeArray(data.whyChooseUs?.points, fallbackHomepage.whyChooseUs.points)
      },
      tourPackages: {
        ...tourPackagesSection,
        items: safeArray(
          (data.tourPackagesSection ?? data.experiencesSection)?.items,
          fallbackHomepage.tourPackages.items
        )
      },
      gallery: {
        ...gallery,
        items: safeArray(
          (data.gallerySection ?? data.gallery)?.items,
          fallbackHomepage.gallery.items
        )
      },
      testimonials: {
        ...testimonialsSection,
        items: safeArray(
          data.testimonialsSection?.items,
          fallbackHomepage.testimonials.items
        )
      },
      inquiry: {
        ...inquiry,
        contactNotes: safeArray(
          data.inquiry?.contactNotes,
          fallbackHomepage.inquiry.contactNotes
        ),
        serviceOptions: safeArray(
          data.inquiry?.serviceOptions,
          fallbackHomepage.inquiry.serviceOptions
        )
      },
      footer: {
        ...footer,
        contactLines: safeArray(data.footer?.contactLines, fallbackHomepage.footer.contactLines)
      }
    };
  } catch {
    return fallbackHomepage;
  }
}
