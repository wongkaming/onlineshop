import React from "react";
import { ConfigButton } from "@/components";

const MenuTable = class extends React.Component {
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
              <p className="text-base leading-4">{d}</p>
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
        <h1 className="px-10 pt-3 font-bold">Filter By</h1>
        {tags}
      </div>
    );
  }
};

export default MenuTable;
