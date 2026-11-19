import React, { useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { dataContext } from "../Context/Moviedatacontext";
import axios from "axios";
import HomeSkeleton from "./HomeSkeleton";
import { searchContext } from "../Context/MovieSearchcontext";
import { Button } from "./UI";

const Movies = () => {
  const { loading, setLoading, category } = useContext(searchContext);
  const { moviedata, setmoviedata, movielistno, pageno, setpageno } =
    useContext(dataContext);

  const options = [
    {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/now_playing`,
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
    {
      method: "GET",
      url: `https://api.themoviedb.org/3/${category ? "movie" : "tv"}/popular`,
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
    {
      method: "GET",
      url: `https://api.themoviedb.org/3/${category ? "movie" : "tv"}/top_rated`,
      params: { language: "en-US", page: pageno },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    },
    {
      method: "GET",
      url: `https://api.themoviedb.org/3/${category ? "movie" : "tv"}/upcoming`,
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
  }, [movielistno, pageno, category]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!moviedata) {
    return (
      <div className="ui-error" role="alert">
        We could not load titles. Please try again later.
      </div>
    );
  }

  return (
    <section className="catalog-results">
      <div className="movie-grid">
        {moviedata.length ? (
          moviedata.map((e, key) => <Card key={key} data={e} />)
        ) : (
          <p className="ui-empty">No titles found for this selection.</p>
        )}
      </div>
      <nav className="pagination" aria-label="Movie pages">
        <Button
          variant="icon"
          onClick={() => setpageno((prev) => Math.max(1, prev - 1))}
          disabled={pageno === 1}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m14 18-6-6 6-6" />
          </svg>
        </Button>
        <span className="pagination__number">
          {pageno}
        </span>
        <Button
          variant="icon"
          onClick={() => setpageno((prev) => Math.max(1, prev + 1))}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m10 18 6-6-6-6" />
          </svg>
        </Button>
      </nav>
    </section>
  );
};

export default Movies;
