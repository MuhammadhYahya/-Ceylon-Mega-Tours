import Image from "next/image";
import Link from "next/link";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { ExperienceCard, LocalizedString, ServiceCard } from "@/lib/types";
import "./featured-journeys.css";

type FeaturedJourneysProps = {
  id: string;
  eyebrow: LocalizedString;
  heading: LocalizedString;
  intro: LocalizedString;
  items: Array<ServiceCard | ExperienceCard>;
  variant: "services" | "experiences";
  locale?: Locale;
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
  locale = "en",
  limit,
  action
}: FeaturedJourneysProps) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(intro, locale)}</p>
        </Reveal>
        <div className="journey-grid">
          {visibleItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <article className={`journey-card journey-card--${variant}`}>
                <div className="journey-card__image-wrap">
                  <Drift strength={10}>
                    <Image
                      src={item.image.src}
                      alt={pickLocaleText(item.image.alt, locale)}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="journey-card__image"
                    />
                  </Drift>
                </div>
                <div className="journey-card__body">
                  <p className="journey-card__meta">
                    {"duration" in item
                      ? pickLocaleText(item.duration, locale)
                      : pickLocaleText(item.stats, locale)}
                  </p>
                  <h3>{pickLocaleText(item.title, locale)}</h3>
                  <p>{pickLocaleText(item.description, locale)}</p>
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
