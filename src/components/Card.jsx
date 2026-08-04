import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  const navigate = useNavigate();
  const { original_title, poster_path, id, key } = data;
  const handleroute = (id) => {
    (console.log(id), navigate(`/watch/${id}`, { state: { id } }));
  };

  return (
    <div
      id={key}
      className="max-w-[10vw] w-50 min-w-75 h-fit flex-1 "
      onClick={() => handleroute(id)}
    >
      <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
      <h1 className="text-wrap w-4/5 text-center font-bold">
        {original_title}
      </h1>
    </div>
  );
};
