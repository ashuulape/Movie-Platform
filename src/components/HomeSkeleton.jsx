import React, { useEffect, useState } from "react";

const HomeSkeleton = () => {
  const [ismobile, setismobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setismobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const skeletonCards = Array.from({ length: ismobile ? 6 : 18 });

  return (
    <section className="catalog-loading" aria-label="Loading titles" aria-busy="true">
      <div className="movie-grid movie-grid--loading">
        {skeletonCards.map((_, index) => (
          <div className="movie-skeleton-card" key={index}>
            <div className="movie-skeleton" />
            <div className="movie-skeleton__line" />
            <div className="movie-skeleton__line movie-skeleton__line--short" />
          </div>
        ))}
      </div>
      <p className="loading-label">Loading titles…</p>
    </section>
  );
};

export default HomeSkeleton;
