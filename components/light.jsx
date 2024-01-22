import React from "react";

const Light = ({ lightSelected }) => {
  const handleSelectLight = (e) => {
    const selectedValue = e.target;
    lightSelected(selectedValue);
  };

  return (
    <div className="text-white">
      <label htmlFor="hdr">Light:</label>
      <select
        id="hdr"
        onChange={handleSelectLight}
        className="bg-[#24282e] text-white"
      >
        <option value="sunshine">☀︎</option>
        <option value="sunrise">🌤</option>
        <option value="night">☪</option>
      </select>
    </div>
  );
};

export default Light;
