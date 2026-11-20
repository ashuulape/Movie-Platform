import React, { createContext, useState } from "react";

export const searchContext = createContext();
const MovieSearchcontext = ({ children }) => {
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setcategory] = useState(true);

  // Initialize serverno from URL query params (?server=X or ?serverno=X) if present
  const [serverno, setserverno] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.location?.search) {
        const params = new URLSearchParams(window.location.search);
        const srv = params.get("server") || params.get("serverno");
        if (srv) {
          const num = Number(srv);
          if (num >= 1 && num <= 7) return num;
        }
      }
    } catch {
      // fallback to server 1
    }
    return 1;
  });

  return (
    <searchContext.Provider
      value={{
        search,
        setsearch,
        loading,
        setLoading,
        serverno,
        setserverno,
        category,
        setcategory,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default MovieSearchcontext;
