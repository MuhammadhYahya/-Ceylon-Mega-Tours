"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { GuestReviewItem, HomepageData, ReviewFormPayload } from "@/lib/types";
import "./testimonials-section.css";

type ReviewFormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialForm: ReviewFormPayload = {
  name: "",
  location: "",
  rating: 5,
  message: "",
  company: ""
};

function stars(rating: number) {
  return Array.from({ length: rating }, () => String.fromCharCode(9733)).join("");
}

function getCopy(locale: Locale) {
  return {
    formTitle: locale === "en" ? "Leave a review" : "Оставить отзыв",
    formIntro:
      locale === "en"
        ? "Share your experience with Ceylon Mega Tours."
        : "Поделитесь своим впечатлением о Ceylon Mega Tours.",
    name: locale === "en" ? "Name" : "Имя",
    location: locale === "en" ? "Location (optional)" : "Город или страна (необязательно)",
    rating: locale === "en" ? "Rating" : "Оценка",
    message: locale === "en" ? "Review" : "Отзыв",
    submit: locale === "en" ? "Submit review" : "Отправить отзыв",
    sending: locale === "en" ? "Submitting..." : "Отправка...",
    success:
      locale === "en"
        ? "Thank you. Your review was submitted successfully and will appear soon."
        : "Спасибо. Ваш отзыв успешно отправлен и скоро появится.",
    error:
      locale === "en"
        ? "Review submission failed. Please try again later."
        : "Не удалось отправить отзыв. Пожалуйста, попробуйте позже.",
    empty:
      locale === "en"
        ? "Guest reviews will appear here after approval."
        : "Отзывы гостей появятся здесь после проверки.",
    approvedTitle: locale === "en" ? "Guest reviews" : "Отзывы гостей"
  };
}

export function TestimonialsSection({
  section,
  locale,
  reviews
}: {
  section: HomepageData["testimonials"];
  locale: Locale;
  reviews: GuestReviewItem[];
}) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<ReviewFormState>({ status: "idle", message: "" });
  const copy = getCopy(locale);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setState({ status: "error", message: data?.message || copy.error });
        return;
      }

      setState({ status: "success", message: copy.success });
      setForm(initialForm);
    } catch {
      setState({ status: "error", message: copy.error });
    }
  }

  function updateField<K extends keyof ReviewFormPayload>(field: K, value: ReviewFormPayload[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

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
                  {stars(5)}
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

        <div className="testimonials-layout">
          <Reveal className="testimonials-review-form">
            <div className="testimonials-review-form__header">
              <h3>{copy.formTitle}</h3>
              <p>{copy.formIntro}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                <span>{copy.name}</span>
                <input
                  required
                  minLength={2}
                  maxLength={80}
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>

              <label>
                <span>{copy.location}</span>
                <input
                  maxLength={90}
                  value={form.location}
                  onChange={(event) => updateField("location", event.target.value)}
                />
              </label>

              <fieldset className="testimonials-rating-field">
                <legend>{copy.rating}</legend>
                <div className="testimonials-rating-stars" role="radiogroup" aria-label={copy.rating}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={
                        rating <= form.rating
                          ? "testimonials-rating-stars__button testimonials-rating-stars__button--active"
                          : "testimonials-rating-stars__button"
                      }
                      role="radio"
                      aria-checked={form.rating === rating}
                      aria-label={`${rating} out of 5`}
                      onClick={() => updateField("rating", rating)}
                    >
                      {String.fromCharCode(9733)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label>
                <span>{copy.message}</span>
                <textarea
                  required
                  rows={5}
                  minLength={10}
                  maxLength={900}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />
              </label>

              <label className="sr-only" aria-hidden="true">
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                />
              </label>

              <div className="testimonials-review-form__actions">
                <button
                  type="submit"
                  className="button-primary"
                  disabled={state.status === "loading"}
                >
                  {state.status === "loading" ? copy.sending : copy.submit}
                </button>

                {state.message && state.status !== "loading" ? (
                  <p
                    className={`testimonials-review-form__message testimonials-review-form__message--${state.status}`}
                    aria-live="polite"
                  >
                    {state.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>

          <Reveal className="testimonials-approved">
            <h3>{copy.approvedTitle}</h3>
            {reviews.length ? (
              <div className="testimonials-grid">
                {reviews.map((item) => (
                  <article className="testimonials-card" key={item.id}>
                    <div
                      className="testimonials-card__rating"
                      aria-label={`${item.rating} out of 5`}
                    >
                      {stars(item.rating)}
                    </div>
                    <p className="testimonials-card__quote">
                      <span aria-hidden="true">&quot;</span>
                      {item.message}
                      <span aria-hidden="true">&quot;</span>
                    </p>
                    <div className="testimonials-card__meta">
                      <strong>{item.name}</strong>
                      {item.location ? <span>{item.location}</span> : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="testimonials-empty">{copy.empty}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
