import React from "react";
import dynamic from "next/dynamic";

const Itempage = dynamic(() => import("@/components/itempage"), {
  ssr: false,
});
const ItemDetailCanvas = dynamic(
  () => import("@/components/canvas/itemdetail"),
  {
    ssr: false,
  }
);

async function myFunction(id) {
  const response = await fetch(
    `http://localhost:4040/latest/clothes/item/${id}`,
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
  const data = await myFunction(params.id);

  return (
    <div className="flex flex-row justify-between w-full md:pr-10 absolute top-0 md:top-20 md:bottom-10 bottom-0 z-10">
      {data && <ItemDetailCanvas url={data?.model3d} />}
      <Itempage data={data} like={data?._id} />
    </div>
  );
}
