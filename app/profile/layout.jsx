import React from "react";
import Link from "next/link";
import { profileNavLinks } from "@/constants/index";

export default function ProfileLayout({ children }) {
  return (
    <section className="flex items-center md:px-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-lg">
      <div className="flex grow flex-row justify-center py-14">
        <nav className="flex flex-col items-center lg:w-1/5 bg-white p-8">
          <ul>
            {profileNavLinks.map((nav) => (
              <li key={nav.id} className="hover:text-[#b5cce8] cursor-pointer flex py-2">
                {nav.icon}
                <Link href={`/profile/${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="grow pl-20 p-6 bg-gray-50">{children}</main>
      </div>
    </section>
  );
}
