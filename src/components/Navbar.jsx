import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../Context/Moviedatacontext";
import { searchContext } from "../Context/MovieSearchcontext";
import { Button, Input } from "./UI";

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoading, category } = useContext(searchContext);
  const { setmoviedata } = useContext(dataContext);
  const { search, setsearch } = useContext(searchContext);
  const [ismobile, setismobile] = useState(false);

  async function fetchdata(query) {
    if (!query?.trim()) return;
    setmoviedata(null);
    navigate("/");
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/${category ? "movie" : "tv"}?query=${query}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        },
      );
      setmoviedata(res?.data?.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setmoviedata([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const checkSize = () => setismobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <header className="app-navbar">
      <div className="navbar-start">
        <button
          type="button"
          onClick={() => {
            setsearch("");
            setmoviedata(null);
            navigate("/");
          }}
          className="navbar-brand"
          aria-label="FreeTube Home"
        >
          <span className="brand-logo " aria-hidden="true">
            <svg
              width="34"
              height="24"
              viewBox="0 0 34 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="34" height="24" rx="7" fill="#F62130" />
              <polygon
                points="13.5,6.5 23.5,12 13.5,17.5"
                fill="#FFFFFF"
                transform="translate(33, 0) scale(-1, 1)"
              />
            </svg>
          </span>
          {!ismobile && <span className="brand-text">FreeTube</span>}
        </button>
      </div>

      <div className="navbar-search">
        <Input
          onChange={(e) => setsearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchdata(search);
            }
          }}
          value={search}
          type="text"
          placeholder="Search movies or shows"
          aria-label="Search movies or TV shows"
        />
        <Button
          type="button"
          variant="icon"
          onClick={() => fetchdata(search)}
          aria-label="Search"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
        </Button>
      </div>

      <div className="navbar-actions">
        <a
          className="navbar-github"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/ashuulape"
          aria-label="GitHub"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13 13 0 0 0-6.9 0C5.4 1.2 4.2 1.6 4.2 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
