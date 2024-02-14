"use client";
import React, { useEffect, useState } from "react";
import EventList from "@/components/event";
import transition from "../transition";

const page = () => {
  const [data, setDate] = useState(null);
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API}/latest/event/all`,
      { method: "get" },
      { cache: "force-cache" }
    )
      .then(async function (req) {
        let data2 = await req.json();
        setDate(data2);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div
      className="px-[5%] overflow-auto grow lg:pb-10 pb-14 w-full"
      style={{ maxHeight: `calc(100vh - 32px)` }}
    >
      <nav className="flex pt-10 mb-2 w-full justify-start">
        <p className="font-bold text-3xl lg:text-5xl px-3 text-white">▶ PAST</p>
      </nav>

      <EventList data={data} />
    </div>
  );
};

export default transition(page);
