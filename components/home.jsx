"use client";
import React, { useState, useContext } from "react";
import { IntroList } from "@/constants/index";
import Typewriter from "typewriter-effect";
import { Preview, HomeDeco } from "@/components";

import styles from "./layout.module.css";

const WellcomePage = ({ handleClick }) => {
  // const [timer, setTimer] = useState("");

  // const myTimer = () => {
  //   const date = new Date();
  //   setTimer(date.toLocaleTimeString());
  // };
  // setInterval(myTimer, 100);

  return (
    <>
      <div className="text-xl text-white">
        HKT
        {/* <br />
        {timer} */}
      </div>
      <div className="text-xl text-white w-96">
        <Typewriter
          options={{
            strings: ["Welcome to Dazeworld", "Think about the dream..."],
            autoStart: true,
            loop: true,
            cursor: "_",
          }}
        />
      </div>
      <div className="flex flex-row">
        <button className="text-xl text-white" onClick={handleClick}>
          ExPlOrE
        </button>
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamJqbnc5bjQ3Mzg1OGViMDZvZjR4YXd1ZnU5Y21iczBtY2g0cTZybSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/EAP2HUqMrZsB0jqwUr/giphy.gif"
          className="w-10 h-9"
        />
      </div>
    </>
  );
};

const page = () => {
  const [homepage, setHomepage] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleClick = () => {
    setHomepage(true);
  };

  return (
    <div className="flex flex-row justify-between absolute w-full h-full top-0 bottom-0 right-0 left-0 overflow-hidden">
      <div
        className={`hidden lg:flex lg:flex-row justify-around w-full h-full ml-10 items-center ${
          homepage ? "mr-5" : "mr-10"
        }`}
      >
        {!preview && <WellcomePage handleClick={handleClick} />}
        {preview && (
          <div id={styles.words}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            neque magnam veniam error dignissimos molestiae quia, asperiores
            ipsum blanditiis assumenda ex culpa? Corporis cum in vitae
            accusantium aliquid, error reiciendis?
          </div>
        )}
      </div>

      <div
        className={`hidden lg:flex lg:flex-col h-full overflow-y-auto bg-white/90 backdrop-blur-lg transition-all ease-in-out duration-1000 ${
          homepage
            ? "-translate-x-0 pl-5 pr-10 w-full"
            : "translate-x-full pl-0 pr-0 w-0"
        }`}
        onMouseEnter={() => {
          setPreview(true);
        }}
        onMouseLeave={() => {
          setPreview(false);
        }}
      >
        {IntroList &&
          IntroList.map((d, index) => {
            return (
              <Preview data={d} index={index} key={index} homepage={homepage} />
            );
          })}
      </div>
      <div
        className={`lg:hidden flex flex-col md:px-10 px-5 w-full h-full overflow-y-auto bg-white/60 backdrop-blur-lg`}
        onMouseEnter={() => {
          setPreview(true);
        }}
        onMouseLeave={() => {
          setPreview(false);
        }}
      >
        {IntroList &&
          IntroList.map((d, index) => {
            return (
              <Preview data={d} index={index} key={index} homepage={true} />
            );
          })}
      </div>
    </div>
  );
};

export default page;
