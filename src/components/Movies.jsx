import React, { useContext, useEffect } from "react";
import { Card } from "./Card";
import { dataContext } from "../Context/Moviedatacontext";
import axios from "axios";

const Movies = () => {
  const { moviedata, setmoviedata } = useContext(dataContext);
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/now_playing",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };
  useEffect(() => {
    async function fetchplayingMovies() {
      try {
        const { data } = await axios.request(options);
        console.log(data);
        setmoviedata(data?.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchplayingMovies();
  }, []);

  return (
    <div>
      <div className="w-full h-fit flex  flex-wrap gap-10">
        {moviedata &&
          moviedata.map((e, key) => {
            return <Card key={key} data={e} />;
          })}
      </div>
    </div>
  );
};

export default Movies;
