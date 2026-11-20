import React, { use, useContext, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import axios from "axios";
import Bottom from "./components/Bottom";
import { dataContext } from "./Context/Moviedatacontext";
import WatchSkeleton from "./components/WatchSkeleton";
import { searchContext } from "./Context/MovieSearchcontext";
import Similar from "./components/Similar";

export default function Watch() {
  const UsersIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  const [searchParams, setsearchParams] = useSearchParams();
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);
  const [setsource, source] = useState(null);
  const [epNo, setepNo] = useState(() => {
    const ep = searchParams.get("ep") || searchParams.get("episode");
    return ep ? Number(ep) || ep : 1;
  });
  const [seasonno, setseasonno] = useState(() => {
    const s = searchParams.get("s") || searchParams.get("season");
    return s ? Number(s) || s : 1;
  });
  const { serverno, setserverno } = useContext(searchContext);

  const [loading, setLoading] = useState(true);

  document.title = `Watch : ${moviedata?.title || moviedata?.name || ""}`;

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/${category}/${state?.id || id}`,
        );
        setmoviedata(res?.data);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [state?.id, id]);

  const istv = category == "tv" ? true : false;

  const currentSeason = moviedata?.seasons?.find(
    (e) => Number(e?.season_number) === Number(seasonno),
  );
  const totalEpisodes = currentSeason?.episode_count || 0;

  // Auto-select valid season if current seasonno is not found in moviedata
  useEffect(() => {
    if (istv && moviedata?.seasons?.length > 0) {
      const match = moviedata.seasons.find(
        (s) => Number(s?.season_number) === Number(seasonno),
      );
      if (!match) {
        const fallback =
          moviedata.seasons.find((s) => s?.season_number >= 1) ||
          moviedata.seasons[0];
        if (fallback) {
          setseasonno(fallback.season_number);
          setepNo(1);
        }
      }
    }
  }, [istv, moviedata?.seasons, seasonno]);

  const d = new Date();
  const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const isReleased =
    category !== "movie" || formatted >= moviedata?.release_date;

  function handletogether(id, title) {
    const roomId = id * 2;

    navigate(`/theater/${title}/${id}/${roomId}`, {
      state: { id: id, roomId: roomId, title: title },
    });
  }

  // Sync URL search params with active season, episode, and playback server
  useEffect(() => {
    const nextParams = {};
    if (istv) {
      nextParams.s = seasonno;
      nextParams.ep = epNo;
    }
    if (serverno) {
      nextParams.server = serverno;
    }
    setsearchParams(nextParams, { replace: true });
  }, [istv, seasonno, epNo, serverno]);

  // Read URL params and update state/context when params change
  useEffect(() => {
    const s = searchParams.get("s") || searchParams.get("season");
    const ep = searchParams.get("ep") || searchParams.get("episode");
    const srv = searchParams.get("server") || searchParams.get("serverno");

    if (s && Number(s) !== Number(seasonno)) setseasonno(Number(s) || s);
    if (ep && Number(ep) !== Number(epNo)) setepNo(Number(ep) || ep);
    if (srv) {
      const parsedSrv = Number(srv);
      if (parsedSrv >= 1 && parsedSrv <= 7 && parsedSrv !== Number(serverno)) {
        setserverno(parsedSrv);
      }
    }
  }, [searchParams]);

  return (
    <main className="watch-page page-enter">
      <Navbar side={false} />

      {loading ? (
        <WatchSkeleton />
      ) : !moviedata ? (
        <div className="ui-error watch-fetch-error" role="alert">
          We could not load this title. Please try again later.
        </div>
      ) : (
        <>
          <div
            className={`watch-layout ${isReleased ? "" : "watch-layout--unreleased"}`}
          >
            <div className="watch-primary">
              {isReleased && (
                <section className="watch-main">
                  <div className="player-container">
                    {!istv ? (
                      <ScreenMovie stateid={state?.id} id={id} />
                    ) : (
                      <ScreenTv
                        stateid={state?.id}
                        id={id}
                        sno={seasonno}
                        epno={epNo}
                      />
                    )}
                  </div>
                  <div className="player-actions">
                    {!istv ? (
                      <button
                        type="button"
                        onClick={() => handletogether(id, moviedata?.title)}
                        className="ui-button ui-button--primary"
                      >
                        Watch Together <UsersIcon />
                      </button>
                    ) : (
                      <div className="episode-nav-buttons">
                        <button
                          type="button"
                          disabled={Number(epNo) <= 1}
                          onClick={() =>
                            setepNo((p) => Math.max(1, Number(p) - 1))
                          }
                          className="ui-button ui-button--secondary"
                        >
                          &larr; Prev Episode
                        </button>
                        <button
                          type="button"
                          disabled={
                            totalEpisodes > 0 && Number(epNo) >= totalEpisodes
                          }
                          onClick={() =>
                            setepNo((p) =>
                              totalEpisodes > 0
                                ? Math.min(totalEpisodes, Number(p) + 1)
                                : Number(p) + 1,
                            )
                          }
                          className="ui-button ui-button--primary"
                        >
                          Next Episode &rarr;
                        </button>
                      </div>
                    )}
                    <span className="server-label">
                      Playback server {serverno}
                    </span>
                  </div>
                  <p className="advisory">
                    Player contains ads. Use an ad blocker or Brave for an
                    ad-free experience.
                  </p>
                </section>
              )}
              {istv && isReleased && (
                <section
                  className="episode-panel"
                  aria-label="Seasons and Episodes"
                >
                  <div className="episode-header-row">
                    <h2>Seasons</h2>
                    {currentSeason && (
                      <span className="current-ep-badge">
                        Playing: S{seasonno} E{epNo}
                      </span>
                    )}
                  </div>
                  <div className="episode-list">
                    {moviedata?.seasons?.map((season) => {
                      const isSelected =
                        Number(seasonno) === Number(season?.season_number);
                      const title =
                        season?.name ||
                        (season?.season_number === 0
                          ? "Specials"
                          : `Season ${season?.season_number}`);

                      return (
                        <button
                          type="button"
                          key={season?.id || season?.season_number}
                          onClick={() => {
                            setseasonno(season?.season_number);
                            setepNo(1);
                          }}
                          className={`episode-button episode-button--season ${
                            isSelected ? "episode-button--active" : ""
                          }`}
                          aria-pressed={isSelected}
                        >
                          {title}
                          {season?.episode_count > 0 && (
                            <span className="episode-badge">
                              ({season.episode_count})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="episode-header-row">
                    <h2>Episodes ({totalEpisodes})</h2>
                  </div>
                  {totalEpisodes > 0 ? (
                    <div className="episode-list episode-list--grid">
                      {Array.from({ length: totalEpisodes }, (_, idx) => {
                        const epNumber = idx + 1;
                        const isCurrent = Number(epNo) === epNumber;
                        return (
                          <button
                            type="button"
                            key={epNumber}
                            className={`episode-button ${
                              isCurrent ? "episode-button--active" : ""
                            }`}
                            aria-pressed={isCurrent}
                            onClick={() => setepNo(epNumber)}
                            title={`Season ${seasonno}, Episode ${epNumber}`}
                          >
                            {epNumber}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="ui-empty">
                      No episodes found for this season.
                    </p>
                  )}
                </section>
              )}
            </div>
            {moviedata && (
              <Data
                moviedata={moviedata}
                setsource={setsource}
                isReleased={isReleased}
              />
            )}
          </div>
          <Similar istv={istv} id={state?.id || id} />
          {moviedata && isReleased && <Bottom moviedata={moviedata} />}
        </>
      )}
    </main>
  );
}

export const ScreenMovie = ({ id, stateid }) => {
  const { serverno } = useContext(searchContext);
  const movieid = stateid || id;
  if (serverno === 1) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_1}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 2) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_2}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 3) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_3}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 4) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_4}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 5) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_5}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 6) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_6}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 7) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_SERVER_7}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
};

export const ScreenTv = ({ id, stateid, sno, epno }) => {
  const { serverno } = useContext(searchContext);
  const movieid = stateid || id;

  if (serverno === 1) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_1}${movieid}/${sno}/${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 2) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_2}${movieid}&s=${sno}&e=${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 3) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_3}${movieid}&s=${sno}&e=${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 4) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_4}${movieid}/${sno}/${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 5) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_5}${movieid}/${sno}/${epno}`}
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 6) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_6}${movieid}/${sno}/${epno}?hide=next`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 7) {
    return (
      <iframe
        className="player-frame"
        src={`${import.meta.env.VITE_TV_SERVER_7}${movieid}/${sno}/${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
};
