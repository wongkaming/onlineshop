"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { ProductContext } from "@/context/productContext";
import { LightContext } from "@/context/lightContext";

const Itempage = dynamic(() => import("@/components/itempage"), {
  ssr: false,
});

export default function Profile({ params }) {
  const { data } = useContext(ProductContext);
  const idToFind = params.id;
  const index = data.findIndex((item) => item._id === idToFind);

  const { value2 } = useContext(LightContext);

  return (
    <>
      <iframe
        src={`https://3dcanvas.vercel.app/${data[index].model3d}/${value2}`}
        className="hidden md:flex md:w-2/5 items-center pt-14"
      ></iframe>
      <Itempage data={data[index]} like={data[index]._id} />
    </>
  );
}
