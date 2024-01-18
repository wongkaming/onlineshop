import React from "react";

const Light = ({ lightSelected }) => {
  const handleSelectLight = (e) => {
    const selectedValue = e.target;
    lightSelected(selectedValue);
  };

  return (
    <div className="fixed top-14 left-0 z-20">
      <label htmlFor="hdr">Light:</label>

      <select id="hdr" onChange={handleSelectLight}>
        <option value="sunshine">sunshine</option>
        <option value="sunrise">sunrise</option>
        <option value="night">night</option>
      </select>
    </div>
  );
};

export default Light;
