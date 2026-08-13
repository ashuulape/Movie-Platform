import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import axios from "axios";
import Bottom from "./components/Bottom";
import { dataContext } from "./Context/Moviedatacontext";
import WatchSkeleton from "./components/WatchSkeleton";
import { searchContext } from "./Context/MovieSearchcontext";

export default function Watch() {
  const [movieid, setmovieid] = useState(null);

  const { title, id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);
  const [setsource, source] = useState(null);
  const { serverno } = useContext(searchContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/movies/${id}`,
        );
        setmoviedata(res?.data);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  document.title = `Watch : ${moviedata?.title || ""}`;

  useEffect(() => {
    const fetchdata = async () => {
      if (!state?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/movies/${state.id}`,
        );
        setmoviedata(res?.data);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [state?.id]);

  const d = new Date();
  const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const isReleased = formatted > moviedata?.release_date;

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

                <Screen
                  stateid={state?.id}
                  id={id}
                  source={moviedata?.embed_imdb}
                />

                <h1 className=" text-sm md:text-xl font-semibold font-roboto outline-1 outline-white/30 px-2 rounded bg-black/40 ">
                  Server {serverno}
                </h1>
                <h2 className="text-red-700 font-semibold text-[10px] md:text-lg">
                  <span className="font-bold">NOTE : </span>
                  Player contains Ads — try using an Adblocker or Brave Browser
                  for an Ad-free experience
                </h2>
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
          <div className="w-full flex gap-4"></div>
          {moviedata && isReleased && <Bottom moviedata={moviedata} />}
        </>
      )}
    </section>
  );
}

export const Screen = ({ id, stateid, source }) => {
  const { serverno } = useContext(searchContext);
  const movieid = stateid || id;
  if (serverno === 1) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_1}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 2) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_2}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 3) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_3}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 4) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_4}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 5) {
    return (
      <iframe
        className="min-w-[70vw] relative w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_5}${movieid}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
};
