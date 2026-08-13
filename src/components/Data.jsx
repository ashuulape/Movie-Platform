import React, { useContext, useEffect } from "react";
import { dataContext } from "../Context/Moviedatacontext";
import { searchContext } from "../Context/MovieSearchcontext";
import { useSearchParams } from "react-router-dom";

const data = ({ moviedata, setsource, isReleased }) => {
  const { serverno, setserverno } = useContext(searchContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const servers = [1, 2, 3, 4, 5];
  useEffect(() => {
    setSearchParams({ s: serverno });
  }, [serverno]);

  useEffect(() => {
    if (moviedata?.embed_imdb && typeof setsource === "function") {
      setsource(moviedata.embed_imdb);
    }
  }, [moviedata, setsource]);

  const cast = moviedata?.cast ? moviedata.cast.slice(0, 4) : [];
  const genres = moviedata?.genres || [];

  return (
    <section
      className={
        isReleased
          ? "py-6 md:py-12 flex flex-col gap-10 px-6 md:px-8"
          : "py-6 md:py-12 flex lg:flex-row flex-col  gap-10 px-6 md:px-8"
      }
    >
      <div
        className={
          isReleased
            ? "outline-1 flex  h-fit flex-row gap-4 overflow-hidden outline-white/30 w-full rounded-sm md:rounded-2xl"
            : "outline-1 flex  h-full flex-row gap-4 overflow-hidden outline-white/30 w-fit rounded-sm md:rounded-2xl"
        }
      >
        <div className="w-fit h-fit p-2">
          <img
            className={
              isReleased
                ? " 2xl:h-70 h-60 w-fit  xl:px-0"
                : " md:h-100 h-60  w-fit  xl:px-0"
            }
            src={`https://image.tmdb.org/t/p/w200${moviedata?.poster}`}
            alt=""
          />
        </div>
        {isReleased && (
          <div className="flex-6 flex gap-2 flex-col w-full h-auto p-4 outline-1 outline-white/30 pointer-events-auto">
            {servers.map((e) => {
              return (
                <button
                  onClick={() => setserverno(e)}
                  className={
                    serverno === e
                      ? `flex-1 text-black text-lg font-semibold bg-[#f1f1f1] pointer-events-auto`
                      : `flex-1 text-lg font-semibold bg-[#222222] pointer-events-auto `
                  }
                >
                  Server {e}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className=" flex-4 outline-1 px-6 outline-white/30 w-auto  h-fit rounded-sm md:rounded-2xl bg-black/20 py-4 md:py-10 flex justify-center flex-col-reverse 2xl:flex-row gap-5">
        <div className="w-auto  flex gap-4 flex-col">
          {!isReleased && (
            <h1 className=" text-2xl text-red-600 font-bold">
              !{moviedata?.title} is not Released yet! or not availabe
            </h1>
          )}
          <h1 className="text-2xl font-semibold">{moviedata?.title}</h1>
          <div className="w-fit px-4 py-1  bg-amber-600  py-1 rounded-2xl flex items-center font-bold gap-2">
            {" "}
            <img
              className="h-fit "
              src="https://img.icons8.com/?size=15&id=7856&format=png&color=ffffff"
              alt=""
            />
            {moviedata?.vote_average
              ? Math.floor(moviedata.vote_average * 10) / 10
              : "N/A"}
          </div>
          <h2 className="text-sm text-white/50">{moviedata?.overview}</h2>
          <div className="w-fit flex gap-5 flex-wrap ">
            {genres.map((e, idx) => {
              return (
                <span
                  className=" border-1 text-sm border-white/30 rounded px-2 py-1"
                  key={idx}
                >
                  {e}
                </span>
              );
            })}
          </div>
          <div className="flex flex-col text-sm">
            <span>
              <span className="font-semibold"> Cast :</span>{" "}
              {cast
                .map((e) => e?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
            <span>
              <span className="font-semibold"> Release Date :</span>{" "}
              {moviedata?.release_date}
            </span>
            <span>
              <span className="font-semibold"> Runtime :</span>{" "}
              {moviedata?.runtime
                ? `${Math.floor(moviedata.runtime / 60)}h ${Math.floor(moviedata.runtime % 60)}min`
                : "N/A"}
            </span>
            <span>
              <span className="font-semibold"> Status :</span>{" "}
              {moviedata?.status}
            </span>
          </div>
        </div>
        {!isReleased && (
          <div className="w-full aspect-video">
            <iframe
              className="w-full h-full rounded"
              src={moviedata?.trailer}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default data;
