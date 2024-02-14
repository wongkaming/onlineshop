"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { LightContext } from "@/context/lightContext";
import { UserContext } from "@/context/userContext";

const Model3dPreview = ({ data }) => {
  const { value2 } = useContext(LightContext);
  const { zIndex, setZIndex, setZIndex2 } = useContext(UserContext);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    setIsDragging(true);
    setZIndex("z-20")
    setZIndex2("")
    const px = e.clientX || e.touches[0].clientX;
    const py = e.clientY || e.touches[0].clientY;

    setOffset({
      x: px - position.x,
      y: py - position.y,
    });
  }, [position]);
  
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

  return (
    <div
      className={`hidden md:flex md:justify-end md:w-2/5 my-14 ${zIndex}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div
        className="flex flex-col h-[75dvh] w-full mx-10 bubble draggable"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <nav className="flex flex-row justify-between py-1 rounded-t-lg blackpurple">
          <p className="px-3 uppercase text-white">3D MODEL PREVIEW</p>
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
