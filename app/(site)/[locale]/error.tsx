"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const isRussian = pathname.startsWith("/ru");

  useEffect(() => {
    console.error("Localized route error", error);
  }, [error]);

  return (
    <main id="main-content" className="page-shell section">
      <div className="container page-intro">
        <p className="eyebrow">{isRussian ? "Ошибка" : "Error"}</p>
        <h1 className="page-intro__title">
          {isRussian ? "Что-то пошло не так." : "Something went wrong."}
        </h1>
        <p className="page-intro__copy">
          {isRussian
            ? "Страница временно недоступна. Попробуйте обновить страницу или вернуться на главную."
            : "This page is temporarily unavailable. Try refreshing it or return to the homepage."}
        </p>
        <div className="button-row">
          <button type="button" className="button-primary" onClick={reset}>
            {isRussian ? "Попробовать снова" : "Try again"}
          </button>
          <Link href={isRussian ? "/ru" : "/en"} className="button-secondary">
            {isRussian ? "На главную" : "Back home"}
          </Link>
        </div>
      </div>
    </main>
  );
}
