import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { InquirySection } from "@/components/sections/inquiry-section";
import { TourPackagesExplorer } from "@/components/sections/tour-packages-explorer";
import { pickLocaleText } from "@/lib/copy";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/site";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";
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
  const packages = await getTourPackages(locale as Locale);

  return (
    <main id="main-content" className="page-shell">
      <JsonLd
        data={createBreadcrumbJsonLd(locale as Locale, [
          { name: locale === "en" ? "Home" : "Главная", path: "" },
          { name: locale === "en" ? "Journeys" : "Туры", path: "/tour-packages" }
        ])}
      />
      <Header
        locale={locale as Locale}
        data={data.header}
        whatsappHref={data.inquiry.whatsappHref}
      />

      <TourPackagesExplorer
        locale={locale as Locale}
        copy={packageCopy}
        items={packages}
      />

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
