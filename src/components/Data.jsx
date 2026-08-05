import React from "react";

const data = ({ moviedata, setsource }) => {
  const cast = moviedata?.cast.slice(0, 4);
  setsource(moviedata?.embed_tmdb);

  return (
    <section className=" py-12 flex xl:flex-col items-center gap-10 w-fit flex-4  ">
      <div className="flex items-center w-7/8">
        <img
          className="rounded-lg h-80 w-fit aspect-auto flex-0 shrink-0"
          src={moviedata?.poster}
          alt=""
        />
      </div>
      <div className="outline-1 outline-white/30 w-7/8 h-fit rounded-2xl bg-black/20  py-10 flex justify-center ">
        <div className="w-7/8 flex flex-col  gap-5">
          <h1 className="text-xl font-semibold">
            {moviedata?.title} <br />
            <span className="text-sm text-white/50">{moviedata?.tagline}</span>
          </h1>

          <div className="w-fit  bg-amber-600 px-4 py-2 rounded-2xl flex items-center font-bold gap-2">
            {" "}
            <img
              className="h-fit"
              src="https://img.icons8.com/?size=15&id=7856&format=png&color=ffffff"
              alt=""
            />
            {Math.floor(moviedata?.vote_average * 10) / 10}
          </div>
          <h2 className="text-sm text-white/50">{moviedata?.overview}</h2>
          <div className="w-fit flex gap-5 flex-wrap ">
            {moviedata.genres.map((e, idx) => {
              return (
                <span
                  className=" border-1 text-sm border-white/30 rounded px-2 py-1"
                  id={idx}
                >
                  {e}
                </span>
              );
            })}
          </div>
          <div className="flex flex-col ">
            <span className="text-sm">
              <span className="font-semibold"> Cast :</span>
              {cast.map((e) => e?.name + " ,")}
            </span>
            <span className="text-sm">
              <span className="font-semibold"> Release Date :</span>{" "}
              {moviedata?.release_date}
            </span>
            <span className="text-sm">
              <span className="font-semibold"> Runtime :</span>{" "}
              {Math.floor(moviedata?.runtime / 60) +
                "h " +
                Math.floor(moviedata?.runtime % 60) +
                "min"}
            </span>
            <span className="text-sm">
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
