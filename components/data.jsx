import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "../hook/item";

const Data = ({ data, price, currentUser, like }) => {
  let [liked, setLiked] = useState(true);

  const toggleFavorite = () => {
    AuthService.enroll(data.item._id)
      .then(() => {
        setLiked(!liked);
        console.log(liked);
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
    <div className="bg-[#f5f5f5] py-5 px-5 min-h-[280px] min-w-[200px] flex justify-evenly items-center flex-col">
      <Link href={`goods/${data.item.category}/${data.item._id}`}>
        <Image
          src={data.item.galleryWrap[0]}
          alt=""
          width={200}
          height={300}
          unoptimized={true}
        />
      </Link>
      <h3 className="mt-1 p-2 text-[14px] max-w-[200px] truncate">
        {data.item.title}
      </h3>
      <p className="text-[16px] font-bold">{price}</p>
      {currentUser && currentUser.user.role == "user" && (
        <>
          {liked == false && (
            <a id={data.item._id} onClick={toggleFavorite}>
              <GoHeart
                style={{
                  width: "2em",
                  height: "2em",
                  color: "black",
                  display: "block",
                }}
              />
            </a>
          )}
          {liked == true && (
            <a id={data.item._id} onClick={toggleUnlike}>
              <GoHeartFill
                style={{
                  width: "2em",
                  height: "2em",
                  color: "black",
                  display: "block",
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
  );
};

export default Data;
