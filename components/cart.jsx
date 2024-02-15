"use client";
import React, { useContext, useEffect } from "react";
import { CartContext } from "@/context/cartContext";

const cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center">
      {cartItems.length == 0 && (
        <div className="flex flex-col grow mt-12">
          <div className="flex w-full justify-center mb-4">
            <img
              src="https://media.discordapp.net/attachments/1169686419778838622/1202659319452016742/208ca7149511131.5e46400fbbfde.jpg?ex=65ce42c6&is=65bbcdc6&hm=ac9af0f34b57fb9f6a018b5aeabb6bd7e0fc0814421d69341c868ccd492ba3dc&=&format=webp"
              alt=""
              width="100"
              height="100"
            />
          </div>
          <p className="flex w-full justify-center">It's empty here!</p>
        </div>
      )}
      <ul className="list-none flex items-end flex-1 flex-col gap-4 m-4">
        {cartItems.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.size}</p>
            <p>{item.color}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default cart;
