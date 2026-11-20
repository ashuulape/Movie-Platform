import axios from "axios";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { searchContext } from "../Context/MovieSearchcontext";
import { useNavigate } from "react-router-dom";

const MOVIE_GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

const Hero = () => {
  const { category } = useContext(searchContext);
  const [herodata, setHerodata] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // ── Drag & interaction state ─────────────────────────────────
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const stripRef = useRef(null);
  const autoRef = useRef(null);
  // ─────────────────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;
    async function fetchtrending() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/${category ? "movie" : "tv"}/day`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          },
        );
        if (isMounted) {
          const results = res?.data?.results || [];
          setHerodata(results.slice(0, 10)); // Top 10 featured items
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("Failed to fetch hero trending items:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchtrending();

    return () => {
      isMounted = false;
    };
  }, [category]);

  // Next & Prev handlers
  const handleNext = useCallback(() => {
    if (herodata.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % herodata.length);
  }, [herodata.length]);

  const handlePrev = useCallback(() => {
    if (herodata.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + herodata.length) % herodata.length);
  }, [herodata.length]);

  // Auto-advance with hover pause
  useEffect(() => {
    if (herodata.length === 0 || isPaused) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }

    autoRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [herodata.length, isPaused, handleNext]);

  // ── Drag helpers ─────────────────────────────────────────────
  const DRAG_THRESHOLD = 50;

  const applyLiveTransform = (delta) => {
    if (!stripRef.current) return;
    stripRef.current.style.transition = "none";
    stripRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${delta}px))`;
  };

  const resetTransition = () => {
    if (!stripRef.current) return;
    stripRef.current.style.transition =
      "transform 550ms cubic-bezier(0.16, 1, 0.3, 1)";
  };

  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
    isDragging.current = true;
    hasMoved.current = false;
    if (autoRef.current) clearInterval(autoRef.current);
  };

  const onDragMove = (clientX) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    dragDeltaX.current = delta;
    if (Math.abs(delta) > 8) {
      hasMoved.current = true;
    }
    applyLiveTransform(delta);
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    resetTransition();

    const delta = dragDeltaX.current;
    if (delta < -DRAG_THRESHOLD) {
      handleNext();
    } else if (delta > DRAG_THRESHOLD) {
      handlePrev();
    } else {
      // Snap back to current index
      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }

    dragStartX.current = null;
    dragDeltaX.current = 0;
    setTimeout(() => {
      hasMoved.current = false;
    }, 50);
  };

  if (isLoading || herodata.length === 0) {
    return (
      <div className="hero-loading" aria-hidden="true">
        <div className="hero-loading__copy">
          <div className="hero-skeleton__badge" />
          <div className="hero-skeleton__title" />
          <div className="hero-skeleton__meta" />
          <div className="hero-skeleton__desc" />
          <div className="hero-skeleton__btn" />
        </div>
      </div>
    );
  }

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging.current) onDragEnd();
      }}
      onMouseDown={(e) => {
        // Only initiate drag if not clicking a button
        if (e.target.closest("button") || e.target.closest("a")) return;
        onDragStart(e.clientX);
      }}
      onMouseMove={(e) => {
        if (isDragging.current) onDragMove(e.clientX);
      }}
      onMouseUp={() => {
        if (isDragging.current) onDragEnd();
      }}
      onTouchStart={(e) => {
        if (e.target.closest("button") || e.target.closest("a")) return;
        onDragStart(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (isDragging.current) onDragMove(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        if (isDragging.current) onDragEnd();
      }}
      aria-label="Featured Movies Carousel"
    >
      {/* Sliding Track */}
      <div
        ref={stripRef}
        className="hero-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {herodata.map((item, index) => (
          <Herocard
            key={item.id || index}
            data={item}
            category={category}
            isDraggingRef={hasMoved}
          />
        ))}
      </div>

      {/* Prev / Next Controls */}
      <button
        type="button"
        className="hero-nav-arrow hero-nav-arrow--prev"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous slide"
      >
        <svg
          width="22"
          height="22"
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
        className="hero-nav-arrow hero-nav-arrow--next"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next slide"
      >
        <svg
          width="22"
          height="22"
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

      {/* Progress / Dots Indicators */}
      <div className="hero-dots" role="tablist" aria-label="Hero slides">
        {herodata.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentIndex === index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className="hero-dot"
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export const Herocard = ({ data, category, isDraggingRef }) => {
  const navigate = useNavigate();

  const title =
    data?.title ||
    data?.name ||
    data?.original_title ||
    data?.original_name ||
    "Featured Title";

  const mediaType = data?.media_type || (category ? "movie" : "tv");
  const rating = data?.vote_average
    ? (Math.round(data.vote_average * 10) / 10).toFixed(1)
    : null;
  const releaseDate = data?.release_date || data?.first_air_date || "";
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : "";
  const backdropUrl = data?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
    : null;
  const posterUrl = data?.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : null;

  const genres = (data?.genre_ids || [])
    .slice(0, 3)
    .map((id) => MOVIE_GENRES[id])
    .filter(Boolean);

  const handleRoute = () => {
    if (isDraggingRef?.current) return; // Prevent navigation if user dragged to swipe
    const cat = mediaType === "tv" ? "tv" : "movie";
    const cleanTitle = encodeURIComponent(title.replace(/\s+/g, "-"));
    navigate(`/watch/${cat}/${cleanTitle}/${data?.id}`, {
      state: { id: data?.id, cat: category },
    });
    window.scrollTo(0, 0);
  };

  return (
    <article
      className="hero-slide"
      style={{
        backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
      }}
      onClick={handleRoute}
    >
      <div className="hero-slide__overlay" />

      <div className="hero-copy">
        <div className="hero-badges">
          <span className="hero-tag-featured">Featured</span>
          {mediaType && (
            <span className="hero-tag-type">
              {mediaType === "tv" ? "TV Series" : "Movie"}
            </span>
          )}
          {releaseYear && <span className="hero-tag-year">{releaseYear}</span>}
          {rating && (
            <span className="hero-tag-rating">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {rating}
            </span>
          )}
        </div>

        <h1 className="hero-title">{title}</h1>

        {genres.length > 0 && (
          <div className="hero-genres">
            {genres.map((genre) => (
              <span className="hero-genre-pill" key={genre}>
                {genre}
              </span>
            ))}
          </div>
        )}

        {data?.overview && <p className="hero-overview">{data.overview}</p>}

        <div className="hero-actions">
          <button
            type="button"
            className="hero-btn hero-btn--primary "
            onClick={(e) => {
              e.stopPropagation();
              handleRoute();
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Now
          </button>

          <button
            type="button"
            className="hero-btn hero-btn--secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleRoute();
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Details
          </button>
        </div>
      </div>

      {posterUrl && (
        <div className="hero-poster-wrap">
          <img
            className="hero-poster"
            src={posterUrl}
            alt={title}
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
};

export default Hero;
