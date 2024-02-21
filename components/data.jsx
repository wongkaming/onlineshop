"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "../hook/item";
import { UserContext } from "@/context/userContext";

const Data = ({ data, price, currentUser }) => {
  const { wishlistData, setWishlistData } = useContext(UserContext);
  let [liked, setLiked] = useState(true);

  const toggleFavorite = () => {
    AuthService.enroll(data._id)
      .then(() => {
        setLiked(true);
        setWishlistData(wishlistData.concat(data));
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const toggleUnlike = () => {
    const newArray = wishlistData.filter((i) => i._id !== data._id);
    AuthService.unlike(data._id)
      .then(() => {
        // setLiked(false);
        setWishlistData(newArray);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="shadow-md rounded-md max-w-[400px]">
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
      <div className="backdrop-blur-md bg-white/80 hover:bg-white transition duration-300 ease-in-out pb-5 border border-white rounded-b-md">
        <h3 className="mt-1 p-2 text-[14px] max-w-[400px] truncate">
          {data.title}
        </h3>
        <div className="flex justify-between pl-2 pr-4">
          <p className="text-[16px] font-bold">{price}</p>
          {currentUser && currentUser.user.role == "user" && (
            <>
              {liked == false && (
                <a id={data._id} onClick={toggleFavorite}>
                  <GoHeart
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}
              {liked == true && (
                <a id={data._id} onClick={toggleUnlike}>
                  <GoHeartFill
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      color: "black",
                      cursor: "pointer",
                    }}
                  />
                </a>
              )}
            </>
          )}
          {currentUser && currentUser.user.role == "admin" && (
            <p
              className="text-[16px] text-center"
              style={{ margin: "0.5rem 0rem" }}
            >
              {data.user.length}人已收藏
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;
