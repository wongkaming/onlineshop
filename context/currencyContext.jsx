"use client";
import { createContext } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children, rates, rates2, change, currency, unit }) => {
  
  const value = { rates, rates2, change, currency, unit };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
