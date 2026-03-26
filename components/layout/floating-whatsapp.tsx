import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

type FloatingWhatsAppProps = {
  locale: Locale;
};

export function FloatingWhatsApp({ locale }: FloatingWhatsAppProps) {
  const label = {
    en: "WhatsApp",
    ru: "WhatsApp"
  };

  return (
    <a
      href="https://wa.me/94770000000"
      className="floating-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label={pickLocaleText(label, locale)}
    >
      <span className="floating-whatsapp__icon" aria-hidden="true">
        💬
      </span>
      <span className="floating-whatsapp__text">
        {pickLocaleText(label, locale)}
      </span>
    </a>
  );
}
