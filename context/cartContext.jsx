"use client";
import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const value = { cartItems, setCartItems };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
