import React, { createContext, useState } from "react";

export const dataContext = createContext();

const Moviedatacontext = ({ children }) => {
  const [moviedata, setmoviedata] = useState(null);
  const [SidebarOpen, setSidebarOpen] = useState(false);
  const [movielistno, setmovielistno] = useState(0);
  const [pageno, setpageno] = useState(1);

  return (
    <dataContext.Provider
      value={{
        moviedata,
        setmoviedata,
        SidebarOpen,
        setSidebarOpen,
        movielistno,
        setmovielistno,
        pageno,
        setpageno,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default Moviedatacontext;
