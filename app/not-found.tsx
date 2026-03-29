import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="page-shell section">
      <div className="container page-intro">
        <p className="eyebrow">404</p>
        <h1 className="page-intro__title">Page not found</h1>
        <p className="page-intro__copy">
          The page you requested is not available. You can return to the Russian homepage and
          continue browsing.
        </p>
        <div className="button-row">
          <Link href="/ru" className="button-primary">
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
