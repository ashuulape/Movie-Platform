import React from "react";

const data = ({ moviedata, setsource }) => {
  setsource(moviedata?.embed_imdb);
  let cast;
  if (moviedata) {
    cast = moviedata?.cast.slice(0, 4);
  }
  return (
    <section className=" py-12 flex flex-col gap-10 px-8">
      <div className="outline-1 outline-white/30 w-fit rounded-2xl">
        <img
          className="rounded-lg h-70"
          src={`https://image.tmdb.org/t/p/w200${moviedata?.poster}`}
          alt=""
        />
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
            {Math.floor(moviedata?.vote_average * 10) / 10}
          </div>
          <h2 className="text-sm text-white/50">{moviedata?.overview}</h2>
          <div className="w-full flex gap-5 ">
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
          <div className="flex flex-col text-sm">
            <span>
              <span className="font-semibold"> Cast :</span>{" "}
              {cast.map((e) => e?.name + " ,")}
            </span>
            <span>
              <span className="font-semibold"> Release Date :</span>{" "}
              {moviedata?.release_date}
            </span>
            <span>
              <span className="font-semibold"> Runtime :</span>{" "}
              {Math.floor(moviedata?.runtime / 60) +
                "h " +
                Math.floor(moviedata?.runtime % 60) +
                "min"}
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
