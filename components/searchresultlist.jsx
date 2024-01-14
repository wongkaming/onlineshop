"use client";
import React, { useContext } from "react";
import OneItem from "./item";
import { CurrencyContext } from "@/context/currencyContext";

const SearchResultList = ({ data }) => {
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
    <div className="flex flex-wrap justify-center items-center gap-0 px-24">
      {data &&
        data?.posts.map((d, index) => {
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
      {/* {!data && <p>nothing</p>} */}
    </div>
  );
};

export default SearchResultList;
