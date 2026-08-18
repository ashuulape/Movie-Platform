import React, { useContext, useState } from "react";

import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { dataContext } from "./Context/Moviedatacontext";
const Home = () => {
  document.title = `FreeTube : Free movies for everyone`;
  const head = ["Now playing ", "popular", "top rating", "upcoming"];
  const { movielistno } = useContext(dataContext);
  return (
    <section>
      <Sidebar />
      <Navbar side={true} />
      <div className="relative py-4 flex  justify-center items-center flex-col  ">
        <h1 className=" sticky top-[8vh] md:top-[10vh] backdrop-blur-lg z-8 w-fit md:px-4 px-2 rounded-sm tracking-widest  text-sm md:text-xl uppercase font-extralight bg-black/30 outline-1 outline-white/30 md:rounded-lg md:py-1">
          {head[movielistno]}
        </h1>
        <Movies />
      </div>
    </section>
  );
};

export default Home;
