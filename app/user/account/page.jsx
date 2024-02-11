"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/hook/auth";
import { Profile } from "@/components/";
import transition from "@/app/transition";
import { UserContext } from "@/context/userContext";

const AccountPage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/latest/user/logout`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("user");
        setCurrentUser(AuthService.getCurrentUser());
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Profile currentUser={currentUser} />
      <button
        onClick={handleLogout}
        className="text-white blackpurple rounded-full hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#24282e] dark:hover:bg-gray-700 "
      >
        Logout
      </button>
    </div>
  );
};

export default transition(AccountPage);
