import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { InquirySection } from "@/components/sections/inquiry-section";
import { TourPackageSections } from "@/components/sections/tour-package-sections";
import { pickLocaleText } from "@/lib/copy";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import {
  getAllTourPackageSlugs,
  getTourPackageBySlug,
  getTourPackagesSectionCopy,
  pickLocalizedParagraphs
} from "@/lib/tour-packages";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getAllTourPackageSlugs();

  return locales.flatMap((locale) =>
    slugs.map((packageId) => ({
      locale,
      packageId
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

  const tourPackage = await getTourPackageBySlug(packageId);

  if (!tourPackage) {
    return {};
  }

  return createPageMetadata({
    locale,
    title: pickLocaleText(tourPackage.seoTitle || tourPackage.title, locale),
    description: pickLocalizedParagraphs(
      tourPackage.seoDescription,
      locale,
      pickLocaleText(tourPackage.summary, locale)
    ).join(" "),
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
  const packageCopy = getTourPackagesSectionCopy();
  const tourPackage = await getTourPackageBySlug(packageId);

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
        <div className="container package-detail package-detail--hero">
          <Reveal className="package-detail__content">
            <p className="eyebrow">{pickLocaleText(packageCopy.pageEyebrow, locale as Locale)}</p>
            <h1 className="page-intro__title">
              {pickLocaleText(tourPackage.title, locale as Locale)}
            </h1>
            <div className="package-detail__meta-row">
              <p className="package-detail__meta">
                {pickLocaleText(tourPackage.duration, locale as Locale)}
              </p>
              {tourPackage.priceLabel ? (
                <p className="package-detail__meta package-detail__meta--price">
                  {pickLocaleText(tourPackage.priceLabel, locale as Locale)}
                </p>
              ) : null}
            </div>
            <p className="page-intro__copy">
              {pickLocaleText(tourPackage.summary, locale as Locale)}
            </p>
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

      <section className="section package-detail__body-section">
        <div className="container package-detail__body">
          <TourPackageSections locale={locale as Locale} sections={tourPackage.sections} />
        </div>
      </section>

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
