import Image from "next/image";
import Link from "next/link";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData, LocalizedString } from "@/lib/types";
import "./signature-destinations.css";

export function SignatureDestinations({
  section,
  locale = "en",
  id,
  limit,
  action,
  hideHeader = false
}: {
  section: HomepageData["destinations"];
  locale?: Locale;
  id?: string;
  limit?: number;
  action?: {
    label: LocalizedString;
    href: string;
  };
  hideHeader?: boolean;
}) {
  const cards = typeof limit === "number" ? section.cards.slice(0, limit) : section.cards;

  return (
    <section id={id} className="section">
      <div className="container destination-grid">
        <div className="destination-grid__media">
          <Image
            src={section.image.src}
            alt={pickLocaleText(section.image.alt, locale)}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="destination-grid__image"
          />
        </div>
        <div className="destination-grid__content">
          {!hideHeader ? (
            <>
              <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
              <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
              <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
            </>
          ) : null}
          <div className="destination-grid__cards">
            {cards.map((card) => (
              <article key={card.id} className="destination-grid__card">
                <h3>{pickLocaleText(card.name, locale)}</h3>
                <p>{pickLocaleText(card.description, locale)}</p>
              </article>
            ))}
          </div>
          {action ? (
            <Link href={action.href} className="button-ghost">
              {pickLocaleText(action.label, locale)}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
