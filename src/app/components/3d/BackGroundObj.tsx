import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { Object3DNode, extend, useFrame, useThree } from "@react-three/fiber";
import glsl from "glslify";
import {
  fragmentShader,
  fragmentShader2,
  fragmentShader3,
  vertexShader,
} from "../glsl/customShaders";
import { Ref, RefObject, Suspense, useEffect, useRef } from "react";

const hue1 = 6.0;
const hue2 = 3.5;
const speed = 0.1;

const WaveShaderMaterial = shaderMaterial(
  {
    iResolution: new THREE.Vector3(0, 0, 0),
    iTime: 0,
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    hue1: hue1,
    hue2: hue2,
    speed: speed,
  },
  vertexShader,
  fragmentShader3
);
extend({ WaveShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveShaderMaterial: Object3DNode<
      typeof WaveShaderMaterial,
      typeof WaveShaderMaterial
    >;
  }
}

interface WaveProps {
  isPageChanging?: boolean;
  isPageChangingComplete?: boolean;
}

const Wave: React.FC<WaveProps> = ({
  isPageChanging = false,
  isPageChangingComplete = false,
}) => {
  const ref = useRef<any>(null);
  const three = useThree();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.iTime = clock.getElapsedTime();
      // ref.current.iTime = 2;
      ref.current.iResolution = new THREE.Vector3(
        three.size.width,
        three.size.height,
        1
      );
      if (isPageChanging) {
        if (ref.current.hue1 < 7) ref.current.hue1 += 0.005;
        if (ref.current.hue2 > 2) ref.current.hue2 -= 0.005;
        // if (ref.current.speed < 0.5) ref.current.speed += 0.0005;
      } else {
        if (ref.current.hue1 > hue1) ref.current.hue1 -= 0.005;
        if (ref.current.hue2 < hue2) ref.current.hue2 += 0.005;
        // if (ref.current.speed > speed) ref.current.speed -= 0.0005;
      }
    }
  });

  // useEffect(() => {
  //   if (ref) {
  //     setInterval(() => {
  //       console.log("speed:", ref.current.speed);
  //       console.log("hue1:", ref.current.hue1);
  //       console.log("hue2:", ref.current.hue2);
  //     }, 500);
  //   }
  // }, [ref]);

  useEffect(() => {
    console.log("isPageChanging :", isPageChanging);
  }, [isPageChanging]);

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[40, 30]} />
      <waveShaderMaterial ref={ref} />
    </mesh>
  );
};

interface BackGroundObjProps {
  isPageChanging?: boolean;
  isPageChangingComplete?: boolean;
}

const BackGroundObj: React.FC<BackGroundObjProps> = ({
  isPageChanging = false,
  isPageChangingComplete = false,
}) => {
  return (
    <>
      {/* <pointLight position={[10, 10, -50]} /> */}
      <Wave isPageChanging={isPageChanging} />
    </>
  );
};

export default BackGroundObj;
