import React from "react";

export default function ShopLayout({ children }) {
  return (
    <section>
      <div>
        <main>{children}</main>
      </div>
    </section>
  );
}
