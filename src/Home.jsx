import React, { useState } from "react";

import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
const Home = () => {
  return (
    <section>
      <Sidebar />
      <Navbar side={true} />
      <div className="px-10 py-2 ">
        <Movies />
      </div>
    </section>
  );
};

export default Home;
