"use client";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import WishlistItem from "@/hook/item";
import { DataList } from "@/components/";

const WishlistPage = ({ currentUser, setCurrentUser }) => {
  const handleTakeToLogin = () => {
    redirect("/login");
  };
  const [wishlistData, setWishlistData] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === "admin") {
        WishlistItem.get(_id)
          .then((data) => {
            setWishlistData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role === "user") {
        WishlistItem.getWishlist(_id)
          .then((data) => {
            setWishlistData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [currentUser]); //意思是根据 currentUser 的变化来触发 useEffect; 当 currentUser 发生变化时，useEffect 才会重新运行

  return (

    <section className="flex items-center md:px-24 max-h-screen">
      <div className="flex flex-col justify-center w-full h-full">
        {!currentUser && (
          <div>
            <p>您必須先登入才能看到課程。</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={handleTakeToLogin}
            >
              回到登入頁面
            </button>
          </div>
        )}
        {currentUser && currentUser.user.role == "admin" && (
          <div>
            <h1>歡迎來到Admin頁面。</h1>
          </div>
        )}

        {currentUser && wishlistData && wishlistData.length != 0 && (
          <div
            className="px-[5%] overflow-auto pt-8 grow lg:pb-12 pb-16"
            style={{ maxHeight: `calc(100vh - 32px)` }}
          >
            <DataList data={wishlistData} currentUser={currentUser} />
          </div>
        )}
      </div>
    </section>
  );
};


export default WishlistPage;
