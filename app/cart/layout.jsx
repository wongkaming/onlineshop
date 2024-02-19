import React from "react";

export default function CartLayout({ children }) {
  return (
    <section className="flex items-start px-5 pb-16 md:pb-20 md:px-10 lg:px-14 min-h-[540px] h-screen bg-[#f5f5f5]/60 backdrop-blur-lg">
      <div className="flex flex-col justify-start w-screen h-screen overflow-y-auto py-14">
        {children}
      </div>
      <iframe
        src={`https://3dcanvas.vercel.app/stars`}
        className="min-h-[540px] h-screen w-full homecanvas"
      ></iframe>
    </section>
  );
}
