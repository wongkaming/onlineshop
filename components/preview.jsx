import React from "react";
import Typewriter from "typewriter-effect";
import Image from "next/image";

const Preview = ({ data, index, homepage }) => {
  return (
    <div className="flex flex-col pt-14 pb-5">
      <p className="text-sm font-semibold mb-1">
        <span className="border border-gray-600 rounded-full px-1 mr-1">
          {index + 1}
        </span>
        {data.category}
      </p>
      <div className="grid grid-cols-2 max-w-[800px]">
        {data.hostimage &&
          data.hostimage.map((d, index) => {
            return (
              <Image
                src={d}
                alt=""
                width={400}
                height={600}
                unoptimized={true}
                key={index}
              />
            );
          })}
      </div>
      <div className="grid grid-cols-1 max-w-[800px]">
        {data.coverimage && (
          <Image
            src={data.coverimage}
            alt=""
            width={960}
            height={540}
            key={index}
            className="row-span-2"
          />
        )}
      </div>

      <div className="grid grid-cols-2 pt-3">
        <h1 className="text-[48px] leading-10 mr-5">
          {homepage && (
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString(data.title).start();
              }}
            />
          )}
        </h1>
        <p className="leading-none mr-5">{data.description}</p>
      </div>
    </div>
  );
};

export default Preview;
