"use client";
import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import Image from "next/image";
import { ItemList, ConfigButton } from "@/components/";
import { CategoryList } from "@/constants";
import transition from "../transition";
import { menu } from "@/public";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      visibleMenuId: ["tag0", "tag1", "tag2"],
      tags: [],
    };
  }

  handleOpenMenu = (id) => {
    if (this.state.visibleMenuId.includes(id)) {
      const updatedVisibleMenuId = this.state.visibleMenuId.filter(
        (menuId) => menuId !== id
      );
      this.setState({ visibleMenuId: updatedVisibleMenuId });
    } else {
      this.setState({ visibleMenuId: [...this.state.visibleMenuId, id] });
    }
  };

  render() {
    const { CategoryList, handleTopsChange } = this.props;

    const tags = CategoryList.map((e, index) => (
      <div className="flex flex-col px-10 border-b border-gray-600" key={index}>
        <ConfigButton
          subtitle={e.subtitle}
          key={"tag" + index}
          onClick={() => this.handleOpenMenu("tag" + index)}
        />
        <div
          className="flex justify-start flex-col w-full items-start"
          key={index}
        >
          <ul
            className={`pb-6 ${
              this.state.visibleMenuId.includes("tag" + index)
                ? "visible"
                : "hidden"
            }`}
            key={index}
          >
            {e.title.map((d, index) => (
              <li className="checkbox space-x-6" key={index}>
                <input
                  id={"checkbox" + index}
                  type="checkbox"
                  key={index}
                  name={d.toLowerCase()}
                  onClick={handleTopsChange}
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
    ));

    return <div>{tags}</div>;
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
    console.log(result.data);
    setData(data.concat(result.data));
  };

  return (
    <section className="flex flex-col items-center py-6 md:px-24 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="hidden lg:flex flex-col justify-start items-start">
          <h1 className="px-10 font-bold">Filter By</h1>
          <Menu
            CategoryList={CategoryList}
            handleTopsChange={handleTopsChange}
          />
        </div>

        <div className="lg:hidden">
          <Image
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <div>
          <ItemList data={data} />
          <button onClick={morePicture}>Load more...</button>
        </div>
      </div>
    </section>
  );
};

export default transition(CategoryMenu);
