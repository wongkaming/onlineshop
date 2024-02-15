"use client";
import React, { useState } from "react";

const OneEvent = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="md:m-5 flex justify-evenly items-center flex-col blackpurple p-2 rounded backdrop-blur-sm transition duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${
          isHovered ? "opacity-100" : "opacity-0"
        } flex justify-center items-center absolute bg-black/10 inset-0 transition ease-in-out duration-300`}
      >
        <p className="bg-white border border-black rounded-full px-4">view</p>
      </div>
      <img src={data.gallerywrap[0]} alt="" height={300} />
      <h3 className="text-white mt-1 text-[16px] text-center max-w-[100px] md:max-w-[200px] h-[40px] truncate">
        {data.title}
      </h3>
    </div>
  );
};

const EventList = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {data &&
        data.map((d, index) => {
          return <OneEvent data={d} key={index} />;
        })}
    </div>
  );
};

export default EventList;
