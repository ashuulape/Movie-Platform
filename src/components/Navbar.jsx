import React, { useContext, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../Context/Moviedatacontext";
import { searchContext } from "../Context/MovieSearchcontext";
import { SidebarBtn } from "./Sidebar";

const Navbar = ({ side }) => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(searchContext);
  const { setmoviedata } = useContext(dataContext);
  const { search, setsearch } = useContext(searchContext);

  async function fetchdata(search) {
    navigate("/");
    setLoading(true);
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      },
    );
    console.log(res.data);
    setmoviedata(res?.data?.results);
    setLoading(false);
  }

  return (
    <section className="w-[100dvw] sticky z-10 top-0 h-15 md:h-[8dvh] bg-[#0f0f0f]/20 backdrop-blur-3xl flex justify-between   sm:px-10 outline-white/30 outline-1">
      <div className="flex gap-0 sm:gap-4">
        {side && <SidebarBtn />}
        <div
          onClick={() => navigate("/")}
          className="flex  h-full items-center justify-center border-r-1  border-white/30"
        >
          <img
            className="md:h-10 h-8 rotate-z-180 "
            src="https://img.icons8.com/?size=200&id=37326&format=png&color=d02525"
            alt=""
          />
          <h2 className="md:text-2xl text-sm md:px-2 px-0 h-fit w-fit font-semibold tracking-tighter font-roboto pointer-events-none">
            FreeTube
          </h2>
        </div>
      </div>
      <div className="flex h-full  items-center py-3">
        <div className="h-full min-w-45  w-[30vw] max-w-150 flex overflow-hidden rounded-4xl outline-1 outline-white/20">
          <input
            onChange={(e) => setsearch(e.target.value)}
            value={search}
            type="text"
            className="w-[90%] text-xl md:text-2xl flex  font-semibold h-full bg-[#0f0f0f]/50 flex-5 rounded-[4xl_0_0_4xl]  focus:outline-0 md:px-10 px-4 "
          />

          <button
            onClick={() => fetchdata(search)}
            className="h-full min-w-fit  aspect-square bg-[#202526]/40 flex justify-center p-2 text-white flex-1"
          >
            <img
              src="https://img.icons8.com/?size=100&id=aBNtkpYvycsP&format=png&color=ffffff"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className="h-full py-4 border-l-1 border-white/30">
        <a target="blank" href="https://github.com/ashuulape">
          <img
            className="h-full px-2"
            src="https://img.icons8.com/?size=150&id=zuHqpgzrusU5&format=png&color=f1f1f1"
            alt="github"
          />
        </a>
      </div>
    </section>
  );
};

export default Navbar;
