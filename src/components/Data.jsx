import React, { useContext, useEffect } from "react";
import { searchContext } from "../Context/MovieSearchcontext";
import { Button } from "./UI";

const data = ({ moviedata, setsource, isReleased }) => {
  const { serverno, setserverno } = useContext(searchContext);

  const servers = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (moviedata?.embed_imdb && typeof setsource === "function") {
      setsource(moviedata.embed_imdb);
    }
  }, [moviedata, setsource]);

  const cast = moviedata?.cast ? moviedata.cast.slice(0, 4) : [];
  const genres = moviedata?.genres || [];

  return (
    <aside className="watch-details">
      <div className="details-top">
        <img
          className="details-poster"
          src={`https://image.tmdb.org/t/p/w200${moviedata?.poster}`}
          alt=""
        />
        <div>
          <h1 className="details-title">
            {moviedata?.title || moviedata?.name}
          </h1>
          <span className="details-rating">
            {moviedata?.vote_average
              ? Math.floor(moviedata.vote_average * 10) / 10
              : "N/A"}
          </span>
        </div>
      </div>

      {!isReleased && (
        <p className="release-warning">
          {moviedata?.title || moviedata?.name} is not released yet or is not available.
        </p>
      )}

      <p className="details-overview">{moviedata?.overview}</p>
      <div className="genre-list">
        {genres.map((e, idx) => (
          <span className="genre-chip" key={idx}>{e}</span>
        ))}
      </div>

      <div className="details-facts">
        <span>
          <strong>Cast:</strong>{" "}
          {cast.map((e) => e?.name).filter(Boolean).join(", ") || "N/A"}
        </span>
        <span>
          <strong>Release date:</strong>{" "}
          {moviedata?.release_date || moviedata?.first_air_date || "N/A"}
        </span>
        <span>
          <strong>Runtime:</strong>{" "}
          {moviedata?.runtime
            ? `${Math.floor(moviedata.runtime / 60)}h ${Math.floor(moviedata.runtime % 60)}min`
            : "N/A"}
        </span>
        <span><strong>Status:</strong> {moviedata?.status || "N/A"}</span>
      </div>

      {isReleased && (
        <div className="server-panel" aria-label="Select playback server">
          {servers.map((e) => (
            <Button
              type="button"
              variant={serverno === e ? "primary" : "secondary"}
              className="server-button"
              aria-pressed={serverno === e}
              key={e}
              onClick={() => setserverno(e)}
            >
              Server {e}
            </Button>
          ))}
        </div>
      )}

      {!isReleased && (
        <div className="trailer-wrap">
          <iframe
            className="watch-trailer"
            src={moviedata?.trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </aside>
  );
};

export default data;
