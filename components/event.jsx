"use client";
import React from "react";

const OneEvent = ({ data }) => {
  return (
    <div className="md:p-8 flex justify-evenly items-center flex-col border border-gray-700 hover:bg-white/50 backdrop-blur-sm transition duration-300 ease-in-out">
      <img src={data.gallerywrap[0]} alt="" height={300} />
      <h3 className="text-white mt-1 text-[16px] text-center max-w-[200px] h-[40px] truncate">
        {data.title}
      </h3>
    </div>
  );
};

const EventList = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {data &&
        data.map((d, index) => {
          return <OneEvent data={d} key={index} />;
        })}
    </div>
  );
};

export default EventList;
