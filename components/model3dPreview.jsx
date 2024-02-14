"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { LightContext } from "@/context/lightContext";
import { UserContext } from "@/context/userContext";
import { windowIcon } from "@/constants/index";

const Model3dPreview = ({ data }) => {
  const { value2 } = useContext(LightContext);
  const { zIndex, setZIndex, setZIndex2 } = useContext(UserContext);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 30, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setZIndex("z-20");
      setZIndex2("");
      const px = e.clientX || e.touches[0].clientX;
      const py = e.clientY || e.touches[0].clientY;

      setOffset({
        x: px - position.x,
        y: py - position.y,
      });
    },
    [position]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const x = e.clientX - offset.x;
        const y = e.clientY - offset.y;
        setPosition({ x, y });
      }
    },
    [isDragging, offset.x, offset.y]
  );
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  const [width, setWidth] = useState(false);

  return (
    <div
      className={`hidden lg:flex lg:justify-end ${
        width ? "lg:w-full" : "lg:w-2/5"
      } my-14 ${zIndex}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div
        className="flex flex-col h-[75dvh] w-full ml-10 bubble draggable"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <nav className="flex flex-row justify-between py-1 rounded-t-lg blackpurple">
          <p className="px-3 uppercase text-white">3D MODEL PREVIEW</p>
          <div className="flex flex-row items-center">
            <a
              className="text-white cursor-pointer mx-2"
              onClick={() => {
                setWidth(!width);
              }}
            >
              {windowIcon[0].icon}
            </a>
          </div>
        </nav>
        <iframe
          src={`https://3dcanvas.vercel.app/${data}/${value2}`}
          className="mt-8 flex w-full h-full items-center "
        ></iframe>
      </div>
    </div>
  );
};

export default Model3dPreview;
