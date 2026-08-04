import React from "react";

const data = ({ moviedata }) => {
  console.log(moviedata.genres);
  return (
    <section className="px-10 py-12 flex flex-col gap-10 w-full">
      <div>
        <img
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/w200${moviedata?.poster_path}`}
          alt=""
        />
      </div>
      <div className="outline-1 outline-white/30 w-full h-fit rounded-2xl bg-black/20 px-8 py-10 flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">{moviedata?.title}</h1>
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
        <div className="w-full flex gap-5 ">
          {moviedata.genres.map((e, idx) => {
            return (
              <span
                className=" border-1 border-white/30 rounded px-2 py-1"
                id={idx}
              >
                {e.name}
              </span>
            );
          })}
        </div>
        <div className="flex flex-col ">
          <span className="text-lg">
            <span className="font-semibold"> Release Date :</span>{" "}
            {moviedata?.release_date}
          </span>
          <span className="text-lg">
            <span className="font-semibold"> Runtime :</span>{" "}
            {Math.floor(moviedata?.runtime / 60) +
              "h " +
              Math.floor(moviedata?.runtime % 60) +
              "min"}
          </span>
          <span className="text-lg">
            <span className="font-semibold"> Status :</span> {moviedata?.status}
          </span>
        </div>
      </div>
    </section>
  );
};

export default data;
