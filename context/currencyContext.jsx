"use client";
import { createContext, useMemo } from "react";
import useAxios from "../hook/useAxios";

export const CurrencyContext = createContext();

const CurrencyProvider = ({
  children,
  rates,
  rates2,
  change,
  currency,
  unit,
}) => {
  const [data, loaded, error] = useAxios(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );

  const value = useMemo(
    () => ({ data, rates, rates2, change, currency, unit }),
    [data, rates, rates2, change, currency, unit]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
