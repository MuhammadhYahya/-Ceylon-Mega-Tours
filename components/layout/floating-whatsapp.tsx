import { WHATSAPP_URL } from "@/lib/contact";
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
      href={WHATSAPP_URL}
      className="floating-whatsapp"
      target="_blank"
      rel="noreferrer"
      aria-label={pickLocaleText(label, locale)}
    >
      <span className="floating-whatsapp__pulse" aria-hidden="true" />
      <span className="floating-whatsapp__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .15 5.35.15 11.92c0 2.1.55 4.14 1.6 5.94L0 24l6.34-1.66a11.8 11.8 0 0 0 5.72 1.46h.01c6.56 0 11.91-5.35 11.92-11.92a11.8 11.8 0 0 0-3.47-8.4Zm-8.45 18.3h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.76.99 1-3.66-.23-.38a9.84 9.84 0 0 1-1.51-5.23C2.21 6.43 6.58 2.06 12.06 2.06a9.8 9.8 0 0 1 6.99 2.9 9.8 9.8 0 0 1 2.88 6.98c0 5.48-4.38 9.84-9.86 9.84Zm5.39-7.37c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </span>
      <span className="floating-whatsapp__text">{pickLocaleText(label, locale)}</span>
    </a>
  );
}
