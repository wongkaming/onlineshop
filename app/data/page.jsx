"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { Wishlist } from "@/components/";

const page = () => {
  const { currentUser } = useContext(UserContext);

  return <Wishlist currentUser={currentUser} />;
};

export default page;
