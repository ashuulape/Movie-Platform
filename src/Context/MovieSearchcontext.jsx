import React, { createContext, useState } from "react";

export const searchContext = createContext();
const MovieSearchcontext = ({ children }) => {
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <searchContext.Provider value={{ search, setsearch, loading, setLoading }}>
      {children}
    </searchContext.Provider>
  );
};

export default MovieSearchcontext;
