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
  const [seasonno, setseasonno] = useState(0);
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

  return (
    <section className="w-[100dvw] overflow-x-clip h-fit min-h-screen min-w-full">
      <Navbar side={false} />

      {loading ? (
        <WatchSkeleton />
      ) : (
        <>
          <div className="flex xl:flex-row flex-col w-[100dvw] h-auto  border-b-1 border-white/30 ">
            {isReleased && (
              <div className="md:py-10 py-4 px-2 w-full flex flex-col md:gap-4 gap-2 items-center flex-7 md:px-8 outline-1 outline-white/30 backdrop-blur-3xl ">
                <div
                  className="absolute inset-0 blur-2xl opacity-30 scale-110 "
                  style={{
                    backgroundImage: `url(${moviedata?.backdrops[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="bg-black pb-2 h-fit w-full  rounded-sm md:rounded-2xl overflow-hidden flex flex-col items-center md:gap-2 text-center">
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

                  <div className="flex items-center gap-10">
                    {!istv && (
                      <button
                        onClick={() => handletogether(id, moviedata?.title)}
                        className="w-fit h-fit px-8 py-2 bg-white text-black font-semibold items-center gap-2 my-4 flex  rounded-sm pointer-events-auto relative "
                      >
                        Watch Together <UsersIcon />
                      </button>
                    )}
                    <h1 className=" text-sm my-2 md:text-xl h-fit  font-semibold font-roboto outline-1 outline-white/30 px-2 rounded bg-black/40 ">
                      Server {serverno}
                    </h1>
                  </div>
                  <h2 className="text-red-700 font-semibold text-[10px] md:text-lg">
                    <span className="font-bold">NOTE : </span>
                    Player contains Ads — try using an Adblocker or Brave
                    Browser for an Ad-free experience
                  </h2>
                </div>
                {istv && (
                  <div className="w-full h-fit text-white font-thin relative flex flex-col gap-2">
                    <h2 className="font-bold">Seasons :</h2>
                    <div className="flex w-full gap-2 text-white font-bold flex-wrap">
                      {moviedata?.seasons?.slice(0).map((e, idx) => (
                        <button
                          onClick={() => setseasonno(idx)}
                          className={` px-2 rounded-sm ${seasonno == idx ? "bg-[#EDEBEA] text-black" : "bg-[#232323]/30 outline-1 outline-white/10"}`}
                          id={idx}
                        >
                          {moviedata?.seasons[1]?.name?.startsWith("Season")
                            ? e?.name
                            : e?.season_number == 0
                              ? e?.name
                              : e?.season_number}
                        </button>
                      ))}
                    </div>
                    <h2 className="font-bold">Episode : </h2>
                    <div className="grid grid-cols-6 sm:grid-cols-12 auto-rows-max w-full gap-2 text-white font-bold">
                      {Array.from(
                        { length: moviedata?.seasons[seasonno]?.episode_count },
                        (_, idx) => (
                          <button
                            className={` px-2 rounded-sm ${epNo == idx + 1 ? "bg-[#EDEBEA] text-black" : "bg-[#232323]/30 outline-1 outline-white/10"}`}
                            onClick={() => setepNo(idx + 1)}
                            key={idx}
                          >
                            {idx + 1}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {moviedata && (
              <Data
                moviedata={moviedata}
                setsource={setsource}
                isReleased={isReleased}
              />
            )}
          </div>
          <Similar istv={istv} id={state?.id || id} />
          <div className="w-full flex gap-4"></div>
          {moviedata && isReleased && <Bottom moviedata={moviedata} />}
        </>
      )}
    </section>
  );
}

export const ScreenMovie = ({ id, stateid }) => {
  const { serverno } = useContext(searchContext);
  const movieid = stateid || id;
  if (serverno === 1) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video "
        src={`${import.meta.env.VITE_SERVER_1}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 2) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video "
        src={`${import.meta.env.VITE_SERVER_2}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 3) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video"
        src={`${import.meta.env.VITE_SERVER_3}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 4) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video "
        src={`${import.meta.env.VITE_SERVER_4}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 5) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video "
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
        className="min-w-[70vw] relative w-full max-w-400 aspect-video"
        src={`${import.meta.env.VITE_TV_SERVER_1}${movieid}/${sno}/${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 2) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video "
        src={`${import.meta.env.VITE_TV_SERVER_2}${movieid}&s=${sno}&e=${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 3) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video"
        src={`${import.meta.env.VITE_TV_SERVER_3}${movieid}&s=${sno}&e=${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 4) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video"
        src={`${import.meta.env.VITE_TV_SERVER_4}${movieid}/${sno}/${epno}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 5) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video "
        src={`${import.meta.env.VITE_TV_SERVER_5}${movieid}/${sno}/${epno}`}
        allowFullScreen={true}
      ></iframe>
    );
  }
};
