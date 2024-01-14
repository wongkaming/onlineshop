"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SearchResultList } from "@/components/";
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

  console.log(data);

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
    <div>
      <SearchResultList data={data} />
    </div>
  );
};

export default transition(page);
