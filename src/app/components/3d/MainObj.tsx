import * as THREE from "three";
import {
  Environment,
  Lightformer,
  shaderMaterial,
  useHelper,
} from "@react-three/drei";
import {
  Object3DNode,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { DirectionalLight, MathUtils } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  fragmentShader3,
  fragmentShader4,
  vertexShader,
} from "../glsl/customShaders";

const SphereShaderMaterial = shaderMaterial(
  {
    iResolution: new THREE.Vector3(0, 0, 0),
    iTime: 0,
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    hue1: 6.2,
    hue2: 2.0,
  },
  vertexShader,
  fragmentShader3
);
extend({ SphereShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    sphereShaderMaterial: Object3DNode<
      typeof SphereShaderMaterial,
      typeof SphereShaderMaterial
    >;
  }
}

const MainObj: React.FC = () => {
  const nullObj = useLoader(GLTFLoader, "/NullM.glb");
  const torus1Obj = useLoader(GLTFLoader, "/TorusM.glb");
  const torus2Obj = useLoader(GLTFLoader, "/Torus1M.glb");
  const dLight1 = useRef<DirectionalLight>(null);
  const dLight2 = useRef<DirectionalLight>(null);
  const sphereRef = useRef<any>(null);
  const three = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const loadedNull = state.scene.getObjectByName("nullObj");
    const loadedTorus1 = state.scene.getObjectByName("torus1");
    const loadedTorus2 = state.scene.getObjectByName("torus2");
    const loadedSphere = state.scene.getObjectByName("sphereObj");
    if (loadedNull) {
      loadedNull.rotation.y = MathUtils.degToRad(time * 50);
      loadedTorus1!.rotation.x = MathUtils.degToRad(time * 100);
      loadedTorus2!.rotation.z = MathUtils.degToRad(time * 70);
      loadedTorus2!.rotation.x = MathUtils.degToRad(time * 10);
      dLight1.current!.target = loadedTorus1!;
      loadedSphere!.position.y =
        Math.sin(state.clock.getElapsedTime()) * 0.1 - 0.05;
    }
    if (sphereRef.current) {
      sphereRef.current.uTime = state.clock.getElapsedTime();
      sphereRef.current.iTime = state.clock.getElapsedTime();
      sphereRef.current.iResolution = new THREE.Vector3(
        three.size.width * 1,
        three.size.height * 1,
        1
      );
    }
  });

  const getObjSize = () => {
    if (three.size.width < 600) {
      return new THREE.Vector3(0.7, 0.7, 0.7);
    } else if (three.size.width > 1080) {
      return new THREE.Vector3(
        three.size.width * 0.0007,
        three.size.width * 0.0007,
        three.size.width * 0.0007
      );
    } else {
      return new THREE.Vector3(
        three.size.width * 0.001,
        three.size.width * 0.001,
        three.size.width * 0.001
      );
    }
  };

  const getObjPosition = () =>
    three.size.width < 600
      ? new THREE.Vector3(0.2, 0.3, 0)
      : new THREE.Vector3(1, -1, 0);

  return (
    <>
      <Environment
        preset="night"
        backgroundIntensity={0.1}
        backgroundBlurriness={0.1}
        environmentIntensity={0.5}
        background={false}
      >
        <Lightformer
          intensity={4}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          intensity={4}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
      </Environment>
      <group
        name={"objGroup"}
        rotation={[0, 0, 0]}
        position={getObjPosition()}
        scale={getObjSize()}
      >
        <mesh name={"sphereObj"} position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.5]} />
          <sphereShaderMaterial ref={sphereRef} />
        </mesh>
        <primitive name={"nullObj"} object={nullObj.scene} scale={0.003} />
        <primitive name={"torus1"} object={torus1Obj.scene} scale={0.003} />
        <primitive name={"torus2"} object={torus2Obj.scene} scale={0.003} />
      </group>
      <spotLight
        color={"#fff"}
        intensity={10}
        power={100}
        position={[0, 0.7, 0]}
        distance={1}
        angle={Math.PI / 2.1}
        // scale={[300, 300, 300]}
      />
      <directionalLight
        ref={dLight1}
        color={"#071de8"}
        position={[5, 0, 0]}
        intensity={0.5}
        // target={objRef}
      />
      <directionalLight
        ref={dLight2}
        color={"#8532a8"}
        position={[-5, 10, 0]}
        intensity={0.5}
      />
      <directionalLight
        color={"#fff"}
        position={[-5, -10, -5]}
        intensity={0.5}
      />
    </>
  );
};

export default MainObj;
