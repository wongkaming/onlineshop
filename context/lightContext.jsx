import { createContext } from "react";

export const LightContext = createContext();

const LightProvider = ({ children, value2 }) => {
  const value = { value2 };
  return (
    <LightContext.Provider value={value}>
      {children}
    </LightContext.Provider>
  );
};

export default LightProvider;
