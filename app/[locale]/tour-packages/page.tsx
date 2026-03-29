import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/motion/reveal";
import { Header } from "@/components/layout/header";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { InquirySection } from "@/components/sections/inquiry-section";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocaleText } from "@/lib/copy";
import { createPageMetadata } from "@/lib/site";
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
    title: locale === "ru" ? "Турпакеты по Шри-Ланке" : "Sri Lanka Tour Packages",
    description: pickLocaleText(data.tourPackages.pageIntro, locale),
    pathname: "/tour-packages"
  });
}

export default async function TourPackagesPage({
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
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />

      <section className="section">
        <Reveal className="container page-intro">
          <p className="eyebrow">
            {pickLocaleText(data.tourPackages.pageEyebrow, locale as Locale)}
          </p>
          <h1 className="page-intro__title">
            {pickLocaleText(data.tourPackages.pageHeading, locale as Locale)}
          </h1>
          <p className="page-intro__copy">
            {pickLocaleText(data.tourPackages.pageIntro, locale as Locale)}
          </p>
        </Reveal>
      </section>

      <FeaturedJourneys
        id="packages"
        locale={locale as Locale}
        eyebrow={data.tourPackages.eyebrow}
        heading={data.tourPackages.heading}
        intro={data.tourPackages.intro}
        items={data.tourPackages.items}
        variant="experiences"
      />

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
