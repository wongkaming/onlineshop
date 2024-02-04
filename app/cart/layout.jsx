"use client";
import React from "react";
import { StarsCanvas } from "@/components/";

export default function CartLayout({ children }) {
  return (
    <section className="flex items-center p-5 pb-16 md:pb-20 md:p-10 lg:p-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-lg">
      <div className="flex justify-center w-full h-full">
        <div className={`mx-0 md:mx-8 mb-8 overflow-y-auto`}>{children}</div>
      </div>
      <StarsCanvas />
    </section>
  );
}
