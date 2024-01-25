"use client";
import React from "react";
import AuthService from "../../hook/auth";

export default function ProfileLayout({ children }) {
  const handleLogout = () => {
    AuthService.logout(); // 清空local storage
    window.location.href = "/";
  };

  return (
    <section>
      <nav className="flex flex-row justify-around md:px-24 max-h-screen absolute top-8 left-0 right-0 items-center">
        <div className="py-14 lg:w-1/5">
          <ul>
            <li>My Account</li>
            <li>Order</li>
          </ul>
        </div>
        <div className="lg:w-4/5">
          <h1 className="text-[28px] font-bold">My Account</h1>
        </div>
      </nav>
      <main>{children}</main>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
}
