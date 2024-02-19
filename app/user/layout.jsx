"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { profileNavLinks, windowIcon } from "@/constants/index";
import { UserContext } from "@/context/userContext";

export default function ProfileLayout({ children }) {
  const { currentUser } = useContext(UserContext);

  return (
    <section className="flex items-center p-5 pb-16 md:pb-20 md:p-10 lg:p-16 min-h-[540px] h-screen bg-white/60 backdrop-blur-lg">
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
        <div className="grow flex-row flex h-full">
          {currentUser && currentUser.user.role == "user" && (
            <nav className="hidden md:flex flex-col items-center lg:w-1/5 px-8 my-8 overflow-y-auto">
              <ul>
                {profileNavLinks.map((nav) => (
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
          )}
          <div
            className={`${
              currentUser ? "lg:ml-20 p-6" : "p-0"
            } mb-8 grow overflow-y-auto`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
