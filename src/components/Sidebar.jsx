import React, { useContext } from "react";

import { dataContext } from "../Context/Moviedatacontext";
import { searchContext } from "../Context/MovieSearchcontext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const SidebarBtn = () => {
  const { setSidebarOpen, setmovielistno, movielistno } =
    useContext(dataContext);
  return (
    <div
      onClick={() => {
        setSidebarOpen((prev) => !prev);
      }}
      className=" h-full w-fit px-2 relative left-0  z-100 pointer-events-auto flex items-center justify-center"
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
  const { category, setcategory } = useContext(searchContext);
  const categoryname = [
    { text: "movie", value: true },
    { text: "TV Shows", value: false },
  ];
  const {
    SidebarOpen,
    setSidebarOpen,
    setmovielistno,
    movielistno,
    setpageno,
  } = useContext(dataContext);
  const discover = category
    ? [
        { text: "Now Playing", no: 0 },
        { text: "Popular", no: 1 },
        { text: "Top Rating", no: 2 },
        { text: "Upcoming", no: 3 },
      ]
    : [
        { text: "Popular", no: 1 },
        { text: "Top Rating", no: 2 },
      ];

  useGSAP(() => {
    gsap.to("#Sidebar", {
      x: SidebarOpen ? "0vw" : "-70dvw",
      ease: "power2.inOut",
    });
  }, [SidebarOpen]);

  return (
    <section
      id="Sidebar"
      className="w-[30vw] max-w-100 min-w-50 -translate-x-50 md:-translate-x-[25vw] fixed z-10 h-full bg-black/40 backdrop-blur-xl outline-r outline-1 outline-white/30"
    >
      <div className="flex items-center h-20 w-full justify-between"></div>

      <div className="flex flex-col w-full justify-center gap-1 pb-10  ">
        <div className="flex">
          {categoryname.map((e) => (
            <h1
              onClick={() => {
                if (category !== e.value) {
                  setcategory(e?.value);
                }
                setSidebarOpen(false);
              }}
              className={`${category === e?.value ? " flex  items-center justify-end text-sm w-full text-end h-15 font-semibold uppercase px-4 py-2 bg-white/90 text-black pointer-events-auto" : " flex  hover:bg-[#f1f1f1]/30 hover:text-black items-center justify-start text-sm w-full text-end h-15 font-semibold uppercase px-4 py-2 bg-black/30 pointer-events-auto"} `}
            >
              {e?.text}
            </h1>
          ))}
        </div>
        {discover.map((e) => {
          return (
            <h1
              onClick={() => {
                setpageno(1);
                if (movielistno !== e.no) {
                  setmovielistno(e?.no);
                }
                setSidebarOpen(false);
              }}
              className={`${movielistno === e?.no ? " flex  items-center justify-end text-sm w-full text-end h-15 font-semibold uppercase px-4 py-2 bg-white/90 text-black pointer-events-auto" : " flex  hover:bg-[#f1f1f1]/30 hover:text-black items-center justify-start text-sm w-full text-end h-15 font-semibold uppercase px-4 py-2 bg-black/30 pointer-events-auto"} `}
            >
              {e?.text}
            </h1>
          );
        })}
      </div>
      <h1 className="absolute bottom-1/20 w-full text-center font-semibold ">
        Created for fun
      </h1>
    </section>
  );
};
