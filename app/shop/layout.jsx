import React from "react";

export default function ShopLayout({ children }) {
  return (
    <section className="flex items-start min-h-[540px] h-screen">
      {children}
    </section>
  );
}
