"use client";
import { useState, useEffect } from "react";
import AuthService from "../../hook/auth";
import { Wishlist } from "@/components/";
import transition from "../transition";

const page = () => {
  let [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);
  // console.log(currentUser?.token);

  return (
    <div>
      {/* <div className="py-2 flex flex-row justify-around lg:hidden items-center fixed top-0 left-0 right-0 z-30 h-[42px] backdrop-blur-lg bg-white/60 shadow-md shadow-[#d5e8ff]/50">
        <CiEdit />
        <h1 className="font-bold text-[16px]">Wishlist</h1>
      </div> */}
      <Wishlist currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default transition(page);
