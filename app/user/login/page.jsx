"use client";
import { useState, useEffect } from "react";
import { Login } from "@/components/";
import AuthService from "@/hook/auth";
import transition from "@/app/transition";

const page = () => {
  let [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);
  return (
    <div>
      <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default transition(page);
