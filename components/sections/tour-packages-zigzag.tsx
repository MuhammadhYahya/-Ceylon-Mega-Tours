import Image from "next/image";
import Link from "next/link";
import { Drift } from "@/components/motion/drift";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import type { ExperienceCard, HomepageData } from "@/lib/types";
import "./tour-packages-zigzag.css";

type TourPackagesZigzagProps = {
  locale: Locale;
  section: HomepageData["tourPackages"];
  items: ExperienceCard[];
};

export function TourPackagesZigzag({
  locale,
  section,
  items
}: TourPackagesZigzagProps) {
  const detailLabel =
    locale === "en" ? "View Package Details" : "Смотреть детали пакета";

  return (
    <section id="tour-packages-list" className="section">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">{pickLocaleText(section.eyebrow, locale)}</p>
          <h2 className="section-heading">{pickLocaleText(section.heading, locale)}</h2>
          <p className="section-intro">{pickLocaleText(section.intro, locale)}</p>
        </Reveal>

        <div className="package-zigzag">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <article
                className={`package-zigzag__row ${index % 2 === 1 ? "is-reversed" : ""}`}
              >
                <div className="package-zigzag__media">
                  <Drift strength={12}>
                    <Image
                      src={item.image.src}
                      alt={pickLocaleText(item.image.alt, locale)}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className="package-zigzag__image"
                    />
                  </Drift>
                </div>

                <div className="package-zigzag__content">
                  <p className="package-zigzag__meta">{pickLocaleText(item.duration, locale)}</p>
                  <h3>{pickLocaleText(item.title, locale)}</h3>
                  <p>{pickLocaleText(item.description, locale)}</p>
                  <Link
                    href={`/${locale}/tour-packages/${item.id}`}
                    className="button-ghost package-zigzag__link"
                  >
                    {detailLabel}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
