"use client";
import React, { useContext } from "react";
import OneItem from "./item";
import { CurrencyContext } from "@/context/currencyContext";

const ItemList = ({ data }) => {
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
    <div className="pl-24 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data &&
        data.map((d, index) => {
          if (change == true) {
            curr = new Intl.NumberFormat(unit, {
              style: "currency",
              currency: currency,
            }).format(((rates2 / rates) * d.price).toFixed(2));
          } else {
            curr = new Intl.NumberFormat(unit, {
              style: "currency",
              currency: currency,
            }).format(d.price);
          }

          return <OneItem data={d} price={curr} like={d._id} key={index} />;
        })}
    </div>
  );
};

export default ItemList;
