import React from "react";

export default function ShopLayout({ children }) {
  return (
    <section className="flex items-start md:px-24 min-h-[540px] h-screen">
      {children}
    </section>
  );
}
