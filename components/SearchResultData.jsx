"use client";
import React, { useContext } from "react";
import { CurrencyContext } from "@/context/currencyContext";
import { UserContext } from "@/context/userContext";
import { OneItem } from "@/components/";

const SearchResultData = ({ data }) => {
  const { rates, rates2, change, currency, unit } = useContext(CurrencyContext);
  const { currentUser } = useContext(UserContext);

  let curr;

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12 md:grid-cols-5 xl:grid-cols-6">
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
      {/* {!data && <p>nothing</p>} */}
    </div>
  );
};

export default SearchResultData;
