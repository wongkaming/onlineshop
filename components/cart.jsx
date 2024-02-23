"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartContext } from "@/context/cartContext";
import { CurrencyContext } from "@/context/currencyContext";
import { UserContext } from "@/context/userContext";
import ItemService from "@/hook/item";

const cart = ({ cartItems, backupCartItems, edit, setEdit, toggle, setToggle, total }) => {
  const { setCartItems, setBackupCartItems } =
    useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const { rates, rates2, change, currency, unit } = useContext(CurrencyContext);

  //call api method
  useEffect(() => {
    if (currentUser) {
      ItemService.getCartItems(currentUser.user._id)
        .then((i) => {
          // console.log(i.data.items);
          setCartItems(i.data.items);
          setBackupCartItems(i.data.items);
        })
        .catch((e) => {
          console.error(e.response ? e.response.data : e);
        });
    }
  }, [currentUser]);

  const newCartItems = cartItems;

  const toggleConfirm = () => {
    if (cartItems !== backupCartItems) {
      ItemService.updateCartItems(newCartItems)
        .then((i) => {
          console.log(i.data.items);
          setCartItems(i.data.items);
          setBackupCartItems(i.data.items);
          setEdit(false);
        })
        .catch((e) => {
          console.error(e.response ? e.response.data : e);
        });
    } else {
      setEdit(false);
    }
  };

  const localConfirm = () => {
    if (cartItems !== backupCartItems) {
      localStorage.setItem("cart2", JSON.stringify(newCartItems));
      setBackupCartItems(newCartItems);
      setEdit(false);
    } else {
      setEdit(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full overflow-y-auto h-full pb-36">
        {cartItems.length == 0 && (
          <div className="flex flex-col grow mt-12">
            <div className="flex w-full justify-center mb-4">
              <img
                src="https://onlineshop-3d-models.s3.ap-southeast-2.amazonaws.com/favicon.jpg"
                alt=""
                width="100"
                height="100"
              />
            </div>
            <p className="flex w-full justify-center">It's empty here!</p>
          </div>
        )}
        <ul className="list-none flex items-start flex-1 flex-col gap-4 m-4">
          {cartItems.map((item, index) => {
            let curr;
            if (change == true) {
              curr = new Intl.NumberFormat(unit, {
                style: "currency",
                currency: currency,
              }).format(((rates2 / rates) * item.item.price).toFixed(2));
            } else {
              curr = new Intl.NumberFormat(unit, {
                style: "currency",
                currency: currency,
              }).format(item.item.price);
            }
            return (
              <li key={index} className=" flex flex-row w-full gap-2">
                <div className="bubble flex flex-row w-full">
                  <div className="m-2">
                    <a
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_ORIGIN}/goods/${item.item.category}/${item.item._id}`}
                    >
                      <img
                        src={item.item.galleryWrap[0]}
                        className="w-20 rounded-md"
                      />
                    </a>
                  </div>
                  <div className="flex flex-col w-full m-2">
                    <h1 className="text-md">{item.item.title}</h1>
                    <h1 className="text-lg font-semibold">{curr}</h1>
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-row gap-5">
                        <p className="px-4 py-1 bg-gray-300 rounded-md">
                          {item.size}
                        </p>
                        {item.color && (
                          <button
                            className="border-gray-400 w-8 h-8 rounded-full border"
                            style={{ backgroundColor: item.color }}
                          ></button>
                        )}
                      </div>

                      <div className="px-2 rounded-md border flex flex-row items-center">
                        {edit && (
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                newCartItems[index] = {
                                  ...newCartItems[index],
                                  quantity: newCartItems[index].quantity - 1,
                                };
                                setCartItems(newCartItems);
                              }
                            }}
                            aria-label="Decrease quantity"
                            className={`${
                              item.quantity == 1
                                ? "text-black/20"
                                : "text-black"
                            }`}
                          >
                            &mdash;
                          </button>
                        )}
                        <p className="mx-2">{item.quantity}</p>
                        {edit && (
                          <button
                            onClick={() => {
                              if (item.quantity < 3) {
                                newCartItems[index] = {
                                  ...newCartItems[index],
                                  quantity: newCartItems[index].quantity + 1,
                                };
                                setCartItems(newCartItems);
                              } else {
                                alert(
                                  "Maximum order quantity for this item is 3"
                                );
                              }
                            }}
                            aria-label="Increase quantity"
                            className={`${
                              item.quantity == 3
                                ? "text-black/20"
                                : "text-black"
                            }`}
                          >
                            &#xff0b;
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {edit && (
                  <button
                    className="flex h-full items-center"
                    onClick={() => {
                      if (index > -1) {
                        newCartItems.splice(index, 1);
                      }
                      // console.log(newCartItems);
                      setCartItems(newCartItems);
                    }}
                  >
                    <p className=" px-1 rounded-full shadow-md sliver">X</p>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`flex flex-row w-full justify-center px-10 text-white absolute bottom-0 right-0 items-center ${
          edit ? "pinkblue py-3" : "blackpurple py-5"
        }`}
      >
        {!edit && (
          <Link
            href="/cart"
            className="underline underline-offset-1"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Checkout
          </Link>
        )}
        {edit && currentUser && (
          <button
            className="font-bold blackpurple py-2 px-4 rounded-full hover:px-8 shadow-lg hover:shadow-sm transition-all ease-in-out duration-300"
            onClick={toggleConfirm}
          >
            Confirm
          </button>
        )}
        {edit && !currentUser && (
          <button
            className="font-bold blackpurple py-2 px-4 rounded-full hover:px-8 shadow-lg hover:shadow-sm transition-all ease-in-out duration-300"
            onClick={localConfirm}
          >
            Confirm
          </button>
        )}
        {!edit && (
          <>
            <p className="mx-5">|</p>
            <p>Total: {total} item&#x0028;s&#x0029;</p>
          </>
        )}
      </div>
    </>
  );
};

export default cart;
