import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { dataContext } from "../Context/Moviedatacontext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const SidebarBtn = () => {
  const { setSidebarOpen } = useContext(dataContext);
  return (
    <div
      onClick={() => {
        setSidebarOpen(true);
      }}
      className=" w-20 aspect-square absolute top-0 left-0 z-100 pointer-events-auto flex items-center justify-center"
    >
      <img
        className="h-6 w-6"
        src="https://img.icons8.com/?size=100&id=8113&format=png&color=ffffff"
        alt=""
      />
    </div>
  );
};

export const Sidebar = () => {
  const { SidebarOpen, setSidebarOpen } = useContext(dataContext);
  const discover = [
    { text: "Now Playing", fun: "fetchplayingMovies" },
    { text: "Popular", fun: "PopularMovies" },
    { text: "Top Rating", fun: "TopMovies" },
    { text: "Upcoming", fun: "Upcomingmovies" },
  ];

  useGSAP(() => {
    gsap.to("#Sidebar", { x: SidebarOpen ? "0vw" : "-30vw" });
  }, [SidebarOpen]);

  return (
    <section
      id="Sidebar"
      className="w-[20vw]  fixed z-10 h-full bg-black/40 backdrop-blur-xl outline-r outline-1 outline-white/30"
    >
      <div className="flex items-center h-20 w-full justify-between">
        <img
          onClick={() => {
            setSidebarOpen(false);
          }}
          className="h-10 pointer-events-auto"
          src="https://img.icons8.com/?size=100&id=3AeKu2y6fJeH&format=png&color=ffffff"
          alt=""
        />
        <img className="h-35" src={logo} alt="" />
      </div>
      <div className="flex flex-col w-full justify-center gap-1 pb-10 ">
        {discover.map((e) => {
          return (
            <h1 className="flex items-center justify-end text-sm w-full text-end h-15 font-semibold uppercase px-4 py-2 bg-black/30  ">
              {e?.text}
            </h1>
          );
        })}
      </div>
    </section>
  );
};
