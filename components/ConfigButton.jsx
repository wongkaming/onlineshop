import React, { Component } from "react";

class ConfigButton extends Component {
  render() {
    const { subtitle, style } = this.props;

    return (
      <button
        onClick={this.props.onClick}
        className="focus:outline-none text-left text-black flex justify-between items-center w-full py-5 px-10 space-x-14"
      >
        <p className="text-sm leading-5 font-bold uppercase">{subtitle}</p>
        <svg
          className={style}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 15L12 9L6 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }
}

export default ConfigButton;
