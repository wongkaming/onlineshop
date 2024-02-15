import React from "react";
import dynamic from "next/dynamic";
import { Model3dPreview } from "@/components";

const Itempage = dynamic(() => import("@/components/itempage"), {
  ssr: false,
});

async function myFunction(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/latest/clothes/item/${id}`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    return notFound();
  }
  return response.json();
}

export default async function Profile({ params }) {
  const data2 = await myFunction(params.id);
  return (
    <>
      <Model3dPreview data={data2?.model3d} />
      <Itempage data={data2} like={data2?._id} />
    </>
  );
}
