"use client";
import React from "react";
import { Home, HomeDeco } from "@/components";
import transition from "./transition";

const page = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default transition(page);
