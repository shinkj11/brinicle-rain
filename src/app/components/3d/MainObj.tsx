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
    speed: 0.1,
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

interface MainObjProps {
  isRenderer?: boolean;
}

const MainObj: React.FC<MainObjProps> = ({ isRenderer = false }) => {
  const sphereObj = useLoader(GLTFLoader, "/sphereM.glb");
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
      loadedTorus1!.rotation.x = MathUtils.degToRad(time * 2 * 100);
      loadedTorus2!.rotation.z = MathUtils.degToRad(time * 2 * 70);
      loadedTorus2!.rotation.x = MathUtils.degToRad(time * 2 * 10);
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
        three.size.width * 0.0005,
        three.size.width * 0.0005,
        three.size.width * 0.0005
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
      : new THREE.Vector3(1, -0.5, 0);

  return (
    <>
      <Environment
        // files={"/kloppenheim_02_puresky_4k.exr"}
        preset="night"
        blur={0.5}
        backgroundIntensity={0.1}
        backgroundBlurriness={0.1}
        environmentIntensity={0.5}
      >
        {isRenderer ? (
          <>
            <Lightformer
              color={"#dadada"}
              intensity={1}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[100, 100, 100]}
              form={"circle"}
            />
            <Lightformer
              color={"#740038"}
              intensity={0.5}
              rotation-x={Math.PI / 2}
              rotation-z={Math.PI / 2}
              position={[30, -5, -30]}
              scale={[100, 100, 100]}
              form={"circle"}
            />
          </>
        ) : (
          <>
            <Lightformer
              color={"#dadada"}
              intensity={1}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 10]}
              form={"circle"}
            />
            <Lightformer
              color={"#740038"}
              intensity={0.5}
              rotation-x={Math.PI / 2}
              rotation-z={Math.PI / 2}
              position={[30, -5, -30]}
              scale={[10, 10, 10]}
              form={"circle"}
            />
          </>
        )}
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
        {/* <primitive name={"sphereObj"} object={sphereObj.scene} scale={0.003} /> */}
        <primitive name={"nullObj"} object={nullObj.scene} scale={0.003} />
        <primitive name={"torus1"} object={torus1Obj.scene} scale={0.003} />
        <primitive name={"torus2"} object={torus2Obj.scene} scale={0.003} />
      </group>
      <hemisphereLight args={["#00f", "#f00", 10]} scale={[10, 10, 10]} />
      <spotLight
        color={"#071de8"}
        intensity={30}
        power={100}
        position={[0, 10, 0]}
        distance={0}
        angle={Math.PI / 2.1}
        scale={[1, 1, 1]}
      />
      <directionalLight
        ref={dLight1}
        color={"#071de8"}
        position={[0, -10, 0]}
        intensity={30}
        // target={objRef}
        visible={false}
        scale={[100, 100, 100]}
      />
      <directionalLight
        ref={dLight2}
        color={"#8532a8"}
        position={[-5, 10, 0]}
        intensity={0.5}
        scale={[300, 300, 300]}
        visible={false}
      />
      <directionalLight
        color={"#fff"}
        position={[-5, -10, -5]}
        intensity={0.5}
        scale={[300, 300, 300]}
        visible={false}
      />
    </>
  );
};

export default MainObj;
