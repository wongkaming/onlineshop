import React, { useState, useEffect } from "react";
import Image from "next/image";

const OneEvent = ({ data }) => {
  return (
    <div className="bg-[#f5f5f5] py-5 px-5 max-h-[400px] max-w-[400px] flex justify-evenly items-center flex-col">
      <Image
        src={data.gallerywrap[0]}
        alt=""
        width={300}
        height={300}
        unoptimized={true}
      />
      <h3 className="text-black mt-1 text-[14px] text-center max-w-[200px] h-[40px]">
        {data.title}
      </h3>
      <p className="text-black text-[12px] text-center max-w-[200px] max-h-[20px] truncate">
        {data.bio}
      </p>
    </div>
  );
};

const EventList = ({ data }) => {
  return (
    <div className="pictures">
      {data &&
        data.map((d, index) => {
          return <OneEvent data={d} key={index} />;
        })}
    </div>
  );
};

export default EventList;
