import React from "react";

const HomeSkeleton = () => {
  // Create array of 8 skeleton cards for loading grid
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="w-full h-fit flex flex-wrap gap-10 animate-pulse">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="max-w-full w-80 min-w-50 h-fit flex-1 flex flex-col gap-3"
        >
          {/* Movie Poster Skeleton */}
          <div className="w-full aspect-[2/3] bg-white/10 rounded-xl overflow-hidden shadow-lg flex items-center justify-center border border-white/10">
            <svg
              className="w-12 h-12 text-white/20"
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
          <div className="h-5 w-3/4 bg-white/20 rounded-md mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;
