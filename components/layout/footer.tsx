import Link from "next/link";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./footer.css";

type FooterProps = {
  locale: Locale;
  data: HomepageData["footer"];
};

export function Footer({ locale, data }: FooterProps) {
  const labels =
    locale === "en"
      ? {
          about: "About",
          destinations: "Destinations",
          services: "Services",
          packages: "Tour Packages",
          gallery: "Gallery",
          inquiry: "Inquiry"
        }
      : {
          about: "Обо мне",
          destinations: "Направления",
          services: "Услуги",
          packages: "Турпакеты",
          gallery: "Галерея",
          inquiry: "Запрос"
        };
  const links = [
    { label: labels.about, href: `/${locale}#about` },
    { label: labels.destinations, href: `/${locale}/destinations` },
    { label: labels.services, href: `/${locale}#services` },
    { label: labels.packages, href: `/${locale}/tour-packages` },
    { label: labels.gallery, href: `/${locale}#gallery` },
    { label: labels.inquiry, href: `/${locale}#inquiry` }
  ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__lead">
          <p className="eyebrow">Ceylon Mega Tours</p>
          <p className="site-footer__description">{pickLocaleText(data.description, locale)}</p>
        </div>
        <div>
          <h3 className="site-footer__heading">{pickLocaleText(data.quickLinksHeading, locale)}</h3>
          <div className="site-footer__links">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="site-footer__heading">{pickLocaleText(data.contactHeading, locale)}</h3>
          <div className="site-footer__contact">
            {data.contactLines.map((line) => (
              <p key={line.en}>{pickLocaleText(line, locale)}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>{pickLocaleText(data.copyright, locale)}</p>
        <LocaleSwitch locale={locale} className="site-footer__locale" />
      </div>
    </footer>
  );
}
