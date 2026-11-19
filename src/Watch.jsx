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
  const [epNo, setepNo] = useState(1);
  const [seasonno, setseasonno] = useState(1);
  const { serverno } = useContext(searchContext);

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

  useEffect(() => {
    if (istv) {
      setsearchParams({ s: seasonno, ep: epNo });
    }
  }, [istv, seasonno, epNo]);

  useEffect(() => {
    const { s, ep } = Object.fromEntries(searchParams);
    s && setseasonno(s);
    ep && setepNo(ep);
  }, []);

  console.log();

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
          <div className={`watch-layout ${isReleased ? "" : "watch-layout--unreleased"}`}>
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
                  {!istv && (
                    <button
                      type="button"
                      onClick={() => handletogether(id, moviedata?.title)}
                      className="ui-button ui-button--primary"
                    >
                      Watch Together <UsersIcon />
                    </button>
                  )}
                  <span className="server-label">Playback server {serverno}</span>
                </div>
                <p className="advisory">
                  Player contains ads. Use an ad blocker or Brave for an
                  ad-free experience.
                </p>
              </section>
            )}
            {istv && isReleased && (
              <section className="episode-panel">
                <h2>Seasons</h2>
                <div className="episode-list">
                  {moviedata?.seasons?.slice(0).map((e, idx) => (
                    <button
                      type="button"
                      onClick={() => setseasonno(idx)}
                      className="episode-button"
                      aria-pressed={seasonno == e?.season_number}
                      id={idx}
                      key={idx}
                    >
                      {moviedata?.seasons[1]?.name?.startsWith("Season")
                        ? e?.name
                        : e?.season_number == 0
                          ? e?.name
                          : e?.season_number}
                    </button>
                  ))}
                </div>
                <h2>Episodes</h2>
                <div className="episode-list">
                  {Array.from(
                    {
                      length: moviedata?.seasons?.find(
                        (e) => e?.season_number == seasonno,
                      )?.episode_count,
                    },
                    (_, idx) => (
                      <button
                        type="button"
                        className="episode-button"
                        aria-pressed={epNo == idx + 1}
                        onClick={() => setepNo(idx + 1)}
                        key={idx}
                      >
                        {idx + 1}
                      </button>
                    ),
                  )}
                </div>
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
};
