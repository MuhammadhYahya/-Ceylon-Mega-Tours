import "./homepage-skeleton.css";

function SkeletonCard() {
  return (
    <div className="homepage-skeleton__card">
      <div className="homepage-skeleton__image skeleton" />
      <div className="homepage-skeleton__line skeleton" />
      <div className="homepage-skeleton__line homepage-skeleton__line--short skeleton" />
      <div className="homepage-skeleton__line homepage-skeleton__line--small skeleton" />
    </div>
  );
}

export function HomepageSkeleton() {
  return (
    <main className="page-shell">
      <div className="container homepage-skeleton__header skeleton" />
      <section className="section">
        <div className="container homepage-skeleton__hero">
          <div className="homepage-skeleton__hero-copy">
            <div className="homepage-skeleton__eyebrow skeleton" />
            <div className="homepage-skeleton__title skeleton" />
            <div className="homepage-skeleton__title homepage-skeleton__title--second skeleton" />
            <div className="homepage-skeleton__paragraph skeleton" />
            <div className="homepage-skeleton__paragraph homepage-skeleton__paragraph--short skeleton" />
            <div className="homepage-skeleton__buttons">
              <div className="homepage-skeleton__button skeleton" />
              <div className="homepage-skeleton__button skeleton" />
            </div>
          </div>
          <div className="homepage-skeleton__hero-media skeleton" />
        </div>
      </section>
      <section className="section">
        <div className="container homepage-skeleton__band">
          <div className="homepage-skeleton__band-card skeleton" />
          <div className="homepage-skeleton__band-card skeleton" />
          <div className="homepage-skeleton__band-card skeleton" />
        </div>
      </section>
      <section className="section">
        <div className="container homepage-skeleton__section-head">
          <div className="homepage-skeleton__eyebrow skeleton" />
          <div className="homepage-skeleton__section-title skeleton" />
          <div className="homepage-skeleton__paragraph skeleton" />
        </div>
        <div className="container homepage-skeleton__grid">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
      <section className="section">
        <div className="container homepage-skeleton__inquiry">
          <div className="homepage-skeleton__inquiry-copy skeleton" />
          <div className="homepage-skeleton__form skeleton" />
        </div>
      </section>
    </main>
  );
}
