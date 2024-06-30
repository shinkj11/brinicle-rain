"use client";

import styled from "styled-components";
import { Noto_Serif_Display } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import CanvasWrapper from "./components/3d/CanvasWrapper";
import MainObj from "./components/3d/MainObj";
import { useRouterEffect } from "./hooks/useRouterEffect";
import Typo from "./components/Typo";
import { media } from "./lib/media";

const notoSerif = Noto_Serif_Display({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const { push, isPageChanging, show } = useRouterEffect();
  const [titleShow2, setTitleShow2] = useState<boolean>(false);
  const [titleShow, setTitleShow] = useState<boolean>(false);
  const [isAboutClicked, setIsAboutClicked] = useState<boolean>(false);

  const menuClickSideEffect = () => {
    setTitleShow(false);
    setTitleShow2(false);
  };

  const onAboutClick = () => {
    menuClickSideEffect();
    push("/about", 2000);
  };

  const onDiscographyClick = () => {
    menuClickSideEffect();
    push("/discography", 2000);
  };

  const onLiveScheduleClick = () => {
    menuClickSideEffect();
    push("/schedule", 2000);
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
        <CanvasWrapper
          zIndex={100}
          timeoutSec={1200}
          isPageChanging={isPageChanging}
        >
          <MainObj />
          {/* <OrbitControls /> */}
        </CanvasWrapper>
        <TextWrapper>
          <TitleWrapper>
            <Title2 style={notoSerif.style} show={titleShow2}>
              WE ARE
            </Title2>
            <Typo
              type={"title"}
              transDirection={"left"}
              show={titleShow}
              zIndex={10}
            >
              BRINICLE RAIN
            </Typo>
          </TitleWrapper>
          <TitleWrapper gap={"10px"}>
            <MenuText
              onClick={onAboutClick}
              type={"subTitle"}
              transDirection={"left"}
              show={titleShow2}
              isClicked={isAboutClicked}
              cursorPointer
            >
              ABOUT
            </MenuText>
            <MenuText
              onClick={onDiscographyClick}
              type={"subTitle"}
              show={titleShow2}
              isClicked={isAboutClicked}
              cursorPointer
            >
              DISCOGRAPHY
            </MenuText>
            <MenuText
              onClick={onLiveScheduleClick}
              type={"subTitle"}
              transDirection={"bottom"}
              show={titleShow2}
              isClicked={isAboutClicked}
              cursorPointer
            >
              LIVE SCHEDULES
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
  /* min-height: 100vh; */
`;

const TextWrapper = styled.div`
  padding: 5vh 0;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  ${media.small`
    height: 90svh;
  `}
`;

const TitleWrapper = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;
  gap: ${({ gap = 0 }) => gap};
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

const MenuText = styled(Typo)<{ isClicked: boolean }>`
  position: relative;
  letter-spacing: ${({ isClicked }) => (isClicked ? "50px" : "10px")};
  font-weight: ${({ isClicked }) => (isClicked ? "500" : "100")};
  font-size: 10vmin;
  z-index: 200;
`;
