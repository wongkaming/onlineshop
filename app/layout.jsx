"use client";
import "./globals.css";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Nav, Light, Currency } from "@/components";
import { HomepageCanvas } from "@/components/canvas";
import CurrencyProvider from "@/context/currencyContext";
import LightProvider from "@/context/lightContext";
import { AnimatePresence } from "framer-motion";
import { Forum } from "next/font/google";

const font = Forum({ weight: "400", preload: false });

export default function RootLayout({ children }) {
  const [changeLight, setChangeLight] = useState("sunshine");
  const handleDataSelected = (selectedValue) => {
    setChangeLight(selectedValue.value);
  };

  const [rates, setRates] = useState(null);
  const [rates2, setRates2] = useState(null);
  const [change, setChange] = useState(false);

  const [currency, setCurrency] = useState("HKD");
  const [unit, setUnit] = useState("zh-HK");

  useEffect(() => {
    const myFunction = async () => {
      let api = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      let currencydata = await api.json();
      setRates(currencydata.rates.HKD);
      setRates2(currencydata.rates.HKD);
    };
    myFunction();
  }, []);

  const handleDataSelected2 = (selectedValue) => {
    // 在这里处理接收到的数据
    //console.log("Selected value:", selectedValue);
    setRates2(selectedValue.value);
    setCurrency(selectedValue.selectedOptions[0].id);
    setUnit(selectedValue.selectedOptions[0].className);
    setChange(true);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <html lang="en" className={font.className}>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Cathy" />
      </Head>
      <title>DazeStory☾</title>
      <body className="text-[#24282e]">
        <AnimatePresence mode="wait">
          <LightProvider value2={changeLight}>
            <CurrencyProvider
              rates={rates}
              rates2={rates2}
              change={change}
              currency={currency}
              unit={unit}
            >
              <Nav />
              <div
                className={`flex bg-[#24282e] p-2 absolute top-14  z-20 rounded-r-full transition-transform ease-in-out duration-500 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-40 -translate-x-32"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Currency onDataSelected={handleDataSelected2} />
                <Light lightSelected={handleDataSelected} />
              </div>
              {children}
            </CurrencyProvider>
            <HomepageCanvas />
          </LightProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
