"use client";
import React, { useContext } from "react";
import { CurrencyContext } from "@/context/currencyContext";

import { OneItem } from "@/components/";

const SearchResultData = ({ data }) => {
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
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12 md:grid-cols-3 xl:grid-cols-5">
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

export default SearchResultData;