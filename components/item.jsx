"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "@/hook/item";
import { UserContext } from "@/context/userContext";

const OneItem = ({ data, price, currentUser }) => {
  const { wishlistData, setWishlistData } = useContext(UserContext);
  let [liked, setLiked] = useState(false);
  useEffect(() => {
    if (currentUser) {
      const index = wishlistData.findIndex((i) => i._id === data._id);
      setLiked(index !== -1); //确保不要在父组件的渲染方法中创建新的对象或数组
      // console.log("set");
    }
  }, [currentUser, wishlistData]);

  const toggleFavorite = () => {
    setLiked(true);
    const timerId = setTimeout(async () => {
      AuthService.enroll(data._id)
        .then(() => {
          clearTimeout(timerId);
          setWishlistData((prevWishlistData) => prevWishlistData.concat(data));
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }, 1000);
  };

  const toggleUnlike = () => {
    setLiked(false);
    const timerId = setTimeout(async () => {
      AuthService.unlike(data._id)
        .then(() => {
          clearTimeout(timerId);
          setWishlistData((prevWishlistData) =>
            prevWishlistData.filter((item) => item._id !== data._id)
          );
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    }, 1000);
  };

  const remindLogin = () => {
    alert("Please login first.");
  };

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="shadow-md shadow-[#d5e8ff] rounded-md max-w-[400px]">
      <Image
        src={isHovered ? data.galleryWrap[1] : data.galleryWrap[0]}
        alt=""
        width={400}
        height={600}
        unoptimized={true}
        onClick={() => {
          router.push(`goods/${data.category}/${data._id}`, { scroll: false });
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="border border-white rounded-t-md cursor-pointer"
      />

      <div className="backdrop-blur-md bg-white/80 hover:bg-white transition duration-300 ease-in-out pb-2 border border-white rounded-b-md">
        <h3 className="mt-1 px-2 text-[14px] max-w-[400px] truncate">
          {data.title}
        </h3>
        <div className="flex justify-between pl-2 pr-4">
          <p className=" text-[16px] font-bold">{price}</p>
          {!currentUser && (
            <GoHeart
              id={data._id}
              onClick={remindLogin}
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "black",
                cursor: "pointer",
              }}
            />
          )}
          {currentUser && liked == false && (
            <GoHeart
              id={data._id}
              onClick={toggleFavorite}
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "black",
                cursor: "pointer",
              }}
            />
          )}
          {currentUser && liked == true && (
            <GoHeartFill
              id={data._id}
              onClick={toggleUnlike}
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "black",
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OneItem;
