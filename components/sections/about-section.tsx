import Image from "next/image";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./about-section.css";

type AboutSectionProps = {
  locale: Locale;
  section: HomepageData["about"];
};

export function AboutSection({ locale, section }: AboutSectionProps) {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <Reveal className="about-grid__content">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
          <p className="about-grid__copy">{pickLocaleText(section.description, locale)}</p>

          <div className="about-grid__chips">
            {section.highlights.map((item) => (
              <span key={item.en} className="about-grid__chip glass-panel">
                {pickLocaleText(item, locale)}
              </span>
            ))}
          </div>

          <div className="about-grid__stats">
            {section.stats.map((item) => (
              <article key={item.value.en} className="about-grid__stat">
                <strong>{pickLocaleText(item.value, locale)}</strong>
                <span>{pickLocaleText(item.label, locale)}</span>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="about-grid__media">
            <Drift strength={14}>
              <Image
                src={section.image.src}
                alt={pickLocaleText(section.image.alt, locale)}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="about-grid__image"
              />
            </Drift>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
