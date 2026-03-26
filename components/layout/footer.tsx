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
  const packagesPath = `/${locale}/tour-packages`;
  const homeAnchor = (hash: string) => `/${locale}${hash}`;
  const labels =
    locale === "en"
      ? {
          about: "About",
          explore: "Explore",
          packages: "Tour Packages",
          inquiry: "Inquiry"
        }
      : {
          about: "Обо мне",
          explore: "Открыть",
          packages: "Турпакеты",
          inquiry: "Запрос"
        };

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
            <Link href={homeAnchor("#about")}>{labels.about}</Link>
            <Link href={homeAnchor("#explore")}>{labels.explore}</Link>
            <Link href={packagesPath}>{labels.packages}</Link>
            <Link href={homeAnchor("#inquiry")}>{labels.inquiry}</Link>
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
