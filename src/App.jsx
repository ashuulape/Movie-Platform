import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Watch from "./Watch";
import Theater from "./Theater";
import Discover from "./Discover";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover/:sectionId" element={<Discover />} />
      <Route path="/discover/:category/:sectionId" element={<Discover />} />
      <Route path="/watch/:category/:name/:id" element={<Watch />} />
      <Route path="/theater/:name/:id/:roomId" element={<Theater />} />
    </Routes>
  );
};

export default App;
