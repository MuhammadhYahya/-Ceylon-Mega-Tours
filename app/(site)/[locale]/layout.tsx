import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocumentShell, metadata, viewport } from "@/app/document-shell";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, locales } from "@/lib/i18n";
import { createLocalBusinessJsonLd } from "@/lib/structured-data";

export { metadata, viewport };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <DocumentShell lang={locale}>
      <JsonLd data={createLocalBusinessJsonLd(locale)} />
      {children}
      <FloatingWhatsApp locale={locale} />
    </DocumentShell>
  );
}
