"use client";
import React, { useEffect, useState } from "react";
import { profileNavLinks, windowIcon } from "@/constants/index";
import AuthService from "@/hook/auth";

export default function WishlistLayout({ children }) {
  return (
    <section className="flex items-center p-10 pb-20 lg:p-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-lg">
      <div className="grow h-full justify-center bg-gray-50 rounded-lg border border-gray-300 shadow-md">
        <nav className="flex flex-row justify-between py-1 rounded-t-lg pinkblue">
          <p className="font-bold px-3">My Wishlist</p>
          <ul className="flex flex-row items-center">
            {windowIcon.map((nav, index) => (
              <li key={index} className="text-black cursor-pointer mx-2">
                {nav.icon}
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="flex flex-row overflow-y-auto"
          style={{ maxHeight: `calc(100vh - 300px)` }}
        >
          <main
            className={`p-6 grow overflow-y-auto`}
            style={{ maxHeight: `calc(100vh - 300px)` }}
          >
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
