import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Card } from "./components/Card";
import HomeSkeleton from "./components/HomeSkeleton";
import { searchContext } from "./Context/MovieSearchcontext";
import { Button } from "./components/UI";
import { HoriAd, SocialAd } from "./components/Adbanner";

const SECTION_METADATA = {
  now_playing: { movie: "Now Playing Movies", tv: "Now Playing TV Shows" },
  popular: { movie: "Popular Movies", tv: "Popular TV Shows" },
  top_rated: { movie: "Top Rated Movies", tv: "Top Rated TV Shows" },
  upcoming: { movie: "Upcoming Movies", tv: "Upcoming TV Shows" },
  on_the_air: { movie: "On The Air Movies", tv: "On The Air TV Shows" },
  airing_today: { movie: "Airing Today Movies", tv: "Airing Today TV Shows" },
};

const Discover = () => {
  const navigate = useNavigate();
  const { sectionId, category: categoryParam } = useParams();
  const { category: contextCategory } = useContext(searchContext);

  const isMovie =
    categoryParam !== undefined
      ? categoryParam === "movie" || categoryParam === "true"
      : contextCategory;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const catKey = isMovie ? "movie" : "tv";
  const displayTitle =
    SECTION_METADATA[sectionId]?.[catKey] ||
    `${sectionId?.replace(/_/g, " ").toUpperCase()} ${isMovie ? "Movies" : "TV Shows"}`;

  document.title = `${displayTitle} | FreeTube`;

  const fetchSectionData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${catKey}/${sectionId}`,
        {
          params: { language: "en-US", page },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        },
      );
      setItems(res?.data?.results || []);
      setTotalPages(Math.min(res?.data?.total_pages || 1, 500));
    } catch (err) {
      console.error("Failed to load discover page:", err);
      setError(true);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, [sectionId, catKey, page]);

  return (
    <main className="catalog-page page-enter">
      <Navbar />

      <div className="catalog-content">
        <div className="discover-page-header">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="ui-button ui-button--quiet discover-back-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="discover-page-title-row">
            <div>
              <h1 className="discover-page-title">{displayTitle}</h1>
              <p className="discover-page-subtitle">
                Explore all titles available in this category
              </p>
            </div>
            <span className="discover-page-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: "6px" }}>
                {isMovie ? (
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="2.2" ry="2.2" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </>
                ) : (
                  <>
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                    <polyline points="17 2 12 7 7 2" />
                  </>
                )}
              </svg>
              <span>{isMovie ? "Movies" : "TV Shows"}</span>
            </span>
          </div>
        </div>

        <HoriAd />

        {loading ? (
          <HomeSkeleton />
        ) : error ? (
          <div className="ui-error" role="alert">
            <p>Could not load titles for this section. Please try again.</p>
            <Button onClick={fetchSectionData} variant="primary">
              Retry
            </Button>
          </div>
        ) : items.length === 0 ? (
          <p className="ui-empty">No titles found in this category.</p>
        ) : (
          <section className="catalog-results">
            <div className="movie-grid">
              {items.map((item) => (
                <Card key={item.id} data={item} />
              ))}
            </div>

            <nav className="pagination" aria-label="Pagination">
              <Button
                variant="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m14 18-6-6 6-6" />
                </svg>
              </Button>

              <span className="pagination__number">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="icon"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                aria-label="Next page"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m10 18 6-6-6-6" />
                </svg>
              </Button>
            </nav>
          </section>
        )}

        <SocialAd />
      </div>
    </main>
  );
};

export default Discover;
