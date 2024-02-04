"use client";
import React, { useContext } from "react";
import OneItem from "./item";
import { CurrencyContext } from "@/context/currencyContext";
import { UserContext } from "@/context/userContext";

const ItemList = ({ data }) => {
  const { rates, rates2, change, currency, unit } = useContext(CurrencyContext);
  const { currentUser } = useContext(UserContext);

  let curr;

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12 md:grid-cols-3 xl:grid-cols-5">
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

          return (
            <OneItem
              data={d}
              price={curr}
              like={d._id}
              key={index}
              currentUser={currentUser}
            />
          );
        })}
    </div>
  );
};

export default ItemList;
