import { Canvas, useLoader } from "@react-three/fiber";
import styled from "styled-components";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const BoxTest: React.FC = () => {
  const obj = useLoader(OBJLoader, "/Null.obj");
  return (
    <mesh rotation={[0, (45 * Math.PI) / 180, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={"#fff"} />
      <ambientLight args={[0xff0000]} intensity={0.8} />
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
    </mesh>
  );
};

export default BoxTest;
