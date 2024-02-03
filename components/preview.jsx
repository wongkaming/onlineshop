"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Preview = ({ data }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageComponents = [];

    if (data.coverimage) {
      imageComponents.push(
        <Image
          src={data.coverimage}
          alt=""
          width={960}
          height={540}
          key={1}
          className="row-span-2"
        />
      );
    }

    if (data.hostimage1) {
      imageComponents.push(
        <Image
          src={data.hostimage1}
          alt=""
          width={400}
          height={600}
          unoptimized={true}
          key={2}
        />
      );
    }

    if (data.hostimage2) {
      imageComponents.push(
        <Image
          src={data.hostimage2}
          alt=""
          width={400}
          height={600}
          unoptimized={true}
          key={3}
        />
      );
    }

    if (data.hostimage3) {
      imageComponents.push(
        <Image
          src={data.hostimage3}
          alt=""
          width={960}
          height={540}
          className="col-span-2"
          unoptimized={true}
          key={4}
        />
      );
    }

    setImages(imageComponents);
  }, []);

  return (
    <div className="flex flex-col pt-14 pb-5">
      <p className="text-xl font-semibold m-2">{data.category}</p>
      {images.length != 1 && (
        <div className="grid grid-cols-2 max-w-[800px]">{images}</div>
      )}
      {images.length == 1 && (
        <div className="grid grid-cols-1 max-w-[800px]">{images}</div>
      )}
      <div className="grid grid-cols-2 pt-5">
        <h1 className="text-[48px] leading-10 mr-5">{data.title}</h1>
        <p className="leading-none mr-5">{data.description}</p>
      </div>
    </div>
  );
};

export default Preview;
