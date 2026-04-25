import Image from "next/image";
import Link from "next/link";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./hybrid-showcase-section.css";

type HybridShowcaseSectionProps = {
  locale: Locale;
  section: HomepageData["hybridShowcase"];
};

export function HybridShowcaseSection({
  locale,
  section
}: HybridShowcaseSectionProps) {
  return (
    <section id="explore" className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
        </Reveal>

        <div className="hybrid-grid">
          {section.items.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 70}
              className="hybrid-grid__card"
            >
              <article className={`hybrid-card hybrid-card--${item.kind}`}>
                <div className="hybrid-card__media">
                  <Drift strength={12}>
                    <Image
                      src={item.image.src}
                      alt={pickLocaleText(item.image.alt, locale)}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="hybrid-card__image"
                    />
                  </Drift>
                </div>
                <div className="hybrid-card__body">
                  <p className="hybrid-card__badge">{pickLocaleText(item.badge, locale)}</p>
                  <p className="hybrid-card__meta">{pickLocaleText(item.meta, locale)}</p>
                  <h3>{pickLocaleText(item.title, locale)}</h3>
                  <p>{pickLocaleText(item.description, locale)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180} className="hybrid-grid__actions">
          <Link href={`/${locale}/tour-packages`} className="button-primary">
            {pickLocaleText(section.primaryCta, locale)}
          </Link>
          <Link href="#inquiry" className="button-ghost">
            {pickLocaleText(section.secondaryCta, locale)}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
