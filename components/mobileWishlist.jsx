"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { DataList } from "@/components/";

const MobileWishlistPage = ({ currentUser, wishlistData }) => {
  const router = useRouter();
  const handleTakeToLogin = (e) => {
    e.preventDefault();
    router.push("/user/login");
  }; 

  return (
    <div className="flex w-full justify-center">
      <div className="col-md-12 flex flex-col justify-center">
        <div
          className={`${
            currentUser ? "pt-0" : "lg:pt-24 pt-12"
          } flex flex-col gap-4 grow`}
        >
          {!currentUser && (
            <div
              className="overflow-auto grow"
              style={{ maxHeight: `calc(100vh - 32px)` }}
            >
              <div className="flex w-full justify-center mb-2">
                <img
                  src="https://media.discordapp.net/attachments/1169686419778838622/1202659319452016742/208ca7149511131.5e46400fbbfde.jpg?ex=65ce42c6&is=65bbcdc6&hm=ac9af0f34b57fb9f6a018b5aeabb6bd7e0fc0814421d69341c868ccd492ba3dc&=&format=webp"
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
              <p className="mb-6 flex w-full justify-center">
                Log in to build your wishlist!
              </p>
              <div className="flex w-full justify-center">
                <button
                  className="font-semibold text-[16px] mt-2 px-8 py-2 rounded-full border-[#24282e] border-2 "
                  onClick={handleTakeToLogin}
                >
                  Login / Join
                </button>
              </div>
            </div>
          )}
          {currentUser && currentUser.user.role == "admin" && (
            <div>
              <h1>歡迎來到Admin頁面。</h1>
            </div>
          )}
          {currentUser && wishlistData == "" && (
            <div className="overflow-auto grow mt-14">
              <div className="flex w-full justify-center mb-2">
                <img
                  src="https://media.discordapp.net/attachments/1169686419778838622/1202659319452016742/208ca7149511131.5e46400fbbfde.jpg?ex=65ce42c6&is=65bbcdc6&hm=ac9af0f34b57fb9f6a018b5aeabb6bd7e0fc0814421d69341c868ccd492ba3dc&=&format=webp"
                  alt=""
                  width="100"
                  height="100"
                />
              </div>
              <p className="mb-6 flex w-full justify-center">It's empty here!</p>
            </div>
          )}

          {currentUser && wishlistData && wishlistData.length != 0 && (
            <div
              className="overflow-auto grow py-8 px-6"
              style={{ maxHeight: `calc(100vh - 32px)` }}
            >
              <h1 className="text-xl font-semibold mb-4">
                My Wish List{" "}
                <span className="border border-gray-500 px-2 rounded-full">
                  {wishlistData.length}
                </span>
              </h1>
              <DataList data={wishlistData} currentUser={currentUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileWishlistPage;
