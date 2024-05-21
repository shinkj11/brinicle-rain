"use client";

import styled from "styled-components";
import { Bebas_Neue, Noto_Serif_Display, Noto_Sans } from "next/font/google";
import {} from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import CanvasWrapper from "./components/3d/CanvasWrapper";
import BoxTest from "./components/3d/BoxTest";
import MainObj from "./components/3d/MainObj";
import BackGroundObj from "./components/3d/BackGroundObj";
import { OrbitControls } from "@react-three/drei";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const notoSerif = Noto_Serif_Display({ weight: "400", subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });

export default function Home() {
  const [titleShow2, setTitleShow2] = useState<boolean>(false);
  const [titleShow, setTitleShow] = useState<boolean>(false);
  const [isAboutClicked, setIsAboutClicked] = useState<boolean>(false);
  const [isPageChanging, setIsPageChanging] = useState<boolean>(false);

  const onAboutClick = () => {
    setIsAboutClicked(true);
    setIsPageChanging((org) => !org);
  };
  useEffect(() => {
    setTimeout(() => {
      setTitleShow2(true);
    }, 500);
    setTimeout(() => {
      setTitleShow(true);
    }, 1200);
  }, []);
  return (
    <Suspense fallback={null}>
      <Main>
        <CanvasWrapper>
          <BackGroundObj isPageChanging={isPageChanging} />
        </CanvasWrapper>
        <CanvasWrapper zIndex={100} timeoutSec={1200}>
          <MainObj />
          {/* <OrbitControls /> */}
        </CanvasWrapper>
        <TextWrapper>
          <TitleWrapper>
            <Title2 style={notoSerif.style} show={titleShow2}>
              WE ARE
            </Title2>
            <Title style={bebas.style} show={titleShow}>
              BRINICLE RAIN
            </Title>
          </TitleWrapper>
          <TitleWrapper gap={"10px"}>
            <MenuText
              onClick={onAboutClick}
              style={notoSans.style}
              show={titleShow2}
              isClicked={isAboutClicked}
            >
              ABOUT
            </MenuText>
            <MenuText
              onClick={onAboutClick}
              style={notoSans.style}
              show={titleShow2}
              isClicked={isAboutClicked}
            >
              DISCOGRAPHY
            </MenuText>
          </TitleWrapper>
        </TextWrapper>
      </Main>
    </Suspense>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 10vw; */
  min-height: 100vh;
`;

const TextWrapper = styled.div`
  padding: 5vh 0;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrapper = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;
  gap: ${({ gap = 0 }) => gap};
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
  font-size: 20vmin;
  line-height: 0.8;
  left: ${({ show }) => (show ? "0" : "-100px")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
`;

const Title2 = styled.div<{ show: boolean }>`
  position: relative;
  font-size: 10vmin;
  line-height: 1;
  top: ${({ show }) => (show ? "0" : "-100px")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
`;

const MenuText = styled.div<{ show: boolean; isClicked: boolean }>`
  position: relative;
  font-size: 6vmin;
  line-height: 1;
  top: ${({ show }) => (show ? "0" : "-100px")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
  letter-spacing: ${({ isClicked }) => (isClicked ? "50px" : "10px")};
  font-weight: ${({ isClicked }) => (isClicked ? "500" : "100")};
  z-index: 200;
  cursor: pointer;
`;
