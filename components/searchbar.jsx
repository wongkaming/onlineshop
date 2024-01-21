"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "../components/layout.module.css";

const SearchInput = () => {
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

  return (
    <div className={styles.searchbar}>
      <form onSubmit={onSearch} className="relative">
        <input
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search"
          className={`${styles.formControl} px-2 font-medium`}
        />
        <button className="absolute inset-y-0 right-0 flex items-center pr-1">
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
  );
};

export default SearchInput;
