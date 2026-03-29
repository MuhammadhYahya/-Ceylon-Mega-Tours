import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData } from "@/lib/types";
import "./testimonials-section.css";

export function TestimonialsSection({
  section,
  locale
}: {
  section: HomepageData["testimonials"];
  locale: Locale;
}) {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
        </Reveal>

        {section.googleReviews ? (
          <Reveal className="testimonials-google">
            <div className="testimonials-google__content">
              <div className="testimonials-google__brand">
                <span className="testimonials-google__icon" aria-hidden="true">
                  G
                </span>
                <div className="testimonials-google__copy">
                  <p className="testimonials-google__label">
                    {pickLocaleText(section.googleReviews.label, locale)}
                  </p>
                  {section.googleReviews.sourceNote ? (
                    <p className="testimonials-google__note">
                      {pickLocaleText(section.googleReviews.sourceNote, locale)}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="testimonials-google__summary">
                <strong className="testimonials-google__score">
                  {section.googleReviews.rating.toFixed(1)}
                </strong>
                <div className="testimonials-google__stars" aria-hidden="true">
                  {"★★★★★"}
                </div>
                <span className="testimonials-google__count">
                  {locale === "en"
                    ? `${section.googleReviews.reviewCount}+ reviews`
                    : `${section.googleReviews.reviewCount}+ отзывов`}
                </span>
              </div>
            </div>

            <a
              href={section.googleReviews.reviewsUrl}
              className="button-secondary testimonials-google__cta"
              target="_blank"
              rel="noreferrer"
            >
              {pickLocaleText(section.googleReviews.ctaLabel, locale)}
            </a>
          </Reveal>
        ) : null}

        <div className="testimonials-grid">
          {section.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <article className="testimonials-card">
                <div className="testimonials-card__rating" aria-label={`${item.rating} out of 5`}>
                  {"★★★★★".slice(0, item.rating)}
                </div>
                <p className="testimonials-card__quote">“{pickLocaleText(item.quote, locale)}”</p>
                <p className="testimonials-card__trip">{pickLocaleText(item.trip, locale)}</p>
                <div className="testimonials-card__meta">
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
