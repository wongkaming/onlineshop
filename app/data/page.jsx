"use client";
import { useState, useEffect } from "react";
import AuthService from "../../hook/auth";
import { Wishlist } from "@/components/";

const page = () => {
  let [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);
  // console.log(currentUser?.token);

  return (
    <div>
      <Wishlist currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default page;
