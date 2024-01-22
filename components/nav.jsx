"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthService from "../hook/auth";
import SearchBar from "../components/searchbar";
import styles from "./layout.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { menu, close } from "@/public";
import { navLinks } from "../constants/index";
import { CiHeart, CiShoppingCart, CiShop, CiBoxList, CiUser } from "react-icons/ci";

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
        className={`w-full flex items-center fixed top-0 py-2 z-20 text-[16px] font-medium backdrop-blur-lg hover:bg-white transition duration-300 ease-in-out shadow-md shadow-[#d5e8ff]/50 ${
          scrolled ? "bg-white" : "bg-white/90"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-8xl mx-auto px-9">
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
              <SearchBar />
            </li>

            {!currentUser && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
            {currentUser && (
              <li>
                <Link href="/profile">
                  <CiUser className="w-[20px] h-[20px]" />
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "user" && (
              <li>
                <Link href="/favour">
                  <CiHeart className="w-[24px] h-[24px]" />
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "admin" && (
              <li>
                <Link href="/data">Data</Link>
              </li>
            )}

            <li>
              <CiShoppingCart
                className="w-[24px] h-[24px]"
                onClick={() => setToggle(!toggle)}
              />
            </li>
          </ul>

          <div
            className={`${
              !toggle
                ? "hidden"
                : "lg:bg-black/50 absolute h-[100vh] top-0 bottom-0 left-0 right-0 z-20"
            } `}
          >
            <div
              className={`${
                !toggle ? "hidden w-[0px]" : "lg:flex justify-end w-[400px]"
              } p-6 absolute hidden top-0 right-0 h-[100vh] z-20 bg-white transition-transform duration-300 ease-in-out`}
            >
              <ul className="list-none flex items-end flex-1 flex-col gap-4">
                <li>
                  <Image
                    src={close}
                    alt="menu"
                    className="w-[16px] h-[16px] object-contain"
                    onClick={() => setToggle(!toggle)}
                  />
                </li>
                <li>nothing here!</li>
              </ul>
            </div>
          </div>

          <div className="lg:hidden flex flex-1 justify-end items-center">
            <ul className="pl-10 pr-5">
              <li className="text-black">
                <SearchBar />
              </li>
            </ul>

            <CiShoppingCart
              className="w-[24px] h-[24px] object-contain"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !toggle ? "hidden" : "flex justify-end"
              } p-6 absolute top-12 right-0 mx-4 my-2 min-w-[200px] min-h-[250px] z-20 rounded-lg bg-white`}
            >
              <ul className="list-none flex items-end flex-1 flex-col gap-4">
                <li>
                  <Image
                    src={close}
                    alt="menu"
                    className="w-[16px] h-[16px] object-contain"
                    onClick={() => setToggle(!toggle)}
                  />
                </li>
                <li>nothing here!</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <nav className="lg:hidden flex justify-center items-center fixed bottom-0 left-0 right-0 z-20 h-[50px] bg-white">
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
          {currentUser && currentUser.user.role == "user" && (
            <li>
              <Link href="/favour" className="flex flex-col items-center">
                <CiHeart className="w-[21px] h-[21px]" />
                <p className="text-[12px]">Wishlist</p>
              </Link>
            </li>
          )}
          {!currentUser && (
            <li>
              <Link href="/login" className="flex flex-col items-center">
                <CiUser className="w-[20px] h-[20px]" />
                <p className="text-[12px]">Me</p>
              </Link>
            </li>
          )}
          {currentUser && (
            <li>
              <Link href="/profile" className="flex flex-col items-center">
                <CiUser className="w-[20px] h-[20px]" />
                <p className="text-[12px]">Me</p>
              </Link>
            </li>
          )}
          {currentUser && currentUser.user.role == "admin" && (
            <li>
              <Link href="/data" className="flex flex-col items-center">
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
