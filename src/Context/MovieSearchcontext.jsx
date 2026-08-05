import React, { createContext, useState } from "react";

export const searchContext = createContext();
const MovieSearchcontext = ({ children }) => {
  const [search, setsearch] = useState("");

  return (
    <searchContext.Provider value={{ search, setsearch }}>
      {children}
    </searchContext.Provider>
  );
};

export default MovieSearchcontext;
