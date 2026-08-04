import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";

import axios from "axios";

const Watch = () => {
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);
  const [source, setsource] = useState(null);
  const [serverno, setserverno] = useState(true);

  useEffect(() => {
    const fetchdata = async (state) => {
      const res = await axios.get(
        `http://localhost:5000/api/movies/${state.id}`,
      );
      setmoviedata(res?.data);
      console.log(res?.data);
    };

    fetchdata(state);
  }, []);

  return (
    <section className="w-full h-fit overflow-x-clip ">
      <Navbar />
      <div className="flex xl:flex-row flex-col h-auto w-[100vw] ">
        <div className="py-10 ">
          {source && serverno ? (
            <iframe
              className="min-w-[70vw] w-full max-w-400 aspect-video flex-7 rounded-2xl"
              src={`https://www.2embed.online/embed/movie/${state.id}`}
              frameborder="0"
              allowfullscreen
            ></iframe>
          ) : (
            <iframe
              className="min-w-[60vw] w-full max-w-400 aspect-video  rounded-2xl"
              src={source}
              frameborder="0"
              allowfullscreen
            ></iframe>
          )}
        </div>
        {moviedata && <Data moviedata={moviedata} setsource={setsource} />}
      </div>
      <div className="w-full flex gap-4">
        <button onClick={() => setserverno(true)}>server1</button>
        <button onClick={() => setserverno(false)}>server2</button>
      </div>
    </section>
  );
};

export default Watch;
