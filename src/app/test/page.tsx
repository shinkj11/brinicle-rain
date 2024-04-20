"use client";

import styled from "styled-components";
import { Bebas_Neue } from "next/font/google";
import { Noto_Serif_Display } from "next/font/google";
import CanvasWrapper from "../components/3d/CanvasWrapper";
import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useControls } from "leva";
import { useEffect } from "react";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const notoSerif = Noto_Serif_Display({ weight: "400", subsets: ["latin"] });

const TextObj = () => {
  const model = useGLTF("/movingCube.glb");
  const animations = useAnimations(model.animations, model.scene);
  const { actionName } = useControls({
    actionName: {
      value: animations.names[1],
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[actionName];
    action?.play();
  }, [actionName]);

  return <primitive object={model.scene} />;
};

export default function Home() {
  // const model = useLoader(GLTFLoader, "/movingCube.glb");

  return (
    <Main>
      <CanvasWrapper>
        <OrbitControls />
        <Environment preset="sunset" />
        <TextObj />
      </CanvasWrapper>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 10vw;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;

  @keyframes opacInFall {
    from {
      top: -100px;
      opacity: 0;
    }

    to {
      top: 0;
      opacity: 1;
    }
  }

  @keyframes opacSlideIn {
    from {
      left: -100px;
      opacity: 0;
    }

    to {
      left: 0;
      opacity: 1;
    }
  }
`;

const Title = styled.div<{ show: boolean }>`
  position: relative;
  font-size: 20vw;
  line-height: 0.8;
  left: ${({ show }) => (show ? "0" : "-100px")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
  /* animation-name: opacSlideIn;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out; */
`;

const Title2 = styled.div<{ show: boolean }>`
  position: relative;
  font-size: 10vw;
  line-height: 1;
  top: ${({ show }) => (show ? "0" : "-100px")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
`;
