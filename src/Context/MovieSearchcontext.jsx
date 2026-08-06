import React, { createContext, useState } from "react";

export const searchContext = createContext();
const MovieSearchcontext = ({ children }) => {
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [serverno, setserverno] = useState(1);

  return (
    <searchContext.Provider
      value={{
        search,
        setsearch,
        loading,
        setLoading,
        serverno,
        setserverno,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default MovieSearchcontext;
