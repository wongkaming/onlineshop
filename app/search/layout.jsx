"use client";
import React from "react";
import { StarsCanvas } from "@/components/";

export default function SearchLayout({ children }) {
  return (
    <section className="flex flex-col items-center md:px-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-lg">
      <div
        className="px-[5%] overflow-auto pt-12 grow lg:pb-10 pb-14"
        style={{ maxHeight: `calc(100vh - 32px)` }}
      >
        {children}
        <StarsCanvas />
      </div>
    </section>
  );
}
