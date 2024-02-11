"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";

import { SearchResultList } from "@/components/";

const MobileSearchBar = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    search ? search.get("q") : null
  );
  const [input, setInput] = useState("");
  // const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();

    // if (typeof searchQuery !== "string") {
    //   return;
    // }

    const encodedSearchQuery = encodeURI(searchQuery || "");
    // router.push(`/search?q=${encodedSearchQuery}`);
  };
  const [goBack, setgoBack] = useState(false);

  return (
    <div>
      <div className="box-border grow">
        <form onSubmit={onSearch} className="relative">
          <input
            value={searchQuery || ""}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search"
            className={`border px-2 font-medium bg-black/5 w-56 backdrop-blur-sm rounded-full`}
          />
          <button
            onClick={() => {
              setgoBack(true);
              setInput(searchQuery);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-2"
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
        className={`lg:hidden fixed bottom-0 left-0 right-0 top-0 transition-transform duration-300 z-30 ${
          goBack ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-2 px-5 flex flex-row justify-between fixed top-0 left-0 right-0 z-30 items-center backdrop-blur-lg bg-white">
          <IoIosArrowRoundBack
            className="w-[24px] h-[24px]"
            onClick={() => {
              setgoBack(!goBack);
              setSearchQuery("");
            }}
          />
          <div className="box-border px-5 grow">
            <form onSubmit={onSearch} className="relative">
              <input
                value={searchQuery || ""}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search"
                className={`border w-full backdrop-blur-sm px-2 font-medium bg-black/5 rounded-full`}
              />
              <button
                onClick={() => {
                  setInput(searchQuery);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-2"
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
        </div>
        {goBack && <SearchResultList input={input} />}
      </div>
    </div>
  );
};

export default MobileSearchBar;
