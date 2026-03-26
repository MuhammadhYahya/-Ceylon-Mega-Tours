import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./value-section.css";

export function ValueSection({
  section,
  locale = "en"
}: {
  section: HomepageData["whyChooseUs"];
  locale?: Locale;
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
        </Reveal>
        <div className="value-grid">
          {section.points.map((point, index) => (
            <Reveal key={point.id} delay={index * 70}>
              <article className="value-grid__card">
                <span className="value-grid__index" />
                <h3>{pickLocaleText(point.title, locale)}</h3>
                <p>{pickLocaleText(point.description, locale)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
