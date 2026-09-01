import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchContext } from "../Context/MovieSearchcontext.jsx";

export const Card = ({ data }) => {
  document.me;
  const now = new Date();
  const formatted = now.toISOString().split("T")[0];
  const [ismobile, setismobile] = useState(false);
  const navigate = useNavigate();
  const { category } = useContext(searchContext);

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

  const handleroute = (id, b, category) => {
    const cat = category ? "movie" : "tv";
    navigate(`/watch/${cat}/${b}/${id}`, { state: { id, cat } });

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

  return ismobile ? (
    <div
      loading="lazy"
      id={key}
      className=" relative px-2 py-4 w-full min-w-full rounded-sm  aspect-video flex flex-row gap-2 flex-1 object-contain   hover:scale-105 transition-transform duration-200  "
      onClick={() =>
        category
          ? handleroute(contentid, original_title, category)
          : handleroute(contentid, name, category)
      }
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15,15,15,0.6) 0%, rgba(15,15,15,1) 80%), url(${
          data?.backdrops?.[0] ||
          `https://image.tmdb.org/t/p/w400${backdrop_path}`
        })`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full w-fit  ">
        <img
          loading="lazy"
          src={data?.poster || `https://image.tmdb.org/t/p/w300${poster_path}`}
          alt=""
          className="h-full aspect-2/3"
        />
      </div>
      <div className="h-fit flex gap-2 flex-col w-fit flex-6 py-4">
        <h1 className=" md:text-3xl text-xl text-end  text-white font-roboto font-semibold">
          {original_title || name || data?.title}
        </h1>
        <div className="flex justify-end gap-1  flex-wrap w-full h-fit">
          {genre_ids
            ? genre_ids.slice(0, 3).map((e, idx) => {
                return (
                  <span
                    id={idx}
                    className="text-[8px] px-1  border-1 border-white/20 rounded-sm"
                  >
                    {MOVIE_GENRES[e]}
                  </span>
                );
              })
            : data?.genres.map((e, idx) => (
                <span
                  id={idx}
                  className="text-[8px] px-1  border-1 border-white/20 rounded-sm"
                >
                  {e}
                </span>
              ))}
        </div>
        <p className="text-xs">{release_date}</p>
        <span className="text-white text-sm absolute z-4 right-1/50 bg-black/40 backdrop-blur-xs top-1/40 outline-1  outline-white/30 px-2  rounded-sm font-bold">
          {Math.floor(vote_average * 10) / 10}
          <span className="text-[8px] text-white/60 ">/10</span>
        </span>
        <p className="text-xs text-white/30">
          {overview ? overview.split(" ").slice(0, 20).join(" ") : ""}
          <span className="text-white/50"> Read more...</span>
        </p>
        {category && (
          <p
            className={`text-[10px] font-semibold w-fit px-2 flex items-centers    ${isreleased ? "text-green-400 bg-green-400/20 outline-1 outline-green-300/40 rounded-sm" : "text-red-500 bg-red-500/20 outline-1 outline-red-500/40 rounded-sm"}`}
          >
            {isreleased ? "• Released" : "• Not Released"}
          </p>
        )}
      </div>
    </div>
  ) : (
    <div
      loading="lazy"
      id={key}
      className="max-w-100 relative  w-80 min-w-60 h-fit flex-row flex-1 object-contain  overflow-hidden hover:scale-105 transition-transform duration-200  "
      onClick={() =>
        category
          ? handleroute(id, original_title, category)
          : handleroute(id, name, category)
      }
    >
      <span className="text-white absolute z-4 right-1/20 bg-black/40 backdrop-blur-xs top-1/40 outline-1  outline-white/30 px-2  rounded-xl font-bold">
        {Math.floor(vote_average * 10) / 10}
        <span className="text-[10px] text-white/60 ">/10</span>
      </span>
      {category && (
        <p
          className={`text-xs w-fit z-4 px-2 flex items-centers absolute top-4 left-2  backdrop-blur-sm  ${isreleased ? "text-green-400 bg-green-400/20 outline-1 outline-green-300/40 rounded-sm" : ""}`}
        >
          {isreleased ? "• Released" : "Not Released"}
        </p>
      )}
      <div className=" w-full aspect-2/3 min-h-fit hover:rounded-sm overflow-hidden hover:scale-90 transition-transform duration-200">
        <img
          className="w-full   "
          src={data?.poster || `https://image.tmdb.org/t/p/w400${poster_path}`}
          alt=""
        ></img>
      </div>
      <h1 className="text-wrap  w-full text-start font-bold pt-2">
        {original_title || name || data?.title}
      </h1>
      <h2 className="text-sm font-semibold text-white/50">{release_date}</h2>
    </div>
  );
};
