"use client";
import { createContext, useState } from "react";
import { Light } from "@/components";

export const LightContext = createContext();

const LightProvider = ({ children, value2 }) => {
  // const [light, setlightSelected] = useState(value2);

  // const handleDataSelected = (selectedValue) => {
  //   // 在这里处理接收到的数据
  //   console.log("Selected value:", selectedValue.value);
  //   setlightSelected(selectedValue.value);
  // };

  const value = { value2 };

  return (
    <LightContext.Provider value={value}>
      {/* <Light lightSelected={handleDataSelected} /> */}
      {children}
    </LightContext.Provider>
  );
};

export default LightProvider;
