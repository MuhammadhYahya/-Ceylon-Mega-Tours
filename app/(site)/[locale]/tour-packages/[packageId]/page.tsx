import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { InquirySection } from "@/components/sections/inquiry-section";
import { TourPackageSections } from "@/components/sections/tour-package-sections";
import { pickLocaleText } from "@/lib/copy";
import { DEFAULT_TOUR_CATEGORY_META, TOUR_CATEGORY_META } from "@/lib/tour-catalog";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import { createBreadcrumbJsonLd, createTourPackageJsonLd } from "@/lib/structured-data";
import {
  getAllTourPackageSlugs,
  getTourPackageBySlug,
  pickLocalizedParagraphs
} from "@/lib/tour-packages";
import { notFound } from "next/navigation";
import "@/components/sections/tour-package-detail.css";

export async function generateStaticParams() {
  const localizedSlugs = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      slugs: await getAllTourPackageSlugs(locale)
    }))
  );

  return localizedSlugs.flatMap(({ locale, slugs }) =>
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

  const tourPackage = await getTourPackageBySlug(packageId, locale);

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
  const tourPackage = await getTourPackageBySlug(packageId, locale as Locale);

  if (!tourPackage) {
    notFound();
  }

  const categoryMeta = tourPackage.category
    ? TOUR_CATEGORY_META[tourPackage.category]
    : DEFAULT_TOUR_CATEGORY_META;
  const difficultyLabel = tourPackage.difficulty
    ? locale === "en"
      ? tourPackage.difficulty.charAt(0).toUpperCase() + tourPackage.difficulty.slice(1)
      : tourPackage.difficulty === "easy"
        ? "Легкий"
        : tourPackage.difficulty === "moderate"
          ? "Средний"
          : "Активный"
    : null;

  return (
    <main id="main-content" className="page-shell">
      <JsonLd
        data={createBreadcrumbJsonLd(locale as Locale, [
          { name: locale === "en" ? "Home" : "Главная", path: "" },
          { name: locale === "en" ? "Journeys" : "Туры", path: "/tour-packages" },
          {
            name: pickLocaleText(tourPackage.title, locale as Locale),
            path: `/tour-packages/${packageId}`
          }
        ])}
      />
      <JsonLd data={createTourPackageJsonLd(locale as Locale, tourPackage)} />
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />

      <section className="section tour-detail">
        <div className="container">
          <nav className="tour-detail__breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{locale === "en" ? "Home" : "Главная"}</Link>
            <span>/</span>
            <Link href={`/${locale}/tour-packages`}>
              {locale === "en" ? "Journeys" : "Туры"}
            </Link>
            <span>/</span>
            <span>{pickLocaleText(tourPackage.title, locale as Locale)}</span>
          </nav>

          <div
            className="tour-detail__hero"
            style={{ "--tour-accent": categoryMeta.color } as CSSProperties}
          >
            <div className="tour-detail__hero-copy">
              <p className="tour-detail__eyebrow">
                {pickLocaleText(categoryMeta.label, locale as Locale)}
              </p>
              <h1>{pickLocaleText(tourPackage.title, locale as Locale)}</h1>
              <p className="tour-detail__summary">
                {pickLocaleText(tourPackage.summary, locale as Locale)}
              </p>

              <div className="tour-detail__meta">
                <span>{pickLocaleText(tourPackage.duration, locale as Locale)}</span>
                {difficultyLabel ? <span>{difficultyLabel}</span> : null}
                {tourPackage.location ? (
                  <span>{pickLocaleText(tourPackage.location, locale as Locale)}</span>
                ) : null}
                {tourPackage.badge ? (
                  <span>{pickLocaleText(tourPackage.badge, locale as Locale)}</span>
                ) : null}
              </div>

              <div className="button-row">
                <a
                  href={data.inquiry.whatsappHref}
                  className="button-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  {pickLocaleText(data.inquiry.whatsappLabel, locale as Locale)}
                </a>
                <Link href="#inquiry" className="button-secondary">
                  {pickLocaleText(data.inquiry.submitLabel, locale as Locale)}
                </Link>
                <Link href={`/${locale}/tour-packages`} className="button-ghost">
                  {locale === "en" ? "Back to All Journeys" : "Назад ко всем турам"}
                </Link>
              </div>
            </div>

            <div className="tour-detail__hero-media">
              <Image
                src={tourPackage.image.src}
                alt={pickLocaleText(tourPackage.image.alt, locale as Locale)}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="tour-detail__hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container tour-detail__body">
          <div className="tour-detail__content">
            <TourPackageSections locale={locale as Locale} sections={tourPackage.sections} />
          </div>

          <aside className="tour-detail__sidebar">
            <section className="tour-detail__sidebar-card tour-detail__sidebar-card--cta">
              <p>{locale === "en" ? "Ready to plan?" : "Готовы спланировать поездку?"}</p>
              <h2>
                {tourPackage.priceLabel
                  ? pickLocaleText(tourPackage.priceLabel, locale as Locale)
                  : locale === "en"
                    ? "Price on request"
                    : "Цена по запросу"}
              </h2>
              <span>
                {locale === "en"
                  ? "Fastest response on WhatsApp with custom route support."
                  : "Быстрый ответ в WhatsApp и помощь с индивидуальным маршрутом."}
              </span>
              <a
                href={data.inquiry.whatsappHref}
                className="button-primary"
                target="_blank"
                rel="noreferrer"
              >
                {pickLocaleText(data.inquiry.whatsappLabel, locale as Locale)}
              </a>
            </section>

            <section className="tour-detail__sidebar-card">
              <h2>{locale === "en" ? "Journey Snapshot" : "Кратко о туре"}</h2>
              <dl className="tour-detail__facts">
                <div>
                  <dt>{locale === "en" ? "Category" : "Категория"}</dt>
                  <dd>{pickLocaleText(categoryMeta.label, locale as Locale)}</dd>
                </div>
                <div>
                  <dt>{locale === "en" ? "Duration" : "Длительность"}</dt>
                  <dd>{pickLocaleText(tourPackage.duration, locale as Locale)}</dd>
                </div>
                {tourPackage.bestTime ? (
                  <div>
                    <dt>{locale === "en" ? "Best Time" : "Лучшее время"}</dt>
                    <dd>{pickLocaleText(tourPackage.bestTime, locale as Locale)}</dd>
                  </div>
                ) : null}
                {difficultyLabel ? (
                  <div>
                    <dt>{locale === "en" ? "Difficulty" : "Сложность"}</dt>
                    <dd>{difficultyLabel}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            {tourPackage.languages?.length ? (
              <section className="tour-detail__sidebar-card">
                <h2>{locale === "en" ? "Guide Languages" : "Языки гида"}</h2>
                <div className="tour-detail__tag-row">
                  {tourPackage.languages.map((language) => (
                    <span key={language.en}>{pickLocaleText(language, locale as Locale)}</span>
                  ))}
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </section>

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
