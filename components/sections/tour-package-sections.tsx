import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { pickLocalizedParagraphs } from "@/lib/tour-packages";
import type { TourPackageSection } from "@/lib/types";
import "./tour-package-sections.css";

type TourPackageSectionsProps = {
  locale: Locale;
  sections: TourPackageSection[];
};

function getSectionItemsLabel(type: TourPackageSection["_type"], locale: Locale) {
  switch (type) {
    case "highlightsSection":
      return locale === "en" ? "Highlights" : "Highlights";
    case "includesSection":
      return locale === "en" ? "Included" : "Included";
    case "excludesSection":
      return locale === "en" ? "Not Included" : "Not Included";
    case "idealForSection":
      return locale === "en" ? "Ideal For" : "Ideal For";
    default:
      return "";
  }
}

export function TourPackageSections({ locale, sections }: TourPackageSectionsProps) {
  return (
    <div className="tour-detail-sections">
      {sections.map((section, index) => {
        if (section._type === "richTextSection") {
          return (
            <section key={`${section._type}-${index}`} className="tour-detail-panel">
              {section.title ? (
                <h2 className="tour-detail-panel__heading">
                  {pickLocaleText(section.title, locale)}
                </h2>
              ) : null}
              <div className="tour-detail-richtext">
                {pickLocalizedParagraphs(section.body, locale).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          );
        }

        if (section._type === "placesSection") {
          return (
            <section key={`${section._type}-${index}`} className="tour-detail-panel">
              <h2 className="tour-detail-panel__heading">
                {section.title
                  ? pickLocaleText(section.title, locale)
                  : locale === "en"
                    ? "Itinerary"
                    : "Itinerary"}
              </h2>

              <div className="tour-detail-timeline">
                {section.items.map((item, itemIndex) => (
                  <article
                    key={`${item.place.en}-${item.place.ru}-${itemIndex}`}
                    className="tour-detail-timeline__item"
                  >
                    <span className="tour-detail-timeline__index">{itemIndex + 1}</span>
                    <div className="tour-detail-timeline__copy">
                      <h3>{pickLocaleText(item.place, locale)}</h3>
                      {item.description ? (
                        <div className="tour-detail-timeline__body">
                          {pickLocalizedParagraphs(item.description, locale).map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        }

        if (section._type === "accommodationSection") {
          return (
            <section key={`${section._type}-${index}`} className="tour-detail-panel">
              <h2 className="tour-detail-panel__heading">
                {section.title
                  ? pickLocaleText(section.title, locale)
                  : locale === "en"
                    ? "Accommodation"
                    : "Accommodation"}
              </h2>

              <div className="tour-detail-grid">
                {section.items.map((item, itemIndex) => (
                  <article
                    key={`${item.hotel.en}-${item.hotel.ru}-${itemIndex}`}
                    className="tour-detail-item-card"
                  >
                    <h3>{pickLocaleText(item.hotel, locale)}</h3>
                    {item.description ? (
                      <div className="tour-detail-item-card__body">
                        {pickLocalizedParagraphs(item.description, locale).map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          );
        }

        return (
          <section key={`${section._type}-${index}`} className="tour-detail-panel">
            <h2 className="tour-detail-panel__heading">
              {section.title
                ? pickLocaleText(section.title, locale)
                : getSectionItemsLabel(section._type, locale)}
            </h2>

            <div className="tour-detail-grid">
              {section.items.map((item, itemIndex) => (
                <article
                  key={`${item.title.en}-${item.title.ru}-${itemIndex}`}
                  className="tour-detail-item-card"
                >
                  <p className="tour-detail-item-card__eyebrow">
                    {getSectionItemsLabel(section._type, locale)}
                  </p>
                  <h3>{pickLocaleText(item.title, locale)}</h3>
                  {item.description ? (
                    <div className="tour-detail-item-card__body">
                      {pickLocalizedParagraphs(item.description, locale).map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
