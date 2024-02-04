"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { WishlistPage } from "@/components/";
import transition from "../transition";

const page = () => {
  const { currentUser } = useContext(UserContext);

  return <WishlistPage currentUser={currentUser} />;
};

export default transition(page);
