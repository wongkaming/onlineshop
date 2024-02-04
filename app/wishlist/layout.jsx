"use client";
import React, { Suspense, lazy } from "react";
import { windowIcon } from "@/constants/index";
const StarsCanvas = lazy(() => import("@/components/canvas/Stars"));

export default function WishlistLayout({ children }) {
  return (
    <section className="flex items-center p-5 pb-16 md:pb-20 md:p-10 lg:p-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-lg">
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
        <div className="flex justify-center w-full h-full">
          <div className={`mx-0 md:mx-8 mb-8 overflow-y-auto`}>{children}</div>
        </div>
      </div>
      {children && (
        <Suspense fallback={<div> </div>}>
          <StarsCanvas />
        </Suspense>
      )}
    </section>
  );
}
