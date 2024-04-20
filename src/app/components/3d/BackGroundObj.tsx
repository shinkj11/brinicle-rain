import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import glsl from "glslify";
import {
  fragmentShader,
  fragmentShader2,
  fragmentShader3,
  vertexShader,
} from "../glsl/customShaders";
import { Ref, RefObject, Suspense, useEffect, useRef } from "react";

const WaveShaderMaterial = shaderMaterial(
  {
    iResolution: new THREE.Vector3(0, 0, 0),
    iTime: 0,
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    hue1: 6.0,
    hue2: 3.5,
  },
  vertexShader,
  fragmentShader3
);
extend({ WaveShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveShaderMaterial: typeof WaveShaderMaterial & {
      ref: RefObject<THREE.ShaderMaterial & { [key: string]: any }> | undefined;
    };
  }
}

const Wave = () => {
  const ref = useRef<THREE.ShaderMaterial & { [key: string]: any }>(null);
  const three = useThree();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
      ref.current.iTime = clock.getElapsedTime();
      ref.current.iResolution = new THREE.Vector3(
        three.size.width,
        three.size.height,
        1
      );
    }
  });

  useEffect(() => {
    console.log(ref.current.iResolution);
  }, [ref]);

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[40, 30]} />
      <waveShaderMaterial ref={ref} />
    </mesh>
  );
};

const BackGroundObj: React.FC = () => {
  return (
    <>
      {/* <pointLight position={[10, 10, -50]} /> */}
      <Suspense fallback={null}>
        <Wave />
      </Suspense>
    </>
  );
};

export default BackGroundObj;
