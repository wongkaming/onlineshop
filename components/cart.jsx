"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cartContext";
import { CurrencyContext } from "@/context/currencyContext";

const cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [curr, setCurr] = useState(null);
  const { rates, rates2, change, currency, unit } = useContext(CurrencyContext);

  useEffect(() => {
    if (cartItems.length !== 0) {
      if (change === true) {
        const calculatedCurr = new Intl.NumberFormat(unit, {
          style: "currency",
          currency: currency,
        }).format(((rates2 / rates) * cartItems[0].price).toFixed(2));
        setCurr(calculatedCurr);
      } else {
        const formattedCurr = new Intl.NumberFormat(unit, {
          style: "currency",
          currency: currency,
        }).format(cartItems[0].price);
        setCurr(formattedCurr);
      }
    }
  }, [cartItems, change, rates, rates2, unit, currency]);

  return (
    <div className="flex flex-col w-full overflow-y-auto h-full">
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
      <ul className="list-none flex items-start flex-1 flex-col gap-4 m-4">
        {cartItems.map((item, index) => (
          <li key={index} className="bubble flex w-full">
            <div className="flex flex-row w-full mr-2">
              <div className="m-2">
                <a
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_ORIGIN}/goods/${item.category}/${item.id}`}
                >
                  <img src={item.cover} className="w-20 rounded-md" />
                </a>
              </div>
              <div className="flex flex-col w-full m-2">
                <h1 className="text-md">{item.name}</h1>
                <h1 className="text-lg font-semibold">{curr}</h1>
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-row gap-5">
                    <p className="px-4 py-1 bg-gray-300 rounded-md">
                      {item.size}
                    </p>
                    {item.color && (
                      <button
                        className="border-gray-800 w-8 h-8 rounded-full border-2"
                        style={{ backgroundColor: item.color }}
                      ></button>
                    )}
                  </div>
                  <div className="px-4 py-1 rounded-md border flex flex-row items-center">
                    <button
                      onClick={() => {
                        const newCartItems = [...cartItems];
                        if (item.quantity > 1) {
                          newCartItems[index] = {
                            ...newCartItems[index],
                            quantity: newCartItems[index].quantity - 1,
                          };
                          setCartItems(newCartItems);
                        }
                      }}
                      aria-label="Decrease quantity"
                      className="focus:outline-none"
                    >
                      &mdash;
                    </button>
                    <p className="mx-2 w-4">{item.quantity}</p>
                    <button
                      onClick={() => {
                        const newCartItems = [...cartItems];
                        if (item.quantity < 3) {
                          newCartItems[index] = {
                            ...newCartItems[index],
                            quantity: newCartItems[index].quantity + 1,
                          };
                          setCartItems(newCartItems);
                        } else {
                          alert("Maximum order quantity for this item is 3");
                        }
                      }}
                      aria-label="Increase quantity"
                      className="focus:outline-none"
                    >
                      &#xff0b;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default cart;
