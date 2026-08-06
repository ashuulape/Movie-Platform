import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  const { original_title, poster_path, backdrop_path, id, key } = data;
  const handleroute = (id, b) => {
    navigate(`/watch/${b}`, { state: { id } });
  };

  return (
    <div
      loading="lazy"
      id={key}
      className="max-w-100  w-80 min-w-60 h-fit flex-1 object-contain  overflow-hidden "
      onClick={() => handleroute(id, original_title)}
    >
      <img
        className="w-full rounded-lg pb-4 "
        src={`https://image.tmdb.org/t/p/w400${poster_path}`}
        alt=""
      />
      <h1 className="text-wrap w-full text-start font-bold">
        {original_title}
      </h1>
    </div>
  );
};
