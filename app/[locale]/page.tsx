import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { HeroSection } from "@/components/sections/hero-section";
import { InquirySection } from "@/components/sections/inquiry-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { pickLocaleText } from "@/lib/copy";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import { getFeaturedTourPackages, getTourPackagesSectionCopy } from "@/lib/tour-packages";
import { notFound } from "next/navigation";

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const data = await getHomepageData(locale);

  return createPageMetadata({
    locale,
    title:
      locale === "ru"
        ? "Частные туры по Шри-Ланке"
        : "Private Sri Lanka Tours",
    description: pickLocaleText(data.hero.description, locale)
  });
}

export default async function LocaleHomepage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const data = await getHomepageData(locale as Locale);
  const packageCopy = getTourPackagesSectionCopy();
  const featuredPackages = await getFeaturedTourPackages(3);

  return (
    <main id="main-content" className="page-shell">
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />
      <HeroSection
        locale={locale as Locale}
        hero={data.hero}
        whatsappHref={data.inquiry.whatsappHref}
      />
      <AboutSection locale={locale as Locale} section={data.about} />
      <FeaturedJourneys
        id="services"
        locale={locale as Locale}
        eyebrow={data.services.eyebrow}
        heading={data.services.heading}
        intro={data.services.intro}
        items={data.services.items}
        variant="services"
      />
      <FeaturedJourneys
        id="packages"
        locale={locale as Locale}
        eyebrow={packageCopy.previewEyebrow}
        heading={packageCopy.previewHeading}
        intro={packageCopy.previewIntro}
        items={featuredPackages}
        variant="experiences"
        action={{
          label: packageCopy.viewAllLabel,
          href: `/${locale}/tour-packages`
        }}
      />
      <FeaturedJourneys
        id="destinations"
        locale={locale as Locale}
        eyebrow={data.destinations.previewEyebrow}
        heading={data.destinations.previewHeading}
        intro={data.destinations.previewIntro}
        items={data.destinations.cards}
        variant="destinations"
        limit={3}
        action={{
          label: data.destinations.viewAllLabel,
          href: `/${locale}/destinations`
        }}
      />
      <TestimonialsSection locale={locale as Locale} section={data.testimonials} />
      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
