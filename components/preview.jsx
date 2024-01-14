import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";

const Preview = ({ data }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageComponents = [];

    if (data.coverimage) {
      imageComponents.push(
        <Image src={data.coverimage} alt="" width={960} height={540} key={1} />
      );
    }

    if (data.hostimage1) {
      imageComponents.push(
        <Image
          src={data.hostimage1}
          alt=""
          width={400}
          height={600}
          unoptimized={true}
          key={2}
        />
      );
    }

    if (data.hostimage2) {
      imageComponents.push(
        <Image
          src={data.hostimage2}
          alt=""
          width={400}
          height={600}
          unoptimized={true}
          key={3}
        />
      );
    }

    if (data.hostimage3) {
      imageComponents.push(
        <Image
          src={data.hostimage3}
          alt=""
          width={960}
          height={540}
          unoptimized={true}
          key={4}
        />
      );
    }

    setImages(imageComponents);
  }, []);

  return (
    <div className={styles.preview}>
      <p className={styles.category}>{data.category}</p>
      <a style={{ display: "flex" }} onMouseEnter={() => console.log("on")}>
        {images}
      </a>

      <h1 className={styles.title}>{data.title}</h1>

      <p className={styles.description}>{data.description}</p>
    </div>
  );
};

export default Preview;
