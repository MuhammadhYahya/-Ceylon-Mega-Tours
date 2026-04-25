"use client";

import { usePathname, useRouter } from "next/navigation";
import { getOppositeLocale, isLocale, type Locale } from "@/lib/i18n";

type LocaleSwitchProps = {
  locale: Locale;
  className?: string;
};

export function LocaleSwitch({ locale, className }: LocaleSwitchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = getOppositeLocale(locale);

  function handleSwitch() {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      router.push(`/${nextLocale}`);
      return;
    }

    if (isLocale(segments[0])) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    const nextPath = `/${segments.join("/")}`;
    const query = window.location.search;
    const hash = window.location.hash;
    router.push(`${nextPath}${query}${hash}`);
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleSwitch}
      aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
    >
      <span>{locale.toUpperCase()}</span>
      <span className="site-header__locale-separator">/</span>
      <span>{nextLocale.toUpperCase()}</span>
    </button>
  );
}
