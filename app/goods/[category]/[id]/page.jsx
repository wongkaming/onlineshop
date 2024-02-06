"use client"
import React, { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ProductContext } from '@/context/productContext';

const Itempage = dynamic(() => import("@/components/itempage"), {
  ssr: false,
});
const Item3d = dynamic(
  () => import("@/components/canvas/item3d"),
  {
    ssr: false,
  }
);

async function fetchData(id, signal) {
  try {
    const response = await fetch(
      `http://localhost:4040/latest/clothes/item/${id}`,
      {
        cache: "force-cache",
        signal: signal
      }
    );
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null; // Or handle the error as you see fit
  }
}

export default function Profile({ params }) {
  const { data } = useContext(ProductContext);
  const idToFind = params.id;
  const index = data.findIndex(item => item._id === idToFind);

  const [data2, setData2] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;

    fetchData(params.id, signal).then(fetchedData => {
      setData2(fetchedData);
    });

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, [params.id]);

  if (index == -1) {
    return (
      <>
        <Item3d url={data2?.model3d} />
        <Itempage data={data2} like={data2?._id}/>
      </>
    )
  }
  return (
    <>
      {/* <Item3d url={data[index].model3d} /> */}
      <Itempage data={data[index]} like={data[index]._id} />
    </>
  );
}