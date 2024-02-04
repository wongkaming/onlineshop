"use client";
import React, { createContext, useState, useEffect } from "react";
import AuthService from "@/hook/auth";
import WishlistItem from "@/hook/item";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistData, setWishlistData] = useState(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "admin") {
        WishlistItem.get(_id)
          .then((data) => {
            setWishlistData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "user") {
        WishlistItem.getWishlist(_id)
          .then((data) => {
            setWishlistData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  const value3 = { currentUser, setCurrentUser, wishlistData, setWishlistData };

  return <UserContext.Provider value={value3}>{children}</UserContext.Provider>;
};

export default UserProvider;
