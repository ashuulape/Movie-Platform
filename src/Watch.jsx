import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import axios from "axios";
import Bottom from "./components/Bottom";
import { dataContext } from "./Context/Moviedatacontext";
import WatchSkeleton from "./components/WatchSkeleton";
import { searchContext } from "./Context/MovieSearchcontext";

export default function Watch() {
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);
  const [setsource, source] = useState(null);

  const [loading, setLoading] = useState(true);

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

  return (
    <section className="w-fit h-fit min-h-screen min-w-full">
      <Navbar />
      {loading ? (
        <WatchSkeleton />
      ) : (
        <>
          <div className="flex xl:flex-row flex-col w-full h-auto w-[100vw] border-b-1 border-white/30 ">
            <div className="py-10 flex-7 md:px-8 outline-1 outline-white/30 ">
              {state && (
                <Screen id={state.id} source={moviedata?.embed_imdb} />
                // <iframe
                //   className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
                //   src={`https://www.2embed.online/embed/movie/${state.id}`}
                //   frameBorder="0"
                //   allowFullScreen={true}
                // ></iframe>
              )}
            </div>
            {moviedata && <Data moviedata={moviedata} setsource={setsource} />}
          </div>
          <div className="w-full flex gap-4"></div>
          {moviedata && <Bottom moviedata={moviedata} />}
        </>
      )}
    </section>
  );
}

export const Screen = ({ id, source }) => {
  const { serverno } = useContext(searchContext);

  if (serverno === 1) {
    return (
      <iframe
        className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_1}${id}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 2) {
    return (
      <iframe
        className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_2}${id}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 3) {
    return (
      <iframe
        className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_3}${id}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 4) {
    return (
      <iframe
        className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_4}${id}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
  if (serverno === 5) {
    return (
      <iframe
        className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
        src={`${import.meta.env.VITE_SERVER_5}${id}`}
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    );
  }
};
