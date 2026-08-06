import React from "react";

const WatchSkeleton = () => {
  return (
    <div className="w-full h-auto animate-pulse">
      {/* Top Main Section: Video & Details */}
      <div className="flex xl:flex-row flex-col w-full h-auto w-[100vw] border-b border-white/20">
        {/* Left Side: Video Player Skeleton */}
        <div className="py-10 flex-7 md:px-8 outline-1 outline-white/20">
          <div className="min-w-[70vw] w-full max-w-400 aspect-video md:rounded-2xl bg-white/10 flex items-center justify-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white/40 ml-1"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Movie Data Skeleton */}
        <div className="py-12 flex flex-col gap-10 px-8 flex-5">
          {/* Poster Skeleton */}
          <div className="outline-1 outline-white/20 w-fit rounded-2xl overflow-hidden">
            <div className="rounded-lg h-70 w-48 bg-white/10"></div>
          </div>

          {/* Info Box Skeleton */}
          <div className="outline-1 px-6 outline-white/20 w-full h-fit rounded-2xl bg-black/20 py-10 flex flex-col gap-5">
            {/* Title Skeleton */}
            <div className="h-8 w-3/4 bg-white/20 rounded-md"></div>

            {/* Rating Badge Skeleton */}
            <div className="w-20 h-7 bg-amber-600/40 rounded-2xl flex items-center justify-center">
              <div className="h-4 w-10 bg-white/20 rounded"></div>
            </div>

            {/* Overview Skeleton */}
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-white/10 rounded"></div>
              <div className="h-3.5 w-11/12 bg-white/10 rounded"></div>
              <div className="h-3.5 w-4/5 bg-white/10 rounded"></div>
            </div>

            {/* Genres Skeleton */}
            <div className="w-fit flex gap-3 flex-wrap">
              <div className="h-7 w-16 bg-white/10 border border-white/20 rounded"></div>
              <div className="h-7 w-20 bg-white/10 border border-white/20 rounded"></div>
              <div className="h-7 w-14 bg-white/10 border border-white/20 rounded"></div>
            </div>

            {/* Details Skeleton (Cast, Release, Runtime, Status) */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="h-4 w-2/3 bg-white/10 rounded"></div>
              <div className="h-4 w-1/2 bg-white/10 rounded"></div>
              <div className="h-4 w-2/5 bg-white/10 rounded"></div>
              <div className="h-4 w-1/3 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Trailer & Comments Skeleton */}
      <div className="flex flex-col xl:flex-row h-fit gap-10 p-6 md:p-10">
        {/* Left Side: Trailer Skeleton */}
        <div className="flex-4 outline-1 outline-white/20 px-6 py-8 md:px-10 md:py-12 rounded-xl">
          <div className="aspect-video w-full flex flex-col gap-4">
            <div className="h-7 w-28 bg-white/20 rounded-md"></div>
            <div className="w-full h-full rounded-lg bg-white/10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Comments Skeleton */}
        <div className="flex-6 flex gap-6 flex-col pt-6 md:pt-10 px-4 md:px-10">
          <div className="h-8 w-36 mx-auto bg-white/20 rounded-md"></div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="outline-1 outline-white/20 w-full bg-black/60 rounded-xl px-4 py-4 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 w-32 bg-white/20 rounded"></div>
                  <div className="h-3.5 w-20 bg-white/10 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-white/10 rounded"></div>
                  <div className="h-3.5 w-4/5 bg-white/10 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchSkeleton;
