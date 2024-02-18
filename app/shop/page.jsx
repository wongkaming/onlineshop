"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ItemList, MenuTable, Loading, Nothing } from "@/components/";
import { CategoryList } from "@/constants";
import transition from "../transition";
import { CiViewList } from "react-icons/ci";
import ItemService from "@/hook/item";

const CategoryMenu = () => {
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTopsChange = (event) => {
    const targetName = event.target.name;
    setCategory((prevCategory) => {
      if (event.target.checked) {
        return [...prevCategory, targetName];
      } else {
        return prevCategory.filter((item) => item !== targetName);
      }
    });
    setPage(1);
  };

  const [data, setData] = useState(null);
  const [next, setNext] = useState(false);
  const encodedSearchQuery = encodeURI(category);
  let [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      ItemService.getItemByCategory(encodedSearchQuery)
        .then((i) => {
          // console.log(i.data.items);

          setData(i.data);
          setNext(i.data.length >= 15);
        })
        .catch((e) => {
          console.error(e.response ? e.response.data : e);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 3000); // 等待3秒

    // 如果category变更或组件卸载，清除定时器
    return () => {
      clearTimeout(timerId);
      setLoading(false);
    };
  }, [category]);

  const morePicture = async () => {
    setPage(page + 1);
    let newURL = `${
      process.env.NEXT_PUBLIC_API
    }/latest/result/findByCategory/${encodedSearchQuery}?page=${
      page + 1
    }&perPage=15`;

    let result = await axios.get(newURL);
    if (result.data.length !== 0) {
      setData(data.concat(result.data));
      if (data.length % 15 !== 0) {
        setNext(true);
      } else if (data.length % 15 == 0) {
        setNext(false);
      }
    } else {
      setNext(false);
      console.log("no data!");
    }
  };

  return (
    <div className="flex justify-evenly w-full ">
      <div className="py-14 ">
        <div className="hidden lg:flex flex-col justify-start items-start bubble">
          <MenuTable
            CategoryList={CategoryList}
            handleTopsChange={handleTopsChange}
          />
        </div>

        <div className="lg:hidden fixed bottom-16 right-5 z-20">
          <CiViewList
            className={`${
              toggle ? "w-[40px] h-[40px]" : "w-[44px] h-[44px]"
            } pinkblue p-2 rounded-full shadow-lg transition-all duration-100`}
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <div
          className={`lg:hidden ${
            toggle
              ? "bg-black/30 fixed bottom-0 left-0 right-0 top-0 z-20"
              : "bg-transparent"
          }`}
        >
          <div
            className={`lg:hidden fixed overflow-auto h-[400px] bottom-0 left-0 right-0 box-border p-5 rounded-t-lg bg-white transition-transform duration-500 z-30 ${
              toggle ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex flex-col">
              <div className="flex w-full justify-end">
                <button
                  className="border border-black rounded-full py-1 px-3"
                  onClick={() => setToggle(!toggle)}
                >
                  Apply
                </button>
              </div>
              <MenuTable
                CategoryList={CategoryList}
                handleTopsChange={handleTopsChange}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="z-10">
          <Loading />
        </div>
      )}

      {!loading && (
        <div
          className="px-[5%] overflow-auto pt-14 grow lg:pb-10 pb-14"
          style={{ maxHeight: `calc(100vh - 32px)` }}
        >
          <ItemList data={data} />
          <div className="flex w-full justify-center mt-8">
            {next && (
              <button
                onClick={morePicture}
                className="text-white blackpurple rounded-full hover:bg-gray-900 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#24282e] dark:hover:bg-gray-700"
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default transition(CategoryMenu);
