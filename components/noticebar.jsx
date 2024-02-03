import React from "react";
import { CurrencyContext } from "@/context/currencyContext";

const NoticeBar = () => {
  const {
    rates,
    setRates,
    rates2,
    setRates2,
    change,
    setChange,
    currency,
    setCurrency,
    unit,
    setUnit,
  } = useContext(CurrencyContext);

  let curr;

  return (
    <div className="text-white text-[14px] w-full flex justify-center items-center max-w-8xl mx-auto px-5 lg:px-9  backdrop-blur-lg blackpurple">
      FREE shipping on
    </div>
  );
};

export default NoticeBar;
