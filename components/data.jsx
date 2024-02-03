"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "../hook/item";

const Data = ({ data, price, currentUser, like }) => {
  let [liked, setLiked] = useState(true);

  const toggleFavorite = () => {
    AuthService.enroll(data.item._id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const toggleUnlike = () => {
    AuthService.unlike(data.item._id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  return (
    <div className="shadow-md rounded-md max-w-[400px]">
      <a target="_blank" href={`goods/${data.item.category}/${data.item._id}`}>
        <Image
          src={data.item.galleryWrap[0]}
          alt=""
          width={400}
          height={600}
          unoptimized={true}
          className="border border-white rounded-t-md"
        />
      </a>
      <div className="backdrop-blur-md bg-white/80 hover:bg-white transition duration-300 ease-in-out pb-5 border border-white rounded-b-md">
        <h3 className="mt-1 p-2 text-[14px] max-w-[400px] truncate">
          {data.item.title}
        </h3>
        <div className="flex justify-between pl-2 pr-4">
          <p className="text-[16px] font-bold">{price}</p>
          {currentUser && currentUser.user.role == "user" && (
            <>
              {liked == false && (
                <a id={data.item._id} onClick={toggleFavorite}>
                  <GoHeart
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      color: "black",
                    }}
                  />
                </a>
              )}
              {liked == true && (
                <a id={data.item._id} onClick={toggleUnlike}>
                  <GoHeartFill
                    style={{
                      width: "1.5em",
                      height: "1.5em",
                      color: "black",
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
