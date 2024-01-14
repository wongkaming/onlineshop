"use client";
import React from "react";
import transition from "../transition";

const page = () => {
  return (
    <div class="sketchfab-embed-wrapper">
      <iframe
        title="Sequin V-neck Zipper Mini Dress"
        frameborder="0"
        allowfullscreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        width="640"
        height="480"
        src="https://sketchfab.com/models/59b6f555f0804c03b899e1ce5c7b1aef/embed?autostart=1&camera=0&transparent=1"
      ></iframe>
    </div>
  );
};

export default transition(page);
