import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/motion/reveal";
import { Header } from "@/components/layout/header";
import { InquirySection } from "@/components/sections/inquiry-section";
import { SignatureDestinations } from "@/components/sections/signature-destinations";
import { pickLocaleText } from "@/lib/copy";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const revalidate = 300;

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
    <main className="page-shell">
      <Header
        locale={locale as Locale}
        data={data.header}
        destinationsLabel={data.destinations.navLabel}
        packages={data.tourPackages.items}
        packagesLabel={data.tourPackages.navLabel}
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

      <SignatureDestinations
        locale={locale as Locale}
        section={data.destinations}
        hideHeader
      />

      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
