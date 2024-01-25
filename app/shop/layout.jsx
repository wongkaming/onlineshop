import React from "react";

export default function ShopLayout({ children }) {
  return (
    <section className="flex items-center md:px-24 max-h-screen absolute top-8 left-0 right-0">
      {children}
    </section>
  );
}
