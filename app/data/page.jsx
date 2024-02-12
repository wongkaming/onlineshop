"use client";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { WishlistPage } from "@/components/";

const page = () => {
  const { currentUser } = useContext(UserContext);

  return <WishlistPage currentUser={currentUser} />;
};

export default page;
