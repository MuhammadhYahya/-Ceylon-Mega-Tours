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
  whatsappHref: string;
};

export function HeroSection({ locale, hero, whatsappHref }: HeroSectionProps) {
  const statLabels =
    locale === "en"
      ? [
          { value: "Private", label: "Travel style" },
          { value: "RU Focus", label: "Guest support" },
          { value: "Islandwide", label: "Coverage" }
        ]
      : [
          { value: "Частно", label: "Формат" },
          { value: "RU Focus", label: "Поддержка" },
          { value: "По острову", label: "Покрытие" }
        ];

  return (
    <section id="home" className="hero section">
      <div className="container hero__layout">
        <Reveal className="hero__content">
          <p className="eyebrow">{pickLocaleText(hero.eyebrow, locale)}</p>
          <h1 className="hero__title">{pickLocaleText(hero.title, locale)}</h1>
          <p className="hero__description">{pickLocaleText(hero.description, locale)}</p>

          <div className="button-row">
            <a href={whatsappHref} className="button-primary" target="_blank" rel="noreferrer">
              {pickLocaleText(hero.primaryCta, locale)}
            </a>
            <a href="#packages" className="button-secondary">
              {pickLocaleText(hero.secondaryCta, locale)}
            </a>
          </div>

          <div className="hero__highlights">
            {hero.highlights.map((item) => (
              <span key={item.en} className="hero__highlight">
                {pickLocaleText(item, locale)}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero__media">
            <Drift strength={14}>
              <Image
                src={hero.image.src}
                alt={pickLocaleText(hero.image.alt, locale)}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 52vw"
                className="hero__image"
              />
            </Drift>
            <div className="hero__overlay" />
            <div className="hero__trust-card glass-panel">
              <p className="hero__trust-label">
                {locale === "en" ? "Designed for ease" : "Продумано для комфорта"}
              </p>
              <p className="hero__trust-copy">
                {locale === "en"
                  ? "Private routes, airport support, and calm pacing for guests who want confidence before they arrive."
                  : "Частные маршруты, поддержка с аэропортом и спокойный ритм для гостей, которым важна уверенность еще до прилета."}
              </p>

              <div className="hero__stats">
                {statLabels.map((item) => (
                  <div key={item.label} className="hero__stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
