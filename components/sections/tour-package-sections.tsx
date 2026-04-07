import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { pickLocalizedParagraphs } from "@/lib/tour-packages";
import type { TourPackageAccommodation, TourPackagePlace, TourPackageSection } from "@/lib/types";

type TourPackageSectionsProps = {
  locale: Locale;
  sections: TourPackageSection[];
};

function getDefaultSectionTitle(type: TourPackageSection["_type"], locale: Locale) {
  switch (type) {
    case "placesSection":
      return locale === "en" ? "Itinerary" : "Marshrut";
    case "accommodationSection":
      return locale === "en" ? "Accommodation" : "Prozhivanie";
  }
}

function groupTourPackageSections(sections: TourPackageSection[]) {
  const placeSections = sections.filter(
    (section): section is Extract<TourPackageSection, { _type: "placesSection" }> =>
      section._type === "placesSection"
  );
  const accommodationSections = sections.filter(
    (section): section is Extract<TourPackageSection, { _type: "accommodationSection" }> =>
      section._type === "accommodationSection"
  );

  return {
    placeTitle: placeSections.find((section) => section.title)?.title,
    placeItems: placeSections.flatMap((section) => section.items),
    accommodationTitle: accommodationSections.find((section) => section.title)?.title,
    accommodationItems: accommodationSections.flatMap((section) => section.items)
  };
}

function TimelineItem({
  item,
  index,
  total,
  locale
}: {
  item: TourPackagePlace;
  index: number;
  total: number;
  locale: Locale;
}) {
  return (
    <article className="package-detail__timeline-item">
      <div
        className={
          index === total - 1
            ? "package-detail__timeline-rail package-detail__timeline-rail--last"
            : "package-detail__timeline-rail"
        }
        aria-hidden="true"
      >
        <span className="package-detail__timeline-number">{index + 1}</span>
        {index < total - 1 ? <span className="package-detail__timeline-line" /> : null}
      </div>

      <div
        className={
          item.image
            ? "package-detail__timeline-card"
            : "package-detail__timeline-card package-detail__timeline-card--without-media"
        }
      >
        {item.image ? (
          <div className="package-detail__timeline-media">
            <Image
              src={item.image.src}
              alt={pickLocaleText(item.image.alt, locale)}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1200px) 70vw, 34rem"
              className="package-detail__timeline-image"
            />
            <div className="package-detail__timeline-overlay" />
          </div>
        ) : null}

        <div className="package-detail__timeline-copy">
          <p className="package-detail__timeline-kicker">
            {locale === "en" ? "Place / Stop" : "Mesto / ostanovka"}
          </p>
          <h3 className="package-detail__timeline-title">{pickLocaleText(item.place, locale)}</h3>
          {item.description ? (
            <div className="package-detail__timeline-body">
              {pickLocalizedParagraphs(item.description, locale).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function AccommodationCard({
  item,
  locale,
  clone = false
}: {
  item: TourPackageAccommodation;
  locale: Locale;
  clone?: boolean;
}) {
  return (
    <article
      className={
        item.image
          ? "package-detail__stay-card"
          : "package-detail__stay-card package-detail__stay-card--without-media"
      }
      aria-hidden={clone ? "true" : undefined}
    >
      {item.image ? (
        <div className="package-detail__stay-media">
          <Image
            src={item.image.src}
            alt={pickLocaleText(item.image.alt, locale)}
            fill
            sizes="(max-width: 700px) 85vw, 24rem"
            className="package-detail__stay-image"
          />
        </div>
      ) : null}
      <div className="package-detail__stay-copy">
        <p className="package-detail__stay-kicker">
          {locale === "en" ? "Stay highlight" : "Vash otel"}
        </p>
        <h3 className="package-detail__stay-title">{pickLocaleText(item.hotel, locale)}</h3>
        {item.description ? (
          <div className="package-detail__stay-body">
            {pickLocalizedParagraphs(item.description, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function TourPackageSections({ locale, sections }: TourPackageSectionsProps) {
  const { placeTitle, placeItems, accommodationTitle, accommodationItems } =
    groupTourPackageSections(sections);
  const loopAccommodation = accommodationItems.length > 1;

  return (
    <div className="package-detail__sections">
      {placeItems.length ? (
        <Reveal className="package-detail__panel package-detail__panel--timeline">
          <div className="package-detail__panel-heading">
            <h2 className="package-detail__panel-title">
              {placeTitle
                ? pickLocaleText(placeTitle, locale)
                : getDefaultSectionTitle("placesSection", locale)}
            </h2>
          </div>

          <div className="package-detail__timeline">
            {placeItems.map((item, index) => (
              <TimelineItem
                key={`${item.place.en}-${item.place.ru}-${index}`}
                item={item}
                index={index}
                total={placeItems.length}
                locale={locale}
              />
            ))}
          </div>
        </Reveal>
      ) : null}

      {accommodationItems.length ? (
        <Reveal delay={120} className="package-detail__panel package-detail__panel--stay">
          <div className="package-detail__panel-heading">
            <h2 className="package-detail__panel-title">
              {accommodationTitle
                ? pickLocaleText(accommodationTitle, locale)
                : getDefaultSectionTitle("accommodationSection", locale)}
            </h2>
          </div>

          <div className="package-detail__stay-belt">
            <div
              className={
                loopAccommodation
                  ? "package-detail__stay-track package-detail__stay-track--animated"
                  : "package-detail__stay-track"
              }
            >
              {accommodationItems.map((item, index) => (
                <AccommodationCard
                  key={`${item.hotel.en}-${item.hotel.ru}-${index}`}
                  item={item}
                  locale={locale}
                />
              ))}
              {loopAccommodation
                ? accommodationItems.map((item, index) => (
                    <AccommodationCard
                      key={`${item.hotel.en}-${item.hotel.ru}-clone-${index}`}
                      item={item}
                      locale={locale}
                      clone
                    />
                  ))
                : null}
            </div>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
