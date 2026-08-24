import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Watch from "./Watch";
import Theater from "./Theater";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/m/:name/:id" element={<Watch />} />
      <Route path="/theater/:name/:id/:roomId" element={<Theater />} />
    </Routes>
  );
};

export default App;
