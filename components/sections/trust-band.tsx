import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { TrustPoint } from "@/lib/types";
import "./trust-band.css";

export function TrustBand({
  items,
  locale = "en"
}: {
  items: TrustPoint[];
  locale?: Locale;
}) {
  return (
    <section className="section">
      <div className="container trust-band">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 70}>
            <article className="trust-band__card">
              <h2>{pickLocaleText(item.title, locale)}</h2>
              <p>{pickLocaleText(item.description, locale)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
