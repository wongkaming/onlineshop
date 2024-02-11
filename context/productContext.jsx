"use client";
import React, { createContext, useMemo } from "react";
import useAxios from "../hook/useAxios";

export const ProductContext = createContext({ data: null });

const ProductProvider = ({ children }) => {
  const [data, loaded, error] = useAxios(
    `https://nodejs-restfulapi-onlineshopdb.onrender.com/latest/result/findByName`
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ data, loaded, error }),
    [data, loaded, error]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
