import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  const navigate = useNavigate();
  const {
    original_title,
    poster_path,
    vote_average,
    id,
    key,

    release_date,
  } = data;

  useEffect(() => {}, [data]);

  const handleroute = (id, b) => {
    navigate(`/watch/${b}/${id}`, { state: { id } });
    window.scrollTo(0, 0);
  };

  return (
    <div
      loading="lazy"
      id={key}
      className="max-w-100 relative  w-80 min-w-60 h-fit flex-1 object-contain  overflow-hidden hover:scale-105 transition-transform duration-200  "
      onClick={() => handleroute(id, original_title)}
    >
      <span className="text-white absolute z-4 right-1/20 bg-black/40 backdrop-blur-xs top-1/40 outline-1  outline-white/30 px-2  rounded-xl font-bold">
        {Math.floor(vote_average * 10) / 10}
        <span className="text-[10px] text-white/60 ">/10</span>
      </span>
      <div className=" w-full aspect-[19/6] rounded-lg hover:scale-90 transition-transform duration-200">
        <img
          className="w-full  "
          src={`https://image.tmdb.org/t/p/w400${poster_path}`}
          alt=""
        ></img>
      </div>
      <h1 className="text-wrap  w-full text-start font-bold pt-2">
        {original_title}
      </h1>
      <h2 className="text-sm font-semibold text-white/50">{release_date}</h2>
    </div>
  );
};
