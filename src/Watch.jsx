import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Data from "./components/Data";

import axios from "axios";
import Bottom from "./components/Bottom";
import { dataContext } from "./Context/Moviedatacontext";

const Watch = () => {
  const { state } = useLocation();
  const [moviedata, setmoviedata] = useState(null);
  const [source, setsource] = useState(null);

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
    <section className="w-fit h-fit">
      <Navbar />
      <div className="flex   xl:flex-row flex-col w-full h-auto w-[100vw] border-b-1 border-white/30 ">
        <div className="py-10 flex-7 md:px-8 outline-1 outline-white/30 ">
          {state && (
            <iframe
              className="min-w-[70vw] w-full max-w-400 aspect-video  md:rounded-2xl"
              src={source}
              frameborder="0"
              allowfullscreen="true"
            ></iframe>
          )}
        </div>
        {moviedata && <Data moviedata={moviedata} setsource={setsource} />}
      </div>
      <div className="w-full flex gap-4"></div>
      <Bottom moviedata={moviedata} />
    </section>
  );
};

export default Watch;
