import React from "react";

const Light = ({ lightSelected }) => {
  const handleSelectLight = (e) => {
    const selectedValue = e.target;
    lightSelected(selectedValue);
  };

  return (
    <div className="absolute top-20 z-20">
      <label htmlFor="hdr">Choose a light:</label>

      <select id="hdr" onChange={handleSelectLight}>
        <option value="sunshine">sunshine</option>
        <option value="studio">studio</option>
        <option value="sunrise">sunrise</option>
      </select>
    </div>
  );
};

export default Light;
