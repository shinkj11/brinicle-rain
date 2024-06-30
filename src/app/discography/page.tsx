"use client";

import Image from "next/image";
import styled from "styled-components";
import { media } from "../lib/media";
import Typo from "../components/Typo";
import { useCustomMedia } from "../hooks/useCustomMedia";
import { useRouterEffect } from "../hooks/useRouterEffect";
import disco1 from "../../../public/gammaDiscography2.png";
import disco2 from "../../../public/polyDiscography2.png";
import disco3 from "../../../public/brDiscography2.png";
import icon1 from "../../../public/icons8-youtube-music.svg";
import icon2 from "../../../public/icons8-apple-music.svg";
import icon3 from "../../../public/icons8-spotify.svg";
import AboutGitst from "../components/AboutGist";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import AboutContent from "../components/AboutContent";
import { useState } from "react";

const albumMap = {
  GAMMA: {
    title: "GAMMA",
    href: {
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_kR8-zwrZi5gMSU5y10iLhtn6r6F6oCU3I",
      appleMusic: "https://music.apple.com/us/album/gamma/1753204178",
      spotify: "https://open.spotify.com/album/51YDbDXqFCZKHWscUAQ6B2",
    },
  },
  POLY: {
    title: "POLYHEDRON",
    href: {
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_lq8Ysbbv7iC6x7KicZ7ZwpOlc1ejasEeQ",
      appleMusic:
        "https://music.apple.com/us/album/polyhedron-single/1573203429",
      spotify: "https://open.spotify.com/album/4D4r2ddP1gbaCNz4ZFqwk1",
    },
  },
  BR: {
    title: "BRINICLE RAIN",
    href: {
      youtubeMusic:
        "https://music.youtube.com/playlist?list=OLAK5uy_kF_z6Qlt4tX44IBiCRgPMxhLayyAk2IKc",
      appleMusic:
        "https://music.apple.com/us/album/brinicle-rain-ep/1575156201",
      spotify: "https://open.spotify.com/album/3r9hsf2jMPdjfSFlFD6wUP",
    },
  },
};

type AlbumType = keyof typeof albumMap;

const Discography = () => {
  const { isSmall } = useCustomMedia();
  const { show } = useRouterEffect();
  const [clickedTitle, setClickedTitle] = useState<AlbumType>("GAMMA");

  const onAlbumClick = (title: AlbumType) => {
    setClickedTitle(title);
  };

  const onAlbumCarouselChange = (index: number) => {
    const albumTitleArr: Array<AlbumType> = ["GAMMA", "POLY", "BR"];
    setClickedTitle(albumTitleArr[index]);
  };

  const onYoutubeMusicClick = () => {
    window.open(albumMap[clickedTitle].href.youtubeMusic, "_blank");
  };

  const onAppleMusicClick = () => {
    window.open(albumMap[clickedTitle].href.appleMusic, "_blank");
  };

  const onSpotifyClick = () => {
    window.open(albumMap[clickedTitle].href.spotify, "_blank");
  };

  return (
    <MainWrapper>
      <Typo
        type={isSmall ? "header1Small" : "header1"}
        show={show}
        transDirection="right"
      >
        {isSmall
          ? `DISCO
        GRAPHY`
          : `DISCOGRAPHY`}
      </Typo>
      {isSmall ? (
        <StyledCarousel
          centerMode={true}
          centerSlidePercentage={80}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          onChange={onAlbumCarouselChange}
        >
          <StyledImage
            src={disco1}
            alt="disco1"
            layout="responsive"
            priority={true}
            placeholder={"blur"}
            show={show}
          />
          <StyledImage
            src={disco2}
            alt="disco2"
            layout="responsive"
            priority={true}
            placeholder={"blur"}
            show={show}
          />
          <StyledImage
            src={disco3}
            alt="disco3"
            layout="responsive"
            priority={true}
            placeholder={"blur"}
            show={show}
          />
        </StyledCarousel>
      ) : (
        <StyledImageSection>
          <StyledImage
            src={disco1}
            alt="disco1"
            layout="responsive"
            priority={true}
            placeholder={"blur"}
            show={show}
            onClick={() => onAlbumClick("GAMMA")}
          />
          <StyledImage
            src={disco2}
            alt="disco2"
            layout="responsive"
            priority={true}
            placeholder={"blur"}
            show={show}
            onClick={() => onAlbumClick("POLY")}
          />
          <StyledImage
            src={disco3}
            alt="disco3"
            layout="responsive"
            priority={true}
            placeholder={"blur"}
            show={show}
            onClick={() => onAlbumClick("BR")}
          />
        </StyledImageSection>
      )}
      <StyledTitleSection>
        <Typo type="body0" show={show} transDirection="left" isTrans={true}>
          {albumMap[clickedTitle].title}
        </Typo>
        <Typo type="body1" show={show} transDirection="top" isTrans={true}>
          |
        </Typo>
        <Typo
          type="smallHeader"
          show={show}
          transDirection="right"
          isTrans={true}
        >
          BRINICLE RAIN
        </Typo>
      </StyledTitleSection>
      <StyledIconSection>
        <StyledIcon
          src={icon1}
          alt="icon1"
          layout="responsive"
          show={show}
          onClick={onYoutubeMusicClick}
        />
        <StyledIcon
          src={icon2}
          alt="icon2"
          layout="responsive"
          show={show}
          onClick={onAppleMusicClick}
        />
        <StyledIcon
          src={icon3}
          alt="icon3"
          layout="responsive"
          show={show}
          onClick={onSpotifyClick}
        />
      </StyledIconSection>
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
  gap: 60px;
  ${media.small`
    width: 90%;
    height: calc(100svh - 70px);
    gap: 20px;
  `}
`;

const StyledImageSection = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledTitleSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
  ${media.small`
    justify-content: space-between;
    height: 60px;
  `}
`;

const StyledCarousel = styled(Carousel)`
  height: 70vw;
`;

const StyledImage = styled(Image)<{ show: boolean }>`
  width: 280px !important;
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

export default Discography;
