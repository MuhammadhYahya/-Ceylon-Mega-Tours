import Image from "next/image";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./hero-section.css";

type HeroSectionProps = {
  locale: Locale;
  hero: HomepageData["hero"];
};

export function HeroSection({ locale, hero }: HeroSectionProps) {
  return (
    <section className="hero section">
      <div className="container hero__grid">
        <Reveal className="hero__content">
          <p className="eyebrow">{pickLocaleText(hero.eyebrow, locale)}</p>
          <h1 className="hero__title">{pickLocaleText(hero.title, locale)}</h1>
          <p className="hero__description">{pickLocaleText(hero.description, locale)}</p>
          <div className="button-row">
            <a href="#inquiry" className="button-primary">
              {pickLocaleText(hero.primaryCta, locale)}
            </a>
            <a href="https://wa.me/94770000000" className="button-secondary">
              {pickLocaleText(hero.secondaryCta, locale)}
            </a>
          </div>
          <div className="hero__highlights">
            {hero.highlights.map((item) => (
              <div key={item.en} className="hero__highlight glass-panel">
                {pickLocaleText(item, locale)}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero__media">
            <Drift strength={16}>
              <Image
                src={hero.image.src}
                alt={pickLocaleText(hero.image.alt, locale)}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hero__image"
              />
            </Drift>
            <div className="hero__overlay" />
            <div className="hero__card glass-panel">
              <p className="hero__card-label">
                {locale === "en" ? "Private island care" : "Частный сервис по острову"}
              </p>
              <p className="hero__card-copy">
                {locale === "en"
                  ? "Curated arrivals, tailored touring, and elegant transport in one seamless journey."
                  : "Продуманные встречи, индивидуальные маршруты и элегантный транспорт в одном цельном путешествии."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
