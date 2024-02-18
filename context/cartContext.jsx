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
    // 这个函数用于初始化购物车
    const initializeCart = () => {
      const localCart = AuthService.getLocalCart();
      // 检查 localCart 是否存在，并且不是 "null" 字符串
      if (localCart && localCart !== "null") {
        // 如果存在，解析它并设置状态
        try {
          setCartItems(localCart);
          setBackupCartItems(localCart);
        } catch (e) {
          // 如果解析失败，设置空数组
          console.error("Parsing error: ", e);
          setCartItems([]);
          setBackupCartItems([]);
        }
      } else {
        // 如果不存在，设置空数组并存入 localStorage
        setCartItems([]);
        setBackupCartItems([]);
        AuthService.setLocalCart([]);
      }
    };

    // 如果用户未登录，则初始化购物车
    if (!currentUser) {
      initializeCart();
    }

    // 清理函数在组件卸载时运行
    return () => {
      // 这里可以添加必要的清理逻辑
    };
  }, [currentUser]); // 依赖数组中包含 currentUser，以便在用户状态变化时重新运行

  const value = {
    cartItems,
    setCartItems,
    backupCartItems,
    setBackupCartItems,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
