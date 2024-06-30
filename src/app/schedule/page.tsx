"use client";

import Image from "next/image";
import styled from "styled-components";
import { media } from "../lib/media";
import Typo from "../components/Typo";
import { useCustomMedia } from "../hooks/useCustomMedia";
import { useRouterEffect } from "../hooks/useRouterEffect";
import poster1 from "../../../public/poster1.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const LiveSchedule = () => {
  const { isSmall } = useCustomMedia();
  const { show } = useRouterEffect();

  return (
    <MainWrapper>
      <Typo
        type={isSmall ? "header1Small" : "header1"}
        show={show}
        transDirection="right"
      >
        {isSmall
          ? `LIVESCHE
          DULES`
          : `LIVESCHEDULES`}
      </Typo>
      <StyledSection>
        <StyledImage
          src={poster1}
          alt="poster1"
          layout="responsive"
          priority={true}
          placeholder={"blur"}
          show={show}
        />
        <StyledTypoWrapper>
          <Typo type="header2" show={show}>
            {isSmall ? `GAMMA\nRELEASE SHOW` : `GAMMA RELEASE SHOW`}
          </Typo>
          <Typo type="body1" show={show} transDirection="right">
            {`
              8/3 SAT 6pm
            `}
          </Typo>
          <Typo type="body1" show={show} transDirection="right">
            {`
              Club FREEBIRD-reboot
            `}
          </Typo>
        </StyledTypoWrapper>
      </StyledSection>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  position: relative;
  width: 955px;
  height: calc(100svh - 100px);
  margin: 0 auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 60px;
  ${media.small`
    width: 90%;
    height: calc(100svh - 70px);
    gap: 20px;
    margin-top: 0px;
  `}
`;

const StyledSection = styled.section`
  display: flex;
  ${media.small`
    flex-direction: column;
    /* margin:0 10px; */
  `}
`;

const StyledTypoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImage = styled(Image)<{ show: boolean }>`
  width: 470px !important;
  cursor: pointer;
  /* height: 344px; */
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
  ${media.small`
    width: 95% !important;
    /* margin:0 10px; */
  `}
`;

const StyledIconSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 50px;
  ${media.small`
    gap: 30px;
  `}
`;

const StyledIcon = styled(Image)<{ show: boolean }>`
  width: 50px !important;
  cursor: pointer;
  /* height: 344px; */
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
  ${media.small`
    width: 30px !important;
    /* margin:0 10px; */
  `}
`;

export default LiveSchedule;
