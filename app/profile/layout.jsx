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
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>{children}</main>
    </section>
  );
}
