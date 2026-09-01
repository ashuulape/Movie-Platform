import React, { useContext, useState } from "react";

import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { dataContext } from "./Context/Moviedatacontext";
import Hero from "./components/Hero";
import { searchContext } from "./Context/MovieSearchcontext";
const Home = () => {
  const { category, loading } = useContext(searchContext);
  document.title = `FreeTube : Free movies for everyone`;
  const head = ["Now playing ", "Popular", "Top Rating", "Upcoming"];
  const { movielistno } = useContext(dataContext);
  return (
    <section>
      <Sidebar />
      <Navbar side={true} />
      <div className="relative py-4 flex  justify-center items-center flex-col  ">
        <Hero />
        {!loading && (
          <h1 className=" text-sm md:text-xl bg-black/30 outline-1 outline-white/30 my-4 px-4 rounded-sm font-semibold">
            {head[movielistno]} : {category ? "Movies" : "TV Shows"}
          </h1>
        )}
        <Movies />
      </div>
    </section>
  );
};

export default Home;
