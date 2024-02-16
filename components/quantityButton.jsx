"use client";
import React, { Component } from "react";

const Quantity = class extends Component {
  state = { value: 1 };

  //在 setState 中直接修改状态是不推荐的
  increment = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  };

  decrement = () => {
    this.setState((prevState) => ({
      value: prevState.value > 1 ? prevState.value - 1 : 1,
    }));
  };

  render() {
    return (
      <div className="px-4 py-1 rounded-md border flex flex-row items-center">
        <button
          onClick={this.decrement}
          aria-label="Decrease quantity"
          className="focus:outline-none"
        >
          &mdash;
        </button>
        <p className="mx-2 w-4">{this.state.value}</p>
        <button
          onClick={this.increment}
          aria-label="Increase quantity"
          className="focus:outline-none"
        >
          &#xff0b;
        </button>
      </div>
    );
  }
};

export default Quantity;
