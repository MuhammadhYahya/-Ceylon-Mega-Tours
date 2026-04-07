import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";

export const SITE_NAME = "Ceylon Mega Tours";
export const SITE_DESCRIPTION =
  "Russian-focused private Sri Lanka tours, airport transfers, and calm premium travel planning.";
export const SITE_KEYWORDS = [
  "Sri Lanka tours",
  "private tours Sri Lanka",
  "Russian guide Sri Lanka",
  "airport transfer Sri Lanka",
  "Ceylon Mega Tours"
];
export const DEFAULT_OG_IMAGE = "/hero.png";

function normalizeBaseUrl(value?: string) {
  if (!value) {
    return "http://localhost:3000";
  }

  return value.startsWith("http") ? value : `https://${value}`;
}

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    return normalizeBaseUrl(configuredSiteUrl);
  }

  if (process.env.VERCEL_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be set for Vercel production deployments.");
  }

  return normalizeBaseUrl(
    process.env.VERCEL_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      "http://localhost:3000"
  );
}

export function getLocalizedPath(locale: Locale, pathname = "") {
  const normalized = pathname ? (pathname.startsWith("/") ? pathname : `/${pathname}`) : "";
  return `/${locale}${normalized}`;
}

export function buildAbsoluteUrl(pathname = "/") {
  return new URL(pathname, getSiteUrl()).toString();
}

function getLocaleCode(locale: Locale) {
  return locale === "ru" ? "ru_RU" : "en_US";
}

export function createPageMetadata({
  locale,
  title,
  description,
  pathname = "",
  image = DEFAULT_OG_IMAGE
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname?: string;
  image?: string;
}): Metadata {
  const localizedPath = getLocalizedPath(locale, pathname);
  const languages = Object.fromEntries(
    locales.map((value) => [value, getLocalizedPath(value, pathname)])
  );

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages
    },
    openGraph: {
      title,
      description,
      url: localizedPath,
      siteName: SITE_NAME,
      locale: getLocaleCode(locale),
      type: "website",
      images: [
        {
          url: buildAbsoluteUrl(image),
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [buildAbsoluteUrl(image)]
    }
  };
}
