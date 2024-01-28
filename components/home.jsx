"use client";
import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import Preview from "./preview";
import styles from "./layout.module.css";

const page = () => {
  const [homepage, setHomepage] = useState(false);
  const [width, setWidth] = useState("100vw");
  const [timer, setTimer] = useState("");
  const [data, setDate] = useState(null);

  useEffect(() => {
    fetch(
      "https://1zaqtzgggf.execute-api.ap-southeast-2.amazonaws.com/latest/intro/all",
      { method: "get" }, //CORS
      { cache: "no-store" }
    )
      .then(async function (req) {
        let data = await req.json();
        return setDate(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClick = () => {
    setHomepage(true);
    setWidth("50vw");
  };

  function beginning() {
    return (
      <>
        <p id={styles.time}>
          HKT
          <br />
          {timer}
        </p>
        <span>
          <Typewriter
            options={{
              strings: [
                "Hello World",
                "Its all about art in the 21st Century...",
              ],
              autoStart: true,
              loop: true,
              cursor: "_",
            }}
          />
        </span>
        <button id={styles.entry} onClick={handleClick}>
          ExPlOrE⇩
        </button>
      </>
    );
  }

  let [preview, setPreview] = useState(beginning());

  function myTimer() {
    const date = new Date();
    setTimer(date.toLocaleTimeString());
  }
  setInterval(myTimer, 100);

  function abc() {
    return {
      display: "grid",
      columnGap: "50px",
      gridTemplateColumns: " repeat(5,1fr)",
      height: "40px",
      paddingLeft: "10px",
      paddingRight: "10px",
      alignItems: "baseline",
      color: "azure",
      justifyContent: "center",
    };
  }
  let [style, setStyle] = useState(abc());

  return (
    <>
      <div id={styles.home}>
        <div id={styles.columns}>
          <div
            id={styles.centeredtext}
            style={{ width: width, transition: "width 1s", ...style }}
          >
            {preview}
          </div>
          {/* (if this part is true) && (this part will execute) */}
          {homepage && (
            <div
              id={styles.text}
              style={{ width: "50vw" }}
              onMouseEnter={() => {
                setStyle({
                  padding: "10px",
                });
                setPreview(
                  <div id={styles.words}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi neque magnam veniam error dignissimos molestiae
                    quia, asperiores ipsum blanditiis assumenda ex culpa?
                    Corporis cum in vitae accusantium aliquid, error reiciendis?
                  </div>
                );
              }}
              onMouseLeave={() => {
                setStyle(abc());
                setPreview(beginning());
              }}
            >
              {data &&
                data.map((d, index) => {
                  return (
                    <div key={index}>
                      <Preview data={d} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
