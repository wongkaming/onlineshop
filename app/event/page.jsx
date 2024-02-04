"use client";
import React, { useEffect, useState } from "react";
import EventList from "@/components/event";
import transition from "../transition";

const page = () => {
  // const [data, setDate] = useState(null);
  // useEffect(() => {
  //   fetch(
  //     "http://localhost:4040/latest/event/all",
  //     { method: "get" },
  //     { cache: "no-store" }
  //   )
  //     .then(async function (req) {
  //       let data2 = await req.json();
  //       setDate(data2);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);
  return <EventList />;
};

export default transition(page);
