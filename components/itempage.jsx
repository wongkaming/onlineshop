"use client";
import React, { Suspense, useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CurrencyContext } from "@/context/currencyContext";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "../hook/item";
import EmblaCarousel from "./EmblaCarousel";

const ItemDetailCanvas = dynamic(() => import("./canvas/itemdetail"), {
  ssr: false,
});
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

  useEffect(() => {
    AuthService.getLikedItem(like)
      .then((i) => {
        setLiked(i.data);
        // console.log(i.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  const [curr, setCurr] = useState(null);
  const {
    rates,
    setRates,
    rates2,
    setRates2,
    change,
    setChange,
    currency,
    setCurrency,
    unit,
    setUnit,
  } = useContext(CurrencyContext);

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
  // let [light, onDataSelected] = useState("studio");
  // const handleSelectLight = (e) => {
  //   const selectedValue = e.target;
  //   onDataSelected(selectedValue.value);
  // };
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div>
        <div className="z-20 hidden md:block w-2/5 ">
          <ItemDetailCanvas url={data.model3d} />
        </div>

        <div className="overflow-auto top-0 md:top-20 md:right-10 absolute flex flex-col items-start h-full md:h-[85%] w-full md:w-3/5 bubble">
            <div className="pt-24 md:pt-10 px-12">
              <ul className="flex flex-col">
                <li className="flex justify-between">
                  <p className="text-[24px] text-[#5a6674]">{data.title}</p>
                  {liked == false && (
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
                  {liked == true && (
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
                        selectedColor === d
                          ? "border-gray-800"
                          : "border-gray-400"
                      } w-8 h-8 rounded-full border-2  bg-[${d}] mr-2`}
                      onClick={() => handleColorClick(d)}
                    ></button>
                  );
                })}
              </div>
              <div className="pb-8">
                {data.sizeSelector.map((d, index) => {
                  return (
                    <button
                      className={`border ${
                        selectedSize === d
                          ? "border-2 font-bold bg-gray/30"
                          : "dark:text-black"
                      } py-1 px-4 rounded-full mr-2 hover:border-white hover:text-white border-gray-600`}
                      onClick={() => handleSizeClick(d)}
                      key={index}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative h-[520px]">
              <EmblaCarousel slides={data.galleryWrap} options={OPTIONS} />
            </div>
            <div className="flex flex-col justify-start items-center px-10 border-t border-b border-gray-600  w-full">
              <button
                onClick={showMenu}
                className="focus:outline-none focus:text-white text-left  text-black flex justify-between items-center w-full py-5 space-x-14"
              >
                <p class="text-sm leading-5 font-bold uppercase">
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
                  <li>
                    Model size: The model is 179cm/5'10" and wears a size S
                  </li>
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
                <p className="text-sm leading-5 font-bold uppercase">
                  Care guide
                </p>
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
                  aperiam magni suscipit placeat magnam tenetur nam culpa
                  debitis! Nisi, quisquam reiciendis!
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
    </>
  );
};

export default ItemPage;
