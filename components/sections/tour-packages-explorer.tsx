"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useDeferredValue, useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { pickLocaleText } from "@/lib/copy";
import { DEFAULT_TOUR_CATEGORY_META, TOUR_CATEGORY_META } from "@/lib/tour-catalog";
import type { Locale } from "@/lib/i18n";
import type { HomepageData, TourPackageCard, TourPackageCategory } from "@/lib/types";
import "./tour-packages-explorer.css";

type TourPackagesExplorerProps = {
  locale: Locale;
  copy: HomepageData["tourPackages"];
  items: TourPackageCard[];
};

const categoryOrder: Array<TourPackageCategory | "all"> = [
  "all",
  "adventure",
  "wildlife",
  "cultural",
  "coastal",
  "hills",
  "multiday"
];

export function TourPackagesExplorer({ locale, copy, items }: TourPackagesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<TourPackageCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [durationFilter, setDurationFilter] = useState<"all" | "day" | "multi">("all");
  const deferredQuery = useDeferredValue(searchQuery);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: items.length };

    for (const item of items) {
      if (item.category) {
        result[item.category] = (result[item.category] || 0) + 1;
      }
    }

    return result;
  }, [items]);

  const filtered = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase();

    return items.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      if (durationFilter === "day" && (item.durationDays || 1) > 1) {
        return false;
      }

      if (durationFilter === "multi" && (item.durationDays || 1) === 1) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = [
        pickLocaleText(item.title, locale),
        pickLocaleText(item.summary, locale),
        item.location ? pickLocaleText(item.location, locale) : "",
        item.badge ? pickLocaleText(item.badge, locale) : ""
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [activeCategory, deferredQuery, durationFilter, items, locale]);

  const totalExperiences = items.filter((item) => item.durationDays === 1).length;
  const totalUnesco = items.filter((item) =>
    (item.badge ? pickLocaleText(item.badge, locale) : "").toLowerCase().includes("unesco")
  ).length;

  const introLabel = locale === "en" ? "Curated Tours" : "Подборка туров";
  const searchPlaceholder =
    locale === "en"
      ? "Search tours, destinations, and experiences"
      : "Поиск туров, направлений и впечатлений";
  const anyLengthLabel = locale === "en" ? "Any length" : "Любая длительность";
  const dayToursLabel = locale === "en" ? "Day tours" : "Однодневные";
  const multiToursLabel = locale === "en" ? "Multi-day" : "Многодневные";
  const guidesNote =
    locale === "en"
      ? "Russian-speaking guides available across the collection"
      : "Русскоязычное сопровождение доступно для всех туров";
  const noResultsTitle = locale === "en" ? "No tours found" : "Туры не найдены";
  const noResultsBody =
    locale === "en"
      ? "Try adjusting your filters or search term."
      : "Попробуйте изменить фильтры или поисковый запрос.";
  const resetLabel = locale === "en" ? "Reset all filters" : "Сбросить фильтры";
  const openLabel = locale === "en" ? "Open journey" : "Открыть тур";
  const journeysLabel = locale === "en" ? "Journeys" : "Туры";
  const dayEscapesLabel = locale === "en" ? "Day Escapes" : "Однодневные";
  const unescoLabel = locale === "en" ? "UNESCO Routes" : "Маршруты ЮНЕСКО";
  const guidingLabel = locale === "en" ? "Guiding" : "Сопровождение";
  const matchedLabel = locale === "en" ? "journeys matched" : "туров найдено";
  const allToursLabel = locale === "en" ? "All Tours" : "Все туры";

  const categoryFilterLabel = locale === "en" ? "Category" : "Категория";
  const durationFilterLabel = locale === "en" ? "Trip Length" : "Длительность";

  return (
    <div className="tour-explorer">
      <section className="tour-explorer__hero">
        <div className="container">
          <Reveal className="tour-explorer__hero-panel">
            <p className="tour-explorer__eyebrow">{introLabel}</p>
            <h1 className="tour-explorer__title">{pickLocaleText(copy.pageHeading, locale)}</h1>
            <p className="tour-explorer__summary">{pickLocaleText(copy.pageIntro, locale)}</p>

            <div className="tour-explorer__stats">
              <div className="tour-explorer__stat">
                <strong>{items.length}</strong>
                <span>{journeysLabel}</span>
              </div>
              <div className="tour-explorer__stat">
                <strong>{totalExperiences}</strong>
                <span>{dayEscapesLabel}</span>
              </div>
              <div className="tour-explorer__stat">
                <strong>{totalUnesco}</strong>
                <span>{unescoLabel}</span>
              </div>
              <div className="tour-explorer__stat">
                <strong>RU / EN</strong>
                <span>{guidingLabel}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="tour-explorer__filters">
        <div className="container tour-explorer__filters-shell">
          <div className="tour-explorer__search">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </div>

          <div className="tour-explorer__mobile-filters">
            <div className="tour-explorer__mobile-field">
              <label htmlFor="tour-category-filter" className="tour-explorer__mobile-label">
                {categoryFilterLabel}
              </label>
              <select
                id="tour-category-filter"
                value={activeCategory}
                onChange={(event) =>
                  setActiveCategory(event.target.value as TourPackageCategory | "all")
                }
                aria-label={categoryFilterLabel}
              >
                {categoryOrder.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? allToursLabel
                      : pickLocaleText(TOUR_CATEGORY_META[category].label, locale)}
                  </option>
                ))}
              </select>
            </div>

            <div className="tour-explorer__mobile-field">
              <label htmlFor="tour-duration-filter" className="tour-explorer__mobile-label">
                {durationFilterLabel}
              </label>
              <select
                id="tour-duration-filter"
                value={durationFilter}
                onChange={(event) =>
                  setDurationFilter(event.target.value as "all" | "day" | "multi")
                }
                aria-label={durationFilterLabel}
              >
                <option value="all">{anyLengthLabel}</option>
                <option value="day">{dayToursLabel}</option>
                <option value="multi">{multiToursLabel}</option>
              </select>
            </div>
          </div>

          <div className="tour-explorer__chip-row">
            {categoryOrder.map((category) => {
              const isActive = category === activeCategory;
              const label =
                category === "all"
                  ? allToursLabel
                  : pickLocaleText(TOUR_CATEGORY_META[category].label, locale);
              const color = category === "all" ? "#17363b" : TOUR_CATEGORY_META[category].color;

              return (
                <button
                  key={category}
                  type="button"
                  className={`tour-explorer__chip ${isActive ? "is-active" : ""}`}
                  style={isActive ? ({ "--chip-color": color } as CSSProperties) : undefined}
                  onClick={() => setActiveCategory(category)}
                >
                  <span>{label}</span>
                  <small>{counts[category] ?? 0}</small>
                </button>
              );
            })}
          </div>

          <div className="tour-explorer__duration-row">
            {([
              ["all", anyLengthLabel],
              ["day", dayToursLabel],
              ["multi", multiToursLabel]
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={durationFilter === value ? "is-active" : ""}
                onClick={() => setDurationFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tour-explorer__results-meta">
            <p>
              <strong>{filtered.length}</strong> {matchedLabel}
            </p>
            <span>{guidesNote}</span>
          </div>

          {filtered.length ? (
            <div className="tour-explorer__grid">
              {filtered.map((item, index) => {
                const categoryMeta = item.category
                  ? TOUR_CATEGORY_META[item.category]
                  : DEFAULT_TOUR_CATEGORY_META;

                return (
                  <Reveal key={item.slug} delay={index * 40}>
                    <Link
                      href={`/${locale}/tour-packages/${item.slug}`}
                      className="tour-explorer__card"
                    >
                      <div
                        className="tour-explorer__card-media"
                        style={
                          {
                            "--tour-accent": categoryMeta.color,
                            "--tour-accent-soft": categoryMeta.softColor
                          } as CSSProperties
                        }
                      >
                        <Image
                          src={item.image.src}
                          alt={pickLocaleText(item.image.alt, locale)}
                          fill
                          sizes="(max-width: 699px) 100vw, (max-width: 1319px) 50vw, 25vw"
                          className="tour-explorer__card-image"
                        />
                        <div className="tour-explorer__card-overlay" />
                        <div className="tour-explorer__pill-row">
                          <span className="tour-explorer__pill">
                            {pickLocaleText(item.duration, locale)}
                          </span>
                          {item.badge ? (
                            <span className="tour-explorer__pill tour-explorer__pill--accent">
                              {pickLocaleText(item.badge, locale)}
                            </span>
                          ) : null}
                        </div>
                        <div className="tour-explorer__card-copy">
                          <p>{pickLocaleText(categoryMeta.label, locale)}</p>
                          <h2>{pickLocaleText(item.title, locale)}</h2>
                        </div>
                      </div>

                      <div className="tour-explorer__card-body">
                        <p className="tour-explorer__card-summary">
                          {pickLocaleText(item.summary, locale)}
                        </p>

                        <div className="tour-explorer__card-meta">
                          <span>{item.location ? pickLocaleText(item.location, locale) : ""}</span>
                          <span>
                            {item.difficulty
                              ? locale === "en"
                                ? item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)
                                : item.difficulty === "easy"
                                  ? "Легкий"
                                  : item.difficulty === "moderate"
                                    ? "Средний"
                                    : "Активный"
                              : ""}
                          </span>
                        </div>

                        <span className="tour-explorer__card-link">{openLabel}</span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal className="tour-explorer__empty">
              <h2>{noResultsTitle}</h2>
              <p>{noResultsBody}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                  setDurationFilter("all");
                }}
              >
                {resetLabel}
              </button>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
