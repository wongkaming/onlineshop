"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

const ItemPage = dynamic(() => import("@/components/itempage"), {
  ssr: false,
});

// async function myFunction(id) {
//   const response = await fetch(
//     `http://localhost:4040/latest/clothes/item/${id}`,
//     {
//       cache: "no-store",
//     }
//   );
//   if (!response.ok) {
//     return notFound();
//   }
//   return response.json();
// }

export default function Profile({ params }) {
  // const data = await myFunction(params.id);
  const [data, setDate] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:4040/latest/clothes/item/${params.id}`,
      { method: "get" },
      { cache: "no-store" }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      <ItemPage data={data} like={data?._id} />
    </motion.div>
  );
}
