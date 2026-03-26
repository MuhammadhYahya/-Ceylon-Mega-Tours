import Image from "next/image";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./signature-destinations.css";

export function SignatureDestinations({
  section,
  locale = "en"
}: {
  section: HomepageData["destinations"];
  locale?: Locale;
}) {
  return (
    <section className="section">
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
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
          <div className="destination-grid__cards">
            {section.cards.map((card) => (
              <article key={card.id} className="destination-grid__card">
                <h3>{pickLocaleText(card.name, locale)}</h3>
                <p>{pickLocaleText(card.description, locale)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
