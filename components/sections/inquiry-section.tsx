"use client";

import { useState } from "react";
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
  company: ""
};

export function InquirySection({
  locale,
  section
}: {
  locale: Locale;
  section: HomepageData["inquiry"];
}) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<InquiryState>({ status: "idle", message: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || pickLocaleText(section.errorMessage, locale));
      }

      setState({
        status: "success",
        message: result.message || pickLocaleText(section.successMessage, locale)
      });
      setForm(initialForm);
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : pickLocaleText(section.errorMessage, locale)
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
      <Reveal className="container inquiry-grid">
        <div className="inquiry-grid__lead">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
          <div className="inquiry-grid__notes">
            {section.contactNotes.map((note) => (
              <div key={note.en} className="inquiry-grid__note">
                {pickLocaleText(note, locale)}
              </div>
            ))}
          </div>
          <a
            href={section.whatsappHref}
            className="button-primary inquiry-grid__whatsapp"
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
              {state.status === "loading"
                ? locale === "en"
                  ? "Sending..."
                  : "Отправка..."
                : pickLocaleText(section.submitLabel, locale)}
            </button>
            {state.message ? (
              <p className={`inquiry-form__message inquiry-form__message--${state.status}`}>
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      </Reveal>
    </section>
  );
}
