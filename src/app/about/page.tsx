"use client";

import Image from "next/image";
import styled from "styled-components";
import { media } from "../lib/media";
import Typo from "../components/Typo";
import { useCustomMedia } from "../hooks/useCustomMedia";
import { useRouterEffect } from "../hooks/useRouterEffect";
import picBig from "../../../public/members.jpg";
import picSmall from "../../../public/members2.jpg";
import AboutGitst from "../components/AboutGist";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import AboutContent from "../components/AboutContent";

const About = () => {
  const { isSmall } = useCustomMedia();
  const { show } = useRouterEffect();
  return (
    <MainWrapper>
      <StyledImage
        src={isSmall ? picSmall : picBig}
        alt="members"
        layout="responsive"
        priority={true}
        placeholder={"blur"}
        show={show}
      />
      <StyledCarousel
        showArrows={isSmall ? false : true}
        showStatus={false}
        centerMode={false}
      >
        <AboutGitst />
        <AboutContent />
      </StyledCarousel>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  position: relative;
  width: 955px;
  height: 100svh;
  margin: 0 auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
  ${media.small`
    width: 90%;
  `}
`;

const StyledCarousel = styled(Carousel)`
  .slider-wrapper {
    height: 40vh;
    ${media.small`
      height: 50svh;
    `}
  }
`;

const StyledImage = styled(Image)<{ show: boolean }>`
  height: 344px;
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
`;

export default About;
