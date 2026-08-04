import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";

import axios from "axios";

const Watch = () => {
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);

  useEffect(() => {
    const fetchdata = async (state) => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${state.id}`,
        {
          headers: {
            Accept: "appliction/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        },
      );
      setmoviedata(res?.data);
      console.log(res?.data);

      const res2 = await axios.get(
        `https://api.2embed.cc/movie?tmdb_id=969681`,
      );

      console.log(res2?.data);
    };

    fetchdata(state);
  }, []);

  return (
    <section className="w-[100vw] h-fit">
      <Navbar />
      <div className="flex h-fit w-screen">
        {/* <iframe
          className="min-w-[70vw] w-full max-w-400 aspect-video h-auto rounded-2xl"
          src={`https://www.2embed.online/embed/movie/${state.id}`}
          frameborder="0"
          allowfullscreen
        ></iframe> */}
        {moviedata && <Data moviedata={moviedata} />}
      </div>
    </section>
  );
};

export default Watch;
