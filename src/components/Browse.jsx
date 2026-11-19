import React, { useContext } from "react";
import { searchContext } from "../Context/MovieSearchcontext";

const FilmIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2.2" ry="2.2" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

const TvIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
);

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const FlameIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const RadioIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.83a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
  </svg>
);

const Browse = ({ onSectionClick, viewMode = "slider", onViewModeChange }) => {
  const { category, setcategory, setsearch } = useContext(searchContext);

  const movieSections = [
    { id: "now_playing", label: "Now Playing", Icon: PlayIcon },
    { id: "popular", label: "Popular", Icon: FlameIcon },
    { id: "top_rated", label: "Top Rated", Icon: StarIcon },
    { id: "upcoming", label: "Upcoming", Icon: CalendarIcon },
  ];

  const tvSections = [
    { id: "popular", label: "Popular", Icon: FlameIcon },
    { id: "top_rated", label: "Top Rated", Icon: StarIcon },
    { id: "on_the_air", label: "On The Air", Icon: RadioIcon },
    { id: "airing_today", label: "Airing Today", Icon: CalendarIcon },
  ];

  const activeSections = category ? movieSections : tvSections;

  return (
    <section className="browse-section" aria-label="Browse catalog">
      <div className="browse-bar">
        {/* Main Category Toggle (Movies vs TV Shows) */}
        <div className="browse-type-group">
          <button
            type="button"
            className={`browse-type-btn ${category ? "browse-type-btn--active" : ""}`}
            onClick={() => {
              if (!category) {
                setcategory(true);
                setsearch("");
              }
            }}
          >
            <span className="browse-type-icon">
              <FilmIcon />
            </span>
            <span>Movies</span>
          </button>

          <button
            type="button"
            className={`browse-type-btn ${!category ? "browse-type-btn--active" : ""}`}
            onClick={() => {
              if (category) {
                setcategory(false);
                setsearch("");
              }
            }}
          >
            <span className="browse-type-icon">
              <TvIcon />
            </span>
            <span>TV Shows</span>
          </button>
        </div>

        {/* Quick Section Jump Pills */}
        <nav className="browse-pills" aria-label="Discover sections">
          {activeSections.map((sec) => {
            const { Icon } = sec;
            return (
              <button
                type="button"
                key={sec.id}
                className="browse-pill"
                onClick={() => {
                  if (onSectionClick) {
                    onSectionClick(sec.id);
                  } else {
                    const el = document.getElementById(`section-${sec.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
              >
                <span className="browse-pill-icon">
                  <Icon />
                </span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global View Mode Switcher: Slider vs Rows */}
        {onViewModeChange && (
          <div className="browse-viewmode-group" aria-label="Global layout mode">
            <button
              type="button"
              className={`viewmode-btn ${viewMode === "slider" ? "viewmode-btn--active" : ""}`}
              onClick={() => onViewModeChange("slider")}
              title="View all sections as sliders"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="8" y1="5" x2="8" y2="19" />
                <line x1="16" y1="5" x2="16" y2="19" />
              </svg>
              <span>Slider</span>
            </button>
            <button
              type="button"
              className={`viewmode-btn ${viewMode === "rows" ? "viewmode-btn--active" : ""}`}
              onClick={() => onViewModeChange("rows")}
              title="View all movies in rows"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>Rows</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Browse;
