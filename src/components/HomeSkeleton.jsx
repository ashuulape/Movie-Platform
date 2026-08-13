import React from "react";

const HomeSkeleton = () => {
  const ismobile = Window.innerWidth < 768;
  const skeletonCards = Array.from({ length: ismobile ? 5 : 20 });

  return (
    <div className="w-full flex flex-col pb-10 items-center animate-pulse">
      {/* Cards Grid Skeleton */}
      <div className="w-[90%] py-8 h-fit flex flex-wrap gap-10">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="max-w-100 relative w-80 min-w-60  flex-1 object-contain overflow-hidden flex flex-col"
          >
            {/* Rating Badge Skeleton */}
            <div className="w-12 h-6 bg-white/20 backdrop-blur-xs absolute z-4 right-1/20 top-1/40 outline-1 outline-white/30 rounded-xl"></div>

            {/* Movie Poster Skeleton */}
            <div className="w-full aspect-2/3  h-auto bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
              <svg
                className="w-8 h-8 text-white/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Movie Title Skeleton */}
            <div className="h-6 w-3/4 bg-white/20 rounded-md mt-2"></div>

            {/* Movie Release Date Skeleton */}
            <div className="h-4 w-1/3 bg-white/10 rounded-md mt-1"></div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex gap-10 justify-center text-sm sm:text-xl font-bold">
        <div className="w-10 h-8 bg-white/10 outline-1 outline-white/30 rounded"></div>
        <div className="w-14 h-8 bg-white/10 outline-1 outline-white/30 rounded"></div>
        <div className="w-10 h-8 bg-white/10 outline-1 outline-white/30 rounded"></div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
