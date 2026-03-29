import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { InquirySection } from "@/components/sections/inquiry-section";
import { pickLocaleText } from "@/lib/copy";
import { fallbackHomepage } from "@/lib/fallback-content";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    fallbackHomepage.tourPackages.items.map((item) => ({
      locale,
      packageId: item.id
    }))
  );
}

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; packageId: string }>;
}): Promise<Metadata> {
  const { locale, packageId } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const data = await getHomepageData(locale);
  const tourPackage = data.tourPackages.items.find((item) => item.id === packageId);

  if (!tourPackage) {
    return {};
  }

  return createPageMetadata({
    locale,
    title: pickLocaleText(tourPackage.title, locale),
    description: pickLocaleText(tourPackage.description, locale),
    pathname: `/tour-packages/${packageId}`,
    image: tourPackage.image.src
  });
}

export default async function TourPackageDetailPage({
  params
}: {
  params: Promise<{ locale: string; packageId: string }>;
}) {
  const { locale, packageId } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const data = await getHomepageData(locale as Locale);
  const tourPackage = data.tourPackages.items.find((item) => item.id === packageId);

  if (!tourPackage) {
    notFound();
  }

  const backLabel =
    locale === "en" ? "Back to All Tour Packages" : "Назад ко всем турпакетам";

  return (
    <main id="main-content" className="page-shell">
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />

      <section className="section">
        <div className="container package-detail">
          <Reveal className="package-detail__content">
            <p className="eyebrow">
              {pickLocaleText(data.tourPackages.pageEyebrow, locale as Locale)}
            </p>
            <h1 className="page-intro__title">
              {pickLocaleText(tourPackage.title, locale as Locale)}
            </h1>
            <div className="package-detail__meta-row">
              <p className="package-detail__meta">
                {pickLocaleText(tourPackage.duration, locale as Locale)}
              </p>
              {tourPackage.price ? (
                <p className="package-detail__meta package-detail__meta--price">
                  {pickLocaleText(tourPackage.price, locale as Locale)}
                </p>
              ) : null}
            </div>
            <p className="page-intro__copy">
              {pickLocaleText(tourPackage.description, locale as Locale)}
            </p>
            {tourPackage.highlights?.length ? (
              <div className="package-detail__panel">
                <h2 className="package-detail__panel-title">
                  {locale === "en" ? "Itinerary highlights" : "Что входит в маршрут"}
                </h2>
                <ul className="package-detail__list">
                  {tourPackage.highlights.map((item) => (
                    <li key={item.en}>{pickLocaleText(item, locale as Locale)}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {tourPackage.includes?.length ? (
              <div className="package-detail__panel">
                <h2 className="package-detail__panel-title">
                  {locale === "en" ? "Price includes" : "Цена включает"}
                </h2>
                <ul className="package-detail__list">
                  {tourPackage.includes.map((item) => (
                    <li key={item.en}>{pickLocaleText(item, locale as Locale)}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="button-row">
              <a
                href={data.inquiry.whatsappHref}
                className="button-primary"
                target="_blank"
                rel="noreferrer"
              >
                {pickLocaleText(data.inquiry.whatsappLabel, locale as Locale)}
              </a>
              <Link href={`/${locale}#inquiry`} className="button-secondary">
                {pickLocaleText(data.inquiry.submitLabel, locale as Locale)}
              </Link>
              <Link href={`/${locale}/tour-packages`} className="button-ghost">
                {backLabel}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="package-detail__media">
              <Drift strength={16}>
                <Image
                  src={tourPackage.image.src}
                  alt={pickLocaleText(tourPackage.image.alt, locale as Locale)}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="package-detail__image"
                />
              </Drift>
            </div>
          </Reveal>
        </div>
      </section>

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
