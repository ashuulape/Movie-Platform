import React, { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setmoviedata }) => {
  const navigate = useNavigate();
  const [search, setsearch] = useState("");

  async function fetchdata(search) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      },
    );

    setmoviedata(res?.data?.results);
  }

  return (
    <section className="w-full h-[8dvh] bg-[#0f0f0f] flex justify-around">
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
