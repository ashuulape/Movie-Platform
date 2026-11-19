import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";

const DiscoverSkeleton = () => (
  <div className="discover-skeleton-grid" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, idx) => (
      <div className="movie-skeleton-card" key={idx}>
        <div className="movie-skeleton" />
        <div className="movie-skeleton__line" />
        <div className="movie-skeleton__line movie-skeleton__line--short" />
      </div>
    ))}
  </div>
);

const DiscoverSection = ({
  title,
  sectionId,
  isMovie,
  endpoint,
  defaultViewMode = "slider",
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState(defaultViewMode); // "slider" or "rows"
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  // Sync defaultViewMode when prop changes
  useEffect(() => {
    setViewMode(defaultViewMode);
  }, [defaultViewMode]);

  // Responsive calculation of items per slide page
  useEffect(() => {
    const updateItemsPerPage = () => {
      const w = window.innerWidth;
      if (w < 540) setItemsPerPage(2);
      else if (w < 840) setItemsPerPage(3);
      else if (w < 1200) setItemsPerPage(4);
      else setItemsPerPage(5);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const fetchSectionData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(endpoint, {
        params: { language: "en-US", page: 1 },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      // Grab 15-20 items so we have enough for 3-4 full slide pages or multiple rows
      setItems(res?.data?.results?.slice(0, 15) || []);
      setCurrentPage(0);
    } catch (err) {
      console.error(`Failed to fetch section ${sectionId}:`, err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, [endpoint]);

  // Group items into slides/pages for the carousel
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  const totalPages = Math.max(1, pages.length);

  // Ensure currentPage is within bounds if itemsPerPage changes
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  const handlePrev = () => {
    setCurrentPage((p) => (p > 0 ? p - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => (p < totalPages - 1 ? p + 1 : 0));
  };

  // Touch Swipe for mobile carousel
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current < -45) {
      handleNext();
    } else if (touchDeltaX.current > 45) {
      handlePrev();
    }
  };

  const handleViewAll = () => {
    const cat = isMovie ? "movie" : "tv";
    navigate(`/discover/${cat}/${sectionId}`);
  };

  return (
    <section id={`section-${sectionId}`} className="discover-section">
      {/* Section Header */}
      <div className="discover-section__header">
        <div className="discover-section__title-group">
          <span className="discover-section__accent" aria-hidden="true" />
          <h2 className="discover-section__title">
            {title}{" "}
            <span className="discover-section__tag">
              {isMovie ? "Movies" : "TV Shows"}
            </span>
          </h2>
        </div>

        <div className="discover-section__actions">
          {/* View Mode Toggle: Slider vs Rows */}
          <div className="discover-viewmode-toggle" aria-label="Layout mode">
            <button
              type="button"
              className={`viewmode-btn ${viewMode === "slider" ? "viewmode-btn--active" : ""}`}
              onClick={() => setViewMode("slider")}
              title="Carousel Slider view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="8" y1="5" x2="8" y2="19" />
                <line x1="16" y1="5" x2="16" y2="19" />
              </svg>
              <span className="viewmode-btn__label">Slider</span>
            </button>

            <button
              type="button"
              className={`viewmode-btn ${viewMode === "rows" ? "viewmode-btn--active" : ""}`}
              onClick={() => setViewMode("rows")}
              title="All in rows view"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              <span className="viewmode-btn__label">Rows</span>
            </button>
          </div>

          {/* Slider Step Controls (Visible in Slider Mode) */}
          {viewMode === "slider" && totalPages > 1 && (
            <div className="discover-slider-controls">
              <span className="discover-slider-counter">
                {currentPage + 1}/{totalPages}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                className="icon-button discover-step-btn"
                aria-label={`Previous ${title} slide`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="icon-button discover-step-btn"
                aria-label={`Next ${title} slide`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}

          {/* View All Button */}
          <button
            type="button"
            onClick={handleViewAll}
            className="discover-view-all-btn"
          >
            <span>View all</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Section Content */}
      {loading ? (
        <DiscoverSkeleton />
      ) : error ? (
        <div className="ui-error discover-section__error" role="alert">
          <span>Failed to load {title}.</span>
          <button
            type="button"
            className="ui-button ui-button--secondary"
            onClick={fetchSectionData}
          >
            Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        <p className="ui-empty">No titles available in this section.</p>
      ) : viewMode === "rows" ? (
        /* Rows Mode: Clean, Responsive Grid showing all movies wrapped in rows */
        <div className="discover-rows-grid">
          {items.map((item) => (
            <div className="discover-grid-item" key={item.id}>
              <Card data={item} vertical={true} />
            </div>
          ))}
        </div>
      ) : (
        /* Slider Mode: True CSS Transform-Based Carousel Track */
        <div
          className="section-slider-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating Left Slide Paddle */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="section-slide-paddle section-slide-paddle--left"
              aria-label={`Previous ${title} slide`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Overflow-Hidden Slider Viewport */}
          <div className="section-slider-viewport">
            <div
              className="section-slider-track"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {pages.map((pageItems, pIdx) => (
                <div
                  className="section-slider-page"
                  key={pIdx}
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                  }}
                >
                  {pageItems.map((item) => (
                    <div className="section-slider-card-wrap" key={item.id}>
                      <Card data={item} vertical={true} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Right Slide Paddle */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="section-slide-paddle section-slide-paddle--right"
              aria-label={`Next ${title} slide`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className="section-slider-dots">
              {pages.map((_, dotIdx) => (
                <button
                  type="button"
                  key={dotIdx}
                  className={`section-slider-dot ${
                    dotIdx === currentPage ? "section-slider-dot--active" : ""
                  }`}
                  onClick={() => setCurrentPage(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default DiscoverSection;
