import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";
import axios from "axios";
import Bottom from "./components/Bottom";
import { dataContext } from "./Context/Moviedatacontext";
import WatchSkeleton from "./components/WatchSkeleton";

const Watch = () => {
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);
  const [source, setsource] = useState(null);
  const [serverno, setserverno] = useState(1);
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
          `${import.meta.env.VITE_BACKEND}/api/movies/${state.id}`
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
                <iframe
                  className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl"
                  src={`https://www.2embed.online/embed/movie/${state.id}`}
                  frameBorder="0"
                  allowFullScreen={true}
                ></iframe>
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
};

export default Watch;
