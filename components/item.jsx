import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import AuthService from "../hook/item";

const OneItem = ({ data, price, like }) => {
  let [liked, setLiked] = useState(false);
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

  useEffect(() => {
    AuthService.getLikedItem(like)
      .then((i) => {
        setLiked(i.data);
        // console.log(i.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }, []);

  return (
    <div>
      <div className="border border-white">
        <a target="_blank" href={`goods/${data.category}/${data._id}`}>
          <Image
            src={data.galleryWrap[0]}
            alt=""
            width={240}
            height={360}
            unoptimized={true}
          />
        </a>
      </div>
      <div className="bg-white pb-5 border border-white">
        <h3 className="mt-1 p-2 text-[14px] max-w-[240px] truncate">
          {data.title}
        </h3>
        <div className="flex justify-between pl-2 pr-4">
          <p className=" text-[16px] font-bold">{price}</p>

          {liked == false && (
            <a id={data._id} onClick={toggleFavorite}>
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
            <a id={data._id} onClick={toggleUnlike}>
              <GoHeartFill
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  color: "black",
                }}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneItem;
