import axios, { spread } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { dataContext } from "../Context/Moviedatacontext";
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
      <div className="relative w-full md:h-[50vh] aspect-video bg-white/5 overflow-x-hidden flex items-end p-10">
        <div className="w-1/2 h-full flex flex-col justify-end gap-4">
          <div className="h-10 w-3/4 bg-white/10 rounded-md"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-white/10 rounded-sm"></div>
            <div className="h-6 w-20 bg-white/10 rounded-sm"></div>
            <div className="h-6 w-24 bg-white/10 rounded-sm"></div>
          </div>
          <div className="h-4 w-full bg-white/10 rounded-md"></div>
          <div className="h-4 w-4/5 bg-white/10 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative w-full md:h-[50vh] max-h-fit overflow-x-hidden select-none"
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
        className="flex flex-row w-fit h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {herodata.map((e, index) => {
          return <Herocard key={index} data={e} />;
        })}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {herodata.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white scale-125"
                : "bg-white/20 hover:bg-white/80"
            }`}
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
      className="w-[100dvw] flex aspect-video shrink-0 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0) 50%,rgba(0,0,0,0.5) 60%, rgba(15,15,15,0.9) 80%),url(https://image.tmdb.org/t/p/w1280${
          data?.backdrop_path
        })`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-auto h-full flex md:flex-3 flex-2 items-end justify-end py-10">
        <div className="text-end flex flex-col items-end gap-2 lg:w-[75%]">
          <h1 className="text-3xl text-sm font-bold font-roboto">
            {data?.title || data?.name}
          </h1>

          <h2 className="flex gap-2 justify-end">
            {data?.genre_ids.slice(0, 3).map((e) => (
              <span className="text-[10px] md:text-sm font-thin outline-1 outline-white/30 rounded-sm px-2 backdrop-blur-lg bg-white/10">
                {MOVIE_GENRES[e]}
              </span>
            ))}
          </h2>
          <h2 className="text-white/60 font-normal text-xs md:text-sm leading-tight">
            {window.innerWidth < 768
              ? data?.overview.split("").splice(0, 200).join("")
              : data?.overview}
          </h2>
        </div>
      </div>
      <div className="h-full relative w-fit py-4 px-2 flex-1 flex items-start  justify-start ">
        <div className="relative w-fit h-full">
          <img
            className="h-full aspect-2/3  "
            src={`https://image.tmdb.org/t/p/w400${data?.poster_path}`}
            alt=""
          ></img>
          <span className="text-white text-xs md:text-lg absolute z-4 right-1/20 bg-black/40 backdrop-blur-xs top-1/40 outline-1  outline-white/30 px-2  rounded-xl font-bold">
            {Math.floor(data?.vote_average * 10) / 10}
            <span className="text-[8px] md:text-[10px] text-white/60 ">
              /10
            </span>
          </span>
          {window.innerWidth > 768 && (
            <span className="text-white absolute z-4 left-1/40 bg-green-400/10 backdrop-blur-xs top-1/40 outline-1  outline-white/30 md:px-2 px-1 rounded-sm font-bold">
              <span className="text-xs md:text-sm text-white ">
                {data?.media_type == "tv" ? "Show" : "Movie"}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
