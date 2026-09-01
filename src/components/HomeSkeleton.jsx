import React, { useEffect, useState } from "react";

const HomeSkeleton = () => {
  const [ismobile, setismobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setismobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const skeletonCards = Array.from({ length: ismobile ? 5 : 20 });

  return (
    <section className="animate-pulse w-full">
      <div className="relative py-4 flex justify-center items-center flex-col">
        {/* Hero Skeleton */}
        {/* */}

        {/* Heading Skeleton */}
        <div className="h-10 w-64 bg-white/10 outline-1 outline-white/30 my-6 px-4 rounded-sm"></div>

        {/* Movies Grid Skeleton */}
        <div className="w-fit flex flex-col pb-10 items-center">
          <div className="w-[90%] py-8 h-fit flex flex-wrap gap-4 md:gap-10">
            {skeletonCards.map((_, index) =>
              ismobile ? (
                /* Mobile Card Skeleton */
                <div
                  key={index}
                  className="relative px-2 py-4 w-full min-w-full rounded-sm aspect-video flex flex-row gap-2 flex-1 bg-white/5"
                >
                  {/* Poster Skeleton */}
                  <div className="h-full w-fit">
                    <div className="h-full aspect-2/3 bg-white/10 rounded flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white/20"
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
                  </div>
                  {/* Info Skeleton */}
                  <div className="h-fit flex gap-2 flex-col w-fit flex-6 py-4">
                    <div className="h-6 w-3/4 bg-white/20 rounded-md ml-auto"></div>
                    <div className="flex justify-end gap-1 w-full h-fit">
                      <div className="h-4 w-12 bg-white/10 rounded-sm"></div>
                      <div className="h-4 w-10 bg-white/10 rounded-sm"></div>
                      <div className="h-4 w-14 bg-white/10 rounded-sm"></div>
                    </div>
                    <div className="h-3 w-20 bg-white/10 rounded-md"></div>
                    <span className="absolute z-4 right-1/50 top-1/40 w-12 h-5 bg-black/40 backdrop-blur-xs outline-1 outline-white/30 rounded-sm"></span>
                    <div className="h-3 w-full bg-white/10 rounded-md"></div>
                    <div className="h-3 w-4/5 bg-white/10 rounded-md"></div>
                    <div className="h-4 w-16 bg-white/10 rounded-sm"></div>
                  </div>
                </div>
              ) : (
                /* Desktop Card Skeleton */
                <div
                  key={index}
                  className="max-w-100 relative w-80 min-w-60 h-fit flex-row flex-1 object-contain overflow-hidden"
                >
                  <div className="w-12 h-6 bg-white/20 backdrop-blur-xs absolute z-4 right-1/20 top-1/40 outline-1 outline-white/30 rounded-xl"></div>
                  <div className="w-16 h-4 bg-white/10 absolute top-4 left-2 z-4 rounded-sm"></div>
                  <div className="w-full aspect-2/3 min-h-fit bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
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
                  <div className="h-6 w-3/4 bg-white/20 rounded-md mt-2"></div>
                  <div className="h-4 w-1/3 bg-white/10 rounded-md mt-1"></div>
                </div>
              ),
            )}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex gap-10 justify-center text-sm sm:text-xl font-bold">
            <div className="w-10 h-8 bg-white/10 outline-1 outline-white/30 rounded"></div>
            <div className="w-14 h-8 bg-white/10 outline-1 outline-white/30 rounded"></div>
            <div className="w-10 h-8 bg-white/10 outline-1 outline-white/30 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSkeleton;
