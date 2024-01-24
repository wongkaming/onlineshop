"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "../components/layout.module.css";
import { IoIosArrowRoundBack } from "react-icons/io";

const SearchBar = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    search ? search.get("q") : null
  );
  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();

    // if (typeof searchQuery !== "string") {
    //   return;
    // }

    const encodedSearchQuery = encodeURI(searchQuery || "");
    router.push(`/search?q=${encodedSearchQuery}`);

    console.log("currrent query", encodedSearchQuery);
  };
  const [goBack, setgoBack] = useState(false);

  return (
    <>
      <div className={styles.searchbar}>
        <form onSubmit={onSearch} className="relative">
          <input
            value={searchQuery || ""}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search"
            className={`${styles.formControl} px-2 font-medium`}
          />
          <button
            onClick={() => {
              setgoBack(!goBack);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-1"
          >
            <CiSearch
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "black",
                display: "inline-block",
              }}
            />
          </button>
        </form>
      </div>
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
          </div>
          <div className="py-2 px-5 flex flex-row justify-around items-center backdrop-blur-lg bg-white/60 shadow-sm font-medium">
            <h1 className="text-[16px]">All Items</h1>
            <h1 className="text-[16px]">Board</h1>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
