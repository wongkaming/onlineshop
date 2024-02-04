"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import WishlistItem from "@/hook/item";
import {
  Cart,
  MobileSearch,
  MobileWishlistPage,
  WebSearchBar,
} from "@/components";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { close } from "@/public";
import { navLinks } from "../constants/index";
import {
  CiHeart,
  CiShoppingCart,
  CiShop,
  CiBoxList,
  CiUser,
  CiEdit,
} from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { UserContext } from "@/context/userContext";

const Shop = () => {
  const [showDropdown, setShowDropdown] = useState(true);
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DropdownButton id="dropdown-basic-button" title="Shop">
        {showDropdown && (
          <Dropdown.Item>
            <Link href="/shop">Shop All</Link>
          </Dropdown.Item>
        )}
      </DropdownButton>
    </div>
  );
};

const Nav = () => {
  const { currentUser } = useContext(UserContext);

  const [toggle, setToggle] = useState(false);
  const [goBack, setgoBack] = useState(false);
  const [mobileWishlistData, setMobileWishlistData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "admin") {
        WishlistItem.get(_id)
          .then((data) => {
            setMobileWishlistData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "user") {
        WishlistItem.getWishlist(_id)
          .then((data) => {
            setMobileWishlistData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [goBack, currentUser]);

  return (
    <div>
      <nav className="w-full flex flex-col items-center fixed top-0 z-30 text-[16px] font-medium">
        <div className="w-full flex justify-between items-center max-w-8xl mx-auto px-5 lg:px-9 py-2 backdrop-blur-lg bg-white/90 hover:bg-white transition duration-300 ease-in-out shadow-md shadow-[#d5e8ff]/50">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <p className="text-[18px] font-bold cursor-pointer flex">
              DazeStory☾
            </p>
          </Link>

          <ul className="list-none hidden lg:flex flex-row gap-10 items-center lg:pl-36 md:pl-20 md:pr-10">
            {/* <li className="hover:text-[#b5cce8] cursor-pointer">
              <Shop />
            </li> */}
            {navLinks.map((nav) => (
              <li key={nav.id} className="hover:text-[#b5cce8] cursor-pointer">
                <Link href={`${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>

          <ul className="list-none hidden lg:flex flex-row gap-5 items-center">
            <li>
              <WebSearchBar />
            </li>

            {!currentUser && (
              <li>
                <Link href="/user/login">Login</Link>
              </li>
            )}
            {currentUser && (
              <li>
                <Link href="/user/account">
                  <CiUser className="w-[23px] h-[23px]" />
                </Link>
              </li>
            )}
            <li>
              <Link href="/wishlist">
                <CiHeart className="w-[24px] h-[24px]" />
              </Link>
            </li>
            {currentUser && currentUser.user.role == "admin" && (
              <li>
                <Link href="/user/data">Data</Link>
              </li>
            )}

            <li>
              <CiShoppingCart
                className="w-[24px] h-[24px]"
                onClick={() => setToggle(!toggle)}
              />
            </li>
          </ul>

          <div className="lg:hidden flex flex-1 justify-end items-center">
            <ul className="flex flex-row">
              <li className="text-black pl-3 pr-2">
                <MobileSearch />
              </li>
              <li>
                <CiHeart
                  className="w-[24px] h-[24px] object-contain"
                  onClick={() => {
                    setgoBack(!goBack);
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={`flex ${
          toggle
            ? "bg-black/30 fixed bottom-0 left-0 right-0 top-0 z-40"
            : "bg-transparent"
        } `}
      >
        <div
          className={`flex flex-col justify-center w-96 fixed top-0 right-0 bottom-0 z-40 bg-white transition-transform duration-300 ${
            toggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="py-2 px-5 flex flex-row justify-between items-center bg-white shadow-sm">
            <h1 className="font-bold text-[18px]">Shopping Bag</h1>
            <Image
              src={close}
              alt="menu"
              className="w-[16px] h-[16px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
          </div>
          <Cart />
        </div>
      </div>

      {/* //wishlist */}
      <div
        className={`lg:hidden bg-white/60 backdrop-blur-lg fixed bottom-0 left-0 right-0 top-0 transition-transform duration-500 z-30 ${
          goBack ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col lg:hidden fixed top-0 left-0 right-0 bottom-0 z-30 ">
          <div className="py-2 px-5 flex flex-row justify-between items-center backdrop-blur-lg bg-white/60 border-b shadow-sm">
            <IoIosArrowRoundBack
              className="w-[24px] h-[24px]"
              onClick={() => {
                setgoBack(!goBack);
              }}
            />
            <h1 className="font-bold text-[18px]">Wishlist</h1>
            <CiEdit className="w-[24px] h-[24px]" />
          </div>
          <div className="py-2 px-10 flex flex-row justify-around items-center backdrop-blur-lg bg-white/60 shadow-sm font-medium">
            <h1 className="text-[16px]">All Items</h1>
            <h className="w-px h-8px bg-gray-300 text-transparent">|</h>
            <h1 className="text-[16px]">Board</h1>
          </div>
          <div>
            <MobileWishlistPage
              currentUser={currentUser}
              wishlistData={mobileWishlistData}
            />
          </div>
        </div>
      </div>

      <nav className="lg:hidden flex justify-center items-center fixed bottom-0 left-0 right-0 z-20 h-[50px] bg-white border-t-2">
        <ul className="list-none flex flex-row w-full justify-around">
          <li>
            <Link href="/" className="flex flex-col items-center">
              <CiShop className="w-[20px] h-[20px]" />
              <p className="text-[12px]">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/shop" className="flex flex-col items-center">
              <CiBoxList className="w-[20px] h-[20px]" />
              <p className="text-[12px]">Category</p>
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex flex-col items-center">
              {/* <CiHeart className="w-[21px] h-[21px]" /> */}
              <CiShoppingCart className="w-[20px] h-[20px]" />
              <p className="text-[12px]">Cart</p>
            </Link>
          </li>
          {!currentUser && (
            <li>
              <Link href="/user/login" className="flex flex-col items-center">
                <CiUser className="w-[20px] h-[20px]" />
                <p className="text-[12px]">Me</p>
              </Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link href="/user/account" className="flex flex-col items-center">
                <CiUser className="w-[20px] h-[20px]" />
                <p className="text-[12px]">Me</p>
              </Link>
            </li>
          )}
          {currentUser && currentUser.user.role == "admin" && (
            <li>
              <Link href="/user/data" className="flex flex-col items-center">
                <CiHeart className="w-[21px] h-[21px]" />
                <p className="text-[12px]">Data</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* {returnBack && (
        <Link className={styles.home} href="/">
          home
        </Link>
      )} */}
    </div>
  );
};

export default Nav;
