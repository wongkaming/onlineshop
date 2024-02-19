import React from "react";

export default function SearchLayout({ children }) {
  return (
    <section className="flex flex-col items-center md:px-24 min-h-[540px] h-screen  bg-black/30 backdrop-blur-lg">
      <div
        className="px-[5%] overflow-auto pt-12 grow lg:pb-10 pb-14"

      >
        {children}
        <iframe
          src={`https://3dcanvas.vercel.app/stars`}
          className="min-h-[540px] h-screen w-full homecanvas"
        ></iframe>
      </div>
    </section>
  );
}
