"use client";
import React from "react";
import useAxios from "../hook/useAxios";

const Currency = ({ onDataSelected }) => {
  const [data, loaded, error] = useAxios(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );

  const usd = data?.rates?.USD; //操作符 ?. 来进行安全访问，以确保当 data 或 data.rates 为 null 或 undefined 时不会引发错误
  const hkd = data?.rates?.HKD;
  const jpy = data?.rates?.JPY;

  const handleSelectChange = (e) => {
    const selectedValue = e.target;
    onDataSelected(selectedValue);
  };

  return (
    <div className="pr-4">
      <select onChange={handleSelectChange} className="bg-[#24282e] text-white">
        <option value={hkd} id="HKD" className="zh-HK">
          HKD
        </option>
        <option value={jpy} id="JPY" className="ja-JP">
          JPY
        </option>
        <option value={usd} id="USD" className="en-us">
          USD
        </option>
      </select>
    </div>
  );
};

export default Currency;
