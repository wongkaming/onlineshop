"use client";
import React, { useState, useContext } from "react";
import { IntroList } from "@/constants/index";
import Typewriter from "typewriter-effect";
import { Preview } from "@/components";
import { UserContext } from "@/context/userContext";

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

      </div>
      <div className="text-xl text-[#00FF00] font-semibold w-80 flex">
        <p className="pr-2">C: {">"}</p>
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

const Home = () => {
  const { homepage, setHomepage } = useContext(UserContext);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    setHomepage(true);
  };

  return (
    <div className="flex flex-row justify-between absolute w-full h-full min-h-[540px] top-0 bottom-0 right-0 left-0 overflow-hidden">
      {!preview && (
        <div
          className={`hidden lg:flex lg:flex-row justify-around w-full h-full items-center`}
        >
          <WellcomePage handleClick={handleClick} />
        </div>
      )}
      {preview && (
        <div className="hidden lg:flex lg:flex-col w-full h-full pt-10 bg-black/90 backdrop-blur-lg">
          <div className={`flex flex-col h-full justify-center`}>
            <h1 className="text-2xl text-white flex w-full justify-center absolute top-50 right-0 left-0 ">
              {preview.title}
            </h1>
            {preview.coverimage && <img src={preview.coverimage} alt="" />}
            {preview.hostimage && <img src={preview.hostimage[1]} />}
          </div>
        </div>
      )}

      <div
        className={`hidden lg:flex lg:flex-col pt-14 overflow-y-auto bg-white/90 bg-repeat backdrop-blur-lg transition-all ease-in-out duration-1000 ${
          homepage ? "-translate-x-0 px-5 w-full" : "translate-x-full px-0 w-0"
        }`}
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/textured-paper.png")`,
        }}
      >
        <h1 className="text-5xl text-slate-800 tracking-widest font-serif	flex w-full justify-center border-b-8 border-slate-800 border-double mb-4">
          DAILY NEWS
        </h1>
        {IntroList &&
          IntroList.map((d, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => {
                  setPreview(d);
                }}
                onMouseLeave={() => {
                  setPreview(null);
                }}
              >
                <Preview
                  data={d}
                  index={index}
                  key={index}
                  homepage={homepage}
                />
              </div>
            );
          })}
      </div>
      <div
        className={`lg:hidden flex flex-col md:px-10 pt-14 px-5 w-full h-full overflow-y-auto bg-white/90 bg-repeat backdrop-blur-lg`}
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/textured-paper.png")`,
        }}
        onMouseEnter={() => {
          setPreview(true);
        }}
        onMouseLeave={() => {
          setPreview(false);
        }}
      >
        <h1 className="text-5xl text-slate-800 tracking-widest font-serif	flex w-full justify-center border-b-8 border-slate-800 border-double mb-4">
          DAILY NEWS
        </h1>
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

export default Home;
