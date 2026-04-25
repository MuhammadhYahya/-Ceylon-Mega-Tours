import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell section">
      <div className="container page-intro">
        <p className="eyebrow">404</p>
        <h1 className="page-intro__title">Page not found</h1>
        <p className="page-intro__copy">
          The page you requested is not available. You can continue from either homepage below.
        </p>
        <div className="button-row">
          <Link href="/en" className="button-primary">
            English home
          </Link>
          <Link href="/ru" className="button-secondary">
            Русская главная
          </Link>
        </div>
      </div>
    </main>
  );
}
