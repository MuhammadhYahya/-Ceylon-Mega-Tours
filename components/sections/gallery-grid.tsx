import Image from "next/image";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./gallery-grid.css";

type GalleryGridProps = {
  locale: Locale;
  section: HomepageData["gallery"];
};

export function GalleryGrid({ locale, section }: GalleryGridProps) {
  return (
    <section id="gallery" className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
        </Reveal>

        <div className="gallery-grid">
          {section.items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 60}
              className={`gallery-grid__item gallery-grid__item--${item.layout}`}
            >
              <article className="gallery-card">
                <div className="gallery-card__media">
                  <Drift strength={10}>
                    <Image
                      src={item.image.src}
                      alt={pickLocaleText(item.image.alt, locale)}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="gallery-card__image"
                    />
                  </Drift>
                </div>
                <div className="gallery-card__caption">
                  {pickLocaleText(item.title, locale)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
