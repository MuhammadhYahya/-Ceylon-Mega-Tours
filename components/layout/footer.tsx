import Image from "next/image";
import Link from "next/link";
import { LocaleSwitch } from "@/components/layout/locale-switch";
import { WHATSAPP_URL } from "@/lib/contact";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./footer.css";

type FooterProps = {
  locale: Locale;
  data: HomepageData["footer"];
};

export function Footer({ locale, data }: FooterProps) {
  const links = [
    { label: locale === "en" ? "About Me" : "Обо мне", href: `/${locale}#about` },
    { label: locale === "en" ? "Services" : "Услуги", href: `/${locale}#services` },
    { label: locale === "en" ? "Packages" : "Пакеты", href: `/${locale}#packages` },
    { label: locale === "en" ? "Destinations" : "Направления", href: `/${locale}#destinations` },
    { label: locale === "en" ? "Reviews" : "Отзывы", href: `/${locale}#reviews` },
    { label: locale === "en" ? "Enquiry" : "Запрос", href: `/${locale}#inquiry` }
  ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__brand-row">
            <Image
              src="/logo.jpg"
              alt="Ceylon Mega Tours logo"
              width={52}
              height={52}
              className="site-footer__logo"
            />
            <div>
              <p className="eyebrow">Ceylon Mega Tours</p>
              <h2 className="site-footer__title">Ceylon Mega Tours</h2>
            </div>
          </div>
          <p className="site-footer__description">{pickLocaleText(data.description, locale)}</p>
          <a href={WHATSAPP_URL} className="site-footer__cta" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
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
