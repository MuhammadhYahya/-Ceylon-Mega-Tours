import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData, LocalizedString } from "@/lib/types";
import "./featured-journeys.css";

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
      <div className="container">
        {!hideHeader ? (
          <Reveal className="section-header">
            <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
            <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
            <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
          </Reveal>
        ) : null}

        <div className="journey-grid">
          {cards.map((card, index) => (
            <Reveal key={card.id} delay={index * 80}>
              <article className="journey-card">
                <div className="journey-card__media">
                  <Image
                    src={card.image.src}
                    alt={pickLocaleText(card.image.alt, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="journey-card__image"
                  />
                </div>
                <div className="journey-card__body">
                  <p className="journey-card__meta">{pickLocaleText(card.meta, locale)}</p>
                  <h3 className="journey-card__title">{pickLocaleText(card.title, locale)}</h3>
                  <p className="journey-card__description">
                    {pickLocaleText(card.description, locale)}
                  </p>
                  <span className="journey-card__spacer" aria-hidden="true" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {action ? (
          <Reveal delay={160} className="journey-grid__action">
            <Link href={action.href} className="button-ghost">
              {pickLocaleText(action.label, locale)}
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
