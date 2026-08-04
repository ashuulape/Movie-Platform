import React, { useState } from "react";

import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
const Home = () => {
  const [moviedata, setmoviedata] = useState([]);
  const [search, setsearch] = useState("");

  return (
    <section>
      <Navbar setmoviedata={setmoviedata} />
      <div className="px-10 py-20 ">
        <Movies data={moviedata} />
      </div>
    </section>
  );
};

export default Home;
