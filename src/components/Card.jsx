import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  const { original_title, poster_path, id, key } = data;
  const handleroute = (id, b) => {
    navigate(`/watch/${b}`, { state: { id } });
  };

  return (
    <div
      id={key}
      className="max-w-full w-80 min-w-50 h-fit flex-1 object-contain "
      onClick={() => handleroute(id, original_title)}
    >
      <img
        className="w-full"
        src={`https://image.tmdb.org/t/p/w400${poster_path}`}
        alt=""
      />
      <h1 className="text-wrap w-full text-center font-bold">
        {original_title}
      </h1>
    </div>
  );
};
