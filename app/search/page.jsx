"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SearchResultData, StarsCanvas } from "@/components/";
import transition from "../transition";

const fetchPosts = (url) => fetch(url).then((response) => response.json());

const page = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data?.posts.length == 0) {
    return (
      <div>
        <p>Nothing found.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center md:px-24 max-h-screen absolute top-8 left-0 right-0">
      <div
        className="px-[5%] overflow-auto pt-12 grow lg:pb-10 pb-14"
        style={{ maxHeight: `calc(100vh - 32px)` }}
      >
        <h1 className="text-white text-[24px] py-2">
          Results for <span className="font-bold">' {searchQuery} '</span>
        </h1>
        <SearchResultData data={data} />
        <div className="flex justify-center py-8">
          <Link href="/shop">
            <button className="text-white bg-[#24282e] rounded-full hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#24282e] dark:hover:bg-gray-700 ">
              Explore more
            </button>
          </Link>
        </div>
        <StarsCanvas />
      </div>
    </section>
  );
};

export default transition(page);
