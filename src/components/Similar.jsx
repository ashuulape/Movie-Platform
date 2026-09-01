import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";

const Similar = ({ istv, id }) => {
  const [similardata, setsimilardata] = useState(null);
  useEffect(() => {
    async function fetchsimilar() {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/movie/similar/${id}`,
      );
      setsimilardata(res?.data?.results);
      console.log(res.data.results);
    }
    fetchsimilar();
  }, []);

  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      // Mobile: card is full container width → scroll one full card at a time
      // Desktop: card is w-80 (320px) + gap-8 (32px) = 352px per card
      const amount = isMobile ? scrollRef.current.clientWidth : 352;
      scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full h-fit py-8 flex flex-col gap-6 px-8 items-center">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold">
          Similar {istv ? "Tv shows" : "Movies"} You Would like
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur flex items-center justify-center transition-colors duration-200 border border-white/20"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur flex items-center justify-center transition-colors duration-200 border border-white/20"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="w-full h-fit flex gap-8 overflow-x-scroll overflow-y-hidden scroll-smooth">
        {similardata &&
          similardata.map((e, idx) => <Card key={idx} data={e} />)}
      </div>
    </section>
  );
};

export default Similar;
