"use client";
import React, { Suspense, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { CurrencyContext } from "@/context/currencyContext";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "../hook/item";
import EmblaCarousel from "./EmblaCarousel";
import { UserContext } from "@/context/userContext";
import { CiShoppingCart } from "react-icons/ci";
import { close } from "@/public";
import { useRouter } from "next/navigation";

const OPTIONS = {};
const ItemPage = ({ data, like }) => {
  let [liked, setLiked] = useState(false);
  const toggleFavorite = () => {
    AuthService.enroll(data._id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const toggleUnlike = () => {
    AuthService.unlike(data._id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    setLiked(false);
    if (currentUser && currentUser.user && currentUser.user.role === "user") {
      AuthService.getLikedItem(like)
        .then((i) => {
          setLiked(i.data);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }
  }, [like, currentUser]);

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

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const remindLogin = () => {
    alert("Please login first.");
  };
  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full md:w-4/5 infobox mr-10">
      <nav className="flex flex-row justify-between py-1 rounded-t-lg sliver">
        <p className="font-bold px-3 uppercase">{data.category}</p>
        <div className="flex flex-row items-center">
          <Image
            src={close}
            alt="menu"
            className="w-[18px] h-[18px] cursor-pointer mr-2"
            onClick={() => {
              router.back();
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
                      ? "text-white font-bold pinkblue border-white"
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
          <button className="blackpurple px-4 py-2 text-white mb-8 rounded">
            Add to <CiShoppingCart className="w-[24px] h-[24px] inline" />
          </button>
        </div>
        <div className="relative h-[520px]">
          <EmblaCarousel slides={data.galleryWrap} options={OPTIONS} />
        </div>
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
            <p>{data.description}</p>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              dolore, vitae animi exercitationem ex sed eius, tempora cum
              aperiam magni suscipit placeat magnam tenetur nam culpa debitis!
              Nisi, quisquam reiciendis!
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
      </div>
    </div>
  );
};

export default ItemPage;
