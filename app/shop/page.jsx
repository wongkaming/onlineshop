"use client";
import React, { useEffect, useState, Component } from "react";
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
      this.setState({ visibleMenuId: updatedVisibleMenuId });
    } else {
      this.setState({ visibleMenuId: [...this.state.visibleMenuId, id] });
    }
  };

  render() {
    const { CategoryList, handleTopsChange } = this.props;

    const tags = CategoryList.map((e, index) => (
      <div className="flex flex-col px-10 border-b border-gray-600">
        <ConfigButton
          subtitle={e.subtitle}
          id={"tag" + index}
          onClick={() => this.handleOpenMenu("tag" + index)}
        />
        <div className="flex justify-start flex-col w-full items-start">
          <ul
            className={`pb-6 ${
              this.state.visibleMenuId.includes("tag" + index)
                ? "visible"
                : "hidden"
            }`}
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

  return (
    <section className="flex flex-col items-center py-6 md:px-24 min-h-screen">
      <div className="flex justify-center w-full">
        <div className="xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500 justify-start items-start hidden md:flex md:w-64 flex-col">
          <h1 className="flex px-10 font-bold">Filter By</h1>
          <Menu
            CategoryList={CategoryList}
            handleTopsChange={handleTopsChange}
          />
        </div>
        <AllItem category={category} />
      </div>
    </section>
  );
};

export default transition(CategoryMenu);
