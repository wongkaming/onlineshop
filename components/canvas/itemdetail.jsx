"use client";
import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  useContext,
  lazy,
} from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Html, Environment, Preload } from "@react-three/drei";
import { CiCircleInfo } from "react-icons/ci";
import { motion } from "framer-motion-3d";
import { useMotionValue, useSpring } from "framer-motion";
import CanvasLoader from "../canvasloader";
import LightProvider, { LightContext } from "@/context/lightContext";
import Hdr from "./hdr.json";

function Item3d({ url, show }) {
  const gtlf = useLoader(GLTFLoader, url);
  const annotations = [];
  gtlf.scene.children.map((o) => {
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

  // const ref = useRef();
  // const options = {
  //   damping: 50,
  // };
  // const mouse = {
  //   x: useSpring(useMotionValue(0), options), //useSpring =>smooth movement
  // };
  // const manageMouseMove = (e) => {
  //   const { innerWidth } = window;
  //   const { clientX } = e;
  //   const x = -0.5 + clientX / innerWidth; //speed
  //   mouse.x.set(x);
  // };
  // useEffect(() => {
  //   window.addEventListener("mousemove", manageMouseMove);
  //   return () => window.removeEventListener("mouse", manageMouseMove);
  // }, []);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="white" />
      {/* <motion.mesh ref={ref} rotation-y={mouse.x}> */}
      <primitive object={gtlf.scene} position={[0, 0, 0]}>
        {show && annotations}
      </primitive>
      {/* </motion.mesh> */}
    </mesh>
  );
}

const itemdetail = ({ url }) => {
  let [detail, setDetail] = useState(false);
  const showDetail = () => {
    setDetail(!detail);
  };
  const { value2 } = useContext(LightContext);

  return (
    <div className="h-[40em]">
      <span id="info">{value2} is selected.</span>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [2.5, 0, -0.2], fov: 25 }}
        gl={{ preserveDrawingBuffer: false }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* <directionalLight position={[5, 10, 20]} intensity={1} />
          <ambientLight intensity={0.2} /> */}
          {/* <Item3d url={`/assets/${url}.glb`} show={detail} /> */}
          <Item3d url={url} show={detail} />
          <Environment files={Hdr[value2].asset} blur={0.05} />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Suspense>
        {/* <Preload all /> */}
      </Canvas>
      <button onClick={showDetail} show={detail}>
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

export default itemdetail;
