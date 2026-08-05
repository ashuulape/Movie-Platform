import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Moviedatacontext from "./Context/Moviedatacontext.jsx";
import MovieSearchcontext from "./Context/MovieSearchcontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieSearchcontext>
      <Moviedatacontext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Moviedatacontext>
    </MovieSearchcontext>
  </StrictMode>,
);
