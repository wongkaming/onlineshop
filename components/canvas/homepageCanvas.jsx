"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useMemo,
  Suspense,
} from "react";
import * as THREE from "three";
import { Clock } from "three";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  OrbitControls,
  ScrollControls,
  useScroll,
  useGLTF,
  Sky,
  Environment,
  Sampler,
  Stats,
  Circle,
  ContactShadows,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Water } from "three-stdlib";
import LightProvider, { LightContext } from "@/context/lightContext";
import Hdr from "./hdr.json";

extend({ Water });
function River() {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/assets/waternormals.jpg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(50, 50), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: "#cfe2f3",
      waterColor: "#0b5394",
      distortionScale: 3,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta / 4)
  );
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, 0.05, 0]}
    />
  );
}

function Forest() {
  const ref = useRef();

  const gtlf = useLoader(GLTFLoader, "/assets/ground3.glb");
  const door = useLoader(GLTFLoader, "/assets/door.glb");

  useEffect(() => {
    let mixer = new THREE.AnimationMixer(door.scene);
    for (let i = 0; i < door.animations.length; i++) {
      door.scene.animations.push(door.animations[i]);
    }
    // console.log(ref.current.children[0]);
  }, []);

  return (
    <mesh ref={ref} receiveShadow>
      <primitive
        object={door.scene}
        position={[0, -0.6, 0]}
        onPointerDown={() => {
          console.log("clicked");
          // door.scene.animations.forEach((e) => {
          //   e.play();
          // });
        }}
      />
      <primitive object={gtlf.scene} position={[0, -0.5, 0]} />
    </mesh>
  );
}

function Polyhedron({ polyhedron, color, ...props }) {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 2); //0,1,2
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial wireframe />
    </mesh>
  );
}

function Light() {
  return (
    <>
      <pointLight position={[0.28, 5, 1.22]} intensity={10} color={"#AECDFD"} />
      <pointLight
        position={[-0.5, 4.5, 1.5]}
        intensity={10}
        color={"#E9CCFF"}
      />
      <directionalLight
        castShadow={true}
        position={[2, 1, 1]}
        intensity={1}
        color={"#FFFFFF"}
      />
    </>
  );
}

function Effect() {
  // const options1 = useMemo(() => {
  //   return {
  //     focusDistance: { value: 0, min: 0, max: 1.0, step: 0.01 },
  //     focalLength: { value: 0.04, min: 0, max: 1.0, step: 0.01 },
  //     bokehScale: { value: 2, min: 0, max: 10, step: 1 },
  //     height: { value: 400, min: 0, max: 1000, step: 10 },
  //   };
  // }, []);
  // const options2 = useMemo(() => {
  //   return {
  //     luminanceThreshold: { value: 1.0, min: 0, max: 1, step: 0.1 },
  //     luminanceSmoothing: { value: 0.8, min: 0, max: 1, step: 0.1 },
  //     height: { value: 300, min: 0, max: 1000, step: 10 },
  //   };
  // }, []);
  // const options3 = useMemo(() => {
  //   return {
  //     opacity: 0.1,
  //   };
  // }, []);

  // const A = useControls("DepthOfField", options1);
  // const B = useControls("Bloom", options2);
  // const C = useControls("Noise", options3);

  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0.2}
        focalLength={0.5}
        bokehScale={2}
        height={400}
      />
      <Bloom luminanceThreshold={1} luminanceSmoothing={0.8} height={300} />
      <Noise opacity={0.15} />
    </EffectComposer>
  );
}

function Rig() {
  const { camera } = useThree();
  const clock = new Clock();

  return useFrame(() => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.2) * 0.5 + 2.0; // X 轴方向移动
    camera.position.y = Math.cos(t * 0.2) * 0.2 + 1.5; // Y 轴方向移动
    camera.position.z = 10; // 固定 Z 轴位置
    camera.lookAt(0, 1.06, 0);
  });
}

export default function homepageCanvas() {
  const polyhedron = useMemo(
    () => [new THREE.BoxGeometry(), new THREE.DodecahedronGeometry(0.785398)],
    []
  );

  const { value2 } = useContext(LightContext);

  return (
    <div id="homecanvas">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [2.5, 1.8, 10], fov: 50 }}
        gl={{ preserveDrawingBuffer: false }}
      >
        <Environment
          files={Hdr[value2].asset}
          background
          ground={{
            height: 0,
            radius: 50,
            scale: 100,
          }}
        />
        <Rig />
        <Light />
        <Effect />
        {/* <ScrollControls pages={5}> */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.2}
          // autoRotate
        />
        <Forest />
        <River />
        <ContactShadows position={[0.33, -0.33, 0.33]} opacity={1.5} />
        <Polyhedron position={[-1, 1, 0]} polyhedron={polyhedron} />
        <Polyhedron position={[1, 1, 0]} polyhedron={polyhedron} />
        {/* </ScrollControls> */}
      </Canvas>
    </div>
  );
}
