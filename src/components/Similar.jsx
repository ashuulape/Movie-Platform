import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";

/* ─── Skeleton shimmer styles (injected once) ─── */
const skeletonStyles = `
  @keyframes shimmer {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
  }
  .skeleton-shimmer {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.10) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size: 700px 100%;
    animation: shimmer 1.6s infinite linear;
    border-radius: 6px;
  }
`;

/* ─── Single skeleton card — matches Card.jsx layout ─── */
const SimilarSkeleton = () => {
  const [ismobile, setismobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setismobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Mobile: horizontal row (backdrop + text) ── */
  if (ismobile) {
    return (
      <div className="relative px-2 py-4 w-full min-w-full rounded-sm aspect-video flex flex-row gap-2 flex-1 overflow-hidden bg-white/5">
        {/* Poster */}
        <div className="skeleton-shimmer h-full aspect-[2/3] rounded-sm" />
        {/* Text block */}
        <div className="flex flex-col gap-3 flex-1 py-4 justify-start">
          <div className="skeleton-shimmer h-5 w-3/4 ml-auto rounded" />
          <div className="flex gap-1 justify-end flex-wrap">
            <div className="skeleton-shimmer h-3 w-10 rounded" />
            <div className="skeleton-shimmer h-3 w-12 rounded" />
            <div className="skeleton-shimmer h-3 w-8  rounded" />
          </div>
          <div className="skeleton-shimmer h-3 w-1/3 ml-auto rounded" />
          <div className="skeleton-shimmer h-3 w-full rounded" />
          <div className="skeleton-shimmer h-3 w-5/6 rounded" />
          <div className="skeleton-shimmer h-3 w-4/6 rounded" />
        </div>
      </div>
    );
  }

  /* ── Desktop: vertical poster card ── */
  return (
    <div className="max-w-100 relative w-80 min-w-60 h-fit flex flex-col overflow-hidden rounded-sm bg-white/5">
      {/* Poster */}
      <div className="skeleton-shimmer w-full aspect-[2/3] rounded-sm" />
      {/* Title */}
      <div className="skeleton-shimmer h-4 w-3/4 mt-3 mx-2 rounded" />
      {/* Date */}
      <div className="skeleton-shimmer h-3 w-1/3 mt-2 mb-3 mx-2 rounded" />
    </div>
  );
};

/* ─── Similar component ─── */
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
    <section className="w-full h-fit py-8 flex flex-col gap-6 px-2 md:px-8 items-center">
      {/* Inject shimmer keyframes once */}
      <style>{skeletonStyles}</style>

      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold">
          Similar {istv ? "Tv shows" : "Movies"} You Might like
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur flex items-center justify-center transition-colors duration-200 border border-white/20"
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
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur flex items-center justify-center transition-colors duration-200 border border-white/20"
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
        className="w-full h-fit flex gap-10 overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-thin scrollbar-thumb-red-900"
      >
        {/* Show skeletons while loading, real cards once data arrives */}
        {similardata
          ? similardata.map((e, idx) => <Card key={idx} data={e} />)
          : Array.from({ length: 6 }).map((_, idx) => (
              <SimilarSkeleton key={idx} />
            ))}
      </div>
    </section>
  );
};

export default Similar;
