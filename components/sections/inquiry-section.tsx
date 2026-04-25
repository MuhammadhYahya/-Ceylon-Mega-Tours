"use client";

import { useCallback, useState } from "react";
// import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { HomepageData, InquiryFormPayload } from "@/lib/types";
import "./inquiry-section.css";

type InquiryState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialForm: InquiryFormPayload = {
  name: "",
  contact: "",
  email: "",
  arrivalDate: "",
  groupSize: "",
  serviceType: "",
  message: "",
  company: "",
  turnstileToken: ""
};

export function InquirySection({
  locale,
  section
}: {
  locale: Locale;
  section: HomepageData["inquiry"];
}) {
  // const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<InquiryState>({ status: "idle", message: "" });
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const invalidFieldsMessage =
    locale === "en"
      ? "Please complete the required fields."
      : "Пожалуйста, заполните обязательные поля.";
  const invalidEmailMessage =
    locale === "en"
      ? "Please enter a valid email address."
      : "Пожалуйста, введите корректный адрес электронной почты.";
  const invalidCaptchaMessage =
    locale === "en"
      ? "Please confirm you are human and try again."
      : "Подтвердите, что вы не робот, и попробуйте снова.";
  const rateLimitMessage =
    locale === "en"
      ? "Too many inquiries. Please wait a few minutes and try again."
      : "Слишком много запросов. Пожалуйста, подождите несколько минут.";
  const sendingLabel = locale === "en" ? "Sending..." : "Отправка...";
  const humanLabel = locale === "en" ? "Spam protection" : "Защита от спама";

  // const handleTurnstileChange = useCallback((token: string) => {
  //   setForm((current) => ({ ...current, turnstileToken: token }));
  // }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // if (turnstileSiteKey && !form.turnstileToken) {
    //   setState({ status: "error", message: invalidCaptchaMessage });
    //   return;
    // }

    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;

        setState({
          status: "error",
          message:
            response.status >= 500
              ? pickLocaleText(section.errorMessage, locale)
              : response.status === 429
                ? rateLimitMessage
                : data?.message === "Please confirm you are human and try again."
                  ? invalidCaptchaMessage
                  : data?.message === "Please enter a valid email address."
                    ? invalidEmailMessage
                    : invalidFieldsMessage
        });
        return;
      }

      setState({
        status: "success",
        message: pickLocaleText(section.successMessage, locale)
      });
      setForm(initialForm);
      setTurnstileResetKey((value) => value + 1);
    } catch {
      setState({
        status: "error",
        message: pickLocaleText(section.errorMessage, locale)
      });
    }
  }

  function updateField<K extends keyof InquiryFormPayload>(
    field: K,
    value: InquiryFormPayload[K]
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <section id="inquiry" className="section">
      <Reveal className="container inquiry-section">
        <div className="inquiry-section__lead">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>

          <div className="inquiry-section__notes">
            {section.contactNotes.map((note) => (
              <div key={note.en} className="inquiry-section__note">
                {pickLocaleText(note, locale)}
              </div>
            ))}
          </div>

          <a
            href={section.whatsappHref}
            className="button-primary inquiry-section__whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            {pickLocaleText(section.whatsappLabel, locale)}
          </a>
        </div>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label>
            <span>{pickLocaleText(section.labels.name, locale)}</span>
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </label>

          <label>
            <span>{pickLocaleText(section.labels.contact, locale)}</span>
            <input
              required
              minLength={5}
              value={form.contact}
              onChange={(event) => updateField("contact", event.target.value)}
            />
          </label>

          <label>
            <span>{pickLocaleText(section.labels.email, locale)}</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </label>

          <label>
            <span>{pickLocaleText(section.labels.arrivalDate, locale)}</span>
            <input
              type="date"
              required
              value={form.arrivalDate}
              onChange={(event) => updateField("arrivalDate", event.target.value)}
            />
          </label>

          <label>
            <span>{pickLocaleText(section.labels.groupSize, locale)}</span>
            <input
              required
              value={form.groupSize}
              onChange={(event) => updateField("groupSize", event.target.value)}
            />
          </label>

          <label>
            <span>{pickLocaleText(section.labels.serviceType, locale)}</span>
            <select
              required
              value={form.serviceType}
              onChange={(event) => updateField("serviceType", event.target.value)}
            >
              <option value="" disabled>
                {pickLocaleText(section.labels.serviceType, locale)}
              </option>
              {section.serviceOptions.map((option) => (
                <option key={option.en} value={pickLocaleText(option, locale)}>
                  {pickLocaleText(option, locale)}
                </option>
              ))}
            </select>
          </label>

          <label className="inquiry-form__full">
            <span>{pickLocaleText(section.labels.message, locale)}</span>
            <textarea
              rows={5}
              required
              minLength={10}
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

          <div className="inquiry-form__actions">
            <button type="submit" className="button-primary" disabled={state.status === "loading"}>
              {state.status === "loading" ? sendingLabel : pickLocaleText(section.submitLabel, locale)}
            </button>

            {state.message && state.status !== "loading" ? (
              <p
                className={`inquiry-form__message inquiry-form__message--${state.status}`}
                aria-live="polite"
              >
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
