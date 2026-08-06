import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../Context/Moviedatacontext";
import { searchContext } from "../Context/MovieSearchcontext";
import { SidebarBtn } from "./Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(searchContext);
  const { setmoviedata } = useContext(dataContext);
  const { search, setsearch } = useContext(searchContext);

  async function fetchdata(search) {
    console.log("clicked");
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

  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") {
  //     if (search !== "") {
  //       fetchdata(search);
  //     }
  //   }
  // });

  return (
    <section className="w-screen sticky top-0 h-[8dvh] bg-[#0f0f0f]/20 backdrop-blur-3xl flex justify-around outline-white/30 outline-1">
      <SidebarBtn />
      <div className="flex h-full items-center">
        <img
          onClick={() => navigate("/")}
          className="w-40 "
          src={logo}
          alt=""
        />
      </div>
      <div className="flex h-full items-center">
        <div className="h-14 w-[30vw] flex overflow-hidden rounded-4xl outline-1 outline-white/20">
          <input
            onChange={(e) => setsearch(e.target.value)}
            value={search}
            type="text"
            className="w-[90%] text-2xl flex  font-semibold h-full bg-[#0f0f0f]/50 flex-5 rounded-[4xl_0_0_4xl]  focus:outline-0 px-10 "
          />

          <button
            onClick={() => fetchdata(search)}
            className="h-full bg-[#202526] flex justify-center py-2 text-white flex-1"
          >
            <img
              src="https://img.icons8.com/?size=30&id=aBNtkpYvycsP&format=png&color=ffffff"
              alt=""
            />
          </button>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Navbar;
