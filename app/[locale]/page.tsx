import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/about-section";
import { FeaturedJourneys } from "@/components/sections/featured-journeys";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { HybridShowcaseSection } from "@/components/sections/hybrid-showcase-section";
import { InquirySection } from "@/components/sections/inquiry-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustBand } from "@/components/sections/trust-band";
import { ValueSection } from "@/components/sections/value-section";
import { getHomepageData } from "@/lib/homepage-data";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const revalidate = 300;

export default async function LocaleHomepage({
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
      <HeroSection locale={locale as Locale} hero={data.hero} />
      <AboutSection locale={locale as Locale} section={data.about} />
      <TrustBand locale={locale as Locale} items={data.trustPoints} />
      <HybridShowcaseSection
        locale={locale as Locale}
        section={data.hybridShowcase}
      />
      <ValueSection locale={locale as Locale} section={data.whyChooseUs} />
      <FeaturedJourneys
        id="tour-packages"
        locale={locale as Locale}
        eyebrow={data.tourPackages.previewEyebrow}
        heading={data.tourPackages.previewHeading}
        intro={data.tourPackages.previewIntro}
        items={data.tourPackages.items}
        variant="experiences"
        limit={3}
        action={{
          label: data.tourPackages.viewAllLabel,
          href: `/${locale}/tour-packages`
        }}
      />
      <GalleryGrid locale={locale as Locale} section={data.gallery} />
      <TestimonialsSection locale={locale as Locale} section={data.testimonials} />
      <InquirySection locale={locale as Locale} section={data.inquiry} />
      <Footer locale={locale as Locale} data={data.footer} />
    </main>
  );
}
