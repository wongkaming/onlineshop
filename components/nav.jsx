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
        className={`w-full flex items-center fixed top-0 py-3 z-20 text-[16px] font-medium backdrop-blur-lg hover:bg-white transition duration-300 ease-in-out shadow-md shadow-[#d5e8ff]/50 ${
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

          <ul className="list-none hidden xl:flex flex-row gap-10 items-center ps-52">
            {/* <li className="hover:text-[#b5cce8] cursor-pointer">
              <Shop />
            </li> */}
            {navLinks.map((nav) => (
              <li key={nav.id} className="hover:text-[#b5cce8] cursor-pointer">
                <Link href={`${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>

          <ul className="list-none hidden xl:flex flex-row gap-10 items-center">
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
                <Link href="/profile">Profile</Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "user" && (
              <li>
                <Link href="/favour">Favour</Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "admin" && (
              <li>
                <Link href="/data">Data</Link>
              </li>
            )}

            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>

          <div className="xl:hidden flex flex-1 justify-end items-center">
            <ul className="px-10">
              <li className="text-black">
                <SearchBar />
              </li>
            </ul>

            <Image
              src={toggle ? close : menu}
              alt="menu"
              className="w-[18px] h-[18px] object-contain"
              onClick={() => setToggle(!toggle)}
            />

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-poppins cursor-pointer ${
                      active === nav.title ? "text-white" : "text-secondary"
                    }`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(nav.title);
                    }}
                  >
                    <Link href={`${nav.id}`}>{nav.title}</Link>
                  </li>
                ))}
                {!currentUser && (
                  <li className={`font-poppins cursor-pointer`}>
                    <Link href="/login">Login</Link>
                  </li>
                )}
                {currentUser && (
                  <li className={`font-poppins cursor-pointer`}>
                    <Link href="/profile">Profile</Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "user" && (
                  <li className={`font-poppins cursor-pointer`}>
                    <Link href="/favour">Favour</Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "admin" && (
                  <li className={`font-poppins cursor-pointer`}>
                    <Link href="/data">Data</Link>
                  </li>
                )}
                <li className={`font-poppins cursor-pointer`}>
                  <Link href="/cart">Cart</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
