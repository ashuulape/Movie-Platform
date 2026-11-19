import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";

const SimilarSkeleton = () => {
  const [ismobile, setismobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setismobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className={`similar-skeleton${ismobile ? " similar-skeleton--mobile" : ""}`} aria-hidden="true">
      <div className="movie-skeleton skeleton-poster" />
      <div className="movie-skeleton__line" />
      <div className="movie-skeleton__line movie-skeleton__line--short" />
    </div>
  );
};

const Similar = ({ istv, id }) => {
  const [similardata, setsimilardata] = useState(null);

  useEffect(() => {
    async function fetchsimilar() {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/${istv ? "tv" : "movie"}/similar/${id}`,
      );
      setsimilardata(res?.data?.results);
    }
    fetchsimilar();
  }, []);

  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const amount = isMobile ? scrollRef.current.clientWidth : 352;
      scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
  };

  return (
    <section className="watch-section similar-section">
      <div className="section-header">
        <h2 className="section-title">
          Similar {istv ? "TV shows" : "Movies"}
        </h2>
        <div className="section-actions">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="icon-button"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="icon-button"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="similar-list"
      >
        {similardata === null ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <SimilarSkeleton key={idx} />
          ))
        ) : similardata.length ? (
          similardata.map((e, idx) => <Card key={idx} data={e} />)
        ) : (
          <p className="ui-empty">No similar titles found.</p>
        )}
      </div>
    </section>
  );
};

export default Similar;
