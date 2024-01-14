"use client";
import "./globals.css";
import Head from "next/head";
import React, { useState } from "react";
import { Nav, Light } from "@/components";
import { HomepageCanvas } from "@/components/canvas";
import CurrencyProvider from "@/context/currencyContext";
import LightProvider from "@/context/lightContext";
import { AnimatePresence } from "framer-motion";
import { Courier_Prime } from "next/font/google";

const font = Courier_Prime({ weight: "400", preload: false });

export default function RootLayout({ children }) {
  const [changeLight, setChangeLight] = useState("sunshine");
  const handleDataSelected = (selectedValue) => {
    setChangeLight(selectedValue.value);
  };
  return (
    <html lang="en" className={font.className}>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Cathy" />
      </Head>
      <title>Brandlogo</title>
      <body className="text-[#24282e]">
        <Nav />
        <AnimatePresence mode="wait">
          <LightProvider value2={changeLight}>
            <Light lightSelected={handleDataSelected} />
            <CurrencyProvider>{children}</CurrencyProvider>
            <HomepageCanvas />
          </LightProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
