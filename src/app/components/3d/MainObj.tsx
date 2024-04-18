import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Ref, useRef } from "react";
import styled from "styled-components";
import { DirectionalLight, DirectionalLightHelper, MathUtils } from "three";
import { GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";

const MainObj: React.FC = () => {
  const nullObj = useLoader(GLTFLoader, "/Null.gltf");
  const sphereObj = useLoader(GLTFLoader, "/Sphere.gltf");
  const torus1Obj = useLoader(GLTFLoader, "/Torus.gltf");
  const torus2Obj = useLoader(GLTFLoader, "/Torus2.gltf");
  const dLight1 = useRef<DirectionalLight>(null);
  const dLight2 = useRef<DirectionalLight>(null);

  // useHelper(dLight1, DirectionalLightHelper);
  // useHelper(dLight2, DirectionalLightHelper);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const loadedNull = state.scene.getObjectByName("nullObj");
    const loadedTorus1 = state.scene.getObjectByName("torus1");
    const loadedTorus2 = state.scene.getObjectByName("torus2");
    if (loadedNull) {
      loadedNull.rotation.y = MathUtils.degToRad(time * 50);
      loadedTorus1!.rotation.x = MathUtils.degToRad(time * 100);
      loadedTorus2!.rotation.z = MathUtils.degToRad(time * 70);
      loadedTorus2!.rotation.x = MathUtils.degToRad(time * 10);
      dLight1.current!.target = loadedTorus1!;
    }
  });
  return (
    <>
      <primitive name={"nullObj"} object={nullObj.scene} scale={0.003} />;
      <primitive object={sphereObj.scene} scale={0.003} />;
      <primitive name={"torus1"} object={torus1Obj.scene} scale={0.003} />;
      <primitive name={"torus2"} object={torus2Obj.scene} scale={0.003} />;
      <hemisphereLight args={["#00f", "#f00", 100]} />
      <directionalLight
        ref={dLight1}
        color={"#071de8"}
        position={[5, 0, 0]}
        intensity={10}
        // target={objRef}
      />
      <directionalLight
        ref={dLight2}
        color={"#8532a8"}
        position={[-5, 10, 0]}
        intensity={5}
      />
      <directionalLight color={"#fff"} position={[-5, -10, -5]} intensity={2} />
      <OrbitControls />
      {/* <Environment preset="sunset" background /> */}
    </>
  );
};

export default MainObj;
