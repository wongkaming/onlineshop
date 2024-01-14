"use client";
import { createContext, useState, useEffect } from "react";
import Currency from "../components/currency";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState(null);
  const [rates2, setRates2] = useState(null);
  const [change, setChange] = useState(false);

  const [currency, setCurrency] = useState("HKD");
  const [unit, setUnit] = useState("zh-HK");

  useEffect(() => {
    const myFunction = async (req, res) => {
      let api = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      let currencydata = await api.json();
      setRates(currencydata.rates.HKD);
      setRates2(currencydata.rates.HKD);
    };
    myFunction();
  }, []);

  const handleDataSelected = (selectedValue) => {
    // 在这里处理接收到的数据
    //console.log("Selected value:", selectedValue);
    setRates2(selectedValue.value);
    setCurrency(selectedValue.selectedOptions[0].id);
    setUnit(selectedValue.selectedOptions[0].className);
    setChange(true);
  };

  const value = {
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
  };

  return (
    <CurrencyContext.Provider value={value}>
      <Currency onDataSelected={handleDataSelected} />
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
