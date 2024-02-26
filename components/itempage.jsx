"use client";
import React, { useContext, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CurrencyContext } from "@/context/currencyContext";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import ItemService from "../hook/item";
import EmblaCarousel from "./EmblaCarousel";
import { UserContext } from "@/context/userContext";
import { CartContext } from "@/context/cartContext";
import { CiShoppingCart } from "react-icons/ci";
import { close } from "@/public";
import { useRouter } from "next/navigation";

const OPTIONS = {};

const Description = ({ description }) => {
  let [rotate, setRotate] = useState("rotate-0");
  let [hidden, setHidden] = useState(true);
  let [rotate2, setRotate2] = useState("rotate-180");
  let [hidden2, setHidden2] = useState(false);

  const showMenu = () => {
    setHidden(!hidden);
    if (rotate == "rotate-0") {
      setRotate("rotate-180");
    } else if (rotate == "rotate-180") {
      setRotate("rotate-0");
    }
  };
  const showMenu2 = () => {
    setHidden2(!hidden2);
    if (rotate2 == "rotate-0") {
      setRotate2("rotate-180");
    } else if (rotate2 == "rotate-180") {
      setRotate2("rotate-0");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-start items-center px-10 border-t border-b border-gray-600  w-full">
        <button
          onClick={showMenu}
          className="focus:outline-none focus:text-white text-left  text-black flex justify-between items-center w-full py-5 space-x-14"
        >
          <p className="text-sm leading-5 font-bold uppercase">
            Description & fit
          </p>
          <svg
            className={rotate}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15L12 9L6 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className={`${
            !hidden ? "hidden pb-6" : "pb-6"
          }flex justify-start  flex-col w-full md:w-auto items-start`}
        >
          <p>{description}</p>
          <ul className="max-w-md space-y-1 text-black ">
            <li>Model size: The model is 179cm/5'10" and wears a size S</li>
            <li>Length: Long</li>
            <li>Fit: Fitted</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center px-10 border-b border-gray-600  w-full">
        <button
          onClick={showMenu2}
          className="focus:outline-none focus:text-white text-left  text-black flex justify-between items-center w-full py-5 space-x-14"
        >
          <p className="text-sm leading-5 font-bold uppercase">Care guide</p>
          <svg
            className={rotate2}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15L12 9L6 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className={`${
            hidden2 ? "pb-6" : "hidden pb-6"
          }flex justify-start  flex-col w-full md:w-auto items-start`}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolore,
            vitae animi exercitationem ex sed eius, tempora cum aperiam magni
            suscipit placeat magnam tenetur nam culpa debitis! Nisi, quisquam
            reiciendis!
          </p>
          <p>Read about how you can make your clothes last longer</p>
          <h2>Care instructions</h2>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            <li>Only non-chlorine bleach when needed</li>
            <li>Medium iron</li>
            <li>Machine wash cold</li>
            <li>Dry flat</li>
            <li>Can be dry cleaned</li>
          </ul>
        </div>
      </div>
    </>
  );
};

const ItemPage = ({ data, like }) => {
  const {
    currentUser,
    setZIndex,
    zIndex2,
    setZIndex2,
    wishlistData,
    setWishlistData,
  } = useContext(UserContext);

  let [liked, setLiked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const index = wishlistData.findIndex((i) => i._id === like);
      setLiked(index !== -1);
    }
  }, [currentUser, wishlistData]);

  const toggleFavorite = () => {
    setLiked(true);
    const timerId = setTimeout(async () => {
      ItemService.enroll(data._id)
        .then(() => {
          clearTimeout(timerId);
          setWishlistData((prevWishlistData) => prevWishlistData.concat(data));
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }, 1000);
  };
  const toggleUnlike = () => {
    setLiked(false);
    const timerId = setTimeout(async () => {
      ItemService.unlike(data._id)
        .then(() => {
          clearTimeout(timerId);
          setWishlistData((prevWishlistData) =>
            prevWishlistData.filter((item) => item._id !== data._id)
          );
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }, 1000);
  };

  const [curr, setCurr] = useState(null);
  const { rates, rates2, change, currency, unit } = useContext(CurrencyContext);

  useEffect(() => {
    if (data) {
      if (change === true) {
        const calculatedCurr = new Intl.NumberFormat(unit, {
          style: "currency",
          currency: currency,
        }).format(((rates2 / rates) * data.price).toFixed(2));
        setCurr(calculatedCurr);
      } else {
        const formattedCurr = new Intl.NumberFormat(unit, {
          style: "currency",
          currency: currency,
        }).format(data.price);
        setCurr(formattedCurr);
      }
    }
  }, [data, change, rates, rates2, unit, currency]);

  const { cartItems, setCartItems, setBackupCartItems } =
    useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    const newCartItem = {
      item: data,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    if (selectedSize !== null) {
      if (selectedColor !== null || data.typeSelector.length === 0) {
        const itemIndex = cartItems.findIndex(
          (e) =>
            e.item._id === newCartItem.item._id &&
            e.size === newCartItem.size &&
            (!newCartItem.color || e.color === newCartItem.color)
        );
        if (itemIndex !== -1) {
          const newCartItems = [...cartItems];
          if (newCartItems[itemIndex].quantity < 3) {
            newCartItems[itemIndex] = {
              ...newCartItems[itemIndex],
              quantity: (newCartItems[itemIndex].quantity || 1) + 1,
            };
            localStorage.setItem("cart2", JSON.stringify(newCartItems));
            setCartItems(newCartItems);
            setBackupCartItems(newCartItem);
          } else {
            alert("Maximum order quantity for this item is 3");
          }
        } else {
          localStorage.setItem(
            "cart2",
            JSON.stringify([newCartItem, ...cartItems])
          );
          setCartItems([newCartItem, ...cartItems]);
          setBackupCartItems([newCartItem, ...cartItems]);
        }
      } else {
        alert("Please choose a color.");
      }
    } else if (data.sizeSelector.length > 0) {
      alert("Please choose a size.");
    }
  };

  const APIAddToCart = () => {
    const newCartItem = {
      item: data,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    if (selectedSize !== null) {
      if (selectedColor !== null || data.typeSelector.length === 0) {
        const itemIndex = cartItems.findIndex(
          (e) =>
            e.item._id === newCartItem.item._id &&
            e.size === newCartItem.size &&
            (!newCartItem.color || e.color === newCartItem.color)
        );
        if (itemIndex !== -1) {
          const newCartItems = [...cartItems];
          if (newCartItems[itemIndex].quantity < 3) {
            newCartItems[itemIndex] = {
              ...newCartItems[itemIndex],
              quantity: (newCartItems[itemIndex].quantity || 1) + 1,
            };
            ItemService.addToCart(data, selectedSize, selectedColor, 1)
              .then((i) => {
                setCartItems(i.data.items);
                setBackupCartItems(i.data.items);
              })
              .catch((e) => {
                console.log(e.response.data);
              });
          } else {
            alert("Maximum order quantity for this item is 3");
          }
        } else {
          ItemService.addToCart(data, selectedSize, selectedColor, 1)
            .then((i) => {
              setCartItems(i.data.items);
              setBackupCartItems(i.data.items);
            })
            .catch((e) => {
              console.log(e.response.data);
            });
        }
      } else {
        alert("Please choose a color.");
      }
    } else if (data.sizeSelector.length > 0) {
      alert("Please choose a size.");
    }
  };

  const remindLogin = () => {
    alert("Please login first.");
  };
  const router = useRouter();

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setZIndex2("z-20");
      setZIndex("");
      const px = e.clientX || e.touches[0].clientX;
      const py = e.clientY || e.touches[0].clientY;

      setOffset({
        x: px - position.x,
        y: py - position.y,
      });
    },
    [position]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const x = e.clientX - offset.x;
        const y = e.clientY - offset.y;
        setPosition({ x, y });
      }
    },
    [isDragging, offset.x, offset.y]
  );
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return (
    <div
      className={`flex flex-col h-full w-full lg:w-4/5 infobox lg:mr-10 ${zIndex2}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <nav
        className="flex flex-row justify-between py-1 rounded-t-lg sliver draggable"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <p className="font-bold px-3 uppercase">{data.category}</p>
        <div className="flex flex-row items-center">
          <Image
            src={close}
            alt="menu"
            className="w-[18px] h-[18px] cursor-pointer mr-2"
            onClick={() => {
              router.push("/shop");
            }}
          />
        </div>
      </nav>
      <div className="overflow-auto">
        <div className="pt-8 px-12">
          <ul className="flex flex-col">
            <li className="flex justify-between">
              <p className="text-[24px] text-[#5a6674]">{data.title}</p>

              {!currentUser && (
                <GoHeart
                  id={data._id}
                  onClick={remindLogin}
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    color: "black",
                    cursor: "pointer",
                  }}
                />
              )}
              {currentUser && liked == false && (
                <a id={data._id} onClick={toggleFavorite}>
                  <GoHeart
                    style={{
                      width: "2em",
                      height: "2em",
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}
              {currentUser && liked == true && (
                <a id={data._id} onClick={toggleUnlike}>
                  <GoHeartFill
                    style={{
                      width: "2em",
                      height: "2em",
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}
            </li>
            {curr && <li className="text-[20px] font-bold">{curr}</li>}
          </ul>
          <div className="pb-3 pt-8">
            {data.typeSelector.map((d, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    selectedColor === d ? "border-gray-800" : "border"
                  } w-8 h-8 rounded-full border-2  mr-2`}
                  style={{ backgroundColor: d }}
                  onClick={() => handleColorClick(d)}
                ></button>
              );
            })}
          </div>
          <div className="mb-5">
            {data.sizeSelector.map((d, index) => {
              return (
                <button
                  className={`border ${
                    selectedSize === d
                      ? "font-bold pinkblue border-black"
                      : "border-gray-400"
                  } py-1 px-4 rounded-full mr-2 hover:border-white hover:text-white `}
                  onClick={() => handleSizeClick(d)}
                  key={index}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {!currentUser && (
            <button
              className="blackpurple px-4 py-2 text-white mb-8 rounded"
              onClick={handleAddToCart}
            >
              Add to <CiShoppingCart className="w-[24px] h-[24px] inline" />
            </button>
          )}
          {currentUser && (
            <button
              className="blackpurple px-4 py-2 text-white mb-8 rounded"
              onClick={APIAddToCart}
            >
              Add to <CiShoppingCart className="w-[24px] h-[24px] inline" />
            </button>
          )}
        </div>
        <div className="relative h-[520px]">
          <EmblaCarousel slides={data.galleryWrap} options={OPTIONS} />
        </div>
        <Description description={data.description} />
      </div>
    </div>
  );
};

export default ItemPage;
