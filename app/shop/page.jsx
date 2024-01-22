"use client";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Image from "next/image";
import { ItemList, ConfigButton } from "@/components/";
import { CategoryList } from "@/constants";
import transition from "../transition";
import { menu, close } from "@/public";
import { CiViewList } from "react-icons/ci";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      visibleMenuId: ["tag0"],
      tags: [],
    };
  }

  handleOpenMenu = (id) => {
    if (this.state.visibleMenuId.includes(id)) {
      const updatedVisibleMenuId = this.state.visibleMenuId.filter(
        (menuId) => menuId !== id
      );
      this.setState({
        visibleMenuId: updatedVisibleMenuId,
      });
    } else {
      this.setState({
        visibleMenuId: [...this.state.visibleMenuId, id],
      });
    }
  };

  render() {
    const { CategoryList, handleTopsChange } = this.props;

    const tags = CategoryList.map((e, index) => (
      <div className="flex flex-col border-b border-white" key={index}>
        <ConfigButton
          subtitle={e.subtitle}
          style={`rotate-180`}
          key={"tag" + index}
          onClick={() => this.handleOpenMenu("tag" + index)}
        />
        <ul
          className={`pb-6 flex flex-col w-full items-start ${
            this.state.visibleMenuId.includes("tag" + index)
              ? "visible"
              : "hidden"
          }`}
          key={index}
        >
          {e.title.map((d, index) => (
            <li
              className="checkbox space-x-6 px-10 hover:bg-white transition duration-300 ease-in-out"
              key={index}
            >
              <input
                id={d.replaceAll(" ", "")}
                type="checkbox"
                key={index}
                name={d.toLowerCase()}
                onClick={handleTopsChange}
              />
              <label
                htmlFor={d.replaceAll(" ", "")}
                className="text-base leading-4"
              >
                {d}
              </label>
            </li>
          ))}
        </ul>
      </div>
    ));

    return (
      <div
        className="overflow-auto"
        style={{ maxHeight: `calc(100vh - 200px)` }}
      >
        {tags}
      </div>
    );
  }
}

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

  useEffect(() => {
    fetch(
      `http://localhost:4040/latest/result/findByCategory/${encodedSearchQuery}?page=1&perPage=10`,
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

  const morePicture = async () => {
    setPage(page + 1);
    let newURL = `http://localhost:4040/latest/result/findByCategory/${encodedSearchQuery}?page=${
      page + 1
    }&perPage=10`;

    let result = await axios.get(newURL);
    if (result.data.length !== 0) {
      setData(data.concat(result.data));
    } else {
      console.log("no data!");
    }
  };

  return (
    <section className="flex items-center md:px-24 max-h-screen absolute top-8 left-0 right-0">
      <div className="flex justify-evenly w-full ">
        <div className="py-14 ">
          <div className="hidden lg:flex flex-col justify-start items-start bubble">
            <h1 className="px-10 pt-4 font-bold">Filter By</h1>
            <Menu
              CategoryList={CategoryList}
              handleTopsChange={handleTopsChange}
            />
          </div>
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
          className={`${
            toggle
              ? "bg-black/50 fixed bottom-0 left-0 right-0 top-0 z-20"
              : "bg-transparent"
          }`}
        >
          <div
            className={`fixed overflow-auto h-[400px] bottom-0 left-0 right-0 box-border p-5 rounded-t-lg bg-white transition-transform duration-500 z-20 ${
              toggle ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Image
              src={close}
              alt="menu"
              className="fixed right-10 w-[16px] h-[16px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
            <Menu
              CategoryList={CategoryList}
              handleTopsChange={handleTopsChange}
            />
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
    </section>
  );
};

export default transition(CategoryMenu);
