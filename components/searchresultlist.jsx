"use client";
import React, { Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

import { SearchResultData, Loading, Nothing } from "@/components/";
const StarsCanvas = lazy(() => import("@/components/canvas/Stars"));

const fetchPosts = (url) => fetch(url).then((response) => response.json());

const SearchResultList = ({ input }) => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || input);

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts
  );

  return (
    <section className="flex flex-col items-center md:px-24 max-h-screen absolute top-8 left-0 right-0 z-20 bg-black">
      <div
        className="px-[5%] overflow-auto pt-12 grow lg:pb-10 pb-14"
        style={{ maxHeight: `calc(100vh - 32px)` }}
      >
        <h1 className="text-white text-[24px] py-2">
          Results for <span className="font-bold">' {input} '</span>
        </h1>
        {data?.posts.length !== 0 && (
          <>
            <SearchResultData data={data} />
            <div className="flex justify-center py-8">
              <a href="/shop">
                <button className="text-white blackpurple rounded-full font-medium text-sm px-5 py-2.5 me-2 mb-2 ">
                  Explore more
                </button>
              </a>
            </div>
            </>
        )}
        {data?.posts.length == 0 && (<Nothing />)}
        {isLoading && (<Loading />)}
        {/* <Suspense fallback={<div> </div>}>
          <StarsCanvas />
        </Suspense> */}
      </div>
    </section>
  );
};

export default SearchResultList;
