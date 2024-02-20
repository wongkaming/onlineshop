"use client";
import React, { createContext, useState, useEffect } from "react";
import AuthService from "@/hook/auth";
import WishlistItem from "@/hook/item";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlistData, setWishlistData] = useState(null);
  const [homepage, setHomepage] = useState(false);
  const [zIndex, setZIndex] = useState("z-20");
  const [zIndex2, setZIndex2] = useState("");

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
            setWishlistData(data.data.items);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "user") {
        WishlistItem.getWishlist(_id)
          .then((data) => {
            setWishlistData(data.data.items);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]);

  const value3 = {
    currentUser,
    setCurrentUser,
    wishlistData,
    setWishlistData,
    homepage,
    setHomepage,
    zIndex,
    setZIndex,
    zIndex2,
    setZIndex2,
  };

  return <UserContext.Provider value={value3}>{children}</UserContext.Provider>;
};

export default UserProvider;
