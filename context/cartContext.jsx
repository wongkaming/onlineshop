"use client";
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import AuthService from "@/hook/auth";
import { UserContext } from "@/context/userContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [backupCartItems, setBackupCartItems] = useState([]);

  useEffect(() => {
    const initializeCart = () => {
      localStorage.removeItem("cart2");
      const localCart = AuthService.getLocalCart();
      if (localCart && localCart !== "null") {
        try {
          setCartItems(localCart);
          setBackupCartItems(localCart);
        } catch (e) {
          console.error("Parsing error: ", e);
          setCartItems([]);
          setBackupCartItems([]);
        }
      } else {
        setCartItems([]);
        setBackupCartItems([]);
        AuthService.setLocalCart([]);
      }
    };

    if (!currentUser) {
      initializeCart();
    }

    return () => {};
  }, [currentUser]);

  const value = {
    cartItems,
    setCartItems,
    backupCartItems,
    setBackupCartItems,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
