import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Browse from "./components/Browse";
import DiscoverSection from "./components/DiscoverSection";
import { Card } from "./components/Card";
import HomeSkeleton from "./components/HomeSkeleton";
import { searchContext } from "./Context/MovieSearchcontext";
import { dataContext } from "./Context/Moviedatacontext";
import { HoriAd, SocialAd } from "./components/Adbanner";
import { Button } from "./components/UI";

const MOVIE_DISCOVER_SECTIONS = [
  {
    id: "now_playing",
    title: "Now Playing",
    endpoint: "https://api.themoviedb.org/3/movie/now_playing",
  },
  {
    id: "popular",
    title: "Popular",
    endpoint: "https://api.themoviedb.org/3/movie/popular",
  },
  {
    id: "top_rated",
    title: "Top Rated",
    endpoint: "https://api.themoviedb.org/3/movie/top_rated",
  },
  {
    id: "upcoming",
    title: "Upcoming",
    endpoint: "https://api.themoviedb.org/3/movie/upcoming",
  },
];

const TV_DISCOVER_SECTIONS = [
  {
    id: "popular",
    title: "Popular",
    endpoint: "https://api.themoviedb.org/3/tv/popular",
  },
  {
    id: "top_rated",
    title: "Top Rated",
    endpoint: "https://api.themoviedb.org/3/tv/top_rated",
  },
  {
    id: "on_the_air",
    title: "On The Air",
    endpoint: "https://api.themoviedb.org/3/tv/on_the_air",
  },
  {
    id: "airing_today",
    title: "Airing Today",
    endpoint: "https://api.themoviedb.org/3/tv/airing_today",
  },
];

const Home = () => {
  const { category, loading, search, setsearch } = useContext(searchContext);
  const { moviedata, setmoviedata } = useContext(dataContext);
  const [globalViewMode, setGlobalViewMode] = useState("slider"); // "slider" or "rows"

  document.title = `FreeTube : Free movies for everyone`;

  const isSearching = Boolean(search?.trim()) && moviedata !== null;
  const currentSections = category ? MOVIE_DISCOVER_SECTIONS : TV_DISCOVER_SECTIONS;

  return (
    <main className="catalog-page page-enter">
      <Navbar />

      <div className="catalog-content">
        {isSearching ? (
          /* Search Results View */
          <div className="search-results-wrapper">
            <div className="search-results-header">
              <h1 className="catalog-heading">
                Search Results for: <span>"{search}"</span>
              </h1>
              <Button
                variant="secondary"
                onClick={() => {
                  setsearch("");
                  setmoviedata(null);
                }}
              >
                Clear Search
              </Button>
            </div>

            {loading ? (
              <HomeSkeleton />
            ) : !moviedata || moviedata.length === 0 ? (
              <p className="ui-empty">No results found for "{search}".</p>
            ) : (
              <div className="movie-grid">
                {moviedata.map((item) => (
                  <Card key={item.id} data={item} vertical={true} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Standard Home View with Hero, Browse, and Discover Sections */
          <>
            <Hero />

            {/* Browse Section directly under Hero with Category switcher and Layout toggle */}
            <Browse
              viewMode={globalViewMode}
              onViewModeChange={setGlobalViewMode}
            />

            <HoriAd />

            {/* Discover Sections */}
            <div className="discover-sections-list">
              {currentSections.map((sec) => (
                <DiscoverSection
                  key={`${category ? "movie" : "tv"}-${sec.id}`}
                  sectionId={sec.id}
                  title={sec.title}
                  isMovie={category}
                  endpoint={sec.endpoint}
                  defaultViewMode={globalViewMode}
                />
              ))}
            </div>

            <SocialAd />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
