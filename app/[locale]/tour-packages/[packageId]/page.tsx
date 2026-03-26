import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { InquirySection } from "@/components/sections/inquiry-section";
import { pickLocaleText } from "@/lib/copy";
import { fallbackHomepage } from "@/lib/fallback-content";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, locales, type Locale } from "@/lib/i18n";
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
    <main className="page-shell">
      <Header
        locale={locale as Locale}
        data={data.header}
        packages={data.tourPackages.items}
        packagesLabel={data.tourPackages.navLabel}
      />

      <section className="section">
        <div className="container package-detail">
          <Reveal className="package-detail__content">
            <p className="eyebrow">{pickLocaleText(data.tourPackages.pageEyebrow, locale as Locale)}</p>
            <h1 className="page-intro__title">
              {pickLocaleText(tourPackage.title, locale as Locale)}
            </h1>
            <p className="package-detail__meta">
              {pickLocaleText(tourPackage.duration, locale as Locale)}
            </p>
            <p className="page-intro__copy">
              {pickLocaleText(tourPackage.description, locale as Locale)}
            </p>
            <div className="button-row">
              <Link href={`/${locale}#inquiry`} className="button-primary">
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
