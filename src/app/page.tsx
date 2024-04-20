"use client";

import styled from "styled-components";
import { Bebas_Neue } from "next/font/google";
import { Noto_Serif_Display } from "next/font/google";
import { useEffect, useState } from "react";
import CanvasWrapper from "./components/3d/CanvasWrapper";
import BoxTest from "./components/3d/BoxTest";
import MainObj from "./components/3d/MainObj";
import BackGroundObj from "./components/3d/BackGroundObj";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const notoSerif = Noto_Serif_Display({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [titleShow2, setTitleShow2] = useState<boolean>(false);
  const [titleShow, setTitleShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setTitleShow2(true);
    }, 500);
    setTimeout(() => {
      setTitleShow(true);
    }, 1200);
  }, []);
  return (
    <Main>
      <CanvasWrapper>
        <BackGroundObj />
        <MainObj />
      </CanvasWrapper>
      <TitleWrapper>
        <Title2 style={notoSerif.style} show={titleShow2}>
          WE ARE
        </Title2>
        <Title style={bebas.style} show={titleShow}>
          BRINICLE RAIN
        </Title>
      </TitleWrapper>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 10vw;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;
  margin-top: 3rem;

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
