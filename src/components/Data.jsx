import React, { useContext, useEffect } from "react";
import { dataContext } from "../Context/Moviedatacontext";
import { searchContext } from "../Context/MovieSearchcontext";

const data = ({ moviedata, setsource }) => {
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
    <section className=" py-12 flex flex-col gap-10 px-8">
      <div className="outline-1 flex h-fit flex-row gap-4 overflow-hidden outline-white/30 w-full rounded-2xl">
        <img
          className="rounded-lg 2xl:h-70 h-90 px-30 xl:px-0"
          src={`https://image.tmdb.org/t/p/w200${moviedata?.poster}`}
          alt=""
        />
        <div className="flex-6 flex gap-2 flex-col w-full h-auto p-4 outline-1 outline-white/30 pointer-events-auto">
          {servers.map((e) => {
            return (
              <button
                onClick={() => setserverno(e)}
                className={
                  serverno === e
                    ? `flex-1 text-black text-lg font-semibold bg-[#f1f1f1] `
                    : `flex-1 text-lg font-semibold bg-[#222222] `
                }
              >
                Server {e}
              </button>
            );
          })}
        </div>
      </div>
      <div className="outline-1 px-6 outline-white/30 w-auto  h-fit rounded-2xl bg-black/20  py-10 flex justify-center gap-5">
        <div className="w-auto  flex gap-4 flex-col">
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
      </div>
    </section>
  );
};

export default data;
