"use client";
import React from "react";
import { windowIcon } from "@/constants/index";

export default function WishlistLayout({ children }) {
  return (
    <section className="flex flex-col items-center p-5 py-14 md:py-16 md:p-10 min-h-[540px] h-screen bg-white/60 backdrop-blur-lg">
      <nav className="flex flex-row w-full justify-between py-1 rounded-t-lg pinkblue">
        <p className="font-bold px-3">My Wishlist</p>
        <ul className="flex flex-row items-center">
          {windowIcon.map((nav, index) => (
            <li key={index} className="text-black cursor-pointer mx-2">
              {nav.icon}
            </li>
          ))}
        </ul>
      </nav>
      <div className="grow h-full w-full justify-center overflow-y-auto bg-gray-50 rounded-b-lg border border-gray-300 shadow-md">
        <div className="flex justify-center w-full items-center">
          {children}
        </div>
      </div>
      <iframe
        src={`https://3dcanvas.vercel.app/stars`}
        className="min-h-[540px] h-screen w-full homecanvas"
      ></iframe>
    </section>
  );
}
