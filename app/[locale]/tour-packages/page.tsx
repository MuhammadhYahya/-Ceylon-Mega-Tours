import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/motion/reveal";
import { Header } from "@/components/layout/header";
import { InquirySection } from "@/components/sections/inquiry-section";
import { TourPackagesZigzag } from "@/components/sections/tour-packages-zigzag";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { pickLocaleText } from "@/lib/copy";
import { notFound } from "next/navigation";

export const revalidate = 300;

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
    <main className="page-shell">
      <Header
        locale={locale as Locale}
        data={data.header}
        packages={data.tourPackages.items}
        packagesLabel={data.tourPackages.navLabel}
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

      <TourPackagesZigzag
        locale={locale as Locale}
        section={data.tourPackages}
        items={data.tourPackages.items}
      />

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
