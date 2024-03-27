"use client";

import Image from "next/image";
import styles from "./page.module.css";
import styled from "styled-components";
import { Bebas_Neue } from "next/font/google";
import { Noto_Serif_Display } from "next/font/google";
import { useEffect, useState } from "react";

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
    <main className={styles.main}>
      <TitleWrapper>
        <Title2 style={notoSerif.style} show={titleShow2}>
          WE ARE
        </Title2>
        <Title style={bebas.style} show={titleShow}>
          BRINICLE RAIN
        </Title>
      </TitleWrapper>
    </main>
  );
}

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
  font-size: 200px;
  line-height: 1;
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
  font-size: 100px;
  line-height: 1;
  top: ${({ show }) => (show ? "0" : "-100px")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
`;
