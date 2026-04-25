import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { InquirySection } from "@/components/sections/inquiry-section";
import { pickLocaleText } from "@/lib/copy";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";
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
    title: locale === "ru" ? "Направления по Шри-Ланке" : "Sri Lanka Destinations",
    description: pickLocaleText(data.destinations.pageIntro, locale),
    pathname: "/destinations",
    image: "/sigiriya.jpg"
  });
}

export default async function DestinationsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const data = await getHomepageData(locale as Locale);

  return (
    <main id="main-content" className="page-shell">
      <JsonLd
        data={createBreadcrumbJsonLd(locale as Locale, [
          { name: locale === "en" ? "Home" : "Главная", path: "" },
          { name: locale === "en" ? "Destinations" : "Направления", path: "/destinations" }
        ])}
      />
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />

      <section className="section">
        <Reveal className="container page-intro">
          <p className="eyebrow">
            {pickLocaleText(data.destinations.pageEyebrow, locale as Locale)}
          </p>
          <h1 className="page-intro__title">
            {pickLocaleText(data.destinations.pageHeading, locale as Locale)}
          </h1>
          <p className="page-intro__copy">
            {pickLocaleText(data.destinations.pageIntro, locale as Locale)}
          </p>
        </Reveal>
      </section>

      <FeaturedJourneys
        id="destinations"
        locale={locale as Locale}
        eyebrow={data.destinations.eyebrow}
        heading={data.destinations.heading}
        intro={data.destinations.intro}
        items={data.destinations.cards}
        variant="destinations"
      />

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
