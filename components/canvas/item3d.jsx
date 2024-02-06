"use client";
import React, { Suspense, useState, useContext, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Html, Environment, Preload } from "@react-three/drei";
import { CiCircleInfo } from "react-icons/ci";
import CanvasLoader from "../canvasloader";
import { LightContext } from "@/context/lightContext";
import Hdr from "./hdr.json";

const Model = ({ url, show }) => {
  const gltf = useMemo(() => useLoader(GLTFLoader, url), []);

  const annotations = [];
  gltf.scene.children.map((o) => {
    if (o.type == "Object3D") {
      annotations.push(
        <Html
          key={o.uuid}
          position={[o.position.x, o.position.y, o.position.z]}
          distanceFactor={0.25}
        >
          <div className="annotation">{o.userData.prop}</div>
        </Html>
      );
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="white" />
      <primitive object={gltf.scene} position={[0, 0, 0]}>
        {show && annotations}
      </primitive>
    </mesh>
  );
};

const Item3d = ({ url }) => {
  let [detail, setDetail] = useState(false);
  const showDetail = () => {
    setDetail(!detail);
  };
  const { value2 } = useContext(LightContext);

  return (
    <div className="flex-col hidden md:flex md:w-2/5 h-screen/3">
      <span id="info">{value2} is selected.</span>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [3, 0, -0.2], fov: 25 }}
        gl={{ preserveDrawingBuffer: false }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Model url={url} show={detail} />
          <Environment files={Hdr[value2].asset} blur={0.05} />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Suspense>
        <Preload all />
      </Canvas>
      <button onClick={showDetail}>
        <CiCircleInfo
          style={{
            width: "2em",
            height: "2em",
            color: "black",
            display: "inline-block",
          }}
        />
        Materials
      </button>
    </div>
  );
};

export default Item3d;
