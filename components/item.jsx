"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "@/hook/item";

const OneItem = ({ data, price, like, currentUser }) => {
  let [liked, setLiked] = useState(false);
  useEffect(() => {
    setLiked(false);
    if (currentUser && currentUser.user && currentUser.user.role === "user") {
      AuthService.getLikedItem(like)
        .then((i) => {
          setLiked(i.data);
        })
        .catch((e) => {
          console.error(e.response ? e.response.data : e);
        });
    }
  }, [like, currentUser]);

  const toggleFavorite = () => {
    AuthService.enroll(data._id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const toggleUnlike = () => {
    AuthService.unlike(data._id)
      .then(() => {
        setLiked(!liked);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="shadow-md shadow-[#d5e8ff] rounded-md max-w-[400px]">
      <a target="_blank" href={`goods/${data.category}/${data._id}`}>
        <Image
          src={isHovered ? data.galleryWrap[1] : data.galleryWrap[0]}
          alt=""
          width={400}
          height={600}
          unoptimized={true}
          // onMouseEnter={() => setIsHovered(true)}
          // onMouseLeave={() => setIsHovered(false)}
          className="border border-white rounded-t-md"
        />
      </a>
      <div className="backdrop-blur-md bg-white/80 hover:bg-white transition duration-300 ease-in-out pb-2 border border-white rounded-b-md">
        <h3 className="mt-1 px-2 text-[14px] max-w-[400px] truncate">
          {data.title}
        </h3>
        <div className="flex justify-between pl-2 pr-4">
          <p className=" text-[16px] font-bold">{price}</p>
          {liked == false && (
            <GoHeart
              id={data._id}
              onClick={toggleFavorite}
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "black",
              }}
            />
          )}
          {liked == true && (
            <GoHeartFill
              id={data._id}
              onClick={toggleUnlike}
              style={{
                width: "1.5em",
                height: "1.5em",
                color: "black",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OneItem;
