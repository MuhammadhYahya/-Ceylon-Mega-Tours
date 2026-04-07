import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Reveal } from "@/components/motion/reveal";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { InquirySection } from "@/components/sections/inquiry-section";
import { pickLocaleText } from "@/lib/copy";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import { getTourPackages, getTourPackagesSectionCopy } from "@/lib/tour-packages";
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

  const packageCopy = getTourPackagesSectionCopy();

  return createPageMetadata({
    locale,
    title: locale === "ru" ? "Турпакеты по Шри-Ланке" : "Sri Lanka Tour Packages",
    description: pickLocaleText(packageCopy.pageIntro, locale),
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
  const packageCopy = getTourPackagesSectionCopy();
  const packages = await getTourPackages();

  return (
    <main id="main-content" className="page-shell">
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />

      <section className="section">
        <Reveal className="container page-intro">
          <p className="eyebrow">{pickLocaleText(packageCopy.pageEyebrow, locale as Locale)}</p>
          <h1 className="page-intro__title">
            {pickLocaleText(packageCopy.pageHeading, locale as Locale)}
          </h1>
          <p className="page-intro__copy">
            {pickLocaleText(packageCopy.pageIntro, locale as Locale)}
          </p>
        </Reveal>
      </section>

      <FeaturedJourneys
        id="packages"
        locale={locale as Locale}
        eyebrow={packageCopy.eyebrow}
        heading={packageCopy.heading}
        intro={packageCopy.intro}
        items={packages}
        variant="experiences"
      />

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
