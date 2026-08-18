import React, { useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { dataContext } from "../Context/Moviedatacontext";
import axios from "axios";
import HomeSkeleton from "./HomeSkeleton";
import { searchContext } from "../Context/MovieSearchcontext";

const Movies = () => {
  const { loading, setLoading } = useContext(searchContext);
  const { moviedata, setmoviedata, movielistno, pageno, setpageno } =
    useContext(dataContext);

  const options = [
    {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing",
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
    {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
    {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated",
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
    {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming",
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
  ];

  useEffect(() => {
    async function fetchplayingMovies() {
      setmoviedata(null);

      setLoading(true);

      try {
        const { data } = await axios.request(options[movielistno]);
        setmoviedata(data?.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    }
    fetchplayingMovies();
  }, [movielistno, pageno]);

  if (loading || !moviedata) {
    return <HomeSkeleton />;
  }

  return (
    <div className="w-fit flex flex-col pb-10 items-center ">
      <div className="w-[90%] py-8 h-fit flex flex-wrap gap-4 md:gap-10">
        {moviedata.map((e, key) => {
          return <Card key={key} data={e} />;
        })}
      </div>
      <div className="  flex gap-10 justify-center text-sm sm:text-xl font-bold">
        <button
          onClick={() => setpageno((prev) => Math.max(1, prev - 1))}
          disabled={pageno === 1}
          className={`w-fit h-fit px-2 py-1 bg-black/40 outline-1 outline-white/30 rounded ${
            pageno === 1 ? "disabled" : ""
          }`}
        >
          {"<<"}
        </button>
        <h1 className="w-fit  h-fit px-4 py-1 bg-black/40 outline-1 outline-white/30 rounded">
          {pageno}
        </h1>
        <button
          onClick={() => setpageno((prev) => Math.max(1, prev + 1))}
          className="w-fit  h-fit px-2 py-1 bg-black/40 outline-1 outline-white/30 rounded"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Movies;
