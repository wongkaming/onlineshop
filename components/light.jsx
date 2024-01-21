import React from "react";

const Light = ({ lightSelected }) => {
  const handleSelectLight = (e) => {
    const selectedValue = e.target;
    lightSelected(selectedValue);
  };

  return (
    <div className="fixed top-12 left-14 z-10">
      {/* <label htmlFor="hdr">Light:</label> */}
      <select
        id="hdr"
        onChange={handleSelectLight}
        className="bg-black/30 text-white"
      >
        <option value="sunshine">☀︎</option>
        <option value="sunrise">🌤</option>
        <option value="night">☪</option>
      </select>
    </div>
  );
};

export default Light;
