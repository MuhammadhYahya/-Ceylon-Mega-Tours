"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./header.css";

type HeaderProps = {
  locale: Locale;
  data: HomepageData["header"];
  whatsappHref: string;
};

export function Header({ locale, data, whatsappHref }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuLabel = locale === "en" ? "Toggle navigation" : "Открыть меню";
  const navigation = data.navigation.map((item) => ({
    href: item.href.startsWith("http")
      ? item.href
      : item.href.startsWith("#") || item.href.startsWith("/")
        ? `/${locale}${item.href}`
        : item.href,
    label: pickLocaleText(item.label, locale)
  }));

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href={`/${locale}`} className="site-header__brand">
          <Image
            src="/logo.jpg"
            alt="Ceylon Mega Tours logo"
            width={40}
            height={40}
            className="site-header__brand-logo"
          />
          <span className="site-header__brand-name">{data.brand}</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <LocaleSwitch locale={locale} className="site-header__locale" />
          <a
            href={whatsappHref}
            className="site-header__cta"
            target="_blank"
            rel="noreferrer"
          >
            {pickLocaleText(data.ctaLabel, locale)}
          </a>
          <button
            type="button"
            className="site-header__menu"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label={menuLabel}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`site-header__mobile ${isOpen ? "is-open" : ""}`}>
        <div className="container site-header__mobile-inner">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-header__mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="site-header__mobile-actions">
            <a
              href={whatsappHref}
              className="site-header__cta site-header__cta--mobile"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              {pickLocaleText(data.ctaLabel, locale)}
            </a>
            <LocaleSwitch
              locale={locale}
              className="site-header__locale site-header__locale--mobile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
