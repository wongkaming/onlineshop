"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthService from "../hook/auth";
import { Cart, MobileSearch, WishlistPage, WebSearchBar } from "@/components";
import styles from "./layout.module.css";
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

const layout = ({ children, returnBack }) => {
  let [currentUser, setCurrentUser] = useState("");
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [goBack, setgoBack] = useState(false);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`w-full flex items-center fixed top-0 py-2 z-30 text-[16px] font-medium backdrop-blur-lg hover:bg-white transition duration-300 ease-in-out shadow-md shadow-[#d5e8ff]/50 ${
          scrolled ? "bg-white" : "bg-white/90"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-8xl mx-auto px-5 lg:px-9">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <p className="text-[18px] font-bold cursor-pointer flex">
              BrandLogo
            </p>
          </Link>

          <ul className="list-none hidden lg:flex flex-row gap-10 items-center ps-52">
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
          <div className="py-2 px-5 flex flex-row justify-between items-center backdrop-blur-lg bg-white/60">
            <IoIosArrowRoundBack
              className="w-[24px] h-[24px]"
              onClick={() => {
                setgoBack(!goBack);
              }}
            />
            <h1 className="font-bold text-[18px]">Wishlist</h1>
            <CiEdit className="w-[24px] h-[24px]" />
          </div>
          <div className="py-2 px-5 flex flex-row justify-around items-center backdrop-blur-lg bg-white/60 shadow-sm font-medium">
            <h1 className="text-[16px]">All Items</h1>
            <h1 className="text-[16px]">Board</h1>
          </div>
          <div>
            <WishlistPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
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
      <main className="my-14">{children}</main>

      {returnBack && (
        <Link className={styles.home} href="/">
          home
        </Link>
      )}
    </div>
  );
};

export default layout;
