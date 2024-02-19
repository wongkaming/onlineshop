"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SearchResultData, Loading, Nothing } from "@/components/";
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
    return <Loading width={"h-[80dvh]"}/>;
  }

  if (data?.posts.length == 0) {
    return <Nothing width={"h-[80dvh]"}/>;
  }

  return (
    <>
      <h1 className="text-white text-[24px] py-2">
        Results for <span className="font-bold">' {searchQuery} '</span>
      </h1>
      <SearchResultData data={data} />
      <div className="flex justify-center py-8">
        <Link href="/shop">
          <button className="text-white blackpurple rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2">
            Explore more
          </button>
        </Link>
      </div>
    </>
  );
};

export default transition(page);
