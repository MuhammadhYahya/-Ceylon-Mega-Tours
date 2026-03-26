"use client";

import Link from "next/link";
import { useState } from "react";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { ExperienceCard, HomepageData } from "@/lib/types";
import "./header.css";

type HeaderProps = {
  locale: Locale;
  data: HomepageData["header"];
  destinationsLabel: HomepageData["destinations"]["navLabel"];
  packages: ExperienceCard[];
  packagesLabel: HomepageData["tourPackages"]["navLabel"];
};

export function Header({
  locale,
  data,
  destinationsLabel,
  packages,
  packagesLabel
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const labels =
    locale === "en"
      ? {
          about: "About",
          services: "Services",
          gallery: "Gallery",
          reviews: "Reviews",
          inquiry: "Inquiry",
          allPackages: "All Tour Packages"
        }
      : {
          about: "Обо мне",
          services: "Услуги",
          gallery: "Галерея",
          reviews: "Отзывы",
          inquiry: "Запрос",
          allPackages: "Все турпакеты"
        };
  const primaryNav = [
    { label: labels.about, href: `/${locale}#about` },
    { label: pickLocaleText(destinationsLabel, locale), href: `/${locale}/destinations` },
    { label: labels.services, href: `/${locale}#services` },
    { label: labels.gallery, href: `/${locale}#gallery` },
    { label: labels.reviews, href: `/${locale}#reviews` },
    { label: labels.inquiry, href: `/${locale}#inquiry` }
  ];
  const packagesPath = `/${locale}/tour-packages`;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href={`/${locale}`} className="site-header__brand">
          <span className="site-header__brand-mark">CMT</span>
          <span>{data.brand}</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__nav-link">
              {item.label}
            </Link>
          ))}
          <div
            className="site-header__dropdown"
            onMouseEnter={() => setIsPackagesOpen(true)}
            onMouseLeave={() => setIsPackagesOpen(false)}
          >
            <Link href={packagesPath} className="site-header__nav-link">
              {pickLocaleText(packagesLabel, locale)}
            </Link>
            <div className={`site-header__dropdown-menu ${isPackagesOpen ? "is-open" : ""}`}>
              <Link href={packagesPath} className="site-header__dropdown-link">
                <span>{labels.allPackages}</span>
              </Link>
              {packages.map((item) => (
                <Link
                  key={item.id}
                  href={`${packagesPath}/${item.id}`}
                  className="site-header__dropdown-link"
                >
                  <span>{pickLocaleText(item.title, locale)}</span>
                  <small>{pickLocaleText(item.duration, locale)}</small>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="site-header__actions">
          <LocaleSwitch locale={locale} className="site-header__locale" />
          <button
            type="button"
            className="site-header__menu"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`site-header__mobile ${isOpen ? "is-open" : ""}`}>
        <div className="container site-header__mobile-inner">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-header__mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="site-header__mobile-package-row">
            <Link
              href={packagesPath}
              className="site-header__mobile-link site-header__mobile-link--package"
              onClick={() => setIsOpen(false)}
            >
              {pickLocaleText(packagesLabel, locale)}
            </Link>
            <button
              type="button"
              className="site-header__mobile-toggle"
              onClick={() => setIsPackagesOpen((value) => !value)}
              aria-expanded={isPackagesOpen}
            >
              <span>{isPackagesOpen ? "-" : "+"}</span>
            </button>
          </div>
          <div className={`site-header__mobile-submenu ${isPackagesOpen ? "is-open" : ""}`}>
            <Link
              href={packagesPath}
              className="site-header__mobile-link site-header__mobile-link--nested"
              onClick={() => setIsOpen(false)}
            >
              {labels.allPackages}
            </Link>
            {packages.map((item) => (
              <Link
                key={item.id}
                href={`${packagesPath}/${item.id}`}
                className="site-header__mobile-link site-header__mobile-link--nested"
                onClick={() => setIsOpen(false)}
              >
                {pickLocaleText(item.title, locale)}
              </Link>
            ))}
          </div>
          <div className="site-header__mobile-row">
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
