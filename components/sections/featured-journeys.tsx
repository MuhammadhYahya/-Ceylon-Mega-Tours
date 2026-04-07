import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type {
  DestinationCard,
  ExperienceCard,
  LocalizedString,
  ServiceCard,
  TourPackageCard
} from "@/lib/types";
import "./featured-journeys.css";

type FeaturedJourneysProps = {
  id: string;
  eyebrow: LocalizedString;
  heading: LocalizedString;
  intro: LocalizedString;
  items: Array<ServiceCard | ExperienceCard | DestinationCard | TourPackageCard>;
  variant: "services" | "experiences" | "destinations";
  locale: Locale;
  limit?: number;
  action?: {
    label: LocalizedString;
    href: string;
  };
};

export function FeaturedJourneys({
  id,
  eyebrow,
  heading,
  intro,
  items,
  variant,
  locale,
  limit,
  action
}: FeaturedJourneysProps) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;
  const detailLabel =
    locale === "en" ? "Open package" : "Открыть пакет";

  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(intro, locale)}</p>
        </Reveal>

        <div className="journey-grid">
          {visibleItems.map((item, index) => {
            const meta =
              "duration" in item
                ? pickLocaleText(item.duration, locale)
                : "stats" in item
                  ? pickLocaleText(item.stats, locale)
                  : pickLocaleText(item.meta, locale);

            const href =
              variant === "experiences"
                ? `/${locale}/tour-packages/${"slug" in item ? item.slug : item.id}`
                : null;

            return (
              <Reveal key={"slug" in item ? item.slug : item.id} delay={index * 80}>
                <article className="journey-card">
                  <div className="journey-card__media">
                    <Image
                      src={item.image.src}
                      alt={pickLocaleText(item.image.alt, locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="journey-card__image"
                    />
                  </div>

                  <div className="journey-card__body">
                    <p className="journey-card__meta">{meta}</p>
                    <h3 className="journey-card__title">{pickLocaleText(item.title, locale)}</h3>
                    <p className="journey-card__description">
                      {pickLocaleText("summary" in item ? item.summary : item.description, locale)}
                    </p>

                    {href ? (
                      <Link href={href} className="journey-card__link">
                        {detailLabel}
                      </Link>
                    ) : (
                      <span className="journey-card__spacer" aria-hidden="true" />
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
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
