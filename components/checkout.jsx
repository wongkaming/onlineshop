"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartContext } from "@/context/cartContext";
import { CurrencyContext } from "@/context/currencyContext";
import { UserContext } from "@/context/userContext";
import ItemService from "@/hook/item";
import { CiEdit, CiSaveDown2 } from "react-icons/ci";

const Checkout = ({ toggle, setToggle }) => {
  const { cartItems, setCartItems, backupCartItems, setBackupCartItems } =
    useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const { rates, rates2, change, currency, unit } = useContext(CurrencyContext);
  const [total, setTotal] = useState(0);
  const [edit, setEdit] = useState(false);

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

  const newCartItems = [...cartItems];

  useEffect(() => {
    if (cartItems.length !== 0) {
      let curr = cartItems.reduce((a, b) => {
        return a + b.item.price;
      }, 0);

      if (change == true) {
        setTotal(
          new Intl.NumberFormat(unit, {
            style: "currency",
            currency: currency,
          }).format(((rates2 / rates) * curr).toFixed(2))
        );
      } else {
        setTotal(
          new Intl.NumberFormat(unit, {
            style: "currency",
            currency: currency,
          }).format(curr)
        );
      }
    } else {
      setTotal(0);
    }
  }, [cartItems, rates, rates2, change, currency, unit]);

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
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      setBackupCartItems(newCartItems);
      setEdit(false);
    } else {
      setEdit(false);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col gap-8 w-full">
      <div className="flex flex-col lg:w-2/3 overflow-y-auto h-full">

        <ul className="list-none flex items-start flex-1 flex-col gap-4 lg:m-4 bubble p-2 mt-2">
          <li className="flex flex-row w-full justify-between px-2">
            <h1 className="text-lg text-[#5a6674] lg:text-xl font-semibold px-3">
              My Cart
            </h1>      
            {!edit && cartItems.length !== 0 && (
              <CiEdit
                className="w-5 h-5"
                onClick={() => {
                  setEdit(true);
                }}
              />
            )}
            {edit && (
              <div className="flex flex-row gap-4 items-center">
                {!currentUser && (
                  <CiSaveDown2
                    className="w-5 h-5 cursor-pointer"
                    onClick={localConfirm}
                  />
                )}
                {currentUser && (
                  <CiSaveDown2
                    className="w-5 h-5 cursor-pointer"
                    onClick={toggleConfirm}
                  />
                )}
                <button
                  className="text-md font-semibold text-[#c50100] underline"
                  onClick={() => {
                    setEdit(false);
                    setCartItems(backupCartItems);
                  }}
                >
                  CANCEL
                </button>
              </div>
            )}
          </li>
          {!edit && cartItems.length == 0 && (
              <li className="flex flex-col w-full my-12">
                <div className="flex w-full justify-center mb-4">
                  <img
                    src="https://media.discordapp.net/attachments/1169686419778838622/1202659319452016742/208ca7149511131.5e46400fbbfde.jpg?ex=65ce42c6&is=65bbcdc6&hm=ac9af0f34b57fb9f6a018b5aeabb6bd7e0fc0814421d69341c868ccd492ba3dc&=&format=webp"
                    alt=""
                    width="100"
                    height="100"
                  />
                </div>
                <p className="flex w-full justify-center">It's empty here!</p>
              </li>
          )}      
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
                <div className="flex flex-row w-full">
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
                    <h1 className="text-md truncate w-48">{item.item.title}</h1>
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
                    className="flex h-full items-center mr-1"
                    onClick={() => {
                      if (index > -1) {
                        newCartItems.splice(index, 1);
                      }
                      // console.log(newCartItems);
                      setCartItems(newCartItems);
                    }}
                  >
                    <p className=" px-1 rounded-full shadow-md bg-[#c50100] text-white">
                      -
                    </p>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`flex flex-col lg:w-1/3 justify-center lg:m-4 mb-4 p-5 sliver max-h-[400px] border border-white rounded-lg shadow-lg`}
      >
        <h1 className="font-semibold text-xl pb-5">Order Summary</h1>
        <div className="flex flex-row justify-between w-full border-t border-slate-600 pt-5 pb-10">
          <h1>Total</h1>
          <p>Price</p>
        </div>

        <div className="flex flex-row px-10 py-5 text-white text-sm blackpurple">
          <Link
            href="/cart"
            className="underline underline-offset-1"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Checkout
          </Link>
          <p className="mx-5">|</p>
          <p>Total: {total} </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
