import React from "react";
import { CiEdit } from "react-icons/ci";

export default function WishlistLayout({ children }) {
  return (
    <section>
        <div className="py-2 flex flex-row justify-around lg:hidden items-center fixed top-0 left-0 right-0 z-30 h-[42px] backdrop-blur-lg bg-white/60 shadow-md shadow-[#d5e8ff]/50">
            <CiEdit />
            <h1 className="font-bold text-[16px]">Wishlist</h1>
            {/* <SearchBar /> */}
        </div>
        <main className="bg-white/60 backdrop-blur-lg fixed bottom-0 left-0 right-0 top-0 z-5">{children}</main>
    </section>
  );
}
