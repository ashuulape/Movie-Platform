import React from "react";

const Bottom = ({ moviedata }) => {
  console.log(moviedata);
  return (
    <section>
      <div className="flex md:flex-row flex-col h-fit w-[100dvw] gap-5 md:gap-10  ">
        <div className="flex-4 outline-1 outline-white/30  px-10 py-12">
          <div className="aspect-video w-full flex gap-4 flex-col items-center ">
            <h1 className="font-bold text-2xl">Trailer:</h1>
            <iframe
              className="w-full h-full rounded"
              src={moviedata?.trailer}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="flex-6 flex gap-8 flex-col pt-10 px-10">
          <h1 className="text-2xl font-bold w-full text-center">Comments</h1>
          <div className="flex flex-col gap-2 h-[] overflow-y-clip ">
            {moviedata?.reviews.map((e) => {
              return (
                <div className="text-sm outline-1 outline-white/30 w-full bg-black/60 rounded px-4 py-2">
                  <h1 className="font-semibold text-lg w-full flex justify-between flex-row mb-2">
                    {e?.author}{" "}
                    <span className="font-normal text-xs text-white/60">
                      {e?.created_at.split("T")[0]}
                    </span>
                  </h1>

                  <h2 className="text-white/70">
                    {e?.content.slice(0, 500)}...
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bottom;
