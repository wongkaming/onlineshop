"use client";
import React, { createContext, useState, useEffect } from "react";
import AuthService from "@/hook/auth";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const value3 = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value3}>{children}</UserContext.Provider>;
};

export default UserProvider;
