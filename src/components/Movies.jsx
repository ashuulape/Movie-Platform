import React, { useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { dataContext } from "../Context/Moviedatacontext";
import axios from "axios";
import HomeSkeleton from "./HomeSkeleton";
import { searchContext } from "../Context/MovieSearchcontext";

const Movies = () => {
  const { loading, setLoading } = useContext(searchContext);
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
      if (!moviedata) {
        setLoading(true);
      }
      try {
        const { data } = await axios.request(options);
        setmoviedata(data?.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchplayingMovies();
  }, []);

  if (loading || !moviedata) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      <div className="w-full py-8 h-fit flex flex-wrap gap-10">
        {moviedata.map((e, key) => {
          return <Card key={key} data={e} />;
        })}
      </div>
    </div>
  );
};

export default Movies;
