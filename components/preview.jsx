"use client";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import Image from "next/image";

const Preview = ({ data, index, homepage }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col pb-8 mb-8 border-b border-slate-400 border-dashed max-w-[800px]">
        <p className="text-sm font-semibold mb-1">
          <span className="border border-gray-600 rounded-full px-1 mr-1">
            {index + 1}
          </span>
          {data.category}
        </p>
        <div
          className="max-w-[800px] relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`${
              isHovered ? "opacity-100" : "opacity-0"
            } flex justify-center items-center absolute inset-0 bg-black/10 transition ease-in-out duration-300`}
          >
            <p className="bg-white border border-black rounded-full px-4">
              view
            </p>
          </div>

          <div className="grid grid-cols-2">
            {data.hostimage &&
              data.hostimage.map((image, index) => (
                <Image
                  src={image}
                  alt={`Host ${index}`}
                  width={400}
                  height={600}
                  unoptimized={true}
                  key={index}
                />
              ))}
          </div>
          {data.coverimage && (
            <div className="grid grid-cols-1">
              <Image
                src={data.coverimage}
                alt="Cover image"
                width={960}
                height={540}
                key="cover-image"
                className="row-span-2"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 pt-3 max-w-[800px]">
          <h1 className="text-[36px]  lg:text-[48px] leading-10 mr-5">
            {homepage && (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString(data.title).start();
                }}
              />
            )}
          </h1>
          <p className="leading-none mr-5 text-balance">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
