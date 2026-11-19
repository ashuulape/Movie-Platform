import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../Context/MovieSearchcontext.jsx";

export const Card = ({ data, vertical = false }) => {
  document.me;
  const now = new Date();
  const formatted = now.toISOString().split("T")[0];
  const [ismobile, setismobile] = useState(false);
  const navigate = useNavigate();
  const { category } = useContext(searchContext);

  const isMobileLayout = ismobile && !vertical;

  const {
    original_title,
    poster_path,
    vote_average,
    id,
    key,
    genre_ids,
    backdrop_path,
    overview,
    release_date,
    name,
  } = data;

  const contentid = id || data?.tmdb_id;

  const [isreleased, setisreleased] = useState(formatted > release_date);

  useEffect(() => {
    const checkSize = () => setismobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // const handleroute = (id, b, category) => {
  //   const cat = category ? "movie" : "tv";
  //   navigate(`/watch/${cat}/${b}/${id}`, { state: { id, cat } });

  //   window.scrollTo(0, 0);
  // };

  const handleroute = (id, b, category) => {
    const cat = category ? "movie" : "tv";

    if (Math.random() < 0.2) {
      window.open(import.meta.env.VITE_AD_LINK, "_blank");
      return;
    }

    navigate(`/watch/${cat}/${b}/${id}`, {
      state: { id, cat },
    });

    window.scrollTo(0, 0);
  };

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
  };

  const title = original_title || name || data?.title;
  const poster = data?.poster || `https://image.tmdb.org/t/p/w400${poster_path}`;
  const genres = genre_ids
    ? genre_ids.slice(0, 3).map((genreId) => MOVIE_GENRES[genreId])
    : data?.genres;
  const handleClick = () =>
    category
      ? handleroute(isMobileLayout ? contentid : id, original_title, category)
      : handleroute(isMobileLayout ? contentid : id, name, category);

  return (
    <article
      loading="lazy"
      id={key}
      className={`movie-card${isMobileLayout ? " movie-card--mobile" : ""}`}
      onClick={handleClick}
      style={
        isMobileLayout
          ? {
              backgroundImage: `url(${data?.backdrops?.[0] || `https://image.tmdb.org/t/p/w400${backdrop_path}`})`,
            }
          : undefined
      }
    >
      {isMobileLayout ? (
        <>
          <img loading="lazy" src={poster} alt="" className="movie-card__poster" />
          <div className="movie-card__mobile-copy">
            <h2 className="movie-card__title">{title}</h2>
            <div className="movie-card__genres">
              {genres?.map((genre, idx) => (
                <span className="genre-chip" key={idx}>{typeof genre === "string" ? genre : MOVIE_GENRES[genre]}</span>
              ))}
            </div>
            <p className="movie-card__date">{release_date}</p>
            <p className="movie-card__overview">
              {overview ? overview.split(" ").slice(0, 20).join(" ") : ""}
              <span> Read more...</span>
            </p>
            {category && (
              <span className={`release-badge${isreleased ? "" : " release-badge--upcoming"}`}>
                {isreleased ? "Released" : "Not Released"}
              </span>
            )}
          </div>
          <span className="rating-badge movie-card__mobile-rating">
            {Math.floor(vote_average * 10) / 10}<small>/10</small>
          </span>
        </>
      ) : (
        <>
          <div className="movie-card__poster-wrap">
            <img loading="lazy" src={poster} alt="" className="movie-card__poster" />
            <div className="movie-card__badges">
              {category && (
                <span className={`release-badge${isreleased ? "" : " release-badge--upcoming"}`}>
                  {isreleased ? "Released" : "Not Released"}
                </span>
              )}
              <span className="rating-badge">
                {Math.floor(vote_average * 10) / 10}<small>/10</small>
              </span>
            </div>
          </div>
          <h2 className="movie-card__title">{title}</h2>
          <p className="movie-card__date">{release_date}</p>
        </>
      )}
    </article>
  );
};
