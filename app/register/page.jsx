import React from "react";
import { Register } from "@/components/";
import transition from "../transition";

const page = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default transition(page);
