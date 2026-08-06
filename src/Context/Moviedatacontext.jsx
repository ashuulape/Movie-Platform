import React, { createContext, useState } from "react";

export const dataContext = createContext();

const Moviedatacontext = ({ children }) => {
  const [moviedata, setmoviedata] = useState(null);
  const [SidebarOpen, setSidebarOpen] = useState(false);

  return (
    <dataContext.Provider
      value={{ moviedata, setmoviedata, SidebarOpen, setSidebarOpen }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default Moviedatacontext;
