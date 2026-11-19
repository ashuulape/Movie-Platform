import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { searchContext } from "../Context/MovieSearchcontext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { category, loading } = useContext(searchContext);
  const [herodata, setherodata] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ── drag state ──────────────────────────────────────────────
  const dragStartX   = useRef(null);   // pointer X at drag start
  const dragDeltaX   = useRef(0);      // live drag offset in px
  const isDragging   = useRef(false);
  const stripRef     = useRef(null);   // the sliding <div>
  const autoRef      = useRef(null);   // holds the interval id
  // ────────────────────────────────────────────────────────────

  useEffect(() => {
    async function fetchtrending() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${category ? "movie" : "tv"}/day`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        },
      );
      const data = res?.data?.results;
      setherodata(data);
    }
    fetchtrending();
  }, [category]);

  // auto-advance (stored in ref so drag can pause it)
  useEffect(() => {
    if (herodata.length > 0) {
      autoRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % herodata.length);
      }, 3000);
      return () => clearInterval(autoRef.current);
    }
  }, [herodata]);

  // ── drag helpers ─────────────────────────────────────────────
  const DRAG_THRESHOLD = 60; // px needed to count as a swipe

  const applyLiveTransform = (delta) => {
    if (!stripRef.current) return;
    const base = currentIndex * 100; // vw units → convert to px via clientWidth
    const vw   = window.innerWidth;
    stripRef.current.style.transition = "none";
    stripRef.current.style.transform  =
      `translateX(calc(-${base}vw + ${delta}px))`;
  };

  const resetTransition = () => {
    if (!stripRef.current) return;
    stripRef.current.style.transition = "transform 700ms ease-in-out";
  };

  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
    isDragging.current = true;
    clearInterval(autoRef.current); // pause auto-play
  };

  const onDragMove = (clientX) => {
    if (!isDragging.current) return;
    dragDeltaX.current = clientX - dragStartX.current;
    applyLiveTransform(dragDeltaX.current);
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    resetTransition();

    const delta = dragDeltaX.current;
    setCurrentIndex((prev) => {
      if (delta < -DRAG_THRESHOLD) return (prev + 1) % herodata.length;
      if (delta >  DRAG_THRESHOLD) return (prev - 1 + herodata.length) % herodata.length;
      return prev; // snap back
    });

    // restart auto-play
    autoRef.current = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % herodata.length);
    }, 3000);
  };

  // ── mouse events ─────────────────────────────────────────────
  const handleMouseDown  = (e) => { e.preventDefault(); onDragStart(e.clientX); };
  const handleMouseMove  = (e) => { if (isDragging.current) onDragMove(e.clientX); };
  const handleMouseUp    = ()  => onDragEnd();
  const handleMouseLeave = ()  => { if (isDragging.current) onDragEnd(); };

  // ── touch events ─────────────────────────────────────────────
  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchMove  = (e) => onDragMove(e.touches[0].clientX);
  const handleTouchEnd   = ()  => onDragEnd();
  // ─────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="hero-loading" aria-hidden="true">
        <div className="hero-loading__copy">
          <div className="movie-skeleton__line" />
          <div className="movie-skeleton__line movie-skeleton__line--short" />
          <div className="movie-skeleton__line" />
        </div>
      </div>
    );
  }

  return (
    <section
      className="hero-carousel"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      <div
        ref={stripRef}
        className="hero-track"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {herodata.map((e, index) => {
          return <Herocard key={index} data={e} />;
        })}
      </div>

      {/* Dots Indicator */}
      <div className="hero-dots">
        {herodata.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="hero-dot"
            aria-current={currentIndex === index}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export const Herocard = ({ data }) => {
  const navigate = useNavigate();
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
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    // TV-only genres below
    10759: "Action & Adventure",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
  };
  const handleroute = (id, b, category) => {
    navigate(`/watch/${category}/${b}/${id}`, { state: { id, category } });
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={() =>
        handleroute(data?.id, data?.original_title, data?.media_type)
      }
      className="hero-slide"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${data?.backdrop_path})`,
      }}
    >
      <div className="hero-copy">
          <h1>
            {data?.title || data?.name}
          </h1>

          <div className="hero-genres">
            {data?.genre_ids.slice(0, 3).map((e) => (
              <span className="hero-tag" key={e}>
                {MOVIE_GENRES[e]}
              </span>
            ))}
          </div>
          <p className="hero-overview">
            {window.innerWidth < 768
              ? data?.overview.split("").splice(0, 200).join("")
              : data?.overview}
          </p>
      </div>
      <div className="hero-poster-wrap">
        <img
            className="hero-poster"
            src={`https://image.tmdb.org/t/p/w400${data?.poster_path}`}
            alt=""
          ></img>
          <span className="hero-rating">
            {Math.floor(data?.vote_average * 10) / 10}
            <span>
              /10
            </span>
          </span>
          {window.innerWidth > 768 && (
            <span className="hero-type">
              {data?.media_type == "tv" ? "Show" : "Movie"}
            </span>
          )}
      </div>
    </div>
  );
};

export default Hero;
