import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./testimonials-section.css";

export function TestimonialsSection({
  section,
  locale = "en"
}: {
  section: HomepageData["testimonials"];
  locale?: Locale;
}) {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
        </Reveal>
        <div className="testimonials-grid">
          {section.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <article className="testimonials-grid__card">
                <p className="testimonials-grid__quote">“{pickLocaleText(item.quote, locale)}”</p>
                <div className="testimonials-grid__meta">
                  <strong>{item.name}</strong>
                  <span>{pickLocaleText(item.location, locale)}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
