"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { profileNavLinks, loginNavLinks, windowIcon } from "@/constants/index";
import AuthService from "@/hook/auth";

export default function ProfileLayout({ children }) {
  let [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  return (
    <section className="flex items-center p-10 pb-20 lg:p-24 max-h-screen absolute top-8 left-0 right-0 bottom-0 bg-white/60 backdrop-blur-lg">
      <div className="grow h-full justify-center  bg-gray-50 rounded-lg border border-gray-300 shadow-md">
        <nav className="flex flex-row justify-between py-1 rounded-t-lg sliver">
          <p className="font-bold px-3">My Profile</p>
          <ul className="flex flex-row items-center">
            {windowIcon.map((nav, index) => (
              <li key={index} className="text-black cursor-pointer mx-2">
                {nav.icon}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-row overflow-y-auto" style={{ maxHeight: `calc(100vh - 300px)` }}>
          <nav className="hidden lg:flex flex-col items-center lg:w-1/5 px-8 py-14 ">
            <ul>
              {!currentUser &&
                loginNavLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className="hover:text-[#b5cce8] cursor-pointer flex py-2"
                  >
                    {nav.icon}
                    <Link href={`/user/${nav.id}`}>{nav.title}</Link>
                  </li>
                ))}
              {currentUser &&
                currentUser.user.role == "user" &&
                profileNavLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className="hover:text-[#b5cce8] cursor-pointer flex py-2"
                  >
                    {nav.icon}
                    <Link href={`/user/${nav.id}`}>{nav.title}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <main className="grow lg:pl-20 p-6 overflow-y-auto" style={{ maxHeight: `calc(100vh - 300px)`, width: "50vw" }} >{children}</main>
        </div>
      </div>
    </section>
  );
}
