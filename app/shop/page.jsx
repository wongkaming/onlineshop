"use client";
import React, { useEffect, useState } from "react";
import { ItemList, ConfigButton } from "@/components/";
import { CategoryList } from "@/constants";
import transition from "../transition";

const AllItem = ({ category }) => {
  const [data, setData] = useState(null);
  const encodedSearchQuery = encodeURI(category);

  useEffect(() => {
    fetch(
      `http://localhost:4040/latest/result/findByCategory/${encodedSearchQuery}`,
      { method: "get" },
      { cache: "no-store" }
    )
      .then(async function (req) {
        let data2 = await req.json();
        setData(data2);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [category]);

  return <ItemList data={data} />;
};

let arr = [];

const CategoryMenu = () => {
  let [rotate, setRotate] = useState("rotate-0");
  let [rotate2, setRotate2] = useState("rotate-0");
  let [hidden, setHidden] = useState(" pb-6");
  let [hidden2, setHidden2] = useState(" pb-6");

  const showMenu1 = () => {
    if (rotate == "rotate-0") {
      setRotate("rotate-180");
      setHidden("hidden  pb-6");
    } else if (rotate == "rotate-180") {
      setRotate("rotate-0");
      setHidden(" pb-6");
    }
  };
  const showMenu2 = () => {
    if (rotate2 == "rotate-0") {
      setRotate2("rotate-180");
      setHidden2("hidden  pb-6");
    } else if (rotate2 == "rotate-180") {
      setRotate2("rotate-0");
      setHidden2(" pb-6");
    }
  };

  const [category, setCategory] = useState(arr);

  const handleTopsChange = (event) => {
    if (event.target.checked) {
      arr.push(event.target.name);
      setCategory(arr.toString());
    } else {
      const index = arr.indexOf(event.target.name);
      if (index > -1) {
        arr.splice(index, 1);
      }
      setCategory(arr.toString());
    }
  };

  return (
    <section className="flex justify-normal py-6 px-24">
      <div className="xl:rounded-r transform xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full w-full sm:w-64 flex-col">
        <h1 className="flex px-10 font-bold">Filter By</h1>
        {CategoryList.map((e) => (
          <div className="flex flex-col px-10 border-b border-gray-600">
            <ConfigButton subtitle={e.subtitle} />
            <div className="flex justify-start flex-col w-full items-start ">
              <ul className={hidden}>
                {e.title.map((d, index) => (
                  <li className="checkbox space-x-6 " key={index}>
                    <input
                      id={"checkbox" + index}
                      type="checkbox"
                      key={index}
                      name={d.toLowerCase()}
                      onChange={handleTopsChange}
                    />
                    <label
                      htmlFor={"checkbox" + index}
                      className="text-base leading-4"
                    >
                      {d}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <AllItem category={category} />
    </section>
  );
};

export default transition(CategoryMenu);
