"use client";
import React, { useContext } from "react";
import Data from "./data";
import { CurrencyContext } from "@/context/currencyContext";

const DataList = ({ data, currentUser }) => {
  const {
    rates,
    setRates,
    rates2,
    setRates2,
    change,
    setChange,
    currency,
    setCurrency,
    unit,
    setUnit,
  } = useContext(CurrencyContext);

  let curr;

  return (
    <div className="flex flex-wrap justify-center items-center gap-8">
      {data &&
        data.map((d, index) => {
          if (change == true) {
            curr = new Intl.NumberFormat(unit, {
              style: "currency",
              currency: currency,
            }).format(((rates2 / rates) * d.item.price).toFixed(2));
          } else {
            curr = new Intl.NumberFormat(unit, {
              style: "currency",
              currency: currency,
            }).format(d.item.price);
          }
          return (
            <Data
              data={d}
              price={curr}
              currentUser={currentUser}
              like={d._id}
              key={index}
            />
          );
        })}
    </div>
  );
};

export default DataList;
