"use client"
import { useState, useEffect } from "react";
import AuthService from "../../hook/auth";
import { WishlistPage } from "@/components/";
import transition from "../transition";

const page = () => {
  let [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  return (
    <div>
      <WishlistPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    </div>
  );
};

export default transition(page);
