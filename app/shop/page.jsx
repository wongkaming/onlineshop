"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Image from "next/image";
import { ItemList, MenuTable } from "@/components/";
import { CategoryList } from "@/constants";
import transition from "../transition";
import { CiViewList } from "react-icons/ci";
import { UserContext } from "@/context/userContext";

const CategoryMenu = () => {
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);

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
  const encodedSearchQuery = encodeURI(category);
  let [page, setPage] = useState(1);
  const { refresh } = useContext(UserContext);

  useEffect(() => {
    fetch(
      `https://nodejs-restfulapi-onlineshopdb.onrender.com/latest/result/findByCategory/${encodedSearchQuery}`,
      { method: "get" }
    )
      .then(async function (req) {
        let data2 = await req.json();
        setData(data2);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [category, refresh]);

  const morePicture = async () => {
    setPage(page + 1);
    let newURL = `https://nodejs-restfulapi-onlineshopdb.onrender.com/latest/result/findByCategory/${encodedSearchQuery}?page=${
      page + 1
    }&perPage=15`;

    let result = await axios.get(newURL);
    if (result.data.length !== 0) {
      setData(data.concat(result.data));
    } else {
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

      <div
        className="px-[5%] overflow-auto pt-14 grow lg:pb-10 pb-14"
        style={{ maxHeight: `calc(100vh - 32px)` }}
      >
        <ItemList data={data} />
        <button onClick={morePicture}>Waiting on scroll events...</button>
      </div>
    </div>
  );
};

export default transition(CategoryMenu);
