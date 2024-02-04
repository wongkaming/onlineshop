"use client";
import React, { Suspense, lazy } from "react";
const StarsCanvas = lazy(() => import("@/components/canvas/Stars"));

export default function SearchLayout({ children }) {
  return (
    <section className="flex flex-col items-center md:px-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-lg">
      <div
        className="px-[5%] overflow-auto pt-12 grow lg:pb-10 pb-14"
        style={{ maxHeight: `calc(100vh - 32px)` }}
      >
        {children}
        {children && (
          <Suspense fallback={<div> </div>}>
            <StarsCanvas />
          </Suspense>
        )}
      </div>
    </section>
  );
}
