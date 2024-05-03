import { createContext, useContext, useState } from "react";

const UtilesContext = createContext();

export const useUtilesContext = () => {
  return useContext(UtilesContext);
};

export const UtilesContextProvider = ({ children }) => {
  const [makeRefresh, setUpdateFlag] = useState();

  const updateFlag = () => {
    setUpdateFlag((prev) => !prev);
  };

  return (
    <UtilesContext.Provider value={{ makeRefresh, updateFlag }}>
      {children}
    </UtilesContext.Provider>
  );
};
