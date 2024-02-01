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

      <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />

  );
};

export default transition(page);
