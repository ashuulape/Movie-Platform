import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WatchSkeleton from "./components/WatchSkeleton";
import { searchContext } from "./Context/MovieSearchcontext";

const Watchtv = () => {
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
  const { serverno } = useContext(searchContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [moviedata, setmoviedata] = useState(null);
  const [isReleased, setisReleased] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/movie/${state?.id || id}`,
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
                <div className="flex items-center gap-10">
                  <button
                    onClick={() => handletogether(id, moviedata?.title)}
                    className="w-fit h-fit px-8 py-2 bg-white text-black font-semibold items-center gap-2 my-4 flex  rounded-sm pointer-events-auto relative "
                  >
                    Watch Together <UsersIcon />
                  </button>
                  <h1 className=" text-sm md:text-xl h-fit  font-semibold font-roboto outline-1 outline-white/30 px-2 rounded bg-black/40 ">
                    Server {serverno}
                  </h1>
                </div>
                <h2 className="text-red-700 font-semibold text-[10px] md:text-lg">
                  <span className="font-bold">NOTE : </span>
                  Player contains Ads — try using an Adblocker or Brave Browser
                  for an Ad-free experience
                </h2>
              </div>
            )}
            {moviedata && (
              <Data moviedata={moviedata} isReleased={isReleased} />
            )}
          </div>
          <div className="w-full flex gap-4"></div>
          {moviedata && isReleased && <Bottom moviedata={moviedata} />}
        </>
      )}
    </section>
  );
};

export default Watchtv;

export const Screen = ({ id, stateid }) => {
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
