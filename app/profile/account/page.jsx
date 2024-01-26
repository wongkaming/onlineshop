"use client";
import React, { useState, useEffect } from "react";
import AuthService from "@/hook/auth";
import { Profile } from "@/components/";
import transition from "@/app/transition";

const AccountPage = () => {
    let [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      setCurrentUser(AuthService.getCurrentUser());
    }, []);

  const handleLogout = () => {
    AuthService.logout(); // 清空local storage
    window.location.href = "/";
  };

  return (
    <div>
        <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <button onClick={handleLogout} className="text-white bg-[#24282e] rounded-full hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#24282e] dark:hover:bg-gray-700 ">Logout</button>
    </div>
  );
}

export default transition(AccountPage);

